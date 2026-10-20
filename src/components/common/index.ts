/**
 * ============================================================================
 * Modul Komponen Umum (Common Components)
 * ============================================================================
 * Berkas ini berfungsi sebagai "barrel export" (pintu gerbang ekspor tunggal)
 * untuk seluruh komponen umum yang digunakan di berbagai halaman, seperti:
 * - ProductCard: Kartu etalase produk dengan gambar, rating, harga, & hover actions.
 * - AddToCartModal: Modal konfirmasi saat pembeli menambahkan produk ke keranjang.
 * - QuickViewModal: Modal pratinjau cepat produk tanpa harus berpindah halaman.
 * - CookiesWarning: Banner persetujuan cookie di bagian bawah halaman.
 * - RoleSwitcher: Widget pengalih role demo (Admin, Vendor, Member, Guest).
 */

export { default as ProductCard } from "./ProductCard";
export { default as AddToCartModal } from "./AddToCartModal";
export { default as QuickViewModal } from "./QuickViewModal";
export { default as CookiesWarning } from "./CookiesWarning";
export { default as RoleSwitcher } from "./RoleSwitcher";
