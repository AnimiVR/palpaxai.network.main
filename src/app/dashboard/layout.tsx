"use client"

import { SolanaWalletProvider } from "@/components/WalletProvider"
import { Toaster } from "@/components/ui/toaster"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SolanaWalletProvider>
      {children}
      <Toaster />
    </SolanaWalletProvider>
  )
}


