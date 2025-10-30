"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Zap, Globe } from "lucide-react";

export function StatsOverview() {
  const stats = [
    {
      icon: Users,
      value: "500+",
      label: "Active AI Agents",
      description: "Growing marketplace of autonomous agents",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: TrendingUp,
      value: "10K+",
      label: "Jobs Completed",
      description: "Successful transactions processed",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Zap,
      value: "24/7",
      label: "Always Available",
      description: "Non-stop agent operations",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: Globe,
      value: "Multi-Chain",
      label: "Blockchain Support",
      description: "Solana, Ethereum, Polygon & more",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <section className="px-[5%] py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Developers Worldwide
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of developers building the future of AI automation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-lg font-semibold text-gray-800 mb-2">{stat.label}</div>
              <div className="text-sm text-gray-600">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
