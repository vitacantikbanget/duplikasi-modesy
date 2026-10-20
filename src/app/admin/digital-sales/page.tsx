"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Trash2, Eye, X, Download } from "lucide-react";

interface DigitalSaleItem {
  id: number;
  order: string;
  orderId: string;
  purchaseCode: string;
  seller: string;
  sellerSlug?: string;
  buyer: string;
  buyerSlug?: string;
  total: string;
  currency: string;
  date: string;
}

const DIGITAL_SALES_DATA: DigitalSaleItem[] = [
  {
    id: 10,
    order: "#10033",
    orderId: "10033",
    purchaseCode: "6ab3eedac1fc91-68270067-215438-440457",
    seller: "Admin",
    sellerSlug: "admin",
    buyer: "Trendshop",
    buyerSlug: "trendshop",
    total: "$34",
    currency: "USD",
    date: "2026-09-23 / 17:23",
  },
  {
    id: 9,
    order: "#10029",
    orderId: "10029",
    purchaseCode: "6ab206c3e12127-30361188-323655-239483",
    seller: "Trendshop",
    sellerSlug: "trendshop",
    buyer: "Admin",
    buyerSlug: "admin",
    total: "$39",
    currency: "USD",
    date: "2026-09-22 / 06:40",
  },
  {
    id: 8,
    order: "#10025",
    orderId: "10025",
    purchaseCode: "6aaa55a05daf19-25310897-686173-150508",
    seller: "Trendshop",
    sellerSlug: "trendshop",
    buyer: "Admin",
    buyerSlug: "admin",
    total: "$39",
    currency: "USD",
    date: "2026-09-16 / 10:38",
  },
  {
    id: 7,
    order: "#10015",
    orderId: "10015",
    purchaseCode: "6a9cb04c30bca0-60183289-716678-656734",
    seller: "Trendshop",
    sellerSlug: "trendshop",
    buyer: "Admin",
    buyerSlug: "admin",
    total: "$36",
    currency: "USD",
    date: "2026-09-06 / 02:14",
  },
  {
    id: 6,
    order: "#10011",
    orderId: "10011",
    purchaseCode: "6a95b25711a5d2-77219410-344005-991541",
    seller: "Trendshop",
    sellerSlug: "trendshop",
    buyer: "Admin",
    buyerSlug: "admin",
    total: "$15",
    currency: "USD",
    date: "2026-08-31 / 18:56",
  },
  {
    id: 4,
    order: "#10010",
    orderId: "10010",
    purchaseCode: "6a959fafeeffd4-96455711-673930-529607",
    seller: "Trendshop",
    sellerSlug: "trendshop",
    buyer: "Admin",
    buyerSlug: "admin",
    total: "$39",
    currency: "USD",
    date: "2026-08-31 / 17:37",
  },
  {
    id: 5,
    order: "#10010",
    orderId: "10010",
    purchaseCode: "6a959faff05b66-00227322-489413-582708",
    seller: "Admin",
    sellerSlug: "admin",
    buyer: "Admin",
    buyerSlug: "admin",
    total: "$25",
    currency: "USD",
    date: "2026-08-31 / 17:37",
  },
  {
    id: 3,
    order: "#10008",
    orderId: "10008",
    purchaseCode: "68bad0356d2531-36564595-753269-833354",
    seller: "Trendshop",
    sellerSlug: "trendshop",
    buyer: "Admin",
    buyerSlug: "admin",
    total: "$29",
    currency: "USD",
    date: "2026-08-05 / 13:57",
  },
  {
    id: 2,
    order: "#10007",
    orderId: "10007",
    purchaseCode: "68bace79bd4d85-48411632-643356-476017",
    seller: "Trendshop",
    sellerSlug: "trendshop",
    buyer: "Peter Jone",
    buyerSlug: "peter-jones",
    total: "$39",
    currency: "USD",
    date: "2026-08-05 / 13:50",
  },
  {
    id: 1,
    order: "#10002",
    orderId: "10002",
    purchaseCode: "68b98a9a8f2ac1-48843534-964099-396506",
    seller: "Trendshop",
    sellerSlug: "trendshop",
    buyer: "Admin",
    buyerSlug: "admin",
    total: "$15",
    currency: "USD",
    date: "2026-08-04 / 14:48",
  },
];

export default function AdminDigitalSalesPage() {
  const [sales, setSales] = useState<DigitalSaleItem[]>(DIGITAL_SALES_DATA);
  const [showCount, setShowCount] = useState(15);
  const [searchCode, setSearchCode] = useState("");
  const [activeDropdownId, setActiveDropdownId] = useState<number | null>(null);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSale, setSelectedSale] = useState<DigitalSaleItem | null>(null);

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

  const filteredSales = sales.filter((item) => {
    if (!searchCode.trim()) return true;
    const q = searchCode.toLowerCase().trim();
    return (
      item.purchaseCode.toLowerCase().includes(q) ||
      item.order.toLowerCase().includes(q) ||
      item.orderId.includes(q) ||
      item.seller.toLowerCase().includes(q) ||
      item.buyer.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.ceil(filteredSales.length / showCount) || 1;
  const startIndex = (currentPage - 1) * showCount;
  const currentRows = filteredSales.slice(startIndex, startIndex + showCount);

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this digital sale record?")) {
      setSales((prev) => prev.filter((item) => item.id !== id));
      setActiveDropdownId(null);
    }
  };

  const handleExport = (type: "csv" | "excel") => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        "Id,Order,Purchase Code,Seller,Buyer,Total,Currency,Date",
        ...filteredSales.map(
          (s) =>
            `${s.id},"${s.order}","${s.purchaseCode}","${s.seller}","${s.buyer}","${s.total}","${s.currency}","${s.date}"`
        ),
      ].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `digital_sales_${type}_${Date.now()}.${type === "csv" ? "csv" : "xls"}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsExportOpen(false);
  };

  return (
    <div className="w-full text-[#333333] pb-12">
      {/* Title */}
      <div className="mb-4">
        <h1 className="text-[24px] font-normal text-[#333333]">Digital Sales</h1>
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

          {/* Search (Purchase Code) */}
          <div>
            <label className="block text-[12px] font-semibold text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              placeholder="Purchase Code"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
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

        {/* Digital Sales Table with full horizontal scroll */}
        <div className="overflow-x-auto min-h-[420px]">
          <table className="w-full text-left text-[13.5px] border-collapse whitespace-nowrap">
            <thead>
              <tr className="border-b-2 border-gray-200 text-[#333333] font-semibold text-[13px]">
                <th className="py-2.5 px-3 text-left w-12">Id</th>
                <th className="py-2.5 px-3 text-left">Order</th>
                <th className="py-2.5 px-3 text-left">Purchase Code</th>
                <th className="py-2.5 px-3 text-left">Seller</th>
                <th className="py-2.5 px-3 text-left">Buyer</th>
                <th className="py-2.5 px-3 text-left">Total</th>
                <th className="py-2.5 px-3 text-left">Currency</th>
                <th className="py-2.5 px-3 text-left">Date</th>
                <th className="py-2.5 px-3 text-left w-32">Options</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-gray-500 text-sm">
                    No digital sales found.
                  </td>
                </tr>
              ) : (
                currentRows.map((sale) => (
                  <tr
                    key={sale.id}
                    className="border-b border-[#f4f4f4] hover:bg-gray-50/70 transition-colors text-[13px]"
                  >
                    {/* Id */}
                    <td className="py-3 px-3 text-gray-600 font-normal">
                      {sale.id}
                    </td>

                    {/* Order */}
                    <td className="py-3 px-3 text-gray-700 font-medium">
                      <Link
                        href={`/admin/orders?search=${sale.orderId}`}
                        className="text-gray-700 hover:text-[#3c8dbc] transition-colors"
                      >
                        {sale.order}
                      </Link>
                    </td>

                    {/* Purchase Code */}
                    <td className="py-3 px-3 text-gray-600 font-mono text-[12px] max-w-[280px] truncate" title={sale.purchaseCode}>
                      {sale.purchaseCode}
                    </td>

                    {/* Seller */}
                    <td className="py-3 px-3 text-gray-800">
                      <Link
                        href={`/admin/users?search=${encodeURIComponent(sale.seller)}`}
                        className="text-gray-800 hover:text-[#3c8dbc] transition-colors"
                      >
                        {sale.seller}
                      </Link>
                    </td>

                    {/* Buyer */}
                    <td className="py-3 px-3 text-gray-800">
                      <Link
                        href={`/admin/users?search=${encodeURIComponent(sale.buyer)}`}
                        className="text-gray-800 hover:text-[#3c8dbc] transition-colors"
                      >
                        {sale.buyer}
                      </Link>
                    </td>

                    {/* Total */}
                    <td className="py-3 px-3 text-gray-800 font-medium">
                      {sale.total}
                    </td>

                    {/* Currency */}
                    <td className="py-3 px-3 text-gray-700">
                      {sale.currency}
                    </td>

                    {/* Date */}
                    <td className="py-3 px-3 text-gray-600 text-[12px] whitespace-nowrap">
                      {sale.date}
                    </td>

                    {/* Options (Purple button dropdown) */}
                    <td className="py-3 px-3 relative whitespace-nowrap">
                      <div className="relative inline-block text-left">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveDropdownId(
                              activeDropdownId === sale.id ? null : sale.id
                            );
                          }}
                          className="bg-[#605ca8] hover:bg-[#534f96] active:bg-[#464282] text-white text-[12px] font-normal px-3 py-1.5 rounded-[3px] transition-colors flex items-center justify-between whitespace-nowrap cursor-pointer shadow-2xs min-w-[125px]"
                        >
                          <span>Select an option</span>
                          <span className="inline-block w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-t-[4px] border-t-white ml-2"></span>
                        </button>

                        {/* Dropdown Menu matching Modesy */}
                        {activeDropdownId === sale.id && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="absolute right-0 mt-1 min-w-[140px] bg-white border border-[#ccc] rounded-[2px] shadow-[0_6px_12px_rgba(0,0,0,0.175)] z-50 py-1 text-[13px] animate-in fade-in-50 duration-75"
                          >
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedSale(sale);
                                setActiveDropdownId(null);
                              }}
                              className="w-full px-4 py-2 text-left text-gray-700 hover:bg-[#f4f4f4] hover:text-[#333] flex items-center space-x-2.5 transition-colors cursor-pointer group"
                            >
                              <Eye className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                              <span>View Details</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(sale.id)}
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

        {/* Pagination Row (if total items exceed showCount) */}
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

      {/* DIGITAL SALE DETAILS MODAL */}
      {selectedSale && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-2xs">
          <div className="bg-white rounded-[4px] shadow-2xl w-full max-w-lg overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-[#f4f4f4] flex items-center justify-between bg-gray-50">
              <h3 className="text-[17px] font-semibold text-[#333333]">
                Digital Sale #{selectedSale.id} - Order {selectedSale.order}
              </h3>
              <button
                type="button"
                onClick={() => setSelectedSale(null)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-3.5 text-[13.5px]">
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Order:</span>
                <span className="font-semibold text-gray-800">{selectedSale.order}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Purchase Code:</span>
                <span className="font-mono text-xs text-gray-700 break-all">{selectedSale.purchaseCode}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Seller:</span>
                <span className="font-medium text-gray-800">{selectedSale.seller}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Buyer:</span>
                <span className="font-medium text-gray-800">{selectedSale.buyer}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Total:</span>
                <span className="font-bold text-emerald-600">{selectedSale.total} {selectedSale.currency}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Date:</span>
                <span className="text-gray-700">{selectedSale.date}</span>
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedSale(null)}
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
