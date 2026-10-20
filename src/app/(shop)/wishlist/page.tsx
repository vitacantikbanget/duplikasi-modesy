"use client";

import Link from "next/link";
import { Heart, ChevronRight, ShoppingBag } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import { ALL_PRODUCTS } from "@/lib/products-data";
import ProductCard from "@/components/common/ProductCard";

export default function WishlistPage() {
  const { wishlist, t } = useAppContext();

  const favoriteProducts = ALL_PRODUCTS.filter((p) => wishlist.includes(p.slug));

  return (
    <div className="bg-[#fcfcfc] min-h-screen pb-20">
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center text-xs text-gray-500">
          <Link href="/" className="hover:text-brand-primary transition-colors">{t("home")}</Link>
          <ChevronRight className="w-3.5 h-3.5 mx-2 text-gray-400" />
          <span className="text-gray-800 font-medium">{t("wishlist")}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
              Produk Favorit (Wishlist)
            </h1>
            <p className="text-xs text-gray-500">
              Daftar produk yang Anda simpan untuk dibeli nanti.
            </p>
          </div>
          <span className="text-xs font-semibold bg-red-50 text-red-600 px-3 py-1 rounded-full border border-red-100">
            {favoriteProducts.length} Produk
          </span>
        </div>

        {favoriteProducts.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 p-12 text-center max-w-md mx-auto shadow-xs my-8">
            <div className="w-16 h-16 bg-red-50 text-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-bold text-gray-800 mb-2">Wishlist Anda Masih Kosong</h2>
            <p className="text-xs text-gray-500 mb-6">
              Klik ikon hati pada produk apa pun untuk menyimpannya ke daftar wishlist Anda.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-semibold px-5 py-2.5 rounded-lg shadow-sm transition-all"
            >
              Jelajahi Produk
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {favoriteProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>

    </div>
  );
}
