/**
 * ============================================================================
 * Definisi Tipe Produk Modesy (Modesy Product Schema Types)
 * ============================================================================
 * Mengacu pada arsitektur Hybrid Marketplace & Classifieds Modesy:
 * 1. productType:
 *    - 'physical': Barang fisik yang membutuhkan inventaris & pengiriman.
 *    - 'digital': File unduhan langsung (software, mp3, template).
 *    - 'license_key': Kunci lisensi atau serial code.
 *    - 'quote': Sistem penawaran harga khusus (B2B).
 *    - 'ordinary': Iklan baris barang bekas (used stuff) untuk jual beli lokal / COD.
 * 2. listingType:
 *    - 'sale': Dijual dengan tombol "Add to Cart" dan checkout payment gateway.
 *    - 'ordinary': Iklan classified tanpa alur payment online (kontak telepon/chat).
 *    - 'quote': Memerlukan form permintaan penawaran harga penjual.
 *    - 'license': Pembelian lisensi software.
 */

export interface ProductVariationColor {
  name: string;
  hex: string;
}

export interface ProductReview {
  id: string;
  user: string;
  avatar: string;
  rating: number; // Skala 1 - 5 bintang
  date: string;
  comment: string;
}

export interface ProductItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  subcategory: string;
  subcategorySlug: string;
  price: number | "Free" | "Request a Quote";
  originalPrice?: number | null; // Harga sebelum diskon (dicoret)
  discount?: number | null; // Persentase diskon
  productType: "physical" | "digital" | "license_key" | "quote" | "ordinary";
  condition?: "New" | "Used - Like New" | "Used - Good" | "Used - Fair";
  listingType?: "sale" | "ordinary" | "quote" | "license";
  stock: number;
  sku: string;
  rating: number;
  reviewsCount: number;
  images: string[];
  colors?: ProductVariationColor[];
  sizes?: string[];
  vendor: {
    name: string;
    slug: string;
    avatar: string;
    rating: number;
    joinedDate: string;
    location: string;
    verified: boolean; // Badge terverifikasi (centang hijau Modesy)
  };
  description: string;
  specs: { label: string; value: string }[];
  shippingInfo: {
    estimatedDelivery: string;
    shippingCost: string;
    returnPolicy: string;
  };
  reviews: ProductReview[];
}

/**
 * Tipe data produk untuk Quick View Modal yang mendukung kompatibilitas format
 * baik dari ProductItem katalog penuh maupun ProductCard etalase.
 */
export interface QuickViewProduct {
  id: string;
  slug: string;
  title: string;
  price: number | string;
  originalPrice?: number | null;
  discount?: number | null;
  vendorName?: string;
  imageUrl?: string;
  images?: string[];
  hoverImageUrl?: string;
  vendor?: { name: string; slug?: string; avatar?: string };
  rating?: number;
  reviewsCount?: number;
  reviews?: number | ProductReview[];
  condition?: string;
  description?: string;
  category?: string;
}
