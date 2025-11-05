"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Github, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
                href="/features"
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
                className="text-body font-normal text-gray-700 hover:text-gray-900 transition-colors"
              >
                Docs
              </Link>
            </motion.div>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white px-5 py-2 text-body font-normal rounded-full transition-all duration-300 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 hover:shadow-lg shadow-purple-500/50"
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Launch App
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.45 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href='https://github.com/PalPaxAI'
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
                  className="block py-2 text-body font-normal text-gray-900 hover:text-gray-600"
                >
                  Home
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Link
                  href="/features"
                  className="block py-2 text-body font-normal text-gray-900 hover:text-gray-600"
                >
                  Features
                </Link>
              </motion.div>
              <div className="pt-4 flex flex-col space-y-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white px-5 py-2 text-body font-normal rounded-full transition-all duration-300 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 hover:shadow-lg shadow-purple-500/50 w-full"
                  >
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Launch App
                  </Link>
                </motion.div>
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
