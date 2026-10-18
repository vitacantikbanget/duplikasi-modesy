"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import AccessDenied from "@/components/admin/AccessDenied";
import { AdminProvider } from "@/contexts/AdminContext";
import { useAppContext } from "@/contexts/AppContext";
import { usePathname } from "next/navigation";

const MODERATOR_RESTRICTED_PREFIXES = [
  '/admin/roles',
  '/admin/administrators',
  '/admin/settings',
  '/admin/visual-settings',
  '/admin/email-settings',
  '/admin/preferences',
  '/admin/cache-system',
  '/admin/seo-tools',
  '/admin/email-blacklist',
  '/admin/payment-settings',
  '/admin/theme',
  '/admin/slider',
  '/admin/homepage-manager',
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { role } = useAppContext();

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const isModerator = role === 'moderator';
  const isRestricted =
    isModerator &&
    MODERATOR_RESTRICTED_PREFIXES.some(
      (prefix) => pathname === prefix || pathname.startsWith(prefix + '/')
    );

  return (
    <AdminProvider>
      <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-x-auto overflow-y-auto bg-[#f4f6f9] flex flex-col">
            <div className="flex-1 p-4 md:p-6 min-w-fit">
              {isRestricted ? (
                <AccessDenied restrictedPath={pathname} />
              ) : (
                children
              )}
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
