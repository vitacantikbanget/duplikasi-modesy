"use client";

import Link from "next/link";
import { MapPin, ChevronDown } from "lucide-react";
import { Currency, Language } from "@/types/localization";
import { UserRole } from "@/types/auth";
import { currencies } from "@/constants/currencies";
import { languages } from "@/constants/languages";
import { NavbarUserMenu } from "./NavbarUserMenu";

interface NavbarTopBarProps {
  mounted: boolean;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  language: Language;
  setLanguage: (l: Language) => void;
  location: string;
  setLocation: (loc: string) => void;
  role: UserRole;
  t: (key: string, fallback?: string) => string;
  onOpenLocationModal: () => void;
  onOpenLoginModal: () => void;
  onLogout: () => void;
}

export function NavbarTopBar({
  mounted,
  currency,
  setCurrency,
  language,
  setLanguage,
  location,
  setLocation,
  role,
  t,
  onOpenLocationModal,
  onOpenLoginModal,
  onLogout,
}: NavbarTopBarProps) {
  return (
    <div className="border-b border-[#f1f3f5] text-[#6c757d] text-[12px] py-1.5 hidden md:block bg-white">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Left Links */}
        <div className="flex gap-5" suppressHydrationWarning>
          <Link
            href="/contact"
            suppressHydrationWarning
            className="hover:text-[#00a699] py-1 transition-colors"
          >
            {t("contact")}
          </Link>
          <Link
            href="/sell-on-modesy"
            suppressHydrationWarning
            className="hover:text-[#00a699] py-1 transition-colors"
          >
            {t("sell_on_modesy")}
          </Link>
        </div>

        {/* Right Controls */}
        <div className="flex gap-5 items-center">
          {/* Location Trigger */}
          <div className="flex items-center gap-2 py-1">
            <div
              onClick={onOpenLocationModal}
              className="group cursor-pointer flex items-center gap-1 hover:text-[#00a699] transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-[#6c757d]" />{" "}
              {location === "Location" ? t("location") : location}
            </div>
            {location !== "Location" && (
              <button
                type="button"
                onClick={() => setLocation("Location")}
                className="bg-[#e9ecef] hover:bg-gray-300 text-gray-700 px-2 py-0.5 rounded text-xs transition-colors border border-[#e9ecef] cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>

          {/* Currency Dropdown */}
          <div className="relative group cursor-pointer py-1">
            <div
              suppressHydrationWarning
              className="flex items-center gap-1 hover:text-[#00a699] transition-colors"
            >
              {mounted ? currency.label : currencies[0].label}{" "}
              <ChevronDown className="w-3 h-3 text-[#6c757d]" />
            </div>
            <div className="absolute top-full left-0 hidden group-hover:block w-32 bg-white border border-gray-100 shadow-lg rounded-md py-1 mt-0 z-50">
              {currencies.map((c) => (
                <div
                  key={c.code}
                  onClick={() => setCurrency(c)}
                  className="px-4 py-2 hover:bg-gray-50 hover:text-[#00a699] transition-colors cursor-pointer"
                >
                  {c.label}
                </div>
              ))}
            </div>
          </div>

          {/* Language Dropdown */}
          <div className="relative group cursor-pointer py-1">
            <div
              suppressHydrationWarning
              className="flex items-center gap-1 hover:text-[#00a699] transition-colors"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={language.flagUrl}
                alt={language.label}
                className="w-[16px] h-auto object-contain rounded-2xs"
              />
              {language.label} <ChevronDown className="w-3 h-3 text-[#6c757d]" />
            </div>
            <div className="absolute top-full right-0 hidden group-hover:block w-32 bg-white border border-gray-100 shadow-lg rounded-md py-1 mt-0 z-50">
              {languages.map((l) => (
                <div
                  key={l.code}
                  onClick={() => setLanguage(l)}
                  className="px-4 py-2 hover:bg-gray-50 hover:text-[#00a699] transition-colors flex items-center gap-2 cursor-pointer"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={l.flagUrl}
                    alt={l.label}
                    className="w-[16px] h-auto object-contain rounded-2xs"
                  />
                  {l.label}
                </div>
              ))}
            </div>
          </div>

          {/* User Profile / Login Area */}
          <NavbarUserMenu
            mounted={mounted}
            role={role}
            onOpenLoginModal={onOpenLoginModal}
            onLogout={onLogout}
          />
        </div>
      </div>
    </div>
  );
}
