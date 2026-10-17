"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import ProductCard from "@/components/common/ProductCard";
import { useAppContext } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";

export interface CategoryProductItem {
  id: string;
  slug: string;
  title: string;
  vendorName: string;
  rating: number;
  reviews: number;
  originalPrice?: number | null;
  price: number | string;
  discount?: number | null;
  imageUrl: string;
  secondaryImageUrl?: string;
}

export const clothingShowcaseProducts: CategoryProductItem[] = [
  { id: "c1", slug: "navy-polka-dress", title: "Navy polka dot dress", vendorName: "Trendshop", rating: 5, reviews: 1, originalPrice: 2472457.50, price: 2142796.50, discount: 13, imageUrl: "/images/products/navy-polka-dress.webp" },
  { id: "c2", slug: "black-midi-skirt", title: "Black midi skirt with white flowers", vendorName: "Trendshop", rating: 4, reviews: 0, originalPrice: 906567.75, price: 791186.40, discount: 13, imageUrl: "/images/products/black-midi-skirt.webp" },
  { id: "c3", slug: "floral-sundress", title: "Floral women sundress", vendorName: "Admin", rating: 4, reviews: 0, originalPrice: 1466991.45, price: 1318644, discount: 10, imageUrl: "/images/products/floral-sundress.webp", secondaryImageUrl: "/images/products/floral-sundress-2.webp" },
  { id: "c4", slug: "lace-blouse", title: "Women lace blouse with different colors", vendorName: "Trendshop", rating: 5, reviews: 1, originalPrice: 1302160.95, price: 1137330.45, discount: 12, imageUrl: "/images/products/lace-blouse.webp", secondaryImageUrl: "/images/products/lace-blouse-2.webp" },
  { id: "c5", slug: "light-blue-shirt", title: "Light blue women shirt", vendorName: "Trendshop", rating: 5, reviews: 0, originalPrice: 1137330.45, price: 807669.45, discount: 29, imageUrl: "/images/products/light-blue-shirt.webp" },
  { id: "c6", slug: "summer-top", title: "Summer fashion top lace", vendorName: "Trendshop", rating: 5, reviews: 1, originalPrice: 1302160.95, price: 1071398.25, discount: 17, imageUrl: "/images/products/summer-top.webp", secondaryImageUrl: "/images/products/summer-top-2.webp" },
  { id: "c7", slug: "cobalt-tshirt", title: "Cobalt man t-shirt all colors", vendorName: "Admin", rating: 0, reviews: 1, price: "Request a Quote", discount: null, imageUrl: "/images/products/cobalt-tshirt.webp" },
  { id: "c8", slug: "ankle-boot", title: "Women's ankle boot with different colors", vendorName: "Admin", rating: 0, reviews: 0, originalPrice: 1137330.45, price: 972499.95, discount: 14, imageUrl: "/images/products/ankle-boot.webp" },
];

export const jewelryShowcaseProducts: CategoryProductItem[] = [
  { id: "j1", slug: "scarves", title: "Colorful women scarves", vendorName: "Trendshop", rating: 0, reviews: 0, originalPrice: 741737.25, price: 659322, discount: 11, imageUrl: "/images/products/scarves.webp" },
  { id: "j2", slug: "black-backpack", title: "Black fashion women backpack", vendorName: "Trendshop", rating: 0, reviews: 0, price: "Request a Quote", discount: null, imageUrl: "/images/products/black-backpack.webp" },
  { id: "j3", slug: "kipling-handbag", title: "Women kipling bailey saddle handbag", vendorName: "Admin", rating: 0, reviews: 0, originalPrice: 1137330.45, price: 972499.95, discount: 14, imageUrl: "/images/products/kipling-handbag.webp", secondaryImageUrl: "/images/products/kipling-handbag-2.webp" },
  { id: "j4", slug: "sun-hat", title: "Sun hat for women protection cap", vendorName: "Trendshop", rating: 0, reviews: 0, price: "Request a Quote", discount: null, imageUrl: "/images/products/sun-hat.webp" },
  { id: "j5", slug: "gucci-backpack", title: "Gucci nylon fabric smart backpack", vendorName: "Admin", rating: 0, reviews: 0, originalPrice: 1137330.45, price: 906567.75, discount: 20, imageUrl: "/images/products/gucci-backpack.webp", secondaryImageUrl: "/images/products/gucci-backpack-2.webp" },
  { id: "j6", slug: "sneaker-shoes", title: "Sneaker shoes men", vendorName: "Trendshop", rating: 0, reviews: 0, originalPrice: 1648305, price: 1466991.45, discount: 11, imageUrl: "/images/products/sneaker-shoes.webp", secondaryImageUrl: "/images/products/black-sneakers-2.webp" },
  { id: "j7", slug: "animal-prints", title: "Animal colorful digital prints", vendorName: "Trendshop", rating: 5, reviews: 0, originalPrice: 642838.95, price: 478008.45, discount: 25, imageUrl: "/images/products/animal-prints.webp", secondaryImageUrl: "/images/products/animal-prints-2.webp" },
  { id: "j8", slug: "decorative-pillow", title: "Handcrafted decorative pillow for a luxurious home", vendorName: "Admin", rating: 5, reviews: 0, originalPrice: 1137330.45, price: 972499.95, discount: 14, imageUrl: "/images/products/decorative-pillow.webp", secondaryImageUrl: "/images/products/decorative-pillow-2.webp" },
];

interface CategoryProductsSectionProps {
  title: string;
  href: string;
  products: CategoryProductItem[];
  containerClassName?: string;
}

export default function CategoryProductsSection({
  title,
  href,
  products,
  containerClassName,
}: CategoryProductsSectionProps) {
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
  }, [products]);

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
    <section className={cn("bg-white pb-14", containerClassName)}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#f1f3f5]">
          <h2 className="text-[20px] sm:text-[22px] font-bold text-[#2b333e] tracking-tight">
            <Link href={href} className="hover:text-[#00ab97] transition-colors">
              {title}
            </Link>
          </h2>

          <Link
            href={href}
            className="text-[13px] sm:text-[14px] font-semibold text-[#2b333e] hover:text-[#00ab97] flex items-center gap-1.5 transition-colors group"
          >
            <span>{t("view_all") || "View All"}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#00ab97]" />
          </Link>
        </div>

        {/* Carousel Container */}
        <div className="relative group/carousel">
          {/* Left Arrow Button */}
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

          {/* Products Track */}
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-5 overflow-x-auto scroll-smooth scrollbar-none py-1 px-0.5"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-none w-[calc(50%-8px)] sm:w-[calc(33.333%-14px)] md:w-[calc(25%-15px)] lg:w-[calc(16.666%-17px)]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Right Arrow Button */}
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
      </div>
    </section>
  );
}
