"use client";

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
  Truck, 
  CheckCircle2, 
  Package, 
  ChevronRight, 
  CreditCard,
  FileText,
  Download
} from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";

interface OrderItem {
  id: string;
  orderNumber: string;
  totalUsd: string;
  totalNumeric: number;
  status: "Processing" | "Completed" | "Cancelled";
  date: string;
  paymentMethod: string;
  trackingNumber?: string;
  carrier?: string;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    country: string;
    phone: string;
  };
  products: {
    id: string;
    title: string;
    seller: string;
    price: number;
    quantity: number;
    image: string;
  }[];
}

const ORDERS_DATA: OrderItem[] = [
  {
    id: "ord-1",
    orderNumber: "#10042",
    totalUsd: "$236.25",
    totalNumeric: 3543750,
    status: "Processing",
    date: "2026-10-12 / 19:26",
    paymentMethod: "Credit Card (Stripe)",
    carrier: "J&T Express",
    trackingNumber: "JT-984210984",
    shippingAddress: {
      name: "Daniel Jones",
      street: "Jl. Sudirman No. 42, Kebayoran Baru",
      city: "Jakarta Selatan 12190",
      country: "Indonesia",
      phone: "+62 812-3456-7890",
    },
    products: [
      {
        id: "p1",
        title: "Black midi skirt with white flowers",
        seller: "Trendshop",
        price: 791186.40,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&q=80",
      },
      {
        id: "p4",
        title: "Sun hat for women protection cap",
        seller: "Trendshop",
        price: 435000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?w=300&q=80",
      },
    ],
  },
  {
    id: "ord-2",
    orderNumber: "#10033",
    totalUsd: "$191.10",
    totalNumeric: 2866500,
    status: "Completed",
    date: "2026-09-23 / 17:23",
    paymentMethod: "Modesy Wallet",
    carrier: "SiCepat REG",
    trackingNumber: "00293481239",
    shippingAddress: {
      name: "Daniel Jones",
      street: "Jl. Sudirman No. 42, Kebayoran Baru",
      city: "Jakarta Selatan 12190",
      country: "Indonesia",
      phone: "+62 812-3456-7890",
    },
    products: [
      {
        id: "p5",
        title: "Light blue women shirt",
        seller: "Trendshop",
        price: 807669.45,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=300&q=80",
      },
      {
        id: "p8",
        title: "Colorful women scarves",
        seller: "Trendshop",
        price: 659322.00,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=300&q=80",
      },
    ],
  },
  {
    id: "ord-3",
    orderNumber: "#10018",
    totalUsd: "$149.50",
    totalNumeric: 2242500,
    status: "Processing",
    date: "2026-09-09 / 05:59",
    paymentMethod: "Bank Transfer (BCA)",
    carrier: "JNE Regular",
    trackingNumber: "JNE-882194812",
    shippingAddress: {
      name: "Daniel Jones",
      street: "Jl. Sudirman No. 42, Kebayoran Baru",
      city: "Jakarta Selatan 12190",
      country: "Indonesia",
      phone: "+62 812-3456-7890",
    },
    products: [
      {
        id: "p6",
        title: "Summer fashion top lace",
        seller: "Trendshop",
        price: 1071398.25,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=300&q=80",
      },
    ],
  },
  {
    id: "ord-4",
    orderNumber: "#10009",
    totalUsd: "$115",
    totalNumeric: 1725000,
    status: "Processing",
    date: "2026-08-05 / 14:06",
    paymentMethod: "Credit Card",
    carrier: "Anteraja",
    trackingNumber: "10002938194",
    shippingAddress: {
      name: "Daniel Jones",
      street: "Jl. Sudirman No. 42, Kebayoran Baru",
      city: "Jakarta Selatan 12190",
      country: "Indonesia",
      phone: "+62 812-3456-7890",
    },
    products: [
      {
        id: "p7",
        title: "Blanket comfort couch pillow",
        seller: "Trendshop",
        price: 585000,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?w=300&q=80",
      },
    ],
  },
  {
    id: "ord-5",
    orderNumber: "#10006",
    totalUsd: "$178",
    totalNumeric: 2670000,
    status: "Completed",
    date: "2026-08-05 / 13:47",
    paymentMethod: "Modesy Wallet",
    carrier: "J&T Express",
    trackingNumber: "JT-192847291",
    shippingAddress: {
      name: "Daniel Jones",
      street: "Jl. Sudirman No. 42, Kebayoran Baru",
      city: "Jakarta Selatan 12190",
      country: "Indonesia",
      phone: "+62 812-3456-7890",
    },
    products: [
      {
        id: "p3",
        title: "Sneaker shoes men",
        seller: "Trendshop",
        price: 1466991.45,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=300&q=80",
      },
    ],
  },
  {
    id: "ord-6",
    orderNumber: "#10005",
    totalUsd: "$60.77",
    totalNumeric: 911550,
    status: "Completed",
    date: "2026-08-05 / 13:45",
    paymentMethod: "Credit Card (Mastercard)",
    carrier: "JNE Express",
    trackingNumber: "JNE-994821049",
    shippingAddress: {
      name: "Daniel Jones",
      street: "Jl. Sudirman No. 42, Kebayoran Baru",
      city: "Jakarta Selatan 12190",
      country: "Indonesia",
      phone: "+62 812-3456-7890",
    },
    products: [
      {
        id: "p11",
        title: "Animal colorful digital prints",
        seller: "Trendshop",
        price: 642838.95,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=300&q=80",
      },
    ],
  },
  {
    id: "ord-7",
    orderNumber: "#10004",
    totalUsd: "$160",
    totalNumeric: 2400000,
    status: "Completed",
    date: "2026-08-05 / 13:19",
    paymentMethod: "Bank Transfer",
    carrier: "SiCepat BEST",
    trackingNumber: "00192837461",
    shippingAddress: {
      name: "Daniel Jones",
      street: "Jl. Sudirman No. 42, Kebayoran Baru",
      city: "Jakarta Selatan 12190",
      country: "Indonesia",
      phone: "+62 812-3456-7890",
    },
    products: [
      {
        id: "p9",
        title: "Navy polka dot dress",
        seller: "Trendshop",
        price: 472457.50,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&q=80",
      },
    ],
  },
];

const QUOTE_REQUESTS = [
  {
    id: "qr-1",
    quoteNumber: "#QR-802",
    productTitle: "Custom Handcrafted Wood Furniture",
    seller: "Admin Store",
    quantity: 10,
    status: "Approved",
    offeredPrice: "$450.00",
    date: "2026-10-08 / 11:20",
  },
  {
    id: "qr-2",
    quoteNumber: "#QR-791",
    productTitle: "Sun hat for women protection cap (Wholesale 50 pcs)",
    seller: "Trendshop",
    quantity: 50,
    status: "Pending",
    offeredPrice: "$750.00",
    date: "2026-09-15 / 14:40",
  },
];

const DIGITAL_DOWNLOADS = [
  {
    id: "dl-1",
    title: "Animation of popular vacation spots motion pack",
    seller: "Trendshop",
    fileSize: "842 MB",
    licenseKey: "MOD-VAC-984210-AE",
    orderNumber: "#10001",
    downloadUrl: "#",
    date: "2026-08-01",
  },
  {
    id: "dl-2",
    title: "Animal colorful digital prints poster set",
    seller: "Trendshop",
    fileSize: "120 MB",
    licenseKey: "MOD-PRT-284918-HR",
    orderNumber: "#10005",
    downloadUrl: "#",
    date: "2026-08-05",
  },
];

const REFUND_REQUESTS = [
  {
    id: "rf-1",
    refundNumber: "#RF-409",
    orderNumber: "#10002",
    productTitle: "Vintage Genuine Leather Belt",
    reason: "Damaged packaging upon arrival",
    amount: "$45.00",
    status: "Completed - Refunded",
    date: "2026-07-20 / 10:15",
  },
];

export default function CustomerOrdersPage() {
  const [activeTab, setActiveTab] = useState<"orders" | "quotes" | "downloads" | "refunds">("orders");
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const { formatPrice, currency } = useAppContext();

  return (
    <div className="bg-[#fcfcfc] min-h-screen pb-16 font-sans text-[#495057]">
      {/* 1. Breadcrumb */}
      <div className="bg-white border-b border-[#e9ecef]">
        <div className="max-w-[1320px] mx-auto px-4 py-3 flex items-center text-xs text-[#6c757d]">
          <Link href="/" className="hover:text-[#00ab97] transition-colors">
            Home
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-[#2c333e] font-medium">Orders</span>
        </div>
      </div>

      {/* 2. Container */}
      <div className="max-w-[1320px] mx-auto px-4 py-8">
        
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-[#2c333e] mb-6">Orders</h1>

        <div className="flex flex-col md:flex-row items-start gap-8">
          
          {/* LEFT SIDEBAR NAVIGATION */}
          <aside className="w-full md:w-[240px] shrink-0">
            <div className="bg-white border border-[#e9ecef] rounded-[4px] p-2 space-y-1">
              <button
                type="button"
                onClick={() => setActiveTab("orders")}
                className={cn(
                  "w-full px-3.5 py-2.5 rounded-[3px] text-xs font-semibold flex items-center gap-2.5 transition-colors text-left cursor-pointer",
                  activeTab === "orders"
                    ? "bg-[#f1f3f5] text-[#2c333e]"
                    : "text-[#495057] hover:bg-[#f8f9fa] hover:text-[#2c333e]"
                )}
              >
                <ShoppingBasket className="w-4 h-4 text-[#6c757d]" />
                <span>Orders</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("quotes")}
                className={cn(
                  "w-full px-3.5 py-2.5 rounded-[3px] text-xs font-semibold flex items-center gap-2.5 transition-colors text-left cursor-pointer",
                  activeTab === "quotes"
                    ? "bg-[#f1f3f5] text-[#2c333e]"
                    : "text-[#495057] hover:bg-[#f8f9fa] hover:text-[#2c333e]"
                )}
              >
                <Tag className="w-4 h-4 text-[#6c757d]" />
                <span>Quote Requests</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("downloads")}
                className={cn(
                  "w-full px-3.5 py-2.5 rounded-[3px] text-xs font-semibold flex items-center gap-2.5 transition-colors text-left cursor-pointer",
                  activeTab === "downloads"
                    ? "bg-[#f1f3f5] text-[#2c333e]"
                    : "text-[#495057] hover:bg-[#f8f9fa] hover:text-[#2c333e]"
                )}
              >
                <DownloadCloud className="w-4 h-4 text-[#6c757d]" />
                <span>Downloads</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("refunds")}
                className={cn(
                  "w-full px-3.5 py-2.5 rounded-[3px] text-xs font-semibold flex items-center gap-2.5 transition-colors text-left cursor-pointer",
                  activeTab === "refunds"
                    ? "bg-[#f1f3f5] text-[#2c333e]"
                    : "text-[#495057] hover:bg-[#f8f9fa] hover:text-[#2c333e]"
                )}
              >
                <RotateCcw className="w-4 h-4 text-[#6c757d]" />
                <span>Refund Requests</span>
              </button>
            </div>
          </aside>

          {/* RIGHT CONTENT AREA */}
          <main className="flex-1 min-w-0 w-full">
            
            {/* TAB: ORDERS */}
            {activeTab === "orders" && (
              <div className="space-y-3">
                {ORDERS_DATA.map((order) => {
                  const isCompleted = order.status === "Completed";

                  return (
                    <div
                      key={order.id}
                      className="bg-white border border-[#e9ecef] rounded-[4px] py-4 px-5 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:border-gray-300 hover:shadow-xs"
                    >
                      {/* 1. Order Number */}
                      <div className="w-32 shrink-0">
                        <span className="text-xs font-semibold text-[#2c333e]">
                          Order: <span className="text-gray-900">{order.orderNumber}</span>
                        </span>
                      </div>

                      {/* 2. Total */}
                      <div className="w-36 shrink-0">
                        <span className="text-xs text-[#6c757d]">
                          Total:{" "}
                          <span className="font-bold text-[#2c333e]">
                            {currency.code === "USD" ? order.totalUsd : formatPrice(order.totalNumeric)}
                          </span>
                        </span>
                      </div>

                      {/* 3. Status Badge */}
                      <div className="w-28 shrink-0">
                        <span
                          className={cn(
                            "inline-block text-[11px] font-semibold px-3 py-0.5 rounded-[3px] text-center",
                            isCompleted
                              ? "bg-[#ebfbee] text-[#2b8a3e]"
                              : "bg-[#e3fafc] text-[#0c8599]"
                          )}
                        >
                          {order.status}
                        </span>
                      </div>

                      {/* 4. Date & Time */}
                      <div className="w-44 shrink-0 flex items-center gap-1.5 text-xs text-[#6c757d]">
                        <Clock className="w-3.5 h-3.5 text-[#adb5bd]" />
                        <span>{order.date}</span>
                      </div>

                      {/* 5. Details Action */}
                      <div className="shrink-0">
                        <button
                          type="button"
                          onClick={() => setSelectedOrder(order)}
                          className="bg-[#f1f3f5] hover:bg-[#e9ecef] text-[#495057] hover:text-[#2c333e] text-xs font-semibold px-3.5 py-1.5 rounded-[4px] flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Info className="w-3.5 h-3.5 text-[#6c757d]" />
                          <span>Details</span>
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

            {/* TAB: QUOTE REQUESTS */}
            {activeTab === "quotes" && (
              <div className="bg-white border border-[#e9ecef] rounded-[4px] divide-y divide-gray-100">
                {QUOTE_REQUESTS.map((quote) => (
                  <div key={quote.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-[#2c333e]">{quote.quoteNumber}</span>
                        <span className={cn(
                          "text-[10px] font-bold px-2 py-0.5 rounded",
                          quote.status === "Approved" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                        )}>
                          {quote.status}
                        </span>
                      </div>
                      <h4 className="text-xs font-medium text-gray-800 mt-1">{quote.productTitle}</h4>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        Seller: <span className="text-[#00ab97] font-semibold">{quote.seller}</span> · Qty: {quote.quantity} pcs
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-xs font-bold text-gray-900 block">{quote.offeredPrice}</span>
                        <span className="text-[11px] text-gray-400">{quote.date}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => alert(`Quote ${quote.quoteNumber} offers ${quote.offeredPrice}`)}
                        className="px-3 py-1.5 bg-[#f1f3f5] hover:bg-[#e9ecef] text-xs font-semibold text-gray-700 rounded transition-colors"
                      >
                        View Quote
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: DOWNLOADS */}
            {activeTab === "downloads" && (
              <div className="bg-white border border-[#e9ecef] rounded-[4px] divide-y divide-gray-100">
                {DIGITAL_DOWNLOADS.map((item) => (
                  <div key={item.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">{item.title}</h4>
                      <p className="text-[11px] text-gray-500 mt-1">
                        Seller: <span className="text-[#00ab97] font-semibold">{item.seller}</span> · File Size: {item.fileSize}
                      </p>
                      <div className="mt-1.5 flex items-center gap-2">
                        <span className="text-[11px] text-gray-400">License Key:</span>
                        <code className="bg-gray-100 px-2 py-0.5 rounded text-[11px] text-gray-800 font-mono select-all">
                          {item.licenseKey}
                        </code>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => alert(`Starting download for ${item.title}...`)}
                      className="px-4 py-2 bg-[#00ab97] hover:bg-[#009684] text-white text-xs font-semibold rounded flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download File</span>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: REFUND REQUESTS */}
            {activeTab === "refunds" && (
              <div className="bg-white border border-[#e9ecef] rounded-[4px] divide-y divide-gray-100">
                {REFUND_REQUESTS.map((rf) => (
                  <div key={rf.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-[#2c333e]">{rf.refundNumber}</span>
                        <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded">
                          {rf.status}
                        </span>
                      </div>
                      <h4 className="text-xs font-medium text-gray-800 mt-1">{rf.productTitle}</h4>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        Order Ref: <span className="font-semibold text-gray-700">{rf.orderNumber}</span> · Reason: {rf.reason}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-emerald-600 block">{rf.amount}</span>
                      <span className="text-[11px] text-gray-400">{rf.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </main>

        </div>
      </div>

      {/* 3. ORDER DETAILS MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[4px] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border border-gray-200 flex flex-col">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-[#e9ecef] flex items-center justify-between sticky top-0 bg-white z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#f1f3f5] rounded text-gray-700">
                  <ShoppingBasket className="w-5 h-5 text-[#00ab97]" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#2c333e] leading-tight">
                    Order Details: {selectedOrder.orderNumber}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                    <span>{selectedOrder.date}</span>
                    <span>•</span>
                    <span className={cn(
                      "font-semibold",
                      selectedOrder.status === "Completed" ? "text-emerald-600" : "text-[#0c8599]"
                    )}>
                      {selectedOrder.status}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-gray-700 p-1.5 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 text-xs text-[#495057]">
              
              {/* Products in this order */}
              <div>
                <h4 className="font-bold text-xs text-gray-900 uppercase tracking-wider mb-3">
                  Items Purchased ({selectedOrder.products.length})
                </h4>
                <div className="border border-[#e9ecef] rounded-[3px] divide-y divide-gray-100 overflow-hidden">
                  {selectedOrder.products.map((item) => (
                    <div key={item.id} className="p-3.5 flex items-center gap-3.5 bg-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-14 h-14 rounded object-cover border border-gray-100 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="font-semibold text-xs text-gray-900 truncate">{item.title}</h5>
                        <p className="text-[11px] text-gray-500 mt-0.5">
                          Sold by: <span className="text-[#00ab97] font-medium">{item.seller}</span>
                        </p>
                        <p className="text-[11px] text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-bold text-xs text-gray-900 block">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {formatPrice(item.price)} each
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping & Payment Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Shipping Details */}
                <div className="p-4 border border-[#e9ecef] rounded-[3px] bg-[#fcfcfc] space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-gray-900">
                    <Truck className="w-4 h-4 text-[#00ab97]" />
                    <span>Shipping Address</span>
                  </div>
                  <div className="text-xs text-gray-600 leading-relaxed">
                    <p className="font-semibold text-gray-800">{selectedOrder.shippingAddress.name}</p>
                    <p>{selectedOrder.shippingAddress.street}</p>
                    <p>{selectedOrder.shippingAddress.city}</p>
                    <p>{selectedOrder.shippingAddress.country}</p>
                    <p className="text-gray-400 mt-1">{selectedOrder.shippingAddress.phone}</p>
                  </div>
                  {selectedOrder.trackingNumber && (
                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                      <span className="text-gray-500">Tracking:</span>
                      <span className="font-mono font-semibold text-gray-800">{selectedOrder.trackingNumber}</span>
                    </div>
                  )}
                </div>

                {/* Payment Summary */}
                <div className="p-4 border border-[#e9ecef] rounded-[3px] bg-[#fcfcfc] space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-gray-900">
                    <CreditCard className="w-4 h-4 text-[#00ab97]" />
                    <span>Payment Information</span>
                  </div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Payment Method:</span>
                      <span className="font-semibold text-gray-800">{selectedOrder.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Payment Status:</span>
                      <span className="text-emerald-600 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Paid
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-100 font-bold text-gray-900">
                      <span>Order Total:</span>
                      <span className="text-sm text-[#00ab97]">
                        {currency.code === "USD" ? selectedOrder.totalUsd : formatPrice(selectedOrder.totalNumeric)}
                      </span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#e9ecef] bg-gray-50 flex items-center justify-between">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 border border-gray-300 rounded text-xs font-semibold text-gray-700 hover:bg-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Invoice</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2 bg-[#00ab97] hover:bg-[#009684] text-white rounded text-xs font-semibold transition-colors cursor-pointer"
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
