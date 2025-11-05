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
import { Loader2, Wallet, Clock, User } from 'lucide-react'

interface HireConfirmationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  service: {
    title: string
    price: string
    seller?: string
    timeToComplete?: string
    category?: string
  }
  onConfirm: () => void
  onCancel: () => void
  isLoading?: boolean
}

export function HireConfirmationModal({
  open,
  onOpenChange,
  service,
  onConfirm,
  onCancel,
  isLoading = false,
}: HireConfirmationModalProps) {
  const handleConfirm = () => {
    onConfirm()
  }

  const handleCancel = () => {
    onCancel()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Hire {service.title}?
          </DialogTitle>
          <DialogDescription className="text-base pt-2">
            Please confirm the details before proceeding with the payment.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          {/* Price */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-primary" />
              <span className="font-medium text-gray-700">Price:</span>
            </div>
            <span className="text-lg font-bold text-primary">{service.price}</span>
          </div>

          {/* Seller */}
          {service.seller && (
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-gray-600" />
                <span className="font-medium text-gray-700">Seller:</span>
              </div>
              <span className="text-gray-900 font-medium">{service.seller}</span>
            </div>
          )}

          {/* Delivery Time */}
          {service.timeToComplete && (
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-600" />
                <span className="font-medium text-gray-700">Delivery:</span>
              </div>
              <span className="text-gray-900 font-medium">{service.timeToComplete}</span>
            </div>
          )}

          {/* Category */}
          {service.category && (
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">Category:</span>
              <span className="text-gray-900 font-medium">{service.category}</span>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={isLoading}
            className="w-full sm:w-auto bg-primary hover:bg-primary-700 !text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Wallet className="mr-2 h-4 w-4" />
                Confirm & Pay
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

