"use client";

import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Info,
  X
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

// Exactly 17 active sales matching Modesy reference screenshots
const all17Sales: SaleItem[] = [
  {
    id: "10041",
    orderNumber: "#10041",
    total: "$57.80",
    paymentStatus: "Pending Payment",
    status: "Processing",
    date: "2026-10-05 / 15:38",
    customerName: "James Baronie",
  },
  {
    id: "10040",
    orderNumber: "#10040",
    total: "$49",
    paymentStatus: "Pending Payment",
    status: "Processing",
    date: "2026-09-29 / 12:00",
    customerName: "Admin",
  },
  {
    id: "10038",
    orderNumber: "#10038",
    total: "$211.80",
    paymentStatus: "Pending Payment",
    status: "Processing",
    date: "2026-09-28 / 22:48",
    customerName: "Admin",
  },
  {
    id: "10035",
    orderNumber: "#10035",
    total: "$95.20",
    paymentStatus: "Pending Payment",
    status: "Processing",
    date: "2026-09-26 / 21:14",
    customerName: "Admin",
  },
  {
    id: "10034",
    orderNumber: "#10034",
    total: "$230.50",
    paymentStatus: "Pending Payment",
    status: "Processing",
    date: "2026-09-25 / 06:11",
    customerName: "ZUS KARA",
  },
  {
    id: "10032",
    orderNumber: "#10032",
    total: "$236.60",
    paymentStatus: "Pending Payment",
    status: "Processing",
    date: "2026-09-23 / 11:15",
    customerName: "test test",
  },
  {
    id: "10030",
    orderNumber: "#10030",
    total: "$123.75",
    paymentStatus: "Pending Payment",
    status: "Processing",
    date: "2026-09-23 / 02:04",
    customerName: "Bb Hhj",
  },
  {
    id: "10029",
    orderNumber: "#10029",
    total: "$108.40",
    paymentStatus: "Payment Received",
    status: "Processing",
    date: "2026-09-22 / 06:40",
    customerName: "Sarah Jenkins",
  },
  {
    id: "10027",
    orderNumber: "#10027",
    total: "$131.50",
    paymentStatus: "Pending Payment",
    status: "Processing",
    date: "2026-09-20 / 01:19",
    customerName: "Michael Wong",
  },
  {
    id: "10026",
    orderNumber: "#10026",
    total: "$11",
    paymentStatus: "Pending Payment",
    status: "Processing",
    date: "2026-09-17 / 18:28",
    customerName: "Robert Davis",
  },
  {
    id: "10022",
    orderNumber: "#10022",
    total: "$218.90",
    paymentStatus: "Pending Payment",
    status: "Processing",
    date: "2026-09-14 / 16:08",
    customerName: "David Lee",
  },
  {
    id: "10020",
    orderNumber: "#10020",
    total: "$194.70",
    paymentStatus: "Pending Payment",
    status: "Processing",
    date: "2026-09-11 / 09:26",
    customerName: "Emma Watson",
  },
  {
    id: "10019",
    orderNumber: "#10019",
    total: "$174.40",
    paymentStatus: "Payment Received",
    status: "Processing",
    date: "2026-09-09 / 11:39",
    customerName: "Alex Brown",
  },
  {
    id: "10018",
    orderNumber: "#10018",
    total: "$143",
    paymentStatus: "Payment Received",
    status: "Processing",
    date: "2026-09-09 / 05:59",
    customerName: "Olivia Smith",
  },
  {
    id: "10014",
    orderNumber: "#10014",
    total: "$822.90",
    paymentStatus: "Pending Payment",
    status: "Processing",
    date: "2026-09-04 / 08:31",
    customerName: "Lucas Taylor",
  },
  // Items for Page 2 (total 17 active)
  {
    id: "10012",
    orderNumber: "#10012",
    total: "$98.00",
    paymentStatus: "Pending Payment",
    status: "Processing",
    date: "2026-08-30 / 14:10",
    customerName: "Sophia Wilson",
  },
  {
    id: "10010",
    orderNumber: "#10010",
    total: "$250.00",
    paymentStatus: "Payment Received",
    status: "Processing",
    date: "2026-08-25 / 10:20",
    customerName: "Daniel Martin",
  },
];

// Exactly 11 completed sales matching Modesy reference screenshots
const all11CompletedSales: SaleItem[] = [
  {
    id: "c-10033",
    orderNumber: "#10033",
    total: "$77.90",
    paymentStatus: "Payment Received",
    status: "Completed",
    date: "2026-09-23 / 17:23",
    customerName: "Emma Watson",
  },
  {
    id: "c-10029",
    orderNumber: "#10029",
    total: "$108.40",
    paymentStatus: "Payment Received",
    status: "Completed",
    date: "2026-09-22 / 06:40",
    customerName: "Sarah Jenkins",
  },
  {
    id: "c-10025",
    orderNumber: "#10025",
    total: "₦48,111.26",
    paymentStatus: "Payment Received",
    status: "Completed",
    date: "2026-09-16 / 10:38",
    customerName: "Chidi Okafor",
  },
  {
    id: "c-10015",
    orderNumber: "#10015",
    total: "$39.60",
    paymentStatus: "Payment Received",
    status: "Completed",
    date: "2026-09-06 / 02:14",
    customerName: "Michael Wong",
  },
  {
    id: "c-10011",
    orderNumber: "#10011",
    total: "$11",
    paymentStatus: "Payment Received",
    status: "Completed",
    date: "2026-08-31 / 18:56",
    customerName: "Robert Davis",
  },
  {
    id: "c-10010",
    orderNumber: "#10010",
    total: "$156.80",
    paymentStatus: "Payment Received",
    status: "Completed",
    date: "2026-08-31 / 17:37",
    customerName: "Daniel Martin",
  },
  {
    id: "c-10008",
    orderNumber: "#10008",
    total: "$27.50",
    paymentStatus: "Payment Received",
    status: "Completed",
    date: "2026-08-05 / 13:57",
    customerName: "Alex Brown",
  },
  {
    id: "c-10007",
    orderNumber: "#10007",
    total: "$31.90",
    paymentStatus: "Payment Received",
    status: "Completed",
    date: "2026-08-05 / 13:50",
    customerName: "Olivia Smith",
  },
  {
    id: "c-10003",
    orderNumber: "#10003",
    total: "$107.60",
    paymentStatus: "Payment Received",
    status: "Completed",
    date: "2026-08-05 / 13:01",
    customerName: "David Lee",
  },
  {
    id: "c-10002",
    orderNumber: "#10002",
    total: "$140.30",
    paymentStatus: "Payment Received",
    status: "Completed",
    date: "2026-08-04 / 14:48",
    customerName: "Lucas Taylor",
  },
  {
    id: "c-10001",
    orderNumber: "#10001",
    total: "$76.50",
    paymentStatus: "Payment Received",
    status: "Completed",
    date: "2026-08-04 / 12:11",
    customerName: "James Baronie",
  },
];

const allInitialSales: SaleItem[] = [...all17Sales, ...all11CompletedSales];

interface SalesPageProps {
  statusFilter?: "all" | "active" | "completed" | "cancelled" | string;
  pageTitle?: string;
}

function SalesPageContent({
  statusFilter,
  pageTitle,
}: SalesPageProps) {
  const searchParams = useSearchParams();
  const stParam = searchParams?.get("st") || "";
  const effectiveStatus = (statusFilter && statusFilter !== "all") ? statusFilter : (stParam || "active");

  let computedTitle = pageTitle;
  if (!computedTitle || computedTitle === "Sales") {
    if (effectiveStatus === "completed") {
      computedTitle = "Completed Sales";
    } else if (effectiveStatus === "cancelled") {
      computedTitle = "Cancelled Sales";
    } else {
      computedTitle = "Sales";
    }
  }

  const [sales] = useState<SaleItem[]>(allInitialSales);
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
      // 1. Status Filter
      if (effectiveStatus === "completed") {
        if (item.status !== "Completed") return false;
      } else if (effectiveStatus === "cancelled") {
        if (item.status !== "Cancelled") return false;
      } else {
        // active / default
        if (item.status !== "Processing") return false;
      }

      // 2. Payment Status (only applies when filter is available)
      if (effectiveStatus !== "completed" && appliedPayment !== "All") {
        if (item.paymentStatus !== appliedPayment) return false;
      }

      // 3. Search query (Sale Id)
      if (appliedSearch) {
        const query = appliedSearch.toLowerCase();
        const matchOrder = item.orderNumber.toLowerCase().includes(query);
        if (!matchOrder) return false;
      }

      return true;
    });
  }, [sales, effectiveStatus, appliedPayment, appliedSearch]);

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

  const handleExportXML = () => {
    setExportOpen(false);
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<sales>\n';
    filteredSales.forEach((s) => {
      xml += `  <sale>\n    <id>${s.orderNumber}</id>\n    <total>${s.total}</total>\n    <paymentStatus>${s.paymentStatus}</paymentStatus>\n    <status>${s.status}</status>\n    <date>${s.date}</date>\n  </sale>\n`;
    });
    xml += '</sales>';
    const blob = new Blob([xml], { type: "application/xml;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `modesy_${effectiveStatus}_sales.xml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="w-full max-w-[1300px] mx-auto py-2">
      <div className="bg-white border border-[#e2e8f0] rounded-[3px] p-6 sm:p-7 shadow-2xs">
        {/* Title */}
        <h1 className="text-[17px] font-bold text-[#2c333e] mb-5 font-sans">
          {computedTitle}
        </h1>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-end gap-2.5 mb-6">
          {/* Payment Status Filter (shown only on active sales matching screenshot) */}
          {effectiveStatus === "active" && (
            <div className="w-full sm:w-[180px]">
              <label className="block text-[13px] font-bold text-[#2c333e] mb-1.5 font-sans">
                Payment Status
              </label>
              <div className="relative">
                <select
                  value={paymentFilter}
                  onChange={(e) => setPaymentFilter(e.target.value)}
                  className="w-full h-[34px] border border-[#d1d5db] rounded-[3px] pl-3 pr-7 text-[13px] text-[#495057] bg-white appearance-none outline-none focus:border-[#00ab97]"
                >
                  <option value="All">All</option>
                  <option value="Payment Received">Payment Received</option>
                  <option value="Pending Payment">Pending Payment</option>
                </select>
                <span className="absolute right-2.5 top-2 pointer-events-none text-[11px] text-[#495057]">
                  ▾
                </span>
              </div>
            </div>
          )}

          {/* Search Input */}
          <div className="w-full sm:w-[190px]">
            <label className="block text-[13px] font-bold text-[#2c333e] mb-1.5 font-sans">
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
              className="w-full h-[34px] border border-[#d1d5db] rounded-[3px] px-3 text-[13px] text-[#495057] outline-none focus:border-[#00ab97]"
            />
          </div>

          {/* Filter Button */}
          <button
            type="button"
            onClick={handleApplyFilter}
            className="h-[34px] px-5 bg-[#5c59a0] hover:bg-[#4f4c93] text-white rounded-[3px] text-[13px] font-medium transition-colors cursor-pointer flex items-center justify-center shadow-2xs"
          >
            Filter
          </button>

          {/* Export Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setExportOpen(!exportOpen)}
              className="h-[34px] px-3.5 bg-[#eef0f3] hover:bg-[#e2e8f0] text-[#495057] rounded-[3px] text-[13px] font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Export</span>
              <span className="text-[10px] text-[#6c757d]">▾</span>
            </button>

            {exportOpen && (
              <div className="absolute left-0 sm:right-0 sm:left-auto top-full mt-1 w-36 bg-white border border-[#e2e8f0] rounded-[3px] shadow-lg z-20 py-1 text-[13px]">
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="w-full text-left px-4 py-1.5 text-[#495057] hover:text-[#00ab97] hover:bg-[#f8fafc] cursor-pointer transition-colors"
                >
                  CSV
                </button>
                <button
                  type="button"
                  onClick={handleExportXML}
                  className="w-full text-left px-4 py-1.5 text-[#495057] hover:text-[#00ab97] hover:bg-[#f8fafc] cursor-pointer transition-colors"
                >
                  XML
                </button>
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="w-full text-left px-4 py-1.5 text-[#495057] hover:text-[#00ab97] hover:bg-[#f8fafc] cursor-pointer transition-colors"
                >
                  Excel (.xlsx)
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sales Table */}
        <div className="overflow-x-auto border-t border-[#eef0f3]">
          <table className="w-full text-left text-[13px] border-collapse">
            <thead>
              <tr className="border-b border-[#e2e8f0] text-[12px] font-semibold text-[#8c98a4] select-none">
                <th className="py-3 px-3 font-semibold">Sale</th>
                <th className="py-3 px-3 font-semibold">Total</th>
                <th className="py-3 px-3 font-semibold">Payment Status</th>
                <th className="py-3 px-3 font-semibold">Status</th>
                <th className="py-3 px-3 font-semibold">Date</th>
                <th className="py-3 px-3 font-semibold text-center">Options</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f3f5]">
              {paginatedSales.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#6c757d] text-[13.5px]">
                    No records found!
                  </td>
                </tr>
              ) : (
                paginatedSales.map((item) => (
                  <tr key={item.id} className="hover:bg-[#fafbfc] transition-colors">
                    {/* Sale Order ID */}
                    <td className="py-3.5 px-3 font-medium text-[#2c333e] font-sans">
                      {item.orderNumber}
                    </td>

                    {/* Total */}
                    <td className="py-3.5 px-3 text-[#2c333e]">
                      {item.total}
                    </td>

                    {/* Payment Status (Plain text) */}
                    <td className="py-3.5 px-3 text-[#495057]">
                      {item.paymentStatus}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-3">
                      {item.status === "Completed" ? (
                        <span className="inline-block bg-[#e9ecef] text-[#495057] text-[11px] font-medium px-2 py-0.5 rounded-[2px] leading-tight">
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
                    <td className="py-3.5 px-3 text-[#495057] text-[12.5px]">
                      {item.date}
                    </td>

                    {/* Options */}
                    <td className="py-3.5 px-3 text-center">
                      <button
                        type="button"
                        onClick={() => setSelectedSale(item)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#eef0f3] hover:bg-[#e2e8f0] text-[#495057] text-[12px] font-medium rounded-[3px] transition-colors cursor-pointer"
                        title="Details"
                      >
                        <Info className="w-3.5 h-3.5 text-[#5a6268]" />
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
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 mt-2 border-t border-[#f1f3f5] text-[#495057] select-none">
            <span className="text-[12.5px] font-medium">
              Number of Entries: {totalEntries}
            </span>

            {totalPages > 1 && (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setCurrentPage(1)}
                  className={`w-7 h-7 flex items-center justify-center rounded-[3px] text-xs font-bold transition-colors cursor-pointer ${
                    currentPage === 1
                      ? "bg-[#00ab97] text-white"
                      : "border border-[#d1d5db] hover:bg-gray-50 text-[#495057]"
                  }`}
                >
                  1
                </button>
                {totalPages >= 2 && (
                  <button
                    type="button"
                    onClick={() => setCurrentPage(2)}
                    className={`w-7 h-7 flex items-center justify-center rounded-[3px] text-xs transition-colors cursor-pointer ${
                      currentPage === 2
                        ? "bg-[#00ab97] text-white font-bold"
                        : "border border-[#d1d5db] hover:bg-gray-50 text-[#495057]"
                    }`}
                  >
                    2
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage >= totalPages}
                  className={`w-7 h-7 flex items-center justify-center rounded-[3px] border border-[#d1d5db] text-[#495057] text-xs transition-colors ${
                    currentPage >= totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50 cursor-pointer"
                  }`}
                >
                  &gt;
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sale Detail Modal */}
      {selectedSale && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[4px] shadow-2xl max-w-md w-full border border-gray-200 p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-800">
                Sale Details - {selectedSale.orderNumber}
              </h3>
              <button
                onClick={() => setSelectedSale(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-[13px] text-gray-700">
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">Buyer</span>
                <span className="font-semibold text-gray-800">{selectedSale.customerName || "Customer"}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">Total Amount</span>
                <span className="font-bold text-[#00ab97]">{selectedSale.total}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">Payment Status</span>
                <span className="font-medium">{selectedSale.paymentStatus}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">Order Status</span>
                <span className="font-medium">{selectedSale.status}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">Date</span>
                <span>{selectedSale.date}</span>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedSale(null)}
                className="px-4 py-2 bg-[#00ab97] hover:bg-[#009180] text-white text-xs font-semibold rounded-[3px] transition-colors"
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

function SalesPageWrapper(props: SalesPageProps) {
  const searchParams = useSearchParams();
  const stParam = searchParams?.get("st") || "";
  const effectiveStatus = (props.statusFilter && props.statusFilter !== "all")
    ? props.statusFilter
    : (stParam || "active");
  const componentKey = `${effectiveStatus}_${stParam}`;

  return <SalesPageContent key={componentKey} {...props} statusFilter={effectiveStatus} />;
}

export default function SalesPage(props: SalesPageProps) {
  return (
    <Suspense fallback={<div className="p-6 text-gray-400">Loading...</div>}>
      <SalesPageWrapper {...props} />
    </Suspense>
  );
}
