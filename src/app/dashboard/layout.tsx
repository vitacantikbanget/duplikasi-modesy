"use client";

import { useState, Suspense } from "react";
import dynamic from "next/dynamic";

const VendorSidebar = dynamic(
  () => import("@/components/vendor/VendorSidebar"),
  { ssr: false }
);

const VendorHeader = dynamic(
  () => import("@/components/vendor/VendorHeader"),
  { ssr: false }
);

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpenMobile, setSidebarOpenMobile] = useState(false);

  return (
    <div className="h-screen bg-[#f4f6f9] flex flex-row font-sans text-[#333] overflow-hidden">
      {/* Vendor Sidebar (Client-only to eliminate any SSR hydration mismatches) */}
      <Suspense fallback={null}>
        <VendorSidebar 
          sidebarOpenMobile={sidebarOpenMobile} 
          closeMobileSidebar={() => setSidebarOpenMobile(false)} 
        />
      </Suspense>

      {/* Main Content Column */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <VendorHeader 
          toggleMobileSidebar={() => setSidebarOpenMobile(!sidebarOpenMobile)} 
        />
        
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
