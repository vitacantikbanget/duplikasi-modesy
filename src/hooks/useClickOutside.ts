/**
 * ============================================================================
 * Custom Hook: useClickOutside
 * ============================================================================
 * Hook ini mendeteksi interaksi klik mouse (`mousedown`) atau sentuhan layar (`touchstart`)
 * di luar elemen target (elemen yang dirujuk oleh `ref`).
 *
 * Sangat penting untuk fitur UI interaktif seperti:
 * - Menutup dropdown pencarian produk saat user mengklik area lain.
 * - Menutup menu kategori, popup profil, atau modal dialog.
 *
 * @param ref RefObject merujuk ke elemen HTML yang dipantau
 * @param handler Callback fungsi yang dieksekusi saat klik terjadi di luar elemen
 */

import { useEffect, RefObject } from "react";

export function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref.current;
      // Jika elemen belum ter-render atau target klik berada di dalam elemen, abaikan
      if (!el || el.contains((event.target as Node) || null)) {
        return;
      }
      // Panggil callback handler penutupan
      handler(event);
    };

    // Daftarkan listener pada document untuk mouse dan touch
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    // Bersihkan listener saat unmount atau dependensi berubah (cleanup function)
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
