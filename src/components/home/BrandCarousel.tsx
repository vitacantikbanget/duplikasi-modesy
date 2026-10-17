"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";

const brands = [
  { name: "Adidas", image: "/images/brands/adidas.webp" },
  { name: "Armani", image: "/images/brands/armani.webp" },
  { name: "Burberry", image: "/images/brands/burberry.webp" },
  { name: "Diesel", image: "/images/brands/diesel.webp" },
  { name: "Dockers", image: "/images/brands/dockers.webp" },
  { name: "Gucci", image: "/images/brands/gucci.webp" },
  { name: "H & M", image: "/images/brands/hm.webp" },
  { name: "Hugo Boss", image: "/images/brands/hugoboss.webp" },
  { name: "Lacoste", image: "/images/brands/lacoste.webp" },
  { name: "Lee Cooper", image: "/images/brands/leecooper.webp" },
  { name: "Levi's", image: "/images/brands/levis.webp" },
  { name: "Mango", image: "/images/brands/mango.webp" },
  { name: "Nike", image: "/images/brands/nike.webp" },
  { name: "Puma", image: "/images/brands/puma.webp" },
  { name: "Tommy Hilfiger", image: "/images/brands/tommyhilfiger.webp" },
  { name: "U.S. Polo Assn", image: "/images/brands/uspolo.webp" },
];

export default function BrandCarousel() {
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
            {t("shop_by_brand") || "Shop By Brand"}
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative group/carousel">
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

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-none py-1 px-0.5"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {brands.map((brand, i) => (
              <Link
                key={i}
                href={`/products?brand=${encodeURIComponent(brand.name)}`}
                className="flex-none w-[calc(33.333%-11px)] sm:w-[calc(20%-13px)] md:w-[calc(14.285%-14px)] lg:w-[calc(12.5%-14px)] h-20 rounded-[4px] border border-[#e4e7ea] bg-white hover:border-[#00ab97] hover:shadow-xs transition-all duration-200 flex items-center justify-center p-3 group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="max-h-10 max-w-full object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-200"
                />
              </Link>
            ))}
          </div>

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
