"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Eye,
  Send,
  Trash2,
  X,
  CheckCircle,
  AlertCircle,
  DollarSign,
  User,
  Package,
  Calendar,
  Clock,
  ExternalLink,
} from "lucide-react";

export interface AdminQuoteRequest {
  id: string;
  quoteId: string;
  productTitle: string;
  productSlug: string;
  productSku: string;
  quantity: number;
  image: string;
  seller: string;
  sellerSlug: string;
  buyer: string;
  buyerSlug: string;
  status:
    | "New Quote Request"
    | "Pending Quote"
    | "Pending Payment"
    | "Completed"
    | "Closed";
  sellersBid: string | null;
  updated: string;
  date: string;
  buyerNotes?: string;
  sellerNotes?: string;
}

const INITIAL_QUOTES: AdminQuoteRequest[] = [
  {
    id: "11",
    quoteId: "#11",
    productTitle: "Cobalt man t-shirt all colors",
    productSlug: "cobalt-man-t-shirt-1",
    productSku: "CMT-1011",
    quantity: 1,
    image: "/images/products/cobalt-tshirt.webp",
    seller: "Admin",
    sellerSlug: "admin",
    buyer: "Trendshop",
    buyerSlug: "trendshop",
    status: "Pending Quote",
    sellersBid: "$80,865",
    updated: "12 hours ago",
    date: "2026-10-16 / 20:24",
    buyerNotes: "Need bulk quotation with custom screen printing and express overseas delivery.",
    sellerNotes: "Quotation submitted including priority logistics and premium packaging.",
  },
  {
    id: "10",
    quoteId: "#10",
    productTitle: "Black gold fashion backpack",
    productSlug: "black-gold-fashion-backpack",
    productSku: "HIKIRJZ1K4",
    quantity: 8,
    image: "/images/products/black-backpack.webp",
    seller: "Trendshop",
    sellerSlug: "trendshop",
    buyer: "Admin",
    buyerSlug: "admin",
    status: "New Quote Request",
    sellersBid: null,
    updated: "12 days ago",
    date: "2026-10-06 / 10:51",
    buyerNotes: "Interested in purchasing 8 units for company staff. Please offer your best wholesale price.",
  },
  {
    id: "9",
    quoteId: "#9",
    productTitle: "Black gold fashion backpack",
    productSlug: "black-gold-fashion-backpack",
    productSku: "HIKIRJZ1K4",
    quantity: 1,
    image: "/images/products/black-backpack.webp",
    seller: "Trendshop",
    sellerSlug: "trendshop",
    buyer: "Admin",
    buyerSlug: "admin",
    status: "Closed",
    sellersBid: null,
    updated: "12 days ago",
    date: "2026-10-06 / 10:51",
    buyerNotes: "Inquiry closed as customer opted for alternative product.",
  },
  {
    id: "8",
    quoteId: "#8",
    productTitle: "Black fashion women backpack",
    productSlug: "black-fashion-women-backpack",
    productSku: "B1F2W3B4P5K6",
    quantity: 1,
    image: "/images/products/gucci-backpack.webp",
    seller: "Trendshop",
    sellerSlug: "trendshop",
    buyer: "Admin",
    buyerSlug: "admin",
    status: "New Quote Request",
    sellersBid: null,
    updated: "17 days ago",
    date: "2026-10-01 / 21:00",
    buyerNotes: "Requesting custom gold zipper buckle finish.",
  },
  {
    id: "7",
    quoteId: "#7",
    productTitle: "Cobalt man t-shirt all colors",
    productSlug: "cobalt-man-t-shirt-1",
    productSku: "CMT-1011",
    quantity: 1,
    image: "/images/products/cobalt-tshirt.webp",
    seller: "Admin",
    sellerSlug: "admin",
    buyer: "Caleb Prosper 1",
    buyerSlug: "caleb-prosper",
    status: "Pending Quote",
    sellersBid: "$20",
    updated: "7 days ago",
    date: "2026-09-29 / 11:29",
    buyerNotes: "Sample piece quotation inquiry.",
    sellerNotes: "Single unit sample cost $20.",
  },
  {
    id: "6",
    quoteId: "#6",
    productTitle: "Cobalt man t-shirt all colors",
    productSlug: "cobalt-man-t-shirt-1",
    productSku: "CMT-1011",
    quantity: 1,
    image: "/images/products/cobalt-tshirt.webp",
    seller: "Admin",
    sellerSlug: "admin",
    buyer: "Caleb Prosper 1",
    buyerSlug: "caleb-prosper",
    status: "Pending Payment",
    sellersBid: "$750",
    updated: "19 days ago",
    date: "2026-09-29 / 06:06",
    buyerNotes: "Special edition cobalt t-shirt lot.",
    sellerNotes: "Price confirmed, waiting for buyer checkout completion.",
  },
  {
    id: "5",
    quoteId: "#5",
    productTitle: "Cobalt man t-shirt all colors",
    productSlug: "cobalt-man-t-shirt-1",
    productSku: "CMT-1011",
    quantity: 1,
    image: "/images/products/cobalt-tshirt.webp",
    seller: "Admin",
    sellerSlug: "admin",
    buyer: "Caleb Prosper 1",
    buyerSlug: "caleb-prosper",
    status: "Pending Payment",
    sellersBid: "$1,000,000",
    updated: "22 days ago",
    date: "2026-09-26 / 08:37",
    buyerNotes: "Large enterprise manufacturing contract batch.",
    sellerNotes: "Contract accepted, awaiting down payment.",
  },
  {
    id: "4",
    quoteId: "#4",
    productTitle: "Black fashion women backpack",
    productSlug: "black-fashion-women-backpack",
    productSku: "B1F2W3B4P5K6",
    quantity: 1,
    image: "/images/products/gucci-backpack.webp",
    seller: "Trendshop",
    sellerSlug: "trendshop",
    buyer: "Admin",
    buyerSlug: "admin",
    status: "Pending Quote",
    sellersBid: "$8",
    updated: "1 month ago",
    date: "2026-09-04 / 08:27",
    buyerNotes: "Special promotional sample quote request.",
    sellerNotes: "Discounted wholesale promotional sample offered at $8.",
  },
  {
    id: "3",
    quoteId: "#3",
    productTitle: "Black gold fashion backpack",
    productSlug: "black-gold-fashion-backpack",
    productSku: "HIKIRJZ1K4",
    quantity: 1,
    image: "/images/products/black-backpack.webp",
    seller: "Trendshop",
    sellerSlug: "trendshop",
    buyer: "Peter Jone",
    buyerSlug: "peter-jones",
    status: "Closed",
    sellersBid: null,
    updated: "2 months ago",
    date: "2026-09-01 / 23:19",
    buyerNotes: "Closed due to expiration of quotation validity window.",
  },
  {
    id: "2",
    quoteId: "#2",
    productTitle: "Black gold fashion backpack",
    productSlug: "black-gold-fashion-backpack",
    productSku: "HIKIRJZ1K4",
    quantity: 1,
    image: "/images/products/black-backpack.webp",
    seller: "Trendshop",
    sellerSlug: "trendshop",
    buyer: "Admin",
    buyerSlug: "admin",
    status: "Pending Quote",
    sellersBid: "$75,000",
    updated: "2 months ago",
    date: "2026-08-31 / 14:26",
    buyerNotes: "Commercial retail chain order quotation.",
    sellerNotes: "Full bulk shipment quote provided.",
  },
  {
    id: "1",
    quoteId: "#1",
    productTitle: "Cobalt man t-shirt all colors",
    productSlug: "cobalt-man-t-shirt-1",
    productSku: "CMT-1011",
    quantity: 5,
    image: "/images/products/cobalt-tshirt.webp",
    seller: "Admin",
    sellerSlug: "admin",
    buyer: "Trendshop",
    buyerSlug: "trendshop",
    status: "Completed",
    sellersBid: "$100",
    updated: "2 months ago",
    date: "2026-08-05 / 14:05",
    buyerNotes: "5 packs order. Deal completed successfully.",
    sellerNotes: "Order paid and fulfilled.",
  },
];

export default function AdminQuoteRequestsPage() {
  const [quotes, setQuotes] = useState<AdminQuoteRequest[]>(INITIAL_QUOTES);

  // Filter input states
  const [showCount, setShowCount] = useState<number>(15);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Applied filter states
  const [appliedStatus, setAppliedStatus] = useState<string>("All");
  const [appliedSearch, setAppliedSearch] = useState<string>("");

  // Interactive UI state
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
  const [selectedDetailsQuote, setSelectedDetailsQuote] =
    useState<AdminQuoteRequest | null>(null);
  const [bidModalQuote, setBidModalQuote] = useState<AdminQuoteRequest | null>(
    null
  );
  const [bidValue, setBidValue] = useState<string>("");
  const [bidNotes, setBidNotes] = useState<string>("");
  const [notification, setNotification] = useState<string | null>(null);

  // Click outside listener to close dropdowns
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-quote-options-menu]")) {
        setActiveDropdownId(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleApplyFilter = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAppliedStatus(statusFilter);
    setAppliedSearch(searchQuery.trim().toLowerCase());
  };

  const filteredQuotes = useMemo(() => {
    return quotes.filter((item) => {
      // 1. Status Filter
      if (appliedStatus !== "All") {
        if (item.status !== appliedStatus) return false;
      }

      // 2. Search Query filter (matches quote id, product title, seller, buyer)
      if (appliedSearch) {
        const matchesQuote = item.quoteId
          .toLowerCase()
          .includes(appliedSearch);
        const matchesTitle = item.productTitle
          .toLowerCase()
          .includes(appliedSearch);
        const matchesSeller = item.seller
          .toLowerCase()
          .includes(appliedSearch);
        const matchesBuyer = item.buyer
          .toLowerCase()
          .includes(appliedSearch);
        const matchesBid = item.sellersBid
          ? item.sellersBid.toLowerCase().includes(appliedSearch)
          : false;

        if (
          !matchesQuote &&
          !matchesTitle &&
          !matchesSeller &&
          !matchesBuyer &&
          !matchesBid
        ) {
          return false;
        }
      }

      return true;
    });
  }, [quotes, appliedStatus, appliedSearch]);

  const displayedQuotes = filteredQuotes.slice(0, showCount);

  // Action handlers
  const handleDeleteQuote = (item: AdminQuoteRequest) => {
    const confirmed = confirm(
      `Are you sure you want to delete quote request ${item.quoteId}?`
    );
    if (confirmed) {
      setQuotes((prev) => prev.filter((q) => q.id !== item.id));
      setActiveDropdownId(null);
      if (selectedDetailsQuote?.id === item.id) {
        setSelectedDetailsQuote(null);
      }
      setNotification(`Quote request ${item.quoteId} has been deleted.`);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  const handleOpenBidModal = (item: AdminQuoteRequest) => {
    setBidModalQuote(item);
    setBidValue(item.sellersBid ? item.sellersBid.replace(/[^0-9.]/g, "") : "");
    setBidNotes(item.sellerNotes || "");
    setActiveDropdownId(null);
  };

  const handleSaveBid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bidModalQuote) return;

    const formattedAmount = bidValue.trim()
      ? `$${Number(bidValue.replace(/,/g, "")).toLocaleString()}`
      : null;

    setQuotes((prev) =>
      prev.map((q) =>
        q.id === bidModalQuote.id
          ? {
              ...q,
              sellersBid: formattedAmount,
              sellerNotes: bidNotes.trim() || undefined,
              status: formattedAmount ? "Pending Quote" : q.status,
              updated: "Just now",
            }
          : q
      )
    );

    setNotification(
      `Bid updated successfully for quote request ${bidModalQuote.quoteId}.`
    );
    setBidModalQuote(null);
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="w-full text-[#333333] pb-12 font-sans">
      {/* Page Title */}
      <div className="mb-4">
        <h1 className="text-[24px] font-normal text-[#333333]">Quote Requests</h1>
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

      {/* Main Content Box (Modesy White Box) */}
      <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border border-[#d2d6de] p-5">
        {/* Filters Form */}
        <form
          onSubmit={handleApplyFilter}
          className="flex flex-wrap items-end gap-3 mb-5"
        >
          {/* Show dropdown */}
          <div>
            <label className="block text-[13px] text-[#333333] font-normal mb-1">
              Show
            </label>
            <div className="relative">
              <select
                value={showCount}
                onChange={(e) => setShowCount(Number(e.target.value))}
                className="h-[34px] w-[90px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-[#555] bg-white appearance-none outline-none focus:border-[#3c8dbc] cursor-pointer"
              >
                <option value={15}>15</option>
                <option value={30}>30</option>
                <option value={60}>60</option>
                <option value={100}>100</option>
              </select>
              <span className="absolute right-2.5 top-2 pointer-events-none text-[11px] text-[#777]">
                ▾
              </span>
            </div>
          </div>

          {/* Status filter */}
          <div>
            <label className="block text-[13px] text-[#333333] font-normal mb-1">
              Status
            </label>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-[34px] min-w-[150px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-[#555] bg-white appearance-none outline-none focus:border-[#3c8dbc] cursor-pointer"
              >
                <option value="All">All</option>
                <option value="New Quote Request">New Quote Request</option>
                <option value="Pending Quote">Pending Quote</option>
                <option value="Pending Payment">Pending Payment</option>
                <option value="Completed">Completed</option>
                <option value="Closed">Closed</option>
              </select>
              <span className="absolute right-2.5 top-2 pointer-events-none text-[11px] text-[#777]">
                ▾
              </span>
            </div>
          </div>

          {/* Search input */}
          <div>
            <label className="block text-[13px] text-[#333333] font-normal mb-1">
              Search
            </label>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-[#555] placeholder-gray-400 outline-none focus:border-[#3c8dbc] w-[180px]"
            />
          </div>

          {/* Filter button */}
          <button
            type="submit"
            className="h-[34px] px-5 bg-[#605ca8] hover:bg-[#534f96] text-white text-[13px] rounded-[3px] font-normal transition-colors cursor-pointer"
          >
            Filter
          </button>
        </form>

        {/* Quote Requests Table */}
        <div className="overflow-x-auto min-h-[350px]">
          <table className="w-full text-left text-[13px] border-collapse whitespace-nowrap">
            <thead>
              <tr className="border-b-2 border-gray-200 text-[#333333] font-semibold text-[13px]">
                <th className="py-2.5 px-3 text-left w-[65px]">Quote</th>
                <th className="py-2.5 px-3 text-left min-w-[280px]">Product</th>
                <th className="py-2.5 px-3 text-left w-[110px]">Seller</th>
                <th className="py-2.5 px-3 text-left w-[120px]">Buyer</th>
                <th className="py-2.5 px-3 text-left w-[140px]">Status</th>
                <th className="py-2.5 px-3 text-left w-[110px]">
                  Seller&#39;s Bid
                </th>
                <th className="py-2.5 px-3 text-left w-[110px]">Updated</th>
                <th className="py-2.5 px-3 text-left w-[150px]">Date</th>
                <th className="py-2.5 px-3 text-left w-[140px]">Options</th>
              </tr>
            </thead>
            <tbody>
              {displayedQuotes.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="py-12 text-center text-gray-500 text-[13px]"
                  >
                    No quote requests found.
                  </td>
                </tr>
              ) : (
                displayedQuotes.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#f4f4f4] hover:bg-gray-50/70 transition-colors text-[13px]"
                  >
                    {/* Quote ID */}
                    <td className="py-3 px-3 text-gray-700 font-medium">
                      {item.quoteId}
                    </td>

                    {/* Product */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image}
                          alt={item.productTitle}
                          className="w-[44px] h-[44px] rounded-[2px] object-cover border border-[#e4e7ea] shrink-0"
                        />
                        <div className="flex flex-col">
                          <Link
                            href={`/product/${item.productSlug}`}
                            className="text-[#0088cc] hover:text-[#005580] hover:underline font-normal transition-colors leading-tight"
                          >
                            {item.productTitle}
                          </Link>
                          <span className="text-[#777777] text-[12px] mt-0.5">
                            Quantity: {item.quantity}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Seller */}
                    <td className="py-3 px-3">
                      <Link
                        href={`/admin/users?search=${encodeURIComponent(
                          item.seller
                        )}`}
                        className="text-[#0088cc] hover:text-[#005580] hover:underline transition-colors"
                      >
                        {item.seller}
                      </Link>
                    </td>

                    {/* Buyer */}
                    <td className="py-3 px-3">
                      <Link
                        href={`/admin/users?search=${encodeURIComponent(
                          item.buyer
                        )}`}
                        className="text-[#0088cc] hover:text-[#005580] hover:underline transition-colors"
                      >
                        {item.buyer}
                      </Link>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-3 text-[#333333]">
                      {item.status}
                    </td>

                    {/* Seller's Bid */}
                    <td className="py-3 px-3 text-[#333333] font-semibold">
                      {item.sellersBid || ""}
                    </td>

                    {/* Updated */}
                    <td className="py-3 px-3 text-gray-600">
                      {item.updated}
                    </td>

                    {/* Date */}
                    <td className="py-3 px-3 text-gray-600 text-[12.5px] whitespace-nowrap">
                      {item.date}
                    </td>

                    {/* Options Dropdown Button */}
                    <td
                      className="py-3 px-3 relative whitespace-nowrap"
                      data-quote-options-menu
                    >
                      <div className="relative inline-block text-left">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveDropdownId(
                              activeDropdownId === item.id ? null : item.id
                            );
                          }}
                          className="bg-[#605ca8] hover:bg-[#534f96] active:bg-[#464282] text-white text-[12px] font-normal px-3 py-1.5 rounded-[3px] transition-colors flex items-center justify-between whitespace-nowrap cursor-pointer shadow-xs min-w-[130px]"
                        >
                          <span>Select an option</span>
                          <span className="inline-block w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-t-[4px] border-t-white ml-2" />
                        </button>

                        {/* Dropdown Menu */}
                        {activeDropdownId === item.id && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="absolute right-0 mt-1 min-w-[155px] bg-white border border-[#ccc] rounded-[2px] shadow-[0_6px_12px_rgba(0,0,0,0.175)] z-50 py-1 text-[13px] animate-in fade-in-50 duration-75"
                          >
                            {/* Submit / Update Bid */}
                            <button
                              type="button"
                              onClick={() => handleOpenBidModal(item)}
                              className="w-full px-4 py-2 text-left text-gray-700 hover:bg-[#f4f4f4] hover:text-[#333] flex items-center space-x-2.5 transition-colors cursor-pointer group"
                            >
                              <Send className="w-3.5 h-3.5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                              <span>
                                {item.sellersBid
                                  ? "Update Bid"
                                  : "Submit a Quote"}
                              </span>
                            </button>

                            {/* View Details */}
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedDetailsQuote(item);
                                setActiveDropdownId(null);
                              }}
                              className="w-full px-4 py-2 text-left text-gray-700 hover:bg-[#f4f4f4] hover:text-[#333] flex items-center space-x-2.5 transition-colors cursor-pointer group"
                            >
                              <Eye className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                              <span>View Details</span>
                            </button>

                            {/* Delete */}
                            <button
                              type="button"
                              onClick={() => handleDeleteQuote(item)}
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

        {/* Number of Entries count matching screenshot */}
        <div className="mt-4 pt-3 border-t border-[#f4f4f4] text-[13px] text-gray-700 flex justify-between items-center select-none">
          <span className="font-semibold">
            Number of Entries: {filteredQuotes.length}
          </span>
          <span className="text-gray-500 text-xs">
            Showing {Math.min(displayedQuotes.length, filteredQuotes.length)} of{" "}
            {filteredQuotes.length} entries
          </span>
        </div>
      </div>

      {/* VIEW DETAILS MODAL */}
      {selectedDetailsQuote && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-2xs">
          <div className="bg-white rounded-[4px] shadow-2xl w-full max-w-lg overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#f4f4f4] flex items-center justify-between bg-gray-50">
              <h3 className="text-[17px] font-semibold text-[#333333] flex items-center gap-2">
                <span>Quote Request</span>
                <span className="text-[#605ca8]">
                  {selectedDetailsQuote.quoteId}
                </span>
              </h3>
              <button
                type="button"
                onClick={() => setSelectedDetailsQuote(null)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-[13.5px]">
              {/* Product Info Card */}
              <div className="flex gap-4 p-3 bg-gray-50 rounded-[3px] border border-gray-200 items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedDetailsQuote.image}
                  alt={selectedDetailsQuote.productTitle}
                  className="w-14 h-14 rounded-[3px] object-cover border border-gray-300 shrink-0"
                />
                <div className="overflow-hidden">
                  <h4 className="font-semibold text-gray-800 text-[14px] truncate">
                    {selectedDetailsQuote.productTitle}
                  </h4>
                  <div className="text-xs text-gray-500 mt-0.5 space-x-3">
                    <span>SKU: {selectedDetailsQuote.productSku}</span>
                    <span>Quantity: {selectedDetailsQuote.quantity}</span>
                  </div>
                </div>
              </div>

              {/* Grid details */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="border border-gray-100 p-3 rounded-[3px] bg-white shadow-2xs">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                    Buyer
                  </span>
                  <p className="font-medium text-gray-800">
                    {selectedDetailsQuote.buyer}
                  </p>
                </div>

                <div className="border border-gray-100 p-3 rounded-[3px] bg-white shadow-2xs">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                    Seller
                  </span>
                  <p className="font-medium text-gray-800">
                    {selectedDetailsQuote.seller}
                  </p>
                </div>

                <div className="border border-gray-100 p-3 rounded-[3px] bg-white shadow-2xs">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                    Status
                  </span>
                  <p className="font-medium text-gray-800">
                    {selectedDetailsQuote.status}
                  </p>
                </div>

                <div className="border border-gray-100 p-3 rounded-[3px] bg-white shadow-2xs">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                    Seller&#39;s Bid
                  </span>
                  <p className="font-bold text-gray-900 text-[15px]">
                    {selectedDetailsQuote.sellersBid || "No bid placed yet"}
                  </p>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-3 text-xs text-gray-600 bg-gray-50 p-3 rounded-[3px] border border-gray-200">
                <div>
                  <span className="font-semibold text-gray-700 block mb-0.5">
                    Date Created:
                  </span>
                  {selectedDetailsQuote.date}
                </div>
                <div>
                  <span className="font-semibold text-gray-700 block mb-0.5">
                    Last Updated:
                  </span>
                  {selectedDetailsQuote.updated}
                </div>
              </div>

              {/* Notes */}
              {selectedDetailsQuote.buyerNotes && (
                <div className="border-t border-gray-100 pt-3">
                  <span className="text-xs font-bold text-gray-600 block mb-1">
                    Buyer Inquiry / Notes:
                  </span>
                  <p className="text-gray-700 text-[13px] bg-blue-50/50 border border-blue-100 p-3 rounded-[3px]">
                    {selectedDetailsQuote.buyerNotes}
                  </p>
                </div>
              )}

              {selectedDetailsQuote.sellerNotes && (
                <div className="pt-1">
                  <span className="text-xs font-bold text-gray-600 block mb-1">
                    Seller Response / Proposal:
                  </span>
                  <p className="text-gray-700 text-[13px] bg-purple-50/50 border border-purple-100 p-3 rounded-[3px]">
                    {selectedDetailsQuote.sellerNotes}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-[#f4f4f4] bg-gray-50 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  const target = selectedDetailsQuote;
                  setSelectedDetailsQuote(null);
                  handleOpenBidModal(target);
                }}
                className="h-[34px] px-4 bg-[#605ca8] hover:bg-[#534f96] text-white text-[13px] rounded-[3px] font-normal transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>
                  {selectedDetailsQuote.sellersBid ? "Update Bid" : "Submit Bid"}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedDetailsQuote(null)}
                className="h-[34px] px-4 border border-[#d2d6de] bg-white hover:bg-gray-100 text-[#444] text-[13px] rounded-[3px] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUBMIT / UPDATE BID MODAL */}
      {bidModalQuote && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-2xs">
          <div className="bg-white rounded-[4px] shadow-2xl w-full max-w-md overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#f4f4f4] flex items-center justify-between bg-gray-50">
              <h3 className="text-[17px] font-semibold text-[#333333]">
                {bidModalQuote.sellersBid ? "Update Quote Bid" : "Submit Quote Bid"}
              </h3>
              <button
                type="button"
                onClick={() => setBidModalQuote(null)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveBid}>
              <div className="p-6 space-y-4 text-[13.5px]">
                <div className="p-3 bg-gray-50 rounded-[3px] border border-gray-200 text-xs text-gray-700">
                  <p className="font-semibold text-gray-900">
                    {bidModalQuote.quoteId} - {bidModalQuote.productTitle}
                  </p>
                  <p className="text-gray-500 mt-0.5">
                    Requested Quantity: {bidModalQuote.quantity} | Buyer:{" "}
                    {bidModalQuote.buyer}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Bid Amount (USD) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500 font-medium">
                      $
                    </span>
                    <input
                      type="number"
                      step="any"
                      required
                      placeholder="e.g. 750"
                      value={bidValue}
                      onChange={(e) => setBidValue(e.target.value)}
                      className="w-full h-[36px] pl-7 pr-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] outline-none focus:border-[#3c8dbc]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Note / Proposal Details (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Enter delivery timeline, pricing breakdown or terms..."
                    value={bidNotes}
                    onChange={(e) => setBidNotes(e.target.value)}
                    className="w-full p-2.5 border border-[#d2d6de] rounded-[3px] text-[13px] outline-none focus:border-[#3c8dbc] resize-none"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-3 border-t border-[#f4f4f4] bg-gray-50 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setBidModalQuote(null)}
                  className="h-[34px] px-4 border border-[#d2d6de] bg-white hover:bg-gray-100 text-[#444] text-[13px] rounded-[3px] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-[34px] px-5 bg-[#605ca8] hover:bg-[#534f96] text-white text-[13px] rounded-[3px] font-normal transition-colors cursor-pointer"
                >
                  Save Bid
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
