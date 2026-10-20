"use client";

import { Menu, Globe, ChevronDown, LayoutGrid, User, Wallet, ShoppingBasket, Tag, MessageSquare, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminContext } from '@/contexts/AdminContext';
import { useAppContext } from '@/contexts/AppContext';

export default function AdminHeader() {
  const { toggleSidebar } = useAdminContext();
  const { logout } = useAppContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  return (
    <header className="bg-white border-b border-[#e5e5e5] h-[50px] flex items-center justify-between px-4 sticky top-0 z-40 shrink-0 text-gray-700">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-[3px] cursor-pointer transition-colors focus:outline-none flex items-center justify-center"
        >
          <Menu className="w-[18px] h-[18px]" />
        </button>
      </div>

      <div className="flex items-center space-x-3">
        {/* View Site Button - Exactly as in Screenshot */}
        <Link
          href="/"
          target="_blank"
          className="flex items-center text-[12px] font-semibold text-white bg-[#00a65a] hover:bg-[#008d4c] px-3 py-1.5 rounded-sm transition-colors shadow-xs"
        >
          <Globe className="w-3.5 h-3.5 mr-1.5" />
          <span>View Site</span>
        </Link>

        {/* Language Selector */}
        <div className="hidden sm:flex items-center cursor-pointer text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-2.5 py-1 rounded-sm transition-colors text-xs">
          <Globe className="w-3.5 h-3.5 mr-1.5 text-gray-500" />
          <span className="font-medium mr-1 text-[13px]">English</span>
          <ChevronDown className="w-3 h-3 text-gray-400" />
        </div>

        {/* User Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-sm transition-colors"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <img
              src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=100&auto=format&fit=crop&q=80"
              alt="Admin"
              className="w-7 h-7 rounded-full object-cover mr-2 border border-gray-300"
            />
            <span className="text-[13px] font-medium text-gray-800 mr-1 hidden sm:inline">Admin</span>
            <ChevronDown className="w-3 h-3 text-gray-400 hidden sm:inline" />
          </div>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-[3px] shadow-lg py-1 border border-gray-200 z-50 text-gray-700 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="px-4 py-2 border-b border-gray-100 bg-gray-50">
                <p className="text-xs font-semibold text-gray-800">Admin</p>
                <p className="text-[11px] text-gray-500">Administrator</p>
              </div>

              <Link href="/admin" onClick={() => setDropdownOpen(false)} className="flex items-center px-4 py-2 text-xs text-gray-700 hover:bg-gray-100">
                <LayoutGrid className="w-3.5 h-3.5 mr-2.5 text-gray-500" />
                Dashboard
              </Link>
              <Link href="/profile/admin" onClick={() => setDropdownOpen(false)} className="flex items-center px-4 py-2 text-xs text-gray-700 hover:bg-gray-100">
                <User className="w-3.5 h-3.5 mr-2.5 text-gray-500" />
                Profile
              </Link>
              <Link href="/wallet" onClick={() => setDropdownOpen(false)} className="flex items-center px-4 py-2 text-xs text-gray-700 hover:bg-gray-100">
                <Wallet className="w-3.5 h-3.5 mr-2.5 text-gray-500" />
                Wallet
              </Link>
              <Link href="/orders" onClick={() => setDropdownOpen(false)} className="flex items-center px-4 py-2 text-xs text-gray-700 hover:bg-gray-100">
                <ShoppingBasket className="w-3.5 h-3.5 mr-2.5 text-gray-500" />
                Orders
              </Link>
              <Link href="/my-coupons" onClick={() => setDropdownOpen(false)} className="flex items-center px-4 py-2 text-xs text-gray-700 hover:bg-gray-100">
                <Tag className="w-3.5 h-3.5 mr-2.5 text-gray-500" />
                My Coupons
              </Link>
              <Link href="/messages" onClick={() => setDropdownOpen(false)} className="flex items-center px-4 py-2 text-xs text-gray-700 hover:bg-gray-100">
                <MessageSquare className="w-3.5 h-3.5 mr-2.5 text-gray-500" />
                Messages
              </Link>
              <Link href="/settings/edit-profile" onClick={() => setDropdownOpen(false)} className="flex items-center px-4 py-2 text-xs text-gray-700 hover:bg-gray-100">
                <Settings className="w-3.5 h-3.5 mr-2.5 text-gray-500" />
                Profile Settings
              </Link>

              <div className="border-t border-gray-100 my-1"></div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-2 text-xs text-red-600 hover:bg-red-50 text-left cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5 mr-2.5 text-red-500" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
