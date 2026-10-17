"use client";

import Link from "next/link";
import ProductCard from "@/components/common/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";

export const specialOffers = [
  { id: "1", slug: "animal-prints", title: "Animal colorful digital prints", vendorName: "Trendshop", rating: 5, reviews: 0, originalPrice: 642838.95, price: 478008.45, discount: 25, imageUrl: "/images/products/animal-prints.webp" },
  { id: "2", slug: "summer-top", title: "Summer fashion top lace", vendorName: "Trendshop", rating: 5, reviews: 1, originalPrice: 1302160.95, price: 1071398.25, discount: 17, imageUrl: "/images/products/summer-top.webp" },
  { id: "3", slug: "lace-blouse", title: "Women lace blouse with different colors", vendorName: "Trendshop", rating: 0, reviews: 1, originalPrice: 1302160.95, price: 1137330.45, discount: 12, imageUrl: "/images/products/lace-blouse.webp" },
  { id: "4", slug: "floral-sundress", title: "Floral women sundress", vendorName: "Admin", rating: 4, reviews: 0, originalPrice: 1466991.45, price: 1318644, discount: 10, imageUrl: "/images/products/floral-sundress.webp" },
  { id: "5", slug: "gucci-backpack", title: "Gucci nylon fabric smart backpack", vendorName: "Admin", rating: 0, reviews: 0, originalPrice: 1137330.45, price: 906567.75, discount: 20, imageUrl: "/images/products/gucci-backpack.webp" },
];

export default function SpecialOffers() {
  const { t } = useAppContext();
  
  return (
    <section className="bg-white pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">{t("special_offers")}</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 relative">
          <div className="absolute top-1/2 -left-5 -translate-y-1/2 z-10 hidden lg:flex w-10 h-10 bg-white shadow-md rounded-full items-center justify-center text-gray-600 hover:text-brand-primary cursor-pointer border border-gray-100">
            <ChevronLeft className="w-5 h-5" />
          </div>
          
          {specialOffers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

          <div className="absolute top-1/2 -right-5 -translate-y-1/2 z-10 hidden lg:flex w-10 h-10 bg-white shadow-md rounded-full items-center justify-center text-gray-600 hover:text-brand-primary cursor-pointer border border-gray-100">
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>
        
        {/* Promo Banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
          <Link href="/category/clothing" className="block rounded-[4px] overflow-hidden group shadow-2xs hover:shadow-md transition-all">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/banners/banner-summer.webp"
              alt="Summer Sale Promo"
              className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-300"
            />
          </Link>

          <Link href="/category/clothing" className="block rounded-[4px] overflow-hidden group shadow-2xs hover:shadow-md transition-all">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/banners/banner-autumn.webp"
              alt="Autumn Sale Promo"
              className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-300"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
