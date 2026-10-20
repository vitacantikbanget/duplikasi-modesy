"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Home, ChevronDown, Check, X, Trash2, Plus } from "lucide-react";

interface PayoutRequestItem {
  id: number;
  user: string;
  userEmail: string;
  payoutMethod: string;
  accountDetails: string;
  amount: string;
  status: "Completed" | "Pending" | "Declined";
  date: string;
}

const INITIAL_REQUESTS: PayoutRequestItem[] = [
  { id: 14, user: "Trendshop", userEmail: "trendshop@codingest.net", payoutMethod: "PayPal", accountDetails: "payouts@trendshop.com", amount: "$650.00", status: "Pending", date: "2026-10-18 / 10:30" },
  { id: 13, user: "James Baronie", userEmail: "james@codingest.net", payoutMethod: "IBAN", accountDetails: "DE89 3704 0044 0532 0130 00", amount: "$420.00", status: "Pending", date: "2026-10-17 / 15:10" },
  { id: 12, user: "Linda Martin", userEmail: "linda@codingest.net", payoutMethod: "SWIFT", accountDetails: "CHASUS33 / Acc: 019283741", amount: "$300.00", status: "Completed", date: "2026-10-10 / 09:45" },
  { id: 11, user: "Alex Miller", userEmail: "alex@codingest.net", payoutMethod: "Bitcoin", accountDetails: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa", amount: "$150.00", status: "Completed", date: "2026-09-28 / 14:00" },
];

export default function PayoutRequestsPage() {
  const [requests, setRequests] = useState<PayoutRequestItem[]>(INITIAL_REQUESTS);
  const [showCount, setShowCount] = useState(15);
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);

  const handleStatusChange = (id: number, status: "Completed" | "Declined") => {
    setRequests(requests.map((r) => (r.id === id ? { ...r, status } : r)));
    setActiveMenuId(null);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this payout request?")) {
      setRequests(requests.filter((r) => r.id !== id));
      setActiveMenuId(null);
    }
  };

  const filtered = requests.filter((r) => {
    const matchStatus = statusFilter === "All" || r.status === statusFilter;
    const matchSearch =
      search === "" ||
      r.user.toLowerCase().includes(search.toLowerCase()) ||
      r.userEmail.toLowerCase().includes(search.toLowerCase()) ||
      r.accountDetails.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="w-full text-[#333333] pb-12">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h1 className="text-[24px] font-normal text-[#333333] m-0">
          Payout Requests <small className="text-[14px] text-gray-500 font-light">Payouts</small>
        </h1>
        <div className="text-[12px] text-gray-500 flex items-center space-x-1 mt-1 sm:mt-0">
          <Link href="/admin" className="text-[#333333] hover:text-[#3c8dbc] flex items-center gap-1">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <span>/</span>
          <span className="text-gray-400">Payouts</span>
          <span>/</span>
          <span className="text-gray-600 font-medium">Payout Requests</span>
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
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-[34px] px-3 border border-[#d2d6de] rounded-[3px] bg-white text-[13px] text-gray-700 focus:outline-none focus:border-[#3c8dbc]"
              >
                <option value="All">Status (All)</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Declined">Declined</option>
              </select>
            </div>

            <Link
              href="/admin/add-payout"
              className="h-[34px] bg-[#00a65a] hover:bg-[#008d4c] text-white px-3.5 rounded-[3px] text-[13px] font-medium flex items-center gap-1.5 shadow-2xs"
            >
              <Plus className="w-4 h-4" /> Add Payout
            </Link>
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
                <th className="px-4 py-2.5">User</th>
                <th className="px-4 py-2.5">Withdraw Method</th>
                <th className="px-4 py-2.5">Withdraw Amount</th>
                <th className="px-4 py-2.5">Account Details</th>
                <th className="px-4 py-2.5">Status</th>
                <th className="px-4 py-2.5">Date</th>
                <th className="px-4 py-2.5 text-right w-24">Options</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b border-[#f4f4f4] hover:bg-[#f9f9f9] transition-colors">
                  <td className="px-4 py-3 text-center text-gray-500">{item.id}</td>
                  <td className="px-4 py-3">
                    <span className="font-medium text-[#3c8dbc] hover:underline cursor-pointer">{item.user}</span>
                    <span className="block text-[11.5px] text-gray-400">{item.userEmail}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-[2px] text-[12px] border border-gray-200">
                      {item.payoutMethod}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-bold text-emerald-600">{item.amount}</td>
                  <td className="px-4 py-3 text-gray-600 font-mono text-[12px]">{item.accountDetails}</td>
                  <td className="px-4 py-3">
                    {item.status === "Completed" && (
                      <span className="bg-[#00a65a] text-white px-2 py-0.5 rounded-[2px] text-[11px] font-semibold tracking-wide">
                        Completed
                      </span>
                    )}
                    {item.status === "Pending" && (
                      <span className="bg-[#f39c12] text-white px-2 py-0.5 rounded-[2px] text-[11px] font-semibold tracking-wide">
                        Pending
                      </span>
                    )}
                    {item.status === "Declined" && (
                      <span className="bg-[#dd4b39] text-white px-2 py-0.5 rounded-[2px] text-[11px] font-semibold tracking-wide">
                        Declined
                      </span>
                    )}
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
                        <div className="absolute right-0 mt-1 w-36 bg-white rounded-[3px] shadow-lg border border-gray-200 py-1 z-20">
                          {item.status === "Pending" && (
                            <>
                              <button
                                onClick={() => handleStatusChange(item.id, "Completed")}
                                className="w-full text-left px-3 py-1.5 text-[12px] text-emerald-600 hover:bg-gray-100 flex items-center gap-1.5"
                              >
                                <Check className="w-3.5 h-3.5" /> Approve
                              </button>
                              <button
                                onClick={() => handleStatusChange(item.id, "Declined")}
                                className="w-full text-left px-3 py-1.5 text-[12px] text-amber-600 hover:bg-gray-100 flex items-center gap-1.5"
                              >
                                <X className="w-3.5 h-3.5" /> Decline
                              </button>
                            </>
                          )}
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
          <div>Showing 1 to {filtered.length} of {requests.length} entries</div>
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
