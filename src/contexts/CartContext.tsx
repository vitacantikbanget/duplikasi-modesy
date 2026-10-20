/**
 * ============================================================================
 * CartContext: Pengelolaan Keranjang Belanja (Shopping Cart State)
 * ============================================================================
 * Mengelola fungsionalitas keranjang belanja e-commerce:
 * 1. Penyimpanan Persisten:
 *    - Menyimpan daftar belanjaan ke `localStorage` agar tidak hilang saat refresh halaman.
 * 2. Operasi Keranjang:
 *    - `addToCart`: Menambahkan item baru atau menambah kuantitas jika item sejenis sudah ada.
 *    - `removeFromCart`: Menghapus item tertentu berdasarkan ID unik.
 *    - `updateCartQuantity`: Mengubah jumlah beli (+/-). Jika 0, item otomatis dihapus.
 *    - `clearCart`: Mengosongkan seluruh keranjang (misal setelah sukses checkout).
 * 3. Nilai Turunan (Derived State):
 *    - `cartCount`: Total jumlah seluruh kuantitas item untuk badge di navbar.
 *    - `cartSubtotal`: Total kalkulasi harga seluruh item dalam keranjang.
 * 4. Modal Interaktif:
 *    - Mengontrol `isAddToCartModalOpen` dan data item terakhir yang ditambahkan.
 */

"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CartItem } from "@/types/cart";

export interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  addedModalItem: CartItem | null;
  setAddedModalItem: (item: CartItem | null) => void;
  isAddToCartModalOpen: boolean;
  setIsAddToCartModalOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Item contoh awal di keranjang belanja
const INITIAL_CART: CartItem[] = [
  {
    id: "black-midi-skirt-default",
    productSlug: "black-midi-skirt",
    title: "Black midi skirt with white flowers",
    price: 48,
    imageUrl: "https://images.unsplash.com/photo-1583496661160-c588c4af16b2?w=500&q=80",
    quantity: 1,
    selectedColor: "Black Floral",
    selectedSize: "M",
    vendorName: "Trendshop",
  },
];

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART);
  const [addedModalItem, setAddedModalItem] = useState<CartItem | null>(null);
  const [isAddToCartModalOpen, setIsAddToCartModalOpen] = useState(false);
  const [cartHydrated, setCartHydrated] = useState(false);

  // Baca data keranjang yang tersimpan di localStorage saat browser siap
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("modesy_cart");
      if (savedCart) setCart(JSON.parse(savedCart));
    } catch (e) {
      console.error("Gagal memuat keranjang dari localStorage:", e);
    }
    setCartHydrated(true);
  }, []);

  // Simpan setiap perubahan keranjang ke localStorage
  useEffect(() => {
    if (!cartHydrated) return;
    try {
      localStorage.setItem("modesy_cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Gagal menyimpan keranjang ke localStorage:", e);
    }
  }, [cart, cartHydrated]);

  /**
   * Menambahkan produk ke keranjang belanja dan memunculkan pop-up modal
   */
  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === item.id);
      if (existingIndex > -1) {
        // Jika produk sudah ada dengan varian sama, tambahkan kuantitasnya
        const updated = [...prev];
        updated[existingIndex].quantity += item.quantity;
        return updated;
      }
      return [...prev, item];
    });
    setAddedModalItem(item);
    setIsAddToCartModalOpen(true);
  };

  /**
   * Menghapus produk dari keranjang berdasarkan ID
   */
  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  /**
   * Mengubah kuantitas item. Jika qty <= 0, produk otomatis dihapus
   */
  const updateCartQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i))
    );
  };

  /**
   * Mengosongkan keranjang belanja
   */
  const clearCart = () => {
    setCart([]);
  };

  // Menghitung total barang dan subtotal harga
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        addedModalItem,
        setAddedModalItem,
        isAddToCartModalOpen,
        setIsAddToCartModalOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/**
 * Custom Hook useCart:
 * Digunakan oleh komponen untuk membaca data keranjang dan memanggil aksi keranjang
 */
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
