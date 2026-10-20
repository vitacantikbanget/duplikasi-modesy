"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Check,
  X,
  Eye,
  Trash2,
  Search,
  ChevronDown,
  ChevronRight,
  AlertCircle,
  PackageCheck,
  ShieldCheck,
  Filter,
  CheckCircle2,
  ExternalLink,
  Store,
} from "lucide-react";
import {
  AdminProductItem,
  fetchAdminProducts,
  approveProductAction,
  rejectProductAction,
  deleteProductAction,
} from "@/lib/moderation";
import { useAppContext } from "@/contexts/AppContext";

export default function PendingProductsPage() {
  const { role } = useAppContext();
  const [products, setProducts] = useState<AdminProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showCount, setShowCount] = useState(15);

  // Modals state
  const [previewProduct, setPreviewProduct] = useState<AdminProductItem | null>(null);
  const [rejectProductItem, setRejectProductItem] = useState<AdminProductItem | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const PRESET_REASONS = [
    "Foto produk tidak memenuhi standar atau terindikasi hak cipta",
    "Deskripsi produk mencantumkan kontak transaksi di luar platform Modesy",
    "Kategori produk yang dipilih tidak sesuai dengan barang",
    "Harga produk dicantumkan tidak wajar / manipulasi pencarian",
    "Produk termasuk dalam daftar barang terlarang atau dibatasi",
  ];

  const loadProducts = async () => {
    setLoading(true);
    const all = await fetchAdminProducts();
    setProducts(all);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
    const handleUpdate = () => loadProducts();
    if (typeof window !== "undefined") {
      window.addEventListener("modesy-moderation-updated", handleUpdate);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("modesy-moderation-updated", handleUpdate);
      }
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Filter only pending products
  const pendingProducts = products.filter((p) => !p.isApproved && p.isActive);

  // Search & category filter
  const filteredProducts = pendingProducts.filter((p) => {
    const matchCategory =
      selectedCategory === "All" || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.vendorName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  const categories = ["All", ...Array.from(new Set(pendingProducts.map((p) => p.category)))];

  // Actions
  const handleApprove = async (id: string, title: string) => {
    await approveProductAction(id);
    showToast(`Produk "${title}" berhasil disetujui (Approved) dan kini aktif di katalog!`);
    loadProducts();
  };

  const handleOpenReject = (product: AdminProductItem) => {
    setRejectProductItem(product);
    setRejectionReason(PRESET_REASONS[0]);
    setCustomReason("");
  };

  const handleConfirmReject = async () => {
    if (!rejectProductItem) return;
    const finalReason = customReason.trim() ? customReason.trim() : rejectionReason;
    await rejectProductAction(rejectProductItem.id, finalReason);
    showToast(`Produk "${rejectProductItem.title}" telah ditolak dengan catatan alasan.`);
    setRejectProductItem(null);
    loadProducts();
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus produk "${title}" secara permanen?`)) {
      await deleteProductAction(id);
      showToast(`Produk "${title}" telah dihapus dari sistem.`);
      loadProducts();
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredProducts.map((p) => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBulkApprove = async () => {
    if (selectedIds.length === 0) return;
    if (confirm(`Setujui ${selectedIds.length} produk terpilih sekaligus?`)) {
      for (const id of selectedIds) {
        await approveProductAction(id);
      }
      showToast(`${selectedIds.length} produk berhasil disetujui secara massal!`);
      setSelectedIds([]);
      loadProducts();
    }
  };

  return (
    <div className="space-y-4 font-sans text-gray-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white px-4 py-3 rounded shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-200 text-sm">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 hover:opacity-80 p-0.5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Page Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2 border-b border-gray-200">
        <div>
          <h1 className="text-xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
            <PackageCheck className="w-6 h-6 text-[#00a99d]" />
            Pending Products
            <span className="text-xs bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full">
              {pendingProducts.length} Antrean
            </span>
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Tinjau dan moderasi produk yang baru didaftarkan oleh vendor sebelum tayang di marketplace
          </p>
        </div>

        <nav className="text-xs text-gray-500 flex items-center gap-1.5 self-start sm:self-auto">
          <Link href="/admin" className="hover:text-blue-600">
            Admin
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span>Products</span>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-gray-800 font-medium">Pending Products</span>
        </nav>
      </div>

      {/* Filter Card */}
      <div className="bg-white rounded border border-gray-200 shadow-xs p-4">
        <div className="flex flex-wrap items-end gap-3">
          {/* Show count */}
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

          {/* Category Filter */}
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

          {/* Search */}
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

          {/* Bulk Approve button */}
          {selectedIds.length > 0 && (
            <button
              type="button"
              onClick={handleBulkApprove}
              className="h-[34px] px-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Setujui Terpilih ({selectedIds.length})</span>
            </button>
          )}

          {/* Reset button */}
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

      {/* Main Table Card */}
      <div className="bg-white rounded border border-gray-200 shadow-xs overflow-hidden">
        <div className="p-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-700">Daftar Produk Menunggu Persetujuan</span>
            <span className="text-[11px] text-gray-500">
              ({filteredProducts.length} produk ditemukan)
            </span>
          </div>

          <div className="text-xs text-gray-500 flex items-center gap-2">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
              Menunggu Review
            </span>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-gray-400 text-sm">
            Memuat antrean produk pending...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-12 text-center">
            <ShieldCheck className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-gray-800 mb-1">
              Tidak Ada Produk Menunggu Moderasi
            </h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Semua produk yang diajukan vendor telah selesai dimoderasi atau tidak ditemukan produk sesuai filter pencarian.
            </p>
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
                      onChange={handleSelectAll}
                      className="rounded text-[#00a99d] focus:ring-0 cursor-pointer"
                    />
                  </th>
                  <th className="p-3 w-16">Id</th>
                  <th className="p-3">Produk</th>
                  <th className="p-3">Kategori</th>
                  <th className="p-3">Penjual / Vendor</th>
                  <th className="p-3">Harga & Stok</th>
                  <th className="p-3">Tanggal Pengajuan</th>
                  <th className="p-3 text-right pr-4">Aksi Moderasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProducts.slice(0, showCount).map((product, idx) => (
                  <tr
                    key={product.id}
                    className={`hover:bg-amber-50/30 transition-colors ${
                      selectedIds.includes(product.id) ? "bg-amber-50/50" : ""
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="p-3 text-center">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(product.id)}
                        onChange={() => handleToggleSelect(product.id)}
                        className="rounded text-[#00a99d] focus:ring-0 cursor-pointer"
                      />
                    </td>

                    {/* Id */}
                    <td className="p-3 text-gray-500 font-mono text-[11px]">
                      #{idx + 1}
                    </td>

                    {/* Product Image & Info */}
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.imageUrl}
                          alt={product.title}
                          className="w-12 h-12 rounded object-cover border border-gray-200 shrink-0 shadow-xs"
                        />
                        <div className="min-w-0">
                          <button
                            type="button"
                            onClick={() => setPreviewProduct(product)}
                            className="font-bold text-gray-900 hover:text-[#00a99d] transition-colors truncate block text-left text-xs"
                          >
                            {product.title}
                          </button>
                          <div className="flex items-center gap-2 mt-0.5 text-[11px] text-gray-500 font-mono">
                            <span>SKU: {product.sku}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="p-3">
                      <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-[11px] font-medium">
                        {product.category}
                      </span>
                    </td>

                    {/* Vendor */}
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <img
                          src={product.vendorAvatar || "https://i.pravatar.cc/150?u=vendor"}
                          alt={product.vendorName}
                          className="w-6 h-6 rounded-full object-cover border border-gray-200"
                        />
                        <div>
                          <p className="font-semibold text-gray-800 text-xs">{product.vendorName}</p>
                          <p className="text-[10px] text-gray-400">{product.vendorEmail}</p>
                        </div>
                      </div>
                    </td>

                    {/* Price & Stock */}
                    <td className="p-3">
                      <div className="font-bold text-[#00a99d] text-xs">
                        ${typeof product.price === "number" ? product.price.toFixed(2) : product.price}
                      </div>
                      <div className="text-[11px] text-gray-500">Stok: {product.stock}</div>
                    </td>

                    {/* Date */}
                    <td className="p-3 text-gray-500 text-[11px] whitespace-nowrap">
                      {product.createdAt}
                    </td>

                    {/* Actions */}
                    <td className="p-3 text-right pr-4 whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        {/* Quick Preview Button */}
                        <button
                          type="button"
                          title="Lihat Pratinjau Produk"
                          onClick={() => setPreviewProduct(product)}
                          className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded border border-gray-200 transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {/* Approve Button */}
                        <button
                          type="button"
                          title="Setujui Produk (Approve)"
                          onClick={() => handleApprove(product.id, product.title)}
                          className="px-2.5 py-1.5 bg-[#00a65a] hover:bg-[#008d4c] text-white rounded text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer shadow-xs"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve</span>
                        </button>

                        {/* Reject Button */}
                        <button
                          type="button"
                          title="Tolak Produk (Reject)"
                          onClick={() => handleOpenReject(product)}
                          className="px-2.5 py-1.5 bg-[#dd4b39] hover:bg-[#c23321] text-white rounded text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer shadow-xs"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>

                        {/* Delete Button */}
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
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* QUICK PREVIEW MODAL */}
      {previewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-2 py-0.5 rounded">
                  Pending Review
                </span>
                <h3 className="font-bold text-gray-900 text-sm truncate max-w-md">
                  {previewProduct.title}
                </h3>
              </div>
              <button
                onClick={() => setPreviewProduct(null)}
                className="text-gray-400 hover:text-gray-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <img
                    src={previewProduct.imageUrl}
                    alt={previewProduct.title}
                    className="w-full h-56 object-cover rounded border border-gray-200 shadow-sm"
                  />
                  <div className="mt-3 flex items-center justify-between text-gray-500">
                    <span>SKU: {previewProduct.sku}</span>
                    <span>Stok: {previewProduct.stock} unit</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] font-bold text-gray-500 uppercase">Harga</label>
                    <p className="text-xl font-bold text-[#00a99d]">
                      ${typeof previewProduct.price === "number" ? previewProduct.price.toFixed(2) : previewProduct.price}
                    </p>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-gray-500 uppercase">Kategori</label>
                    <p className="font-medium text-gray-800">{previewProduct.category}</p>
                  </div>

                  <div className="bg-gray-50 p-3 rounded border border-gray-200">
                    <label className="text-[11px] font-bold text-gray-500 uppercase block mb-1">
                      Informasi Penjual
                    </label>
                    <div className="flex items-center gap-2.5">
                      <img
                        src={previewProduct.vendorAvatar || "https://i.pravatar.cc/150?u=vendor"}
                        alt={previewProduct.vendorName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-bold text-gray-800">{previewProduct.vendorName}</p>
                        <p className="text-gray-500 text-[11px]">{previewProduct.vendorEmail}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-gray-500 uppercase">
                      Deskripsi Produk
                    </label>
                    <p className="text-gray-700 mt-1 leading-relaxed bg-gray-50 p-3 rounded border border-gray-200 max-h-28 overflow-y-auto">
                      {previewProduct.description || "Tidak ada deskripsi yang disediakan."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setPreviewProduct(null)}
                className="px-4 py-2 border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 text-xs font-medium rounded transition-colors"
              >
                Tutup
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const prod = previewProduct;
                    setPreviewProduct(null);
                    handleOpenReject(prod);
                  }}
                  className="px-4 py-2 bg-[#dd4b39] hover:bg-[#c23321] text-white text-xs font-semibold rounded flex items-center gap-1 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Tolak (Reject)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const prod = previewProduct;
                    setPreviewProduct(null);
                    handleApprove(prod.id, prod.title);
                  }}
                  className="px-4 py-2 bg-[#00a65a] hover:bg-[#008d4c] text-white text-xs font-semibold rounded flex items-center gap-1 transition-colors"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Setujui (Approve)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* REJECT MODAL */}
      {rejectProductItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-red-50">
              <div className="flex items-center gap-2 text-red-700">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <h3 className="font-bold text-sm">Penolakan Produk (Reject)</h3>
              </div>
              <button
                onClick={() => setRejectProductItem(null)}
                className="text-gray-400 hover:text-gray-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <p className="text-gray-700">
                Pilih alasan penolakan untuk produk{" "}
                <strong className="text-gray-900">{rejectProductItem.title}</strong>. Notifikasi dan catatan ini akan disimpan untuk vendor:
              </p>

              <div className="space-y-2">
                <label className="font-semibold text-gray-700 block">Alasan Penolakan Standar:</label>
                {PRESET_REASONS.map((reason, idx) => (
                  <label
                    key={idx}
                    className="flex items-start gap-2 p-2 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer text-gray-700 text-xs"
                  >
                    <input
                      type="radio"
                      name="preset_reason"
                      checked={rejectionReason === reason && !customReason}
                      onChange={() => {
                        setRejectionReason(reason);
                        setCustomReason("");
                      }}
                      className="mt-0.5 text-red-600 focus:ring-0"
                    />
                    <span>{reason}</span>
                  </label>
                ))}
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">
                  Atau Tulis Catatan Khusus untuk Vendor:
                </label>
                <textarea
                  rows={3}
                  placeholder="Ketik catatan detail atau panduan perbaikan bagi vendor..."
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded focus:outline-none focus:border-red-500 text-xs"
                />
              </div>
            </div>

            <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setRejectProductItem(null)}
                className="px-4 py-2 border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 text-xs font-medium rounded transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmReject}
                className="px-4 py-2 bg-[#dd4b39] hover:bg-[#c23321] text-white text-xs font-semibold rounded flex items-center gap-1 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                <span>Konfirmasi Penolakan</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
