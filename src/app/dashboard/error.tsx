"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <CardTitle>Dashboard Error</CardTitle>
          </div>
          <CardDescription>
            Something went wrong in the dashboard. Please try again.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {process.env.NODE_ENV === "development" && (
            <div className="rounded-md bg-gray-100 p-3 text-sm">
              <p className="font-semibold">Error Details:</p>
              <p className="mt-1 text-gray-600">{error.message}</p>
              {error.digest && (
                <p className="mt-1 text-xs text-gray-500">Digest: {error.digest}</p>
              )}
            </div>
          )}
          <div className="flex gap-2">
            <Button onClick={reset} className="flex-1">
              Try again
            </Button>
            <Button variant="outline" asChild className="flex-1">
              <Link href="https://app.palpaxai.network">
                Go to dashboard
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


