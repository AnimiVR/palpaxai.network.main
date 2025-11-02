"use client"

import DashboardLayout from "@/components/dashboard/DashboardLayout"
import ContractsContent from "@/components/dashboard/contents/ContractsContent"

export default function ContractsPage() {
  return (
    <DashboardLayout content={<ContractsContent />} />
  )
}




