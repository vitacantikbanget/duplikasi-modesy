/**
 * ============================================================================
 * QuickViewModal: Modal Pratinjau Cepat Produk (Quick View Modal)
 * ============================================================================
 * Memungkinkan calon pembeli memeriksa rincian produk secara langsung
 * tanpa harus berpindah dari halaman etalase/katalog:
 * 1. Galeri Gambar Interaktif:
 *    - Thumbnail gambar yang dapat diklik untuk berganti foto utama.
 *    - Indikator diskon produk (-X%).
 * 2. Informasi Lengkap:
 *    - Judul produk, rating bintang (1-5), tautan ke toko penjual.
 *    - Harga promo terformat dan harga coret asli.
 *    - Deskripsi ringkas produk.
 * 3. Aksi Cepat:
 *    - Pengatur jumlah barang beli (Quantity Counter +/-).
 *    - Tombol "Add to Cart" dengan feedback animasi.
 *    - Tombol "Wishlist" dan tautan "View Details" ke halaman penuh `/product/[slug]`.
 */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Heart, Star, ShoppingCart, ExternalLink, Check, Plus, Minus } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";

export default function QuickViewModal() {
  const {
    isQuickViewOpen,
    quickViewProduct,
    closeQuickView,
    addToCart,
    toggleWishlist,
    isInWishlist,
    formatPrice,
    t,
  } = useAppContext();

  const [selectedImage, setSelectedImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (quickViewProduct) {
      const defaultImg =
        quickViewProduct.imageUrl ||
        quickViewProduct.images?.[0] ||
        "/images/products/placeholder.webp";
      setSelectedImage(defaultImg);
      setQuantity(1);
      setAddedSuccess(false);
    }
  }, [quickViewProduct]);

  if (!isQuickViewOpen || !quickViewProduct) return null;

  const vendorName =
    quickViewProduct.vendorName || quickViewProduct.vendor?.name || "Trendshop";
  const vendorSlug =
    quickViewProduct.vendor?.slug || vendorName.toLowerCase().replace(/\s+/g, "-");

  const images: string[] =
    quickViewProduct.images && quickViewProduct.images.length > 0
      ? quickViewProduct.images
      : [
          quickViewProduct.imageUrl || "/images/products/placeholder.webp",
          ...(quickViewProduct.hoverImageUrl ? [quickViewProduct.hoverImageUrl] : []),
        ];

  const numericPrice =
    typeof quickViewProduct.price === "number"
      ? quickViewProduct.price
      : quickViewProduct.price === "Free" || Number(quickViewProduct.price) === 0
      ? 0
      : 49;

  const originalPrice = quickViewProduct.originalPrice || null;
  const discount = quickViewProduct.discount || null;
  const isFavorited = isInWishlist(quickViewProduct.slug);

  const handleAddToCart = () => {
    addToCart({
      id: quickViewProduct.id,
      productSlug: quickViewProduct.slug,
      title: quickViewProduct.title,
      price: numericPrice,
      imageUrl: selectedImage || images[0],
      quantity: quantity,
      vendorName: vendorName,
    });
    setAddedSuccess(true);
    setTimeout(() => {
      closeQuickView();
    }, 400);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Quick View Modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-[2px] animate-in fade-in duration-200"
      onClick={closeQuickView}
    >
      <div
        className="relative w-full max-w-3xl bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-100 flex flex-col md:flex-row max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={closeQuickView}
          aria-label="Close Quick View"
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-black flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Column: Image Gallery */}
        <div className="w-full md:w-1/2 p-5 bg-[#fafafa] flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-gray-100">
          <div className="relative w-full aspect-square bg-white rounded-md overflow-hidden border border-gray-200/80 flex items-center justify-center mb-3">
            {discount && (
              <span className="absolute top-2.5 left-2.5 z-10 bg-[#e74c3c] text-white text-xs font-bold px-2 py-0.5 rounded-[2px] shadow-2xs">
                -{discount}%
              </span>
            )}

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedImage || images[0]}
              alt={quickViewProduct.title}
              className="w-full h-full object-cover transition-all duration-300"
            />
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto w-full py-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  className={cn(
                    "w-14 h-14 rounded-md overflow-hidden border-2 shrink-0 transition-all cursor-pointer",
                    selectedImage === img
                      ? "border-[#00a99d] shadow-sm"
                      : "border-gray-200 opacity-70 hover:opacity-100"
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details & Actions */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Category / Breadcrumb */}
            <div className="text-xs text-[#00a99d] font-semibold uppercase tracking-wider mb-1">
              {quickViewProduct.category || "General"}
            </div>

            {/* Title */}
            <h2 className="text-lg sm:text-xl font-bold text-[#222222] leading-snug mb-2">
              <Link
                href={`/product/${quickViewProduct.slug}`}
                onClick={closeQuickView}
                className="hover:text-[#00a99d] transition-colors"
              >
                {t(
                  "products." + quickViewProduct.slug.replace(/-/g, "_"),
                  quickViewProduct.title
                )}
              </Link>
            </h2>

            {/* Seller & Rating */}
            <div className="flex items-center gap-3 text-xs text-gray-500 mb-3 pb-3 border-b border-gray-100">
              <span>
                By:{" "}
                <Link
                  href={`/vendor/${vendorSlug}`}
                  onClick={closeQuickView}
                  className="font-medium text-gray-700 hover:text-[#00a99d]"
                >
                  {vendorName}
                </Link>
              </span>
              <span>•</span>
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="font-semibold text-gray-700">
                  {quickViewProduct.rating || 5}.0
                </span>
              </div>
            </div>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-2xl font-bold text-[#00a99d]">
                {formatPrice(numericPrice)}
              </span>
              {originalPrice && originalPrice > numericPrice && (
                <del className="text-sm text-gray-400 font-normal">
                  {formatPrice(originalPrice)}
                </del>
              )}
            </div>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-5 line-clamp-3">
              {quickViewProduct.description ||
                "High quality verified product available on Modesy. Guaranteed authenticity, secure payment, and fast shipping directly from verified vendors."}
            </p>

            {/* Stock status */}
            <div className="flex items-center gap-2 text-xs text-emerald-600 font-medium mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>In Stock & Ready to Ship</span>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            {/* Quantity Selector + Add to Cart */}
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-gray-300 rounded-[3px] bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center text-sm font-semibold text-gray-800">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={addedSuccess}
                className={cn(
                  "flex-1 h-9 px-4 rounded-[3px] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95",
                  addedSuccess
                    ? "bg-emerald-600 text-white"
                    : "bg-[#00a99d] hover:bg-[#008f84] text-white"
                )}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" /> Add to Cart
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(quickViewProduct.slug)}
                className="w-9 h-9 border border-gray-300 rounded-[3px] flex items-center justify-center text-gray-600 hover:text-red-500 hover:border-red-500 transition-colors cursor-pointer"
                title="Wishlist"
              >
                <Heart
                  className={cn(
                    "w-4 h-4",
                    isFavorited ? "fill-red-500 text-red-500" : ""
                  )}
                />
              </button>
            </div>

            {/* View Full Details Link */}
            <Link
              href={`/product/${quickViewProduct.slug}`}
              onClick={closeQuickView}
              className="w-full text-center py-2 text-xs font-semibold text-gray-600 hover:text-[#00a99d] flex items-center justify-center gap-1 transition-colors"
            >
              <span>View Full Product Details</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
