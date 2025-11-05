"use client"

import DashboardLayout from "@/components/dashboard/DashboardLayout"
import WalletContent from "@/components/dashboard/contents/WalletContent"

export default function WalletPage() {
  return (
    <DashboardLayout content={<WalletContent />} />
  )
}



