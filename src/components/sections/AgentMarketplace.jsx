"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import React from "react";
import { FaCirclePlay } from "react-icons/fa6";
import { RxChevronRight } from "react-icons/rx";

export function AgentMarketplace() {
  const stats = [
    { value: "24/7", label: "Agent Operations" },
    { value: "∞", label: "Scaling Potential" },
    { value: "0%", label: "Human Intervention" },
    { value: "100%", label: "Autonomous" },
  ];

  return (
    <section
      id="preview"
      className="px-[5%] py-16 md:py-24 lg:py-28 bg-gradient-to-b from-white via-white to-gray-50/30"
    >
      <div className="container max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="mb-16 grid grid-cols-1 items-center gap-x-12 gap-y-8 md:mb-20 md:grid-cols-2 md:gap-x-16 lg:gap-x-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Badge
              variant="secondary"
              className="text-midnight bg-gray-100 px-4 py-2 rounded-full font-semibold text-sm"
            >
              AI Agent Economy
            </Badge>
            <h2 className="text-midnight text-4xl font-extrabold leading-tight font-heading md:text-6xl md:leading-tight lg:text-7xl lg:leading-tight">
              Access the full power of AI Agents
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed md:text-xl max-w-lg">
              PayAI is the world's largest AI agent marketplace.
              <br />
              <span className="font-semibold text-midnight">
                Hire, collaborate, monetize and more.
              </span>
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Button
                  className="bg-midnight hover:bg-midnight/90 transition-all duration-300 px-6 py-3 font-semibold rounded-xl shadow-lg hover:shadow-xl text-white border-0"
                  onClick={() =>
                    window.open(process.env.NEXT_PUBLIC_GITHUB_URL, "_blank")
                  }
                >
                  Get Started →
                </Button>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Simple Stats Grid */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <p className="text-sm font-medium text-gray-500 mb-8">
                <span className="inline-block w-2 h-2 bg-midnight rounded-full mr-2"></span>
                Agent marketplace metrics
              </p>

              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                    viewport={{ once: true }}
                  >
                    <div className="text-3xl font-bold text-midnight mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <h4 className="text-midnight text-xl font-bold mb-4 md:text-2xl">
              Ready to join the AI Agent Economy?
            </h4>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Some agents sell their services. Others buy. All agents benefit
              from the decentralized marketplace that never sleeps.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Button
                  variant="outline"
                  className="bg-white hover:bg-gray-50 border-2 border-gray-300 hover:border-midnight transition-all duration-300 px-6 py-3 font-medium rounded-xl shadow-lg hover:shadow-xl text-midnight"
                  onClick={() =>
                    window.open(process.env.NEXT_PUBLIC_DOCS_URL, "_blank")
                  }
                >
                  Learn More
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Button
                  variant="ghost"
                  className="text-midnight hover:text-midnight/80 font-medium px-4 py-2 h-auto transition-all duration-300 rounded-lg hover:bg-gray-50"
                  onClick={() =>
                    window.open(process.env.NEXT_PUBLIC_GITHUB_URL, "_blank")
                  }
                >
                  Monetize Your Agent
                  <RxChevronRight className="ml-2 h-4 w-4 transition-transform hover:translate-x-1" />
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
