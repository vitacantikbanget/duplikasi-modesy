"use client";

import { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  FileText,
  Eye,
  Trash2,
  X,
  XCircle,
  Download,
} from "lucide-react";

interface OrderItem {
  id: string;
  buyer: string;
  isGuest?: boolean;
  total: string;
  currency: string;
  status: "Processing" | "Completed" | "Cancelled";
  paymentStatus: "Pending Payment" | "Payment Received";
  updated: string;
  date: string;
}

const ORDERS_DATA: OrderItem[] = [
  {
    id: "#10041",
    buyer: "James Baronie",
    isGuest: true,
    total: "$60.20",
    currency: "USD",
    status: "Processing",
    paymentStatus: "Pending Payment",
    updated: "6 days ago",
    date: "2026-10-05 / 15:38",
  },
  {
    id: "#10040",
    buyer: "Admin",
    total: "$138",
    currency: "USD",
    status: "Processing",
    paymentStatus: "Pending Payment",
    updated: "12 days ago",
    date: "2026-09-29 / 12:00",
  },
  {
    id: "#10039",
    buyer: "Bb Hhj",
    isGuest: true,
    total: "$94",
    currency: "USD",
    status: "Processing",
    paymentStatus: "Pending Payment",
    updated: "13 days ago",
    date: "2026-09-29 / 00:34",
  },
  {
    id: "#10038",
    buyer: "Admin",
    total: "$381.85",
    currency: "USD",
    status: "Processing",
    paymentStatus: "Pending Payment",
    updated: "13 days ago",
    date: "2026-09-28 / 22:48",
  },
  {
    id: "#10037",
    buyer: "ZUS KARA",
    isGuest: true,
    total: "$71.95",
    currency: "USD",
    status: "Processing",
    paymentStatus: "Pending Payment",
    updated: "13 days ago",
    date: "2026-09-28 / 15:39",
  },
  {
    id: "#10036",
    buyer: "test test",
    isGuest: true,
    total: "$336",
    currency: "USD",
    status: "Processing",
    paymentStatus: "Pending Payment",
    updated: "13 days ago",
    date: "2026-09-28 / 06:49",
  },
  {
    id: "#10035",
    buyer: "Admin",
    total: "$99.30",
    currency: "USD",
    status: "Processing",
    paymentStatus: "Pending Payment",
    updated: "15 days ago",
    date: "2026-09-26 / 21:14",
  },
  {
    id: "#10034",
    buyer: "Admin",
    total: "$256.50",
    currency: "USD",
    status: "Processing",
    paymentStatus: "Pending Payment",
    updated: "16 days ago",
    date: "2026-09-25 / 06:11",
  },
  {
    id: "#10033",
    buyer: "Trendshop",
    total: "$191.10",
    currency: "USD",
    status: "Completed",
    paymentStatus: "Payment Received",
    updated: "7 days ago",
    date: "2026-09-23 / 17:23",
  },
  {
    id: "#10032",
    buyer: "mamat lan",
    isGuest: true,
    total: "$315.70",
    currency: "USD",
    status: "Processing",
    paymentStatus: "Pending Payment",
    updated: "18 days ago",
    date: "2026-09-23 / 11:15",
  },
  {
    id: "#10031",
    buyer: "Admin",
    total: "$257",
    currency: "USD",
    status: "Processing",
    paymentStatus: "Payment Received",
    updated: "4 days ago",
    date: "2026-09-23 / 02:08",
  },
  {
    id: "#10030",
    buyer: "Admin",
    total: "$253.90",
    currency: "USD",
    status: "Processing",
    paymentStatus: "Pending Payment",
    updated: "19 days ago",
    date: "2026-09-23 / 02:04",
  },
  {
    id: "#10029",
    buyer: "Admin",
    total: "$259.05",
    currency: "USD",
    status: "Processing",
    paymentStatus: "Payment Received",
    updated: "19 days ago",
    date: "2026-09-22 / 06:40",
  },
  {
    id: "#10028",
    buyer: "Admin",
    total: "$61.95",
    currency: "USD",
    status: "Processing",
    paymentStatus: "Pending Payment",
    updated: "20 days ago",
    date: "2026-09-22 / 01:14",
  },
  {
    id: "#10027",
    buyer: "Admin",
    total: "$137.25",
    currency: "USD",
    status: "Processing",
    paymentStatus: "Pending Payment",
    updated: "22 days ago",
    date: "2026-09-20 / 01:19",
  },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderItem[]>(ORDERS_DATA);
  const [showCount, setShowCount] = useState(15);
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [searchNumber, setSearchNumber] = useState("");
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<OrderItem | null>(null);

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
  };

  const filteredOrders = orders.filter((order) => {
    const matchStatus =
      statusFilter === "All" || order.status.toLowerCase() === statusFilter.toLowerCase();
    const matchPayment =
      paymentFilter === "All" ||
      order.paymentStatus.toLowerCase() === paymentFilter.toLowerCase();
    const matchSearch =
      !searchNumber.trim() ||
      order.id.toLowerCase().includes(searchNumber.toLowerCase()) ||
      order.buyer.toLowerCase().includes(searchNumber.toLowerCase());
    return matchStatus && matchPayment && matchSearch;
  });

  const handleDeleteOrder = (id: string) => {
    setOrders(orders.filter((o) => o.id !== id));
    setActiveDropdownId(null);
  };

  return (
    <div className="w-full text-[#333333] min-w-[1080px] pb-12">
      {/* Title */}
      <div className="mb-4">
        <h1 className="text-[24px] font-normal text-[#333333]">Orders</h1>
      </div>

      {/* Main Content Box */}
      <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border border-[#d2d6de]/60 p-5">
        {/* Filter Controls Row */}
        <form onSubmit={handleFilter} className="flex items-end space-x-3 mb-6">
          {/* Show */}
          <div>
            <label className="block text-[13px] font-semibold text-gray-700 mb-1">
              Show
            </label>
            <div className="relative">
              <select
                value={showCount}
                onChange={(e) => setShowCount(Number(e.target.value))}
                className="h-[34px] pl-3 pr-8 border border-[#d2d6de] rounded-[3px] bg-white text-[13px] text-gray-700 appearance-none focus:outline-none focus:border-[#3c8dbc]"
              >
                <option value={15}>15</option>
                <option value={30}>30</option>
                <option value={60}>60</option>
                <option value={100}>100</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-[13px] font-semibold text-gray-700 mb-1">
              Status
            </label>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-[34px] pl-3 pr-8 border border-[#d2d6de] rounded-[3px] bg-white text-[13px] text-gray-700 appearance-none focus:outline-none focus:border-[#3c8dbc] min-w-[120px]"
              >
                <option value="All">All</option>
                <option value="Processing">Processing</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Payment Status */}
          <div>
            <label className="block text-[13px] font-semibold text-gray-700 mb-1">
              Payment Status
            </label>
            <div className="relative">
              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="h-[34px] pl-3 pr-8 border border-[#d2d6de] rounded-[3px] bg-white text-[13px] text-gray-700 appearance-none focus:outline-none focus:border-[#3c8dbc] min-w-[140px]"
              >
                <option value="All">All</option>
                <option value="Payment Received">Payment Received</option>
                <option value="Pending Payment">Pending Payment</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Search */}
          <div>
            <label className="block text-[13px] font-semibold text-gray-700 mb-1">
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

          {/* Filter Button */}
          <button
            type="submit"
            className="h-[34px] px-5 bg-[#605ca8] hover:bg-[#504d8c] text-white text-[13px] rounded-[3px] font-normal transition-colors cursor-pointer"
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
              className="h-[34px] px-3.5 border border-[#d2d6de] bg-white hover:bg-gray-50 text-gray-700 text-[13px] rounded-[3px] flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <span>Export</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
            </button>

            {isExportOpen && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute left-0 mt-1 w-36 bg-white border border-gray-200 rounded-[3px] shadow-lg z-30 py-1"
              >
                <button
                  type="button"
                  onClick={() => setIsExportOpen(false)}
                  className="w-full px-4 py-2 text-left text-[13px] text-gray-700 hover:bg-[#f4f4f4] flex items-center space-x-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-gray-400" />
                  <span>CSV</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsExportOpen(false)}
                  className="w-full px-4 py-2 text-left text-[13px] text-gray-700 hover:bg-[#f4f4f4] flex items-center space-x-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-gray-400" />
                  <span>Excel</span>
                </button>
              </div>
            )}
          </div>
        </form>

        {/* Orders Table */}
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left text-[13.5px] border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200 text-[#333] font-semibold text-[13px]">
                <th className="py-2.5 px-3 text-left">Order</th>
                <th className="py-2.5 px-3 text-left">Buyer</th>
                <th className="py-2.5 px-3 text-left">Total</th>
                <th className="py-2.5 px-3 text-left">Currency</th>
                <th className="py-2.5 px-3 text-left">Status</th>
                <th className="py-2.5 px-3 text-left">Payment Status</th>
                <th className="py-2.5 px-3 text-left">Updated</th>
                <th className="py-2.5 px-3 text-left">Date</th>
                <th className="py-2.5 px-3 text-left">Options</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.slice(0, showCount).map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-[#f4f4f4] hover:bg-gray-50/60 transition-colors"
                >
                  {/* Order */}
                  <td className="py-3 px-3 text-gray-700 font-medium">
                    {order.id}
                  </td>

                  {/* Buyer */}
                  <td className="py-3 px-3">
                    <div className="text-gray-800 leading-tight">
                      {order.buyer}
                    </div>
                    {order.isGuest && (
                      <span className="inline-block bg-[#00a65a] text-white text-[10px] px-1.5 py-0.5 rounded-[2px] font-semibold mt-1">
                        Guest
                      </span>
                    )}
                  </td>

                  {/* Total */}
                  <td className="py-3 px-3 text-gray-800 font-medium">
                    {order.total}
                  </td>

                  {/* Currency */}
                  <td className="py-3 px-3 text-gray-700">
                    {order.currency}
                  </td>

                  {/* Status */}
                  <td className="py-3 px-3">
                    {order.status === "Completed" ? (
                      <span className="bg-[#00a65a] text-white text-[11px] px-2 py-0.5 rounded-[2px] font-medium">
                        Completed
                      </span>
                    ) : (
                      <span className="bg-[#777777] text-white text-[11px] px-2 py-0.5 rounded-[2px] font-medium">
                        Processing
                      </span>
                    )}
                  </td>

                  {/* Payment Status */}
                  <td className="py-3 px-3">
                    <div className="text-gray-700 text-[13px]">
                      {order.paymentStatus}
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedInvoice(order)}
                      className="inline-flex items-center space-x-1 border border-[#d2d6de] bg-[#f4f4f4] hover:bg-gray-200 text-gray-700 text-[11px] px-2 py-0.5 rounded-[2px] mt-1 cursor-pointer transition-colors"
                    >
                      <FileText className="w-3 h-3 text-gray-500" />
                      <span>View Invoice</span>
                    </button>
                  </td>

                  {/* Updated */}
                  <td className="py-3 px-3 text-gray-600">
                    {order.updated}
                  </td>

                  {/* Date */}
                  <td className="py-3 px-3 text-gray-600">
                    {order.date}
                  </td>

                  {/* Options */}
                  <td className="py-3 px-3 relative whitespace-nowrap">
                    <div className="relative inline-block text-left">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveDropdownId(
                            activeDropdownId === order.id ? null : order.id
                          );
                        }}
                        className="bg-[#605ca8] hover:bg-[#534f96] active:bg-[#464282] text-white text-[12px] font-normal px-3 py-1.5 rounded-[3px] transition-colors flex items-center justify-between whitespace-nowrap cursor-pointer shadow-xs min-w-[125px]"
                      >
                        <span>Select an option</span>
                        <span className="inline-block w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-t-[4px] border-t-white ml-2"></span>
                      </button>

                      {/* Dropdown Menu */}
                      {activeDropdownId === order.id && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="absolute right-0 mt-1 min-w-[140px] bg-white border border-[#ccc] rounded-[2px] shadow-[0_6px_12px_rgba(0,0,0,0.175)] z-50 py-1 text-[13px] animate-in fade-in-50 duration-75"
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedInvoice(order);
                              setActiveDropdownId(null);
                            }}
                            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-[#f4f4f4] hover:text-[#333] flex items-center space-x-2.5 transition-colors cursor-pointer group"
                          >
                            <Eye className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                            <span>View Details</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedInvoice(order);
                              setActiveDropdownId(null);
                            }}
                            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-[#f4f4f4] hover:text-[#333] flex items-center space-x-2.5 transition-colors cursor-pointer group"
                          >
                            <FileText className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-500 transition-colors" />
                            <span>Invoice</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setOrders(
                                orders.map((o) =>
                                  o.id === order.id ? { ...o, status: "Cancelled" } : o
                                )
                              );
                              setActiveDropdownId(null);
                            }}
                            className="w-full px-4 py-2 text-left text-amber-600 hover:bg-[#f4f4f4] flex items-center space-x-2.5 transition-colors cursor-pointer group"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Cancel Order</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteOrder(order.id)}
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
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Row */}
        <div className="flex justify-end items-center mt-6 pt-4 border-t border-[#f4f4f4] space-x-1">
          <button className="w-[32px] h-[32px] flex items-center justify-center rounded-[3px] text-white bg-[#0088cc] font-medium text-[13px]">
            1
          </button>
          <button className="w-[32px] h-[32px] flex items-center justify-center border border-gray-200 rounded-[3px] text-gray-700 bg-white hover:bg-gray-50 text-[13px]">
            2
          </button>
          <button className="w-[32px] h-[32px] flex items-center justify-center border border-gray-200 rounded-[3px] text-gray-700 bg-white hover:bg-gray-50 text-[13px]">
            3
          </button>
          <button className="w-[32px] h-[32px] flex items-center justify-center border border-gray-200 rounded-[3px] text-gray-700 bg-white hover:bg-gray-50 text-[13px]">
            &gt;
          </button>
        </div>
      </div>

      {/* INVOICE MODAL */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-2xs">
          <div className="bg-white rounded-[4px] shadow-2xl w-full max-w-xl overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-[#f4f4f4] flex items-center justify-between bg-gray-50">
              <div>
                <h3 className="text-[17px] font-semibold text-[#333333]">
                  Invoice {selectedInvoice.id}
                </h3>
                <p className="text-[12px] text-gray-500">
                  Date: {selectedInvoice.date}
                </p>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-[13.5px]">
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-100">
                <div>
                  <span className="text-gray-500 block text-xs">Buyer</span>
                  <span className="font-semibold text-gray-800">{selectedInvoice.buyer}</span>
                  {selectedInvoice.isGuest && (
                    <span className="ml-2 bg-[#00a65a] text-white text-[10px] px-1.5 py-0.5 rounded">
                      Guest
                    </span>
                  )}
                </div>
                <div>
                  <span className="text-gray-500 block text-xs">Order Total</span>
                  <span className="font-bold text-lg text-emerald-600">
                    {selectedInvoice.total} {selectedInvoice.currency}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-100">
                <div>
                  <span className="text-gray-500 block text-xs">Order Status</span>
                  <span className="inline-block px-2.5 py-1 bg-gray-100 rounded text-xs font-medium text-gray-700 mt-1">
                    {selectedInvoice.status}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs">Payment Status</span>
                  <span className="inline-block px-2.5 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium mt-1">
                    {selectedInvoice.paymentStatus}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setSelectedInvoice(null)}
                  className="px-4 py-2 border border-gray-300 text-gray-600 rounded-[3px] text-[13px] hover:bg-gray-50 cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => alert("Printing invoice...")}
                  className="px-4 py-2 bg-[#0088cc] hover:bg-[#0077b3] text-white rounded-[3px] text-[13px] cursor-pointer flex items-center space-x-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Print Invoice</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
