// File ini adalah pondasi utama (Root Layout) untuk seluruh aplikasi web.
// Semua halaman di website ini akan dibungkus oleh struktur HTML dan Provider yang ada di sini.

import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/contexts/AppContext";
import FrontendLayoutWrapper from "@/components/layout/FrontendLayoutWrapper";
import { Suspense } from "react";

// Informasi metadata untuk judul tab browser dan deskripsi mesin pencari (SEO)
export const metadata: Metadata = {
  title: "Home - Modesy - Marketplace - Classified Ads Script",
  description: "Modesy - Marketplace - Classified Ads Script",
  keywords: ["index", "home", "modesy", "marketplace", "classified ads"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // Tag html dengan bahasa inggris dan konfigurasi tinggi penuh (h-full)
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        {/* Mengunduh font Google Open Sans agar tampilan tulisan di website terlihat rapi dan elegan */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      {/* Body utama yang memuat background putih dan susunan fleksibel vertikal */}
      <body className="min-h-full flex flex-col bg-white" suppressHydrationWarning>
        {/* AppProvider: Wadah data global (role user, keranjang belanja, saldo dompet, dll) */}
        <AppProvider>
          {/* Suspense: Menjaga agar halaman tidak crash saat sedang memuat data URL / parameter */}
          <Suspense fallback={null}>
            {/* FrontendLayoutWrapper: Mengatur apakah Navbar dan Footer perlu ditampilkan (otomatis disembunyikan di panel admin) */}
            <FrontendLayoutWrapper>
              {children}
            </FrontendLayoutWrapper>
          </Suspense>
        </AppProvider>
      </body>
    </html>
  );
}
