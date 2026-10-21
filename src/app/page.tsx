// Halaman ini adalah halaman depan (Home Page) marketplace Modesy.
// Tugas utamanya adalah menampilkan semua etalase, banner promo, dan produk unggulan kepada pembeli.

import HeroSection from "@/components/home/HeroSection";
import ShopByCategory from "@/components/home/ShopByCategory";
import SpecialOffers from "@/components/home/SpecialOffers";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import NewArrivals from "@/components/home/NewArrivals";
import HomePromoBanners from "@/components/home/HomePromoBanners";
import CategoryProductsSection, {
  clothingShowcaseProducts,
  jewelryShowcaseProducts,
} from "@/components/home/CategoryProductsSection";
import BrandCarousel from "@/components/home/BrandCarousel";
import BlogSection from "@/components/home/BlogSection";

export default function HomePage() {
  return (
    // Wadah utama konten website agar posisinya fleksibel dan rapi
    <main className="flex-1">
      {/* Judul tersembunyi untuk optimasi Google (SEO) tanpa merusak tampilan visual */}
      <h1 className="sr-only">Modesy - Marketplace - Classified Ads Script</h1>

      {/* 1. Bagian Banner Utama: Menampilkan slide promo besar di posisi paling atas */}
      <HeroSection />

      {/* 2. Jelajahi Kategori: Menampilkan ikon-ikon kategori produk (pakaian, elektronik, dll) */}
      <ShopByCategory />

      {/* 3. Penawaran Khusus: Produk dengan diskon menarik yang sedang berlangsung */}
      <SpecialOffers />

      {/* 4. Produk Unggulan: Produk rekomendasi terbaik dari para penjual pilihan */}
      <FeaturedProducts />

      {/* 5. Produk Terbaru: Menampilkan barang-barang yang baru saja diunggah penjual */}
      <NewArrivals />

      {/* 6. Banner Promosi Tambahan: Gambar promosi tengah untuk menarik perhatian pembeli */}
      <HomePromoBanners />

      {/* 7. Etalase Khusus Pakaian: Menampilkan deretan pakaian yang siap dibeli */}
      <CategoryProductsSection
        title="Clothing"
        href="/clothing"
        products={clothingShowcaseProducts}
      />

      {/* 8. Etalase Khusus Perhiasan & Aksesoris: Koleksi cincin, gelang, dan kalung */}
      <CategoryProductsSection
        title="Jewelry & Accessories"
        href="/jewelry-accessories"
        products={jewelryShowcaseProducts}
      />

      {/* 9. Logo Brand Rekanan: Geser logo merk terkenal yang bekerjasama */}
      <BrandCarousel />

      {/* 10. Bagian Blog / Artikel: Tips belanja dan info menarik seputar marketplace */}
      <BlogSection />
    </main>
  );
}
