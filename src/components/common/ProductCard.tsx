/**
 * ============================================================================
 * ProductCard: Kartu Produk Etalase Modesy (Product Grid Card)
 * ============================================================================
 * Komponen kartu produk utama yang digunakan di beranda, katalog kategori,
 * pencarian, dan etalase toko. Mengikuti spesifikasi visual asli Modesy:
 * 1. Wadah Gambar (aspect-square):
 *    - Mendukung efek crossfade gambar kedua saat kursor melayang (hover image).
 *    - Label diskon merah (-X%) di sudut kiri atas.
 *    - Label kondisi barang (Used / Classifieds) di sudut kanan atas.
 * 2. Floating Action Overlay (Aksi Mengambang di Sudut Kanan Atas):
 *    - Tombol "Add to Cart" cepat (ikon keranjang belanja).
 *    - Tombol "Wishlist" cepat (ikon hati dengan status merah jika aktif).
 * 3. Badan Kartu (Card Body):
 *    - Judul produk 2 baris (line-clamp-2) dengan efek hover warna teal.
 *    - Nama penjual/toko vendor dengan tautan ke profil penjual.
 *    - Bintang ulasan rating (1-5 bintang kuning) dan jumlah peminat wishlist.
 * 4. Bagian Harga (Product Price):
 *    - Produk Reguler: Harga promo hijau (`price-green`) dan harga asli dicoret (`<del>`).
 *    - Produk Gratis: Teks tebal "Free".
 *    - Permintaan Penawaran: Tautan "Request a Quote".
 */

"use client";

import Link from "next/link";
import { Heart, Star, ShoppingCart } from "lucide-react";
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
    vendor?: { name: string; slug?: string };
    images?: string[];
    hoverImageUrl?: string;
    rating?: number;
    reviews?: number | any[];
    reviewsCount?: number;
    wishlistCount?: number;
    condition?: string;
    description?: string;
    category?: string;
  };
}

/**
 * Peta gambar cadangan untuk efek hover jika data produk hanya memiliki 1 gambar
 */
const PRODUCT_HOVER_FALLBACKS: Record<string, string> = {
  "black-midi-skirt": "https://images.unsplash.com/photo-1583496661160-c588c4af16b2?w=500&q=80",
  "decorative-pillow": "/images/products/decorative-pillow-2.webp",
  "floral-sundress": "/images/products/floral-sundress-2.webp",
  "sun-hat": "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?w=500&q=80",
  "sneaker-shoes": "/images/products/black-sneakers-2.webp",
  "black-sneakers": "/images/products/black-sneakers-2.webp",
  "kipling-handbag": "/images/products/kipling-handbag-2.webp",
  "cobalt-tshirt": "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&q=80",
  "cobalt-man": "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&q=80",
  "animal-photo": "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=500&q=80",
  "piano-music": "https://images.unsplash.com/photo-1520523839898-50712825e3a7?w=500&q=80",
  "vacation-spots": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80",
  "light-blue-shirt": "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500&q=80",
  "light-blue-women": "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500&q=80",
  "summer-top": "/images/products/summer-top-2.webp",
  "summer-fashion": "/images/products/summer-top-2.webp",
  "lace-blouse": "/images/products/lace-blouse-2.webp",
  "women-lace": "/images/products/lace-blouse-2.webp",
  "animal-prints": "/images/products/animal-prints-2.webp",
  "animal-colorful": "/images/products/animal-prints-2.webp",
  "gucci-backpack": "/images/products/gucci-backpack-2.webp",
  "gucci-smart": "/images/products/gucci-backpack-2.webp",
  "gucci-nylon": "/images/products/gucci-backpack-2.webp",
  "scarves": "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500&q=80",
  "ankle-boot": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80",
  "navy-polka": "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=500&q=80",
  "modern-couch": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80",
  "black-backpack": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
};

export default function ProductCard({ product }: ProductCardProps) {
  const { t, formatPrice, toggleWishlist, isInWishlist, addToCart } = useAppContext();

  // Ambil nama dan slug vendor
  const vendorName = product.vendorName || product.vendor?.name || "Trendshop";
  const vendorSlug = product.vendor?.slug || vendorName.toLowerCase().replace(/\s+/g, "-");
  
  // Gambar default produk
  const defaultImage = product.imageUrl || product.images?.[0] || "/images/products/placeholder.webp";

  // Tentukan gambar kedua saat kursor melayang (hover image)
  let fallbackHover = "";
  for (const [key, val] of Object.entries(PRODUCT_HOVER_FALLBACKS)) {
    if (product.slug?.toLowerCase().includes(key) || defaultImage.toLowerCase().includes(key)) {
      fallbackHover = val;
      break;
    }
  }

  const hoverImage =
    (product.hoverImageUrl && product.hoverImageUrl !== defaultImage)
      ? product.hoverImageUrl
      : (product.images?.[1] && product.images[1] !== defaultImage)
      ? product.images[1]
      : fallbackHover || defaultImage;

  const hasHoverImage = Boolean(hoverImage && hoverImage !== defaultImage);

  const wishlistCount = typeof product.wishlistCount === "number"
    ? product.wishlistCount
    : (typeof product.reviews === "number" ? product.reviews : 0);

  // Status tipe harga khusus
  const isFree = product.price === "Free" || product.price === 0 || product.price === "Gratis";
  const isQuote = product.price === "Request a Quote" || product.price === "Minta Penawaran";

  const numericPrice = typeof product.price === "number"
    ? product.price
    : (isFree ? 0 : 49);

  /**
   * Menambahkan produk ke keranjang belanja saat tombol keranjang cepat diklik
   */
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      productSlug: product.slug,
      title: product.title,
      price: numericPrice,
      imageUrl: defaultImage,
      quantity: 1,
      vendorName: vendorName,
    });
  };

  /**
   * Menambahkan/menghapus produk dari wishlist favorit
   */
  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.slug);
  };

  const isFavorited = isInWishlist(product.slug);

  return (
    <div className="product-card group relative bg-white border border-[#eaeaea] rounded-[4px] overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      {/* 1. Wadah Gambar Produk dengan Rasio Persegi (Aspect Square) */}
      <div className="product-image-container multi-image-container relative aspect-square bg-[#f8f9fa] overflow-hidden">
        {/* Badge Diskon Merah */}
        {product.discount && (
          <div className="product-card-badge product-card-badge-red absolute top-2.5 left-2.5 z-10 bg-[#e74c3c] text-white text-[11px] font-bold px-1.5 py-0.5 rounded-[2px] shadow-2xs">
            -{product.discount}%
          </div>
        )}

        {/* Badge Kondisi Barang (misal: Barang Bekas / Classified Ads) */}
        {product.condition && product.condition !== "New" && (
          <div className="absolute top-2.5 right-2.5 z-10 bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-[2px] shadow-2xs">
            {product.condition}
          </div>
        )}

        {/* Gambar Utama & Efek Crossfade Hover */}
        <Link href={`/product/${product.slug}`} className="block relative w-full h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={defaultImage}
            alt={product.title}
            className={cn(
              "product-image default-image w-full h-full object-cover transition-opacity duration-300",
              hasHoverImage && "group-hover:opacity-0"
            )}
          />
          {hasHoverImage && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={hoverImage}
              alt={product.title}
              className="product-image hover-image absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          )}
        </Link>

        {/* Overlay Tombol Aksi Cepat (Add to Cart & Wishlist) */}
        <div className="product-actions-overlay">
          {!isQuote && (
            <button
              type="button"
              onClick={handleAddToCart}
              className="action-btn cart-btn btn-item-add-to-cart"
              title="Add to Cart"
              aria-label="Add to Cart"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={handleWishlist}
            className="action-btn wishlist-btn btn-add-remove-wishlist"
            title="Wishlist"
            aria-label="Wishlist"
          >
            <Heart
              className={cn(
                "w-4 h-4 transition-colors",
                isFavorited ? "fill-red-500 text-red-500" : "text-gray-600"
              )}
            />
          </button>
        </div>
      </div>

      {/* 2. Badan Kartu Informasi Produk */}
      <div className="card-body p-3.5 flex flex-col flex-1">
        {/* Judul Produk (Maksimal 2 Baris) */}
        <h3 className="product-title font-medium text-[13px] leading-snug line-clamp-2 min-h-[36px] mb-1">
          <Link
            href={`/product/${product.slug}`}
            className="text-gray-800 hover:text-brand-primary transition-colors"
          >
            {t("products." + product.slug.replace(/-/g, "_"), product.title)}
          </Link>
        </h3>

        {/* Nama Penjual / Toko Vendor */}
        <div className="product-seller text-xs text-gray-400 truncate mb-2">
          <Link
            href={`/vendor/${vendorSlug}`}
            className="hover:text-brand-primary transition-colors"
          >
            {vendorName}
          </Link>
        </div>

        {/* Rating Bintang & Counter Wishlist */}
        <div className="product-rating flex items-center justify-between text-xs mb-3">
          <div className="rating flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={cn(
                  "w-3.5 h-3.5",
                  (product.rating || 5) >= star
                    ? "fill-amber-400 text-amber-400"
                    : "fill-gray-200 text-gray-200"
                )}
              />
            ))}
          </div>

          <span className="item-wishlist text-gray-400 text-[11px] flex items-center gap-1">
            <Heart className={cn("w-3 h-3", isFavorited ? "fill-red-500 text-red-500" : "text-gray-300")} />
            {wishlistCount}
          </span>
        </div>

        {/* Area Harga Produk */}
        <div className="product-footer mt-auto pt-1">
          <div className="product-price flex items-baseline">
            {isFree ? (
              <span className="price-free price-green text-brand-primary font-bold text-sm">
                {t("free", "Free")}
              </span>
            ) : isQuote ? (
              <Link
                href={`/product/${product.slug}`}
                className="a-meta-request-quote text-xs font-semibold text-gray-800 hover:text-brand-primary"
              >
                {t("request_quote", "Request a Quote")}
              </Link>
            ) : (
              <>
                <span
                  suppressHydrationWarning
                  className={cn(
                    "price font-bold text-[15px]",
                    (product.discount || product.originalPrice) ? "price-green" : "text-gray-900"
                  )}
                >
                  {formatPrice(numericPrice)}
                </span>
                {product.originalPrice && (
                  <del suppressHydrationWarning className="discount-original-price">
                    {formatPrice(product.originalPrice)}
                  </del>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
