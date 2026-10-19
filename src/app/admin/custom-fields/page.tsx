"use client";

import React, { useState, useMemo } from "react";
import { Plus, Trash2, X, CheckCircle, ChevronLeft, ChevronRight, Check } from "lucide-react";

export type CustomFieldType =
  | "Text"
  | "Number"
  | "Textarea"
  | "Dropdown"
  | "Radio Button"
  | "Checkbox"
  | "Date";

export interface CustomFieldItem {
  id: number;
  name: string;
  type: CustomFieldType;
  category: string;
  order: number;
  isRequired: boolean;
  status: "Active" | "Inactive";
  options?: string[];
}

const INITIAL_CUSTOM_FIELDS: CustomFieldItem[] = [
  {
    id: 1,
    name: "Size",
    type: "Dropdown",
    category: "Clothing",
    order: 1,
    isRequired: true,
    status: "Active",
    options: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  {
    id: 2,
    name: "Shoe Size (US)",
    type: "Dropdown",
    category: "Shoes",
    order: 2,
    isRequired: true,
    status: "Active",
    options: ["6", "7", "8", "9", "10", "11", "12", "13"],
  },
  {
    id: 3,
    name: "Material / Fabric",
    type: "Text",
    category: "Clothing",
    order: 3,
    isRequired: false,
    status: "Active",
  },
  {
    id: 4,
    name: "Condition",
    type: "Radio Button",
    category: "All",
    order: 4,
    isRequired: true,
    status: "Active",
    options: ["Brand New", "Like New", "Refurbished", "Used"],
  },
  {
    id: 5,
    name: "Warranty Period",
    type: "Dropdown",
    category: "Web Templates & Code",
    order: 5,
    isRequired: false,
    status: "Active",
    options: ["No Warranty", "6 Months", "1 Year", "2 Years", "Lifetime"],
  },
  {
    id: 6,
    name: "Metal / Finish Color",
    type: "Checkbox",
    category: "Jewelry & Accessories",
    order: 6,
    isRequired: false,
    status: "Active",
    options: ["Gold", "Silver", "Rose Gold", "Black", "Titanium"],
  },
  {
    id: 7,
    name: "Dimensions (LxWxH cm)",
    type: "Text",
    category: "Home & Living",
    order: 7,
    isRequired: false,
    status: "Active",
  },
  {
    id: 8,
    name: "Manufacturing Year",
    type: "Number",
    category: "Toys & Entertainment",
    order: 8,
    isRequired: false,
    status: "Active",
  },
];

const AVAILABLE_CATEGORIES = [
  "All",
  "Clothing",
  "Shoes",
  "Home & Living",
  "Jewelry & Accessories",
  "Toys & Entertainment",
  "Graphics & Photos",
  "Video & Audio",
  "Web Templates & Code",
];

export default function AdminCustomFieldsPage() {
  const [fields, setFields] = useState<CustomFieldItem[]>(INITIAL_CUSTOM_FIELDS);

  // Filters
  const [showCount, setShowCount] = useState<number>(15);
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [searchInput, setSearchInput] = useState<string>("");
  const [appliedCategory, setAppliedCategory] = useState<string>("All");
  const [appliedSearch, setAppliedSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [editingField, setEditingField] = useState<CustomFieldItem | null>(null);

  // Form states
  const [fieldName, setFieldName] = useState<string>("");
  const [fieldType, setFieldType] = useState<CustomFieldType>("Text");
  const [fieldCategory, setFieldCategory] = useState<string>("All");
  const [fieldOrder, setFieldOrder] = useState<number>(1);
  const [fieldRequired, setFieldRequired] = useState<boolean>(false);
  const [fieldStatus, setFieldStatus] = useState<"Active" | "Inactive">("Active");
  const [fieldOptionsText, setFieldOptionsText] = useState<string>("");

  const [notification, setNotification] = useState<string | null>(null);

  const handleApplyFilter = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAppliedCategory(categoryFilter);
    setAppliedSearch(searchInput.trim().toLowerCase());
    setCurrentPage(1);
  };

  const filteredFields = useMemo(() => {
    return fields.filter((item) => {
      if (appliedCategory !== "All" && item.category !== appliedCategory) {
        return false;
      }
      if (appliedSearch) {
        const matchesName = item.name.toLowerCase().includes(appliedSearch);
        const matchesId = item.id.toString().includes(appliedSearch);
        const matchesCat = item.category.toLowerCase().includes(appliedSearch);
        if (!matchesName && !matchesId && !matchesCat) return false;
      }
      return true;
    });
  }, [fields, appliedCategory, appliedSearch]);

  const totalPages = Math.ceil(filteredFields.length / showCount) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedFields = useMemo(() => {
    const start = (safeCurrentPage - 1) * showCount;
    return filteredFields.slice(start, start + showCount);
  }, [filteredFields, safeCurrentPage, showCount]);

  const handleDeleteField = (item: CustomFieldItem) => {
    const confirmed = confirm(`Are you sure you want to delete custom field "${item.name}"?`);
    if (confirmed) {
      setFields((prev) => prev.filter((f) => f.id !== item.id));
      setNotification(`Custom field "${item.name}" has been deleted.`);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  const handleOpenAdd = () => {
    setFieldName("");
    setFieldType("Text");
    setFieldCategory("All");
    setFieldOrder(fields.length + 1);
    setFieldRequired(false);
    setFieldStatus("Active");
    setFieldOptionsText("");
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (item: CustomFieldItem) => {
    setEditingField(item);
    setFieldName(item.name);
    setFieldType(item.type);
    setFieldCategory(item.category);
    setFieldOrder(item.order);
    setFieldRequired(item.isRequired);
    setFieldStatus(item.status);
    setFieldOptionsText(item.options ? item.options.join("\n") : "");
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fieldName.trim()) return;

    const newId = fields.length > 0 ? Math.max(...fields.map((f) => f.id)) + 1 : 1;
    const parsedOptions =
      fieldType === "Dropdown" || fieldType === "Radio Button" || fieldType === "Checkbox"
        ? fieldOptionsText
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean)
        : undefined;

    const newField: CustomFieldItem = {
      id: newId,
      name: fieldName.trim(),
      type: fieldType,
      category: fieldCategory,
      order: Number(fieldOrder) || 1,
      isRequired: fieldRequired,
      status: fieldStatus,
      options: parsedOptions,
    };

    setFields((prev) => [...prev, newField]);
    setIsAddModalOpen(false);
    setNotification(`Custom field "${newField.name}" has been added successfully.`);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingField || !fieldName.trim()) return;

    const parsedOptions =
      fieldType === "Dropdown" || fieldType === "Radio Button" || fieldType === "Checkbox"
        ? fieldOptionsText
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean)
        : undefined;

    setFields((prev) =>
      prev.map((f) =>
        f.id === editingField.id
          ? {
              ...f,
              name: fieldName.trim(),
              type: fieldType,
              category: fieldCategory,
              order: Number(fieldOrder),
              isRequired: fieldRequired,
              status: fieldStatus,
              options: parsedOptions,
            }
          : f
      )
    );

    setNotification(`Custom field "${fieldName}" updated successfully.`);
    setEditingField(null);
    setTimeout(() => setNotification(null), 4000);
  };

  const hasOptions =
    fieldType === "Dropdown" || fieldType === "Radio Button" || fieldType === "Checkbox";

  return (
    <div className="w-full text-[#333333] pb-12 font-sans">
      {/* Top Header Row with Title and + Add Custom Field Button */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-[24px] font-normal text-[#333333]">Custom Fields</h1>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="h-[34px] px-3.5 bg-[#00a65a] hover:bg-[#008d4c] active:bg-[#00733e] text-white text-[13px] font-normal rounded-[3px] transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Custom Field</span>
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

      {/* Main Container Card (White Box) */}
      <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border border-[#d2d6de] p-5">
        {/* Filters Form */}
        <form onSubmit={handleApplyFilter} className="flex flex-wrap items-end gap-3 mb-5">
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

          {/* Category filter */}
          <div>
            <label className="block text-[13px] text-[#333333] font-normal mb-1">
              Category
            </label>
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="h-[34px] min-w-[160px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-[#555] bg-white appearance-none outline-none focus:border-[#3c8dbc] cursor-pointer"
              >
                {AVAILABLE_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
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
              placeholder="Search field name..."
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

        {/* Custom Fields Table */}
        <div className="overflow-x-auto min-h-[350px]">
          <table className="w-full text-left text-[13px] border-collapse whitespace-nowrap">
            <thead>
              <tr className="border-b-2 border-gray-200 text-[#333333] font-semibold text-[13px]">
                <th className="py-2.5 px-3 text-left w-[50px]">Id</th>
                <th className="py-2.5 px-3 text-left min-w-[200px]">Field Name</th>
                <th className="py-2.5 px-3 text-left w-[140px]">Type</th>
                <th className="py-2.5 px-3 text-left w-[180px]">Category</th>
                <th className="py-2.5 px-3 text-left w-[70px]">Order</th>
                <th className="py-2.5 px-3 text-left w-[90px]">Required</th>
                <th className="py-2.5 px-3 text-left w-[90px]">Status</th>
                <th className="py-2.5 px-3 text-left w-[110px]">Options</th>
              </tr>
            </thead>
            <tbody>
              {paginatedFields.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-500 text-[13px]">
                    No custom fields found.
                  </td>
                </tr>
              ) : (
                paginatedFields.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#f4f4f4] hover:bg-gray-50/70 transition-colors text-[13px]"
                  >
                    <td className="py-3 px-3 text-gray-700">{item.id}</td>
                    <td className="py-3 px-3">
                      <div className="font-medium text-gray-800">{item.name}</div>
                      {item.options && item.options.length > 0 && (
                        <div className="text-[11px] text-gray-500 mt-0.5 truncate max-w-xs">
                          Options: {item.options.join(", ")}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-3 text-gray-700">
                      <span className="inline-block bg-gray-100 text-gray-700 px-2 py-0.5 rounded-[2px] text-[11px] font-mono">
                        {item.type}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-gray-700">{item.category}</td>
                    <td className="py-3 px-3 text-gray-700">{item.order}</td>
                    <td className="py-3 px-3">
                      {item.isRequired ? (
                        <span className="inline-block bg-blue-100 text-blue-800 text-[11px] font-semibold px-2 py-0.5 rounded-[2px]">
                          Yes
                        </span>
                      ) : (
                        <span className="inline-block bg-gray-100 text-gray-600 text-[11px] font-semibold px-2 py-0.5 rounded-[2px]">
                          No
                        </span>
                      )}
                    </td>
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
                          onClick={() => handleDeleteField(item)}
                          className="h-[26px] w-[28px] border border-[#d2d6de] bg-white hover:bg-gray-50 text-[#777] hover:text-red-600 rounded-[3px] flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                          title="Delete Field"
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

        {/* Bottom Pagination */}
        <div className="mt-4 pt-3 border-t border-[#f4f4f4] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[13px] text-gray-700 select-none">
          <div>
            Showing {(safeCurrentPage - 1) * showCount + 1} to{" "}
            {Math.min(safeCurrentPage * showCount, filteredFields.length)} of {filteredFields.length} entries
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

      {/* ADD CUSTOM FIELD MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-2xs">
          <div className="bg-white rounded-[4px] shadow-2xl w-full max-w-lg overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-[#f4f4f4] flex items-center justify-between bg-gray-50">
              <h3 className="text-[17px] font-semibold text-[#333333]">
                Add Custom Field
              </h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAdd}>
              <div className="p-6 space-y-4 text-[13.5px] max-h-[75vh] overflow-y-auto">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Field Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Fabric Material, Battery Life"
                    value={fieldName}
                    onChange={(e) => setFieldName(e.target.value)}
                    className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] outline-none focus:border-[#3c8dbc]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Field Type
                    </label>
                    <select
                      value={fieldType}
                      onChange={(e) => setFieldType(e.target.value as CustomFieldType)}
                      className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] bg-white outline-none focus:border-[#3c8dbc] cursor-pointer"
                    >
                      <option value="Text">Text</option>
                      <option value="Number">Number</option>
                      <option value="Textarea">Textarea</option>
                      <option value="Dropdown">Dropdown</option>
                      <option value="Radio Button">Radio Button</option>
                      <option value="Checkbox">Checkbox</option>
                      <option value="Date">Date</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Assign Category
                    </label>
                    <select
                      value={fieldCategory}
                      onChange={(e) => setFieldCategory(e.target.value)}
                      className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] bg-white outline-none focus:border-[#3c8dbc] cursor-pointer"
                    >
                      {AVAILABLE_CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {hasOptions && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Options (Enter one option per line)
                    </label>
                    <textarea
                      rows={4}
                      placeholder={"Option 1\nOption 2\nOption 3"}
                      value={fieldOptionsText}
                      onChange={(e) => setFieldOptionsText(e.target.value)}
                      className="w-full p-2.5 border border-[#d2d6de] rounded-[3px] text-[13px] outline-none focus:border-[#3c8dbc] resize-none"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Order Index
                  </label>
                  <input
                    type="number"
                    value={fieldOrder}
                    onChange={(e) => setFieldOrder(Number(e.target.value))}
                    className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] outline-none focus:border-[#3c8dbc]"
                  />
                </div>

                <div className="flex items-center gap-6 pt-1">
                  <label
                    onClick={() => setFieldRequired(!fieldRequired)}
                    className="flex items-center gap-2 cursor-pointer select-none text-xs font-medium text-gray-700"
                  >
                    <div
                      className={`w-4 h-4 rounded-[2px] border flex items-center justify-center transition-colors ${
                        fieldRequired ? "border-[#605ca8] bg-[#605ca8]" : "border-gray-400 bg-white"
                      }`}
                    >
                      {fieldRequired && <Check className="w-3 h-3 text-white stroke-[3]" />}
                    </div>
                    <span>Required Field</span>
                  </label>

                  <label
                    onClick={() => setFieldStatus(fieldStatus === "Active" ? "Inactive" : "Active")}
                    className="flex items-center gap-2 cursor-pointer select-none text-xs font-medium text-gray-700"
                  >
                    <div
                      className={`w-4 h-4 rounded-[2px] border flex items-center justify-center transition-colors ${
                        fieldStatus === "Active" ? "border-[#00a65a] bg-[#00a65a]" : "border-gray-400 bg-white"
                      }`}
                    >
                      {fieldStatus === "Active" && <Check className="w-3 h-3 text-white stroke-[3]" />}
                    </div>
                    <span>Active Status</span>
                  </label>
                </div>
              </div>

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
                  Add Field
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT CUSTOM FIELD MODAL */}
      {editingField && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-2xs">
          <div className="bg-white rounded-[4px] shadow-2xl w-full max-w-lg overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-[#f4f4f4] flex items-center justify-between bg-gray-50">
              <h3 className="text-[17px] font-semibold text-[#333333]">
                Edit Custom Field (Id: {editingField.id})
              </h3>
              <button
                type="button"
                onClick={() => setEditingField(null)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit}>
              <div className="p-6 space-y-4 text-[13.5px] max-h-[75vh] overflow-y-auto">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Field Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fieldName}
                    onChange={(e) => setFieldName(e.target.value)}
                    className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] outline-none focus:border-[#3c8dbc]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Field Type
                    </label>
                    <select
                      value={fieldType}
                      onChange={(e) => setFieldType(e.target.value as CustomFieldType)}
                      className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] bg-white outline-none focus:border-[#3c8dbc] cursor-pointer"
                    >
                      <option value="Text">Text</option>
                      <option value="Number">Number</option>
                      <option value="Textarea">Textarea</option>
                      <option value="Dropdown">Dropdown</option>
                      <option value="Radio Button">Radio Button</option>
                      <option value="Checkbox">Checkbox</option>
                      <option value="Date">Date</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Assign Category
                    </label>
                    <select
                      value={fieldCategory}
                      onChange={(e) => setFieldCategory(e.target.value)}
                      className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] bg-white outline-none focus:border-[#3c8dbc] cursor-pointer"
                    >
                      {AVAILABLE_CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {hasOptions && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Options (Enter one option per line)
                    </label>
                    <textarea
                      rows={4}
                      value={fieldOptionsText}
                      onChange={(e) => setFieldOptionsText(e.target.value)}
                      className="w-full p-2.5 border border-[#d2d6de] rounded-[3px] text-[13px] outline-none focus:border-[#3c8dbc] resize-none"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Order Index
                  </label>
                  <input
                    type="number"
                    value={fieldOrder}
                    onChange={(e) => setFieldOrder(Number(e.target.value))}
                    className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] outline-none focus:border-[#3c8dbc]"
                  />
                </div>

                <div className="flex items-center gap-6 pt-1">
                  <label
                    onClick={() => setFieldRequired(!fieldRequired)}
                    className="flex items-center gap-2 cursor-pointer select-none text-xs font-medium text-gray-700"
                  >
                    <div
                      className={`w-4 h-4 rounded-[2px] border flex items-center justify-center transition-colors ${
                        fieldRequired ? "border-[#605ca8] bg-[#605ca8]" : "border-gray-400 bg-white"
                      }`}
                    >
                      {fieldRequired && <Check className="w-3 h-3 text-white stroke-[3]" />}
                    </div>
                    <span>Required Field</span>
                  </label>

                  <label
                    onClick={() => setFieldStatus(fieldStatus === "Active" ? "Inactive" : "Active")}
                    className="flex items-center gap-2 cursor-pointer select-none text-xs font-medium text-gray-700"
                  >
                    <div
                      className={`w-4 h-4 rounded-[2px] border flex items-center justify-center transition-colors ${
                        fieldStatus === "Active" ? "border-[#00a65a] bg-[#00a65a]" : "border-gray-400 bg-white"
                      }`}
                    >
                      {fieldStatus === "Active" && <Check className="w-3 h-3 text-white stroke-[3]" />}
                    </div>
                    <span>Active Status</span>
                  </label>
                </div>
              </div>

              <div className="px-6 py-3 border-t border-[#f4f4f4] bg-gray-50 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingField(null)}
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
