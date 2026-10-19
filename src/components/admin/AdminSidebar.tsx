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
  GripHorizontal,
  ToggleRight,
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
  BarChart,
  Megaphone,
  MessageSquare,
  Mail,
  Star,
  StarHalf,
  MessageCircle,
  Send,
  Link as LinkIcon,
  AlertTriangle,
  MailX,
  Sliders,
  Settings,
  DownloadCloud,
  ChevronDown,
  Circle,
  X,
  Store,
  RotateCcw,
} from "lucide-react";
import { useAdminContext } from "@/contexts/AdminContext";
import { useAppContext } from "@/contexts/AppContext";
import { createClient } from "@/lib/supabase/client";

interface SubItem {
  label: string;
  href: string;
  badge?: number | string;
  badgeColor?: string;
}

const SidebarSection = ({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) => (
  <div className="mb-0">
    {title && (
      <h3 className="text-[11px] font-semibold text-[#7a8b9a] px-6 pt-5 pb-2 uppercase tracking-wider">
        {title}
      </h3>
    )}
    <ul className="space-y-0.5">{children}</ul>
  </div>
);

const SidebarItem = ({
  icon: Icon,
  label,
  href,
  active,
  hasDropdown,
  subItems,
  isOpen,
  onToggle,
  onItemClick,
  badge,
  badgeColor = "bg-[#dd4b39]",
}: {
  icon: any;
  label: string;
  href?: string;
  active?: boolean;
  hasDropdown?: boolean;
  subItems?: SubItem[];
  isOpen?: boolean;
  onToggle?: () => void;
  onItemClick?: () => void;
  badge?: number | string;
  badgeColor?: string;
}) => {
  const pathname = usePathname();

  const itemContent = (
    <>
      <div className="flex items-center min-w-0">
        <Icon className="w-[18px] h-[18px] mr-3 shrink-0" strokeWidth={active ? 2.5 : 2} />
        <span className="text-[13.5px] truncate">{label}</span>
      </div>
      <div className="flex items-center space-x-1.5 shrink-0 ml-2">
        {badge !== undefined && Number(badge) > 0 && (
          <span className={`text-[10px] font-bold text-white px-1.5 py-0.5 rounded-full leading-tight ${badgeColor}`}>
            {badge}
          </span>
        )}
        {hasDropdown && (
          <ChevronDown
            className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 shrink-0 ${
              isOpen ? "rotate-180" : "-rotate-90"
            }`}
          />
        )}
      </div>
    </>
  );

  const baseClass = `flex items-center justify-between px-6 py-[9px] transition-colors cursor-pointer select-none ${
    active
      ? "text-white font-medium bg-[#2a3038]/60"
      : "text-[#8a99a8] hover:text-white hover:bg-[#2a3038]/40"
  }`;

  if (hasDropdown) {
    return (
      <li>
        <button
          type="button"
          onClick={onToggle}
          className={`w-full ${baseClass}`}
        >
          {itemContent}
        </button>

        {isOpen && subItems && subItems.length > 0 && (
          <ul className="bg-[#262b32] py-1.5 space-y-0.5">
            {subItems.map((sub, index) => {
              const isSubActive = pathname === sub.href;
              return (
                <li key={index}>
                  <Link
                    href={sub.href}
                    onClick={onItemClick}
                    className={`flex items-center justify-between pl-12 pr-6 py-1.5 text-[12.5px] transition-colors ${
                      isSubActive
                        ? "text-white font-medium bg-[#1e2329]"
                        : "text-[#8a99a8] hover:text-white hover:bg-[#1e2329]/60"
                    }`}
                  >
                    <span>• {sub.label}</span>
                    {sub.badge !== undefined && Number(sub.badge) > 0 && (
                      <span className={`text-[10px] font-bold text-white px-1.5 py-0.5 rounded-full ${sub.badgeColor || "bg-[#dd4b39]"}`}>
                        {sub.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </li>
    );
  }

  if (href) {
    return (
      <li>
        <Link href={href} onClick={onItemClick} className={baseClass}>
          {itemContent}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button
        type="button"
        onClick={onToggle || onItemClick}
        className={`w-full ${baseClass}`}
      >
        {itemContent}
      </button>
    </li>
  );
};

export default function AdminSidebar() {
  const pathname = usePathname();
  const { sidebarOpenMobile, sidebarCollapsed, closeMobileSidebar } = useAdminContext();
  const { role, userProfile } = useAppContext();

  const isModerator = role === "moderator";

  // Badges count state for moderator queue
  const [counts, setCounts] = useState({
    pendingProducts: 2,
    abuseReports: 2,
    refundRequests: 1,
  });

  useEffect(() => {
    async function fetchCounts() {
      try {
        const supabase = createClient();
        const [prodRes, abuseRes, refundRes] = await Promise.all([
          supabase
            .from("products")
            .select("id", { count: "exact", head: true })
            .eq("is_approved", false),
          supabase
            .from("abuse_reports")
            .select("id", { count: "exact", head: true })
            .eq("status", "pending"),
          supabase
            .from("refund_requests")
            .select("id", { count: "exact", head: true })
            .eq("status", "pending"),
        ]);

        setCounts({
          pendingProducts: prodRes.count ?? 2,
          abuseReports: abuseRes.count ?? 2,
          refundRequests: refundRes.count ?? 1,
        });
      } catch (err) {
        console.error("Error fetching admin counts:", err);
      }
    }
    fetchCounts();
  }, []);

  // Accordion state for dropdown items
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    orders: false,
    products: false,
    payments: false,
    content: false,
    membership: false,
    settings: false,
    comments: false,
  });

  const toggleMenu = (key: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isActive = (path: string) => pathname === path;

  // In official Modesy, moderator account is Roger Novak
  const displayName = isModerator
    ? (userProfile?.name && userProfile.name !== "Super Admin" ? userProfile.name : "Roger Novak")
    : (userProfile?.name || "Super Admin");

  const avatarUrl = isModerator
    ? (userProfile?.avatar || "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=150&q=80")
    : (userProfile?.avatar || "https://i.pravatar.cc/150?u=admin");

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {sidebarOpenMobile && (
        <div
          onClick={closeMobileSidebar}
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`bg-[#323842] text-[#8a99a8] h-screen flex flex-col z-50 transition-all duration-300 ease-in-out shrink-0 select-none
          ${
          /* Mobile drawer */
          sidebarOpenMobile
            ? "fixed inset-y-0 left-0 w-[260px] translate-x-0 shadow-2xl"
            : "fixed inset-y-0 left-0 -translate-x-full md:translate-x-0 md:static"
          }
          ${
          /* Desktop collapse toggle */
          sidebarCollapsed
            ? "md:-ml-[260px] md:opacity-0 md:pointer-events-none"
            : "md:ml-0 md:opacity-100 md:w-[260px]"
          }
        `}
      >
        {/* Header / Brand */}
        <div className="pt-6 pb-5 px-6 flex items-center justify-between relative">
          <Link
            href="/admin"
            onClick={closeMobileSidebar}
            className="text-[22px] tracking-wide text-center text-white font-bold w-full"
          >
            Modesy <span className="font-light">Panel</span>
          </Link>
          {/* Close button on mobile */}
          <button
            onClick={closeMobileSidebar}
            className="md:hidden text-gray-400 hover:text-white p-1 absolute right-4"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Profile Banner (Exactly as official Modesy screenshot) */}
        <div className="px-6 py-3 flex items-center mb-1">
          <div className="relative shrink-0">
            <img
              src={avatarUrl}
              alt={displayName}
              className="w-[46px] h-[46px] rounded-full object-cover shadow-sm border border-gray-600"
            />
          </div>
          <div className="ml-3.5 overflow-hidden flex-1">
            <p className="text-[14px] font-bold text-white mb-0.5 truncate">{displayName}</p>
            <div className="flex items-center text-[11px] text-white">
              <Circle className="w-2.5 h-2.5 fill-[#00a65a] text-[#00a65a] mr-1.5" />
              Online
            </div>
          </div>
        </div>

        {/* Scrollable Navigation Menu */}
        <div className="flex-1 overflow-y-auto pb-8 scrollbar-thin scrollbar-thumb-slate-600">
          {isModerator ? (
            /* ========================================================================= */
            /* MODERATOR MENU: 100% Matching Official Modesy Moderator Screenshot        */
            /* Exactly 3 Sections: NAVIGATION, PRODUCTS, MANAGEMENT TOOLS                */
            /* ========================================================================= */
            <>
              {/* 1. NAVIGATION */}
              <SidebarSection title="NAVIGATION">
                <SidebarItem
                  icon={Home}
                  label="Home"
                  href="/admin"
                  active={isActive("/admin")}
                  onItemClick={closeMobileSidebar}
                />
                <SidebarItem
                  icon={SlidersHorizontal}
                  label="Slider"
                  href="/admin/slider"
                  active={isActive("/admin/slider")}
                  onItemClick={closeMobileSidebar}
                />
                <SidebarItem
                  icon={LayoutTemplate}
                  label="Homepage Manager"
                  href="/admin/homepage-manager"
                  active={isActive("/admin/homepage-manager")}
                  onItemClick={closeMobileSidebar}
                />
              </SidebarSection>

              {/* 2. PRODUCTS */}
              <SidebarSection title="PRODUCTS">
                <SidebarItem
                  icon={ShoppingBasket}
                  label="Products"
                  hasDropdown
                  active={pathname.startsWith("/admin/products") || pathname.startsWith("/admin/pending-products") || pathname.startsWith("/admin/hidden-products")}
                  isOpen={openMenus.products}
                  onToggle={() => toggleMenu("products")}
                  subItems={[
                    { label: "Products", href: "/admin/products" },
                    {
                      label: "Pending Products",
                      href: "/admin/pending-products",
                      badge: counts.pendingProducts,
                      badgeColor: "bg-[#dd4b39]",
                    },
                    { label: "Hidden Products", href: "/admin/hidden-products" },
                    { label: "Drafts", href: "/admin/drafts" },
                  ]}
                  onItemClick={closeMobileSidebar}
                />
                <SidebarItem
                  icon={Tag}
                  label="Quote Requests"
                  href="/admin/quote-requests"
                  active={isActive("/admin/quote-requests")}
                  onItemClick={closeMobileSidebar}
                />
                <SidebarItem
                  icon={Folder}
                  label="Categories"
                  href="/admin/categories"
                  active={isActive("/admin/categories")}
                  onItemClick={closeMobileSidebar}
                />
                <SidebarItem
                  icon={Tag}
                  label="Tags"
                  href="/admin/tags"
                  active={isActive("/admin/tags")}
                  onItemClick={closeMobileSidebar}
                />
                <SidebarItem
                  icon={ToggleRight}
                  label="Custom Fields"
                  href="/admin/custom-fields"
                  active={isActive("/admin/custom-fields")}
                  onItemClick={closeMobileSidebar}
                />
              </SidebarSection>

              {/* 3. MANAGEMENT TOOLS */}
              <SidebarSection title="MANAGEMENT TOOLS">
                <SidebarItem
                  icon={Send}
                  label="Contact Messages"
                  href="/admin/contact-messages"
                  active={isActive("/admin/contact-messages")}
                  onItemClick={closeMobileSidebar}
                />
                <SidebarItem
                  icon={Star}
                  label="Reviews"
                  href="/admin/reviews"
                  active={isActive("/admin/reviews")}
                  onItemClick={closeMobileSidebar}
                />
                <SidebarItem
                  icon={MessageCircle}
                  label="Comments"
                  hasDropdown
                  active={pathname.startsWith("/admin/comments") || pathname.startsWith("/admin/blog-comments")}
                  isOpen={openMenus.comments}
                  onToggle={() => toggleMenu("comments")}
                  subItems={[
                    { label: "Product Comments", href: "/admin/comments" },
                    { label: "Blog Comments", href: "/admin/blog-comments" },
                  ]}
                  onItemClick={closeMobileSidebar}
                />
                <SidebarItem
                  icon={AlertTriangle}
                  label="Abuse Reports"
                  href="/admin/abuse-reports"
                  active={isActive("/admin/abuse-reports")}
                  badge={counts.abuseReports}
                  badgeColor="bg-rose-600"
                  onItemClick={closeMobileSidebar}
                />
                <SidebarItem
                  icon={RotateCcw}
                  label="Refund Requests"
                  href="/admin/refund-requests"
                  active={isActive("/admin/refund-requests")}
                  badge={counts.refundRequests}
                  badgeColor="bg-amber-600"
                  onItemClick={closeMobileSidebar}
                />
              </SidebarSection>
            </>
          ) : (
            /* ========================================================================= */
            /* SUPER ADMIN MENU (Complete Full Access System)                            */
            /* ========================================================================= */
            <>
              <SidebarSection title="NAVIGATION">
                <SidebarItem
                  icon={Home}
                  label="Home"
                  href="/admin"
                  active={isActive("/admin")}
                  onItemClick={closeMobileSidebar}
                />
                <SidebarItem
                  icon={Paintbrush}
                  label="Theme"
                  href="/admin/theme"
                  active={isActive("/admin/theme")}
                  onItemClick={closeMobileSidebar}
                />
                <SidebarItem
                  icon={SlidersHorizontal}
                  label="Slider"
                  href="/admin/slider"
                  active={isActive("/admin/slider")}
                  onItemClick={closeMobileSidebar}
                />
                <SidebarItem
                  icon={LayoutTemplate}
                  label="Homepage Manager"
                  href="/admin/homepage-manager"
                  active={isActive("/admin/homepage-manager")}
                  onItemClick={closeMobileSidebar}
                />
              </SidebarSection>

              <SidebarSection title="ORDERS">
                <SidebarItem
                  icon={ShoppingCart}
                  label="Orders"
                  hasDropdown
                  active={pathname.startsWith('/admin/orders') || pathname.startsWith('/admin/transactions')}
                  isOpen={openMenus.orders !== undefined ? openMenus.orders : (pathname.startsWith('/admin/orders') || pathname.startsWith('/admin/transactions'))}
                  onToggle={() => toggleMenu("orders")}
                  subItems={[
                    { label: "Orders", href: "/admin/orders" },
                    { label: "Transactions", href: "/admin/transactions" },
                  ]}
                  onItemClick={closeMobileSidebar}
                />
                <SidebarItem
                  icon={ShoppingBag}
                  label="Digital Sales"
                  href="/admin/digital-sales"
                  active={isActive("/admin/digital-sales")}
                  onItemClick={closeMobileSidebar}
                />
                <SidebarItem
                  icon={Flag}
                  label="Refund Requests"
                  href="/admin/refund-requests"
                  active={isActive("/admin/refund-requests")}
                  badge={counts.refundRequests}
                  badgeColor="bg-amber-600"
                  onItemClick={closeMobileSidebar}
                />
              </SidebarSection>

              <SidebarSection title="PRODUCTS">
                <SidebarItem
                  icon={ShoppingBasket}
                  label="Products"
                  hasDropdown
                  isOpen={openMenus.products}
                  onToggle={() => toggleMenu("products")}
                  subItems={[
                    { label: "Products", href: "/admin/products" },
                    { 
                      label: "Pending Products", 
                      href: "/admin/pending-products",
                      badge: counts.pendingProducts,
                      badgeColor: "bg-[#dd4b39]"
                    },
                    { label: "Hidden Products", href: "/admin/hidden-products" },
                    { label: "Drafts", href: "/admin/drafts" },
                  ]}
                  onItemClick={closeMobileSidebar}
                />
                <SidebarItem
                  icon={Tag}
                  label="Quote Requests"
                  href="/admin/quote-requests"
                  onItemClick={closeMobileSidebar}
                />
                <SidebarItem
                  icon={Folder}
                  label="Categories"
                  href="/admin/categories"
                  active={isActive("/admin/categories")}
                  onItemClick={closeMobileSidebar}
                />
                <SidebarItem
                  icon={Tags}
                  label="Tags"
                  href="/admin/tags"
                  onItemClick={closeMobileSidebar}
                />
                <SidebarItem
                  icon={Asterisk}
                  label="Brands"
                  href="/admin/brands"
                  onItemClick={closeMobileSidebar}
                />
                <SidebarItem
                  icon={GripHorizontal}
                  label="Custom Fields"
                  href="/admin/custom-fields"
                  onItemClick={closeMobileSidebar}
                />
              </SidebarSection>

              <SidebarSection title="PAYMENTS">
                <SidebarItem
                  icon={CreditCard}
                  label="Payments"
                  hasDropdown
                  isOpen={openMenus.payments}
                  onToggle={() => toggleMenu("payments")}
                  subItems={[
                    { label: "Payment History", href: "/admin/payment-history" },
                    { label: "Payment Settings", href: "/admin/payment-settings" },
                  ]}
                  onItemClick={closeMobileSidebar}
                />
                <SidebarItem
                  icon={Banknote}
                  label="Earnings"
                  href="/admin/earnings"
                  onItemClick={closeMobileSidebar}
                />
                <SidebarItem
                  icon={DollarSign}
                  label="Payouts"
                  href="/admin/payouts"
                  onItemClick={closeMobileSidebar}
                />
              </SidebarSection>

              <SidebarSection title="CONTENT">
                <SidebarItem
                  icon={FileText}
                  label="Pages"
                  href="/admin/pages"
                  onItemClick={closeMobileSidebar}
                />
                <SidebarItem
                  icon={Newspaper}
                  label="Blog"
                  hasDropdown
                  isOpen={openMenus.content}
                  onToggle={() => toggleMenu("content")}
                  subItems={[
                    { label: "Posts", href: "/admin/blog-posts" },
                    { label: "Categories", href: "/admin/blog-categories" },
                  ]}
                  onItemClick={closeMobileSidebar}
                />
                <SidebarItem
                  icon={MapPin}
                  label="Location"
                  href="/admin/locations"
                  onItemClick={closeMobileSidebar}
                />
              </SidebarSection>

              <SidebarSection title="MEMBERSHIP">
                <SidebarItem
                  icon={Users}
                  label="Membership"
                  hasDropdown
                  isOpen={openMenus.membership}
                  onToggle={() => toggleMenu("membership")}
                  subItems={[
                    { label: "Users", href: "/admin/users" },
                    { label: "Vendors", href: "/admin/vendors" },
                    { label: "Administrators", href: "/admin/administrators" },
                  ]}
                  onItemClick={closeMobileSidebar}
                />
                <SidebarItem
                  icon={KeyRound}
                  label="Roles & Permissions"
                  href="/admin/roles"
                  onItemClick={closeMobileSidebar}
                />
              </SidebarSection>

              <SidebarSection title="MANAGEMENT TOOLS">
                <SidebarItem
                  icon={HelpCircle}
                  label="Help Center"
                  href="/admin/help-center"
                  onItemClick={closeMobileSidebar}
                />
                <SidebarItem
                  icon={Database}
                  label="Cache System"
                  href="/admin/cache-system"
                  onItemClick={closeMobileSidebar}
                />
                <SidebarItem
                  icon={BarChart}
                  label="SEO Tools"
                  href="/admin/seo-tools"
                  onItemClick={closeMobileSidebar}
                />
                <SidebarItem
                  icon={Megaphone}
                  label="Ad Spaces"
                  href="/admin/ad-spaces"
                  onItemClick={closeMobileSidebar}
                />
                <SidebarItem
                  icon={MessageSquare}
                  label="Chat Messages"
                  href="/admin/chat-messages"
                  onItemClick={closeMobileSidebar}
                />
                <SidebarItem
                  icon={Send}
                  label="Contact Messages"
                  href="/admin/contact-messages"
                  onItemClick={closeMobileSidebar}
                />
                <SidebarItem
                  icon={Star}
                  label="Reviews"
                  href="/admin/reviews"
                  onItemClick={closeMobileSidebar}
                />
                <SidebarItem
                  icon={MessageCircle}
                  label="Comments"
                  href="/admin/comments"
                  onItemClick={closeMobileSidebar}
                />
                <SidebarItem
                  icon={Mail}
                  label="Newsletter"
                  href="/admin/newsletter"
                  onItemClick={closeMobileSidebar}
                />
                <SidebarItem
                  icon={LinkIcon}
                  label="Affiliate Program"
                  href="/admin/affiliate"
                  onItemClick={closeMobileSidebar}
                />
                <SidebarItem
                  icon={AlertTriangle}
                  label="Abuse Reports"
                  href="/admin/abuse-reports"
                  onItemClick={closeMobileSidebar}
                />
                <SidebarItem
                  icon={MailX}
                  label="Email Blacklist"
                  href="/admin/email-blacklist"
                  onItemClick={closeMobileSidebar}
                />
              </SidebarSection>

              <SidebarSection title="SETTINGS">
                <SidebarItem
                  icon={Sliders}
                  label="Preferences"
                  href="/admin/preferences"
                  onItemClick={closeMobileSidebar}
                />
                <SidebarItem
                  icon={Settings}
                  label="Settings"
                  hasDropdown
                  isOpen={openMenus.settings}
                  onToggle={() => toggleMenu("settings")}
                  subItems={[
                    { label: "General Settings", href: "/admin/settings" },
                    { label: "Visual Settings", href: "/admin/visual-settings" },
                    { label: "Email Settings", href: "/admin/email-settings" },
                  ]}
                  onItemClick={closeMobileSidebar}
                />
              </SidebarSection>

              <div className="px-6 mt-8 mb-4">
                <button
                  type="button"
                  onClick={() => alert("Database backup download started...")}
                  className="w-full flex items-center justify-center py-2 px-3 bg-[#2a3038] hover:bg-[#252a31] text-[#8a99a8] hover:text-white rounded text-xs transition-colors border border-[#252a31] cursor-pointer"
                >
                  <DownloadCloud className="w-4 h-4 mr-2" />
                  Download Database Backup
                </button>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
