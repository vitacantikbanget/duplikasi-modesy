/**
 * ============================================================================
 * Vendor Dashboard Layout: Tata Letak Portal Penjual (Vendor Portal)
 * ============================================================================
 * Kerangka kerja antarmuka khusus vendor/penjual:
 * - VendorSidebar: Sidebar navigasi manajemen produk, pesanan, dan keuangan toko.
 * - VendorHeader: Header bilah atas vendor dengan toggle menu mobile & profil toko.
 * - Dynamic Import dengan { ssr: false }: Menghindari hydration mismatch pada sidebar klien.
 */

"use client";

import { useState, Suspense } from "react";
import dynamic from "next/dynamic";

// Muat komponen vendor secara dinamis di sisi klien untuk mencegah ketidakcocokan SSR
const VendorSidebar = dynamic(
  () => import("@/components/vendor/VendorSidebar"),
  { ssr: false }
);

const VendorHeader = dynamic(
  () => import("@/components/vendor/VendorHeader"),
  { ssr: false }
);

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // State untuk membuka/menutup sidebar pada tampilan perangkat seluler (mobile)
  const [sidebarOpenMobile, setSidebarOpenMobile] = useState(false);

  return (
    <div className="h-screen bg-[#f4f6f9] flex flex-row font-sans text-[#333] overflow-hidden">
      {/* Sidebar Navigasi Vendor */}
      <Suspense fallback={null}>
        <VendorSidebar 
          sidebarOpenMobile={sidebarOpenMobile} 
          closeMobileSidebar={() => setSidebarOpenMobile(false)} 
        />
      </Suspense>

      {/* Kolom Konten Utama */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Header Vendor Dashboard */}
        <VendorHeader 
          toggleMobileSidebar={() => setSidebarOpenMobile(!sidebarOpenMobile)} 
        />
        
        {/* Area Konten Dinamis Halaman Vendor */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
