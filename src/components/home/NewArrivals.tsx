"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/common/ProductCard";
import { useAppContext } from "@/contexts/AppContext";

export const newArrivals = [
  { id: "n1", slug: "scarves", title: "Colorful women scarves", vendorName: "Trendshop", rating: 0, reviews: 0, originalPrice: 741737.25, price: 659322, discount: 11, imageUrl: "/images/products/scarves.webp" },
  { id: "n2", slug: "ankle-boot", title: "Women's ankle boot with different colors", vendorName: "Admin", rating: 0, reviews: 0, originalPrice: 1137330.45, price: 972499.95, discount: 14, imageUrl: "/images/products/ankle-boot.webp" },
  { id: "n3", slug: "navy-polka-dress", title: "Navy polka dot dress", vendorName: "Trendshop", rating: 0, reviews: 0, originalPrice: 2472457.50, price: 2142796.50, discount: 13, imageUrl: "/images/products/navy-polka-dress.webp" },
  { id: "n4", slug: "modern-couch", title: "Modern grey couch and pillows", vendorName: "Admin", rating: 0, reviews: 0, price: "Request a Quote", discount: null, imageUrl: "/images/products/modern-couch.webp" },
  { id: "n5", slug: "black-backpack", title: "Black fashion women backpack", vendorName: "Trendshop", rating: 0, reviews: 0, price: "Request a Quote", discount: null, imageUrl: "/images/products/black-backpack.webp" },
  { id: "n6", slug: "decorative-pillow-2", title: "Handcrafted decorative pillow for a luxurious touch", vendorName: "Admin", rating: 0, reviews: 0, originalPrice: 1137330.45, price: 972499.95, discount: 14, imageUrl: "/images/products/decorative-pillow.webp", secondaryImageUrl: "/images/products/decorative-pillow-2.webp" },
  { id: "n7", slug: "animal-prints-na", title: "Animal colorful digital prints", vendorName: "Trendshop", rating: 5, reviews: 0, originalPrice: 642838.95, price: 478008.45, discount: 25, imageUrl: "/images/products/animal-prints.webp", secondaryImageUrl: "/images/products/animal-prints-2.webp" },
  { id: "n8", slug: "summer-top-na", title: "Summer fashion top lace", vendorName: "Trendshop", rating: 5, reviews: 1, originalPrice: 1302160.95, price: 1071398.25, discount: 17, imageUrl: "/images/products/summer-top.webp", secondaryImageUrl: "/images/products/summer-top-2.webp" },
  { id: "n9", slug: "lace-blouse-na", title: "Women lace blouse with different colors", vendorName: "Trendshop", rating: 0, reviews: 1, originalPrice: 1302160.95, price: 1137330.45, discount: 12, imageUrl: "/images/products/lace-blouse.webp", secondaryImageUrl: "/images/products/lace-blouse-2.webp" },
  { id: "n10", slug: "floral-sundress-na", title: "Floral women sundress", vendorName: "Admin", rating: 4, reviews: 0, originalPrice: 1466991.45, price: 1318644, discount: 10, imageUrl: "/images/products/floral-sundress.webp", secondaryImageUrl: "/images/products/floral-sundress-2.webp" },
  { id: "n11", slug: "gucci-backpack-na", title: "Gucci nylon fabric smart backpack", vendorName: "Admin", rating: 0, reviews: 0, originalPrice: 1137330.45, price: 906567.75, discount: 20, imageUrl: "/images/products/gucci-backpack.webp", secondaryImageUrl: "/images/products/gucci-backpack-2.webp" },
  { id: "n12", slug: "black-sneakers-na", title: "Black sneakers with white sole", vendorName: "Admin", rating: 0, reviews: 0, originalPrice: 1466991.45, price: 1137330.45, discount: 22, imageUrl: "/images/products/sneaker-shoes.webp", secondaryImageUrl: "/images/products/black-sneakers-2.webp" },
];

export default function NewArrivals() {
  const { t } = useAppContext();

  return (
    <section className="bg-white pb-14">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#f1f3f5]">
          <h2 className="text-[20px] sm:text-[22px] font-bold text-[#2b333e] tracking-tight">
            {t("new_arrivals")}
          </h2>

          <Link
            href="/products?sort=newest"
            className="text-[13px] sm:text-[14px] font-semibold text-[#2b333e] hover:text-[#00ab97] flex items-center gap-1.5 transition-colors group"
          >
            <span>{t("view_all") || "View All"}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#00ab97]" />
          </Link>
        </div>

        {/* 12-Product 6-Column Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
