"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "@/components/common/ProductCard";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";

export const specialOffers = [
  {
    id: "s1",
    slug: "animal-prints-39",
    title: "Animal colorful digital prints",
    vendorName: "Trendshop",
    rating: 5,
    reviews: 0,
    originalPrice: 39,
    price: 29,
    discount: 25,
    imageUrl: "/images/products/animal-prints.webp",
    hoverImageUrl: "/images/products/animal-prints-2.webp",
  },
  {
    id: "s2",
    slug: "summer-top-13",
    title: "Summer fashion top lace",
    vendorName: "Trendshop",
    rating: 5,
    reviews: 1,
    originalPrice: 79,
    price: 65,
    discount: 17,
    imageUrl: "/images/products/summer-top.webp",
    hoverImageUrl: "/images/products/summer-top-2.webp",
  },
  {
    id: "s3",
    slug: "lace-blouse-28",
    title: "Women lace blouse with different colors",
    vendorName: "Trendshop",
    rating: 0,
    reviews: 1,
    originalPrice: 79,
    price: 69,
    discount: 12,
    imageUrl: "/images/products/lace-blouse.webp",
    hoverImageUrl: "/images/products/lace-blouse-2.webp",
  },
  {
    id: "s4",
    slug: "floral-sundress-38",
    title: "Floral women sundress",
    vendorName: "Admin",
    rating: 4,
    reviews: 0,
    originalPrice: 89,
    price: 80,
    discount: 10,
    imageUrl: "/images/products/floral-sundress.webp",
    hoverImageUrl: "/images/products/floral-sundress-2.webp",
  },
  {
    id: "s5",
    slug: "gucci-smart-backpack-7",
    title: "Gucci nylon fabric smart backpack",
    vendorName: "Admin",
    rating: 0,
    reviews: 0,
    originalPrice: 69,
    price: 55,
    discount: 20,
    imageUrl: "/images/products/gucci-backpack.webp",
    hoverImageUrl: "/images/products/gucci-backpack-2.webp",
  },
  {
    id: "s6",
    slug: "sneaker-shoes-34",
    title: "Black sneakers with white sole",
    vendorName: "Admin",
    rating: 0,
    reviews: 0,
    originalPrice: 89,
    price: 69,
    discount: 22,
    imageUrl: "/images/products/sneaker-shoes.webp",
    hoverImageUrl: "/images/products/black-sneakers-2.webp",
  },
  {
    id: "s7",
    slug: "kipling-handbag-40",
    title: "Women kipling bailey saddle handbag",
    vendorName: "Admin",
    rating: 0,
    reviews: 0,
    originalPrice: 69,
    price: 59,
    discount: 14,
    imageUrl: "/images/products/kipling-handbag.webp",
    hoverImageUrl: "/images/products/kipling-handbag-2.webp",
  },
  {
    id: "s8",
    slug: "decorative-pillow-42",
    title: "Handcrafted decorative pillow for a luxurious touch",
    vendorName: "Admin",
    rating: 5,
    reviews: 0,
    originalPrice: 69,
    price: 59,
    discount: 14,
    imageUrl: "/images/products/decorative-pillow.webp",
    hoverImageUrl: "/images/products/decorative-pillow-2.webp",
  },
];

export default function SpecialOffers() {
  const { t } = useAppContext();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Live Deal Countdown Timer (Ticking every second)
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 35,
    seconds: 48,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return { days: 2, hours: 14, minutes: 35, seconds: 48 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
    <section className="section section-special-offers bg-white pb-14">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with Deal Countdown Timer */}
        <div className="section-header mb-6 pb-2 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h3 className="title text-xl sm:text-2xl font-bold text-[#222222]">
              {t("special_offers", "Special Offers")}
            </h3>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-[2px] bg-red-100 text-red-600 text-[11px] font-bold uppercase tracking-wider">
              Hot Deals
            </span>
          </div>

          {/* Deal Countdown Clock matching Modesy */}
          <div className="flex items-center gap-1.5 text-xs text-gray-700 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-[4px] shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-[#e74c3c]" />
            <span className="font-medium text-gray-500 mr-1">Ends in:</span>
            <div className="flex items-center gap-1 font-mono font-bold text-[#222222]">
              <span className="bg-white border border-gray-200 px-1.5 py-0.5 rounded-[2px]">
                {String(timeLeft.days).padStart(2, "0")}d
              </span>
              <span>:</span>
              <span className="bg-white border border-gray-200 px-1.5 py-0.5 rounded-[2px]">
                {String(timeLeft.hours).padStart(2, "0")}h
              </span>
              <span>:</span>
              <span className="bg-white border border-gray-200 px-1.5 py-0.5 rounded-[2px]">
                {String(timeLeft.minutes).padStart(2, "0")}m
              </span>
              <span>:</span>
              <span className="bg-white border border-gray-200 px-1.5 py-0.5 rounded-[2px] text-[#e74c3c]">
                {String(timeLeft.seconds).padStart(2, "0")}s
              </span>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative group/carousel">
          {/* Prev Navigation Button */}
          {canScrollLeft && (
            <button
              type="button"
              onClick={() => handleScroll("left")}
              aria-label="Scroll left"
              className="absolute top-1/2 -left-4 -translate-y-1/2 z-20 hidden md:flex w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 items-center justify-center text-gray-700 hover:bg-brand-primary hover:text-white transition-all duration-200 active:scale-95 cursor-pointer"
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
              className="absolute top-1/2 -right-4 -translate-y-1/2 z-20 hidden md:flex w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 items-center justify-center text-gray-700 hover:bg-brand-primary hover:text-white transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Promo Banners Row (index_bn_1 and index_bn_2) */}
        <div className="section section-index-bn grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
          <Link
            href="/clothing"
            className="col-index-bn index_bn_1 block rounded-[4px] overflow-hidden group shadow-2xs hover:shadow-md transition-all"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/banners/banner-summer.webp"
              alt="Summer Sale Promo"
              className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-300"
            />
          </Link>

          <Link
            href="/jewelry-accessories"
            className="col-index-bn index_bn_2 block rounded-[4px] overflow-hidden group shadow-2xs hover:shadow-md transition-all"
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
