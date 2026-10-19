"use client";

import { useState } from "react";
import Link from "next/link";
import { useAppContext } from "@/contexts/AppContext";
import { useMounted } from "@/hooks/useMounted";
import {
  NavbarTopBar,
  NavbarSearch,
  NavbarActions,
  NavbarCategoryMenu,
  NavbarMobileMenu,
  LocationModal,
  LoginModal,
} from "./navbar-parts";

export default function Navbar() {
  const mounted = useMounted();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const {
    currency,
    setCurrency,
    language,
    setLanguage,
    location,
    setLocation,
    t,
    cartCount,
    wishlistCount,
    role,
    logout,
    loginAs,
  } = useAppContext();

  return (
    <>
      <header className="w-full bg-white border-b border-gray-200 relative z-40">
        {/* Topbar */}
        <NavbarTopBar
          mounted={mounted}
          currency={currency}
          setCurrency={setCurrency}
          language={language}
          setLanguage={setLanguage}
          location={location}
          setLocation={setLocation}
          role={role}
          t={t}
          onOpenLocationModal={() => setLocationModalOpen(true)}
          onOpenLoginModal={() => setLoginModalOpen(true)}
          onLogout={logout}
        />

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-6 flex items-center justify-between gap-4 md:gap-8">
          {/* Mobile Menu Button & Drawer */}
          <NavbarMobileMenu
            isOpen={mobileMenuOpen}
            onToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
            onClose={() => setMobileMenuOpen(false)}
            t={t}
          />

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.svg"
              alt="Modesy"
              width={160}
              height={60}
              className="w-[140px] md:w-[160px] h-auto object-contain"
            />
          </Link>

          {/* Search Bar matching Modesy live layout */}
          <NavbarSearch
            placeholder={t("search_placeholder")}
            mobileSearchOpen={mobileSearchOpen}
            onCloseMobileSearch={() => setMobileSearchOpen(false)}
          />

          {/* Actions: Cart, Wishlist, Sell Now */}
          <NavbarActions
            mounted={mounted}
            cartCount={cartCount}
            wishlistCount={wishlistCount}
            mobileSearchOpen={mobileSearchOpen}
            onToggleMobileSearch={() => setMobileSearchOpen(!mobileSearchOpen)}
          />
        </div>

        {/* Category Nav Bar (Desktop) with Megamenus */}
        <NavbarCategoryMenu t={t} />
      </header>

      {/* Location Modal */}
      <LocationModal
        isOpen={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
        onSelectLocation={setLocation}
      />

      {/* Login Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLoginAs={loginAs}
      />
    </>
  );
}
