"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Clock, Search, ChevronRight, CheckCircle2, X } from "lucide-react";

export default function ExpiredProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const expiredProducts = [
    {
      id: "exp_1",
      title: "Limited Edition Summer Graphic Tee",
      category: "Clothing & Apparel",
      vendor: "UrbanThreads",
      expiredDate: "2026-09-15",
      price: "$29.00",
      sku: "MOD-EXP-001",
      imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=150&h=150&fit=crop",
    },
    {
      id: "exp_2",
      title: "Artisan Scented Soy Candle Box",
      category: "Home & Living",
      vendor: "AromaCo",
      expiredDate: "2026-08-30",
      price: "$18.50",
      sku: "MOD-EXP-002",
      imageUrl: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=150&h=150&fit=crop",
    },
  ];

  const filtered = expiredProducts.filter((p) =>
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
            <Clock className="w-5 h-5 text-gray-500" />
            Expired Products
            <span className="text-xs bg-gray-200 text-gray-700 font-bold px-2 py-0.5 rounded-full">
              {expiredProducts.length} Produk
            </span>
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Produk yang telah melewati batas waktu masa tayang atau paket promosi vendor
          </p>
        </div>

        <nav className="text-xs text-gray-500 flex items-center gap-1.5 self-start sm:self-auto">
          <Link href="/admin" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-400">Products</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-700 font-medium">Expired Products</span>
        </nav>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-3.5 rounded border border-gray-200 shadow-xs flex items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[240px] max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari expired product..."
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
                <th className="px-4 py-3">Tanggal Berakhir</th>
                <th className="px-4 py-3">Harga</th>
                <th className="px-4 py-3 text-right">Aksi</th>
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
                  <td className="px-4 py-3 text-rose-600 font-medium">{item.expiredDate}</td>
                  <td className="px-4 py-3 font-semibold text-gray-700">{item.price}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setToastMessage(`Masa tayang produk "${item.title}" diperpanjang.`)}
                      className="text-xs text-emerald-600 hover:text-emerald-800 font-medium px-2 py-1 rounded hover:bg-emerald-50 transition-colors"
                    >
                      Renew
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
