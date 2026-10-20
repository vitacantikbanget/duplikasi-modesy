/**
 * ============================================================================
 * Shop Layout: Tata Letak Etalase Toko Publik (Storefront Layout)
 * ============================================================================
 * Membungkus seluruh halaman publik marketplace (beranda, produk, kategori, cart):
 * - Navbar: Header atas lengkap (top bar kontak/lokasi/mata uang, search bar, & menu kategori).
 * - Footer: Bagian bawah lengkap (newsletter, link kebijakan, metode pembayaran).
 * - Modal Global: AddToCartModal, QuickViewModal, CookiesWarning, dan RoleSwitcher.
 */

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  AddToCartModal,
  QuickViewModal,
  CookiesWarning,
  RoleSwitcher,
} from "@/components/common";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header Navigasi Modesy */}
      <Navbar />

      {/* Konten Halaman Etalase */}
      <main className="flex-1">{children}</main>

      {/* Footer Komprehensif */}
      <Footer />

      {/* Modal Interaktif Global */}
      <AddToCartModal />
      <QuickViewModal />
      <CookiesWarning />
      <RoleSwitcher />
    </div>
  );
}
