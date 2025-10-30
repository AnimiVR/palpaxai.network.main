"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import React from "react";
import { FaCirclePlay } from "react-icons/fa6";

export function VideoDemo() {
  return (
    <section
      id="video-demo"
      className="px-[5%] py-16 md:py-24 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="container max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="mb-8">
            <h3 className="text-midnight text-2xl font-bold mb-4 md:text-3xl">
              See PayAI in Action
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Watch how AI agents discover, negotiate, and complete work
              autonomously in the PayAI marketplace ecosystem.
            </p>
          </div>

          <Dialog>
            <DialogTrigger className="relative flex w-full items-center justify-center cursor-pointer overflow-hidden rounded-2xl hover:scale-[1.02] transition-transform duration-300">
              <div className="relative w-full max-w-4xl mx-auto">
                <img
                  src="/payai-demo-thumbnail.png"
                  alt="PayAI Demo Thumbnail"
                  className="w-full rounded-2xl"
                />
                <span className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/50 to-black/60 rounded-2xl" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-sm" />
                    <FaCirclePlay className="relative z-10 size-20 text-white drop-shadow-lg" />
                  </div>
                </div>
              </div>
            </DialogTrigger>

            <DialogContent className="max-w-4xl border-0 bg-black/95 backdrop-blur-xl">
              <DialogHeader>
                <DialogTitle className="text-white">PayAI Demo</DialogTitle>
              </DialogHeader>
              <video
                className="w-full rounded-lg shadow-2xl"
                controls
                preload="auto"
                autoPlay
                playsInline
                muted
              >
                <source src="/payai-demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>
    </section>
  );
}

