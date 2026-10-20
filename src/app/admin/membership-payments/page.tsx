"use client";

import React, { useState, useMemo } from "react";
import {
  ChevronDown,
  Trash2,
  FileText,
  Check,
  CheckCircle,
  X,
  Printer,
} from "lucide-react";

export interface MembershipPayment {
  id: number;
  paymentId: string;
  paymentMethod: string;
  paymentAmount: string;
  paymentStatus: "Succeeded" | "Pending Payment" | "paid" | "Cancelled";
  user: string;
  membershipPlan: string;
  ipAddress: string;
  date: string;
}

const INITIAL_PAYMENTS: MembershipPayment[] = [
  {
    id: 3,
    paymentId: "WLT-HMKBXC78KP-C2OT79NU",
    paymentMethod: "Wallet Balance",
    paymentAmount: "$30.45 (USD)",
    paymentStatus: "Succeeded",
    user: "Trendshop",
    membershipPlan:
      "Professional (Number of Ads: Unlimited, Number of Days: Unlimited)",
    ipAddress: "104.23.162.64",
    date: "2026-09-23 / 17:22",
  },
  {
    id: 2,
    paymentId: "BTR-HLYOXF8FBW-4XEGXCCK",
    paymentMethod: "Bank Transfer",
    paymentAmount: "$9.45 (USD)",
    paymentStatus: "Pending Payment",
    user: "test user",
    membershipPlan: "Basic (Number of Ads: 200, Number of Days: 90)",
    ipAddress: "104.22.45.136",
    date: "2026-09-03 / 11:49",
  },
  {
    id: 1,
    paymentId: "pi_3S1uYHBHW47ba9xU0s6wR7dv",
    paymentMethod: "Stripe",
    paymentAmount: "$30.45 (USD)",
    paymentStatus: "paid",
    user: "Trendshop",
    membershipPlan:
      "Professional (Number of Ads: Unlimited, Number of Days: Unlimited)",
    ipAddress: "78.190.31.52",
    date: "2026-07-30 / 21:35",
  },
];

export default function MembershipPaymentsPage() {
  const [payments, setPayments] = useState<MembershipPayment[]>(INITIAL_PAYMENTS);
  const [showCount, setShowCount] = useState<number>(15);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [paymentIdInput, setPaymentIdInput] = useState<string>("");
  const [appliedPaymentId, setAppliedPaymentId] = useState<string>("");

  // Notifications
  const [notification, setNotification] = useState<string | null>(null);

  // Selected Invoice for Modal
  const [selectedInvoice, setSelectedInvoice] = useState<MembershipPayment | null>(null);

  const handleApplyFilter = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAppliedPaymentId(paymentIdInput.trim().toLowerCase());
  };

  const filteredPayments = useMemo(() => {
    return payments.filter((item) => {
      // Status filter
      if (statusFilter !== "All") {
        if (statusFilter === "Succeeded" && item.paymentStatus !== "Succeeded" && item.paymentStatus !== "paid") {
          return false;
        }
        if (statusFilter === "Pending Payment" && item.paymentStatus !== "Pending Payment") {
          return false;
        }
      }

      // Payment Id search filter
      if (appliedPaymentId) {
        const matchesId = item.paymentId.toLowerCase().includes(appliedPaymentId);
        const matchesUser = item.user.toLowerCase().includes(appliedPaymentId);
        const matchesMethod = item.paymentMethod.toLowerCase().includes(appliedPaymentId);
        if (!matchesId && !matchesUser && !matchesMethod) return false;
      }

      return true;
    });
  }, [payments, statusFilter, appliedPaymentId]);

  const handleDelete = (id: number, paymentId: string) => {
    if (confirm(`Are you sure you want to delete payment record "${paymentId}"?`)) {
      setPayments((prev) => prev.filter((p) => p.id !== id));
      setNotification(`Payment record "${paymentId}" deleted successfully.`);
      setTimeout(() => setNotification(null), 3500);
    }
  };

  const handleApprove = (id: number, paymentId: string) => {
    setPayments((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, paymentStatus: "Succeeded" } : p
      )
    );
    setNotification(`Payment #${paymentId} has been approved successfully.`);
    setTimeout(() => setNotification(null), 3500);
  };

  return (
    <div className="w-full text-[#333333] font-sans pb-16">
      {/* Page Title */}
      <div className="mb-4">
        <h1 className="text-[22px] font-normal text-[#333333]">Membership Payments</h1>
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
        {/* Filter Bar: Show (15), Payment Status (All), Payment Id input, and Filter button */}
        <div className="p-4 border-b border-[#f4f4f4] flex flex-wrap items-center gap-5 text-[13px]">
          {/* Show dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-[#333333] font-normal">Show</span>
            <div className="relative">
              <select
                value={showCount}
                onChange={(e) => setShowCount(Number(e.target.value))}
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
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none bg-white border border-[#d2d6de] rounded-[3px] h-[32px] pl-3 pr-8 text-[13px] text-[#555] outline-none focus:border-[#5b69bc] cursor-pointer min-w-[100px]"
              >
                <option value="All">All</option>
                <option value="Succeeded">Succeeded</option>
                <option value="Pending Payment">Pending Payment</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Payment Id Search input & Filter Button */}
          <form onSubmit={handleApplyFilter} className="flex items-center gap-2">
            <span className="text-[#333333] font-normal">Payment Id</span>
            <input
              type="text"
              placeholder="Payment Id"
              value={paymentIdInput}
              onChange={(e) => setPaymentIdInput(e.target.value)}
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
                <th className="py-3 px-4 font-semibold">Membership Plan</th>
                <th className="py-3 px-4 font-semibold">Ip Address</th>
                <th className="py-3 px-4 font-semibold">Date</th>
                <th className="py-3 px-4 font-semibold w-[150px]">Options</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-gray-500">
                    No membership payments found.
                  </td>
                </tr>
              ) : (
                filteredPayments.map((item) => (
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

                    {/* Payment Status & Approve Button */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-1.5">
                        <span className="text-[#555] block capitalize">
                          {item.paymentStatus}
                        </span>

                        {item.paymentStatus === "Pending Payment" && (
                          <button
                            type="button"
                            onClick={() => handleApprove(item.id, item.paymentId)}
                            className="bg-[#00a65a] hover:bg-[#008d4c] text-white text-[11px] font-medium py-1 px-2.5 rounded-[3px] flex items-center gap-1 transition-colors cursor-pointer shadow-xs whitespace-nowrap"
                          >
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span>Approve</span>
                          </button>
                        )}
                      </div>
                    </td>

                    {/* User */}
                    <td className="py-3.5 px-4 text-[#555] font-normal whitespace-nowrap">
                      {item.user}
                    </td>

                    {/* Membership Plan */}
                    <td className="py-3.5 px-4 text-[#555] font-normal min-w-[200px]">
                      {item.membershipPlan}
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

        {/* Footer info: Number of Entries: 3 */}
        <div className="p-4 text-[13px] text-[#555] font-normal">
          Number of Entries:{" "}
          <span className="font-semibold">{filteredPayments.length}</span>
        </div>
      </div>

      {/* Invoice Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-[3px] shadow-2xl border border-[#d2d6de] w-full max-w-[650px] overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#f4f4f4] flex items-center justify-between bg-gray-50">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#5b69bc]" />
                <h3 className="text-[16px] font-semibold text-[#333]">
                  Membership Invoice #{selectedInvoice.paymentId}
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
                    Official Marketplace Platform
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
                    Client Details
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
                    Payment Method
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
                      <th className="py-2.5 px-3 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-3">
                        <p className="font-semibold text-gray-800">
                          Membership Plan
                        </p>
                        <p className="text-gray-500 mt-0.5 text-[11px]">
                          {selectedInvoice.membershipPlan}
                        </p>
                      </td>
                      <td className="py-3 px-3 text-right font-medium text-gray-800">
                        {selectedInvoice.paymentAmount}
                      </td>
                    </tr>
                    <tr className="bg-gray-50 font-semibold text-gray-900">
                      <td className="py-2.5 px-3">Total Paid</td>
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
