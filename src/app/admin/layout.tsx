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
      <div className="flex h-screen bg-[#ecf0f5] font-sans overflow-hidden">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#ecf0f5] flex flex-col w-full max-w-full">
            <div className="flex-1 p-4 md:p-5 w-full max-w-full">
              {children}
            </div>
            <footer className="bg-white border-t border-[#d2d6de] px-4 py-3 text-[12px] text-gray-500 flex justify-between items-center shrink-0">
              <div>
                <strong>Copyright &copy; 2025 <a href="https://modesy.codingest.net" target="_blank" rel="noreferrer" className="text-[#3c8dbc] hover:underline">Modesy</a>.</strong> All rights reserved.
              </div>
              <div className="text-gray-500 hidden sm:block">
                <b>Version</b> 2.7
              </div>
            </footer>
          </main>
        </div>
      </div>
    </AdminProvider>
  );
}
