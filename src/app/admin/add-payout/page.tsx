"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  List,
  CheckCircle,
  ChevronDown,
} from "lucide-react";

export default function AddPayoutPage() {
  const [selectedUser, setSelectedUser] = useState("");
  const [withdrawalMethod, setWithdrawalMethod] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("0");
  const [status, setStatus] = useState("");
  const [notification, setNotification] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || selectedUser === "Select") {
      alert("Please select a user.");
      return;
    }
    if (!withdrawalMethod || withdrawalMethod === "Select") {
      alert("Please select a withdrawal method.");
      return;
    }
    if (!status || status === "Select") {
      alert("Please select a status.");
      return;
    }

    setNotification(
      `Payout of $${withdrawalAmount} for ${selectedUser} added successfully.`
    );
    setSelectedUser("");
    setWithdrawalMethod("");
    setWithdrawalAmount("0");
    setStatus("");
    setTimeout(() => setNotification(null), 3500);
  };

  return (
    <div className="w-full text-[#333333] font-sans pb-16">
      {/* Header Row: Title & Payout Requests green button */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h1 className="text-[22px] font-normal text-[#333333]">Add Payout</h1>

        <Link
          href="/admin/payout-requests"
          className="bg-[#00a65a] hover:bg-[#008d4c] text-white text-[13px] font-medium h-[34px] px-3.5 rounded-[3px] flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
        >
          <List className="w-4 h-4" />
          <span>Payout Requests</span>
        </Link>
      </div>

      {/* Success Notification Alert */}
      {notification && (
        <div className="mb-4 bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-2.5 rounded-[3px] text-sm flex items-center justify-between shadow-xs max-w-[650px]">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{notification}</span>
          </div>
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="text-xs text-emerald-700 font-semibold hover:underline cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Form Box: Exactly matching screenshot */}
      <div className="bg-white border border-[#d2d6de] rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.06)] p-6 max-w-[650px]">
        <form onSubmit={handleSubmit} className="space-y-4 text-[13px]">
          {/* User Field */}
          <div>
            <label className="block text-[#333333] font-normal mb-1.5">
              User
            </label>
            <div className="relative">
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                required
                className="appearance-none w-full bg-white border border-[#d2d6de] rounded-[3px] h-[36px] pl-3 pr-8 text-[13px] text-[#555] outline-none focus:border-[#5b69bc] cursor-pointer"
              >
                <option value="">Select</option>
                <option value="Admin">Admin (Balance: $1,246.15)</option>
                <option value="Trendshop">Trendshop (Balance: $896.52)</option>
                <option value="Peter Jone">Peter Jone (Balance: $9.95)</option>
                <option value="James Baronie">James Baronie (Balance: $650.00)</option>
                <option value="Linda Martin">Linda Martin (Balance: $420.00)</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Withdrawal Method Field */}
          <div>
            <label className="block text-[#333333] font-normal mb-1.5">
              Withdrawal Method
            </label>
            <div className="relative">
              <select
                value={withdrawalMethod}
                onChange={(e) => setWithdrawalMethod(e.target.value)}
                required
                className="appearance-none w-full bg-white border border-[#d2d6de] rounded-[3px] h-[36px] pl-3 pr-8 text-[13px] text-[#555] outline-none focus:border-[#5b69bc] cursor-pointer"
              >
                <option value="">Select</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="PayPal">PayPal</option>
                <option value="Stripe / Payout">Stripe / Payout</option>
                <option value="Bitcoin">Bitcoin</option>
                <option value="Swift">Swift</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Withdrawal Amount Field with USD ($) addon */}
          <div>
            <label className="block text-[#333333] font-normal mb-1.5">
              Withdrawal Amount
            </label>
            <div className="flex">
              <span className="bg-[#eee] border border-r-0 border-[#d2d6de] px-3.5 flex items-center text-[13px] text-[#555] rounded-l-[3px] select-none whitespace-nowrap">
                USD ($)
              </span>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                value={withdrawalAmount}
                onChange={(e) => setWithdrawalAmount(e.target.value)}
                className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-r-[3px] text-[13px] text-[#555] outline-none focus:border-[#5b69bc]"
              />
            </div>
          </div>

          {/* Status Field */}
          <div>
            <label className="block text-[#333333] font-normal mb-1.5">
              Status
            </label>
            <div className="relative">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
                className="appearance-none w-full bg-white border border-[#d2d6de] rounded-[3px] h-[36px] pl-3 pr-8 text-[13px] text-[#555] outline-none focus:border-[#5b69bc] cursor-pointer"
              >
                <option value="">Select</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Submit Button (Aligned to the Right) */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-[#0073b7] hover:bg-[#005a91] text-white text-[13px] font-medium px-5 py-2 rounded-[3px] transition-colors cursor-pointer shadow-xs"
            >
              Add Payout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
