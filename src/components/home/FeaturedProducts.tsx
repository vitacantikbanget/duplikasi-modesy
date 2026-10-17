"use client";

import { ChevronDown } from "lucide-react";
import ProductCard from "@/components/common/ProductCard";
import { useAppContext } from "@/contexts/AppContext";

export const featuredProducts = [
  { id: "f1", slug: "black-midi-skirt", title: "Black midi skirt with white flowers", vendorName: "Trendshop", rating: 0, reviews: 0, originalPrice: 906567.75, price: 791186.40, discount: 13, imageUrl: "/images/products/black-midi-skirt.webp" },
  { id: "f2", slug: "decorative-pillow", title: "Handcrafted decorative pillow for a luxurious touch", vendorName: "Admin", rating: 0, reviews: 0, originalPrice: 1137330.45, price: 972499.95, discount: 14, imageUrl: "/images/products/decorative-pillow.webp", secondaryImageUrl: "/images/products/decorative-pillow-2.webp" },
  { id: "f3", slug: "floral-sundress", title: "Floral women sundress", vendorName: "Admin", rating: 0, reviews: 0, originalPrice: 1466991.45, price: 1318644, discount: 10, imageUrl: "/images/products/floral-sundress.webp", secondaryImageUrl: "/images/products/floral-sundress-2.webp" },
  { id: "f4", slug: "sun-hat", title: "Sun hat for women protection cap", vendorName: "Trendshop", rating: 0, reviews: 0, price: "Request a Quote", discount: null, imageUrl: "/images/products/sun-hat.webp" },
  { id: "f5", slug: "sneaker-shoes", title: "Sneaker shoes men", vendorName: "Trendshop", rating: 0, reviews: 0, originalPrice: 1648305, price: 1466991.45, discount: 11, imageUrl: "/images/products/sneaker-shoes.webp", secondaryImageUrl: "/images/products/black-sneakers-2.webp" },
  { id: "f6", slug: "kipling-handbag", title: "Women kipling bailey saddle handbag", vendorName: "Admin", rating: 0, reviews: 0, originalPrice: 1137330.45, price: 972499.95, discount: 14, imageUrl: "/images/products/kipling-handbag.webp", secondaryImageUrl: "/images/products/kipling-handbag-2.webp" },
  { id: "f7", slug: "cobalt-tshirt", title: "Cobalt man t-shirt all colors", vendorName: "Admin", rating: 0, reviews: 0, price: "Request a Quote", discount: null, imageUrl: "/images/products/cobalt-tshirt.webp" },
  { id: "f8", slug: "animal-photo", title: "Adorable animals photo pack", vendorName: "Admin", rating: 0, reviews: 1, price: "Free", discount: null, imageUrl: "/images/products/animal-photo.webp" },
  { id: "f9", slug: "piano-music", title: "Moment of inspiration piano music", vendorName: "Admin", rating: 0, reviews: 1, originalPrice: 560423.70, price: 247245.75, discount: null, imageUrl: "/images/products/piano-music.webp" },
  { id: "f10", slug: "vacation-spots", title: "Animation of popular vacation spots", vendorName: "Trendshop", rating: 5, reviews: 1, originalPrice: 247245.75, price: 164830.50, discount: null, imageUrl: "/images/products/vacation-spots.webp" },
  { id: "f11", slug: "light-blue-shirt", title: "Light blue women shirt", vendorName: "Trendshop", rating: 5, reviews: 0, originalPrice: 1137330.45, price: 807669.45, discount: 29, imageUrl: "/images/products/light-blue-shirt.webp" },
  { id: "f12", slug: "summer-top", title: "Summer fashion top lace", vendorName: "Trendshop", rating: 5, reviews: 1, originalPrice: 1302160.95, price: 1071398.25, discount: 17, imageUrl: "/images/products/summer-top.webp", secondaryImageUrl: "/images/products/summer-top-2.webp" },
];

export default function FeaturedProducts() {
  const { t } = useAppContext();

  return (
    <section className="bg-white pb-14">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6 pb-2 border-b border-[#f1f3f5]">
          <h2 className="text-[20px] sm:text-[22px] font-bold text-[#2b333e] tracking-tight">
            {t("featured_products")}
          </h2>
        </div>

        {/* 6-Column Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex items-center justify-center mt-10">
          <button className="text-[#6c757d] hover:text-[#00ab97] font-semibold text-[13.5px] border border-[#e4e7ea] hover:border-[#00ab97] bg-white px-7 py-2.5 rounded-full transition-all flex items-center gap-2 shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer">
            {t("load_more") || "Load More"} <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
