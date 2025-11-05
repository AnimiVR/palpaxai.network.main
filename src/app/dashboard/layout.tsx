"use client"

import { Toaster } from "@/components/ui/toaster"
import { PhantomProvider, AddressType } from "@phantom/react-sdk"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PhantomProvider
      config={{
        providerType: "injected", // Uses Phantom browser extension
        addressTypes: [AddressType.solana], // Enable Solana support
      }}
    >
      {children}
      <Toaster />
    </PhantomProvider>
  )
}


