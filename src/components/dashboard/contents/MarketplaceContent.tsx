"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  Search,
  Sparkles,
  Filter,
  Clock,
  Shield,
  Wallet,
  Eye,
  Heart,
  Zap,
  Loader2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useWallet } from "@solana/wallet-adapter-react"
import { useFaremeterPayment } from "@/hooks/useFaremeterPayment"

// Generate random prices below 0.1 SOL (0.01 to 0.099)
const randomPrices = [
  "0.045 SOL",
  "0.067 SOL",
  "0.023 SOL",
  "0.089 SOL",
  "0.034 SOL",
  "0.056 SOL",
  "0.078 SOL",
  "0.012 SOL",
  "0.091 SOL",
  "0.039 SOL",
  "0.062 SOL",
  "0.085 SOL",
]

// Mock services data
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
    verified: true,
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
    verified: true,
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
    verified: true,
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
    verified: true,
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
    verified: false,
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
    verified: true,
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
    verified: true,
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
    verified: true,
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
    verified: false,
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
    verified: true,
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
    verified: true,
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
    verified: true,
  },
]

const categories = ["All", "Development", "Design", "Writing", "Analytics", "Marketing", "Testing", "Support"]
const sortOptions = ["Newest", "Price: Low to High", "Price: High to Low", "Rating", "Most Popular"]

export default function MarketplaceContent() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("Newest")
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false)
  const [showOnlyVerified, setShowOnlyVerified] = useState(false)
  const [filteredServices, setFilteredServices] = useState(mockServices)
  const [favorites, setFavorites] = useState<string[]>([])

  const { connected } = useWallet()
  const { processPayment, isProcessing } = useFaremeterPayment()

  const handleHireFromMarketplace = async (service: (typeof mockServices)[0]) => {
    if (!connected) {
      alert("⚠️ Please connect your wallet first!\n\nClick the 'Connect Wallet' button.")
      return
    }

    const confirmHire = confirm(
      `Hire ${service.title}?\n\n` +
        `Price: ${service.price}\n` +
        `Seller: ${service.seller}\n` +
        `Delivery: ${service.timeToComplete}\n\n` +
        `Continue?`,
    )

    if (!confirmHire) return

    try {
      const result = await processPayment(service.id, service.title, service.price, service.seller)

      if (result.success && result.signature) {
        alert(
          `✅ Payment successful!\n\n` +
            `Agent: ${service.title}\n` +
            `Price: ${service.price}\n` +
            `Transaction: ${result.signature.substring(0, 8)}...${result.signature.substring(result.signature.length - 8)}\n\n` +
            `View on Solana Explorer: https://solscan.io/tx/${result.signature}`,
        )
      } else {
        alert(`❌ Payment failed: ${result.error || "Unknown error"}`)
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error"
      alert(`❌ Payment error: ${errorMessage}`)
    }
  }

  // Toggle favorite
  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const featuredServices = mockServices.filter((s) => s.featured)

  useEffect(() => {
    let filtered = mockServices

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((service) => service.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (service) =>
          service.title.toLowerCase().includes(query) ||
          service.description.toLowerCase().includes(query) ||
          service.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    // Filter by availability
    if (showOnlyAvailable) {
      filtered = filtered.filter((service) => service.availability === "Available")
    }

    // Filter by verification
    if (showOnlyVerified) {
      filtered = filtered.filter((service) => service.verified)
    }

    // Sort services
    switch (sortBy) {
      case "Price: Low to High":
        filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
        break
      case "Price: High to Low":
        filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
        break
      case "Rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "Most Popular":
        filtered.sort((a, b) => b.reviews - a.reviews)
        break
      default:
        break
    }

    setFilteredServices(filtered)
  }, [searchQuery, selectedCategory, sortBy, showOnlyAvailable, showOnlyVerified])

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Marketplace</h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Discover and hire AI agents for your projects
          </p>
        </div>
      </div>

      {/* Featured Services Section */}
      {featuredServices.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-blue-500/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Featured Services</h2>
            <Badge className="bg-orange-500 text-white px-2 py-1">Hot</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredServices.slice(0, 3).map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="relative group cursor-pointer"
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="text-3xl">{service.image}</div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-base leading-tight mb-1 line-clamp-2">
                            {service.title}
                          </CardTitle>
                          <p className="text-xs text-gray-500 font-medium">{service.seller}</p>
                        </div>
                      </div>
                      {service.verified && <Shield className="h-5 w-5 text-primary flex-shrink-0" />}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center gap-1.5">
                        <Eye className="h-3.5 w-3.5 text-gray-400" />
                        <span className="text-xs text-gray-500">{service.reviews} views</span>
                      </div>
                      <div className="text-lg font-bold text-gray-900 font-mono">
                        {service.price}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Filters & Search Section */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4">
            {/* Search Row */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search agents, services, skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-lg border-gray-300 focus:border-primary"
                />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <Filter className="h-5 w-5 text-gray-600" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="flex-1 md:w-auto border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary cursor-pointer bg-white"
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
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className="rounded-full px-4 py-2 text-sm whitespace-nowrap"
                  >
                    {category}
                  </Button>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showOnlyAvailable}
                    onChange={(e) => setShowOnlyAvailable(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700">Available only</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showOnlyVerified}
                    onChange={(e) => setShowOnlyVerified(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700 flex items-center gap-1">
                    <Shield className="h-4 w-4" />
                    Verified only
                  </span>
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Services Grid */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">{filteredServices.length} Services Available</h2>
      </div>

      {filteredServices.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <Search className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">No services found matching your criteria.</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or search terms.</p>
          </CardContent>
        </Card>
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
              <Card className="h-full flex flex-col cursor-pointer group relative overflow-hidden border-2 hover:shadow-xl transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 z-10">
                  {service.featured && (
                    <Badge className="bg-primary text-white px-2.5 py-1 text-xs font-semibold">
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
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            service.availability === "Available" ? "bg-green-500" : "bg-orange-500"
                          }`}
                        ></div>
                        <span>{service.availability}</span>
                      </div>
                    </Badge>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(service.id)
                      }}
                      className="p-1.5 rounded-full bg-white hover:bg-gray-50 transition-all border"
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
                  <CardTitle className="text-lg font-bold text-gray-900 mb-2 text-center line-clamp-2 min-h-[3.5rem]">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600 line-clamp-2 text-center min-h-[2.5rem]">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 space-y-3 px-4">
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

                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {service.tags.slice(0, 3).map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {service.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{service.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex flex-col items-center gap-1">
                      <div className="text-2xl font-bold text-gray-900">{service.price}</div>
                      <div className="text-xs text-gray-500">
                        by <span className="font-medium text-gray-700">{service.seller}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pt-4 pb-4 px-4 gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 text-sm h-9"
                    onClick={(e) => {
                      e.stopPropagation()
                      router.push(`/marketplace/${service.id}`)
                    }}
                  >
                    <Eye className="mr-1.5 h-3.5 w-3.5" />
                    Details
                  </Button>
                  <Button
                    className="flex-1 bg-primary hover:bg-primary/90 text-white text-sm h-9 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleHireFromMarketplace(service)
                    }}
                    disabled={isProcessing || !connected}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Wallet className="mr-1.5 h-3.5 w-3.5" />
                        Hire
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </>
  )
}




