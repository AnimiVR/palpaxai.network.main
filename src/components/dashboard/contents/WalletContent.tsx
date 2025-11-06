"use client"

import { useState, useEffect } from "react"
import {
  Wallet,
  Copy,
  CheckCircle,
  ExternalLink,
  Loader2,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import { usePhantomWallet } from "@/hooks/usePhantomWallet"

export default function WalletContent() {
  const {
    connected,
    publicKeyString,
    isConnecting,
    isPhantomInstalled,
    connect,
    disconnect,
  } = usePhantomWallet()
  const { toast } = useToast()

  const [copied, setCopied] = useState(false)
  const [balance, setBalance] = useState<string>("0.00")
  const [isLoadingBalance, setIsLoadingBalance] = useState(false)
  const [claimableSol, setClaimableSol] = useState<string>("0.00")
  const [isClaiming, setIsClaiming] = useState(false)

  // Handle wallet connect
  const handleConnectWallet = async () => {
    if (!isPhantomInstalled) {
      toast({
        title: "Phantom Not Found",
        description: "Please install Phantom wallet to continue",
        variant: "destructive",
      })
      window.open('https://phantom.app/', '_blank')
      return
    }
    await connect()
  }

  const handleDisconnect = async () => {
    await disconnect()
  }

  const handleCopyAddress = () => {
    if (publicKeyString) {
      navigator.clipboard.writeText(publicKeyString)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast({
        title: "Copied!",
        description: "Wallet address copied to clipboard",
      })
    }
  }

  // Format wallet address for display
  const formatAddress = (address: string) => {
    if (!address) return ""
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  // Fetch wallet balance
  useEffect(() => {
    const fetchBalance = async () => {
      if (!connected || !publicKeyString) {
        setBalance("0.00")
        return
      }

      setIsLoadingBalance(true)
      try {
        // Use API route to fetch balance (server-side RPC call)
        const response = await fetch(`/api/wallet/balance?address=${publicKeyString}`)
        const data = await response.json()

        if (data.success && data.balance) {
          setBalance(data.balance)
        } else {
          console.warn("Failed to fetch balance:", data.error)
          setBalance("0.00")
        }
      } catch (error) {
        console.error("Error fetching balance:", error)
        setBalance("0.00")
      } finally {
        setIsLoadingBalance(false)
      }
    }

    fetchBalance()
    // Refresh balance every 30 seconds
    const interval = setInterval(fetchBalance, 30000)
    return () => clearInterval(interval)
  }, [connected, publicKeyString])

  // Fetch claimable SOL (mock data - replace with actual API call)
  useEffect(() => {
    if (connected && publicKeyString) {
      // TODO: Replace with actual API call to check claimable SOL
      // For now, using mock data
      setClaimableSol("0.00")
    } else {
      setClaimableSol("0.00")
    }
  }, [connected, publicKeyString])

  // Handle Claim SOL
  const handleClaimSol = async () => {
    if (!connected || !publicKeyString) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      })
      return
    }

    if (parseFloat(claimableSol) <= 0) {
      toast({
        title: "No SOL to Claim",
        description: "You don't have any claimable SOL at the moment",
        variant: "destructive",
      })
      return
    }

    setIsClaiming(true)
    
    try {
      // TODO: Replace with actual claim SOL logic
      // This is a mock implementation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast({
        title: "Claim Successful!",
        description: `${claimableSol} SOL has been claimed to your wallet`,
      })
      
      // Reset claimable SOL after successful claim
      setClaimableSol("0.00")
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to claim SOL. Please try again."
      toast({
        title: "Claim Failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsClaiming(false)
    }
  }

  // If not connected, show connect screen
  if (!connected || !publicKeyString) {
    return (
      <>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-0">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Wallet</h1>
            <p className="text-gray-500 text-sm sm:text-base">
              Connect your Phantom wallet to get started
            </p>
          </div>
        </div>

        {/* Connect Card */}
        <Card className="border-2 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-4 mb-4">
              <Wallet className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Connect Your Wallet</h2>
            <p className="text-gray-500 dark:text-gray-400 text-center mb-6 max-w-md">
              Connect your Phantom wallet to view your wallet address and manage your funds.
            </p>

            {!isPhantomInstalled && (
              <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg max-w-md">
                <p className="text-sm text-amber-800 dark:text-amber-200 text-center">
                  <strong>Phantom wallet is not installed.</strong><br />
                  Click below to install it from the official website.
                </p>
              </div>
            )}

            <Button
              onClick={handleConnectWallet}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isConnecting}
            >
              {isConnecting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Wallet className="mr-2 h-5 w-5" />
                  {isPhantomInstalled ? "Connect Phantom Wallet" : "Install Phantom Wallet"}
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </>
    )
  }

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Wallet</h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Manage your Phantom wallet and view your balance
          </p>
        </div>
        <Button 
          onClick={handleDisconnect} 
          variant="outline"
          size="sm"
          className="border-red-200 hover:bg-red-50 hover:border-red-300 dark:border-red-900 dark:hover:bg-red-950"
        >
          Disconnect
        </Button>
      </div>

      {/* Wallet Balance & Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Balance Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoadingBalance ? (
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              ) : (
                `${balance} SOL`
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Solana Mainnet
            </p>
          </CardContent>
        </Card>

        {/* Wallet Status Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Connected</div>
            <p className="text-xs text-muted-foreground mt-1">
              Phantom Wallet
            </p>
          </CardContent>
        </Card>

        {/* Claimable SOL Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Claimable</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{claimableSol} SOL</div>
            <p className="text-xs text-muted-foreground mt-1 mb-3">
              Available to claim
            </p>
            <Button
              onClick={handleClaimSol}
              disabled={isClaiming || parseFloat(claimableSol) <= 0}
              size="sm"
              className="w-full bg-green-600 hover:bg-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isClaiming ? (
                <>
                  <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                  Claiming...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-3 w-3" />
                  Claim SOL
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Wallet Address Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Wallet Address
          </CardTitle>
          <CardDescription>
            Your Phantom wallet public key
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border">
            <div className="flex-1 min-w-0">
              <code className="text-sm font-mono text-gray-900 dark:text-gray-100 break-all">
                {publicKeyString}
              </code>
              <div className="mt-1">
                <span className="text-xs text-muted-foreground font-mono">
                  {formatAddress(publicKeyString)}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleCopyAddress}
                      className="h-9 w-9"
                    >
                      {copied ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {copied ? "Copied!" : "Copy address"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => window.open(`https://solscan.io/account/${publicKeyString}`, "_blank")}
                      className="h-9 w-9"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>View on Solscan</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Manage your wallet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => window.open(`https://solscan.io/account/${publicKeyString}`, "_blank")}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              View on Solscan
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleCopyAddress}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Address
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
