"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Home, CheckCircle } from "lucide-react";

export default function PayoutSettingsPage() {
  const [minPaypal, setMinPaypal] = useState("50");
  const [minIban, setMinIban] = useState("100");
  const [minSwift, setMinSwift] = useState("250");
  const [minBtc, setMinBtc] = useState("100");

  const [enablePaypal, setEnablePaypal] = useState(true);
  const [enableIban, setEnableIban] = useState(true);
  const [enableSwift, setEnableSwift] = useState(true);
  const [enableBtc, setEnableBtc] = useState(false);

  const [notification, setNotification] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setNotification("Payout settings updated successfully!");
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="w-full text-[#333333] pb-12">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h1 className="text-[24px] font-normal text-[#333333] m-0">
          Payout Settings <small className="text-[14px] text-gray-500 font-light">Payouts</small>
        </h1>
        <div className="text-[12px] text-gray-500 flex items-center space-x-1 mt-1 sm:mt-0">
          <Link href="/admin" className="text-[#333333] hover:text-[#3c8dbc] flex items-center gap-1">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <span>/</span>
          <span className="text-gray-400">Payouts</span>
          <span>/</span>
          <span className="text-gray-600 font-medium">Payout Settings</span>
        </div>
      </div>

      {notification && (
        <div className="mb-4 px-4 py-3 bg-[#d4edda] border border-[#c3e6cb] text-[#155724] rounded-[3px] text-[13px] flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          {notification}
        </div>
      )}

      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* PayPal Box */}
        <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border-t-[3px] border-[#3c8dbc] border-x border-b border-[#d2d6de]/60">
          <div className="px-5 py-3 border-b border-[#f4f4f4] flex justify-between items-center">
            <h3 className="text-[#333333] text-[16px] font-semibold">PayPal</h3>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={enablePaypal}
                onChange={(e) => setEnablePaypal(e.target.checked)}
                className="w-4 h-4 text-[#3c8dbc] rounded border-gray-300"
              />
              <span className="ml-2 text-[13px] font-medium text-gray-700">Enable</span>
            </label>
          </div>
          <div className="p-5">
            <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">
              Minimum Payout Amount ($)
            </label>
            <input
              type="number"
              value={minPaypal}
              onChange={(e) => setMinPaypal(e.target.value)}
              className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
            />
          </div>
        </div>

        {/* IBAN Box */}
        <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border-t-[3px] border-[#3c8dbc] border-x border-b border-[#d2d6de]/60">
          <div className="px-5 py-3 border-b border-[#f4f4f4] flex justify-between items-center">
            <h3 className="text-[#333333] text-[16px] font-semibold">IBAN / Wire Transfer</h3>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={enableIban}
                onChange={(e) => setEnableIban(e.target.checked)}
                className="w-4 h-4 text-[#3c8dbc] rounded border-gray-300"
              />
              <span className="ml-2 text-[13px] font-medium text-gray-700">Enable</span>
            </label>
          </div>
          <div className="p-5">
            <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">
              Minimum Payout Amount ($)
            </label>
            <input
              type="number"
              value={minIban}
              onChange={(e) => setMinIban(e.target.value)}
              className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
            />
          </div>
        </div>

        {/* SWIFT Box */}
        <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border-t-[3px] border-[#3c8dbc] border-x border-b border-[#d2d6de]/60">
          <div className="px-5 py-3 border-b border-[#f4f4f4] flex justify-between items-center">
            <h3 className="text-[#333333] text-[16px] font-semibold">SWIFT</h3>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={enableSwift}
                onChange={(e) => setEnableSwift(e.target.checked)}
                className="w-4 h-4 text-[#3c8dbc] rounded border-gray-300"
              />
              <span className="ml-2 text-[13px] font-medium text-gray-700">Enable</span>
            </label>
          </div>
          <div className="p-5">
            <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">
              Minimum Payout Amount ($)
            </label>
            <input
              type="number"
              value={minSwift}
              onChange={(e) => setMinSwift(e.target.value)}
              className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
            />
          </div>
        </div>

        {/* Bitcoin Box */}
        <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border-t-[3px] border-[#3c8dbc] border-x border-b border-[#d2d6de]/60">
          <div className="px-5 py-3 border-b border-[#f4f4f4] flex justify-between items-center">
            <h3 className="text-[#333333] text-[16px] font-semibold">Bitcoin (BTC)</h3>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={enableBtc}
                onChange={(e) => setEnableBtc(e.target.checked)}
                className="w-4 h-4 text-[#3c8dbc] rounded border-gray-300"
              />
              <span className="ml-2 text-[13px] font-medium text-gray-700">Enable</span>
            </label>
          </div>
          <div className="p-5">
            <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">
              Minimum Payout Amount ($)
            </label>
            <input
              type="number"
              value={minBtc}
              onChange={(e) => setMinBtc(e.target.value)}
              className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
            />
          </div>
        </div>

        <div className="md:col-span-2 flex justify-end">
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
