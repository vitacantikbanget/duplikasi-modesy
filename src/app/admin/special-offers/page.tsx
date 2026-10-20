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

interface SpecialOfferProduct {
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
  priceNumeric: number;
  stock: string;
  stockCount: number;
  pageViews: number;
  updated: string;
  date: string;
  badges: ProductBadge[];
}

const INITIAL_SPECIAL_OFFERS: SpecialOfferProduct[] = [
  {
    id: 39,
    slug: "animal-prints-39",
    title: "Animal colorful digital prints",
    sku: "A1C2D3P4R5N6",
    imageUrl: "/images/products/animal-prints.webp",
    productType: "Digital",
    category: "Vectors",
    subcategory: "Vectors",
    listingType: "Add Product",
    user: "Trendshop",
    userSlug: "trendshop",
    price: "Rp478,008.45",
    priceNumeric: 478008.45,
    stock: "In Stock",
    stockCount: 1,
    pageViews: 378,
    updated: "3 months ago",
    date: "2026-07-31 / 18:49",
    badges: [{ type: "special_offer" }],
  },
  {
    id: 13,
    slug: "summer-fashion-top-lace-13",
    title: "Summer fashion top lace",
    sku: "HSO1Z10F4",
    imageUrl: "/images/products/summer-top.webp",
    productType: "Physical",
    category: "Dresses",
    subcategory: "Dresses",
    listingType: "Add Product",
    user: "Trendshop",
    userSlug: "trendshop",
    price: "Rp1,071,398.25",
    priceNumeric: 1071398.25,
    stock: "In Stock (500)",
    stockCount: 500,
    pageViews: 377,
    updated: "3 months ago",
    date: "2026-07-31 / 12:16",
    badges: [{ type: "featured" }, { type: "special_offer" }],
  },
  {
    id: 28,
    slug: "women-lace-blouse-28",
    title: "Women lace blouse with different colors",
    sku: "W1L2B3D4C5R6",
    imageUrl: "/images/products/lace-blouse.webp",
    productType: "Physical",
    category: "Dresses",
    subcategory: "Blouses",
    listingType: "Add Product",
    user: "Trendshop",
    userSlug: "trendshop",
    price: "Rp1,137,330.45",
    priceNumeric: 1137330.45,
    stock: "In Stock (800)",
    stockCount: 800,
    pageViews: 283,
    updated: "3 months ago",
    date: "2026-07-31 / 14:54",
    badges: [{ type: "special_offer" }],
  },
  {
    id: 38,
    slug: "floral-sundress-38",
    title: "Floral women sundress",
    sku: "F1W2S3D4R5S6",
    imageUrl: "/images/products/floral-sundress.webp",
    productType: "Physical",
    category: "Dresses",
    subcategory: "Dresses",
    listingType: "Add Product",
    user: "Admin",
    userSlug: "admin",
    price: "Rp1,318,644",
    priceNumeric: 1318644,
    stock: "In Stock (1000)",
    stockCount: 1000,
    pageViews: 454,
    updated: "2 months ago",
    date: "2026-07-31 / 18:29",
    badges: [
      { type: "featured" },
      { type: "special_offer" },
      { type: "discount", value: 15 },
    ],
  },
  {
    id: 7,
    slug: "gucci-smart-backpack-7",
    title: "Gucci nylon fabric smart backpack",
    sku: "H1K1RGO137",
    imageUrl: "/images/products/gucci-backpack.webp",
    productType: "Physical",
    category: "Backpacks",
    subcategory: "Backpacks",
    listingType: "Add Product",
    user: "Admin",
    userSlug: "admin",
    price: "Rp906,567.75",
    priceNumeric: 906567.75,
    stock: "In Stock (997)",
    stockCount: 997,
    pageViews: 196,
    updated: "3 months ago",
    date: "2026-07-31 / 11:13",
    badges: [{ type: "special_offer" }],
  },
  {
    id: 16,
    slug: "black-sneakers-white-sole-16",
    title: "Black sneakers with white sole",
    sku: "B1S2W3S4K5M6",
    imageUrl: "/images/products/black-sneakers.webp",
    productType: "Physical",
    category: "Sneakers",
    subcategory: "Sneakers",
    listingType: "Add Product",
    user: "Admin",
    userSlug: "admin",
    price: "Rp1,137,330.45",
    priceNumeric: 1137330.45,
    stock: "In Stock (500)",
    stockCount: 500,
    pageViews: 223,
    updated: "3 months ago",
    date: "2026-07-31 / 12:56",
    badges: [{ type: "special_offer" }],
  },
  {
    id: 40,
    slug: "kipling-handbag-40",
    title: "Women kipling bailey saddle handbag",
    sku: "W1K2B3S4H5G6",
    imageUrl: "/images/products/kipling-handbag.webp",
    productType: "Physical",
    category: "Handbags",
    subcategory: "Handbags",
    listingType: "Add Product",
    user: "Admin",
    userSlug: "admin",
    price: "Rp972,499.95",
    priceNumeric: 972499.95,
    stock: "In Stock (500)",
    stockCount: 500,
    pageViews: 234,
    updated: "3 months ago",
    date: "2026-07-31 / 18:57",
    badges: [{ type: "featured" }, { type: "special_offer" }],
  },
  {
    id: 42,
    slug: "decorative-pillow-42",
    title: "Handcrafted decorative pillow for a luxurious touch",
    sku: "H1D2P3L4T5X6",
    imageUrl: "/images/products/decorative-pillow.webp",
    productType: "Physical",
    category: "Decorative Pillows",
    subcategory: "Decorative Pillows",
    listingType: "Add Product",
    user: "Admin",
    userSlug: "admin",
    price: "Rp972,499.95",
    priceNumeric: 972499.95,
    stock: "In Stock (492)",
    stockCount: 492,
    pageViews: 270,
    updated: "2 months ago",
    date: "2026-07-31 / 19:16",
    badges: [
      { type: "featured" },
      { type: "special_offer" },
      { type: "discount", value: 10 },
    ],
  },
];

export default function SpecialOffersPage() {
  const [products, setProducts] = useState<SpecialOfferProduct[]>(
    INITIAL_SPECIAL_OFFERS
  );

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
    useState<SpecialOfferProduct | null>(null);
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
  const handleRemoveFromSpecial = (id: number) => {
    const target = products.find((p) => p.id === id);
    if (
      window.confirm(
        `Are you sure you want to remove "${target?.title}" from special offers?`
      )
    ) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setSelectedIds((prev) => prev.filter((item) => item !== id));
      showToast("Product successfully removed from special offers.");
    }
  };

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
    } else if (bulkAction === "remove_special") {
      if (
        window.confirm(
          `Are you sure you want to remove ${selectedIds.length} product(s) from special offers?`
        )
      ) {
        setProducts((prev) =>
          prev.filter((p) => !selectedIds.includes(p.id))
        );
        setSelectedIds([]);
        showToast(
          `${selectedIds.length} products removed from special offers successfully.`
        );
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
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        "Id,Title,SKU,Product Type,Category,User,Price,Stock,Page Views,Updated,Date",
        ...filteredProducts.map(
          (p) =>
            `${p.id},"${p.title}","${p.sku}","${p.productType}","${p.category}","${p.user}","${p.price}","${p.stock}",${p.pageViews},"${p.updated}","${p.date}"`
        ),
      ].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `special_offers_${type}_${Date.now()}.${type === "csv" ? "csv" : "xls"}`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsExportOpen(false);
  };

  // Unique categories for filter dropdown
  const uniqueCategories = Array.from(
    new Set(products.map((p) => p.category))
  ).filter(Boolean);

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
        <h1 className="text-[24px] font-normal text-[#333333]">Special Offers</h1>
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
                <option value="All">All</option>
                {uniqueCategories.map((cat) => (
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
                <option value="All">All</option>
                {uniqueCategories.map((cat) => (
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

        {/* Special Offers Table with responsive horizontal scroll */}
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[950px] text-left text-[12.5px] border-collapse table-fixed">
            <thead>
              <tr className="border-b-2 border-gray-200 text-[#333333] font-semibold text-[12px]">
                <th className="py-2.5 px-2 text-left w-7">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    className="w-3.5 h-3.5 rounded border-gray-300 text-[#3c8dbc] focus:ring-0 cursor-pointer"
                  />
                </th>
                <th className="py-2.5 px-1.5 text-left w-10">Id</th>
                <th className="py-2.5 px-2 text-left w-[24%]">Product</th>
                <th className="py-2.5 px-2 text-left w-[9%]">Product Type</th>
                <th className="py-2.5 px-2 text-left w-[11%]">Category</th>
                <th className="py-2.5 px-2 text-left w-[9%]">User</th>
                <th className="py-2.5 px-2 text-left w-[8%]">Price</th>
                <th className="py-2.5 px-2 text-left w-[8%]">Stock</th>
                <th className="py-2.5 px-1.5 text-left w-[6%]">Page Views</th>
                <th className="py-2.5 px-1.5 text-left w-[7%]">Updated</th>
                <th className="py-2.5 px-2 text-left w-[10%]">Date</th>
                <th className="py-2.5 px-2 text-right w-[115px]">Options</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={12}
                    className="py-12 text-center text-gray-500 text-sm"
                  >
                    No special offer products found.
                  </td>
                </tr>
              ) : (
                currentRows.map((product) => {
                  const isChecked = selectedIds.includes(product.id);
                  const isFeatured = product.badges.some(
                    (b) => b.type === "featured"
                  );
                  const isSpecial = product.badges.some(
                    (b) => b.type === "special_offer"
                  );
                  const discountBadge = product.badges.find(
                    (b) => b.type === "discount"
                  );

                  return (
                    <tr
                      key={product.id}
                      className={`border-b border-[#f4f4f4] hover:bg-gray-50/70 transition-colors text-[12.5px] ${
                        isChecked ? "bg-[#fcf8e3]/40" : ""
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="py-2.5 px-2 align-middle">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleSelectRow(product.id)}
                          className="w-3.5 h-3.5 rounded border-gray-300 text-[#3c8dbc] focus:ring-0 cursor-pointer"
                        />
                      </td>

                      {/* Id */}
                      <td className="py-2.5 px-1.5 text-gray-600 font-normal align-middle text-[12px]">
                        {product.id}
                      </td>

                      {/* Product (Thumb + Title + SKU + Badges) */}
                      <td className="py-2.5 px-2 align-middle">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={product.imageUrl}
                            alt={product.title}
                            className="w-10 h-10 object-cover rounded-[3px] border border-gray-200 shrink-0"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=150&h=150&fit=crop";
                            }}
                          />
                          <div className="flex flex-col min-w-0 flex-1">
                            <span
                              onClick={() => setSelectedProduct(product)}
                              className="text-gray-800 hover:text-[#3c8dbc] font-normal cursor-pointer leading-tight text-[12.5px] line-clamp-2 break-words"
                            >
                              {product.title}
                            </span>
                            <span className="text-[10.5px] text-gray-500 font-normal truncate mt-0.5">
                              SKU: {product.sku}
                            </span>
                            {/* Badges container */}
                            <div className="flex items-center gap-1 mt-1 flex-wrap">
                              {isFeatured && (
                                <span className="inline-block bg-[#00a65a] text-white text-[9.5px] font-semibold px-1.5 py-0.5 rounded-[2px]">
                                  Featured
                                </span>
                              )}
                              {isSpecial && (
                                <span className="inline-block bg-[#00c0ef] text-white text-[9.5px] font-semibold px-1.5 py-0.5 rounded-[2px]">
                                  Special Offer
                                </span>
                              )}
                              {discountBadge && (
                                <span className="inline-flex items-center gap-0.5 bg-[#f39c12] text-white text-[9.5px] font-semibold px-1 py-0.5 rounded-[2px]">
                                  <Tag className="w-2.5 h-2.5" />
                                  {discountBadge.value}%
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Product Type */}
                      <td className="py-2.5 px-2 text-gray-700 align-middle text-[12px] truncate">
                        {product.productType}
                      </td>

                      {/* Category */}
                      <td className="py-2.5 px-2 text-gray-700 align-middle text-[12px] truncate">
                        {product.category}
                      </td>

                      {/* User */}
                      <td className="py-2.5 px-2 align-middle">
                        <Link
                          href={`/profile/${product.userSlug}`}
                          className="text-gray-700 hover:text-[#3c8dbc] transition-colors text-[12px] truncate block"
                        >
                          {product.user}
                        </Link>
                      </td>

                      {/* Price */}
                      <td className="py-2.5 px-2 text-gray-800 font-normal align-middle text-[12px] whitespace-nowrap">
                        {product.price}
                      </td>

                      {/* Stock */}
                      <td className="py-2.5 px-2 text-[#00a65a] font-normal align-middle text-[12px] whitespace-nowrap">
                        {product.stock}
                      </td>

                      {/* Page Views */}
                      <td className="py-2.5 px-1.5 text-gray-600 align-middle text-[12px]">
                        {product.pageViews}
                      </td>

                      {/* Updated */}
                      <td className="py-2.5 px-1.5 text-gray-500 text-[11px] align-middle truncate">
                        {product.updated}
                      </td>

                      {/* Date */}
                      <td className="py-2.5 px-2 text-gray-500 text-[11px] align-middle whitespace-nowrap">
                        <div className="leading-tight">
                          <div>{product.date.split(" / ")[0]}</div>
                          <div className="text-gray-400">/ {product.date.split(" / ")[1]}</div>
                        </div>
                      </td>

                      {/* Options Button with Dropdown (Modesy Purple #605ca8) */}
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
                            className="bg-[#605ca8] hover:bg-[#504d8c] text-white text-[11px] px-2.5 py-1.5 rounded-[3px] flex items-center space-x-1 transition-colors cursor-pointer shadow-xs whitespace-nowrap"
                          >
                            <span>Select an option</span>
                            <span className="inline-block w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-t-[4px] border-t-white ml-0.5"></span>
                          </button>

                          {activeDropdownId === product.id && (
                            <div
                              onClick={(e) => e.stopPropagation()}
                              className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-[3px] shadow-lg z-30 py-1 text-[13px]"
                            >
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedProduct(product);
                                  setActiveDropdownId(null);
                                }}
                                className="w-full px-4 py-1.5 text-left text-gray-700 hover:bg-[#f4f4f4] flex items-center space-x-2 cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5 text-gray-500" />
                                <span>View Details</span>
                              </button>
                              <Link
                                href={`/product/${product.slug}`}
                                target="_blank"
                                className="w-full px-4 py-1.5 text-left text-gray-700 hover:bg-[#f4f4f4] flex items-center space-x-2 cursor-pointer"
                              >
                                <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
                                <span>View in Site</span>
                              </Link>
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveDropdownId(null);
                                  handleRemoveFromSpecial(product.id);
                                }}
                                className="w-full px-4 py-1.5 text-left text-gray-700 hover:bg-[#f4f4f4] flex items-center space-x-2 cursor-pointer"
                              >
                                <X className="w-3.5 h-3.5 text-orange-500" />
                                <span>Remove from Special Offers</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveDropdownId(null);
                                  handleDeleteProduct(product.id);
                                }}
                                className="w-full px-4 py-1.5 text-left text-red-600 hover:bg-[#f4f4f4] flex items-center space-x-2 border-t border-gray-100 cursor-pointer"
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

        {/* Footer / Pagination Controls matching Modesy */}
        <div className="mt-5 pt-4 border-t border-[#f4f4f4] flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Bulk Action Controls */}
          <div className="flex items-center gap-2">
            <select
              value={bulkAction}
              onChange={(e) => setBulkAction(e.target.value)}
              className="h-[34px] px-3 border border-[#d2d6de] rounded-[3px] bg-white text-[13px] text-gray-700 appearance-none focus:outline-none focus:border-[#3c8dbc] cursor-pointer"
            >
              <option value="">Select an option</option>
              <option value="remove_special">Remove from Special Offers</option>
              <option value="delete">Delete Selected</option>
            </select>
            <button
              type="button"
              onClick={handleApplyBulk}
              className="h-[34px] px-4 bg-[#605ca8] hover:bg-[#504d8c] text-white text-[13px] rounded-[3px] font-normal transition-colors cursor-pointer shadow-xs"
            >
              Submit
            </button>
            {selectedIds.length > 0 && (
              <span className="text-[12px] text-gray-500 ml-2">
                ({selectedIds.length} selected)
              </span>
            )}
          </div>

          {/* Pagination */}
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className={`h-[32px] min-w-[32px] px-2.5 text-[13px] border rounded-[3px] flex items-center justify-center transition-colors ${
                currentPage === 1
                  ? "border-[#d2d6de] text-gray-400 bg-gray-50 cursor-not-allowed"
                  : "border-[#d2d6de] text-[#337ab7] bg-white hover:bg-gray-100 cursor-pointer"
              }`}
            >
              «
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`h-[32px] min-w-[32px] px-2.5 text-[13px] border rounded-[3px] flex items-center justify-center transition-colors ${
                currentPage === 1
                  ? "border-[#d2d6de] text-gray-400 bg-gray-50 cursor-not-allowed"
                  : "border-[#d2d6de] text-[#337ab7] bg-white hover:bg-gray-100 cursor-pointer"
              }`}
            >
              &lt;
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
              const isActive = currentPage === pageNum;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`h-[32px] min-w-[32px] px-2.5 text-[13px] border rounded-[3px] font-medium transition-colors cursor-pointer ${
                    isActive
                      ? "bg-[#337ab7] border-[#337ab7] text-white"
                      : "bg-white border-[#d2d6de] text-[#337ab7] hover:bg-gray-100"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`h-[32px] min-w-[32px] px-2.5 text-[13px] border rounded-[3px] flex items-center justify-center transition-colors ${
                currentPage === totalPages
                  ? "border-[#d2d6de] text-gray-400 bg-gray-50 cursor-not-allowed"
                  : "border-[#d2d6de] text-[#337ab7] bg-white hover:bg-gray-100 cursor-pointer"
              }`}
            >
              &gt;
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className={`h-[32px] min-w-[32px] px-2.5 text-[13px] border rounded-[3px] flex items-center justify-center transition-colors ${
                currentPage === totalPages
                  ? "border-[#d2d6de] text-gray-400 bg-gray-50 cursor-not-allowed"
                  : "border-[#d2d6de] text-[#337ab7] bg-white hover:bg-gray-100 cursor-pointer"
              }`}
            >
              »
            </button>
          </div>
        </div>
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
            {/* Modal Header */}
            <div className="bg-[#605ca8] text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <span>Special Offer Product #{selectedProduct.id} Details</span>
              </h3>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 max-h-[75vh] overflow-y-auto space-y-4">
              <div className="flex items-start gap-4">
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.title}
                  className="w-24 h-24 object-cover rounded border border-gray-200"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=150&h=150&fit=crop";
                  }}
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

              <div className="grid grid-cols-2 gap-3 text-[13px] pt-3 border-t border-gray-200">
                <div className="bg-gray-50 p-3 rounded">
                  <span className="text-gray-500 block text-[11px] uppercase font-semibold">
                    Product Type
                  </span>
                  <span className="text-gray-800 font-medium">
                    {selectedProduct.productType}
                  </span>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <span className="text-gray-500 block text-[11px] uppercase font-semibold">
                    Category
                  </span>
                  <span className="text-gray-800 font-medium">
                    {selectedProduct.category}
                  </span>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <span className="text-gray-500 block text-[11px] uppercase font-semibold">
                    User / Vendor
                  </span>
                  <span className="text-gray-800 font-medium">
                    {selectedProduct.user}
                  </span>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <span className="text-gray-500 block text-[11px] uppercase font-semibold">
                    Stock Status
                  </span>
                  <span className="text-[#00a65a] font-medium">
                    {selectedProduct.stock}
                  </span>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <span className="text-gray-500 block text-[11px] uppercase font-semibold">
                    Page Views
                  </span>
                  <span className="text-gray-800 font-medium">
                    {selectedProduct.pageViews}
                  </span>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <span className="text-gray-500 block text-[11px] uppercase font-semibold">
                    Date Created
                  </span>
                  <span className="text-gray-800 font-medium">
                    {selectedProduct.date}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex justify-between items-center">
              <Link
                href={`/product/${selectedProduct.slug}`}
                target="_blank"
                className="text-[#3c8dbc] hover:underline text-[13px] flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in Marketplace</span>
              </Link>
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
