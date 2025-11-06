import { NextRequest, NextResponse } from 'next/server'

// Hugging Face Inference API - hoàn toàn miễn phí
// Model: mistralai/Mistral-7B-Instruct-v0.2 (miễn phí, không cần API key cho public models)
const HUGGINGFACE_API_URL = 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2'

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages are required' },
        { status: 400 }
      )
    }

    // Format messages for Hugging Face
    const conversationHistory = messages
      .map((msg: { role: string; content: string }) => {
        if (msg.role === 'user') {
          return `[INST] ${msg.content} [/INST]`
        } else if (msg.role === 'assistant') {
          return msg.content
        }
        return null
      })
      .filter(Boolean)
      .join('\n\n')

    // Get the last user message
    const lastUserMessage = messages[messages.length - 1]
    if (!lastUserMessage || lastUserMessage.role !== 'user') {
      return NextResponse.json(
        { error: 'Last message must be from user' },
        { status: 400 }
      )
    }

    // Build prompt with context about PalPaxAI
    const systemPrompt = `You are PalPaxAI Assistant, a helpful AI assistant for the PalPaxAI platform. PalPaxAI is a platform for AI services, payments on Solana blockchain, and AI agent marketplace. Be friendly, helpful, and concise. Always respond in English. Answer questions about PalPaxAI services, Solana payments, AI agents, and how to use the platform in clear, professional English.`

    const fullPrompt = `${systemPrompt}\n\n${conversationHistory}\n\n[INST] ${lastUserMessage.content} [/INST]`

    // Call Hugging Face Inference API
    const response = await fetch(HUGGINGFACE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: fullPrompt,
        parameters: {
          max_new_tokens: 512,
          temperature: 0.7,
          top_p: 0.9,
          return_full_text: false,
        },
      }),
    })

    if (!response.ok) {
      // If model is loading, return a fallback response
      if (response.status === 503) {
        return NextResponse.json({
          content: "I'm currently initializing. Please wait a moment and try again, or I can help you with basic questions about PalPaxAI services, Solana payments, and AI agents right now!",
        })
      }

      const errorText = await response.text()
      console.error('Hugging Face API error:', errorText)
      
      // Fallback to a simple response generator
      return NextResponse.json({
        content: generateFallbackResponse(lastUserMessage.content),
      })
    }

    const data = await response.json()

    // Extract the generated text
    let content = ''
    if (Array.isArray(data) && data.length > 0 && data[0].generated_text) {
      content = data[0].generated_text.trim()
      // Clean up the response (remove any remaining prompt parts)
      content = content.split('[/INST]').pop()?.trim() || content
    } else if (data.generated_text) {
      content = data.generated_text.trim()
      content = content.split('[/INST]').pop()?.trim() || content
    } else {
      content = generateFallbackResponse(lastUserMessage.content)
    }

    // If response is empty, use fallback
    if (!content || content.length < 10) {
      content = generateFallbackResponse(lastUserMessage.content)
    }

    return NextResponse.json({ content })

  } catch (error) {
    console.error('Chat API error:', error)
    
    // Return a helpful fallback response
    const { messages } = await request.json()
    const lastMessage = messages?.[messages.length - 1]?.content || ''
    
    return NextResponse.json({
      content: generateFallbackResponse(lastMessage),
    })
  }
}

// Fallback response generator when AI service is unavailable
function generateFallbackResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase()

  // Greeting responses
  if (lowerMessage.match(/\b(hi|hello|hey|greetings)\b/)) {
    return "Hello! I'm PalPaxAI Assistant. I can help you with:\n\n• AI services on PalPaxAI\n• Solana payments\n• Creating and managing AI agents\n• Payment gateway integration\n\nWhat would you like to know more about?"
  }

  // Service questions
  if (lowerMessage.match(/\b(service|create service|add service|new service)\b/)) {
    return "To create a service on PalPaxAI:\n\n1. Go to **My Services** from the dashboard\n2. Click **Add Service**\n3. Fill in the service details:\n   - Service name and description\n   - Select service type (AI Agent or API Service)\n   - Set pricing in SOL\n   - Configure capabilities\n\n4. Publish your service to make it available in the marketplace"
  }

  // Payment questions
  if (lowerMessage.match(/\b(payment|pay|solana|sol|wallet|connect wallet)\b/)) {
    return "PalPaxAI supports payments via Solana (SOL):\n\n• Connect your Phantom wallet to make payments\n• All transactions are processed on the Solana blockchain\n• Secure and fast transactions\n• Supported wallets: Phantom, Solflare, Torus\n\nWould you like help connecting your wallet?"
  }

  // AI agent questions
  if (lowerMessage.match(/\b(ai agent|agent|create agent|manage agent)\b/)) {
    return "AI Agents on PalPaxAI:\n\n• Create custom AI agents for your business\n• Integrate with AI models (GPT-4, Claude, etc.)\n• Manage and monitor your agents\n• Marketplace to share and discover agents\n\nWhat use case do you want to create an AI agent for?"
  }

  // General help
  if (lowerMessage.match(/\b(help|how|guide|support)\b/)) {
    return "I can help you with:\n\n📊 **Analytics**: View statistics and performance\n💼 **Services**: Create and manage AI services\n👥 **Clients**: Manage your clients\n💰 **Wallet**: Manage your Solana wallet\n🛒 **Marketplace**: Discover and purchase services\n\nWhat would you like to learn more about?"
  }

  // Default response
  return "Thanks for your question! I'm PalPaxAI Assistant. The AI system is currently initializing. I can help you with:\n\n• AI services on PalPaxAI\n• Solana payments\n• Creating AI agents\n• Using the dashboard\n\nYou can ask more specific questions, or try again in a few seconds!"
}
