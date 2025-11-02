"use client"

import { useState, useEffect, useCallback } from "react"
import {
  Wallet,
  Send,
  ArrowDown,
  Copy,
  CheckCircle,
  ExternalLink,
  QrCode,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useWallet, useConnection } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Transaction, SystemProgram, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js"
import QRCode from "qrcode"
import { useToast } from "@/hooks/use-toast"

interface TransactionData {
  signature: string
  type: "sent" | "received"
  amount: number
  from?: string
  to?: string
  timestamp: Date
  status: string
}

export default function WalletContent() {
  const { connected, publicKey, disconnect, wallet, connect, select, wallets, signTransaction, sendTransaction } = useWallet()
  const { connection } = useConnection()
  const { setVisible } = useWalletModal()
  const { toast } = useToast()
  
  // Debug logging
  useEffect(() => {
    console.log("WalletContent mounted", { 
      setVisible: typeof setVisible, 
      wallets: wallets?.length,
      connected,
      publicKey: publicKey?.toString() 
    })
  }, [setVisible, wallets, connected, publicKey])
  
  const [showSendDialog, setShowSendDialog] = useState(false)
  const [showReceiveDialog, setShowReceiveDialog] = useState(false)
  const [sendAmount, setSendAmount] = useState("")
  const [sendAddress, setSendAddress] = useState("")
  const [copied, setCopied] = useState(false)
  
  // Real data state
  const [balance, setBalance] = useState<number>(0)
  const [balanceUSD, setBalanceUSD] = useState<string>("0.00")
  const [isLoadingBalance, setIsLoadingBalance] = useState(false)
  const [transactions, setTransactions] = useState<TransactionData[]>([])
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("")
  const [isSending, setIsSending] = useState(false)

  // Fetch SOL price in USD
  const fetchSOLPrice = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd')
      const data = await response.json()
      return data.solana?.usd || 0
    } catch (error) {
      console.error("Error fetching SOL price:", error)
      return 0
    }
  }

  // Fetch balance from blockchain
  const fetchBalance = useCallback(async () => {
    if (!publicKey) return
    
    setIsLoadingBalance(true)
    try {
      const lamports = await connection.getBalance(publicKey)
      const solBalance = lamports / LAMPORTS_PER_SOL
      setBalance(solBalance)
      
      const solPrice = await fetchSOLPrice()
      const usdValue = (solBalance * solPrice).toFixed(2)
      setBalanceUSD(usdValue.toLocaleString())
    } catch (error) {
      console.error("Error fetching balance:", error)
      toast({
        title: "Error",
        description: "Failed to fetch balance",
        variant: "destructive",
      })
    } finally {
      setIsLoadingBalance(false)
    }
  }, [publicKey, connection, toast])

  // Fetch transaction history
  const fetchTransactions = useCallback(async () => {
    if (!publicKey) return
    
    setIsLoadingTransactions(true)
    try {
      const signatures = await connection.getSignaturesForAddress(publicKey, { limit: 10 })
      
      const txList: TransactionData[] = []
      
      for (const sigInfo of signatures) {
        const tx = await connection.getTransaction(sigInfo.signature, {
          commitment: 'confirmed',
          maxSupportedTransactionVersion: 0
        })
        
        if (tx && tx.meta) {
          // Parse transaction to determine type and amount
          const preBalances = tx.meta.preBalances
          const postBalances = tx.meta.postBalances
          
          // Find our account index
          const accountKeys = tx.transaction.message.accountKeys.map(k => k.pubkey.toString())
          const ourIndex = accountKeys.findIndex(addr => addr === publicKey.toString())
          
          if (ourIndex !== -1) {
            const balanceDiff = (postBalances[ourIndex] - preBalances[ourIndex]) / LAMPORTS_PER_SOL
            const type = balanceDiff > 0 ? "received" : "sent"
            
            // Get the other party (simplified)
            const otherAccounts = accountKeys.filter((addr, idx) => idx !== ourIndex)
            const otherAccount = otherAccounts[0] || "Unknown"
            
            txList.push({
              signature: sigInfo.signature,
              type: type as "sent" | "received",
              amount: Math.abs(balanceDiff),
              from: type === "received" ? otherAccount.slice(0, 4) + "..." + otherAccount.slice(-4) : undefined,
              to: type === "sent" ? otherAccount.slice(0, 4) + "..." + otherAccount.slice(-4) : undefined,
              timestamp: new Date(sigInfo.blockTime ? sigInfo.blockTime * 1000 : Date.now()),
              status: sigInfo.confirmationStatus || "confirmed"
            })
          }
        }
      }
      
      setTransactions(txList)
    } catch (error) {
      console.error("Error fetching transactions:", error)
      toast({
        title: "Error",
        description: "Failed to fetch transactions",
        variant: "destructive",
      })
    } finally {
      setIsLoadingTransactions(false)
    }
  }, [publicKey, connection, toast])

  // Generate QR code for wallet address
  const generateQRCode = useCallback(async () => {
    if (!publicKey) return
    
    try {
      const url = await QRCode.toDataURL(publicKey.toString(), {
        width: 300,
        margin: 2,
      })
      setQrCodeUrl(url)
    } catch (error) {
      console.error("Error generating QR code:", error)
    }
  }, [publicKey])

  // Handle wallet connect
  const handleConnectWallet = async () => {
    try {
      console.log("handleConnectWallet called", { setVisible: typeof setVisible, wallets: wallets?.length })
      
      // Try to use the wallet modal first
      if (setVisible && typeof setVisible === 'function') {
        console.log("Using setVisible(true) to open modal")
        setVisible(true)
      } else if (wallets && wallets.length > 0) {
        // Fallback: try to connect directly
        const phantomWallet = wallets.find(w => w.adapter.name === 'Phantom')
        if (phantomWallet) {
          console.log("Found Phantom wallet, selecting and connecting directly")
          select(phantomWallet.adapter.name)
          await connect()
        } else if (wallet && wallet.adapter) {
          console.log("Using wallet.connect()")
          await connect()
        } else {
          alert("Please install a Solana wallet extension (Phantom, Solflare, etc.) to connect.")
        }
      } else {
        alert("Please install a Solana wallet extension (Phantom, Solflare, etc.) to connect.")
      }
    } catch (err) {
      console.error("Failed to connect wallet:", err)
      alert("Failed to connect wallet. Please try again.")
    }
  }

  const handleDisconnect = () => {
    disconnect().catch((err) => {
      console.error("Failed to disconnect wallet:", err)
    })
  }

  const handleCopyAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toString())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast({
        title: "Copied!",
        description: "Wallet address copied to clipboard",
      })
    }
  }

  // Handle send transaction
  const handleSend = async () => {
    if (!publicKey || !sendTransaction || !signTransaction) {
      toast({
        title: "Error",
        description: "Wallet not connected or transaction functions not available",
        variant: "destructive",
      })
      return
    }

    if (!sendAddress || !sendAmount) {
      toast({
        title: "Error",
        description: "Please enter recipient address and amount",
        variant: "destructive",
      })
      return
    }

    try {
      const recipientPubkey = new PublicKey(sendAddress)
      const amountInSOL = parseFloat(sendAmount)
      
      if (isNaN(amountInSOL) || amountInSOL <= 0) {
        toast({
          title: "Error",
          description: "Please enter a valid amount",
          variant: "destructive",
        })
        return
      }

      if (amountInSOL > balance) {
        toast({
          title: "Error",
          description: "Insufficient balance",
          variant: "destructive",
        })
        return
      }

      setIsSending(true)

      // Create transaction
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientPubkey,
          lamports: amountInSOL * LAMPORTS_PER_SOL,
        })
      )

      // Get recent blockhash
      const { blockhash } = await connection.getLatestBlockhash()
      transaction.recentBlockhash = blockhash
      transaction.feePayer = publicKey

      // Sign and send transaction
      const signed = await signTransaction(transaction)
      const signature = await sendTransaction(signed, connection)
      
      // Wait for confirmation
      await connection.confirmTransaction(signature, 'confirmed')

      toast({
        title: "Success!",
        description: `Sent ${sendAmount} SOL successfully`,
      })

      // Reset form and close dialog
      setSendAddress("")
      setSendAmount("")
      setShowSendDialog(false)

      // Refresh balance and transactions
      await fetchBalance()
      await fetchTransactions()
    } catch (error: unknown) {
      console.error("Error sending transaction:", error)
      toast({
        title: "Transaction Failed",
        description: error instanceof Error ? error.message : "Failed to send transaction",
        variant: "destructive",
      })
    } finally {
      setIsSending(false)
    }
  }

  // Fetch data when wallet connects
  useEffect(() => {
    if (connected && publicKey) {
      fetchBalance()
      fetchTransactions()
    }
  }, [connected, publicKey, fetchBalance, fetchTransactions])

  // Generate QR code when opening receive dialog
  useEffect(() => {
    if (showReceiveDialog && publicKey) {
      generateQRCode()
    }
  }, [showReceiveDialog, publicKey, generateQRCode])

  // If not connected, show connect screen
  if (!connected || !publicKey) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-0">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Wallet</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
              Connect your wallet to get started
            </p>
          </div>
        </div>

        <Card className="border-2 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-4 mb-4">
              <Wallet className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Connect Your Wallet</h2>
            <p className="text-gray-500 dark:text-gray-400 text-center mb-6 max-w-md">
              Connect your wallet to manage your funds and transactions on PayAI
            </p>
            <Button onClick={handleConnectWallet} size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Wallet className="mr-2 h-5 w-5" />
              Connect Wallet
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Wallet</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
            Manage your wallet and transactions
          </p>
        </div>
        <Button onClick={handleDisconnect} variant="outline">
          Disconnect
        </Button>
      </div>

      {/* Balance Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
            Total Balance
            <button onClick={fetchBalance} className="text-xs text-blue-600 hover:text-blue-700">
              {isLoadingBalance ? <Loader2 className="w-4 h-4 animate-spin" /> : "Refresh"}
            </button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-4xl font-bold">
              {isLoadingBalance ? (
                <Loader2 className="w-8 h-8 animate-spin" />
              ) : (
                balance.toFixed(4)
              )}
            </span>
            <span className="text-lg font-medium text-gray-600 dark:text-gray-400">SOL</span>
          </div>
          <p className="text-gray-500 dark:text-gray-400">≈ ${balanceUSD} USD</p>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className="h-24 flex-col"
          onClick={() => setShowSendDialog(true)}
          disabled={!balance || balance === 0}
        >
          <Send className="h-6 w-6 mb-2 text-blue-600" />
          <span className="font-medium">Send</span>
        </Button>
        <Button
          variant="outline"
          className="h-24 flex-col"
          onClick={() => setShowReceiveDialog(true)}
        >
          <ArrowDown className="h-6 w-6 mb-2 text-green-600" />
          <span className="font-medium">Receive</span>
        </Button>
      </div>

      {/* Wallet Address */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Wallet Address</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <code className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded flex-1 break-all">
              {publicKey.toString()}
            </code>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCopyAddress}
                  >
                    {copied ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <Copy className="h-5 w-5" />
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
                    onClick={() => window.open(`https://solscan.io/account/${publicKey.toString()}`, "_blank")}
                  >
                    <ExternalLink className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>View on Solscan</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardContent>
      </Card>

      {/* Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Transaction History
            <button onClick={fetchTransactions} className="text-xs text-blue-600 hover:text-blue-700">
              {isLoadingTransactions ? <Loader2 className="w-4 h-4 animate-spin" /> : "Refresh"}
            </button>
          </CardTitle>
          <CardDescription>Your recent transactions</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingTransactions ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No transactions yet
            </div>
          ) : (
            <div className="space-y-2">
              {transactions.map((tx) => (
                <div
                  key={tx.signature}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                  onClick={() => window.open(`https://solscan.io/tx/${tx.signature}`, "_blank")}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-full ${
                        tx.type === "sent"
                          ? "bg-red-100 dark:bg-red-900"
                          : "bg-green-100 dark:bg-green-900"
                      }`}
                    >
                      {tx.type === "sent" ? (
                        <Send className={`h-4 w-4 ${
                          tx.type === "sent"
                            ? "text-red-600 dark:text-red-400"
                            : "text-green-600 dark:text-green-400"
                        }`} />
                      ) : (
                        <ArrowDown className={`h-4 w-4 ${
                          tx.type === "sent"
                            ? "text-red-600 dark:text-red-400"
                            : "text-green-600 dark:text-green-400"
                        }`} />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">
                        {tx.type === "sent" ? "Sent" : "Received"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {tx.type === "sent" ? `To ${tx.to}` : `From ${tx.from}`}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        {tx.timestamp.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold ${
                        tx.type === "sent"
                          ? "text-red-600 dark:text-red-400"
                          : "text-green-600 dark:text-green-400"
                      }`}
                    >
                      {tx.type === "sent" ? "-" : "+"}
                      {tx.amount.toFixed(4)} SOL
                    </p>
                    <Badge variant="secondary" className="text-xs mt-1">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {tx.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Send Dialog */}
      <Dialog open={showSendDialog} onOpenChange={setShowSendDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send SOL</DialogTitle>
            <DialogDescription>
              Enter the recipient address and amount to send
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="send-address">Recipient Address</Label>
              <Input
                id="send-address"
                placeholder="Enter wallet address"
                value={sendAddress}
                onChange={(e) => setSendAddress(e.target.value)}
                disabled={isSending}
              />
            </div>
            <div>
              <Label htmlFor="send-amount">Amount (SOL)</Label>
              <Input
                id="send-amount"
                type="number"
                step="0.0000001"
                placeholder="0.00"
                value={sendAmount}
                onChange={(e) => setSendAmount(e.target.value)}
                disabled={isSending}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Available: {balance.toFixed(4)} SOL
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSendDialog(false)} disabled={isSending}>
              Cancel
            </Button>
            <Button onClick={handleSend} disabled={isSending}>
              {isSending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Receive Dialog */}
      <Dialog open={showReceiveDialog} onOpenChange={setShowReceiveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Receive SOL</DialogTitle>
            <DialogDescription>
              Your wallet address to receive funds
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-4">
            {qrCodeUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48" />
            ) : (
              <div className="w-48 h-48 flex items-center justify-center">
                <QrCode className="h-48 w-48 opacity-20" />
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <code className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded flex-1 break-all">
              {publicKey?.toString()}
            </code>
            <Button variant="ghost" size="icon" onClick={handleCopyAddress}>
              {copied ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <Copy className="h-5 w-5" />
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
