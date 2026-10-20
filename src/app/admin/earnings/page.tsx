"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Trash2,
  CheckCircle,
  Eye,
} from "lucide-react";

export interface EarningRecord {
  id: number;
  orderNumber: string;
  user: string;
  total: string;
  vat: string;
  commission: string;
  referrerCommission: string;
  referralDiscount: string;
  discountCoupon: string;
  shippingCost: string;
  earnedAmount: string;
  date: string;
}

const INITIAL_EARNINGS: EarningRecord[] = [
  {
    id: 27,
    orderNumber: "#10047",
    user: "Trendshop",
    total: "$29",
    vat: "$2.90 (10%)",
    commission: "$2.90 (10%)",
    referrerCommission: "$0 (0%)",
    referralDiscount: "$0 (0%)",
    discountCoupon: "$0",
    shippingCost: "$0",
    earnedAmount: "$29",
    date: "2026-10-19 / 18:53",
  },
  {
    id: 26,
    orderNumber: "#10046",
    user: "Trendshop",
    total: "$69",
    vat: "$6.90 (10%)",
    commission: "$6.90 (10%)",
    referrerCommission: "$0 (0%)",
    referralDiscount: "$0 (0%)",
    discountCoupon: "$0",
    shippingCost: "$5",
    earnedAmount: "$74",
    date: "2026-10-17 / 23:30",
  },
  {
    id: 25,
    orderNumber: "#10031",
    user: "Admin",
    total: "$240",
    vat: "$0",
    commission: "$12 (5%)",
    referrerCommission: "$0 (0%)",
    referralDiscount: "$0 (0%)",
    discountCoupon: "$0",
    shippingCost: "$5",
    earnedAmount: "$233",
    date: "2026-10-17 / 21:36",
  },
  {
    id: 24,
    orderNumber: "#10033",
    user: "Admin",
    total: "$80",
    vat: "$0",
    commission: "$12 (15%)",
    referrerCommission: "$0 (0%)",
    referralDiscount: "$0 (0%)",
    discountCoupon: "$0",
    shippingCost: "$0",
    earnedAmount: "$68",
    date: "2026-10-04 / 20:20",
  },
  {
    id: 23,
    orderNumber: "#10033",
    user: "Trendshop",
    total: "$69",
    vat: "$6.90 (10%)",
    commission: "$6.90 (10%)",
    referrerCommission: "$0 (0%)",
    referralDiscount: "$0 (0%)",
    discountCoupon: "$0",
    shippingCost: "$2",
    earnedAmount: "$71",
    date: "2026-10-04 / 20:20",
  },
  {
    id: 22,
    orderNumber: "#10010",
    user: "Trendshop",
    total: "$69",
    vat: "$6.90 (10%)",
    commission: "$6.90 (10%)",
    referrerCommission: "$0 (0%)",
    referralDiscount: "$0 (0%)",
    discountCoupon: "$0",
    shippingCost: "$1.67",
    earnedAmount: "$70.67",
    date: "2026-09-25 / 14:03",
  },
  {
    id: 21,
    orderNumber: "#10010",
    user: "Trendshop",
    total: "$40",
    vat: "$4 (10%)",
    commission: "$6 (15%)",
    referrerCommission: "$0 (0%)",
    referralDiscount: "$0 (0%)",
    discountCoupon: "$0",
    shippingCost: "$1.67",
    earnedAmount: "$39.67",
    date: "2026-09-25 / 14:03",
  },
  {
    id: 20,
    orderNumber: "#10033",
    user: "Admin",
    total: "$15",
    vat: "$0",
    commission: "$0.75 (5%)",
    referrerCommission: "$0 (0%)",
    referralDiscount: "$0 (0%)",
    discountCoupon: "$0",
    shippingCost: "$0",
    earnedAmount: "$14.25",
    date: "2026-09-23 / 17:23",
  },
  {
    id: 19,
    orderNumber: "#10029",
    user: "Trendshop",
    total: "$29",
    vat: "$2.90 (10%)",
    commission: "$2.90 (10%)",
    referrerCommission: "$0 (0%)",
    referralDiscount: "$0 (0%)",
    discountCoupon: "$0",
    shippingCost: "$2.50",
    earnedAmount: "$31.50",
    date: "2026-09-22 / 06:40",
  },
  {
    id: 18,
    orderNumber: "#10025",
    user: "Trendshop",
    total: "₦43,737.51",
    vat: "₦4,373.75 (10%)",
    commission: "₦4,373.75 (10%)",
    referrerCommission: "₦0 (0%)",
    referralDiscount: "₦0 (0%)",
    discountCoupon: "₦0",
    shippingCost: "₦0",
    earnedAmount: "₦43,737.51",
    date: "2026-09-16 / 10:38",
  },
  {
    id: 17,
    orderNumber: "#10011",
    user: "Admin",
    total: "$49",
    vat: "$0",
    commission: "$2.45 (5%)",
    referrerCommission: "$0 (0%)",
    referralDiscount: "$0 (0%)",
    discountCoupon: "$0",
    shippingCost: "$0",
    earnedAmount: "$46.55",
    date: "2026-09-16 / 10:12",
  },
  {
    id: 16,
    orderNumber: "#10010",
    user: "Admin",
    total: "$59",
    vat: "$0",
    commission: "$5.90 (10%)",
    referrerCommission: "$0 (0%)",
    referralDiscount: "$0 (0%)",
    discountCoupon: "$0",
    shippingCost: "$0",
    earnedAmount: "$53.10",
    date: "2026-09-16 / 10:12",
  },
  {
    id: 15,
    orderNumber: "#10015",
    user: "Trendshop",
    total: "$36",
    vat: "$3.60 (10%)",
    commission: "$3.60 (10%)",
    referrerCommission: "$0 (0%)",
    referralDiscount: "$0 (0%)",
    discountCoupon: "$0",
    shippingCost: "$0",
    earnedAmount: "$36",
    date: "2026-09-06 / 02:14",
  },
  {
    id: 14,
    orderNumber: "#10011",
    user: "Trendshop",
    total: "$10",
    vat: "$1 (10%)",
    commission: "$1 (10%)",
    referrerCommission: "$0 (0%)",
    referralDiscount: "$0 (0%)",
    discountCoupon: "$0",
    shippingCost: "$0",
    earnedAmount: "$10",
    date: "2026-08-31 / 18:56",
  },
  {
    id: 13,
    orderNumber: "#10010",
    user: "Admin",
    total: "$19",
    vat: "$0",
    commission: "$0.95 (5%)",
    referrerCommission: "$0 (0%)",
    referralDiscount: "$0 (0%)",
    discountCoupon: "$0",
    shippingCost: "$0",
    earnedAmount: "$18.05",
    date: "2026-08-31 / 17:37",
  },
];

export default function AdminEarningsPage() {
  const [earnings, setEarnings] = useState<EarningRecord[]>(INITIAL_EARNINGS);
  const [showCount, setShowCount] = useState<number>(15);
  const [searchInput, setSearchInput] = useState<string>("");
  const [appliedSearch, setAppliedSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openOptionDropdownId, setOpenOptionDropdownId] = useState<number | null>(null);

  // Notification
  const [notification, setNotification] = useState<string | null>(null);

  // Close dropdown on outside click
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

  const filteredEarnings = useMemo(() => {
    return earnings.filter((item) => {
      if (appliedSearch) {
        const matchesOrder = item.orderNumber
          .toLowerCase()
          .includes(appliedSearch);
        const matchesUser = item.user.toLowerCase().includes(appliedSearch);
        const matchesId = item.id.toString().includes(appliedSearch);
        if (!matchesOrder && !matchesUser && !matchesId) return false;
      }
      return true;
    });
  }, [earnings, appliedSearch]);

  const totalPages = Math.ceil(filteredEarnings.length / showCount) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedEarnings = useMemo(() => {
    const start = (safeCurrentPage - 1) * showCount;
    return filteredEarnings.slice(start, start + showCount);
  }, [filteredEarnings, safeCurrentPage, showCount]);

  const handleDelete = (id: number, orderNumber: string) => {
    if (confirm(`Are you sure you want to delete earning record for ${orderNumber}?`)) {
      setEarnings((prev) => prev.filter((e) => e.id !== id));
      setOpenOptionDropdownId(null);
      setNotification(`Earning record for ${orderNumber} deleted successfully.`);
      setTimeout(() => setNotification(null), 3500);
    }
  };

  return (
    <div className="w-full text-[#333333] font-sans pb-16">
      {/* Page Title */}
      <div className="mb-4">
        <h1 className="text-[22px] font-normal text-[#333333]">Earnings</h1>
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
        {/* Filter Bar: Show (15), Search (Order Number), and Filter button */}
        <div className="p-4 border-b border-[#f4f4f4] flex flex-wrap items-center gap-5 text-[13px]">
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
            <span className="text-[#333333] font-normal">Search</span>
            <input
              type="text"
              placeholder="Order Number"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="border border-[#d2d6de] rounded-[3px] h-[32px] px-3 w-[160px] text-[13px] text-[#555] outline-none focus:border-[#5b69bc] placeholder-gray-400"
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
          <table className="w-full min-w-[900px] text-left border-collapse text-[13px]">
            <thead>
              <tr className="border-b border-[#f4f4f4] text-[#333333] font-medium">
                <th className="py-3 px-4 w-[50px] font-semibold">Id</th>
                <th className="py-3 px-4 font-semibold">Order</th>
                <th className="py-3 px-4 font-semibold">User</th>
                <th className="py-3 px-4 font-semibold">Total</th>
                <th className="py-3 px-4 font-semibold">VAT</th>
                <th className="py-3 px-4 font-semibold min-w-[200px]">
                  Commissions & Discounts
                </th>
                <th className="py-3 px-4 font-semibold">Shipping Cost</th>
                <th className="py-3 px-4 font-semibold">Earned Amount</th>
                <th className="py-3 px-4 font-semibold">Date</th>
                <th className="py-3 px-4 font-semibold w-[150px]">Options</th>
              </tr>
            </thead>
            <tbody>
              {paginatedEarnings.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-gray-500">
                    No earnings found.
                  </td>
                </tr>
              ) : (
                paginatedEarnings.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#f4f4f4] hover:bg-[#f9fafc] transition-colors"
                  >
                    {/* Id */}
                    <td className="py-3.5 px-4 text-[#555] font-normal">{item.id}</td>

                    {/* Order */}
                    <td className="py-3.5 px-4 font-normal">
                      <Link
                        href={`/admin/orders?order=${item.orderNumber.replace("#", "")}`}
                        className="text-[#333333] hover:text-[#3c8dbc]"
                      >
                        {item.orderNumber}
                      </Link>
                    </td>

                    {/* User */}
                    <td className="py-3.5 px-4 text-[#555] font-normal whitespace-nowrap">
                      {item.user}
                    </td>

                    {/* Total */}
                    <td className="py-3.5 px-4 text-[#555] font-normal whitespace-nowrap">
                      {item.total}
                    </td>

                    {/* VAT */}
                    <td className="py-3.5 px-4 text-[#555] font-normal whitespace-nowrap">
                      {item.vat}
                    </td>

                    {/* Commissions & Discounts (Multi-line exact Modesy format) */}
                    <td className="py-3.5 px-4 text-[12px] leading-snug">
                      <div className="text-[#c0392b] space-y-0.5">
                        <div>Commission: {item.commission}</div>
                        <div>Referrer Commission: {item.referrerCommission}</div>
                        <div>Referral Discount: {item.referralDiscount}</div>
                        <div>Discount Coupon: {item.discountCoupon}</div>
                      </div>
                    </td>

                    {/* Shipping Cost */}
                    <td className="py-3.5 px-4 text-[#555] font-normal whitespace-nowrap">
                      {item.shippingCost}
                    </td>

                    {/* Earned Amount */}
                    <td className="py-3.5 px-4 text-[#555] font-normal whitespace-nowrap">
                      {item.earnedAmount}
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-[#666666] whitespace-nowrap">
                      {item.date}
                    </td>

                    {/* Options (Select an option dropdown) */}
                    <td className="py-3.5 px-4 relative">
                      <div className="relative inline-block text-left">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenOptionDropdownId(
                              openOptionDropdownId === item.id ? null : item.id
                            )
                          }
                          className="bg-[#5b69bc] hover:bg-[#4d5aa3] text-white text-[12px] font-medium h-[30px] px-3 rounded-[3px] flex items-center gap-2 cursor-pointer transition-colors shadow-xs"
                        >
                          <span>Select an option</span>
                          <span className="text-[9px]">▼</span>
                        </button>

                        {/* Dropdown Menu */}
                        {openOptionDropdownId === item.id && (
                          <div className="absolute right-0 sm:left-0 top-[34px] w-[140px] bg-white border border-[#d2d6de] rounded-[3px] shadow-lg z-30 py-1 text-[12.5px]">
                            <Link
                              href={`/admin/orders?order=${item.orderNumber.replace("#", "")}`}
                              className="w-full text-left px-3.5 py-1.5 text-gray-700 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5 text-blue-600" />
                              <span>View Order</span>
                            </Link>

                            <button
                              type="button"
                              onClick={() => handleDelete(item.id, item.orderNumber)}
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

        {/* Pagination & Count */}
        <div className="p-4 border-t border-[#f4f4f4] flex flex-wrap items-center justify-between gap-3">
          <div className="text-[13px] text-[#555] font-normal">
            Number of Entries:{" "}
            <span className="font-semibold">{filteredEarnings.length}</span>
          </div>

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
    </div>
  );
}
