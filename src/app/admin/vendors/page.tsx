"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Store,
  CheckCircle,
  AlertCircle,
  XCircle,
  Edit,
  Trash2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Percent,
  X,
  FileText,
} from "lucide-react";

export interface VendorItem {
  id: number;
  storeName: string;
  storeSlug: string;
  username: string;
  email: string;
  productsCount: number;
  balance: string;
  commissionRate: string;
  isVerified: boolean;
  date: string;
  avatar: string;
}

export interface VendorRequestItem {
  id: number;
  username: string;
  email: string;
  storeName: string;
  country: string;
  phone: string;
  description: string;
  date: string;
  status: "Pending" | "Approved" | "Declined";
}

const INITIAL_VENDORS: VendorItem[] = [
  {
    id: 1,
    storeName: "Trendshop Official",
    storeSlug: "trendshop",
    username: "trendshop",
    email: "trendshop@store.com",
    productsCount: 24,
    balance: "$2,840.50",
    commissionRate: "10%",
    isVerified: true,
    date: "2026-03-14 / 09:45",
    avatar: "https://i.pravatar.cc/150?u=trendshop",
  },
  {
    id: 2,
    storeName: "Sophia Boutique",
    storeSlug: "sophia-boutique",
    username: "sophia_miller",
    email: "sophia.m@example.com",
    productsCount: 16,
    balance: "$1,120.00",
    commissionRate: "10%",
    isVerified: true,
    date: "2026-06-11 / 10:05",
    avatar: "https://i.pravatar.cc/150?u=sophia",
  },
  {
    id: 3,
    storeName: "Clark Urban Fashion",
    storeSlug: "clark-urban",
    username: "emily_clark",
    email: "emily.clark@store.com",
    productsCount: 9,
    balance: "$760.00",
    commissionRate: "12%",
    isVerified: false,
    date: "2026-08-15 / 16:22",
    avatar: "https://i.pravatar.cc/150?u=emily",
  },
];

const INITIAL_REQUESTS: VendorRequestItem[] = [
  {
    id: 1,
    username: "john_doe",
    email: "john.doe@testmail.com",
    storeName: "JD Footwear & Apparel",
    country: "United States",
    phone: "+1 415 555 2671",
    description: "Wholesale distributor of premium sneakers, sports apparel and leather boots.",
    date: "2026-10-14 / 16:30",
    status: "Pending",
  },
  {
    id: 2,
    username: "peter_jones",
    email: "peter.jones@example.com",
    storeName: "PJ Handmade Crafts",
    country: "United Kingdom",
    phone: "+44 20 7946 0912",
    description: "Handcrafted accessories, wooden decor and artisan lifestyle gifts.",
    date: "2026-10-15 / 11:15",
    status: "Pending",
  },
];

export default function AdminVendorsPage() {
  const [activeTab, setActiveTab] = useState<"vendors" | "requests">("vendors");
  const [vendors, setVendors] = useState<VendorItem[]>(INITIAL_VENDORS);
  const [requests, setRequests] = useState<VendorRequestItem[]>(INITIAL_REQUESTS);

  // Filters
  const [showCount, setShowCount] = useState<number>(15);
  const [searchInput, setSearchInput] = useState<string>("");
  const [appliedSearch, setAppliedSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Edit commission modal
  const [editingVendor, setEditingVendor] = useState<VendorItem | null>(null);
  const [newCommission, setNewCommission] = useState("");
  const [notification, setNotification] = useState<string | null>(null);

  const filteredVendors = useMemo(() => {
    return vendors.filter((v) => {
      if (appliedSearch) {
        const matchStore = v.storeName.toLowerCase().includes(appliedSearch);
        const matchUser = v.username.toLowerCase().includes(appliedSearch);
        const matchEmail = v.email.toLowerCase().includes(appliedSearch);
        if (!matchStore && !matchUser && !matchEmail) return false;
      }
      return true;
    });
  }, [vendors, appliedSearch]);

  const handleApplyFilter = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAppliedSearch(searchInput.trim().toLowerCase());
    setCurrentPage(1);
  };

  const handleApproveRequest = (item: VendorRequestItem) => {
    if (confirm(`Approve shop opening request for "${item.storeName}" (${item.username})?`)) {
      setRequests((prev) =>
        prev.map((r) => (r.id === item.id ? { ...r, status: "Approved" } : r))
      );

      // Add to vendors list
      const newVendor: VendorItem = {
        id: Date.now() % 1000,
        storeName: item.storeName,
        storeSlug: item.storeName.toLowerCase().replace(/\s+/g, "-"),
        username: item.username,
        email: item.email,
        productsCount: 0,
        balance: "$0.00",
        commissionRate: "10%",
        isVerified: true,
        date: "Just now",
        avatar: `https://i.pravatar.cc/150?u=${item.username}`,
      };
      setVendors((prev) => [newVendor, ...prev]);

      setNotification(`Store "${item.storeName}" has been approved as an active vendor.`);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  const handleDeclineRequest = (item: VendorRequestItem) => {
    if (confirm(`Decline shop opening request for "${item.storeName}"?`)) {
      setRequests((prev) =>
        prev.map((r) => (r.id === item.id ? { ...r, status: "Declined" } : r))
      );
      setNotification(`Store request for "${item.storeName}" was declined.`);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  const handleSaveCommission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVendor) return;

    const formattedRate = newCommission.includes("%") ? newCommission : `${newCommission}%`;
    setVendors((prev) =>
      prev.map((v) =>
        v.id === editingVendor.id ? { ...v, commissionRate: formattedRate } : v
      )
    );
    setNotification(`Commission rate for "${editingVendor.storeName}" updated to ${formattedRate}.`);
    setEditingVendor(null);
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="w-full text-[#333333] pb-12 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <div>
          <h1 className="text-[24px] font-normal text-[#333333]">Vendors</h1>
        </div>
        <div className="text-xs text-gray-500">
          <Link href="/admin" className="text-[#3c8dbc] hover:underline">
            Home
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-gray-400">Vendors</span>
        </div>
      </div>

      {/* Success Notification Alert */}
      {notification && (
        <div className="mb-4 bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-3 rounded-[3px] text-sm flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{notification}</span>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="text-xs text-emerald-700 font-semibold hover:underline cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Tabs Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-4 border-b border-gray-200">
        <button
          type="button"
          onClick={() => setActiveTab("vendors")}
          className={`px-4 py-2.5 text-[13.5px] font-medium border-b-2 transition-colors cursor-pointer ${
            activeTab === "vendors"
              ? "border-[#0088cc] text-[#0088cc]"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          Active Vendors ({vendors.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("requests")}
          className={`px-4 py-2.5 text-[13.5px] font-medium border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === "requests"
              ? "border-[#0088cc] text-[#0088cc]"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          <span>Shop Opening Requests</span>
          <span className="bg-[#f39c12] text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
            {requests.filter((r) => r.status === "Pending").length}
          </span>
        </button>
      </div>

      {/* TAB 1: ACTIVE VENDORS */}
      {activeTab === "vendors" && (
        <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border border-[#d2d6de] p-5">
          {/* Filters Form */}
          <form onSubmit={handleApplyFilter} className="flex flex-wrap items-end gap-3 mb-5">
            <div>
              <label className="block text-[13px] text-[#333333] font-normal mb-1">
                Show
              </label>
              <div className="relative">
                <select
                  value={showCount}
                  onChange={(e) => {
                    setShowCount(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="h-[34px] w-[85px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-[#555] bg-white appearance-none outline-none focus:border-[#3c8dbc] cursor-pointer"
                >
                  <option value={15}>15</option>
                  <option value={30}>30</option>
                  <option value={60}>60</option>
                </select>
                <span className="absolute right-2.5 top-2 pointer-events-none text-[11px] text-[#777]">
                  ▾
                </span>
              </div>
            </div>

            <div>
              <label className="block text-[13px] text-[#333333] font-normal mb-1">
                Search
              </label>
              <input
                type="text"
                placeholder="Store Name, Owner..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-[#555] placeholder-gray-400 outline-none focus:border-[#3c8dbc] w-[180px]"
              />
            </div>

            <button
              type="submit"
              className="h-[34px] px-5 bg-[#605ca8] hover:bg-[#534f96] text-white text-[13px] rounded-[3px] font-normal transition-colors cursor-pointer shadow-xs"
            >
              Filter
            </button>
          </form>

          {/* Vendors Table */}
          <div className="overflow-x-auto min-h-[350px]">
            <table className="w-full text-left text-[13px] border-collapse whitespace-nowrap">
              <thead>
                <tr className="border-b-2 border-gray-200 text-[#333333] font-semibold text-[13px]">
                  <th className="py-2.5 px-3 text-left w-[50px]">Id</th>
                  <th className="py-2.5 px-3 text-left min-w-[220px]">Vendor Store</th>
                  <th className="py-2.5 px-3 text-left w-[200px]">Email</th>
                  <th className="py-2.5 px-3 text-left w-[100px]">Products</th>
                  <th className="py-2.5 px-3 text-left w-[120px]">Wallet Balance</th>
                  <th className="py-2.5 px-3 text-left w-[110px]">Commission</th>
                  <th className="py-2.5 px-3 text-left w-[100px]">Status</th>
                  <th className="py-2.5 px-3 text-left w-[140px]">Options</th>
                </tr>
              </thead>
              <tbody>
                {filteredVendors.map((v) => (
                  <tr
                    key={v.id}
                    className="border-b border-[#f4f4f4] hover:bg-gray-50/70 transition-colors text-[13px]"
                  >
                    <td className="py-3 px-3 text-gray-700">{v.id}</td>

                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={v.avatar}
                          alt={v.storeName}
                          className="w-8 h-8 rounded-full object-cover border border-gray-200 shrink-0"
                        />
                        <div>
                          <p className="font-semibold text-gray-800 leading-tight">
                            {v.storeName}
                          </p>
                          <p className="text-xs text-gray-500 leading-tight mt-0.5">
                            @{v.username}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3 text-gray-800">{v.email}</td>
                    <td className="py-3 px-3 text-gray-800">{v.productsCount} items</td>
                    <td className="py-3 px-3 font-semibold text-gray-900">{v.balance}</td>

                    <td className="py-3 px-3">
                      <span className="inline-block bg-purple-50 text-purple-700 border border-purple-200 text-[11px] font-semibold px-2 py-0.5 rounded-[2px]">
                        {v.commissionRate}
                      </span>
                    </td>

                    <td className="py-3 px-3">
                      {v.isVerified ? (
                        <span className="inline-flex items-center gap-1 bg-[#00a65a] text-white text-[11px] font-semibold px-2 py-0.5 rounded-[2px] shadow-2xs">
                          <ShieldCheck className="w-3 h-3" /> Verified
                        </span>
                      ) : (
                        <span className="inline-block bg-gray-100 text-gray-600 text-[11px] font-semibold px-2 py-0.5 rounded-[2px]">
                          Unverified
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Link
                          href={`/shops`}
                          className="h-[26px] px-2.5 border border-[#d2d6de] bg-white hover:bg-gray-50 text-[#0088cc] text-[12px] rounded-[3px] flex items-center gap-1 shadow-2xs"
                          title="View Storefront"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Shop</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingVendor(v);
                            setNewCommission(v.commissionRate.replace("%", ""));
                          }}
                          className="h-[26px] px-2.5 border border-[#d2d6de] bg-white hover:bg-gray-50 text-[#444] text-[12px] rounded-[3px] shadow-2xs cursor-pointer"
                        >
                          Commission
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: SHOP OPENING REQUESTS */}
      {activeTab === "requests" && (
        <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border border-[#d2d6de] p-5">
          <div className="overflow-x-auto min-h-[350px]">
            <table className="w-full text-left text-[13px] border-collapse whitespace-nowrap">
              <thead>
                <tr className="border-b-2 border-gray-200 text-[#333333] font-semibold text-[13px]">
                  <th className="py-2.5 px-3 text-left w-[50px]">Id</th>
                  <th className="py-2.5 px-3 text-left min-w-[200px]">Store & Owner</th>
                  <th className="py-2.5 px-3 text-left w-[180px]">Contact Info</th>
                  <th className="py-2.5 px-3 text-left min-w-[260px]">Store Description</th>
                  <th className="py-2.5 px-3 text-left w-[100px]">Status</th>
                  <th className="py-2.5 px-3 text-left w-[150px]">Date</th>
                  <th className="py-2.5 px-3 text-left w-[160px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#f4f4f4] hover:bg-gray-50/70 transition-colors text-[13px]"
                  >
                    <td className="py-3 px-3 text-gray-700">{item.id}</td>

                    <td className="py-3 px-3">
                      <p className="font-semibold text-gray-800">{item.storeName}</p>
                      <p className="text-xs text-gray-500">@{item.username}</p>
                    </td>

                    <td className="py-3 px-3">
                      <p className="text-gray-800">{item.email}</p>
                      <p className="text-xs text-gray-500">{item.phone} ({item.country})</p>
                    </td>

                    <td className="py-3 px-3">
                      <p className="text-gray-700 text-xs truncate max-w-xs">{item.description}</p>
                    </td>

                    <td className="py-3 px-3">
                      {item.status === "Pending" ? (
                        <span className="inline-block bg-[#f39c12] text-white text-[11px] font-semibold px-2 py-0.5 rounded-[2px]">
                          Pending
                        </span>
                      ) : item.status === "Approved" ? (
                        <span className="inline-block bg-[#00a65a] text-white text-[11px] font-semibold px-2 py-0.5 rounded-[2px]">
                          Approved
                        </span>
                      ) : (
                        <span className="inline-block bg-[#dd4b39] text-white text-[11px] font-semibold px-2 py-0.5 rounded-[2px]">
                          Declined
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-3 text-gray-600 text-xs">{item.date}</td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      {item.status === "Pending" ? (
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleApproveRequest(item)}
                            className="h-[28px] px-3 bg-[#00a65a] hover:bg-[#008d4c] text-white text-xs rounded-[3px] cursor-pointer shadow-2xs font-medium"
                          >
                            Approve
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeclineRequest(item)}
                            className="h-[28px] px-3 bg-[#dd4b39] hover:bg-[#d73925] text-white text-xs rounded-[3px] cursor-pointer shadow-2xs font-medium"
                          >
                            Decline
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 italic">Completed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* EDIT COMMISSION MODAL */}
      {editingVendor && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-2xs">
          <div className="bg-white rounded-[4px] shadow-2xl w-full max-w-sm overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-[#f4f4f4] flex items-center justify-between bg-gray-50">
              <h3 className="text-[17px] font-semibold text-[#333333]">
                Vendor Commission ({editingVendor.storeName})
              </h3>
              <button
                type="button"
                onClick={() => setEditingVendor(null)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCommission}>
              <div className="p-6 space-y-4 text-[13.5px]">
                <p className="text-xs text-gray-600">
                  Set custom marketplace commission rate for sales made by this vendor.
                </p>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Commission Rate (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="any"
                      required
                      value={newCommission}
                      onChange={(e) => setNewCommission(e.target.value)}
                      className="w-full h-[36px] pl-3 pr-8 border border-[#d2d6de] rounded-[3px] text-[13.5px] outline-none focus:border-[#3c8dbc]"
                    />
                    <span className="absolute right-3 top-2 text-gray-500 font-semibold">%</span>
                  </div>
                </div>
              </div>

              <div className="px-6 py-3 border-t border-[#f4f4f4] bg-gray-50 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingVendor(null)}
                  className="h-[34px] px-4 border border-[#d2d6de] bg-white hover:bg-gray-100 text-[#444] text-[13px] rounded-[3px] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-[34px] px-5 bg-[#0073b7] hover:bg-[#005a92] text-white text-[13px] rounded-[3px] font-normal transition-colors cursor-pointer"
                >
                  Save Rate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
