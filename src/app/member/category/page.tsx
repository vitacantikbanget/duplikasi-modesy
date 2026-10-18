"use client";

import React from "react";
import Link from "next/link";
import { Grid, ArrowRight } from "lucide-react";

export default function MemberCategoryPage() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8">
      <div className="flex items-center justify-between pb-5 border-b border-gray-100">
        <div>
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Grid className="w-5 h-5 text-emerald-600" />
            Kategori Favorit Member
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Jelajahi kategori produk rekomendasi pilihan untuk belanja hemat.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
        {[
          { name: "Electronics & Gadget", count: "1,240 items", href: "/categories" },
          { name: "Fashion & Pakaian", count: "890 items", href: "/categories" },
          { name: "Digital Downloads", count: "430 items", href: "/categories" },
          { name: "Home & Furniture", count: "320 items", href: "/categories" },
        ].map((cat, i) => (
          <Link
            key={i}
            href={cat.href}
            className="p-4 rounded-xl border border-gray-200 hover:border-emerald-500 hover:shadow-xs transition-all group"
          >
            <h4 className="text-sm font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">
              {cat.name}
            </h4>
            <p className="text-xs text-gray-400 mt-1">{cat.count}</p>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 mt-3">
              Lihat Produk <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
