"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { AdminProvider } from "@/contexts/AdminContext";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <AdminProvider>
      <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#f4f6f9] flex flex-col w-full max-w-full">
            <div className="flex-1 p-4 md:p-6 w-full max-w-full">
              {children}
            </div>
            <footer className="bg-white border-t border-gray-200 p-4 text-[13px] text-gray-600 flex justify-between items-center">
              <div>
                Copyright 2025 Modesy - All Rights Reserved.
              </div>
              <div>
                Version 2.7
              </div>
            </footer>
          </main>
        </div>
      </div>
    </AdminProvider>
  );
}
