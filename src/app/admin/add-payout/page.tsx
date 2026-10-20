"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Home, CheckCircle } from "lucide-react";

export default function AddPayoutPage() {
  const [userName, setUserName] = useState("Trendshop");
  const [payoutMethod, setPayoutMethod] = useState("PayPal");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("Completed");
  const [notification, setNotification] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !amount) return;

    setNotification(`Payout of $${amount} added successfully!`);
    setAmount("");
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="w-full text-[#333333] pb-12">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h1 className="text-[24px] font-normal text-[#333333] m-0">
          Add Payout <small className="text-[14px] text-gray-500 font-light">Payouts</small>
        </h1>
        <div className="text-[12px] text-gray-500 flex items-center space-x-1 mt-1 sm:mt-0">
          <Link href="/admin" className="text-[#333333] hover:text-[#3c8dbc] flex items-center gap-1">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <span>/</span>
          <span className="text-gray-400">Payouts</span>
          <span>/</span>
          <span className="text-gray-600 font-medium">Add Payout</span>
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
        <div className="px-5 py-3 border-b border-[#f4f4f4] flex justify-between items-center">
          <h3 className="text-[#333333] text-[16px] font-semibold">Add Payout</h3>
          <Link
            href="/admin/payout-requests"
            className="text-[12px] bg-[#00c0ef] hover:bg-[#00acd6] text-white px-3 py-1 rounded-[2px] transition-colors"
          >
            Payout Requests
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">
              User *
            </label>
            <select
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
            >
              <option value="Trendshop">Trendshop (Balance: $4,250.00)</option>
              <option value="James Baronie">James Baronie (Balance: $650.00)</option>
              <option value="Linda Martin">Linda Martin (Balance: $420.00)</option>
              <option value="Alex Miller">Alex Miller (Balance: $306.00)</option>
            </select>
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">
              Payout Method *
            </label>
            <select
              value={payoutMethod}
              onChange={(e) => setPayoutMethod(e.target.value)}
              className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
            >
              <option value="PayPal">PayPal</option>
              <option value="IBAN">IBAN / Bank Wire</option>
              <option value="SWIFT">SWIFT</option>
              <option value="Bitcoin">Bitcoin (BTC)</option>
            </select>
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">
              Withdraw Amount ($) *
            </label>
            <input
              type="number"
              step="0.01"
              required
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
            />
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">
              Status *
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
            >
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <div className="pt-3 border-t border-[#f4f4f4] flex justify-end">
            <button
              type="submit"
              className="bg-[#00a65a] hover:bg-[#008d4c] text-white px-5 py-2 rounded-[3px] text-[13px] font-medium shadow-2xs transition-colors"
            >
              Add Payout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
