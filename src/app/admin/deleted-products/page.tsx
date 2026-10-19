"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Trash2, Search, ChevronRight, CheckCircle2, X, RotateCcw } from "lucide-react";

export default function DeletedProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [deletedProducts, setDeletedProducts] = useState([
    {
      id: "del_1",
      title: "Knitted Chunky Oversized Cardigan",
      category: "Clothing & Apparel",
      vendor: "WoolCraft Co",
      deletedDate: "2026-10-10",
      price: "$45.00",
      sku: "MOD-DEL-001",
      imageUrl: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=150&h=150&fit=crop",
    },
    {
      id: "del_2",
      title: "Stainless Steel Smart Thermal Flask",
      category: "Home & Living",
      vendor: "ThermoGear",
      deletedDate: "2026-10-08",
      price: "$22.00",
      sku: "MOD-DEL-002",
      imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=150&h=150&fit=crop",
    },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRestore = (id: string, title: string) => {
    setDeletedProducts((prev) => prev.filter((p) => p.id !== id));
    showToast(`Produk "${title}" berhasil dipulihkan dari tempat sampah!`);
  };

  const handlePermanentDelete = (id: string, title: string) => {
    if (confirm(`Hapus permanen produk "${title}"? Tindakan ini tidak dapat dibatalkan.`)) {
      setDeletedProducts((prev) => prev.filter((p) => p.id !== id));
      showToast(`Produk "${title}" telah dihapus secara permanen.`);
    }
  };

  const filtered = deletedProducts.filter((p) =>
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
            <Trash2 className="w-5 h-5 text-rose-600" />
            Deleted Products
            <span className="text-xs bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-full">
              {deletedProducts.length} Terhapus
            </span>
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Tempat sampah produk (soft-deleted). Anda dapat memulihkan atau menghapusnya secara permanen
          </p>
        </div>

        <nav className="text-xs text-gray-500 flex items-center gap-1.5 self-start sm:self-auto">
          <Link href="/admin" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-400">Products</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-700 font-medium">Deleted Products</span>
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
                <th className="px-4 py-3">Tanggal Dihapus</th>
                <th className="px-4 py-3">Harga</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-gray-400">
                    Tempat sampah kosong
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
                          className="w-10 h-10 object-cover rounded border border-gray-200 shrink-0 grayscale opacity-75"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{item.title}</p>
                          <span className="text-[10px] text-gray-400 font-mono">SKU: {item.sku}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{item.category}</td>
                    <td className="px-4 py-3 text-gray-600">{item.vendor}</td>
                    <td className="px-4 py-3 text-rose-600">{item.deletedDate}</td>
                    <td className="px-4 py-3 font-semibold text-gray-700">{item.price}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleRestore(item.id, item.title)}
                          className="flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-800 font-medium px-2 py-1 rounded hover:bg-emerald-50 transition-colors"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          Pulihkan
                        </button>
                        <button
                          onClick={() => handlePermanentDelete(item.id, item.title)}
                          className="flex items-center gap-1 text-xs text-rose-600 hover:text-rose-800 font-medium px-2 py-1 rounded hover:bg-rose-50 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Hapus Permanen
                        </button>
                      </div>
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
