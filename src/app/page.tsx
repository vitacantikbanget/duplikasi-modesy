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
    <main className="flex-1">
      {/* Accessible SEO Heading */}
      <h1 className="sr-only">Modesy - Marketplace - Classified Ads Script</h1>

      <HeroSection />
      <ShopByCategory />
      <SpecialOffers />
      <FeaturedProducts />
      <NewArrivals />
      <HomePromoBanners />

      {/* Category Products: Clothing */}
      <CategoryProductsSection
        title="Clothing"
        href="/category/clothing"
        products={clothingShowcaseProducts}
      />

      {/* Category Products: Jewelry & Accessories */}
      <CategoryProductsSection
        title="Jewelry & Accessories"
        href="/category/jewelry-accessories"
        products={jewelryShowcaseProducts}
      />

      <BrandCarousel />
      <BlogSection />
    </main>
  );
}

