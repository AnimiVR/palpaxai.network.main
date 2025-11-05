"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Wallet, Loader2, Download } from "lucide-react";
import { motion } from "framer-motion";
import { usePhantomWallet } from "@/hooks/usePhantomWallet";

// Infinite scrolling partner logos component
function InfinitePartnerScroll() {
  const partners = [
    { name: "Raydium", path: "/partners/raydium.svg", url: "https://raydium.io" },
    { name: "Pumpfun", path: "/partners/pumpfun.svg", url: "https://pump.fun" },
    { name: "TGMetrics", path: "/partners/tgmetrics.svg", url: "https://www.tgmetrics.ai/" },
    { name: "Solana Foundation", path: "/partners/solana-foundation.svg", url: "https://solana.org" },
    { name: "Coinbase", path: "/partners/coinbase.svg", url: "https://www.coinbase.com" },
    { name: "x402", path: "/partners/x402.svg", url: "https://x402.org" },
    { name: "OmniMinds", path: "/partners/omniminds.svg", url: "https://omniminds.ai/" },
    { name: "Eliza OS", path: "/partners/eliza-os.svg", url: "https://elizaos.ai/" },
    { name: "Compute", path: "/partners/compute.svg", url: "https://comput3.ai/" },
    { name: "Tip", path: "/partners/tip.md.svg", url: "https://tip.md" },
    { name: "MC Pay", path: "/partners/MCPay.svg", url: "https://mcpay.tech" },
    { name: "Oobe Protocol", path: "/partners/OOBE.svg", url: "https://www.oobeprotocol.ai/" },
    { name: "Solana", path: "/partners/Solana.svg", url: "https://solana.com/" },
    { name: "Polygon", path: "/partners/Polygon.svg", url: "https://polygon.technology" },
    { name: "Sei", path: "/partners/Sei.svg", url: "https://sei.io" },
    { name: "Base", path: "/partners/base.svg", url: "https://base.org" },
    { name: "Avax", path: "/partners/avax.svg", url: "https://avax.network" },
    { name: "Iotex", path: "/partners/IoTex.svg", url: "https://iotex.io/" },
  ];

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex items-center w-max animate-scroll hover:[animation-play-state:paused]">
        <div className="flex gap-8 pr-8">
          {partners.map((p) => (
            p.url ? (
              <a
                key={`a-${p.name}`}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={p.name}
                className="relative flex-none h-12 w-[7.5rem] md:h-14 md:w-[8.75rem] lg:h-16 lg:w-40 group cursor-default"
              >
                <Image
                  src={p.path}
                  alt={p.name}
                  fill
                  className="object-contain grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                  sizes="(min-width: 1024px) 160px, (min-width: 768px) 140px, 120px"
                  priority={false}
                />
              </a>
            ) : (
              <div
                key={`a-${p.name}`}
                className="relative flex-none h-12 w-[7.5rem] md:h-14 md:w-[8.75rem] lg:h-16 lg:w-40 group"
              >
                <Image
                  src={p.path}
                  alt={p.name}
                  fill
                  className="object-contain grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                  sizes="(min-width: 1024px) 160px, (min-width: 768px) 140px, 120px"
                  priority={false}
                />
              </div>
            )
          ))}
        </div>
        <div className="flex gap-8 pr-8" aria-hidden="true">
          {partners.map((p) => (
            p.url ? (
              <a
                key={`b-${p.name}`}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={p.name}
                className="relative flex-none h-12 w-[7.5rem] md:h-14 md:w-[8.75rem] lg:h-16 lg:w-40 group cursor-default"
              >
                <Image
                  src={p.path}
                  alt={p.name}
                  fill
                  className="object-contain grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                  sizes="(min-width: 1024px) 160px, (min-width: 768px) 140px, 120px"
                  priority={false}
                />
              </a>
            ) : (
              <div
                key={`b-${p.name}`}
                className="relative flex-none h-12 w-[7.5rem] md:h-14 md:w-[8.75rem] lg:h-16 lg:w-40 group"
              >
                <Image
                  src={p.path}
                  alt={p.name}
                  fill
                  className="object-contain grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                  sizes="(min-width: 1024px) 160px, (min-width: 768px) 140px, 120px"
                  priority={false}
                />
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const { connected, publicKeyString, isConnecting, isPhantomInstalled, connect } = usePhantomWallet()

  const handleConnectWallet = async () => {
    console.log('🟢 Header: handleConnectWallet called')
    console.log('🟢 Header: isPhantomInstalled', isPhantomInstalled)
    console.log('🟢 Header: isConnecting', isConnecting)
    console.log('🟢 Header: connected', connected)
    
    if (!isPhantomInstalled) {
      console.log('🟢 Header: Phantom not installed, opening phantom.app')
      window.open('https://phantom.app/', '_blank')
      return
    }
    console.log('🟢 Header: Calling connect()...')
    await connect()
    console.log('🟢 Header: connect() completed')
  }

  return (
    <section
      id="home"
      className="relative py-8 md:py-16 lg:py-18 overflow-hidden"
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-cyan-600/20 animate-gradient-xy opacity-50" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-start">
          {/* Header text - Takes 8 columns on large screens */}
          <div className="lg:col-span-8">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.25, 0.25, 0, 1],
              }}
              className="text-display md:text-display lg:text-6xl font-medium text-[#111729]"
              style={{ lineHeight: 1.2 }}
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="block text-gradient-animated"
              >
                Solana-x402 is an open payment protocol that brings stablecoin payments to plain HTTP.

              </motion.span>
            </motion.h1>
          </div>

          {/* Rest of content - Takes 6 columns on large screens */}
          <div className="lg:col-span-6 max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.2,
                ease: [0.25, 0.25, 0, 1],
              }}
              className="mt-4 md:mt-6 text-lg md:text-body-lg text-gray-600 leading-relaxed md:leading-relaxed font-medium"
            >
              Try x402 payments against. Get 100% of your payment refunded.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.3,
                ease: [0.25, 0.25, 0, 1],
              }}
              className="mt-10 md:mt-12"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  className="inline-flex items-center justify-center bg-primary hover:bg-primary-700 text-white px-6 py-3 text-body font-normal rounded-full transition-colors min-h-[44px] shadow-lg"
                  href="#"
                >
                  <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Download Extension
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Partner logos - Infinite horizontal scroll - Hidden */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.25, 0, 1] }}
          className="mt-20 md:mt-32 lg:mt-44"
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            whileHover={{ y: -4 }}
            className="glass-ultra border-2 border-purple-300/50 rounded-2xl p-6 md:p-8 shadow-xl w-full max-w-6xl mx-auto overflow-hidden neon-glow-hover shimmer"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="text-body md:text-body-lg text-gray-600 mb-6 md:mb-8 font-medium text-center"
            >
              Ecosystem & Partners
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <InfinitePartnerScroll />
            </motion.div>
          </motion.div>
        </motion.div> */}
      </div>
    </section>
  );
}
