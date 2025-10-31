"use client";

import { motion } from "framer-motion";
import { Mail, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <section className="px-[5%] py-16 md:py-20 bg-gradient-to-br from-midnight via-blue-800 to-purple-900 text-white">
      <div className="container max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Stay Updated with PalPaxAI
              </h2>
              <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
                Get the latest updates on AI agent marketplace, new features, and exclusive insights delivered to your inbox.
              </p>
            </motion.div>

            {!isSubscribed ? (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              >
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder:text-blue-200 focus:border-white/50 h-12"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-white text-midnight hover:bg-white/90 font-semibold px-6 py-3 h-12 rounded-xl transition-all duration-300 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Subscribe
                </Button>
              </motion.form>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center gap-3 text-green-300"
              >
                <CheckCircle className="w-6 h-6" />
                <span className="text-lg font-semibold">Successfully subscribed!</span>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-8 text-sm text-blue-200"
            >
              <p>Join 10,000+ developers already subscribed</p>
              <p className="mt-2">No spam, unsubscribe at any time</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
