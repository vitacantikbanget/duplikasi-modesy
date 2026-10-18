"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppContext, UserRole } from "@/contexts/AppContext";
import { 
  ShieldCheck, 
  Store, 
  Globe, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  Check, 
  Sparkles,
  Lock,
  User
} from "lucide-react";

export default function RoleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const { role, setRole } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  const rolesConfig: {
    id: UserRole;
    title: string;
    subTitle: string;
    tag: string;
    tagColor: string;
    icon: any;
    destination: string;
    description: string;
  }[] = [
    {
      id: "guest",
      title: "Mode UMUM (Tamu / Guest)",
      subTitle: "Pengunjung Storefront Publik",
      tag: "Umum",
      tagColor: "bg-gray-100 text-gray-700 border-gray-300",
      icon: Globe,
      destination: "/",
      description: "Tampilan marketplace publik untuk pembeli/tamu. Topbar menampilkan tombol 'Login / Register'.",
    },
    {
      id: "member",
      title: "Mode MEMBER (John Doe - Pembeli)",
      subTitle: "Akun Pembeli / Customer Terdaftar",
      tag: "Member",
      tagColor: "bg-sky-50 text-sky-700 border-sky-300",
      icon: User,
      destination: "/orders",
      description: "Tampilan akun pembeli terdaftar. Akses riwayat pesanan (orders), unduhan file digital, kupon saya, chat pesan, dan profil pembeli.",
    },
    {
      id: "vendor",
      title: "Mode VENDOR (Trendshop)",
      subTitle: "Dashboard Penjual / Toko",
      tag: "Vendor",
      tagColor: "bg-emerald-50 text-emerald-700 border-emerald-300",
      icon: Store,
      destination: "/dashboard",
      description: "Panel toko Trendshop. Kelola produk, pesanan penjualan, dompet (wallet), ulasan, dan toko.",
    },
    {
      id: "admin",
      title: "Mode ADMIN (Super Admin)",
      subTitle: "Panel Kendali Marketplace",
      tag: "Admin",
      tagColor: "bg-blue-50 text-blue-700 border-blue-300",
      icon: ShieldCheck,
      destination: "/admin",
      description: "Panel AdminLTE untuk mengontrol seluruh sistem Modesy, kelola semua toko, produk, dan transaksi.",
    },
  ];

  const currentRoleConfig = rolesConfig.find(r => r.id === role || (role === "super_admin" && r.id === "admin")) || rolesConfig[1];

  const handleSelectRole = (newRole: UserRole, destination?: string) => {
    setRole(newRole);
    if (destination && pathname !== destination) {
      router.push(destination);
    }
  };

  return (
    <>
      {/* 1. Official Modesy Scroll to Top Button on bottom right (matching screenshot) */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 z-40 w-9 h-9 bg-[#2c333e] hover:bg-black text-white rounded-[2px] flex items-center justify-center shadow-md transition-colors cursor-pointer"
        title="Scroll to Top"
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-4 h-4 stroke-[2.5]" />
      </button>

      {/* 2. Role Switcher anchored cleanly to bottom-left */}
      <div className="fixed bottom-4 left-4 z-[9999] font-sans text-xs select-none">
        {/* Expanded Switcher Card */}
        {isOpen && (
          <div className="mb-2 w-[340px] bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <div>
                  <span className="font-bold text-[13px] block leading-tight">Pengalih Peran (Role Switcher)</span>
                  <span className="text-[11px] text-gray-300">Pilih akses akun aktif Anda</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Body: Role Cards */}
            <div className="p-3 space-y-2 bg-[#f8f9fa]">
              {rolesConfig.map((r) => {
                const Icon = r.icon;
                const isActive = (role === r.id) || (role === "super_admin" && r.id === "admin");

                return (
                  <div
                    key={r.id}
                    className={`p-2.5 rounded-md border transition-all ${
                      isActive
                        ? "bg-white border-[#00ab97] ring-2 ring-[#00ab97]/20 shadow-xs"
                        : "bg-white/80 hover:bg-white border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-md ${isActive ? "bg-[#00ab97] text-white" : "bg-gray-100 text-gray-600"}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-[12.5px] text-gray-800">{r.title}</span>
                            {isActive && (
                              <span className="bg-[#00ab97] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full flex items-center gap-0.5">
                                <Check className="w-2.5 h-2.5" /> Aktif
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-gray-500 block">{r.subTitle}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] text-gray-600 mt-1.5 leading-snug">
                      {r.description}
                    </p>

                    <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => handleSelectRole(r.id)}
                        className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                          isActive
                            ? "bg-gray-100 text-gray-600 cursor-default"
                            : "bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                        }`}
                      >
                        {isActive ? "Sedang Digunakan" : `Ganti ke ${r.tag}`}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSelectRole(r.id, r.destination)}
                        className="text-gray-500 hover:text-emerald-700 text-[11px] font-medium flex items-center gap-1 cursor-pointer"
                      >
                        <span>Buka Halaman</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer Info */}
            <div className="px-3 py-2 bg-white border-t border-gray-200 flex items-center justify-between text-[11px] text-gray-500">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-600" />
                Sesi tersimpan permanen.
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-600 hover:text-gray-900 font-medium cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        )}

        {/* Floating Pill Toggle Button on bottom left */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-gray-900/90 hover:bg-black text-white px-3 py-1.5 rounded-full shadow-lg border border-gray-700 transition-all hover:scale-[1.02] cursor-pointer backdrop-blur-xs"
          title="Klik untuk melihat atau beralih peran"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-gray-300 font-medium text-[10px]">Mode:</span>
          <span className="font-bold text-white text-[11px]">{currentRoleConfig.tag}</span>
          {isOpen ? (
            <ChevronDown className="w-3 h-3 text-gray-400" />
          ) : (
            <ChevronUp className="w-3 h-3 text-gray-400" />
          )}
        </button>
      </div>
    </>
  );
}
