"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Trash2, Eye, X, Download } from "lucide-react";

interface TransactionItem {
  id: number;
  order: string;
  orderId: string;
  paymentMethod: string;
  paymentId: string;
  user: string;
  userSlug?: string;
  currency: string;
  paymentAmount: string;
  paymentStatus: string;
  ipAddress: string;
  date: string;
}

const TRANSACTIONS_DATA: TransactionItem[] = [
  {
    id: 20,
    order: "#10046",
    orderId: "10046",
    paymentMethod: "Wallet Balance",
    paymentId: "WLT-HNAVG68GHO-2WEFKD53",
    user: "Admin",
    userSlug: "admin",
    currency: "USD",
    paymentAmount: "84.35",
    paymentStatus: "Succeeded",
    ipAddress: "104.22.177.29",
    date: "2026-10-17 / 19:08",
  },
  {
    id: 19,
    order: "#10042",
    orderId: "10042",
    paymentMethod: "Wallet Balance",
    paymentId: "WLT-HN5DHIFXGY-7948ZIMK",
    user: "Trendshop",
    userSlug: "trendshop",
    currency: "USD",
    paymentAmount: "236.25",
    paymentStatus: "Succeeded",
    ipAddress: "104.23.168.30",
    date: "2026-10-12 / 19:26",
  },
  {
    id: 18,
    order: "#10033",
    orderId: "10033",
    paymentMethod: "Wallet Balance",
    paymentId: "WLT-HMKBYBZ5AC-27VOFQID",
    user: "Trendshop",
    userSlug: "trendshop",
    currency: "USD",
    paymentAmount: "191.10",
    paymentStatus: "Succeeded",
    ipAddress: "104.23.162.64",
    date: "2026-09-23 / 17:23",
  },
  {
    id: 17,
    order: "#10031",
    orderId: "10031",
    paymentMethod: "Wallet Balance",
    paymentId: "WLT-HMJMQSTAMA-D9HKI4QN",
    user: "Admin",
    userSlug: "admin",
    currency: "USD",
    paymentAmount: "257",
    paymentStatus: "Succeeded",
    ipAddress: "104.22.45.136",
    date: "2026-09-23 / 02:08",
  },
  {
    id: 16,
    order: "#10029",
    orderId: "10029",
    paymentMethod: "Wallet Balance",
    paymentId: "WLT-HMIQJLXH1K-4K2FSN9D",
    user: "Admin",
    userSlug: "admin",
    currency: "USD",
    paymentAmount: "259.05",
    paymentStatus: "Succeeded",
    ipAddress: "172.68.213.162",
    date: "2026-09-22 / 06:40",
  },
  {
    id: 15,
    order: "#10025",
    orderId: "10025",
    paymentMethod: "PayStack",
    paymentId: "d2e30eab28ef91c7da59f6da2891a27dcd21dd31",
    user: "Admin",
    userSlug: "admin",
    currency: "NGN",
    paymentAmount: "149479.73",
    paymentStatus: "success",
    ipAddress: "162.158.216.28",
    date: "2026-09-16 / 10:38",
  },
  {
    id: 14,
    order: "#10019",
    orderId: "10019",
    paymentMethod: "Wallet Balance",
    paymentId: "WLT-HM4MT6J7A3-AIXH8H5T",
    user: "Admin",
    userSlug: "admin",
    currency: "USD",
    paymentAmount: "182.10",
    paymentStatus: "Succeeded",
    ipAddress: "172.68.229.124",
    date: "2026-09-09 / 11:39",
  },
  {
    id: 13,
    order: "#10018",
    orderId: "10018",
    paymentMethod: "Wallet Balance",
    paymentId: "WLT-HM4DEPBGV6-9XPB2QA3",
    user: "Trendshop",
    userSlug: "trendshop",
    currency: "USD",
    paymentAmount: "149.50",
    paymentStatus: "Succeeded",
    ipAddress: "172.68.221.156",
    date: "2026-09-09 / 05:59",
  },
  {
    id: 12,
    order: "#10017",
    orderId: "10017",
    paymentMethod: "Wallet Balance",
    paymentId: "WLT-HM0W7NI87E-3SJTWOFD",
    user: "Admin",
    userSlug: "admin",
    currency: "USD",
    paymentAmount: "87",
    paymentStatus: "Succeeded",
    ipAddress: "104.23.195.94",
    date: "2026-09-06 / 02:16",
  },
  {
    id: 11,
    order: "#10016",
    orderId: "10016",
    paymentMethod: "Wallet Balance",
    paymentId: "WLT-HM0W6GQAGA-AOKXNME9",
    user: "Admin",
    userSlug: "admin",
    currency: "USD",
    paymentAmount: "84",
    paymentStatus: "Succeeded",
    ipAddress: "104.23.195.94",
    date: "2026-09-06 / 02:15",
  },
  {
    id: 10,
    order: "#10015",
    orderId: "10015",
    paymentMethod: "Wallet Balance",
    paymentId: "WLT-HM0W4Y4BY2-9BJDIM36",
    user: "Admin",
    userSlug: "admin",
    currency: "USD",
    paymentAmount: "41.40",
    paymentStatus: "Succeeded",
    ipAddress: "104.23.195.94",
    date: "2026-09-06 / 02:14",
  },
  {
    id: 9,
    order: "#10011",
    orderId: "10011",
    paymentMethod: "Wallet Balance",
    paymentId: "WLT-HLV1MQ3F5S-5AYH9YJU",
    user: "Admin",
    userSlug: "admin",
    currency: "USD",
    paymentAmount: "194.20",
    paymentStatus: "Succeeded",
    ipAddress: "162.158.229.162",
    date: "2026-08-31 / 18:56",
  },
  {
    id: 8,
    order: "#10010",
    orderId: "10010",
    paymentMethod: "Wallet Balance",
    paymentId: "WLT-HLUZF0YA5H-8AWAC01O",
    user: "Admin",
    userSlug: "admin",
    currency: "USD",
    paymentAmount: "245.60",
    paymentStatus: "Succeeded",
    ipAddress: "104.23.175.101",
    date: "2026-08-31 / 17:37",
  },
  {
    id: 7,
    order: "#10008",
    orderId: "10008",
    paymentMethod: "Wallet Balance",
    paymentId: "WLT-HATWEJHEOK-D2Z3UX2O",
    user: "Admin",
    userSlug: "admin",
    currency: "USD",
    paymentAmount: "28.75",
    paymentStatus: "Succeeded",
    ipAddress: "78.190.31.52",
    date: "2026-08-05 / 13:57",
  },
  {
    id: 6,
    order: "#10007",
    orderId: "10007",
    paymentMethod: "Stripe",
    paymentId: "pi_3S3y9YBHw47ba9xU0uTNI58c",
    user: "Peter Jones",
    userSlug: "peter-jones",
    currency: "USD",
    paymentAmount: "32.86",
    paymentStatus: "paid",
    ipAddress: "78.190.31.52",
    date: "2026-08-05 / 13:50",
  },
  {
    id: 5,
    order: "#10005",
    orderId: "10005",
    paymentMethod: "Stripe",
    paymentId: "pi_3S3y59BHw47ba9xU00mnObsH",
    user: "Trendshop",
    userSlug: "trendshop",
    currency: "USD",
    paymentAmount: "60.77",
    paymentStatus: "paid",
    ipAddress: "78.190.31.52",
    date: "2026-08-05 / 13:45",
  },
  {
    id: 4,
    order: "#10004",
    orderId: "10004",
    paymentMethod: "Wallet Balance",
    paymentId: "WLT-HATVCWWP0L-4WJQLFL5",
    user: "Trendshop",
    userSlug: "trendshop",
    currency: "USD",
    paymentAmount: "160",
    paymentStatus: "Succeeded",
    ipAddress: "78.190.31.52",
    date: "2026-08-05 / 13:19",
  },
  {
    id: 3,
    order: "#10003",
    orderId: "10003",
    paymentMethod: "Wallet Balance",
    paymentId: "WLT-HATVCVLP8Y-3PKQMN72",
    user: "Admin",
    userSlug: "admin",
    currency: "USD",
    paymentAmount: "120.50",
    paymentStatus: "Succeeded",
    ipAddress: "78.190.31.52",
    date: "2026-08-05 / 13:10",
  },
  {
    id: 2,
    order: "#10002",
    orderId: "10002",
    paymentMethod: "Stripe",
    paymentId: "pi_3S3y2ABHw47ba9xU01xxZbCd",
    user: "Admin",
    userSlug: "admin",
    currency: "USD",
    paymentAmount: "45.00",
    paymentStatus: "paid",
    ipAddress: "78.190.31.52",
    date: "2026-08-05 / 12:45",
  },
  {
    id: 1,
    order: "#10001",
    orderId: "10001",
    paymentMethod: "Stripe",
    paymentId: "pi_3S3y1ABHw47ba9xU00aaBbCc",
    user: "Admin",
    userSlug: "admin",
    currency: "USD",
    paymentAmount: "19.99",
    paymentStatus: "paid",
    ipAddress: "78.190.31.52",
    date: "2026-08-05 / 12:30",
  },
];

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState<TransactionItem[]>(TRANSACTIONS_DATA);
  const [showCount, setShowCount] = useState(15);
  const [searchNumber, setSearchNumber] = useState("");
  const [activeDropdownId, setActiveDropdownId] = useState<number | null>(null);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTx, setSelectedTx] = useState<TransactionItem | null>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleDocClick = () => {
      setActiveDropdownId(null);
      setIsExportOpen(false);
    };
    document.addEventListener("click", handleDocClick);
    return () => document.removeEventListener("click", handleDocClick);
  }, []);

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const filteredTransactions = transactions.filter((tx) => {
    if (!searchNumber.trim()) return true;
    const q = searchNumber.toLowerCase().trim();
    return (
      tx.order.toLowerCase().includes(q) ||
      tx.orderId.includes(q) ||
      tx.paymentId.toLowerCase().includes(q) ||
      tx.user.toLowerCase().includes(q) ||
      tx.ipAddress.includes(q) ||
      tx.paymentMethod.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.ceil(filteredTransactions.length / showCount) || 1;
  const startIndex = (currentPage - 1) * showCount;
  const currentRows = filteredTransactions.slice(startIndex, startIndex + showCount);

  const handleDeleteTx = (id: number) => {
    if (confirm("Are you sure you want to delete this transaction record?")) {
      setTransactions((prev) => prev.filter((t) => t.id !== id));
      setActiveDropdownId(null);
    }
  };

  const handleExport = (type: "csv" | "excel") => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        "Id,Order,Payment Method,Payment Id,User,Currency,Payment Amount,Payment Status,Ip Address,Date",
        ...filteredTransactions.map(
          (t) =>
            `${t.id},"${t.order}","${t.paymentMethod}","${t.paymentId}","${t.user}","${t.currency}","${t.paymentAmount}","${t.paymentStatus}","${t.ipAddress}","${t.date}"`
        ),
      ].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `transactions_${type}_${Date.now()}.${type === "csv" ? "csv" : "xls"}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsExportOpen(false);
  };

  return (
    <div className="w-full text-[#333333] pb-12">
      {/* Title */}
      <div className="mb-4">
        <h1 className="text-[24px] font-normal text-[#333333]">Transactions</h1>
      </div>

      {/* Main Content Box (AdminLTE White Box) */}
      <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border border-[#d2d6de] p-5">
        {/* Filter Controls Row matching Modesy screenshot */}
        <form onSubmit={handleFilter} className="flex flex-wrap items-end gap-3 mb-6">
          {/* Show */}
          <div>
            <label className="block text-[12px] font-semibold text-gray-700 mb-1">
              Show
            </label>
            <div className="relative">
              <select
                value={showCount}
                onChange={(e) => {
                  setShowCount(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="h-[34px] w-[75px] pl-3 pr-7 border border-[#d2d6de] rounded-[3px] bg-white text-[13px] text-gray-700 appearance-none focus:outline-none focus:border-[#3c8dbc] cursor-pointer"
              >
                <option value={15}>15</option>
                <option value={30}>30</option>
                <option value={60}>60</option>
                <option value={100}>100</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Search */}
          <div>
            <label className="block text-[12px] font-semibold text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              placeholder="Order Number"
              value={searchNumber}
              onChange={(e) => setSearchNumber(e.target.value)}
              className="h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#3c8dbc] w-[180px]"
            />
          </div>

          {/* Filter Button (Modesy Purple #605ca8) */}
          <button
            type="submit"
            className="h-[34px] px-4 bg-[#605ca8] hover:bg-[#504d8c] text-white text-[13px] rounded-[3px] font-normal transition-colors cursor-pointer shadow-xs"
          >
            Filter
          </button>

          {/* Export Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsExportOpen(!isExportOpen);
              }}
              className="h-[34px] px-3.5 border border-[#d2d6de] bg-white hover:bg-gray-50 text-gray-700 text-[13px] rounded-[3px] flex items-center space-x-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <span>Export</span>
              <span className="inline-block w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-t-[4px] border-t-gray-600 ml-1"></span>
            </button>

            {isExportOpen && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute left-0 mt-1 w-36 bg-white border border-gray-200 rounded-[3px] shadow-lg z-30 py-1 text-[13px]"
              >
                <button
                  type="button"
                  onClick={() => handleExport("csv")}
                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-[#f4f4f4] flex items-center space-x-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-gray-400" />
                  <span>CSV</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleExport("excel")}
                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-[#f4f4f4] flex items-center space-x-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-gray-400" />
                  <span>Excel</span>
                </button>
              </div>
            )}
          </div>
        </form>

        {/* Transactions Table with full horizontal scroll if needed */}
        <div className="overflow-x-auto min-h-[420px]">
          <table className="w-full text-left text-[13.5px] border-collapse whitespace-nowrap">
            <thead>
              <tr className="border-b-2 border-gray-200 text-[#333333] font-semibold text-[13px]">
                <th className="py-2.5 px-3 text-left w-12">Id</th>
                <th className="py-2.5 px-3 text-left">Order</th>
                <th className="py-2.5 px-3 text-left">Payment Method</th>
                <th className="py-2.5 px-3 text-left">Payment Id</th>
                <th className="py-2.5 px-3 text-left">User</th>
                <th className="py-2.5 px-3 text-left">Currency</th>
                <th className="py-2.5 px-3 text-left">Payment Amount</th>
                <th className="py-2.5 px-3 text-left">Payment Status</th>
                <th className="py-2.5 px-3 text-left">Ip Address</th>
                <th className="py-2.5 px-3 text-left">Date</th>
                <th className="py-2.5 px-3 text-left w-32">Options</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-8 text-center text-gray-500 text-sm">
                    No transactions found.
                  </td>
                </tr>
              ) : (
                currentRows.map((tx) => (
                  <tr
                    key={tx.id}
                    className="border-b border-[#f4f4f4] hover:bg-gray-50/70 transition-colors text-[13px]"
                  >
                    {/* Id */}
                    <td className="py-3 px-3 text-gray-600 font-normal">
                      {tx.id}
                    </td>

                    {/* Order */}
                    <td className="py-3 px-3 text-gray-700 font-medium">
                      <Link
                        href={`/admin/orders?search=${tx.orderId}`}
                        className="text-gray-700 hover:text-[#3c8dbc] transition-colors"
                      >
                        {tx.order}
                      </Link>
                    </td>

                    {/* Payment Method */}
                    <td className="py-3 px-3 text-gray-700">
                      {tx.paymentMethod}
                    </td>

                    {/* Payment Id */}
                    <td className="py-3 px-3 text-gray-600 font-mono text-[12px] max-w-[220px] truncate" title={tx.paymentId}>
                      {tx.paymentId}
                    </td>

                    {/* User */}
                    <td className="py-3 px-3 text-gray-800">
                      <Link
                        href={`/admin/users?search=${encodeURIComponent(tx.user)}`}
                        className="text-gray-800 hover:text-[#3c8dbc] transition-colors"
                      >
                        {tx.user}
                      </Link>
                    </td>

                    {/* Currency */}
                    <td className="py-3 px-3 text-gray-700">
                      {tx.currency}
                    </td>

                    {/* Payment Amount */}
                    <td className="py-3 px-3 text-gray-800 font-medium">
                      {tx.paymentAmount}
                    </td>

                    {/* Payment Status */}
                    <td className="py-3 px-3 text-gray-700 capitalize">
                      {tx.paymentStatus}
                    </td>

                    {/* Ip Address */}
                    <td className="py-3 px-3 text-gray-600 text-[12.5px] font-mono">
                      {tx.ipAddress}
                    </td>

                    {/* Date */}
                    <td className="py-3 px-3 text-gray-600 text-[12px] whitespace-nowrap">
                      {tx.date}
                    </td>

                    {/* Options (Purple button dropdown) */}
                    <td className="py-3 px-3 relative whitespace-nowrap">
                      <div className="relative inline-block text-left">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveDropdownId(
                              activeDropdownId === tx.id ? null : tx.id
                            );
                          }}
                          className="bg-[#605ca8] hover:bg-[#534f96] active:bg-[#464282] text-white text-[12px] font-normal px-3 py-1.5 rounded-[3px] transition-colors flex items-center justify-between whitespace-nowrap cursor-pointer shadow-2xs min-w-[125px]"
                        >
                          <span>Select an option</span>
                          <span className="inline-block w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-t-[4px] border-t-white ml-2"></span>
                        </button>

                        {/* Dropdown Menu matching Modesy */}
                        {activeDropdownId === tx.id && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="absolute right-0 mt-1 min-w-[140px] bg-white border border-[#ccc] rounded-[2px] shadow-[0_6px_12px_rgba(0,0,0,0.175)] z-50 py-1 text-[13px] animate-in fade-in-50 duration-75"
                          >
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedTx(tx);
                                setActiveDropdownId(null);
                              }}
                              className="w-full px-4 py-2 text-left text-gray-700 hover:bg-[#f4f4f4] hover:text-[#333] flex items-center space-x-2.5 transition-colors cursor-pointer group"
                            >
                              <Eye className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                              <span>View Details</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteTx(tx.id)}
                              className="w-full px-4 py-2 text-left text-gray-700 hover:bg-[#f4f4f4] hover:text-red-600 flex items-center space-x-2.5 transition-colors cursor-pointer group border-t border-gray-100"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-gray-400 group-hover:text-red-500 transition-colors" />
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

        {/* Pagination Row matching screenshot (1, 2, >) */}
        {totalPages > 1 && (
          <div className="flex justify-end items-center mt-6 pt-4 border-t border-[#f4f4f4] space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                type="button"
                onClick={() => setCurrentPage(pageNum)}
                className={`w-[32px] h-[32px] flex items-center justify-center rounded-[3px] text-[13px] font-medium transition-colors cursor-pointer ${
                  currentPage === pageNum
                    ? "text-white bg-[#0088cc] shadow-xs"
                    : "border border-gray-200 text-[#337ab7] bg-white hover:bg-gray-50"
                }`}
              >
                {pageNum}
              </button>
            ))}

            {currentPage < totalPages && (
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="w-[32px] h-[32px] flex items-center justify-center border border-gray-200 rounded-[3px] text-[#337ab7] bg-white hover:bg-gray-50 text-[13px] cursor-pointer"
              >
                &gt;
              </button>
            )}
          </div>
        )}
      </div>

      {/* TRANSACTION DETAILS MODAL */}
      {selectedTx && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-2xs">
          <div className="bg-white rounded-[4px] shadow-2xl w-full max-w-lg overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-[#f4f4f4] flex items-center justify-between bg-gray-50">
              <h3 className="text-[17px] font-semibold text-[#333333]">
                Transaction #{selectedTx.id} - Order {selectedTx.order}
              </h3>
              <button
                type="button"
                onClick={() => setSelectedTx(null)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-3.5 text-[13.5px]">
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Order:</span>
                <span className="font-semibold text-gray-800">{selectedTx.order}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Payment Method:</span>
                <span className="font-medium text-gray-800">{selectedTx.paymentMethod}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Payment ID:</span>
                <span className="font-mono text-xs text-gray-700 break-all">{selectedTx.paymentId}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">User:</span>
                <span className="font-medium text-gray-800">{selectedTx.user}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Amount:</span>
                <span className="font-bold text-emerald-600">{selectedTx.paymentAmount} {selectedTx.currency}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Status:</span>
                <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-semibold capitalize">{selectedTx.paymentStatus}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">IP Address:</span>
                <span className="text-gray-700 font-mono text-xs">{selectedTx.ipAddress}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Date:</span>
                <span className="text-gray-700">{selectedTx.date}</span>
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedTx(null)}
                  className="px-4 py-2 bg-[#0088cc] hover:bg-[#0077b3] text-white rounded-[3px] text-[13px] font-medium cursor-pointer transition-colors"
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
