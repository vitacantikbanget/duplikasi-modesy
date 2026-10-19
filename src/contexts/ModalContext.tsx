"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface ModalContextType {
  quickViewProduct: any | null;
  setQuickViewProduct: (product: any | null) => void;
  isQuickViewOpen: boolean;
  setIsQuickViewOpen: (open: boolean) => void;
  openQuickView: (product: any) => void;
  closeQuickView: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [quickViewProduct, setQuickViewProduct] = useState<any | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const openQuickView = (product: any) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

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

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
