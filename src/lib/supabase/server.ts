/**
 * ============================================================================
 * Supabase Server Client (Sisi Server / Server Components & Route Handlers)
 * ============================================================================
 * Menginisialisasi klien Supabase untuk digunakan pada React Server Components
 * (RSC), Server Actions, atau API Route Handlers.
 *
 * Menggunakan `createServerClient` dari `@supabase/ssr` dengan memanfaatkan
 * fungsi `cookies()` asinkron bawaan Next.js 16 (App Router) untuk membaca
 * dan memodifikasi cookie sesi HTTP-only secara aman.
 */

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Blok catch ini dipicu jika `setAll` dipanggil dari Server Component murni
            // (karena RSC bersifat read-only untuk headers).
            // Hal ini normal dan dapat diabaikan jika middleware sudah bertugas me-refresh sesi.
          }
        },
      },
    }
  );
}
