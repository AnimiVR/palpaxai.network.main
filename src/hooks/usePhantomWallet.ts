"use client"

import { useCallback, useEffect, useMemo, useState } from 'react'
import { PublicKey, Transaction, Connection } from '@solana/web3.js'
import { useWalletStore } from '@/stores/walletStore'
import { useToast } from '@/hooks/use-toast'
import { saveWalletToSupabase, updateWalletConnectionStatus, createWalletSession } from '@/lib/walletService'

// Extend Window interface for TypeScript

declare global {
  interface Window {
    solana?: {
      isPhantom?: boolean
      isConnected?: boolean
      publicKey?: PublicKey | null
      connect?: (options?: { onlyIfTrusted?: boolean }) => Promise<{ publicKey: PublicKey }>
      disconnect?: () => Promise<void>
      on?: (event: string, callback: (...args: unknown[]) => void) => void
      removeListener?: (event: string, callback: (...args: unknown[]) => void) => void
      signTransaction?: (transaction: Transaction) => Promise<Transaction>
      sendTransaction?: (transaction: Transaction, connection: Connection) => Promise<string>
    }
  }
}

export function usePhantomWallet() {
  const {
    connected,
    publicKey,
    walletName,
    isConnecting,
    error,
    setConnected,
    setPublicKey,
    setWalletName,
    setIsConnecting,
    setError,
    reset,
  } = useWalletStore()

  const { toast } = useToast()
  
  // Track if Phantom extension is installed
  const [isPhantomInstalled, setIsPhantomInstalled] = useState(false)
  const [isCheckingExtension, setIsCheckingExtension] = useState(true)

  // Track if we've attempted auto-reconnect to prevent multiple attempts
  const [autoReconnectAttempted, setAutoReconnectAttempted] = useState(false)

  // Check if Phantom extension is installed
  useEffect(() => {
    const checkPhantom = () => {
      if (typeof window === 'undefined') {
        setIsPhantomInstalled(false)
        setIsCheckingExtension(false)
        return
      }

      // Check if Phantom is installed
      const checkInterval = setInterval(() => {
        if (window.solana?.isPhantom) {
          setIsPhantomInstalled(true)
          setIsCheckingExtension(false)
          clearInterval(checkInterval)
        } else {
          setIsPhantomInstalled(false)
          setIsCheckingExtension(false)
        }
      }, 100)

      // Stop checking after 3 seconds
      setTimeout(() => {
        clearInterval(checkInterval)
        setIsCheckingExtension(false)
      }, 3000)
    }

    checkPhantom()
  }, [])

  // Listen for Phantom connection events
  useEffect(() => {
    if (typeof window === 'undefined' || !window.solana) return

    const handleConnect = () => {
      if (window.solana?.publicKey) {
        const address = window.solana.publicKey.toString()
        setConnected(true)
        setPublicKey(address)
        setWalletName('Phantom')
      }
    }

    const handleDisconnect = () => {
      reset()
    }

    const handleAccountChange = (...args: unknown[]) => {
      const publicKey = args[0] as PublicKey | null | undefined
      if (publicKey) {
        setPublicKey(publicKey.toString())
      } else {
        reset()
      }
    }

    // Subscribe to events
    window.solana.on?.('connect', handleConnect)
    window.solana.on?.('disconnect', handleDisconnect)
    window.solana.on?.('accountChanged', handleAccountChange)

    // Cleanup
    return () => {
      window.solana?.removeListener?.('connect', handleConnect)
      window.solana?.removeListener?.('disconnect', handleDisconnect)
      window.solana?.removeListener?.('accountChanged', handleAccountChange)
    }
  }, [setConnected, setPublicKey, setWalletName, reset])

  // Không auto-reconnect - chỉ connect khi user click và wallet đang locked (cần password)
  // Chỉ sync state nếu Phantom đã connected (không tự động connect)
  useEffect(() => {
    if (autoReconnectAttempted) return
    
    setAutoReconnectAttempted(true)
    
    // Check if Phantom extension is available
    const checkPhantom = async () => {
      if (typeof window === 'undefined' || !window.solana?.isPhantom) {
        // Phantom not available - clear state
        reset()
        return
      }

      // Chỉ sync state nếu Phantom đã connected (không tự động connect)
      // Điều này đảm bảo nếu user đã connect từ tab khác, state sẽ được sync
      if (window.solana.isConnected && window.solana.publicKey) {
        const currentAddress = window.solana.publicKey.toString()
        // Sync state nhưng không tự động connect
        if (publicKey && publicKey === currentAddress) {
          setConnected(true)
          setPublicKey(currentAddress)
          setWalletName('Phantom')
          
          // Update Supabase connection status (silently)
          try {
            await updateWalletConnectionStatus(currentAddress, true)
          } catch (error) {
            // Silent fail - don't interrupt state sync
            console.log('Failed to update Supabase status on sync:', error)
          }
        }
      } else {
        // Nếu Phantom không connected, clear state
        // KHÔNG tự động connect - chỉ connect khi user click và wallet locked
        reset()
      }
    }

    // Wait a bit for Phantom extension to load
    setTimeout(() => {
      checkPhantom()
    }, 500)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Only run once on mount


  // Connect wallet - CHỈ connect khi wallet đang locked (cần password)
  // Logic: Disconnect trước, sau đó connect để đảm bảo wallet ở trạng thái locked
  const connect = useCallback(async () => {
    console.log('🔵 Connect wallet called')
    console.log('🔵 Window.solana:', typeof window !== 'undefined' ? window.solana : 'undefined')
    console.log('🔵 isPhantomInstalled:', isPhantomInstalled)
    console.log('🔵 isCheckingExtension:', isCheckingExtension)
    
    // Double check that Phantom extension is available
    if (typeof window === 'undefined' || !window.solana?.isPhantom) {
      console.log('🔵 Phantom not found, waiting...')
      // Wait a bit and check again (extension might be loading)
      await new Promise(resolve => setTimeout(resolve, 500))
      
      if (!window.solana?.isPhantom) {
        console.log('🔵 Phantom still not found after wait')
        const errorMsg = 'Phantom wallet is not installed. Please install Phantom to continue.'
        setError(errorMsg)
        toast({
          title: 'Phantom Not Found',
          description: errorMsg,
          variant: 'destructive',
        })
        window.open('https://phantom.app/', '_blank')
        return
      }
    }

    if (!isPhantomInstalled && !isCheckingExtension) {
      const errorMsg = 'Phantom wallet is not installed. Please install Phantom to continue.'
      setError(errorMsg)
      toast({
        title: 'Phantom Not Found',
        description: errorMsg,
        variant: 'destructive',
      })
      window.open('https://phantom.app/', '_blank')
      return
    }

    setIsConnecting(true)
    setError(null)

    try {
      console.log('🔵 Starting connection process...')
      console.log('🔵 window.solana.isConnected:', window.solana!.isConnected)
      
      // QUAN TRỌNG: Disconnect trước để đảm bảo wallet ở trạng thái cần connect lại
      // Điều này đảm bảo rằng khi connect(), Phantom sẽ kiểm tra trạng thái wallet
      // Nếu wallet locked → show popup nhập password
      // Nếu wallet unlocked → show popup approve connection
      if (window.solana?.isConnected && window.solana.disconnect) {
        console.log('🔵 Disconnecting first...')
        try {
          await window.solana.disconnect()
          // Wait a bit after disconnect để Phantom extension reset state
          await new Promise(resolve => setTimeout(resolve, 200))
          console.log('🔵 Disconnected successfully')
        } catch (disconnectErr) {
          // Ignore disconnect errors - tiếp tục connect
          console.log('🔵 Disconnect error (continuing):', disconnectErr)
        }
      }

      // Connect với onlyIfTrusted: false
      // Điều này đảm bảo:
      // - Nếu wallet LOCKED → Phantom sẽ show popup nhập password
      // - Nếu wallet UNLOCKED nhưng chưa approve → show popup approve
      // - Nếu wallet UNLOCKED và đã approve → vẫn show popup approve (không auto-connect)
      if (!window.solana?.connect) {
        throw new Error('Phantom wallet connect method not available')
      }
      console.log('🔵 Calling window.solana.connect()...')
      const result = await window.solana.connect({ onlyIfTrusted: false })
      console.log('🔵 Connect result:', result)
      
      // Chỉ set connected SAU KHI user nhập password và approve
      if (result.publicKey) {
        const pk = result.publicKey.toString()
        setConnected(true)
        setPublicKey(pk)
        setWalletName('Phantom')
        
        // Lưu thông tin ví vào Supabase
        try {
          const saveResult = await saveWalletToSupabase({
            wallet_address: pk,
            wallet_type: 'phantom',
            network: 'solana',
            is_primary: true, // Set as primary wallet
            is_connected: true,
          })

          if (saveResult.success) {
            // Tạo session record
            await createWalletSession(pk, 'connect')
            console.log('Wallet saved to Supabase successfully')
          } else {
            console.warn('Failed to save wallet to Supabase:', saveResult.error)
            // Don't show error to user, just log it
          }
        } catch (supabaseError) {
          console.error('Error saving wallet to Supabase:', supabaseError)
          // Don't block the connection if Supabase fails
        }
        
        toast({
          title: 'Connected!',
          description: 'Phantom wallet connected successfully',
        })
      }
      
      setIsConnecting(false)
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error('Unknown error')
      const errorMessage = error.message
      console.error('🔴 Connect error:', errorMessage)
      if (err && typeof err === 'object' && 'code' in err) {
        console.error('🔴 Error code:', err.code)
      }
      console.error('🔴 Error name:', error.name)
      console.error('🔴 Error message:', errorMessage)
      
      setIsConnecting(false)
      
      const errorMsg = errorMessage
      
      // Check if it's a user rejection (don't show error for that)
      const isUserRejection = 
        (err && typeof err === 'object' && 'code' in err && err.code === 4001) ||
        error.name === 'UserRejectedRequestError' ||
        errorMsg.toLowerCase().includes('rejected') ||
        errorMsg.toLowerCase().includes('denied') ||
        errorMsg.toLowerCase().includes('cancelled') ||
        errorMsg.toLowerCase().includes('canceled') ||
        errorMsg.toLowerCase().includes('user rejected')
      
      console.log('🔴 Is user rejection:', isUserRejection)
      
      // Suppress errors for user rejection
      if (isUserRejection) {
        // User rejected - silently fail, no error shown
        console.log('🔴 User rejected connection')
        return
      }
      
      // Show error for other cases
      console.log('🔴 Showing error to user')
      setError(errorMsg)
      toast({
        title: 'Connection Failed',
        description: errorMsg || 'Failed to connect to Phantom wallet. Please ensure your wallet is unlocked and try again.',
        variant: 'destructive',
      })
    }
  }, [isPhantomInstalled, isCheckingExtension, setIsConnecting, setError, setConnected, setPublicKey, setWalletName, toast])

  // Disconnect wallet directly using window.solana
  const disconnect = useCallback(async () => {
    const walletAddress = publicKey
    
    try {
      if (typeof window !== 'undefined' && window.solana?.disconnect) {
        await window.solana.disconnect()
      }
    } catch (err) {
      console.error('Error disconnecting wallet:', err)
    } finally {
      // Update Supabase connection status
      if (walletAddress) {
        try {
          await updateWalletConnectionStatus(walletAddress, false)
          await createWalletSession(walletAddress, 'disconnect')
        } catch (supabaseError) {
          console.error('Error updating wallet status in Supabase:', supabaseError)
          // Don't block the disconnect if Supabase fails
        }
      }
      
      // Always reset Zustand state
      reset()
      toast({
        title: 'Wallet Disconnected',
        description: 'Wallet has been disconnected',
      })
    }
  }, [reset, toast, publicKey])

  // Get public key as PublicKey object (only compute when needed)
  const publicKeyObj = useMemo(() => {
    return publicKey ? new PublicKey(publicKey) : null
  }, [publicKey])

  return {
    // State
    connected,
    publicKey: publicKeyObj,
    publicKeyString: publicKey,
    walletName,
    isConnecting,
    error,
    isPhantomInstalled,

    // Actions
    connect,
    disconnect,
  }
}
