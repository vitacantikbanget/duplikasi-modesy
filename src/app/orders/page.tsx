"use client";

/**
 * ============================================================================
 * HALAMAN PESANAN PEMBELI / MEMBER (Customer Orders & Transactions Page)
 * ============================================================================
 * 
 * FUNGSI UTAMA:
 * Menampilkan daftar pesanan riwayat belanja pelanggan, penawaran harga
 * (Quote Requests), unduhan produk digital (Downloads), serta pengajuan
 * komplain / pengembalian dana (Refund Requests).
 * 
 * FITUR:
 * 1. Sidebar Navigasi Akun Pelanggan (Orders, Quote Requests, Downloads, Refund Requests).
 * 2. Daftar Pesanan Belanja (Order ID, Total Harga, Status Pembayaran/Pengiriman, Tanggal).
 * 3. Modal Rincian Pesanan (Detail Produk, Kurir, Resi Pelacakan, Tombol Cetak Invoice).
 * 4. Paginasi Halaman Pesanan.
 * 5. Tab Penawaran Harga (Quote Requests) dengan status tawaran dan tombol hapus.
 * 6. Tab Unduhan File Digital (Downloads) dengan rating bintang dan link unduh.
 * 7. Tab Pengembalian Dana (Refund Requests) dan tombol form klaim refund.
 */

import { useState } from "react";
import Link from "next/link";
import {
  ShoppingBasket,
  Tag,
  DownloadCloud,
  RotateCcw,
  Clock,
  Info,
  X,
  Printer,
  Download,
  Plus,
  Star,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Tipe data untuk baris pesanan belanja (Order item)
 */
interface OrderRow {
  id: string;               // ID pesanan unik
  orderNumber: string;      // Kode nomor order (e.g. #10049)
  total: string;            // Total nilai belanja
  status: "Pending Payment" | "Completed" | "Processing"; // Status pesanan
  date: string;             // Tanggal dan waktu pesanan
  carrier?: string;         // Nama kurir ekspedisi pengiriman
  trackingNumber?: string;  // Nomor resi pengiriman
  items?: {
    title: string;
    seller: string;
    price: string;
    qty: number;
    image: string;
  }[];
}

/**
 * Data mock riwayat pesanan (15 pesanan sesuai tampilan dashboard Modesy)
 */
const ALL_ORDERS: OrderRow[] = [
  {
    id: "10049",
    orderNumber: "#10049",
    total: "$304.75",
    status: "Pending Payment",
    date: "2026-10-20 / 10:36",
    items: [
      {
        title: "Women maxi floral skirt",
        seller: "Admin",
        price: "$45.00",
        qty: 2,
        image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=200&q=80",
      },
      {
        title: "Handcrafted decorative pillow",
        seller: "Admin",
        price: "$35.00",
        qty: 1,
        image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=200&q=80",
      }
    ]
  },
  {
    id: "10047",
    orderNumber: "#10047",
    total: "$33.35",
    status: "Completed",
    date: "2026-10-19 / 18:53",
    carrier: "J&T Express",
    trackingNumber: "JT-892104812",
    items: [
      {
        title: "Floral women sundress",
        seller: "Admin",
        price: "$29.00",
        qty: 1,
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=200&q=80",
      }
    ]
  },
  {
    id: "10046",
    orderNumber: "#10046",
    total: "$84.35",
    status: "Completed",
    date: "2026-10-17 / 19:08",
    carrier: "SiCepat REG",
    trackingNumber: "00293481029",
    items: [
      {
        title: "Women black leather handbag",
        seller: "Admin",
        price: "$75.00",
        qty: 1,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200&q=80",
      }
    ]
  },
  {
    id: "10045",
    orderNumber: "#10045",
    total: "$60.20",
    status: "Pending Payment",
    date: "2026-10-17 / 08:08",
  },
  {
    id: "10043",
    orderNumber: "#10043",
    total: "$1,519.45",
    status: "Pending Payment",
    date: "2026-10-14 / 19:49",
  },
  {
    id: "10040",
    orderNumber: "#10040",
    total: "$138",
    status: "Pending Payment",
    date: "2026-09-29 / 12:00",
  },
  {
    id: "10038",
    orderNumber: "#10038",
    total: "$381.85",
    status: "Pending Payment",
    date: "2026-09-28 / 22:48",
  },
  {
    id: "10035",
    orderNumber: "#10035",
    total: "$99.30",
    status: "Pending Payment",
    date: "2026-09-26 / 21:14",
  },
  {
    id: "10034",
    orderNumber: "#10034",
    total: "$256.50",
    status: "Pending Payment",
    date: "2026-09-25 / 06:11",
  },
  {
    id: "10031",
    orderNumber: "#10031",
    total: "$257",
    status: "Completed",
    date: "2026-09-23 / 02:08",
    carrier: "JNE Express",
    trackingNumber: "JNE-992104812",
  },
  {
    id: "10030",
    orderNumber: "#10030",
    total: "$253.90",
    status: "Pending Payment",
    date: "2026-09-23 / 02:04",
  },
  {
    id: "10029",
    orderNumber: "#10029",
    total: "$259.05",
    status: "Processing",
    date: "2026-09-22 / 06:40",
    carrier: "J&T Express",
    trackingNumber: "JT-10029384",
  },
  {
    id: "10028",
    orderNumber: "#10028",
    total: "$61.95",
    status: "Pending Payment",
    date: "2026-09-22 / 01:14",
  },
  {
    id: "10027",
    orderNumber: "#10027",
    total: "$137.25",
    status: "Pending Payment",
    date: "2026-09-20 / 01:19",
  },
  {
    id: "10025",
    orderNumber: "#10025",
    total: "₦149,479.73",
    status: "Processing",
    date: "2026-09-16 / 10:38",
  },
];

/**
 * Tipe data untuk penawaran harga khusus (Quote Request item)
 */
interface QuoteItem {
  id: string;
  quoteNumber: string;
  title: string;
  quantity: number;
  status: "New Quote Request" | "Pending Quote";
  timeAgo: string;
  image: string;
  bidPrice?: string;
}

/**
 * Data mock penawaran harga grosir / custom
 */
const QUOTES_DATA: QuoteItem[] = [
  {
    id: "q-10",
    quoteNumber: "#10",
    title: "Black gold fashion backpack",
    quantity: 8,
    status: "New Quote Request",
    timeAgo: "15 days ago",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&q=80",
  },
  {
    id: "q-8",
    quoteNumber: "#8",
    title: "Black fashion women backpack",
    quantity: 1,
    status: "New Quote Request",
    timeAgo: "19 days ago",
    image: "https://images.unsplash.com/photo-1546938576-6e6a64f317cc?w=200&q=80",
  },
  {
    id: "q-4",
    quoteNumber: "#4",
    title: "Black fashion women backpack",
    quantity: 1,
    status: "Pending Quote",
    bidPrice: "Rp131,864.40",
    timeAgo: "1 month ago",
    image: "https://images.unsplash.com/photo-1546938576-6e6a64f317cc?w=200&q=80",
  },
  {
    id: "q-2",
    quoteNumber: "#2",
    title: "Black gold fashion backpack",
    quantity: 1,
    status: "Pending Quote",
    bidPrice: "Rp1,236,228,750",
    timeAgo: "2 months ago",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&q=80",
  },
];

/**
 * Tipe data untuk berkas unduhan digital
 */
interface DownloadItem {
  id: string;
  title: string;
  seller: string;
  rating: number;
  image: string;
}

/**
 * Data mock unduhan produk digital yang telah dibeli
 */
const DOWNLOADS_DATA: DownloadItem[] = [
  {
    id: "dl-1",
    title: "Animal colorful digital prints",
    seller: "Trendshop",
    rating: 5,
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&q=80",
  },
  {
    id: "dl-2",
    title: "Animal colorful digital prints",
    seller: "Trendshop",
    rating: 5,
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&q=80",
  },
  {
    id: "dl-3",
    title: "Animal colorful digital prints",
    seller: "Trendshop",
    rating: 5,
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&q=80",
  },
  {
    id: "dl-4",
    title: "Infinite - Blog & Magazine Script",
    seller: "Trendshop",
    rating: 0,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&q=80",
  },
  {
    id: "dl-5",
    title: "Animation of popular vacation spots",
    seller: "Trendshop",
    rating: 5,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=200&q=80",
  },
  {
    id: "dl-6",
    title: "Animal colorful digital prints",
    seller: "Trendshop",
    rating: 5,
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&q=80",
  },
];

/**
 * Tipe data untuk pengajuan komplain & pengembalian dana
 */
interface RefundItem {
  id: string;
  orderNumber: string;
  productTitle: string;
  status: "Processing";
  timeAgo: string;
  image: string;
}

/**
 * Data mock pengajuan klaim pengembalian dana (Refund Requests)
 */
const REFUNDS_DATA: RefundItem[] = [
  {
    id: "rf-1",
    orderNumber: "#10029",
    productTitle: "Women kipling bailey saddle handbag",
    status: "Processing",
    timeAgo: "7 days ago",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&q=80",
  },
  {
    id: "rf-2",
    orderNumber: "#10011",
    productTitle: "Floral women sundress",
    status: "Processing",
    timeAgo: "7 days ago",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=200&q=80",
  },
];

export default function CustomerOrdersPage({
  initialTab = "orders"
}: {
  initialTab?: "orders" | "quotes" | "downloads" | "refunds"
} = {}) {
  // State untuk tab kategori yang sedang aktif
  const [activeTab, setActiveTab] = useState<"orders" | "quotes" | "downloads" | "refunds">(initialTab);
  // State modal order details
  const [selectedOrder, setSelectedOrder] = useState<OrderRow | null>(null);
  // State daftar quote requests
  const [quotesList, setQuotesList] = useState<QuoteItem[]>(QUOTES_DATA);
  // State nomor halaman paginasi
  const [page, setPage] = useState(1);

  // Handler menghapus penawaran harga
  const handleDeleteQuote = (id: string) => {
    setQuotesList((prev) => prev.filter((q) => q.id !== id));
  };

  // Helper mendapatkan judul halaman dinamis
  const getPageTitle = () => {
    switch (activeTab) {
      case "quotes":
        return "Quote Requests";
      case "downloads":
        return "Downloads";
      case "refunds":
        return "Refund Requests";
      default:
        return "Orders";
    }
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen pb-16 font-sans text-[#495057]">
      {/* 1. Breadcrumb Navigasi */}
      <div className="max-w-[1320px] mx-auto px-4 pt-5 pb-2">
        <nav className="text-[12px] text-[#868e96] flex items-center gap-1.5">
          <Link href="/" className="hover:text-[#00ab97] transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-[#495057]">{getPageTitle()}</span>
        </nav>
      </div>

      {/* 2. Container Halaman Utama */}
      <div className="max-w-[1320px] mx-auto px-4 pt-2">

        {/* Header judul halaman & tombol aksi pada tab Refund */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[20px] font-bold text-[#2c333e] leading-none">
            {getPageTitle()}
          </h1>

          {activeTab === "refunds" && (
            <button
              type="button"
              onClick={() => alert("Please select an eligible completed order to request a refund.")}
              className="px-4 py-2 bg-[#00ab97] hover:bg-[#009684] text-white text-[12px] font-semibold rounded-[2px] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Submit a Refund Request</span>
            </button>
          )}
        </div>

        <div className="flex flex-col md:flex-row items-start gap-6">

          {/* SIDEBAR NAVIGASI MENU (KIRI) */}
          <aside className="w-full md:w-[220px] shrink-0">
            <div className="bg-white border border-[#dee2e6] rounded-[2px] p-2 space-y-0.5">
              <button
                type="button"
                onClick={() => setActiveTab("orders")}
                className={cn(
                  "w-full px-3 py-2 rounded-[2px] text-[12px] flex items-center gap-2.5 transition-colors text-left cursor-pointer",
                  activeTab === "orders"
                    ? "bg-[#f1f3f5] text-[#2c333e] font-semibold"
                    : "text-[#6c757d] hover:bg-[#f8f9fa] hover:text-[#2c333e]"
                )}
              >
                <ShoppingBasket className="w-4 h-4 text-[#868e96]" />
                <span>Orders</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("quotes")}
                className={cn(
                  "w-full px-3 py-2 rounded-[2px] text-[12px] flex items-center gap-2.5 transition-colors text-left cursor-pointer",
                  activeTab === "quotes"
                    ? "bg-[#f1f3f5] text-[#2c333e] font-semibold"
                    : "text-[#6c757d] hover:bg-[#f8f9fa] hover:text-[#2c333e]"
                )}
              >
                <Tag className="w-4 h-4 text-[#868e96]" />
                <span>Quote Requests</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("downloads")}
                className={cn(
                  "w-full px-3 py-2 rounded-[2px] text-[12px] flex items-center gap-2.5 transition-colors text-left cursor-pointer",
                  activeTab === "downloads"
                    ? "bg-[#f1f3f5] text-[#2c333e] font-semibold"
                    : "text-[#6c757d] hover:bg-[#f8f9fa] hover:text-[#2c333e]"
                )}
              >
                <DownloadCloud className="w-4 h-4 text-[#868e96]" />
                <span>Downloads</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("refunds")}
                className={cn(
                  "w-full px-3 py-2 rounded-[2px] text-[12px] flex items-center gap-2.5 transition-colors text-left cursor-pointer",
                  activeTab === "refunds"
                    ? "bg-[#f1f3f5] text-[#2c333e] font-semibold"
                    : "text-[#6c757d] hover:bg-[#f8f9fa] hover:text-[#2c333e]"
                )}
              >
                <RotateCcw className="w-4 h-4 text-[#868e96]" />
                <span>Refund Requests</span>
              </button>
            </div>
          </aside>

          {/* AREA KONTEN UTAMA (KANAN) */}
          <main className="flex-1 min-w-0 w-full">

            {/* 1. KONTEN TAB: DAFTAR PESANAN (ORDERS) */}
            {activeTab === "orders" && (
              <div className="space-y-3">
                {ALL_ORDERS.map((order) => {
                  const isCompleted = order.status === "Completed";
                  const isProcessing = order.status === "Processing";

                  return (
                    <div
                      key={order.id}
                      className="bg-white border border-[#dee2e6] rounded-[2px] py-3.5 px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-gray-400 transition-colors"
                    >
                      {/* Nomor Pesanan */}
                      <div className="w-28 shrink-0 text-xs">
                        <span className="text-[#6c757d]">Order: </span>
                        <span className="font-bold text-[#2c333e]">{order.orderNumber}</span>
                      </div>

                      {/* Total Biaya Belanja */}
                      <div className="w-32 shrink-0 text-xs">
                        <span className="text-[#6c757d]">Total: </span>
                        <span className="font-bold text-[#2c333e]">{order.total}</span>
                      </div>

                      {/* Status Pembayaran & Pengiriman */}
                      <div className="w-36 shrink-0">
                        <span
                          className={cn(
                            "inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-[2px] text-center",
                            isCompleted
                              ? "bg-[#d3f9d8] text-[#2b8a3e]"
                              : isProcessing
                                ? "bg-[#e3fafc] text-[#0c8599]"
                                : "bg-[#f1f3f5] text-[#6c757d]"
                          )}
                        >
                          {order.status}
                        </span>
                      </div>

                      {/* Waktu Pesanan */}
                      <div className="w-44 shrink-0 flex items-center gap-1.5 text-xs text-[#6c757d]">
                        <Clock className="w-3 h-3 text-[#adb5bd]" />
                        <span>{order.date}</span>
                      </div>

                      {/* Tombol Rincian Order (Details) */}
                      <div className="shrink-0">
                        <button
                          type="button"
                          onClick={() => setSelectedOrder(order)}
                          className="bg-[#f8f9fa] hover:bg-[#e9ecef] text-[#495057] hover:text-[#2c333e] border border-[#dee2e6] text-xs font-semibold px-3 py-1 rounded-[2px] flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Info className="w-3 h-3 text-[#6c757d]" />
                          <span>Details</span>
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* Navigasi Paginasi Halaman */}
                <div className="flex items-center justify-center gap-1 pt-4 pb-2">
                  <button
                    type="button"
                    onClick={() => setPage(1)}
                    className={cn(
                      "w-8 h-8 rounded-[2px] text-xs font-semibold flex items-center justify-center border transition-colors cursor-pointer",
                      page === 1
                        ? "bg-[#00ab97] text-white border-[#00ab97]"
                        : "bg-white text-gray-700 border-[#dee2e6] hover:bg-gray-50"
                    )}
                  >
                    1
                  </button>
                  <button
                    type="button"
                    onClick={() => setPage(2)}
                    className={cn(
                      "w-8 h-8 rounded-[2px] text-xs font-semibold flex items-center justify-center border transition-colors cursor-pointer",
                      page === 2
                        ? "bg-[#00ab97] text-white border-[#00ab97]"
                        : "bg-white text-gray-700 border-[#dee2e6] hover:bg-gray-50"
                    )}
                  >
                    2
                  </button>
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.min(2, p + 1))}
                    className="w-8 h-8 rounded-[2px] text-xs font-semibold flex items-center justify-center border border-[#dee2e6] bg-white text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    &gt;
                  </button>
                </div>
              </div>
            )}

            {/* 2. KONTEN TAB: PENAWARAN HARGA (QUOTE REQUESTS) */}
            {activeTab === "quotes" && (
              <div className="space-y-3">
                {quotesList.map((quote) => {
                  const isNew = quote.status === "New Quote Request";

                  return (
                    <div
                      key={quote.id}
                      className="bg-white border border-[#dee2e6] rounded-[2px] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={quote.image}
                          alt={quote.title}
                          className="w-16 h-16 object-cover rounded-[2px] border border-gray-200 shrink-0"
                        />
                        <div className="space-y-1">
                          <div className="text-xs font-semibold text-[#2c333e]">
                            Quote: <span className="font-bold">{quote.quoteNumber}</span>
                          </div>
                          <div className="text-xs text-[#2c333e] font-medium">
                            {quote.title}
                          </div>
                          <div className="text-[11px] text-[#868e96]">
                            Quantity: {quote.quantity}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-xs">
                        <span
                          className={cn(
                            "inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-[2px] text-center",
                            isNew
                              ? "bg-[#e3fafc] text-[#0c8599]"
                              : "bg-[#fff9db] text-[#f08c00]"
                          )}
                        >
                          {quote.status}
                        </span>

                        {quote.bidPrice && (
                          <div className="text-xs">
                            <span className="text-[#6c757d]">Seller's Bid: </span>
                            <span className="font-bold text-[#2c333e]">{quote.bidPrice}</span>
                          </div>
                        )}

                        <div className="flex items-center gap-1 text-[11px] text-[#868e96]">
                          <Clock className="w-3 h-3 text-[#adb5bd]" />
                          <span>{quote.timeAgo}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDeleteQuote(quote.id)}
                          className="bg-[#f8f9fa] hover:bg-[#e9ecef] text-[#495057] hover:text-red-600 border border-[#dee2e6] text-xs font-semibold px-3 py-1.5 rounded-[2px] flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                          <span>Delete Quote</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* 3. KONTEN TAB: UNDUHAN PRODUK DIGITAL (DOWNLOADS) */}
            {activeTab === "downloads" && (
              <div className="space-y-3">
                {DOWNLOADS_DATA.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-[#dee2e6] rounded-[2px] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-[2px] border border-gray-200 shrink-0"
                      />
                      <div className="space-y-1">
                        <h4 className="text-xs font-semibold text-[#2c333e]">
                          {item.title}
                        </h4>
                        <div className="text-[11px] text-[#868e96]">
                          {item.seller}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-1.5 text-xs text-[#868e96]">
                        <span className="text-[11px]">Rate this product:</span>
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={cn(
                                "w-3 h-3",
                                item.rating >= star
                                  ? "fill-[#ffc107] text-[#ffc107]"
                                  : "fill-transparent text-[#ced4da]"
                              )}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="relative group">
                        <button
                          type="button"
                          onClick={() => alert(`Downloading "${item.title}" files...`)}
                          className="px-3 py-1.5 bg-[#00ab97] hover:bg-[#009684] text-white text-xs font-semibold rounded-[2px] flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Download className="w-3 h-3" />
                          <span>Download</span>
                          <ChevronDown className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 4. KONTEN TAB: PENGEMBALIAN DANA (REFUND REQUESTS) */}
            {activeTab === "refunds" && (
              <div className="space-y-3">
                {REFUNDS_DATA.map((rf) => (
                  <div
                    key={rf.id}
                    className="bg-white border border-[#dee2e6] rounded-[2px] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={rf.image}
                        alt={rf.productTitle}
                        className="w-16 h-16 object-cover rounded-[2px] border border-gray-200 shrink-0"
                      />
                      <div className="space-y-1">
                        <div className="text-xs font-semibold text-[#2c333e]">
                          Order: <span className="font-bold">{rf.orderNumber}</span>
                        </div>
                        <div className="text-xs text-[#495057] font-medium">
                          {rf.productTitle}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-5">
                      <span className="bg-[#e3fafc] text-[#0c8599] text-[11px] font-medium px-2.5 py-0.5 rounded-[2px]">
                        {rf.status}
                      </span>

                      <div className="flex items-center gap-1 text-[11px] text-[#868e96]">
                        <Clock className="w-3 h-3 text-[#adb5bd]" />
                        <span>{rf.timeAgo}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => alert(`Viewing refund details for order ${rf.orderNumber}`)}
                        className="bg-[#f8f9fa] hover:bg-[#e9ecef] text-[#495057] hover:text-[#2c333e] border border-[#dee2e6] text-xs font-semibold px-3 py-1 rounded-[2px] flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Info className="w-3 h-3 text-[#6c757d]" />
                        <span>Details</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </main>
        </div>
      </div>

      {/* 3. MODAL RINCIAN PESANAN (ORDER DETAILS MODAL) */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-2xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-[2px] max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 flex flex-col">

            {/* Header Modal */}
            <div className="p-4 border-b border-[#dee2e6] flex items-center justify-between sticky top-0 bg-white z-10">
              <div className="flex items-center gap-2">
                <ShoppingBasket className="w-4 h-4 text-[#00ab97]" />
                <h3 className="font-bold text-sm text-[#2c333e]">
                  Order Details: {selectedOrder.orderNumber}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Isi Konten Modal */}
            <div className="p-5 space-y-4 text-xs text-[#495057]">

              {/* Ringkasan Status & Total */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-[#f8f9fa] border border-[#dee2e6] rounded-[2px]">
                <div>
                  <span className="text-[11px] text-[#868e96] block">Order Date</span>
                  <span className="font-semibold text-gray-800">{selectedOrder.date}</span>
                </div>
                <div>
                  <span className="text-[11px] text-[#868e96] block">Total Amount</span>
                  <span className="font-bold text-[#00ab97]">{selectedOrder.total}</span>
                </div>
                <div>
                  <span className="text-[11px] text-[#868e96] block">Status</span>
                  <span className="font-semibold text-gray-800">{selectedOrder.status}</span>
                </div>
                <div>
                  <span className="text-[11px] text-[#868e96] block">Payment</span>
                  <span className="font-semibold text-gray-800">Modesy Escrow</span>
                </div>
              </div>

              {/* Rincian Produk yang Dibeli */}
              <div>
                <h4 className="font-bold text-xs text-[#2c333e] mb-2">Order Products</h4>
                <div className="border border-[#dee2e6] rounded-[2px] divide-y divide-[#dee2e6]">
                  {(selectedOrder.items || [
                    {
                      title: "Handcrafted decorative pillow for embroidered touch",
                      seller: "Admin",
                      price: selectedOrder.total,
                      qty: 1,
                      image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=200&q=80",
                    }
                  ]).map((item, idx) => (
                    <div key={idx} className="p-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-12 h-12 rounded-[2px] object-cover border border-gray-200 shrink-0"
                        />
                        <div>
                          <p className="font-semibold text-xs text-[#2c333e]">{item.title}</p>
                          <span className="text-[11px] text-gray-400">Seller: {item.seller} · Qty: {item.qty}</span>
                        </div>
                      </div>
                      <div className="font-bold text-xs text-gray-800">{item.price}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ekspedisi Pengiriman & Resi */}
              {selectedOrder.carrier && (
                <div className="p-3 bg-white border border-[#dee2e6] rounded-[2px]">
                  <h4 className="font-bold text-xs text-[#2c333e] mb-1">Shipping & Tracking</h4>
                  <p className="text-xs text-gray-600">
                    Carrier: <span className="font-semibold">{selectedOrder.carrier}</span> · Tracking: <code className="bg-gray-100 px-1 py-0.5 rounded font-mono">{selectedOrder.trackingNumber}</code>
                  </p>
                </div>
              )}

            </div>

            {/* Footer Modal: Tombol Cetak & Tutup */}
            <div className="p-4 border-t border-[#dee2e6] bg-[#f8f9fa] flex items-center justify-between">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-3 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded-[2px] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Invoice</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-1.5 bg-[#2c333e] hover:bg-[#1a1f26] text-white text-xs font-semibold rounded-[2px] transition-colors cursor-pointer"
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
