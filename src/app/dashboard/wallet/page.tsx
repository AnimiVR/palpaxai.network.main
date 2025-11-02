"use client"

import DashboardLayout from "@/components/dashboard/DashboardLayout"
import WalletContent from "@/components/dashboard/contents/WalletContent"
import { WalletModal } from "@solana/wallet-adapter-react-ui"

export default function WalletPage() {
  return (
    <>
      <DashboardLayout content={<WalletContent />} />
      <WalletModal />
    </>
  )
}



