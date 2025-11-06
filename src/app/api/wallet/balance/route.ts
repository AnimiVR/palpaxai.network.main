import { NextRequest, NextResponse } from 'next/server'
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js'

// List of public RPC endpoints to try
const RPC_ENDPOINTS = [
  'https://api.mainnet-beta.solana.com',
  'https://solana-api.projectserum.com',
  'https://rpc.ankr.com/solana',
  'https://solana.public-rpc.com',
]

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const address = searchParams.get('address')

  if (!address) {
    return NextResponse.json(
      { error: 'Wallet address is required' },
      { status: 400 }
    )
  }

  // Validate address format
  let publicKey: PublicKey
  try {
    publicKey = new PublicKey(address)
  } catch {
    return NextResponse.json(
      { error: 'Invalid wallet address' },
      { status: 400 }
    )
  }

  // Try each RPC endpoint until one works
  for (const endpoint of RPC_ENDPOINTS) {
    try {
      const connection = new Connection(endpoint, 'confirmed')
      const balance = await connection.getBalance(publicKey, 'confirmed')
      const solBalance = (balance / LAMPORTS_PER_SOL).toFixed(4)

      return NextResponse.json({
        success: true,
        balance: solBalance,
        endpoint,
      })
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      console.warn(`Failed to fetch balance from ${endpoint}:`, errorMessage)
      // Continue to next endpoint
      continue
    }
  }

  // If all endpoints failed, return error
  return NextResponse.json(
    { error: 'Failed to fetch balance from all RPC endpoints' },
    { status: 500 }
  )
}


