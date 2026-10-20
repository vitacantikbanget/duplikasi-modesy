import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const path = request.nextUrl.pathname
  const demoRole = request.cookies.get('demo_role')?.value

  // 1. If visiting Admin panel (/admin)
  if (path.startsWith('/admin')) {
    if (path === '/admin/login') {
      return supabaseResponse
    }
    // If not already in an admin role, auto-set demo admin role so session is never lost
    if (!['super_admin', 'admin', 'moderator'].includes(demoRole || '')) {
      // Set persistent 1-year cookie for admin
      supabaseResponse.cookies.set('demo_role', 'admin', {
        path: '/',
        maxAge: 31536000,
        sameSite: 'lax',
      })
    }
    return supabaseResponse
  }

  // 2. If visiting Vendor Dashboard (/dashboard)
  if (path.startsWith('/dashboard')) {
    // CRITICAL: If user is logged in as admin/super_admin/moderator, DO NOT change to vendor!
    // Admin has full vendor dashboard access as "Hi, Admin"
    if (['super_admin', 'admin', 'moderator'].includes(demoRole || '')) {
      return supabaseResponse
    }

    // Only set vendor if no role exists yet
    if (!['vendor'].includes(demoRole || '')) {
      supabaseResponse.cookies.set('demo_role', 'vendor', {
        path: '/',
        maxAge: 31536000,
        sameSite: 'lax',
      })
    }
    return supabaseResponse
  }

  // 3. For public storefront routes (/ and others)
  // Keep active demoRole intact (whether guest, vendor, or admin)
  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
