/**
 * ============================================================================
 * HALAMAN UTAMA / BERANDA (Home Page)
 * ============================================================================
 * File ini adalah halaman pertama (depan) yang dilihat pengunjung saat membuka website.
 * Di sini kita menyusun semua bagian (komponen) toko mulai dari banner promosi paling atas
 * sampai artikel blog di paling bawah.
 */

// Import komponen-komponen yang akan dipasang di halaman depan:
import HeroSection from "@/components/home/HeroSection"; // Slider banner promo besar paling atas
import ShopByCategory from "@/components/home/ShopByCategory"; // Kotak-kotak kategori belanja (baju, elektronik, dll)
import SpecialOffers from "@/components/home/SpecialOffers"; // Bagian produk yang lagi promo / diskon spesial
import FeaturedProducts from "@/components/home/FeaturedProducts"; // Daftar produk unggulan yang dipilih admin
import NewArrivals from "@/components/home/NewArrivals"; // Produk-produk yang baru saja diupload
import HomePromoBanners from "@/components/home/HomePromoBanners"; // Banner iklan promosi di tengah halaman
import CategoryProductsSection, {
  clothingShowcaseProducts, // Contoh data produk pakaian
  jewelryShowcaseProducts, // Contoh data produk perhiasan & aksesoris
} from "@/components/home/CategoryProductsSection"; // Komponen untuk menampilkan produk per kategori
import BrandCarousel from "@/components/home/BrandCarousel"; // Barisan logo brand/merk mitra yang bisa geser
import BlogSection from "@/components/home/BlogSection"; // Bagian artikel berita & tips belanja terbaru

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* Judul tak terlihat (hanya untuk mesin pencari Google/SEO agar website gampang ditemukan di internet) */}
      <h1 className="sr-only">Modesy - Marketplace - Classified Ads Script</h1>

      {/* 1. Banner Promo Bergerak (Slider Hero) di paling atas layar */}
      <HeroSection />

      {/* 2. Pilihan Kategori Belanja (Baju, Sepatu, Aksesoris, Rumah Tangga, dll) */}
      <ShopByCategory />

      {/* 3. Produk Penawaran Spesial (Lagi Diskon / Murah) */}
      <SpecialOffers />

      {/* 4. Produk Unggulan Toko (Paling Populer & Banyak Dibeli) */}
      <FeaturedProducts />

      {/* 5. Produk Terbaru (Baru saja masuk etalase) */}
      <NewArrivals />

      {/* 6. Banner Gambar Iklan Promo di Tengah Halaman */}
      <HomePromoBanners />

      {/* 7. Baris Etalase Khusus Kategori Pakaian (Clothing) */}
      <CategoryProductsSection
        title="Clothing"
        href="/clothing"
        products={clothingShowcaseProducts}
      />

      {/* 8. Baris Etalase Khusus Kategori Perhiasan & Aksesoris */}
      <CategoryProductsSection
        title="Jewelry & Accessories"
        href="/jewelry-accessories"
        products={jewelryShowcaseProducts}
      />

      {/* 9. Geseran Logo-Logo Brand / Merek Ternama */}
      <BrandCarousel />

      {/* 10. Bagian Artikel Blog, Tips, dan Berita Terkini */}
      <BlogSection />
    </main>
  );
}
