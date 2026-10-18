"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CreditCard,
  Send,
  X,
  Plus,
  Printer,
  Receipt,
  Upload,
  CheckCircle,
  FileCheck,
} from "lucide-react";
import {
  getMemberWallet,
  reportBankTransfer,
  requestMemberPayout,
  updateMemberPayoutSettings,
  WALLET_CHANGE_EVENT,
  WalletDeposit,
  WalletData,
  PayoutSettings,
} from "@/lib/member-wallet";

export default function MemberWallet() {
  const router = useRouter();

  const [wallet, setWallet] = useState<WalletData>(getMemberWallet);
  const [activeTab, setActiveTab] = useState<"deposits" | "expenses" | "payouts" | "set-payout-account">("deposits");
  const [payoutMethodTab, setPayoutMethodTab] = useState<"paypal" | "bitcoin" | "iban" | "swift">("paypal");

  // Modals state
  const [isAddFundsOpen, setIsAddFundsOpen] = useState(false);
  const [addFundsAmount, setAddFundsAmount] = useState("12");
  const [addFundsError, setAddFundsError] = useState<string | null>(null);

  const [reportingDeposit, setReportingDeposit] = useState<WalletDeposit | null>(null);
  const [reportRefNumber, setReportRefNumber] = useState("");
  const [reportBankName, setReportBankName] = useState("");
  const [reportNotes, setReportNotes] = useState("");
  const [reportReceiptFile, setReportReceiptFile] = useState<string>("");

  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState("0.00");
  const [payoutMethod, setPayoutMethod] = useState("PayPal");
  const [payoutError, setPayoutError] = useState("");

  const [invoiceDeposit, setInvoiceDeposit] = useState<WalletDeposit | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [payoutSettings, setPayoutSettings] = useState<PayoutSettings>(wallet.payoutSettings);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    // Initial fetch from storage
    const current = getMemberWallet();
    setWallet(current);
    setPayoutSettings(current.payoutSettings);

    const handleWalletChange = (e: Event) => {
      const customEvent = e as CustomEvent<WalletData>;
      if (customEvent.detail) {
        setWallet(customEvent.detail);
        setPayoutSettings(customEvent.detail.payoutSettings);
      }
    };

    window.addEventListener(WALLET_CHANGE_EVENT, handleWalletChange);

    // Check URL search params for redirect toasts
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("success") === "true") {
        showToast("Payment completed successfully and funds added to your wallet!");
        window.history.replaceState({}, "", window.location.pathname);
      } else if (params.get("reported") === "pending") {
        showToast("Bank transfer order placed! Please report your transfer below.");
        window.history.replaceState({}, "", window.location.pathname);
      }
    }

    return () => {
      window.removeEventListener(WALLET_CHANGE_EVENT, handleWalletChange);
    };
  }, []);

  const handleAddFundsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(addFundsAmount);
    if (isNaN(parsed) || parsed < 10) {
      setAddFundsError("The minimum deposit amount is $10");
      return;
    }
    setAddFundsError(null);
    setIsAddFundsOpen(false);
    router.push(`/member/wallet/deposit?amount=${parsed}`);
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportingDeposit) return;
    const res = reportBankTransfer(reportingDeposit.id);
    if (res.success) {
      showToast("Bank transfer report has been submitted for review!");
    }
    setReportingDeposit(null);
    setReportRefNumber("");
    setReportBankName("");
    setReportNotes("");
    setReportReceiptFile("");
  };

  const handlePayoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(payoutAmount);
    if (isNaN(parsed) || parsed < 500) {
      setPayoutError(`Minimum payout amount for ${payoutMethod} is $500.`);
      return;
    }
    if (parsed > wallet.balance) {
      setPayoutError("Withdrawal amount cannot exceed available wallet balance.");
      return;
    }
    setPayoutError("");
    const res = requestMemberPayout({ amount: parsed, method: payoutMethod });
    if (res.success) {
      showToast(`Payout request for $${parsed.toFixed(2)} USD placed successfully.`);
      setIsPayoutModalOpen(false);
      setPayoutAmount("0.00");
    } else if (res.error) {
      setPayoutError(res.error);
    }
  };

  const handleSavePayoutSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateMemberPayoutSettings(payoutSettings);
    showToast("Payout account settings have been saved successfully!");
  };

  return (
    <div className="w-full bg-[#f8f9fa] min-h-[calc(100vh-280px)] py-6 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#00a99d] text-white px-4 py-3 rounded-[3px] shadow-lg flex items-center gap-2.5 text-xs animate-in fade-in duration-200">
          <CheckCircle className="w-4 h-4 text-white shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-[1320px] mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="text-[13px] text-gray-500 mb-4 flex items-center gap-1.5 font-normal">
          <Link href="/member" className="hover:text-[#00a99d] transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-700">Wallet</span>
        </nav>

        {/* Title */}
        <h1 className="text-[24px] sm:text-[26px] font-bold text-[#222] tracking-tight mb-8">
          Wallet
        </h1>

        {/* Centered Balance Card */}
        <div className="bg-white border border-[#ebebeb] rounded-sm p-8 sm:p-10 max-w-[640px] mx-auto relative text-center mb-8 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <button
            type="button"
            onClick={() => setIsAddFundsOpen(true)}
            className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#f8f9fa] hover:bg-gray-100 text-gray-700 text-xs font-medium rounded-sm border border-gray-300 transition cursor-pointer"
          >
            <CreditCard className="w-3.5 h-3.5 text-gray-500" />
            <span>Add Funds</span>
          </button>

          <div className="flex justify-center mb-3">
            <svg className="w-12 h-10" viewBox="0 0 44 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="4" width="40" height="26" rx="4" fill="#00a99d" />
              <path
                d="M28 11C28 9.89543 28.8954 9 30 9H42V25H30C28.8954 25 28 24.1046 28 23V11Z"
                fill="#008d83"
              />
              <circle cx="34" cy="17" r="2.2" fill="#ffffff" />
            </svg>
          </div>

          <div className="text-xs text-gray-500 font-medium mb-1">Wallet Balance</div>
          <div className="text-[34px] sm:text-[38px] font-bold text-[#222] tracking-tight">
            ${wallet.balance.toFixed(2)}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <button
            type="button"
            onClick={() => setActiveTab("deposits")}
            className={`px-5 sm:px-6 py-2 text-xs font-semibold rounded-[2px] border transition cursor-pointer ${
              activeTab === "deposits"
                ? "bg-[#00a99d] border-[#00a99d] text-white"
                : "bg-white border-[#ebebeb] text-gray-600 hover:text-gray-900 hover:border-gray-300"
            }`}
          >
            Deposits
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("expenses")}
            className={`px-5 sm:px-6 py-2 text-xs font-semibold rounded-[2px] border transition cursor-pointer ${
              activeTab === "expenses"
                ? "bg-[#00a99d] border-[#00a99d] text-white"
                : "bg-white border-[#ebebeb] text-gray-600 hover:text-gray-900 hover:border-gray-300"
            }`}
          >
            Expenses
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("payouts")}
            className={`px-5 sm:px-6 py-2 text-xs font-semibold rounded-[2px] border transition cursor-pointer ${
              activeTab === "payouts"
                ? "bg-[#00a99d] border-[#00a99d] text-white"
                : "bg-white border-[#ebebeb] text-gray-600 hover:text-gray-900 hover:border-gray-300"
            }`}
          >
            Payouts
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("set-payout-account")}
            className={`px-5 sm:px-6 py-2 text-xs font-semibold rounded-[2px] border transition cursor-pointer ${
              activeTab === "set-payout-account"
                ? "bg-[#00a99d] border-[#00a99d] text-white"
                : "bg-white border-[#ebebeb] text-gray-600 hover:text-gray-900 hover:border-gray-300"
            }`}
          >
            Set Payout Account
          </button>
        </div>

        {/* Deposits Tab */}
        {activeTab === "deposits" && (
          <div className="bg-white border border-[#ebebeb] rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#ebebeb] text-gray-800 font-bold text-[12px]">
                    <th className="py-3.5 px-4 font-bold">Payment Id</th>
                    <th className="py-3.5 px-4 font-bold">Payment Method</th>
                    <th className="py-3.5 px-4 font-bold">Deposit Amount</th>
                    <th className="py-3.5 px-4 font-bold">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {wallet.deposits.map((dep) => (
                    <tr key={dep.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-4 font-normal text-gray-800 align-top">
                        {dep.paymentId}
                      </td>
                      <td className="py-4 px-4 text-gray-700 align-top">{dep.paymentMethod}</td>
                      <td className="py-4 px-4 align-top">
                        <div>
                          <div className="text-gray-700 font-normal">
                            ${dep.amount} ({dep.currency}) - {dep.status}
                          </div>
                          {dep.isReported ? (
                            <span className="text-[#007bff] text-xs font-normal mt-0.5 block">
                              (Pending)
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setReportingDeposit(dep)}
                              className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-[#00a99d] hover:bg-[#008f85] text-white text-[11px] font-semibold rounded-[2px] transition cursor-pointer border-0"
                            >
                              <Send className="w-3 h-3" />
                              <span>Report Bank Transfer</span>
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 align-top">
                        <div className="text-gray-700">{dep.date}</div>
                        <button
                          type="button"
                          onClick={() => setInvoiceDeposit(dep)}
                          className="text-[#007bff] hover:underline text-xs mt-1 block cursor-pointer bg-transparent border-0 p-0"
                        >
                          View Invoice
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Expenses Tab */}
        {activeTab === "expenses" && (
          <div className="bg-white border border-[#ebebeb] rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#ebebeb] text-gray-800 font-bold text-[12px]">
                    <th className="py-3.5 px-4 font-bold">Payment Id</th>
                    <th className="py-3.5 px-4 font-bold">Expense</th>
                    <th className="py-3.5 px-4 font-bold">Expense Amount</th>
                    <th className="py-3.5 px-4 font-bold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {wallet.expenses.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-16 text-center text-gray-400 font-normal text-sm">
                        No records found!
                      </td>
                    </tr>
                  ) : (
                    wallet.expenses.map((exp) => (
                      <tr key={exp.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-3.5 px-4 font-medium text-gray-900">{exp.paymentId}</td>
                        <td className="py-3.5 px-4 text-gray-700">{exp.expenseTitle}</td>
                        <td className="py-3.5 px-4 font-bold text-gray-900">
                          ${exp.amount.toFixed(2)} ({exp.currency})
                        </td>
                        <td className="py-3.5 px-4 text-gray-600">{exp.date}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Payouts Tab */}
        {activeTab === "payouts" && (
          <div className="bg-white border border-[#ebebeb] rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="p-4 flex justify-end border-b border-gray-100">
              <button
                type="button"
                onClick={() => setIsPayoutModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold rounded-[2px] transition cursor-pointer border-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Payout Request</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#ebebeb] text-gray-800 font-bold text-[12px]">
                    <th className="py-3.5 px-4 font-bold">Withdrawal Method</th>
                    <th className="py-3.5 px-4 font-bold">Withdrawal Amount</th>
                    <th className="py-3.5 px-4 font-bold">Status</th>
                    <th className="py-3.5 px-4 font-bold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {wallet.payouts.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-16 text-center text-gray-400 font-normal text-sm">
                        No records found!
                      </td>
                    </tr>
                  ) : (
                    wallet.payouts.map((pay) => (
                      <tr key={pay.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-3.5 px-4 font-medium text-gray-900">{pay.withdrawalMethod}</td>
                        <td className="py-3.5 px-4 font-bold text-gray-900">
                          ${pay.withdrawalAmount.toFixed(2)} ({pay.currency})
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-700">
                            {pay.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-gray-600">{pay.date}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Set Payout Account Tab */}
        {activeTab === "set-payout-account" && (
          <div className="bg-white border border-[#ebebeb] rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.03)] p-6 sm:p-8">
            <div className="flex flex-wrap gap-2 mb-6">
              {(["paypal", "bitcoin", "iban", "swift"] as const).map((method) => {
                const isSelected = payoutMethodTab === method;
                const labels: Record<string, string> = {
                  paypal: "PayPal",
                  bitcoin: "Bitcoin (BTC)",
                  iban: "IBAN",
                  swift: "SWIFT",
                };
                return (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPayoutMethodTab(method)}
                    className={`px-4 py-2 text-xs font-semibold rounded-[2px] transition cursor-pointer border-0 ${
                      isSelected
                        ? "bg-[#00a99d] text-white"
                        : "bg-[#f1f3f5] hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    {labels[method]}
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleSavePayoutSettings}>
              {payoutMethodTab === "paypal" && (
                <div className="mb-6">
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    PayPal Email Address*
                  </label>
                  <input
                    type="email"
                    required
                    value={payoutSettings.paypalEmail}
                    onChange={(e) =>
                      setPayoutSettings({ ...payoutSettings, paypalEmail: e.target.value })
                    }
                    className="w-full text-xs px-3.5 py-2.5 bg-white border border-gray-300 rounded-[2px] focus:outline-none focus:border-[#00a99d] text-gray-800"
                  />
                </div>
              )}

              {payoutMethodTab === "bitcoin" && (
                <div className="mb-6">
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    BTC Address*
                  </label>
                  <input
                    type="text"
                    required
                    value={payoutSettings.btcAddress}
                    onChange={(e) =>
                      setPayoutSettings({ ...payoutSettings, btcAddress: e.target.value })
                    }
                    className="w-full text-xs px-3.5 py-2.5 bg-white border border-gray-300 rounded-[2px] focus:outline-none focus:border-[#00a99d] text-gray-800"
                  />
                </div>
              )}

              {payoutMethodTab === "iban" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Full Name*
                    </label>
                    <input
                      type="text"
                      required
                      value={payoutSettings.iban.fullName}
                      onChange={(e) =>
                        setPayoutSettings({
                          ...payoutSettings,
                          iban: { ...payoutSettings.iban, fullName: e.target.value },
                        })
                      }
                      className="w-full text-xs px-3.5 py-2.5 border border-gray-300 rounded-[2px] focus:border-[#00a99d] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Country*
                    </label>
                    <input
                      type="text"
                      required
                      value={payoutSettings.iban.country}
                      onChange={(e) =>
                        setPayoutSettings({
                          ...payoutSettings,
                          iban: { ...payoutSettings.iban, country: e.target.value },
                        })
                      }
                      className="w-full text-xs px-3.5 py-2.5 border border-gray-300 rounded-[2px] focus:border-[#00a99d] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Bank Name*
                    </label>
                    <input
                      type="text"
                      required
                      value={payoutSettings.iban.bankName}
                      onChange={(e) =>
                        setPayoutSettings({
                          ...payoutSettings,
                          iban: { ...payoutSettings.iban, bankName: e.target.value },
                        })
                      }
                      className="w-full text-xs px-3.5 py-2.5 border border-gray-300 rounded-[2px] focus:border-[#00a99d] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      IBAN Number*
                    </label>
                    <input
                      type="text"
                      required
                      value={payoutSettings.iban.ibanNumber}
                      onChange={(e) =>
                        setPayoutSettings({
                          ...payoutSettings,
                          iban: { ...payoutSettings.iban, ibanNumber: e.target.value },
                        })
                      }
                      className="w-full text-xs px-3.5 py-2.5 border border-gray-300 rounded-[2px] focus:border-[#00a99d] outline-none"
                    />
                  </div>
                </div>
              )}

              {payoutMethodTab === "swift" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Full Name*
                    </label>
                    <input
                      type="text"
                      required
                      value={payoutSettings.swift.fullName}
                      onChange={(e) =>
                        setPayoutSettings({
                          ...payoutSettings,
                          swift: { ...payoutSettings.swift, fullName: e.target.value },
                        })
                      }
                      className="w-full text-xs px-3.5 py-2.5 border border-gray-300 rounded-[2px] focus:border-[#00a99d] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Country*
                    </label>
                    <input
                      type="text"
                      required
                      value={payoutSettings.swift.country}
                      onChange={(e) =>
                        setPayoutSettings({
                          ...payoutSettings,
                          swift: { ...payoutSettings.swift, country: e.target.value },
                        })
                      }
                      className="w-full text-xs px-3.5 py-2.5 border border-gray-300 rounded-[2px] focus:border-[#00a99d] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Bank Name*
                    </label>
                    <input
                      type="text"
                      required
                      value={payoutSettings.swift.bankName}
                      onChange={(e) =>
                        setPayoutSettings({
                          ...payoutSettings,
                          swift: { ...payoutSettings.swift, bankName: e.target.value },
                        })
                      }
                      className="w-full text-xs px-3.5 py-2.5 border border-gray-300 rounded-[2px] focus:border-[#00a99d] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Branch Name*
                    </label>
                    <input
                      type="text"
                      required
                      value={payoutSettings.swift.branchName}
                      onChange={(e) =>
                        setPayoutSettings({
                          ...payoutSettings,
                          swift: { ...payoutSettings.swift, branchName: e.target.value },
                        })
                      }
                      className="w-full text-xs px-3.5 py-2.5 border border-gray-300 rounded-[2px] focus:border-[#00a99d] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      SWIFT Code*
                    </label>
                    <input
                      type="text"
                      required
                      value={payoutSettings.swift.swiftCode}
                      onChange={(e) =>
                        setPayoutSettings({
                          ...payoutSettings,
                          swift: { ...payoutSettings.swift, swiftCode: e.target.value },
                        })
                      }
                      className="w-full text-xs px-3.5 py-2.5 border border-gray-300 rounded-[2px] focus:border-[#00a99d] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Account Number*
                    </label>
                    <input
                      type="text"
                      required
                      value={payoutSettings.swift.accountNumber}
                      onChange={(e) =>
                        setPayoutSettings({
                          ...payoutSettings,
                          swift: { ...payoutSettings.swift, accountNumber: e.target.value },
                        })
                      }
                      className="w-full text-xs px-3.5 py-2.5 border border-gray-300 rounded-[2px] focus:border-[#00a99d] outline-none"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold rounded-[2px] transition cursor-pointer border-0"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Add Funds Modal */}
      {isAddFundsOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-[1px] animate-in fade-in duration-150"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsAddFundsOpen(false);
          }}
        >
          <div className="bg-white rounded-[4px] shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-150 border border-gray-200">
            <div className="px-6 pt-6 pb-2 flex items-center justify-between relative">
              <h3 className="text-[20px] font-bold text-[#222] tracking-tight w-full text-center">
                Add Funds
              </h3>
              <button
                type="button"
                onClick={() => setIsAddFundsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition p-1 cursor-pointer absolute right-5 top-5 border-0 bg-transparent"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddFundsSubmit} className="p-6 pt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  Enter Amount
                </label>
                <div className="flex border border-gray-300 rounded-[2px] overflow-hidden focus-within:border-[#00a99d] transition">
                  <span className="bg-[#f2f4f6] px-4 py-2.5 text-gray-700 font-bold text-sm border-r border-gray-300 flex items-center justify-center select-none">
                    $
                  </span>
                  <input
                    type="number"
                    min="10"
                    step="any"
                    required
                    value={addFundsAmount}
                    onChange={(e) => {
                      setAddFundsAmount(e.target.value);
                      setAddFundsError(null);
                    }}
                    className="w-full px-3.5 py-2.5 text-sm bg-white outline-none text-gray-800 font-medium"
                  />
                </div>
                {addFundsError && (
                  <p className="text-red-500 text-xs mt-1 font-medium">{addFundsError}</p>
                )}
                <p className="text-xs text-gray-600 font-medium mt-2">
                  Minimum Deposit Amount: <span className="font-bold text-gray-800">$10</span>
                </p>
              </div>

              <button
                type="submit"
                className="w-full mt-3 py-3 bg-[#00a99d] hover:bg-[#008f85] text-white font-semibold text-sm rounded-[2px] transition-colors cursor-pointer border-0 outline-none shadow-sm"
              >
                Continue to Checkout
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Report Bank Transfer Modal */}
      {reportingDeposit && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setReportingDeposit(null);
          }}
        >
          <div className="bg-white rounded-sm shadow-xl max-w-lg w-full overflow-hidden border border-gray-200">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide flex items-center gap-2">
                <Send className="w-4 h-4 text-[#00a99d]" />
                Report Bank Transfer
              </h3>
              <button
                type="button"
                onClick={() => setReportingDeposit(null)}
                className="text-gray-400 hover:text-gray-600 transition p-1 cursor-pointer border-0 bg-transparent"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleReportSubmit} className="p-5 space-y-4">
              <div className="bg-teal-50/40 border border-teal-100 p-3.5 rounded-sm text-xs text-gray-700 space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment ID:</span>
                  <span className="font-mono font-medium text-gray-900">
                    {reportingDeposit.paymentId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Amount Due:</span>
                  <span className="font-bold text-[#27ae60]">
                    ${reportingDeposit.amount} ({reportingDeposit.currency})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status:</span>
                  <span className="text-amber-600 font-semibold">{reportingDeposit.status}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Transaction / Reference Number*
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. TR-998822019"
                  value={reportRefNumber}
                  onChange={(e) => setReportRefNumber(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-gray-300 rounded-sm focus:outline-none focus:border-[#00a99d] text-gray-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Sending Bank & Account Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Chase Bank - John Doe"
                  value={reportBankName}
                  onChange={(e) => setReportBankName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-gray-300 rounded-sm focus:outline-none focus:border-[#00a99d] text-gray-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Upload Payment Receipt (Optional)
                </label>
                <div className="border border-dashed border-gray-300 rounded-sm p-4 text-center hover:border-[#00a99d] transition cursor-pointer bg-gray-50/50 relative">
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setReportReceiptFile(e.target.files[0].name);
                      }
                    }}
                  />
                  <Upload className="w-5 h-5 mx-auto text-gray-400 mb-1.5" />
                  <div className="text-xs text-gray-600">
                    {reportReceiptFile ? (
                      <span className="text-emerald-700 font-semibold flex items-center justify-center gap-1">
                        <FileCheck className="w-3.5 h-3.5" /> {reportReceiptFile}
                      </span>
                    ) : (
                      <span>Click or drag bank receipt image (JPG, PNG, PDF)</span>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Additional Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Any details to help verify this transfer..."
                  value={reportNotes}
                  onChange={(e) => setReportNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-gray-300 rounded-sm focus:outline-none focus:border-[#00a99d] text-gray-800"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setReportingDeposit(null)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-sm transition cursor-pointer border-0"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold rounded-sm transition shadow-xs cursor-pointer inline-flex items-center gap-1.5 border-0"
                >
                  <Send className="w-3 h-3" />
                  <span>Submit Transfer Report</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Payout Request Modal */}
      {isPayoutModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsPayoutModalOpen(false);
          }}
        >
          <div className="bg-white rounded-[4px] shadow-2xl max-w-[500px] w-full overflow-hidden border border-gray-200 relative p-6 sm:p-8">
            <button
              type="button"
              onClick={() => setIsPayoutModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition text-xl leading-none cursor-pointer p-1 border-0 bg-transparent"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-[17px] font-semibold text-[#333333] text-center mb-6">
              New Payout Request
            </h3>

            {payoutError && (
              <div className="p-2.5 bg-red-50 border border-red-200 text-red-600 text-xs rounded mb-4">
                {payoutError}
              </div>
            )}

            <form onSubmit={handlePayoutSubmit} className="space-y-4">
              <div>
                <label className="block text-[13px] text-gray-700 mb-1.5 font-normal">
                  Withdrawal Amount
                </label>
                <div className="flex rounded-[3px] shadow-2xs overflow-hidden border border-gray-300 focus-within:border-[#00a99d]">
                  <span className="inline-flex items-center px-3.5 bg-[#f8f9fa] border-r border-gray-300 text-gray-600 text-sm">
                    $
                  </span>
                  <input
                    type="number"
                    step="any"
                    min="0"
                    value={payoutAmount}
                    onChange={(e) => setPayoutAmount(e.target.value)}
                    className="flex-1 px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] text-gray-700 mb-1.5 font-normal">
                  Withdrawal Method
                </label>
                <select
                  value={payoutMethod}
                  onChange={(e) => setPayoutMethod(e.target.value)}
                  className="w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-300 rounded-[3px] focus:outline-none focus:border-[#00a99d] transition cursor-pointer"
                >
                  <option value="PayPal">PayPal</option>
                  <option value="Bitcoin (BTC)">Bitcoin (BTC)</option>
                  <option value="IBAN">IBAN</option>
                  <option value="SWIFT">SWIFT</option>
                </select>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#00a99d] hover:bg-[#008f85] text-white text-[13px] font-medium rounded-[3px] transition shadow-xs cursor-pointer border-0"
                >
                  Submit
                </button>
              </div>

              <div className="pt-4 mt-6 border-t border-gray-200/80 text-[12px] text-gray-700">
                <div className="font-semibold text-gray-800 mb-1.5">Minimum Payout Amounts</div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-gray-600 mb-4">
                  <span>
                    PayPal: <strong className="text-gray-800 font-semibold">$500</strong>
                  </span>
                  <span>
                    Bitcoin (BTC): <strong className="text-gray-800 font-semibold">$500</strong>
                  </span>
                  <span>
                    IBAN: <strong className="text-gray-800 font-semibold">$500</strong>
                  </span>
                  <span>
                    SWIFT: <strong className="text-gray-800 font-semibold">$500</strong>
                  </span>
                </div>
                <div className="border-t border-gray-200/70 pt-3">
                  <span>Your Balance: </span>
                  <span className="font-bold text-[#27ae60]">${wallet.balance.toFixed(2)}</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Invoice Modal */}
      {invoiceDeposit && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setInvoiceDeposit(null);
          }}
        >
          <div className="bg-white rounded-sm shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-[#00a99d]" />
                <span className="font-bold text-gray-800 text-sm">
                  Invoice #{invoiceDeposit.paymentId.substring(0, 12)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-300 text-gray-700 text-xs rounded-sm hover:bg-gray-50 transition cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-gray-500" />
                  <span>Print</span>
                </button>
                <button
                  type="button"
                  onClick={() => setInvoiceDeposit(null)}
                  className="text-gray-400 hover:text-gray-600 transition p-1 cursor-pointer border-0 bg-transparent"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6 text-xs text-gray-700 bg-white">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-gray-200">
                <div>
                  <div className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-0.5">
                    <span>Mode</span>
                    <span className="text-[#00a99d]">sy</span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1">
                    Official Marketplace Transaction Receipt
                  </p>
                  <p className="text-[11px] text-gray-400">support@modesy.com</p>
                </div>
                <div className="text-left sm:text-right space-y-1">
                  <div className="text-xs font-semibold text-gray-900">Transaction Date:</div>
                  <div className="text-gray-600">{invoiceDeposit.date}</div>
                  <div className="inline-block mt-1 px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800">
                    PAID & SETTLED
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3.5 rounded-sm border border-gray-100">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">
                    Issued To / Client
                  </span>
                  <div className="font-bold text-gray-900">Peter Jone</div>
                  <div className="text-gray-600">Member Account (Verified)</div>
                  <div className="text-gray-500 text-[11px] mt-1 font-mono">
                    Ref ID: {invoiceDeposit.paymentId}
                  </div>
                </div>

                <div className="bg-gray-50 p-3.5 rounded-sm border border-gray-100">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">
                    Payment Channel
                  </span>
                  <div className="font-bold text-gray-900">
                    Wallet Deposit via {invoiceDeposit.paymentMethod}
                  </div>
                  <div className="text-gray-600 font-mono text-[11px]">
                    Tx: {invoiceDeposit.paymentId}
                  </div>
                  <div className="text-emerald-600 font-medium text-[11px] mt-1 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Verified by System
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-sm overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
                    <tr>
                      <th className="py-2.5 px-4">Description</th>
                      <th className="py-2.5 px-4 text-center">Type</th>
                      <th className="py-2.5 px-4 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="py-3 px-4 font-medium text-gray-900">
                        Wallet Deposit via {invoiceDeposit.paymentMethod}
                      </td>
                      <td className="py-3 px-4 text-center text-gray-500 uppercase text-[11px]">
                        Deposit
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-gray-900">
                        ${invoiceDeposit.amount.toFixed(2)} ({invoiceDeposit.currency})
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end pt-2">
                <div className="w-64 space-y-1.5 text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal:</span>
                    <span>${invoiceDeposit.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>VAT / Tax (0%):</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-200 text-sm">
                    <span>Total Amount:</span>
                    <span className="text-[#00a99d]">
                      ${invoiceDeposit.amount.toFixed(2)} {invoiceDeposit.currency}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button
                type="button"
                onClick={() => setInvoiceDeposit(null)}
                className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-semibold rounded-sm transition cursor-pointer border-0"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
