"use client";

import Link from "next/link";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useAppContext } from "@/contexts/AppContext";

export default function RegisterPage() {
  const [cfState, setCfState] = useState<"verifying" | "success">("verifying");
  const { t } = useAppContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      setCfState("success");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-white pb-20">
      {/* Breadcrumb */}
      <div className="w-full border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 text-[13px] text-gray-500">
          <Link href="/" className="hover:text-brand-primary">{t("home")}</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">{t("register")}</span>
        </div>
      </div>

      <div className="max-w-[450px] mx-auto mt-12 px-4">
        <h1 className="text-[26px] font-semibold text-center text-gray-800 mb-8">{t("register")}</h1>
        
        <div className="bg-white p-0 rounded-none shadow-none bg-transparent">
          <button className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded py-2.5 bg-[#f1f3f5] hover:bg-gray-200 transition-colors mb-4">
            <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="text-sm font-medium text-gray-700">{t("connect_with_google")}</span>
          </button>
          
          <div className="text-center text-[13px] text-gray-400 my-4">{t("or_register_with_email")}</div>
          
          <form className="flex flex-col gap-4">
            <input 
              type="text" 
              placeholder={t("first_name")}
              className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm outline-none focus:border-brand-primary"
            />
            <input 
              type="text" 
              placeholder={t("last_name")} 
              className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm outline-none focus:border-brand-primary"
            />
            <input 
              type="email" 
              placeholder={t("email_address")}
              className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm outline-none focus:border-brand-primary"
            />
            <input 
              type="password" 
              placeholder={t("password")} 
              className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm outline-none focus:border-brand-primary"
            />
            <input 
              type="password" 
              placeholder={t("confirm_password")} 
              className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm outline-none focus:border-brand-primary"
            />
            
            <div className="flex items-start gap-2 mt-2">
              <input 
                type="checkbox" 
                id="terms" 
                className="mt-1 border-gray-300 rounded text-brand-primary focus:ring-brand-primary cursor-pointer w-4 h-4"
              />
              <label htmlFor="terms" className="text-[13px] text-gray-500 cursor-pointer">
                {t("agree_to_terms")} <Link href="#" className="font-bold text-gray-700 hover:text-brand-primary transition-colors">{t("terms")}</Link>
              </label>
            </div>
            
            {/* Fake Cloudflare Turnstile */}
            <div className="w-full bg-[#f9f9f9] border border-gray-200 rounded p-4 flex items-center justify-between mt-2 mb-2 shadow-sm max-w-[300px] mx-auto">
              <div className="flex items-center gap-3">
                {cfState === "verifying" ? (
                  <>
                    <Loader2 className="w-6 h-6 text-brand-primary animate-spin" />
                    <span className="text-sm font-medium text-gray-700">{t("verifying")}</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-6 h-6 text-[#00bfa5]" />
                    <span className="text-sm font-medium text-gray-700">{t("success")}</span>
                  </>
                )}
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-gray-600 tracking-wider">CLOUDFLARE</span>
                <div className="flex gap-1 text-[8px] text-gray-400 mt-0.5">
                  <a href="#" className="hover:underline">Privacy</a>
                  <span>·</span>
                  <a href="#" className="hover:underline">Terms</a>
                </div>
              </div>
            </div>
            
            <button type="submit" className="w-full bg-[#00a699] text-white font-medium py-3 rounded hover:bg-[#00897b] transition-colors mt-2 shadow-sm">
              {t("register")}
            </button>

            <div className="text-center text-sm text-gray-500 mt-2">
              {t("have_account")} <Link href="/login" className="text-[#00a699] hover:underline font-medium">{t("login")}</Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
