"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, CheckCircle } from "lucide-react";
import Link from "next/link";

import { useAppContext, UserRole } from "@/contexts/AppContext";

const demoAccounts = [
  { role: "Super Admin", email: "admin@codingest.net", pass: "1234" },
  { role: "Moderator", email: "moderator@codingest.net", pass: "1234" },
];

export default function AdminLogin() {
  const router = useRouter();
  const { loginAs } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    
    setLoading(true);
    setError("");
    
    // Mock login check for demo accounts
    const trimmedEmail = email.trim().toLowerCase();
    const demoUser = demoAccounts.find(acc => acc.email.toLowerCase() === trimmedEmail && acc.pass === password);
    
    if (demoUser) {
      const role = demoUser.role.toLowerCase().replace(' ', '_') as UserRole;
      loginAs(role);
      router.push('/admin');
      return;
    }
    
    // Failed auth
    setTimeout(() => {
      setError("Kredensial tidak valid (Gunakan admin@codingest.net atau moderator@codingest.net & 1234)");
      setLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#e4e7ec] flex flex-col items-center justify-center p-4">
      <div className="mb-6 flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          <span className="font-bold text-gray-700">Modesy</span> <span className="font-light text-gray-500">Panel</span>
        </h1>
      </div>
      
      <div className="bg-white shadow-sm w-full max-w-[420px]">
        <div className="p-4 border-b border-gray-100 text-center text-gray-600 text-sm font-medium">
          Masuk ke Panel Administrasi & Moderasi
        </div>
        
        <div className="p-6">
          {/* Quick Demo Buttons */}
          <div className="grid grid-cols-2 gap-2.5 mb-4">
            <button
              type="button"
              onClick={() => {
                loginAs("super_admin");
                router.push("/admin");
              }}
              className="bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 py-2 px-2.5 rounded text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
            >
              <span>🛡️ Super Admin</span>
              <span className="bg-blue-600 text-white text-[9px] px-1 py-0.2 rounded font-bold">1-KLIK</span>
            </button>

            <button
              type="button"
              onClick={() => {
                loginAs("moderator");
                router.push("/admin");
              }}
              className="bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 py-2 px-2.5 rounded text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
            >
              <span>⚖️ Moderator</span>
              <span className="bg-[#00a99d] text-white text-[9px] px-1 py-0.2 rounded font-bold">1-KLIK</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center mb-4">
            <div className="absolute inset-x-0 border-t border-gray-200"></div>
            <span className="bg-white px-2 text-[11px] text-gray-400 relative z-10">Atau login manual:</span>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-2 rounded text-xs border border-red-100 mb-4 text-center">
              {error}
            </div>
          )}
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type="email"
                placeholder="admin@codingest.net"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#007bff]"
              />
              <Mail className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
            
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#007bff]"
              />
              <Lock className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
            
            <div className="border border-gray-200 bg-gray-50 p-3 flex justify-between items-center rounded-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-xs text-gray-800 font-medium">Success!</span>
              </div>
              <div className="text-[9px] text-gray-400 flex flex-col items-end">
                <span className="font-bold text-[#f6821f]">CLOUDFLARE</span>
                <span>Privacy - Terms</span>
              </div>
            </div>
            
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#007bff] hover:bg-[#0069d9] text-white px-6 py-1.5 text-sm font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <div className="mt-4">
        <Link href="/" className="text-[#007bff] hover:underline text-sm font-medium">
          Go to the Homepage
        </Link>
      </div>
    </div>
  );
}
