/**
 * ============================================================================
 * AdminContext: Pengelolaan Tata Letak & Sidebar Panel Admin
 * ============================================================================
 * Mengontrol interaksi antarmuka panel admin Modesy:
 * 1. Mode Desktop:
 *    - `sidebarCollapsed`: Menyusutkan sidebar menjadi ikon ringkas untuk memaksimalkan ruang kerja tabel data.
 * 2. Mode Mobile / Layar Sentuh:
 *    - `sidebarOpenMobile`: Membuka laci navigasi (drawer) samping dengan overlay gelap.
 * 3. Navigasi Otomatis:
 *    - Menutup drawer mobile secara otomatis setiap kali rute berpindah halaman (`usePathname`).
 */

"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface AdminContextType {
  sidebarOpenMobile: boolean;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  closeMobileSidebar: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [sidebarOpenMobile, setSidebarOpenMobile] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  // Tutup drawer sidebar mobile saat berpindah halaman rute
  useEffect(() => {
    setSidebarOpenMobile(false);
  }, [pathname]);

  /**
   * Toggle sidebar responsif:
   * Jika resolusi layar < 768px (mobile), toggle drawer mobile.
   * Jika resolusi desktop, toggle mode kolaps/melebar.
   */
  const toggleSidebar = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setSidebarOpenMobile((prev) => !prev);
    } else {
      setSidebarCollapsed((prev) => !prev);
    }
  };

  /**
   * Menutup drawer sidebar mobile secara eksplisit (misal saat overlay diklik)
   */
  const closeMobileSidebar = () => {
    setSidebarOpenMobile(false);
  };

  return (
    <AdminContext.Provider
      value={{
        sidebarOpenMobile,
        sidebarCollapsed,
        toggleSidebar,
        closeMobileSidebar,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

/**
 * Custom Hook useAdminContext:
 * Digunakan oleh AdminHeader dan AdminSidebar untuk sinkronisasi tombol toggle
 */
export function useAdminContext() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdminContext must be used within an AdminProvider");
  }
  return context;
}
