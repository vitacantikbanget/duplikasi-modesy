"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Trash2,
  CheckCircle,
  FileText,
  Check,
  X,
  Eye,
} from "lucide-react";

export interface BankTransferReport {
  id: number;
  reportType: string;
  orderNumber?: string;
  isWalletDeposit?: boolean;
  user: string;
  receipt?: string;
  paymentNote?: string;
  status: "Pending" | "Approved";
  ipAddress: string;
  date: string;
}

const INITIAL_BANK_TRANSFER_REPORTS: BankTransferReport[] = [
  {
    id: 4,
    reportType: "Wallet Deposit",
    isWalletDeposit: true,
    user: "Peter Jone",
    receipt: "",
    paymentNote: "",
    status: "Pending",
    ipAddress: "104.23.162.64",
    date: "2026-09-23 / 17:27",
  },
  {
    id: 3,
    reportType: "Order (#10030)",
    orderNumber: "10030",
    user: "Admin",
    receipt: "",
    paymentNote: "1776Ythg",
    status: "Pending",
    ipAddress: "104.22.45.136",
    date: "2026-09-23 / 02:05",
  },
  {
    id: 2,
    reportType: "Order (#10014)",
    orderNumber: "10014",
    user: "Admin",
    receipt: "",
    paymentNote: "BTR-HLYZ4X72OX-AQVJA73G",
    status: "Pending",
    ipAddress: "162.158.108.10",
    date: "2026-09-04 / 08:32",
  },
  {
    id: 1,
    reportType: "Order (#10006)",
    orderNumber: "10006",
    user: "Trendshop",
    receipt: "",
    paymentNote: "Test report",
    status: "Approved",
    ipAddress: "78.190.31.52",
    date: "2026-08-05 / 13:47",
  },
];

export default function BankTransferReportsPage() {
  const [reports, setReports] = useState<BankTransferReport[]>(
    INITIAL_BANK_TRANSFER_REPORTS
  );
  const [showCount, setShowCount] = useState<number>(15);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [searchInput, setSearchInput] = useState<string>("");
  const [appliedSearch, setAppliedSearch] = useState<string>("");
  const [openOptionDropdownId, setOpenOptionDropdownId] = useState<number | null>(
    null
  );

  // Notifications
  const [notification, setNotification] = useState<string | null>(null);

  // Receipt Modal State
  const [viewingReceipt, setViewingReceipt] = useState<BankTransferReport | null>(
    null
  );

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

  const filteredReports = useMemo(() => {
    return reports.filter((item) => {
      // Status filter
      if (statusFilter !== "All" && item.status !== statusFilter) {
        return false;
      }

      // Search filter (Order number / User / Note)
      if (appliedSearch) {
        const matchesOrder =
          item.orderNumber && item.orderNumber.toLowerCase().includes(appliedSearch);
        const matchesReportType = item.reportType
          .toLowerCase()
          .includes(appliedSearch);
        const matchesUser = item.user.toLowerCase().includes(appliedSearch);
        const matchesNote =
          item.paymentNote &&
          item.paymentNote.toLowerCase().includes(appliedSearch);
        if (!matchesOrder && !matchesReportType && !matchesUser && !matchesNote) {
          return false;
        }
      }

      return true;
    });
  }, [reports, statusFilter, appliedSearch]);

  const handleApprove = (id: number, reportType: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Approved" } : r))
    );
    setOpenOptionDropdownId(null);
    setNotification(
      `Bank transfer report for ${reportType} has been approved successfully.`
    );
    setTimeout(() => setNotification(null), 3500);
  };

  const handleDelete = (id: number, reportType: string) => {
    if (
      confirm(
        `Are you sure you want to delete bank transfer report for ${reportType}?`
      )
    ) {
      setReports((prev) => prev.filter((r) => r.id !== id));
      setOpenOptionDropdownId(null);
      setNotification(`Bank transfer report deleted successfully.`);
      setTimeout(() => setNotification(null), 3500);
    }
  };

  return (
    <div className="w-full text-[#333333] font-sans pb-16">
      {/* Page Title */}
      <div className="mb-4">
        <h1 className="text-[22px] font-normal text-[#333333]">
          Bank Transfer Reports
        </h1>
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
        {/* Filter Bar: Show (15), Status (All), Search (Order Number), and Filter button */}
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
                <option value="Approved">Approved</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Search box & Filter Button */}
          <form onSubmit={handleApplyFilter} className="flex items-center gap-2">
            <span className="text-[#333333] font-normal">Search</span>
            <input
              type="text"
              placeholder="Order Number"
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
          <table className="w-full min-w-[850px] text-left border-collapse text-[13px]">
            <thead>
              <tr className="border-b border-[#f4f4f4] text-[#333333] font-medium">
                <th className="py-3 px-4 w-[50px] font-semibold">Id</th>
                <th className="py-3 px-4 font-semibold">Report Type</th>
                <th className="py-3 px-4 font-semibold">User</th>
                <th className="py-3 px-4 font-semibold">Receipt</th>
                <th className="py-3 px-4 font-semibold">Payment Note</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Ip Address</th>
                <th className="py-3 px-4 font-semibold">Date</th>
                <th className="py-3 px-4 font-semibold w-[150px]">Options</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-gray-500">
                    No bank transfer reports found.
                  </td>
                </tr>
              ) : (
                filteredReports.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#f4f4f4] hover:bg-[#f9fafc] transition-colors"
                  >
                    {/* Id */}
                    <td className="py-3.5 px-4 text-[#555] font-normal">{item.id}</td>

                    {/* Report Type */}
                    <td className="py-3.5 px-4 font-normal text-[#333333]">
                      {item.orderNumber ? (
                        <Link
                          href={`/admin/orders?order=${item.orderNumber}`}
                          className="text-[#333333] hover:text-[#3c8dbc]"
                        >
                          {item.reportType}
                        </Link>
                      ) : (
                        item.reportType
                      )}
                    </td>

                    {/* User */}
                    <td className="py-3.5 px-4 text-[#555] font-normal whitespace-nowrap">
                      {item.user}
                    </td>

                    {/* Receipt */}
                    <td className="py-3.5 px-4 text-[#555] font-normal">
                      {item.receipt ? (
                        <button
                          type="button"
                          onClick={() => setViewingReceipt(item)}
                          className="text-[#3c8dbc] hover:underline flex items-center gap-1 text-xs cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Receipt</span>
                        </button>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>

                    {/* Payment Note */}
                    <td className="py-3.5 px-4 text-[#555] font-normal font-mono text-[12px]">
                      {item.paymentNote || "-"}
                    </td>

                    {/* Status Badge: Gray for Pending, Green for Approved */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-[2px] text-white select-none inline-block ${
                          item.status === "Approved"
                            ? "bg-[#00a65a]"
                            : "bg-[#abb6b7]"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    {/* Ip Address */}
                    <td className="py-3.5 px-4 text-[#555] font-normal whitespace-nowrap">
                      {item.ipAddress}
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

                        {/* Options Dropdown Menu */}
                        {openOptionDropdownId === item.id && (
                          <div className="absolute right-0 sm:left-0 top-[34px] w-[160px] bg-white border border-[#d2d6de] rounded-[3px] shadow-lg z-30 py-1 text-[12.5px]">
                            {item.status === "Pending" && (
                              <button
                                type="button"
                                onClick={() => handleApprove(item.id, item.reportType)}
                                className="w-full text-left px-3.5 py-1.5 text-emerald-700 hover:bg-emerald-50 flex items-center gap-2 cursor-pointer font-medium"
                              >
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Approve Payment</span>
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => {
                                setViewingReceipt(item);
                                setOpenOptionDropdownId(null);
                              }}
                              className="w-full text-left px-3.5 py-1.5 text-gray-700 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                            >
                              <FileText className="w-3.5 h-3.5 text-blue-600" />
                              <span>Receipt / Slip</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDelete(item.id, item.reportType)}
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

      {/* Receipt Modal */}
      {viewingReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-[3px] shadow-2xl border border-[#d2d6de] w-full max-w-[500px] overflow-hidden">
            <div className="px-5 py-3 border-b border-[#f4f4f4] flex items-center justify-between bg-gray-50">
              <h3 className="text-[15px] font-semibold text-[#333]">
                Transfer Receipt - {viewingReceipt.reportType}
              </h3>
              <button
                type="button"
                onClick={() => setViewingReceipt(null)}
                className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-4 text-[13px]">
              <div className="bg-gray-50 border border-gray-200 p-3 rounded-[3px] space-y-1.5 text-xs text-gray-700">
                <p>
                  <strong className="font-semibold text-gray-900">User:</strong>{" "}
                  {viewingReceipt.user}
                </p>
                <p>
                  <strong className="font-semibold text-gray-900">Note:</strong>{" "}
                  {viewingReceipt.paymentNote || "No note provided"}
                </p>
                <p>
                  <strong className="font-semibold text-gray-900">IP:</strong>{" "}
                  {viewingReceipt.ipAddress}
                </p>
                <p>
                  <strong className="font-semibold text-gray-900">Date:</strong>{" "}
                  {viewingReceipt.date}
                </p>
              </div>

              <div className="border border-dashed border-gray-300 rounded-[3px] p-6 text-center bg-gray-50/50">
                {viewingReceipt.receipt ? (
                  <img
                    src={viewingReceipt.receipt}
                    alt="Receipt"
                    className="max-h-[300px] mx-auto rounded object-contain shadow-xs"
                  />
                ) : (
                  <div className="py-6 text-gray-400 text-xs">
                    <FileText className="w-10 h-10 mx-auto text-gray-300 mb-2" />
                    <span>No image slip attached by buyer.</span>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#f4f4f4]">
                <button
                  type="button"
                  onClick={() => setViewingReceipt(null)}
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
