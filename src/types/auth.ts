/**
 * ============================================================================
 * Definisi Tipe Autentikasi & Pengguna (Auth & User Types)
 * ============================================================================
 * Modesy memiliki sistem otorisasi multi-peran (Role-Based Access Control):
 * - guest: Pengunjung tanpa login (hanya melihat produk & keranjang sementara).
 * - member: Pembeli biasa yang dapat bertransaksi, membuat wishlist, & memberi review.
 * - vendor: Penjual terdaftar yang memiliki dashboard toko (/dashboard).
 * - moderator: Staf admin dengan akses moderasi konten & produk.
 * - admin: Administrator pengelola sistem marketplace.
 * - super_admin: Pemilik platform dengan akses penuh konfigurasi & pembayaran.
 */

export type UserRole = "guest" | "member" | "vendor" | "admin" | "super_admin" | "moderator";

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  storeName?: string;
  badgeLabel: string;
}

export interface DemoAccount {
  role: string;
  email: string;
  pass: string;
}
