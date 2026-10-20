"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface WishlistContextType {
  wishlist: string[];
  toggleWishlist: (productSlug: string) => void;
  isInWishlist: (productSlug: string) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const INITIAL_WISHLIST: string[] = ["gucci-backpack"];

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>(INITIAL_WISHLIST);
  const [wishlistHydrated, setWishlistHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem("modesy_wishlist");
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch (e) {
      console.error(e);
    }
    setWishlistHydrated(true);
  }, []);

  useEffect(() => {
    if (!wishlistHydrated) return;
    try {
      localStorage.setItem("modesy_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist, wishlistHydrated]);

  const toggleWishlist = (productSlug: string) => {
    setWishlist((prev) => {
      if (prev.includes(productSlug)) {
        return prev.filter((slug) => slug !== productSlug);
      }
      return [...prev, productSlug];
    });
  };

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

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
