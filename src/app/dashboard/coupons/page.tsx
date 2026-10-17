"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, X, Check, Search } from "lucide-react";

interface CouponItem {
  id: string;
  code: string;
  discountRate: string; // e.g. "15%"
  totalCoupons: number; // e.g. 100000
  usedCoupons: number; // e.g. 2
  expiryDate: string; // e.g. "2027-03-31 / 13:57"
  status: "Active" | "Expired";
  date: string; // e.g. "2026-08-05 / 12:57"
  selectedProductIds?: string[];
}

const initialCoupons: CouponItem[] = [
  {
    id: "1",
    code: "41GNOLDX",
    discountRate: "15%",
    totalCoupons: 100000,
    usedCoupons: 2,
    expiryDate: "2027-03-31 / 13:57",
    status: "Active",
    date: "2026-08-05 / 12:57",
    selectedProductIds: ["all"],
  },
];

// Sample vendor products for product selector modal
const sampleProducts = [
  { id: "43", title: "Black fashion women backpack", sku: "B1F2W3B4P5K6" },
  { id: "41", title: "Black midi skirt with white flowers", sku: "B1M2S3W4F5L6" },
  { id: "39", title: "Embroidered black women shoes", sku: "EBW2S3W4F5L6" },
  { id: "37", title: "Floral print summer dress", sku: "FPS2D3W4F5L6" },
  { id: "35", title: "Men outerwear navy color", sku: "M1O2N3C4L5R6" },
  { id: "33", title: "Animation of popular vacation spots", sku: "AIP2V3S4P5T6" },
  { id: "10", title: "Black gold fashion backpack", sku: "HIKIRJZ1K4" },
];

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<CouponItem[]>(initialCoupons);

  // Modal states
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<CouponItem | null>(null);
  const [selectProductsModalCoupon, setSelectProductsModalCoupon] = useState<CouponItem | null>(null);

  // Form state for Add/Edit
  const [formData, setFormData] = useState({
    code: "",
    discountRate: "10",
    totalCoupons: 100,
    expiryDate: "2027-12-31",
    expiryTime: "23:59",
    status: "Active" as "Active" | "Expired",
  });

  // Selected products state for modal
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>(["all"]);
  const [productSearch, setProductSearch] = useState("");

  const handleOpenAddModal = () => {
    // Generate a random 8-character coupon code
    const randomCode = Math.random().toString(36).substring(2, 10).toUpperCase();
    setFormData({
      code: randomCode,
      discountRate: "10",
      totalCoupons: 1000,
      expiryDate: "2027-12-31",
      expiryTime: "23:59",
      status: "Active",
    });
    setEditingCoupon(null);
    setAddModalOpen(true);
  };

  const handleOpenEditModal = (coupon: CouponItem) => {
    setEditingCoupon(coupon);
    setFormData({
      code: coupon.code,
      discountRate: coupon.discountRate.replace("%", ""),
      totalCoupons: coupon.totalCoupons,
      expiryDate: coupon.expiryDate.split(" / ")[0] || "2027-12-31",
      expiryTime: coupon.expiryDate.split(" / ")[1] || "23:59",
      status: coupon.status,
    });
    setAddModalOpen(true);
  };

  const handleSaveCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.code.trim()) return;

    if (editingCoupon) {
      setCoupons((prev) =>
        prev.map((c) =>
          c.id === editingCoupon.id
            ? {
                ...c,
                code: formData.code.trim().toUpperCase(),
                discountRate: `${formData.discountRate}%`,
                totalCoupons: Number(formData.totalCoupons) || 1,
                expiryDate: `${formData.expiryDate} / ${formData.expiryTime}`,
                status: formData.status,
              }
            : c
        )
      );
    } else {
      const now = new Date();
      const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} / ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      const newCoupon: CouponItem = {
        id: String(Date.now()),
        code: formData.code.trim().toUpperCase(),
        discountRate: `${formData.discountRate}%`,
        totalCoupons: Number(formData.totalCoupons) || 1,
        usedCoupons: 0,
        expiryDate: `${formData.expiryDate} / ${formData.expiryTime}`,
        status: formData.status,
        date: dateStr,
        selectedProductIds: ["all"],
      };
      setCoupons((prev) => [newCoupon, ...prev]);
    }

    setAddModalOpen(false);
    setEditingCoupon(null);
  };

  const handleDeleteCoupon = (id: string) => {
    if (confirm("Are you sure you want to delete this coupon?")) {
      setCoupons((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const handleOpenSelectProducts = (coupon: CouponItem) => {
    setSelectProductsModalCoupon(coupon);
    setSelectedProductIds(coupon.selectedProductIds || ["all"]);
    setProductSearch("");
  };

  const handleSaveSelectedProducts = () => {
    if (!selectProductsModalCoupon) return;
    setCoupons((prev) =>
      prev.map((c) =>
        c.id === selectProductsModalCoupon.id
          ? { ...c, selectedProductIds }
          : c
      )
    );
    setSelectProductsModalCoupon(null);
  };

  const toggleProductSelection = (productId: string) => {
    if (productId === "all") {
      if (selectedProductIds.includes("all")) {
        setSelectedProductIds([]);
      } else {
        setSelectedProductIds(["all"]);
      }
      return;
    }

    let updated = selectedProductIds.filter((id) => id !== "all");
    if (updated.includes(productId)) {
      updated = updated.filter((id) => id !== productId);
    } else {
      updated.push(productId);
    }
    setSelectedProductIds(updated);
  };

  const filteredProductsList = sampleProducts.filter((p) =>
    p.title.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.sku.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div className="w-full">
      {/* Main Container Card */}
      <div className="bg-white rounded-[4px] border border-[#e9ecef] p-6 shadow-xs">
        {/* Header Row: Title & Add Coupon Button */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[20px] font-bold text-[#2c333e] font-sans">
            Coupons
          </h1>

          <button
            type="button"
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#00ab97] hover:bg-[#009180] text-white text-[13px] font-medium rounded-[3px] transition-colors shadow-2xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Coupon</span>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px] border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-[#dee2e6] text-[#2c333e] font-semibold text-[13px]">
                <th className="py-3 px-3 w-[140px]">Coupon Code</th>
                <th className="py-3 px-3 w-[120px]">Discount Rate</th>
                <th className="py-3 px-3 w-[180px]">Number of Coupons</th>
                <th className="py-3 px-3 w-[160px]">Expiry Date</th>
                <th className="py-3 px-3 w-[100px]">Status</th>
                <th className="py-3 px-3 w-[160px]">Date</th>
                <th className="py-3 px-3 w-[140px]">Products</th>
                <th className="py-3 px-3 w-[100px]">Options</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f3f5]">
              {coupons.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-[#6c757d] text-[13.5px]">
                    No records found!
                  </td>
                </tr>
              ) : (
                coupons.map((item) => (
                  <tr key={item.id} className="hover:bg-[#fafbfc] transition-colors">
                    {/* Coupon Code */}
                    <td className="py-3.5 px-3 font-medium text-[#2c333e]">
                      {item.code}
                    </td>

                    {/* Discount Rate */}
                    <td className="py-3.5 px-3 text-[#2c333e]">
                      {item.discountRate}
                    </td>

                    {/* Number of Coupons */}
                    <td className="py-3.5 px-3 text-[#2c333e]">
                      <span>{item.totalCoupons}</span>{" "}
                      <span className="text-[#dc2626] font-medium">
                        (Used: {item.usedCoupons})
                      </span>
                    </td>

                    {/* Expiry Date */}
                    <td className="py-3.5 px-3 text-[#495057] text-[12.5px]">
                      {item.expiryDate}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-3">
                      {item.status === "Active" ? (
                        <span className="inline-block bg-[#00ab97] text-white text-[11px] font-medium px-2 py-0.5 rounded-[2px] leading-tight">
                          Active
                        </span>
                      ) : (
                        <span className="inline-block bg-[#e9ecef] text-[#495057] text-[11px] font-medium px-2 py-0.5 rounded-[2px] leading-tight">
                          Expired
                        </span>
                      )}
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-3 text-[#495057] text-[12.5px]">
                      {item.date}
                    </td>

                    {/* Products Button */}
                    <td className="py-3.5 px-3">
                      <button
                        type="button"
                        onClick={() => handleOpenSelectProducts(item)}
                        className="px-3 py-1.5 bg-[#007bff] hover:bg-[#0069d9] text-white text-[12px] font-medium rounded-[3px] transition-colors shadow-2xs cursor-pointer leading-tight"
                      >
                        Select Products
                      </button>
                    </td>

                    {/* Options Buttons */}
                    <td className="py-3.5 px-3">
                      <div className="inline-flex items-center gap-1 bg-[#e9ecef] p-0.5 rounded-[3px]">
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(item)}
                          title="Edit Coupon"
                          className="p-1 text-[#495057] hover:text-[#2c333e] hover:bg-white rounded-[2px] transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteCoupon(item.id)}
                          title="Delete Coupon"
                          className="p-1 text-[#495057] hover:text-[#dc2626] hover:bg-white rounded-[2px] transition-colors cursor-pointer"
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

        {/* Footer: Number of Entries */}
        <div className="pt-5 mt-2 border-t border-[#f1f3f5] text-[#495057] select-none">
          <span className="text-[12.5px] font-medium">
            Number of Entries: {coupons.length}
          </span>
        </div>
      </div>

      {/* Add / Edit Coupon Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-[4px] shadow-2xl w-full max-w-md border border-[#e9ecef] overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#f1f3f5]">
              <h2 className="text-[16px] font-bold text-[#2c333e] font-sans">
                {editingCoupon ? "Edit Coupon" : "Add Coupon"}
              </h2>
              <button
                type="button"
                onClick={() => setAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCoupon}>
              <div className="p-6 space-y-4">
                {/* Coupon Code */}
                <div>
                  <label className="block text-[13px] font-bold text-[#2c333e] mb-1.5 font-sans">
                    Coupon Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      placeholder="e.g. 41GNOLDX"
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                      className="flex-1 h-[36px] border border-[#d1d5db] rounded-[3px] px-3 text-[13px] text-[#495057] uppercase outline-none focus:border-[#00ab97]"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          code: Math.random().toString(36).substring(2, 10).toUpperCase(),
                        })
                      }
                      className="px-3 h-[36px] border border-[#d1d5db] bg-gray-50 hover:bg-gray-100 text-[#495057] text-xs font-semibold rounded-[3px] transition-colors cursor-pointer"
                    >
                      Generate
                    </button>
                  </div>
                </div>

                {/* Discount Rate */}
                <div>
                  <label className="block text-[13px] font-bold text-[#2c333e] mb-1.5 font-sans">
                    Discount Rate (%)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    required
                    placeholder="e.g. 15"
                    value={formData.discountRate}
                    onChange={(e) => setFormData({ ...formData, discountRate: e.target.value })}
                    className="w-full h-[36px] border border-[#d1d5db] rounded-[3px] px-3 text-[13px] text-[#495057] outline-none focus:border-[#00ab97]"
                  />
                </div>

                {/* Number of Coupons */}
                <div>
                  <label className="block text-[13px] font-bold text-[#2c333e] mb-1.5 font-sans">
                    Number of Coupons
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    placeholder="e.g. 100000"
                    value={formData.totalCoupons}
                    onChange={(e) => setFormData({ ...formData, totalCoupons: Number(e.target.value) })}
                    className="w-full h-[36px] border border-[#d1d5db] rounded-[3px] px-3 text-[13px] text-[#495057] outline-none focus:border-[#00ab97]"
                  />
                </div>

                {/* Expiry Date & Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[13px] font-bold text-[#2c333e] mb-1.5 font-sans">
                      Expiry Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.expiryDate}
                      onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                      className="w-full h-[36px] border border-[#d1d5db] rounded-[3px] px-3 text-[13px] text-[#495057] outline-none focus:border-[#00ab97]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-[#2c333e] mb-1.5 font-sans">
                      Expiry Time
                    </label>
                    <input
                      type="time"
                      required
                      value={formData.expiryTime}
                      onChange={(e) => setFormData({ ...formData, expiryTime: e.target.value })}
                      className="w-full h-[36px] border border-[#d1d5db] rounded-[3px] px-3 text-[13px] text-[#495057] outline-none focus:border-[#00ab97]"
                    />
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-[13px] font-bold text-[#2c333e] mb-1.5 font-sans">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full h-[36px] border border-[#d1d5db] rounded-[3px] px-3 text-[13px] text-[#495057] bg-white outline-none focus:border-[#00ab97]"
                  >
                    <option value="Active">Active</option>
                    <option value="Expired">Expired</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 px-6 py-3.5 bg-[#f8fafc] border-t border-[#f1f3f5]">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 border border-[#d1d5db] text-[#495057] text-xs font-semibold rounded-[3px] hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#00ab97] hover:bg-[#009180] text-white text-xs font-semibold rounded-[3px] transition-colors cursor-pointer"
                >
                  {editingCoupon ? "Save Changes" : "Create Coupon"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Select Products Modal */}
      {selectProductsModalCoupon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-[4px] shadow-2xl w-full max-w-lg border border-[#e9ecef] overflow-hidden flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#f1f3f5]">
              <h2 className="text-[16px] font-bold text-[#2c333e] font-sans">
                Select Products for Coupon ({selectProductsModalCoupon.code})
              </h2>
              <button
                type="button"
                onClick={() => setSelectProductsModalCoupon(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 flex-1 overflow-y-auto space-y-4">
              {/* Option to apply to all products */}
              <div
                onClick={() => toggleProductSelection("all")}
                className={`p-3 rounded-[3px] border cursor-pointer flex items-center justify-between transition-colors ${
                  selectedProductIds.includes("all")
                    ? "bg-[#e8f7f5] border-[#00ab97] text-[#00ab97]"
                    : "bg-[#f8fafc] border-[#e9ecef] text-[#495057] hover:bg-gray-50"
                }`}
              >
                <div className="font-semibold text-sm">
                  Apply to ALL Products
                </div>
                <div
                  className={`w-5 h-5 rounded-[3px] border flex items-center justify-center ${
                    selectedProductIds.includes("all")
                      ? "bg-[#00ab97] border-[#00ab97] text-white"
                      : "border-[#d1d5db] bg-white"
                  }`}
                >
                  {selectedProductIds.includes("all") && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>

              {!selectedProductIds.includes("all") && (
                <>
                  {/* Search products */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search specific products..."
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="w-full h-[36px] border border-[#d1d5db] rounded-[3px] pl-9 pr-3 text-[13px] text-[#495057] outline-none focus:border-[#00ab97]"
                    />
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5 pointer-events-none" />
                  </div>

                  {/* List of specific products */}
                  <div className="divide-y divide-[#f1f3f5] border border-[#e9ecef] rounded-[3px] max-h-60 overflow-y-auto">
                    {filteredProductsList.map((product) => {
                      const isSelected = selectedProductIds.includes(product.id);
                      return (
                        <div
                          key={product.id}
                          onClick={() => toggleProductSelection(product.id)}
                          className="p-3 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <div>
                            <p className="text-xs font-semibold text-[#2c333e]">{product.title}</p>
                            <p className="text-[11px] text-gray-500">SKU: {product.sku}</p>
                          </div>
                          <div
                            className={`w-4 h-4 rounded-[2px] border flex items-center justify-center ${
                              isSelected
                                ? "bg-[#00ab97] border-[#00ab97] text-white"
                                : "border-[#d1d5db] bg-white"
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 px-6 py-3.5 bg-[#f8fafc] border-t border-[#f1f3f5]">
              <button
                type="button"
                onClick={() => setSelectProductsModalCoupon(null)}
                className="px-4 py-2 border border-[#d1d5db] text-[#495057] text-xs font-semibold rounded-[3px] hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveSelectedProducts}
                className="px-4 py-2 bg-[#00ab97] hover:bg-[#009180] text-white text-xs font-semibold rounded-[3px] transition-colors cursor-pointer"
              >
                Save Selection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
