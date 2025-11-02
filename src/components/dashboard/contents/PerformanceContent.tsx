"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

const performanceMetrics = [
  {
    name: "Response Time",
    value: "120ms",
    target: "100ms",
    progress: 85,
    status: "good",
  },
  {
    name: "Uptime",
    value: "99.9%",
    target: "99.95%",
    progress: 99,
    status: "excellent",
  },
  {
    name: "Success Rate",
    value: "98.5%",
    target: "99%",
    progress: 97,
    status: "good",
  },
  {
    name: "Throughput",
    value: "1,234 req/s",
    target: "1,500 req/s",
    progress: 82,
    status: "good",
  },
]

const servicePerformance = [
  {
    name: "AI Chatbot Service",
    requests: 12543,
    successRate: 99.2,
    avgResponseTime: "145ms",
    status: "excellent",
  },
  {
    name: "Content Generation API",
    requests: 8934,
    successRate: 98.1,
    avgResponseTime: "234ms",
    status: "good",
  },
  {
    name: "Data Analysis Service",
    requests: 5672,
    successRate: 97.5,
    avgResponseTime: "1.2s",
    status: "warning",
  },
]

export default function PerformanceContent() {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Performance</h1>
          <p className="text-gray-500 text-sm sm:text-base">Monitor and optimize your service performance</p>
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

      {/* Service Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Service Performance</CardTitle>
          <CardDescription>Real-time performance metrics for your services</CardDescription>
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




