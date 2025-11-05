"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

const performanceMetrics = [
  {
    name: "Payment Success Rate",
    value: "99.8%",
    target: "99.5%",
    progress: 99,
    status: "excellent",
  },
  {
    name: "Avg Payment Time",
    value: "0.8s",
    target: "1.0s",
    progress: 95,
    status: "excellent",
  },
  {
    name: "Total Payments (24h)",
    value: "12,842",
    target: "15,000",
    progress: 86,
    status: "good",
  },
  {
    name: "Network Uptime",
    value: "99.99%",
    target: "99.95%",
    progress: 99,
    status: "excellent",
  },
]

const servicePerformance = [
  {
    name: "PalPaxAI x402 Protocol",
    requests: 12842,
    successRate: 99.8,
    avgResponseTime: "0.8s",
    status: "excellent",
  },
  {
    name: "Solana Network",
    requests: 8934,
    successRate: 99.5,
    avgResponseTime: "0.6s",
    status: "excellent",
  },
  {
    name: "Facilitator Service",
    requests: 5672,
    successRate: 98.9,
    avgResponseTime: "0.9s",
    status: "good",
  },
]

export default function PerformanceContent() {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">PalPaxAI x402 Performance</h1>
          <p className="text-gray-500 text-sm sm:text-base">Monitor x402 protocol performance and payment metrics</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {performanceMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">{metric.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between mb-2">
                <div className="text-2xl font-bold">{metric.value}</div>
                <Badge
                  className={
                    metric.status === "excellent"
                      ? "bg-green-100 text-green-800"
                      : metric.status === "good"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                  }
                >
                  {metric.status === "excellent" ? "Excellent" : metric.status === "good" ? "Good" : "Warning"}
                </Badge>
              </div>
              <Progress value={metric.progress} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">Target: {metric.target}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* x402 Protocol Performance */}
      <Card>
        <CardHeader>
          <CardTitle>x402 Protocol Performance</CardTitle>
          <CardDescription>Real-time metrics for PalPaxAI x402 payment protocol</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {servicePerformance.map((service, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{service.name}</h3>
                    <p className="text-sm text-gray-500">{service.requests.toLocaleString()} requests</p>
                  </div>
                  <Badge
                    className={
                      service.status === "excellent"
                        ? "bg-green-100 text-green-800"
                        : service.status === "good"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                    }
                  >
                    {service.status === "excellent" ? "Excellent" : service.status === "good" ? "Good" : "Warning"}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Success Rate</p>
                    <div className="flex items-center gap-2">
                      <Progress value={service.successRate} className="flex-1 h-2" />
                      <span className="text-sm font-medium">{service.successRate}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Avg Response Time</p>
                    <span className="text-sm font-medium">{service.avgResponseTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  )
}




