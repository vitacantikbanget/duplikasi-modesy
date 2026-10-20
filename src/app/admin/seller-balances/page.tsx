"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ChevronDown,
  User as UserIcon,
  CheckCircle,
  Edit2,
  ExternalLink,
  X,
  Wallet,
} from "lucide-react";

export interface SellerBalanceItem {
  userId: number;
  userName: string;
  avatarUrl?: string;
  totalSales: number;
  balance: string;
}

const INITIAL_SELLER_BALANCES: SellerBalanceItem[] = [
  {
    userId: 1,
    userName: "Admin",
    avatarUrl:
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=100&auto=format&fit=crop&q=80",
    totalSales: 10,
    balance: "$1,246.15",
  },
  {
    userId: 3,
    userName: "Trendshop",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    totalSales: 17,
    balance: "$896.52",
  },
  {
    userId: 4,
    userName: "Peter Jone",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    totalSales: 0,
    balance: "$9.95",
  },
  {
    userId: 11,
    userName: "rixebav798@pumpoly.com rixebav798@pumpoly.com",
    totalSales: 0,
    balance: "$0",
  },
  {
    userId: 20,
    userName: "laolierzi laolierzi",
    totalSales: 0,
    balance: "$0",
  },
  {
    userId: 19,
    userName: "Risma eka",
    totalSales: 0,
    balance: "$0",
  },
  {
    userId: 18,
    userName: "Samuwel Etoto",
    totalSales: 0,
    balance: "$0",
  },
  {
    userId: 17,
    userName: "oubaida benhocine",
    totalSales: 0,
    balance: "$0",
  },
  {
    userId: 16,
    userName: "emohh asss",
    totalSales: 0,
    balance: "$0",
  },
  {
    userId: 15,
    userName: "goldie glad",
    totalSales: 0,
    balance: "$0",
  },
  {
    userId: 14,
    userName: "Atukunda Didan",
    totalSales: 0,
    balance: "$0",
  },
  {
    userId: 13,
    userName: "ismail elvan",
    totalSales: 0,
    balance: "$0",
  },
  {
    userId: 12,
    userName: "Caleb Prosper",
    totalSales: 0,
    balance: "$0",
  },
  {
    userId: 10,
    userName: "Resa sz",
    totalSales: 0,
    balance: "$0",
  },
  {
    userId: 9,
    userName: "Resz sasa",
    totalSales: 0,
    balance: "$0",
  },
];

export default function SellerBalancesPage() {
  const [balances, setBalances] = useState<SellerBalanceItem[]>(
    INITIAL_SELLER_BALANCES
  );
  const [showCount, setShowCount] = useState<number>(15);
  const [searchInput, setSearchInput] = useState<string>("");
  const [appliedSearch, setAppliedSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openOptionDropdownId, setOpenOptionDropdownId] = useState<number | null>(
    null
  );

  // Notification
  const [notification, setNotification] = useState<string | null>(null);

  // Edit Balance Modal State
  const [editingItem, setEditingItem] = useState<SellerBalanceItem | null>(null);
  const [newBalanceInput, setNewBalanceInput] = useState<string>("");

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

  const filteredBalances = useMemo(() => {
    return balances.filter((item) => {
      if (appliedSearch) {
        const matchesUser = item.userName.toLowerCase().includes(appliedSearch);
        const matchesId = item.userId.toString().includes(appliedSearch);
        if (!matchesUser && !matchesId) return false;
      }
      return true;
    });
  }, [balances, appliedSearch]);

  const totalPages = Math.ceil(filteredBalances.length / showCount) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedBalances = useMemo(() => {
    const start = (safeCurrentPage - 1) * showCount;
    return filteredBalances.slice(start, start + showCount);
  }, [filteredBalances, safeCurrentPage, showCount]);

  const handleOpenEditBalance = (item: SellerBalanceItem) => {
    setEditingItem(item);
    setNewBalanceInput(item.balance.replace(/[^0-9.]/g, ""));
    setOpenOptionDropdownId(null);
  };

  const handleSaveBalance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    const formatted = `$${parseFloat(newBalanceInput || "0").toLocaleString(
      "en-US",
      { minimumFractionDigits: 2, maximumFractionDigits: 2 }
    )}`;

    setBalances((prev) =>
      prev.map((b) =>
        b.userId === editingItem.userId ? { ...b, balance: formatted } : b
      )
    );
    setNotification(
      `Balance for ${editingItem.userName} updated to ${formatted}.`
    );
    setEditingItem(null);
    setTimeout(() => setNotification(null), 3500);
  };

  return (
    <div className="w-full text-[#333333] font-sans pb-16">
      {/* Page Title */}
      <div className="mb-4">
        <h1 className="text-[22px] font-normal text-[#333333]">Seller Balances</h1>
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
        {/* Filter Bar: Show (15), Search (Username), and Filter button */}
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
              placeholder="Username"
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
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="border-b border-[#f4f4f4] text-[#333333] font-medium">
                <th className="py-3 px-4 w-[80px] font-semibold">User Id</th>
                <th className="py-3 px-4 font-semibold min-w-[280px]">User</th>
                <th className="py-3 px-4 font-semibold min-w-[160px]">
                  Number of total sales
                </th>
                <th className="py-3 px-4 font-semibold min-w-[120px]">Balance</th>
                <th className="py-3 px-4 font-semibold w-[150px]">Options</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBalances.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    No seller balances found.
                  </td>
                </tr>
              ) : (
                paginatedBalances.map((item) => (
                  <tr
                    key={item.userId}
                    className="border-b border-[#f4f4f4] hover:bg-[#f9fafc] transition-colors"
                  >
                    {/* User Id */}
                    <td className="py-3.5 px-4 text-[#555] font-normal">
                      {item.userId}
                    </td>

                    {/* User (Avatar + Name) */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        {item.avatarUrl ? (
                          <img
                            src={item.avatarUrl}
                            alt={item.userName}
                            className="w-[36px] h-[36px] rounded-[3px] object-cover shrink-0"
                          />
                        ) : (
                          <div className="w-[36px] h-[36px] rounded-[3px] bg-[#d2d6de]/60 flex items-center justify-center text-gray-400 shrink-0">
                            <UserIcon className="w-5 h-5 text-gray-400" />
                          </div>
                        )}
                        <span className="text-[#333333] font-normal truncate max-w-[240px]">
                          {item.userName}
                        </span>
                      </div>
                    </td>

                    {/* Number of total sales */}
                    <td className="py-3.5 px-4 text-[#555] font-normal">
                      {item.totalSales}
                    </td>

                    {/* Balance */}
                    <td className="py-3.5 px-4 text-[#333333] font-normal whitespace-nowrap">
                      {item.balance}
                    </td>

                    {/* Options (Select an option dropdown) */}
                    <td className="py-3.5 px-4 relative">
                      <div className="relative inline-block text-left">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenOptionDropdownId(
                              openOptionDropdownId === item.userId
                                ? null
                                : item.userId
                            )
                          }
                          className="bg-[#5b69bc] hover:bg-[#4d5aa3] text-white text-[12px] font-medium h-[30px] px-3 rounded-[3px] flex items-center gap-2 cursor-pointer transition-colors shadow-xs"
                        >
                          <span>Select an option</span>
                          <span className="text-[9px]">▼</span>
                        </button>

                        {/* Dropdown Menu */}
                        {openOptionDropdownId === item.userId && (
                          <div className="absolute right-0 sm:left-0 top-[34px] w-[150px] bg-white border border-[#d2d6de] rounded-[3px] shadow-lg z-30 py-1 text-[12.5px]">
                            <button
                              type="button"
                              onClick={() => handleOpenEditBalance(item)}
                              className="w-full text-left px-3.5 py-1.5 text-gray-700 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                            >
                              <Edit2 className="w-3.5 h-3.5 text-blue-600" />
                              <span>Edit Balance</span>
                            </button>

                            <Link
                              href={`/admin/users?search=${encodeURIComponent(item.userName)}`}
                              className="w-full text-left px-3.5 py-1.5 text-gray-700 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                            >
                              <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
                              <span>View User</span>
                            </Link>
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
            <span className="font-semibold">{filteredBalances.length}</span>
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

      {/* Edit Balance Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-[3px] shadow-2xl border border-[#d2d6de] w-full max-w-[440px] overflow-hidden">
            <div className="px-5 py-3.5 border-b border-[#f4f4f4] flex items-center justify-between bg-gray-50">
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-[#5b69bc]" />
                <h3 className="text-[15px] font-semibold text-[#333]">
                  Edit Balance - {editingItem.userName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveBalance} className="p-5 space-y-4 text-[13px]">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Current Balance
                </label>
                <div className="text-lg font-bold text-gray-900 bg-gray-50 p-2.5 rounded-[3px] border border-gray-200">
                  {editingItem.balance}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  New Balance (USD)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-400 font-medium">
                    $
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={newBalanceInput}
                    onChange={(e) => setNewBalanceInput(e.target.value)}
                    className="w-full h-[36px] pl-7 pr-3 border border-[#d2d6de] rounded-[3px] text-[13px] outline-none focus:border-[#5b69bc]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#f4f4f4]">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-1.5 border border-[#d2d6de] rounded-[3px] text-[#555] hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#5b69bc] hover:bg-[#4d5aa3] text-white rounded-[3px] font-medium cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
