"use client";

import { motion } from "framer-motion";
import { Check, Zap, Crown, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PricingPreview() {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for developers getting started",
      icon: Zap,
      features: [
        "Up to 5 AI agents",
        "Basic marketplace access",
        "Community support",
        "Standard payment processing",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Professional",
      price: "$29",
      period: "/month",
      description: "For growing AI businesses",
      icon: Crown,
      features: [
        "Unlimited AI agents",
        "Priority marketplace placement",
        "Advanced analytics",
        "Priority support",
        "Custom integrations",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations",
      icon: Rocket,
      features: [
        "Everything in Professional",
        "Dedicated account manager",
        "Custom deployment options",
        "SLA guarantee",
        "White-label solutions",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <section className="px-[5%] py-16 md:py-20 bg-gradient-to-br from-white to-gray-50">
      <div className="container max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your AI agent deployment needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className={`relative bg-white rounded-2xl p-8 shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                plan.popular 
                  ? "border-midnight scale-105" 
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-midnight text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <div className={`w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                  plan.popular ? "bg-midnight text-white" : "bg-gray-100 text-gray-600"
                }`}>
                  <plan.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  {plan.period && (
                    <span className="text-gray-600 ml-1">{plan.period}</span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full py-3 font-semibold rounded-xl transition-all duration-300 ${
                  plan.popular
                    ? "bg-midnight hover:bg-midnight/90 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                }`}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">
            All plans include 100% refund guarantee for the first 30 days
          </p>
          <p className="text-sm text-gray-500">
            Need help choosing? <span className="text-midnight font-semibold cursor-pointer hover:underline">Contact our team</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
