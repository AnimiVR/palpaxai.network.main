import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface WalletState {
  connected: boolean
  publicKey: string | null
  walletName: string | null
  isConnecting: boolean
  error: string | null
  
  // Actions
  setConnected: (connected: boolean) => void
  setPublicKey: (publicKey: string | null) => void
  setWalletName: (walletName: string | null) => void
  setIsConnecting: (isConnecting: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
}

const initialState = {
  connected: false,
  publicKey: null,
  walletName: null,
  isConnecting: false,
  error: null,
}

const STORAGE_KEY = 'wallet-storage'

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      ...initialState,
      
      setConnected: (connected) => set({ connected }),
      setPublicKey: (publicKey) => set({ publicKey }),
      setWalletName: (walletName) => set({ walletName }),
      setIsConnecting: (isConnecting) => set({ isConnecting }),
      setError: (error) => set({ error }),
      reset: () => {
        // Reset state in memory
        set(initialState)
        // Also clear from localStorage
        if (typeof window !== 'undefined') {
          localStorage.removeItem(STORAGE_KEY)
        }
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Persist wallet connection state to restore after page refresh
        connected: state.connected,
        publicKey: state.publicKey,
        walletName: state.walletName,
        // Don't persist isConnecting and error as they should reset on reload
      }),
    }
  )
)
