/**
 * ============================================================================
 * Custom Hook: useDebounce
 * ============================================================================
 * Hook ini menunda pembaruan nilai (`value`) selama durasi `delay` milidetik.
 *
 * Mengapa teknik debounce sangat penting?
 * - Saat pengguna mengetik cepat di bilah pencarian produk (Search Bar), kita tidak
 *   ingin memfilter data / mengirim request API pada SETIAP ketukan huruf.
 * - Debounce menunda eksekusi sampai pengguna berhenti mengetik sejenak (misal 300ms),
 *   sehingga menghemat sumber daya CPU dan mencegah lag pada antarmuka.
 *
 * @param value Nilai yang ingin di-debounce (string query, filter objek, dll)
 * @param delay Waktu tunda dalam milidetik (misal: 300)
 */

import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Buat timer tunda sebelum memperbarui debouncedValue
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Batalkan timer jika value berubah sebelum delay tercapai (misal user masih mengetik)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
