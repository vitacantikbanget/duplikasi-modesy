/**
 * ============================================================================
 * ModalContext: Pengelolaan Dialog & Modal Pratinjau Cepat (Quick View)
 * ============================================================================
 * Mengontrol status visibilitas dan payload data untuk modal pratinjau cepat (Quick View).
 * Ketika pembeli mengklik ikon mata (Quick View) pada ProductCard:
 * 1. `openQuickView(product)` menyimpan objek produk yang dipilih ke state.
 * 2. Mengubah status `isQuickViewOpen` menjadi `true`.
 * 3. Komponen `QuickViewModal` yang terpasang di layout menampilkan detail produk
 *    tanpa perlu memuat ulang seluruh halaman.
 */

"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { QuickViewProduct } from "@/types/product";

export interface ModalContextType {
  quickViewProduct: QuickViewProduct | null;
  setQuickViewProduct: (product: QuickViewProduct | null) => void;
  isQuickViewOpen: boolean;
  setIsQuickViewOpen: (open: boolean) => void;
  openQuickView: (product: QuickViewProduct) => void;
  closeQuickView: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [quickViewProduct, setQuickViewProduct] = useState<QuickViewProduct | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  /**
   * Membuka modal Quick View dengan produk yang dipilih
   */
  const openQuickView = (product: QuickViewProduct) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  /**
   * Menutup modal Quick View dan mereset data produk aktif
   */
  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  return (
    <ModalContext.Provider
      value={{
        quickViewProduct,
        setQuickViewProduct,
        isQuickViewOpen,
        setIsQuickViewOpen,
        openQuickView,
        closeQuickView,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

/**
 * Custom Hook useModal:
 * Digunakan untuk memicu pembukaan dan penutupan modal Quick View
 */
export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
