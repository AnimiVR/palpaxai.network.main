"use client"

import { useState } from "react"
import { CheckCircle, Circle, Plus, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const integrations = [
  {
    id: 1,
    name: "PalPaxAI x402",
    description: "Internet-native payment protocol for instant micro-transactions on Solana",
    status: "connected",
    icon: "⚡",
    category: "Payment",
  },
  {
    id: 2,
    name: "Solana Wallet",
    description: "Connect your Solana wallet for seamless transactions",
    status: "connected",
    icon: "💰",
    category: "Payment",
  },
  {
    id: 3,
    name: "Stripe API",
    description: "Accept payments via Stripe",
    status: "available",
    icon: "💳",
    category: "Payment",
  },
  {
    id: 4,
    name: "Webhook Integration",
    description: "Set up webhooks for real-time notifications",
    status: "available",
    icon: "🔔",
    category: "Notifications",
  },
  {
    id: 5,
    name: "Analytics API",
    description: "Integrate with analytics platforms",
    status: "available",
    icon: "📊",
    category: "Analytics",
  },
]

export default function IntegrationContent() {
  const [selectedIntegration, setSelectedIntegration] = useState<(typeof integrations)[0] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Integrations</h1>
          <p className="text-gray-500 text-sm sm:text-base">Connect and manage third-party services</p>
        </div>
        <Button className="gap-2">
          <Plus size={16} />
          Add Integration
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {integrations.map((integration) => (
          <Card key={integration.id} className="relative">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{integration.icon}</div>
                  <div>
                    <CardTitle className="text-lg">{integration.name}</CardTitle>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {integration.category}
                    </Badge>
                  </div>
                </div>
                {integration.status === "connected" ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <Circle className="h-5 w-5 text-gray-300" />
                )}
              </div>
              <CardDescription className="mt-2">{integration.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge
                  className={
                    integration.status === "connected"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }
                >
                  {integration.status === "connected" ? "Connected" : "Available"}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedIntegration(integration)
                    setIsDialogOpen(true)
                  }}
                >
                  <Settings size={14} className="mr-1" />
                  Configure
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Integration Configuration Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Configure {selectedIntegration?.name}</DialogTitle>
            <DialogDescription>Set up your {selectedIntegration?.name} integration settings</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedIntegration?.name === "PalPaxAI x402" ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="facilitator-url">Facilitator URL</Label>
                  <Input 
                    id="facilitator-url" 
                    placeholder="https://facilitator.payai.network" 
                    defaultValue="https://facilitator.payai.network"
                  />
                  <p className="text-xs text-gray-500">x402 facilitator service endpoint</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="network">Network</Label>
                  <Input 
                    id="network" 
                    placeholder="solana" 
                    defaultValue="solana"
                  />
                  <p className="text-xs text-gray-500">Blockchain network (solana, base, etc.)</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="receive-address">Receive Payments Address</Label>
                  <Input 
                    id="receive-address" 
                    placeholder="Enter your Solana address" 
                  />
                  <p className="text-xs text-gray-500">Address to receive payments</p>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <Input id="api-key" placeholder="Enter your API key" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="api-secret">API Secret</Label>
                  <Input id="api-secret" type="password" placeholder="Enter your API secret" />
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsDialogOpen(false)}>Save Configuration</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

