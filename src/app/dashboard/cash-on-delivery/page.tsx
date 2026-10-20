"use client";

import { useState } from "react";
import { Check, CheckCircle2 } from "lucide-react";

interface CodTransaction {
  id: string;
  orderNumber: string;
  commission: string;
  date: string;
}

export default function CashOnDeliveryPage() {
  const [status, setStatus] = useState<"enable" | "disable">("disable");
  const [transactions] = useState<CodTransaction[]>([]);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveChanges = () => {
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 3000);
  };

  return (
    <div className="w-full">
      {/* Title & Subtitle */}
      <div className="mb-6">
        <h1 className="text-[20px] font-bold text-[#2c333e] font-sans leading-tight">
          Cash on Delivery
        </h1>
        <p className="text-[13px] text-[#6c757d] font-normal mt-1">
          Sell your products with pay on delivery option
        </p>
      </div>

      {/* Success Notification */}
      {savedSuccess && (
        <div className="mb-6 p-4 rounded-[4px] bg-[#d1e7dd] border border-[#badbcc] text-[#0f5132] text-[13px] flex items-center justify-between animate-in fade-in duration-200">
          <span>Changes saved successfully!</span>
          <button
            type="button"
            onClick={() => setSavedSuccess(false)}
            className="text-[#0f5132] hover:text-[#0b3c25] font-bold ml-4"
          >
            ×
          </button>
        </div>
      )}

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (Transactions & Warning) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Transactions Card */}
          <div className="bg-white rounded-[4px] border border-[#e9ecef] p-6 shadow-xs">
            <h2 className="text-[15px] font-bold text-[#2c333e] font-sans mb-4">
              Transactions
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px] border-collapse">
                <thead>
                  <tr className="border-b border-[#dee2e6] text-[#2c333e] font-semibold text-[13px]">
                    <th className="py-2.5 px-3">Order</th>
                    <th className="py-2.5 px-3">Commission</th>
                    <th className="py-2.5 px-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f1f3f5]">
                  {transactions.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="py-8 text-center text-[#6c757d] text-[13px]">
                        No records found!
                      </td>
                    </tr>
                  ) : (
                    transactions.map((t) => (
                      <tr key={t.id} className="hover:bg-[#fafbfc]">
                        <td className="py-3 px-3 font-medium text-[#2c333e]">{t.orderNumber}</td>
                        <td className="py-3 px-3 text-[#2c333e]">{t.commission}</td>
                        <td className="py-3 px-3 text-[#6c757d]">{t.date}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Warning Box */}
          <div className="bg-[#d4edda] border border-[#c3e6cb] rounded-[4px] p-4 text-[#155724] text-[13px] leading-relaxed">
            <span className="font-bold">Warning!</span> Cash on Delivery commissions will be automatically deducted from your wallet balance. If your wallet has insufficient funds, the commission will be added as a debt. When these debts exceed the specified debt limit, this payment option will be automatically disabled for your store.
          </div>
        </div>

        {/* Right Column (Commission Debt & Status) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Commission Debt Card */}
          <div className="bg-white rounded-[4px] border border-[#e9ecef] p-6 shadow-xs">
            <h2 className="text-[15px] font-bold text-[#2c333e] font-sans mb-4">
              Commission Debt
            </h2>

            <div className="space-y-1.5">
              <p className="text-[#00ab97] font-medium text-[13.5px]">
                You have no debt.
              </p>
              <p className="text-[13px] text-[#6c757d]">
                Commission Debt Limit: <span className="font-bold text-[#2c333e]">$30</span>
              </p>
            </div>
          </div>

          {/* Status Card */}
          <div className="bg-white rounded-[4px] border border-[#e9ecef] p-6 shadow-xs">
            <h2 className="text-[15px] font-bold text-[#2c333e] font-sans mb-4">
              Status
            </h2>

            {/* Radio Options */}
            <div className="flex items-center gap-12 mt-3">
              {/* Enable Option */}
              <label
                onClick={() => setStatus("enable")}
                className="flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#2c333e]"
              >
                <div
                  className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center transition-all ${status === "enable"
                      ? "bg-[#00ab97] border-[#00ab97] text-white"
                      : "border-[#d1d5db] bg-white hover:border-gray-400"
                    }`}
                >
                  {status === "enable" && (
                    <Check className="w-3 h-3 stroke-[3]" />
                  )}
                </div>
                <span>Enable</span>
              </label>

              {/* Disable Option */}
              <label
                onClick={() => setStatus("disable")}
                className="flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#2c333e]"
              >
                <div
                  className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center transition-all ${status === "disable"
                      ? "bg-[#00ab97] border-[#00ab97] text-white"
                      : "border-[#d1d5db] bg-white hover:border-gray-400"
                    }`}
                >
                  {status === "disable" && (
                    <Check className="w-3 h-3 stroke-[3]" />
                  )}
                </div>
                <span>Disable</span>
              </label>
            </div>

            {/* Save Changes Button */}
            <div className="flex justify-end mt-8">
              <button
                type="button"
                onClick={handleSaveChanges}
                className="px-5 py-2 bg-[#00ab97] hover:bg-[#009180] text-white text-[13px] font-medium rounded-[3px] transition-colors shadow-2xs cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
