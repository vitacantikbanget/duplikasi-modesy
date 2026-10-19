"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PlusCircle, ChevronRight, CheckCircle2, UploadCloud, X } from "lucide-react";

export default function AdminAddProductPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Clothing & Apparel");
  const [price, setPrice] = useState("");
  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setToastMessage(`Produk "${title}" berhasil ditambahkan ke katalog!`);
      setTitle("");
      setPrice("");
      setSku("");
      setDescription("");
    }, 600);
  };

  return (
    <div className="space-y-4 font-sans text-gray-800 max-w-4xl">
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
            <PlusCircle className="w-5 h-5 text-emerald-600" />
            Add Product
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Tambahkan produk baru secara langsung ke katalog Modesy
          </p>
        </div>

        <nav className="text-xs text-gray-500 flex items-center gap-1.5 self-start sm:self-auto">
          <Link href="/admin" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-400">Products</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-700 font-medium">Add Product</span>
        </nav>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded border border-gray-200 shadow-xs space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Judul Produk <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Contoh: Vintage Oversized Denim Jacket"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Kategori <span className="text-rose-500">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-hidden bg-white"
            >
              <option>Clothing & Apparel</option>
              <option>Electronics & Gadgets</option>
              <option>Home & Living</option>
              <option>Accessories</option>
              <option>Footwear</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              SKU (Stock Keeping Unit)
            </label>
            <input
              type="text"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              placeholder="MOD-PRD-048"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-hidden font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Harga ($ USD) <span className="text-rose-500">*</span>
          </label>
          <input
            type="number"
            step="0.01"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="49.99"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Deskripsi Produk
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tuliskan spesifikasi, bahan, dan informasi penting produk..."
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
          />
        </div>

        <div className="border-2 border-dashed border-gray-300 p-6 rounded text-center hover:border-blue-400 transition-colors">
          <UploadCloud className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-xs font-medium text-gray-700">Tarik gambar produk ke sini atau klik untuk unggah</p>
          <p className="text-[11px] text-gray-400 mt-1">Format didukung: PNG, JPG, WEBP (Maks 5MB)</p>
        </div>

        <div className="pt-2 flex justify-end gap-2">
          <Link
            href="/admin/products"
            className="px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded border border-gray-300 transition-colors"
          >
            Batal
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded shadow-xs transition-colors disabled:opacity-50"
          >
            {submitting ? "Menyimpan..." : "Publikasikan Produk"}
          </button>
        </div>
      </form>
    </div>
  );
}
