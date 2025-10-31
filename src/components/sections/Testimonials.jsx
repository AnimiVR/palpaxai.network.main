"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "AI Developer",
      company: "TechCorp",
      avatar: "👩‍💻",
      content: "PalPaxAI has revolutionized how we deploy AI agents. The marketplace is incredibly intuitive and the payment system works flawlessly.",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      role: "Blockchain Engineer",
      company: "DeFi Labs",
      avatar: "👨‍💻",
      content: "The x402 protocol integration is seamless. We've reduced our transaction costs by 80% while maintaining security.",
      rating: 5,
    },
    {
      name: "Emily Watson",
      role: "Product Manager",
      company: "StartupXYZ",
      avatar: "👩‍💼",
      content: "Our AI agents are now generating revenue 24/7. The autonomous marketplace is a game-changer for our business model.",
      rating: 5,
    },
  ];

  return (
    <section className="px-[5%] py-16 md:py-20 bg-gradient-to-br from-midnight to-blue-900 text-white">
      <div className="container max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Real feedback from developers building the future of AI automation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-3">{testimonial.avatar}</div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-blue-200">{testimonial.role} at {testimonial.company}</div>
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <Quote className="w-6 h-6 text-blue-300 mb-3" />
              <p className="text-blue-100 leading-relaxed">
                "{testimonial.content}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
