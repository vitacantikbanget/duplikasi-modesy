/**
 * ============================================================================
 * ShopByCategory: Grid Kategori Lingkaran Modesy (Round Category Showcase)
 * ============================================================================
 * Menampilkan kategori-kategori utama dalam format visual lingkaran khas Modesy:
 * 1. Tata Letak Responsif:
 *    - Desktop: Grid 6 kolom yang rapi dengan jarak antar item proporsional.
 *    - Mobile: Baris horizontal yang dapat digeser (horizontal swipe) dengan snap scrolling.
 * 2. Efek Visual Interaktif:
 *    - Zoom in halus gambar kategori saat di-hover (`scale-110 duration-500`).
 *    - Overlay warna teal transparan yang memunculkan label "Shop Now".
 */

"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";

const shopByCategory = [
  { name: "Clothing", key: "clothing", href: "/clothing", image: "/images/categories/clothing.webp" },
  { name: "Home & Living", key: "home_living", href: "/home-living", image: "/images/categories/home-living.webp" },
  { name: "Toys & Entertainment", key: "toys", href: "/toys-entertainment", image: "/images/categories/toys.webp" },
  { name: "Women's Clothing", key: "womens_clothing", href: "/clothing", image: "/images/categories/womens-clothing.webp" },
  { name: "Men's Clothing", key: "mens_clothing", href: "/clothing", image: "/images/categories/mens-clothing.webp" },
  { name: "Furniture", key: "furniture", href: "/home-living", image: "/images/categories/furniture.webp" },
  { name: "Necklaces & Accessories", key: "necklaces", href: "/jewelry-accessories", image: "/images/categories/necklaces.webp" },
  { name: "Graphics", key: "graphics", href: "/graphics-photos", image: "/images/categories/graphics.webp" },
  { name: "Painting", key: "painting", href: "/home-living", image: "/images/categories/painting.webp" },
  { name: "Boots", key: "boots", href: "/shoes", image: "/images/categories/boots.webp" },
  { name: "Decorative Pillows", key: "decorative_pillows", href: "/home-living", image: "/images/categories/decorative-pillows.webp" },
  { name: "Handbags", key: "handbags", href: "/jewelry-accessories", image: "/images/categories/handbags.webp" },
];

export default function ShopByCategory() {
  const { t } = useAppContext();

  return (
    <section className="section section-categories py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Bagian Kategori */}
        <div className="section-header flex items-center justify-between mb-8 pb-2 border-b border-gray-100">
          <h3 className="title text-xl sm:text-2xl font-bold text-[#222222]">
            {t("shop_by_category", "Shop By Category")}
          </h3>
          <Link
            href="/products"
            className="font-semibold text-sm text-[#222222] hover:text-brand-primary flex items-center gap-1.5 transition-colors"
          >
            {t("view_all", "View All")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Daftar Kategori Lingkaran */}
        <div className="featured-categories">
          <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-none sm:grid sm:grid-cols-4 md:grid-cols-6 sm:gap-x-4 sm:gap-y-8 snap-x">
            {shopByCategory.map((cat, i) => (
              <div key={i} className="item-category-round group shrink-0 w-24 sm:w-auto snap-center">
                {/* Wadah Gambar Lingkaran */}
                <div className="category-image relative w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 mx-auto rounded-full overflow-hidden border border-gray-200/80 shadow-2xs">
                  <Link href={cat.href} className="block w-full h-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </Link>

                  {/* Efek Overlay Teal "Shop Now" saat kursor melayang */}
                  <Link
                    href={cat.href}
                    className="overlay"
                    title={cat.name}
                  >
                    <span className="text-shop-now">
                      Shop Now
                      <ArrowRight className="w-3.5 h-3.5 inline ml-0.5" />
                    </span>
                  </Link>
                </div>

                {/* Nama Kategori */}
                <h4 className="category-name text-center">
                  <Link href={cat.href} className="line-clamp-1">
                    {t(cat.key, cat.name)}
                  </Link>
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
