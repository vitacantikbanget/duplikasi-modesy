"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Home, CheckCircle } from "lucide-react";

export default function AdSpacesPage() {
  const [headerAd, setHeaderAd] = useState("<script async src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'></script>");
  const [indexBottomAd, setIndexBottomAd] = useState("<img src='https://images.unsplash.com/photo-1483985988355-763728e1935b?w=728&h=90&fit=crop' alt='Summer Sale' />");
  const [productsSidebarAd, setProductsSidebarAd] = useState("<img src='https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&h=250&fit=crop' alt='Footwear' />");
  const [productDetailsBottomAd, setProductDetailsBottomAd] = useState("");
  const [blogPostBottomAd, setBlogPostBottomAd] = useState("");
  const [notification, setNotification] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setNotification("Ad spaces updated successfully!");
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="w-full text-[#333333] pb-12">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h1 className="text-[24px] font-normal text-[#333333] m-0">
          Ad Spaces <small className="text-[14px] text-gray-500 font-light">Management Tools</small>
        </h1>
        <div className="text-[12px] text-gray-500 flex items-center space-x-1 mt-1 sm:mt-0">
          <Link href="/admin" className="text-[#333333] hover:text-[#3c8dbc] flex items-center gap-1">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <span>/</span>
          <span className="text-gray-400">Management Tools</span>
          <span>/</span>
          <span className="text-gray-600 font-medium">Ad Spaces</span>
        </div>
      </div>

      {notification && (
        <div className="mb-4 px-4 py-3 bg-[#d4edda] border border-[#c3e6cb] text-[#155724] rounded-[3px] text-[13px] flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          {notification}
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border-t-[3px] border-[#3c8dbc] border-x border-b border-[#d2d6de]/60 p-5 space-y-5 max-w-4xl">
        <div>
          <label className="block text-[13px] font-semibold text-[#333333] mb-1">
            Header (728x90)
          </label>
          <p className="text-[12px] text-gray-400 mb-2">Responsive Google AdSense code or Banner HTML</p>
          <textarea
            rows={3}
            value={headerAd}
            onChange={(e) => setHeaderAd(e.target.value)}
            className="w-full p-3 border border-[#d2d6de] rounded-[3px] text-[12px] text-gray-700 bg-white font-mono focus:outline-none focus:border-[#3c8dbc]"
          />
        </div>

        <div>
          <label className="block text-[13px] font-semibold text-[#333333] mb-1">
            Index Bottom (728x90)
          </label>
          <p className="text-[12px] text-gray-400 mb-2">Displayed on homepage above the footer</p>
          <textarea
            rows={3}
            value={indexBottomAd}
            onChange={(e) => setIndexBottomAd(e.target.value)}
            className="w-full p-3 border border-[#d2d6de] rounded-[3px] text-[12px] text-gray-700 bg-white font-mono focus:outline-none focus:border-[#3c8dbc]"
          />
        </div>

        <div>
          <label className="block text-[13px] font-semibold text-[#333333] mb-1">
            Products Sidebar (300x250)
          </label>
          <p className="text-[12px] text-gray-400 mb-2">Displayed in sidebar on catalog & search pages</p>
          <textarea
            rows={3}
            value={productsSidebarAd}
            onChange={(e) => setProductsSidebarAd(e.target.value)}
            className="w-full p-3 border border-[#d2d6de] rounded-[3px] text-[12px] text-gray-700 bg-white font-mono focus:outline-none focus:border-[#3c8dbc]"
          />
        </div>

        <div>
          <label className="block text-[13px] font-semibold text-[#333333] mb-1">
            Product Details Bottom (728x90)
          </label>
          <p className="text-[12px] text-gray-400 mb-2">Displayed below product review tabs</p>
          <textarea
            rows={3}
            value={productDetailsBottomAd}
            onChange={(e) => setProductDetailsBottomAd(e.target.value)}
            className="w-full p-3 border border-[#d2d6de] rounded-[3px] text-[12px] text-gray-700 bg-white font-mono focus:outline-none focus:border-[#3c8dbc]"
          />
        </div>

        <div>
          <label className="block text-[13px] font-semibold text-[#333333] mb-1">
            Blog Post Bottom (728x90)
          </label>
          <p className="text-[12px] text-gray-400 mb-2">Displayed below blog articles</p>
          <textarea
            rows={3}
            value={blogPostBottomAd}
            onChange={(e) => setBlogPostBottomAd(e.target.value)}
            className="w-full p-3 border border-[#d2d6de] rounded-[3px] text-[12px] text-gray-700 bg-white font-mono focus:outline-none focus:border-[#3c8dbc]"
          />
        </div>

        <div className="pt-3 border-t border-[#f4f4f4] flex justify-end">
          <button
            type="submit"
            className="bg-[#0088cc] hover:bg-[#0077b3] text-white px-5 py-2 rounded-[3px] text-[13px] font-medium shadow-2xs transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
