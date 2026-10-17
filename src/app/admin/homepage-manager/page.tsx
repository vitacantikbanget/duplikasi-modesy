"use client";

import { useState, useRef, useEffect } from "react";
import {
  Check,
  ChevronDown,
  ChevronRight,
  ChevronsUpDown,
  Edit,
  Trash2,
  Plus,
  LayoutGrid,
  X,
} from "lucide-react";

interface CategoryNode {
  id: number;
  name: string;
  children?: CategoryNode[];
}

interface CategoryItem {
  id: number;
  name: string;
  order: number;
  hasGridIcon?: boolean;
}

interface BannerItem {
  id: number;
  image: string;
  url: string;
  language: string;
  order: number;
  width: string;
  location: string;
}

const CATEGORY_TREE: CategoryNode[] = [
  {
    id: 1,
    name: "Clothing",
    children: [
      { id: 7, name: "Women's Clothing" },
      { id: 8, name: "Men's Clothing" },
    ],
  },
  {
    id: 6,
    name: "Graphics & Photos",
    children: [{ id: 9, name: "Graphics" }],
  },
  {
    id: 3,
    name: "Home & Living",
    children: [
      { id: 10, name: "Furniture" },
      { id: 11, name: "Painting" },
      {
        id: 12,
        name: "Home Decor",
        children: [{ id: 13, name: "Decorative Pillows" }],
      },
    ],
  },
  {
    id: 4,
    name: "Jewelry & Accessories",
    children: [
      { id: 14, name: "Necklaces & Accessories" },
      {
        id: 15,
        name: "Bags & Purses",
        children: [{ id: 16, name: "Handbags" }],
      },
    ],
  },
  {
    id: 2,
    name: "Shoes",
    children: [
      {
        id: 17,
        name: "Women's Shoes",
        children: [{ id: 18, name: "Boots" }],
      },
    ],
  },
  {
    id: 5,
    name: "Toys & Entertainment",
  },
];

const INITIAL_FEATURED_CATEGORIES: CategoryItem[] = [
  { id: 1, name: "Clothing", order: 1 },
  { id: 2, name: "Home & Living", order: 1 },
  { id: 3, name: "Toys & Entertainment", order: 1 },
  { id: 4, name: "Clothing / Women's Clothing", order: 1 },
  { id: 5, name: "Clothing / Men's Clothing", order: 1 },
  { id: 6, name: "Home & Living / Furniture", order: 1 },
  { id: 7, name: "Jewelry & Accessories / Necklaces & Accessories", order: 1 },
  { id: 8, name: "Graphics & Photos / Graphics", order: 1 },
  { id: 9, name: "Home & Living / Painting", order: 1 },
  { id: 10, name: "Shoes / Women's Shoes / Boots", order: 1 },
  { id: 11, name: "Home & Living / Home Decor / Decorative Pillows", order: 1 },
  { id: 12, name: "Jewelry & Accessories / Bags & Purses / Handbags", order: 1 },
];

const INITIAL_PRODUCTS_BY_CATEGORY: CategoryItem[] = [
  { id: 1, name: "Clothing", order: 1, hasGridIcon: true },
  { id: 2, name: "Jewelry & Accessories", order: 2, hasGridIcon: true },
];

const INITIAL_BANNERS: BannerItem[] = [
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80",
    url: "https://modesy.codingest.net/shoes",
    language: "English",
    order: 2,
    width: "33.33%",
    location: "New Arrivals",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80",
    url: "https://modesy.codingest.net/clothing/womens-clothing",
    language: "English",
    order: 3,
    width: "33.33%",
    location: "New Arrivals",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80",
    url: "https://modesy.codingest.net/home-living",
    language: "English",
    order: 1,
    width: "33.33%",
    location: "New Arrivals",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?w=600&auto=format&fit=crop&q=80",
    url: "https://modesy.codingest.net/jewelry-accessories",
    language: "English",
    order: 2,
    width: "50%",
    location: "Special Offers",
  },
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=600&auto=format&fit=crop&q=80",
    url: "https://modesy.codingest.net/clothing",
    language: "English",
    order: 1,
    width: "50%",
    location: "Special Offers",
  },
];

// Custom Category Select Dropdown with Search, None option, and hierarchical expand
function CategorySelectDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [expandedIds, setExpandedIds] = useState<Record<number, boolean>>({});
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close when clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when opening
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    } else {
      setSearch("");
    }
  }, [isOpen]);

  const toggleExpand = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelect = (categoryPath: string) => {
    onChange(categoryPath);
    setIsOpen(false);
  };

  const handleSelectNone = () => {
    onChange("");
    setIsOpen(false);
  };

  // Helper to render tree nodes
  const renderNodes = (nodes: CategoryNode[], parentPath = "") => {
    return nodes
      .filter((node) => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        const full = `${parentPath ? parentPath + " / " : ""}${node.name} #${node.id}`.toLowerCase();
        return (
          full.includes(q) ||
          (node.children &&
            node.children.some((c) =>
              `${c.name} #${c.id}`.toLowerCase().includes(q)
            ))
        );
      })
      .map((node) => {
        const fullPath = parentPath ? `${parentPath} / ${node.name}` : node.name;
        const hasChildren = node.children && node.children.length > 0;
        const isExpanded = search.trim() ? true : !!expandedIds[node.id];

        return (
          <div key={node.id} className="text-[13px]">
            <div
              onClick={() => handleSelect(fullPath)}
              className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 transition-colors group select-none"
            >
              {hasChildren ? (
                <button
                  type="button"
                  onClick={(e) => toggleExpand(node.id, e)}
                  className="mr-2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  <ChevronRight
                    className={`w-3.5 h-3.5 transition-transform duration-150 ${
                      isExpanded ? "rotate-90 text-gray-700" : ""
                    }`}
                  />
                </button>
              ) : (
                <span className="w-3.5 mr-2" />
              )}
              <span className="group-hover:text-black">
                {node.name} <span className="text-gray-400">· #{node.id}</span>
              </span>
            </div>

            {hasChildren && isExpanded && (
              <div className="pl-5 border-l border-gray-100 ml-4">
                {renderNodes(node.children!, fullPath)}
              </div>
            )}
          </div>
        );
      });
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Trigger Box */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-[34px] px-3 bg-white border rounded-[3px] flex items-center justify-between cursor-pointer select-none text-[13.5px] transition-colors ${
          isOpen ? "border-[#0088cc] ring-1 ring-[#0088cc]/30" : "border-[#d2d6de] hover:border-gray-400"
        }`}
      >
        <span className={value ? "text-gray-800" : "text-gray-500"}>
          {value || "Select Category"}
        </span>
        <ChevronDown className="w-4 h-4 text-gray-600" />
      </div>

      {/* Dropdown Popover */}
      {isOpen && (
        <div className="absolute top-[38px] left-0 right-0 bg-white border border-[#0088cc] rounded-[3px] shadow-lg z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
          {/* Search Box */}
          <div className="p-2.5 border-b border-gray-100 bg-white">
            <input
              ref={searchInputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="w-full h-[32px] px-3 border border-[#0088cc] rounded-[3px] text-[13px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0088cc]"
            />
          </div>

          {/* None Option */}
          <div
            onClick={handleSelectNone}
            className="bg-[#eef2f5] hover:bg-[#e2e6ea] px-4 py-2 text-center text-[13px] font-semibold text-[#333333] cursor-pointer select-none transition-colors border-b border-gray-200"
          >
            None
          </div>

          {/* Categories List */}
          <div className="max-h-[260px] overflow-y-auto py-1 divide-y divide-gray-50 scrollbar-thin scrollbar-thumb-gray-300">
            {renderNodes(CATEGORY_TREE)}
          </div>
        </div>
      )}
    </div>
  );
}

export default function HomepageManagerPage() {
  // Lists
  const [featuredCategories, setFeaturedCategories] = useState<CategoryItem[]>(INITIAL_FEATURED_CATEGORIES);
  const [productsByCategory, setProductsByCategory] = useState<CategoryItem[]>(INITIAL_PRODUCTS_BY_CATEGORY);
  const [banners, setBanners] = useState<BannerItem[]>(INITIAL_BANNERS);

  // Forms
  const [selectedFeaturedCat, setSelectedFeaturedCat] = useState("");
  const [selectedProductCat, setSelectedProductCat] = useState("");
  const [showSubcategories, setShowSubcategories] = useState(false);

  // Settings State (Screenshot 4)
  const [featuredCategoriesStatus, setFeaturedCategoriesStatus] = useState<"show" | "hide">("show");
  const [featuredProductsStatus, setFeaturedProductsStatus] = useState<"show" | "hide">("show");
  const [latestProductsStatus, setLatestProductsStatus] = useState<"show" | "hide">("show");
  const [blogSliderStatus, setBlogSliderStatus] = useState<"show" | "hide">("show");
  const [productsPerRow, setProductsPerRow] = useState<5 | 6>(6);
  const [featuredProductsCount, setFeaturedProductsCount] = useState<number>(12);
  const [latestProductsCount, setLatestProductsCount] = useState<number>(12);

  // Banner Modal
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<BannerItem | null>(null);
  const [modalUrl, setModalUrl] = useState("");
  const [modalLanguage, setModalLanguage] = useState("English");
  const [modalOrder, setModalOrder] = useState(1);
  const [modalWidth, setModalWidth] = useState("33.33%");
  const [modalLocation, setModalLocation] = useState("New Arrivals");
  const [modalImage, setModalImage] = useState("");

  // Notification Toast
  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Handlers for Featured Categories
  const handleAddFeaturedCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFeaturedCat) return;
    const newItem: CategoryItem = {
      id: Date.now(),
      name: selectedFeaturedCat,
      order: 1,
    };
    setFeaturedCategories([...featuredCategories, newItem]);
    setSelectedFeaturedCat("");
    showToast("Category added to featured categories!");
  };

  const handleDeleteFeaturedCategory = (id: number) => {
    setFeaturedCategories(featuredCategories.filter((c) => c.id !== id));
    showToast("Category removed from featured categories!");
  };

  // Handlers for Products by Category
  const handleAddProductCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductCat) return;
    const newItem: CategoryItem = {
      id: Date.now(),
      name: selectedProductCat,
      order: productsByCategory.length + 1,
      hasGridIcon: true,
    };
    setProductsByCategory([...productsByCategory, newItem]);
    setSelectedProductCat("");
    showToast("Category added to products by category!");
  };

  const handleDeleteProductCategory = (id: number) => {
    setProductsByCategory(productsByCategory.filter((c) => c.id !== id));
    showToast("Category removed!");
  };

  // Banner Handlers
  const handleOpenAddBanner = () => {
    setEditingBanner(null);
    setModalUrl("");
    setModalLanguage("English");
    setModalOrder(1);
    setModalWidth("33.33%");
    setModalLocation("New Arrivals");
    setModalImage(
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80"
    );
    setIsBannerModalOpen(true);
  };

  const handleOpenEditBanner = (item: BannerItem) => {
    setEditingBanner(item);
    setModalUrl(item.url);
    setModalLanguage(item.language);
    setModalOrder(item.order);
    setModalWidth(item.width);
    setModalLocation(item.location);
    setModalImage(item.image);
    setIsBannerModalOpen(true);
  };

  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBanner) {
      setBanners(
        banners.map((b) =>
          b.id === editingBanner.id
            ? {
                ...b,
                url: modalUrl,
                language: modalLanguage,
                order: modalOrder,
                width: modalWidth,
                location: modalLocation,
                image: modalImage,
              }
            : b
        )
      );
      showToast("Banner updated successfully!");
    } else {
      const newBanner: BannerItem = {
        id: banners.length > 0 ? Math.max(...banners.map((b) => b.id)) + 1 : 1,
        url: modalUrl || "https://modesy.codingest.net",
        language: modalLanguage,
        order: modalOrder,
        width: modalWidth,
        location: modalLocation,
        image: modalImage,
      };
      setBanners([newBanner, ...banners]);
      showToast("Banner added successfully!");
    }
    setIsBannerModalOpen(false);
  };

  const handleDeleteBanner = (id: number) => {
    setBanners(banners.filter((b) => b.id !== id));
    showToast("Banner deleted successfully!");
  };

  const handleSaveSettings = () => {
    showToast("Homepage settings saved successfully!");
  };

  return (
    <div className="w-full text-[#333333] min-w-[1080px] pb-12">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-6 z-50 bg-[#00a65a] text-white px-5 py-3 rounded shadow-lg text-[14px] flex items-center space-x-2 animate-in fade-in slide-in-from-top-2">
          <Check className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Page Title */}
      <div className="mb-4">
        <h1 className="text-[24px] font-normal text-[#333333]">Homepage Manager</h1>
      </div>

      {/* TOP SECTION: 2 Columns Side-by-Side */}
      <div className="grid grid-cols-2 gap-6 items-start mb-6">
        {/* Left Card: Featured Categories */}
        <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border border-[#d2d6de]/60 overflow-visible">
          <div className="px-5 py-3.5 border-b border-[#f4f4f4]">
            <h2 className="text-[17px] font-normal text-[#333333]">Featured Categories</h2>
            <p className="text-[12px] text-gray-500 mt-0.5">
              Select the categories you want to show under the slider
            </p>
          </div>

          <div className="p-5">
            <form onSubmit={handleAddFeaturedCategory} className="mb-5">
              <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">
                Category
              </label>
              
              {/* Custom Category Dropdown */}
              <div className="mb-3">
                <CategorySelectDropdown
                  value={selectedFeaturedCat}
                  onChange={(val) => setSelectedFeaturedCat(val)}
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[#0088cc] hover:bg-[#0077b3] text-white text-[13.5px] px-4 py-2 rounded-[3px] font-normal transition-colors shadow-xs cursor-pointer"
                >
                  Select Category
                </button>
              </div>
            </form>

            {/* List of Featured Categories */}
            <div className="border-t border-[#f4f4f4] pt-2">
              <div className="divide-y divide-[#f4f4f4] max-h-[460px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300">
                {featuredCategories.map((item) => (
                  <div
                    key={item.id}
                    className="py-2.5 flex items-center justify-between hover:bg-gray-50/60 px-2 transition-colors rounded-[2px]"
                  >
                    <span className="text-[13.5px] text-gray-700">{item.name}</span>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        defaultValue={item.order}
                        className="w-12 h-[30px] border border-[#d2d6de] rounded-[3px] text-center text-[13px] text-gray-700 focus:outline-none focus:border-[#3c8dbc]"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteFeaturedCategory(item.id)}
                        className="h-[30px] px-3 border border-[#d2d6de] hover:border-red-400 hover:text-red-600 rounded-[3px] text-[12px] text-gray-600 transition-colors cursor-pointer bg-white"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Products by Category */}
        <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border border-[#d2d6de]/60 overflow-visible">
          <div className="px-5 py-3.5 border-b border-[#f4f4f4]">
            <h2 className="text-[17px] font-normal text-[#333333]">Products by Category</h2>
            <p className="text-[12px] text-gray-500 mt-0.5">
              Show products by categories on the homepage
            </p>
          </div>

          <div className="p-5">
            <form onSubmit={handleAddProductCategory} className="mb-5">
              <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">
                Category
              </label>

              {/* Custom Category Dropdown */}
              <div className="mb-3">
                <CategorySelectDropdown
                  value={selectedProductCat}
                  onChange={(val) => setSelectedProductCat(val)}
                />
              </div>

              {/* Show subcategory products checkbox */}
              <div className="flex items-center space-x-2 mb-4">
                <input
                  type="checkbox"
                  id="showSub"
                  checked={showSubcategories}
                  onChange={(e) => setShowSubcategories(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[#0088cc] focus:ring-0 cursor-pointer"
                />
                <label htmlFor="showSub" className="text-[13.5px] text-gray-700 cursor-pointer select-none">
                  Show subcategory products
                </label>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[#0088cc] hover:bg-[#0077b3] text-white text-[13.5px] px-4 py-2 rounded-[3px] font-normal transition-colors shadow-xs cursor-pointer"
                >
                  Select Category
                </button>
              </div>
            </form>

            {/* List of Products by Category */}
            <div className="border-t border-[#f4f4f4] pt-2">
              <div className="divide-y divide-[#f4f4f4]">
                {productsByCategory.map((item) => (
                  <div
                    key={item.id}
                    className="py-2.5 flex items-center justify-between hover:bg-gray-50/60 px-2 transition-colors rounded-[2px]"
                  >
                    <span className="text-[13.5px] text-gray-700">{item.name}</span>
                    <div className="flex items-center space-x-2">
                      {item.hasGridIcon && (
                        <div className="w-[30px] h-[30px] bg-[#00c0ef] text-white rounded-[2px] flex items-center justify-center">
                          <LayoutGrid className="w-4 h-4" />
                        </div>
                      )}
                      <input
                        type="number"
                        defaultValue={item.order}
                        className="w-12 h-[30px] border border-[#d2d6de] rounded-[3px] text-center text-[13px] text-gray-700 focus:outline-none focus:border-[#3c8dbc]"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteProductCategory(item.id)}
                        className="h-[30px] px-3 border border-[#d2d6de] hover:border-red-400 hover:text-red-600 rounded-[3px] text-[12px] text-gray-600 transition-colors cursor-pointer bg-white"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MIDDLE SECTION: Homepage Banners (Screenshots 2 & 3) */}
      <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border border-[#d2d6de]/60 overflow-hidden mb-6">
        <div className="px-5 py-3.5 border-b border-[#f4f4f4] flex items-center justify-between">
          <div>
            <h2 className="text-[17px] font-normal text-[#333333]">Homepage Banners</h2>
            <p className="text-[12px] text-gray-500 mt-0.5">
              You can manage the product banners on the homepage from this section
            </p>
          </div>
          <button
            type="button"
            onClick={handleOpenAddBanner}
            className="bg-[#00a65a] hover:bg-[#008d4c] text-white text-[13px] px-3.5 py-1.5 rounded-[3px] font-medium transition-colors shadow-xs flex items-center space-x-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Add Banner</span>
          </button>
        </div>

        <div className="p-5">
          <div className="overflow-x-auto min-h-[220px]">
            <table className="w-full text-left text-[13.5px] border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200 text-[#333] font-semibold text-[13px]">
                  <th className="py-2.5 px-3 text-left w-14 cursor-pointer select-none">
                    <div className="flex items-center space-x-1">
                      <span>Id</span>
                      <ChevronsUpDown className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                  </th>
                  <th className="py-2.5 px-3 text-left cursor-pointer select-none">
                    <div className="flex items-center space-x-1">
                      <span>Banner</span>
                      <ChevronsUpDown className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                  </th>
                  <th className="py-2.5 px-3 text-left">URL</th>
                  <th className="py-2.5 px-3 text-left cursor-pointer select-none">
                    <div className="flex items-center space-x-1">
                      <span>Language</span>
                      <ChevronsUpDown className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                  </th>
                  <th className="py-2.5 px-3 text-left cursor-pointer select-none">
                    <div className="flex items-center space-x-1">
                      <span>Order</span>
                      <ChevronsUpDown className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                  </th>
                  <th className="py-2.5 px-3 text-left cursor-pointer select-none">
                    <div className="flex items-center space-x-1">
                      <span>Banner Width</span>
                      <ChevronsUpDown className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                  </th>
                  <th className="py-2.5 px-3 text-left cursor-pointer select-none">
                    <div className="flex items-center space-x-1">
                      <span>Location</span>
                      <ChevronsUpDown className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                  </th>
                  <th className="py-2.5 px-3 text-left cursor-pointer select-none">
                    <div className="flex items-center space-x-1">
                      <span>Options</span>
                      <ChevronsUpDown className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {banners.map((b) => (
                  <tr
                    key={b.id}
                    className="border-b border-[#f4f4f4] hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-3 px-3 text-gray-600 font-normal">{b.id}</td>
                    <td className="py-3 px-3">
                      <div className="relative w-[130px] h-[55px] overflow-hidden rounded-[2px] bg-gray-100 border border-gray-200 shadow-2xs">
                        <img
                          src={b.image}
                          alt="Banner"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="py-3 px-3 text-gray-600 max-w-[220px] truncate">
                      {b.url}
                    </td>
                    <td className="py-3 px-3 text-gray-700">{b.language}</td>
                    <td className="py-3 px-3 text-gray-700">{b.order}</td>
                    <td className="py-3 px-3 text-gray-700">{b.width}</td>
                    <td className="py-3 px-3 text-gray-700">{b.location}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center space-x-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenEditBanner(b)}
                          className="h-[28px] px-3 border border-[#d2d6de] hover:bg-gray-50 text-gray-700 text-[12px] rounded-[3px] transition-colors cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteBanner(b.id)}
                          className="w-[28px] h-[28px] flex items-center justify-center border border-[#d2d6de] hover:border-red-400 text-gray-600 hover:text-red-600 rounded-[3px] transition-colors cursor-pointer"
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

          {/* Pagination */}
          <div className="flex justify-end items-center mt-4 pt-3 border-t border-[#f4f4f4]">
            <button className="w-[30px] h-[30px] flex items-center justify-center rounded-[3px] text-white bg-[#0088cc] font-medium text-[12px]">
              1
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: Homepage Settings (Screenshot 4) */}
      <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border border-[#d2d6de]/60 overflow-hidden">
        <div className="p-6 space-y-6 text-[13.5px]">
          {/* Featured Categories */}
          <div>
            <label className="block text-[13px] font-semibold text-[#333333] mb-2">
              Featured Categories
            </label>
            <div className="flex items-center space-x-8">
              <label
                onClick={() => setFeaturedCategoriesStatus("show")}
                className="flex items-center cursor-pointer select-none"
              >
                <div
                  className={`w-[20px] h-[20px] rounded-full flex items-center justify-center mr-2.5 transition-colors ${
                    featuredCategoriesStatus === "show"
                      ? "bg-[#605ca8] text-white"
                      : "border-2 border-gray-300"
                  }`}
                >
                  {featuredCategoriesStatus === "show" && <Check className="w-3 h-3" strokeWidth={3.5} />}
                </div>
                <span className="text-[13.5px] text-gray-700">Show</span>
              </label>

              <label
                onClick={() => setFeaturedCategoriesStatus("hide")}
                className="flex items-center cursor-pointer select-none"
              >
                <div
                  className={`w-[20px] h-[20px] rounded-full flex items-center justify-center mr-2.5 transition-colors ${
                    featuredCategoriesStatus === "hide"
                      ? "bg-[#605ca8] text-white"
                      : "border-2 border-gray-300"
                  }`}
                >
                  {featuredCategoriesStatus === "hide" && <Check className="w-3 h-3" strokeWidth={3.5} />}
                </div>
                <span className="text-[13.5px] text-gray-700">Hide</span>
              </label>
            </div>
          </div>

          {/* Featured Products */}
          <div>
            <label className="block text-[13px] font-semibold text-[#333333] mb-2">
              Featured Products
            </label>
            <div className="flex items-center space-x-8">
              <label
                onClick={() => setFeaturedProductsStatus("show")}
                className="flex items-center cursor-pointer select-none"
              >
                <div
                  className={`w-[20px] h-[20px] rounded-full flex items-center justify-center mr-2.5 transition-colors ${
                    featuredProductsStatus === "show"
                      ? "bg-[#605ca8] text-white"
                      : "border-2 border-gray-300"
                  }`}
                >
                  {featuredProductsStatus === "show" && <Check className="w-3 h-3" strokeWidth={3.5} />}
                </div>
                <span className="text-[13.5px] text-gray-700">Show</span>
              </label>

              <label
                onClick={() => setFeaturedProductsStatus("hide")}
                className="flex items-center cursor-pointer select-none"
              >
                <div
                  className={`w-[20px] h-[20px] rounded-full flex items-center justify-center mr-2.5 transition-colors ${
                    featuredProductsStatus === "hide"
                      ? "bg-[#605ca8] text-white"
                      : "border-2 border-gray-300"
                  }`}
                >
                  {featuredProductsStatus === "hide" && <Check className="w-3 h-3" strokeWidth={3.5} />}
                </div>
                <span className="text-[13.5px] text-gray-700">Hide</span>
              </label>
            </div>
          </div>

          {/* Latest Products */}
          <div>
            <label className="block text-[13px] font-semibold text-[#333333] mb-2">
              Latest Products
            </label>
            <div className="flex items-center space-x-8">
              <label
                onClick={() => setLatestProductsStatus("show")}
                className="flex items-center cursor-pointer select-none"
              >
                <div
                  className={`w-[20px] h-[20px] rounded-full flex items-center justify-center mr-2.5 transition-colors ${
                    latestProductsStatus === "show"
                      ? "bg-[#605ca8] text-white"
                      : "border-2 border-gray-300"
                  }`}
                >
                  {latestProductsStatus === "show" && <Check className="w-3 h-3" strokeWidth={3.5} />}
                </div>
                <span className="text-[13.5px] text-gray-700">Show</span>
              </label>

              <label
                onClick={() => setLatestProductsStatus("hide")}
                className="flex items-center cursor-pointer select-none"
              >
                <div
                  className={`w-[20px] h-[20px] rounded-full flex items-center justify-center mr-2.5 transition-colors ${
                    latestProductsStatus === "hide"
                      ? "bg-[#605ca8] text-white"
                      : "border-2 border-gray-300"
                  }`}
                >
                  {latestProductsStatus === "hide" && <Check className="w-3 h-3" strokeWidth={3.5} />}
                </div>
                <span className="text-[13.5px] text-gray-700">Hide</span>
              </label>
            </div>
          </div>

          {/* Blog Slider */}
          <div>
            <label className="block text-[13px] font-semibold text-[#333333] mb-2">
              Blog Slider
            </label>
            <div className="flex items-center space-x-8">
              <label
                onClick={() => setBlogSliderStatus("show")}
                className="flex items-center cursor-pointer select-none"
              >
                <div
                  className={`w-[20px] h-[20px] rounded-full flex items-center justify-center mr-2.5 transition-colors ${
                    blogSliderStatus === "show"
                      ? "bg-[#605ca8] text-white"
                      : "border-2 border-gray-300"
                  }`}
                >
                  {blogSliderStatus === "show" && <Check className="w-3 h-3" strokeWidth={3.5} />}
                </div>
                <span className="text-[13.5px] text-gray-700">Show</span>
              </label>

              <label
                onClick={() => setBlogSliderStatus("hide")}
                className="flex items-center cursor-pointer select-none"
              >
                <div
                  className={`w-[20px] h-[20px] rounded-full flex items-center justify-center mr-2.5 transition-colors ${
                    blogSliderStatus === "hide"
                      ? "bg-[#605ca8] text-white"
                      : "border-2 border-gray-300"
                  }`}
                >
                  {blogSliderStatus === "hide" && <Check className="w-3 h-3" strokeWidth={3.5} />}
                </div>
                <span className="text-[13.5px] text-gray-700">Hide</span>
              </label>
            </div>
          </div>

          {/* Products per Row on Homepage */}
          <div>
            <label className="block text-[13px] font-semibold text-[#333333] mb-2">
              Products per Row on Homepage
            </label>
            <div className="flex items-center space-x-8">
              <label
                onClick={() => setProductsPerRow(5)}
                className="flex items-center cursor-pointer select-none"
              >
                <div
                  className={`w-[20px] h-[20px] rounded-full flex items-center justify-center mr-2.5 transition-colors ${
                    productsPerRow === 5
                      ? "bg-[#605ca8] text-white"
                      : "border-2 border-gray-300"
                  }`}
                >
                  {productsPerRow === 5 && <Check className="w-3 h-3" strokeWidth={3.5} />}
                </div>
                <span className="text-[13.5px] text-gray-700">5 Products</span>
              </label>

              <label
                onClick={() => setProductsPerRow(6)}
                className="flex items-center cursor-pointer select-none"
              >
                <div
                  className={`w-[20px] h-[20px] rounded-full flex items-center justify-center mr-2.5 transition-colors ${
                    productsPerRow === 6
                      ? "bg-[#605ca8] text-white"
                      : "border-2 border-gray-300"
                  }`}
                >
                  {productsPerRow === 6 && <Check className="w-3 h-3" strokeWidth={3.5} />}
                </div>
                <span className="text-[13.5px] text-gray-700">6 Products</span>
              </label>
            </div>
          </div>

          {/* Number of Featured Products to Show */}
          <div>
            <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">
              Number of Featured Products to Show
            </label>
            <input
              type="number"
              value={featuredProductsCount}
              onChange={(e) => setFeaturedProductsCount(Number(e.target.value))}
              className="w-full sm:w-[350px] h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-gray-700 text-[13.5px] focus:outline-none focus:border-[#3c8dbc]"
            />
          </div>

          {/* Number of Latest Products to Show */}
          <div>
            <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">
              Number of Latest Products to Show
            </label>
            <input
              type="number"
              value={latestProductsCount}
              onChange={(e) => setLatestProductsCount(Number(e.target.value))}
              className="w-full sm:w-[350px] h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-gray-700 text-[13.5px] focus:outline-none focus:border-[#3c8dbc]"
            />
          </div>

          {/* Save Changes Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleSaveSettings}
              className="bg-[#0088cc] hover:bg-[#0077b3] text-white text-[13.5px] px-5 py-2 rounded-[3px] font-normal transition-colors shadow-xs cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* BANNER MODAL (Add / Edit) */}
      {isBannerModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-2xs">
          <div className="bg-white rounded-[4px] shadow-2xl w-full max-w-lg overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-5 py-4 border-b border-[#f4f4f4] flex items-center justify-between">
              <h3 className="text-[17px] font-normal text-[#333333]">
                {editingBanner ? "Edit Banner" : "Add Banner"}
              </h3>
              <button
                onClick={() => setIsBannerModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBanner} className="p-5 space-y-4 text-[13.5px]">
              <div>
                <label className="block text-[13px] font-semibold text-gray-700 mb-1">
                  Banner Image URL
                </label>
                <input
                  type="text"
                  value={modalImage}
                  onChange={(e) => setModalImage(e.target.value)}
                  placeholder="https://..."
                  required
                  className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] focus:outline-none focus:border-[#3c8dbc]"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-gray-700 mb-1">
                  Target URL
                </label>
                <input
                  type="text"
                  value={modalUrl}
                  onChange={(e) => setModalUrl(e.target.value)}
                  placeholder="https://modesy.codingest.net/..."
                  required
                  className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] focus:outline-none focus:border-[#3c8dbc]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-gray-700 mb-1">
                    Language
                  </label>
                  <select
                    value={modalLanguage}
                    onChange={(e) => setModalLanguage(e.target.value)}
                    className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] focus:outline-none focus:border-[#3c8dbc]"
                  >
                    <option value="English">English</option>
                    <option value="Arabic">Arabic</option>
                    <option value="Turkish">Turkish</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-gray-700 mb-1">
                    Order
                  </label>
                  <input
                    type="number"
                    value={modalOrder}
                    onChange={(e) => setModalOrder(Number(e.target.value))}
                    className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] focus:outline-none focus:border-[#3c8dbc]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-gray-700 mb-1">
                    Banner Width
                  </label>
                  <select
                    value={modalWidth}
                    onChange={(e) => setModalWidth(e.target.value)}
                    className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] focus:outline-none focus:border-[#3c8dbc]"
                  >
                    <option value="33.33%">33.33%</option>
                    <option value="50%">50%</option>
                    <option value="100%">100%</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-gray-700 mb-1">
                    Location
                  </label>
                  <select
                    value={modalLocation}
                    onChange={(e) => setModalLocation(e.target.value)}
                    className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] focus:outline-none focus:border-[#3c8dbc]"
                  >
                    <option value="New Arrivals">New Arrivals</option>
                    <option value="Special Offers">Special Offers</option>
                    <option value="Featured Products">Featured Products</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex justify-end space-x-2 border-t border-[#f4f4f4]">
                <button
                  type="button"
                  onClick={() => setIsBannerModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-600 rounded-[3px] text-[13px] hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0088cc] hover:bg-[#0077b3] text-white rounded-[3px] text-[13px] cursor-pointer"
                >
                  Save Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
