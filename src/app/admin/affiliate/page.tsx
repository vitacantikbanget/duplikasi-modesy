"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Home, CheckCircle } from "lucide-react";

export default function AffiliateProgramPage() {
  const [affiliateStatus, setAffiliateStatus] = useState<"Enabled" | "Disabled">("Enabled");
  const [commissionType, setCommissionType] = useState<"first" | "all">("all");
  const [commissionRate, setCommissionRate] = useState("5");
  const [minPayout, setMinPayout] = useState("50");
  const [notification, setNotification] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setNotification("Affiliate program settings saved successfully!");
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="w-full text-[#333333] pb-12">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h1 className="text-[24px] font-normal text-[#333333] m-0">
          Affiliate Program <small className="text-[14px] text-gray-500 font-light">Management Tools</small>
        </h1>
        <div className="text-[12px] text-gray-500 flex items-center space-x-1 mt-1 sm:mt-0">
          <Link href="/admin" className="text-[#333333] hover:text-[#3c8dbc] flex items-center gap-1">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <span>/</span>
          <span className="text-gray-400">Management Tools</span>
          <span>/</span>
          <span className="text-gray-600 font-medium">Affiliate Program</span>
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
          <h3 className="text-[#333333] text-[16px] font-semibold">Affiliate Program Settings</h3>
        </div>

        <form onSubmit={handleSave} className="p-5 space-y-4">
          <div>
            <label className="block text-[13px] font-semibold text-[#333333] mb-2">
              Affiliate Program
            </label>
            <div className="flex items-center gap-6">
              <label className="flex items-center cursor-pointer text-[13px] text-gray-700">
                <input
                  type="radio"
                  name="affiliateStatus"
                  value="Enabled"
                  checked={affiliateStatus === "Enabled"}
                  onChange={() => setAffiliateStatus("Enabled")}
                  className="mr-2 text-[#3c8dbc]"
                />
                Enable
              </label>
              <label className="flex items-center cursor-pointer text-[13px] text-gray-700">
                <input
                  type="radio"
                  name="affiliateStatus"
                  value="Disabled"
                  checked={affiliateStatus === "Disabled"}
                  onChange={() => setAffiliateStatus("Disabled")}
                  className="mr-2 text-[#3c8dbc]"
                />
                Disable
              </label>
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[#333333] mb-2">
              Commission Rule
            </label>
            <div className="flex items-center gap-6">
              <label className="flex items-center cursor-pointer text-[13px] text-gray-700">
                <input
                  type="radio"
                  name="commissionType"
                  value="first"
                  checked={commissionType === "first"}
                  onChange={() => setCommissionType("first")}
                  className="mr-2 text-[#3c8dbc]"
                />
                First Order Only
              </label>
              <label className="flex items-center cursor-pointer text-[13px] text-gray-700">
                <input
                  type="radio"
                  name="commissionType"
                  value="all"
                  checked={commissionType === "all"}
                  onChange={() => setCommissionType("all")}
                  className="mr-2 text-[#3c8dbc]"
                />
                All Completed Orders
              </label>
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">
              Referral Commission Rate (%)
            </label>
            <input
              type="number"
              min={1}
              max={100}
              value={commissionRate}
              onChange={(e) => setCommissionRate(e.target.value)}
              className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
            />
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">
              Minimum Payout Limit ($)
            </label>
            <input
              type="number"
              value={minPayout}
              onChange={(e) => setMinPayout(e.target.value)}
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
