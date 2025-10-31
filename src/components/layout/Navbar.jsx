"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Github, Wallet } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { wallet, select, wallets, connect, disconnect, connected, publicKey } = useWallet();
  const { setVisible } = useWalletModal();

  const handleConnect = async () => {
    try {
      if (!connected) {
        // Show wallet selection modal for user to choose wallet
        setVisible(true);
      }
    } catch (err) {
      console.error("Failed to open wallet modal:", err);
      // Fallback: try to connect if wallet is already selected
      if (wallet && wallet.adapter && !wallet.adapter.connected) {
        try {
          await connect();
        } catch (connectErr) {
          console.error("Failed to connect wallet:", connectErr);
          alert("Please install a Solana wallet extension (Phantom, Solflare, etc.) to connect.");
        }
      } else {
        alert("Please install a Solana wallet extension (Phantom, Solflare, etc.) to connect.");
      }
    }
  };

  const handleDisconnect = () => {
    disconnect().catch((err) => {
      console.error("Failed to disconnect wallet:", err);
    });
  };

  // Sync wallet state to extension storage via injected bridge
  useEffect(() => {
    const syncToExtension = () => {
      // Use the bridge function injected by extension content script
      if (typeof window !== 'undefined' && window.__PalPaxAIExtensionBridge) {
        const isConnected = connected && !!publicKey;
        const address = publicKey ? publicKey.toString() : '';
        console.log('Website: Syncing wallet state to extension:', { isConnected, address });
        window.__PalPaxAIExtensionBridge.syncWalletState(isConnected, address);
      } else {
        console.log('Website: Extension bridge not available (extension may not be installed)');
      }
    };
    
    // Sync when wallet state changes
    syncToExtension();
  }, [connected, publicKey]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Custom smooth scroll function with navbar offset
  const smoothScrollTo = (targetId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const navbarHeight = 72; // Navbar height
      const targetPosition = targetElement.offsetTop - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    smoothScrollTo(targetId);
    // Close mobile menu if open
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.1, ease: [0.25, 0.25, 0, 1] }}
      className={`sticky top-0 z-50 w-full py-4 transition-all duration-300 ${
        isScrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-full shadow-sm px-6 py-1 flex items-center justify-between"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="flex items-center space-x-2"
            >
              <Image
                src="/logopalpaxai.png"
                alt="PalPaxAI Logo"
                width={100}
                height={100}
                className="h-16 w-auto"
                priority={true}
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Link
                href="/"
                // onClick={(e) => handleNavClick(e, "home")}
                className="text-body font-normal text-gray-700 hover:text-gray-900 transition-colors"
              >
                Home
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
            >
              <Link
                href="/marketplace"
                className="text-body font-normal text-gray-700 hover:text-gray-900 transition-colors"
              >
                Marketplace
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Link
                href="/dashboard"
                className="text-body font-normal text-gray-700 hover:text-gray-900 transition-colors"
              >
                Dashboard
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
            >
              <Link
                href="/features"
                // onClick={(e) => handleNavClick(e, "features")}
                className="text-body font-normal text-gray-700 hover:text-gray-900 transition-colors"
              >
                Features
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
            >
              <Link
                href="https://docs.palpaxai.network"
                target="_blank"
                // onClick={(e) => handleNavClick(e, "features")}
                className="text-body font-normal text-gray-700 hover:text-gray-900 transition-colors"
              >
                Docs
              </Link>
            </motion.div>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Wallet Button */}
            {!connected ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={handleConnect}
                  className="inline-flex items-center justify-center bg-midnight text-white px-5 py-2 text-body font-semibold border border-midnight rounded-full transition-colors hover:bg-midnight/90"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-3"
              >
                <div className="bg-green-50 border border-green-200 rounded-full px-4 py-2 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-700">
                    {publicKey?.toString().substring(0, 4)}...{publicKey?.toString().slice(-4)}
                  </span>
                </div>
                <button
                  onClick={handleDisconnect}
                  className="inline-flex items-center justify-center bg-white/70 text-gray-800 px-5 py-2 text-body font-normal border border-gray-200 rounded-full transition-colors hover:bg-white"
                >
                  Disconnect
                </button>
              </motion.div>
            )}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.45 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={process.env.NEXT_PUBLIC_GITHUB_URL || "#"}
                target="_blank"
                className="inline-flex items-center justify-center bg-white/70 text-gray-800 px-5 py-2 text-body font-normal border border-gray-200 rounded-full transition-colors hover:bg-white"
              >
                <Github className="w-4 h-4 mr-2" />
                Github
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden flex items-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6 text-gray-900" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6 text-gray-900" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white/10 backdrop-blur-sm border border-white/20 border-t-0 rounded-b-xl shadow-sm mx-4 sm:mx-6 lg:mx-8"
          >
            <div className="px-4 py-2 space-y-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Link
                  href="/"
                  // onClick={(e) => handleNavClick(e, "home")}
                  className="block py-2 text-body font-normal text-gray-900 hover:text-gray-600"
                >
                  Home
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.15 }}
              >
                <Link
                  href="/marketplace"
                  className="block py-2 text-body font-normal text-gray-900 hover:text-gray-600"
                >
                  Marketplace
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Link
                  href="/dashboard"
                  className="block py-2 text-body font-normal text-gray-900 hover:text-gray-600"
                >
                  Dashboard
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.25 }}
              >
                <Link
                  href="/features"
                  // onClick={(e) => handleNavClick(e, "features")}
                  className="block py-2 text-body font-normal text-gray-900 hover:text-gray-600"
                >
                  Features
                </Link>
              </motion.div>
              <div className="pt-4 flex flex-col space-y-2">
                {/* Mobile Wallet Button */}
                {!connected ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <button
                      onClick={handleConnect}
                      className="inline-flex items-center justify-center bg-midnight text-white px-5 py-2 text-body font-semibold border border-midnight rounded-full transition-colors hover:bg-midnight/90 w-full"
                    >
                      <Wallet className="w-4 h-4 mr-2" />
                      Connect Wallet
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="space-y-2"
                  >
                    <div className="bg-green-50 border border-green-200 rounded-full px-4 py-2 flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium text-green-700">
                        {publicKey?.toString().substring(0, 4)}...{publicKey?.toString().slice(-4)}
                      </span>
                    </div>
                    <button
                      onClick={handleDisconnect}
                      className="inline-flex items-center justify-center bg-white/70 text-gray-800 px-5 py-2 text-body font-normal border border-gray-200 rounded-full transition-colors hover:bg-white w-full"
                    >
                      Disconnect
                    </button>
                  </motion.div>
                )}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.35 }}
                >
                  <Link
                    href='https://github.com/PalPaxAI'
                    target="_blank"
                    className="inline-flex items-center justify-center bg-white/70 text-gray-800 px-5 py-2 text-body font-normal border border-gray-200 rounded-full transition-colors hover:bg-white w-full"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Github
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
