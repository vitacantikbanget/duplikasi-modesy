"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { X, Info, Trash2, Send } from "lucide-react";

interface QuoteRequest {
  id: string;
  quoteId: string;
  productTitle: string;
  color: string;
  productSku: string;
  quantity: number;
  image: string;
  buyer: string;
  status: "Pending Quote" | "Pending Payment" | "Completed" | "New Quote Request" | "Closed" | string;
  sellersBid?: string | null;
  updated: string;
  date: string;
}

const initialQuotes: QuoteRequest[] = [
  {
    id: "11",
    quoteId: "#11",
    productTitle: "Cobalt man t-shirt all colors",
    color: "Blue",
    productSku: "H1K1LP22272-Blue",
    quantity: 1,
    image: "/images/products/cobalt-tshirt.webp",
    buyer: "Trendshop",
    status: "Pending Quote",
    sellersBid: "$80,865",
    updated: "3 days ago",
    date: "2026-10-16 / 20:24",
  },
  {
    id: "7",
    quoteId: "#7",
    productTitle: "Cobalt man t-shirt all colors",
    color: "Teal",
    productSku: "H1K1LP22272-Teal",
    quantity: 1,
    image: "/images/products/cobalt-tshirt.webp",
    buyer: "Caleb Prosper",
    status: "Pending Quote",
    sellersBid: "$20",
    updated: "9 days ago",
    date: "2026-09-29 / 11:29",
  },
  {
    id: "6",
    quoteId: "#6",
    productTitle: "Cobalt man t-shirt all colors",
    color: "Teal",
    productSku: "H1K1LP22272-Teal",
    quantity: 1,
    image: "/images/products/cobalt-tshirt.webp",
    buyer: "Caleb Prosper",
    status: "Pending Payment",
    sellersBid: "$750",
    updated: "21 days ago",
    date: "2026-09-29 / 06:06",
  },
  {
    id: "5",
    quoteId: "#5",
    productTitle: "Cobalt man t-shirt all colors",
    color: "Teal",
    productSku: "H1K1LP22272-Teal",
    quantity: 1,
    image: "/images/products/cobalt-tshirt.webp",
    buyer: "Caleb Prosper",
    status: "Pending Payment",
    sellersBid: "$1,000,000",
    updated: "25 days ago",
    date: "2026-09-26 / 08:37",
  },
  {
    id: "1",
    quoteId: "#1",
    productTitle: "Cobalt man t-shirt all colors",
    color: "Blue",
    productSku: "H1K1LP22272-Blue",
    quantity: 5,
    image: "/images/products/cobalt-tshirt.webp",
    buyer: "Trendshop",
    status: "Completed",
    sellersBid: "$100",
    updated: "3 months ago",
    date: "2026-08-05 / 14:05",
  },
];

export default function QuoteRequestsPage() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>(initialQuotes);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedStatus, setAppliedStatus] = useState("All");
  const [appliedSearch, setAppliedSearch] = useState("");

  // Dropdown options menu state
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Modals state
  const [submitModalQuote, setSubmitModalQuote] = useState<QuoteRequest | null>(null);
  const [bidAmount, setBidAmount] = useState("");
  const [detailsModalQuote, setDetailsModalQuote] = useState<QuoteRequest | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFilter = () => {
    setAppliedStatus(statusFilter);
    setAppliedSearch(searchQuery.trim().toLowerCase());
  };

  const filteredQuotes = useMemo(() => {
    return quotes.filter((item) => {
      // 1. Status filter
      if (appliedStatus !== "All") {
        if (item.status !== appliedStatus) return false;
      }
      // 2. Search query (matches quoteId, productTitle, buyer, or sku)
      if (appliedSearch) {
        const matchQuote = item.quoteId.toLowerCase().includes(appliedSearch);
        const matchTitle = item.productTitle.toLowerCase().includes(appliedSearch);
        const matchBuyer = item.buyer.toLowerCase().includes(appliedSearch);
        const matchSku = item.productSku.toLowerCase().includes(appliedSearch);
        if (!matchQuote && !matchTitle && !matchBuyer && !matchSku) {
          return false;
        }
      }
      return true;
    });
  }, [quotes, appliedStatus, appliedSearch]);

  const handleSaveBid = () => {
    if (!submitModalQuote) return;
    const formattedBid = bidAmount.startsWith("$") ? bidAmount : `$${bidAmount}`;
    setQuotes((prev) =>
      prev.map((q) =>
        q.id === submitModalQuote.id
          ? {
              ...q,
              sellersBid: formattedBid,
              status: "Pending Quote",
              updated: "Just now",
            }
          : q
      )
    );
    setSubmitModalQuote(null);
    setBidAmount("");
  };

  const handleDeleteQuote = (id: string) => {
    if (confirm("Are you sure you want to delete this quote request?")) {
      setQuotes((prev) => prev.filter((q) => q.id !== id));
      setOpenMenuId(null);
    }
  };

  return (
    <div className="w-full">
      {/* Main Container Card */}
      <div className="bg-white rounded-[4px] border border-[#e9ecef] p-6 shadow-xs">
        {/* Title */}
        <h1 className="text-[20px] font-bold text-[#2c333e] mb-6 font-sans">
          Quote Requests
        </h1>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-end gap-3 mb-6">
          {/* Status Dropdown */}
          <div>
            <label className="block text-[13px] font-bold text-[#2c333e] mb-1.5 font-sans">
              Status
            </label>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-[150px] h-[34px] border border-[#d1d5db] rounded-[3px] pl-3 pr-7 text-[13px] text-[#495057] bg-white appearance-none outline-none focus:border-[#605ca8]"
              >
                <option value="All">All</option>
                <option value="Pending Quote">Pending Quote</option>
                <option value="Pending Payment">Pending Payment</option>
                <option value="Completed">Completed</option>
                <option value="Closed">Closed</option>
              </select>
              <span className="absolute right-2.5 top-2 pointer-events-none text-[11px] text-[#495057]">
                ▾
              </span>
            </div>
          </div>

          {/* Search Input */}
          <div>
            <label className="block text-[13px] font-bold text-[#2c333e] mb-1.5 font-sans">
              Search
            </label>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleFilter()}
              className="w-[150px] sm:w-[180px] h-[34px] border border-[#d1d5db] rounded-[3px] px-3 text-[13px] text-[#495057] outline-none focus:border-[#605ca8] placeholder:text-[#9ca3af]"
            />
          </div>

          {/* Filter Button */}
          <button
            type="button"
            onClick={handleFilter}
            className="h-[34px] px-5 bg-[#605ca8] hover:bg-[#524d99] text-white text-[13px] font-medium rounded-[3px] transition-colors cursor-pointer"
          >
            Filter
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left text-[13px] border-collapse min-w-[950px]">
            <thead>
              <tr className="border-b border-[#dee2e6] text-[#2c333e] font-semibold text-[13px]">
                <th className="py-3 px-3 w-[70px]">Quote</th>
                <th className="py-3 px-3 min-w-[280px]">Product</th>
                <th className="py-3 px-3 w-[120px]">Buyer</th>
                <th className="py-3 px-3 w-[150px]">Status</th>
                <th className="py-3 px-3 w-[120px]">Seller&#39;s Bid</th>
                <th className="py-3 px-3 w-[120px]">Updated</th>
                <th className="py-3 px-3 w-[160px]">Date</th>
                <th className="py-3 px-3 w-[150px]">Options</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f3f5]">
              {filteredQuotes.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-[#6c757d] text-[13.5px]">
                    No records found!
                  </td>
                </tr>
              ) : (
                filteredQuotes.map((item) => (
                  <tr key={item.id} className="hover:bg-[#fafbfc] transition-colors">
                    {/* Quote ID */}
                    <td className="py-4 px-3 font-normal text-[#2c333e] font-sans align-top">
                      {item.quoteId}
                    </td>

                    {/* Product */}
                    <td className="py-4 px-3 align-top">
                      <div className="flex items-start gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image}
                          alt={item.productTitle}
                          className="w-[50px] h-[50px] rounded-[3px] object-cover border border-[#e9ecef] shrink-0"
                        />
                        <div className="flex flex-col">
                          <span className="text-[#2c333e] font-medium hover:text-[#00ab97] transition-colors cursor-pointer leading-tight mb-1 text-[13px]">
                            {item.productTitle}
                          </span>
                          {item.color && (
                            <span className="text-[12px] text-[#6c757d] leading-tight mb-0.5">
                              Color: {item.color}
                            </span>
                          )}
                          <span className="text-[12px] text-[#6c757d] leading-tight mb-0.5">
                            SKU: {item.productSku}
                          </span>
                          <span className="text-[12px] text-[#6c757d] leading-tight">
                            Quantity: {item.quantity}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Buyer */}
                    <td className="py-4 px-3 text-[#495057] align-top text-[13px]">
                      {item.buyer}
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-3 align-top">
                      {item.status === "Pending Quote" ? (
                        <span className="inline-block bg-[#f39c12] text-white text-[11px] font-medium px-2 py-0.5 rounded-[2px] leading-tight">
                          Pending Quote
                        </span>
                      ) : item.status === "Pending Payment" ? (
                        <span className="inline-block bg-[#00c0ef] text-white text-[11px] font-medium px-2 py-0.5 rounded-[2px] leading-tight">
                          Pending Payment
                        </span>
                      ) : item.status === "Completed" ? (
                        <span className="inline-block bg-[#605ca8] text-white text-[11px] font-medium px-2 py-0.5 rounded-[2px] leading-tight">
                          Completed
                        </span>
                      ) : item.status === "New Quote Request" ? (
                        <span className="inline-block bg-[#00ab97] text-white text-[11px] font-medium px-2 py-0.5 rounded-[2px] leading-tight">
                          New Quote Request
                        </span>
                      ) : (
                        <span className="inline-block bg-[#e9ecef] text-[#495057] text-[11px] font-medium px-2 py-0.5 rounded-[2px] leading-tight">
                          {item.status}
                        </span>
                      )}
                    </td>

                    {/* Seller's Bid */}
                    <td className="py-4 px-3 align-top">
                      {item.sellersBid ? (
                        <span className="inline-block bg-[#00ab97] text-white text-[11px] font-bold px-2 py-0.5 rounded-[2px] leading-tight">
                          {item.sellersBid}
                        </span>
                      ) : null}
                    </td>

                    {/* Updated */}
                    <td className="py-4 px-3 text-[#495057] text-[12.5px] align-top">
                      {item.updated}
                    </td>

                    {/* Date */}
                    <td className="py-4 px-3 text-[#495057] text-[12.5px] align-top">
                      {item.date}
                    </td>

                    {/* Options Button */}
                    <td className="py-4 px-3 align-top relative">
                      <div className="relative inline-block text-left">
                        <button
                          type="button"
                          onClick={() => setOpenMenuId(openMenuId === item.id ? null : item.id)}
                          className="inline-flex items-center justify-between gap-2 px-3 py-1.5 bg-[#605ca8] hover:bg-[#524d99] text-white text-[12px] font-medium rounded-[3px] transition-colors shadow-2xs cursor-pointer select-none"
                        >
                          <span>Select an option</span>
                          <span className="text-[10px]">▾</span>
                        </button>

                        {/* Dropdown Menu */}
                        {openMenuId === item.id && (
                          <div
                            ref={menuRef}
                            className="absolute right-0 top-full mt-1 w-44 bg-white border border-[#e9ecef] rounded-[3px] shadow-lg py-1 z-30 animate-in fade-in zoom-in-95 duration-100"
                          >
                            <button
                              type="button"
                              onClick={() => {
                                setOpenMenuId(null);
                                setSubmitModalQuote(item);
                                setBidAmount(item.sellersBid ? item.sellersBid.replace("$", "") : "");
                              }}
                              className="w-full text-left px-4 py-2 text-[12.5px] text-[#495057] hover:bg-[#f8f9fa] hover:text-[#2c333e] flex items-center gap-2 cursor-pointer transition-colors"
                            >
                              <Send className="w-3.5 h-3.5 text-[#00ab97]" />
                              <span>{item.sellersBid ? "Update Bid" : "Submit a Quote"}</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setOpenMenuId(null);
                                setDetailsModalQuote(item);
                              }}
                              className="w-full text-left px-4 py-2 text-[12.5px] text-[#495057] hover:bg-[#f8f9fa] hover:text-[#2c333e] flex items-center gap-2 cursor-pointer transition-colors"
                            >
                              <Info className="w-3.5 h-3.5 text-[#605ca8]" />
                              <span>View Details</span>
                            </button>

                            <div className="border-t border-[#f1f3f5] my-1" />

                            <button
                              type="button"
                              onClick={() => handleDeleteQuote(item.id)}
                              className="w-full text-left px-4 py-2 text-[12.5px] text-[#dc2626] hover:bg-[#fef2f2] flex items-center gap-2 cursor-pointer transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
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

        {/* Footer: Number of Entries */}
        <div className="pt-5 mt-2 border-t border-[#f1f3f5] text-[#495057] select-none">
          <span className="text-[12.5px] font-medium">
            Number of Entries: {filteredQuotes.length}
          </span>
        </div>
      </div>

      {/* Submit / Update Bid Modal */}
      {submitModalQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-[4px] shadow-2xl w-full max-w-md border border-[#e9ecef] overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#f1f3f5]">
              <h2 className="text-[16px] font-bold text-[#2c333e] font-sans">
                {submitModalQuote.sellersBid ? "Update Quote Bid" : "Submit a Quote"} ({submitModalQuote.quoteId})
              </h2>
              <button
                type="button"
                onClick={() => setSubmitModalQuote(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 p-3 bg-[#f8fafc] rounded-[3px] border border-[#e9ecef]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={submitModalQuote.image}
                  alt={submitModalQuote.productTitle}
                  className="w-12 h-12 object-cover rounded-[3px]"
                />
                <div className="text-xs">
                  <p className="font-semibold text-[#2c333e]">{submitModalQuote.productTitle}</p>
                  <p className="text-gray-500">Color: {submitModalQuote.color}</p>
                  <p className="text-gray-500">Requested Quantity: {submitModalQuote.quantity}</p>
                  <p className="text-gray-500">Buyer: {submitModalQuote.buyer}</p>
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-[#2c333e] mb-1.5 font-sans">
                  Your Bid Price ($)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 50 or 75,000"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="w-full h-[36px] border border-[#d1d5db] rounded-[3px] px-3 text-[13px] text-[#495057] outline-none focus:border-[#605ca8]"
                />
                <span className="text-[11px] text-gray-400 mt-1 block">
                  Enter your offered total price for the requested quantity.
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 px-6 py-3.5 bg-[#f8fafc] border-t border-[#f1f3f5]">
              <button
                type="button"
                onClick={() => setSubmitModalQuote(null)}
                className="px-4 py-2 border border-[#d1d5db] text-[#495057] text-xs font-semibold rounded-[3px] hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveBid}
                className="px-4 py-2 bg-[#00ab97] hover:bg-[#009180] text-white text-xs font-semibold rounded-[3px] transition-colors cursor-pointer"
              >
                Submit Bid
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quote Details Modal */}
      {detailsModalQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-[4px] shadow-2xl w-full max-w-md border border-[#e9ecef] overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#f1f3f5]">
              <h2 className="text-[16px] font-bold text-[#2c333e] font-sans">
                Quote Request Details ({detailsModalQuote.quoteId})
              </h2>
              <button
                type="button"
                onClick={() => setDetailsModalQuote(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-3 text-[13px]">
              <div className="flex items-center gap-3 p-3 bg-[#f8fafc] rounded-[3px] border border-[#e9ecef] mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={detailsModalQuote.image}
                  alt={detailsModalQuote.productTitle}
                  className="w-14 h-14 object-cover rounded-[3px]"
                />
                <div>
                  <h4 className="font-bold text-[#2c333e] text-sm">{detailsModalQuote.productTitle}</h4>
                  <p className="text-gray-500 text-xs">Color: {detailsModalQuote.color}</p>
                  <p className="text-gray-500 text-xs">SKU: {detailsModalQuote.productSku}</p>
                </div>
              </div>

              <div className="flex justify-between py-1.5 border-b border-[#f1f3f5]">
                <span className="text-gray-500">Quote ID:</span>
                <span className="font-semibold text-[#2c333e]">{detailsModalQuote.quoteId}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#f1f3f5]">
                <span className="text-gray-500">Buyer:</span>
                <span className="text-[#2c333e]">{detailsModalQuote.buyer}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#f1f3f5]">
                <span className="text-gray-500">Requested Quantity:</span>
                <span className="font-semibold text-[#2c333e]">{detailsModalQuote.quantity}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#f1f3f5]">
                <span className="text-gray-500">Status:</span>
                <span>
                  {detailsModalQuote.status === "Pending Quote" ? (
                    <span className="bg-[#f39c12] text-white text-[11px] font-medium px-2 py-0.5 rounded-[2px]">
                      Pending Quote
                    </span>
                  ) : detailsModalQuote.status === "Pending Payment" ? (
                    <span className="bg-[#00c0ef] text-white text-[11px] font-medium px-2 py-0.5 rounded-[2px]">
                      Pending Payment
                    </span>
                  ) : detailsModalQuote.status === "Completed" ? (
                    <span className="bg-[#605ca8] text-white text-[11px] font-medium px-2 py-0.5 rounded-[2px]">
                      Completed
                    </span>
                  ) : (
                    <span className="bg-[#e9ecef] text-[#495057] text-[11px] font-medium px-2 py-0.5 rounded-[2px]">
                      {detailsModalQuote.status}
                    </span>
                  )}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#f1f3f5]">
                <span className="text-gray-500">Seller&#39;s Bid:</span>
                <span className="font-bold text-[#00ab97]">
                  {detailsModalQuote.sellersBid || "No bid placed yet"}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#f1f3f5]">
                <span className="text-gray-500">Updated:</span>
                <span className="text-gray-600">{detailsModalQuote.updated}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-gray-500">Date:</span>
                <span className="text-gray-600">{detailsModalQuote.date}</span>
              </div>
            </div>

            <div className="flex items-center justify-end px-6 py-3.5 bg-[#f8fafc] border-t border-[#f1f3f5]">
              <button
                type="button"
                onClick={() => setDetailsModalQuote(null)}
                className="px-4 py-2 bg-[#00ab97] hover:bg-[#009180] text-white text-xs font-semibold rounded-[3px] transition-colors cursor-pointer"
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
