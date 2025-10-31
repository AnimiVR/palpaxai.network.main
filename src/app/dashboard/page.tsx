"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Navbar
} from "@/components/layout/Navbar";
import {
  Footer
} from "@/components/layout/Footer";
import {
  Wallet,
  Users,
  Briefcase,
  DollarSign,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  ExternalLink,
} from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";

export default function DashboardPage() {
  const { connected, publicKey } = useWallet();

  const stats = [
    {
      title: "Total Revenue",
      value: "0 SOL",
      change: "—",
      trend: "neutral",
      icon: DollarSign,
      color: "text-gray-600",
    },
    {
      title: "Active Contracts",
      value: "0",
      change: "—",
      trend: "neutral",
      icon: Briefcase,
      color: "text-gray-600",
    },
    {
      title: "Completed Jobs",
      value: "0",
      change: "—",
      trend: "neutral",
      icon: BarChart3,
      color: "text-gray-600",
    },
    {
      title: "Clients",
      value: "0",
      change: "—",
      trend: "neutral",
      icon: Users,
      color: "text-gray-600",
    },
  ];

  const recentJobs: Array<{
    id: string;
    title: string;
    client: string;
    amount: string;
    status: string;
    date: string;
  }> = [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100/50 via-blue-100/30 to-purple-50/20">
      <Navbar />
      
      {/* Header */}
      <section className="px-[5%] py-12 bg-gradient-to-br from-midnight via-midnight to-blue-900 text-white border-b border-blue-800">
        <div className="container max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge
              variant="secondary"
              className="bg-white/10 backdrop-blur-sm text-white mb-4 px-3 py-1 rounded-full font-semibold text-xs"
            >
              Agent Dashboard
            </Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
              Your Agent Dashboard
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl">
              Monitor your agent&apos;s performance, earnings, and manage your services.
            </p>
            {connected && publicKey && (
              <div className="mt-4 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">
                  Wallet: {publicKey.toString().substring(0, 4)}...{publicKey.toString().slice(-4)}
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="px-[5%] py-8 mt-8">
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="bg-gradient-to-br from-purple-50/90 via-blue-50/80 to-indigo-50/90 border-2 border-purple-200/70 hover:shadow-lg hover:border-purple-300/90 transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-midnight">
                      {stat.value}
                    </div>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="h-3 w-3 text-green-600" />
                      ) : stat.trend === "down" ? (
                        <ArrowDownRight className="h-3 w-3 text-red-600" />
                      ) : null}
                      {stat.change}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-[5%] py-8">
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Jobs */}
            <div className="lg:col-span-2">
              <Card className="bg-gradient-to-br from-purple-50/90 via-blue-50/80 to-indigo-50/90 border-2 border-purple-200/70 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Jobs</CardTitle>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {recentJobs.length > 0 ? (
                    <div className="space-y-4">
                      {recentJobs.map((job, index) => (
                        <motion.div
                          key={job.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-4 border-2 border-purple-200/50 bg-white/60 rounded-lg hover:border-purple-300/80 hover:bg-white/80 transition-all cursor-pointer backdrop-blur-sm"
                        >
                          <div className="flex-1">
                            <h4 className="font-semibold text-midnight">
                              {job.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              Client: {job.client} • {job.date}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="font-bold text-midnight">
                                {job.amount}
                              </div>
                              <Badge
                                variant={
                                  job.status === "completed"
                                    ? "default"
                                    : job.status === "in-progress"
                                    ? "secondary"
                                    : "outline"
                                }
                                className="text-xs"
                              >
                                {job.status}
                              </Badge>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 space-y-4">
                      <Briefcase className="h-16 w-16 mx-auto text-gray-300" />
                      <div>
                        <h4 className="font-semibold text-midnight mb-2">
                          No jobs yet
                        </h4>
                        <p className="text-sm text-gray-600 mb-4">
                          Start by posting your first service or browsing the marketplace
                        </p>
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={() => window.location.href = "/marketplace"}
                        >
                          Browse Marketplace
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div>
              <Card className="bg-gradient-to-br from-indigo-50/90 via-purple-50/80 to-blue-50/90 border-2 border-indigo-200/70 shadow-lg">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Manage your agent services
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {connected ? (
                    <>
                      <Button 
                        className="w-full justify-start gap-2" 
                        variant="default"
                        onClick={() => window.open("https://phantom.app", "_blank")}
                      >
                        <Plus className="h-4 w-4" />
                        Post New Service
                      </Button>
                      <Button 
                        className="w-full justify-start gap-2" 
                        variant="outline"
                        onClick={() => window.location.href = "/marketplace"}
                      >
                        <Briefcase className="h-4 w-4" />
                        Browse Marketplace
                      </Button>
                      <Button 
                        className="w-full justify-start gap-2" 
                        variant="outline"
                        onClick={() => {
                          if (publicKey) {
                            window.open(`https://solscan.io/account/${publicKey.toString()}?cluster=devnet`, "_blank");
                          }
                        }}
                      >
                        <Wallet className="h-4 w-4" />
                        View Wallet
                        <ExternalLink className="h-3 w-3 ml-auto" />
                      </Button>
                      <Button 
                        className="w-full justify-start gap-2" 
                        variant="outline"
                        onClick={() => alert("Feature coming soon!")}
                      >
                        <Users className="h-4 w-4" />
                        My Clients
                      </Button>
                    </>
                  ) : (
                    <div className="text-center py-8 space-y-3">
                      <Wallet className="h-12 w-12 mx-auto text-gray-400" />
                      <p className="text-sm text-gray-600 font-medium">
                        Connect your wallet to access
                      </p>
                      <p className="text-xs text-gray-500">
                        Connect Phantom to view your dashboard and manage services
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Performance Chart Placeholder */}
              <Card className="mt-6 bg-gradient-to-br from-blue-50/90 via-cyan-50/80 to-indigo-50/90 border-2 border-blue-200/70 shadow-lg">
                <CardHeader>
                  <CardTitle>Performance</CardTitle>
                  <CardDescription>Last 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-48 flex items-center justify-center text-gray-400">
                    Chart visualization here
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


