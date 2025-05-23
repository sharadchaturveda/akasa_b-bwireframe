import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const host = req.headers.get('host');
  const url = req.nextUrl.clone();

  if (host === 'studio.akasa.sg') {
    url.pathname = `/studio${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next()
}

// Ensure this middleware does not interfere with API routes, static assets, or Next internals
export const config = {
  matcher: ['/', '/((?!api|_next|.*\\..*).*)'],
}
