/**
 * ============================================================================
 * Modul Komponen Beranda (Home Components)
 * ============================================================================
 * Berkas ini mengumpulkan dan mengekspor seluruh komponen section pada homepage:
 * - HeroSection: Banner slider utama bergaya Modesy dengan navigasi slide & promo samping.
 * - ShopByCategory: Grid kategori melingkar dengan efek hover teal.
 * - SpecialOffers: Section penawaran produk diskon & promosi khusus.
 * - FeaturedProducts: Grid 6 kolom produk unggulan (Featured Products).
 * - NewArrivals: Section produk terbaru yang baru saja diunggah penjual.
 * - HomePromoBanners: Banner promosi horizontal 2/3 kolom di tengah halaman.
 * - CategoryProductsSection: Showcase produk bertema kategori tertentu (Clothing, Jewelry).
 * - BrandCarousel: Slider logo merek/brand mitra (Adidas, Nike, Puma, dll).
 * - BlogSection: Tinjauan postingan artikel & tips belanja terkini.
 */

export { default as HeroSection } from "./HeroSection";
export { default as ShopByCategory } from "./ShopByCategory";
export { default as SpecialOffers } from "./SpecialOffers";
export { default as FeaturedProducts } from "./FeaturedProducts";
export { default as NewArrivals } from "./NewArrivals";
export { default as HomePromoBanners } from "./HomePromoBanners";
export {
  default as CategoryProductsSection,
  clothingShowcaseProducts,
  jewelryShowcaseProducts,
} from "./CategoryProductsSection";
export { default as BrandCarousel } from "./BrandCarousel";
export { default as BlogSection } from "./BlogSection";
