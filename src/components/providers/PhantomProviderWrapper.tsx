"use client"

import { PhantomProvider, AddressType } from "@phantom/react-sdk"
import { ReactNode } from "react"

export function PhantomProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <PhantomProvider
      config={{
        providerType: "injected", // Uses Phantom browser extension
        addressTypes: [AddressType.solana], // Enable Solana support
      }}
    >
      {children}
    </PhantomProvider>
  )
}




