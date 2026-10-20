"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  MapPin,
  Truck,
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
    <div className="bg-white font-sans py-5">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb matching exact Modesy format */}
        <nav className="text-[12.5px] text-[#777] mb-4">
          <Link href="/" className="hover:text-[#00ab97] transition-colors">
            Home
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-500">Profile Settings</span>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-[#333] font-normal">{currentItem.name}</span>
        </nav>

        {/* Page Title */}
        <h1 className="text-[22px] font-bold text-[#222] mb-6">Profile Settings</h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar Menu */}
          <div className="md:col-span-3 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-[13.5px] rounded-[3px] transition-colors text-left ${
                    isActive
                      ? item.isDanger
                        ? "bg-[#f4f6f8] text-[#e53935] font-semibold"
                        : "bg-[#f4f6f8] text-[#222] font-semibold"
                      : item.isDanger
                      ? "text-[#555] hover:bg-gray-50 hover:text-[#e53935]"
                      : "text-[#555] hover:bg-gray-50 hover:text-[#00ab97]"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive
                        ? item.isDanger
                          ? "text-[#e53935]"
                          : "text-[#00ab97]"
                        : "text-gray-400"
                    }`}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Main Content */}
          <div className="md:col-span-9">{children}</div>
        </div>
      </div>
    </div>
  );
}
