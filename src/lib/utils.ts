/**
 * ============================================================================
 * Utilitas Penggabung Class CSS (Tailwind Class Merger)
 * ============================================================================
 * Fungsi `cn` (Class Names) adalah standar industri modern untuk menggabungkan
 * conditional class names secara aman di Next.js & Tailwind CSS:
 * 1. `clsx`: Menangani logika kondisional (misal: isActive && 'bg-blue-500').
 * 2. `twMerge`: Mengatasi konflik kelas Tailwind (misal: 'px-2' dan 'px-4'
 *    di-merge sehingga kelas terakhir 'px-4' yang menang, bukan duplikasi).
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
