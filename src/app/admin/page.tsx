"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  ShoppingBag,
  EyeOff,
  Users,
  Minus,
  X,
  ArrowRight,
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: any;
  colorClass: string;
  href?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, colorClass, href = "#" }) => (
  <div
    className={`rounded-[3px] shadow-[0_1px_2px_rgba(0,0,0,0.08)] text-white overflow-hidden relative flex flex-col justify-between ${colorClass}`}
  >
    <div className="px-5 pt-4 pb-2 relative z-10 flex flex-col justify-center">
      <h3 className="text-[36px] font-bold leading-none mb-1 tracking-tight">{value}</h3>
      <p className="text-[14px] font-normal opacity-95">{title}</p>
      <Icon className="w-20 h-20 absolute -right-2 top-2 opacity-20 transform transition-transform duration-200 pointer-events-none" />
    </div>
    <Link
      href={href}
      className="bg-black/15 hover:bg-black/25 text-white/90 hover:text-white py-1 px-4 text-[12px] flex items-center justify-center gap-1.5 transition-colors z-10"
    >
      <span>More info</span>
      <ArrowRight className="w-3.5 h-3.5" />
    </Link>
  </div>
);

interface WidgetPanelProps {
  title: string;
  children: React.ReactNode;
  showViewAll?: boolean;
  viewAllHref?: string;
}

const WidgetPanel: React.FC<WidgetPanelProps> = ({
  title,
  children,
  showViewAll = true,
  viewAllHref = "#",
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  return (
    <div className="bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06)] rounded-[3px] border border-gray-200/70 flex flex-col h-full relative">
      <div className="px-4 py-3 border-b border-[#f4f4f4] flex justify-between items-center bg-white rounded-t-[3px]">
        <h3 className="text-gray-800 text-[14.5px] font-semibold">{title}</h3>
        <div className="flex items-center space-x-1.5 text-gray-400">
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 cursor-pointer"
            title="Minimize"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setClosed(true)}
            className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 cursor-pointer"
            title="Close"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {!collapsed && (
        <>
          <div className="p-0 flex-1 overflow-x-auto overflow-y-auto max-h-[360px] scrollbar-thin scrollbar-thumb-gray-200">
            {children}
          </div>
          {showViewAll && (
            <div className="px-4 py-2.5 border-t border-[#f4f4f4] bg-white flex justify-end rounded-b-[3px]">
              <Link
                href={viewAllHref}
                className="text-[11.5px] bg-[#f4f4f4] hover:bg-[#e8e8e8] text-[#444] border border-[#d2d6de] px-3 py-1 rounded-[3px] transition-colors font-medium shadow-2xs"
              >
                View All
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default function AdminDashboard() {
  return (
    <div className="space-y-4 font-sans max-w-full">
      {/* 4 Stat Cards - Exact Colors & Numbers from Screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Orders" value="46" icon={ShoppingCart} colorClass="bg-[#00a65a]" href="/admin/orders" />
        <StatCard title="Products" value="47" icon={ShoppingBag} colorClass="bg-[#605ca8]" href="/admin/products" />
        <StatCard title="Pending Products" value="0" icon={EyeOff} colorClass="bg-[#dd4b39]" href="/admin/pending-products" />
        <StatCard title="Members" value="19" icon={Users} colorClass="bg-[#f39c12]" href="/admin/users" />
      </div>

      {/* Row 1: Latest Orders & Latest Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Latest Orders */}
        <WidgetPanel title="Latest Orders" viewAllHref="/admin/orders">
          <table className="w-full min-w-[520px] text-[12.5px] text-left text-gray-700 m-0 border-collapse whitespace-nowrap">
            <thead className="border-b border-gray-200/80 bg-white">
              <tr>
                <th className="px-4 py-2.5 font-semibold text-gray-800">Order</th>
                <th className="px-4 py-2.5 font-semibold text-gray-800">Total</th>
                <th className="px-4 py-2.5 font-semibold text-gray-800">Status</th>
                <th className="px-4 py-2.5 font-semibold text-gray-800">Date</th>
                <th className="px-4 py-2.5 font-semibold text-gray-800 text-right">Details</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: "#10046", amount: "$84.35", status: "Completed", statusBg: "bg-[#00a65a]", date: "2026-10-17 / 19:08" },
                { id: "#10045", amount: "$60.20", status: "Processing", statusBg: "bg-[#f39c12]", date: "2026-10-17 / 08:08" },
                { id: "#10044", amount: "$154", status: "Processing", statusBg: "bg-[#f39c12]", date: "2026-10-14 / 20:42" },
                { id: "#10043", amount: "$1,519.45", status: "Processing", statusBg: "bg-[#f39c12]", date: "2026-10-14 / 19:49" },
                { id: "#10042", amount: "$236.25", status: "Processing", statusBg: "bg-[#f39c12]", date: "2026-10-12 / 19:26" },
                { id: "#10041", amount: "$60.20", status: "Processing", statusBg: "bg-[#f39c12]", date: "2026-10-05 / 15:38" },
              ].map((order, i) => (
                <tr key={i} className="border-b border-[#f4f4f4] hover:bg-[#f9f9f9] transition-colors">
                  <td className="px-4 py-2.5 text-[#3c8dbc] font-medium hover:underline cursor-pointer">
                    <Link href="/admin/orders">{order.id}</Link>
                  </td>
                  <td className="px-4 py-2.5 font-medium text-gray-800">{order.amount}</td>
                  <td className="px-4 py-2.5">
                    <span className={`${order.statusBg} text-white px-2 py-0.5 rounded-[2px] text-[11px] font-semibold tracking-wide`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-gray-500 whitespace-nowrap">{order.date}</td>
                  <td className="px-4 py-2.5 text-right">
                    <Link
                      href="/admin/orders"
                      className="inline-block bg-[#00c0ef] hover:bg-[#00acd6] text-white text-[11px] font-semibold px-2.5 py-1 rounded-[2px] transition-colors shadow-2xs"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </WidgetPanel>

        {/* Latest Transactions */}
        <WidgetPanel title="Latest Transactions" viewAllHref="/admin/transactions">
          <table className="w-full min-w-[550px] text-[12.5px] text-left text-gray-700 m-0 border-collapse whitespace-nowrap">
            <thead className="border-b border-gray-200/80 bg-white">
              <tr>
                <th className="px-3 py-2.5 font-semibold text-gray-800 w-10">Id</th>
                <th className="px-3 py-2.5 font-semibold text-gray-800">Order</th>
                <th className="px-3 py-2.5 font-semibold text-gray-800">Payment Amount</th>
                <th className="px-3 py-2.5 font-semibold text-gray-800">Payment Method</th>
                <th className="px-3 py-2.5 font-semibold text-gray-800">Status</th>
                <th className="px-3 py-2.5 font-semibold text-gray-800">Date</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: "20", order: "#10046", amount: "$84.35", method: "Wallet Balance", status: "Succeeded", date: "2026-10-17 / 19:08" },
                { id: "19", order: "#10042", amount: "$236.25", method: "Wallet Balance", status: "Succeeded", date: "2026-10-12 / 19:26" },
                { id: "18", order: "#10033", amount: "$191.10", method: "Wallet Balance", status: "Succeeded", date: "2026-09-23 / 17:23" },
                { id: "17", order: "#10031", amount: "$257", method: "Wallet Balance", status: "Succeeded", date: "2026-09-23 / 02:08" },
                { id: "16", order: "#10029", amount: "$259.05", method: "Wallet Balance", status: "Succeeded", date: "2026-09-22 / 06:40" },
                { id: "15", order: "#10025", amount: "#149479.73", method: "PayStack", status: "success", date: "2026-09-16 / 10:38" },
                { id: "14", order: "#10019", amount: "$182.10", method: "Wallet Balance", status: "Succeeded", date: "2026-09-09 / 11:39" },
              ].map((tx, i) => (
                <tr key={i} className="border-b border-[#f4f4f4] hover:bg-[#f9f9f9] transition-colors">
                  <td className="px-3 py-2.5 text-gray-500">{tx.id}</td>
                  <td className="px-3 py-2.5 text-[#3c8dbc] font-medium hover:underline cursor-pointer">
                    <Link href="/admin/orders">{tx.order}</Link>
                  </td>
                  <td className="px-3 py-2.5 font-medium text-gray-800">{tx.amount}</td>
                  <td className="px-3 py-2.5 text-gray-600">{tx.method}</td>
                  <td className="px-3 py-2.5 font-medium text-gray-700">{tx.status}</td>
                  <td className="px-3 py-2.5 text-gray-500 whitespace-nowrap">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </WidgetPanel>
      </div>

      {/* Row 2: Latest Products & Latest Pending Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Latest Products */}
        <WidgetPanel title="Latest Products" viewAllHref="/admin/products">
          <table className="w-full min-w-[480px] text-[12.5px] text-left text-gray-700 m-0 border-collapse">
            <thead className="border-b border-gray-200/80 bg-white">
              <tr>
                <th className="px-4 py-2.5 font-semibold text-gray-800 w-12">Id</th>
                <th className="px-4 py-2.5 font-semibold text-gray-800">Name</th>
                <th className="px-4 py-2.5 font-semibold text-gray-800 text-right">Details</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  id: "47",
                  name: "Colorful women scarves",
                  date: "3 months ago",
                  img: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=100&h=100&fit=crop&q=80",
                },
                {
                  id: "46",
                  name: "Women's ankle boot with different colors",
                  date: "3 months ago",
                  img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=100&h=100&fit=crop&q=80",
                },
                {
                  id: "45",
                  name: "Navy polka dot dress",
                  date: "3 months ago",
                  img: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=100&h=100&fit=crop&q=80",
                },
              ].map((product, i) => (
                <tr key={i} className="border-b border-[#f4f4f4] hover:bg-[#f9f9f9] transition-colors">
                  <td className="px-4 py-3 align-middle text-gray-500 font-medium">{product.id}</td>
                  <td className="px-4 py-3 align-middle">
                    <div className="flex items-center">
                      <img
                        src={product.img}
                        alt={product.name}
                        className="w-11 h-11 object-cover shadow-2xs mr-3 border border-gray-200 rounded-[2px]"
                      />
                      <div>
                        <p className="text-gray-800 hover:text-[#3c8dbc] cursor-pointer text-[12.5px] font-medium leading-tight mb-0.5">
                          <Link href="/admin/products">{product.name}</Link>
                        </p>
                        <p className="text-gray-400 text-[11px]">{product.date}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right align-middle">
                    <Link
                      href="/admin/products"
                      className="inline-block bg-[#00c0ef] hover:bg-[#00acd6] text-white text-[11px] font-semibold px-2.5 py-1 rounded-[2px] transition-colors shadow-2xs"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </WidgetPanel>

        {/* Latest Pending Products */}
        <WidgetPanel title="Latest Pending Products" viewAllHref="/admin/pending-products">
          <table className="w-full min-w-[480px] text-[12.5px] text-left text-gray-700 m-0 border-collapse">
            <thead className="border-b border-gray-200/80 bg-white">
              <tr>
                <th className="px-4 py-2.5 font-semibold text-gray-800 w-12">Id</th>
                <th className="px-4 py-2.5 font-semibold text-gray-800">Name</th>
                <th className="px-4 py-2.5 font-semibold text-gray-800 text-right">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={3} className="px-4 py-12 text-center text-gray-400 text-xs">
                  No records found.
                </td>
              </tr>
            </tbody>
          </table>
        </WidgetPanel>
      </div>
    </div>
  );
}
