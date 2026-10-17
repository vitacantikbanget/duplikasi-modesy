"use client";

import Link from "next/link";
import { useAppContext } from "@/contexts/AppContext";

const shopByCategory = [
  { name: "Clothing", key: "clothing", image: "/images/categories/clothing.webp" },
  { name: "Home & Living", key: "home_living", image: "/images/categories/home-living.webp" },
  { name: "Toys & Entertainment", key: "toys", image: "/images/categories/toys.webp" },
  { name: "Women's Clothing", key: "womens_clothing", image: "/images/categories/womens-clothing.webp" },
  { name: "Men's Clothing", key: "mens_clothing", image: "/images/categories/mens-clothing.webp" },
  { name: "Furniture", key: "furniture", image: "/images/categories/furniture.webp" },
  { name: "Necklaces & Accessories", key: "necklaces", image: "/images/categories/necklaces.webp" },
  { name: "Graphics", key: "graphics", image: "/images/categories/graphics.webp" },
  { name: "Painting", key: "painting", image: "/images/categories/painting.webp" },
  { name: "Boots", key: "boots", image: "/images/categories/boots.webp" },
  { name: "Decorative Pillows", key: "decorative_pillows", image: "/images/categories/decorative-pillows.webp" },
  { name: "Handbags", key: "handbags", image: "/images/categories/handbags.webp" },
];

export default function ShopByCategory() {
  const { t } = useAppContext();
  
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">{t("shop_by_category")}</h2>
        <Link href="/categories" className="text-sm font-medium text-gray-600 hover:text-brand-primary flex items-center gap-1 transition-colors">
          {t("view_all")} <span className="text-lg">→</span>
        </Link>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-x-4 gap-y-10">
        {shopByCategory.map((cat, i) => (
          <Link key={i} href={`/category/${cat.name.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}`} className="flex flex-col items-center gap-4 group">
            <div className="w-32 h-32 rounded-full overflow-hidden border border-gray-100 shadow-sm group-hover:shadow-md transition-all">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <span className="text-sm text-gray-800 font-medium text-center group-hover:text-brand-primary transition-colors px-2">{t(`categories.${cat.key}`)}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
