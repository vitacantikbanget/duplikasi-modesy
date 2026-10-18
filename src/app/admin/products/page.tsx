"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingBasket,
  Search,
  ChevronDown,
  ChevronRight,
  Eye,
  EyeOff,
  Check,
  X,
  Trash2,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
} from "lucide-react";
import {
  AdminProductItem,
  fetchAdminProducts,
  approveProductAction,
  hideProductAction,
  restoreProductAction,
  deleteProductAction,
} from "@/lib/moderation";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<AdminProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showCount, setShowCount] = useState(15);
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

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.vendorName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" || p.category.toLowerCase() === categoryFilter.toLowerCase();

    let matchesStatus = true;
    if (statusFilter === "Active") matchesStatus = p.isApproved && p.isActive;
    else if (statusFilter === "Pending") matchesStatus = !p.isApproved && p.isActive;
    else if (statusFilter === "Hidden") matchesStatus = !p.isActive;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  const handleToggleHide = async (product: AdminProductItem) => {
    if (product.isActive) {
      await hideProductAction(product.id);
      showToast(`Produk "${product.title}" telah disembunyikan dari katalog publik.`);
    } else {
      await restoreProductAction(product.id);
      showToast(`Produk "${product.title}" telah diaktifkan kembali.`);
    }
    loadProducts();
  };

  const handleApprove = async (id: string, title: string) => {
    await approveProductAction(id);
    showToast(`Produk "${title}" berhasil disetujui (Approved)!`);
    loadProducts();
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus produk "${title}"?`)) {
      await deleteProductAction(id);
      showToast(`Produk "${title}" telah dihapus.`);
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
            <ShoppingBasket className="w-6 h-6 text-[#605ca8]" />
            Products
            <span className="text-xs bg-gray-200 text-gray-700 font-bold px-2 py-0.5 rounded-full">
              {products.length} Total
            </span>
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Daftar lengkap seluruh katalog produk, status tayang, dan pengawasan penjual
          </p>
        </div>

        <nav className="text-xs text-gray-500 flex items-center gap-1.5 self-start sm:self-auto">
          <Link href="/admin" className="hover:text-blue-600">
            Admin
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-gray-800 font-medium">Products</span>
        </nav>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded border border-gray-200 shadow-xs p-4">
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Tampilkan</label>
            <div className="relative">
              <select
                value={showCount}
                onChange={(e) => setShowCount(Number(e.target.value))}
                className="h-[34px] pl-3 pr-8 border border-gray-300 rounded text-xs text-gray-700 appearance-none bg-white focus:outline-none focus:border-[#605ca8]"
              >
                <option value={15}>15</option>
                <option value={30}>30</option>
                <option value={60}>60</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Status</label>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-[34px] pl-3 pr-8 border border-gray-300 rounded text-xs text-gray-700 appearance-none bg-white focus:outline-none focus:border-[#605ca8] min-w-[130px]"
              >
                <option value="All">Semua Status</option>
                <option value="Active">Active (Tayang)</option>
                <option value="Pending">Pending Review</option>
                <option value="Hidden">Hidden (Nonaktif)</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Kategori</label>
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="h-[34px] pl-3 pr-8 border border-gray-300 rounded text-xs text-gray-700 appearance-none bg-white focus:outline-none focus:border-[#605ca8] min-w-[150px]"
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
                className="w-full h-[34px] pl-9 pr-3 border border-gray-300 rounded text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#605ca8]"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {(searchTerm || statusFilter !== "All" || categoryFilter !== "All") && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("All");
                setCategoryFilter("All");
              }}
              className="h-[34px] px-3 text-xs text-gray-600 hover:text-gray-900 border border-gray-300 hover:bg-gray-50 rounded transition-colors"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded border border-gray-200 shadow-xs overflow-hidden">
        <div className="p-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
          <span className="text-xs font-bold text-gray-700">Daftar Produk</span>
          <span className="text-[11px] text-gray-500">({filteredProducts.length} produk ditampilkan)</span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-gray-400 text-sm">Memuat data produk...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-12 text-center text-gray-500 text-xs">
            Tidak ada produk yang cocok dengan kriteria filter.
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
                      className="rounded text-[#605ca8] focus:ring-0 cursor-pointer"
                    />
                  </th>
                  <th className="p-3 w-16">Id</th>
                  <th className="p-3">Produk</th>
                  <th className="p-3">Kategori</th>
                  <th className="p-3">Penjual</th>
                  <th className="p-3">Harga & Stok</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right pr-4">Aksi Moderasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProducts.slice(0, showCount).map((product, idx) => {
                  const isPending = !product.isApproved && product.isActive;
                  const isHidden = !product.isActive;
                  const isActive = product.isApproved && product.isActive;

                  return (
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
                          className="rounded text-[#605ca8] focus:ring-0 cursor-pointer"
                        />
                      </td>

                      <td className="p-3 text-gray-500 font-mono text-[11px]">#{idx + 1}</td>

                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.imageUrl}
                            alt={product.title}
                            className="w-12 h-12 rounded object-cover border border-gray-200 shrink-0 shadow-xs"
                          />
                          <div className="min-w-0">
                            <span className="font-bold text-gray-900 block truncate text-xs">
                              {product.title}
                            </span>
                            <span className="text-[11px] text-gray-400 font-mono">
                              SKU: {product.sku}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="p-3 text-gray-600">{product.category}</td>

                      <td className="p-3 font-medium text-gray-800">{product.vendorName}</td>

                      <td className="p-3">
                        <span className="font-bold text-gray-900">
                          ${typeof product.price === "number" ? product.price.toFixed(2) : product.price}
                        </span>
                        <div className="text-[10px] text-gray-500">Stok: {product.stock}</div>
                      </td>

                      <td className="p-3">
                        {isPending && (
                          <span className="bg-amber-100 text-amber-800 font-bold text-[10px] px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                            Pending Review
                          </span>
                        )}
                        {isHidden && (
                          <span className="bg-gray-200 text-gray-700 font-bold text-[10px] px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                            <EyeOff className="w-3 h-3 text-gray-500" />
                            Hidden
                          </span>
                        )}
                        {isActive && (
                          <span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                            Active
                          </span>
                        )}
                      </td>

                      <td className="p-3 text-right pr-4 whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          {isPending && (
                            <button
                              type="button"
                              title="Setujui Produk (Approve)"
                              onClick={() => handleApprove(product.id, product.title)}
                              className="px-2 py-1 bg-[#00a65a] hover:bg-[#008d4c] text-white rounded text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Approve</span>
                            </button>
                          )}

                          <button
                            type="button"
                            title={product.isActive ? "Sembunyikan Produk" : "Aktifkan Produk"}
                            onClick={() => handleToggleHide(product)}
                            className={`p-1.5 rounded border border-gray-200 transition-colors cursor-pointer ${
                              product.isActive
                                ? "text-gray-500 hover:text-amber-600 hover:bg-amber-50"
                                : "text-blue-600 hover:bg-blue-50"
                            }`}
                          >
                            {product.isActive ? (
                              <EyeOff className="w-3.5 h-3.5" />
                            ) : (
                              <Eye className="w-3.5 h-3.5" />
                            )}
                          </button>

                          <button
                            type="button"
                            title="Hapus Produk"
                            onClick={() => handleDelete(product.id, product.title)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded border border-gray-200 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
