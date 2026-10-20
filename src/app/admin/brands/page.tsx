"use client";

import React, { useState, useMemo } from "react";
import { Plus, Trash2, X, CheckCircle, ChevronLeft, ChevronRight, ChevronsRight, Check } from "lucide-react";

export interface BrandItem {
  id: number;
  name: string;
  slug: string;
  order: number;
  status: "Active" | "Inactive";
  showOnHomepage: boolean;
}

const INITIAL_BRANDS: BrandItem[] = [
  { id: 1, name: "Nike", slug: "nike", order: 1, status: "Active", showOnHomepage: true },
  { id: 2, name: "Adidas", slug: "adidas", order: 2, status: "Active", showOnHomepage: true },
  { id: 3, name: "Zara", slug: "zara", order: 3, status: "Active", showOnHomepage: true },
  { id: 4, name: "H&M", slug: "hm", order: 4, status: "Active", showOnHomepage: true },
  { id: 5, name: "Apple", slug: "apple", order: 5, status: "Active", showOnHomepage: true },
  { id: 6, name: "Samsung", slug: "samsung", order: 6, status: "Active", showOnHomepage: true },
  { id: 7, name: "Gucci", slug: "gucci", order: 7, status: "Active", showOnHomepage: true },
  { id: 8, name: "Kipling", slug: "kipling", order: 8, status: "Active", showOnHomepage: true },
  { id: 9, name: "Sony", slug: "sony", order: 9, status: "Active", showOnHomepage: true },
  { id: 10, name: "Levi's", slug: "levis", order: 10, status: "Active", showOnHomepage: true },
  { id: 11, name: "Puma", slug: "puma", order: 11, status: "Active", showOnHomepage: false },
  { id: 12, name: "Louis Vuitton", slug: "louis-vuitton", order: 12, status: "Active", showOnHomepage: true },
  { id: 13, name: "Prada", slug: "prada", order: 13, status: "Active", showOnHomepage: false },
  { id: 14, name: "Calvin Klein", slug: "calvin-klein", order: 14, status: "Active", showOnHomepage: false },
  { id: 15, name: "Rolex", slug: "rolex", order: 15, status: "Active", showOnHomepage: true },
  { id: 16, name: "Chanel", slug: "chanel", order: 16, status: "Active", showOnHomepage: false },
  { id: 17, name: "Dior", slug: "dior", order: 17, status: "Active", showOnHomepage: false },
  { id: 18, name: "Under Armour", slug: "under-armour", order: 18, status: "Active", showOnHomepage: false },
];

export default function AdminBrandsPage() {
  const [brands, setBrands] = useState<BrandItem[]>(INITIAL_BRANDS);

  // Form state for Add Brand (Left column)
  const [addName, setAddName] = useState<string>("");
  const [addSlug, setAddSlug] = useState<string>("");
  const [addOrder, setAddOrder] = useState<number>(1);
  const [addStatus, setAddStatus] = useState<"Active" | "Inactive">("Active");
  const [addShowOnHome, setAddShowOnHome] = useState<boolean>(true);

  // Filter state for Brands list (Right column)
  const [showCount, setShowCount] = useState<number>(15);
  const [searchInput, setSearchInput] = useState<string>("");
  const [appliedSearch, setAppliedSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Edit Modal State
  const [editingBrand, setEditingBrand] = useState<BrandItem | null>(null);
  const [editName, setEditName] = useState<string>("");
  const [editSlug, setEditSlug] = useState<string>("");
  const [editOrder, setEditOrder] = useState<number>(1);
  const [editStatus, setEditStatus] = useState<"Active" | "Inactive">("Active");
  const [editShowOnHome, setEditShowOnHome] = useState<boolean>(true);

  // Notifications
  const [notification, setNotification] = useState<string | null>(null);

  const handleApplyFilter = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAppliedSearch(searchInput.trim().toLowerCase());
    setCurrentPage(1);
  };

  const filteredBrands = useMemo(() => {
    return brands.filter((item) => {
      if (appliedSearch) {
        const matchesName = item.name.toLowerCase().includes(appliedSearch);
        const matchesId = item.id.toString().includes(appliedSearch);
        if (!matchesName && !matchesId) return false;
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

  // Actions
  const handleAddBrand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addName.trim()) return;

    const newId = brands.length > 0 ? Math.max(...brands.map((b) => b.id)) + 1 : 1;
    const newBrand: BrandItem = {
      id: newId,
      name: addName.trim(),
      slug: addSlug.trim() || addName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      order: Number(addOrder) || 1,
      status: addStatus,
      showOnHomepage: addShowOnHome,
    };

    setBrands((prev) => [newBrand, ...prev]);
    setAddName("");
    setAddSlug("");
    setAddOrder(1);
    setNotification(`Brand "${newBrand.name}" has been added successfully.`);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleDeleteBrand = (item: BrandItem) => {
    const confirmed = confirm(`Are you sure you want to delete brand "${item.name}"?`);
    if (confirmed) {
      setBrands((prev) => prev.filter((b) => b.id !== item.id));
      setNotification(`Brand "${item.name}" has been deleted.`);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  const handleOpenEdit = (item: BrandItem) => {
    setEditingBrand(item);
    setEditName(item.name);
    setEditSlug(item.slug);
    setEditOrder(item.order);
    setEditStatus(item.status);
    setEditShowOnHome(item.showOnHomepage);
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
              slug: editSlug.trim() || editName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
              order: Number(editOrder),
              status: editStatus,
              showOnHomepage: editShowOnHome,
            }
          : b
      )
    );

    setNotification(`Brand "${editName}" updated successfully.`);
    setEditingBrand(null);
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="w-full text-[#333333] pb-12 font-sans">
      {/* Page Title */}
      <div className="mb-4">
        <h1 className="text-[24px] font-normal text-[#333333]">Brands</h1>
      </div>

      {/* Success Notification Alert */}
      {notification && (
        <div className="mb-4 bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-3 rounded-[3px] text-sm flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
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

      {/* Two Column Grid (Modesy AdminLTE layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Add Brand Form (5 Cols) */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border border-[#d2d6de]">
            <div className="px-5 py-3 border-b border-[#f4f4f4]">
              <h2 className="text-[16px] font-normal text-[#333333]">Add Brand</h2>
            </div>

            <form onSubmit={handleAddBrand} className="p-5 space-y-4 text-[13px]">
              {/* Brand Name */}
              <div>
                <label className="block text-[13px] text-[#333333] font-normal mb-1">
                  Brand Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Nike"
                  value={addName}
                  onChange={(e) => setAddName(e.target.value)}
                  className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-[#555] placeholder-gray-400 outline-none focus:border-[#3c8dbc]"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-[13px] text-[#333333] font-normal mb-1">
                  Slug (URL Key)
                </label>
                <input
                  type="text"
                  placeholder="Optional (auto-generated if empty)"
                  value={addSlug}
                  onChange={(e) => setAddSlug(e.target.value)}
                  className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-[#555] placeholder-gray-400 outline-none focus:border-[#3c8dbc]"
                />
              </div>

              {/* Order */}
              <div>
                <label className="block text-[13px] text-[#333333] font-normal mb-1">
                  Order Index
                </label>
                <input
                  type="number"
                  value={addOrder}
                  onChange={(e) => setAddOrder(Number(e.target.value))}
                  className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-[#555] outline-none focus:border-[#3c8dbc]"
                />
              </div>

              {/* Show on Homepage Checkbox */}
              <div>
                <label
                  onClick={() => setAddShowOnHome(!addShowOnHome)}
                  className="flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#333333]"
                >
                  <div
                    className={`w-4 h-4 rounded-[2px] border flex items-center justify-center transition-colors ${
                      addShowOnHome ? "border-[#605ca8] bg-[#605ca8]" : "border-gray-400 bg-white"
                    }`}
                  >
                    {addShowOnHome && <Check className="w-3 h-3 text-white stroke-[3]" />}
                  </div>
                  <span>Show on Homepage / Brands Slider</span>
                </label>
              </div>

              {/* Status Radio Buttons */}
              <div>
                <label className="block text-[13px] text-[#333333] font-normal mb-1.5">
                  Status
                </label>
                <div className="flex items-center gap-6">
                  <label
                    onClick={() => setAddStatus("Active")}
                    className="flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#333333]"
                  >
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        addStatus === "Active" ? "border-[#605ca8] bg-[#605ca8]" : "border-gray-400 bg-white"
                      }`}
                    >
                      {addStatus === "Active" && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                    </div>
                    <span>Active</span>
                  </label>

                  <label
                    onClick={() => setAddStatus("Inactive")}
                    className="flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#333333]"
                  >
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        addStatus === "Inactive" ? "border-[#605ca8] bg-[#605ca8]" : "border-gray-400 bg-white"
                      }`}
                    >
                      {addStatus === "Inactive" && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                    </div>
                    <span>Inactive</span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="h-[34px] px-5 bg-[#00a65a] hover:bg-[#008d4c] active:bg-[#00733e] text-white text-[13px] rounded-[3px] font-normal transition-colors cursor-pointer shadow-xs"
                >
                  Add Brand
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Brands Table (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border border-[#d2d6de] p-5">
            {/* Filter Form */}
            <form onSubmit={handleApplyFilter} className="flex flex-wrap items-end gap-3 mb-5">
              <div>
                <label className="block text-[13px] text-[#333333] font-normal mb-1">
                  Show
                </label>
                <div className="relative">
                  <select
                    value={showCount}
                    onChange={(e) => {
                      setShowCount(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="h-[34px] w-[85px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-[#555] bg-white appearance-none outline-none focus:border-[#3c8dbc] cursor-pointer"
                  >
                    <option value={15}>15</option>
                    <option value={30}>30</option>
                    <option value={60}>60</option>
                    <option value={100}>100</option>
                  </select>
                  <span className="absolute right-2.5 top-2 pointer-events-none text-[11px] text-[#777]">
                    ▾
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-[13px] text-[#333333] font-normal mb-1">
                  Search
                </label>
                <input
                  type="text"
                  placeholder="Search brand..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-[#555] placeholder-gray-400 outline-none focus:border-[#3c8dbc] w-[180px]"
                />
              </div>

              <button
                type="submit"
                className="h-[34px] px-5 bg-[#605ca8] hover:bg-[#534f96] text-white text-[13px] rounded-[3px] font-normal transition-colors cursor-pointer shadow-xs"
              >
                Filter
              </button>
            </form>

            {/* Brands Table */}
            <div className="overflow-x-auto min-h-[350px]">
              <table className="w-full text-left text-[13px] border-collapse whitespace-nowrap">
                <thead>
                  <tr className="border-b-2 border-gray-200 text-[#333333] font-semibold text-[13px]">
                    <th className="py-2.5 px-3 text-left w-[50px]">Id</th>
                    <th className="py-2.5 px-3 text-left min-w-[200px]">Brand Name</th>
                    <th className="py-2.5 px-3 text-left w-[70px]">Order</th>
                    <th className="py-2.5 px-3 text-left w-[100px]">Status</th>
                    <th className="py-2.5 px-3 text-left w-[110px]">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedBrands.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-gray-500 text-[13px]">
                        No brands found.
                      </td>
                    </tr>
                  ) : (
                    paginatedBrands.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b border-[#f4f4f4] hover:bg-gray-50/70 transition-colors text-[13px]"
                      >
                        <td className="py-3 px-3 text-gray-700">{item.id}</td>
                        <td className="py-3 px-3">
                          <span className="font-medium text-gray-800">{item.name}</span>
                          {item.showOnHomepage && (
                            <span className="ml-2 text-[10px] bg-blue-50 text-blue-700 border border-blue-200 px-1.5 py-0.5 rounded-[2px]">
                              Homepage
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-gray-700">{item.order}</td>
                        <td className="py-3 px-3">
                          {item.status === "Active" ? (
                            <span className="inline-block bg-[#00a65a] text-white text-[11px] font-semibold px-2 py-0.5 rounded-[2px] shadow-2xs">
                              Active
                            </span>
                          ) : (
                            <span className="inline-block bg-[#777] text-white text-[11px] font-semibold px-2 py-0.5 rounded-[2px] shadow-2xs">
                              Inactive
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleOpenEdit(item)}
                              className="h-[26px] px-2.5 border border-[#d2d6de] bg-white hover:bg-gray-50 text-[#444] text-[12px] font-normal rounded-[3px] transition-colors cursor-pointer shadow-2xs"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteBrand(item)}
                              className="h-[26px] w-[28px] border border-[#d2d6de] bg-white hover:bg-gray-50 text-[#777] hover:text-red-600 rounded-[3px] flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                              title="Delete Brand"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="mt-4 pt-3 border-t border-[#f4f4f4] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[13px] text-gray-700 select-none">
              <div>
                Showing {(safeCurrentPage - 1) * showCount + 1} to{" "}
                {Math.min(safeCurrentPage * showCount, filteredBrands.length)} of {filteredBrands.length} entries
              </div>

              {totalPages > 1 && (
                <div className="flex items-center gap-1 justify-end">
                  {safeCurrentPage > 1 && (
                    <button
                      type="button"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className="h-[30px] px-2.5 border border-[#d2d6de] bg-white hover:bg-gray-50 text-gray-700 rounded-[3px] text-xs transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => setCurrentPage(pageNum)}
                      className={`h-[30px] min-w-[30px] px-2.5 rounded-[3px] text-xs font-normal transition-colors cursor-pointer border ${
                        safeCurrentPage === pageNum
                          ? "bg-[#0073b7] border-[#0073b7] text-white font-semibold"
                          : "bg-white border-[#d2d6de] text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}

                  {safeCurrentPage < totalPages && (
                    <button
                      type="button"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      className="h-[30px] px-2.5 border border-[#d2d6de] bg-white hover:bg-gray-50 text-gray-700 rounded-[3px] text-xs transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* EDIT BRAND MODAL */}
      {editingBrand && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-2xs">
          <div className="bg-white rounded-[4px] shadow-2xl w-full max-w-md overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-[#f4f4f4] flex items-center justify-between bg-gray-50">
              <h3 className="text-[17px] font-semibold text-[#333333]">
                Edit Brand (Id: {editingBrand.id})
              </h3>
              <button
                type="button"
                onClick={() => setEditingBrand(null)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit}>
              <div className="p-6 space-y-4 text-[13.5px]">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Brand Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] outline-none focus:border-[#3c8dbc]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Slug
                  </label>
                  <input
                    type="text"
                    value={editSlug}
                    onChange={(e) => setEditSlug(e.target.value)}
                    className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] outline-none focus:border-[#3c8dbc]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Order Index
                  </label>
                  <input
                    type="number"
                    value={editOrder}
                    onChange={(e) => setEditOrder(Number(e.target.value))}
                    className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] outline-none focus:border-[#3c8dbc]"
                  />
                </div>

                <div>
                  <label
                    onClick={() => setEditShowOnHome(!editShowOnHome)}
                    className="flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#333333]"
                  >
                    <div
                      className={`w-4 h-4 rounded-[2px] border flex items-center justify-center transition-colors ${
                        editShowOnHome ? "border-[#605ca8] bg-[#605ca8]" : "border-gray-400 bg-white"
                      }`}
                    >
                      {editShowOnHome && <Check className="w-3 h-3 text-white stroke-[3]" />}
                    </div>
                    <span>Show on Homepage / Brands Slider</span>
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Status
                  </label>
                  <div className="flex items-center gap-6">
                    <label
                      onClick={() => setEditStatus("Active")}
                      className="flex items-center gap-2 cursor-pointer select-none text-xs text-gray-700"
                    >
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          editStatus === "Active" ? "border-[#605ca8] bg-[#605ca8]" : "border-gray-400 bg-white"
                        }`}
                      >
                        {editStatus === "Active" && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                      </div>
                      <span>Active</span>
                    </label>

                    <label
                      onClick={() => setEditStatus("Inactive")}
                      className="flex items-center gap-2 cursor-pointer select-none text-xs text-gray-700"
                    >
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          editStatus === "Inactive" ? "border-[#605ca8] bg-[#605ca8]" : "border-gray-400 bg-white"
                        }`}
                      >
                        {editStatus === "Inactive" && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                      </div>
                      <span>Inactive</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="px-6 py-3 border-t border-[#f4f4f4] bg-gray-50 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingBrand(null)}
                  className="h-[34px] px-4 border border-[#d2d6de] bg-white hover:bg-gray-100 text-[#444] text-[13px] rounded-[3px] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-[34px] px-5 bg-[#0073b7] hover:bg-[#005a92] text-white text-[13px] rounded-[3px] font-normal transition-colors cursor-pointer"
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
