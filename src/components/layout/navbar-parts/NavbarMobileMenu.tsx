"use client";

import Link from "next/link";
import { User, Menu, X } from "lucide-react";

interface NavbarMobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  t: (key: string, fallback?: string) => string;
}

export function NavbarMobileMenu({
  isOpen,
  onToggle,
  onClose,
  t,
}: NavbarMobileMenuProps) {
  return (
    <>
      {/* Mobile Menu Button */}
      <button
        type="button"
        className="md:hidden text-gray-600 hover:text-brand-primary p-1 cursor-pointer"
        onClick={onToggle}
        aria-label="Toggle Navigation Menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg py-4 px-4 flex flex-col gap-4 z-40">
          <Link
            href="/login"
            onClick={onClose}
            className="flex items-center gap-2 text-gray-700 p-2 hover:bg-gray-50 rounded"
          >
            <User className="w-5 h-5" /> {t("login")} / {t("register")}
          </Link>
          <div className="h-px bg-gray-100 w-full"></div>
          <Link
            href="/clothing"
            onClick={onClose}
            className="text-gray-700 p-2 hover:bg-gray-50 rounded"
          >
            {t("categories.clothing")}
          </Link>
          <Link
            href="/shoes"
            onClick={onClose}
            className="text-gray-700 p-2 hover:bg-gray-50 rounded"
          >
            {t("categories.shoes")}
          </Link>
          <Link
            href="/home-living"
            onClick={onClose}
            className="text-gray-700 p-2 hover:bg-gray-50 rounded"
          >
            {t("categories.home_living")}
          </Link>
          <Link
            href="/jewelry-accessories"
            onClick={onClose}
            className="text-gray-700 p-2 hover:bg-gray-50 rounded"
          >
            {t("categories.jewelry")}
          </Link>
          <Link
            href="/toys-entertainment"
            onClick={onClose}
            className="text-gray-700 p-2 hover:bg-gray-50 rounded"
          >
            {t("categories.toys")}
          </Link>
          <Link
            href="/dashboard/add-product"
            onClick={onClose}
            className="mt-4 flex items-center justify-center bg-[#00a699] text-white px-4 py-3 rounded-md text-sm font-medium hover:bg-[#00897b] transition-colors"
          >
            {t("sell_now")}
          </Link>
        </div>
      )}
    </>
  );
}
