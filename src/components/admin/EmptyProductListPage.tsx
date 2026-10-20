/**
 * ============================================================================
 * EmptyProductListPage: Template Tabel Manajemen Produk Panel Admin
 * ============================================================================
 * Komponen tabel data terpadu untuk mengelola daftar produk berdasarkan filter status:
 * - Pending Products: Produk menunggu persetujuan admin.
 * - Hidden Products: Produk yang disembunyikan dari etalase publik.
 * - Expired Products: Iklan produk yang masa aktifnya telah habis.
 * - Sold Products: Produk yang stoknya sudah habis terjual.
 * - Deleted Products: Tempat sampah produk yang dihapus.
 *
 * Fitur-Fitur Tabel:
 * 1. Filter Multi-Kriteria: Pencarian teks, filter tipe produk, kategori, & pengurutan.
 * 2. Operasi Massal (Bulk Actions): Pilih semua checkbox, hapus massal, atau ubah status.
 * 3. Menu Aksi per Baris: Pratinjau (View), Edit, Setujui (Approve), atau Hapus (Delete).
 */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Download,
  Tag,
  Trash2,
  ExternalLink,
  Eye,
  X,
  CheckCircle,
} from "lucide-react";

interface ProductBadge {
  type: "featured" | "special_offer" | "discount";
  label?: string;
  value?: number;
}

export interface AdminProductItem {
  id: number;
  slug: string;
  title: string;
  sku: string;
  imageUrl: string;
  productType: "Physical" | "Digital";
  category: string;
  subcategory?: string;
  listingType?: string;
  user: string;
  userSlug: string;
  price: string;
  stock: string;
  status?: string;
  pageViews: number;
  updated: string;
  date: string;
  badges?: ProductBadge[];
}

interface EmptyProductListPageProps {
  title: string;
  listKey: string;
  hasStatusColumn?: boolean;
  initialItems?: AdminProductItem[];
}

const DEFAULT_CATEGORIES = [
  "All",
  "Clothing",
  "Women's Clothing",
  "Men's Clothing",
  "Shoes",
  "Living Room Furniture",
  "Decorative Pillows",
  "Skirts",
  "Handbags",
  "Dresses",
  "Boots",
  "Sneakers",
  "Vectors",
  "Product Promo",
  "Sun Hats",
  "Shirts",
  "Backpacks",
];

export default function EmptyProductListPage({
  title,
  listKey,
  hasStatusColumn = true,
  initialItems = [],
}: EmptyProductListPageProps) {
  const [products, setProducts] = useState<AdminProductItem[]>(initialItems);

  // Filters State
  const [showCount, setShowCount] = useState<number>(15);
  const [listingType, setListingType] = useState<string>("All");
  const [productType, setProductType] = useState<string>("All");
  const [category, setCategory] = useState<string>("All");
  const [subcategory, setSubcategory] = useState<string>("All");
  const [stockStatus, setStockStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Applied Filters
  const [appliedFilters, setAppliedFilters] = useState({
    listingType: "All",
    productType: "All",
    category: "All",
    subcategory: "All",
    stockStatus: "All",
    search: "",
  });

  // Table selection & pagination
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Active dropdown menu for options
  const [activeDropdownId, setActiveDropdownId] = useState<number | null>(null);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [bulkAction, setBulkAction] = useState<string>("");

  // Modals & Feedback
  const [selectedProduct, setSelectedProduct] =
    useState<AdminProductItem | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdownId(null);
      setIsExportOpen(false);
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  // Filter submit handler
  const handleFilter = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAppliedFilters({
      listingType,
      productType,
      category,
      subcategory,
      stockStatus,
      search: searchQuery.trim().toLowerCase(),
    });
    setCurrentPage(1);
  };

  // Filtered dataset
  const filteredProducts = products.filter((item) => {
    if (
      appliedFilters.productType !== "All" &&
      item.productType !== appliedFilters.productType
    ) {
      return false;
    }
    if (
      appliedFilters.listingType !== "All" &&
      item.listingType !== appliedFilters.listingType
    ) {
      return false;
    }
    if (
      appliedFilters.category !== "All" &&
      item.category !== appliedFilters.category
    ) {
      return false;
    }
    if (
      appliedFilters.subcategory !== "All" &&
      item.subcategory !== appliedFilters.subcategory
    ) {
      return false;
    }
    if (appliedFilters.stockStatus !== "All") {
      if (
        appliedFilters.stockStatus === "In Stock" &&
        !item.stock.includes("In Stock")
      ) {
        return false;
      }
      if (
        appliedFilters.stockStatus === "Out of Stock" &&
        item.stock.includes("In Stock")
      ) {
        return false;
      }
    }
    if (appliedFilters.search) {
      const matchTitle = item.title.toLowerCase().includes(appliedFilters.search);
      const matchSku = item.sku.toLowerCase().includes(appliedFilters.search);
      const matchUser = item.user.toLowerCase().includes(appliedFilters.search);
      const matchId = item.id.toString() === appliedFilters.search;
      if (!matchTitle && !matchSku && !matchUser && !matchId) {
        return false;
      }
    }
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / showCount) || 1;
  const startIndex = (currentPage - 1) * showCount;
  const currentRows = filteredProducts.slice(startIndex, startIndex + showCount);

  // Select all checkbox
  const isAllSelected =
    currentRows.length > 0 &&
    currentRows.every((row) => selectedIds.includes(row.id));

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(currentRows.map((r) => r.id));
    }
  };

  const handleSelectRow = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Row Actions
  const handleDeleteProduct = (id: number) => {
    const target = products.find((p) => p.id === id);
    if (
      window.confirm(
        `Are you sure you want to permanently delete "${target?.title}"?`
      )
    ) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setSelectedIds((prev) => prev.filter((item) => item !== id));
      showToast("Product successfully deleted.");
    }
  };

  // Bulk Actions
  const handleApplyBulk = () => {
    if (!bulkAction) {
      alert("Please select a bulk action.");
      return;
    }
    if (selectedIds.length === 0) {
      alert("Please select at least one product.");
      return;
    }

    if (bulkAction === "delete") {
      if (
        window.confirm(
          `Are you sure you want to delete ${selectedIds.length} selected product(s)?`
        )
      ) {
        setProducts((prev) =>
          prev.filter((p) => !selectedIds.includes(p.id))
        );
        setSelectedIds([]);
        showToast(`${selectedIds.length} products deleted successfully.`);
      }
    }
    setBulkAction("");
  };

  const showToast = (msg: string) => {
    setActionSuccess(msg);
    setTimeout(() => {
      setActionSuccess(null);
    }, 4000);
  };

  // Export
  const handleExport = (type: "csv" | "excel") => {
    const headers = hasStatusColumn
      ? "Id,Title,SKU,Product Type,Category,User,Price,Stock,Status,Page Views,Updated,Date"
      : "Id,Title,SKU,Product Type,Category,User,Price,Stock,Page Views,Updated,Date";

    const rows = filteredProducts.map((p) =>
      hasStatusColumn
        ? `${p.id},"${p.title}","${p.sku}","${p.productType}","${p.category}","${p.user}","${p.price}","${p.stock}","${p.status || ""}","${p.pageViews}","${p.updated}","${p.date}"`
        : `${p.id},"${p.title}","${p.sku}","${p.productType}","${p.category}","${p.user}","${p.price}","${p.stock}","${p.pageViews}","${p.updated}","${p.date}"`
    );

    const csvContent =
      "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `${listKey}_products_${type}_${Date.now()}.${type === "csv" ? "csv" : "xls"}`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsExportOpen(false);
  };

  const totalCols = hasStatusColumn ? 13 : 12;

  return (
    <div className="w-full text-[#333333] pb-12">
      {/* Toast Notification */}
      {actionSuccess && (
        <div className="mb-4 bg-[#dff0d8] border border-[#d6e9c6] text-[#3c763d] px-4 py-3 rounded-[3px] flex items-center justify-between text-[13px]">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#3c763d]" />
            <span>{actionSuccess}</span>
          </div>
          <button
            onClick={() => setActionSuccess(null)}
            className="text-[#3c763d] hover:text-[#2b542c]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Title */}
      <div className="mb-4">
        <h1 className="text-[24px] font-normal text-[#333333]">{title}</h1>
      </div>

      {/* Main Content Box (Modesy Admin White Box) */}
      <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border border-[#d2d6de] p-5">
        {/* Filter Controls Row */}
        <form
          onSubmit={handleFilter}
          className="flex flex-wrap items-end gap-3 mb-6"
        >
          {/* Show */}
          <div>
            <label className="block text-[12px] font-semibold text-gray-700 mb-1">
              Show
            </label>
            <div className="relative">
              <select
                value={showCount}
                onChange={(e) => {
                  setShowCount(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="h-[34px] w-[75px] pl-3 pr-7 border border-[#d2d6de] rounded-[3px] bg-white text-[13px] text-gray-700 appearance-none focus:outline-none focus:border-[#3c8dbc] cursor-pointer"
              >
                <option value={15}>15</option>
                <option value={30}>30</option>
                <option value={60}>60</option>
                <option value={100}>100</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Listing Type */}
          <div>
            <label className="block text-[12px] font-semibold text-gray-700 mb-1">
              Listing Type
            </label>
            <div className="relative">
              <select
                value={listingType}
                onChange={(e) => setListingType(e.target.value)}
                className="h-[34px] min-w-[100px] pl-3 pr-7 border border-[#d2d6de] rounded-[3px] bg-white text-[13px] text-gray-700 appearance-none focus:outline-none focus:border-[#3c8dbc] cursor-pointer"
              >
                <option value="All">All</option>
                <option value="Add Product">Add Product</option>
                <option value="Sell from Store">Sell from Store</option>
                <option value="Ordinary Listing">Ordinary Listing</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Product Type */}
          <div>
            <label className="block text-[12px] font-semibold text-gray-700 mb-1">
              Product Type
            </label>
            <div className="relative">
              <select
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                className="h-[34px] min-w-[100px] pl-3 pr-7 border border-[#d2d6de] rounded-[3px] bg-white text-[13px] text-gray-700 appearance-none focus:outline-none focus:border-[#3c8dbc] cursor-pointer"
              >
                <option value="All">All</option>
                <option value="Physical">Physical</option>
                <option value="Digital">Digital</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-[12px] font-semibold text-gray-700 mb-1">
              Category
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-[34px] min-w-[110px] pl-3 pr-7 border border-[#d2d6de] rounded-[3px] bg-white text-[13px] text-gray-700 appearance-none focus:outline-none focus:border-[#3c8dbc] cursor-pointer"
              >
                {DEFAULT_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Subcategory */}
          <div>
            <label className="block text-[12px] font-semibold text-gray-700 mb-1">
              Subcategory
            </label>
            <div className="relative">
              <select
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                className="h-[34px] min-w-[110px] pl-3 pr-7 border border-[#d2d6de] rounded-[3px] bg-white text-[13px] text-gray-700 appearance-none focus:outline-none focus:border-[#3c8dbc] cursor-pointer"
              >
                {DEFAULT_CATEGORIES.map((cat) => (
                  <option key={`sub-${cat}`} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Stock */}
          <div>
            <label className="block text-[12px] font-semibold text-gray-700 mb-1">
              Stock
            </label>
            <div className="relative">
              <select
                value={stockStatus}
                onChange={(e) => setStockStatus(e.target.value)}
                className="h-[34px] min-w-[90px] pl-3 pr-7 border border-[#d2d6de] rounded-[3px] bg-white text-[13px] text-gray-700 appearance-none focus:outline-none focus:border-[#3c8dbc] cursor-pointer"
              >
                <option value="All">All</option>
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Search */}
          <div>
            <label className="block text-[12px] font-semibold text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#3c8dbc] w-[160px]"
            />
          </div>

          {/* Filter Button (Modesy Purple #605ca8) */}
          <button
            type="submit"
            className="h-[34px] px-4 bg-[#605ca8] hover:bg-[#504d8c] text-white text-[13px] rounded-[3px] font-normal transition-colors cursor-pointer shadow-xs"
          >
            Filter
          </button>

          {/* Export Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsExportOpen(!isExportOpen);
              }}
              className="h-[34px] px-3.5 border border-[#d2d6de] bg-white hover:bg-gray-50 text-gray-700 text-[13px] rounded-[3px] flex items-center space-x-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <span>Export</span>
              <span className="inline-block w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-t-[4px] border-t-gray-600 ml-1"></span>
            </button>

            {isExportOpen && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute left-0 mt-1 w-36 bg-white border border-gray-200 rounded-[3px] shadow-lg z-30 py-1 text-[13px]"
              >
                <button
                  type="button"
                  onClick={() => handleExport("csv")}
                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-[#f4f4f4] flex items-center space-x-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-gray-400" />
                  <span>CSV</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleExport("excel")}
                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-[#f4f4f4] flex items-center space-x-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-gray-400" />
                  <span>Excel</span>
                </button>
              </div>
            )}
          </div>
        </form>

        {/* Products Table with 1-frame layout */}
        <div className="w-full overflow-hidden min-h-[300px]">
          <table className="w-full text-left text-[12.5px] border-collapse table-fixed">
            <thead>
              <tr className="border-b-2 border-gray-200 text-[#333333] font-semibold text-[12px]">
                <th className="py-2.5 px-2 text-left w-7">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    disabled={currentRows.length === 0}
                    className="w-3.5 h-3.5 rounded border-gray-300 text-[#3c8dbc] focus:ring-0 cursor-pointer disabled:opacity-50"
                  />
                </th>
                <th className="py-2.5 px-1.5 text-left w-10">Id</th>
                <th
                  className={`py-2.5 px-2 text-left ${
                    hasStatusColumn ? "w-[20%]" : "w-[24%]"
                  }`}
                >
                  Product
                </th>
                <th className="py-2.5 px-2 text-left w-[9%]">Product Type</th>
                <th className="py-2.5 px-2 text-left w-[11%]">Category</th>
                <th className="py-2.5 px-2 text-left w-[9%]">User</th>
                <th className="py-2.5 px-2 text-left w-[8%]">Price</th>
                <th className="py-2.5 px-2 text-left w-[8%]">Stock</th>
                {hasStatusColumn && (
                  <th className="py-2.5 px-1.5 text-left w-[7%]">Status</th>
                )}
                <th className="py-2.5 px-1.5 text-left w-[6%]">Page Views</th>
                <th className="py-2.5 px-1.5 text-left w-[7%]">Updated</th>
                <th className="py-2.5 px-2 text-left w-[9%]">Date</th>
                <th className="py-2.5 px-2 text-right w-[115px]">Options</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={totalCols}
                    className="py-16 text-center text-gray-500 text-[13.5px] select-none"
                  >
                    No records found!
                  </td>
                </tr>
              ) : (
                currentRows.map((product) => {
                  const isChecked = selectedIds.includes(product.id);
                  return (
                    <tr
                      key={product.id}
                      className={`border-b border-[#f4f4f4] hover:bg-gray-50/70 transition-colors text-[12.5px] ${
                        isChecked ? "bg-[#fcf8e3]/40" : ""
                      }`}
                    >
                      <td className="py-2.5 px-2 align-middle">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleSelectRow(product.id)}
                          className="w-3.5 h-3.5 rounded border-gray-300 text-[#3c8dbc] focus:ring-0 cursor-pointer"
                        />
                      </td>
                      <td className="py-2.5 px-1.5 text-gray-600 font-normal align-middle truncate">
                        {product.id}
                      </td>
                      <td className="py-2 px-2 align-middle">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={product.imageUrl}
                            alt={product.title}
                            className="w-10 h-10 object-cover rounded-[3px] border border-gray-200 shrink-0"
                          />
                          <div className="flex flex-col min-w-0 flex-1">
                            <span
                              onClick={() => setSelectedProduct(product)}
                              className="text-gray-800 hover:text-[#3c8dbc] font-normal cursor-pointer leading-snug line-clamp-2 text-[12px]"
                              title={product.title}
                            >
                              {product.title}
                            </span>
                            <span className="text-[10.5px] text-gray-500 font-normal truncate">
                              SKU: {product.sku}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-2.5 px-2 text-gray-700 align-middle truncate">
                        {product.productType}
                      </td>
                      <td className="py-2.5 px-2 text-gray-700 align-middle truncate">
                        {product.category}
                      </td>
                      <td className="py-2.5 px-2 align-middle truncate">
                        <Link
                          href={`/profile/${product.userSlug}`}
                          className="text-gray-700 hover:text-[#3c8dbc] transition-colors truncate block"
                          title={product.user}
                        >
                          {product.user}
                        </Link>
                      </td>
                      <td className="py-2.5 px-2 text-gray-800 font-normal align-middle truncate">
                        {product.price}
                      </td>
                      <td className="py-2.5 px-2 text-[#00a65a] font-normal align-middle truncate">
                        {product.stock}
                      </td>
                      {hasStatusColumn && (
                        <td className="py-2.5 px-1.5 text-gray-700 align-middle truncate">
                          {product.status || "-"}
                        </td>
                      )}
                      <td className="py-2.5 px-1.5 text-gray-600 align-middle truncate">
                        {product.pageViews}
                      </td>
                      <td className="py-2.5 px-1.5 text-gray-500 text-[11.5px] align-middle truncate">
                        {product.updated}
                      </td>
                      <td className="py-2.5 px-2 text-gray-500 text-[11.5px] align-middle truncate">
                        {product.date}
                      </td>
                      <td className="py-2.5 px-2 align-middle text-right relative">
                        <div className="relative inline-block text-left">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveDropdownId(
                                activeDropdownId === product.id
                                  ? null
                                  : product.id
                              );
                            }}
                            className="bg-[#605ca8] hover:bg-[#504d8c] text-white text-[11.5px] px-2.5 py-1.5 rounded-[3px] flex items-center space-x-1 transition-colors cursor-pointer shadow-xs whitespace-nowrap"
                          >
                            <span>Select an option</span>
                            <span className="inline-block w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-t-[4px] border-t-white ml-0.5"></span>
                          </button>

                          {activeDropdownId === product.id && (
                            <div
                              onClick={(e) => e.stopPropagation()}
                              className="absolute right-0 mt-1 w-44 bg-white border border-gray-200 rounded-[3px] shadow-lg z-30 py-1 text-[12.5px] text-left"
                            >
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedProduct(product);
                                  setActiveDropdownId(null);
                                }}
                                className="w-full px-3.5 py-1.5 text-left text-gray-700 hover:bg-[#f4f4f4] flex items-center space-x-2 cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5 text-gray-500" />
                                <span>View Details</span>
                              </button>
                              <Link
                                href={`/product/${product.slug}`}
                                target="_blank"
                                className="w-full px-3.5 py-1.5 text-left text-gray-700 hover:bg-[#f4f4f4] flex items-center space-x-2 cursor-pointer"
                              >
                                <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
                                <span>View in Site</span>
                              </Link>
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveDropdownId(null);
                                  handleDeleteProduct(product.id);
                                }}
                                className="w-full px-3.5 py-1.5 text-left text-red-600 hover:bg-[#f4f4f4] flex items-center space-x-2 border-t border-gray-100 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5 text-red-600" />
                                <span>Delete</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer controls when rows exist */}
        {currentRows.length > 0 && (
          <div className="mt-5 pt-4 border-t border-[#f4f4f4] flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <select
                value={bulkAction}
                onChange={(e) => setBulkAction(e.target.value)}
                className="h-[34px] px-3 border border-[#d2d6de] rounded-[3px] bg-white text-[13px] text-gray-700 appearance-none focus:outline-none focus:border-[#3c8dbc] cursor-pointer"
              >
                <option value="">Select an option</option>
                <option value="delete">Delete Selected</option>
              </select>
              <button
                type="button"
                onClick={handleApplyBulk}
                className="h-[34px] px-4 bg-[#605ca8] hover:bg-[#504d8c] text-white text-[13px] rounded-[3px] font-normal transition-colors cursor-pointer shadow-xs"
              >
                Submit
              </button>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="h-[32px] min-w-[32px] px-2.5 text-[13px] border rounded-[3px] border-[#d2d6de] text-gray-400 bg-gray-50 cursor-not-allowed"
              >
                «
              </button>
              <button
                key={1}
                className="h-[32px] min-w-[32px] px-2.5 text-[13px] border rounded-[3px] font-medium bg-[#337ab7] border-[#337ab7] text-white"
              >
                1
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="h-[32px] min-w-[32px] px-2.5 text-[13px] border rounded-[3px] border-[#d2d6de] text-gray-400 bg-gray-50 cursor-not-allowed"
              >
                »
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white rounded-[4px] shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-300 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#605ca8] text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <span>Product #{selectedProduct.id} Details</span>
              </h3>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 max-h-[75vh] overflow-y-auto space-y-4">
              <div className="flex items-start gap-4">
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.title}
                  className="w-24 h-24 object-cover rounded border border-gray-200"
                />
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 text-lg">
                    {selectedProduct.title}
                  </h4>
                  <p className="text-sm text-gray-500 font-mono mt-0.5">
                    SKU: {selectedProduct.sku}
                  </p>
                  <p className="text-xl font-bold text-[#3c8dbc] mt-2">
                    {selectedProduct.price}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 text-[13px] rounded-[3px] font-medium transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
