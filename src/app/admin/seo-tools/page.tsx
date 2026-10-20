"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Home, CheckCircle, Download, RefreshCw } from "lucide-react";

export default function SeoToolsPage() {
  const [language, setLanguage] = useState("English");
  const [siteTitle, setSiteTitle] = useState("Modesy - Buy & Sell Marketplace");
  const [siteDesc, setSiteDesc] = useState("Modesy is a clean, multi-vendor online marketplace platform.");
  const [keywords, setKeywords] = useState("marketplace, buy, sell, ecommerce, multi vendor, shop, electronics, fashion");
  const [googleAnalytics, setGoogleAnalytics] = useState("G-XXXXXXXXXX");
  const [frequency, setFrequency] = useState("daily");
  const [notification, setNotification] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setNotification("SEO settings saved successfully!");
    setTimeout(() => setNotification(null), 3000);
  };

  const handleGenerateSitemap = () => {
    setNotification("sitemap.xml generated successfully!");
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="w-full text-[#333333] pb-12">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h1 className="text-[24px] font-normal text-[#333333] m-0">
          SEO Tools <small className="text-[14px] text-gray-500 font-light">Management Tools</small>
        </h1>
        <div className="text-[12px] text-gray-500 flex items-center space-x-1 mt-1 sm:mt-0">
          <Link href="/admin" className="text-[#333333] hover:text-[#3c8dbc] flex items-center gap-1">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <span>/</span>
          <span className="text-gray-400">Management Tools</span>
          <span>/</span>
          <span className="text-gray-600 font-medium">SEO Tools</span>
        </div>
      </div>

      {notification && (
        <div className="mb-4 px-4 py-3 bg-[#d4edda] border border-[#c3e6cb] text-[#155724] rounded-[3px] text-[13px] flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          {notification}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: SEO Settings Box */}
        <div className="lg:col-span-2 bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border-t-[3px] border-[#3c8dbc] border-x border-b border-[#d2d6de]/60">
          <div className="px-5 py-3 border-b border-[#f4f4f4]">
            <h3 className="text-[#333333] text-[16px] font-semibold">SEO Tools</h3>
          </div>
          <form onSubmit={handleSave} className="p-5 space-y-4">
            <div>
              <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
              >
                <option value="English">English</option>
                <option value="Arabic">Arabic</option>
                <option value="French">French</option>
                <option value="German">German</option>
              </select>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">Site Title *</label>
              <input
                type="text"
                required
                value={siteTitle}
                onChange={(e) => setSiteTitle(e.target.value)}
                className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
              />
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">Site Description *</label>
              <textarea
                rows={3}
                required
                value={siteDesc}
                onChange={(e) => setSiteDesc(e.target.value)}
                className="w-full p-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
              />
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">Keywords</label>
              <textarea
                rows={2}
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="w-full p-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
              />
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">Google Analytics Code</label>
              <textarea
                rows={2}
                value={googleAnalytics}
                onChange={(e) => setGoogleAnalytics(e.target.value)}
                placeholder="Google Analytics snippet..."
                className="w-full p-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white font-mono text-[12px] focus:outline-none focus:border-[#3c8dbc]"
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

        {/* Right: Sitemap Generator Box */}
        <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border-t-[3px] border-[#00a65a] border-x border-b border-[#d2d6de]/60 h-fit">
          <div className="px-5 py-3 border-b border-[#f4f4f4]">
            <h3 className="text-[#333333] text-[16px] font-semibold">Generate Sitemap</h3>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">Frequency</label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
              >
                <option value="none">None</option>
                <option value="always">Always</option>
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="never">Never</option>
              </select>
            </div>

            <div className="pt-3 border-t border-[#f4f4f4] flex flex-col gap-2">
              <button
                type="button"
                onClick={handleGenerateSitemap}
                className="w-full bg-[#00a65a] hover:bg-[#008d4c] text-white py-2 rounded-[3px] text-[13px] font-medium shadow-2xs transition-colors flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-4 h-4" /> Generate Sitemap
              </button>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); alert("Downloading sitemap.xml"); }}
                className="w-full text-center py-1.5 text-[12px] text-[#3c8dbc] hover:underline flex items-center justify-center gap-1"
              >
                <Download className="w-3.5 h-3.5" /> Download sitemap.xml
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
