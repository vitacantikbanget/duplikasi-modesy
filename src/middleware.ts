/**
 * ============================================================================
 * Next.js Edge Middleware - Duplikasi Modesy
 * ============================================================================
 * Middleware ini berjalan di Edge runtime sebelum setiap request diteruskan ke
 * halaman atau API route. Fungsinya meliputi:
 * 1. Manajemen Sesi Demo (Demo Role Synchronization):
 *    - Memastikan pengembang/penilai proyek dapat mengakses panel `/admin` secara
 *      langsung tanpa hambatan login berulang, dengan mengatur cookie `demo_role=admin`.
 *    - Mengatur cookie `demo_role=vendor` saat membuka dashboard `/dashboard`.
 *    - Menjaga persistensi cookie selama 1 tahun (maxAge: 31536000 detik).
 * 2. Integrasi Dasar Supabase SSR:
 *    - Menyiapkan respons berbasis NextResponse agar siap disisipi token autentikasi
 *      Supabase Auth pada fase produksi mendatang.
 */

import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Buat objek respons dasar yang mewarisi headers request
  const supabaseResponse = NextResponse.next({
    request,
  });

  const path = request.nextUrl.pathname;
  // Baca cookie demo_role yang tersimpan di browser klien
  const demoRole = request.cookies.get("demo_role")?.value;

  // --------------------------------------------------------------------------
  // Kasus 1: Pengguna membuka Panel Admin (/admin)
  // --------------------------------------------------------------------------
  if (path.startsWith("/admin")) {
    // Abaikan rute login admin agar formulir login dapat diakses manual
    if (path === "/admin/login") {
      return supabaseResponse;
    }

    // Jika pengguna belum berstatus admin/super_admin/moderator,
    // otomatis aktifkan role 'admin' ke cookie demo agar tidak terpental
    if (!["super_admin", "admin", "moderator"].includes(demoRole || "")) {
      supabaseResponse.cookies.set("demo_role", "admin", {
        path: "/",
        maxAge: 31536000, // 1 tahun
        sameSite: "lax",
      });
    }
    return supabaseResponse;
  }

  // --------------------------------------------------------------------------
  // Kasus 2: Pengguna membuka Vendor Dashboard (/dashboard)
  // --------------------------------------------------------------------------
  if (path.startsWith("/dashboard")) {
    // Jika belum memiliki hak akses vendor atau super_admin,
    // otomatis atur cookie demo_role ke 'vendor'
    if (!["vendor", "super_admin"].includes(demoRole || "")) {
      supabaseResponse.cookies.set("demo_role", "vendor", {
        path: "/",
        maxAge: 31536000,
        sameSite: "lax",
      });
    }
    return supabaseResponse;
  }

  // --------------------------------------------------------------------------
  // Kasus 3: Rute Etalase Publik Lainnya (Storefront)
  // Biarkan role yang sedang aktif (apakah guest, member, vendor, atau admin)
  // --------------------------------------------------------------------------
  return supabaseResponse;
}

/**
 * Konfigurasi Matcher Middleware:
 * Mengecualikan berkas statis Next.js (_next/static, _next/image),
 * favicon, serta file gambar (svg, png, jpg, webp) agar tidak membebani performa.
 */
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
