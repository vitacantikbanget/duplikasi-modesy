"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Home, CheckCircle } from "lucide-react";

export default function FontSettingsPage() {
  const [primaryFont, setPrimaryFont] = useState("Open Sans");
  const [secondaryFont, setSecondaryFont] = useState("Open Sans");
  const [notification, setNotification] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setNotification("Font settings updated successfully!");
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="w-full text-[#333333] pb-12">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h1 className="text-[24px] font-normal text-[#333333] m-0">
          Font Settings <small className="text-[14px] text-gray-500 font-light">Settings</small>
        </h1>
        <div className="text-[12px] text-gray-500 flex items-center space-x-1 mt-1 sm:mt-0">
          <Link href="/admin" className="text-[#333333] hover:text-[#3c8dbc] flex items-center gap-1">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <span>/</span>
          <span className="text-gray-400">Settings</span>
          <span>/</span>
          <span className="text-gray-600 font-medium">Font Settings</span>
        </div>
      </div>

      {notification && (
        <div className="mb-4 px-4 py-3 bg-[#d4edda] border border-[#c3e6cb] text-[#155724] rounded-[3px] text-[13px] flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          {notification}
        </div>
      )}

      {/* Main Box */}
      <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border-t-[3px] border-[#3c8dbc] border-x border-b border-[#d2d6de]/60 max-w-3xl">
        <div className="px-5 py-3 border-b border-[#f4f4f4]">
          <h3 className="text-[#333333] text-[16px] font-semibold">Font Settings</h3>
        </div>

        <form onSubmit={handleSave} className="p-5 space-y-4">
          <div>
            <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">
              Primary Font (Body Text)
            </label>
            <select
              value={primaryFont}
              onChange={(e) => setPrimaryFont(e.target.value)}
              className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
            >
              <option value="Open Sans">Open Sans</option>
              <option value="Roboto">Roboto</option>
              <option value="Lato">Lato</option>
              <option value="Montserrat">Montserrat</option>
              <option value="Poppins">Poppins</option>
              <option value="Inter">Inter</option>
            </select>
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">
              Secondary Font (Headings)
            </label>
            <select
              value={secondaryFont}
              onChange={(e) => setSecondaryFont(e.target.value)}
              className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
            >
              <option value="Open Sans">Open Sans</option>
              <option value="Roboto">Roboto</option>
              <option value="Lato">Lato</option>
              <option value="Montserrat">Montserrat</option>
              <option value="Poppins">Poppins</option>
              <option value="Inter">Inter</option>
            </select>
          </div>

          <div className="p-4 bg-gray-50 border border-gray-200 rounded-[3px] mt-4 space-y-1">
            <p className="text-[11px] text-gray-400 font-semibold uppercase">Typography Preview</p>
            <p className="text-[18px] font-bold text-gray-800">
              The quick brown fox jumps over the lazy dog.
            </p>
            <p className="text-[13px] text-gray-600">
              Modesy Multi-Vendor Marketplace platform with custom fonts and responsive aesthetics.
            </p>
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
