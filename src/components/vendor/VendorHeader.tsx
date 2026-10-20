"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/contexts/AppContext";
import {
  Menu,
  Compass,
  ChevronDown,
  LayoutGrid,
  User,
  Wallet,
  ShoppingBasket,
  Tag,
  MessageSquareText,
  Settings,
  LogOut,
  Layers,
} from "lucide-react";

interface VendorHeaderProps {
  toggleMobileSidebar: () => void;
}

export default function VendorHeader({ toggleMobileSidebar }: VendorHeaderProps) {
  const router = useRouter();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { logout, role, userProfile } = useAppContext();
  const isAdmin = role === "admin" || role === "super_admin" || role === "moderator";
  const displayName = isAdmin ? "Admin" : (userProfile?.name || "Trendshop");
  const avatarUrl = isAdmin
    ? "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=100&auto=format&fit=crop&q=80"
    : (userProfile?.avatar || "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=100&q=80");

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="h-[56px] bg-white border-b border-[#e9ecef] px-4 md:px-6 flex items-center justify-between sticky top-0 z-30 select-none">
      {/* Left: Hamburger Toggle */}
      <div className="flex items-center">
        <button
          type="button"
          onClick={toggleMobileSidebar}
          className="p-1.5 text-[#5a6268] hover:text-[#2c333e] rounded transition-colors cursor-pointer"
          title="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* View Site Button */}
        <Link
          href="/"
          className="flex items-center gap-1.5 bg-[#00ab97] hover:bg-[#009180] text-white px-3 py-1.5 rounded-[3px] text-[12px] font-semibold transition-colors shadow-2xs"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>View Site</span>
        </Link>

        {/* Language Selector */}
        <div className="relative" ref={langRef}>
          <button
            type="button"
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            className="flex items-center gap-1.5 text-[12.5px] text-[#495057] hover:text-[#2c333e] py-1 px-1.5 rounded cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://flagcdn.com/w20/us.png" alt="English" className="w-4 h-auto rounded-xs" />
            <span>English</span>
            <ChevronDown className="w-3 h-3 text-[#8c98a4]" />
          </button>

          {langDropdownOpen && (
            <div className="absolute right-0 mt-1 w-32 bg-white border border-[#e9ecef] shadow-md rounded-[2px] py-1 text-xs z-50">
              <div
                onClick={() => setLangDropdownOpen(false)}
                className="px-3 py-1.5 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://flagcdn.com/w20/us.png" alt="English" className="w-4 h-auto rounded-xs" />
                <span>English</span>
              </div>
              <div
                onClick={() => setLangDropdownOpen(false)}
                className="px-3 py-1.5 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://flagcdn.com/w20/id.png" alt="Indonesia" className="w-4 h-auto rounded-xs" />
                <span>Indonesia</span>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown - Pixel Perfect match to live screenshot */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2 text-[13px] font-semibold text-[#2c333e] hover:text-black py-1 px-1.5 rounded cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatarUrl}
              alt={displayName}
              className="w-7 h-7 rounded-full object-cover border border-gray-200"
            />
            <span className="hidden sm:inline">{displayName}</span>
            <ChevronDown className="w-3 h-3 text-[#2c333e]" />
          </button>

          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-[190px] bg-white border border-[#e9ecef] shadow-lg rounded-[2px] py-1.5 z-50 text-[13px] text-[#495057] animate-in fade-in zoom-in-95 duration-100">
              {isAdmin ? (
                <>
                  {/* 1. Admin Panel */}
                  <Link
                    href="/admin"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#2c333e] transition-colors"
                  >
                    <Layers className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
                    <span>Admin Panel</span>
                  </Link>

                  {/* 2. Dashboard */}
                  <Link
                    href="/dashboard"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#2c333e] transition-colors"
                  >
                    <LayoutGrid className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
                    <span>Dashboard</span>
                  </Link>

                  {/* 3. Profile */}
                  <Link
                    href="/profile/admin"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#2c333e] transition-colors"
                  >
                    <User className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
                    <span>Profile</span>
                  </Link>

                  {/* 4. Wallet */}
                  <Link
                    href="/wallet"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#2c333e] transition-colors"
                  >
                    <Wallet className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
                    <span>Wallet</span>
                  </Link>

                  {/* 5. Orders */}
                  <Link
                    href="/admin/orders"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#2c333e] transition-colors"
                  >
                    <ShoppingBasket className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
                    <span>Orders</span>
                  </Link>

                  {/* 6. My Coupons */}
                  <Link
                    href="/my-coupons"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#2c333e] transition-colors"
                  >
                    <Tag className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
                    <span>My Coupons</span>
                  </Link>

                  {/* 7. Messages */}
                  <Link
                    href="/messages"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#2c333e] transition-colors"
                  >
                    <MessageSquareText className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
                    <span>Messages</span>
                  </Link>

                  {/* 8. Profile Settings */}
                  <Link
                    href="/settings/edit-profile"
                    suppressHydrationWarning
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#2c333e] transition-colors"
                  >
                    <Settings className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
                    <span>Profile Settings</span>
                  </Link>
                </>
              ) : (
                <>
                  {/* Vendor Dropdown */}
                  <Link
                    href="/dashboard"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#2c333e] transition-colors"
                  >
                    <LayoutGrid className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
                    <span>Vendor Dashboard</span>
                  </Link>

                  <Link
                    href="/profile/trendshop"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#2c333e] transition-colors"
                  >
                    <User className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
                    <span>Profile</span>
                  </Link>

                  <Link
                    href="/wallet"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#2c333e] transition-colors"
                  >
                    <Wallet className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
                    <span>Wallet</span>
                  </Link>

                  <Link
                    href="/dashboard/sales"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#2c333e] transition-colors"
                  >
                    <ShoppingBasket className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
                    <span>Orders</span>
                  </Link>

                  <Link
                    href="/dashboard/coupons"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#2c333e] transition-colors"
                  >
                    <Tag className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
                    <span>My Coupons</span>
                  </Link>

                  <Link
                    href="/dashboard/shop-settings"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#2c333e] transition-colors"
                  >
                    <Settings className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
                    <span>Shop Settings</span>
                  </Link>
                </>
              )}

              {/* Divider */}
              <div className="border-t border-[#f1f3f5] my-1" />

              {/* Logout */}
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#2c333e] transition-colors text-left cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
