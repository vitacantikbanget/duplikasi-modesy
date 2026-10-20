"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Home, ChevronDown, Trash2 } from "lucide-react";

interface EarningRecord {
  id: number;
  orderNumber: string;
  user: string;
  userEmail: string;
  totalPrice: string;
  commissionRate: string;
  shippingCost: string;
  earnedAmount: string;
  date: string;
}

const INITIAL_EARNINGS: EarningRecord[] = [
  { id: 46, orderNumber: "#10046", user: "Trendshop", userEmail: "trendshop@codingest.net", totalPrice: "$84.35", commissionRate: "10%", shippingCost: "$0.00", earnedAmount: "$75.92", date: "2026-10-17 / 19:08" },
  { id: 45, orderNumber: "#10045", user: "Trendshop", userEmail: "trendshop@codingest.net", totalPrice: "$60.20", commissionRate: "10%", shippingCost: "$0.00", earnedAmount: "$54.18", date: "2026-10-17 / 08:08" },
  { id: 44, orderNumber: "#10044", user: "Admin", userEmail: "admin@codingest.net", totalPrice: "$154.00", commissionRate: "8%", shippingCost: "$12.00", earnedAmount: "$141.68", date: "2026-10-14 / 20:42" },
  { id: 43, orderNumber: "#10043", user: "Trendshop", userEmail: "trendshop@codingest.net", totalPrice: "$1,519.45", commissionRate: "10%", shippingCost: "$25.00", earnedAmount: "$1,367.50", date: "2026-10-14 / 19:49" },
  { id: 42, orderNumber: "#10042", user: "Trendshop", userEmail: "trendshop@codingest.net", totalPrice: "$236.25", commissionRate: "10%", shippingCost: "$0.00", earnedAmount: "$212.63", date: "2026-10-12 / 19:26" },
  { id: 41, orderNumber: "#10041", user: "James Baronie", userEmail: "james@codingest.net", totalPrice: "$60.20", commissionRate: "12%", shippingCost: "$0.00", earnedAmount: "$52.98", date: "2026-10-05 / 15:38" },
];

export default function AdminEarningsPage() {
  const [earnings, setEarnings] = useState<EarningRecord[]>(INITIAL_EARNINGS);
  const [showCount, setShowCount] = useState(15);
  const [search, setSearch] = useState("");
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);

  const filtered = earnings.filter(
    (e) =>
      search === "" ||
      e.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      e.user.toLowerCase().includes(search.toLowerCase()) ||
      e.userEmail.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this earning record?")) {
      setEarnings(earnings.filter((e) => e.id !== id));
      setActiveMenuId(null);
    }
  };

  return (
    <div className="w-full text-[#333333] pb-12">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h1 className="text-[24px] font-normal text-[#333333] m-0">
          Earnings <small className="text-[14px] text-gray-500 font-light">Earnings</small>
        </h1>
        <div className="text-[12px] text-gray-500 flex items-center space-x-1 mt-1 sm:mt-0">
          <Link href="/admin" className="text-[#333333] hover:text-[#3c8dbc] flex items-center gap-1">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <span>/</span>
          <span className="text-gray-400">Earnings</span>
          <span>/</span>
          <span className="text-gray-600 font-medium">Earnings</span>
        </div>
      </div>

      {/* Main Box */}
      <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border border-[#d2d6de]/60 p-5">
        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center space-x-2 text-[13px] text-gray-600">
            <span>Show</span>
            <select
              value={showCount}
              onChange={(e) => setShowCount(Number(e.target.value))}
              className="h-[34px] px-3 border border-[#d2d6de] rounded-[3px] bg-white text-[13px] text-gray-700 focus:outline-none focus:border-[#3c8dbc]"
            >
              <option value={15}>15</option>
              <option value={30}>30</option>
              <option value={60}>60</option>
              <option value={100}>100</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 focus:outline-none focus:border-[#3c8dbc] w-56"
            />
            <button className="h-[34px] bg-[#00c0ef] hover:bg-[#00acd6] text-white px-4 rounded-[3px] text-[13px] font-medium shadow-2xs">
              Search
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px] text-[#333333] border border-[#f4f4f4] border-collapse">
            <thead>
              <tr className="bg-[#f4f4f4] text-[#333333] font-semibold text-[13px] border-b border-[#d2d6de]">
                <th className="px-4 py-2.5 w-12 text-center">Id</th>
                <th className="px-4 py-2.5">Order</th>
                <th className="px-4 py-2.5">User</th>
                <th className="px-4 py-2.5">Total Price</th>
                <th className="px-4 py-2.5">Commission Rate</th>
                <th className="px-4 py-2.5">Shipping Cost</th>
                <th className="px-4 py-2.5">Earned Amount</th>
                <th className="px-4 py-2.5">Date</th>
                <th className="px-4 py-2.5 text-right w-24">Options</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b border-[#f4f4f4] hover:bg-[#f9f9f9] transition-colors">
                  <td className="px-4 py-3 text-center text-gray-500">{item.id}</td>
                  <td className="px-4 py-3 font-medium text-[#3c8dbc] hover:underline cursor-pointer">
                    <Link href="/admin/orders">{item.orderNumber}</Link>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-medium text-gray-800">{item.user}</span>
                    <span className="block text-[11.5px] text-gray-400">{item.userEmail}</span>
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800">{item.totalPrice}</td>
                  <td className="px-4 py-3 text-gray-600">{item.commissionRate}</td>
                  <td className="px-4 py-3 text-gray-600">{item.shippingCost}</td>
                  <td className="px-4 py-3 font-bold text-emerald-600">{item.earnedAmount}</td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{item.date}</td>
                  <td className="px-4 py-3 text-right relative">
                    <div className="inline-block text-left">
                      <button
                        type="button"
                        onClick={() => setActiveMenuId(activeMenuId === item.id ? null : item.id)}
                        className="bg-[#00c0ef] hover:bg-[#00acd6] text-white text-[12px] font-medium px-2.5 py-1 rounded-[2px] inline-flex items-center gap-1 shadow-2xs"
                      >
                        Options <ChevronDown className="w-3 h-3" />
                      </button>
                      {activeMenuId === item.id && (
                        <div className="absolute right-0 mt-1 w-32 bg-white rounded-[3px] shadow-lg border border-gray-200 py-1 z-20">
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="w-full text-left px-3 py-1.5 text-[12px] text-red-600 hover:bg-gray-100 flex items-center gap-1.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-[13px] text-gray-600 gap-2">
          <div>Showing 1 to {filtered.length} of {earnings.length} entries</div>
          <div className="flex items-center space-x-1">
            <button className="px-3 py-1 border border-[#d2d6de] bg-white text-gray-600 text-[12px] rounded-[2px] hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1 border border-[#3c8dbc] bg-[#3c8dbc] text-white text-[12px] rounded-[2px]">1</button>
            <button className="px-3 py-1 border border-[#d2d6de] bg-white text-gray-600 text-[12px] rounded-[2px] hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
