"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Plus,
  Trash2,
  Edit2,
  X,
  Check,
  CheckCircle,
  ChevronDown,
} from "lucide-react";

export interface Brand {
  id: number;
  name: string;
  logo: string;
  categories: string[];
  date: string;
}

const INITIAL_BRANDS: Brand[] = [
  {
    id: 16,
    name: "Dockers",
    logo: "/images/brands/dockers.webp",
    categories: ["Shoes"],
    date: "2026-07-28 / 12:22",
  },
  {
    id: 15,
    name: "Tommy Hilfiger",
    logo: "/images/brands/tommyhilfiger.webp",
    categories: ["Clothing", "Jewelry & Accessories"],
    date: "2026-07-28 / 12:21",
  },
  {
    id: 14,
    name: "U.S. Polo Assn",
    logo: "/images/brands/uspolo.webp",
    categories: ["Clothing", "Shoes", "Jewelry & Accessories"],
    date: "2026-07-28 / 12:21",
  },
  {
    id: 13,
    name: "Puma",
    logo: "/images/brands/puma.webp",
    categories: ["Clothing", "Shoes", "Jewelry & Accessories"],
    date: "2026-07-28 / 12:21",
  },
  {
    id: 12,
    name: "Levi's",
    logo: "/images/brands/levis.webp",
    categories: ["Clothing"],
    date: "2026-07-28 / 12:20",
  },
  {
    id: 11,
    name: "Nike",
    logo: "/images/brands/nike.webp",
    categories: ["Clothing", "Shoes", "Jewelry & Accessories"],
    date: "2026-07-28 / 12:20",
  },
  {
    id: 10,
    name: "Mango",
    logo: "/images/brands/mango.webp",
    categories: ["Clothing", "Jewelry & Accessories"],
    date: "2026-07-28 / 12:19",
  },
  {
    id: 9,
    name: "Lee Cooper",
    logo: "/images/brands/leecooper.webp",
    categories: ["Clothing"],
    date: "2026-07-28 / 12:19",
  },
  {
    id: 8,
    name: "Lacoste",
    logo: "/images/brands/lacoste.webp",
    categories: ["Clothing", "Shoes", "Jewelry & Accessories"],
    date: "2026-07-28 / 12:19",
  },
  {
    id: 7,
    name: "H & M",
    logo: "/images/brands/hm.webp",
    categories: ["Clothing", "Jewelry & Accessories"],
    date: "2026-07-28 / 12:18",
  },
  {
    id: 6,
    name: "Hugo Boss",
    logo: "/images/brands/hugoboss.webp",
    categories: ["Clothing"],
    date: "2026-07-28 / 12:18",
  },
  {
    id: 5,
    name: "Gucci",
    logo: "/images/brands/gucci.webp",
    categories: ["Clothing", "Jewelry & Accessories"],
    date: "2026-07-28 / 12:17",
  },
  {
    id: 4,
    name: "Diesel",
    logo: "/images/brands/diesel.webp",
    categories: ["Clothing", "Shoes"],
    date: "2026-07-28 / 12:16",
  },
  {
    id: 3,
    name: "Burberry",
    logo: "/images/brands/burberry.webp",
    categories: ["Clothing"],
    date: "2026-07-28 / 12:16",
  },
  {
    id: 2,
    name: "Armani",
    logo: "/images/brands/armani.webp",
    categories: ["Clothing", "Shoes", "Jewelry & Accessories"],
    date: "2026-07-28 / 12:16",
  },
  {
    id: 1,
    name: "Adidas",
    logo: "/images/brands/adidas.webp",
    categories: ["Shoes", "Clothing"],
    date: "2026-07-28 / 12:15",
  },
];

const AVAILABLE_CATEGORIES = [
  "Clothing",
  "Shoes",
  "Jewelry & Accessories",
  "Electronics",
  "Home & Living",
  "Kids & Baby",
];

export default function AdminBrandsPage() {
  const [brands, setBrands] = useState<Brand[]>(INITIAL_BRANDS);
  const [showCount, setShowCount] = useState<number>(15);
  const [searchInput, setSearchInput] = useState<string>("");
  const [appliedSearch, setAppliedSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openOptionDropdownId, setOpenOptionDropdownId] = useState<number | null>(null);

  // Settings State
  const [statusSetting, setStatusSetting] = useState<"Enable" | "Disable">("Enable");
  const [optionalSetting, setOptionalSetting] = useState<"Yes" | "No">("Yes");
  const [whereToDisplaySetting, setWhereToDisplaySetting] = useState<
    "Additional Information" | "Product Details"
  >("Additional Information");

  // Notifications
  const [notification, setNotification] = useState<string | null>(null);

  // Add / Edit Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addName, setAddName] = useState("");
  const [addLogo, setAddLogo] = useState("/images/brands/adidas.webp");
  const [addCategories, setAddCategories] = useState<string[]>(["Clothing"]);

  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [editName, setEditName] = useState("");
  const [editLogo, setEditLogo] = useState("");
  const [editCategories, setEditCategories] = useState<string[]>([]);

  // Close dropdown on outside click
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenOptionDropdownId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleApplyFilter = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAppliedSearch(searchInput.trim().toLowerCase());
    setCurrentPage(1);
    setOpenOptionDropdownId(null);
  };

  const filteredBrands = useMemo(() => {
    return brands.filter((item) => {
      if (appliedSearch) {
        const matchName = item.name.toLowerCase().includes(appliedSearch);
        const matchId = item.id.toString().includes(appliedSearch);
        const matchCategory = item.categories.some((c) =>
          c.toLowerCase().includes(appliedSearch)
        );
        if (!matchName && !matchId && !matchCategory) return false;
      }
      return true;
    });
  }, [brands, appliedSearch]);

  const totalPages = Math.ceil(filteredBrands.length / showCount) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedBrands = useMemo(() => {
    const start = (safeCurrentPage - 1) * showCount;
    return filteredBrands.slice(start, start + showCount);
  }, [filteredBrands, safeCurrentPage, showCount]);

  const handleDelete = (id: number, name: string) => {
    if (confirm(`Are you sure you want to delete brand "${name}"?`)) {
      setBrands((prev) => prev.filter((b) => b.id !== id));
      setOpenOptionDropdownId(null);
      setNotification(`Brand "${name}" deleted successfully.`);
      setTimeout(() => setNotification(null), 3500);
    }
  };

  const handleOpenEdit = (brand: Brand) => {
    setEditingBrand(brand);
    setEditName(brand.name);
    setEditLogo(brand.logo);
    setEditCategories([...brand.categories]);
    setOpenOptionDropdownId(null);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBrand || !editName.trim()) return;

    setBrands((prev) =>
      prev.map((b) =>
        b.id === editingBrand.id
          ? {
              ...b,
              name: editName.trim(),
              logo: editLogo.trim() || b.logo,
              categories: editCategories.length > 0 ? editCategories : ["Clothing"],
            }
          : b
      )
    );
    setEditingBrand(null);
    setNotification(`Brand "${editName}" updated successfully.`);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addName.trim()) return;

    const newId = brands.length > 0 ? Math.max(...brands.map((b) => b.id)) + 1 : 1;
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} / ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const newBrand: Brand = {
      id: newId,
      name: addName.trim(),
      logo: addLogo.trim() || "/images/brands/nike.webp",
      categories: addCategories.length > 0 ? addCategories : ["Clothing"],
      date: dateStr,
    };

    setBrands((prev) => [newBrand, ...prev]);
    setIsAddModalOpen(false);
    setAddName("");
    setNotification(`Brand "${newBrand.name}" added successfully.`);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleSaveSettings = () => {
    setNotification("Brand settings updated successfully.");
    setTimeout(() => setNotification(null), 3500);
  };

  const toggleCategorySelection = (
    cat: string,
    current: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (current.includes(cat)) {
      if (current.length > 1) {
        setter(current.filter((c) => c !== cat));
      }
    } else {
      setter([...current, cat]);
    }
  };

  return (
    <div className="w-full text-[#333333] font-sans pb-16">
      {/* Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h1 className="text-[22px] font-normal text-[#333333]">Brands</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#00a65a] hover:bg-[#008d4c] text-white text-[13px] font-medium px-3.5 py-1.5 rounded-[3px] flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Brand</span>
        </button>
      </div>

      {/* Success Notification Alert */}
      {notification && (
        <div className="mb-4 bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-2.5 rounded-[3px] text-sm flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{notification}</span>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="text-xs text-emerald-700 font-semibold hover:underline cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Table Box */}
      <div className="bg-white border border-[#d2d6de] rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.06)] mb-8">
        {/* Filter Bar */}
        <div className="p-4 border-b border-[#f4f4f4] flex flex-wrap items-center gap-4 text-[13px]">
          {/* Show dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-[#333333] font-normal">Show</span>
            <div className="relative">
              <select
                value={showCount}
                onChange={(e) => {
                  setShowCount(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="appearance-none bg-white border border-[#d2d6de] rounded-[3px] h-[32px] pl-3 pr-8 text-[13px] text-[#555] outline-none focus:border-[#5b69bc] cursor-pointer"
              >
                <option value={15}>15</option>
                <option value={30}>30</option>
                <option value={60}>60</option>
                <option value={100}>100</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Search box & Filter Button */}
          <form onSubmit={handleApplyFilter} className="flex items-center gap-2">
            <span className="text-[#333333] font-normal ml-2">Search</span>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder=""
              className="border border-[#d2d6de] rounded-[3px] h-[32px] px-3 w-[180px] text-[13px] text-[#555] outline-none focus:border-[#5b69bc]"
            />
            <button
              type="submit"
              className="bg-[#5b69bc] hover:bg-[#4d5aa3] text-white text-[12px] font-medium h-[32px] px-4 rounded-[3px] transition-colors cursor-pointer"
            >
              Filter
            </button>
          </form>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto" ref={dropdownRef}>
          <table className="w-full min-w-[750px] text-left border-collapse text-[13px]">
            <thead>
              <tr className="border-b border-[#f4f4f4] text-[#333333] font-medium">
                <th className="py-3 px-4 w-[60px] font-semibold">Id</th>
                <th className="py-3 px-4 font-semibold">Name</th>
                <th className="py-3 px-4 font-semibold">Logo</th>
                <th className="py-3 px-4 font-semibold">Categories</th>
                <th className="py-3 px-4 font-semibold">Date</th>
                <th className="py-3 px-4 w-[150px] font-semibold text-right sm:text-left">
                  Options
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedBrands.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">
                    No brands found.
                  </td>
                </tr>
              ) : (
                paginatedBrands.map((brand) => (
                  <tr
                    key={brand.id}
                    className="border-b border-[#f4f4f4] hover:bg-[#f9fafc] transition-colors"
                  >
                    {/* Id */}
                    <td className="py-3.5 px-4 text-[#555] font-normal">
                      {brand.id}
                    </td>

                    {/* Name */}
                    <td className="py-3.5 px-4 font-normal text-[#333333]">
                      {brand.name}
                    </td>

                    {/* Logo */}
                    <td className="py-3.5 px-4">
                      <div className="w-[100px] h-[40px] flex items-center justify-start bg-transparent">
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          className="max-h-[36px] max-w-[90px] object-contain"
                          onError={(e) => {
                            // Fallback if image fails
                            (e.target as HTMLImageElement).src =
                              "/images/brands/nike.webp";
                          }}
                        />
                      </div>
                    </td>

                    {/* Categories */}
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1.5 items-center">
                        {brand.categories.map((cat, idx) => (
                          <span
                            key={idx}
                            className="bg-[#d2d6de]/60 text-[#444] text-[11px] px-2 py-0.5 rounded-[2px] font-normal select-none"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-[#666666] whitespace-nowrap">
                      {brand.date}
                    </td>

                    {/* Options Button */}
                    <td className="py-3.5 px-4 relative">
                      <div className="relative inline-block text-left">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenOptionDropdownId(
                              openOptionDropdownId === brand.id ? null : brand.id
                            )
                          }
                          className="bg-[#5b69bc] hover:bg-[#4d5aa3] text-white text-[12px] font-medium h-[30px] px-3 rounded-[3px] flex items-center gap-2 cursor-pointer transition-colors shadow-xs"
                        >
                          <span>Select an option</span>
                          <span className="text-[9px]">▼</span>
                        </button>

                        {/* Options Menu Dropdown */}
                        {openOptionDropdownId === brand.id && (
                          <div className="absolute right-0 sm:left-0 top-[34px] w-[140px] bg-white border border-[#d2d6de] rounded-[3px] shadow-lg z-30 py-1 text-[12.5px]">
                            <button
                              type="button"
                              onClick={() => handleOpenEdit(brand)}
                              className="w-full text-left px-3.5 py-1.5 text-gray-700 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                            >
                              <Edit2 className="w-3.5 h-3.5 text-blue-600" />
                              <span>Edit</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(brand.id, brand.name)}
                              className="w-full text-left px-3.5 py-1.5 text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-red-600" />
                              <span>Delete</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-[#f4f4f4] flex items-center justify-end">
          <div className="inline-flex rounded-[3px] text-[13px] space-x-1">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className={`min-w-[32px] h-[32px] px-2.5 rounded-[2px] border text-center transition-colors cursor-pointer ${
                currentPage === 1
                  ? "bg-[#3c8dbc] border-[#3c8dbc] text-white font-medium"
                  : "bg-white border-[#d2d6de] text-gray-700 hover:bg-gray-100"
              }`}
            >
              1
            </button>

            {totalPages > 1 && (
              <button
                onClick={() => setCurrentPage(2)}
                className={`min-w-[32px] h-[32px] px-2.5 rounded-[2px] border text-center transition-colors cursor-pointer ${
                  currentPage === 2
                    ? "bg-[#3c8dbc] border-[#3c8dbc] text-white font-medium"
                    : "bg-white border-[#d2d6de] text-gray-700 hover:bg-gray-100"
                }`}
              >
                2
              </button>
            )}

            {totalPages > 2 && (
              <button
                onClick={() => setCurrentPage(3)}
                className={`min-w-[32px] h-[32px] px-2.5 rounded-[2px] border text-center transition-colors cursor-pointer ${
                  currentPage === 3
                    ? "bg-[#3c8dbc] border-[#3c8dbc] text-white font-medium"
                    : "bg-white border-[#d2d6de] text-gray-700 hover:bg-gray-100"
                }`}
              >
                3
              </button>
            )}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="min-w-[32px] h-[32px] px-2.5 rounded-[2px] border border-[#d2d6de] bg-white text-gray-700 hover:bg-gray-100 text-center transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      {/* Settings Card - Exact Replicaton of Screenshot 3 */}
      <div className="bg-white border border-[#d2d6de] rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.06)] p-6 mb-8">
        <h2 className="text-[16px] font-normal text-[#333333] mb-6">Settings</h2>

        <div className="space-y-6 text-[13px]">
          {/* Status Radio Group */}
          <div>
            <label className="block text-[13px] text-[#333333] font-normal mb-2.5">
              Status
            </label>
            <div className="flex items-center gap-12">
              {/* Enable */}
              <label
                onClick={() => setStatusSetting("Enable")}
                className="flex items-center gap-2 cursor-pointer select-none group"
              >
                <div
                  className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center transition-colors ${
                    statusSetting === "Enable"
                      ? "bg-[#5b69bc] border-[#5b69bc] text-white"
                      : "border-[#b0b7c3] bg-white group-hover:border-[#5b69bc]"
                  }`}
                >
                  {statusSetting === "Enable" && (
                    <Check className="w-3 h-3 stroke-[3]" />
                  )}
                </div>
                <span className="text-[#333333] text-[13px]">Enable</span>
              </label>

              {/* Disable */}
              <label
                onClick={() => setStatusSetting("Disable")}
                className="flex items-center gap-2 cursor-pointer select-none group"
              >
                <div
                  className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center transition-colors ${
                    statusSetting === "Disable"
                      ? "bg-[#5b69bc] border-[#5b69bc] text-white"
                      : "border-[#b0b7c3] bg-white group-hover:border-[#5b69bc]"
                  }`}
                >
                  {statusSetting === "Disable" && (
                    <Check className="w-3 h-3 stroke-[3]" />
                  )}
                </div>
                <span className="text-[#333333] text-[13px]">Disable</span>
              </label>
            </div>
          </div>

          {/* Optional Radio Group */}
          <div>
            <label className="block text-[13px] text-[#333333] font-normal mb-2.5">
              Optional
            </label>
            <div className="flex items-center gap-12">
              {/* Yes */}
              <label
                onClick={() => setOptionalSetting("Yes")}
                className="flex items-center gap-2 cursor-pointer select-none group"
              >
                <div
                  className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center transition-colors ${
                    optionalSetting === "Yes"
                      ? "bg-[#5b69bc] border-[#5b69bc] text-white"
                      : "border-[#b0b7c3] bg-white group-hover:border-[#5b69bc]"
                  }`}
                >
                  {optionalSetting === "Yes" && (
                    <Check className="w-3 h-3 stroke-[3]" />
                  )}
                </div>
                <span className="text-[#333333] text-[13px]">Yes</span>
              </label>

              {/* No */}
              <label
                onClick={() => setOptionalSetting("No")}
                className="flex items-center gap-2 cursor-pointer select-none group"
              >
                <div
                  className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center transition-colors ${
                    optionalSetting === "No"
                      ? "bg-[#5b69bc] border-[#5b69bc] text-white"
                      : "border-[#b0b7c3] bg-white group-hover:border-[#5b69bc]"
                  }`}
                >
                  {optionalSetting === "No" && (
                    <Check className="w-3 h-3 stroke-[3]" />
                  )}
                </div>
                <span className="text-[#333333] text-[13px]">No</span>
              </label>
            </div>
          </div>

          {/* Where to Display Radio Group */}
          <div>
            <label className="block text-[13px] text-[#333333] font-normal mb-2.5">
              Where to Display
            </label>
            <div className="flex items-center gap-12">
              {/* Additional Information */}
              <label
                onClick={() => setWhereToDisplaySetting("Additional Information")}
                className="flex items-center gap-2 cursor-pointer select-none group"
              >
                <div
                  className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center transition-colors ${
                    whereToDisplaySetting === "Additional Information"
                      ? "bg-[#5b69bc] border-[#5b69bc] text-white"
                      : "border-[#b0b7c3] bg-white group-hover:border-[#5b69bc]"
                  }`}
                >
                  {whereToDisplaySetting === "Additional Information" && (
                    <Check className="w-3 h-3 stroke-[3]" />
                  )}
                </div>
                <span className="text-[#333333] text-[13px]">
                  Additional Information
                </span>
              </label>

              {/* Product Details */}
              <label
                onClick={() => setWhereToDisplaySetting("Product Details")}
                className="flex items-center gap-2 cursor-pointer select-none group"
              >
                <div
                  className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center transition-colors ${
                    whereToDisplaySetting === "Product Details"
                      ? "bg-[#5b69bc] border-[#5b69bc] text-white"
                      : "border-[#b0b7c3] bg-white group-hover:border-[#5b69bc]"
                  }`}
                >
                  {whereToDisplaySetting === "Product Details" && (
                    <Check className="w-3 h-3 stroke-[3]" />
                  )}
                </div>
                <span className="text-[#333333] text-[13px]">Product Details</span>
              </label>
            </div>
          </div>
        </div>

        {/* Save Changes Button (Right Aligned) */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSaveSettings}
            className="bg-[#0073b7] hover:bg-[#005a91] text-white text-[13px] font-medium px-5 py-2 rounded-[3px] transition-colors cursor-pointer shadow-xs"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Add Brand Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-[3px] shadow-xl border border-[#d2d6de] w-full max-w-[500px] overflow-hidden">
            <div className="px-5 py-3 border-b border-[#f4f4f4] flex items-center justify-between">
              <h3 className="text-[16px] font-normal text-[#333]">Add Brand</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveAdd} className="p-5 space-y-4 text-[13px]">
              <div>
                <label className="block text-[#333] mb-1 font-medium">
                  Brand Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Balenciaga"
                  value={addName}
                  onChange={(e) => setAddName(e.target.value)}
                  className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] outline-none focus:border-[#5b69bc]"
                />
              </div>

              <div>
                <label className="block text-[#333] mb-1 font-medium">
                  Select Existing Logo
                </label>
                <select
                  value={addLogo}
                  onChange={(e) => setAddLogo(e.target.value)}
                  className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] outline-none focus:border-[#5b69bc] cursor-pointer"
                >
                  <option value="/images/brands/nike.webp">Nike Logo</option>
                  <option value="/images/brands/adidas.webp">Adidas Logo</option>
                  <option value="/images/brands/puma.webp">Puma Logo</option>
                  <option value="/images/brands/gucci.webp">Gucci Logo</option>
                  <option value="/images/brands/armani.webp">Armani Logo</option>
                  <option value="/images/brands/levis.webp">Levi's Logo</option>
                  <option value="/images/brands/hm.webp">H&M Logo</option>
                  <option value="/images/brands/burberry.webp">Burberry Logo</option>
                </select>
              </div>

              <div>
                <label className="block text-[#333] mb-1 font-medium">
                  Categories
                </label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {AVAILABLE_CATEGORIES.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-2 cursor-pointer select-none text-[12.5px]"
                    >
                      <input
                        type="checkbox"
                        checked={addCategories.includes(cat)}
                        onChange={() =>
                          toggleCategorySelection(cat, addCategories, setAddCategories)
                        }
                        className="rounded-[2px] text-[#5b69bc] focus:ring-0 cursor-pointer"
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#f4f4f4]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-1.5 border border-[#d2d6de] rounded-[3px] text-[#555] hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#00a65a] hover:bg-[#008d4c] text-white rounded-[3px] font-medium cursor-pointer"
                >
                  Add Brand
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Brand Modal */}
      {editingBrand && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-[3px] shadow-xl border border-[#d2d6de] w-full max-w-[500px] overflow-hidden">
            <div className="px-5 py-3 border-b border-[#f4f4f4] flex items-center justify-between">
              <h3 className="text-[16px] font-normal text-[#333]">
                Edit Brand - {editingBrand.name}
              </h3>
              <button
                onClick={() => setEditingBrand(null)}
                className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveEdit} className="p-5 space-y-4 text-[13px]">
              <div>
                <label className="block text-[#333] mb-1 font-medium">
                  Brand Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] outline-none focus:border-[#5b69bc]"
                />
              </div>

              <div>
                <label className="block text-[#333] mb-1 font-medium">
                  Select Existing Logo
                </label>
                <select
                  value={editLogo}
                  onChange={(e) => setEditLogo(e.target.value)}
                  className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] outline-none focus:border-[#5b69bc] cursor-pointer"
                >
                  <option value="/images/brands/dockers.webp">Dockers Logo</option>
                  <option value="/images/brands/tommyhilfiger.webp">
                    Tommy Hilfiger Logo
                  </option>
                  <option value="/images/brands/uspolo.webp">US Polo Logo</option>
                  <option value="/images/brands/puma.webp">Puma Logo</option>
                  <option value="/images/brands/levis.webp">Levi's Logo</option>
                  <option value="/images/brands/nike.webp">Nike Logo</option>
                  <option value="/images/brands/mango.webp">Mango Logo</option>
                  <option value="/images/brands/leecooper.webp">
                    Lee Cooper Logo
                  </option>
                  <option value="/images/brands/lacoste.webp">Lacoste Logo</option>
                  <option value="/images/brands/hm.webp">H&M Logo</option>
                  <option value="/images/brands/hugoboss.webp">
                    Hugo Boss Logo
                  </option>
                  <option value="/images/brands/gucci.webp">Gucci Logo</option>
                  <option value="/images/brands/diesel.webp">Diesel Logo</option>
                  <option value="/images/brands/burberry.webp">
                    Burberry Logo
                  </option>
                  <option value="/images/brands/armani.webp">Armani Logo</option>
                  <option value="/images/brands/adidas.webp">Adidas Logo</option>
                </select>
              </div>

              <div>
                <label className="block text-[#333] mb-1 font-medium">
                  Categories
                </label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {AVAILABLE_CATEGORIES.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-2 cursor-pointer select-none text-[12.5px]"
                    >
                      <input
                        type="checkbox"
                        checked={editCategories.includes(cat)}
                        onChange={() =>
                          toggleCategorySelection(
                            cat,
                            editCategories,
                            setEditCategories
                          )
                        }
                        className="rounded-[2px] text-[#5b69bc] focus:ring-0 cursor-pointer"
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#f4f4f4]">
                <button
                  type="button"
                  onClick={() => setEditingBrand(null)}
                  className="px-4 py-1.5 border border-[#d2d6de] rounded-[3px] text-[#555] hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#5b69bc] hover:bg-[#4d5aa3] text-white rounded-[3px] font-medium cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
