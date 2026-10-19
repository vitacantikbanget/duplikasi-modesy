"use client";

import { useState } from "react";
import { Check } from "lucide-react";

export default function ChangePasswordSettingsPage() {
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match!");
      return;
    }
    setSaveSuccess(true);
    setOldPassword("");
    setPassword("");
    setConfirmPassword("");
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3500);
  };

  return (
    <div>
      {/* Success Alert Banner */}
      {saveSuccess && (
        <div className="mb-5 p-4 bg-[#e8f8f5] border border-[#a3e4d7] text-[#0e6251] rounded-[3px] text-[13.5px] flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#00ab97] stroke-[3]" />
            <span>Your password has been changed successfully!</span>
          </div>
          <button
            onClick={() => setSaveSuccess(false)}
            className="text-[#0e6251] hover:text-black text-[12px] font-semibold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Form matching Screenshot 2 */}
      <form onSubmit={handleSave} className="space-y-4">
        {/* Old Password */}
        <div>
          <label className="block text-[13px] font-semibold text-[#222] mb-1.5">
            Old Password
          </label>
          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full px-3.5 py-2.5 border border-[#d2d6de] focus:border-[#00ab97] rounded-[3px] text-[13px] text-[#333] placeholder:text-gray-400 focus:outline-none transition-colors"
            required
          />
        </div>

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
            className="w-full px-3.5 py-2.5 border border-[#d2d6de] focus:border-[#00ab97] rounded-[3px] text-[13px] text-[#333] placeholder:text-gray-400 focus:outline-none transition-colors"
            required
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-[13px] font-semibold text-[#222] mb-1.5">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3.5 py-2.5 border border-[#d2d6de] focus:border-[#00ab97] rounded-[3px] text-[13px] text-[#333] placeholder:text-gray-400 focus:outline-none transition-colors"
            required
          />
        </div>

        {/* Change Password Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#00ab97] hover:bg-[#009684] text-white rounded-[3px] text-[13.5px] font-medium transition-colors shadow-2xs cursor-pointer"
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
}
