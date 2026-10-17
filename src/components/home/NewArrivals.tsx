"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import ProductCard from "@/components/common/ProductCard";
import { featuredProducts } from "./FeaturedProducts";
import { useAppContext } from "@/contexts/AppContext";

const newArrivals = [
  { id: "n1", slug: "scarves", title: "Colorful women scarves", vendorName: "Trendshop", rating: 0, reviews: 0, originalPrice: 741737.25, price: 659322, discount: null, imageUrl: "/images/products/scarves.webp" },
  { id: "n2", slug: "ankle-boot", title: "Women's ankle boot with different colors", vendorName: "Admin", rating: 0, reviews: 0, originalPrice: 1137330.45, price: 972499.95, discount: null, imageUrl: "/images/products/ankle-boot.webp" },
  { id: "n3", slug: "navy-polka-dress", title: "Navy polka dot dress", vendorName: "Trendshop", rating: 0, reviews: 0, originalPrice: 2472457.50, price: 2142796.50, discount: null, imageUrl: "/images/products/navy-polka-dress.webp" },
  { id: "n4", slug: "modern-couch", title: "Modern grey couch and pillows", vendorName: "Admin", rating: 0, reviews: 0, price: "Request a Quote", discount: null, imageUrl: "/images/products/modern-couch.webp" },
  { id: "n5", slug: "black-backpack", title: "Black fashion women backpack", vendorName: "Trendshop", rating: 0, reviews: 0, price: "Request a Quote", discount: null, imageUrl: "/images/products/black-backpack.webp" },
  { id: "n6", slug: "decorative-pillow-2", title: "Handcrafted decorative pillow for a luxurious...", vendorName: "Admin", rating: 0, reviews: 0, originalPrice: 1137330.45, price: 972499.95, discount: null, imageUrl: "/images/products/decorative-pillow.webp" },
];

export default function NewArrivals() {
  const { t } = useAppContext();
  
  return (
    <section className="bg-white pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center mb-12">
          <button className="text-gray-500 font-medium text-sm border border-gray-200 px-6 py-2 rounded-full hover:border-gray-300 hover:bg-gray-50 transition-all flex items-center gap-2">
            {t("load_more")} <ChevronDown className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">{t("new_arrivals")}</h2>
          <Link href="/products?sort=newest" className="text-sm font-medium text-gray-600 hover:text-brand-primary flex items-center gap-1 transition-colors">
            {t("view_all")} <span className="text-lg">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {/* Fill remaining slots with some featured products to match layout density */}
          {featuredProducts.slice(0, 4).map((product) => (
            <ProductCard key={`n-${product.id}`} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
