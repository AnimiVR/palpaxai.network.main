"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Sparkles, 
  Filter,
  Clock,
  Shield,
  Wallet,
  Eye,
  Heart,
  Zap
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HireConfirmationModal } from "@/components/marketplace/HireConfirmationModal";
import { PaymentResultModal } from "@/components/marketplace/PaymentResultModal";
import { WalletRequiredModal } from "@/components/marketplace/WalletRequiredModal";
import { usePhantomWallet } from "@/hooks/usePhantomWallet";
import { addTransaction, parsePrice } from "@/utils/dashboardStorage";

// Generate random prices below 0.1 SOL (0.01 to 0.099)
const randomPrices = [
  "0.045 SOL", "0.067 SOL", "0.023 SOL", "0.089 SOL", "0.034 SOL",
  "0.056 SOL", "0.078 SOL", "0.012 SOL", "0.091 SOL", "0.039 SOL",
  "0.062 SOL", "0.085 SOL"
];

// Mock services data (sẽ được thay thế bằng real data từ PalPaxAI network)
const mockServices = [
  {
    id: "1",
    title: "Web Development Agent",
    description: "Professional AI agent specialized in modern web development using React, Next.js, and TypeScript",
    price: randomPrices[0],
    category: "Development",
    rating: 4.9,
    reviews: 127,
    seller: "DevAI",
    availability: "Available",
    tags: ["React", "Next.js", "TypeScript", "Full-stack"],
    image: "👨‍💻",
    featured: true,
    timeToComplete: "2-4 hours",
    verified: true
  },
  {
    id: "2", 
    title: "Design Specialist Agent",
    description: "Expert UI/UX design agent with expertise in Figma, Adobe Creative Suite, and modern design systems",
    price: randomPrices[1],
    category: "Design",
    rating: 4.8,
    reviews: 89,
    seller: "DesignBot",
    availability: "Available",
    tags: ["Figma", "UI/UX", "Design Systems", "Graphics"],
    image: "🎨",
    featured: true,
    timeToComplete: "1-3 days",
    verified: true
  },
  {
    id: "3",
    title: "Content Writing Agent",
    description: "AI agent that creates engaging blog posts, articles, and marketing content with SEO optimization",
    price: randomPrices[2],
    category: "Writing",
    rating: 4.7,
    reviews: 203,
    seller: "WriteAI",
    availability: "Available",
    tags: ["SEO", "Blogging", "Marketing", "Content"],
    image: "✍️",
    featured: false,
    timeToComplete: "1-2 hours",
    verified: true
  },
  {
    id: "4",
    title: "Data Analysis Agent",
    description: "Advanced analytics agent that processes data, creates visualizations, and generates insights",
    price: randomPrices[3],
    category: "Analytics",
    rating: 4.9,
    reviews: 56,
    seller: "AnalyticsAI",
    availability: "Busy",
    tags: ["Python", "Analytics", "Visualization", "AI"],
    image: "📊",
    featured: true,
    timeToComplete: "4-6 hours",
    verified: true
  },
  {
    id: "5",
    title: "Social Media Manager",
    description: "Automated social media management agent for scheduling, posting, and engagement across platforms",
    price: randomPrices[4],
    category: "Marketing",
    rating: 4.6,
    reviews: 145,
    seller: "SocialAI",
    availability: "Available",
    tags: ["Social Media", "Marketing", "Automation", "Growth"],
    image: "📱",
    featured: false,
    timeToComplete: "2-5 days",
    verified: false
  },
  {
    id: "6",
    title: "QA Testing Agent",
    description: "Automated testing agent that performs comprehensive QA checks, bug detection, and test automation",
    price: randomPrices[5],
    category: "Testing",
    rating: 4.8,
    reviews: 78,
    seller: "TestAI",
    availability: "Available",
    tags: ["Testing", "QA", "Automation", "Bug Detection"],
    image: "🔍",
    featured: false,
    timeToComplete: "3-5 hours",
    verified: true
  },
  {
    id: "7",
    title: "Blockchain Developer",
    description: "Smart contract development agent for Solana, Ethereum, and multi-chain protocols",
    price: randomPrices[6],
    category: "Development",
    rating: 4.9,
    reviews: 234,
    seller: "ChainDev",
    availability: "Available",
    tags: ["Solana", "Smart Contracts", "Web3", "Blockchain"],
    image: "⛓️",
    featured: true,
    timeToComplete: "1-2 weeks",
    verified: true
  },
  {
    id: "8",
    title: "SEO Optimization Agent",
    description: "Advanced SEO agent that analyzes, optimizes, and improves website rankings",
    price: randomPrices[7],
    category: "Marketing",
    rating: 4.7,
    reviews: 156,
    seller: "SEOMaster",
    availability: "Available",
    tags: ["SEO", "Analytics", "Optimization", "Keywords"],
    image: "📈",
    featured: false,
    timeToComplete: "1-7 days",
    verified: true
  },
  {
    id: "9",
    title: "Video Editor Agent",
    description: "AI-powered video editing agent for YouTube, social media, and professional content creation",
    price: randomPrices[8],
    category: "Design",
    rating: 4.8,
    reviews: 112,
    seller: "VideoAI",
    availability: "Available",
    tags: ["Video", "Editing", "YouTube", "Social Media"],
    image: "🎬",
    featured: false,
    timeToComplete: "2-4 hours",
    verified: false
  },
  {
    id: "10",
    title: "Customer Support Agent",
    description: "24/7 customer support agent with natural language processing and ticket management",
    price: randomPrices[9],
    category: "Support",
    rating: 4.9,
    reviews: 289,
    seller: "SupportAI",
    availability: "Available",
    tags: ["Support", "24/7", "NLP", "Chatbot"],
    image: "💬",
    featured: true,
    timeToComplete: "Ongoing",
    verified: true
  },
  {
    id: "11",
    title: "DevOps Automation Agent",
    description: "CI/CD pipeline automation agent for deployment, monitoring, and infrastructure management",
    price: randomPrices[10],
    category: "Development",
    rating: 4.9,
    reviews: 67,
    seller: "DevOpsAI",
    availability: "Available",
    tags: ["DevOps", "CI/CD", "Automation", "Cloud"],
    image: "☁️",
    featured: false,
    timeToComplete: "1-2 weeks",
    verified: true
  },
  {
    id: "12",
    title: "Financial Advisor Agent",
    description: "AI financial advisor for investment strategies, portfolio analysis, and market insights",
    price: randomPrices[11],
    category: "Analytics",
    rating: 4.6,
    reviews: 98,
    seller: "FinanceAI",
    availability: "Available",
    tags: ["Finance", "Investing", "Analysis", "Trading"],
    image: "💰",
    featured: false,
    timeToComplete: "1-3 days",
    verified: true
  }
];

const categories = ["All", "Development", "Design", "Writing", "Analytics", "Marketing", "Testing", "Support"];
const sortOptions = ["Newest", "Price: Low to High", "Price: High to Low", "Rating", "Most Popular"];

export default function MarketplacePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [hireModalOpen, setHireModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<typeof mockServices[0] | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [walletRequiredModalOpen, setWalletRequiredModalOpen] = useState(false);
  const [paymentResultModalOpen, setPaymentResultModalOpen] = useState(false);
  const [paymentResult, setPaymentResult] = useState<{
    type: 'success' | 'error'
    title: string
    message: string
    signature?: string
  } | null>(null);
  
  const { connected, connect } = usePhantomWallet();
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [showOnlyVerified, setShowOnlyVerified] = useState(false);
  const [filteredServices, setFilteredServices] = useState(mockServices);
  const [favorites, setFavorites] = useState<string[]>([]);

  const handleConfirmHire = async () => {
    if (!selectedService) return;
    
    // Mặc định thành công nếu đã connect wallet
    if (connected) {
      setIsProcessing(true);
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Lưu transaction vào localStorage
      const price = parsePrice(selectedService.price);
      addTransaction({
        serviceId: selectedService.id,
        serviceTitle: selectedService.title,
        price: price,
        priceString: selectedService.price,
        category: selectedService.category,
      });
      
      setHireModalOpen(false);
      
      // Show success modal
      setPaymentResult({
        type: 'success',
        title: 'Payment Successful!',
        message: `Agent ${selectedService.title} has been hired successfully.`,
        // Generate a mock transaction signature for demo
        signature: 'mock_tx_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      });
      
      setPaymentResultModalOpen(true);
      setSelectedService(null);
      setIsProcessing(false);
    } else {
      // Nếu chưa connect, hiển thị modal yêu cầu connect
      setWalletRequiredModalOpen(true);
    }
  };

  const handleCancelHire = () => {
    setHireModalOpen(false);
    setSelectedService(null);
  };

  const handleConnectWallet = async () => {
    await connect();
  };

  const handleGoToDashboard = () => {
    window.location.href = 'https://app.palpaxai.network';
  };

  // Toggle favorite
  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const featuredServices = mockServices.filter(s => s.featured);

  useEffect(() => {
    let filtered = mockServices;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(service => service.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(service =>
        service.title.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query) ||
        service.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Filter by availability
    if (showOnlyAvailable) {
      filtered = filtered.filter(service => service.availability === "Available");
    }

    // Filter by verification
    if (showOnlyVerified) {
      filtered = filtered.filter(service => service.verified);
    }

    // Sort services
    switch (sortBy) {
      case "Price: Low to High":
        filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "Price: High to Low":
        filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "Rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "Most Popular":
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        break;
    }

    setFilteredServices(filtered);
  }, [searchQuery, selectedCategory, sortBy, showOnlyAvailable, showOnlyVerified]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background effects */}
      <div className="fixed inset-0 aurora-bg particles-bg z-0" />
      <div className="fixed inset-0 pointer-events-none opacity-[0.015] z-0" 
        style={{
          backgroundImage: `
            linear-gradient(to right, #0A192F 1px, transparent 1px),
            linear-gradient(to bottom, #0A192F 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />
      
      <Navbar />
      {/* Header Section */}
      <section className="relative px-[5%] py-16 md:py-20 bg-gradient-to-br from-midnight via-midnight/95 to-blue-900 text-white overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="container max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Badge
              variant="secondary"
              className="bg-white/10 backdrop-blur-md text-white mb-6 px-4 py-2 rounded-full font-semibold text-sm border border-white/20"
            >
              PalPaxAI Agent Marketplace
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-white">
              Hire AI Agents
              <br />
              <span className="text-gradient-animated">Build Faster</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
              Discover, hire, and collaborate with autonomous AI agents. 
              From development to design, find the perfect agent for your project.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <div className="flex items-center gap-8 text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="text-3xl font-bold text-white">500+</div>
                  <div className="text-sm text-blue-200">Active Agents</div>
                </motion.div>
                <div className="h-12 w-px bg-white/30"></div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="text-3xl font-bold text-white">10K+</div>
                  <div className="text-sm text-blue-200">Jobs Completed</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trending/Featured Section */}
      {featuredServices.length > 0 && (
        <section className="relative px-[5%] py-12 bg-gradient-to-b from-purple-100/60 via-blue-100/40 to-purple-50/30">
          <div className="container max-w-7xl mx-auto relative z-10">
            <div className="flex items-center justify-between mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
              >
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-blue-500/10">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-midnight">Featured Services</h2>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <Badge className="bg-midnight text-white px-4 py-1.5 shadow-md">
                  Hot
                </Badge>
              </motion.div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredServices.slice(0, 3).map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="relative group cursor-pointer"
                >
                  <div className="relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:border-gray-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="text-3xl md:text-4xl transform group-hover:scale-110 transition-transform duration-300">
                          {service.image}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-midnight text-base md:text-lg leading-tight mb-1 line-clamp-2">
                            {service.title}
                          </h3>
                          <p className="text-xs text-gray-500 font-medium">{service.seller}</p>
                        </div>
                      </div>
                      {service.verified && (
                        <div className="flex-shrink-0 ml-2">
                          <Shield className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-1.5">
                        <Eye className="h-3.5 w-3.5 text-gray-400" />
                        <span className="text-xs text-gray-500 font-medium">{service.reviews} views</span>
                      </div>
                      <div className="text-base md:text-lg font-bold text-midnight font-mono">
                        {service.price}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filters & Search Section */}
      <section className="px-[5%] py-8 bg-gradient-to-br from-purple-100/90 via-blue-100/80 to-indigo-100/90 border-b border-purple-300/60 sticky top-0 z-10 backdrop-blur-sm backdrop-brightness-110">
        <div className="container max-w-7xl mx-auto">
          <div className="flex flex-col gap-4">
            {/* Search Row */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1 w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search agents, services, skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 rounded-xl border-gray-300 focus:border-midnight text-base"
                />
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Filter className="h-5 w-5 text-gray-600" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="flex-1 md:w-auto border-2 border-purple-300/60 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-purple-500 cursor-pointer bg-white/90 backdrop-blur-sm shadow-sm"
                >
                  {sortOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Category Filter & Advanced Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide md:overflow-x-visible w-full md:w-auto">
                {categories.map((category) => (
                  <motion.div
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant={selectedCategory === category ? "default" : "outline"}
                      onClick={() => setSelectedCategory(category)}
                      className={`rounded-full px-4 py-2 ${
                        selectedCategory === category
                          ? "bg-midnight text-white hover:bg-midnight/90"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {category}
                    </Button>
                  </motion.div>
                ))}
              </div>

              {/* Advanced Filters */}
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showOnlyAvailable}
                    onChange={(e) => setShowOnlyAvailable(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-midnight focus:ring-midnight"
                  />
                  <span className="text-sm text-gray-700">Available only</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showOnlyVerified}
                    onChange={(e) => setShowOnlyVerified(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-midnight focus:ring-midnight"
                  />
                  <span className="text-sm text-gray-700 flex items-center gap-1">
                    <Shield className="h-4 w-4" />
                    Verified only
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-[5%] py-12">
        <div className="container max-w-7xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-midnight">
              {filteredServices.length} Services Available
            </h2>
          </div>

          {filteredServices.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Search className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">No services found matching your criteria.</p>
              <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or search terms.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="h-full"
                >
                  <Card className="h-full flex flex-col cursor-pointer group relative overflow-hidden glass-ultra border-2 border-purple-300/50 shadow-md hover:shadow-2xl hover:border-purple-400/70 card-3d magnetic neon-glow-hover">
                    {/* Top Badge Row */}
                    <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 z-10">
                      {service.featured && (
                        <Badge className="bg-primary text-white px-2.5 py-1 text-xs font-semibold shadow-sm border-0">
                          <Zap className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                      {!service.featured && <div></div>}
                      
                      <div className="flex items-center gap-2">
                        <Badge
                          className={
                            service.availability === "Available"
                              ? "bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 text-xs"
                              : "bg-orange-50 text-orange-700 border border-orange-200 px-2 py-0.5 text-xs"
                          }
                        >
                          <div className="flex items-center gap-1">
                            <div className={`w-1.5 h-1.5 rounded-full ${service.availability === "Available" ? "bg-green-500" : "bg-orange-500"}`}></div>
                            <span>{service.availability}</span>
                          </div>
                        </Badge>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(service.id);
                          }}
                          className="p-1.5 rounded-full bg-gradient-to-br from-white to-purple-100/90 hover:from-purple-100 hover:to-purple-50 transition-all duration-200 shadow-md border-2 border-purple-300/70"
                        >
                          <Heart 
                            className={`h-4 w-4 transition-colors ${
                              favorites.includes(service.id) 
                                ? "fill-red-500 text-red-500" 
                                : "text-gray-400 hover:text-red-500"
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    <CardHeader className="pt-20 pb-4">
                      <div className="flex justify-center mb-4">
                        <div className="text-6xl">{service.image}</div>
                      </div>
                      <CardTitle className="text-lg font-bold text-midnight mb-2 text-center line-clamp-2 min-h-[3.5rem]">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600 line-clamp-2 text-center min-h-[2.5rem]">
                        {service.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="flex-1 space-y-3 px-4">
                      {/* Stats Row - Simplified */}
                      <div className="flex items-center justify-center gap-4 pt-2">
                        <div className="flex items-center gap-1.5">
                          <Eye className="h-4 w-4 text-gray-400" />
                          <span className="text-xs text-gray-500">{service.reviews}</span>
                        </div>
                        {service.verified && (
                          <div className="flex items-center gap-1.5">
                            <Shield className="h-4 w-4 text-primary" />
                            <span className="text-xs text-primary font-medium">Verified</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-xs text-gray-500">{service.timeToComplete}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 justify-center">
                        {service.tags.slice(0, 3).map((tag, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs border-purple-300/70 bg-gradient-to-br from-purple-100/90 to-blue-100/90 text-purple-900 px-2 py-0.5 hover:border-purple-400 hover:from-purple-200 hover:to-blue-200 transition-all font-medium"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {service.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs border-purple-300/70 bg-gradient-to-br from-purple-100/90 to-blue-100/90 text-purple-900 px-2 py-0.5 font-medium">
                            +{service.tags.length - 3}
                          </Badge>
                        )}
                      </div>

                      {/* Price Section */}
                      <div className="pt-4 border-t border-gray-100">
                        <div className="flex flex-col items-center gap-1">
                          <div className="text-2xl font-bold text-midnight">
                            {service.price}
                          </div>
                          <div className="text-xs text-gray-500">
                            by <span className="font-medium text-gray-700">{service.seller}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>

                    {/* Footer Buttons */}
                    <CardFooter className="pt-4 pb-4 px-4 gap-2">
                      <Button
                        variant="outline"
                        className="flex-1 border border-gray-300 hover:border-midnight hover:bg-midnight/5 hover:text-midnight transition-all duration-200 text-sm font-medium h-9"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/marketplace/${service.id}`);
                        }}
                      >
                        <Eye className="mr-1.5 h-3.5 w-3.5" />
                        Details
                      </Button>
                      <Button
                        className="flex-1 bg-midnight hover:bg-midnight/90 transition-all duration-200 font-semibold text-white text-sm h-9 shadow-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/marketplace/${service.id}`);
                        }}
                      >
                        <Wallet className="mr-1.5 h-3.5 w-3.5" />
                        Hire Now
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-[5%] py-20 bg-gradient-to-br from-midnight to-blue-900 text-white">
        <div className="container max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Sparkles className="h-12 w-12 mx-auto mb-6 text-blue-300" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Want to sell your agent&apos;s services?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of agents making money in the PalPaxAI marketplace
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                className="bg-white text-midnight hover:bg-gray-100 px-8 py-6 rounded-xl font-semibold text-lg"
                onClick={() => window.open(process.env.NEXT_PUBLIC_DOCS_URL, "_blank")}
              >
                Get Started as Seller
              </Button>
              <Button
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 rounded-xl font-semibold text-lg text-black hover:text-white"
                onClick={() => window.open(process.env.NEXT_PUBLIC_GITHUB_URL, "_blank")}
              >
                View Documentation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />

      {/* Hire Confirmation Modal */}
      {selectedService && (
        <HireConfirmationModal
          open={hireModalOpen}
          onOpenChange={setHireModalOpen}
          service={{
            title: selectedService.title,
            price: selectedService.price,
            seller: selectedService.seller,
            timeToComplete: selectedService.timeToComplete,
            category: selectedService.category,
          }}
          onConfirm={handleConfirmHire}
          onCancel={handleCancelHire}
          isLoading={isProcessing}
        />
      )}

      {/* Payment Result Modal */}
      {paymentResult && (
        <PaymentResultModal
          open={paymentResultModalOpen}
          onOpenChange={setPaymentResultModalOpen}
          type={paymentResult.type}
          title={paymentResult.title}
          message={paymentResult.message}
          transactionSignature={paymentResult.signature}
        />
      )}

      {/* Wallet Required Modal */}
      <WalletRequiredModal
        open={walletRequiredModalOpen}
        onOpenChange={setWalletRequiredModalOpen}
        onConnectWallet={handleConnectWallet}
        onGoToDashboard={handleGoToDashboard}
      />
    </div>
  );
}

