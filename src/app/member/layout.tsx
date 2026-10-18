"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  ShoppingBag, 
  Tag, 
  DownloadCloud, 
  RotateCcw, 
  Home
} from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";

// Exactly matches the 4-item sidebar on modesy-three.vercel.app/member/orders
const ORDER_PORTAL_NAV = [
  { href: "/member/orders", label: "Orders", icon: ShoppingBag },
  { href: "/member/quote-requests", label: "Quote Requests", icon: Tag },
  { href: "/member/downloads", label: "Downloads", icon: DownloadCloud },
  { href: "/member/refund-requests", label: "Refund Requests", icon: RotateCcw },
];

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { role, setRole } = useAppContext();

  // Ensure member session is active on all /member routes
  useEffect(() => {
    if (role !== "member") {
      setRole("member");
    }
  }, [role, setRole]);

  // Check if current route uses the 4-item order management sidebar layout
  const isOrderPortalRoute = 
    pathname.startsWith("/member/orders") ||
    pathname.startsWith("/member/quote-requests") ||
    pathname.startsWith("/member/downloads") ||
    pathname.startsWith("/member/refund-requests");

  // 1. If NOT an order portal route (e.g. /member, /member/profile, /member/wallet, /member/coupons, /member/messages, /member/settings), render children directly
  if (!isOrderPortalRoute) {
    return <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans text-gray-800">{children}</div>;
  }

  // 2. For Order portal routes (/member/orders, /member/quote-requests, etc.)
  // Render matching exact Modesy portal layout: Breadcrumb + H1 + 2-column sidebar layout
  const currentSegment = pathname.split("/")[2] || "orders";
  const displayTitle = currentSegment
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <div className="w-full bg-[#f8f9fa] min-h-[calc(100vh-280px)] py-8 font-sans">
      <div className="max-w-[1320px] mx-auto px-4">
        {/* Modesy Breadcrumb */}
        <nav className="text-[13px] text-gray-500 mb-4 flex items-center gap-1.5 font-normal">
          <Link href="/member" className="hover:text-[#00a99d] transition-colors flex items-center gap-1">
            <span>Home</span>
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-700 capitalize">{displayTitle}</span>
        </nav>

        {/* Title */}
        <h1 className="text-[24px] sm:text-[26px] font-bold text-[#222] tracking-tight mb-8">
          {displayTitle}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar Navigation (4 items) */}
          <div className="md:col-span-3 space-y-1">
            {ORDER_PORTAL_NAV.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href === "/member/orders" && pathname.startsWith("/member/orders/"));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-[3px] text-[14px] transition cursor-pointer text-left border-0 ${
                    isActive
                      ? "bg-[#f1f3f5] font-semibold text-gray-900"
                      : "bg-transparent text-gray-600 hover:text-gray-900 font-normal hover:bg-gray-100/60"
                  }`}
                >
                  <Icon className="w-4 h-4 text-gray-500 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Main Content */}
          <div className="md:col-span-9">{children}</div>
        </div>
      </div>
    </div>
  );
}

