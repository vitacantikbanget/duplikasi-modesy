"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Trash2,
  Search,
  ChevronDown,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  X,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";
import {
  AdminProductItem,
  fetchAdminProducts,
  restoreProductAction,
  deleteProductAction,
} from "@/lib/moderation";

export default function HiddenProductsPage() {
  const [products, setProducts] = useState<AdminProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showCount, setShowCount] = useState(15);
  const [previewProduct, setPreviewProduct] = useState<AdminProductItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadProducts = async () => {
    setLoading(true);
    const all = await fetchAdminProducts();
    setProducts(all);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Filter hidden products (isActive === false)
  const hiddenProducts = products.filter((p) => !p.isActive);

  const filteredProducts = hiddenProducts.filter((p) => {
    const matchCategory =
      selectedCategory === "All" || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.vendorName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  const categories = ["All", ...Array.from(new Set(hiddenProducts.map((p) => p.category)))];

  const handleRestore = async (id: string, title: string) => {
    await restoreProductAction(id);
    showToast(`Produk "${title}" berhasil diaktifkan kembali (Unhidden / Restored)!`);
    loadProducts();
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus produk "${title}" secara permanen?`)) {
      await deleteProductAction(id);
      showToast(`Produk "${title}" telah dihapus secara permanen.`);
      loadProducts();
    }
  };

  const handleBulkRestore = async () => {
    if (selectedIds.length === 0) return;
    if (confirm(`Pulihkan ${selectedIds.length} produk terpilih ke katalog aktif?`)) {
      for (const id of selectedIds) {
        await restoreProductAction(id);
      }
      showToast(`${selectedIds.length} produk berhasil dipulihkan secara massal!`);
      setSelectedIds([]);
      loadProducts();
    }
  };

  return (
    <div className="space-y-4 font-sans text-gray-800">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white px-4 py-3 rounded shadow-lg flex items-center gap-2 text-sm animate-in fade-in slide-in-from-top-4 duration-200">
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
            <EyeOff className="w-6 h-6 text-gray-600" />
            Hidden Products
            <span className="text-xs bg-gray-200 text-gray-700 font-bold px-2 py-0.5 rounded-full">
              {hiddenProducts.length} Produk
            </span>
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Kelola produk yang disembunyikan dari katalog publik atau ditarik sementara selama peninjauan
          </p>
        </div>

        <nav className="text-xs text-gray-500 flex items-center gap-1.5 self-start sm:self-auto">
          <Link href="/admin" className="hover:text-blue-600">
            Admin
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span>Products</span>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-gray-800 font-medium">Hidden Products</span>
        </nav>
      </div>

      {/* Filters */}
      <div className="bg-white rounded border border-gray-200 shadow-xs p-4">
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Tampilkan</label>
            <div className="relative">
              <select
                value={showCount}
                onChange={(e) => setShowCount(Number(e.target.value))}
                className="h-[34px] pl-3 pr-8 border border-gray-300 rounded text-xs text-gray-700 appearance-none bg-white focus:outline-none focus:border-[#00a99d]"
              >
                <option value={15}>15</option>
                <option value={30}>30</option>
                <option value={60}>60</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Kategori</label>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-[34px] pl-3 pr-8 border border-gray-300 rounded text-xs text-gray-700 appearance-none bg-white focus:outline-none focus:border-[#00a99d] min-w-[150px]"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-semibold text-gray-600 mb-1">Pencarian</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Cari Judul, SKU, atau Penjual..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-[34px] pl-9 pr-3 border border-gray-300 rounded text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#00a99d]"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {selectedIds.length > 0 && (
            <button
              type="button"
              onClick={handleBulkRestore}
              className="h-[34px] px-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Pulihkan Terpilih ({selectedIds.length})</span>
            </button>
          )}

          {(searchTerm || selectedCategory !== "All") && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="h-[34px] px-3 text-xs text-gray-600 hover:text-gray-900 border border-gray-300 hover:bg-gray-50 rounded transition-colors"
            >
              Reset Filter
            </button>
          )}
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded border border-gray-200 shadow-xs overflow-hidden">
        <div className="p-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
          <span className="text-xs font-bold text-gray-700">Daftar Produk yang Disembunyikan</span>
          <span className="text-[11px] text-gray-500">({filteredProducts.length} produk)</span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-gray-400 text-sm">Memuat data produk...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-12 text-center">
            <Eye className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-gray-800 mb-1">
              Tidak Ada Produk yang Disembunyikan
            </h3>
            <p className="text-xs text-gray-500">Semua produk sedang aktif atau belum ada produk yang ditarik.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-700 border-collapse">
              <thead className="bg-[#f9fafb] border-b border-gray-200 text-gray-600 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-3 w-10 text-center">
                    <input
                      type="checkbox"
                      checked={
                        filteredProducts.length > 0 &&
                        selectedIds.length === filteredProducts.length
                      }
                      onChange={(e) =>
                        setSelectedIds(e.target.checked ? filteredProducts.map((p) => p.id) : [])
                      }
                      className="rounded text-[#00a99d] focus:ring-0 cursor-pointer"
                    />
                  </th>
                  <th className="p-3 w-16">Id</th>
                  <th className="p-3">Produk</th>
                  <th className="p-3">Kategori</th>
                  <th className="p-3">Penjual</th>
                  <th className="p-3">Harga</th>
                  <th className="p-3">Alasan / Catatan Penonaktifan</th>
                  <th className="p-3 text-right pr-4">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProducts.slice(0, showCount).map((product, idx) => (
                  <tr key={product.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="p-3 text-center">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(product.id)}
                        onChange={() =>
                          setSelectedIds((prev) =>
                            prev.includes(product.id)
                              ? prev.filter((id) => id !== product.id)
                              : [...prev, product.id]
                          )
                        }
                        className="rounded text-[#00a99d] focus:ring-0 cursor-pointer"
                      />
                    </td>
                    <td className="p-3 text-gray-500 font-mono text-[11px]">#{idx + 1}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.imageUrl}
                          alt={product.title}
                          className="w-12 h-12 rounded object-cover border border-gray-200 shrink-0 opacity-75"
                        />
                        <div className="min-w-0">
                          <button
                            type="button"
                            onClick={() => setPreviewProduct(product)}
                            className="font-bold text-gray-900 hover:text-blue-600 truncate block text-left text-xs"
                          >
                            {product.title}
                          </button>
                          <span className="text-[11px] text-gray-400 font-mono">
                            SKU: {product.sku}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-gray-600">{product.category}</td>
                    <td className="p-3 font-medium text-gray-800">{product.vendorName}</td>
                    <td className="p-3 font-bold text-gray-700">
                      ${typeof product.price === "number" ? product.price.toFixed(2) : product.price}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1.5 text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded text-[11px] max-w-xs">
                        <AlertTriangle className="w-3 h-3 shrink-0" />
                        <span className="truncate">
                          {product.rejectionReason || "Disembunyikan oleh staf admin/moderator"}
                        </span>
                      </div>
                    </td>
                    <td className="p-3 text-right pr-4 whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          title="Pratinjau Produk"
                          onClick={() => setPreviewProduct(product)}
                          className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded border border-gray-200 transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          title="Aktifkan Kembali Produk"
                          onClick={() => handleRestore(product.id, product.title)}
                          className="px-2.5 py-1.5 bg-[#00c0ef] hover:bg-[#00acd6] text-white rounded text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer shadow-xs"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Pulihkan</span>
                        </button>

                        <button
                          type="button"
                          title="Hapus Permanen"
                          onClick={() => handleDelete(product.id, product.title)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded border border-gray-200 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* PREVIEW MODAL */}
      {previewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-xl w-full p-6 animate-in fade-in zoom-in-95 duration-200 text-xs space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-gray-900 text-sm truncate">{previewProduct.title}</h3>
              <button onClick={() => setPreviewProduct(null)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex gap-4">
              <img
                src={previewProduct.imageUrl}
                alt={previewProduct.title}
                className="w-36 h-36 object-cover rounded border border-gray-200 shrink-0"
              />
              <div className="space-y-1.5 flex-1">
                <p className="font-bold text-lg text-[#00a99d]">
                  ${typeof previewProduct.price === "number" ? previewProduct.price.toFixed(2) : previewProduct.price}
                </p>
                <p className="text-gray-600">Kategori: <strong className="text-gray-800">{previewProduct.category}</strong></p>
                <p className="text-gray-600">Penjual: <strong className="text-gray-800">{previewProduct.vendorName}</strong></p>
                <p className="text-gray-600">Stok: <strong className="text-gray-800">{previewProduct.stock} unit</strong></p>
                {previewProduct.rejectionReason && (
                  <div className="p-2 bg-red-50 text-red-700 rounded border border-red-100 text-[11px] mt-2">
                    <strong>Alasan Nonaktif:</strong> {previewProduct.rejectionReason}
                  </div>
                )}
              </div>
            </div>

            <div className="border-t pt-3 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setPreviewProduct(null)}
                className="px-3.5 py-1.5 border border-gray-300 rounded hover:bg-gray-50"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={() => {
                  const p = previewProduct;
                  setPreviewProduct(null);
                  handleRestore(p.id, p.title);
                }}
                className="px-3.5 py-1.5 bg-[#00c0ef] hover:bg-[#00acd6] text-white font-semibold rounded flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Pulihkan ke Publik</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
