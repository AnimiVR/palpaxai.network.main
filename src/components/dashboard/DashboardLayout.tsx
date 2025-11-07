"use client"

import { useState, useEffect, useMemo, type ReactNode } from "react"
import Link from "next/link"
import {
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  FolderKanban,
  Info,
  LayoutDashboard,
  LogOut,
  Package,
  PieChart,
  Plus,
  Search,
  Settings,
  Users,
  MessageSquareText,
  AlertCircle,
  Moon,
  Sun,
  X,
  Share,
  BarChart2,
  Menu,
  MoreHorizontal,
  Store,
  Wallet,
  Briefcase,
  Pointer,
  Book,
  Twitter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/contexts/theme-context"
import { usePhantomWallet } from "@/hooks/usePhantomWallet"
import { Loader2 } from "lucide-react"
import Image from "next/image"
import { Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart } from "recharts"
import { format, subMonths, startOfMonth } from "date-fns"
import { 
  getDashboardData, 
  getCurrentMonthTransactions, 
  getLastMonthTransactions,
  getTransactionsByMonth,
  type DashboardTransaction
} from "@/utils/dashboardStorage"

// Custom scrollbar styles
const scrollbarStyles = `
  .scrollbar-thin {
    scrollbar-width: thin;
  }
  
  .scrollbar-thin::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  .scrollbar-thin::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .scrollbar-thin::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0.5);
    border-radius: 20px;
  }
  
  .scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background-color: rgba(156, 163, 175, 0.7);
  }
  
  .dark .scrollbar-thin::-webkit-scrollbar-thumb {
    background-color: rgba(75, 85, 99, 0.5);
  }
  
  .dark .scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background-color: rgba(75, 85, 99, 0.7);
  }
`

interface DashboardLayoutProps {
  content?: ReactNode
}

export default function DashboardLayout({ content }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [currentPath, setCurrentPath] = useState("")
  const [unreadNotifications, setUnreadNotifications] = useState(3)
  const { theme, toggleTheme } = useTheme()
  const { connected, publicKeyString, isConnecting, isPhantomInstalled, connect, disconnect } = usePhantomWallet()

  const handleConnectWallet = async () => {
    console.log('🟢 Dashboard: handleConnectWallet called')
    console.log('🟢 Dashboard: isPhantomInstalled', isPhantomInstalled)
    console.log('🟢 Dashboard: isConnecting', isConnecting)
    console.log('🟢 Dashboard: connected', connected)
    
    if (!isPhantomInstalled) {
      console.log('🟢 Dashboard: Phantom not installed, opening phantom.app')
      window.open('https://phantom.app/', '_blank')
      return
    }
    console.log('🟢 Dashboard: Calling connect()...')
    await connect()
    console.log('🟢 Dashboard: connect() completed')
  }

  const handleDisconnect = async () => {
    await disconnect()
  }

  const formatAddress = (address: string) => {
    if (!address) return ""
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  // Add state variables for mobile sidebar at the top of the component
  const [isMobileView, setIsMobileView] = useState(false)
  const [showMobileSidebar, setShowMobileSidebar] = useState(false)

  // Add a useEffect to set the path after component mounts
  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])

  // Add useEffect to detect mobile view
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 768)
    }

    checkMobileView()
    window.addEventListener("resize", checkMobileView)

    return () => {
      window.removeEventListener("resize", checkMobileView)
    }
  }, [])

  // Add custom scrollbar styles
  useEffect(() => {
    const styleElement = document.createElement("style")
    styleElement.textContent = scrollbarStyles
    document.head.appendChild(styleElement)

    return () => {
      document.head.removeChild(styleElement)
    }
  }, [])

  // State để lưu transactions - khởi tạo với mảng rỗng để tránh hydration mismatch
  // Server và client sẽ render giống nhau ban đầu (mảng rỗng = 0 revenue)
  const [transactions, setTransactions] = useState<DashboardTransaction[]>([])

  // Load transactions từ localStorage sau khi component mount (chỉ trên client)
  useEffect(() => {
    const loadTransactions = () => {
      const data = getDashboardData()
      setTransactions(data.transactions || [])
    }

    loadTransactions()

    // Listen for storage changes (khi có transaction mới từ tab khác)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'palpaxai_dashboard_data') {
        loadTransactions()
      }
    }

    // Listen for custom event (khi có transaction mới từ cùng tab)
    const handleTransactionAdded = () => {
      loadTransactions()
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('dashboardTransactionAdded', handleTransactionAdded)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('dashboardTransactionAdded', handleTransactionAdded)
    }
  }, [])

  // Generate chart data for the last 8 months từ transactions
  const chartData = useMemo(() => {
    const today = new Date()
    const months = []
    const transactionsByMonth = getTransactionsByMonth(transactions)
    
    const currentYear = today.getFullYear()
    
    for (let i = 7; i >= 0; i--) {
      const date = subMonths(startOfMonth(today), i)
      const monthName = format(date, "MMM")
      const monthFull = format(date, "MMM yyyy")
      const year = date.getFullYear()
      const monthKey = `${year}-${String(date.getMonth() + 1).padStart(2, '0')}`
      
      // Get revenue from transactions for this month
      const revenue = transactionsByMonth[monthKey] || 0
      
      // Show year in label if it's different from current year
      const displayLabel = year !== currentYear 
        ? `${monthName.toUpperCase()} ${year}`
        : monthName.toUpperCase()
      
      months.push({
        month: monthName,
        monthFull: monthFull,
        year: year,
        revenue: Number(revenue.toFixed(2)),
        displayLabel: displayLabel,
      })
    }
    
    return months
  }, [transactions])
  
  // Calculate total revenue and percentage change
  const totalRevenue = chartData.reduce((sum, item) => sum + item.revenue, 0)
  const previousMonthRevenue = chartData[chartData.length - 2]?.revenue || 0
  const currentMonthRevenue = chartData[chartData.length - 1]?.revenue || 0
  const revenueChange = previousMonthRevenue > 0 
    ? ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100 
    : 0
  const revenueChangeFormatted = revenueChange >= 0 
    ? `+${revenueChange.toFixed(1)}%` 
    : `${revenueChange.toFixed(1)}%`
  
  // Get max revenue for Y-axis scaling
  const maxRevenue = Math.max(...chartData.map(d => d.revenue), 1)
  const yAxisMax = Math.ceil(maxRevenue * 1.2) // Add 20% padding

  // Calculate dashboard statistics từ transactions
  const dashboardStats = useMemo(() => {
    // Get transactions for current and last month
    const currentMonthTxs = getCurrentMonthTransactions(transactions)
    const lastMonthTxs = getLastMonthTransactions(transactions)
    
    // Total Revenue - sum of all transactions
    const totalRevenue = transactions.reduce((sum, tx) => sum + tx.price, 0)
    
    // This month revenue
    const thisMonthRevenue = currentMonthTxs.reduce((sum, tx) => sum + tx.price, 0)
    
    // Last month revenue
    const lastMonthRevenue = lastMonthTxs.reduce((sum, tx) => sum + tx.price, 0)
    
    // Revenue change percentage
    const revenueChange = lastMonthRevenue > 0 
      ? ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100 
      : 0

    // Active Contracts = số transactions trong tháng này
    const activeContracts = currentMonthTxs.length
    const lastMonthContracts = lastMonthTxs.length
    const contractsChange = lastMonthContracts > 0
      ? ((activeContracts - lastMonthContracts) / lastMonthContracts) * 100
      : activeContracts > 0 ? 100 : 0

    // Completed Jobs = tổng số transactions (mỗi hire = 1 job completed)
    const completedJobs = transactions.length
    const lastMonthJobs = lastMonthTxs.length
    const jobsChange = lastMonthJobs > 0
      ? ((completedJobs - lastMonthJobs) / lastMonthJobs) * 100
      : completedJobs > 0 ? 100 : 0
    
    // Completion percentage (based on target of 100 jobs)
    const completionPercentage = Math.min((completedJobs / 100) * 100, 100)

    // Service Performance - percentage based on revenue trend
    const performancePercentage = thisMonthRevenue > 0 && maxRevenue > 0
      ? Math.min((thisMonthRevenue / maxRevenue) * 100, 100)
      : 0

    // Service type breakdown - count AI Agents và Services
    const aiAgentsCount = currentMonthTxs.filter(tx => 
      tx.category === 'Development' || tx.category === 'Analytics' || tx.category === 'Testing'
    ).length
    const servicesCount = currentMonthTxs.filter(tx => 
      tx.category !== 'Development' && tx.category !== 'Analytics' && tx.category !== 'Testing'
    ).length

    // Total visits - reset về 0
    const totalVisits = 0
    const visitsChange = 0

    // Jobs per day (average)
    const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()
    const jobsPerDay = daysInMonth > 0 ? completedJobs / daysInMonth : 0
    const averageJobsToday = Math.max(1, Math.floor(jobsPerDay))

    return {
      totalRevenue,
      thisMonthRevenue,
      revenueChange,
      activeContracts,
      contractsChange,
      completedJobs,
      jobsChange,
      completionPercentage,
      performancePercentage,
      aiAgentsCount,
      servicesCount,
      totalVisits,
      visitsChange,
      jobsPerDay,
      averageJobsToday,
    }
  }, [transactions, maxRevenue])

  // Generate hourly visit data for the last 3 days (reset về 0)
  const hourlyVisitData = useMemo(() => {
    const days = ['MON', 'TUE', 'WED']
    const hours = Array.from({ length: 12 }, (_, i) => i + 8) // 8 AM to 7 PM
    
    // Reset về 0 - không có visits data
    const hourlyAverage = 0 // Average visits per hour
    
    return days.map((day, dayIndex) => {
      const peakHour = dayIndex === 1 ? 10 : dayIndex === 2 ? 8 : 3 // Different peak hours
      
      return {
        day,
        hours: hours.map((hour, hourIndex) => {
          // Create realistic pattern with peak hours
          const isPeak = hourIndex === peakHour
          const isBusy = hourIndex >= 8 && hourIndex <= 11 // Busy hours 8-11 AM
          const multiplier = isPeak 
            ? 2.5  // Peak hour has 2.5x average
            : isBusy 
            ? 1.5  // Busy hours have 1.5x average
            : 0.8  // Off hours have 0.8x average
          
          const visits = Math.floor(hourlyAverage * multiplier)
          
          return {
            hour,
            visits: visits, // Reset về 0, không có minimum
            isPeak: false, // Reset peak hours
          }
        }),
      }
    })
  }, [])

  // Generate top services data từ transactions
  const topServices = useMemo(() => {
    // Group transactions by service title
    const serviceMap = new Map<string, { revenue: number; jobs: number; category?: string }>()
    
    transactions.forEach((tx) => {
      const existing = serviceMap.get(tx.serviceTitle) || { revenue: 0, jobs: 0, category: tx.category }
      existing.revenue += tx.price
      existing.jobs += 1
      serviceMap.set(tx.serviceTitle, existing)
    })
    
    // Convert to array and sort by revenue
    const services = Array.from(serviceMap.entries())
      .map(([name, data]) => ({
        name,
        revenue: Number(data.revenue.toFixed(2)),
        jobs: data.jobs,
        trend: 'up' as const, // Default trend
      }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5) // Top 5 services
    
    // Nếu không có services, trả về mảng rỗng
    return services
  }, [transactions])

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div
        className={`bg-white dark:bg-gray-800 border-r dark:border-gray-700 ${sidebarCollapsed ? "w-20" : "w-64"} transition-all duration-300 flex flex-col ${
          isMobileView ? "fixed z-50 h-screen shadow-lg" : ""
        } ${isMobileView && !showMobileSidebar ? "-translate-x-full" : ""}`}
      >
        <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between">
          <Link href="https://palpaxai.network" className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer">
            {!sidebarCollapsed && (
              <>
                <div className="bg-black text-white dark:bg-white dark:text-black p-2 rounded">
                  <Image src="/logopalpaxai.png" alt="PalPaxAI" width={20} height={20} className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold dark:text-white">PalPaxAI</div>
                </div>
              </>
            )}
            {sidebarCollapsed && (
              <div className="bg-black text-white dark:bg-white dark:text-black p-2 rounded mx-auto">
                <Image src="/logopalpaxai.png" alt="PalPaxAI" width={20} height={20} className="w-5 h-5" />
              </div>
            )}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => (isMobileView ? setShowMobileSidebar(false) : setSidebarCollapsed(!sidebarCollapsed))}
          >
            {isMobileView ? <X size={16} /> : sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </Button>
        </div>

        <div className="flex-1 overflow-auto scrollbar-thin">
          {!sidebarCollapsed && (
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400">MAIN MENU</div>
          )}
          <div className="space-y-1 p-2">
            <Button
              variant="ghost"
              className={`w-full justify-start ${!sidebarCollapsed ? "" : "px-2"} ${currentPath === "/dashboard" ? "border-l-4 border-blue-500" : ""}`}
              asChild
            >
              <Link href="/dashboard">
                <LayoutDashboard size={18} className={`${!sidebarCollapsed ? "mr-2" : "mx-auto"}`} />
                {!sidebarCollapsed && <span>Dashboard</span>}
              </Link>
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start ${!sidebarCollapsed ? "" : "px-2"} ${currentPath === "/dashboard/marketplace" ? "border-l-4 border-blue-500" : ""}`}
              asChild
            >
              <Link href="/dashboard/marketplace">
                <Store size={18} className={`${!sidebarCollapsed ? "mr-2" : "mx-auto"}`} />
                {!sidebarCollapsed && <span>Marketplace</span>}
              </Link>
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start ${!sidebarCollapsed ? "" : "px-2"} ${currentPath === "/dashboard/services" ? "border-l-4 border-blue-500" : ""}`}
              asChild
            >
              <Link href="/dashboard/services">
                <Briefcase size={18} className={`${!sidebarCollapsed ? "mr-2" : "mx-auto"}`} />
                {!sidebarCollapsed && <span>My Services</span>}
              </Link>
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start ${!sidebarCollapsed ? "" : "px-2"} ${currentPath === "/dashboard/chat" ? "border-l-4 border-blue-500" : ""}`}
              asChild
            >
              <Link href="/dashboard/chat">
                <MessageSquareText size={18} className={`${!sidebarCollapsed ? "mr-2" : "mx-auto"}`} />
                {!sidebarCollapsed && <span>AI Chat</span>}
              </Link>
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start ${!sidebarCollapsed ? "" : "px-2"} ${currentPath === "/dashboard/contracts" ? "border-l-4 border-blue-500" : ""}`}
              asChild
            >
              <Link href="/dashboard/contracts">
                <FolderKanban size={18} className={`${!sidebarCollapsed ? "mr-2" : "mx-auto"}`} />
                {!sidebarCollapsed && <span>Contracts</span>}
              </Link>
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start ${!sidebarCollapsed ? "" : "px-2"} ${currentPath === "/dashboard/clients" ? "border-l-4 border-blue-500" : ""}`}
              asChild
            >
              <Link href="/dashboard/clients">
                <Users size={18} className={`${!sidebarCollapsed ? "mr-2" : "mx-auto"}`} />
                {!sidebarCollapsed && <span>Clients</span>}
              </Link>
            </Button>
          </div>

          {!sidebarCollapsed && (
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 mt-4">OTHER</div>
          )}
          <div className="space-y-1 p-2">
            <Button
              variant="ghost"
              className={`w-full justify-start ${!sidebarCollapsed ? "" : "px-2"} ${currentPath === "/dashboard/wallet" ? "border-l-4 border-blue-500" : ""}`}
              asChild
            >
              <Link href="/dashboard/wallet">
                <Wallet size={18} className={`${!sidebarCollapsed ? "mr-2" : "mx-auto"}`} />
                {!sidebarCollapsed && <span>Wallet</span>}
              </Link>
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start ${!sidebarCollapsed ? "" : "px-2"} ${currentPath === "/dashboard/analytics" ? "border-l-4 border-blue-500" : ""}`}
              asChild
            >
              <Link href="/dashboard/analytics">
                <PieChart size={18} className={`${!sidebarCollapsed ? "mr-2" : "mx-auto"}`} />
                {!sidebarCollapsed && <span>Analytics</span>}
              </Link>
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start ${!sidebarCollapsed ? "" : "px-2"} ${currentPath === "/dashboard/integration" ? "border-l-4 border-blue-500" : ""}`}
              asChild
            >
              <Link href="/dashboard/integration">
                <Share size={18} className={`${!sidebarCollapsed ? "mr-2" : "mx-auto"}`} />
                {!sidebarCollapsed && <span>Integration</span>}
              </Link>
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start ${!sidebarCollapsed ? "" : "px-2"} ${currentPath === "/dashboard/performance" ? "border-l-4 border-blue-500" : ""}`}
              asChild
            >
              <Link href="/dashboard/performance">
                <BarChart2 size={18} className={`${!sidebarCollapsed ? "mr-2" : "mx-auto"}`} />
                {!sidebarCollapsed && <span>Performance</span>}
              </Link>
            </Button>
          </div>

          {!sidebarCollapsed && (
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 mt-4">ACCOUNT</div>
          )}
          <div className="space-y-1 p-2">
            <Button variant="ghost" className={`w-full justify-start ${!sidebarCollapsed ? "" : "px-2"}`}>
              <Users size={18} className={`${!sidebarCollapsed ? "mr-2" : "mx-auto"}`} />
              {!sidebarCollapsed && <span>Account</span>}
            </Button>
            <Button 
              variant="ghost" 
              className={`w-full justify-start ${!sidebarCollapsed ? "" : "px-2"}`}
              asChild
            >
              <Link 
                href={process.env.NEXT_PUBLIC_TWITTER_URL || "https://twitter.com"} 
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter size={18} className={`${!sidebarCollapsed ? "mr-2" : "mx-auto"}`} />
                {!sidebarCollapsed && <span>Twitter</span>}
              </Link>
            </Button>
          </div>
        </div>

        <div className="p-4 border-t dark:border-gray-700">
          <Button
            variant="ghost"
            className={`w-full justify-start ${!sidebarCollapsed ? "" : "px-2"} ${currentPath === "/dashboard/settings" ? "border-l-4 border-blue-500" : ""}`}
            asChild
          >
            <Link href="/dashboard/settings">
              <Settings size={18} className={`${!sidebarCollapsed ? "mr-2" : "mx-auto"}`} />
              {!sidebarCollapsed && <span>Settings</span>}
            </Link>
          </Button>

          {!sidebarCollapsed && (
            <div className="flex items-center gap-3 mt-4 p-2 border dark:border-gray-700 rounded-md">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>PA</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                {connected && publicKeyString ? (
                  <div className="font-medium text-sm dark:text-white truncate" title={publicKeyString}>
                    {formatAddress(publicKeyString)}
                  </div>
                ) : (
                  <div className="font-medium text-sm dark:text-white">PalPaxAI User</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto scrollbar-thin">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-2 sm:p-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-1/3">
            {isMobileView && (
              <Button variant="ghost" size="icon" onClick={() => setShowMobileSidebar(!showMobileSidebar)}>
                <Menu size={20} />
              </Button>
            )}
            <div className="relative w-full max-w-[calc(100vw-120px)] sm:max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Search"
                className="w-full pl-8 pr-4 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              />
              <div className="absolute right-2.5 top-2.5 text-xs text-gray-400 hidden sm:block">F⌘</div>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Try x402 and Facilitator buttons */}
            <Link
              className="hidden sm:inline-flex items-center justify-center bg-[#FFFFFF] dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 text-sm font-normal border border-gray-200 dark:border-gray-600 rounded-full transition-colors hover:bg-gray-50 dark:hover:bg-gray-600 min-h-[36px]"
              href={process.env.NEXT_PUBLIC_WEBSITE_URL_X402_ECHO || "#"}
              target="_blank"
            >
              <Pointer className="w-4 h-4 mr-2" />
              Try x402
            </Link>

            <Link
              className="hidden sm:inline-flex items-center justify-center bg-primary hover:bg-primary-700 text-white px-4 py-2 text-sm font-normal rounded-full transition-colors min-h-[36px]"
              href={process.env.NEXT_PUBLIC_WEBSITE_URL_X402_FACILITATOR || "#"}
              target="_blank"
            >
              <Book className="w-4 h-4 mr-2" />
              Facilitator
            </Link>

            {/* Theme Toggle Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="relative"
              title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </Button>

            {/* Twitter/X Link */}
            <Link
              href={process.env.NEXT_PUBLIC_TWITTER_URL || "https://x.com/palpaxai"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                title="Follow us on X (Twitter)"
              >
                <Twitter size={20} />
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell size={20} />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 dark:bg-gray-800 dark:border-gray-700">
                <DropdownMenuLabel className="flex items-center justify-between">
                  <span className="dark:text-white">Notifications</span>
                  {unreadNotifications > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-blue-500 h-auto p-0"
                      onClick={() => setUnreadNotifications(0)}
                    >
                      Mark all as read
                    </Button>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="dark:border-gray-700" />
                <div className="max-h-80 overflow-y-auto">
                  <DropdownMenuItem className="flex items-start gap-2 p-3 cursor-default dark:text-gray-200 dark:focus:bg-gray-700">
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                      <Package size={16} className="text-blue-500 dark:text-blue-300" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm flex items-center justify-between">
                        <span>New service request</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">2m ago</span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        You have a new service request for your AI agent
                      </p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-start gap-2 p-3 cursor-default dark:text-gray-200 dark:focus:bg-gray-700">
                    <div className="bg-orange-100 dark:bg-orange-900 p-2 rounded-full">
                      <Users size={16} className="text-orange-500 dark:text-orange-300" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm flex items-center justify-between">
                        <span>New client registered</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">1h ago</span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        A new client has connected to your services
                      </p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-start gap-2 p-3 cursor-default dark:text-gray-200 dark:focus:bg-gray-700">
                    <div className="bg-red-100 dark:bg-red-900 p-2 rounded-full">
                      <AlertCircle size={16} className="text-red-500 dark:text-red-300" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm flex items-center justify-between">
                        <span>Payment received</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">5h ago</span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        You received a payment of 0.5 SOL
                      </p>
                    </div>
                  </DropdownMenuItem>
                </div>
                <DropdownMenuSeparator className="dark:border-gray-700" />
                <DropdownMenuItem className="text-center text-sm text-blue-500 cursor-pointer dark:text-blue-400 dark:focus:bg-gray-700">
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {connected && publicKeyString ? (
              <>
                <Link href="/dashboard/wallet">
                  <Button variant="outline" className="border-purple-500 text-purple-600 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-950 text-xs sm:text-sm px-2 sm:px-4">
                    <Wallet size={16} className="mr-1 sm:mr-2" />
                    Wallet
                  </Button>
                </Link>
                <Button 
                  onClick={handleDisconnect}
                  className="bg-red-500 hover:bg-red-600 text-white text-xs sm:text-sm px-2 sm:px-4"
                >
                  Disconnect
                  <LogOut size={16} className="ml-1 sm:ml-2" />
                </Button>
              </>
            ) : (
              <>
                <Button 
                  onClick={handleConnectWallet}
                  disabled={isConnecting}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs sm:text-sm px-2 sm:px-4"
                >
                  {isConnecting ? (
                    <>
                      <Loader2 size={16} className="mr-1 sm:mr-2 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Wallet size={16} className="mr-1 sm:mr-2" />
                      Connect Wallet
                    </>
                  )}
                </Button>
                <Button asChild className="bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm px-2 sm:px-4">
                  <Link href="/">
                    Export
                    <LogOut size={16} className="ml-1 sm:ml-2" />
                  </Link>
                </Button>
              </>
            )}
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-3 sm:p-6 dark:bg-gray-900 dark:text-gray-100">
          {content || (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-0">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold">Dashboard</h1>
                  <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                    Track your sales and performance of your strategy
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="gap-2 text-xs sm:text-sm h-8 sm:h-10 dark:border-gray-700 dark:text-gray-300"
                  >
                    <Filter size={14} className="sm:size-16" />
                    Filters
                  </Button>
                  <Button className="gap-2 bg-gray-900 hover:bg-black dark:bg-gray-700 dark:hover:bg-gray-600 text-white text-xs sm:text-sm h-8 sm:h-10">
                    <Plus size={14} className="sm:size-16" />
                    Add Widget
                  </Button>
                </div>
              </div>

              {/* Top Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                      Total Revenue
                      <TooltipProvider>
                        <UITooltip>
                          <TooltipTrigger>
                            <Info size={14} className="ml-1 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Total revenue from all services</p>
                          </TooltipContent>
                        </UITooltip>
                      </TooltipProvider>
                    </CardTitle>
                    <Select defaultValue="this-month">
                      <SelectTrigger className="h-8 w-[160px]">
                        <SelectValue placeholder="This month" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="this-month">This month</SelectItem>
                        <SelectItem value="last-month">Last month</SelectItem>
                        <SelectItem value="this-year">This year</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{dashboardStats.thisMonthRevenue.toFixed(2)} SOL</div>
                    <div className="text-sm text-gray-500">Total revenue</div>

                    <div className="mt-4">
                      <div className="text-sm font-medium mb-2">By service type</div>
                      <div className="flex gap-2 flex-wrap">
                        <Badge className="bg-orange-500 hover:bg-orange-600 text-white py-1 px-3 rounded-md flex items-center gap-1">
                          AI Agents{" "}
                          <span className="bg-white bg-opacity-20 rounded-full w-5 h-5 flex items-center justify-center text-xs ml-1">
                            {dashboardStats.aiAgentsCount}
                          </span>
                        </Badge>
                        <Badge className="bg-orange-100 text-orange-800 py-1 px-3 rounded-md flex items-center gap-1">
                          Services{" "}
                          <span className="bg-orange-200 rounded-full w-5 h-5 flex items-center justify-center text-xs ml-1">
                            {dashboardStats.servicesCount}
                          </span>
                        </Badge>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <div className="text-sm">New revenue:</div>
                      <div className="text-sm font-medium">{dashboardStats.thisMonthRevenue.toFixed(2)} SOL</div>
                      {dashboardStats.revenueChange >= 0 ? (
                        <ChevronDown className="h-4 w-4 text-green-500 rotate-180" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                      Active Contracts
                      <TooltipProvider>
                        <UITooltip>
                          <TooltipTrigger>
                            <Info size={14} className="ml-1 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Current active contracts</p>
                          </TooltipContent>
                        </UITooltip>
                      </TooltipProvider>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{dashboardStats.activeContracts}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="text-sm text-gray-500">vs last month</div>
                      <Badge className={`${dashboardStats.contractsChange >= 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} px-1.5 py-0.5 text-xs`}>
                        {dashboardStats.contractsChange >= 0 ? '+' : ''}{dashboardStats.contractsChange.toFixed(1)}%
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between mt-8">
                      <div className="flex items-center gap-2">
                        {/* Visual representation of contracts distribution */}
                        <div 
                          className="h-6 bg-orange-500 rounded transition-all"
                          style={{ width: `${Math.min((dashboardStats.activeContracts / 50) * 24, 24)}px` }}
                        ></div>
                        <div 
                          className="h-6 bg-orange-300 rounded transition-all"
                          style={{ width: `${Math.min((dashboardStats.activeContracts / 50) * 40, 40)}px` }}
                        ></div>
                        <div 
                          className="h-6 bg-orange-200 rounded transition-all"
                          style={{ width: `${Math.min((dashboardStats.activeContracts / 50) * 16, 16)}px` }}
                        ></div>
                      </div>

                      <Button variant="ghost" size="sm" className="text-gray-500 gap-1">
                        See Details
                        <ChevronRight size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                      Completed Jobs
                      <TooltipProvider>
                        <UITooltip>
                          <TooltipTrigger>
                            <Info size={14} className="ml-1 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Total completed jobs</p>
                          </TooltipContent>
                        </UITooltip>
                      </TooltipProvider>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{dashboardStats.completedJobs}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="text-sm text-gray-500">vs last month</div>
                      <Badge className={`${dashboardStats.jobsChange >= 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} px-1.5 py-0.5 text-xs`}>
                        {dashboardStats.jobsChange >= 0 ? '+' : ''}{dashboardStats.jobsChange.toFixed(1)}%
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="relative h-24 w-24">
                        <div className="absolute inset-0 rounded-full border-8 border-orange-100 dark:border-orange-900"></div>
                        <div
                          className="absolute inset-0 rounded-full border-8 border-transparent border-t-orange-500 border-r-orange-500"
                          style={{ 
                            transform: `rotate(${Math.min((dashboardStats.completionPercentage / 100) * 180, 180)}deg)` 
                          }}
                        ></div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div className="text-xl font-bold">{Math.floor(dashboardStats.completionPercentage)}%</div>
                          <div className="text-xs text-gray-500">{dashboardStats.completedJobs} jobs</div>
                        </div>
                      </div>

                      <Button variant="ghost" size="sm" className="text-gray-500 gap-1">
                        See Details
                        <ChevronRight size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Analytics and Performance */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="md:col-span-2">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                      Analytics
                      <TooltipProvider>
                        <UITooltip>
                          <TooltipTrigger>
                            <Info size={14} className="ml-1 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Revenue analytics over time</p>
                          </TooltipContent>
                        </UITooltip>
                      </TooltipProvider>
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Select defaultValue="this-year">
                        <SelectTrigger className="h-8 w-[120px]">
                          <SelectValue placeholder="This year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="this-year">This year</SelectItem>
                          <SelectItem value="last-year">Last year</SelectItem>
                          <SelectItem value="all-time">All time</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="sm">
                        <Filter size={14} className="mr-1" />
                        Filters
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="text-2xl font-bold">{totalRevenue.toFixed(2)} SOL</div>
                      <div className="text-sm">revenue</div>
                      <Badge className={`${revenueChange >= 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} px-1.5 py-0.5 text-xs`}>
                        {revenueChangeFormatted}
                      </Badge>
                    </div>

                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart
                          data={chartData}
                          margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
                        >
                          <defs>
                            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="rgb(249, 115, 22)" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="rgb(249, 115, 22)" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid 
                            strokeDasharray="3 3" 
                            stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} 
                            opacity={0.5} 
                          />
                          <XAxis 
                            dataKey="displayLabel" 
                            tick={{ 
                              fontSize: 12, 
                              fill: theme === 'dark' ? '#9ca3af' : '#6b7280' 
                            }}
                            stroke={theme === 'dark' ? '#4b5563' : '#d1d5db'}
                            tickLine={false}
                          />
                          <YAxis 
                            tick={{ 
                              fontSize: 12, 
                              fill: theme === 'dark' ? '#9ca3af' : '#6b7280' 
                            }}
                            stroke={theme === 'dark' ? '#4b5563' : '#d1d5db'}
                            tickLine={false}
                            domain={[0, yAxisMax]}
                            tickFormatter={(value) => `${value.toFixed(1)}`}
                            label={{ 
                              value: 'SOL', 
                              angle: -90, 
                              position: 'insideLeft', 
                              style: { 
                                textAnchor: 'middle', 
                                fill: theme === 'dark' ? '#9ca3af' : '#6b7280', 
                                fontSize: 12 
                              } 
                            }}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                              border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
                              borderRadius: '8px',
                              padding: '8px 12px',
                            }}
                            labelStyle={{ 
                              color: theme === 'dark' ? '#f3f4f6' : '#111827', 
                              fontWeight: 600, 
                              marginBottom: '4px' 
                            }}
                            formatter={(value: number) => [`${value?.toFixed(2) || '0.00'} SOL`, 'Revenue']}
                            labelFormatter={(label: string) => {
                              const data = chartData.find((d: { displayLabel: string }) => d.displayLabel === label)
                              return data ? data.monthFull : label
                            }}
                          />
                          {/* Bar Chart - Revenue bars with gradient fill */}
                          <Bar 
                            dataKey="revenue" 
                            fill="url(#revenueGradient)"
                            radius={[6, 6, 0, 0]}
                            stroke="rgb(249, 115, 22)"
                            strokeWidth={2}
                            barSize={45}
                          />
                          {/* Line Chart - Revenue trend line on top */}
                          <Line 
                            type="monotone" 
                            dataKey="revenue" 
                            stroke="rgb(249, 115, 22)" 
                            strokeWidth={3}
                            dot={{ 
                              fill: '#ffffff', 
                              stroke: 'rgb(249, 115, 22)', 
                              strokeWidth: 3, 
                              r: 5 
                            }}
                            activeDot={{ 
                              r: 8, 
                              stroke: '#ffffff', 
                              strokeWidth: 2,
                              fill: 'rgb(249, 115, 22)'
                            }}
                            strokeDasharray="0"
                          />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                      Service Performance
                      <TooltipProvider>
                        <UITooltip>
                          <TooltipTrigger>
                            <Info size={14} className="ml-1 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Current service performance</p>
                          </TooltipContent>
                        </UITooltip>
                      </TooltipProvider>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center mb-4">
                      <div className="relative h-40 w-40">
                        {/* Background circle */}
                        <div className="absolute inset-0 rounded-full border-[16px] border-gray-100 dark:border-gray-700"></div>

                        {/* Progress circle - calculated based on performance */}
                        <div
                          className="absolute inset-0 rounded-full border-[16px] border-transparent border-t-orange-500 border-r-orange-500"
                          style={{ transform: `rotate(${(dashboardStats.performancePercentage / 100) * 180}deg)` }}
                        ></div>

                        {/* Inner content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div className="text-3xl font-bold">{dashboardStats.performancePercentage.toFixed(1)}%</div>
                          <div className="text-xs text-gray-500">Since yesterday</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-1 w-4 bg-orange-500 rounded"></div>
                          <div className="text-sm">Total Jobs per day</div>
                        </div>
                        <div className="text-xs text-gray-500">{dashboardStats.jobsPerDay.toFixed(1)}</div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-1 w-4 bg-orange-200 rounded"></div>
                          <div className="text-sm">Average Jobs</div>
                        </div>
                        <div className="text-xs text-gray-500">{dashboardStats.averageJobsToday}</div>
                      </div>

                      <Button variant="ghost" size="sm" className="w-full text-gray-500 gap-1 mt-4">
                        See Details
                        <ChevronRight size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Visits and Top Services */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                      Total visits by hourly
                      <TooltipProvider>
                        <UITooltip>
                          <TooltipTrigger>
                            <Info size={14} className="ml-1 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Hourly visit statistics</p>
                          </TooltipContent>
                        </UITooltip>
                      </TooltipProvider>
                    </CardTitle>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal size={16} />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="text-2xl font-bold">{dashboardStats.totalVisits.toLocaleString()}</div>
                      <Badge className={`${dashboardStats.visitsChange >= 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} px-1.5 py-0.5 text-xs`}>
                        {dashboardStats.visitsChange >= 0 ? '+' : ''}{dashboardStats.visitsChange.toFixed(1)}%
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      {hourlyVisitData.map((dayData, dayIndex) => {
                        const maxVisits = Math.max(...dayData.hours.map(h => h.visits), 1)
                        
                        return (
                          <div key={dayIndex} className="flex items-center gap-1 text-xs text-gray-500">
                            <div className="w-8">{dayData.day}</div>
                            <div className="grid grid-cols-12 gap-1 flex-1 items-end">
                              {dayData.hours.map((hourData, hourIndex) => {
                                const heightPercent = maxVisits > 0 
                                  ? Math.max((hourData.visits / maxVisits) * 100, 0) 
                                  : 0
                                const heightPx = (heightPercent / 100) * 24 // Max height is 24px (h-6)
                                
                                return (
                                  <div
                                    key={hourIndex}
                                    className={`rounded transition-all ${
                                      hourData.visits > 0
                                        ? "bg-gray-200 dark:bg-gray-600"
                                        : "bg-gray-100 dark:bg-gray-700"
                                    }`}
                                    style={{ 
                                      height: `${Math.max(heightPx, 2)}px`,
                                      minHeight: '2px'
                                    }}
                                    title={`${hourData.hour}:00 - ${hourData.visits.toLocaleString()} visits`}
                                  ></div>
                                )
                              })}
                            </div>
                          </div>
                        )
                      })}
                    </div>

                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                      Top Services
                      <TooltipProvider>
                        <UITooltip>
                          <TooltipTrigger>
                            <Info size={14} className="ml-1 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Best performing services</p>
                          </TooltipContent>
                        </UITooltip>
                      </TooltipProvider>
                    </CardTitle>
                    <Button variant="ghost" size="sm" className="text-orange-500 gap-1">
                      See Details
                      <ChevronRight size={16} />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {topServices.length > 0 ? (
                      <div className="space-y-4">
                        {topServices.map((service, index) => (
                          <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            <div className="flex items-center gap-3 flex-1">
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 font-bold text-sm">
                                {index + 1}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-sm truncate">{service.name}</div>
                                <div className="text-xs text-gray-500">{service.jobs} jobs</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <div className="font-semibold text-sm">{service.revenue} SOL</div>
                                <div className={`text-xs ${
                                  service.trend === 'up' ? 'text-green-600' : 
                                  service.trend === 'down' ? 'text-red-600' : 
                                  'text-gray-500'
                                }`}>
                                  {service.trend === 'up' ? '↑' : service.trend === 'down' ? '↓' : '→'} 
                                  {service.trend}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500 text-sm">
                        No services hired yet. Hire services from the marketplace to see them here.
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </main>
      </div>
      {isMobileView && showMobileSidebar && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowMobileSidebar(false)} />
      )}
    </div>
  )
}

