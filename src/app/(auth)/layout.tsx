/**
 * ============================================================================
 * Auth Layout: Tata Letak Halaman Autentikasi (Login / Register / Forgot Password)
 * ============================================================================
 * Menyediakan kerangka halaman autentikasi publik yang konsisten dengan
 * Navbar, Footer, CookiesWarning, dan RoleSwitcher untuk kemudahan pengujian peran.
 */

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CookiesWarning, RoleSwitcher } from "@/components/common";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header Navigasi */}
      <Navbar />

      {/* Konten Halaman Formulir Auth */}
      <main className="flex-1">{children}</main>

      {/* Footer & Komponen Bantu */}
      <Footer />
      <CookiesWarning />
      <RoleSwitcher />
    </div>
  );
}
