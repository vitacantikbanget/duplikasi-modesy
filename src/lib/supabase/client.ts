/**
 * ============================================================================
 * Supabase Browser Client (Sisi Klien / Client Components)
 * ============================================================================
 * Menginisialisasi klien Supabase untuk digunakan pada React Client Components
 * ("use client"). Menggunakan helper `createBrowserClient` dari `@supabase/ssr`
 * yang secara otomatis membaca dan menyinkronkan cookie sesi auth di peramban.
 */

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
