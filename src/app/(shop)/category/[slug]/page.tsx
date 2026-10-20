"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronRight, Filter, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { ALL_PRODUCTS } from "@/lib/products-data";
import ProductCard from "@/components/common/ProductCard";
import { useAppContext } from "@/contexts/AppContext";

export default function CategoryPage({ initialSlug }: { initialSlug?: string } = {}) {
  const routeParams = useParams();
  const slug = initialSlug || (routeParams?.slug as string) || "clothing";
  const { formatPrice, t } = useAppContext();

  // Filters state
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedCondition, setSelectedCondition] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Normalize slug for matching
  const categoryTitle = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  // Filter products by category slug or subcategory slug
  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((product) => {
      // Category match
      const catMatch = 
        product.categorySlug === slug || 
        product.subcategorySlug === slug ||
        product.category.toLowerCase().replace(/\s+/g, '-') === slug ||
        product.subcategory.toLowerCase().replace(/\s+/g, '-') === slug ||
        slug === "all";

      if (!catMatch && slug !== "all") return false;

      // Product Type match
      if (selectedType !== "all" && product.productType !== selectedType) {
        return false;
      }

      // Condition filter (Used Stuff / New)
      if (selectedCondition === "new" && product.condition && product.condition !== "New") {
        return false;
      }
      if (selectedCondition === "used" && (!product.condition || product.condition === "New")) {
        return false;
      }

      // Price filter
      if (typeof product.price === "number") {
        if (minPrice && product.price < parseFloat(minPrice)) return false;
        if (maxPrice && product.price > parseFloat(maxPrice)) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price_asc") {
        const pa = typeof a.price === "number" ? a.price : 0;
        const pb = typeof b.price === "number" ? b.price : 0;
        return pa - pb;
      }
      if (sortBy === "price_desc") {
        const pa = typeof a.price === "number" ? a.price : 0;
        const pb = typeof b.price === "number" ? b.price : 0;
        return pb - pa;
      }
      if (sortBy === "rating") {
        return b.rating - a.rating;
      }
      return 0; // Default newest
    });
  }, [slug, selectedType, selectedCondition, minPrice, maxPrice, sortBy]);

  return (
    <div className="bg-[#fcfcfc] min-h-screen pb-20">
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center text-xs text-gray-500">
          <Link href="/" className="hover:text-brand-primary transition-colors">{t("home")}</Link>
          <ChevronRight className="w-3.5 h-3.5 mx-2 text-gray-400" />
          <Link href="/categories" className="hover:text-brand-primary transition-colors">Kategori</Link>
          <ChevronRight className="w-3.5 h-3.5 mx-2 text-gray-400" />
          <span className="text-gray-800 font-medium">{categoryTitle}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{categoryTitle}</h1>
            <p className="text-xs text-gray-500 mt-1">
              Menampilkan {filteredProducts.length} produk di kategori ini
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="md:hidden flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded text-xs font-semibold text-gray-700"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" /> Filter
            </button>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded px-3 py-1.5 text-xs text-gray-700">
              <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-gray-400">Urutkan:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="outline-none bg-transparent font-medium cursor-pointer"
              >
                <option value="newest">Terbaru</option>
                <option value="price_asc">Harga Terendah</option>
                <option value="price_desc">Harga Tertinggi</option>
                <option value="rating">Rating Tertinggi</option>
              </select>
            </div>
          </div>
        </div>

        {/* Catalog Grid & Sidebar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar Filter */}
          <aside className={`md:col-span-3 bg-white rounded-xl border border-gray-100 p-5 shadow-xs space-y-6 ${
            mobileFilterOpen ? "block" : "hidden md:block"
          }`}>
            
            {/* Categories Quick Links */}
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-gray-800 mb-3">
                Kategori Populer
              </h3>
              <ul className="space-y-2 text-xs">
                {[
                  { name: "Semua Produk", slug: "all" },
                  { name: "Clothing", slug: "clothing" },
                  { name: "Shoes", slug: "shoes" },
                  { name: "Home & Living", slug: "home-living" },
                  { name: "Graphics & Photos", slug: "graphics-photos" },
                  { name: "Video & Audio", slug: "video-audio" },
                ].map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={c.slug === "all" ? "/products" : `/category/${c.slug}`}
                      className={`block py-1 px-2 rounded transition-colors ${
                        slug === c.slug 
                          ? "bg-brand-primary/10 text-brand-primary font-bold" 
                          : "text-gray-600 hover:text-brand-primary hover:bg-gray-50"
                      }`}
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Product Type Filter */}
            <div className="pt-4 border-t border-gray-100">
              <h3 className="font-bold text-xs uppercase tracking-wider text-gray-800 mb-3">
                Tipe Produk
              </h3>
              <div className="space-y-2 text-xs text-gray-600">
                {[
                  { id: "all", label: "Semua Tipe" },
                  { id: "physical", label: "Produk Fisik (Dikirim)" },
                  { id: "digital", label: "Produk Digital (Download)" },
                  { id: "quote", label: "Request a Quote (Tawar)" },
                  { id: "ordinary", label: "Barang Bekas (Iklan Baris)" },
                ].map((t) => (
                  <label key={t.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="prodType"
                      checked={selectedType === t.id}
                      onChange={() => setSelectedType(t.id)}
                      className="text-brand-primary focus:ring-brand-primary"
                    />
                    <span>{t.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Condition Filter (Used Stuff / Classifieds) */}
            <div className="pt-4 border-t border-gray-100">
              <h3 className="font-bold text-xs uppercase tracking-wider text-gray-800 mb-3 flex items-center justify-between">
                <span>Kondisi Barang</span>
                <span className="text-[10px] font-normal text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">Used Stuff</span>
              </h3>
              <div className="space-y-2 text-xs text-gray-600">
                {[
                  { id: "all", label: "Semua Kondisi" },
                  { id: "new", label: "Baru (Brand New)" },
                  { id: "used", label: "Barang Bekas (Used / Pre-owned)" },
                ].map((c) => (
                  <label key={c.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="condType"
                      checked={selectedCondition === c.id}
                      onChange={() => setSelectedCondition(c.id)}
                      className="text-brand-primary focus:ring-brand-primary"
                    />
                    <span>{c.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="pt-4 border-t border-gray-100">
              <h3 className="font-bold text-xs uppercase tracking-wider text-gray-800 mb-3">
                Filter Harga (IDR)
              </h3>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full text-xs border border-gray-200 rounded px-2.5 py-1.5 outline-none focus:border-brand-primary"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full text-xs border border-gray-200 rounded px-2.5 py-1.5 outline-none focus:border-brand-primary"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  setMinPrice("");
                  setMaxPrice("");
                  setSelectedType("all");
                }}
                className="w-full text-xs text-gray-500 hover:text-red-500 font-medium py-1"
              >
                Reset Filter
              </button>
            </div>

          </aside>

          {/* Right Product Grid */}
          <main className="md:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-100 p-12 text-center shadow-xs">
                <Filter className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-gray-800 mb-1">Tidak Ada Produk Ditemukan</h3>
                <p className="text-xs text-gray-500 mb-4">
                  Coba sesuaikan filter atau pilih kategori lain.
                </p>
                <Link
                  href="/"
                  className="inline-block px-5 py-2 bg-brand-primary text-white text-xs font-semibold rounded hover:bg-brand-primary-hover transition-colors"
                >
                  Kembali ke Beranda
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>

        </div>

      </div>

    </div>
  );
}
