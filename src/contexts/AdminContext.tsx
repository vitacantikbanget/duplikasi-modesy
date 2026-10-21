// Context khusus untuk Panel Admin Modesy.
// Fungsinya untuk mengatur buka-tutup menu bilah samping (Sidebar Admin),
// baik saat dibuka di layar komputer (Desktop) maupun di layar handphone (Mobile).

"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface AdminContextType {
  sidebarOpenMobile: boolean;  // Status apakah menu sidebar di layar HP sedang terbuka
  sidebarCollapsed: boolean;   // Status apakah menu sidebar di layar komputer sedang diciutkan
  toggleSidebar: () => void;   // Tombol untuk membuka atau menutup sidebar
  closeMobileSidebar: () => void; // Tombol untuk menutup sidebar khusus di HP
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  // State untuk menyimpan apakah menu HP sedang terbuka
  const [sidebarOpenMobile, setSidebarOpenMobile] = useState(false);
  // State untuk menyimpan apakah menu komputer sedang diciutkan
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  // Setiap kali admin berpindah halaman, otomatis tutup menu sidebar di HP
  // agar tidak menutupi konten halaman yang baru dibuka
  useEffect(() => {
    setSidebarOpenMobile(false);
  }, [pathname]);

  // Fungsi pintar: jika di HP maka buka drawer mobile, jika di komputer maka ciutkan sidebar
  const toggleSidebar = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setSidebarOpenMobile((prev) => !prev);
    } else {
      setSidebarCollapsed((prev) => !prev);
    }
  };

  // Menutup paksa menu sidebar di HP (misalnya saat klik area gelap di luar menu)
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

// Hook bantuan agar komponen admin lainnya bisa dengan mudah mengatur menu sidebar
export function useAdminContext() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdminContext must be used within an AdminProvider");
  }
  return context;
}
