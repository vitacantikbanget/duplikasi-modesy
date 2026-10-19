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

  useEffect(() => {
    if (typeof window === "undefined") return;

    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
      return null;
    };

    const pathname = window.location.pathname;
    const cookieRole = getCookie("demo_role") as UserRole | null;
    const localRole = localStorage.getItem("modesy_role") as UserRole | null;

    // Auto-detect role from URL path if matching dedicated portals
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

  const loginAs = (newRole: UserRole) => {
    setRole(newRole);
  };

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

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
