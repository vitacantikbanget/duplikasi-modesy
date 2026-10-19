"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, ArrowRight, Check, Tag } from "lucide-react";

interface CouponCardItem {
  id: string;
  vendorName: string;
  title: string;
  discount: string;
  validTill: string;
  code: string;
  avatar: string;
  targetLink: string;
}

const MY_COUPONS: CouponCardItem[] = [
  {
    id: "c1",
    vendorName: "ADMIN",
    title: "10% Coupon",
    discount: "10%",
    validTill: "16 April 2027",
    code: "P6PG5GLS",
    avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&q=80",
    targetLink: "/products",
  },
  {
    id: "c2",
    vendorName: "TRENDSHOP",
    title: "15% Coupon",
    discount: "15%",
    validTill: "31 March 2027",
    code: "41GNOLDX",
    avatar: "https://images.unsplash.com/photo-1507290439931-a861b5a38200?w=200&q=80",
    targetLink: "/profile/daniel-jones",
  },
];

export default function MyCouponsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2500);
    }
  };

  return (
    <div className="bg-white font-sans text-[#495057]">
      {/* 1. Breadcrumb */}
      <div className="max-w-[1320px] mx-auto px-4 pt-6 pb-2">
        <div className="flex items-center text-xs text-[#6c757d]">
          <Link href="/" className="hover:text-[#00ab97] transition-colors">
            Home
          </Link>
          <span className="mx-1.5 text-gray-400">/</span>
          <span className="text-[#2c333e] font-normal">My Coupons</span>
        </div>
      </div>

      {/* 2. Page Content */}
      <div className="max-w-[1320px] mx-auto px-4 pt-4 pb-28">
        {/* Title */}
        <h1 className="text-[22px] font-bold text-[#2c333e] mb-8">My Coupons</h1>

        {/* Coupons List */}
        <div className="flex flex-wrap gap-6">
          {MY_COUPONS.map((coupon) => {
            const isCopied = copiedCode === coupon.code;

            return (
              <div
                key={coupon.id}
                className="w-full sm:w-[350px] border border-dashed border-[#cfd4da] rounded-[2px] p-5 bg-white transition-all hover:border-[#00ab97]"
              >
                {/* Top Section */}
                <div className="flex items-start gap-4 mb-4">
                  {/* Sphere Avatar */}
                  <div className="w-14 h-14 rounded-full overflow-hidden shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={coupon.avatar}
                      alt={coupon.vendorName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Coupon Meta */}
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold text-[#2c333e] uppercase tracking-wide block">
                      {coupon.vendorName}
                    </span>
                    <h2 className="text-base font-bold text-[#2c333e] mt-0.5 leading-snug">
                      {coupon.title}
                    </h2>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#28a745] font-medium mt-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Valid till: {coupon.validTill}</span>
                    </div>
                    <Link
                      href={coupon.targetLink}
                      className="inline-flex items-center gap-1 text-xs text-[#6c757d] hover:text-[#00ab97] transition-colors mt-2"
                    >
                      <span>See Products</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

                {/* Bottom Section: Code + Copy Button */}
                <div className="flex items-stretch mt-4">
                  <div className="flex-1 bg-white border border-dashed border-[#ced4da] border-r-0 px-3 py-2 text-xs font-mono font-medium text-[#495057] tracking-wider flex items-center select-all">
                    {coupon.code}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyCode(coupon.code)}
                    className="px-4 py-2 bg-[#00ab97] hover:bg-[#009684] text-white text-[11px] font-bold uppercase tracking-wider rounded-r-[2px] transition-colors cursor-pointer shrink-0 flex items-center justify-center gap-1"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>COPIED</span>
                      </>
                    ) : (
                      <span>COPY CODE</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
