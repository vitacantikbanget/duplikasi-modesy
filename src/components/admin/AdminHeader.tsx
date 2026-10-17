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
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sticky top-0 z-10 shrink-0">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none p-2 rounded-md cursor-pointer transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <Link 
          href="/" 
          className="hidden md:flex items-center text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 px-3 py-1.5 rounded transition-colors"
        >
          <Globe className="w-4 h-4 mr-1.5" />
          View Site
        </Link>

        <div className="flex items-center cursor-pointer text-gray-600 hover:text-gray-900">
          <Globe className="w-4 h-4 mr-1.5" />
          <span className="text-sm font-medium mr-1">English</span>
          <ChevronDown className="w-3 h-3" />
        </div>

        <div className="h-6 w-px bg-gray-200 mx-2"></div>

        {/* User Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <img src="https://i.pravatar.cc/150?u=admin" alt="Admin" className="w-8 h-8 rounded-full object-cover mr-2" />
            <span className="text-sm font-medium text-gray-700 mr-1 hidden sm:block">Admin</span>
            <ChevronDown className="w-3 h-3 text-gray-500 hidden sm:block" />
          </div>

          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <Link href="/admin" onClick={() => setDropdownOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <LayoutGrid className="w-4 h-4 mr-3 text-gray-400" />
                Dashboard
              </Link>
              <Link href="#" onClick={() => setDropdownOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <User className="w-4 h-4 mr-3 text-gray-400" />
                Profile
              </Link>
              <Link href="#" onClick={() => setDropdownOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <Wallet className="w-4 h-4 mr-3 text-gray-400" />
                Wallet
              </Link>
              <Link href="#" onClick={() => setDropdownOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <ShoppingBasket className="w-4 h-4 mr-3 text-gray-400" />
                Orders
              </Link>
              <Link href="#" onClick={() => setDropdownOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <Tag className="w-4 h-4 mr-3 text-gray-400" />
                My Coupons
              </Link>
              <Link href="#" onClick={() => setDropdownOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <MessageSquare className="w-4 h-4 mr-3 text-gray-400" />
                Messages
              </Link>
              <Link href="#" onClick={() => setDropdownOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <Settings className="w-4 h-4 mr-3 text-gray-400" />
                Profile Settings
              </Link>
              
              <div className="border-t border-gray-100 my-1"></div>
              
              <button 
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 text-left"
              >
                <LogOut className="w-4 h-4 mr-3 text-gray-400" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
