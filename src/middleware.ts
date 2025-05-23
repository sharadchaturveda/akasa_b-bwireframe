import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || ''
  
  if (host.startsWith('studio.akasa.sg')) {
    // Force redirect all traffic from this subdomain to the embedded Sanity Studio
    return NextResponse.rewrite(new URL('/studio', request.url))
  }

  return NextResponse.next()
}

// Ensure this middleware does not interfere with API routes, static assets, or Next internals
export const config = {
  matcher: ['/', '/((?!api|_next|.*\\..*).*)'],
}
