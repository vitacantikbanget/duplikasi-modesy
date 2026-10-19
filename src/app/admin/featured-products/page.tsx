"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Search,
  ChevronRight,
  Eye,
  CheckCircle2,
  X,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { AdminProductItem, fetchAdminProducts } from "@/lib/moderation";

export default function FeaturedProductsPage() {
  const [products, setProducts] = useState<AdminProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const all = await fetchAdminProducts();
      // Emulate featured products (first 3-4 active items)
      setProducts(all.slice(0, 4));
      setLoading(false);
    }
    load();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filtered = products.filter((p) => {
    const matchCat =
      selectedCategory === "All" || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.vendorName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleRemoveFeatured = (id: string, title: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast(`Produk "${title}" dihapus dari daftar Featured Products.`);
  };

  return (
    <div className="space-y-4 font-sans text-gray-800">
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white px-4 py-3 rounded shadow-lg flex items-center gap-2 text-sm">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 hover:opacity-80 p-0.5">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2 border-b border-gray-200">
        <div>
          <h1 className="text-xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            Featured Products
            <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
              {products.length} Produk
            </span>
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Daftar produk unggulan yang ditampilkan di banner utama dan beranda Modesy
          </p>
        </div>

        <nav className="text-xs text-gray-500 flex items-center gap-1.5 self-start sm:self-auto">
          <Link href="/admin" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-400">Products</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-700 font-medium">Featured Products</span>
        </nav>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-3.5 rounded border border-gray-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[240px] max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari featured product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-gray-300 rounded focus:outline-hidden focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-[#f8f9fa] text-gray-600 uppercase font-semibold text-[11px] border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 w-16 text-center">Id</th>
                <th className="px-4 py-3">Produk</th>
                <th className="px-4 py-3">Kategori</th>
                <th className="px-4 py-3">Penjual</th>
                <th className="px-4 py-3">Harga</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-gray-400">
                    Memuat data...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-gray-400">
                    Tidak ada featured product ditemukan
                  </td>
                </tr>
              ) : (
                filtered.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="px-4 py-3 text-center text-gray-400">{idx + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-10 h-10 object-cover rounded border border-gray-200 shrink-0"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{item.title}</p>
                          <span className="text-[10px] text-gray-400 font-mono">SKU: {item.sku}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{item.category}</td>
                    <td className="px-4 py-3 text-gray-600">{item.vendorName}</td>
                    <td className="px-4 py-3 font-semibold text-emerald-600">${item.price}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleRemoveFeatured(item.id, item.title)}
                        className="text-xs text-rose-600 hover:text-rose-800 font-medium px-2 py-1 rounded hover:bg-rose-50 transition-colors"
                      >
                        Remove from Featured
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
