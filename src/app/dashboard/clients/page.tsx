"use client"

import DashboardLayout from "@/components/dashboard/DashboardLayout"
import ClientsContent from "@/components/dashboard/contents/ClientsContent"

export default function ClientsPage() {
  return (
    <DashboardLayout content={<ClientsContent />} />
  )
}




