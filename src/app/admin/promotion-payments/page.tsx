"use client";

import React, { useState, useMemo } from "react";
import {
  ChevronDown,
  Trash2,
  FileText,
  CheckCircle,
  X,
  Printer,
} from "lucide-react";
import Link from "next/link";

export interface PromotionPayment {
  id: number;
  paymentId: string;
  paymentMethod: string;
  paymentAmount: string;
  paymentStatus: string;
  user: string;
  productId: number;
  purchasedPlan: string;
  ipAddress: string;
  date: string;
}

const INITIAL_PROMOTION_PAYMENTS: PromotionPayment[] = [
  {
    id: 15,
    paymentId: "80R99643X06310109",
    paymentMethod: "PayPal",
    paymentAmount: "$9.45 (USD)",
    paymentStatus: "COMPLETED",
    user: "Trendshop",
    productId: 41,
    purchasedPlan: "Monthly Plan (270 Days)",
    ipAddress: "78.190.31.52",
    date: "2026-08-04 / 10:34",
  },
  {
    id: 14,
    paymentId: "pi_3S3Yb6BHW47ba9xU1KNINQtR",
    paymentMethod: "Stripe",
    paymentAmount: "$9.45 (USD)",
    paymentStatus: "paid",
    user: "Admin",
    productId: 42,
    purchasedPlan: "Monthly Plan (270 Days)",
    ipAddress: "78.190.31.52",
    date: "2026-08-04 / 10:33",
  },
  {
    id: 13,
    paymentId: "pi_3S3Y2yBHW47ba9xU1SgGPOgs",
    paymentMethod: "Stripe",
    paymentAmount: "$9.45 (USD)",
    paymentStatus: "paid",
    user: "Admin",
    productId: 38,
    purchasedPlan: "Monthly Plan (270 Days)",
    ipAddress: "78.190.31.52",
    date: "2026-08-04 / 10:31",
  },
  {
    id: 12,
    paymentId: "20T479709E951411J",
    paymentMethod: "PayPal",
    paymentAmount: "$31.50 (USD)",
    paymentStatus: "COMPLETED",
    user: "Trendshop",
    productId: 17,
    purchasedPlan: "Daily Plan (300 Days)",
    ipAddress: "78.190.31.52",
    date: "2026-08-04 / 10:30",
  },
  {
    id: 11,
    paymentId: "TST2524702337417",
    paymentMethod: "PayTabs",
    paymentAmount: "$8.40 (USD)",
    paymentStatus: "Authorised",
    user: "Trendshop",
    productId: 30,
    purchasedPlan: "Monthly Plan (240 Days)",
    ipAddress: "78.190.31.52",
    date: "2026-08-04 / 10:27",
  },
  {
    id: 10,
    paymentId: "DP-117107",
    paymentMethod: "dLocal Go",
    paymentAmount: "R$ 51.53 (BRL)",
    paymentStatus: "Completed",
    user: "Admin",
    productId: 40,
    purchasedPlan: "Monthly Plan (270 Days)",
    ipAddress: "78.190.31.52",
    date: "2026-08-04 / 10:25",
  },
  {
    id: 9,
    paymentId: "597d8fb4-6400-4708-b7bd-7de53c82c5d9",
    paymentMethod: "Midtrans",
    paymentAmount: "Rp137996.29 (IDR)",
    paymentStatus: "capture",
    user: "Admin",
    productId: 1,
    purchasedPlan: "Monthly Plan (240 Days)",
    ipAddress: "78.190.31.52",
    date: "2026-08-04 / 10:18",
  },
  {
    id: 8,
    paymentId: "pi_3S3YLLFBHW47ba9xU1zwaQPwG",
    paymentMethod: "Stripe",
    paymentAmount: "$42 (USD)",
    paymentStatus: "paid",
    user: "Admin",
    productId: 23,
    purchasedPlan: "Daily Plan (400 Days)",
    ipAddress: "78.190.31.52",
    date: "2026-08-04 / 10:16",
  },
  {
    id: 7,
    paymentId: "25276060",
    paymentMethod: "Iyzico",
    paymentAmount: "345.72₺ (TRY)",
    paymentStatus: "SUCCESS",
    user: "Admin",
    productId: 20,
    purchasedPlan: "Monthly Plan (240 Days)",
    ipAddress: "78.190.31.52",
    date: "2026-08-04 / 10:13",
  },
  {
    id: 6,
    paymentId: "9614491",
    paymentMethod: "Flutterwave",
    paymentAmount: "$7.35 (USD)",
    paymentStatus: "Successful",
    user: "Trendshop",
    productId: 33,
    purchasedPlan: "Monthly Plan (210 Days)",
    ipAddress: "78.190.31.52",
    date: "2026-08-04 / 10:11",
  },
  {
    id: 5,
    paymentId: "pay_RDSAEwAnicw9nb",
    paymentMethod: "Razorpay",
    paymentAmount: "₹555.24 (INR)",
    paymentStatus: "captured",
    user: "Trendshop",
    productId: 15,
    purchasedPlan: "Monthly Plan (180 Days)",
    ipAddress: "78.190.31.52",
    date: "2026-08-04 / 10:09",
  },
  {
    id: 4,
    paymentId: "7MY93294KM779043W",
    paymentMethod: "PayPal",
    paymentAmount: "$31.50 (USD)",
    paymentStatus: "COMPLETED",
    user: "Trendshop",
    productId: 13,
    purchasedPlan: "Daily Plan (300 Days)",
    ipAddress: "78.190.31.52",
    date: "2026-08-04 / 10:06",
  },
  {
    id: 3,
    paymentId: "077d280d97da30d1d3bcb0849484e830089e782c",
    paymentMethod: "PayStack",
    paymentAmount: "₦16073.55 (NGN)",
    paymentStatus: "success",
    user: "Admin",
    productId: 12,
    purchasedPlan: "Monthly Plan (300 Days)",
    ipAddress: "78.190.31.52",
    date: "2026-08-03 / 23:29",
  },
  {
    id: 2,
    paymentId: "pi_3S3MzFBHW47ba9xU0aSzzSS6",
    paymentMethod: "Stripe",
    paymentAmount: "$8.40 (USD)",
    paymentStatus: "paid",
    user: "Trendshop",
    productId: 11,
    purchasedPlan: "Monthly Plan (240 Days)",
    ipAddress: "78.190.31.52",
    date: "2026-08-03 / 22:09",
  },
  {
    id: 1,
    paymentId: "62W28666TH4730240",
    paymentMethod: "PayPal",
    paymentAmount: "$6.30 (USD)",
    paymentStatus: "COMPLETED",
    user: "Admin",
    productId: 21,
    purchasedPlan: "Monthly Plan (180 Days)",
    ipAddress: "78.190.31.52",
    date: "2026-08-03 / 22:06",
  },
];

export default function PromotionPaymentsPage() {
  const [payments, setPayments] = useState<PromotionPayment[]>(INITIAL_PROMOTION_PAYMENTS);
  const [showCount, setShowCount] = useState<number>(15);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [searchInput, setSearchInput] = useState<string>("");
  const [appliedSearch, setAppliedSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Notifications
  const [notification, setNotification] = useState<string | null>(null);

  // Selected Invoice Modal
  const [selectedInvoice, setSelectedInvoice] = useState<PromotionPayment | null>(null);

  const handleApplyFilter = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAppliedSearch(searchInput.trim().toLowerCase());
    setCurrentPage(1);
  };

  const filteredPayments = useMemo(() => {
    return payments.filter((item) => {
      // Status filter
      if (statusFilter !== "All") {
        if (!item.paymentStatus.toLowerCase().includes(statusFilter.toLowerCase())) {
          return false;
        }
      }

      // Search filter
      if (appliedSearch) {
        const matchesId = item.paymentId.toLowerCase().includes(appliedSearch);
        const matchesUser = item.user.toLowerCase().includes(appliedSearch);
        const matchesMethod = item.paymentMethod.toLowerCase().includes(appliedSearch);
        const matchesProductId = item.productId.toString().includes(appliedSearch);
        if (!matchesId && !matchesUser && !matchesMethod && !matchesProductId) return false;
      }

      return true;
    });
  }, [payments, statusFilter, appliedSearch]);

  const totalPages = Math.ceil(filteredPayments.length / showCount) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedPayments = useMemo(() => {
    const start = (safeCurrentPage - 1) * showCount;
    return filteredPayments.slice(start, start + showCount);
  }, [filteredPayments, safeCurrentPage, showCount]);

  const handleDelete = (id: number, paymentId: string) => {
    if (confirm(`Are you sure you want to delete payment record "${paymentId}"?`)) {
      setPayments((prev) => prev.filter((p) => p.id !== id));
      setNotification(`Promotion payment #${paymentId} deleted successfully.`);
      setTimeout(() => setNotification(null), 3500);
    }
  };

  return (
    <div className="w-full text-[#333333] font-sans pb-16">
      {/* Page Title */}
      <div className="mb-4">
        <h1 className="text-[22px] font-normal text-[#333333]">Promotion Payments</h1>
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
        {/* Filter Bar: Show (15), Payment Status (All), Search (Payment Id), and Filter button */}
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

          {/* Payment Status Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-[#333333] font-normal">Payment Status</span>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="appearance-none bg-white border border-[#d2d6de] rounded-[3px] h-[32px] pl-3 pr-8 text-[13px] text-[#555] outline-none focus:border-[#5b69bc] cursor-pointer min-w-[90px]"
              >
                <option value="All">All</option>
                <option value="COMPLETED">Completed</option>
                <option value="paid">Paid</option>
                <option value="Authorised">Authorised</option>
                <option value="success">Success</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Search box & Filter Button */}
          <form onSubmit={handleApplyFilter} className="flex items-center gap-2">
            <span className="text-[#333333] font-normal">Search</span>
            <input
              type="text"
              placeholder="Payment Id"
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
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="border-b border-[#f4f4f4] text-[#333333] font-medium">
                <th className="py-3 px-4 w-[50px] font-semibold">Id</th>
                <th className="py-3 px-4 font-semibold">Payment Id</th>
                <th className="py-3 px-4 font-semibold">Payment Method</th>
                <th className="py-3 px-4 font-semibold">Payment Amount</th>
                <th className="py-3 px-4 font-semibold">Payment Status</th>
                <th className="py-3 px-4 font-semibold">User</th>
                <th className="py-3 px-4 font-semibold">Product Id</th>
                <th className="py-3 px-4 font-semibold">Purchased Plan</th>
                <th className="py-3 px-4 font-semibold">Ip Address</th>
                <th className="py-3 px-4 font-semibold">Date</th>
                <th className="py-3 px-4 font-semibold w-[150px]">Options</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPayments.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-8 text-center text-gray-500">
                    No promotion payments found.
                  </td>
                </tr>
              ) : (
                paginatedPayments.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#f4f4f4] hover:bg-[#f9fafc] transition-colors"
                  >
                    {/* Id */}
                    <td className="py-3.5 px-4 text-[#555] font-normal">{item.id}</td>

                    {/* Payment Id */}
                    <td className="py-3.5 px-4 text-[#555] font-normal font-mono text-[12px]">
                      {item.paymentId}
                    </td>

                    {/* Payment Method */}
                    <td className="py-3.5 px-4 text-[#555] font-normal">
                      {item.paymentMethod}
                    </td>

                    {/* Payment Amount */}
                    <td className="py-3.5 px-4 text-[#555] font-normal whitespace-nowrap">
                      {item.paymentAmount}
                    </td>

                    {/* Payment Status */}
                    <td className="py-3.5 px-4 text-[#555] font-normal">
                      {item.paymentStatus}
                    </td>

                    {/* User */}
                    <td className="py-3.5 px-4 text-[#555] font-normal whitespace-nowrap">
                      {item.user}
                    </td>

                    {/* Product Id */}
                    <td className="py-3.5 px-4 text-[#555] font-normal">
                      <Link
                        href={`/admin/products?id=${item.productId}`}
                        className="text-[#3c8dbc] hover:underline"
                      >
                        {item.productId}
                      </Link>
                    </td>

                    {/* Purchased Plan */}
                    <td className="py-3.5 px-4 text-[#555] font-normal min-w-[170px]">
                      {item.purchasedPlan}
                    </td>

                    {/* Ip Address */}
                    <td className="py-3.5 px-4 text-[#555] font-normal whitespace-nowrap">
                      {item.ipAddress}
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-[#666666] whitespace-nowrap">
                      {item.date}
                    </td>

                    {/* Options (View Invoice & Delete) */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        {/* View Invoice button */}
                        <button
                          type="button"
                          onClick={() => setSelectedInvoice(item)}
                          className="bg-[#f4f4f4] hover:bg-gray-200 border border-[#d2d6de] text-[#333] text-[11px] font-normal h-[28px] px-2.5 rounded-[3px] flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5 text-gray-600" />
                          <span>View Invoice</span>
                        </button>

                        {/* Delete button */}
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id, item.paymentId)}
                          className="bg-[#f4f4f4] hover:bg-red-50 hover:border-red-300 border border-[#d2d6de] text-gray-500 hover:text-red-600 h-[28px] w-[28px] rounded-[3px] flex items-center justify-center transition-colors cursor-pointer"
                          title="Delete"
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

        {/* Pagination & Count */}
        <div className="p-4 border-t border-[#f4f4f4] flex flex-wrap items-center justify-between gap-3">
          <div className="text-[13px] text-[#555] font-normal">
            Number of Entries:{" "}
            <span className="font-semibold">{filteredPayments.length}</span>
          </div>

          {totalPages > 1 && (
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

              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="min-w-[32px] h-[32px] px-2.5 rounded-[2px] border border-[#d2d6de] bg-white text-gray-700 hover:bg-gray-100 text-center transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &gt;
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Promotion Invoice Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-[3px] shadow-2xl border border-[#d2d6de] w-full max-w-[650px] overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#f4f4f4] flex items-center justify-between bg-gray-50">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#5b69bc]" />
                <h3 className="text-[16px] font-semibold text-[#333]">
                  Promotion Invoice #{selectedInvoice.paymentId}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInvoice(null)}
                className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 text-[13px]">
              {/* Brand Header */}
              <div className="flex justify-between items-start pb-4 border-b border-gray-100">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Modesy Panel</h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Product Promotion Service
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-400 block">Date</span>
                  <span className="font-medium text-gray-700">
                    {selectedInvoice.date}
                  </span>
                </div>
              </div>

              {/* User & Payment Details Grid */}
              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-[3px] border border-gray-200">
                <div>
                  <span className="text-xs text-gray-500 block uppercase tracking-wider font-semibold">
                    Customer / Seller
                  </span>
                  <p className="font-medium text-gray-800 mt-1">
                    {selectedInvoice.user}
                  </p>
                  <p className="text-xs text-gray-500">
                    IP: {selectedInvoice.ipAddress}
                  </p>
                </div>

                <div>
                  <span className="text-xs text-gray-500 block uppercase tracking-wider font-semibold">
                    Payment Gateway
                  </span>
                  <p className="font-medium text-gray-800 mt-1">
                    {selectedInvoice.paymentMethod}
                  </p>
                  <p className="text-xs text-emerald-600 font-semibold capitalize">
                    Status: {selectedInvoice.paymentStatus}
                  </p>
                </div>
              </div>

              {/* Invoice Item Table */}
              <div className="border border-gray-200 rounded-[3px] overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-100 border-b border-gray-200 text-gray-700 font-semibold">
                    <tr>
                      <th className="py-2.5 px-3">Description</th>
                      <th className="py-2.5 px-3">Product ID</th>
                      <th className="py-2.5 px-3 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-3">
                        <p className="font-semibold text-gray-800">
                          Product Promotion
                        </p>
                        <p className="text-gray-500 mt-0.5 text-[11px]">
                          {selectedInvoice.purchasedPlan}
                        </p>
                      </td>
                      <td className="py-3 px-3 font-medium text-blue-600">
                        #{selectedInvoice.productId}
                      </td>
                      <td className="py-3 px-3 text-right font-medium text-gray-800">
                        {selectedInvoice.paymentAmount}
                      </td>
                    </tr>
                    <tr className="bg-gray-50 font-semibold text-gray-900">
                      <td colSpan={2} className="py-2.5 px-3">Total Paid</td>
                      <td className="py-2.5 px-3 text-right text-emerald-700 text-sm">
                        {selectedInvoice.paymentAmount}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-3.5 py-1.5 bg-white border border-gray-300 hover:bg-gray-100 rounded-[3px] text-xs font-medium text-gray-700 flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Invoice</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedInvoice(null)}
                className="px-4 py-1.5 bg-[#5b69bc] hover:bg-[#4d5aa3] text-white rounded-[3px] text-xs font-medium cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
