"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, DollarSign, Users, Package, ShoppingCart, Wallet } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { usePhantomWallet } from "@/hooks/usePhantomWallet"

export default function AnalyticsContent() {
  const [timeRange, setTimeRange] = useState("30d")
  const { connected, connect, isConnecting } = usePhantomWallet()

  const handleConnectWallet = () => {
    connect()
  }

  // Stats - only show data when wallet is connected
  const stats = [
    {
      title: "Total Revenue",
      value: "0 SOL",
      change: "0%",
      trend: "up" as const,
      icon: DollarSign,
    },
    {
      title: "Active Services",
      value: "0",
      change: "0",
      trend: "up" as const,
      icon: Package,
    },
    {
      title: "Total Clients",
      value: "0",
      change: "0%",
      trend: "up" as const,
      icon: Users,
    },
    {
      title: "Total Orders",
      value: "0",
      change: "0%",
      trend: "up" as const,
      icon: ShoppingCart,
    },
  ]

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Analytics</h1>
          <p className="text-gray-500 text-sm sm:text-base">
            {connected ? "Track your business performance and insights" : "Connect your wallet to view analytics"}
          </p>
        </div>
        {connected && (
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Connect Wallet Message */}
      {!connected && (
        <Card className="border-2 border-dashed mb-6">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-4 mb-4">
              <Wallet className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Connect Your Wallet</h2>
            <p className="text-gray-500 dark:text-gray-400 text-center mb-6 max-w-md">
              Connect your wallet to view analytics and track your business performance
            </p>
            <Button
              onClick={handleConnectWallet}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
              disabled={isConnecting}
            >
              <Wallet className="mr-2 h-5 w-5" />
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <Card key={index} className={!connected ? "opacity-60" : ""}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {connected && (
                <div className={`text-xs flex items-center mt-1 ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {stat.trend === "up" ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                  {stat.change} from last period
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section - Only show when connected */}
      {connected && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Revenue trends over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Chart visualization will be implemented here</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Service Performance</CardTitle>
              <CardDescription>Top performing services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <Package className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Service performance chart will be implemented here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}




