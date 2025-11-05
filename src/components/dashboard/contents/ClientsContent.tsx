"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ChevronDown,
  Download,
  Filter,
  MoreHorizontal,
  Search,
  SlidersHorizontal,
  Trash2,
  UserPlus,
  Users,
  Wallet,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { usePhantomWallet } from "@/hooks/usePhantomWallet"

// Empty client data - only show data when wallet is connected
const clients: Array<{
  id: number
  name: string
  email: string
  image: string
  status: "active" | "inactive"
  spent: number
  orders: number
  lastOrder: string
  location: string
}> = []

export default function ClientsContent() {
  const [selectedTab, setSelectedTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const { connected, connect, isConnecting } = usePhantomWallet()

  const handleConnectWallet = () => {
    connect()
  }

  // Filter clients based on tab and search query
  const filteredClients = clients.filter((client) => {
    // Filter by tab
    if (selectedTab === "active" && client.status !== "active") return false
    if (selectedTab === "inactive" && client.status !== "inactive") return false

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        client.name.toLowerCase().includes(query) ||
        client.email.toLowerCase().includes(query) ||
        client.location.toLowerCase().includes(query)
      )
    }

    return true
  })

  // If not connected, show connect wallet screen
  if (!connected) {
    return (
      <>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-0">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Clients</h1>
            <p className="text-gray-500 text-sm sm:text-base">Connect your wallet to manage your clients</p>
          </div>
        </div>

        <Card className="border-2 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-4 mb-4">
              <Wallet className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Connect Your Wallet</h2>
            <p className="text-gray-500 dark:text-gray-400 text-center mb-6 max-w-md">
              Connect your wallet to view and manage your clients on PalPaxAI
            </p>
            <Button
              onClick={handleConnectWallet}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
              disabled={isConnecting}
            >
              <Wallet className="mr-2 h-5 w-5" />
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </Button>
          </CardContent>
        </Card>
      </>
    )
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Clients</h1>
          <p className="text-gray-500 text-sm sm:text-base">Manage your client relationships</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 text-xs sm:text-sm h-8 sm:h-10" asChild>
            <Link href="/">
              <Download size={14} className="sm:size-16" />
              Export
            </Link>
          </Button>
          <Button className="gap-2 bg-gray-900 hover:bg-black text-white text-xs sm:text-sm h-8 sm:h-10">
            <UserPlus size={14} className="sm:size-16" />
            Add Client
          </Button>
        </div>
      </div>

      {/* Tabs and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
        <Tabs defaultValue="all" className="w-full sm:w-auto" onValueChange={setSelectedTab} value={selectedTab}>
          <TabsList className="w-full sm:w-auto grid grid-cols-3 sm:flex">
            <TabsTrigger value="all" className="text-xs sm:text-sm">
              All Clients ({clients.length})
            </TabsTrigger>
            <TabsTrigger value="active" className="text-xs sm:text-sm">
              Active ({clients.filter((c) => c.status === "active").length})
            </TabsTrigger>
            <TabsTrigger value="inactive" className="text-xs sm:text-sm">
              Inactive ({clients.filter((c) => c.status === "inactive").length})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search clients..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="h-10 w-10">
            <Filter size={16} />
          </Button>
          <Button variant="outline" size="icon" className="h-10 w-10">
            <SlidersHorizontal size={16} />
          </Button>
        </div>
      </div>

      {/* Clients Table */}
      <Card>
        <CardHeader className="p-4 flex flex-row items-center justify-between">
          <CardTitle className="text-base font-medium">Client List</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 gap-1">
                <span>Bulk Actions</span>
                <ChevronDown size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Download size={14} className="mr-2" /> Export Selected
              </DropdownMenuItem>
              <DropdownMenuItem>
                <UserPlus size={14} className="mr-2" /> Add to Group
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <Trash2 size={14} className="mr-2" /> Delete Selected
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input type="checkbox" className="rounded border-gray-300" />
                </TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Last Order</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <input type="checkbox" className="rounded border-gray-300" />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={client.image || "/placeholder.svg"} alt={client.name} />
                          <AvatarFallback>
                            {client.name.charAt(0)}
                            {client.name.split(" ")[1]?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{client.name}</div>
                          <div className="text-sm text-gray-500">{client.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          client.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }
                      >
                        {client.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>{client.spent.toFixed(2)} SOL</TableCell>
                    <TableCell>{client.orders}</TableCell>
                    <TableCell>{client.location}</TableCell>
                    <TableCell>{new Date(client.lastOrder).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Client</DropdownMenuItem>
                          <DropdownMenuItem>View Orders</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Delete Client</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <Users size={48} className="mb-2 opacity-20" />
                      <h3 className="text-lg font-medium">No clients found</h3>
                      <p className="text-sm">
                        {searchQuery ? "Try adjusting your search or filters" : "Add a client to get started"}
                      </p>
                      {searchQuery && (
                        <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
                          Clear Search
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}

