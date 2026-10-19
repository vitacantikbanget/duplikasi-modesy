"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function DeleteAccountSettingsPage() {
  const [password, setPassword] = useState("");

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      alert("Please enter your password to proceed.");
      return;
    }
    if (
      confirm(
        "Are you sure you want to permanently delete your Modesy account? This action cannot be reversed."
      )
    ) {
      alert("Account deletion request has been submitted for admin approval.");
    }
  };

  return (
    <div className="space-y-5">
      {/* Red Warning Banner matching exact text from Screenshot 4 */}
      <div className="p-4 bg-[#fde8e8] text-[#c81e1e] rounded-[3px] text-[13px] leading-relaxed">
        Deleting your account is permanent and cannot be reversed. All data, including
        preferences and subscriptions, will be lost. The process requires admin
        approval, which may take some time. Please enter your password and confirm to
        proceed.
      </div>

      <form onSubmit={handleDelete} className="space-y-4">
        {/* Password */}
        <div>
          <label className="block text-[13px] font-semibold text-[#222] mb-1.5">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3.5 py-2.5 border border-[#d2d6de] focus:border-[#e53935] rounded-[3px] text-[13px] text-[#333] placeholder:text-gray-400 focus:outline-none transition-colors"
            required
          />
        </div>

        {/* Delete Account Red Button matching Screenshot 4 */}
        <div className="pt-1">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#e53935] hover:bg-[#d32f2f] text-white rounded-[3px] text-[13.5px] font-medium transition-colors shadow-2xs cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
            <span>Delete Account</span>
          </button>
        </div>
      </form>
    </div>
  );
}
