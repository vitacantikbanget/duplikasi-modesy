"use client";

import React, { useState } from "react";
import { Check, CheckCircle } from "lucide-react";

interface PayoutMethodSetting {
  id: string;
  title: string;
  status: "Enable" | "Disable";
  minAmount: string;
}

export default function PayoutSettingsPage() {
  const [methods, setMethods] = useState<Record<string, PayoutMethodSetting>>({
    paypal: {
      id: "paypal",
      title: "PayPal",
      status: "Enable",
      minAmount: "500",
    },
    btc: {
      id: "btc",
      title: "Bitcoin (BTC)",
      status: "Enable",
      minAmount: "500",
    },
    iban: {
      id: "iban",
      title: "IBAN",
      status: "Enable",
      minAmount: "500",
    },
    swift: {
      id: "swift",
      title: "SWIFT",
      status: "Enable",
      minAmount: "500",
    },
  });

  const [notification, setNotification] = useState<string | null>(null);

  const handleStatusChange = (key: string, newStatus: "Enable" | "Disable") => {
    setMethods((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        status: newStatus,
      },
    }));
  };

  const handleAmountChange = (key: string, newAmount: string) => {
    setMethods((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        minAmount: newAmount,
      },
    }));
  };

  const handleSave = (key: string, title: string) => {
    setNotification(`${title} payout settings saved successfully.`);
    setTimeout(() => setNotification(null), 3500);
  };

  return (
    <div className="w-full text-[#333333] font-sans pb-16">
      {/* Page Title */}
      <div className="mb-4">
        <h1 className="text-[22px] font-normal text-[#333333]">Payout Settings</h1>
      </div>

      {/* Success Notification Alert */}
      {notification && (
        <div className="mb-4 bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-2.5 rounded-[3px] text-sm flex items-center justify-between shadow-xs">
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

      {/* 2x2 Grid of 4 Payout Method Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.values(methods).map((item) => (
          <div
            key={item.id}
            className="bg-white border border-[#d2d6de] rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.06)] p-6 flex flex-col justify-between"
          >
            <div>
              {/* Card Title */}
              <h2 className="text-[15px] font-normal text-[#333333] mb-5">
                {item.title}
              </h2>

              <div className="space-y-4 text-[13px]">
                {/* Status Radio Group */}
                <div>
                  <label className="block text-[#333333] font-normal mb-2.5">
                    Status
                  </label>
                  <div className="flex items-center gap-12">
                    {/* Enable */}
                    <label
                      onClick={() => handleStatusChange(item.id, "Enable")}
                      className="flex items-center gap-2 cursor-pointer select-none group"
                    >
                      <div
                        className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center transition-colors ${
                          item.status === "Enable"
                            ? "bg-[#5b69bc] border-[#5b69bc] text-white"
                            : "border-[#b0b7c3] bg-white group-hover:border-[#5b69bc]"
                        }`}
                      >
                        {item.status === "Enable" && (
                          <Check className="w-3 h-3 stroke-[3]" />
                        )}
                      </div>
                      <span className="text-[#333333] text-[13px]">Enable</span>
                    </label>

                    {/* Disable */}
                    <label
                      onClick={() => handleStatusChange(item.id, "Disable")}
                      className="flex items-center gap-2 cursor-pointer select-none group"
                    >
                      <div
                        className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center transition-colors ${
                          item.status === "Disable"
                            ? "bg-[#5b69bc] border-[#5b69bc] text-white"
                            : "border-[#b0b7c3] bg-white group-hover:border-[#5b69bc]"
                        }`}
                      >
                        {item.status === "Disable" && (
                          <Check className="w-3 h-3 stroke-[3]" />
                        )}
                      </div>
                      <span className="text-[#333333] text-[13px]">Disable</span>
                    </label>
                  </div>
                </div>

                {/* Minimum payout amount */}
                <div>
                  <label className="block text-[#333333] font-normal mb-1.5">
                    Minimum payout amount
                  </label>
                  <div className="flex">
                    <span className="bg-[#eee] border border-r-0 border-[#d2d6de] px-3.5 flex items-center text-[13px] text-[#555] rounded-l-[3px] select-none whitespace-nowrap">
                      USD ($)
                    </span>
                    <input
                      type="number"
                      min="0"
                      value={item.minAmount}
                      onChange={(e) => handleAmountChange(item.id, e.target.value)}
                      className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-r-[3px] text-[13px] text-[#555] outline-none focus:border-[#5b69bc]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Save Changes Button (Right Aligned) */}
            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={() => handleSave(item.id, item.title)}
                className="bg-[#0073b7] hover:bg-[#005a91] text-white text-[13px] font-medium px-5 py-2 rounded-[3px] transition-colors cursor-pointer shadow-xs"
              >
                Save Changes
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
