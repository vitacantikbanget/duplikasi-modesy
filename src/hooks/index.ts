/**
 * ============================================================================
 * Titik Ekspor Sentral Custom Hooks (Hooks Barrel Export)
 * ============================================================================
 * Menyediakan akses mudah ke custom hooks reusable:
 * - useClickOutside: Deteksi klik di luar elemen popup/dropdown/modal.
 * - useDebounce: Menunda update state untuk optimasi pencarian & filter.
 * - useMounted: Penanganan aman siklus hidup SSR Next.js untuk mencegah hydration mismatch.
 */

export * from "./useClickOutside";
export * from "./useDebounce";
export * from "./useMounted";
