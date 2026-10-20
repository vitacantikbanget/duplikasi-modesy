"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  ChevronDown,
  Trash2,
  CheckCircle,
  Check,
  X,
  CreditCard,
  User as UserIcon,
} from "lucide-react";

export interface PayoutRequestItem {
  id: number;
  userId: number;
  userName: string;
  userFullName: string;
  avatarUrl?: string;
  withdrawalMethod: string;
  withdrawalDetails: {
    paypalEmail?: string;
    bankName?: string;
    accountNumber?: string;
    iban?: string;
    swift?: string;
    accountHolder?: string;
    bitcoinAddress?: string;
  };
  withdrawalAmount: string;
  status: "Pending" | "Completed";
  date: string;
}

const INITIAL_REQUESTS: PayoutRequestItem[] = [
  {
    id: 1,
    userId: 3,
    userName: "Trendshop",
    userFullName: "Daniel Jones",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    withdrawalMethod: "PayPal",
    withdrawalDetails: {
      paypalEmail: "trendshop@codingest.net",
    },
    withdrawalAmount: "$500",
    status: "Pending",
    date: "2026-09-09 / 11:17",
  },
  {
    id: 2,
    userId: 4,
    userName: "Peter Jone",
    userFullName: "Peter Jone",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    withdrawalMethod: "Bank Transfer",
    withdrawalDetails: {
      bankName: "Chase Bank",
      accountNumber: "9120-482-110",
      iban: "US45CHAS009120482110",
      swift: "CHASUS33",
      accountHolder: "Peter Jone",
    },
    withdrawalAmount: "$250",
    status: "Completed",
    date: "2026-08-20 / 14:05",
  },
  {
    id: 3,
    userId: 1,
    userName: "Admin",
    userFullName: "Administrator",
    avatarUrl:
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=100&auto=format&fit=crop&q=80",
    withdrawalMethod: "Stripe / Payout",
    withdrawalDetails: {
      accountHolder: "Modesy Admin",
      accountNumber: "acct_1Mqz9a47ba9xU0S",
    },
    withdrawalAmount: "$1,200",
    status: "Completed",
    date: "2026-08-01 / 09:30",
  },
];

export default function PayoutRequestsPage() {
  const [requests, setRequests] = useState<PayoutRequestItem[]>(INITIAL_REQUESTS);
  const [showCount, setShowCount] = useState<number>(15);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [searchInput, setSearchInput] = useState<string>("");
  const [appliedSearch, setAppliedSearch] = useState<string>("");
  const [openOptionDropdownId, setOpenOptionDropdownId] = useState<number | null>(null);

  // Notification
  const [notification, setNotification] = useState<string | null>(null);

  // Details Modal
  const [selectedDetails, setSelectedDetails] = useState<PayoutRequestItem | null>(null);

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
    setOpenOptionDropdownId(null);
  };

  const filteredRequests = useMemo(() => {
    return requests.filter((item) => {
      // Status filter
      if (statusFilter !== "All" && item.status !== statusFilter) {
        return false;
      }

      // Search filter (by User Id or name)
      if (appliedSearch) {
        const matchesUserId = item.userId.toString() === appliedSearch;
        const matchesUserName = item.userName.toLowerCase().includes(appliedSearch);
        const matchesFullName = item.userFullName.toLowerCase().includes(appliedSearch);
        if (!matchesUserId && !matchesUserName && !matchesFullName) return false;
      }

      return true;
    });
  }, [requests, statusFilter, appliedSearch]);

  const handleApprove = (id: number, userName: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Completed" } : r))
    );
    setOpenOptionDropdownId(null);
    setNotification(`Payout request for ${userName} has been marked as Completed.`);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleDelete = (id: number, userName: string) => {
    if (confirm(`Are you sure you want to delete payout request for ${userName}?`)) {
      setRequests((prev) => prev.filter((r) => r.id !== id));
      setOpenOptionDropdownId(null);
      setNotification(`Payout request deleted successfully.`);
      setTimeout(() => setNotification(null), 3500);
    }
  };

  return (
    <div className="w-full text-[#333333] font-sans pb-16">
      {/* Header Row: Title & + Add Payout green button */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h1 className="text-[22px] font-normal text-[#333333]">Payout Requests</h1>

        <Link
          href="/admin/add-payout"
          className="bg-[#00a65a] hover:bg-[#008d4c] text-white text-[13px] font-medium h-[34px] px-3.5 rounded-[3px] flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Payout</span>
        </Link>
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
        {/* Filter Bar: Show (15), Status (All), Search (User Id), and Filter button */}
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

          {/* Status Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-[#333333] font-normal">Status</span>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none bg-white border border-[#d2d6de] rounded-[3px] h-[32px] pl-3 pr-8 text-[13px] text-[#555] outline-none focus:border-[#5b69bc] cursor-pointer min-w-[90px]"
              >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Search box & Filter Button */}
          <form onSubmit={handleApplyFilter} className="flex items-center gap-2">
            <span className="text-[#333333] font-normal">Search</span>
            <input
              type="text"
              placeholder="User Id"
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
                <th className="py-3 px-4 w-[60px] font-semibold">Id</th>
                <th className="py-3 px-4 font-semibold min-w-[240px]">User</th>
                <th className="py-3 px-4 font-semibold min-w-[180px]">
                  Withdrawal Method
                </th>
                <th className="py-3 px-4 font-semibold">Withdrawal Amount</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Date</th>
                <th className="py-3 px-4 font-semibold w-[150px]">Options</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500">
                    No payout requests found.
                  </td>
                </tr>
              ) : (
                filteredRequests.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#f4f4f4] hover:bg-[#f9fafc] transition-colors"
                  >
                    {/* Id */}
                    <td className="py-3.5 px-4 text-[#555] font-normal">{item.id}</td>

                    {/* User (Avatar + User Id + Full Name/Store) */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        {item.avatarUrl ? (
                          <img
                            src={item.avatarUrl}
                            alt={item.userName}
                            className="w-[42px] h-[42px] rounded-[3px] object-cover shrink-0"
                          />
                        ) : (
                          <div className="w-[42px] h-[42px] rounded-[3px] bg-[#d2d6de]/60 flex items-center justify-center text-gray-400 shrink-0">
                            <UserIcon className="w-5 h-5 text-gray-400" />
                          </div>
                        )}
                        <div>
                          <p className="text-[11.5px] text-gray-500 font-normal leading-tight">
                            User Id: {item.userId}
                          </p>
                          <p className="text-[13px] text-[#333333] font-normal mt-0.5">
                            {item.userFullName} ({item.userName})
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Withdrawal Method & See Details Button */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-1">
                        <span className="text-[#333] block">
                          {item.withdrawalMethod}
                        </span>
                        <button
                          type="button"
                          onClick={() => setSelectedDetails(item)}
                          className="bg-[#00c0ef] hover:bg-[#00acd6] text-white text-[11px] font-normal px-2 py-0.5 rounded-[2px] transition-colors cursor-pointer shadow-xs inline-block"
                        >
                          See Details
                        </button>
                      </div>
                    </td>

                    {/* Withdrawal Amount */}
                    <td className="py-3.5 px-4 text-[#333333] font-normal whitespace-nowrap">
                      {item.withdrawalAmount}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-[2px] text-white select-none inline-block ${
                          item.status === "Pending"
                            ? "bg-[#f39c12]"
                            : "bg-[#00a65a]"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-[#666666] whitespace-nowrap">
                      {item.date}
                    </td>

                    {/* Options (Select an option dropdown) */}
                    <td className="py-3.5 px-4 relative">
                      <div className="relative inline-block text-left">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenOptionDropdownId(
                              openOptionDropdownId === item.id ? null : item.id
                            )
                          }
                          className="bg-[#5b69bc] hover:bg-[#4d5aa3] text-white text-[12px] font-medium h-[30px] px-3 rounded-[3px] flex items-center gap-2 cursor-pointer transition-colors shadow-xs"
                        >
                          <span>Select an option</span>
                          <span className="text-[9px]">▼</span>
                        </button>

                        {/* Dropdown Menu */}
                        {openOptionDropdownId === item.id && (
                          <div className="absolute right-0 sm:left-0 top-[34px] w-[150px] bg-white border border-[#d2d6de] rounded-[3px] shadow-lg z-30 py-1 text-[12.5px]">
                            {item.status === "Pending" && (
                              <button
                                type="button"
                                onClick={() => handleApprove(item.id, item.userName)}
                                className="w-full text-left px-3.5 py-1.5 text-emerald-700 hover:bg-emerald-50 flex items-center gap-2 cursor-pointer font-medium"
                              >
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Complete</span>
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => {
                                setSelectedDetails(item);
                                setOpenOptionDropdownId(null);
                              }}
                              className="w-full text-left px-3.5 py-1.5 text-gray-700 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                            >
                              <CreditCard className="w-3.5 h-3.5 text-blue-600" />
                              <span>View Details</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDelete(item.id, item.userName)}
                              className="w-full text-left px-3.5 py-1.5 text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-red-600" />
                              <span>Delete</span>
                            </button>
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
      </div>

      {/* Withdrawal Details Modal */}
      {selectedDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-[3px] shadow-2xl border border-[#d2d6de] w-full max-w-[480px] overflow-hidden">
            <div className="px-5 py-3.5 border-b border-[#f4f4f4] flex items-center justify-between bg-gray-50">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#5b69bc]" />
                <h3 className="text-[15px] font-semibold text-[#333]">
                  Withdrawal Method Details
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDetails(null)}
                className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-3.5 text-[13px]">
              <div className="bg-gray-50 p-3.5 rounded-[3px] border border-gray-200 space-y-2 text-xs">
                <div className="flex justify-between border-b border-gray-200/60 pb-1.5">
                  <span className="text-gray-500 font-semibold">User:</span>
                  <span className="text-gray-800 font-medium">
                    {selectedDetails.userFullName} ({selectedDetails.userName})
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-200/60 pb-1.5">
                  <span className="text-gray-500 font-semibold">Method:</span>
                  <span className="text-gray-800 font-medium">
                    {selectedDetails.withdrawalMethod}
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-200/60 pb-1.5">
                  <span className="text-gray-500 font-semibold">Amount:</span>
                  <span className="text-emerald-700 font-bold">
                    {selectedDetails.withdrawalAmount}
                  </span>
                </div>
              </div>

              {/* Specific Details based on Method */}
              <div className="p-3.5 bg-blue-50/50 border border-blue-200 rounded-[3px] text-xs text-gray-800 space-y-1.5">
                {selectedDetails.withdrawalDetails.paypalEmail && (
                  <p>
                    <strong className="text-gray-900 font-semibold">
                      PayPal Email:
                    </strong>{" "}
                    {selectedDetails.withdrawalDetails.paypalEmail}
                  </p>
                )}
                {selectedDetails.withdrawalDetails.bankName && (
                  <>
                    <p>
                      <strong>Bank Name:</strong>{" "}
                      {selectedDetails.withdrawalDetails.bankName}
                    </p>
                    <p>
                      <strong>Account Number / IBAN:</strong>{" "}
                      {selectedDetails.withdrawalDetails.iban ||
                        selectedDetails.withdrawalDetails.accountNumber}
                    </p>
                    {selectedDetails.withdrawalDetails.swift && (
                      <p>
                        <strong>SWIFT/BIC:</strong>{" "}
                        {selectedDetails.withdrawalDetails.swift}
                      </p>
                    )}
                    <p>
                      <strong>Account Holder:</strong>{" "}
                      {selectedDetails.withdrawalDetails.accountHolder}
                    </p>
                  </>
                )}
                {selectedDetails.withdrawalDetails.accountNumber &&
                  !selectedDetails.withdrawalDetails.bankName && (
                    <p>
                      <strong>Account ID:</strong>{" "}
                      {selectedDetails.withdrawalDetails.accountNumber}
                    </p>
                  )}
              </div>

              <div className="flex justify-end pt-2 border-t border-[#f4f4f4]">
                <button
                  type="button"
                  onClick={() => setSelectedDetails(null)}
                  className="px-4 py-1.5 bg-[#5b69bc] hover:bg-[#4d5aa3] text-white rounded-[3px] text-xs font-medium cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
