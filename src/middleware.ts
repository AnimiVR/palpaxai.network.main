import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const hostname = request.headers.get('host') || ''
  
  // Extract subdomain (e.g., "app" from "app.palpaxai.network")
  const subdomain = hostname.split('.')[0]
  
  // Check if this is the app subdomain (dashboard)
  if (subdomain === 'app' || hostname.startsWith('app.palpaxai.network')) {
    const pathname = url.pathname
    
    // If accessing root of subdomain, redirect to /dashboard
    if (pathname === '/') {
      url.pathname = '/dashboard'
      return NextResponse.rewrite(url)
    }
    
    // If path doesn't start with /dashboard, rewrite it
    if (!pathname.startsWith('/dashboard')) {
      url.pathname = `/dashboard${pathname}`
      return NextResponse.rewrite(url)
    }
    
    // Already on /dashboard path, just continue
    return NextResponse.next()
  }
  
  // For main domain, block direct access to /dashboard if you want
  // Or allow it - this is optional based on your needs
  // If you want to block /dashboard on main domain and force subdomain:
  // if (url.pathname.startsWith('/dashboard') && subdomain !== 'app') {
  //   return NextResponse.redirect(new URL('https://app.palpaxai.network', request.url))
  // }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|public).*)',
  ],
}

