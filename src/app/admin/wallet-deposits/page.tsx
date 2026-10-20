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
  Wallet,
} from "lucide-react";

export interface WalletDeposit {
  id: number;
  paymentId: string;
  paymentMethod: string;
  depositAmount: string;
  paymentStatus: "Awaiting Payment" | "Payment Received";
  user: string;
  ipAddress: string;
  date: string;
}

const INITIAL_WALLET_DEPOSITS: WalletDeposit[] = [
  {
    id: 12,
    paymentId: "BTR-HMIU39H7GI-BRTGW1QM",
    paymentMethod: "Bank Transfer",
    depositAmount: "$122 (USD)",
    paymentStatus: "Awaiting Payment",
    user: "Admin",
    ipAddress: "162.159.127.146",
    date: "2026-09-22 / 08:49",
  },
  {
    id: 11,
    paymentId: "BTR-HMDQRCZDHE-CPZTJXWK",
    paymentMethod: "Bank Transfer",
    depositAmount: "$10 (USD)",
    paymentStatus: "Awaiting Payment",
    user: "Peter Jone",
    ipAddress: "172.71.24.150",
    date: "2026-09-17 / 17:57",
  },
  {
    id: 10,
    paymentId: "BTR-HMDP9KNW90-1Y394WJO",
    paymentMethod: "Bank Transfer",
    depositAmount: "$10 (USD)",
    paymentStatus: "Awaiting Payment",
    user: "Peter Jone",
    ipAddress: "172.69.165.50",
    date: "2026-09-17 / 17:03",
  },
  {
    id: 9,
    paymentId: "pi_3UFJycBHw47ba9xU0pS6jTVD",
    paymentMethod: "Stripe",
    depositAmount: "$1000 (USD)",
    paymentStatus: "Payment Received",
    user: "Admin",
    ipAddress: "104.22.76.144",
    date: "2026-09-13 / 21:59",
  },
  {
    id: 8,
    paymentId: "BTR-HM95ZHFS7S-369RASZE",
    paymentMethod: "Bank Transfer",
    depositAmount: "$10 (USD)",
    paymentStatus: "Awaiting Payment",
    user: "Peter Jone",
    ipAddress: "162.159.127.146",
    date: "2026-09-13 / 14:19",
  },
  {
    id: 7,
    paymentId: "BTR-HMOLWO7M4I-AG10P9OR",
    paymentMethod: "Bank Transfer",
    depositAmount: "$10 (USD)",
    paymentStatus: "Awaiting Payment",
    user: "Peter Jone",
    ipAddress: "172.68.50.20",
    date: "2026-09-05 / 20:02",
  },
  {
    id: 6,
    paymentId: "BTR-HLWS2ZQ5XN-5CTYLLNC",
    paymentMethod: "Bank Transfer",
    depositAmount: "$25 (USD)",
    paymentStatus: "Awaiting Payment",
    user: "Peter Jone",
    ipAddress: "172.68.213.46",
    date: "2026-09-02 / 08:42",
  },
  {
    id: 5,
    paymentId: "BTR-HLVTZUEYA6-8ACIIO9U",
    paymentMethod: "Bank Transfer",
    depositAmount: "$100 (USD)",
    paymentStatus: "Awaiting Payment",
    user: "Peter Jone",
    ipAddress: "172.70.216.104",
    date: "2026-09-01 / 12:05",
  },
  {
    id: 4,
    paymentId: "5XW504789S735423L",
    paymentMethod: "PayPal",
    depositAmount: "$400 (USD)",
    paymentStatus: "Payment Received",
    user: "Admin",
    ipAddress: "78.190.31.52",
    date: "2026-08-04 / 12:19",
  },
  {
    id: 3,
    paymentId: "pi_3S3aF3BHw47ba9xU0EsgVp7u",
    paymentMethod: "Stripe",
    depositAmount: "$100 (USD)",
    paymentStatus: "Payment Received",
    user: "Trendshop",
    ipAddress: "78.190.31.52",
    date: "2026-08-04 / 12:18",
  },
  {
    id: 2,
    paymentId: "6FS02964HU480610P",
    paymentMethod: "PayPal",
    depositAmount: "$800 (USD)",
    paymentStatus: "Payment Received",
    user: "Trendshop",
    ipAddress: "78.190.31.52",
    date: "2026-08-04 / 12:17",
  },
  {
    id: 1,
    paymentId: "pi_3S3aDXBHw47ba9xU1sh99hwn",
    paymentMethod: "Stripe",
    depositAmount: "$500 (USD)",
    paymentStatus: "Payment Received",
    user: "Admin",
    ipAddress: "78.190.31.52",
    date: "2026-08-04 / 12:16",
  },
];

export default function WalletDepositsPage() {
  const [deposits, setDeposits] = useState<WalletDeposit[]>(INITIAL_WALLET_DEPOSITS);
  const [showCount, setShowCount] = useState<number>(15);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [paymentIdInput, setPaymentIdInput] = useState<string>("");
  const [appliedPaymentId, setAppliedPaymentId] = useState<string>("");

  // Notifications
  const [notification, setNotification] = useState<string | null>(null);

  // Invoice Modal
  const [selectedInvoice, setSelectedInvoice] = useState<WalletDeposit | null>(null);

  const handleApplyFilter = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAppliedPaymentId(paymentIdInput.trim().toLowerCase());
  };

  const filteredDeposits = useMemo(() => {
    return deposits.filter((item) => {
      // Status filter
      if (statusFilter !== "All") {
        if (item.paymentStatus !== statusFilter) {
          return false;
        }
      }

      // Search filter
      if (appliedPaymentId) {
        const matchesId = item.paymentId.toLowerCase().includes(appliedPaymentId);
        const matchesUser = item.user.toLowerCase().includes(appliedPaymentId);
        const matchesMethod = item.paymentMethod.toLowerCase().includes(appliedPaymentId);
        if (!matchesId && !matchesUser && !matchesMethod) return false;
      }

      return true;
    });
  }, [deposits, statusFilter, appliedPaymentId]);

  const handleDelete = (id: number, paymentId: string) => {
    if (confirm(`Are you sure you want to delete deposit record "${paymentId}"?`)) {
      setDeposits((prev) => prev.filter((d) => d.id !== id));
      setNotification(`Deposit record #${paymentId} deleted successfully.`);
      setTimeout(() => setNotification(null), 3500);
    }
  };

  const handleApprove = (id: number, paymentId: string) => {
    setDeposits((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, paymentStatus: "Payment Received" } : d
      )
    );
    setNotification(`Deposit #${paymentId} approved successfully and funds credited.`);
    setTimeout(() => setNotification(null), 3500);
  };

  return (
    <div className="w-full text-[#333333] font-sans pb-16">
      {/* Page Title */}
      <div className="mb-4">
        <h1 className="text-[22px] font-normal text-[#333333]">Wallet Deposits</h1>
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
                className="appearance-none bg-white border border-[#d2d6de] rounded-[3px] h-[32px] pl-3 pr-8 text-[13px] text-[#555] outline-none focus:border-[#5b69bc] cursor-pointer min-w-[130px]"
              >
                <option value="All">All</option>
                <option value="Payment Received">Payment Received</option>
                <option value="Awaiting Payment">Awaiting Payment</option>
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
                <th className="py-3 px-4 font-semibold">Deposit Amount</th>
                <th className="py-3 px-4 font-semibold">Payment Status</th>
                <th className="py-3 px-4 font-semibold">User</th>
                <th className="py-3 px-4 font-semibold">Ip Address</th>
                <th className="py-3 px-4 font-semibold">Date</th>
                <th className="py-3 px-4 font-semibold w-[150px]">Options</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeposits.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-gray-500">
                    No wallet deposits found.
                  </td>
                </tr>
              ) : (
                filteredDeposits.map((item) => (
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

                    {/* Deposit Amount */}
                    <td className="py-3.5 px-4 text-[#555] font-normal whitespace-nowrap">
                      {item.depositAmount}
                    </td>

                    {/* Payment Status & Approve Button */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-1.5">
                        <span className="text-[#555] block">
                          {item.paymentStatus}
                        </span>

                        {item.paymentStatus === "Awaiting Payment" && (
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

        {/* Footer info: Number of Entries: 12 */}
        <div className="p-4 text-[13px] text-[#555] font-normal">
          Number of Entries:{" "}
          <span className="font-semibold">{filteredDeposits.length}</span>
        </div>
      </div>

      {/* Wallet Deposit Invoice Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-[3px] shadow-2xl border border-[#d2d6de] w-full max-w-[650px] overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#f4f4f4] flex items-center justify-between bg-gray-50">
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-[#5b69bc]" />
                <h3 className="text-[16px] font-semibold text-[#333]">
                  Wallet Deposit Receipt #{selectedInvoice.paymentId}
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
                    User Wallet & Balance Credit
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
                    Account Holder
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
                  <p
                    className={`text-xs font-semibold mt-0.5 ${
                      selectedInvoice.paymentStatus === "Payment Received"
                        ? "text-emerald-600"
                        : "text-amber-600"
                    }`}
                  >
                    Status: {selectedInvoice.paymentStatus}
                  </p>
                </div>
              </div>

              {/* Invoice Item Table */}
              <div className="border border-gray-200 rounded-[3px] overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-100 border-b border-gray-200 text-gray-700 font-semibold">
                    <tr>
                      <th className="py-2.5 px-3">Transaction Type</th>
                      <th className="py-2.5 px-3 text-right">Credit Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-3">
                        <p className="font-semibold text-gray-800">
                          Wallet Deposit
                        </p>
                        <p className="text-gray-500 mt-0.5 text-[11px]">
                          Funds addition via {selectedInvoice.paymentMethod}
                        </p>
                      </td>
                      <td className="py-3 px-3 text-right font-medium text-gray-800">
                        {selectedInvoice.depositAmount}
                      </td>
                    </tr>
                    <tr className="bg-gray-50 font-semibold text-gray-900">
                      <td className="py-2.5 px-3">Total Credited</td>
                      <td className="py-2.5 px-3 text-right text-emerald-700 text-sm">
                        {selectedInvoice.depositAmount}
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
