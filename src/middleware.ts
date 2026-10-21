// Middleware ini bertindak seperti "satpam pintu masuk" website.
// Setiap kali ada yang membuka halaman, middleware ini memeriksa peran (role) pengguna lewat cookie
// agar hak akses ke panel Admin atau Vendor berjalan mulus tanpa terputus.

import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Menyiapkan respon default untuk melanjutkan permintaan halaman
  let supabaseResponse = NextResponse.next({
    request,
  })

  // Membaca URL yang sedang diakses dan status cookie peran (role) saat ini
  const path = request.nextUrl.pathname
  const demoRole = request.cookies.get('demo_role')?.value

  // ==========================================
  // 1. Logika untuk Akses Panel Admin (/admin)
  // ==========================================
  if (path.startsWith('/admin')) {
    // Jika sedang di halaman login admin, biarkan masuk tanpa mengubah cookie
    if (path === '/admin/login') {
      return supabaseResponse
    }
    // Jika belum memiliki role admin, secara otomatis kita set role 'admin'
    // Tujuannya agar selama pengujian demo, sesi admin tidak gampang hilang
    if (!['super_admin', 'admin', 'moderator'].includes(demoRole || '')) {
      supabaseResponse.cookies.set('demo_role', 'admin', {
        path: '/',
        maxAge: 31536000, // Cookie disimpan selama 1 tahun
        sameSite: 'lax',
      })
    }
    return supabaseResponse
  }

  // ===================================================
  // 2. Logika untuk Akses Panel Penjual / Vendor (/dashboard)
  // ===================================================
  if (path.startsWith('/dashboard')) {
    // Jika pengguna adalah Admin, jangan ubah ke role vendor,
    // karena Admin berhak mengelola dashboard vendor dengan nama "Hi, Admin"
    if (['super_admin', 'admin', 'moderator'].includes(demoRole || '')) {
      return supabaseResponse
    }

    // Jika pengguna biasa belum memiliki status peran, aktifkan peran vendor
    if (!['vendor'].includes(demoRole || '')) {
      supabaseResponse.cookies.set('demo_role', 'vendor', {
        path: '/',
        maxAge: 31536000,
        sameSite: 'lax',
      })
    }
    return supabaseResponse
  }

  // ===================================================
  // 3. Untuk Rute Toko Publik (Halaman Depan, Produk, dll)
  // ===================================================
  // Biarkan pengguna bernavigasi bebas sesuai perannya (guest, member, vendor, atau admin)
  return supabaseResponse
}

// Konfigurasi URL apa saja yang diawasi oleh satpam middleware
// File gambar, icon, dan aset statis dikecualikan agar performa website tetap super cepat
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
