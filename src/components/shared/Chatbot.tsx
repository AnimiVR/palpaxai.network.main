"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const QUICK_QUESTIONS = [
  "What is PalPaxAI?",
  "How do I hire an AI agent?",
  "What is x402 protocol?",
  "How to connect my wallet?",
  "What services are available?",
  "Is PalPaxAI free to use?",
  "How does payment work?",
  "Can I sell my agent?",
  "What is Solana?",
  "How to get started?",
];

const BOT_RESPONSES: { [key: string]: string } = {
  "what is PalPaxAI": "PalPaxAI is a decentralized marketplace and payment platform for AI agents. It enables autonomous agents to transact with each other and humans using Solana blockchain and x402 protocol. PalPaxAI makes AI agent payments seamless, instant, and 24/7.",
  
  "how do i hire an ai agent": "To hire an AI agent, browse the marketplace, select a service that matches your needs, connect your Phantom wallet, and click 'Hire'. The payment will be processed instantly on Solana blockchain. The agent will start working autonomously immediately after payment.",
  
  "what is x402 protocol": "x402 is an open protocol for internet-native payments. It allows users to pay for resources via API without registration, emails, or OAuth. x402 enables micro-transactions starting from $0.01 and processes payments in under a second on Solana.",
  
  "how to connect my wallet": "Click the 'Connect Wallet' button in the navigation bar. Make sure you have Phantom wallet installed. If you don't have it, download from phantom.app. Once connected, you'll see your wallet address in the navbar.",
  
  "what services are available": "PalPaxAI marketplace offers various AI agent services including Web Development, Design, Content Writing, Data Analysis, Social Media Management, QA Testing, Blockchain Development, SEO Optimization, Video Editing, Customer Support, DevOps, and Financial Advice. Browse the marketplace to see all available agents.",
  
  "is PalPaxAI free to use": "PalPaxAI platform itself is free to use. You only pay when you hire an AI agent for a specific service. The cost varies by agent and service type, typically ranging from 0.15 SOL to 0.8 SOL per job. Network fees on Solana are minimal.",
  
  "how does payment work": "Payments on PalPaxAI use Solana blockchain for instant transactions. When you hire an agent, payment is processed immediately. Funds are escrowed until work is completed, then released automatically. All payments are transparent and secure on the blockchain.",
  
  "can i sell my agent": "Yes! You can monetize your AI agent on PalPaxAI marketplace. Create an account, list your agent's capabilities, set your price, and start earning. PalPaxAI provides tools and infrastructure for agents to offer their services 24/7 autonomously.",
  
  "what is solana": "Solana is a high-performance blockchain network that powers PalPaxAI. It enables fast, low-cost transactions perfect for micro-payments and AI agent economies. Solana processes thousands of transactions per second with minimal fees.",
  
  "how to get started": "Getting started is easy! 1) Install Phantom wallet, 2) Connect your wallet on PalPaxAI, 3) Browse the marketplace to find agents, 4) Hire an agent and make your first payment. You can also start selling your own agent services. Visit our documentation for detailed guides.",
};

function getBotResponse(message: string): string {
  const lowerMessage = message.toLowerCase().trim();
  
  // Check for exact matches
  if (BOT_RESPONSES[lowerMessage]) {
    return BOT_RESPONSES[lowerMessage];
  }
  
  // Check for partial matches
  for (const [key, value] of Object.entries(BOT_RESPONSES)) {
    if (lowerMessage.includes(key) || key.includes(lowerMessage)) {
      return value;
    }
  }
  
  // Default response
  return "I'm PalPaxAI Assistant, here to help you with questions about our AI agent marketplace, x402 protocol, and payment system. Try asking about services, how to hire agents, or connecting your wallet. For more specific questions, feel free to browse our documentation.";
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm PalPaxAI Assistant. How can I help you today? You can ask me about our services, payments, or how to get started!",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue.trim());
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    // Auto send after setting value
    setTimeout(() => {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: question,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setInputValue("");
      setIsTyping(true);

      setTimeout(() => {
        const botResponse = getBotResponse(question);
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: botResponse,
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
      }, 1000);
    }, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        className="fixed bottom-6 right-6 z-50"
      >
        <AnimatePresence>
          {!isOpen ? (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 rounded-full bg-gradient-to-br from-primary via-primary to-blue-600 text-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 group"
            >
              <MessageCircle className="h-6 w-6" />
              {messages.length === 1 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs">1</span>
                </span>
              )}
              <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20 group-hover:opacity-40"></div>
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden z-50"
            >
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-primary via-primary to-blue-600 text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">PalPaxAI Assistant</div>
                    <p className="text-xs text-blue-100">AI-powered help</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.sender === "bot" && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                        message.sender === "user"
                          ? "bg-primary text-white rounded-br-sm"
                          : "bg-white text-gray-800 border border-gray-200 rounded-bl-sm"
                      }`}
                    >
                      <p className="text-s leading-relaxed whitespace-pre-wrap">
                        {message.text}
                      </p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === "user"
                            ? "text-white/70"
                            : "text-gray-400"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    {message.sender === "user" && (
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-gray-600" />
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3 justify-start"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-2.5">
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Questions */}
              {messages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="px-4 pb-2 border-t border-gray-200 bg-white"
                >
                  <p className="text-xs text-gray-500 mb-2 px-2">Quick questions:</p>
                  <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
                    {QUICK_QUESTIONS.slice(0, 5).map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickQuestion(question)}
                        className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-primary hover:text-white rounded-full transition-all duration-200 border border-gray-200 hover:border-primary"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Input Area */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex gap-2">
                  <Input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about PalPaxAI..."
                    className="flex-1 text-sm border-gray-300 focus:border-primary rounded-xl"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="bg-primary hover:bg-primary/90 text-white px-4 rounded-xl"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {QUICK_QUESTIONS.slice(0, 5).map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      className="text-xs px-2.5 py-1 bg-gray-50 hover:bg-primary/10 hover:text-primary rounded-lg transition-all duration-200 border border-gray-200 hover:border-primary/30 text-gray-600"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

