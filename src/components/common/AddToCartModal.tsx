/**
 * ============================================================================
 * AddToCartModal: Modal Notifikasi Penambahan Produk ke Keranjang
 * ============================================================================
 * Modal dialog konfirmasi yang muncul secara instan saat pengguna menekan
 * tombol "Add to Cart":
 * - Menampilkan ikon centang hijau teal konfirmasi keberhasilan.
 * - Menampilkan thumbnail produk, judul barang, nama vendor, harga terformat, & kuantitas.
 * - Tombol "Continue Shopping": Menutup modal agar pengguna bisa lanjut berbelanja.
 * - Tombol "Go to Cart": Mengarahkan pengguna langsung ke halaman keranjang belanja (/cart).
 */

"use client";

import Link from "next/link";
import { Check, X } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";

export default function AddToCartModal() {
  const { isAddToCartModalOpen, setIsAddToCartModalOpen, addedModalItem, formatPrice } = useAppContext();

  // Jika modal ditutup atau data item belum tersedia, jangan render apa pun
  if (!isAddToCartModalOpen || !addedModalItem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-[1px] animate-fade-in">
      <div 
        className="bg-white rounded-md shadow-2xl max-w-lg w-full overflow-hidden animate-slide-down border border-gray-100"
        role="dialog"
        aria-modal="true"
      >
        {/* Header Modal */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-[#fbfbfb]">
          <div className="flex items-center gap-2 text-[#00a99d] font-semibold text-sm md:text-base">
            <span className="w-5 h-5 rounded-full bg-[#00a99d]/15 flex items-center justify-center">
              <Check className="w-3.5 h-3.5 text-[#00a99d] stroke-[3]" />
            </span>
            <span>Product successfully added to your cart!</span>
          </div>
          <button
            type="button"
            onClick={() => setIsAddToCartModalOpen(false)}
            className="text-gray-400 hover:text-gray-600 p-1 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Badan Modal (Preview Produk yang Baru Ditambahkan) */}
        <div className="p-5">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 bg-gray-50 rounded border border-gray-100 overflow-hidden shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={addedModalItem.imageUrl}
                alt={addedModalItem.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug">
                {addedModalItem.title}
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                Vendor: <span className="font-medium text-gray-700">{addedModalItem.vendorName || "Modesy Seller"}</span>
              </p>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-sm font-bold text-[#00a99d]">
                  {formatPrice(addedModalItem.price)}
                </span>
                <span className="text-xs text-gray-400">
                  Qty: {addedModalItem.quantity}
                </span>
              </div>
            </div>
          </div>

          {/* Tombol Aksi (Lanjut Belanja atau Pergi ke Keranjang) */}
          <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsAddToCartModalOpen(false)}
              className="w-full py-2.5 px-4 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-[3px] transition-colors text-center cursor-pointer"
            >
              Continue Shopping
            </button>
            <Link
              href="/cart"
              onClick={() => setIsAddToCartModalOpen(false)}
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#00a99d] hover:bg-[#008f85] rounded-[3px] transition-colors text-center shadow-xs cursor-pointer flex items-center justify-center"
            >
              Go to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
