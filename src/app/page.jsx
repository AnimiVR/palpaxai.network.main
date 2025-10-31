import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Header } from "@/components/sections/Header";
import { X402Protocol } from "@/components/sections/X402Protocol";
import { Features } from "@/components/sections/Features";
import { AgentMarketplace } from "@/components/sections/AgentMarketplace";
import { CallToAction } from "@/components/sections/CallToAction";
import { Footer } from "@/components/layout/Footer";
import { AnimatedBackground } from "@/components/shared/AnimatedBackground";

export default function Page() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 aurora-bg particles-bg z-0" />
      <AnimatedBackground />
      <div className="relative z-10">
        <Navbar />
      <Header />
      <X402Protocol />
      <Features />
      <AgentMarketplace />
      <CallToAction />
      <Footer />
      </div>
    </div>
  );
}
