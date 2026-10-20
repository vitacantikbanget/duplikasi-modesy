"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Home, ChevronDown, Check, X, Trash2, CheckCircle } from "lucide-react";

interface ShopRequest {
  id: number;
  user: string;
  userEmail: string;
  shopTitle: string;
  shopDescription: string;
  phone: string;
  status: "Pending" | "Approved" | "Declined";
  date: string;
}

const INITIAL_REQUESTS: ShopRequest[] = [
  { id: 4, user: "Alex Miller", userEmail: "alex@codingest.net", shopTitle: "Miller Electronics & Gadgets", shopDescription: "Specializing in high-end computer accessories, cables and audio devices.", phone: "+1 (555) 234-5678", status: "Pending", date: "2026-10-18 / 16:00" },
  { id: 3, user: "Sarah Connor", userEmail: "sarah@codingest.net", shopTitle: "Sarah's Handmade Pottery", shopDescription: "Custom handcrafted ceramic mugs, vases and kitchen sets.", phone: "+1 (555) 876-5432", status: "Approved", date: "2026-10-16 / 11:20" },
  { id: 2, user: "John Doe", userEmail: "john@codingest.net", shopTitle: "Vintage Apparel Studio", shopDescription: "Curated collection of retro jackets and vintage casual wear.", phone: "+1 (555) 432-1098", status: "Declined", date: "2026-10-10 / 14:45" },
];

export default function ShopOpeningRequestsPage() {
  const [requests, setRequests] = useState<ShopRequest[]>(INITIAL_REQUESTS);
  const [showCount, setShowCount] = useState(15);
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const handleStatusChange = (id: number, status: "Approved" | "Declined") => {
    setRequests(requests.map((r) => (r.id === id ? { ...r, status } : r)));
    setActiveMenuId(null);
    setNotification(`Request marked as ${status}`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this request?")) {
      setRequests(requests.filter((r) => r.id !== id));
      setActiveMenuId(null);
      setNotification("Request deleted!");
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const filtered = requests.filter((r) => {
    const matchStatus = statusFilter === "All" || r.status === statusFilter;
    const matchSearch =
      search === "" ||
      r.user.toLowerCase().includes(search.toLowerCase()) ||
      r.userEmail.toLowerCase().includes(search.toLowerCase()) ||
      r.shopTitle.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="w-full text-[#333333] pb-12">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h1 className="text-[24px] font-normal text-[#333333] m-0">
          Shop Opening Requests <small className="text-[14px] text-gray-500 font-light">Membership</small>
        </h1>
        <div className="text-[12px] text-gray-500 flex items-center space-x-1 mt-1 sm:mt-0">
          <Link href="/admin" className="text-[#333333] hover:text-[#3c8dbc] flex items-center gap-1">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <span>/</span>
          <span className="text-gray-400">Membership</span>
          <span>/</span>
          <span className="text-gray-600 font-medium">Shop Opening Requests</span>
        </div>
      </div>

      {notification && (
        <div className="mb-4 px-4 py-3 bg-[#d4edda] border border-[#c3e6cb] text-[#155724] rounded-[3px] text-[13px] flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          {notification}
        </div>
      )}

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
                <option value="Approved">Approved</option>
                <option value="Declined">Declined</option>
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
                <th className="px-4 py-2.5">User</th>
                <th className="px-4 py-2.5">Shop Title</th>
                <th className="px-4 py-2.5">Description</th>
                <th className="px-4 py-2.5">Phone</th>
                <th className="px-4 py-2.5 text-center">Status</th>
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
                  <td className="px-4 py-3 font-semibold text-gray-800">{item.shopTitle}</td>
                  <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{item.shopDescription}</td>
                  <td className="px-4 py-3 text-gray-600">{item.phone}</td>
                  <td className="px-4 py-3 text-center">
                    {item.status === "Approved" && (
                      <span className="bg-[#00a65a] text-white px-2 py-0.5 rounded-[2px] text-[11px] font-semibold tracking-wide">
                        Approved
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
                                onClick={() => handleStatusChange(item.id, "Approved")}
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
