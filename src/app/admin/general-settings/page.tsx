"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Home, CheckCircle } from "lucide-react";

export default function GeneralSettingsPage() {
  const [appTitle, setAppTitle] = useState("Modesy");
  const [siteTitle, setSiteTitle] = useState("Modesy - Multi-Vendor Marketplace");
  const [adminEmail, setAdminEmail] = useState("admin@codingest.net");
  const [contactEmail, setContactEmail] = useState("contact@codingest.net");
  const [contactPhone, setContactPhone] = useState("+1 (555) 019-2834");
  const [contactAddress, setContactAddress] = useState("742 Evergreen Terrace, Springfield, OR");
  const [copyright, setCopyright] = useState("Copyright 2026 Modesy - All Rights Reserved.");
  const [timezone, setTimezone] = useState("America/New_York");
  const [notification, setNotification] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setNotification("General settings updated successfully!");
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="w-full text-[#333333] pb-12">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h1 className="text-[24px] font-normal text-[#333333] m-0">
          General Settings <small className="text-[14px] text-gray-500 font-light">Settings</small>
        </h1>
        <div className="text-[12px] text-gray-500 flex items-center space-x-1 mt-1 sm:mt-0">
          <Link href="/admin" className="text-[#333333] hover:text-[#3c8dbc] flex items-center gap-1">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <span>/</span>
          <span className="text-gray-400">Settings</span>
          <span>/</span>
          <span className="text-gray-600 font-medium">General Settings</span>
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
          <h3 className="text-[#333333] text-[16px] font-semibold">General Settings</h3>
        </div>

        <form onSubmit={handleSave} className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">Application Name *</label>
              <input
                type="text"
                required
                value={appTitle}
                onChange={(e) => setAppTitle(e.target.value)}
                className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
              />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">Timezone</label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
              >
                <option value="America/New_York">America/New_York (UTC-5)</option>
                <option value="Europe/London">Europe/London (UTC+0)</option>
                <option value="Europe/Paris">Europe/Paris (UTC+1)</option>
                <option value="Asia/Jakarta">Asia/Jakarta (UTC+7)</option>
                <option value="Asia/Tokyo">Asia/Tokyo (UTC+9)</option>
                <option value="UTC">UTC</option>
              </select>
            </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">Administrator Email *</label>
              <input
                type="email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
              />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">Contact Email *</label>
              <input
                type="email"
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">Contact Phone</label>
              <input
                type="text"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
              />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">Contact Address</label>
              <input
                type="text"
                value={contactAddress}
                onChange={(e) => setContactAddress(e.target.value)}
                className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">Copyright Text</label>
            <input
              type="text"
              value={copyright}
              onChange={(e) => setCopyright(e.target.value)}
              className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
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
    </div>
  );
}
