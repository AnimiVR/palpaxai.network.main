"use client"

import { useState, useEffect, type ReactNode } from "react"
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
  Bot,
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
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

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div
        className={`bg-white dark:bg-gray-800 border-r dark:border-gray-700 ${sidebarCollapsed ? "w-20" : "w-64"} transition-all duration-300 flex flex-col ${
          isMobileView ? "fixed z-50 h-screen shadow-lg" : ""
        } ${isMobileView && !showMobileSidebar ? "-translate-x-full" : ""}`}
      >
        <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer">
            {!sidebarCollapsed && (
              <>
                <div className="bg-black text-white dark:bg-white dark:text-black p-2 rounded">
                  <Bot size={16} />
                </div>
                <div>
                  <div className="font-semibold dark:text-white">PalPaxAI</div>
                </div>
              </>
            )}
            {sidebarCollapsed && (
              <div className="bg-black text-white dark:bg-white dark:text-black p-2 rounded mx-auto">
                <Bot size={16} />
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
                        <Tooltip>
                          <TooltipTrigger>
                            <Info size={14} className="ml-1 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Total revenue from all services</p>
                          </TooltipContent>
                        </Tooltip>
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
                    <div className="text-3xl font-bold">0 SOL</div>
                    <div className="text-sm text-gray-500">Total revenue</div>

                    <div className="mt-4">
                      <div className="text-sm font-medium mb-2">By service type</div>
                      <div className="flex gap-2 flex-wrap">
                        <Badge className="bg-orange-500 hover:bg-orange-600 text-white py-1 px-3 rounded-md flex items-center gap-1">
                          AI Agents{" "}
                          <span className="bg-white bg-opacity-20 rounded-full w-5 h-5 flex items-center justify-center text-xs ml-1">
                            0
                          </span>
                        </Badge>
                        <Badge className="bg-orange-100 text-orange-800 py-1 px-3 rounded-md flex items-center gap-1">
                          Services{" "}
                          <span className="bg-orange-200 rounded-full w-5 h-5 flex items-center justify-center text-xs ml-1">
                            0
                          </span>
                        </Badge>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <div className="text-sm">New revenue:</div>
                      <div className="text-sm font-medium">0 SOL</div>
                      <ChevronDown className="h-4 w-4 text-red-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                      Active Contracts
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info size={14} className="ml-1 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Current active contracts</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">0</div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="text-sm text-gray-500">vs last month</div>
                      <Badge className="bg-green-100 text-green-800 px-1.5 py-0.5 text-xs">+0%</Badge>
                    </div>

                    <div className="flex items-center justify-between mt-8">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 bg-orange-500 rounded"></div>
                        <div className="h-6 w-10 bg-orange-300 rounded"></div>
                        <div className="h-6 w-4 bg-orange-200 rounded"></div>
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
                        <Tooltip>
                          <TooltipTrigger>
                            <Info size={14} className="ml-1 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Total completed jobs</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">0</div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="text-sm text-gray-500">vs last month</div>
                      <Badge className="bg-green-100 text-green-800 px-1.5 py-0.5 text-xs">+0%</Badge>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="relative h-24 w-24">
                        <div className="absolute inset-0 rounded-full border-8 border-orange-100"></div>
                        <div
                          className="absolute inset-0 rounded-full border-8 border-transparent border-t-orange-500"
                          style={{ transform: "rotate(45deg)" }}
                        ></div>
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
                        <Tooltip>
                          <TooltipTrigger>
                            <Info size={14} className="ml-1 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Revenue analytics over time</p>
                          </TooltipContent>
                        </Tooltip>
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
                      <div className="text-2xl font-bold">0 SOL</div>
                      <div className="text-sm">revenue</div>
                      <Badge className="bg-red-100 text-red-800 px-1.5 py-0.5 text-xs">-0%</Badge>
                    </div>

                    <div className="h-64 w-full relative">
                      {/* Chart background */}
                      <div className="absolute inset-0 bg-gradient-to-b from-orange-100/50 to-transparent rounded-lg"></div>

                      {/* Chart line */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
                        <path
                          d="M0,180 C50,160 100,140 150,130 C200,120 250,140 300,130 C350,120 400,100 450,90 C500,80 550,100 600,80 C650,60 700,40 750,30 L750,200 L0,200 Z"
                          fill="none"
                          stroke="rgb(249, 115, 22)"
                          strokeWidth="2"
                        />
                        {/* Data points */}
                        <circle cx="150" cy="130" r="4" fill="white" stroke="rgb(249, 115, 22)" strokeWidth="2" />
                        <circle cx="300" cy="130" r="4" fill="white" stroke="rgb(249, 115, 22)" strokeWidth="2" />
                        <circle cx="450" cy="90" r="4" fill="white" stroke="rgb(249, 115, 22)" strokeWidth="2" />
                        <circle cx="600" cy="80" r="4" fill="white" stroke="rgb(249, 115, 22)" strokeWidth="2" />
                        <circle cx="750" cy="30" r="4" fill="white" stroke="rgb(249, 115, 22)" strokeWidth="2" />

                        {/* Highlight point */}
                        <g transform="translate(540, 50)">
                          <rect x="-20" y="-15" width="40" height="25" rx="4" fill="black" />
                          <text x="0" y="0" textAnchor="middle" fill="white" dominantBaseline="middle" fontSize="12">
                            0%
                          </text>
                          <rect x="-5" y="10" width="10" height="100" rx="5" fill="rgb(249, 115, 22)" opacity="0.7" />
                        </g>
                      </svg>

                      {/* X-axis labels */}
                      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 px-4">
                        <div>JAN</div>
                        <div>FEB</div>
                        <div>MAR</div>
                        <div>APR</div>
                        <div>MAY</div>
                        <div>JUN</div>
                        <div>JUL</div>
                        <div>AUG</div>
                      </div>

                      {/* Y-axis labels */}
                      <div className="absolute top-0 left-0 bottom-0 flex flex-col justify-between text-xs text-gray-500 py-4">
                        <div>5 SOL</div>
                        <div>4 SOL</div>
                        <div>3 SOL</div>
                        <div>2 SOL</div>
                        <div>1 SOL</div>
                        <div>0 SOL</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                      Service Performance
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info size={14} className="ml-1 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Current service performance</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center mb-4">
                      <div className="relative h-40 w-40">
                        {/* Background circle */}
                        <div className="absolute inset-0 rounded-full border-[16px] border-gray-100"></div>

                        {/* Progress circle */}
                        <div
                          className="absolute inset-0 rounded-full border-[16px] border-transparent border-t-orange-500 border-r-orange-500"
                          style={{ transform: "rotate(60deg)" }}
                        ></div>

                        {/* Inner content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div className="text-3xl font-bold">0%</div>
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
                        <div className="text-xs text-gray-500">For week</div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-1 w-4 bg-orange-200 rounded"></div>
                          <div className="text-sm">Average Jobs</div>
                        </div>
                        <div className="text-xs text-gray-500">For today</div>
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
                        <Tooltip>
                          <TooltipTrigger>
                            <Info size={14} className="ml-1 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Hourly visit statistics</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CardTitle>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal size={16} />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="text-2xl font-bold">0</div>
                      <Badge className="bg-green-100 text-green-800 px-1.5 py-0.5 text-xs">+0%</Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <div className="w-8">MON</div>
                        <div className="grid grid-cols-12 gap-1 flex-1">
                          {Array(12)
                            .fill(0)
                            .map((_, i) => (
                              <div key={i} className={`h-6 rounded ${i === 3 ? "bg-orange-200" : "bg-gray-100"}`}></div>
                            ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <div className="w-8">TUE</div>
                        <div className="grid grid-cols-12 gap-1 flex-1">
                          {Array(12)
                            .fill(0)
                            .map((_, i) => (
                              <div
                                key={i}
                                className={`h-6 rounded ${i === 10 ? "bg-orange-400" : "bg-gray-100"}`}
                              ></div>
                            ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <div className="w-8">WED</div>
                        <div className="grid grid-cols-12 gap-1 flex-1">
                          {Array(12)
                            .fill(0)
                            .map((_, i) => (
                              <div key={i} className={`h-6 rounded ${i === 8 ? "bg-orange-500" : "bg-gray-100"}`}></div>
                            ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4 text-xs">
                      <Badge className="bg-orange-200 text-orange-800 px-1.5 py-0.5">9:00-10:00 AM</Badge>
                      <Button variant="ghost" size="icon" className="h-5 w-5">
                        <X size={12} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                      Top Services
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info size={14} className="ml-1 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Best performing services</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CardTitle>
                    <Button variant="ghost" size="sm" className="text-orange-500 gap-1">
                      See Details
                      <ChevronRight size={16} />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-gray-500 text-sm">
                      No services yet. Create your first service to get started.
                    </div>
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

