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
import { CheckCircle2, XCircle, ExternalLink, Copy } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface PaymentResultModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  type: 'success' | 'error'
  title: string
  message: string
  transactionSignature?: string
}

export function PaymentResultModal({
  open,
  onOpenChange,
  type,
  title,
  message,
  transactionSignature,
}: PaymentResultModalProps) {
  const { toast } = useToast()

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: 'Copied!',
      description: 'Transaction signature copied to clipboard',
    })
  }

  const handleViewExplorer = () => {
    if (transactionSignature) {
      window.open(`https://solscan.io/tx/${transactionSignature}`, '_blank')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            {type === 'success' ? (
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            ) : (
              <XCircle className="h-8 w-8 text-red-500" />
            )}
            <DialogTitle className="text-2xl font-semibold">
              {title}
            </DialogTitle>
          </div>
          <DialogDescription className="text-base pt-2">
            {message}
          </DialogDescription>
        </DialogHeader>

        {transactionSignature && (
          <div className="py-4 space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700 mb-1">Transaction Signature:</p>
                  <p className="text-xs font-mono text-gray-600 break-all">
                    {transactionSignature.substring(0, 8)}...{transactionSignature.substring(transactionSignature.length - 8)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(transactionSignature)}
                  className="shrink-0"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <Button
              variant="outline"
              onClick={handleViewExplorer}
              className="w-full"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              View on Solana Explorer
            </Button>
          </div>
        )}

        <DialogFooter>
          <Button
            type="button"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


