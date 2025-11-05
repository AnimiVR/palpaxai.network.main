"use client"

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Wallet, AlertCircle } from 'lucide-react'

interface WalletRequiredModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConnectWallet: () => void
  onGoToDashboard: () => void
}

export function WalletRequiredModal({
  open,
  onOpenChange,
  onConnectWallet,
  onGoToDashboard,
}: WalletRequiredModalProps) {
  const handleConnect = () => {
    onConnectWallet()
    onOpenChange(false)
    // Redirect to dashboard after a short delay to allow wallet connection
    setTimeout(() => {
      onGoToDashboard()
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <AlertCircle className="h-8 w-8 text-orange-500" />
            <DialogTitle className="text-2xl font-semibold">
              Wallet Required
            </DialogTitle>
          </div>
          <DialogDescription className="text-base pt-2">
            You need to connect your wallet to hire an agent.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-700">
              Please connect your Phantom wallet to proceed with the payment. You will be redirected to the dashboard to complete the connection.
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleConnect}
            className="w-full sm:w-auto bg-primary hover:bg-primary-700 !text-white"
          >
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet & Go to Dashboard
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


