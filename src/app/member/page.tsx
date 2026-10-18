"use client";

import React, { useEffect } from "react";
import Link from "next/link";
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
import { useAppContext } from "@/contexts/AppContext";
import { 
  ShoppingBag, 
  Wallet, 
  Tag, 
  MessageSquare, 
  Settings, 
  ShieldCheck, 
  User 
} from "lucide-react";

export default function MemberHomePage() {
  const { role, setRole, userProfile } = useAppContext();

  useEffect(() => {
    if (role !== "member") {
      setRole("member");
    }
  }, [role, setRole]);

  return (
    <main className="flex-1 w-full space-y-6 pb-12">
      {/* Accessible Heading */}
      <h1 className="sr-only">Modesy - Marketplace - Classified Ads Script (Member Area)</h1>


      {/* 1. Hero Section Slider */}
      <HeroSection />

      {/* 2. Shop By Category */}
      <ShopByCategory />

      {/* 3. Special Offers */}
      <SpecialOffers />

      {/* 4. Featured Products */}
      <FeaturedProducts />

      {/* 5. New Arrivals */}
      <NewArrivals />

      {/* 6. Promotional Banners */}
      <HomePromoBanners />

      {/* 7. Category Showcase: Clothing */}
      <CategoryProductsSection
        title="Clothing"
        href="/member/category/clothing"
        products={clothingShowcaseProducts}
      />

      {/* 8. Category Showcase: Jewelry & Accessories */}
      <CategoryProductsSection
        title="Jewelry & Accessories"
        href="/member/category/jewelry-accessories"
        products={jewelryShowcaseProducts}
      />

      {/* 9. Brands Carousel */}
      <BrandCarousel />

      {/* 10. Blog Section */}
      <BlogSection />
    </main>
  );
}
