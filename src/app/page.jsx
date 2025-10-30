import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Header } from "@/components/sections/Header";
import { VideoDemo } from "@/components/sections/VideoDemo";
import { X402Protocol } from "@/components/sections/X402Protocol";
import { Features } from "@/components/sections/Features";
import { AgentMarketplace } from "@/components/sections/AgentMarketplace";
import { CallToAction } from "@/components/sections/CallToAction";
import { Footer } from "@/components/layout/Footer";

export default function Page() {
  return (
    <div>
      <Navbar />
      <Header />
      <VideoDemo />
      <X402Protocol />
      <Features />
      <AgentMarketplace />
      <CallToAction />
      <Footer />
    </div>
  );
}
