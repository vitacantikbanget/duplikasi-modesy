/**
 * ============================================================================
 * Custom Hook: useMounted (Standar Modern React 19 / Next.js 16)
 * ============================================================================
 * Menggunakan API `useSyncExternalStore` bawaan React untuk mendeteksi status
 * mounting di browser tanpa memicu peringatan render bertingkat (cascading render).
 *
 * Mengapa ini sangat penting?
 * 1. Di Sisi Server (SSR): Fungsi getServerSnapshot mengembalikan `false`.
 * 2. Di Sisi Klien (Browser): Fungsi getSnapshot mengembalikan `true`.
 * 3. Menjamin hidrasi React 19 berlangsung sinkron dan aman dari Hydration Mismatch.
 */

import { useSyncExternalStore } from "react";

// Fungsi langganan kosong karena status mount bersifat permanen setelah siap di klien
const emptySubscribe = () => () => {};

export function useMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,  // Snapshot saat di browser (Client-side)
    () => false  // Snapshot saat di server (Server-side rendering)
  );
}
