// Komponen Pembungkus Tampilan Luar (Frontend Layout Wrapper).
// Fungsinya cerdas:
// 1. Jika halaman yang dibuka adalah panel admin (/admin) atau dashboard penjual (/dashboard),
//    maka Navbar publik dan Footer disembunyikan agar tampilan dashboard admin/vendor bersih.
// 2. Jika halaman yang dibuka adalah toko publik atau akun member, maka Navbar, Footer,
//    Modal Tambah ke Keranjang, Modal Quick View, dan Notifikasi Cookie ditampilkan secara otomatis.

"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AddToCartModal from "@/components/common/AddToCartModal";
import QuickViewModal from "@/components/common/QuickViewModal";
import CookiesWarning from "@/components/common/CookiesWarning";

export default function FrontendLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Cek apakah URL yang dibuka adalah rute panel admin atau vendor
  const isAdmin = pathname?.startsWith("/admin");
  const isDashboard = pathname?.startsWith("/dashboard");
  const isPanel = isAdmin || isDashboard;

  // Jika di panel Admin / Vendor, cukup render konten halaman tanpa Navbar & Footer toko
  if (isPanel) {
    return <>{children}</>;
  }

  // Jika di halaman toko biasa, bungkus dengan header Navbar dan Footer lengkap
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      {/* Modal popup saat produk sukses dimasukkan ke keranjang belanja */}
      <AddToCartModal />
      {/* Modal popup intip cepat detail produk tanpa pindah halaman */}
      <QuickViewModal />
      {/* Peringatan persetujuan cookie sesuai regulasi privasi web */}
      <CookiesWarning />
    </div>
  );
}
