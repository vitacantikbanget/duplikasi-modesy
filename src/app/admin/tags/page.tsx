"use client";

import React, { useState, useMemo } from "react";
import { Plus, Trash2, X, CheckCircle, ChevronRight, ChevronsRight, ChevronLeft, ChevronsLeft } from "lucide-react";

export interface AdminTagItem {
  id: number;
  tag: string;
  slug: string;
  language: string;
  posts: number;
}

const INITIAL_TAGS: AdminTagItem[] = [
  { id: 348, tag: "Downtown Harrisburg", slug: "downtown-harrisburg", language: "English", posts: 1 },
  { id: 347, tag: "Midtown Harrisburg", slug: "midtown-harrisburg", language: "English", posts: 1 },
  { id: 346, tag: "Susquehanna River", slug: "susquehanna-river", language: "English", posts: 1 },
  { id: 345, tag: "Pennsylvania Capital", slug: "pennsylvania-capital", language: "English", posts: 1 },
  { id: 344, tag: "Harrisburg PA", slug: "harrisburg-pa", language: "English", posts: 1 },
  { id: 343, tag: "design resources", slug: "design-resources", language: "English", posts: 1 },
  { id: 342, tag: "nature visuals", slug: "nature-visuals", language: "English", posts: 1 },
  { id: 341, tag: "graphic design elements", slug: "graphic-design-elements", language: "English", posts: 1 },
  { id: 340, tag: "digital art", slug: "digital-art", language: "English", posts: 1 },
  { id: 339, tag: "nature graphics", slug: "nature-graphics", language: "English", posts: 1 },
  { id: 338, tag: "dg", slug: "dg", language: "English", posts: 1 },
  { id: 337, tag: "p", slug: "p", language: "English", posts: 1 },
  { id: 336, tag: "heat resistance", slug: "heat-resistance", language: "English", posts: 1 },
  { id: 335, tag: "versatile applications", slug: "versatile-applications", language: "English", posts: 1 },
  { id: 334, tag: "material properties", slug: "material-properties", language: "English", posts: 1 },
  { id: 333, tag: "summer collection", slug: "summer-collection", language: "English", posts: 3 },
  { id: 332, tag: "leather accessories", slug: "leather-accessories", language: "English", posts: 2 },
  { id: 331, tag: "handcrafted", slug: "handcrafted", language: "English", posts: 4 },
  { id: 330, tag: "minimalist design", slug: "minimalist-design", language: "English", posts: 2 },
  { id: 329, tag: "vintage fashion", slug: "vintage-fashion", language: "English", posts: 5 },
  { id: 328, tag: "organic cotton", slug: "organic-cotton", language: "English", posts: 1 },
  { id: 327, tag: "casual wear", slug: "casual-wear", language: "English", posts: 6 },
  { id: 326, tag: "urban lifestyle", slug: "urban-lifestyle", language: "English", posts: 2 },
  { id: 325, tag: "eco friendly", slug: "eco-friendly", language: "English", posts: 3 },
  { id: 324, tag: "tech accessories", slug: "tech-accessories", language: "English", posts: 2 },
  { id: 323, tag: "travel essentials", slug: "travel-essentials", language: "English", posts: 4 },
  { id: 322, tag: "autumn style", slug: "autumn-style", language: "English", posts: 1 },
  { id: 321, tag: "streetwear", slug: "streetwear", language: "English", posts: 3 },
  { id: 320, tag: "accessories sale", slug: "accessories-sale", language: "English", posts: 2 },
  { id: 319, tag: "trending products", slug: "trending-products", language: "English", posts: 5 },
  { id: 318, tag: "handmade crafts", slug: "handmade-crafts", language: "English", posts: 3 },
  { id: 317, tag: "digital downloads", slug: "digital-downloads", language: "English", posts: 2 },
  { id: 316, tag: "vector graphics", slug: "vector-graphics", language: "English", posts: 4 },
  { id: 315, tag: "gift ideas", slug: "gift-ideas", language: "English", posts: 1 },
  { id: 314, tag: "home aesthetics", slug: "home-aesthetics", language: "English", posts: 2 },
];

export default function AdminTagsPage() {
  const [tags, setTags] = useState<AdminTagItem[]>(INITIAL_TAGS);

  // Filter form states
  const [showCount, setShowCount] = useState<number>(15);
  const [languageFilter, setLanguageFilter] = useState<string>("All");
  const [searchInput, setSearchInput] = useState<string>("");

  // Applied filters
  const [appliedLanguage, setAppliedLanguage] = useState<string>("All");
  const [appliedSearch, setAppliedSearch] = useState<string>("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [editingTag, setEditingTag] = useState<AdminTagItem | null>(null);
  const [tagName, setTagName] = useState<string>("");
  const [tagSlug, setTagSlug] = useState<string>("");
  const [tagLanguage, setTagLanguage] = useState<string>("English");
  const [notification, setNotification] = useState<string | null>(null);

  const handleApplyFilter = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAppliedLanguage(languageFilter);
    setAppliedSearch(searchInput.trim().toLowerCase());
    setCurrentPage(1);
  };

  const filteredTags = useMemo(() => {
    return tags.filter((item) => {
      // 1. Language Filter
      if (appliedLanguage !== "All" && item.language !== appliedLanguage) {
        return false;
      }
      // 2. Search Query (tag name or id)
      if (appliedSearch) {
        const matchesTag = item.tag.toLowerCase().includes(appliedSearch);
        const matchesId = item.id.toString().includes(appliedSearch);
        if (!matchesTag && !matchesId) return false;
      }
      return true;
    });
  }, [tags, appliedLanguage, appliedSearch]);

  // Total pages calculation
  const totalPages = Math.ceil(filteredTags.length / showCount) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);

  // Paginated tags slice
  const paginatedTags = useMemo(() => {
    const start = (safeCurrentPage - 1) * showCount;
    return filteredTags.slice(start, start + showCount);
  }, [filteredTags, safeCurrentPage, showCount]);

  // Handlers
  const handleDeleteTag = (item: AdminTagItem) => {
    const confirmed = confirm(`Are you sure you want to delete tag "${item.tag}"?`);
    if (confirmed) {
      setTags((prev) => prev.filter((t) => t.id !== item.id));
      setNotification(`Tag "${item.tag}" deleted successfully.`);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  const handleOpenEdit = (item: AdminTagItem) => {
    setEditingTag(item);
    setTagName(item.tag);
    setTagSlug(item.slug);
    setTagLanguage(item.language);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTag || !tagName.trim()) return;

    setTags((prev) =>
      prev.map((t) =>
        t.id === editingTag.id
          ? {
              ...t,
              tag: tagName.trim(),
              slug: tagSlug.trim() || tagName.toLowerCase().replace(/\s+/g, "-"),
              language: tagLanguage,
            }
          : t
      )
    );

    setNotification(`Tag "${tagName}" updated successfully.`);
    setEditingTag(null);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tagName.trim()) return;

    const newId = tags.length > 0 ? Math.max(...tags.map((t) => t.id)) + 1 : 350;
    const newTagItem: AdminTagItem = {
      id: newId,
      tag: tagName.trim(),
      slug: tagSlug.trim() || tagName.toLowerCase().replace(/\s+/g, "-"),
      language: tagLanguage,
      posts: 0,
    };

    setTags((prev) => [newTagItem, ...prev]);
    setIsAddModalOpen(false);
    setTagName("");
    setTagSlug("");
    setNotification(`Tag "${newTagItem.tag}" added successfully.`);
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="w-full text-[#333333] pb-12 font-sans">
      {/* Top Header Row with Title and + Add Tag Button */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h1 className="text-[24px] font-normal text-[#333333]">Tags</h1>

        <button
          type="button"
          onClick={() => {
            setTagName("");
            setTagSlug("");
            setTagLanguage("English");
            setIsAddModalOpen(true);
          }}
          className="h-[34px] px-3.5 bg-[#00a65a] hover:bg-[#008d4c] active:bg-[#00733e] text-white text-[13px] font-normal rounded-[3px] transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Tag</span>
        </button>
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

      {/* Main Content Box (White Box) */}
      <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border border-[#d2d6de] p-5">
        {/* Filter Form matching screenshot */}
        <form
          onSubmit={handleApplyFilter}
          className="flex flex-wrap items-end gap-3 mb-5"
        >
          {/* Show dropdown */}
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
                className="h-[34px] w-[90px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-[#555] bg-white appearance-none outline-none focus:border-[#3c8dbc] cursor-pointer"
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

          {/* Language filter */}
          <div>
            <label className="block text-[13px] text-[#333333] font-normal mb-1">
              Language
            </label>
            <div className="relative">
              <select
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
                className="h-[34px] min-w-[150px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-[#555] bg-white appearance-none outline-none focus:border-[#3c8dbc] cursor-pointer"
              >
                <option value="All">All</option>
                <option value="English">English</option>
                <option value="Indonesian">Indonesian</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Turkish">Turkish</option>
                <option value="Arabic">Arabic</option>
              </select>
              <span className="absolute right-2.5 top-2 pointer-events-none text-[11px] text-[#777]">
                ▾
              </span>
            </div>
          </div>

          {/* Search input */}
          <div>
            <label className="block text-[13px] text-[#333333] font-normal mb-1">
              Search
            </label>
            <input
              type="text"
              placeholder="Search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-[#555] placeholder-gray-400 outline-none focus:border-[#3c8dbc] w-[180px]"
            />
          </div>

          {/* Filter button */}
          <button
            type="submit"
            className="h-[34px] px-5 bg-[#605ca8] hover:bg-[#534f96] text-white text-[13px] rounded-[3px] font-normal transition-colors cursor-pointer shadow-xs"
          >
            Filter
          </button>
        </form>

        {/* Tags Table matching screenshot */}
        <div className="overflow-x-auto min-h-[380px]">
          <table className="w-full text-left text-[13px] border-collapse whitespace-nowrap">
            <thead>
              <tr className="border-b-2 border-gray-200 text-[#333333] font-semibold text-[13px]">
                <th className="py-2.5 px-3 text-left w-[60px]">Id</th>
                <th className="py-2.5 px-3 text-left min-w-[280px]">Tag</th>
                <th className="py-2.5 px-3 text-left w-[180px]">Language</th>
                <th className="py-2.5 px-3 text-left w-[120px]">Posts</th>
                <th className="py-2.5 px-3 text-left w-[120px]">Options</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTags.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-12 text-center text-gray-500 text-[13px]"
                  >
                    No tags found.
                  </td>
                </tr>
              ) : (
                paginatedTags.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#f4f4f4] hover:bg-gray-50/70 transition-colors text-[13px]"
                  >
                    {/* Id */}
                    <td className="py-3 px-3 text-gray-700 font-normal">
                      {item.id}
                    </td>

                    {/* Tag */}
                    <td className="py-3 px-3 text-gray-800 font-normal">
                      {item.tag}
                    </td>

                    {/* Language */}
                    <td className="py-3 px-3 text-gray-700">
                      {item.language}
                    </td>

                    {/* Posts */}
                    <td className="py-3 px-3 text-gray-700">
                      {item.posts}
                    </td>

                    {/* Options (Edit button + Delete button) */}
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
                          onClick={() => handleDeleteTag(item)}
                          className="h-[26px] w-[28px] border border-[#d2d6de] bg-white hover:bg-gray-50 text-[#777] hover:text-red-600 rounded-[3px] flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                          title="Delete Tag"
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

        {/* Bottom Pagination matching Screenshot 2 */}
        <div className="mt-4 pt-3 border-t border-[#f4f4f4] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[13px] text-gray-700 select-none">
          <div>
            Showing {(safeCurrentPage - 1) * showCount + 1} to{" "}
            {Math.min(safeCurrentPage * showCount, filteredTags.length)} of{" "}
            {filteredTags.length} entries
          </div>

          {/* Pagination Buttons */}
          {totalPages > 1 && (
            <div className="flex items-center gap-1 justify-end">
              {/* Prev page button */}
              {safeCurrentPage > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="h-[30px] px-2.5 border border-[#d2d6de] bg-white hover:bg-gray-50 text-gray-700 rounded-[3px] text-xs transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Numbered page buttons */}
              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
                (pageNum) => (
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
                )
              )}

              {/* Next page button */}
              {safeCurrentPage < totalPages && (
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="h-[30px] px-2.5 border border-[#d2d6de] bg-white hover:bg-gray-50 text-gray-700 rounded-[3px] text-xs transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Last page jump button */}
              {safeCurrentPage < totalPages && (
                <button
                  type="button"
                  onClick={() => setCurrentPage(totalPages)}
                  className="h-[30px] px-2.5 border border-[#d2d6de] bg-white hover:bg-gray-50 text-gray-700 rounded-[3px] text-xs transition-colors cursor-pointer"
                  title="Last page"
                >
                  <ChevronsRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ADD TAG MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-2xs">
          <div className="bg-white rounded-[4px] shadow-2xl w-full max-w-md overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#f4f4f4] flex items-center justify-between bg-gray-50">
              <h3 className="text-[17px] font-semibold text-[#333333]">Add Tag</h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleAddTag}>
              <div className="p-6 space-y-4 text-[13.5px]">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Tag Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. vintage clothing"
                    value={tagName}
                    onChange={(e) => setTagName(e.target.value)}
                    className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] outline-none focus:border-[#3c8dbc]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Tag Slug
                  </label>
                  <input
                    type="text"
                    placeholder="Optional (auto-generated if empty)"
                    value={tagSlug}
                    onChange={(e) => setTagSlug(e.target.value)}
                    className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] outline-none focus:border-[#3c8dbc]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Language
                  </label>
                  <select
                    value={tagLanguage}
                    onChange={(e) => setTagLanguage(e.target.value)}
                    className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] bg-white outline-none focus:border-[#3c8dbc] cursor-pointer"
                  >
                    <option value="English">English</option>
                    <option value="Indonesian">Indonesian</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                    <option value="Turkish">Turkish</option>
                    <option value="Arabic">Arabic</option>
                  </select>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-3 border-t border-[#f4f4f4] bg-gray-50 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="h-[34px] px-4 border border-[#d2d6de] bg-white hover:bg-gray-100 text-[#444] text-[13px] rounded-[3px] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-[34px] px-5 bg-[#00a65a] hover:bg-[#008d4c] text-white text-[13px] rounded-[3px] font-normal transition-colors cursor-pointer"
                >
                  Add Tag
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT TAG MODAL */}
      {editingTag && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-2xs">
          <div className="bg-white rounded-[4px] shadow-2xl w-full max-w-md overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#f4f4f4] flex items-center justify-between bg-gray-50">
              <h3 className="text-[17px] font-semibold text-[#333333]">
                Edit Tag (Id: {editingTag.id})
              </h3>
              <button
                type="button"
                onClick={() => setEditingTag(null)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveEdit}>
              <div className="p-6 space-y-4 text-[13.5px]">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Tag Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={tagName}
                    onChange={(e) => setTagName(e.target.value)}
                    className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] outline-none focus:border-[#3c8dbc]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Tag Slug
                  </label>
                  <input
                    type="text"
                    value={tagSlug}
                    onChange={(e) => setTagSlug(e.target.value)}
                    className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] outline-none focus:border-[#3c8dbc]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Language
                  </label>
                  <select
                    value={tagLanguage}
                    onChange={(e) => setTagLanguage(e.target.value)}
                    className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] bg-white outline-none focus:border-[#3c8dbc] cursor-pointer"
                  >
                    <option value="English">English</option>
                    <option value="Indonesian">Indonesian</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                    <option value="Turkish">Turkish</option>
                    <option value="Arabic">Arabic</option>
                  </select>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-3 border-t border-[#f4f4f4] bg-gray-50 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingTag(null)}
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
