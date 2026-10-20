"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Info,
  X,
  ChevronDown
} from "lucide-react";

export interface SaleItem {
  id: string;
  orderNumber: string;
  total: string;
  paymentStatus: "Payment Received" | "Pending Payment";
  status: "Processing" | "Completed" | "Cancelled";
  date: string;
  customerName?: string;
}

// Exactly 25 active sales matching the Modesy reference screenshots
const all25ActiveSales: SaleItem[] = [
  {
    id: "10044",
    orderNumber: "#10044",
    total: "$65",
    paymentStatus: "Pending Payment",
    status: "Processing",
    date: "2026-10-14 / 20:42",
    customerName: "John Doe",
  },
  {
    id: "10043",
    orderNumber: "#10043",
    total: "$526",
    paymentStatus: "Pending Payment",
    status: "Processing",
    date: "2026-10-14 / 19:49",
    customerName: "Emily Clarke",
  },
  {
    id: "10042",
    orderNumber: "#10042",
    total: "$225",
    paymentStatus: "Payment Received",
    status: "Processing",
    date: "2026-10-12 / 19:26",
    customerName: "Sarah Jenkins",
  },
  {
    id: "10040",
    orderNumber: "#10040",
    total: "$83",
    paymentStatus: "Pending Payment",
    status: "Processing",
    date: "2026-09-29 / 12:00",
    customerName: "Admin",
  },
  {
    id: "10039",
    orderNumber: "#10039",
    total: "$90",
    paymentStatus: "Pending Payment",
    status: "Processing",
    date: "2026-09-29 / 00:34",
    customerName: "Michael Wong",
  },
  {
    id: "10038",
    orderNumber: "#10038",
    total: "$153",
    paymentStatus: "Pending Payment",
    status: "Processing",
    date: "2026-09-28 / 22:48",
    customerName: "Admin",
  },
  {
    id: "10037",
    orderNumber: "#10037",
    total: "$69",
    paymentStatus: "Pending Payment",
    status: "Processing",
    date: "2026-09-28 / 15:39",
    customerName: "Jessica Alba",
  },
  {
    id: "10036",
    orderNumber: "#10036",
    total: "$320",
    paymentStatus: "Pending Payment",
    status: "Processing",
    date: "2026-09-28 / 06:49",
    customerName: "David Miller",
  },
  {
    id: "10034",
    orderNumber: "#10034",
    total: "$15",
    paymentStatus: "Pending Payment",
    status: "Processing",
    date: "2026-09-25 / 06:11",
    customerName: "ZUS KARA",
  },
  {
    id: "10032",
    orderNumber: "#10032",
    total: "$66",
    paymentStatus: "Pending Payment",
    status: "Processing",
    date: "2026-09-23 / 11:15",
    customerName: "test test",
  },
  {
    id: "10030",
    orderNumber: "#10030",
    total: "$118",
    paymentStatus: "Pending Payment",
    status: "Processing",
    date: "2026-09-23 / 02:04",
    customerName: "Bb Hhj",
  },
  {
    id: "10029",
    orderNumber: "#10029",
    total: "$139",
    paymentStatus: "Payment Received",
    status: "Processing",
    date: "2026-09-22 / 06:40",
    customerName: "Sarah Jenkins",
  },
  {
    id: "10028",
    orderNumber: "#10028",
    total: "$59",
    paymentStatus: "Pending Payment",
    status: "Processing",
    date: "2026-09-22 / 01:14",
    customerName: "Alexander Bell",
  },
  {
    id: "10026",
    orderNumber: "#10026",
    total: "$105",
    paymentStatus: "Pending Payment",
    status: "Processing",
    date: "2026-09-17 / 18:28",
    customerName: "Robert Davis",
  },
  {
    id: "10025",
    orderNumber: "#10025",
    total: "₦88,983.21",
    paymentStatus: "Payment Received",
    status: "Processing",
    date: "2026-09-16 / 10:38",
    customerName: "Chidi Okafor",
  },
  // Items 16-25 on Page 2
  {
    id: "10024",
    orderNumber: "#10024",
    total: "$48",
    paymentStatus: "Pending Payment",
    status: "Processing",
    date: "2026-09-15 / 14:20",
    customerName: "Thomas Wright",
  },
  {
    id: "10022",
    orderNumber: "#10022",
    total: "$180",
    paymentStatus: "Pending Payment",
    status: "Processing",
    date: "2026-09-14 / 11:05",
    customerName: "David Lee",
  },
  {
    id: "10020",
    orderNumber: "#10020",
    total: "$95",
    paymentStatus: "Payment Received",
    status: "Processing",
    date: "2026-09-12 / 16:45",
    customerName: "Emma Watson",
  },
  {
    id: "10018",
    orderNumber: "#10018",
    total: "$42",
    paymentStatus: "Pending Payment",
    status: "Processing",
    date: "2026-09-10 / 09:30",
    customerName: "Olivia Smith",
  },
  {
    id: "10016",
    orderNumber: "#10016",
    total: "$310",
    paymentStatus: "Pending Payment",
    status: "Processing",
    date: "2026-09-08 / 19:15",
    customerName: "William Brown",
  },
  {
    id: "10015",
    orderNumber: "#10015",
    total: "$75",
    paymentStatus: "Pending Payment",
    status: "Processing",
    date: "2026-09-06 / 13:50",
    customerName: "Michael Wong",
  },
  {
    id: "10012",
    orderNumber: "#10012",
    total: "$120",
    paymentStatus: "Payment Received",
    status: "Processing",
    date: "2026-09-04 / 10:25",
    customerName: "Sophia Wilson",
  },
  {
    id: "10010",
    orderNumber: "#10010",
    total: "$88",
    paymentStatus: "Pending Payment",
    status: "Processing",
    date: "2026-09-02 / 15:10",
    customerName: "Daniel Martin",
  },
  {
    id: "10008",
    orderNumber: "#10008",
    total: "$54",
    paymentStatus: "Pending Payment",
    status: "Processing",
    date: "2026-08-30 / 12:40",
    customerName: "Alex Brown",
  },
  {
    id: "10005",
    orderNumber: "#10005",
    total: "$165",
    paymentStatus: "Pending Payment",
    status: "Processing",
    date: "2026-08-28 / 08:15",
    customerName: "Lucas Taylor",
  },
];

// Exactly 7 completed sales matching the Modesy reference screenshots
const all7CompletedSales: SaleItem[] = [
  {
    id: "10033",
    orderNumber: "#10033",
    total: "$105",
    paymentStatus: "Payment Received",
    status: "Completed",
    date: "2026-09-23 / 17:23",
    customerName: "Emma Watson",
  },
  {
    id: "10031",
    orderNumber: "#10031",
    total: "$245",
    paymentStatus: "Payment Received",
    status: "Completed",
    date: "2026-09-23 / 02:08",
    customerName: "Sarah Jenkins",
  },
  {
    id: "10011",
    orderNumber: "#10011",
    total: "$174",
    paymentStatus: "Payment Received",
    status: "Completed",
    date: "2026-08-31 / 18:56",
    customerName: "Robert Davis",
  },
  {
    id: "10010",
    orderNumber: "#10010",
    total: "$78",
    paymentStatus: "Payment Received",
    status: "Completed",
    date: "2026-08-31 / 17:37",
    customerName: "Daniel Martin",
  },
  {
    id: "10006",
    orderNumber: "#10006",
    total: "$170",
    paymentStatus: "Payment Received",
    status: "Completed",
    date: "2026-08-05 / 13:47",
    customerName: "Michael Wong",
  },
  {
    id: "10005",
    orderNumber: "#10005",
    total: "$59",
    paymentStatus: "Payment Received",
    status: "Completed",
    date: "2026-08-05 / 13:45",
    customerName: "Lucas Taylor",
  },
  {
    id: "10004",
    orderNumber: "#10004",
    total: "$160",
    paymentStatus: "Payment Received",
    status: "Completed",
    date: "2026-08-05 / 13:19",
    customerName: "Alex Brown",
  },
];

interface SalesPageProps {
  statusFilter?: "active" | "completed" | "cancelled" | string;
  pageTitle?: string;
}

function SalesPageContent({
  statusFilter = "active",
  pageTitle = "Sales",
}: SalesPageProps) {
  const searchParams = useSearchParams();
  const stParam = searchParams?.get("st") || "";
  const effectiveStatus = (statusFilter && statusFilter !== "active") ? statusFilter : (stParam || "active");

  const isCompleted = effectiveStatus === "completed";
  const isCancelled = effectiveStatus === "cancelled";

  let computedTitle = pageTitle;
  if (pageTitle === "Sales") {
    if (isCompleted) {
      computedTitle = "Completed Sales";
    } else if (isCancelled) {
      computedTitle = "Cancelled Sales";
    } else {
      computedTitle = "Sales";
    }
  }

  const getInitialSales = () => {
    if (isCompleted) return all7CompletedSales;
    if (isCancelled) return [];
    return all25ActiveSales;
  };

  const [sales, setSales] = useState<SaleItem[]>(getInitialSales);

  useEffect(() => {
    if (isCompleted) {
      setSales(all7CompletedSales);
    } else if (isCancelled) {
      setSales([]);
    } else {
      setSales(all25ActiveSales);
    }
    setCurrentPage(1);
  }, [effectiveStatus, isCompleted, isCancelled]);

  const [paymentFilter, setPaymentFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [appliedPayment, setAppliedPayment] = useState("All");
  const [exportOpen, setExportOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSale, setSelectedSale] = useState<SaleItem | null>(null);
  const itemsPerPage = 15;

  const handleApplyFilter = () => {
    setAppliedSearch(search.trim());
    setAppliedPayment(paymentFilter);
    setCurrentPage(1);
  };

  const filteredSales = useMemo(() => {
    return sales.filter((item) => {
      // 1. Payment Status (only applies when filter is available)
      if (!isCompleted && appliedPayment !== "All") {
        if (item.paymentStatus !== appliedPayment) return false;
      }

      // 2. Search query (Sale Id)
      if (appliedSearch) {
        const query = appliedSearch.toLowerCase();
        const matchOrder = item.orderNumber.toLowerCase().includes(query) || item.id.toLowerCase().includes(query);
        if (!matchOrder) return false;
      }

      return true;
    });
  }, [sales, isCompleted, appliedPayment, appliedSearch]);

  const totalEntries = filteredSales.length;
  const totalPages = Math.ceil(totalEntries / itemsPerPage) || 1;
  const paginatedSales = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredSales.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredSales, currentPage, itemsPerPage]);

  const handleExportCSV = () => {
    setExportOpen(false);
    const headers = "Sale,Total,Payment Status,Status,Date\n";
    const rows = filteredSales.map((s) => 
      `"${s.orderNumber}","${s.total}","${s.paymentStatus}","${s.status}","${s.date}"`
    ).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `modesy_${effectiveStatus}_sales.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="w-full">
      <div className="bg-white border border-[#e4e7ea] rounded-[3px] p-5 sm:p-6 shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
        
        {/* Title */}
        <h1 className="text-[16px] font-semibold text-[#2c333e] mb-4">
          {computedTitle}
        </h1>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-end gap-3 mb-5 select-none">
          
          {/* Payment Status Filter (shown only on active sales matching screenshot) */}
          {!isCompleted && !isCancelled && (
            <div className="w-full sm:w-auto">
              <label className="block text-[12px] font-semibold text-[#2c333e] mb-1">
                Payment Status
              </label>
              <div className="relative">
                <select
                  value={paymentFilter}
                  onChange={(e) => setPaymentFilter(e.target.value)}
                  className="w-full sm:w-[140px] h-[32px] border border-[#d2d6de] rounded-[3px] px-2.5 text-[12.5px] text-[#495057] bg-white appearance-none outline-none focus:border-[#00ab97]"
                >
                  <option value="All">All</option>
                  <option value="Payment Received">Payment Received</option>
                  <option value="Pending Payment">Pending Payment</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2 top-2.5 pointer-events-none" />
              </div>
            </div>
          )}

          {/* Search Input */}
          <div className="w-full sm:w-auto">
            <label className="block text-[12px] font-semibold text-[#2c333e] mb-1">
              Search
            </label>
            <input
              type="text"
              placeholder="Sale Id"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleApplyFilter();
              }}
              className="w-full sm:w-[160px] h-[32px] border border-[#d2d6de] rounded-[3px] px-3 text-[12.5px] text-[#495057] outline-none focus:border-[#00ab97]"
            />
          </div>

          {/* Filter Button */}
          <div>
            <button
              type="button"
              onClick={handleApplyFilter}
              className="h-[32px] px-4 bg-[#4f52ba] hover:bg-[#4346a3] text-white rounded-[3px] text-[12.5px] font-medium transition-colors cursor-pointer flex items-center justify-center shadow-2xs"
            >
              Filter
            </button>
          </div>

          {/* Export Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setExportOpen(!exportOpen)}
              className="h-[32px] px-3 bg-[#eef1f6] hover:bg-[#e2e6ee] text-[#4f52ba] border border-[#dce1ea] rounded-[3px] text-[12.5px] font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Export</span>
              <ChevronDown className="w-3 h-3 text-[#4f52ba]" />
            </button>

            {exportOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setExportOpen(false)}
                />
                <div className="absolute right-0 top-[35px] w-[130px] bg-white border border-[#e4e7ea] shadow-md rounded-[3px] py-1 text-[12px] z-30 animate-in fade-in">
                  <button
                    type="button"
                    onClick={handleExportCSV}
                    className="w-full text-left px-3 py-1.5 text-[#495057] hover:text-[#00ab97] hover:bg-[#f8fafc] cursor-pointer"
                  >
                    CSV
                  </button>
                </div>
              </>
            )}
          </div>

        </div>

        {/* Sales Table */}
        <div className="overflow-x-auto border-t border-[#f1f3f5]">
          <table className="w-full text-left text-[13px] border-collapse">
            <thead>
              <tr className="border-b border-[#e4e7ea] text-[12px] font-medium text-[#2c333e] select-none">
                <th className="py-2.5 px-3 font-semibold">Sale</th>
                <th className="py-2.5 px-3 font-semibold">Total</th>
                <th className="py-2.5 px-3 font-semibold">Payment Status</th>
                <th className="py-2.5 px-3 font-semibold">Status</th>
                <th className="py-2.5 px-3 font-semibold">Date</th>
                <th className="py-2.5 px-3 font-semibold text-center">Options</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f4f6f8]">
              {paginatedSales.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#6c757d] text-[13px]">
                    No records found!
                  </td>
                </tr>
              ) : (
                paginatedSales.map((item) => (
                  <tr key={item.id} className="hover:bg-[#fafbfc] transition-colors">
                    {/* Sale Order ID */}
                    <td className="py-3 px-3 font-medium text-[#337ab7] hover:underline cursor-pointer">
                      <span onClick={() => setSelectedSale(item)}>
                        {item.orderNumber}
                      </span>
                    </td>

                    {/* Total */}
                    <td className="py-3 px-3 text-[#333]">
                      {item.total}
                    </td>

                    {/* Payment Status (Plain text) */}
                    <td className="py-3 px-3 text-[#555]">
                      {item.paymentStatus}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3 px-3">
                      {item.status === "Completed" ? (
                        <span className="inline-block bg-[#8c98a4] text-white text-[11px] font-medium px-2 py-0.5 rounded-[2px] leading-tight">
                          Completed
                        </span>
                      ) : item.status === "Cancelled" ? (
                        <span className="inline-block bg-[#feecdc] text-[#dc2626] text-[11px] font-medium px-2 py-0.5 rounded-[2px] leading-tight">
                          Cancelled
                        </span>
                      ) : (
                        <span className="inline-block bg-[#00ab97] text-white text-[11px] font-medium px-2 py-0.5 rounded-[2px] leading-tight">
                          Processing
                        </span>
                      )}
                    </td>

                    {/* Date */}
                    <td className="py-3 px-3 text-[#555] text-[12.5px] whitespace-nowrap">
                      {item.date}
                    </td>

                    {/* Options: Details button with Info icon */}
                    <td className="py-3 px-3 text-center">
                      <button
                        type="button"
                        onClick={() => setSelectedSale(item)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#eef1f6] hover:bg-[#e2e6ee] border border-[#dce1ea] text-[#4f52ba] text-[11.5px] font-medium rounded-[3px] transition-colors cursor-pointer"
                        title="Details"
                      >
                        <Info className="w-3.5 h-3.5 text-[#4f52ba]" />
                        <span>Details</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer: Entries Count & Pagination */}
        {totalEntries > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 mt-2 border-t border-[#f1f3f5] text-[#495057] select-none">
            <span className="text-[12.5px] text-[#2c333e]">
              Number of Entries: {totalEntries}
            </span>

            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-7 h-7 flex items-center justify-center rounded-[3px] text-xs font-bold transition-colors cursor-pointer ${
                      currentPage === pageNum
                        ? "bg-[#00ab97] text-white"
                        : "border border-[#d2d6de] hover:bg-gray-50 text-[#495057]"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              {totalPages > 1 && currentPage < totalPages && (
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="w-7 h-7 flex items-center justify-center border border-[#d2d6de] hover:bg-gray-50 rounded-[3px] text-xs text-[#495057] transition-colors cursor-pointer"
                >
                  &gt;
                </button>
              )}
            </div>
          </div>
        )}

      </div>

      {/* Sale Details Modal */}
      {selectedSale && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-[4px] max-w-md w-full p-6 shadow-xl relative animate-in fade-in">
            <button
              onClick={() => setSelectedSale(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-[16px] font-bold text-[#2c333e] mb-4">
              Sale Details: {selectedSale.orderNumber}
            </h3>
            <div className="space-y-3 text-[13px] text-[#495057]">
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-[#8c98a4]">Order Number:</span>
                <span className="font-semibold text-[#2c333e]">{selectedSale.orderNumber}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-[#8c98a4]">Total Amount:</span>
                <span className="font-semibold text-[#2c333e]">{selectedSale.total}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-[#8c98a4]">Payment Status:</span>
                <span className="font-medium text-[#2c333e]">{selectedSale.paymentStatus}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-[#8c98a4]">Order Status:</span>
                <span className="bg-[#00ab97] text-white text-[11px] font-medium px-2 py-0.5 rounded-[2px]">
                  {selectedSale.status}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-[#8c98a4]">Date:</span>
                <span className="text-[#2c333e]">{selectedSale.date}</span>
              </div>
            </div>
            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedSale(null)}
                className="bg-[#00ab97] hover:bg-[#009180] text-white px-4 py-1.5 rounded-[3px] text-xs font-medium cursor-pointer transition-colors"
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

export default function DashboardSalesPage(props: SalesPageProps) {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading sales...</div>}>
      <SalesPageContent {...props} />
    </Suspense>
  );
}
