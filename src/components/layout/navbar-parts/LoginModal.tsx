"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { UserRole } from "@/types/auth";
import { DEMO_ACCOUNTS } from "@/constants/auth";
import { createClient } from "@/lib/supabase/client";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginAs: (role: UserRole) => void;
}

export function LoginModal({ isOpen, onClose, onLoginAs }: LoginModalProps) {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("trendshop@codingest.net");
  const [password, setPassword] = useState("1234");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setLoginError("Email dan Kata Sandi tidak boleh kosong.");
      return;
    }
    setLoading(true);
    setLoginError("");

    try {
      // Mock login check for demo accounts to bypass Supabase
      const trimmedEmail = email.trim().toLowerCase();
      const demoUser = DEMO_ACCOUNTS.find(
        (acc) => acc.email.toLowerCase() === trimmedEmail && acc.pass === password
      );
      if (demoUser) {
        const role = demoUser.role.toLowerCase().replace(" ", "_") as UserRole;
        onLoginAs(role);
        onClose();
        if (role === "super_admin" || role === "admin" || role === "moderator") {
          router.push("/admin");
        } else if (role === "vendor") {
          router.push("/dashboard");
        } else {
          router.push("/");
        }
        return;
      }

      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      const authUser = authData.user;
      if (!authUser) throw new Error("Gagal mendapatkan data user");

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", authUser.id)
        .single();

      if (profileError && profileError.code !== "PGRST116") {
        console.error("Error fetching profile:", profileError);
      }

      const role = profile?.role || "guest";
      onClose();

      if (["super_admin", "admin", "moderator"].includes(role)) {
        router.push("/admin");
      } else if (role === "vendor") {
        router.push("/dashboard/vendor");
      } else {
        router.push("/");
      }

      router.refresh();
    } catch (err: any) {
      setLoginError(err.message || "Gagal masuk. Periksa kembali email dan kata sandi Anda.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-[2px]">
      <div className="bg-white rounded-[4px] shadow-2xl w-full max-w-[420px] flex flex-col relative animate-in fade-in zoom-in-95 duration-150 p-7 sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <h2 className="text-[22px] font-semibold text-center text-[#222222] mb-5 tracking-tight">
          Login
        </h2>

        {/* Connect with Google */}
        <button
          type="button"
          onClick={() => {
            onLoginAs("vendor");
            onClose();
            router.push("/dashboard");
          }}
          className="w-full flex items-center justify-center gap-3 border border-[#dddddd] hover:border-gray-400 bg-white hover:bg-gray-50 py-2.5 px-4 rounded-[3px] text-[13.5px] font-semibold text-[#555555] transition-colors mb-5 cursor-pointer shadow-2xs"
        >
          <svg className="w-5 h-5" viewBox="0 0 128 128">
            <rect clipRule="evenodd" fill="none" fillRule="evenodd" height="128" width="128" />
            <path clipRule="evenodd" d="M27.585,64c0-4.157,0.69-8.143,1.923-11.881L7.938,35.648 C3.734,44.183,1.366,53.801,1.366,64c0,10.191,2.366,19.802,6.563,28.332l21.558-16.503C28.266,72.108,27.585,68.137,27.585,64" fill="#FBBC05" fillRule="evenodd" />
            <path clipRule="evenodd" d="M65.457,26.182c9.031,0,17.188,3.2,23.597,8.436L107.698,16 C96.337,6.109,81.771,0,65.457,0C40.129,0,18.361,14.484,7.938,35.648l21.569,16.471C34.477,37.033,48.644,26.182,65.457,26.182" fill="#EA4335" fillRule="evenodd" />
            <path clipRule="evenodd" d="M65.457,101.818c-16.812,0-30.979-10.851-35.949-25.937 L7.938,92.349C18.361,113.516,40.129,128,65.457,128c15.632,0,30.557-5.551,41.758-15.951L86.741,96.221 C80.964,99.86,73.689,101.818,65.457,101.818" fill="#34A853" fillRule="evenodd" />
            <path clipRule="evenodd" d="M126.634,64c0-3.782-0.583-7.855-1.457-11.636H65.457v24.727 h34.376c-1.719,8.431-6.397,14.912-13.092,19.13l20.474,15.828C118.981,101.129,126.634,84.861,126.634,64" fill="#4285F4" fillRule="evenodd" />
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

        {/* Error Message */}
        {loginError && (
          <div className="bg-red-50 text-red-600 p-2.5 rounded-[3px] text-xs border border-red-100 mb-4 text-center">
            {loginError}
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleLogin} className="space-y-3.5">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
              className="w-full border border-[#dddddd] focus:border-[#00a99d] rounded-[3px] px-3.5 py-2.5 text-[13.5px] text-[#333333] placeholder:text-[#999999] outline-none transition-colors"
            />
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full border border-[#dddddd] focus:border-[#00a99d] rounded-[3px] px-3.5 py-2.5 text-[13.5px] text-[#333333] placeholder:text-[#999999] outline-none transition-colors"
            />
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end pt-0.5">
            <Link
              href="#"
              className="text-[12px] text-[#777777] hover:text-[#00a99d] hover:underline transition-colors"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
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

        {/* Register Footer */}
        <div className="text-center text-[13px] text-[#666666] mt-4">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            onClick={onClose}
            className="text-[#00a99d] hover:underline font-semibold"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
