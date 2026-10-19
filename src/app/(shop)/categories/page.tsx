"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";

const allCategories = [
  { name: "Clothing", slug: "clothing", count: 48, image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&q=80", sub: ["Women's Clothing", "Men's Clothing", "Accessories", "Bags"] },
  { name: "Shoes", slug: "shoes", count: 32, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&q=80", sub: ["Sneakers", "Boots", "Heels", "Loafers"] },
  { name: "Home & Living", slug: "home-living", count: 29, image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400&q=80", sub: ["Furniture", "Decorative Pillows", "Lighting", "Kitchenware"] },
  { name: "Jewelry & Accessories", slug: "jewelry", count: 21, image: "https://images.unsplash.com/photo-1599643478524-fb66f8319fdb?w=400&q=80", sub: ["Necklaces", "Rings", "Earrings", "Watches"] },
  { name: "Toys & Entertainment", slug: "toys", count: 16, image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=400&q=80", sub: ["Board Games", "Action Figures", "Puzzles"] },
  { name: "Graphics & Photos", slug: "graphics-photos", count: 45, image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&q=80", sub: ["Stock Photos", "Vector Art", "Wall Art", "Illustrations"] },
  { name: "Video & Audio", slug: "video-audio", count: 19, image: "https://images.unsplash.com/photo-1552422535-c45813c61732?w=400&q=80", sub: ["Music Tracks", "Sound Effects", "Motion Graphics"] },
  { name: "Web Templates & Code", slug: "web-templates", count: 12, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80", sub: ["HTML Templates", "WordPress", "Mobile App Scripts"] },
];

export default function CategoriesOverviewPage() {
  const { t } = useAppContext();

  return (
    <div className="bg-[#fcfcfc] min-h-screen pb-20">
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center text-xs text-gray-500">
          <Link href="/" className="hover:text-brand-primary transition-colors">{t("home")}</Link>
          <ChevronRight className="w-3.5 h-3.5 mx-2 text-gray-400" />
          <span className="text-gray-800 font-medium">Semua Kategori</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Semua Kategori Belanja</h1>
        <p className="text-xs text-gray-500 mb-8">Temukan ribuan barang berdasarkan kategori favorit Anda di Modesy.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {allCategories.map((cat) => (
            <div key={cat.slug} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-md transition-shadow group flex flex-col">
              <Link href={`/category/${cat.slug}`} className="relative h-44 overflow-hidden block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <div>
                    <h2 className="text-white font-bold text-lg">{cat.name}</h2>
                    <span className="text-xs text-gray-200">{cat.count} Produk</span>
                  </div>
                </div>
              </Link>
              
              <div className="p-4 flex-1 flex flex-col justify-between">
                <ul className="space-y-1.5 mb-4">
                  {cat.sub.map((subName, i) => (
                    <li key={i}>
                      <Link 
                        href={`/category/${cat.slug}`} 
                        className="text-xs text-gray-500 hover:text-brand-primary hover:underline transition-colors block"
                      >
                        • {subName}
                      </Link>
                    </li>
                  ))}
                </ul>

                <Link 
                  href={`/category/${cat.slug}`} 
                  className="text-xs font-bold text-brand-primary hover:text-brand-primary-hover flex items-center gap-1 transition-colors pt-2 border-t border-gray-50"
                >
                  Lihat Kategori <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
