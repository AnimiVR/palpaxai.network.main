/**
 * Utility to get the dashboard URL
 * Returns the subdomain URL if on subdomain, otherwise returns the path
 */
export function getDashboardUrl(path: string = ''): string {
  // Check if we're on the client side
  if (typeof window === 'undefined') {
    // Server-side: use environment variable or default to path
    const dashboardDomain = process.env.NEXT_PUBLIC_DASHBOARD_URL || '/dashboard'
    return path ? `${dashboardDomain}${path.startsWith('/') ? path : `/${path}`}` : dashboardDomain
  }

  // Client-side: check current hostname
  const hostname = window.location.hostname
  
  // If already on app subdomain, use current origin
  if (hostname.startsWith('app.') || hostname === 'app.palpaxai.network') {
    return path ? `${window.location.origin}${path.startsWith('/') ? path : `/${path}`}` : window.location.origin
  }
  
  // Use environment variable if set, otherwise use subdomain
  const dashboardDomain = process.env.NEXT_PUBLIC_DASHBOARD_URL || 'https://app.palpaxai.network'
  return path ? `${dashboardDomain}${path.startsWith('/') ? path : `/${path}`}` : dashboardDomain
}

/**
 * Get dashboard path (for internal routing)
 */
export function getDashboardPath(path: string = ''): string {
  return path ? `/dashboard${path.startsWith('/') ? path : `/${path}`}` : '/dashboard'
}


