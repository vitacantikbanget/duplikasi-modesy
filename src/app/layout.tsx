/**
 * ============================================================================
 * Root Layout Aplikasi (Next.js 16 App Router)
 * ============================================================================
 * Layout tertinggi yang membungkus seluruh halaman aplikasi:
 * - Mengatur metadata global SEO (title, description, keywords).
 * - Menghubungkan Google Fonts ("Open Sans") via CDN preconnect untuk performa tinggi.
 * - Memuat berkas CSS global (`globals.css`).
 * - Membungkus seluruh aplikasi dengan `AppProvider` agar seluruh komponen
 *   dapat mengakses state global (auth, cart, wishlist, localization, modal).
 * - Menggunakan `Suspense` untuk mendukung streaming SSR secara mulus.
 */

import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/contexts/AppContext";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Home - Modesy - Marketplace - Classified Ads Script",
  description: "Modesy - Marketplace - Classified Ads Script",
  keywords: ["index", "home", "modesy", "marketplace", "classified ads"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        {/* Preconnect ke CDN Google Fonts untuk mempercepat muat tipografi */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-white" suppressHydrationWarning>
        <AppProvider>
          <Suspense fallback={null}>
            {children}
          </Suspense>
        </AppProvider>
      </body>
    </html>
  );
}
