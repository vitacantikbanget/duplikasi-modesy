"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  MapPin,
  Truck,
  Link2,
  Share2,
  Lock,
  UserX,
} from "lucide-react";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Update Profile",
      href: "/settings/edit-profile",
      icon: User,
    },
    {
      name: "Location",
      href: "/settings/location",
      icon: MapPin,
    },
    {
      name: "Shipping Address",
      href: "/settings/shipping-address",
      icon: Truck,
    },
    {
      name: "Affiliate Links",
      href: "/settings/affiliate-links",
      icon: Link2,
    },
    {
      name: "Social Media",
      href: "/settings/social-media",
      icon: Share2,
    },
    {
      name: "Change Password",
      href: "/settings/change-password",
      icon: Lock,
    },
    {
      name: "Delete Account",
      href: "/settings/delete-account",
      icon: UserX,
      isDanger: true,
    },
  ];

  const currentItem = navItems.find((item) => pathname?.startsWith(item.href)) || navItems[0];

  return (
    <div className="bg-[#fcfcfc] font-sans pb-16 text-[#495057]">
      <div className="max-w-[1320px] mx-auto px-4 pt-5 pb-2">
        {/* Breadcrumb */}
        <nav className="text-[12px] text-[#868e96] flex items-center gap-1.5 mb-2">
          <Link href="/" className="hover:text-[#00ab97] transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <Link href="/settings/edit-profile" className="hover:text-[#00ab97] transition-colors">
            Profile Settings
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-[#495057]">{currentItem.name}</span>
        </nav>

        {/* Page Title */}
        <h1 className="text-[20px] font-bold text-[#2c333e] mb-6">Profile Settings</h1>

        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Left Sidebar Menu */}
          <aside className="w-full md:w-[220px] shrink-0">
            <div className="bg-white border border-[#dee2e6] rounded-[2px] p-2 space-y-0.5">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href === "/settings/edit-profile" && (pathname === "/settings" || pathname === "/settings/edit-profile"));
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-[12px] rounded-[2px] transition-colors text-left ${
                      isActive
                        ? "bg-[#f1f3f5] text-[#2c333e] font-semibold"
                        : item.isDanger
                        ? "text-[#6c757d] hover:bg-[#f8f9fa] hover:text-[#e74c3c]"
                        : "text-[#6c757d] hover:bg-[#f8f9fa] hover:text-[#2c333e]"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isActive
                          ? "text-[#2c333e]"
                          : item.isDanger
                          ? "text-[#adb5bd]"
                          : "text-[#868e96]"
                      }`}
                    />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </aside>

          {/* Right Main Content */}
          <main className="flex-1 min-w-0 w-full bg-white border border-[#dee2e6] rounded-[2px] p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
