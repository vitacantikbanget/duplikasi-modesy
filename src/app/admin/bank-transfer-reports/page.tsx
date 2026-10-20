"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, CheckCircle, XCircle, FileText, Download, Check, X, Eye } from "lucide-react";

interface BankTransferReport {
  id: number;
  orderNumber: string;
  orderId: string;
  user: string;
  userEmail: string;
  bankName: string;
  accountNumber: string;
  transferredAmount: string;
  receiptUrl: string;
  status: "Pending" | "Approved" | "Declined";
  date: string;
}

const INITIAL_REPORTS: BankTransferReport[] = [
  {
    id: 1,
    orderNumber: "#10041",
    orderId: "10041",
    user: "James Baronie",
    userEmail: "james.baronie@example.com",
    bankName: "Bank Central Asia (BCA)",
    accountNumber: "8820-192-384",
    transferredAmount: "$60.20",
    receiptUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=300&auto=format&fit=crop&q=80",
    status: "Pending",
    date: "2026-10-18 / 15:38",
  },
  {
    id: 2,
    orderNumber: "#10037",
    orderId: "10037",
    user: "ZUS KARA",
    userEmail: "zus.kara@example.com",
    bankName: "Chase Bank",
    accountNumber: "9120-482-110",
    transferredAmount: "$71.95",
    receiptUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=300&auto=format&fit=crop&q=80",
    status: "Approved",
    date: "2026-10-15 / 11:15",
  },
  {
    id: 3,
    orderNumber: "#10022",
    orderId: "10022",
    user: "Bella Fashion",
    userEmail: "bellafashion@gmail.com",
    bankName: "Wells Fargo",
    accountNumber: "3490-128-490",
    transferredAmount: "$120.00",
    receiptUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=300&auto=format&fit=crop&q=80",
    status: "Approved",
    date: "2026-10-12 / 09:30",
  },
];

export default function BankTransferReportsPage() {
  const [reports, setReports] = useState<BankTransferReport[]>(INITIAL_REPORTS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [notification, setNotification] = useState<string | null>(null);
  const [selectedReceipt, setSelectedReceipt] = useState<string | null>(null);

  const handleUpdateStatus = (id: number, newStatus: "Approved" | "Declined") => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
    setNotification(`Bank transfer report #${id} marked as ${newStatus}.`);
    setTimeout(() => setNotification(null), 3000);
  };

  const filtered = reports.filter((r) => {
    const matchSearch =
      r.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      r.user.toLowerCase().includes(search.toLowerCase()) ||
      r.bankName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-gray-200">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Bank Transfer Reports</h1>
          <p className="text-xs text-gray-500 mt-0.5">Review and verify payment receipts submitted by buyers via bank transfer</p>
        </div>
        <div className="text-xs text-gray-500 mt-2 sm:mt-0">
          <Link href="/admin" className="text-[#3c8dbc] hover:underline">Home</Link> / Payments / Bank Transfer Reports
        </div>
      </div>

      {notification && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded flex items-center gap-2 text-xs">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          {notification}
        </div>
      )}

      {/* Main Card */}
      <div className="bg-white rounded-[3px] shadow-xs border border-gray-200/80">
        <div className="p-3.5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="font-semibold text-gray-800 text-[14px]">Reports ({filtered.length})</h2>

          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs border border-gray-300 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#3c8dbc] bg-white text-gray-700"
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Declined">Declined</option>
            </select>

            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#3c8dbc] w-48"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 uppercase font-semibold">
                <th className="px-3.5 py-2.5">ID</th>
                <th className="px-3.5 py-2.5">Order</th>
                <th className="px-3.5 py-2.5">Buyer</th>
                <th className="px-3.5 py-2.5">Bank Account</th>
                <th className="px-3.5 py-2.5">Transferred Amount</th>
                <th className="px-3.5 py-2.5">Receipt / Slip</th>
                <th className="px-3.5 py-2.5">Status</th>
                <th className="px-3.5 py-2.5">Date</th>
                <th className="px-3.5 py-2.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-gray-400">
                    No bank transfer reports found
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="px-3.5 py-3 font-semibold text-gray-600">#{item.id}</td>
                    <td className="px-3.5 py-3 font-medium text-[#3c8dbc]">
                      <Link href={`/admin/orders`}>{item.orderNumber}</Link>
                    </td>
                    <td className="px-3.5 py-3">
                      <p className="font-medium text-gray-800">{item.user}</p>
                      <p className="text-[11px] text-gray-400">{item.userEmail}</p>
                    </td>
                    <td className="px-3.5 py-3">
                      <p className="font-medium text-gray-700">{item.bankName}</p>
                      <p className="text-[11px] text-gray-400">{item.accountNumber}</p>
                    </td>
                    <td className="px-3.5 py-3 font-semibold text-gray-800">{item.transferredAmount}</td>
                    <td className="px-3.5 py-3">
                      <button
                        type="button"
                        onClick={() => setSelectedReceipt(item.receiptUrl)}
                        className="text-[#3c8dbc] hover:underline flex items-center gap-1 font-medium cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View Slip
                      </button>
                    </td>
                    <td className="px-3.5 py-3">
                      <span
                        className={`px-2 py-0.5 rounded-[2px] text-[10.5px] font-semibold text-white ${
                          item.status === "Approved"
                            ? "bg-[#00a65a]"
                            : item.status === "Declined"
                            ? "bg-[#dd4b39]"
                            : "bg-[#f39c12]"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-3.5 py-3 text-gray-500">{item.date}</td>
                    <td className="px-3.5 py-3 text-right">
                      {item.status === "Pending" ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(item.id, "Approved")}
                            className="bg-[#00a65a] hover:bg-[#008d4c] text-white px-2 py-1 rounded-[2px] text-[10.5px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <Check className="w-3 h-3" /> Approve
                          </button>
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(item.id, "Declined")}
                            className="bg-[#dd4b39] hover:bg-[#c23321] text-white px-2 py-1 rounded-[2px] text-[10.5px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <X className="w-3 h-3" /> Decline
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-gray-400">Processed</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Receipt Preview Modal */}
      {selectedReceipt && (
        <div
          onClick={() => setSelectedReceipt(null)}
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-[4px] p-4 max-w-md w-full shadow-2xl relative"
          >
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-gray-200">
              <h3 className="text-sm font-bold text-gray-800">Bank Transfer Slip / Receipt</h3>
              <button
                type="button"
                onClick={() => setSelectedReceipt(null)}
                className="text-gray-400 hover:text-gray-700 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <img
              src={selectedReceipt}
              alt="Payment Slip"
              className="w-full h-auto max-h-[400px] object-contain rounded border border-gray-200"
            />
          </div>
        </div>
      )}
    </div>
  );
}
