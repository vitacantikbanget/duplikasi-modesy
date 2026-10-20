"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Home, CheckCircle } from "lucide-react";

export default function VisualSettingsPage() {
  const [siteColor, setSiteColor] = useState("#222222");
  const [watermarkText, setWatermarkText] = useState("Modesy");
  const [watermarkStatus, setWatermarkStatus] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setNotification("Visual settings updated successfully!");
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="w-full text-[#333333] pb-12">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h1 className="text-[24px] font-normal text-[#333333] m-0">
          Visual Settings <small className="text-[14px] text-gray-500 font-light">Settings</small>
        </h1>
        <div className="text-[12px] text-gray-500 flex items-center space-x-1 mt-1 sm:mt-0">
          <Link href="/admin" className="text-[#333333] hover:text-[#3c8dbc] flex items-center gap-1">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <span>/</span>
          <span className="text-gray-400">Settings</span>
          <span>/</span>
          <span className="text-gray-600 font-medium">Visual Settings</span>
        </div>
      </div>

      {notification && (
        <div className="mb-4 px-4 py-3 bg-[#d4edda] border border-[#c3e6cb] text-[#155724] rounded-[3px] text-[13px] flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          {notification}
        </div>
      )}

      {/* Main Box */}
      <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border-t-[3px] border-[#3c8dbc] border-x border-b border-[#d2d6de]/60 max-w-4xl">
        <div className="px-5 py-3 border-b border-[#f4f4f4]">
          <h3 className="text-[#333333] text-[16px] font-semibold">Visual Settings</h3>
        </div>

        <form onSubmit={handleSave} className="p-5 space-y-5">
          {/* Color */}
          <div>
            <label className="block text-[13px] font-semibold text-[#333333] mb-2">
              Site Color (Theme Primary Color)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={siteColor}
                onChange={(e) => setSiteColor(e.target.value)}
                className="w-10 h-9 p-0.5 border border-[#d2d6de] rounded-[3px] cursor-pointer"
              />
              <input
                type="text"
                value={siteColor}
                onChange={(e) => setSiteColor(e.target.value)}
                className="h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] font-mono text-gray-700 w-32 uppercase"
              />
            </div>
          </div>

          {/* Logo Uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3 border-t border-[#f4f4f4]">
            <div>
              <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">
                Logo (180x50 px)
              </label>
              <div className="p-3 border border-dashed border-[#d2d6de] rounded-[3px] bg-gray-50 flex items-center justify-between">
                <span className="text-[12px] text-gray-500">logo.png (Current)</span>
                <button
                  type="button"
                  className="bg-white border border-[#d2d6de] text-gray-700 text-[12px] px-3 py-1 rounded-[2px] hover:bg-gray-100"
                >
                  Select Logo
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">
                Mobile Logo (160x40 px)
              </label>
              <div className="p-3 border border-dashed border-[#d2d6de] rounded-[3px] bg-gray-50 flex items-center justify-between">
                <span className="text-[12px] text-gray-500">logo_mobile.png (Current)</span>
                <button
                  type="button"
                  className="bg-white border border-[#d2d6de] text-gray-700 text-[12px] px-3 py-1 rounded-[2px] hover:bg-gray-100"
                >
                  Select Logo
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">
                Favicon (32x32 px)
              </label>
              <div className="p-3 border border-dashed border-[#d2d6de] rounded-[3px] bg-gray-50 flex items-center justify-between">
                <span className="text-[12px] text-gray-500">favicon.png (Current)</span>
                <button
                  type="button"
                  className="bg-white border border-[#d2d6de] text-gray-700 text-[12px] px-3 py-1 rounded-[2px] hover:bg-gray-100"
                >
                  Select Favicon
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">
                Email Logo
              </label>
              <div className="p-3 border border-dashed border-[#d2d6de] rounded-[3px] bg-gray-50 flex items-center justify-between">
                <span className="text-[12px] text-gray-500">logo_email.png (Current)</span>
                <button
                  type="button"
                  className="bg-white border border-[#d2d6de] text-gray-700 text-[12px] px-3 py-1 rounded-[2px] hover:bg-gray-100"
                >
                  Select Logo
                </button>
              </div>
            </div>
          </div>

          {/* Watermark Settings */}
          <div className="pt-3 border-t border-[#f4f4f4] space-y-4">
            <h4 className="text-[14px] font-semibold text-gray-800">Watermark</h4>
            <div className="flex items-center gap-6">
              <label className="flex items-center cursor-pointer text-[13px] text-gray-700">
                <input
                  type="radio"
                  name="watermarkStatus"
                  checked={watermarkStatus}
                  onChange={() => setWatermarkStatus(true)}
                  className="mr-2 text-[#3c8dbc]"
                />
                Enable Watermark on Product Images
              </label>
              <label className="flex items-center cursor-pointer text-[13px] text-gray-700">
                <input
                  type="radio"
                  name="watermarkStatus"
                  checked={!watermarkStatus}
                  onChange={() => setWatermarkStatus(false)}
                  className="mr-2 text-[#3c8dbc]"
                />
                Disable
              </label>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">
                Watermark Text
              </label>
              <input
                type="text"
                value={watermarkText}
                onChange={(e) => setWatermarkText(e.target.value)}
                className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
              />
            </div>
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
    </div>
  );
}
