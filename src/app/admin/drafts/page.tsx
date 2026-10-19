"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FileEdit, Search, ChevronRight, CheckCircle2, X } from "lucide-react";

export default function DraftsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const drafts = [
    {
      id: "drf_1",
      title: "Handmade Ceramic Espresso Cups (Set of 2)",
      category: "Home & Living",
      vendor: "EarthCraft",
      updatedAt: "2026-10-18",
      price: "$24.00",
      sku: "MOD-DRF-001",
      imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=150&h=150&fit=crop",
    },
    {
      id: "drf_2",
      title: "Minimalist Italian Leather Cardholder",
      category: "Accessories",
      vendor: "CuoioStudio",
      updatedAt: "2026-10-16",
      price: "$35.00",
      sku: "MOD-DRF-002",
      imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=150&h=150&fit=crop",
    },
  ];

  const filtered = drafts.filter((p) =>
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
            <FileEdit className="w-5 h-5 text-gray-600" />
            Drafts
            <span className="text-xs bg-gray-200 text-gray-700 font-bold px-2 py-0.5 rounded-full">
              {drafts.length} Draf
            </span>
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Draf produk yang disimpan penjual dan belum diajukan untuk peninjauan
          </p>
        </div>

        <nav className="text-xs text-gray-500 flex items-center gap-1.5 self-start sm:self-auto">
          <Link href="/admin" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-400">Products</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-700 font-medium">Drafts</span>
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
                <th className="px-4 py-3">Terakhir Diubah</th>
                <th className="px-4 py-3">Estimasi Harga</th>
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
                  <td className="px-4 py-3 text-gray-500">{item.updatedAt}</td>
                  <td className="px-4 py-3 font-semibold text-gray-700">{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
