// Komponen Navigasi Utama (Navbar) untuk seluruh etalase publik Modesy.
// Berfungsi menyediakan bilah pencarian langsung (live autocomplete search), pemilihan lokasi/negara,
// pemilih bahasa dan mata uang, tombol keranjang belanja dengan counter jumlah barang,
// daftar barang favorit (wishlist), serta menu profil akun untuk login, register, atau navigasi member/vendor.

"use client";

import {
  Search,
  Heart,
  ShoppingCart,
  MapPin,
  ChevronDown,
  Menu,
  X,
  User,
  LayoutGrid,
  Wallet,
  ShoppingBag,
  ShoppingBasket,
  Layers,
  Tag,
  MessageSquare,
  Settings,
  LogOut,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAppContext, currencies, languages, countries, countryStates, UserRole } from "@/contexts/AppContext";
import { createClient } from "@/lib/supabase/client";
import { ALL_PRODUCTS, ProductItem } from "@/lib/products-data";
import { cn } from "@/lib/utils";

// Daftar pilihan kategori untuk filter pencarian cepat di bilah search
const SEARCH_CATEGORIES = [
  { name: "All Categories", slug: "all" },
  { name: "Clothing", slug: "clothing" },
  { name: "Shoes", slug: "shoes" },
  { name: "Home & Living", slug: "home-living" },
  { name: "Jewelry & Accessories", slug: "jewelry-accessories" },
  { name: "Toys & Entertainment", slug: "toys-entertainment" },
  { name: "Graphics & Photos", slug: "graphics-photos" },
  { name: "Video & Audio", slug: "video-audio" },
  { name: "Web Templates & Code", slug: "web-templates-code" },
];

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [stateDropdownOpen, setStateDropdownOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const [stateSearch, setStateSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  // Live AJAX Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("all");
  const [searchCategoryLabel, setSearchCategoryLabel] = useState("All Categories");
  const [searchCategoryOpen, setSearchCategoryOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<ProductItem[]>([]);
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setSearchDropdownOpen(false);
        setSearchCategoryOpen(false);
      }
      if (
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(e.target as Node)
      ) {
        setMobileSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced live search autocomplete matching Modesy
  useEffect(() => {
    const q = searchQuery.trim().toLowerCase();
    if (q.length >= 2) {
      const filtered = ALL_PRODUCTS.filter((p) => {
        const matchesQuery =
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.subcategory && p.subcategory.toLowerCase().includes(q));

        if (searchCategory === "all") return matchesQuery;
        return (
          matchesQuery &&
          p.categorySlug.toLowerCase() === searchCategory.toLowerCase()
        );
      });
      setSearchResults(filtered.slice(0, 6));
      setSearchDropdownOpen(true);
    } else {
      setSearchResults([]);
      setSearchDropdownOpen(false);
    }
  }, [searchQuery, searchCategory]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchDropdownOpen(false);
    setMobileSearchOpen(false);
    const catParam =
      searchCategory !== "all" ? `&category=${searchCategory}` : "";
    router.push(
      `/products?search=${encodeURIComponent(searchQuery.trim())}${catParam}`
    );
  };

  // Login states (Prefilled with demo credentials)
  const [email, setEmail] = useState("trendshop@codingest.net");
  const [password, setPassword] = useState("1234");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const router = useRouter();
  const supabase = createClient();

  const {
    currency,
    setCurrency,
    language,
    setLanguage,
    location,
    setLocation,
    t,
    cartCount,
    wishlistCount,
    role,
    setRole,
    userProfile,
    logout,
    loginAs,
  } = useAppContext();

  const demoAccounts = [
    { role: "Super Admin", email: "admin@codingest.net", pass: "1234" },
    { role: "Moderator", email: "moderator@codingest.net", pass: "1234" },
    { role: "Vendor", email: "trendshop@codingest.net", pass: "1234" },
    { role: "Member", email: "member@codingest.net", pass: "1234" },
    { role: "Guest", email: "guest@codingest.net", pass: "1234" },
  ];

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
      const demoUser = demoAccounts.find(acc => acc.email.toLowerCase() === trimmedEmail && acc.pass === password);
      if (demoUser) {
        const role = demoUser.role.toLowerCase().replace(' ', '_') as UserRole;
        loginAs(role);
        setLoginModalOpen(false);
        if (role === 'super_admin' || role === 'admin' || role === 'moderator') {
          router.push('/admin');
        } else if (role === 'vendor') {
          router.push('/dashboard');
        } else {
          router.push('/');
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
        .from('profiles')
        .select('role')
        .eq('id', authUser.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error("Error fetching profile:", profileError);
      }

      const role = profile?.role || 'guest';

      setLoginModalOpen(false); // Close the modal

      if (['super_admin', 'admin', 'moderator'].includes(role)) {
        router.push('/admin');
      } else if (role === 'vendor') {
        router.push('/dashboard/vendor');
      } else {
        router.push('/');
      }

      router.refresh();

    } catch (err: any) {
      setLoginError(err.message || "Gagal masuk. Periksa kembali email dan kata sandi Anda.");
    } finally {
      setLoading(false);
    }
  };



  const filteredCountries = countries.filter(c => c.toLowerCase().includes(locationSearch.toLowerCase()));

  const availableStates = selectedCountry ? (countryStates[selectedCountry] || []) : [];
  const filteredStates = availableStates.filter(s => s.toLowerCase().includes(stateSearch.toLowerCase()));

  return (
    <>
      <header className="w-full bg-white border-b border-gray-200 relative z-40">
        {/* Topbar */}
        <div className="border-b border-[#f1f3f5] text-[#6c757d] text-[12px] py-1.5 hidden md:block bg-white">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
            <div className="flex gap-5" suppressHydrationWarning>
              <Link href="/contact" suppressHydrationWarning className="hover:text-[#00a699] py-1 transition-colors">{t("contact")}</Link>
              <Link href="/sell-on-modesy" suppressHydrationWarning className="hover:text-[#00a699] py-1 transition-colors">{t("sell_on_modesy")}</Link>
            </div>
            <div className="flex gap-5 items-center">

              {/* Location Button (Opens Modal) */}
              <div className="flex items-center gap-2 py-1">
                <div
                  onClick={() => setLocationModalOpen(true)}
                  className="group cursor-pointer flex items-center gap-1 hover:text-[#00a699] transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#6c757d]" /> {location === "Location" ? t("location") : location}
                </div>
                {location !== "Location" && (
                  <button
                    onClick={() => {
                      setLocation("Location");
                      setSelectedCountry("");
                    }}
                    className="bg-[#e9ecef] hover:bg-gray-300 text-gray-700 px-2 py-0.5 rounded text-xs transition-colors border border-[#e9ecef]"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Currency Dropdown */}
              <div className="relative group cursor-pointer py-1">
                <div suppressHydrationWarning className="flex items-center gap-1 hover:text-[#00a699] transition-colors">
                  {mounted ? currency.label : currencies[0].label} <ChevronDown className="w-3 h-3 text-[#6c757d]" />
                </div>
                <div className="absolute top-full left-0 hidden group-hover:block w-32 bg-white border border-gray-100 shadow-lg rounded-md py-1 mt-0 z-50">
                  {currencies.map((c) => (
                    <div key={c.code} onClick={() => setCurrency(c)} className="px-4 py-2 hover:bg-gray-50 hover:text-[#00a699] transition-colors">{c.label}</div>
                  ))}
                </div>
              </div>

              {/* Language Dropdown */}
              <div className="relative group cursor-pointer py-1">
                <div suppressHydrationWarning className="flex items-center gap-1 hover:text-[#00a699] transition-colors">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={language.flagUrl} alt={language.label} className="w-[16px] h-auto object-contain rounded-2xs" />
                  {language.label} <ChevronDown className="w-3 h-3 text-[#6c757d]" />
                </div>
                <div className="absolute top-full right-0 hidden group-hover:block w-32 bg-white border border-gray-100 shadow-lg rounded-md py-1 mt-0 z-50">
                  {languages.map((l) => (
                    <div key={l.code} onClick={() => setLanguage(l)} className="px-4 py-2 hover:bg-gray-50 hover:text-[#00a699] transition-colors flex items-center gap-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={l.flagUrl} alt={l.label} className="w-[16px] h-auto object-contain rounded-2xs" />
                      {l.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Topbar User Profile / Login Area */}
              {!mounted || role === "guest" ? (
                <div className="flex items-center gap-2 py-1 font-semibold text-xs text-gray-700">
                  <button
                    type="button"
                    onClick={() => setLoginModalOpen(true)}
                    className="hover:text-[#00a699] flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Login</span>
                  </button>
                  <span className="text-gray-300">/</span>
                  <Link
                    href="/register"
                    className="hover:text-[#00a699] cursor-pointer transition-colors"
                  >
                    Register
                  </Link>
                </div>
              ) : role === "admin" || role === "super_admin" || role === "moderator" ? (
                <div className="flex items-center gap-1">
                  <div className="relative group cursor-pointer py-1">
                    <div className="flex items-center gap-1.5 hover:text-[#00a699] font-medium text-[#2c333e] transition-colors">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="https://i.pravatar.cc/150?u=admin"
                        alt="Admin"
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span className="text-[12px] font-semibold text-[#2c333e]">Admin</span>
                      <ChevronDown className="w-3 h-3 text-[#6c757d]" />
                    </div>
                    <div className="absolute top-full right-0 hidden group-hover:block w-[185px] bg-white border border-[#e9ecef] shadow-lg rounded-[4px] py-1.5 mt-0 z-50 text-[13px] text-[#495057] animate-in fade-in zoom-in-95 duration-100">
                      {/* 1. Admin Panel */}
                      <Link
                        href="/admin"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#212529] transition-colors"
                      >
                        <Layers className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
                        <span>Admin Panel</span>
                      </Link>

                      {/* 2. Dashboard */}
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#212529] transition-colors"
                      >
                        <LayoutGrid className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
                        <span>Dashboard</span>
                      </Link>

                      {/* 3. Profile */}
                      <Link
                        href="/profile/admin"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#212529] transition-colors"
                      >
                        <User className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
                        <span>Profile</span>
                      </Link>

                      {/* 4. Wallet */}
                      <Link
                        href="/wallet"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#212529] transition-colors"
                      >
                        <Wallet className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
                        <span>Wallet</span>
                      </Link>

                      {/* 5. Orders */}
                      <Link
                        href="/orders"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#212529] transition-colors"
                      >
                        <ShoppingBasket className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
                        <span>Orders</span>
                      </Link>

                      {/* 6. My Coupons */}
                      <Link
                        href="/my-coupons"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#212529] transition-colors"
                      >
                        <Tag className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
                        <span>My Coupons</span>
                      </Link>

                      {/* 7. Messages */}
                      <Link
                        href="/messages"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#212529] transition-colors"
                      >
                        <MessageSquare className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
                        <span>Messages</span>
                      </Link>

                      {/* 8. Profile Settings */}
                      <Link
                        href="/settings/edit-profile"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#212529] transition-colors"
                      >
                        <Settings className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
                        <span>Profile Settings</span>
                      </Link>

                      {/* 9. Logout */}
                      <div className="border-t border-[#f1f3f5] my-1" />
                      <button
                        type="button"
                        onClick={() => logout()}
                        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#212529] transition-colors text-left cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : role === "member" ? (
                <div className="flex items-center gap-1">
                  <div className="relative group cursor-pointer py-1">
                    <div className="flex items-center gap-2 hover:text-[#00a99d] font-medium text-[13.5px] text-[#333] transition-colors">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/images/peter-jone-avatar.jpg"
                        alt="Peter Jone"
                        className="w-6 h-6 rounded-full object-cover ring-1 ring-black/10"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80";
                        }}
                      />
                      <span>Peter Jone</span>
                      <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                    </div>

                    {/* Member Dropdown Menu - matches screenshot order and styling */}
                    <div className="absolute top-full right-0 hidden group-hover:block w-[185px] bg-white border border-[#e9ecef] shadow-lg rounded-[2px] py-1.5 mt-0 z-50 text-[13.5px] text-[#495057] animate-in fade-in zoom-in-95 duration-100">
                      <Link
                        href="/member/profile"
                        className="group/item flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] text-[#495057] hover:text-[#00a99d] transition-colors"
                      >
                        <User className="w-4 h-4 text-[#7b808a] group-hover/item:text-[#00a99d] transition-colors shrink-0" strokeWidth={1.5} />
                        <span>Profile</span>
                      </Link>

                      <Link
                        href="/member/wallet"
                        className="group/item flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] text-[#495057] hover:text-[#00a99d] transition-colors"
                      >
                        <Wallet className="w-4 h-4 text-[#7b808a] group-hover/item:text-[#00a99d] transition-colors shrink-0" strokeWidth={1.5} />
                        <span>Wallet</span>
                      </Link>

                      <Link
                        href="/member/orders"
                        className="group/item flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] text-[#495057] hover:text-[#00a99d] transition-colors"
                      >
                        <ShoppingBag className="w-4 h-4 text-[#7b808a] group-hover/item:text-[#00a99d] transition-colors shrink-0" strokeWidth={1.5} />
                        <span>Orders</span>
                      </Link>

                      <Link
                        href="/member/coupons"
                        className="group/item flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] text-[#495057] hover:text-[#00a99d] transition-colors"
                      >
                        <Tag className="w-4 h-4 text-[#7b808a] group-hover/item:text-[#00a99d] transition-colors shrink-0" strokeWidth={1.5} />
                        <span>My Coupons</span>
                      </Link>

                      <Link
                        href="/member/messages"
                        className="group/item flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] text-[#495057] hover:text-[#00a99d] transition-colors"
                      >
                        <MessageSquare className="w-4 h-4 text-[#7b808a] group-hover/item:text-[#00a99d] transition-colors shrink-0" strokeWidth={1.5} />
                        <span>Messages</span>
                      </Link>

                      <Link
                        href="/member/settings"
                        className="group/item flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] text-[#495057] hover:text-[#00a99d] transition-colors"
                      >
                        <Settings className="w-4 h-4 text-[#7b808a] group-hover/item:text-[#00a99d] transition-colors shrink-0" strokeWidth={1.5} />
                        <span>Profile Settings</span>
                      </Link>

                      <div className="border-t border-[#f1f3f5] my-1" />

                      <button
                        type="button"
                        onClick={() => logout()}
                        className="group/item w-full flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] text-[#495057] hover:text-[#00a99d] transition-colors text-left cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 text-[#7b808a] group-hover/item:text-[#00a99d] transition-colors shrink-0" strokeWidth={1.5} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Vendor Role (Trendshop) */
                <div className="flex items-center gap-1">
                  <div className="relative group cursor-pointer py-1">
                    <div className="flex items-center gap-1.5 hover:text-brand-primary font-medium text-gray-700 transition-colors">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=100&q=80"
                        alt="Trendshop"
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-xs font-semibold text-gray-800">Trendshop</span>
                      <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                    </div>
                    <div className="absolute top-full right-0 hidden group-hover:block w-[200px] bg-white border border-[#e9ecef] shadow-lg rounded-[2px] py-1 mt-0 z-50 text-[13px] text-[#495057] animate-in fade-in zoom-in-95 duration-100">
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#2c333e] transition-colors"
                      >
                        <LayoutGrid className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
                        <span>Vendor Dashboard</span>
                      </Link>
                      <Link
                        href="/profile/daniel-jones"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#2c333e] transition-colors"
                      >
                        <User className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
                        <span>Profile</span>
                      </Link>
                      <Link
                        href="/wallet"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#2c333e] transition-colors"
                      >
                        <Wallet className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
                        <span>Wallet</span>
                      </Link>
                      <Link
                        href="/orders"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#2c333e] transition-colors"
                      >
                        <ShoppingBag className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
                        <span>Orders</span>
                      </Link>
                      <Link
                        href="/my-coupons"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#2c333e] transition-colors"
                      >
                        <Tag className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
                        <span>My Coupons</span>
                      </Link>
                      <Link
                        href="/messages"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#2c333e] transition-colors"
                      >
                        <MessageSquare className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
                        <span>Messages</span>
                      </Link>
                      <Link
                        href="/settings/edit-profile"
                        suppressHydrationWarning
                        className="flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#2c333e] transition-colors"
                      >
                        <Settings className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
                        <span>Profile Settings</span>
                      </Link>
                      <div className="border-t border-[#f1f3f5] my-1" />
                      <button
                        type="button"
                        onClick={() => logout()}
                        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-[#f8f9fa] hover:text-[#2c333e] transition-colors text-left cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 text-[#6c757d] shrink-0" strokeWidth={1.5} />
                        <span>Logout (Keluar)</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-6 flex items-center justify-between gap-4 md:gap-8">

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 hover:text-brand-primary p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.svg"
              alt="Modesy"
              width={160}
              height={60}
              className="w-[140px] md:w-[160px] h-auto object-contain"
            />
          </Link>

          {/* Search Bar matching Modesy live screenshot exactly */}
          <div ref={searchContainerRef} className="flex-1 max-w-2xl hidden md:block relative">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center w-full bg-[#f4f5f7] rounded-[4px] px-4 h-11 border border-transparent focus-within:border-[#00a699] focus-within:bg-white transition-all relative"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (searchQuery.trim().length >= 2) setSearchDropdownOpen(true);
                }}
                placeholder="Search for products, categories or brands"
                className="flex-1 text-[13.5px] bg-transparent outline-none text-[#2c333e] placeholder:text-[#888888] font-normal"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="px-1 text-gray-400 hover:text-gray-600 transition-colors mr-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <button
                type="submit"
                className="text-gray-400 hover:text-[#00a699] transition-colors flex items-center justify-center p-1 cursor-pointer"
                title="Search"
              >
                <Search className="w-4 h-4 text-[#888888]" />
              </button>
            </form>

            {/* Live Search AJAX Dropdown (#response_search_results) */}
            {searchDropdownOpen && (
              <div
                id="response_search_results"
                className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-[#dcdfe3] rounded-[3px] shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
              >
                {searchResults.length > 0 ? (
                  <div>
                    <div className="px-4 py-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 flex justify-between items-center">
                      <span>Products</span>
                      <span>{searchResults.length} match{searchResults.length > 1 ? "es" : ""}</span>
                    </div>
                    <div className="divide-y divide-gray-50 max-h-80 overflow-y-auto">
                      {searchResults.map((item) => (
                        <Link
                          key={item.id}
                          href={`/product/${item.slug}`}
                          onClick={() => setSearchDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#f8f9fa] transition-colors group"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.images?.[0] || "/images/products/placeholder.webp"}
                            alt={item.title}
                            className="w-10 h-10 rounded-[2px] object-cover border border-gray-200 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-semibold text-gray-800 group-hover:text-[#00a699] truncate transition-colors">
                              {item.title}
                            </h4>
                            <span className="text-[11px] text-gray-400">
                              {item.category}
                            </span>
                          </div>
                          <div className="text-xs font-bold text-[#00a699] shrink-0">
                            ${typeof item.price === "number" ? item.price : 49}
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="p-2 border-t border-gray-100 bg-gray-50/70">
                      <button
                        type="button"
                        onClick={() => handleSearchSubmit()}
                        className="w-full text-center text-xs font-semibold text-[#00a699] hover:underline py-1 cursor-pointer"
                      >
                        See all results for &quot;{searchQuery}&quot; →
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="px-4 py-6 text-center text-xs text-gray-500">
                    No products found matching &quot;{searchQuery}&quot;
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Actions matching Modesy screenshot exactly */}
          <div className="flex items-center gap-6 flex-shrink-0">
            {/* Cart with red counter badge and text */}
            <Link
              href="/cart"
              className="flex items-center gap-2 text-[#495057] hover:text-[#00a699] transition-colors group"
            >
              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-[#495057] stroke-[1.6]" />
                {mounted && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#e74c3c] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white leading-none">
                    {cartCount > 0 ? cartCount : 1}
                  </span>
                )}
              </div>
              <span className="text-[13.5px] font-medium text-[#495057]">Cart</span>
            </Link>

            {/* Wishlist with heart icon and text */}
            <Link
              href="/wishlist"
              className="hidden sm:flex items-center gap-2 text-[#495057] hover:text-[#00a699] transition-colors group"
            >
              <div className="relative">
                <Heart className="w-6 h-6 text-[#495057] stroke-[1.6]" />
                {mounted && wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#e74c3c] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white leading-none">
                    {wishlistCount}
                  </span>
                )}
              </div>
              <span className="text-[13.5px] font-medium text-[#495057]">Wishlist</span>
            </Link>

            {/* Sell Now solid teal button */}
            <Link
              href="/dashboard/vendor/products/new"
              className="hidden md:flex items-center justify-center bg-[#00a699] hover:bg-[#008f84] text-white px-5 py-2.5 rounded-[3px] text-[13.5px] font-semibold transition-colors shadow-2xs active:scale-95"
            >
              Sell Now
            </Link>

            {/* Mobile Search Icon */}
            <button
              type="button"
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="md:hidden text-gray-600 hover:text-[#00a699] p-1 cursor-pointer"
              aria-label="Toggle Search"
            >
              <Search className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Search Drawer */}
        {mobileSearchOpen && (
          <div ref={mobileSearchRef} className="md:hidden px-4 pb-3 bg-white border-b border-gray-200">
            <form onSubmit={handleSearchSubmit} className="flex w-full bg-[#f4f4f4] rounded-[3px] border border-[#dcdfe3] h-10 overflow-hidden">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("search_placeholder")}
                className="flex-1 px-3 text-xs bg-transparent outline-none text-gray-700"
                autoFocus
              />
              <button
                type="submit"
                className="px-4 bg-[#00a99d] text-white flex items-center justify-center cursor-pointer"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Mobile live search dropdown */}
            {searchResults.length > 0 && (
              <div className="mt-2 bg-white border border-gray-200 rounded shadow-lg max-h-60 overflow-y-auto divide-y divide-gray-100">
                {searchResults.map((item) => (
                  <Link
                    key={item.id}
                    href={`/product/${item.slug}`}
                    onClick={() => setMobileSearchOpen(false)}
                    className="flex items-center gap-2 p-2 hover:bg-gray-50 text-xs"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.images?.[0] || "/images/products/placeholder.webp"}
                      alt={item.title}
                      className="w-8 h-8 rounded object-cover"
                    />
                    <span className="flex-1 truncate font-medium text-gray-800">{item.title}</span>
                    <span className="font-bold text-[#00a99d]">${typeof item.price === "number" ? item.price : 49}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg py-4 px-4 flex flex-col gap-4 z-40">
            <Link href="/login" className="flex items-center gap-2 text-gray-700 p-2 hover:bg-gray-50 rounded"><User className="w-5 h-5" /> {t("login")} / {t("register")}</Link>
            <div className="h-px bg-gray-100 w-full"></div>
            <Link href="/clothing" className="text-gray-700 p-2 hover:bg-gray-50 rounded">{t("categories.clothing")}</Link>
            <Link href="/shoes" className="text-gray-700 p-2 hover:bg-gray-50 rounded">{t("categories.shoes")}</Link>
            <Link href="/home-living" className="text-gray-700 p-2 hover:bg-gray-50 rounded">{t("categories.home_living")}</Link>
            <Link href="/jewelry-accessories" className="text-gray-700 p-2 hover:bg-gray-50 rounded">{t("categories.jewelry")}</Link>
            <Link href="/toys-entertainment" className="text-gray-700 p-2 hover:bg-gray-50 rounded">{t("categories.toys")}</Link>
            <Link
              href="/dashboard/vendor/products/new"
              className="mt-4 flex items-center justify-center bg-[#00a699] text-white px-4 py-3 rounded-md text-sm font-medium hover:bg-[#00897b] transition-colors"
            >
              {t("sell_now")}
            </Link>
          </div>
        )}

        {/* Category Nav Bar (Desktop) matching screenshot */}
        <div className="hidden md:block pb-3.5 border-b border-[#f1f3f5]">
          <div className="max-w-7xl mx-auto px-4 flex justify-center flex-wrap gap-x-7 lg:gap-x-8 text-[13.5px] font-medium text-[#2c333e]">

            <div className="group relative">
              <Link href="/clothing" className="hover:text-[#00a699] transition-colors py-1.5 block">{t("categories.clothing")}</Link>

              {/* Mega Menu */}
              <div className="absolute top-full left-0 -ml-[50px] hidden group-hover:block w-[850px] bg-white border border-gray-100 shadow-xl z-50 p-8 cursor-default mt-4 rounded-sm animate-in fade-in slide-in-from-top-2 duration-200">
                {/* Invisible bridge to prevent hover loss */}
                <div className="absolute -top-4 left-0 w-full h-4 bg-transparent"></div>

                <div className="flex justify-between gap-8">
                  {/* Text Columns */}
                  <div className="flex gap-16 flex-1">
                    <div className="flex flex-col gap-3">
                      <h4 className="font-bold text-gray-900 text-sm mb-1">Women's Clothing</h4>
                      <Link href="/clothing" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Dresses</Link>
                      <Link href="/clothing" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Skirts</Link>
                      <Link href="/clothing" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Pants & Capris</Link>
                      <Link href="/clothing" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Sweaters</Link>
                    </div>
                    <div className="flex flex-col gap-3">
                      <h4 className="font-bold text-gray-900 text-sm mb-1">Men's Clothing</h4>
                      <Link href="/clothing" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Jackets & Coats</Link>
                      <Link href="/clothing" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Sweaters</Link>
                      <Link href="/clothing" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Pants & Jeans</Link>
                      <Link href="/clothing" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Shirts</Link>
                    </div>
                    <div className="flex flex-col gap-3">
                      <h4 className="font-bold text-gray-900 text-sm mb-1">Kid's Clothing</h4>
                      <Link href="/clothing" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Clothing Sets</Link>
                    </div>
                  </div>

                  {/* Images */}
                  <div className="w-[320px] grid grid-cols-2 gap-3">
                    <Link href="/clothing" className="relative group/img overflow-hidden rounded bg-gray-100 block h-24">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=200&fit=crop" alt="Women's Clothing" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/30 transition-colors flex items-end p-2.5">
                        <span className="text-white text-xs font-bold leading-tight">Women's Clothing</span>
                      </div>
                    </Link>
                    <Link href="/clothing" className="relative group/img overflow-hidden rounded bg-gray-100 block h-24">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=200&fit=crop" alt="Sweaters" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/30 transition-colors flex items-end p-2.5">
                        <span className="text-white text-xs font-bold leading-tight">Sweaters</span>
                      </div>
                    </Link>
                    <Link href="/clothing" className="relative group/img overflow-hidden rounded bg-gray-100 block h-24">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=300&h=200&fit=crop" alt="Men's Clothing" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/30 transition-colors flex items-end p-2.5">
                        <span className="text-white text-xs font-bold leading-tight">Men's Clothing</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* SHOES */}
            <div className="group relative">
              <Link href="/shoes" className="hover:text-[#00a699] transition-colors py-1.5 block">{t("categories.shoes")}</Link>
              <div className="absolute top-full left-0 -ml-[50px] hidden group-hover:block w-[850px] bg-white border border-gray-100 shadow-xl z-50 p-8 cursor-default mt-4 rounded-sm animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="absolute -top-4 left-0 w-full h-4 bg-transparent"></div>
                <div className="flex justify-between gap-8">
                  <div className="flex gap-16 flex-1">
                    <div className="flex flex-col gap-3">
                      <h4 className="font-bold text-gray-900 text-sm mb-1">Men's Shoes</h4>
                      <Link href="/shoes" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Sneakers</Link>
                      <Link href="/shoes" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Boots</Link>
                      <Link href="/shoes" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Loafers</Link>
                    </div>
                    <div className="flex flex-col gap-3">
                      <h4 className="font-bold text-gray-900 text-sm mb-1">Women's Shoes</h4>
                      <Link href="/shoes" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Heels</Link>
                      <Link href="/shoes" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Flats</Link>
                      <Link href="/shoes" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Sneakers</Link>
                    </div>
                    <div className="flex flex-col gap-3">
                      <h4 className="font-bold text-gray-900 text-sm mb-1">Kid's Shoes</h4>
                      <Link href="/shoes" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Boys</Link>
                      <Link href="/shoes" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Girls</Link>
                    </div>
                  </div>
                  <div className="w-[320px] grid grid-cols-2 gap-3">
                    <Link href="/shoes" className="relative group/img overflow-hidden rounded bg-gray-100 block h-24">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=200&fit=crop" alt="Shoes" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/30 transition-colors flex items-end p-2.5">
                        <span className="text-white text-xs font-bold leading-tight">Sneakers</span>
                      </div>
                    </Link>
                    <Link href="/shoes" className="relative group/img overflow-hidden rounded bg-gray-100 block h-24">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&h=200&fit=crop" alt="Heels" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/30 transition-colors flex items-end p-2.5">
                        <span className="text-white text-xs font-bold leading-tight">Heels</span>
                      </div>
                    </Link>
                    <Link href="/shoes" className="relative group/img overflow-hidden rounded bg-gray-100 block h-24">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=300&h=200&fit=crop" alt="Boots" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/30 transition-colors flex items-end p-2.5">
                        <span className="text-white text-xs font-bold leading-tight">Boots</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* HOME & LIVING */}
            <div className="group relative">
              <Link href="/home-living" className="hover:text-[#00a699] transition-colors py-1.5 block">{t("categories.home_living")}</Link>
              <div className="absolute top-full left-0 -ml-[150px] hidden group-hover:block w-[850px] bg-white border border-gray-100 shadow-xl z-50 p-8 cursor-default mt-4 rounded-sm animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="absolute -top-4 left-0 w-full h-4 bg-transparent"></div>
                <div className="flex justify-between gap-8">
                  <div className="flex gap-16 flex-1">
                    <div className="flex flex-col gap-3">
                      <h4 className="font-bold text-gray-900 text-sm mb-1">Furniture</h4>
                      <Link href="/home-living" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Living Room</Link>
                      <Link href="/home-living" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Bedroom</Link>
                      <Link href="/home-living" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Office</Link>
                    </div>
                    <div className="flex flex-col gap-3">
                      <h4 className="font-bold text-gray-900 text-sm mb-1">Decor</h4>
                      <Link href="/home-living" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Pillows</Link>
                      <Link href="/home-living" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Mirrors</Link>
                      <Link href="/home-living" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Art</Link>
                    </div>
                    <div className="flex flex-col gap-3">
                      <h4 className="font-bold text-gray-900 text-sm mb-1">Lighting</h4>
                      <Link href="/home-living" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Lamps</Link>
                      <Link href="/home-living" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Ceiling</Link>
                    </div>
                  </div>
                  <div className="w-[320px] grid grid-cols-2 gap-3">
                    <Link href="/home-living" className="relative group/img overflow-hidden rounded bg-gray-100 block h-24">
                      <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop" alt="Living Room" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/30 transition-colors flex items-end p-2.5">
                        <span className="text-white text-xs font-bold leading-tight">Living Room</span>
                      </div>
                    </Link>
                    <Link href="/home-living" className="relative group/img overflow-hidden rounded bg-gray-100 block h-24">
                      <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?w=300&h=200&fit=crop" alt="Decor" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/30 transition-colors flex items-end p-2.5">
                        <span className="text-white text-xs font-bold leading-tight">Decor</span>
                      </div>
                    </Link>
                    <Link href="/home-living" className="relative group/img overflow-hidden rounded bg-gray-100 block h-24">
                      <img src="https://images.unsplash.com/photo-1507452741499-52219468c4d2?w=300&h=200&fit=crop" alt="Lighting" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/30 transition-colors flex items-end p-2.5">
                        <span className="text-white text-xs font-bold leading-tight">Lighting</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* JEWELRY */}
            <div className="group relative">
              <Link href="/jewelry-accessories" className="hover:text-[#00a699] transition-colors py-1.5 block">{t("categories.jewelry")}</Link>
              <div className="absolute top-full left-0 -ml-[250px] hidden group-hover:block w-[850px] bg-white border border-gray-100 shadow-xl z-50 p-8 cursor-default mt-4 rounded-sm animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="absolute -top-4 left-0 w-full h-4 bg-transparent"></div>
                <div className="flex justify-between gap-8">
                  <div className="flex gap-16 flex-1">
                    <div className="flex flex-col gap-3">
                      <h4 className="font-bold text-gray-900 text-sm mb-1">Fine Jewelry</h4>
                      <Link href="/jewelry-accessories" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Rings</Link>
                      <Link href="/jewelry-accessories" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Necklaces</Link>
                      <Link href="/jewelry-accessories" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Bracelets</Link>
                    </div>
                    <div className="flex flex-col gap-3">
                      <h4 className="font-bold text-gray-900 text-sm mb-1">Watches</h4>
                      <Link href="/jewelry-accessories" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Men's Watches</Link>
                      <Link href="/jewelry-accessories" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Women's Watches</Link>
                      <Link href="/jewelry-accessories" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Smartwatches</Link>
                    </div>
                    <div className="flex flex-col gap-3">
                      <h4 className="font-bold text-gray-900 text-sm mb-1">Accessories</h4>
                      <Link href="/jewelry-accessories" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Hats</Link>
                      <Link href="/jewelry-accessories" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Belts</Link>
                    </div>
                  </div>
                  <div className="w-[320px] grid grid-cols-2 gap-3">
                    <Link href="/jewelry-accessories" className="relative group/img overflow-hidden rounded bg-gray-100 block h-24">
                      <img src="https://images.unsplash.com/photo-1599643478524-fb506462a474?w=300&h=200&fit=crop" alt="Rings" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/30 transition-colors flex items-end p-2.5">
                        <span className="text-white text-xs font-bold leading-tight">Rings</span>
                      </div>
                    </Link>
                    <Link href="/jewelry-accessories" className="relative group/img overflow-hidden rounded bg-gray-100 block h-24">
                      <img src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=300&h=200&fit=crop" alt="Watches" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/30 transition-colors flex items-end p-2.5">
                        <span className="text-white text-xs font-bold leading-tight">Watches</span>
                      </div>
                    </Link>
                    <Link href="/jewelry-accessories" className="relative group/img overflow-hidden rounded bg-gray-100 block h-24">
                      <img src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300&h=200&fit=crop" alt="Sunglasses" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/30 transition-colors flex items-end p-2.5">
                        <span className="text-white text-xs font-bold leading-tight">Sunglasses</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* TOYS */}
            <div className="group relative">
              <Link href="/toys-entertainment" className="hover:text-[#00a699] transition-colors py-1.5 block">{t("categories.toys")}</Link>
              <div className="absolute top-full left-0 -ml-[400px] hidden group-hover:block w-[850px] bg-white border border-gray-100 shadow-xl z-50 p-8 cursor-default mt-4 rounded-sm animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="absolute -top-4 left-0 w-full h-4 bg-transparent"></div>
                <div className="flex justify-between gap-8">
                  <div className="flex gap-16 flex-1">
                    <div className="flex flex-col gap-3">
                      <h4 className="font-bold text-gray-900 text-sm mb-1">Toys</h4>
                      <Link href="/toys-entertainment" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Action Figures</Link>
                      <Link href="/toys-entertainment" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Dolls</Link>
                      <Link href="/toys-entertainment" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Puzzles</Link>
                    </div>
                    <div className="flex flex-col gap-3">
                      <h4 className="font-bold text-gray-900 text-sm mb-1">Video Games</h4>
                      <Link href="/toys-entertainment" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">PlayStation</Link>
                      <Link href="/toys-entertainment" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Xbox</Link>
                      <Link href="/toys-entertainment" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Nintendo</Link>
                    </div>
                    <div className="flex flex-col gap-3">
                      <h4 className="font-bold text-gray-900 text-sm mb-1">Movies & Music</h4>
                      <Link href="/toys-entertainment" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">DVDs</Link>
                      <Link href="/toys-entertainment" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Vinyl</Link>
                    </div>
                  </div>
                  <div className="w-[320px] grid grid-cols-2 gap-3">
                    <Link href="/toys-entertainment" className="relative group/img overflow-hidden rounded bg-gray-100 block h-24">
                      <img src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=300&h=200&fit=crop" alt="Toys" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/30 transition-colors flex items-end p-2.5">
                        <span className="text-white text-xs font-bold leading-tight">Toys</span>
                      </div>
                    </Link>
                    <Link href="/toys-entertainment" className="relative group/img overflow-hidden rounded bg-gray-100 block h-24">
                      <img src="https://images.unsplash.com/photo-1605901309584-818e25960b8f?w=300&h=200&fit=crop" alt="Video Games" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/30 transition-colors flex items-end p-2.5">
                        <span className="text-white text-xs font-bold leading-tight">Video Games</span>
                      </div>
                    </Link>
                    <Link href="/toys-entertainment" className="relative group/img overflow-hidden rounded bg-gray-100 block h-24">
                      <img src="https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=300&h=200&fit=crop" alt="Music" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/30 transition-colors flex items-end p-2.5">
                        <span className="text-white text-xs font-bold leading-tight">Music</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* GRAPHICS */}
            <div className="group relative">
              <Link href="/graphics-photos" className="hover:text-[#00a699] transition-colors py-1.5 block">{t("categories.graphics")}</Link>
              <div className="absolute top-full right-0 -mr-[150px] hidden group-hover:block w-[850px] bg-white border border-gray-100 shadow-xl z-50 p-8 cursor-default mt-4 rounded-sm animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="absolute -top-4 left-0 w-full h-4 bg-transparent"></div>
                <div className="flex justify-between gap-8">
                  <div className="flex gap-16 flex-1">
                    <div className="flex flex-col gap-3">
                      <h4 className="font-bold text-gray-900 text-sm mb-1">Vectors</h4>
                      <Link href="/graphics-photos" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Icons</Link>
                      <Link href="/graphics-photos" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Illustrations</Link>
                      <Link href="/graphics-photos" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Backgrounds</Link>
                    </div>
                    <div className="flex flex-col gap-3">
                      <h4 className="font-bold text-gray-900 text-sm mb-1">Photos</h4>
                      <Link href="/graphics-photos" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Nature</Link>
                      <Link href="/graphics-photos" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">People</Link>
                      <Link href="/graphics-photos" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Business</Link>
                    </div>
                    <div className="flex flex-col gap-3">
                      <h4 className="font-bold text-gray-900 text-sm mb-1">Fonts</h4>
                      <Link href="/graphics-photos" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Serif</Link>
                      <Link href="/graphics-photos" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Sans Serif</Link>
                    </div>
                  </div>
                  <div className="w-[320px] grid grid-cols-2 gap-3">
                    <Link href="/graphics-photos" className="relative group/img overflow-hidden rounded bg-gray-100 block h-24">
                      <img src="https://images.unsplash.com/photo-1626785776573-4b799315345d?w=300&h=200&fit=crop" alt="Design" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/30 transition-colors flex items-end p-2.5">
                        <span className="text-white text-xs font-bold leading-tight">Design</span>
                      </div>
                    </Link>
                    <Link href="/graphics-photos" className="relative group/img overflow-hidden rounded bg-gray-100 block h-24">
                      <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&h=200&fit=crop" alt="Photography" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/30 transition-colors flex items-end p-2.5">
                        <span className="text-white text-xs font-bold leading-tight">Photography</span>
                      </div>
                    </Link>
                    <Link href="/graphics-photos" className="relative group/img overflow-hidden rounded bg-gray-100 block h-24">
                      <img src="https://images.unsplash.com/photo-1616423640778-28d1b53229bd?w=300&h=200&fit=crop" alt="Typography" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/30 transition-colors flex items-end p-2.5">
                        <span className="text-white text-xs font-bold leading-tight">Typography</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* VIDEO */}
            <div className="group relative">
              <Link href="/video-audio" className="hover:text-[#00a699] transition-colors py-1.5 block">{t("categories.video_audio")}</Link>
              <div className="absolute top-full right-0 -mr-[50px] hidden group-hover:block w-[850px] bg-white border border-gray-100 shadow-xl z-50 p-8 cursor-default mt-4 rounded-sm animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="absolute -top-4 left-0 w-full h-4 bg-transparent"></div>
                <div className="flex justify-between gap-8">
                  <div className="flex gap-16 flex-1">
                    <div className="flex flex-col gap-3">
                      <h4 className="font-bold text-gray-900 text-sm mb-1">Video Templates</h4>
                      <Link href="/video-audio" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">After Effects</Link>
                      <Link href="/video-audio" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Premiere Pro</Link>
                      <Link href="/video-audio" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">DaVinci Resolve</Link>
                    </div>
                    <div className="flex flex-col gap-3">
                      <h4 className="font-bold text-gray-900 text-sm mb-1">Audio</h4>
                      <Link href="/video-audio" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Music Tracks</Link>
                      <Link href="/video-audio" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Sound Effects</Link>
                      <Link href="/video-audio" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Logos & Idents</Link>
                    </div>
                    <div className="flex flex-col gap-3">
                      <h4 className="font-bold text-gray-900 text-sm mb-1">Stock Footage</h4>
                      <Link href="/video-audio" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Nature</Link>
                      <Link href="/video-audio" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Urban</Link>
                    </div>
                  </div>
                  <div className="w-[320px] grid grid-cols-2 gap-3">
                    <Link href="/video-audio" className="relative group/img overflow-hidden rounded bg-gray-100 block h-24">
                      <img src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=300&h=200&fit=crop" alt="Video" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/30 transition-colors flex items-end p-2.5">
                        <span className="text-white text-xs font-bold leading-tight">Video</span>
                      </div>
                    </Link>
                    <Link href="/video-audio" className="relative group/img overflow-hidden rounded bg-gray-100 block h-24">
                      <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=300&h=200&fit=crop" alt="Audio" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/30 transition-colors flex items-end p-2.5">
                        <span className="text-white text-xs font-bold leading-tight">Audio</span>
                      </div>
                    </Link>
                    <Link href="/video-audio" className="relative group/img overflow-hidden rounded bg-gray-100 block h-24">
                      <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=300&h=200&fit=crop" alt="Footage" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/30 transition-colors flex items-end p-2.5">
                        <span className="text-white text-xs font-bold leading-tight">Footage</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* WEB TEMPLATES */}
            <div className="group relative">
              <Link href="/web-templates-code" className="hover:text-[#00a699] transition-colors py-1.5 block">{t("categories.web_templates")}</Link>
              <div className="absolute top-full right-0 hidden group-hover:block w-[850px] bg-white border border-gray-100 shadow-xl z-50 p-8 cursor-default mt-4 rounded-sm animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="absolute -top-4 left-0 w-full h-4 bg-transparent"></div>
                <div className="flex justify-between gap-8">
                  <div className="flex gap-16 flex-1">
                    <div className="flex flex-col gap-3">
                      <h4 className="font-bold text-gray-900 text-sm mb-1">HTML Templates</h4>
                      <Link href="/web-templates-code" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Admin</Link>
                      <Link href="/web-templates-code" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Landing Page</Link>
                      <Link href="/web-templates-code" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Portfolio</Link>
                    </div>
                    <div className="flex flex-col gap-3">
                      <h4 className="font-bold text-gray-900 text-sm mb-1">CMS Themes</h4>
                      <Link href="/web-templates-code" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">WordPress</Link>
                      <Link href="/web-templates-code" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Shopify</Link>
                      <Link href="/web-templates-code" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">Magento</Link>
                    </div>
                    <div className="flex flex-col gap-3">
                      <h4 className="font-bold text-gray-900 text-sm mb-1">Scripts</h4>
                      <Link href="/web-templates-code" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">PHP</Link>
                      <Link href="/web-templates-code" className="text-[#6c757d] hover:text-[#00a699] transition-colors text-[13px]">JavaScript</Link>
                    </div>
                  </div>
                  <div className="w-[320px] grid grid-cols-2 gap-3">
                    <Link href="/web-templates-code" className="relative group/img overflow-hidden rounded bg-gray-100 block h-24">
                      <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=200&fit=crop" alt="Code" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/30 transition-colors flex items-end p-2.5">
                        <span className="text-white text-xs font-bold leading-tight">Code</span>
                      </div>
                    </Link>
                    <Link href="/web-templates-code" className="relative group/img overflow-hidden rounded bg-gray-100 block h-24">
                      <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop" alt="Web Design" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/30 transition-colors flex items-end p-2.5">
                        <span className="text-white text-xs font-bold leading-tight">Web Design</span>
                      </div>
                    </Link>
                    <Link href="/web-templates-code" className="relative group/img overflow-hidden rounded bg-gray-100 block h-24">
                      <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop" alt="Server" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/30 transition-colors flex items-end p-2.5">
                        <span className="text-white text-xs font-bold leading-tight">Server</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Location Modal */}
      {locationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded shadow-xl w-full max-w-[500px] flex flex-col relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setLocationModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 pb-4 flex flex-col items-center border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-1">Select Location</h3>
              <p className="text-sm text-gray-500">Filter products by location</p>
            </div>

            <div className="p-6 pt-4">
              {/* Country Dropdown */}
              <div className="relative mb-3">
                <div
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 bg-white cursor-pointer flex justify-between items-center hover:border-gray-400 transition-colors"
                  onClick={() => {
                    setLocationDropdownOpen(!locationDropdownOpen);
                    setStateDropdownOpen(false);
                  }}
                >
                  <span>{selectedCountry || "Country"}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>

                {locationDropdownOpen && (
                  <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 shadow-lg rounded z-20">
                    <div className="p-2 border-b border-gray-100">
                      <input
                        type="text"
                        placeholder="Search..."
                        value={locationSearch}
                        onChange={(e) => setLocationSearch(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm outline-none focus:border-brand-primary transition-colors"
                      />
                    </div>
                    <div className="max-h-48 overflow-y-auto py-1">
                      {filteredCountries.map((c, i) => (
                        <div
                          key={i}
                          onClick={() => {
                            setSelectedCountry(c);
                            setLocationDropdownOpen(false);
                            if (c === "Global") {
                              setLocation(c);
                              setLocationModalOpen(false);
                            }
                          }}
                          className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        >
                          {c}
                        </div>
                      ))}
                      {filteredCountries.length === 0 && (
                        <div className="px-3 py-2 text-sm text-gray-400 italic">No countries found</div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* State Dropdown (Only visible/active if a country is selected) */}
              {selectedCountry && selectedCountry !== "Global" && (
                <div className="relative">
                  <div
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 bg-white cursor-pointer flex justify-between items-center hover:border-gray-400 transition-colors"
                    onClick={() => {
                      setStateDropdownOpen(!stateDropdownOpen);
                      setLocationDropdownOpen(false);
                    }}
                  >
                    <span>{selectedState || "State"}</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>

                  {stateDropdownOpen && (
                    <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 shadow-lg rounded z-10">
                      <div className="p-2 border-b border-gray-100">
                        <input
                          type="text"
                          placeholder="Search..."
                          value={stateSearch}
                          onChange={(e) => setStateSearch(e.target.value)}
                          className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm outline-none focus:border-brand-primary transition-colors"
                        />
                      </div>
                      <div className="max-h-48 overflow-y-auto py-1">
                        {filteredStates.map((s, i) => (
                          <div
                            key={i}
                            onClick={() => {
                              setSelectedState(s);
                              setStateDropdownOpen(false);
                            }}
                            className={`px-3 py-2 text-sm cursor-pointer transition-colors ${selectedState === s ? "bg-brand-primary/10 text-brand-primary" : "text-gray-700 hover:bg-gray-100"}`}
                          >
                            {s}
                          </div>
                        ))}
                        {filteredStates.length === 0 && (
                          <div className="px-3 py-2 text-sm text-gray-400 italic">No states found</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Confirmation Button */}
              {selectedCountry && selectedState && (
                <button
                  onClick={() => {
                    setLocation(`${selectedState}, ${selectedCountry}`);
                    setLocationModalOpen(false);
                  }}
                  className="w-full mt-6 bg-brand-primary text-white font-medium py-3 rounded hover:bg-brand-primary-hover transition-colors shadow-sm"
                >
                  Select Location
                </button>
              )}

              {/* Or Global confirmation */}
              {selectedCountry === "Global" && (
                <button
                  onClick={() => {
                    setLocation("Global");
                    setLocationModalOpen(false);
                  }}
                  className="w-full mt-6 bg-brand-primary text-white font-medium py-3 rounded hover:bg-brand-primary-hover transition-colors shadow-sm"
                >
                  Select Location
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Authentic Modesy Login Modal */}
      {loginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-[2px]">
          <div className="bg-white rounded-[4px] shadow-2xl w-full max-w-[420px] flex flex-col relative animate-in fade-in zoom-in-95 duration-150 p-7 sm:p-8">
            {/* Close Button */}
            <button
              onClick={() => setLoginModalOpen(false)}
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
                loginAs("vendor");
                setLoginModalOpen(false);
                router.push("/dashboard");
              }}
              className="w-full flex items-center justify-center gap-3 border border-[#dddddd] hover:border-gray-400 bg-white hover:bg-gray-50 py-2.5 px-4 rounded-[3px] text-[13.5px] font-semibold text-[#555555] transition-colors mb-5 cursor-pointer shadow-2xs"
            >
              <svg className="w-5 h-5" viewBox="0 0 128 128">
                <rect clipRule="evenodd" fill="none" fillRule="evenodd" height="128" width="128"/>
                <path clipRule="evenodd" d="M27.585,64c0-4.157,0.69-8.143,1.923-11.881L7.938,35.648 C3.734,44.183,1.366,53.801,1.366,64c0,10.191,2.366,19.802,6.563,28.332l21.558-16.503C28.266,72.108,27.585,68.137,27.585,64" fill="#FBBC05" fillRule="evenodd"/>
                <path clipRule="evenodd" d="M65.457,26.182c9.031,0,17.188,3.2,23.597,8.436L107.698,16 C96.337,6.109,81.771,0,65.457,0C40.129,0,18.361,14.484,7.938,35.648l21.569,16.471C34.477,37.033,48.644,26.182,65.457,26.182" fill="#EA4335" fillRule="evenodd"/>
                <path clipRule="evenodd" d="M65.457,101.818c-16.812,0-30.979-10.851-35.949-25.937 L7.938,92.349C18.361,113.516,40.129,128,65.457,128c15.632,0,30.557-5.551,41.758-15.951L86.741,96.221 C80.964,99.86,73.689,101.818,65.457,101.818" fill="#34A853" fillRule="evenodd"/>
                <path clipRule="evenodd" d="M126.634,64c0-3.782-0.583-7.855-1.457-11.636H65.457v24.727 h34.376c-1.719,8.431-6.397,14.912-13.092,19.13l20.474,15.828C118.981,101.129,126.634,84.861,126.634,64" fill="#4285F4" fillRule="evenodd"/>
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
              Don't have an account?{" "}
              <Link
                href="/register"
                onClick={() => setLoginModalOpen(false)}
                className="text-[#00a99d] hover:underline font-semibold"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
