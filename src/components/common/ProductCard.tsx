"use client";

import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/contexts/AppContext";

interface ProductCardProps {
  product: {
    id: string;
    slug: string;
    title: string;
    price: number | string;
    originalPrice?: number | null;
    discount?: number | null;
    vendorName?: string;
    imageUrl?: string;
    vendor?: { name: string };
    images?: string[];
    rating?: number;
    reviews?: number | any[];
    reviewsCount?: number;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { t, formatPrice, toggleWishlist, isInWishlist } = useAppContext();

  const vendorName = product.vendorName || product.vendor?.name || "Modesy Seller";
  const imageUrl = product.imageUrl || product.images?.[0] || "";
  const reviewsCount = typeof product.reviews === "number"
    ? product.reviews
    : Array.isArray(product.reviews)
      ? product.reviews.length
      : (product.reviewsCount || 0);

  const isFree = product.price === "Free" || product.price === 0 || product.price === "Gratis";
  const isQuote = product.price === "Request a Quote" || product.price === "Minta Penawaran";

  return (
    <div className="group bg-white rounded-lg border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
      {/* Image Container */}
      <Link href={`/product/${product.slug}`} className="relative block aspect-[4/5] bg-gray-50 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded-sm bg-red-500 text-white text-[11px] font-bold shadow-sm">
            -{product.discount}%
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 bg-white">
        {/* Title */}
        <Link href={`/product/${product.slug}`} className="text-[13px] font-semibold text-gray-800 line-clamp-2 mb-1 hover:text-brand-primary transition-colors min-h-[38px] leading-snug">
          {t("products." + product.slug.replace(/-/g, '_'), product.title)}
        </Link>

        {/* Vendor */}
        <Link href={`/vendor/${vendorName.toLowerCase().replace(/\s+/g, '-')}`} className="text-xs text-gray-400 hover:text-brand-primary transition-colors mb-2 truncate">
          {vendorName}
        </Link>

        {/* Rating and Wishlist */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={cn(
                  "w-3.5 h-3.5",
                  (product.rating || 0) >= star ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                )}
              />
            ))}
            <span className="text-[11px] text-gray-400 ml-1">{reviewsCount}</span>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product.slug);
            }}
            className="text-gray-300 hover:text-red-500 transition-colors p-1"
            title="Add to Wishlist"
          >
            <Heart className={cn("w-4 h-4", isInWishlist(product.slug) ? "fill-red-500 text-red-500" : "text-gray-300")} />
          </button>
        </div>

        {/* Price */}
        <div className="mt-auto">
          {product.originalPrice && (
            <div className="text-[11px] text-gray-400 line-through mb-0.5">
              {formatPrice(product.originalPrice)}
            </div>
          )}
          <div className={cn(
            "text-sm font-bold",
            isFree ? "text-brand-primary" :
              isQuote ? "text-gray-900" :
                product.discount ? "text-brand-primary" : "text-gray-900",
            (product.originalPrice && !product.discount) ? "text-brand-primary" : ""
          )}>
            {typeof product.price === "number" ? formatPrice(product.price) : (product.price === "Free" ? t("free") : t("request_quote"))}
          </div>
        </div>
      </div>
    </div>
  );
}
