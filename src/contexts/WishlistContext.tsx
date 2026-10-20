/**
 * ============================================================================
 * WishlistContext: Pengelolaan Produk Favorit (Wishlist State)
 * ============================================================================
 * Mengelola daftar produk yang disukai/disimpan oleh pengguna:
 * 1. Simpan Lokal Persisten:
 *    - Menyimpan array slug produk ke `localStorage` (kunci: `modesy_wishlist`).
 * 2. Operasi Wishlist:
 *    - `toggleWishlist`: Menambahkan produk jika belum ada, atau menghapusnya jika sudah ada.
 *    - `isInWishlist`: Memeriksa apakah suatu produk aktif di wishlist (untuk mewarnai ikon Love).
 *    - `wishlistCount`: Total item favorit untuk indikator angka di header navbar.
 */

"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface WishlistContextType {
  wishlist: string[];
  toggleWishlist: (productSlug: string) => void;
  isInWishlist: (productSlug: string) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// Item awal contoh wishlist
const INITIAL_WISHLIST: string[] = ["gucci-backpack"];

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>(INITIAL_WISHLIST);
  const [wishlistHydrated, setWishlistHydrated] = useState(false);

  // Baca daftar wishlist dari localStorage saat awal mount
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem("modesy_wishlist");
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch (e) {
      console.error("Gagal memuat wishlist dari localStorage:", e);
    }
    setWishlistHydrated(true);
  }, []);

  // Simpan setiap perubahan wishlist ke localStorage
  useEffect(() => {
    if (!wishlistHydrated) return;
    try {
      localStorage.setItem("modesy_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.error("Gagal menyimpan wishlist ke localStorage:", e);
    }
  }, [wishlist, wishlistHydrated]);

  /**
   * Menambahkan atau menghapus produk dari wishlist (toggle)
   */
  const toggleWishlist = (productSlug: string) => {
    setWishlist((prev) => {
      if (prev.includes(productSlug)) {
        return prev.filter((slug) => slug !== productSlug);
      }
      return [...prev, productSlug];
    });
  };

  /**
   * Mengecek status apakah produk ada di wishlist
   */
  const isInWishlist = (productSlug: string) => wishlist.includes(productSlug);
  const wishlistCount = wishlist.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

/**
 * Custom Hook useWishlist:
 * Digunakan oleh ProductCard dan header untuk sinkronisasi tombol love
 */
export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
