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

  // Close mobile sidebar on route change
  useEffect(() => {
    setSidebarOpenMobile(false);
  }, [pathname]);

  const toggleSidebar = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setSidebarOpenMobile((prev) => !prev);
    } else {
      setSidebarCollapsed((prev) => !prev);
    }
  };

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

export function useAdminContext() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdminContext must be used within an AdminProvider");
  }
  return context;
}
