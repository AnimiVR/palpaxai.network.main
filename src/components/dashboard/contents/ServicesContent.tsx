"use client"

import { useState, useEffect } from "react"
import {
  Copy,
  Edit,
  Eye,
  Grid,
  List,
  MoreHorizontal,
  Package,
  Plus,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample data for services
const initialServices = [
  {
    id: 1,
    title: "AI Chatbot Service",
    type: "ai-agent",
    category: "automation",
    price: 49.99,
    status: "published",
    featured: true,
    rating: 4.8,
    sales: 235,
    image: "/images/services/diverse-group-chatting.png",
    tags: ["AI", "Chatbot", "Automation"],
    description: "A fully automated AI chatbot service that can handle customer inquiries 24/7 with natural language processing.",
  },
  {
    id: 2,
    title: "Content Generation API",
    type: "api-service",
    category: "content",
    price: 79.99,
    status: "published",
    featured: false,
    rating: 4.6,
    sales: 187,
    image: "/images/services/interconnected-design-landscape.png",
    tags: ["API", "Content", "AI"],
    description: "Generate high-quality content for blogs, social media, and marketing materials using advanced AI models.",
  },
  {
    id: 3,
    title: "Data Analysis Service",
    type: "ai-agent",
    category: "analytics",
    price: 99.99,
    status: "published",
    featured: true,
    rating: 4.9,
    sales: 312,
    image: "/images/services/connected-experiences.png",
    tags: ["Analytics", "Data", "AI"],
    description: "Automated data analysis and insights generation for business intelligence and reporting.",
  },
  {
    id: 4,
    title: "Development Workspace AI",
    type: "ai-agent",
    category: "development",
    price: 89.99,
    status: "published",
    featured: false,
    rating: 4.7,
    sales: 156,
    image: "/images/services/coding-workspace.png",
    tags: ["Development", "AI", "Coding"],
    description: "AI-powered development assistant that helps streamline coding workflows and boost productivity.",
  },
  {
    id: 5,
    title: "Visual Design Generator",
    type: "api-service",
    category: "design",
    price: 59.99,
    status: "published",
    featured: false,
    rating: 4.5,
    sales: 203,
    image: "/images/services/colorful-abstract-flow.png",
    tags: ["Design", "Visual", "Creative"],
    description: "Generate stunning visual designs and abstract art patterns using advanced AI algorithms.",
  },
  {
    id: 6,
    title: "Brand Identity Builder",
    type: "ai-agent",
    category: "branding",
    price: 129.99,
    status: "published",
    featured: true,
    rating: 4.9,
    sales: 98,
    image: "/images/services/interconnected-brand-elements.png",
    tags: ["Branding", "Identity", "Design"],
    description: "Create cohesive brand identities with interconnected design elements and consistent visual language.",
  },
  {
    id: 7,
    title: "Mobile App Interface Designer",
    type: "ai-agent",
    category: "design",
    price: 69.99,
    status: "published",
    featured: false,
    rating: 4.6,
    sales: 178,
    image: "/images/services/modern-app-interface.png",
    tags: ["Mobile", "UI/UX", "Design"],
    description: "Design modern and intuitive mobile app interfaces with AI-assisted layout and component suggestions.",
  },
  {
    id: 8,
    title: "Collaboration Platform",
    type: "ai-agent",
    category: "productivity",
    price: 109.99,
    status: "published",
    featured: false,
    rating: 4.8,
    sales: 142,
    image: "/images/services/team-brainstorm.png",
    tags: ["Collaboration", "Team", "Productivity"],
    description: "Enhanced team collaboration platform with AI-powered brainstorming and idea generation tools.",
  },
  {
    id: 9,
    title: "Urban Analytics Service",
    type: "api-service",
    category: "analytics",
    price: 94.99,
    status: "draft",
    featured: false,
    rating: 0,
    sales: 0,
    image: "/images/services/diverse-group-city.png",
    tags: ["Analytics", "Urban", "Data"],
    description: "Analyze urban patterns and city dynamics using comprehensive data collection and AI insights.",
  },
  {
    id: 10,
    title: "Professional Profile AI",
    type: "ai-agent",
    category: "professional",
    price: 39.99,
    status: "published",
    featured: false,
    rating: 4.4,
    sales: 267,
    image: "/images/services/thoughtful-portrait.png",
    tags: ["Professional", "Profile", "AI"],
    description: "AI-powered professional profile optimization for enhanced personal branding and career growth.",
  },
]

export default function ServicesContent() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedTab, setSelectedTab] = useState("all")
  const [sortBy, setSortBy] = useState("popular")
  const [currentPage, setCurrentPage] = useState(1)
  const [services] = useState(initialServices)
  const [filteredServices, setFilteredServices] = useState(services)
  const [paginatedServices, setPaginatedServices] = useState<typeof initialServices>([])
  const [filterOptions] = useState({
    priceRange: {
      min: "",
      max: "",
    },
    categories: [],
    tags: [],
    status: [],
    featured: null,
    rating: "",
    searchTerm: "",
  })
  const itemsPerPage = 9

  // Filter and sort services
  useEffect(() => {
    let result = [...services]

    if (selectedTab !== "all") {
      result = result.filter((service) => service.type === selectedTab)
    }

    if (filterOptions.searchTerm) {
      const searchLower = filterOptions.searchTerm.toLowerCase()
      result = result.filter(
        (service) =>
          service.title.toLowerCase().includes(searchLower) ||
          (service.description && service.description.toLowerCase().includes(searchLower)) ||
          (service.tags && service.tags.some((tag) => tag.toLowerCase().includes(searchLower))),
      )
    }

    // Apply sorting
    switch (sortBy) {
      case "popular":
        result.sort((a, b) => b.sales - a.sales)
        break
      case "newest":
        result.sort((a, b) => (b.id || 0) - (a.id || 0))
        break
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }

    setFilteredServices(result)
    setCurrentPage(1)
  }, [selectedTab, sortBy, services, filterOptions])

  // Apply pagination
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    setPaginatedServices(filteredServices.slice(startIndex, endIndex))
  }, [filteredServices, currentPage, itemsPerPage])

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage)

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">My Services</h1>
          <p className="text-gray-500 text-sm sm:text-base">Manage your AI agent services and offerings</p>
        </div>
        <div className="flex gap-2">
          <Button className="gap-2 bg-gray-900 hover:bg-black text-white text-xs sm:text-sm h-8 sm:h-10">
            <Plus size={14} className="sm:size-16" />
            Add Service
          </Button>
        </div>
      </div>

      {/* Services Tabs and View Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
        <Tabs defaultValue="all" className="w-full sm:w-auto" onValueChange={setSelectedTab} value={selectedTab}>
          <TabsList className="w-full sm:w-auto grid grid-cols-3 sm:flex">
            <TabsTrigger value="all" className="text-xs sm:text-sm">
              All Services ({services.length})
            </TabsTrigger>
            <TabsTrigger value="ai-agent" className="text-xs sm:text-sm">
              AI Agents ({services.filter((s) => s.type === "ai-agent").length})
            </TabsTrigger>
            <TabsTrigger value="api-service" className="text-xs sm:text-sm">
              API Services ({services.filter((s) => s.type === "api-service").length})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px] sm:w-[180px] text-xs sm:text-sm h-8 sm:h-10">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex border rounded-md overflow-hidden">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className={`h-8 sm:h-10 w-8 sm:w-10 ${viewMode === "grid" ? "bg-gray-900 text-white" : ""}`}
            >
              <Grid size={14} className="sm:size-16" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
              className={`h-8 sm:h-10 w-8 sm:w-10 ${viewMode === "list" ? "bg-gray-900 text-white" : ""}`}
            >
              <List size={14} className="sm:size-16" />
            </Button>
          </div>
        </div>
      </div>

      {/* Services Grid View */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {paginatedServices.map((service) => (
            <Card key={service.id} className="overflow-hidden flex flex-col h-full">
              <div className="relative h-48 bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={service.image || "/images/services/placeholder.png"}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  <Badge
                    className={`${
                      service.type === "ai-agent" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {service.type === "ai-agent" ? "AI Agent" : "API Service"}
                  </Badge>
                  <Badge
                    className={`${
                      service.status === "published"
                        ? "bg-green-100 text-green-800"
                        : service.status === "draft"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                  </Badge>
                </div>
                {service.featured && (
                  <Badge className="absolute top-2 right-2 bg-orange-500 text-white">Featured</Badge>
                )}
              </div>
              <CardHeader className="pb-2 pt-3 px-4">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base sm:text-lg line-clamp-1">{service.title}</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="mr-2 h-4 w-4" /> Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" /> Preview
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{service.rating}</span>
                  <span className="text-xs text-gray-500">({service.sales} uses)</span>
                </div>
              </CardHeader>
              <CardContent className="pt-0 px-4 flex-1">
                <div className="flex flex-wrap gap-1 mb-2">
                  {service.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-gray-500 line-clamp-2 mb-3">{service.description}</p>
              </CardContent>
              <CardFooter className="flex flex-col gap-3 pt-0 px-4 pb-4">
                <div className="flex items-center justify-between w-full">
                  <div className="text-lg font-bold">{service.price.toFixed(2)} SOL</div>
                </div>
                <div className="flex gap-2 w-full">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit size={14} className="mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye size={14} className="mr-1" />
                    Preview
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {paginatedServices.map((service) => (
            <Card key={service.id} className="overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <div className="relative w-full sm:w-48 h-48 sm:h-auto bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={service.image || "/images/services/placeholder.png"}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-semibold">{service.title}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{service.rating}</span>
                        <span className="text-xs text-gray-500">({service.sales} uses)</span>
                      </div>
                    </div>
                    <div className="text-lg font-bold">{service.price.toFixed(2)} SOL</div>
                  </div>

                  <div className="flex flex-wrap gap-1 my-2">
                    {service.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <p className="text-sm text-gray-500 line-clamp-2 mb-3">{service.description}</p>

                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm">
                      <Edit size={14} className="mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye size={14} className="mr-1" />
                      Preview
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {paginatedServices.length === 0 && (
        <div className="text-center py-12 border rounded-lg bg-white">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
            <Package className="text-gray-400" size={24} />
          </div>
          <h3 className="text-lg font-medium">No services found</h3>
          <p className="text-gray-500 mt-1">Create your first AI service to get started.</p>
          <Button className="mt-4" variant="outline">
            <Plus size={16} className="mr-2" />
            Add Service
          </Button>
        </div>
      )}

      {/* Pagination */}
      {filteredServices.length > itemsPerPage && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-6 gap-2 sm:gap-0">
          <div className="text-xs sm:text-sm text-gray-500 order-2 sm:order-1 text-center sm:text-left">
            Showing <span className="font-medium">{paginatedServices.length}</span> of{" "}
            <span className="font-medium">{filteredServices.length}</span> services
          </div>
          <div className="flex justify-center sm:justify-end gap-1 sm:gap-2 order-1 sm:order-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-7 sm:h-8 px-2 sm:px-3"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-7 sm:h-8 px-2 sm:px-3"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

