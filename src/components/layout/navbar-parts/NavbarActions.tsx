/**
 * ============================================================================
 * NavbarActions: Tombol Aksi Cepat Header (Cart, Wishlist, Sell Now)
 * ============================================================================
 * Menampilkan 3 tombol tindakan utama di sebelah kanan search bar:
 * 1. Cart (Keranjang Belanja): Ikon troli dengan badge merah berisi jumlah item & teks "Cart".
 * 2. Wishlist: Ikon hati dengan badge merah jumlah item favorit & teks "Wishlist".
 * 3. Tombol CTA "Sell Now": Tombol hijau teal khas Modesy yang mengarahkan vendor
 *    langsung ke formulir tambah produk (`/dashboard/add-product`).
 * 4. Tombol Kaca Pembesar Mobile: Membuka bar pencarian layar penuh pada perangkat seluler.
 */

"use client";

import Link from "next/link";
import { ShoppingCart, Heart, Search } from "lucide-react";

interface NavbarActionsProps {
  mounted: boolean;
  cartCount: number;
  wishlistCount: number;
  mobileSearchOpen: boolean;
  onToggleMobileSearch: () => void;
}

export function NavbarActions({
  mounted,
  cartCount,
  wishlistCount,
  mobileSearchOpen,
  onToggleMobileSearch,
}: NavbarActionsProps) {
  return (
    <div className="flex items-center gap-6 flex-shrink-0">
      {/* Cart with red counter badge and text */}
      <Link
        href="/cart"
        className="flex items-center gap-2 text-[#495057] hover:text-[#00a699] transition-colors group"
      >
        <div className="relative">
          <ShoppingCart className="w-6 h-6 text-[#495057] stroke-[1.6]" />
          {mounted && (
            <span className="absolute -top-1.5 -right-1.5 bg-[#e74c3c] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white leading-none">
              {cartCount > 0 ? cartCount : 1}
            </span>
          )}
        </div>
        <span className="text-[13.5px] font-medium text-[#495057]">Cart</span>
      </Link>

      {/* Wishlist with heart icon and text */}
      <Link
        href="/wishlist"
        className="hidden sm:flex items-center gap-2 text-[#495057] hover:text-[#00a699] transition-colors group"
      >
        <div className="relative">
          <Heart className="w-6 h-6 text-[#495057] stroke-[1.6]" />
          {mounted && wishlistCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-[#e74c3c] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white leading-none">
              {wishlistCount}
            </span>
          )}
        </div>
        <span className="text-[13.5px] font-medium text-[#495057]">Wishlist</span>
      </Link>

      {/* Sell Now solid teal button */}
      <Link
        href="/dashboard/add-product"
        className="hidden md:flex items-center justify-center bg-[#00a699] hover:bg-[#008f84] text-white px-5 py-2.5 rounded-[3px] text-[13.5px] font-semibold transition-colors shadow-2xs active:scale-95"
      >
        Sell Now
      </Link>

      {/* Mobile Search Icon */}
      <button
        type="button"
        onClick={onToggleMobileSearch}
        className="md:hidden text-gray-600 hover:text-[#00a699] p-1 cursor-pointer"
        aria-label="Toggle Search"
      >
        <Search className="w-6 h-6" />
      </button>
    </div>
  );
}
