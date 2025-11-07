"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Navbar,
} from "@/components/layout/Navbar";
import {
  Footer,
} from "@/components/layout/Footer";
import {
  ArrowLeft,
  Clock,
  Shield,
  Eye,
  Wallet,
  CheckCircle2,
  Star,
  Calendar,
  User,
  Tag,
  TrendingUp,
  MessageSquare,
  ThumbsUp,
  Globe,
} from "lucide-react";
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

// Mock services data (same as marketplace page)
const mockServices = [
  {
    id: "1",
    title: "Web Development Agent",
    description: "Professional AI agent specialized in modern web development using React, Next.js, and TypeScript. Delivers high-quality, scalable applications with clean code practices and modern development standards.",
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
    verified: true,
    location: "Global",
    languages: ["English", "Spanish"],
    responseTime: "Within 1 hour",
  },
  {
    id: "2",
    title: "Design Specialist Agent",
    description: "Expert UI/UX design agent with expertise in Figma, Adobe Creative Suite, and modern design systems. Creates beautiful, user-friendly interfaces that convert.",
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
    verified: true,
    location: "Global",
    languages: ["English"],
    responseTime: "Within 2 hours",
  },
  {
    id: "3",
    title: "Content Writing Agent",
    description: "AI agent that creates engaging blog posts, articles, and marketing content with SEO optimization. Perfect for content marketing and SEO strategies.",
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
    verified: true,
    location: "Global",
    languages: ["English", "French"],
    responseTime: "Within 30 minutes",
  },
  {
    id: "4",
    title: "Data Analysis Agent",
    description: "Advanced analytics agent that processes data, creates visualizations, and generates insights. Perfect for business intelligence and data-driven decisions.",
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
    verified: true,
    location: "Global",
    languages: ["English"],
    responseTime: "Within 3 hours",
  },
  {
    id: "5",
    title: "Social Media Manager",
    description: "Automated social media management agent for scheduling, posting, and engagement across platforms. Manages your social presence 24/7.",
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
    verified: false,
    location: "Global",
    languages: ["English"],
    responseTime: "Within 1 hour",
  },
  {
    id: "6",
    title: "QA Testing Agent",
    description: "Automated testing agent that performs comprehensive QA checks, bug detection, and test automation. Ensures your applications are bug-free.",
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
    verified: true,
    location: "Global",
    languages: ["English"],
    responseTime: "Within 1 hour",
  },
  {
    id: "7",
    title: "Blockchain Developer",
    description: "Smart contract development agent for Solana, Ethereum, and multi-chain protocols. Expert in DeFi, NFTs, and Web3 development.",
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
    verified: true,
    location: "Global",
    languages: ["English"],
    responseTime: "Within 2 hours",
  },
  {
    id: "8",
    title: "SEO Optimization Agent",
    description: "Advanced SEO agent that analyzes, optimizes, and improves website rankings. Implements best SEO practices for maximum visibility.",
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
    verified: true,
    location: "Global",
    languages: ["English"],
    responseTime: "Within 2 hours",
  },
  {
    id: "9",
    title: "Video Editor Agent",
    description: "AI-powered video editing agent for YouTube, social media, and professional content creation. Creates engaging videos that capture attention.",
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
    verified: false,
    location: "Global",
    languages: ["English"],
    responseTime: "Within 1 hour",
  },
  {
    id: "10",
    title: "Customer Support Agent",
    description: "24/7 customer support agent with natural language processing and ticket management. Provides instant, helpful customer service.",
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
    verified: true,
    location: "Global",
    languages: ["English", "Spanish", "French"],
    responseTime: "Instant",
  },
  {
    id: "11",
    title: "DevOps Automation Agent",
    description: "CI/CD pipeline automation agent for deployment, monitoring, and infrastructure management. Streamlines your development workflow.",
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
    verified: true,
    location: "Global",
    languages: ["English"],
    responseTime: "Within 2 hours",
  },
  {
    id: "12",
    title: "Financial Advisor Agent",
    description: "AI financial advisor for investment strategies, portfolio analysis, and market insights. Helps make informed financial decisions.",
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
    verified: true,
    location: "Global",
    languages: ["English"],
    responseTime: "Within 1 hour",
  },
];

// Mock reviews data
const generateReviews = (serviceId: string) => {
  const reviewTemplates: Record<string, Array<{name: string, rating: number, comment: string, date: string, helpful: number}>> = {
    "1": [
      { name: "Alex Johnson", rating: 5, comment: "Excellent web development agent! Delivered a fully functional React app in just 2 days. Code quality was outstanding and the agent was very responsive.", date: "2 days ago", helpful: 24 },
      { name: "Sarah Chen", rating: 5, comment: "This agent saved me so much time. The Next.js setup was perfect and included all the best practices. Highly recommend!", date: "1 week ago", helpful: 18 },
      { name: "Michael Brown", rating: 4, comment: "Great service overall. The agent was professional and delivered on time. Minor issue with TypeScript configuration but was quickly resolved.", date: "2 weeks ago", helpful: 12 },
      { name: "Emma Wilson", rating: 5, comment: "Amazing experience! The agent understood my requirements perfectly and exceeded expectations. Will definitely use again.", date: "3 weeks ago", helpful: 31 },
      { name: "David Lee", rating: 4, comment: "Solid development work. The agent was knowledgeable about modern React patterns. Only wish it was a bit faster, but quality was top-notch.", date: "1 month ago", helpful: 9 },
    ],
    "2": [
      { name: "Lisa Martinez", rating: 5, comment: "Stunning designs! The UI/UX work was professional and modern. The agent created beautiful mockups that perfectly matched my vision.", date: "3 days ago", helpful: 19 },
      { name: "James Taylor", rating: 5, comment: "Best design agent I've used. The Figma files were well-organized and the design system was comprehensive. Absolutely worth it!", date: "1 week ago", helpful: 15 },
      { name: "Olivia Davis", rating: 4, comment: "Great design work, though I needed a few revisions. The agent was patient and made all the changes I requested. Good value for money.", date: "2 weeks ago", helpful: 8 },
    ],
  };
  return reviewTemplates[serviceId] || [
    { name: "John Doe", rating: 5, comment: "Excellent service! Highly recommended.", date: "1 week ago", helpful: 5 },
    { name: "Jane Smith", rating: 4, comment: "Good quality work, delivered on time.", date: "2 weeks ago", helpful: 3 },
  ];
};

// Mock seller information
const sellerInfo: Record<string, {name: string, rating: number, totalSales: number, memberSince: string, responseRate: string, description: string, location: string}> = {
  "DevAI": { name: "DevAI", rating: 4.9, totalSales: 1247, memberSince: "Jan 2023", responseRate: "98%", description: "Professional development team specializing in modern web technologies.", location: "San Francisco, USA" },
  "DesignBot": { name: "DesignBot", rating: 4.8, totalSales: 892, memberSince: "Mar 2023", responseRate: "95%", description: "Creative design agency focused on UI/UX excellence.", location: "New York, USA" },
  "WriteAI": { name: "WriteAI", rating: 4.7, totalSales: 2103, memberSince: "Dec 2022", responseRate: "99%", description: "Content creation specialists with SEO expertise.", location: "London, UK" },
  "AnalyticsAI": { name: "AnalyticsAI", rating: 4.9, totalSales: 567, memberSince: "Feb 2023", responseRate: "97%", description: "Data analytics experts providing actionable insights.", location: "Berlin, Germany" },
  "SocialAI": { name: "SocialAI", rating: 4.6, totalSales: 1456, memberSince: "Nov 2022", responseRate: "96%", description: "Social media management professionals.", location: "Toronto, Canada" },
  "TestAI": { name: "TestAI", rating: 4.8, totalSales: 789, memberSince: "Apr 2023", responseRate: "94%", description: "QA testing specialists ensuring bug-free applications.", location: "Sydney, Australia" },
  "ChainDev": { name: "ChainDev", rating: 4.9, totalSales: 1234, memberSince: "Jan 2023", responseRate: "98%", description: "Blockchain development experts for Web3 projects.", location: "Singapore" },
  "SEOMaster": { name: "SEOMaster", rating: 4.7, totalSales: 1567, memberSince: "Dec 2022", responseRate: "97%", description: "SEO optimization specialists improving search rankings.", location: "Mumbai, India" },
  "VideoAI": { name: "VideoAI", rating: 4.8, totalSales: 1123, memberSince: "Mar 2023", responseRate: "95%", description: "Video editing professionals creating engaging content.", location: "Los Angeles, USA" },
  "SupportAI": { name: "SupportAI", rating: 4.9, totalSales: 2890, memberSince: "Nov 2022", responseRate: "99%", description: "24/7 customer support solutions.", location: "Global" },
  "DevOpsAI": { name: "DevOpsAI", rating: 4.9, totalSales: 678, memberSince: "Feb 2023", responseRate: "96%", description: "DevOps automation experts streamlining workflows.", location: "Seattle, USA" },
  "FinanceAI": { name: "FinanceAI", rating: 4.6, totalSales: 987, memberSince: "May 2023", responseRate: "93%", description: "Financial analysis and investment advisory services.", location: "Zurich, Switzerland" },
};

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const serviceId = params?.id as string;
  const service = mockServices.find((s) => s.id === serviceId);
  const [hireModalOpen, setHireModalOpen] = useState(false);
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

  const handleHireAgent = async () => {
    if (!service) return;
    
    // Nếu chưa connect wallet, hiển thị modal yêu cầu connect
    if (!connected) {
      setWalletRequiredModalOpen(true);
      return;
    }
    
    // Nếu đã connect, hiển thị confirmation modal
    setHireModalOpen(true);
  };

  const handleConfirmHire = async () => {
    if (!service) return;
    
    // Mặc định thành công nếu đã connect wallet
    if (connected) {
      setIsProcessing(true);
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Lưu transaction vào localStorage
      const price = parsePrice(service.price);
      addTransaction({
        serviceId: service.id,
        serviceTitle: service.title,
        price: price,
        priceString: service.price,
        category: service.category,
      });
      
      setHireModalOpen(false);
      
      // Show success modal
      setPaymentResult({
        type: 'success',
        title: 'Payment Successful!',
        message: `Agent ${service.title} has been hired successfully.`,
        // Generate a mock transaction signature for demo
        signature: 'mock_tx_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      });
      
      setPaymentResultModalOpen(true);
      setIsProcessing(false);
    } else {
      // Nếu chưa connect, hiển thị modal yêu cầu connect
      setWalletRequiredModalOpen(true);
    }
  };

  const handleCancelHire = () => {
    setHireModalOpen(false);
  };

  const handleConnectWallet = async () => {
    await connect();
  };

  const handleGoToDashboard = () => {
    window.location.href = 'https://app.palpaxai.network';
  };

  if (!service) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-midnight mb-4">Service Not Found</h1>
            <Button onClick={() => router.push("/marketplace")} className="bg-midnight text-white">
              Back to Marketplace
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100/50 via-blue-100/30 to-purple-50/20">
      <Navbar />
      
      {/* Header Section */}
      <section className="px-[5%] py-8 bg-gradient-to-br from-midnight via-midnight/95 to-blue-900 text-white">
        <div className="container max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="mb-6 text-white hover:bg-white/10"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  {service.featured && (
                    <Badge className="bg-primary text-white px-3 py-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                  <Badge
                    className={
                      service.availability === "Available"
                        ? "bg-green-500 text-white"
                        : "bg-orange-500 text-white"
                    }
                  >
                    {service.availability}
                  </Badge>
                  {service.verified && (
                    <Badge className="bg-blue-500 text-white">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-600">{service.title}</h1>
                <p className="text-xl text-blue-100 mb-6 max-w-3xl">{service.description}</p>
                
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>by {service.seller}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{service.rating} ({service.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    <span>{service.category}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <div className="text-center md:text-right">
                  <div className="text-5xl mb-4">{service.image}</div>
                  <div className="text-4xl font-bold mb-2">{service.price}</div>
                  <p className="text-blue-200 text-sm mb-6">One-time payment</p>
                  <Button
                    size="lg"
                    className="bg-white text-midnight hover:bg-gray-100 w-full md:w-auto px-8 py-6 text-lg font-semibold"
                    onClick={handleHireAgent}
                  >
                    <Wallet className="mr-2 h-5 w-5" />
                    Hire Now
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-[5%] py-12">
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* About Section */}
              <Card className="bg-gradient-to-br from-purple-50/90 via-blue-50/80 to-indigo-50/90 border-2 border-purple-200/70 shadow-lg">
                <CardHeader>
                  <CardTitle>About This Service</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="font-semibold text-midnight mb-3">What&apos;s Included</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Professional quality delivery</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Quick response time</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Revisions available if needed</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">24/7 autonomous operation</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Tags Section */}
              <Card className="bg-gradient-to-br from-indigo-50/90 via-purple-50/80 to-blue-50/90 border-2 border-indigo-200/70 shadow-lg">
                <CardHeader>
                  <CardTitle>Skills & Technologies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="text-sm px-3 py-1 border-2 border-purple-300/80 bg-gradient-to-br from-purple-100/95 to-indigo-100/95 hover:border-purple-400 hover:from-purple-200 hover:to-indigo-200 transition-all text-purple-900 font-medium shadow-sm"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Reviews Section */}
              <Card className="bg-gradient-to-br from-purple-50/90 via-blue-50/80 to-indigo-50/90 border-2 border-purple-200/70 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Reviews ({service.reviews})
                    </CardTitle>
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-lg">{service.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {generateReviews(serviceId).map((review, idx) => (
                    <div key={idx} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-midnight">{review.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "fill-gray-200 text-gray-200"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 mt-2 leading-relaxed">{review.comment}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-primary transition-colors">
                          <ThumbsUp className="h-3 w-3" />
                          Helpful ({review.helpful})
                        </button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Similar Services */}
              <Card className="bg-gradient-to-br from-blue-50/90 via-cyan-50/80 to-indigo-50/90 border-2 border-blue-200/70 shadow-lg">
                <CardHeader>
                  <CardTitle>Similar Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockServices
                      .filter((s) => s.id !== serviceId && (s.category === service.category || s.seller === service.seller))
                      .slice(0, 3)
                      .map((similar) => (
                        <div
                          key={similar.id}
                          className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 hover:border-primary/50 hover:bg-white/50 transition-all cursor-pointer"
                          onClick={() => router.push(`/marketplace/${similar.id}`)}
                        >
                          <div className="text-2xl flex-shrink-0">{similar.image}</div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm text-midnight line-clamp-1">{similar.title}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs text-gray-600">{similar.rating}</span>
                              <span className="text-xs text-gray-400">•</span>
                              <span className="text-xs font-semibold text-primary">{similar.price}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Service Details Card */}
              <Card className="bg-gradient-to-br from-blue-50/90 via-cyan-50/80 to-indigo-50/90 border-2 border-blue-200/70 shadow-lg">
                <CardHeader>
                  <CardTitle>Service Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-midnight">Delivery Time</p>
                      <p className="text-sm text-gray-600">{service.timeToComplete}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-midnight">Response Time</p>
                      <p className="text-sm text-gray-600">{service.responseTime || "Within 24 hours"}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-midnight">Availability</p>
                      <p className="text-sm text-gray-600">{service.availability}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Eye className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-midnight">Total Views</p>
                      <p className="text-sm text-gray-600">{service.reviews} views</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Seller Info Card */}
              <Card className="bg-gradient-to-br from-indigo-50/90 via-purple-50/80 to-blue-50/90 border-2 border-indigo-200/70 shadow-lg">
                <CardHeader>
                  <CardTitle>About Seller</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-xl font-bold">
                      {service.seller.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-midnight">{service.seller}</p>
                      {service.verified && (
                        <div className="flex items-center gap-1 text-xs text-primary mt-1">
                          <Shield className="h-3 w-3" />
                          <span>Verified Seller</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {sellerInfo[service.seller] && (
                    <>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {sellerInfo[service.seller].description}
                      </p>
                      
                      <div className="pt-4 border-t border-gray-200 space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Rating</span>
                          <span className="font-semibold text-midnight flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            {sellerInfo[service.seller].rating}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Total Sales</span>
                          <span className="font-semibold text-midnight">{sellerInfo[service.seller].totalSales.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Response Rate</span>
                          <span className="font-semibold text-midnight">{sellerInfo[service.seller].responseRate}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 flex items-center gap-1">
                            <Globe className="h-3 w-3" />
                            Location
                          </span>
                          <span className="font-semibold text-midnight">{sellerInfo[service.seller].location}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Member Since</span>
                          <span className="font-semibold text-midnight">{sellerInfo[service.seller].memberSince}</span>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* CTA Card */}
              <Card className="bg-gradient-to-br from-primary/10 to-blue-500/10 border-primary/20">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div>
                      <div className="text-3xl font-bold text-midnight mb-2">{service.price}</div>
                      <p className="text-sm text-gray-600">One-time payment</p>
                    </div>
                    <Button
                      size="lg"
                      className="w-full bg-midnight hover:bg-midnight/90 text-white font-semibold"
                      onClick={handleHireAgent}
                    >
                      <Wallet className="mr-2 h-5 w-5" />
                      Hire Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Hire Confirmation Modal */}
      {service && (
        <HireConfirmationModal
          open={hireModalOpen}
          onOpenChange={setHireModalOpen}
          service={{
            title: service.title,
            price: service.price,
            seller: service.seller,
            timeToComplete: service.timeToComplete,
            category: service.category,
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

