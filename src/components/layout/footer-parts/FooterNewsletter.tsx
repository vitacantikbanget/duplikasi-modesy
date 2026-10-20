"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export function FooterNewsletter() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterStatus("loading");
    setTimeout(() => {
      setNewsletterStatus("success");
      setNewsletterEmail("");
      setTimeout(() => {
        setNewsletterStatus("idle");
      }, 5000);
    }, 400);
  };

  return (
    <div>
      <h3 className="text-[#2c333e] font-bold text-xs uppercase tracking-wider mb-4">
        Newsletter
      </h3>
      <p className="text-xs text-[#6c757d] mb-3 leading-relaxed">
        Join our subscribers list to get the latest news, updates and special offers directly in your inbox
      </p>

      {newsletterStatus === "success" ? (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-[2px] text-emerald-800 text-xs flex items-start gap-2 mb-6 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span className="leading-tight">You have successfully subscribed to our newsletter!</span>
        </div>
      ) : (
        <form onSubmit={handleNewsletterSubmit} className="space-y-2.5 mb-6">
          <input
            type="email"
            value={newsletterEmail}
            onChange={(e) => setNewsletterEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full text-xs px-3.5 py-2.5 border border-gray-200 rounded-[2px] outline-none focus:border-[#00ab97] bg-white transition-colors"
            required
            disabled={newsletterStatus === "loading"}
          />
          <button
            type="submit"
            disabled={newsletterStatus === "loading"}
            className="w-full py-2.5 bg-[#00ab97] hover:bg-[#009684] text-white text-xs font-semibold rounded-[2px] transition-colors cursor-pointer shadow-2xs disabled:opacity-60"
          >
            {newsletterStatus === "loading" ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      )}

      {/* Official Payment Logos matching Modesy design */}
      <div className="flex items-center gap-2 pt-1 flex-wrap">
        {/* VISA */}
        <div className="h-6 px-2 bg-white border border-gray-200 rounded-[2px] flex items-center justify-center shadow-2xs">
          <span className="text-blue-900 font-extrabold italic text-[11px] tracking-tighter">
            VISA
          </span>
        </div>

        {/* Mastercard */}
        <div className="h-6 px-2 bg-white border border-gray-200 rounded-[2px] flex items-center justify-center gap-0.5 shadow-2xs">
          <div className="w-3.5 h-3.5 rounded-full bg-[#eb001b]" />
          <div className="w-3.5 h-3.5 rounded-full bg-[#f79e1b] -ml-2 opacity-90" />
          <span className="text-[8px] font-semibold text-gray-700 ml-1">mastercard</span>
        </div>

        {/* Maestro */}
        <div className="h-6 px-2 bg-white border border-gray-200 rounded-[2px] flex items-center justify-center gap-0.5 shadow-2xs">
          <div className="w-3.5 h-3.5 rounded-full bg-[#0061a8]" />
          <div className="w-3.5 h-3.5 rounded-full bg-[#eb001b] -ml-2 opacity-90" />
          <span className="text-[8px] font-semibold text-gray-700 ml-1">Maestro</span>
        </div>

        {/* American Express */}
        <div className="h-6 px-1.5 bg-[#007cc3] text-white rounded-[2px] flex items-center justify-center font-bold text-[8px] tracking-tight shadow-2xs">
          AMERICAN EXPRESS
        </div>

        {/* Discover */}
        <div className="h-6 px-2 bg-white border border-gray-200 rounded-[2px] flex items-center justify-center gap-1 shadow-2xs">
          <span className="text-[8px] font-bold text-gray-800 tracking-tight">DISCOVER</span>
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff6000]" />
        </div>
      </div>
    </div>
  );
}
