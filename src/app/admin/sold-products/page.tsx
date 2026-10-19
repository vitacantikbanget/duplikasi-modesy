"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCheck, Search, ChevronRight, CheckCircle2, X } from "lucide-react";

export default function SoldProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const soldProducts = [
    {
      id: "sold_1",
      title: "Handmade Moroccan Wool Rug",
      category: "Home & Living",
      vendor: "AtlasCrafts",
      soldDate: "2026-10-02",
      price: "$210.00",
      buyer: "Sarah Connor",
      sku: "MOD-SLD-001",
      imageUrl: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=150&h=150&fit=crop",
    },
    {
      id: "sold_2",
      title: "Vintage Mechanical Typist Keyboard",
      category: "Electronics",
      vendor: "RetroKeys",
      soldDate: "2026-09-28",
      price: "$89.00",
      buyer: "David Miller",
      sku: "MOD-SLD-002",
      imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=150&h=150&fit=crop",
    },
  ];

  const filtered = soldProducts.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.vendor.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <CheckCheck className="w-5 h-5 text-emerald-600" />
            Sold Products
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
              {soldProducts.length} Terjual
            </span>
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Daftar produk dengan status stok habis / berhasil terjual
          </p>
        </div>

        <nav className="text-xs text-gray-500 flex items-center gap-1.5 self-start sm:self-auto">
          <Link href="/admin" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-400">Products</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-700 font-medium">Sold Products</span>
        </nav>
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
                <th className="px-4 py-3">Pembeli</th>
                <th className="px-4 py-3">Harga</th>
                <th className="px-4 py-3">Tanggal Terjual</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((item, idx) => (
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
                  <td className="px-4 py-3 text-gray-600">{item.vendor}</td>
                  <td className="px-4 py-3 text-[#3c8dbc] font-medium">{item.buyer}</td>
                  <td className="px-4 py-3 font-semibold text-emerald-600">{item.price}</td>
                  <td className="px-4 py-3 text-gray-500">{item.soldDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
