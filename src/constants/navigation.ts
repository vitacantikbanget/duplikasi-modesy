/**
 * ============================================================================
 * Konstanta Navigasi & Kategori Pencarian (Navigation & Search Constants)
 * ============================================================================
 * Daftar kategori utama yang muncul pada dropdown pemilih kategori di bilah
 * pencarian utama (Navbar Search Bar) khas Modesy.
 */

export interface SearchCategory {
  name: string;
  slug: string;
}

export const SEARCH_CATEGORIES: SearchCategory[] = [
  { name: "All Categories", slug: "all" },
  { name: "Clothing", slug: "clothing" },
  { name: "Shoes", slug: "shoes" },
  { name: "Home & Living", slug: "home-living" },
  { name: "Jewelry & Accessories", slug: "jewelry-accessories" },
  { name: "Toys & Entertainment", slug: "toys-entertainment" },
  { name: "Graphics & Photos", slug: "graphics-photos" },
  { name: "Video & Audio", slug: "video-audio" },
  { name: "Web Templates & Code", slug: "web-templates-code" },
];
