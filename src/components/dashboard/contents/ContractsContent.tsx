"use client"

import { useState } from "react"
import {
  CheckCircle2,
  Circle,
  Clock,
  Filter,
  Plus,
  Search,
  Tag,
  Trash2,
  X,
  FileText,
  DollarSign,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

// Generate random price below 1 SOL (0.01 to 0.99)
const generateRandomPrice = () => {
  return Math.random() * 0.98 + 0.01 // Random between 0.01 and 0.99
}

// Sample data for contracts
const initialContracts = [
  {
    id: 1,
    title: "AI Chatbot Development Contract",
    description: "Develop and deploy an AI chatbot service for customer support",
    status: "in-progress",
    priority: "high",
    client: "Tech Corp",
    amount: generateRandomPrice(),
    tags: ["AI", "Development"],
  },
  {
    id: 2,
    title: "API Integration Service",
    description: "Integration of payment API with existing system",
    status: "todo",
    priority: "critical",
    client: "Finance Inc",
    amount: generateRandomPrice(),
    tags: ["API", "Integration"],
  },
  {
    id: 3,
    title: "Data Analysis Dashboard",
    description: "Create analytics dashboard with real-time data visualization",
    status: "completed",
    priority: "medium",
    client: "Data Solutions",
    amount: generateRandomPrice(),
    tags: ["Analytics", "Dashboard"],
  },
  {
    id: 4,
    title: "Content Generation API",
    description: "Build API service for automated content generation",
    status: "todo",
    priority: "low",
    client: "Media Group",
    amount: generateRandomPrice(),
    tags: ["API", "Content"],
  },
]

export default function ContractsContent() {
  const [contracts, setContracts] = useState(initialContracts)
  const [selectedTab, setSelectedTab] = useState("all")
  const [isAddContractOpen, setIsAddContractOpen] = useState(false)
  const [newContract, setNewContract] = useState<{
    title: string
    description: string
    status: string
    priority: string
    client: string
    amount: number
    tags: string[]
  }>({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    client: "",
    amount: 0,
    tags: [],
  })
  const [tagInput, setTagInput] = useState("")

  // Filter contracts based on selected tab
  const filteredContracts = selectedTab === "all" ? contracts : contracts.filter((contract) => contract.status === selectedTab)

  const handleAddContract = () => {
    if (!newContract.title) return

    const contract = {
      ...newContract,
      id: contracts.length + 1,
    }

    setContracts([...contracts, contract])
    setIsAddContractOpen(false)
    setNewContract({
      title: "",
      description: "",
      status: "todo",
      priority: "medium",
      client: "",
      amount: 0,
      tags: [],
    })
  }


  const handleStatusChange = (id: number, newStatus: string) => {
    setContracts(contracts.map((contract) => (contract.id === id ? { ...contract, status: newStatus } : contract)))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-500 text-white"
      case "high":
        return "bg-orange-500 text-white"
      case "medium":
        return "bg-blue-500 text-white"
      case "low":
        return "bg-green-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="text-green-500" size={18} />
      case "in-progress":
        return <Clock className="text-blue-500" size={18} />
      case "todo":
        return <Circle className="text-gray-400" size={18} />
      default:
        return <Circle className="text-gray-400" size={18} />
    }
  }

  const handleAddTag = () => {
    if (!tagInput.trim()) return

    setNewContract({
      ...newContract,
      tags: [...newContract.tags, tagInput.trim()],
    })
    setTagInput("")
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setNewContract({
      ...newContract,
      tags: newContract.tags.filter((tag) => tag !== tagToRemove),
    })
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Contracts</h1>
          <p className="text-gray-500">Manage your service contracts and agreements</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter size={16} />
            Filters
          </Button>
          <Dialog open={isAddContractOpen} onOpenChange={setIsAddContractOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-gray-900 hover:bg-black text-white">
                <Plus size={16} />
                Add Contract
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Contract</DialogTitle>
                <DialogDescription>Create a new contract with details and terms.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Title
                  </label>
                  <Input
                    id="title"
                    value={newContract.title}
                    onChange={(e) => setNewContract({ ...newContract, title: e.target.value })}
                    placeholder="Contract title"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    value={newContract.description}
                    onChange={(e) => setNewContract({ ...newContract, description: e.target.value })}
                    placeholder="Contract description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="priority" className="text-sm font-medium">
                      Priority
                    </label>
                    <Select
                      value={newContract.priority}
                      onValueChange={(value) => setNewContract({ ...newContract, priority: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="status" className="text-sm font-medium">
                      Status
                    </label>
                    <Select value={newContract.status} onValueChange={(value) => setNewContract({ ...newContract, status: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todo">To Do</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="client" className="text-sm font-medium">
                    Client
                  </label>
                  <Input
                    id="client"
                    value={newContract.client}
                    onChange={(e) => setNewContract({ ...newContract, client: e.target.value })}
                    placeholder="Client name"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="amount" className="text-sm font-medium">
                    Amount (SOL)
                  </label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    min="0.01"
                    max="0.99"
                    value={newContract.amount}
                    onChange={(e) => setNewContract({ ...newContract, amount: parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="tags" className="text-sm font-medium">
                    Tags
                  </label>
                  <div className="flex gap-2">
                    <Input
                      id="tags"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Add tag"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleAddTag()
                        }
                      }}
                    />
                    <Button type="button" onClick={handleAddTag} variant="outline">
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newContract.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <X size={14} className="cursor-pointer" onClick={() => handleRemoveTag(tag)} />
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddContractOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddContract}>Save Contract</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Contract Tabs and Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setSelectedTab}>
          <TabsList className="grid grid-cols-4 w-full md:w-auto">
            <TabsTrigger value="all">All Contracts</TabsTrigger>
            <TabsTrigger value="todo">To Do</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input type="search" placeholder="Search contracts..." className="w-full pl-8" />
        </div>
      </div>

      {/* Contract List */}
      <div className="space-y-4">
        {filteredContracts.map((contract) => (
          <Card key={contract.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="p-4 flex-1">
                  <div className="flex items-start gap-3">
                    <div
                      className="mt-1 cursor-pointer"
                      onClick={() => {
                        const newStatus = contract.status === "completed" ? "todo" : "completed"
                        handleStatusChange(contract.id, newStatus)
                      }}
                    >
                      {getStatusIcon(contract.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <h3 className="font-medium text-lg">{contract.title}</h3>
                        <Badge className={`${getPriorityColor(contract.priority)}`}>
                          {contract.priority.charAt(0).toUpperCase() + contract.priority.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-gray-500 text-sm mt-1">{contract.description}</p>

                      <div className="flex flex-wrap gap-2 mt-3">
                        {contract.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="flex items-center gap-1">
                            <Tag size={12} />
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <FileText size={14} />
                          Client: {contract.client}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign size={14} />
                          Amount: {typeof contract.amount === 'number' ? contract.amount.toFixed(2) : contract.amount} SOL
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex md:flex-col justify-end border-t md:border-t-0 md:border-l p-2 md:p-4">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                          <Trash2 size={16} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete contract</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredContracts.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
              <FileText className="text-gray-400" size={24} />
            </div>
            <h3 className="text-lg font-medium">No contracts found</h3>
            <p className="text-gray-500 mt-1">
              {selectedTab === "all"
                ? "You don't have any contracts yet. Create one to get started."
                : `You don't have any ${selectedTab.replace("-", " ")} contracts.`}
            </p>
            <Button className="mt-4" variant="outline" onClick={() => setIsAddContractOpen(true)}>
              <Plus size={16} className="mr-2" />
              Add a contract
            </Button>
          </div>
        )}
      </div>
    </>
  )
}

