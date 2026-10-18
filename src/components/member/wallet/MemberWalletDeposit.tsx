"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CreditCard, ChevronRight } from "lucide-react";
import { addMemberDeposit } from "@/lib/member-wallet";

interface PaymentOption {
  id: string;
  name: string;
  subtitle?: string;
  logos: Array<{
    type: "svg" | "text" | "badge";
    src?: string;
    label: string;
    textColor?: string;
    bgColor?: string;
  }>;
}

export default function MemberWalletDeposit() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const amountParam = searchParams.get("amount");
  const depositAmount = amountParam ? Math.max(10, parseFloat(amountParam)) : 12;

  const [step, setStep] = useState<1 | 2>(1);
  const [selectedMethod, setSelectedMethod] = useState<string>("paypal");
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);
  const [termsError, setTermsError] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const paymentOptions: PaymentOption[] = [
    {
      id: "paypal",
      name: "PayPal",
      logos: [
        { type: "svg", src: "/assets/img/payment/visa.svg", label: "VISA" },
        { type: "svg", src: "/assets/img/payment/mastercard.svg", label: "MasterCard" },
        { type: "svg", src: "/assets/img/payment/amex.svg", label: "Amex" },
        { type: "svg", src: "/assets/img/payment/discover.svg", label: "Discover" },
        { type: "badge", label: "PayPal", textColor: "#003087" },
      ],
    },
    {
      id: "stripe",
      name: "Stripe",
      logos: [
        { type: "svg", src: "/assets/img/payment/visa.svg", label: "VISA" },
        { type: "svg", src: "/assets/img/payment/mastercard.svg", label: "MasterCard" },
        { type: "svg", src: "/assets/img/payment/amex.svg", label: "Amex" },
        { type: "svg", src: "/assets/img/payment/discover.svg", label: "Discover" },
        { type: "text", label: "JCB", textColor: "#003a80" },
        { type: "text", label: "Diners", textColor: "#004a99" },
        { type: "badge", label: "stripe", textColor: "#635bff" },
      ],
    },
    {
      id: "paystack",
      name: "Paystack",
      logos: [
        { type: "svg", src: "/assets/img/payment/visa.svg", label: "VISA" },
        { type: "svg", src: "/assets/img/payment/mastercard.svg", label: "MasterCard" },
        { type: "text", label: "Verve", textColor: "#d41922" },
        { type: "badge", label: "paystack", textColor: "#00c3f7" },
      ],
    },
    {
      id: "razorpay",
      name: "Razorpay",
      logos: [
        { type: "svg", src: "/assets/img/payment/visa.svg", label: "VISA" },
        { type: "svg", src: "/assets/img/payment/mastercard.svg", label: "MasterCard" },
        { type: "svg", src: "/assets/img/payment/maestro.svg", label: "Maestro" },
        { type: "text", label: "RuPay", textColor: "#00833e" },
        { type: "badge", label: "Razorpay", textColor: "#0c2340" },
      ],
    },
    {
      id: "flutterwave",
      name: "Flutterwave",
      logos: [
        { type: "svg", src: "/assets/img/payment/visa.svg", label: "VISA" },
        { type: "svg", src: "/assets/img/payment/mastercard.svg", label: "MasterCard" },
        { type: "svg", src: "/assets/img/payment/maestro.svg", label: "Maestro" },
        { type: "badge", label: "Flutterwave", textColor: "#ff914d" },
      ],
    },
    {
      id: "iyzico",
      name: "Iyzico",
      logos: [
        { type: "svg", src: "/assets/img/payment/visa.svg", label: "VISA" },
        { type: "svg", src: "/assets/img/payment/mastercard.svg", label: "MasterCard" },
        { type: "svg", src: "/assets/img/payment/amex.svg", label: "Amex" },
        { type: "text", label: "troy", textColor: "#00a3e0" },
        { type: "badge", label: "iyzico", textColor: "#1d3557" },
      ],
    },
    {
      id: "midtrans",
      name: "Midtrans",
      logos: [
        { type: "svg", src: "/assets/img/payment/visa.svg", label: "VISA" },
        { type: "svg", src: "/assets/img/payment/mastercard.svg", label: "MasterCard" },
        { type: "svg", src: "/assets/img/payment/amex.svg", label: "Amex" },
        { type: "text", label: "JCB", textColor: "#003a80" },
        { type: "badge", label: "midtrans", textColor: "#002855" },
      ],
    },
    {
      id: "paytabs",
      name: "PayTabs",
      logos: [
        { type: "svg", src: "/assets/img/payment/visa.svg", label: "VISA" },
        { type: "svg", src: "/assets/img/payment/mastercard.svg", label: "MasterCard" },
        { type: "svg", src: "/assets/img/payment/amex.svg", label: "Amex" },
        { type: "svg", src: "/assets/img/payment/discover.svg", label: "Discover" },
        { type: "badge", label: "PayTabs", textColor: "#0070ba" },
      ],
    },
    {
      id: "yoomoney",
      name: "YooMoney",
      logos: [
        { type: "svg", src: "/assets/img/payment/visa.svg", label: "VISA" },
        { type: "svg", src: "/assets/img/payment/mastercard.svg", label: "MasterCard" },
        { type: "svg", src: "/assets/img/payment/maestro.svg", label: "Maestro" },
        { type: "text", label: "МИР", textColor: "#009944" },
        { type: "badge", label: "yoomoney", textColor: "#8041c0" },
      ],
    },
    {
      id: "mercadopago",
      name: "Mercado Pago",
      logos: [
        { type: "svg", src: "/assets/img/payment/visa.svg", label: "VISA" },
        { type: "svg", src: "/assets/img/payment/mastercard.svg", label: "MasterCard" },
        { type: "svg", src: "/assets/img/payment/amex.svg", label: "Amex" },
        { type: "svg", src: "/assets/img/payment/discover.svg", label: "Discover" },
        { type: "text", label: "Boleto", textColor: "#00a650" },
        { type: "badge", label: "mercado pago", textColor: "#009ee3" },
      ],
    },
    {
      id: "bank_transfer",
      name: "Bank Transfer",
      subtitle: "Make your payment directly into our bank account.",
      logos: [],
    },
  ];

  const handleContinueToPayment = () => {
    if (!agreedToTerms) {
      setTermsError(true);
      return;
    }
    setTermsError(false);
    setStep(2);
  };

  const handleExecutePayment = async () => {
    setIsProcessing(true);
    const isBank = selectedMethod === "bank_transfer";
    const selectedObj = paymentOptions.find((p) => p.id === selectedMethod);
    const methodName = isBank ? "Bank Transfer" : selectedObj?.name || "PayPal";

    addMemberDeposit({
      amount: depositAmount,
      paymentMethod: methodName,
      currency: "USD",
      isReported: false,
    });

    setTimeout(() => {
      setIsProcessing(false);
      if (isBank) {
        router.push("/member/wallet?reported=pending");
      } else {
        router.push("/member/wallet?success=true");
      }
    }, 700);
  };

  return (
    <div className="w-full bg-[#f8f9fa] min-h-[calc(100vh-280px)] py-8 font-sans">
      <div className="max-w-[1320px] mx-auto px-4">
        <h1 className="text-[15px] font-semibold text-gray-800 mb-6">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Checkout Panel */}
          <div className="lg:col-span-8 bg-white border border-[#ebebeb] rounded-sm p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            {step === 1 ? (
              <div>
                <h2 className="text-[14px] font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  1. Payment Method
                </h2>

                <div className="space-y-2.5 mb-6">
                  {paymentOptions.map((opt) => {
                    const isSelected = selectedMethod === opt.id;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => setSelectedMethod(opt.id)}
                        className={`px-4 py-3 border rounded-[3px] transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          isSelected
                            ? "border-[#00a99d] bg-teal-50/15"
                            : "border-gray-200 hover:border-gray-300 bg-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition ${
                              isSelected
                                ? "border-[#00a99d] bg-[#00a99d]"
                                : "border-gray-300 bg-white"
                            }`}
                          >
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <div>
                            <span className="text-[13px] font-medium text-gray-800">
                              {opt.name}
                            </span>
                            {opt.subtitle && (
                              <p className="text-[11px] text-gray-400 mt-0.5">{opt.subtitle}</p>
                            )}
                          </div>
                        </div>

                        {opt.logos.length > 0 && (
                          <div className="flex items-center gap-1.5 shrink-0 flex-wrap sm:justify-end pl-7 sm:pl-0">
                            {opt.logos.map((logo, idx) => {
                              if (logo.type === "svg" && logo.src) {
                                return (
                                  /* eslint-disable-next-line @next/next/no-img-element */
                                  <img
                                    key={idx}
                                    src={logo.src}
                                    alt={logo.label}
                                    className="h-4 w-auto object-contain"
                                  />
                                );
                              }
                              if (logo.type === "text") {
                                return (
                                  <span
                                    key={idx}
                                    style={{ color: logo.textColor || "#444" }}
                                    className="text-[11px] font-bold tracking-tight px-1"
                                  >
                                    {logo.label}
                                  </span>
                                );
                              }
                              return (
                                <span
                                  key={idx}
                                  style={{ color: logo.textColor || "#003087" }}
                                  className="text-[13px] font-extrabold italic tracking-tight"
                                >
                                  {logo.label}
                                </span>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Terms agreement */}
                <div className="mb-6 pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer text-[12px] text-gray-600">
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => {
                        setAgreedToTerms(e.target.checked);
                        if (e.target.checked) setTermsError(false);
                      }}
                      className="mt-0.5 rounded border-gray-300 text-[#00a99d] focus:ring-[#00a99d] cursor-pointer"
                    />
                    <span>
                      I have read and agree to the{" "}
                      <Link
                        href="/guest/terms-conditions"
                        target="_blank"
                        className="text-[#222] font-semibold underline hover:text-[#00a99d]"
                      >
                        Terms & Conditions
                      </Link>
                    </span>
                  </label>
                  {termsError && (
                    <p className="text-red-500 text-xs mt-1 font-medium pl-6">
                      Please agree to the Terms & Conditions to proceed.
                    </p>
                  )}
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={handleContinueToPayment}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold rounded-[2px] shadow-xs transition cursor-pointer border-0"
                  >
                    <span>Continue to Payment</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-[#f9f9f9] border border-[#ebebeb] rounded-[3px] px-5 py-3.5 flex items-center justify-between">
                  <span className="font-bold text-gray-900 text-sm">1. Payment Method</span>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs text-gray-600 underline hover:text-[#00a99d] cursor-pointer bg-transparent border-0 font-medium"
                  >
                    Edit
                  </button>
                </div>

                <div>
                  <h2 className="text-[14px] font-bold text-gray-900 mb-6">2. Payment</h2>

                  <div className="max-w-[420px] mx-auto text-center py-4">
                    <h3 className="text-sm font-bold text-gray-800 mb-6">Confirm and Pay</h3>

                    {selectedMethod === "paypal" ? (
                      <div className="space-y-3">
                        <button
                          type="button"
                          disabled={isProcessing}
                          onClick={handleExecutePayment}
                          className="w-full max-w-[340px] mx-auto py-2.5 px-4 bg-[#ffc439] hover:bg-[#f4b41a] rounded-[4px] shadow-xs flex items-center justify-center transition cursor-pointer border-0"
                        >
                          <span className="text-[17px] font-extrabold italic text-[#003087]">
                            Pay<span className="text-[#0079c1]">Pal</span>
                          </span>
                        </button>

                        <button
                          type="button"
                          disabled={isProcessing}
                          onClick={handleExecutePayment}
                          className="w-full max-w-[340px] mx-auto py-2.5 px-4 bg-[#2c2e2f] hover:bg-[#1a1a1a] text-white text-xs font-semibold rounded-[4px] shadow-xs flex items-center justify-center gap-2 transition cursor-pointer border-0"
                        >
                          <CreditCard className="w-4 h-4 text-white" />
                          <span>Debit or Credit Card</span>
                        </button>

                        <p className="text-[11px] text-gray-400 font-normal pt-1">
                          Powered by <span className="font-bold text-[#003087]">PayPal</span>
                        </p>
                      </div>
                    ) : selectedMethod === "bank_transfer" ? (
                      <div className="text-left bg-gray-50 border border-gray-200 rounded p-4 text-xs space-y-2">
                        <p className="font-bold text-gray-800 text-[13px] mb-2">
                          Bank Account Information:
                        </p>
                        <div>
                          <span className="text-gray-500">Bank Name:</span>{" "}
                          <span className="font-semibold text-gray-900">Modesy Bank</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Account Name:</span>{" "}
                          <span className="font-semibold text-gray-900">Modesy Global Inc</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Account Number:</span>{" "}
                          <span className="font-mono font-semibold text-gray-900">
                            1234 5678 9012 3456
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">SWIFT / Routing:</span>{" "}
                          <span className="font-mono font-semibold text-gray-900">MODESYUS33</span>
                        </div>
                        <p className="text-[11px] text-gray-500 pt-2 border-t border-gray-200 mt-2">
                          Please transfer the exact amount of ${depositAmount} USD. You will be
                          able to report this bank transfer on your wallet page.
                        </p>
                        <button
                          type="button"
                          disabled={isProcessing}
                          onClick={handleExecutePayment}
                          className="w-full mt-4 py-2.5 bg-[#00a99d] hover:bg-[#008f85] text-white font-semibold rounded-[2px] transition cursor-pointer border-0 text-center block"
                        >
                          {isProcessing ? "Submitting..." : "Submit Bank Transfer Order"}
                        </button>
                      </div>
                    ) : (
                      <div className="text-left space-y-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                            Card Number
                          </label>
                          <input
                            type="text"
                            placeholder="4242 •••• •••• 4242"
                            defaultValue="4242 4242 4242 4242"
                            className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:border-[#00a99d] outline-none font-mono"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              placeholder="MM/YY"
                              defaultValue="12/28"
                              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:border-[#00a99d] outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                              CVC
                            </label>
                            <input
                              type="text"
                              placeholder="CVC"
                              defaultValue="123"
                              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:border-[#00a99d] outline-none"
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          disabled={isProcessing}
                          onClick={handleExecutePayment}
                          className="w-full mt-4 py-2.5 bg-[#00a99d] hover:bg-[#008f85] text-white font-semibold rounded-[2px] transition cursor-pointer border-0 text-center block text-xs"
                        >
                          {isProcessing ? "Processing Payment..." : `Pay $${depositAmount}`}
                        </button>
                      </div>
                    )}

                    {isProcessing && (
                      <p className="text-xs text-gray-500 mt-3 animate-pulse">
                        Processing transaction, please wait...
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Summary Column */}
          <div className="lg:col-span-4">
            <h2 className="text-[14px] font-bold text-gray-800 mb-4">Summary</h2>
            <div className="bg-[#f9f9f9] border border-[#ebebeb] rounded-sm p-6 text-xs shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
              <div className="font-bold text-gray-900 text-[13px] mb-3">Add Funds</div>
              <div className="flex justify-between items-center text-gray-600 mb-4">
                <span>Deposit Amount:</span>
                <span className="font-bold text-gray-900">${depositAmount}</span>
              </div>
              <div className="border-t border-gray-200/90 my-3" />
              <div className="flex justify-between items-center text-gray-700 font-semibold mb-3">
                <span>Subtotal</span>
                <span className="font-bold text-gray-900">${depositAmount}</span>
              </div>
              <div className="border-t border-gray-200/90 my-3" />
              <div className="flex justify-between items-center text-gray-900 font-bold text-[13px]">
                <span>Total</span>
                <span className="font-bold text-gray-900">${depositAmount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
