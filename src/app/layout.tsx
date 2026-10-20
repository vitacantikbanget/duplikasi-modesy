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
