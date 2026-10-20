/**
 * ============================================================================
 * Navbar: Komponen Header Navigasi Utama Modesy (Main Storefront Header)
 * ============================================================================
 * Menggabungkan seluruh modul navigasi atas yang sesuai anatomi Modesy asli:
 * 1. `NavbarTopBar`: Bilah atas untuk kontak, link "Sell on Modesy", pemilih lokasi,
 *    pemilih mata uang (USD, IDR, dll), pemilih bahasa, & profil/login.
 * 2. Bar Utama:
 *    - Logo resmi Modesy (rasio 160x60).
 *    - `NavbarSearch`: Kolom pencarian produk dengan filter kategori dropdown & autocomplete.
 *    - `NavbarActions`: Tombol Wishlist dengan counter badge, tombol Cart dengan total harga,
 *      serta tombol CTA "Sell Now".
 * 3. `NavbarCategoryMenu`: Mega Menu kategori horizontal dengan dropdown bertingkat.
 * 4. Modal Pendukung:
 *    - `LocationModal`: Modal pemilih negara & kota.
 *    - `LoginModal`: Modal popup login cepat tanpa harus pindah halaman.
 */

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

  // State lokal untuk mengontrol visibilitas menu & modal
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
        {/* 1. Top Bar Kontak, Lokasi, Mata Uang, & Bahasa */}
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

        {/* 2. Header Utama (Logo, Search Bar, Cart/Wishlist Actions) */}
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-6 flex items-center justify-between gap-4 md:gap-8">
          {/* Tombol Menu Mobile & Drawer Laci Samping */}
          <NavbarMobileMenu
            isOpen={mobileMenuOpen}
            onToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
            onClose={() => setMobileMenuOpen(false)}
            t={t}
          />

          {/* Logo Resmi Modesy */}
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

          {/* Kolom Pencarian Produk Terintegrasi Autocomplete */}
          <NavbarSearch
            placeholder={t("search_placeholder")}
            mobileSearchOpen={mobileSearchOpen}
            onCloseMobileSearch={() => setMobileSearchOpen(false)}
          />

          {/* Aksi Cepat: Wishlist, Cart Counter, & Sell Now */}
          <NavbarActions
            mounted={mounted}
            cartCount={cartCount}
            wishlistCount={wishlistCount}
            mobileSearchOpen={mobileSearchOpen}
            onToggleMobileSearch={() => setMobileSearchOpen(!mobileSearchOpen)}
          />
        </div>

        {/* 3. Mega Menu Navigasi Kategori Horizontal (Desktop) */}
        <NavbarCategoryMenu t={t} />
      </header>

      {/* Modal Dialog Pemilih Lokasi Geografis */}
      <LocationModal
        isOpen={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
        onSelectLocation={setLocation}
      />

      {/* Modal Dialog Login Cepat */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLoginAs={loginAs}
      />
    </>
  );
}
