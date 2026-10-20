/**
 * ============================================================================
 * AuthContext: Pengelolaan Autentikasi & Multi-Role Demo
 * ============================================================================
 * Context ini mengelola status autentikasi pengguna secara lokal dan persisten:
 * 1. Mendukung Multi-Role:
 *    - 'guest': Pengunjung umum tanpa login.
 *    - 'member': Pembeli (Peter Jone).
 *    - 'vendor': Penjual toko terverifikasi (Trendshop).
 *    - 'admin' / 'super_admin': Administrator panel pengelola sistem.
 * 2. Sinkronisasi Cookie & LocalStorage:
 *    - Menyimpan nilai `demo_role` ke cookie HTTP (`SameSite=Lax`) agar terbaca
 *      oleh Next.js Server Components dan Edge Middleware.
 *    - Menyimpan cadangan ke `localStorage` untuk ketahanan sesi klien.
 * 3. Deteksi Otomatis Berbasis Path:
 *    - Jika URL berawalan `/admin`, role otomatis diarahkan ke admin.
 *    - Jika URL berawalan `/dashboard`, role otomatis diarahkan ke vendor.
 */

"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { UserRole, UserProfile } from "@/types/auth";
import { ROLE_PROFILES } from "@/constants/auth";

export interface AuthContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  userProfile: UserProfile | null;
  logout: () => void;
  loginAs: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<UserRole>("guest");

  // Inisialisasi peran saat pertama kali mount di browser
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Helper untuk membaca nilai cookie berdasarkan namanya
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
      return null;
    };

    const pathname = window.location.pathname;
    const cookieRole = getCookie("demo_role") as UserRole | null;
    const localRole = localStorage.getItem("modesy_role") as UserRole | null;

    // Deteksi peran otomatis berdasarkan rute portal khusus
    let active: UserRole = "guest";
    if (pathname.startsWith("/admin")) {
      active = "admin";
    } else if (pathname.startsWith("/dashboard")) {
      active = "vendor";
    } else if (pathname.startsWith("/member")) {
      active = "member";
    } else if (pathname.startsWith("/guest")) {
      active = "guest";
    } else {
      active = (cookieRole && cookieRole !== "admin") ? cookieRole : (localRole && localRole !== "admin") ? localRole : "guest";
    }

    setRoleState(active);
    if (active !== "guest") {
      document.cookie = `demo_role=${active}; path=/; max-age=31536000; SameSite=Lax`;
      localStorage.setItem("modesy_role", active);
    }
  }, []);

  /**
   * Mengubah role pengguna aktif serta menyinkronkan ke cookie dan localStorage
   */
  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (typeof document !== "undefined") {
      if (newRole === "guest") {
        document.cookie = "demo_role=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      } else {
        document.cookie = `demo_role=${newRole}; path=/; max-age=31536000; SameSite=Lax`;
      }
    }
    if (typeof window !== "undefined") {
      if (newRole === "guest") {
        localStorage.removeItem("modesy_role");
      } else {
        localStorage.setItem("modesy_role", newRole);
      }
    }
  };

  /**
   * Logout: Menghapus cookie demo, menghapus localStorage, dan mengarahkan ke homepage
   */
  const logout = () => {
    setRoleState("guest");
    if (typeof document !== "undefined") {
      document.cookie = "demo_role=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    if (typeof window !== "undefined") {
      localStorage.removeItem("modesy_role");
      window.location.href = "/";
    }
  };

  /**
   * Login cepat sebagai peran tertentu (shortcut pengujian)
   */
  const loginAs = (newRole: UserRole) => {
    setRole(newRole);
  };

  // Ambil data profil (nama, avatar, badge) berdasarkan role yang aktif
  const userProfile = ROLE_PROFILES[role] || null;

  return (
    <AuthContext.Provider
      value={{
        role,
        setRole,
        userProfile,
        logout,
        loginAs,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom Hook useAuth:
 * Memudahkan akses state autentikasi di seluruh komponen klien
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
