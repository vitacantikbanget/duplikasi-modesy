"use client";

import { useState, useEffect } from "react";
import {
  ShoppingCart,
  ShoppingBag,
  EyeOff,
  Users,
  Minus,
  X,
  ArrowRight,
  Star,
  ShieldAlert,
  PackageCheck,
  AlertTriangle,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { useAppContext } from "@/contexts/AppContext";
import { fetchAdminProducts, AdminProductItem } from "@/lib/moderation";
import { createClient } from "@/lib/supabase/client";

const StatCard = ({
  title,
  value,
  icon: Icon,
  colorClass,
  href = "#",
  showMoreInfo = true,
}: {
  title: string;
  value: string | number;
  icon: any;
  colorClass: string;
  href?: string;
  showMoreInfo?: boolean;
}) => (
  <div
    className={`rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] text-white overflow-hidden flex flex-col relative ${colorClass}`}
  >
    <div className="p-5 flex justify-between items-start relative min-h-[95px]">
      <div className="z-10">
        <h3 className="text-[38px] font-bold leading-none mb-2">{value}</h3>
        <p className="text-[15px]">{title}</p>
      </div>
      <Icon className="w-18 h-18 absolute -right-1 bottom-1 opacity-20 transform pointer-events-none" />
    </div>
    {showMoreInfo && (
      <Link
        href={href}
        className="bg-black/10 hover:bg-black/15 py-1.5 flex justify-center items-center text-sm transition-colors z-10"
      >
        More info <ArrowRight className="w-4 h-4 ml-1" />
      </Link>
    )}
  </div>
);

const WidgetPanel = ({
  title,
  children,
  showViewAll = true,
  viewAllHref = "#",
}: {
  title: string;
  children: React.ReactNode;
  showViewAll?: boolean;
  viewAllHref?: string;
}) => (
  <div className="bg-white shadow-[0_1px_1px_rgba(0,0,0,0.1)] rounded-[3px] border-t-[3px] border-transparent flex flex-col h-full relative">
    <div className="px-2.5 py-2.5 border-b border-[#f4f4f4] flex justify-between items-center">
      <h3 className="text-gray-700 text-[15px] font-normal">{title}</h3>
      <div className="flex space-x-1 text-gray-400">
        <button className="p-1 hover:bg-gray-100 rounded text-gray-500">
          <Minus className="w-3.5 h-3.5" />
        </button>
        <button className="p-1 hover:bg-gray-100 rounded text-gray-500">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
    <div className="p-0 flex-1 overflow-y-auto max-h-[350px] scrollbar-thin scrollbar-thumb-gray-300">
      {children}
    </div>
    {showViewAll && (
      <div className="p-3 border-t border-[#f4f4f4] bg-white flex justify-end">
        <Link
          href={viewAllHref}
          className="text-xs bg-[#f4f4f4] border border-[#ddd] text-[#444] px-3 py-1 hover:bg-[#e7e7e7] transition-colors rounded-[3px]"
        >
          View All
        </Link>
      </div>
    )}
  </div>
);

export default function AdminDashboard() {
  const { role, userProfile } = useAppContext();
  const isModerator = role === "moderator";

  const [pendingProducts, setPendingProducts] = useState<AdminProductItem[]>([]);
  const [totalProducts, setTotalProducts] = useState(47);
  const [abuseCount, setAbuseCount] = useState(2);

  useEffect(() => {
    async function load() {
      try {
        const prods = await fetchAdminProducts();
        const pending = prods.filter((p) => !p.isApproved && p.isActive);
        setPendingProducts(pending);
        setTotalProducts(prods.length > 0 ? prods.length : 47);

        // Fetch abuse count
        const supabase = createClient();
        const { count } = await supabase
          .from("abuse_reports")
          .select("id", { count: "exact", head: true })
          .eq("status", "pending");
        if (count !== null) setAbuseCount(count);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      }
    }
    load();
  }, []);

  const pendingCount = pendingProducts.length;

  return (
    <div className="space-y-4">
      {/* Stats Cards: Dynamic depending on role */}
      {isModerator ? (
        /* MODERATOR STATS (Matching Official Modesy 100%: 2 wide cards, no 'More info' bar) */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StatCard
            title="Products"
            value={totalProducts}
            icon={ShoppingBag}
            colorClass="bg-[#605ca8]"
            href="/admin/products"
            showMoreInfo={false}
          />
          <StatCard
            title="Pending Products"
            value={pendingCount}
            icon={EyeOff}
            colorClass="bg-[#dd4b39]"
            href="/admin/pending-products"
            showMoreInfo={false}
          />
        </div>
      ) : (
        /* SUPER ADMIN STATS (Full System View) */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Orders"
            value="41"
            icon={ShoppingCart}
            colorClass="bg-[#00a65a]"
            href="/admin/orders"
          />
          <StatCard
            title="Products"
            value={totalProducts}
            icon={ShoppingBag}
            colorClass="bg-[#605ca8]"
            href="/admin/products"
          />
          <StatCard
            title="Pending Products"
            value={pendingCount}
            icon={EyeOff}
            colorClass="bg-[#dd4b39]"
            href="/admin/pending-products"
          />
          <StatCard
            title="Members"
            value="15"
            icon={Users}
            colorClass="bg-[#f39c12]"
            href="/admin/users"
          />
        </div>
      )}

      {/* Dynamic Widget Panels */}
      {isModerator ? (
        /* ========================================================================= */
        /* MODERATOR OVERVIEW (Exact match to Official Modesy Moderator Dashboard)    */
        /* 3 Full-Width Stacked Boxes: Latest Products, Latest Pending, Transactions */
        /* ========================================================================= */
        <div className="space-y-4">
          {/* Box 1: Latest Products (Full-width, scrollable, exactly matching screenshot) */}
          <WidgetPanel
            title="Latest Products"
            viewAllHref="/admin/products"
          >
            <table className="w-full text-[13px] text-left text-gray-700 m-0 border-collapse">
              <thead className="border-b border-[#f4f4f4] bg-white">
                <tr>
                  <th className="px-4 py-2 font-bold w-16 text-center text-[#333]">
                    Id
                  </th>
                  <th className="px-4 py-2 font-bold text-[#333]">
                    Name
                  </th>
                  <th className="px-4 py-2 font-bold text-right text-[#333] w-24">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    id: "47",
                    name: "Colorful women scarves",
                    date: "3 months ago",
                    img: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=150&h=150&fit=crop",
                  },
                  {
                    id: "46",
                    name: "Women's ankle boot with different colors",
                    date: "3 months ago",
                    img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=150&h=150&fit=crop",
                  },
                  {
                    id: "45",
                    name: "Navy polka dot dress",
                    date: "3 months ago",
                    img: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=150&h=150&fit=crop",
                  },
                  {
                    id: "44",
                    name: "Vintage Oversized Denim Jacket 90s",
                    date: "3 months ago",
                    img: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=150&h=150&fit=crop",
                  },
                  {
                    id: "43",
                    name: "Handcrafted Ceramic Artisan Coffee Mug",
                    date: "3 months ago",
                    img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=150&h=150&fit=crop",
                  },
                  {
                    id: "42",
                    name: "Wireless Noise Cancelling Studio Pro Headphones",
                    date: "3 months ago",
                    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop",
                  },
                  {
                    id: "41",
                    name: "Natural Organic Cotton Canvas Tote Bag",
                    date: "3 months ago",
                    img: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=150&h=150&fit=crop",
                  },
                ].map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-[#f4f4f4] hover:bg-[#f9f9f9]"
                  >
                    <td className="px-4 py-3 align-middle text-center text-gray-600 font-medium">
                      {product.id}
                    </td>
                    <td className="px-4 py-3 align-middle">
                      <div className="flex items-center">
                        <img
                          src={product.img}
                          alt={product.name}
                          className="w-[45px] h-[45px] object-cover shadow-xs mr-3 border border-gray-200 shrink-0"
                        />
                        <div>
                          <Link
                            href="/admin/products"
                            className="text-[#3c8dbc] hover:text-[#72afd2] font-normal leading-snug block mb-0.5"
                          >
                            {product.name}
                          </Link>
                          <span className="text-[#999] text-[11px] block">
                            {product.date}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right align-middle">
                      <Link
                        href="/admin/products"
                        className="bg-[#00c0ef] text-white text-[11px] font-bold px-2.5 py-[3px] rounded-[3px] hover:bg-[#00acd6] inline-block shadow-xs"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </WidgetPanel>

          {/* Box 2: Latest Pending Products (Full-width, matching official Modesy structure) */}
          <WidgetPanel
            title="Latest Pending Products"
            viewAllHref="/admin/pending-products"
          >
            <table className="w-full text-[13px] text-left text-gray-700 m-0 border-collapse">
              <thead className="border-b border-[#f4f4f4] bg-white">
                <tr>
                  <th className="px-4 py-2 font-bold w-16 text-center text-[#333]">
                    Id
                  </th>
                  <th className="px-4 py-2 font-bold text-[#333]">
                    Name
                  </th>
                  <th className="px-4 py-2 font-bold text-right text-[#333] w-24">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {pendingProducts.length === 0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-4 py-8 text-center text-gray-400 border-b border-[#f4f4f4]"
                    >
                      No records found
                    </td>
                  </tr>
                ) : (
                  pendingProducts.map((p, idx) => (
                    <tr
                      key={p.id}
                      className="border-b border-[#f4f4f4] hover:bg-[#f9f9f9]"
                    >
                      <td className="px-4 py-3 align-middle text-center text-gray-600 font-medium">
                        {idx + 1}
                      </td>
                      <td className="px-4 py-3 align-middle">
                        <div className="flex items-center">
                          <img
                            src={p.imageUrl}
                            alt={p.title}
                            className="w-[45px] h-[45px] object-cover shadow-xs mr-3 border border-gray-200 shrink-0"
                          />
                          <div>
                            <Link
                              href="/admin/pending-products"
                              className="text-[#3c8dbc] hover:text-[#72afd2] font-normal leading-snug block mb-0.5"
                            >
                              {p.title}
                            </Link>
                            <span className="text-[#999] text-[11px] block">
                              {p.vendorName} • {p.category}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right align-middle">
                        <Link
                          href="/admin/pending-products"
                          className="bg-[#00c0ef] text-white text-[11px] font-bold px-2.5 py-[3px] rounded-[3px] hover:bg-[#00acd6] inline-block shadow-xs"
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </WidgetPanel>

          {/* Box 3: Latest Transactions (Featured Products) (Full-width, matching official Modesy) */}
          <WidgetPanel
            title="Latest Transactions (Featured Products)"
            viewAllHref="/admin/transactions"
          >
            <table className="w-full text-[13px] text-left text-gray-700 m-0 border-collapse">
              <thead className="border-b border-[#f4f4f4] bg-white">
                <tr>
                  <th className="px-4 py-2 font-bold w-16 text-center text-[#333]">
                    Id
                  </th>
                  <th className="px-4 py-2 font-bold text-[#333]">
                    Transaction Id
                  </th>
                  <th className="px-4 py-2 font-bold text-[#333]">
                    User
                  </th>
                  <th className="px-4 py-2 font-bold text-[#333]">
                    Total
                  </th>
                  <th className="px-4 py-2 font-bold text-[#333]">
                    Payment Method
                  </th>
                  <th className="px-4 py-2 font-bold text-[#333]">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    id: "1",
                    trxId: "trx_65019348",
                    user: "Roger Novak",
                    total: "$15.00",
                    method: "Stripe",
                    date: "3 months ago",
                  },
                  {
                    id: "2",
                    trxId: "trx_64910284",
                    user: "John Doe",
                    total: "$25.00",
                    method: "PayPal",
                    date: "3 months ago",
                  },
                  {
                    id: "3",
                    trxId: "trx_64820194",
                    user: "Emma Stone",
                    total: "$15.00",
                    method: "Stripe",
                    date: "3 months ago",
                  },
                  {
                    id: "4",
                    trxId: "trx_64730199",
                    user: "Alex Rivera",
                    total: "$30.00",
                    method: "Bank Transfer",
                    date: "3 months ago",
                  },
                ].map((trx) => (
                  <tr
                    key={trx.id}
                    className="border-b border-[#f4f4f4] hover:bg-[#f9f9f9]"
                  >
                    <td className="px-4 py-3 align-middle text-center text-gray-600 font-medium">
                      {trx.id}
                    </td>
                    <td className="px-4 py-3 align-middle font-mono text-xs text-[#3c8dbc]">
                      {trx.trxId}
                    </td>
                    <td className="px-4 py-3 align-middle text-gray-700">
                      {trx.user}
                    </td>
                    <td className="px-4 py-3 align-middle font-semibold text-emerald-600">
                      {trx.total}
                    </td>
                    <td className="px-4 py-3 align-middle text-gray-600">
                      {trx.method}
                    </td>
                    <td className="px-4 py-3 align-middle text-gray-500 text-xs">
                      {trx.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </WidgetPanel>
        </div>
      ) : (
        /* ========================================================================= */
        /* SUPER ADMIN OVERVIEW (Orders, Transactions, Members)                      */
        /* ========================================================================= */
        <>
          {/* Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Latest Orders */}
            <WidgetPanel title="Latest Orders" viewAllHref="/admin/orders">
              <table className="w-full text-[13px] text-left text-gray-700 m-0">
                <thead className="border-b-2 border-gray-200">
                  <tr>
                    <th className="px-4 py-2 font-bold border-b border-[#f4f4f4]">
                      Order
                    </th>
                    <th className="px-4 py-2 font-bold border-b border-[#f4f4f4]">
                      Total
                    </th>
                    <th className="px-4 py-2 font-bold border-b border-[#f4f4f4]">
                      Status
                    </th>
                    <th className="px-4 py-2 font-bold border-b border-[#f4f4f4]">
                      Date
                    </th>
                    <th className="px-4 py-2 font-bold border-b border-[#f4f4f4] text-right">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      id: "#10041",
                      amount: "$60.20",
                      status: "Processing",
                      date: "2026-10-05 / 15:38",
                    },
                    {
                      id: "#10040",
                      amount: "$138.00",
                      status: "Processing",
                      date: "2026-09-29 / 12:00",
                    },
                    {
                      id: "#10039",
                      amount: "$94.00",
                      status: "Processing",
                      date: "2026-09-29 / 00:34",
                    },
                    {
                      id: "#10038",
                      amount: "$381.85",
                      status: "Processing",
                      date: "2026-09-28 / 22:48",
                    },
                    {
                      id: "#10037",
                      amount: "$71.95",
                      status: "Processing",
                      date: "2026-09-28 / 15:39",
                    },
                    {
                      id: "#10036",
                      amount: "$336.00",
                      status: "Processing",
                      date: "2026-09-28 / 06:49",
                    },
                  ].map((order, i) => (
                    <tr
                      key={i}
                      className="border-b border-[#f4f4f4] hover:bg-[#f9f9f9]"
                    >
                      <td className="px-4 py-2 text-[#3c8dbc]">{order.id}</td>
                      <td className="px-4 py-2">{order.amount}</td>
                      <td className="px-4 py-2 text-gray-600">
                        <span className="bg-[#f39c12] text-white px-2 py-0.5 rounded text-[11px] font-bold">
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-gray-500">{order.date}</td>
                      <td className="px-4 py-2 text-right">
                        <button className="bg-[#00c0ef] text-white text-[11px] font-bold px-2.5 py-[3px] rounded-[3px] hover:bg-[#00acd6]">
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </WidgetPanel>

            {/* Latest Transactions */}
            <WidgetPanel
              title="Latest Transactions"
              viewAllHref="/admin/transactions"
            >
              <table className="w-full text-[13px] text-left text-gray-700 m-0">
                <thead className="border-b-2 border-gray-200">
                  <tr>
                    <th className="px-4 py-2 font-bold w-12 border-b border-[#f4f4f4]">
                      Id
                    </th>
                    <th className="px-4 py-2 font-bold border-b border-[#f4f4f4]">
                      Order
                    </th>
                    <th className="px-4 py-2 font-bold border-b border-[#f4f4f4]">
                      Payment Amount
                    </th>
                    <th className="px-4 py-2 font-bold border-b border-[#f4f4f4]">
                      Payment Method
                    </th>
                    <th className="px-4 py-2 font-bold border-b border-[#f4f4f4]">
                      Status
                    </th>
                    <th className="px-4 py-2 font-bold border-b border-[#f4f4f4]">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      id: "18",
                      order: "#10033",
                      amount: "$191.10",
                      method: "Wallet Balance",
                      status: "Succeeded",
                      date: "2026-09-23 / 17:23",
                    },
                    {
                      id: "17",
                      order: "#10031",
                      amount: "$257.00",
                      method: "Wallet Balance",
                      status: "Succeeded",
                      date: "2026-09-23 / 02:08",
                    },
                    {
                      id: "16",
                      order: "#10029",
                      amount: "$259.05",
                      method: "Wallet Balance",
                      status: "Succeeded",
                      date: "2026-09-22 / 06:40",
                    },
                    {
                      id: "15",
                      order: "#10025",
                      amount: "N149479.73",
                      method: "PayStack",
                      status: "success",
                      date: "2026-09-16 / 10:38",
                    },
                    {
                      id: "14",
                      order: "#10019",
                      amount: "$182.10",
                      method: "Wallet Balance",
                      status: "Succeeded",
                      date: "2026-09-09 / 11:39",
                    },
                    {
                      id: "13",
                      order: "#10018",
                      amount: "$149.50",
                      method: "Wallet Balance",
                      status: "Succeeded",
                      date: "2026-09-09 / 05:59",
                    },
                    {
                      id: "12",
                      order: "#10017",
                      amount: "$87.00",
                      method: "Wallet Balance",
                      status: "Succeeded",
                      date: "2026-09-06 / 02:16",
                    },
                  ].map((tx, i) => (
                    <tr
                      key={i}
                      className="border-b border-[#f4f4f4] hover:bg-[#f9f9f9]"
                    >
                      <td className="px-4 py-2.5">{tx.id}</td>
                      <td className="px-4 py-2.5 text-[#3c8dbc]">{tx.order}</td>
                      <td className="px-4 py-2.5">{tx.amount}</td>
                      <td className="px-4 py-2.5">{tx.method}</td>
                      <td className="px-4 py-2.5">{tx.status}</td>
                      <td className="px-4 py-2.5 text-gray-500 whitespace-nowrap">
                        {tx.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </WidgetPanel>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Latest Products */}
            <WidgetPanel title="Latest Products" viewAllHref="/admin/products">
              <table className="w-full text-[13px] text-left text-gray-700 m-0">
                <thead className="border-b-2 border-gray-200">
                  <tr>
                    <th className="px-4 py-2 font-bold w-12 border-b border-[#f4f4f4]">
                      Id
                    </th>
                    <th className="px-4 py-2 font-bold border-b border-[#f4f4f4]">
                      Name
                    </th>
                    <th className="px-4 py-2 font-bold text-right border-b border-[#f4f4f4]">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      id: "47",
                      name: "Colorful women scarves",
                      date: "2 months ago",
                      img: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=150&h=150&fit=crop",
                    },
                    {
                      id: "46",
                      name: "Women's ankle boot with different colors",
                      date: "2 months ago",
                      img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=150&h=150&fit=crop",
                    },
                    {
                      id: "45",
                      name: "Navy polka dot dress",
                      date: "2 months ago",
                      img: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=150&h=150&fit=crop",
                    },
                  ].map((product, i) => (
                    <tr
                      key={i}
                      className="border-b border-[#f4f4f4] hover:bg-[#f9f9f9]"
                    >
                      <td className="px-4 py-3 align-middle">{product.id}</td>
                      <td className="px-4 py-3 align-middle">
                        <div className="flex items-center">
                          <img
                            src={product.img}
                            alt={product.name}
                            className="w-12 h-12 object-cover shadow-sm mr-3 border border-gray-200"
                          />
                          <div>
                            <p className="text-[#3c8dbc] hover:text-[#72afd2] cursor-pointer mb-0.5">
                              {product.name}
                            </p>
                            <p className="text-[#999] text-[11px]">
                              {product.date}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right align-middle">
                        <button className="bg-[#00c0ef] text-white text-[11px] font-bold px-2.5 py-[3px] rounded-[3px] hover:bg-[#00acd6]">
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </WidgetPanel>

            {/* Latest Pending Products */}
            <WidgetPanel
              title="Latest Pending Products"
              viewAllHref="/admin/pending-products"
            >
              <table className="w-full text-[13px] text-left text-gray-700 m-0">
                <thead className="border-b-2 border-gray-200">
                  <tr>
                    <th className="px-4 py-2 font-bold w-12 border-b border-[#f4f4f4]">
                      Id
                    </th>
                    <th className="px-4 py-2 font-bold border-b border-[#f4f4f4]">
                      Name
                    </th>
                    <th className="px-4 py-2 font-bold text-right border-b border-[#f4f4f4]">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pendingProducts.length === 0 ? (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-4 py-8 text-center text-gray-400 border-b border-[#f4f4f4]"
                      >
                        No records found.
                      </td>
                    </tr>
                  ) : (
                    pendingProducts.map((p, idx) => (
                      <tr
                        key={p.id}
                        className="border-b border-[#f4f4f4] hover:bg-[#f9f9f9]"
                      >
                        <td className="px-4 py-3 align-middle">{idx + 1}</td>
                        <td className="px-4 py-3 align-middle">
                          <p className="text-[#3c8dbc] font-medium">{p.title}</p>
                          <p className="text-gray-400 text-xs">{p.category}</p>
                        </td>
                        <td className="px-4 py-3 text-right align-middle">
                          <Link
                            href="/admin/pending-products"
                            className="bg-[#00c0ef] text-white text-[11px] font-bold px-2.5 py-[3px] rounded-[3px] hover:bg-[#00acd6] inline-block"
                          >
                            Details
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </WidgetPanel>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Latest Transactions (Featured Products) */}
            <WidgetPanel title="Latest Transactions (Featured Products)">
              <table className="w-full text-[13px] text-left text-gray-700 m-0">
                <tbody>
                  {[
                    {
                      id: "5",
                      method: "Razorpay",
                      amount: "₹555.24",
                      status: "captured",
                      date: "2026-08-04 / 10:09",
                    },
                    {
                      id: "4",
                      method: "PayPal",
                      amount: "$31.50",
                      status: "COMPLETED",
                      date: "2026-08-04 / 10:06",
                    },
                    {
                      id: "3",
                      method: "PayStack",
                      amount: "₦16073.55",
                      status: "success",
                      date: "2026-08-03 / 23:29",
                    },
                    {
                      id: "2",
                      method: "Stripe",
                      amount: "$8.40",
                      status: "Paid",
                      date: "2026-08-03 / 22:09",
                    },
                    {
                      id: "1",
                      method: "PayPal",
                      amount: "$6.30",
                      status: "COMPLETED",
                      date: "2026-08-03 / 22:06",
                    },
                  ].map((tx, i) => (
                    <tr
                      key={i}
                      className="border-b border-[#f4f4f4] hover:bg-[#f9f9f9]"
                    >
                      <td className="px-4 py-3 text-gray-500 w-12 text-center">
                        {tx.id}
                      </td>
                      <td className="px-4 py-3">{tx.method}</td>
                      <td className="px-4 py-3">{tx.amount}</td>
                      <td className="px-4 py-3 text-gray-600">{tx.status}</td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                        {tx.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </WidgetPanel>

            {/* Latest Reviews */}
            <WidgetPanel title="Latest Reviews">
              <table className="w-full text-[13px] text-left text-gray-700 m-0">
                <tbody>
                  {[
                    {
                      id: "3",
                      user: "Admin",
                      text: "This skirt is beautiful and the floral pattern is very charming. The material feels nice and it drapes",
                      date: "2 months ago",
                      stars: 4,
                    },
                    {
                      id: "2",
                      user: "Admin",
                      text: "The visuals are vibrant, and it really captures the essence of each vacation spot. It's both informative",
                      date: "2 months ago",
                      stars: 5,
                    },
                    {
                      id: "1",
                      user: "Admin",
                      text: "The light blue color is soft and flattering, and the fabric feels high-quality and breathable. It fits",
                      date: "2 months ago",
                      stars: 5,
                    },
                  ].map((review, i) => (
                    <tr
                      key={i}
                      className="border-b border-[#f4f4f4] hover:bg-[#f9f9f9]"
                    >
                      <td className="px-4 py-4 align-top w-12 text-center text-gray-500">
                        {review.id}
                      </td>
                      <td className="px-4 py-4 align-top w-24 text-[#3c8dbc]">
                        {review.user}
                      </td>
                      <td className="px-4 py-4 align-top">
                        <div className="flex text-[#f39c12] mb-1">
                          {[...Array(5)].map((_, idx) => (
                            <Star
                              key={idx}
                              className={`w-3.5 h-3.5 ${
                                idx < review.stars
                                  ? "fill-current"
                                  : "text-[#d2d6de]"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-600 mb-1 leading-relaxed">
                          {review.text}
                        </p>
                        <p className="text-[11px] text-[#999]">{review.date}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </WidgetPanel>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Latest Comments */}
            <WidgetPanel title="Latest Comments">
              <table className="w-full text-[13px] text-left text-gray-700 m-0">
                <thead className="border-b-2 border-gray-200">
                  <tr>
                    <th className="px-4 py-2 font-bold w-12 border-b border-[#f4f4f4] text-center">
                      Id
                    </th>
                    <th className="px-4 py-2 font-bold border-b border-[#f4f4f4]">
                      User
                    </th>
                    <th className="px-4 py-2 font-bold border-b border-[#f4f4f4]">
                      Comment
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#f4f4f4] hover:bg-[#f9f9f9]">
                    <td className="px-4 py-3 align-top text-center text-gray-500">
                      1
                    </td>
                    <td className="px-4 py-3 align-top whitespace-nowrap">
                      Peter Jone
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-gray-700">good</p>
                      <p className="text-[11px] text-[#999] mt-0.5">
                        27 days ago
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </WidgetPanel>

            {/* Latest Members */}
            <WidgetPanel title="Latest Members">
              <div className="p-4 flex gap-6 overflow-x-auto border-b border-[#f4f4f4]">
                {[
                  { name: "goldie gl...", date: "1 day ago" },
                  { name: "Atukund...", date: "7 days ago" },
                  { name: "ismail el...", date: "11 days ago" },
                  { name: "Caleb Pr...", date: "15 days ago" },
                  { name: "rixebav7...", date: "17 days ago" },
                  { name: "Resa sz", date: "19 days ago" },
                ].map((member, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center flex-shrink-0 text-center"
                  >
                    <div className="w-14 h-14 bg-gray-200 rounded-full mb-2 flex items-center justify-center text-gray-400 overflow-hidden">
                      <Users className="w-6 h-6 opacity-50" />
                    </div>
                    <span className="text-[13px] text-[#3c8dbc] truncate w-20 hover:text-blue-500 cursor-pointer">
                      {member.name}
                    </span>
                    <span className="text-[11px] text-gray-500">
                      {member.date}
                    </span>
                  </div>
                ))}
              </div>
            </WidgetPanel>
          </div>
        </>
      )}
    </div>
  );
}
