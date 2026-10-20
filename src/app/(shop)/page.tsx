/**
 * ============================================================================
 * Homepage / Halaman Beranda Utama (Modesy Storefront Index)
 * ============================================================================
 * Halaman utama platform marketplace Modesy. Menggabungkan section-section:
 * 1. `HeroSection`: Slider promosi utama dan banner samping.
 * 2. `ShopByCategory`: Navigasi kategori lingkaran dengan efek overlay teal.
 * 3. `SpecialOffers`: Penawaran terbatas dan produk diskon khusus.
 * 4. `FeaturedProducts`: Grid 6 kolom produk unggulan.
 * 5. `NewArrivals`: Produk-produk terbaru.
 * 6. `HomePromoBanners`: Banner promosi grafis horizontal di tengah etalase.
 * 7. `CategoryProductsSection`: Showcase katalog kategori (Clothing, Jewelry).
 * 8. `BrandCarousel`: Slider merek mitra resmi.
 * 9. `BlogSection`: Artikel panduan gaya dan berita belanja.
 */

import {
  HeroSection,
  ShopByCategory,
  SpecialOffers,
  FeaturedProducts,
  NewArrivals,
  HomePromoBanners,
  CategoryProductsSection,
  clothingShowcaseProducts,
  jewelryShowcaseProducts,
  BrandCarousel,
  BlogSection,
} from "@/components/home";

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* Heading aksesibilitas & SEO (tersembunyi secara visual) */}
      <h1 className="sr-only">Modesy - Marketplace - Classified Ads Script</h1>

      {/* 1. Hero Banner Slider */}
      <HeroSection />

      {/* 2. Grid Kategori Cepat */}
      <ShopByCategory />

      {/* 3. Penawaran Khusus (Special Offers) */}
      <SpecialOffers />

      {/* 4. Produk Unggulan (Featured Products) */}
      <FeaturedProducts />

      {/* 5. Produk Terbaru (New Arrivals) */}
      <NewArrivals />

      {/* 6. Banner Promosi Menengah */}
      <HomePromoBanners />

      {/* 7. Showcase Produk Kategori: Pakaian (Clothing) */}
      <CategoryProductsSection
        title="Clothing"
        href="/clothing"
        products={clothingShowcaseProducts}
      />

      {/* 8. Showcase Produk Kategori: Perhiasan (Jewelry & Accessories) */}
      <CategoryProductsSection
        title="Jewelry & Accessories"
        href="/jewelry-accessories"
        products={jewelryShowcaseProducts}
      />

      {/* 9. Slider Merek / Brand Mitra */}
      <BrandCarousel />

      {/* 10. Bagian Blog & Artikel Terkini */}
      <BlogSection />
    </main>
  );
}
