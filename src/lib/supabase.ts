import { createClient } from '@supabase/supabase-js'

// Get Supabase URL and Anon Key from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.')
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

// Helper function to get current user
export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) {
      // Silently return null if user is not authenticated (this is expected)
      // Only log if it's not a session missing error
      if (error.message !== 'Auth session missing!') {
        console.debug('Error getting current user:', error.message)
      }
      return null
    }
    return user
  } catch (err: unknown) {
    // Handle any unexpected errors
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    console.debug('Unexpected error getting user:', errorMessage)
    return null
  }
}

// Helper function to get or create anonymous session
// This allows saving wallet info even without user authentication
export async function getOrCreateAnonymousSession() {
  const { data: { session } } = await supabase.auth.getSession()
  
  if (session) {
    return session
  }

  // Try to create anonymous session if no session exists
  // Note: This requires Supabase Auth to be configured for anonymous users
  // For now, we'll return null and handle it in the wallet save function
  return null
}

