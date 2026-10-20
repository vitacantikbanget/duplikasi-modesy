"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Home, ChevronDown, Trash2 } from "lucide-react";

interface PromotionPayment {
  id: number;
  paymentId: string;
  product: string;
  productId: number;
  user: string;
  purchasedPlan: string;
  dayCount: number;
  paymentMethod: string;
  paymentAmount: string;
  paymentStatus: "Completed" | "Pending";
  date: string;
}

const INITIAL_PROMOTIONS: PromotionPayment[] = [
  { id: 18, paymentId: "PRM-20261017-98", product: "Colorful women scarves", productId: 47, user: "Trendshop", purchasedPlan: "Featured Products (14 Days)", dayCount: 14, paymentMethod: "Stripe", paymentAmount: "$45.00", paymentStatus: "Completed", date: "2026-10-17 / 10:00" },
  { id: 17, paymentId: "PRM-20261015-97", product: "Women's ankle boot with different colors", productId: 46, user: "admin", purchasedPlan: "Daily Deals (7 Days)", dayCount: 7, paymentMethod: "Wallet Balance", paymentAmount: "$25.00", paymentStatus: "Completed", date: "2026-10-15 / 15:30" },
  { id: 16, paymentId: "PRM-20261010-96", product: "Navy polka dot dress", productId: 45, user: "Trendshop", purchasedPlan: "Featured Products (30 Days)", dayCount: 30, paymentMethod: "PayPal", paymentAmount: "$89.00", paymentStatus: "Completed", date: "2026-10-10 / 12:15" },
  { id: 15, paymentId: "PRM-20260925-95", product: "Modern grey couch and pillows", productId: 44, user: "admin", purchasedPlan: "Special Offers (14 Days)", dayCount: 14, paymentMethod: "Stripe", paymentAmount: "$45.00", paymentStatus: "Completed", date: "2026-09-25 / 17:40" },
];

export default function PromotionPaymentsPage() {
  const [payments, setPayments] = useState<PromotionPayment[]>(INITIAL_PROMOTIONS);
  const [showCount, setShowCount] = useState(15);
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);

  const filtered = payments.filter((item) => {
    const matchMethod = paymentMethodFilter === "All" || item.paymentMethod === paymentMethodFilter;
    const matchSearch =
      search === "" ||
      item.paymentId.toLowerCase().includes(search.toLowerCase()) ||
      item.product.toLowerCase().includes(search.toLowerCase()) ||
      item.user.toLowerCase().includes(search.toLowerCase());
    return matchMethod && matchSearch;
  });

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this payment record?")) {
      setPayments(payments.filter((p) => p.id !== id));
      setActiveMenuId(null);
    }
  };

  return (
    <div className="w-full text-[#333333] pb-12">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h1 className="text-[24px] font-normal text-[#333333] m-0">
          Promotion Payments <small className="text-[14px] text-gray-500 font-light">Payments</small>
        </h1>
        <div className="text-[12px] text-gray-500 flex items-center space-x-1 mt-1 sm:mt-0">
          <Link href="/admin" className="text-[#333333] hover:text-[#3c8dbc] flex items-center gap-1">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <span>/</span>
          <span className="text-gray-400">Payments</span>
          <span>/</span>
          <span className="text-gray-600 font-medium">Promotion Payments</span>
        </div>
      </div>

      {/* Main Box */}
      <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border border-[#d2d6de]/60 p-5">
        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex flex-wrap items-center gap-3">
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

            <div className="flex items-center space-x-2">
              <select
                value={paymentMethodFilter}
                onChange={(e) => setPaymentMethodFilter(e.target.value)}
                className="h-[34px] px-3 border border-[#d2d6de] rounded-[3px] bg-white text-[13px] text-gray-700 focus:outline-none focus:border-[#3c8dbc]"
              >
                <option value="All">Payment Method (All)</option>
                <option value="Stripe">Stripe</option>
                <option value="PayPal">PayPal</option>
                <option value="Wallet Balance">Wallet Balance</option>
              </select>
            </div>
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
                <th className="px-4 py-2.5">Payment Id</th>
                <th className="px-4 py-2.5">Product</th>
                <th className="px-4 py-2.5">User</th>
                <th className="px-4 py-2.5">Purchased Plan</th>
                <th className="px-4 py-2.5 text-center">Day Count</th>
                <th className="px-4 py-2.5">Payment Method</th>
                <th className="px-4 py-2.5">Payment Amount</th>
                <th className="px-4 py-2.5">Payment Status</th>
                <th className="px-4 py-2.5">Date</th>
                <th className="px-4 py-2.5 text-right w-24">Options</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b border-[#f4f4f4] hover:bg-[#f9f9f9] transition-colors">
                  <td className="px-4 py-3 text-center text-gray-500">{item.id}</td>
                  <td className="px-4 py-3 font-medium text-[#3c8dbc] hover:underline cursor-pointer">{item.paymentId}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    <Link href={`/admin/products?id=${item.productId}`} className="text-[#3c8dbc] hover:underline">
                      {item.product}
                    </Link>
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800">{item.user}</td>
                  <td className="px-4 py-3">{item.purchasedPlan}</td>
                  <td className="px-4 py-3 text-center">{item.dayCount}</td>
                  <td className="px-4 py-3">
                    <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-[2px] text-[12px] border border-gray-200">
                      {item.paymentMethod}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-800">{item.paymentAmount}</td>
                  <td className="px-4 py-3">
                    <span className="bg-[#00a65a] text-white px-2 py-0.5 rounded-[2px] text-[11px] font-semibold tracking-wide">
                      {item.paymentStatus}
                    </span>
                  </td>
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
          <div>Showing 1 to {filtered.length} of {payments.length} entries</div>
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
