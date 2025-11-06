import { supabase, getCurrentUser } from './supabase'

export interface WalletData {
  wallet_address: string
  wallet_type?: string
  network?: string
  is_primary?: boolean
  is_connected?: boolean
}

/**
 * Save wallet information to Supabase
 * If user is not authenticated, creates a temporary record with user_id = null
 */
export async function saveWalletToSupabase(walletData: WalletData): Promise<{ success: boolean; error?: string; walletId?: string }> {
  try {
    // Get current user (may be null if not authenticated)
    const user = await getCurrentUser()

    // Check if wallet already exists
    // Note: We check by wallet_address only, not user_id, to allow wallet reuse
    // Use a simpler approach: try to get the wallet, if error, assume it doesn't exist
    let existingWallet = null
    try {
      const { data, error: checkError } = await supabase
        .from('wallets')
        .select('id, user_id')
        .eq('wallet_address', walletData.wallet_address)
        .maybeSingle() // Use maybeSingle instead of single to handle no rows gracefully
      
      if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.warn('Error checking wallet existence:', checkError)
        // Continue anyway, will try to insert
      } else {
        existingWallet = data
      }
    } catch (err) {
      // If check fails due to RLS, assume wallet doesn't exist and try to insert
      console.debug('Wallet check failed, will attempt insert:', err)
    }

    const now = new Date().toISOString()

    if (existingWallet) {
      // Update existing wallet
      const updateData: Record<string, unknown> = {
        wallet_type: walletData.wallet_type || 'phantom',
        network: walletData.network || 'solana',
        is_connected: walletData.is_connected ?? true,
        connected_at: walletData.is_connected ? now : null,
        last_used_at: now,
        updated_at: now,
      }

      // Link wallet to user if wallet has no user_id and user is now authenticated
      if (!existingWallet.user_id && user) {
        updateData.user_id = user.id

        // If this is marked as primary, set other wallets to non-primary
        if (walletData.is_primary) {
          await supabase
            .from('wallets')
            .update({ is_primary: false })
            .eq('user_id', user.id)
            .neq('wallet_address', walletData.wallet_address)
        }
      } else if (existingWallet.user_id && user && existingWallet.user_id === user.id) {
        // User is updating their own wallet
        // If this is marked as primary, set other wallets to non-primary
        if (walletData.is_primary) {
          await supabase
            .from('wallets')
            .update({ is_primary: false })
            .eq('user_id', user.id)
            .neq('wallet_address', walletData.wallet_address)
        }
      }

      // Update is_primary if specified
      if (walletData.is_primary !== undefined) {
        updateData.is_primary = walletData.is_primary
      }

      const { data, error } = await supabase
        .from('wallets')
        .update(updateData)
        .eq('wallet_address', walletData.wallet_address)
        .select()
        .single()

      if (error) {
        console.error('Error updating wallet:', error)
        return { success: false, error: error.message }
      }

      return { success: true, walletId: data.id }
    } else {
      // Insert new wallet
      const insertData: Record<string, unknown> = {
        wallet_address: walletData.wallet_address,
        wallet_type: walletData.wallet_type || 'phantom',
        network: walletData.network || 'solana',
        is_primary: walletData.is_primary ?? false,
        is_connected: walletData.is_connected ?? true,
        connected_at: walletData.is_connected ? now : null,
        last_used_at: now,
        user_id: user?.id || null, // Set user_id if authenticated, otherwise null
      }

      // If user is authenticated and this is marked as primary, set other wallets to non-primary
      if (user && walletData.is_primary) {
        await supabase
          .from('wallets')
          .update({ is_primary: false })
          .eq('user_id', user.id)
          .neq('wallet_address', walletData.wallet_address)
      }

      const { data, error } = await supabase
        .from('wallets')
        .insert(insertData)
        .select()
        .single()

      if (error) {
        console.error('Error inserting wallet:', error)
        return { success: false, error: error.message }
      }

      return { success: true, walletId: data.id }
    }
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    console.error('Error saving wallet to Supabase:', err)
    return { success: false, error: errorMessage }
  }
}

/**
 * Update wallet connection status
 */
export async function updateWalletConnectionStatus(
  walletAddress: string,
  isConnected: boolean
): Promise<{ success: boolean; error?: string }> {
  try {
    const updateData: Record<string, unknown> = {
      is_connected: isConnected,
      last_used_at: new Date().toISOString(),
    }

    if (isConnected) {
      updateData.connected_at = new Date().toISOString()
    }

    const { error } = await supabase
      .from('wallets')
      .update(updateData)
      .eq('wallet_address', walletAddress)

    if (error) {
      console.error('Error updating wallet connection status:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    console.error('Error updating wallet connection status:', err)
    return { success: false, error: errorMessage }
  }
}

/**
 * Get user wallets
 */
export async function getUserWallets(userId?: string) {
  try {
    const user = userId ? null : await getCurrentUser()
    const targetUserId = userId || user?.id

    if (!targetUserId) {
      return { success: false, data: [], error: 'No user ID provided' }
    }

    const { data, error } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', targetUserId)
      .order('is_primary', { ascending: false })
      .order('last_used_at', { ascending: false })

    if (error) {
      console.error('Error fetching user wallets:', error)
      return { success: false, data: [], error: error.message }
    }

    return { success: true, data: data || [] }
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    console.error('Error fetching user wallets:', err)
    return { success: false, data: [], error: errorMessage }
  }
}

/**
 * Create wallet session (for tracking connection/disconnection)
 */
export async function createWalletSession(
  walletAddress: string,
  action: 'connect' | 'disconnect'
): Promise<{ success: boolean; error?: string; sessionId?: string }> {
  try {
    const user = await getCurrentUser()

    // Get wallet ID
    const { data: wallet } = await supabase
      .from('wallets')
      .select('id, user_id')
      .eq('wallet_address', walletAddress)
      .single()

    if (!wallet) {
      return { success: false, error: 'Wallet not found' }
    }

    // Insert session record
    const now = new Date().toISOString()
    const { data, error } = await supabase
      .from('wallet_sessions')
      .insert({
        wallet_id: wallet.id,
        user_id: wallet.user_id || user?.id || null,
        action: action,
        session_started_at: action === 'connect' ? now : null,
        session_ended_at: action === 'disconnect' ? now : null,
        is_active: action === 'connect', // Active when connecting, inactive when disconnecting
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating wallet session:', error)
      return { success: false, error: error.message }
    }

    return { success: true, sessionId: data.id }
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    console.error('Error creating wallet session:', err)
    return { success: false, error: errorMessage }
  }
}

