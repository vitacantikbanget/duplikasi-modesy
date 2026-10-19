"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";

export default function ForgotPasswordPage() {
  const { t } = useAppContext();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="bg-[#fcfcfc] min-h-[70vh] py-12 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center justify-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-brand-primary transition-colors">
            {t("home")}
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">{t("forgot_password", "Forgot Password")}</span>
        </nav>

        <div className="bg-white border border-gray-200 rounded-[4px] p-6 sm:p-8 shadow-2xs">
          <h1 className="text-xl font-bold text-gray-900 text-center mb-2">
            {t("reset_password", "Reset Password")}
          </h1>
          <p className="text-xs text-gray-500 text-center mb-6">
            Enter your email address and we will send you a link to reset your password.
          </p>

          {isSubmitted ? (
            <div className="text-center py-6">
              <CheckCircle2 className="w-12 h-12 text-teal-600 mx-auto mb-3" />
              <h3 className="text-sm font-semibold text-gray-800 mb-1">Check Your Inbox</h3>
              <p className="text-xs text-gray-500 mb-6">
                If an account exists with <strong>{email}</strong>, you will receive password reset instructions.
              </p>
              <Link
                href="/login"
                className="inline-block px-5 py-2.5 bg-brand-primary text-white text-xs font-semibold rounded-[4px] hover:bg-brand-primary/90 transition-colors"
              >
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  {t("email", "Email Address")}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-[4px] focus:outline-none focus:border-brand-primary"
                  />
                  <Mail className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-brand-primary text-white text-xs font-semibold rounded-[4px] hover:bg-brand-primary/90 transition-colors shadow-2xs"
              >
                {t("send_reset_link", "Send Reset Link")}
              </button>

              <div className="text-center pt-2">
                <Link
                  href="/login"
                  className="text-xs text-gray-600 hover:text-brand-primary transition-colors"
                >
                  Remember password? <span className="font-semibold text-brand-primary">Login</span>
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
