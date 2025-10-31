"use client";

import { Button } from "@relume_io/relume-ui";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Wallet, CheckCircle, ArrowRight, Zap, Shield, Globe, Download } from "lucide-react";

export function ConnectWallet() {
  const { wallet, connect, disconnect, connected, publicKey } = useWallet();

  const handleConnect = () => {
    if (!connected) {
      connect().catch((err) => {
        console.error("Failed to connect wallet:", err);
      });
    }
  };

  const handleDisconnect = () => {
    disconnect().catch((err) => {
      console.error("Failed to disconnect wallet:", err);
    });
  };

  const features = [
    {
      icon: Shield,
      title: "Secure",
      description: "Your private keys never leave your device",
      color: "text-green-600"
    },
    {
      icon: Zap,
      title: "Fast",
      description: "Instant transactions with low fees",
      color: "text-blue-600"
    },
    {
      icon: Globe,
      title: "Universal",
      description: "Works with all Solana DApps",
      color: "text-purple-600"
    },
  ];

  return (
    <section
      id="connect-wallet"
      className="px-[5%] py-16 md:py-24 lg:py-28 bg-gradient-to-b from-purple-100/40 via-blue-100/30 to-indigo-50/20"
    >
      <div className="container max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <Badge className="mb-6 text-midnight px-4 py-2 rounded-full font-semibold text-sm">
            Solana Wallet
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-midnight mb-4">
            Connect Your Phantom Wallet
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
            Securely connect to the PalPaxAI platform using Phantom, the most trusted Solana wallet. 
            Start paying for AI services instantly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Connect Button */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="border-2 border-purple-200/70 shadow-xl bg-gradient-to-br from-purple-50/90 via-blue-50/80 to-indigo-50/90 hover:border-purple-300/90">
              <CardContent className="p-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                </div>
                
                {!connected ? (
                  <>
                    <h3 className="text-2xl font-bold text-midnight text-center mb-2">
                      Connect Phantom Wallet
                    </h3>
                    
                    <p className="text-gray-600 text-center mb-6">
                      Connect your Phantom wallet to enable instant micro-transactions on PalPaxAI
                    </p>

                    <div className="space-y-4">
                      <Button
                        onClick={handleConnect}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 text-lg"
                      >
                        <Wallet className="w-6 h-6" />
                        Connect Wallet
                      </Button>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <Download className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-semibold text-blue-900 mb-1">
                              Don't have Phantom?
                            </p>
                            <p className="text-sm text-blue-700">
                              Download the Phantom browser extension to connect your wallet.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-midnight text-center mb-2">
                      Wallet Connected
                    </h3>

                    <div className="bg-white rounded-xl p-4 border-2 border-green-200 mb-6">
                      <p className="text-sm text-gray-600 mb-2 font-medium">Wallet Address</p>
                      <p className="text-midnight font-mono text-sm break-all">
                        {publicKey?.toString().substring(0, 20)}...
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <Card className="border-0 shadow-md bg-green-50">
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-green-600">✓</div>
                          <p className="text-sm text-gray-600 mt-1">Connected</p>
                        </CardContent>
                      </Card>
                      <Card className="border-0 shadow-md bg-blue-50">
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-blue-600">∞</div>
                          <p className="text-sm text-gray-600 mt-1">Ready</p>
                        </CardContent>
                      </Card>
                    </div>

                    <Button
                      onClick={handleDisconnect}
                      className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                    >
                      Disconnect Wallet
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Right side - Features */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-midnight mb-6">
              Why Connect Your Wallet?
            </h3>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`${feature.color} flex-shrink-0`}>
                          <feature.icon className="w-8 h-8" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-midnight mb-2">
                            {feature.title}
                          </h4>
                          <p className="text-gray-600 text-sm">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Info Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <ArrowRight className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg font-bold text-midnight mb-2">
                        Instant Payments
                      </h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Once connected, you can instantly pay for AI services, API calls, 
                        and computational resources without any registration or delays.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

