"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Plus,
  Upload,
  Trash2,
  Edit2,
  X,
  CheckCircle,
  ChevronDown,
  ListOrdered,
  FileSpreadsheet,
  Download,
} from "lucide-react";

export type CustomFieldType =
  | "Multi Select"
  | "Dropdown"
  | "Radio Button"
  | "Checkbox"
  | "Text"
  | "Number"
  | "Textarea"
  | "Date";

export interface CustomFieldItem {
  id: number;
  name: string;
  type: CustomFieldType;
  inProductFilters: boolean;
  required: "Yes" | "No";
  order: number;
  status: "Active" | "Inactive";
  options: string[];
}

const INITIAL_CUSTOM_FIELDS: CustomFieldItem[] = [
  {
    id: 2,
    name: "Material",
    type: "Multi Select",
    inProductFilters: true,
    required: "Yes",
    order: 2,
    status: "Active",
    options: ["Cotton", "Polyester", "Silk", "Wool", "Linen", "Denim", "Leather"],
  },
  {
    id: 1,
    name: "Fabric",
    type: "Multi Select",
    inProductFilters: true,
    required: "Yes",
    order: 1,
    status: "Active",
    options: ["100% Cotton", "Fleece", "Jersey", "Chiffon", "Satin", "Velvet"],
  },
  {
    id: 3,
    name: "Size",
    type: "Dropdown",
    inProductFilters: true,
    required: "Yes",
    order: 3,
    status: "Active",
    options: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
  },
  {
    id: 4,
    name: "Pattern",
    type: "Dropdown",
    inProductFilters: false,
    required: "No",
    order: 4,
    status: "Active",
    options: ["Solid", "Striped", "Plaid", "Floral", "Polka Dot", "Graphic"],
  },
  {
    id: 5,
    name: "Occasion",
    type: "Multi Select",
    inProductFilters: true,
    required: "No",
    order: 5,
    status: "Active",
    options: ["Casual", "Formal", "Party", "Sportswear", "Workwear"],
  },
  {
    id: 6,
    name: "Warranty",
    type: "Radio Button",
    inProductFilters: false,
    required: "No",
    order: 6,
    status: "Active",
    options: ["No Warranty", "6 Months", "1 Year", "2 Years", "Lifetime"],
  },
];

export default function AdminCustomFieldsPage() {
  const [fields, setFields] = useState<CustomFieldItem[]>(INITIAL_CUSTOM_FIELDS);
  const [showCount, setShowCount] = useState<number>(15);
  const [searchInput, setSearchInput] = useState<string>("");
  const [appliedSearch, setAppliedSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openOptionDropdownId, setOpenOptionDropdownId] = useState<number | null>(null);

  // Notifications
  const [notification, setNotification] = useState<string | null>(null);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [editingField, setEditingField] = useState<CustomFieldItem | null>(null);
  const [manageOptionsField, setManageOptionsField] = useState<CustomFieldItem | null>(null);

  // Add field form state
  const [addName, setAddName] = useState("");
  const [addType, setAddType] = useState<CustomFieldType>("Multi Select");
  const [addRequired, setAddRequired] = useState<"Yes" | "No">("Yes");
  const [addInProductFilters, setAddInProductFilters] = useState(true);
  const [addOrder, setAddOrder] = useState<number>(1);
  const [addStatus, setAddStatus] = useState<"Active" | "Inactive">("Active");
  const [addOptionsText, setAddOptionsText] = useState("");

  // Edit field form state
  const [editName, setEditName] = useState("");
  const [editType, setEditType] = useState<CustomFieldType>("Multi Select");
  const [editRequired, setEditRequired] = useState<"Yes" | "No">("Yes");
  const [editInProductFilters, setEditInProductFilters] = useState(true);
  const [editOrder, setEditOrder] = useState<number>(1);
  const [editStatus, setEditStatus] = useState<"Active" | "Inactive">("Active");

  // Manage options single entry state
  const [newOptionInput, setNewOptionInput] = useState("");

  // Close dropdown on click outside
  const dropdownContainerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownContainerRef.current &&
        !dropdownContainerRef.current.contains(event.target as Node)
      ) {
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

  const filteredFields = useMemo(() => {
    return fields.filter((item) => {
      if (appliedSearch) {
        const matchesName = item.name.toLowerCase().includes(appliedSearch);
        const matchesId = item.id.toString().includes(appliedSearch);
        const matchesType = item.type.toLowerCase().includes(appliedSearch);
        if (!matchesName && !matchesId && !matchesType) return false;
      }
      return true;
    });
  }, [fields, appliedSearch]);

  const totalPages = Math.ceil(filteredFields.length / showCount) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedFields = useMemo(() => {
    const start = (safeCurrentPage - 1) * showCount;
    return filteredFields.slice(start, start + showCount);
  }, [filteredFields, safeCurrentPage, showCount]);

  // Toggle Product Filters
  const handleToggleProductFilter = (id: number) => {
    setFields((prev) =>
      prev.map((f) => {
        if (f.id === id) {
          const newState = !f.inProductFilters;
          setNotification(
            newState
              ? `"${f.name}" added to product filters.`
              : `"${f.name}" removed from product filters.`
          );
          setTimeout(() => setNotification(null), 3500);
          return { ...f, inProductFilters: newState };
        }
        return f;
      })
    );
  };

  const handleDelete = (id: number, name: string) => {
    if (confirm(`Are you sure you want to delete custom field "${name}"?`)) {
      setFields((prev) => prev.filter((f) => f.id !== id));
      setOpenOptionDropdownId(null);
      setNotification(`Custom field "${name}" deleted successfully.`);
      setTimeout(() => setNotification(null), 3500);
    }
  };

  const handleOpenEdit = (field: CustomFieldItem) => {
    setEditingField(field);
    setEditName(field.name);
    setEditType(field.type);
    setEditRequired(field.required);
    setEditInProductFilters(field.inProductFilters);
    setEditOrder(field.order);
    setEditStatus(field.status);
    setOpenOptionDropdownId(null);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingField || !editName.trim()) return;

    setFields((prev) =>
      prev.map((f) =>
        f.id === editingField.id
          ? {
              ...f,
              name: editName.trim(),
              type: editType,
              required: editRequired,
              inProductFilters: editInProductFilters,
              order: Number(editOrder) || 1,
              status: editStatus,
            }
          : f
      )
    );
    setEditingField(null);
    setNotification(`Custom field "${editName}" updated successfully.`);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addName.trim()) return;

    const newId = fields.length > 0 ? Math.max(...fields.map((f) => f.id)) + 1 : 1;
    const parsedOptions = addOptionsText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const newField: CustomFieldItem = {
      id: newId,
      name: addName.trim(),
      type: addType,
      inProductFilters: addInProductFilters,
      required: addRequired,
      order: Number(addOrder) || 1,
      status: addStatus,
      options: parsedOptions.length > 0 ? parsedOptions : ["Default Option 1", "Default Option 2"],
    };

    setFields((prev) => [newField, ...prev]);
    setIsAddModalOpen(false);
    setAddName("");
    setAddOptionsText("");
    setNotification(`Custom field "${newField.name}" added successfully.`);
    setTimeout(() => setNotification(null), 3500);
  };

  // Manage options handlers
  const handleOpenManageOptions = (field: CustomFieldItem) => {
    setManageOptionsField(field);
    setOpenOptionDropdownId(null);
    setNewOptionInput("");
  };

  const handleAddOptionItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manageOptionsField || !newOptionInput.trim()) return;

    const updatedOptions = [...manageOptionsField.options, newOptionInput.trim()];
    setFields((prev) =>
      prev.map((f) => (f.id === manageOptionsField.id ? { ...f, options: updatedOptions } : f))
    );
    setManageOptionsField({ ...manageOptionsField, options: updatedOptions });
    setNewOptionInput("");
  };

  const handleDeleteOptionItem = (indexToDelete: number) => {
    if (!manageOptionsField) return;
    const updatedOptions = manageOptionsField.options.filter((_, idx) => idx !== indexToDelete);
    setFields((prev) =>
      prev.map((f) => (f.id === manageOptionsField.id ? { ...f, options: updatedOptions } : f))
    );
    setManageOptionsField({ ...manageOptionsField, options: updatedOptions });
  };

  return (
    <div className="w-full text-[#333333] font-sans pb-16">
      {/* Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h1 className="text-[22px] font-normal text-[#333333]">Custom Fields</h1>

        {/* Action Buttons: Exactly matching screenshot */}
        <div className="flex items-center gap-2">
          {/* + Add Custom Field (Green) */}
          <button
            type="button"
            onClick={() => {
              setAddOrder(fields.length + 1);
              setIsAddModalOpen(true);
            }}
            className="bg-[#00a65a] hover:bg-[#008d4c] text-white text-[13px] font-medium h-[34px] px-3.5 rounded-[3px] flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Custom Field</span>
          </button>

          {/* Bulk Custom Field Upload (Teal) */}
          <button
            type="button"
            onClick={() => setIsBulkModalOpen(true)}
            className="bg-[#0097a7] hover:bg-[#00838f] text-white text-[13px] font-medium h-[34px] px-3.5 rounded-[3px] flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
          >
            <Upload className="w-4 h-4 stroke-[2.2]" />
            <span>Bulk Custom Field Upload</span>
          </button>
        </div>
      </div>

      {/* Success Notification Alert */}
      {notification && (
        <div className="mb-4 bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-2.5 rounded-[3px] text-sm flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{notification}</span>
          </div>
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="text-xs text-emerald-700 font-semibold hover:underline cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Table Box */}
      <div className="bg-white border border-[#d2d6de] rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.06)]">
        {/* Filter Bar: Show (15), Search, and Filter button */}
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
        <div className="overflow-x-auto" ref={dropdownContainerRef}>
          <table className="w-full min-w-[850px] text-left border-collapse text-[13px]">
            <thead>
              <tr className="border-b border-[#f4f4f4] text-[#333333] font-medium">
                <th className="py-3 px-4 w-[60px] font-semibold">Id</th>
                <th className="py-3 px-4 font-semibold">Name</th>
                <th className="py-3 px-4 font-semibold">Type</th>
                {/* Column for Product Filters action */}
                <th className="py-3 px-4 font-semibold w-[220px]"></th>
                <th className="py-3 px-4 font-semibold">Required</th>
                <th className="py-3 px-4 font-semibold">Order</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 w-[150px] font-semibold text-right sm:text-left">
                  Options
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedFields.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-gray-500">
                    No custom fields found.
                  </td>
                </tr>
              ) : (
                paginatedFields.map((field) => (
                  <tr
                    key={field.id}
                    className="border-b border-[#f4f4f4] hover:bg-[#f9fafc] transition-colors"
                  >
                    {/* Id */}
                    <td className="py-3.5 px-4 text-[#555] font-normal">{field.id}</td>

                    {/* Name */}
                    <td className="py-3.5 px-4 font-normal text-[#333333]">{field.name}</td>

                    {/* Type */}
                    <td className="py-3.5 px-4 text-[#555] font-normal">{field.type}</td>

                    {/* Product Filters Action Button */}
                    <td className="py-3.5 px-4">
                      {field.inProductFilters ? (
                        <button
                          type="button"
                          onClick={() => handleToggleProductFilter(field.id)}
                          className="bg-[#dd4b39] hover:bg-[#c23321] text-white text-[12px] font-medium py-1 px-3 rounded-[3px] flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shadow-xs"
                        >
                          <X className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>Remove from Product Filters</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleToggleProductFilter(field.id)}
                          className="bg-[#00a65a] hover:bg-[#008d4c] text-white text-[12px] font-medium py-1 px-3 rounded-[3px] flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shadow-xs"
                        >
                          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>Add to Product Filters</span>
                        </button>
                      )}
                    </td>

                    {/* Required */}
                    <td className="py-3.5 px-4 text-[#555] font-normal">{field.required}</td>

                    {/* Order */}
                    <td className="py-3.5 px-4 text-[#555] font-normal">{field.order}</td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-[2px] text-white select-none ${
                          field.status === "Active" ? "bg-[#00a65a]" : "bg-[#dd4b39]"
                        }`}
                      >
                        {field.status}
                      </span>
                    </td>

                    {/* Options Button */}
                    <td className="py-3.5 px-4 relative">
                      <div className="relative inline-block text-left">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenOptionDropdownId(
                              openOptionDropdownId === field.id ? null : field.id
                            )
                          }
                          className="bg-[#5b69bc] hover:bg-[#4d5aa3] text-white text-[12px] font-medium h-[30px] px-3 rounded-[3px] flex items-center gap-2 cursor-pointer transition-colors shadow-xs"
                        >
                          <span>Select an option</span>
                          <span className="text-[9px]">▼</span>
                        </button>

                        {/* Options Menu Dropdown */}
                        {openOptionDropdownId === field.id && (
                          <div className="absolute right-0 sm:left-0 top-[34px] w-[170px] bg-white border border-[#d2d6de] rounded-[3px] shadow-lg z-30 py-1 text-[12.5px]">
                            <button
                              type="button"
                              onClick={() => handleOpenEdit(field)}
                              className="w-full text-left px-3.5 py-1.5 text-gray-700 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                            >
                              <Edit2 className="w-3.5 h-3.5 text-blue-600" />
                              <span>Edit</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleOpenManageOptions(field)}
                              className="w-full text-left px-3.5 py-1.5 text-gray-700 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                            >
                              <ListOrdered className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Custom Field Options</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDelete(field.id, field.name)}
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
              type="button"
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
                type="button"
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

            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="min-w-[32px] h-[32px] px-2.5 rounded-[2px] border border-[#d2d6de] bg-white text-gray-700 hover:bg-gray-100 text-center transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      {/* Add Custom Field Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-[3px] shadow-xl border border-[#d2d6de] w-full max-w-[540px] overflow-hidden">
            <div className="px-5 py-3 border-b border-[#f4f4f4] flex items-center justify-between">
              <h3 className="text-[16px] font-normal text-[#333]">Add Custom Field</h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveAdd} className="p-5 space-y-4 text-[13px]">
              <div>
                <label className="block text-[#333] mb-1 font-medium">
                  Field Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Material, Fabric, Size"
                  value={addName}
                  onChange={(e) => setAddName(e.target.value)}
                  className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] outline-none focus:border-[#5b69bc]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#333] mb-1 font-medium">Type</label>
                  <select
                    value={addType}
                    onChange={(e) => setAddType(e.target.value as CustomFieldType)}
                    className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] outline-none focus:border-[#5b69bc] cursor-pointer"
                  >
                    <option value="Multi Select">Multi Select</option>
                    <option value="Dropdown">Dropdown</option>
                    <option value="Radio Button">Radio Button</option>
                    <option value="Checkbox">Checkbox</option>
                    <option value="Text">Text</option>
                    <option value="Number">Number</option>
                    <option value="Textarea">Textarea</option>
                    <option value="Date">Date</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#333] mb-1 font-medium">Required</label>
                  <select
                    value={addRequired}
                    onChange={(e) => setAddRequired(e.target.value as "Yes" | "No")}
                    className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] outline-none focus:border-[#5b69bc] cursor-pointer"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#333] mb-1 font-medium">Order</label>
                  <input
                    type="number"
                    min={1}
                    value={addOrder}
                    onChange={(e) => setAddOrder(Number(e.target.value))}
                    className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] outline-none focus:border-[#5b69bc]"
                  />
                </div>

                <div>
                  <label className="block text-[#333] mb-1 font-medium">Status</label>
                  <select
                    value={addStatus}
                    onChange={(e) => setAddStatus(e.target.value as "Active" | "Inactive")}
                    className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] outline-none focus:border-[#5b69bc] cursor-pointer"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer select-none text-[13px]">
                  <input
                    type="checkbox"
                    checked={addInProductFilters}
                    onChange={(e) => setAddInProductFilters(e.target.checked)}
                    className="rounded-[2px] text-[#5b69bc] focus:ring-0 cursor-pointer"
                  />
                  <span>Add to Product Filters</span>
                </label>
              </div>

              {(addType === "Multi Select" ||
                addType === "Dropdown" ||
                addType === "Radio Button" ||
                addType === "Checkbox") && (
                <div>
                  <label className="block text-[#333] mb-1 font-medium">
                    Options (one per line)
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Cotton&#10;Polyester&#10;Silk&#10;Wool"
                    value={addOptionsText}
                    onChange={(e) => setAddOptionsText(e.target.value)}
                    className="w-full p-2.5 border border-[#d2d6de] rounded-[3px] text-[13px] outline-none focus:border-[#5b69bc]"
                  />
                </div>
              )}

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
                  Add Custom Field
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Custom Field Modal */}
      {editingField && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-[3px] shadow-xl border border-[#d2d6de] w-full max-w-[500px] overflow-hidden">
            <div className="px-5 py-3 border-b border-[#f4f4f4] flex items-center justify-between">
              <h3 className="text-[16px] font-normal text-[#333]">
                Edit Custom Field - {editingField.name}
              </h3>
              <button
                type="button"
                onClick={() => setEditingField(null)}
                className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveEdit} className="p-5 space-y-4 text-[13px]">
              <div>
                <label className="block text-[#333] mb-1 font-medium">
                  Field Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] outline-none focus:border-[#5b69bc]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#333] mb-1 font-medium">Type</label>
                  <select
                    value={editType}
                    onChange={(e) => setEditType(e.target.value as CustomFieldType)}
                    className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] outline-none focus:border-[#5b69bc] cursor-pointer"
                  >
                    <option value="Multi Select">Multi Select</option>
                    <option value="Dropdown">Dropdown</option>
                    <option value="Radio Button">Radio Button</option>
                    <option value="Checkbox">Checkbox</option>
                    <option value="Text">Text</option>
                    <option value="Number">Number</option>
                    <option value="Textarea">Textarea</option>
                    <option value="Date">Date</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#333] mb-1 font-medium">Required</label>
                  <select
                    value={editRequired}
                    onChange={(e) => setEditRequired(e.target.value as "Yes" | "No")}
                    className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] outline-none focus:border-[#5b69bc] cursor-pointer"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#333] mb-1 font-medium">Order</label>
                  <input
                    type="number"
                    min={1}
                    value={editOrder}
                    onChange={(e) => setEditOrder(Number(e.target.value))}
                    className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] outline-none focus:border-[#5b69bc]"
                  />
                </div>

                <div>
                  <label className="block text-[#333] mb-1 font-medium">Status</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as "Active" | "Inactive")}
                    className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] outline-none focus:border-[#5b69bc] cursor-pointer"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer select-none text-[13px]">
                  <input
                    type="checkbox"
                    checked={editInProductFilters}
                    onChange={(e) => setEditInProductFilters(e.target.checked)}
                    className="rounded-[2px] text-[#5b69bc] focus:ring-0 cursor-pointer"
                  />
                  <span>Add to Product Filters</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#f4f4f4]">
                <button
                  type="button"
                  onClick={() => setEditingField(null)}
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

      {/* Bulk Custom Field Upload Modal */}
      {isBulkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-[3px] shadow-xl border border-[#d2d6de] w-full max-w-[540px] overflow-hidden">
            <div className="px-5 py-3 border-b border-[#f4f4f4] flex items-center justify-between">
              <h3 className="text-[16px] font-normal text-[#333]">
                Bulk Custom Field Upload
              </h3>
              <button
                type="button"
                onClick={() => setIsBulkModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-4 text-[13px]">
              <div className="bg-blue-50 border border-blue-200 text-blue-800 p-3.5 rounded-[3px] text-[12.5px] leading-relaxed">
                <p className="font-semibold mb-1">Upload Guidelines:</p>
                <p>
                  1. You can upload custom fields using a standard CSV file.
                  <br />
                  2. Make sure column names match the CSV template format.
                </p>
              </div>

              <div className="flex items-center justify-between p-3 border border-[#d2d6de] rounded-[3px] bg-gray-50">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                  <span className="font-medium text-gray-700">
                    custom_fields_template.csv
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => alert("Downloading custom_fields_template.csv...")}
                  className="text-xs bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium px-3 py-1.5 rounded-[2px] flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Template</span>
                </button>
              </div>

              <div>
                <label className="block text-[#333] mb-1 font-medium">
                  Select CSV File
                </label>
                <input
                  type="file"
                  accept=".csv"
                  className="w-full text-xs text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-[2px] file:border-0 file:text-xs file:font-medium file:bg-[#5b69bc] file:text-white hover:file:bg-[#4d5aa3] cursor-pointer"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#f4f4f4]">
                <button
                  type="button"
                  onClick={() => setIsBulkModalOpen(false)}
                  className="px-4 py-1.5 border border-[#d2d6de] rounded-[3px] text-[#555] hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsBulkModalOpen(false);
                    setNotification("Custom fields bulk upload completed successfully.");
                    setTimeout(() => setNotification(null), 3500);
                  }}
                  className="px-4 py-1.5 bg-[#0097a7] hover:bg-[#00838f] text-white rounded-[3px] font-medium cursor-pointer"
                >
                  Upload CSV
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manage Options Modal */}
      {manageOptionsField && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-[3px] shadow-xl border border-[#d2d6de] w-full max-w-[500px] overflow-hidden">
            <div className="px-5 py-3 border-b border-[#f4f4f4] flex items-center justify-between">
              <h3 className="text-[16px] font-normal text-[#333]">
                Manage Options - {manageOptionsField.name}
              </h3>
              <button
                type="button"
                onClick={() => setManageOptionsField(null)}
                className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-4 text-[13px]">
              {/* Add single option input */}
              <form onSubmit={handleAddOptionItem} className="flex gap-2">
                <input
                  type="text"
                  placeholder="New option name (e.g. Denim, Cotton)"
                  value={newOptionInput}
                  onChange={(e) => setNewOptionInput(e.target.value)}
                  className="flex-1 h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] outline-none focus:border-[#5b69bc]"
                />
                <button
                  type="submit"
                  className="bg-[#00a65a] hover:bg-[#008d4c] text-white px-3.5 rounded-[3px] font-medium text-xs flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </form>

              {/* Options list */}
              <div className="border border-[#d2d6de] rounded-[3px] max-h-[260px] overflow-y-auto divide-y divide-[#f4f4f4]">
                {manageOptionsField.options.length === 0 ? (
                  <div className="p-4 text-center text-gray-400 text-xs">
                    No options created yet.
                  </div>
                ) : (
                  manageOptionsField.options.map((opt, idx) => (
                    <div
                      key={idx}
                      className="px-3.5 py-2 flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-gray-800 font-medium">{opt}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteOptionItem(idx)}
                        className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                        title="Delete option"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div className="flex justify-end pt-3 border-t border-[#f4f4f4]">
                <button
                  type="button"
                  onClick={() => setManageOptionsField(null)}
                  className="px-4 py-1.5 bg-[#5b69bc] hover:bg-[#4d5aa3] text-white rounded-[3px] font-medium cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
