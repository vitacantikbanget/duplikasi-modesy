import HeroSection from "@/components/home/HeroSection";
import ShopByCategory from "@/components/home/ShopByCategory";
import SpecialOffers from "@/components/home/SpecialOffers";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import HomePromoBanners from "@/components/home/HomePromoBanners";
import NewArrivals from "@/components/home/NewArrivals";
import BrandCarousel from "@/components/home/BrandCarousel";
import BlogSection from "@/components/home/BlogSection";

export default function HomePage() {
  return (
    <main className="flex-1">
      <HeroSection />
      <ShopByCategory />
      <SpecialOffers />
      <FeaturedProducts />
      <HomePromoBanners />
      <NewArrivals />
      <BrandCarousel />
      <BlogSection />
    </main>
  );
}
