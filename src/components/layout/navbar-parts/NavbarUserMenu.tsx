"use client";

import Link from "next/link";
import {
  User,
  LayoutGrid,
  Wallet,
  ShoppingBag,
  ShoppingBasket,
  Layers,
  Tag,
  MessageSquare,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { UserRole } from "@/types/auth";

interface NavbarUserMenuProps {
  mounted: boolean;
  role: UserRole;
  onOpenLoginModal: () => void;
  onLogout: () => void;
}

export function NavbarUserMenu({
  mounted,
  role,
  onOpenLoginModal,
  onLogout,
}: NavbarUserMenuProps) {
  if (!mounted || role === "guest") {
    return (
      <div className="flex items-center gap-2 py-1 font-semibold text-xs text-gray-700">
        <button
          type="button"
          onClick={onOpenLoginModal}
          className="hover:text-[#00a699] flex items-center gap-1 cursor-pointer transition-colors"
        >
          <User className="w-3.5 h-3.5" />
          <span>Login</span>
        </button>
        <span className="text-gray-300">/</span>
        <Link
          href="/register"
          className="hover:text-[#00a699] cursor-pointer transition-colors"
        >
          Register
        </Link>
      </div>
    );
  }

  if (role === "admin" || role === "super_admin" || role === "moderator") {
    return (
      <div className="flex items-center gap-1">
        <div className="relative group cursor-pointer py-1">
          <div className="flex items-center gap-1.5 hover:text-[#00a699] font-medium text-[#2c333e] transition-colors">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://i.pravatar.cc/150?u=admin"
              alt="Admin"
              className="w-5 h-5 rounded-full object-cover"
            />
            <span className="text-[12px] font-semibold text-[#2c333e]">Admin</span>
            <ChevronDown className="w-3 h-3 text-[#6c757d]" />
          </div>
          <div className="absolute top-full right-0 hidden group-hover:block w-[185px] bg-white border border-[#e9ecef] shadow-lg rounded-[4px] py-1.5 mt-0 z-50 text-[13px] text-[#495057] animate-in fade-in zoom-in-95 duration-100">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#212529] transition-colors"
            >
              <Layers className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
              <span>Admin Panel</span>
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#212529] transition-colors"
            >
              <LayoutGrid className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/profile/admin"
              className="flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#212529] transition-colors"
            >
              <User className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
              <span>Profile</span>
            </Link>
            <Link
              href="/wallet"
              className="flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#212529] transition-colors"
            >
              <Wallet className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
              <span>Wallet</span>
            </Link>
            <Link
              href="/orders"
              className="flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#212529] transition-colors"
            >
              <ShoppingBasket className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
              <span>Orders</span>
            </Link>
            <Link
              href="/my-coupons"
              className="flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#212529] transition-colors"
            >
              <Tag className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
              <span>My Coupons</span>
            </Link>
            <Link
              href="/messages"
              className="flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#212529] transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
              <span>Messages</span>
            </Link>
            <Link
              href="/settings/edit-profile"
              className="flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#212529] transition-colors"
            >
              <Settings className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
              <span>Profile Settings</span>
            </Link>
            <div className="border-t border-[#f1f3f5] my-1" />
            <button
              type="button"
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#212529] transition-colors text-left cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (role === "member") {
    return (
      <div className="flex items-center gap-1">
        <div className="relative group cursor-pointer py-1">
          <div className="flex items-center gap-2 hover:text-[#00a99d] font-medium text-[13.5px] text-[#333] transition-colors">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/peter-jone-avatar.jpg"
              alt="Peter Jone"
              className="w-6 h-6 rounded-full object-cover ring-1 ring-black/10"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80";
              }}
            />
            <span>Peter Jone</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
          </div>
          <div className="absolute top-full right-0 hidden group-hover:block w-[185px] bg-white border border-[#e9ecef] shadow-lg rounded-[2px] py-1.5 mt-0 z-50 text-[13.5px] text-[#495057] animate-in fade-in zoom-in-95 duration-100">
            <Link
              href="/profile/daniel-jones"
              className="group/item flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] text-[#495057] hover:text-[#00a99d] transition-colors"
            >
              <User className="w-4 h-4 text-[#7b808a] group-hover/item:text-[#00a99d] transition-colors shrink-0" strokeWidth={1.5} />
              <span>Profile</span>
            </Link>
            <Link
              href="/wallet"
              className="group/item flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] text-[#495057] hover:text-[#00a99d] transition-colors"
            >
              <Wallet className="w-4 h-4 text-[#7b808a] group-hover/item:text-[#00a99d] transition-colors shrink-0" strokeWidth={1.5} />
              <span>Wallet</span>
            </Link>
            <Link
              href="/orders"
              className="group/item flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] text-[#495057] hover:text-[#00a99d] transition-colors"
            >
              <ShoppingBag className="w-4 h-4 text-[#7b808a] group-hover/item:text-[#00a99d] transition-colors shrink-0" strokeWidth={1.5} />
              <span>Orders</span>
            </Link>
            <Link
              href="/my-coupons"
              className="group/item flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] text-[#495057] hover:text-[#00a99d] transition-colors"
            >
              <Tag className="w-4 h-4 text-[#7b808a] group-hover/item:text-[#00a99d] transition-colors shrink-0" strokeWidth={1.5} />
              <span>My Coupons</span>
            </Link>
            <Link
              href="/messages"
              className="group/item flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] text-[#495057] hover:text-[#00a99d] transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-[#7b808a] group-hover/item:text-[#00a99d] transition-colors shrink-0" strokeWidth={1.5} />
              <span>Messages</span>
            </Link>
            <Link
              href="/settings/edit-profile"
              className="group/item flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] text-[#495057] hover:text-[#00a99d] transition-colors"
            >
              <Settings className="w-4 h-4 text-[#7b808a] group-hover/item:text-[#00a99d] transition-colors shrink-0" strokeWidth={1.5} />
              <span>Profile Settings</span>
            </Link>
            <div className="border-t border-[#f1f3f5] my-1" />
            <button
              type="button"
              onClick={onLogout}
              className="group/item w-full flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] text-[#495057] hover:text-[#00a99d] transition-colors text-left cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-[#7b808a] group-hover/item:text-[#00a99d] transition-colors shrink-0" strokeWidth={1.5} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Vendor Role (Trendshop)
  return (
    <div className="flex items-center gap-1">
      <div className="relative group cursor-pointer py-1">
        <div className="flex items-center gap-1.5 hover:text-brand-primary font-medium text-gray-700 transition-colors">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=100&q=80"
            alt="Trendshop"
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="text-xs font-semibold text-gray-800">Trendshop</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
        </div>
        <div className="absolute top-full right-0 hidden group-hover:block w-[200px] bg-white border border-[#e9ecef] shadow-lg rounded-[2px] py-1 mt-0 z-50 text-[13px] text-[#495057] animate-in fade-in zoom-in-95 duration-100">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#2c333e] transition-colors"
          >
            <LayoutGrid className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
            <span>Vendor Dashboard</span>
          </Link>
          <Link
            href="/profile/daniel-jones"
            className="flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#2c333e] transition-colors"
          >
            <User className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
            <span>Profile</span>
          </Link>
          <Link
            href="/wallet"
            className="flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#2c333e] transition-colors"
          >
            <Wallet className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
            <span>Wallet</span>
          </Link>
          <Link
            href="/orders"
            className="flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#2c333e] transition-colors"
          >
            <ShoppingBag className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
            <span>Orders</span>
          </Link>
          <Link
            href="/my-coupons"
            className="flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#2c333e] transition-colors"
          >
            <Tag className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
            <span>My Coupons</span>
          </Link>
          <Link
            href="/messages"
            className="flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#2c333e] transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
            <span>Messages</span>
          </Link>
          <Link
            href="/settings/edit-profile"
            suppressHydrationWarning
            className="flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#2c333e] transition-colors"
          >
            <Settings className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
            <span>Profile Settings</span>
          </Link>
          <div className="border-t border-[#f1f3f5] my-1" />
          <button
            type="button"
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#2c333e] transition-colors text-left cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
            <span>Logout (Keluar)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
