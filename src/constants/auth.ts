/**
 * ============================================================================
 * Konstanta Autentikasi & Akun Demo (Auth Constants & Mock Profiles)
 * ============================================================================
 * Menyediakan data profil tiruan untuk setiap peran pengguna (UserRole)
 * serta kredensial demo untuk memudahkan pengujian login dan role switching.
 */

import { UserRole, UserProfile, DemoAccount } from "@/types/auth";

/**
 * Profil bawaan untuk setiap peran di aplikasi Modesy
 */
export const ROLE_PROFILES: Record<UserRole, UserProfile | null> = {
  vendor: {
    name: "Trendshop",
    email: "trendshop@codingest.net",
    avatar: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=100&q=80",
    role: "vendor",
    storeName: "Trendshop",
    badgeLabel: "Vendor",
  },
  admin: {
    name: "Super Admin",
    email: "admin@codingest.net",
    avatar: "https://i.pravatar.cc/150?u=admin",
    role: "admin",
    badgeLabel: "Admin",
  },
  super_admin: {
    name: "Super Admin",
    email: "admin@codingest.net",
    avatar: "https://i.pravatar.cc/150?u=admin",
    role: "super_admin",
    badgeLabel: "Admin",
  },
  moderator: {
    name: "Moderator",
    email: "moderator@codingest.net",
    avatar: "https://i.pravatar.cc/150?u=admin",
    role: "moderator",
    badgeLabel: "Moderator",
  },
  member: {
    name: "Peter Jone",
    email: "member@codingest.net",
    avatar: "/images/peter-jone-avatar.jpg",
    role: "member",
    badgeLabel: "Member",
  },
  guest: null,
};

/**
 * Daftar akun demo untuk pengujian cepat di modal login & widget RoleSwitcher
 */
export const DEMO_ACCOUNTS: DemoAccount[] = [
  { role: "Super Admin", email: "admin@codingest.net", pass: "1234" },
  { role: "Moderator", email: "moderator@codingest.net", pass: "1234" },
  { role: "Vendor", email: "trendshop@codingest.net", pass: "1234" },
  { role: "Member", email: "member@codingest.net", pass: "1234" },
  { role: "Guest", email: "guest@codingest.net", pass: "1234" },
];
