"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "@/components/common/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";

export const specialOffers = [
  {
    id: "s1",
    slug: "animal-prints",
    title: "Animal colorful digital prints",
    vendorName: "Trendshop",
    rating: 5,
    reviews: 0,
    originalPrice: 642838.95,
    price: 478008.45,
    discount: 25,
    imageUrl: "/images/products/animal-prints.webp",
    secondaryImageUrl: "/images/products/animal-prints-2.webp",
  },
  {
    id: "s2",
    slug: "summer-top",
    title: "Summer fashion top lace",
    vendorName: "Trendshop",
    rating: 5,
    reviews: 1,
    originalPrice: 1302160.95,
    price: 1071398.25,
    discount: 17,
    imageUrl: "/images/products/summer-top.webp",
    secondaryImageUrl: "/images/products/summer-top-2.webp",
  },
  {
    id: "s3",
    slug: "lace-blouse",
    title: "Women lace blouse with different colors",
    vendorName: "Trendshop",
    rating: 0,
    reviews: 1,
    originalPrice: 1302160.95,
    price: 1137330.45,
    discount: 12,
    imageUrl: "/images/products/lace-blouse.webp",
    secondaryImageUrl: "/images/products/lace-blouse-2.webp",
  },
  {
    id: "s4",
    slug: "floral-sundress",
    title: "Floral women sundress",
    vendorName: "Admin",
    rating: 4,
    reviews: 0,
    originalPrice: 1466991.45,
    price: 1318644,
    discount: 10,
    imageUrl: "/images/products/floral-sundress.webp",
    secondaryImageUrl: "/images/products/floral-sundress-2.webp",
  },
  {
    id: "s5",
    slug: "gucci-backpack",
    title: "Gucci nylon fabric smart backpack",
    vendorName: "Admin",
    rating: 0,
    reviews: 0,
    originalPrice: 1137330.45,
    price: 906567.75,
    discount: 20,
    imageUrl: "/images/products/gucci-backpack.webp",
    secondaryImageUrl: "/images/products/gucci-backpack-2.webp",
  },
  {
    id: "s6",
    slug: "black-sneakers",
    title: "Black sneakers with white sole",
    vendorName: "Admin",
    rating: 0,
    reviews: 0,
    originalPrice: 1466991.45,
    price: 1137330.45,
    discount: 22,
    imageUrl: "/images/products/sneaker-shoes.webp",
    secondaryImageUrl: "/images/products/black-sneakers-2.webp",
  },
  {
    id: "s7",
    slug: "kipling-handbag",
    title: "Women kipling bailey saddle handbag",
    vendorName: "Admin",
    rating: 0,
    reviews: 0,
    originalPrice: 1137330.45,
    price: 972499.95,
    discount: 14,
    imageUrl: "/images/products/kipling-handbag.webp",
    secondaryImageUrl: "/images/products/kipling-handbag-2.webp",
  },
  {
    id: "s8",
    slug: "decorative-pillow",
    title: "Handcrafted decorative pillow for a luxurious touch",
    vendorName: "Admin",
    rating: 5,
    reviews: 0,
    originalPrice: 1137330.45,
    price: 972499.95,
    discount: 14,
    imageUrl: "/images/products/decorative-pillow.webp",
    secondaryImageUrl: "/images/products/decorative-pillow-2.webp",
  },
];

export default function SpecialOffers() {
  const { t } = useAppContext();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll, { passive: true });
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (el) el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = scrollRef.current.clientWidth * 0.75;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -offset : offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-white pb-14">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6 pb-2 border-b border-[#f1f3f5]">
          <h2 className="text-[20px] sm:text-[22px] font-bold text-[#2b333e] tracking-tight">
            {t("special_offers")}
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative group/carousel">
          {/* Prev Navigation Button */}
          {canScrollLeft && (
            <button
              type="button"
              onClick={() => handleScroll("left")}
              aria-label="Scroll left"
              className="absolute top-1/2 -left-4 -translate-y-1/2 z-20 hidden md:flex w-10 h-10 rounded-full bg-white shadow-[0_3px_12px_rgba(0,0,0,0.15)] border border-[#e4e7ea] items-center justify-center text-[#2b333e] hover:bg-[#00ab97] hover:text-white transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Products Scroll Track */}
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-5 overflow-x-auto scroll-smooth scrollbar-none py-1 px-0.5"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {specialOffers.map((product) => (
              <div
                key={product.id}
                className="flex-none w-[calc(50%-8px)] sm:w-[calc(33.333%-14px)] md:w-[calc(25%-15px)] lg:w-[calc(16.666%-17px)]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Next Navigation Button */}
          {canScrollRight && (
            <button
              type="button"
              onClick={() => handleScroll("right")}
              aria-label="Scroll right"
              className="absolute top-1/2 -right-4 -translate-y-1/2 z-20 hidden md:flex w-10 h-10 rounded-full bg-white shadow-[0_3px_12px_rgba(0,0,0,0.15)] border border-[#e4e7ea] items-center justify-center text-[#2b333e] hover:bg-[#00ab97] hover:text-white transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Promo Banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
          <Link
            href="/category/clothing"
            className="block rounded-[4px] overflow-hidden group shadow-2xs hover:shadow-md transition-all"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/banners/banner-summer.webp"
              alt="Summer Sale Promo"
              className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-300"
            />
          </Link>

          <Link
            href="/category/clothing"
            className="block rounded-[4px] overflow-hidden group shadow-2xs hover:shadow-md transition-all"
          >
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
