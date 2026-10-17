"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAppContext, UserRole } from "@/contexts/AppContext";

const demoAccounts = [
  { role: "Super Admin", email: "admin@codingest.net", pass: "1234" },
  { role: "Moderator", email: "moderator@codingest.net", pass: "1234" },
  { role: "Vendor", email: "trendshop@codingest.net", pass: "1234" },
  { role: "Member", email: "member@codingest.net", pass: "1234" },
  { role: "Guest", email: "guest@codingest.net", pass: "1234" },
];

export default function LoginPage() {
  const router = useRouter();
  const { loginAs } = useAppContext();
  const [email, setEmail] = useState("trendshop@codingest.net");
  const [password, setPassword] = useState("1234");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and Password cannot be empty.");
      return;
    }

    setLoading(true);
    setError("");

    // Mock login check for demo accounts
    const trimmedEmail = email.trim().toLowerCase();
    const demoUser = demoAccounts.find(
      (acc) => acc.email.toLowerCase() === trimmedEmail && acc.pass === password
    );

    if (demoUser) {
      const role = demoUser.role.toLowerCase().replace(" ", "_") as UserRole;
      loginAs(role);

      if (role === "super_admin" || role === "admin" || role === "moderator") {
        router.push("/admin");
      } else if (role === "vendor") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
      return;
    }

    setTimeout(() => {
      setError("Invalid email or password (Use trendshop@codingest.net or admin@codingest.net & 1234)");
      setLoading(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-[2px] p-4">
      <div className="bg-white rounded-[4px] shadow-2xl w-full max-w-[420px] relative animate-in fade-in zoom-in-95 duration-150 p-7 sm:p-8">
        {/* Close Button */}
        <Link
          href="/"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </Link>

        {/* Title */}
        <h2 className="text-[22px] font-semibold text-center text-[#222222] mb-5 tracking-tight">
          Login
        </h2>

        {/* Connect with Google */}
        <button
          type="button"
          onClick={() => {
            loginAs("vendor");
            router.push("/dashboard");
          }}
          className="w-full flex items-center justify-center gap-3 border border-[#dddddd] hover:border-gray-400 bg-white hover:bg-gray-50 py-2.5 px-4 rounded-[3px] text-[13.5px] font-semibold text-[#555555] transition-colors mb-5 cursor-pointer shadow-2xs"
        >
          <svg className="w-5 h-5" viewBox="0 0 128 128">
            <rect clipRule="evenodd" fill="none" fillRule="evenodd" height="128" width="128" />
            <path
              clipRule="evenodd"
              d="M27.585,64c0-4.157,0.69-8.143,1.923-11.881L7.938,35.648 C3.734,44.183,1.366,53.801,1.366,64c0,10.191,2.366,19.802,6.563,28.332l21.558-16.503C28.266,72.108,27.585,68.137,27.585,64"
              fill="#FBBC05"
              fillRule="evenodd"
            />
            <path
              clipRule="evenodd"
              d="M65.457,26.182c9.031,0,17.188,3.2,23.597,8.436L107.698,16 C96.337,6.109,81.771,0,65.457,0C40.129,0,18.361,14.484,7.938,35.648l21.569,16.471C34.477,37.033,48.644,26.182,65.457,26.182"
              fill="#EA4335"
              fillRule="evenodd"
            />
            <path
              clipRule="evenodd"
              d="M65.457,101.818c-16.812,0-30.979-10.851-35.949-25.937 L7.938,92.349C18.361,113.516,40.129,128,65.457,128c15.632,0,30.557-5.551,41.758-15.951L86.741,96.221 C80.964,99.86,73.689,101.818,65.457,101.818"
              fill="#34A853"
              fillRule="evenodd"
            />
            <path
              clipRule="evenodd"
              d="M126.634,64c0-3.782-0.583-7.855-1.457-11.636H65.457v24.727 h34.376c-1.719,8.431-6.397,14.912-13.092,19.13l20.474,15.828C118.981,101.129,126.634,84.861,126.634,64"
              fill="#4285F4"
              fillRule="evenodd"
            />
          </svg>
          <span>Connect with Google</span>
        </button>

        {/* Divider: Or login with email */}
        <div className="relative flex items-center justify-center mb-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#e5e5e5]" />
          </div>
          <span className="relative bg-white px-3 text-[12px] text-[#888888]">
            Or login with email
          </span>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 text-red-600 p-2.5 rounded-[3px] text-xs border border-red-100 mb-4 text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form className="space-y-3.5" onSubmit={handleLogin}>
          <div>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-[#dddddd] focus:border-[#00a99d] rounded-[3px] px-3.5 py-2.5 text-[13.5px] text-[#333333] placeholder:text-[#999999] outline-none transition-colors"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-[#dddddd] focus:border-[#00a99d] rounded-[3px] px-3.5 py-2.5 text-[13.5px] text-[#333333] placeholder:text-[#999999] outline-none transition-colors"
            />
          </div>

          <div className="flex justify-end pt-0.5">
            <Link
              href="#"
              className="text-[12px] text-[#777777] hover:text-[#00a99d] hover:underline transition-colors"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00a99d] hover:bg-[#008f85] text-white font-semibold py-2.5 rounded-[3px] text-[14px] transition-colors shadow-xs disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? "Processing..." : "Login"}
            </button>
          </div>
        </form>

        <p className="text-center text-[13px] text-[#666666] mt-4">
          Don't have an account?{" "}
          <Link href="/register" className="text-[#00a99d] hover:underline font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
