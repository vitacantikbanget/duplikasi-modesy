/**
 * ============================================================================
 * CategoryProductsSection: Showcase Produk Berbasis Kategori (Category Showcase)
 * ============================================================================
 * Menampilkan etalase produk dari kategori pilihan tertentu (misal: Clothing, Jewelry):
 * - Slider Horizontal Responsif: Mendukung tombol navigasi geser panah kiri/kanan.
 * - Header Section Khas: Menampilkan nama kategori dan tautan "View All" ke katalog kategori terkait.
 * - Integrasi Kartu Terstandar: Setiap produk ditampilkan menggunakan `ProductCard`.
 */

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
  hoverImageUrl?: string;
  secondaryImageUrl?: string;
}

export const clothingShowcaseProducts: CategoryProductItem[] = [
  {
    id: "c1",
    slug: "navy-polka-dot-dress-45",
    title: "Navy polka dot dress",
    vendorName: "Trendshop",
    rating: 0,
    reviews: 1,
    originalPrice: 150,
    price: 130,
    discount: 13,
    imageUrl: "/images/products/navy-polka-dress.webp",
    hoverImageUrl: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=500&q=80",
  },
  {
    id: "c2",
    slug: "black-midi-skirt-41",
    title: "Black midi skirt with white flowers",
    vendorName: "Trendshop",
    rating: 4,
    reviews: 0,
    originalPrice: 55,
    price: 48,
    discount: 13,
    imageUrl: "/images/products/black-midi-skirt.webp",
    hoverImageUrl: "https://images.unsplash.com/photo-1583496661160-c588c4af16b2?w=500&q=80",
  },
  {
    id: "c3",
    slug: "floral-women-sundress-38",
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
    id: "c4",
    slug: "women-lace-blouse-28",
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
    id: "c5",
    slug: "light-blue-women-shirt-15",
    title: "Light blue women shirt",
    vendorName: "Trendshop",
    rating: 5,
    reviews: 0,
    originalPrice: 69,
    price: 49,
    discount: 29,
    imageUrl: "/images/products/light-blue-shirt.webp",
    hoverImageUrl: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500&q=80",
  },
  {
    id: "c6",
    slug: "summer-fashion-top-lace-13",
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
    id: "c7",
    slug: "cobalt-man-t-shirt-1",
    title: "Cobalt man t-shirt all colors",
    vendorName: "Admin",
    rating: 0,
    reviews: 1,
    price: "Request a Quote",
    discount: null,
    imageUrl: "/images/products/cobalt-tshirt.webp",
    hoverImageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&q=80",
  },
  {
    id: "c8",
    slug: "womens-ankle-boot-46",
    title: "Women's ankle boot with different colors",
    vendorName: "Admin",
    rating: 0,
    reviews: 0,
    originalPrice: 89,
    price: 79,
    discount: 14,
    imageUrl: "/images/products/ankle-boot.webp",
    hoverImageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80",
  },
];

export const jewelryShowcaseProducts: CategoryProductItem[] = [
  {
    id: "j1",
    slug: "colorful-women-scarves-47",
    title: "Colorful women scarves",
    vendorName: "Trendshop",
    rating: 0,
    reviews: 0,
    originalPrice: 45,
    price: 40,
    discount: 11,
    imageUrl: "/images/products/scarves.webp",
    hoverImageUrl: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500&q=80",
  },
  {
    id: "j2",
    slug: "black-fashion-women-backpack-43",
    title: "Black fashion women backpack",
    vendorName: "Trendshop",
    rating: 0,
    reviews: 0,
    price: "Request a Quote",
    discount: null,
    imageUrl: "/images/products/black-backpack.webp",
    hoverImageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
  },
  {
    id: "j3",
    slug: "women-kipling-bailey-saddle-handbag-40",
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
    id: "j4",
    slug: "sun-hat-for-women-protection-cap-17",
    title: "Sun hat for women protection cap",
    vendorName: "Trendshop",
    rating: 0,
    reviews: 0,
    price: 29,
    discount: null,
    imageUrl: "/images/products/sun-hat.webp",
    hoverImageUrl: "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?w=500&q=80",
  },
  {
    id: "j5",
    slug: "gucci-nylon-fabric-smart-backpack-7",
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
    id: "j6",
    slug: "sneaker-shoes-men-34",
    title: "Sneaker shoes men",
    vendorName: "Trendshop",
    rating: 0,
    reviews: 0,
    originalPrice: 100,
    price: 89,
    discount: 11,
    imageUrl: "/images/products/sneaker-shoes.webp",
    hoverImageUrl: "/images/products/black-sneakers-2.webp",
  },
  {
    id: "j7",
    slug: "animal-colorful-digital-prints-39",
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
    id: "j8",
    slug: "handcrafted-decorative-pillow-42",
    title: "Handcrafted decorative pillow for a luxurious touch",
    vendorName: "Admin",
    rating: 0,
    reviews: 0,
    originalPrice: 69,
    price: 59,
    discount: 14,
    imageUrl: "/images/products/decorative-pillow.webp",
    hoverImageUrl: "/images/products/decorative-pillow-2.webp",
  },
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
    <section className={cn("section section-category-products bg-white pb-14", containerClassName)}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="section-header flex items-center justify-between mb-6 pb-2 border-b border-gray-100">
          <h3 className="title text-xl sm:text-2xl font-bold text-[#222222]">
            <Link href={href} className="hover:text-brand-primary transition-colors">
              {title}
            </Link>
          </h3>

          <Link
            href={href}
            className="font-semibold text-sm text-[#222222] hover:text-brand-primary flex items-center gap-1.5 transition-colors group"
          >
            <span>{t("view_all", "View All")}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
              className="absolute top-1/2 -left-4 -translate-y-1/2 z-20 hidden md:flex w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 items-center justify-center text-gray-700 hover:bg-brand-primary hover:text-white transition-all duration-200 active:scale-95 cursor-pointer"
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
              className="absolute top-1/2 -right-4 -translate-y-1/2 z-20 hidden md:flex w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 items-center justify-center text-gray-700 hover:bg-brand-primary hover:text-white transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
