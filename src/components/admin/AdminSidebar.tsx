/**
 * ============================================================================
 * AdminSidebar: Bilah Navigasi Samping Panel Admin (Modesy Admin Sidebar)
 * ============================================================================
 * Mengacu pada antarmuka AdminLTE gelap khas Modesy (warna latar `#222d32`):
 * 1. Struktur Menu Lengkap:
 *    - Navigation: Dashboard, Slider, Homepage Manager, dsb.
 *    - Management: Products, Categories, Orders, Payments, Users, Reviews, Support.
 *    - Settings: General Settings, Visual Settings, Route, Currency, Email, SEO.
 * 2. Menu Bertingkat (Accordion Sub-menus):
 *    - Membuka submenu bertingkat saat item menu diklik.
 *    - Mendeteksi tautan aktif (`usePathname`) dan otomatis membuka parent dropdown yang sesuai.
 * 3. Tata Letak Responsif:
 *    - Mode Desktop Kolaps: Menyusut menjadi lebar 50px hanya dengan ikon.
 *    - Mode Mobile Drawer: Berupa laci geser dengan tombol tutup silang (X) dan overlay latar belakang gelap.
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Home,
  Paintbrush,
  SlidersHorizontal,
  LayoutTemplate,
  ShoppingCart,
  ShoppingBag,
  Flag,
  ShoppingBasket,
  Tag,
  Folder,
  Tags,
  Asterisk,
  ToggleLeft,
  CreditCard,
  Banknote,
  DollarSign,
  FileText,
  Newspaper,
  MapPin,
  Users,
  KeyRound,
  HelpCircle,
  Database,
  BarChart3,
  Megaphone,
  MessagesSquare,
  Send,
  StarHalf,
  MessageCircle,
  Mail,
  Share2,
  AlertTriangle,
  Ban,
  Sliders,
  Settings,
  ChevronLeft,
  X,
} from "lucide-react";
import { useAdminContext } from "@/contexts/AdminContext";

interface SubItem {
  label: string;
  href: string;
}

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  href?: string;
  hasDropdown?: boolean;
  subItems?: SubItem[];
}

interface Section {
  title: string;
  items: MenuItem[];
}

// 8 Sections exactly as provided - strictly unchanged
const SIDEBAR_SECTIONS: Section[] = [
  {
    title: "NAVIGATION",
    items: [
      { id: "home", label: "Home", icon: Home, href: "/admin" },
      { id: "theme", label: "Theme", icon: Paintbrush, href: "/admin/theme" },
      { id: "slider", label: "Slider", icon: SlidersHorizontal, href: "/admin/slider" },
      { id: "homepage-manager", label: "Homepage Manager", icon: LayoutTemplate, href: "/admin/homepage-manager" },
    ],
  },
  {
    title: "ORDERS",
    items: [
      {
        id: "orders",
        label: "Orders",
        icon: ShoppingCart,
        hasDropdown: true,
        subItems: [
          { label: "Orders", href: "/admin/orders" },
          { label: "Transactions", href: "/admin/transactions" },
        ],
      },
      {
        id: "digital-sales",
        label: "Digital Sales",
        icon: ShoppingBag,
        href: "/admin/digital-sales",
      },
      {
        id: "refund-requests",
        label: "Refund Requests",
        icon: Flag,
        href: "/admin/refund-requests",
      },
    ],
  },
  {
    title: "PRODUCTS",
    items: [
      {
        id: "products",
        label: "Products",
        icon: ShoppingBasket,
        hasDropdown: true,
        subItems: [
          { label: "Products", href: "/admin/products" },
          { label: "Featured Products", href: "/admin/featured-products" },
          { label: "Special Offers", href: "/admin/special-offers" },
          { label: "Pending Products", href: "/admin/pending-products" },
          { label: "Hidden Products", href: "/admin/hidden-products" },
          { label: "Expired Products", href: "/admin/expired-products" },
          { label: "Sold Products", href: "/admin/sold-products" },
          { label: "Drafts", href: "/admin/drafts" },
          { label: "Deleted Products", href: "/admin/deleted-products" },
          { label: "Add Product", href: "/admin/add-product" },
          { label: "Bulk Product Upload", href: "/admin/bulk-product-upload" },
        ],
      },
      { id: "quote-requests", label: "Quote Requests", icon: Tag, href: "/admin/quote-requests" },
      { id: "categories", label: "Categories", icon: Folder, href: "/admin/categories" },
      { id: "tags", label: "Tags", icon: Tags, href: "/admin/tags" },
      { id: "brands", label: "Brands", icon: Asterisk, href: "/admin/brands" },
      { id: "custom-fields", label: "Custom Fields", icon: ToggleLeft, href: "/admin/custom-fields" },
    ],
  },
  {
    title: "PAYMENTS",
    items: [
      {
        id: "payments",
        label: "Payments",
        icon: CreditCard,
        hasDropdown: true,
        subItems: [
          { label: "Membership Payments", href: "/admin/membership-payments" },
          { label: "Promotion Payments", href: "/admin/promotion-payments" },
          { label: "Wallet Deposits", href: "/admin/wallet-deposits" },
          { label: "Bank Transfer Reports", href: "/admin/bank-transfer-reports" },
        ],
      },
      {
        id: "earnings",
        label: "Earnings",
        icon: Banknote,
        hasDropdown: true,
        subItems: [
          { label: "Earnings", href: "/admin/earnings" },
          { label: "Seller Balances", href: "/admin/seller-balances" },
        ],
      },
      {
        id: "payouts",
        label: "Payouts",
        icon: DollarSign,
        hasDropdown: true,
        subItems: [
          { label: "Add Payout", href: "/admin/add-payout" },
          { label: "Payout Requests", href: "/admin/payout-requests" },
          { label: "Payout Settings", href: "/admin/payout-settings" },
        ],
      },
    ],
  },
  {
    title: "CONTENT",
    items: [
      { id: "pages", label: "Pages", icon: FileText, href: "/admin/pages" },
      {
        id: "blog",
        label: "Blog",
        icon: Newspaper,
        hasDropdown: true,
        subItems: [
          { label: "Posts", href: "/admin/blog-posts" },
          { label: "Categories", href: "/admin/blog-categories" },
        ],
      },
      {
        id: "location",
        label: "Location",
        icon: MapPin,
        hasDropdown: true,
        subItems: [
          { label: "Countries", href: "/admin/countries" },
          { label: "States", href: "/admin/states" },
          { label: "Cities", href: "/admin/cities" },
        ],
      },
    ],
  },
  {
    title: "MEMBERSHIP",
    items: [
      {
        id: "membership",
        label: "Membership",
        icon: Users,
        hasDropdown: true,
        subItems: [
          { label: "Users", href: "/admin/users" },
          { label: "Membership Plans", href: "/admin/membership-plans" },
          { label: "Shop Opening Requests", href: "/admin/shop-opening-requests" },
          { label: "User Login Activities", href: "/admin/user-login-activities" },
          { label: "Account Deletion Requests", href: "/admin/account-deletion-requests" },
        ],
      },
      { id: "roles", label: "Roles & Permissions", icon: KeyRound, href: "/admin/roles" },
    ],
  },
  {
    title: "MANAGEMENT TOOLS",
    items: [
      {
        id: "help-center",
        label: "Help Center",
        icon: HelpCircle,
        hasDropdown: true,
        subItems: [
          { label: "Support Tickets", href: "/admin/support-tickets" },
          { label: "Knowledge Base", href: "/admin/knowledge-base" },
        ],
      },
      { id: "cache-system", label: "Cache System", icon: Database, href: "/admin/cache-system" },
      { id: "seo-tools", label: "SEO Tools", icon: BarChart3, href: "/admin/seo-tools" },
      { id: "ad-spaces", label: "Ad Spaces", icon: Megaphone, href: "/admin/ad-spaces" },
      { id: "chat-messages", label: "Chat Messages", icon: MessagesSquare, href: "/admin/chat-messages" },
      { id: "contact-messages", label: "Contact Messages", icon: Send, href: "/admin/contact-messages" },
      { id: "reviews", label: "Reviews", icon: StarHalf, href: "/admin/reviews" },
      {
        id: "comments",
        label: "Comments",
        icon: MessageCircle,
        hasDropdown: true,
        subItems: [
          { label: "Product Comments", href: "/admin/product-comments" },
          { label: "Blog Comments", href: "/admin/blog-comments" },
        ],
      },
      { id: "newsletter", label: "Newsletter", icon: Mail, href: "/admin/newsletter" },
      { id: "affiliate", label: "Affiliate Program", icon: Share2, href: "/admin/affiliate" },
      { id: "abuse-reports", label: "Abuse Reports", icon: AlertTriangle, href: "/admin/abuse-reports" },
      { id: "email-blacklist", label: "Email Blacklist", icon: Ban, href: "/admin/email-blacklist" },
    ],
  },
  {
    title: "SETTINGS",
    items: [
      { id: "preferences", label: "Preferences", icon: Sliders, href: "/admin/preferences" },
      {
        id: "settings",
        label: "Settings",
        icon: Settings,
        hasDropdown: true,
        subItems: [
          { label: "General Settings", href: "/admin/general-settings" },
          { label: "Language Settings", href: "/admin/language-settings" },
          { label: "Product Settings", href: "/admin/product-settings" },
          { label: "Payment Settings", href: "/admin/payment-settings" },
          { label: "Currency Settings", href: "/admin/currency-settings" },
          { label: "Email Settings", href: "/admin/email-settings" },
          { label: "Social Login", href: "/admin/social-login" },
          { label: "Visual Settings", href: "/admin/visual-settings" },
          { label: "Font Settings", href: "/admin/font-settings" },
          { label: "Route Settings", href: "/admin/route-settings" },
        ],
      },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { sidebarOpenMobile, sidebarCollapsed, closeMobileSidebar } = useAdminContext();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const updated: Record<string, boolean> = {};
    SIDEBAR_SECTIONS.forEach((sec) => {
      sec.items.forEach((item) => {
        if (item.hasDropdown && item.subItems) {
          const match = item.subItems.some((sub) => {
            if (sub.href === "/admin") return pathname === "/admin";
            return pathname.startsWith(sub.href);
          });
          if (match) {
            updated[item.id] = true;
          }
        }
      });
    });
    setOpenMenus((prev) => ({ ...prev, ...updated }));
  }, [pathname]);

  const toggleDropdown = (id: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const isItemActive = (item: MenuItem): boolean => {
    if (item.href) {
      if (item.href === "/admin") {
        return pathname === "/admin";
      }
      return pathname.startsWith(item.href);
    }
    if (item.hasDropdown && item.subItems) {
      return item.subItems.some((sub) => {
        if (sub.href === "/admin") return pathname === "/admin";
        return pathname.startsWith(sub.href);
      });
    }
    return false;
  };

  const isSubActive = (subHref: string): boolean => {
    if (subHref === "/admin") return pathname === "/admin";
    return pathname.startsWith(subHref);
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {sidebarOpenMobile && (
        <div
          onClick={closeMobileSidebar}
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Main Sidebar - Exact #323B4A Dark Slate-Navy from User Screenshot */}
      <aside
        className={`bg-[#323B4A] text-[#8a99a8] h-screen flex flex-col z-50 transition-all duration-300 ease-in-out shrink-0 select-none font-sans
          ${sidebarOpenMobile
            ? "fixed inset-y-0 left-0 w-[230px] translate-x-0 shadow-2xl"
            : "fixed inset-y-0 left-0 -translate-x-full md:translate-x-0 md:static"
          }
          ${sidebarCollapsed
            ? "md:-ml-[230px] md:opacity-0 md:pointer-events-none"
            : "md:ml-0 md:opacity-100 md:w-[230px]"
          }
        `}
      >
        {/* Header / Brand Logo: Centered Modesy Panel */}
        <div className="pt-6 pb-4 px-6 flex items-center justify-center relative">
          <Link
            href="/admin"
            onClick={closeMobileSidebar}
            className="text-[21px] tracking-normal text-center text-white block w-full hover:opacity-95 transition-opacity"
          >
            <span className="font-bold">Modesy</span>{" "}
            <span className="font-light text-white/95">Panel</span>
          </Link>
          {/* Close button on mobile */}
          <button
            onClick={closeMobileSidebar}
            className="md:hidden text-white/70 hover:text-white p-1 absolute right-3 top-5"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Panel - Matching Screenshot (Orb avatar + Admin + green dot Online) */}
        <div className="px-6 py-3 flex items-center bg-transparent">
          <div className="relative shrink-0">
            <img
              src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=100&auto=format&fit=crop&q=80"
              alt="Admin"
              className="w-[46px] h-[46px] rounded-full object-cover shadow-sm"
            />
          </div>
          <div className="ml-3.5 overflow-hidden">
            <p className="text-[14px] font-bold text-white leading-tight mb-1 truncate">
              Admin
            </p>
            <div className="flex items-center text-[11px] text-white/90">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00a65a] mr-1.5 shrink-0 inline-block"></span>
              Online
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto pb-8 scrollbar-thin scrollbar-thumb-[#242b37] scrollbar-track-transparent">
          <ul className="space-y-0 text-[13.5px] list-none p-0 m-0">
            {SIDEBAR_SECTIONS.map((section, sIdx) => (
              <li key={sIdx} className="list-none">
                {/* Section Header: Soft grayish blue uppercase tracking-wider */}
                <div className="px-6 pt-5 pb-1.5 text-[10.5px] font-semibold uppercase tracking-wider text-[#637487] select-none">
                  {section.title}
                </div>

                {/* Section Items */}
                <ul className="space-y-0 list-none p-0 m-0">
                  {section.items.map((item) => {
                    const active = isItemActive(item);
                    const isOpen = !!openMenus[item.id];
                    const Icon = item.icon;

                    if (item.hasDropdown && item.subItems) {
                      return (
                        <li key={item.id} className="relative">
                          <button
                            type="button"
                            onClick={() => toggleDropdown(item.id)}
                            className={`w-full flex items-center justify-between px-6 py-[9px] transition-colors cursor-pointer text-left select-none ${active
                                ? "text-white font-medium"
                                : "text-[#8a99a8] hover:text-white hover:bg-[#28303c]/50"
                              }`}
                          >
                            <div className="flex items-center min-w-0 pr-2">
                              <Icon className="w-[16px] h-[16px] mr-3.5 shrink-0" strokeWidth={active ? 2.2 : 1.8} />
                              <span className="truncate">{item.label}</span>
                            </div>
                            <ChevronLeft
                              className={`w-3.5 h-3.5 shrink-0 opacity-60 transition-transform duration-200 ${isOpen ? "-rotate-90 text-white opacity-90" : "rotate-0"
                                }`}
                            />
                          </button>

                          {/* Submenu Dropdown Tree */}
                          {isOpen && (
                            <ul className="bg-[#28303c] py-1.5 space-y-0.5 list-none m-0">
                              {item.subItems.map((sub, subIdx) => {
                                const subActive = isSubActive(sub.href);
                                return (
                                  <li key={subIdx}>
                                    <Link
                                      href={sub.href}
                                      onClick={closeMobileSidebar}
                                      className={`flex items-center pl-11 pr-6 py-2 text-[12.5px] transition-colors ${subActive
                                          ? "text-white font-medium bg-[#222933]"
                                          : "text-[#8a99a8] hover:text-white hover:bg-[#222933]/50"
                                        }`}
                                    >
                                      <span
                                        className={`inline-block w-1.5 h-1.5 rounded-full border mr-2.5 shrink-0 transition-colors ${subActive
                                            ? "border-white bg-white"
                                            : "border-[#8a99a8] bg-transparent"
                                          }`}
                                      />
                                      <span className="truncate">{sub.label}</span>
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </li>
                      );
                    }

                    return (
                      <li key={item.id}>
                        <Link
                          href={item.href || "#"}
                          onClick={closeMobileSidebar}
                          className={`flex items-center justify-between px-6 py-[9px] transition-colors cursor-pointer select-none ${active
                              ? "text-white font-semibold"
                              : "text-[#8a99a8] hover:text-white hover:bg-[#28303c]/50"
                            }`}
                        >
                          <div className="flex items-center min-w-0">
                            <Icon
                              className={`w-[16px] h-[16px] mr-3.5 shrink-0 ${active ? "text-white" : "text-[#8a99a8]"}`}
                              strokeWidth={active ? 2.3 : 1.8}
                            />
                            <span className="truncate">{item.label}</span>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
