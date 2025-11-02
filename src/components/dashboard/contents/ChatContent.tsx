"use client"

import { useState, useRef, useEffect } from "react"
import {
  Copy,
  ThumbsUp,
  Send,
  Paperclip,
  ChevronDown,
  Sparkles,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Sample chat history data
const initialChatHistory = [
  {
    id: 1,
    title: "AI Service Help",
    snippet: "How to create a new AI agent service?",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    selected: true,
  },
  {
    id: 2,
    title: "Payment Integration",
    snippet: "How to integrate Solana payments?",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    selected: false,
  },
]

// Sample conversation data
const initialConversation = [
  {
    id: 1,
    role: "user",
    content: "How can I create a new AI agent service on PalPaxAI?",
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
  },
  {
    id: 2,
    role: "assistant",
    content: `To create a new AI agent service on PalPaxAI:

1. Navigate to **My Services** from the dashboard
2. Click **Add Service** button
3. Fill in the service details:
   - Service name and description
   - Select service type (AI Agent or API Service)
   - Set pricing in SOL
   - Configure capabilities and parameters

4. Publish your service to make it available in the marketplace

Would you like help with any specific step?`,
    timestamp: new Date(Date.now() - 1000 * 60 * 9),
  },
]

// Available AI models
const aiModels = [
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    icon: "✨",
    apiKey: "",
    baseUrl: "https://api.openai.com/v1",
    temperature: 0.7,
    maxTokens: 4096,
    configured: false,
  },
  {
    id: "claude-3",
    name: "Claude 3",
    provider: "Anthropic",
    icon: "🧠",
    apiKey: "",
    baseUrl: "https://api.anthropic.com/v1",
    temperature: 0.5,
    maxTokens: 4000,
    configured: false,
  },
]

export default function ChatContent() {
  const [chatHistory] = useState(initialChatHistory)
  const [conversation, setConversation] = useState(initialConversation)
  const [message, setMessage] = useState("")
  const [models] = useState(aiModels)
  const [selectedModelId, setSelectedModelId] = useState(aiModels[0].id)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showHistory, setShowHistory] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const selectedModel = models.find((model) => model.id === selectedModelId) || models[0]

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [conversation])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [message])

  const handleSendMessage = () => {
    if (!message.trim()) return

    const newUserMessage = {
      id: conversation.length + 1,
      role: "user",
      content: message,
      timestamp: new Date(),
    }
    setConversation([...conversation, newUserMessage])
    setMessage("")

    setIsGenerating(true)
    setTimeout(() => {
      const newAiMessage = {
        id: conversation.length + 2,
        role: "assistant",
        content: `This is a simulated response from ${selectedModel.name}. In a real application, this would connect to your AI service.`,
        timestamp: new Date(),
      }
      setConversation((prev) => [...prev, newAiMessage])
      setIsGenerating(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const date = new Date(timestamp)

    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }

    if (date.getFullYear() === now.getFullYear()) {
      return date.toLocaleDateString([], { month: "short", day: "numeric" })
    }

    return date.toLocaleDateString([], { year: "numeric", month: "short", day: "numeric" })
  }

  return (
    <div className="flex h-[calc(100vh-8rem)]">
      {/* Main Chat Area */}
      <div className={`flex-1 flex flex-col ${showHistory ? "mr-4" : ""}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">AI Chat Assistant</h1>
          </div>
          <div className="flex items-center gap-2">
            <Select value={selectedModelId} onValueChange={setSelectedModelId}>
              <SelectTrigger className="w-[180px]">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{selectedModel.icon}</span>
                    <span>{selectedModel.name}</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {models.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{model.icon}</span>
                      <span>{model.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={() => setShowHistory(!showHistory)}>
              {showHistory ? <ChevronDown /> : <ChevronDown className="rotate-180" />}
            </Button>
          </div>
        </div>

        {/* Chat Messages */}
        <Card className="flex-1 overflow-hidden">
          <CardContent className="p-0 h-full flex flex-col">
            <div className="flex-1 overflow-y-auto p-4">
              {conversation.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Sparkles className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">How can I help you today?</h3>
                  <p className="text-gray-500 max-w-md">
                    Ask me anything about PalPaxAI services, payments, or AI agents.
                  </p>
                </div>
              ) : (
                conversation.map((msg) => (
                  <div
                    key={msg.id}
                    className={`mb-6 ${
                      msg.role === "user" ? "flex justify-end" : "flex justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-3xl ${
                        msg.role === "user"
                          ? "bg-gray-100 rounded-t-lg rounded-l-lg"
                          : "bg-white border rounded-t-lg rounded-r-lg"
                      } p-4`}
                    >
                      {msg.role === "assistant" && (
                        <div className="flex items-center gap-2 mb-2 text-sm text-gray-500">
                          <span className="text-lg">{selectedModel.icon}</span>
                          <span>{selectedModel.name}</span>
                        </div>
                      )}

                      <div className="whitespace-pre-wrap">{msg.content}</div>

                      <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                        <span>{formatTimestamp(msg.timestamp)}</span>

                        {msg.role === "assistant" && (
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <ThumbsUp size={14} />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Copy size={14} />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
              {isGenerating && (
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                  <span>{selectedModel.name} is thinking...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="relative">
                <Textarea
                  ref={textareaRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Message AI Chat Assistant..."
                  className="pr-24 min-h-[60px] max-h-[200px] resize-none"
                  rows={1}
                />
                <div className="absolute right-2 bottom-2 flex items-center gap-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Paperclip size={16} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Attach file</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <Button
                    onClick={handleSendMessage}
                    disabled={!message.trim() || isGenerating}
                    size="sm"
                    className="h-8 px-3 bg-gray-900 hover:bg-black text-white"
                  >
                    <Send size={14} className="mr-1" />
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chat History Sidebar */}
      {showHistory && (
        <div className="w-80 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">History</h2>
            <span className="text-xs text-gray-500">{chatHistory.length}/50</span>
          </div>

          <Button variant="outline" className="mb-4 gap-2 justify-start">
            <Plus size={16} />
            New chat
          </Button>

          <div className="flex-1 overflow-y-auto space-y-2">
            {chatHistory.map((chat) => (
              <div
                key={chat.id}
                className={`p-3 rounded-lg cursor-pointer ${
                  chat.selected ? "bg-gray-100 border-gray-300" : "hover:bg-gray-50"
                }`}
              >
                <div className="font-medium truncate">{chat.title}</div>
                <div className="text-sm text-gray-500 truncate">{chat.snippet}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}




