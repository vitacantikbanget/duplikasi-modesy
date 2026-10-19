"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  Trash2, 
  Minus, 
  Plus, 
  ArrowRight, 
  ShoppingBag, 
  ShieldCheck, 
  ChevronRight,
  Tag,
  Check
} from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";

export default function CartPage() {
  const { cart, removeFromCart, updateCartQuantity, clearCart, formatPrice, cartSubtotal, t } = useAppContext();
  
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMessage, setCouponMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === "MODESY10" || code === "DISKON10") {
      setDiscountPercent(10);
      setCouponMessage({ text: "Kupon berhasil diterapkan! Diskon 10%", type: "success" });
    } else if (code === "MODESY20" || code === "DISKON20") {
      setDiscountPercent(20);
      setCouponMessage({ text: "Kupon spesial diterapkan! Diskon 20%", type: "success" });
    } else {
      setCouponMessage({ text: "Kode kupon tidak valid atau sudah kedaluwarsa.", type: "error" });
    }
  };

  const discountAmount = (cartSubtotal * discountPercent) / 100;
  const finalTotal = Math.max(0, cartSubtotal - discountAmount);

  return (
    <div className="bg-[#fcfcfc] min-h-screen pb-20">
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center text-xs text-gray-500">
          <Link href="/" className="hover:text-brand-primary transition-colors">{t("home")}</Link>
          <ChevronRight className="w-3.5 h-3.5 mx-2 text-gray-400" />
          <span className="text-gray-800 font-medium">{t("cart")}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Keranjang Belanja ({cart.reduce((a, b) => a + b.quantity, 0)} Barang)
        </h1>

        {cart.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white rounded-xl border border-gray-100 p-12 text-center max-w-xl mx-auto shadow-xs my-8">
            <div className="w-20 h-20 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Keranjang Belanja Anda Kosong</h2>
            <p className="text-sm text-gray-500 mb-6">
              Sepertinya Anda belum menambahkan produk apa pun ke keranjang belanja Anda.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-hover text-white text-sm font-semibold px-6 py-3 rounded-lg shadow-sm transition-all"
            >
              Mulai Belanja Sekarang <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* Cart Content Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Cart Items Table */}
            <div className="lg:col-span-8 bg-white rounded-xl border border-gray-100 shadow-xs overflow-hidden">
              <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3.5 bg-gray-50/70 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <span className="col-span-6">Produk</span>
                <span className="col-span-2 text-center">Harga</span>
                <span className="col-span-2 text-center">Jumlah</span>
                <span className="col-span-2 text-right">Subtotal</span>
              </div>

              <div className="divide-y divide-gray-100">
                {cart.map((item) => (
                  <div key={item.id} className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                    
                    {/* Product Info */}
                    <div className="sm:col-span-6 flex gap-4 items-center">
                      <Link 
                        href={`/product/${item.productSlug}`} 
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-gray-50 overflow-hidden shrink-0 border border-gray-100"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={item.imageUrl} 
                          alt={item.title} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform" 
                        />
                      </Link>

                      <div className="flex-1 min-w-0">
                        <Link 
                          href={`/product/${item.productSlug}`}
                          className="text-sm font-bold text-gray-900 hover:text-brand-primary transition-colors line-clamp-2 leading-snug mb-1"
                        >
                          {item.title}
                        </Link>
                        
                        <div className="text-xs text-gray-400 mb-1.5">
                          Oleh: <span className="text-gray-600 font-medium">{item.vendorName}</span>
                        </div>

                        {(item.selectedColor || item.selectedSize) && (
                          <div className="flex flex-wrap gap-1.5 text-[11px] text-gray-500">
                            {item.selectedColor && (
                              <span className="bg-gray-100 px-2 py-0.5 rounded">Warna: {item.selectedColor}</span>
                            )}
                            {item.selectedSize && (
                              <span className="bg-gray-100 px-2 py-0.5 rounded">Ukuran: {item.selectedSize}</span>
                            )}
                          </div>
                        )}

                        {/* Mobile Delete Button */}
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="sm:hidden text-xs text-red-500 hover:text-red-700 flex items-center gap-1 mt-2"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Hapus
                        </button>
                      </div>
                    </div>

                    {/* Unit Price */}
                    <div className="sm:col-span-2 text-left sm:text-center text-sm font-semibold text-gray-700">
                      <span className="sm:hidden text-xs text-gray-400 mr-2">Harga:</span>
                      {formatPrice(item.price)}
                    </div>

                    {/* Quantity Selector */}
                    <div className="sm:col-span-2 flex sm:justify-center items-center">
                      <div className="flex items-center border border-gray-200 rounded-md h-9 bg-white">
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-9 text-center text-xs font-bold text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Item Total & Remove */}
                    <div className="sm:col-span-2 flex items-center justify-between sm:justify-end gap-3 text-right">
                      <div className="text-sm font-bold text-brand-primary">
                        <span className="sm:hidden text-xs text-gray-400 mr-2">Total:</span>
                        {formatPrice(item.price * item.quantity)}
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="hidden sm:inline-flex p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                        title="Hapus barang"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>

              {/* Cart Table Bottom Actions */}
              <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex flex-wrap justify-between items-center gap-4">
                <Link
                  href="/"
                  className="text-xs font-semibold text-gray-600 hover:text-brand-primary flex items-center gap-1.5 transition-colors"
                >
                  ← Lanjut Belanja
                </Link>

                <button
                  type="button"
                  onClick={clearCart}
                  className="text-xs font-medium text-red-500 hover:text-red-700 transition-colors"
                >
                  Kosongkan Keranjang
                </button>
              </div>

            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-4 bg-white rounded-xl border border-gray-100 shadow-xs p-6 space-y-6">
              <h2 className="font-bold text-lg text-gray-900 border-b border-gray-100 pb-3">
                Ringkasan Pesanan
              </h2>

              {/* Pricing Breakdown */}
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between items-center">
                  <span>Subtotal Belanja</span>
                  <span className="font-bold text-gray-900">{formatPrice(cartSubtotal)}</span>
                </div>

                {discountPercent > 0 && (
                  <div className="flex justify-between items-center text-emerald-600">
                    <span>Diskon Kupon ({discountPercent}%)</span>
                    <span className="font-bold">-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span>Estimasi Pengiriman</span>
                  <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                    Dihitung saat Checkout
                  </span>
                </div>

                <div className="border-t border-gray-100 pt-3 flex justify-between items-baseline">
                  <span className="text-base font-bold text-gray-900">Total Pembayaran</span>
                  <span className="text-2xl font-extrabold text-brand-primary">
                    {formatPrice(finalTotal)}
                  </span>
                </div>
              </div>

              {/* Promo Coupon Box */}
              <div className="pt-2">
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Kode Kupon (cth: MODESY10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full text-xs pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-md outline-none focus:border-brand-primary focus:bg-white uppercase tracking-wider font-semibold"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-gray-800 hover:bg-black text-white text-xs font-semibold rounded-md transition-colors"
                  >
                    Terapkan
                  </button>
                </form>

                {couponMessage && (
                  <p className={`text-xs mt-2 ${couponMessage.type === "success" ? "text-emerald-600" : "text-red-500"}`}>
                    {couponMessage.text}
                  </p>
                )}
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                className="w-full py-3.5 bg-brand-primary hover:bg-brand-primary-hover active:scale-98 text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                Lanjut ke Pembayaran <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Security info */}
              <div className="flex items-center justify-center gap-2 text-xs text-gray-400 text-center pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Transaksi Terlindungi & Enkripsi 256-bit SSL</span>
              </div>
            </div>

          </div>
        )}
      </div>

    </div>
  );
}
