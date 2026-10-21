// Bilah menu samping (Sidebar) untuk Dashboard Penjual (Vendor Sidebar).
// Berfungsi untuk mengelola seluruh operasional toko online penjual:
// Manajemen Produk (Tambah Produk, Produk Aktif, Draft, Pending), Penjualan & Pesanan,
// Permintaan Penawaran Harga (Quote Requests), Kupon Diskon Toko, Permintaan Pengembalian Dana (Refund),
// Dompet Saldo & Pembayaran Promosi, Ulasan Pembeli, dan Pengaturan Pengiriman Toko.

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useAppContext } from "@/contexts/AppContext";
import {
  X,
  Home,
  FileText,
  CloudUpload,
  ShoppingBag,
  ShoppingCart,
  Tag,
  Ticket,
  Flag,
  Banknote,
  CreditCard,
  MessageSquare,
  Star,
  Settings,
  ShieldCheck,
  Truck,
  ChevronDown
} from "lucide-react";

interface VendorSidebarProps {
  sidebarOpenMobile: boolean;
  closeMobileSidebar: () => void;
}

interface SubItem {
  label: string;
  href: string;
}

interface NavItem {
  id: string;
  label: string;
  href?: string;
  icon: any;
  badge?: number;
  hasSubmenu?: boolean;
  subItems?: SubItem[];
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export default function VendorSidebar({ sidebarOpenMobile, closeMobileSidebar }: VendorSidebarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const stParam = searchParams?.get("st") || "";
  const paymentParam = searchParams?.get("payment") || "";
  const { role, userProfile } = useAppContext();

  const isAdmin = role === "admin" || role === "super_admin" || role === "moderator";
  const displayName = isAdmin ? "Admin" : (userProfile?.name || "Trendshop");
  const avatarUrl = isAdmin
    ? "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=100&auto=format&fit=crop&q=80"
    : (userProfile?.avatar || "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=200&q=80");

  // State to track open/closed submenus
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    products: true,
    sales: true,
    payments: false,
  });

  // Automatically expand parent if current route is within its subItems
  useEffect(() => {
    if (pathname?.startsWith("/dashboard/products")) {
      setOpenMenus((prev) => ({ ...prev, products: true }));
    } else if (pathname?.startsWith("/dashboard/sales")) {
      setOpenMenus((prev) => ({ ...prev, sales: true }));
    } else if (
      pathname?.startsWith("/dashboard/payments") ||
      pathname?.startsWith("/dashboard/membership-payments") ||
      pathname?.startsWith("/dashboard/promotion-payments")
    ) {
      setOpenMenus((prev) => ({ ...prev, payments: true }));
    }
  }, [pathname]);

  const toggleSubmenu = (menuId: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  const isItemActive = (href?: string) => {
    if (!href) return false;
    if (href === "/dashboard") {
      return pathname === "/dashboard" || pathname === "/dashboard/vendor";
    }
    if (href === "/dashboard/add-product") {
      return pathname === "/dashboard/add-product" || pathname === "/dashboard/vendor/products/new";
    }
    if (href === "/dashboard/bulk-product-upload") {
      return pathname === "/dashboard/bulk-product-upload" || pathname === "/dashboard/bulk-upload";
    }
    if (href === "/dashboard/products") {
      return pathname === "/dashboard/products" && (!stParam || stParam === "");
    }
    if (href === "/dashboard/products?st=pending") {
      return (pathname === "/dashboard/products" && stParam === "pending") || pathname === "/dashboard/products/pending";
    }
    if (href === "/dashboard/products?st=hidden") {
      return (pathname === "/dashboard/products" && stParam === "hidden") || pathname === "/dashboard/products/hidden";
    }
    if (href === "/dashboard/products?st=sold") {
      return (pathname === "/dashboard/products" && stParam === "sold") || pathname === "/dashboard/products/sold";
    }
    if (href === "/dashboard/products?st=draft" || href === "/dashboard/products?st=drafts") {
      return (pathname === "/dashboard/products" && (stParam === "draft" || stParam === "drafts")) || pathname === "/dashboard/products/drafts" || pathname === "/dashboard/products/draft";
    }
    if (href === "/dashboard/sales") {
      return pathname === "/dashboard/sales" && (!stParam || stParam === "" || stParam === "active");
    }
    if (href === "/dashboard/sales/completed" || href === "/dashboard/sales?st=completed") {
      return (pathname === "/dashboard/sales" && stParam === "completed") || pathname === "/dashboard/sales/completed";
    }
    if (href === "/dashboard/sales/cancelled" || href === "/dashboard/sales?st=cancelled") {
      return (pathname === "/dashboard/sales" && stParam === "cancelled") || pathname === "/dashboard/sales/cancelled";
    }
    if (
      href === "/dashboard/membership-payments" ||
      href === "/dashboard/payments?payment=membership" ||
      href === "/dashboard/payments/membership-payments"
    ) {
      return (
        pathname === "/dashboard/membership-payments" ||
        pathname === "/dashboard/payments/membership-payments" ||
        (pathname === "/dashboard/payments" && (!paymentParam || paymentParam === "membership"))
      );
    }
    if (
      href === "/dashboard/promotion-payments" ||
      href === "/dashboard/payments?payment=promotion" ||
      href === "/dashboard/payments/promotion-payments"
    ) {
      return (
        pathname === "/dashboard/promotion-payments" ||
        pathname === "/dashboard/payments/promotion-payments" ||
        (pathname === "/dashboard/payments" && paymentParam === "promotion")
      );
    }
    return pathname === href;
  };

  const navSections: NavSection[] = [
    {
      title: "NAVIGATION",
      items: [
        {
          id: "dashboard",
          label: "Dashboard",
          href: "/dashboard",
          icon: Home,
        },
      ],
    },
    {
      title: "PRODUCTS",
      items: [
        {
          id: "add-product",
          label: "Add Product",
          href: "/dashboard/add-product",
          icon: FileText,
        },
        {
          id: "bulk-upload",
          label: "Bulk Product Upload",
          href: "/dashboard/bulk-product-upload",
          icon: CloudUpload,
        },
        {
          id: "products",
          label: "Products",
          icon: ShoppingBag,
          hasSubmenu: true,
          subItems: [
            { label: "Products", href: "/dashboard/products" },
            { label: "Pending Products", href: "/dashboard/products?st=pending" },
            { label: "Hidden Products", href: "/dashboard/products?st=hidden" },
            { label: "Sold Products", href: "/dashboard/products?st=sold" },
            { label: "Drafts", href: "/dashboard/products?st=draft" },
          ],
        },
      ],
    },
    {
      title: "SALES",
      items: [
        {
          id: "sales",
          label: "Sales",
          icon: ShoppingCart,
          hasSubmenu: true,
          subItems: [
            { label: "Active Sales", href: "/dashboard/sales" },
            { label: "Completed Sales", href: "/dashboard/sales?st=completed" },
            { label: "Cancelled Sales", href: "/dashboard/sales?st=cancelled" },
          ],
        },
        {
          id: "quote-requests",
          label: "Quote Requests",
          href: "/dashboard/quote-requests",
          icon: Tag,
        },
        {
          id: "coupons",
          label: "Coupons",
          href: "/dashboard/coupons",
          icon: Ticket,
        },
        {
          id: "refund-requests",
          label: "Refund Requests",
          href: "/dashboard/refund-requests",
          icon: Flag,
          badge: 2,
        },
        {
          id: "cash-on-delivery",
          label: "Cash on Delivery",
          href: "/dashboard/cash-on-delivery",
          icon: Banknote,
        },
      ],
    },
    {
      title: "PAYMENTS",
      items: [
        {
          id: "payments",
          label: "Payments",
          icon: CreditCard,
          hasSubmenu: true,
          subItems: [
            { label: "Membership Payments", href: "/dashboard/payments?payment=membership" },
            { label: "Promotion Payments", href: "/dashboard/payments?payment=promotion" },
          ],
        },
      ],
    },
    {
      title: "COMMENTS",
      items: [
        {
          id: "comments",
          label: "Comments",
          href: "/dashboard/comments",
          icon: MessageSquare,
        },
        {
          id: "reviews",
          label: "Reviews",
          href: "/dashboard/reviews",
          icon: Star,
        },
      ],
    },
    {
      title: "SETTINGS",
      items: [
        {
          id: "shop-settings",
          label: "Shop Settings",
          href: "/dashboard/shop-settings",
          icon: Settings,
        },
        {
          id: "shop-policies",
          label: "Shop Policies",
          href: "/dashboard/shop-policies",
          icon: ShieldCheck,
        },
        {
          id: "shipping-settings",
          label: "Shipping Settings",
          href: "/dashboard/shipping-settings",
          icon: Truck,
        },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {sidebarOpenMobile && (
        <div
          onClick={closeMobileSidebar}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-[230px] bg-white border-r border-[#e9ecef] flex flex-col
          transition-transform duration-200 select-none
          md:static md:translate-x-0 md:h-screen shrink-0
          ${sidebarOpenMobile ? "translate-x-0 shadow-xl" : "-translate-x-full"}
        `}
      >
        {/* Logo Section */}
        <div className="pt-6 pb-4 px-6 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center justify-center w-full">
            <span className="text-[26px] font-bold tracking-tight text-[#2c333e] font-sans">
              Modesy
            </span>
          </Link>
          <button
            onClick={closeMobileSidebar}
            className="md:hidden p-1 text-gray-400 hover:text-gray-700 absolute right-3 top-6"
            aria-label="Close Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Profile Card */}
        <div className="pb-5 px-6 flex flex-col items-center">
          <div className="w-[84px] h-[84px] rounded-full p-[2.5px] border-[3px] border-[#00ab97]/70 flex items-center justify-center overflow-hidden mb-2.5 shadow-2xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatarUrl}
              alt={displayName}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <span className="text-[14.5px] font-bold text-[#2c333e] font-sans">
            Hi, {displayName}
          </span>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto pb-6 scrollbar-thin">
          {navSections.map((section, sIdx) => (
            <div key={sIdx} className="mb-2">
              <div className="text-[11px] font-bold text-[#8c98a4] tracking-wider uppercase px-5 pt-3 pb-1 font-sans">
                {section.title}
              </div>
              <div className="flex flex-col">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active = isItemActive(item.href);
                  const isSubmenuOpen = !!openMenus[item.id];

                  // Submenu Item Parent Button
                  if (item.hasSubmenu) {
                    return (
                      <div key={item.id} className="flex flex-col">
                        <button
                          type="button"
                          onClick={() => toggleSubmenu(item.id)}
                          className={`
                            flex items-center justify-between px-5 py-[9px] text-[13.5px] transition-colors w-full text-left
                            ${isSubmenuOpen
                              ? "text-[#2b333e] font-medium"
                              : "text-[#495057] hover:bg-[#f8fafc] hover:text-[#2b333e]"
                            }
                          `}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="w-[17px] h-[17px] text-[#5a6268] shrink-0" strokeWidth={2} />
                            <span className="leading-tight">{item.label}</span>
                          </div>

                          <div className="flex items-center">
                            {isSubmenuOpen ? (
                              <ChevronDown className="w-3.5 h-3.5 text-[#5a6268]" />
                            ) : (
                              <span className="text-[11px] text-[#8c98a4] font-semibold leading-none">
                                &lt;
                              </span>
                            )}
                          </div>
                        </button>

                        {/* Collapsible Sub-items */}
                        {isSubmenuOpen && item.subItems && (
                          <div className="flex flex-col">
                            {item.subItems.map((sub, subIdx) => {
                              const isSubActive = isItemActive(sub.href);
                              return (
                                <Link
                                  key={subIdx}
                                  href={sub.href}
                                  onClick={(e) => {
                                    closeMobileSidebar();
                                    if (typeof window !== "undefined") {
                                      if (
                                        (pathname.startsWith("/dashboard/products") && sub.href.startsWith("/dashboard/products")) ||
                                        (pathname.startsWith("/dashboard/sales") && sub.href.startsWith("/dashboard/sales")) ||
                                        (pathname.startsWith("/dashboard/payments") && sub.href.startsWith("/dashboard/payments"))
                                      ) {
                                        e.preventDefault();
                                        window.location.href = sub.href;
                                      }
                                    }
                                  }}
                                  className={`
                                    block pl-[49px] pr-5 py-[7px] text-[13px] transition-colors cursor-pointer
                                    ${isSubActive
                                      ? "text-[#2b333e] font-medium bg-[#f4f6f9]"
                                      : "text-[#495057] hover:text-[#2b333e] hover:bg-[#f8fafc]"
                                    }
                                  `}
                                >
                                  {sub.label}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  }

                  // Normal Link Item
                  return (
                    <Link
                      key={item.id}
                      href={item.href || "#"}
                      onClick={closeMobileSidebar}
                      className={`
                        flex items-center justify-between px-5 py-[9px] text-[13.5px] transition-colors
                        ${active
                          ? "bg-[#f4f6f9] text-[#2b333e] font-medium"
                          : "text-[#495057] hover:bg-[#f8fafc] hover:text-[#2b333e]"
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-[17px] h-[17px] text-[#5a6268] shrink-0" strokeWidth={2} />
                        <span className="leading-tight">{item.label}</span>
                      </div>

                      {item.badge !== undefined && (
                        <span className="bg-[#00ab97] text-white text-[11px] font-bold px-2 py-0.5 rounded-[3px] min-w-[20px] text-center leading-tight">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}
