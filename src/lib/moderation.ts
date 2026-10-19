import { createClient } from "@/lib/supabase/client";

// ============================================================================
// 1. PRODUCT MODERATION INTERFACES & SERVICES
// ============================================================================

export interface AdminProductItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  vendorName: string;
  vendorEmail?: string;
  vendorAvatar?: string;
  price: number | string;
  stock: number;
  sku: string;
  imageUrl: string;
  isApproved: boolean;
  isActive: boolean;
  rejectionReason?: string | null;
  createdAt: string;
  description?: string;
}

// Initial demo products for moderator workflows
export const INITIAL_MODERATOR_PRODUCTS: AdminProductItem[] = [
  {
    id: "a1111111-1111-1111-1111-111111111111",
    title: "Vintage Oversized Denim Jacket 90s",
    slug: "vintage-oversized-denim-jacket-90s",
    category: "Clothing & Apparel",
    vendorName: "Trend Shop Owner",
    vendorEmail: "trendshop@codingest.net",
    vendorAvatar: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=100&q=80",
    price: 49.99,
    stock: 5,
    sku: "VNT-DNM-90",
    imageUrl: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&q=80",
    isApproved: false,
    isActive: true,
    createdAt: "2026-10-18 14:20",
    description: "Authentic vintage washed denim jacket, premium cotton finish in mint condition. Sourced from retro thrift collection.",
  },
  {
    id: "a2222222-2222-2222-2222-222222222222",
    title: "Wireless Noise Cancelling Headphones Gen 3",
    slug: "wireless-noise-cancelling-headphones-gen-3",
    category: "Electronics & Gadgets",
    vendorName: "Trend Shop Owner",
    vendorEmail: "trendshop@codingest.net",
    vendorAvatar: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=100&q=80",
    price: 129.00,
    stock: 10,
    sku: "HDP-ANC-G3",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    isApproved: false,
    isActive: true,
    createdAt: "2026-10-18 11:45",
    description: "High quality studio headphones with Bluetooth 5.3 and 40-hour battery life. Includes charging case and type-c cable.",
  },
  {
    id: "a3333333-3333-3333-3333-333333333333",
    title: "Designer Minimalist Sneaker White Edition",
    slug: "designer-minimalist-sneaker-white-edition",
    category: "Clothing & Apparel",
    vendorName: "Trend Shop Owner",
    vendorEmail: "trendshop@codingest.net",
    vendorAvatar: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=100&q=80",
    price: 85.00,
    stock: 15,
    sku: "SNK-WHT-MIN",
    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80",
    isApproved: true,
    isActive: true,
    createdAt: "2026-10-17 09:15",
    description: "Modern white sneakers with genuine leather trim and cushioned rubber sole.",
  },
  {
    id: "a4444444-4444-4444-4444-444444444444",
    title: "Smart Watch Ultra GPS Edition",
    slug: "smart-watch-ultra-gps-edition",
    category: "Electronics & Gadgets",
    vendorName: "Trend Shop Owner",
    vendorEmail: "trendshop@codingest.net",
    vendorAvatar: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=100&q=80",
    price: 199.00,
    stock: 3,
    sku: "WTC-GPS-ULT",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    isApproved: true,
    isActive: false, // Hidden
    rejectionReason: "Temporarily hidden: Reported for abnormal pricing during promo audit.",
    createdAt: "2026-10-16 16:30",
    description: "Rugged smartwatch for extreme sports with heart monitor, AMOLED display and titanium frame.",
  },
  {
    id: "a5555555-5555-5555-5555-555555555555",
    title: "Natural Organic Cotton Canvas Tote Bag",
    slug: "natural-organic-cotton-canvas-tote-bag",
    category: "Home & Living",
    vendorName: "EcoStore Official",
    vendorEmail: "ecostore@codingest.net",
    vendorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80",
    price: 18.50,
    stock: 40,
    sku: "BAG-ECO-TOT",
    imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=80",
    isApproved: false,
    isActive: true,
    createdAt: "2026-10-18 16:02",
    description: "Eco-friendly heavy-duty 12oz canvas tote bag with reinforced handles for daily shopping.",
  },
];

const LOCAL_STORAGE_PRODUCTS_KEY = "modesy_admin_moderated_products";

export function getStoredProducts(): AdminProductItem[] {
  if (typeof window === "undefined") return INITIAL_MODERATOR_PRODUCTS;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_PRODUCTS_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(INITIAL_MODERATOR_PRODUCTS));
      return INITIAL_MODERATOR_PRODUCTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_MODERATOR_PRODUCTS;
  }
}

export function saveStoredProducts(products: AdminProductItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(products));
  } catch (err) {
    console.error("Failed to save products in localStorage:", err);
  }
}

export async function fetchAdminProducts(): Promise<AdminProductItem[]> {
  try {
    const supabase = createClient();
    const { data: dbProducts, error } = await supabase
      .from("products")
      .select(`
        id,
        title,
        slug,
        price,
        stock,
        sku,
        is_approved,
        is_active,
        rejection_reason,
        created_at,
        description,
        categories (
          name
        ),
        profiles (
          full_name,
          email,
          avatar_url
        )
      `)
      .order("created_at", { ascending: false });

    if (error || !dbProducts || dbProducts.length === 0) {
      return getStoredProducts();
    }

    const mapped: AdminProductItem[] = dbProducts.map((p: any) => ({
      id: p.id,
      title: p.title || "Untitled Product",
      slug: p.slug || "",
      category: p.categories?.name || "General",
      vendorName: p.profiles?.full_name || "Modesy Vendor",
      vendorEmail: p.profiles?.email || "",
      vendorAvatar: p.profiles?.avatar_url || "https://i.pravatar.cc/150?u=vendor",
      price: p.price ?? 0,
      stock: p.stock ?? 1,
      sku: p.sku || `SKU-${p.id.slice(0, 6)}`,
      imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
      isApproved: p.is_approved ?? false,
      isActive: p.is_active ?? true,
      rejectionReason: p.rejection_reason,
      createdAt: new Date(p.created_at || Date.now()).toISOString().replace("T", " ").slice(0, 16),
      description: p.description || "",
    }));

    const stored = getStoredProducts();
    const merged = [...mapped];
    for (const item of stored) {
      if (!merged.some((m) => m.id === item.id)) {
        merged.push(item);
      }
    }
    return merged;
  } catch (err) {
    console.warn("Using stored products due to Supabase error:", err);
    return getStoredProducts();
  }
}

export async function approveProductAction(productId: string): Promise<boolean> {
  try {
    const supabase = createClient();
    await supabase
      .from("products")
      .update({
        is_approved: true,
        is_active: true,
        rejection_reason: null,
        moderated_at: new Date().toISOString(),
      })
      .eq("id", productId);
  } catch (err) {
    console.warn("Supabase approve update skipped:", err);
  }

  const stored = getStoredProducts();
  const updated = stored.map((p) =>
    p.id === productId ? { ...p, isApproved: true, isActive: true, rejectionReason: null } : p
  );
  saveStoredProducts(updated);
  return true;
}

export async function rejectProductAction(productId: string, reason: string): Promise<boolean> {
  try {
    const supabase = createClient();
    await supabase
      .from("products")
      .update({
        is_approved: false,
        is_active: false,
        rejection_reason: reason,
        moderated_at: new Date().toISOString(),
      })
      .eq("id", productId);
  } catch (err) {
    console.warn("Supabase reject update skipped:", err);
  }

  const stored = getStoredProducts();
  const updated = stored.map((p) =>
    p.id === productId ? { ...p, isApproved: false, isActive: false, rejectionReason: reason } : p
  );
  saveStoredProducts(updated);
  return true;
}

export async function restoreProductAction(productId: string): Promise<boolean> {
  try {
    const supabase = createClient();
    await supabase
      .from("products")
      .update({
        is_active: true,
      })
      .eq("id", productId);
  } catch (err) {
    console.warn("Supabase restore update skipped:", err);
  }

  const stored = getStoredProducts();
  const updated = stored.map((p) =>
    p.id === productId ? { ...p, isActive: true } : p
  );
  saveStoredProducts(updated);
  return true;
}

export async function hideProductAction(productId: string, reason?: string): Promise<boolean> {
  try {
    const supabase = createClient();
    await supabase
      .from("products")
      .update({
        is_active: false,
        rejection_reason: reason || "Dinonaktifkan oleh moderator",
      })
      .eq("id", productId);
  } catch (err) {
    console.warn("Supabase hide update skipped:", err);
  }

  const stored = getStoredProducts();
  const updated = stored.map((p) =>
    p.id === productId ? { ...p, isActive: false, rejectionReason: reason || p.rejectionReason } : p
  );
  saveStoredProducts(updated);
  return true;
}

export async function deleteProductAction(productId: string): Promise<boolean> {
  try {
    const supabase = createClient();
    await supabase.from("products").delete().eq("id", productId);
  } catch (err) {
    console.warn("Supabase delete skipped:", err);
  }

  const stored = getStoredProducts();
  const updated = stored.filter((p) => p.id !== productId);
  saveStoredProducts(updated);
  return true;
}

// ============================================================================
// 2. ABUSE REPORTS INTERFACES & SERVICES
// ============================================================================

export type AbuseReportStatus = "pending" | "investigating" | "resolved" | "dismissed";

export interface AdminAbuseReportItem {
  id: number;
  reporterId: string;
  reporterName: string;
  reporterEmail: string;
  reportedProductId?: string | null;
  reportedProductTitle?: string | null;
  reportedProductSlug?: string | null;
  reportedProductPrice?: number | string | null;
  reportedProductIsActive?: boolean;
  reportedUserId?: string | null;
  reportedUserName?: string | null;
  reportedUserEmail?: string | null;
  reportReason: string;
  reportDetails: string;
  status: AbuseReportStatus;
  moderatorNotes?: string | null;
  resolvedBy?: string | null;
  createdAt: string;
  updatedAt: string;
}

export const INITIAL_ABUSE_REPORTS: AdminAbuseReportItem[] = [
  {
    id: 1,
    reporterId: "2c6e822d-545b-408f-99bc-70472458428d",
    reporterName: "Regular Member",
    reporterEmail: "member@codingest.net",
    reportedProductId: "a3333333-3333-3333-3333-333333333333",
    reportedProductTitle: "Designer Minimalist Sneaker White Edition",
    reportedProductSlug: "designer-minimalist-sneaker-white-edition",
    reportedProductPrice: 85.00,
    reportedProductIsActive: true,
    reportedUserId: "24f51d94-462b-4de8-9033-e6301a3d3352",
    reportedUserName: "Trend Shop Owner",
    reportedUserEmail: "trendshop@codingest.net",
    reportReason: "Suspected Counterfeit Item",
    reportDetails: "The product images look like stock photos of a luxury brand with misleading branding.",
    status: "pending",
    moderatorNotes: null,
    resolvedBy: null,
    createdAt: "2026-10-18 13:57",
    updatedAt: "2026-10-18 13:57",
  },
  {
    id: 2,
    reporterId: "2c6e822d-545b-408f-99bc-70472458428d",
    reporterName: "Regular Member",
    reporterEmail: "member@codingest.net",
    reportedProductId: "a4444444-4444-4444-4444-444444444444",
    reportedProductTitle: "Smart Watch Ultra GPS Edition",
    reportedProductSlug: "smart-watch-ultra-gps-edition",
    reportedProductPrice: 199.00,
    reportedProductIsActive: false,
    reportedUserId: "24f51d94-462b-4de8-9033-e6301a3d3352",
    reportedUserName: "Trend Shop Owner",
    reportedUserEmail: "trendshop@codingest.net",
    reportReason: "Inappropriate Content / Spam",
    reportDetails: "Price is listed abnormally high and seller is asking to communicate outside Modesy platform.",
    status: "investigating",
    moderatorNotes: "Sedang dilakukan pengecekan riwayat obrolan pesan penjual dengan calon pembeli.",
    resolvedBy: "0278439f-5203-4dd3-be00-202eb185648e",
    createdAt: "2026-10-18 13:57",
    updatedAt: "2026-10-19 09:20",
  },
];

const LOCAL_STORAGE_ABUSE_KEY = "modesy_admin_abuse_reports";

export function getStoredAbuseReports(): AdminAbuseReportItem[] {
  if (typeof window === "undefined") return INITIAL_ABUSE_REPORTS;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_ABUSE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_ABUSE_KEY, JSON.stringify(INITIAL_ABUSE_REPORTS));
      return INITIAL_ABUSE_REPORTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_ABUSE_REPORTS;
  }
}

export function saveStoredAbuseReports(reports: AdminAbuseReportItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_STORAGE_ABUSE_KEY, JSON.stringify(reports));
  } catch (err) {
    console.error("Failed to save abuse reports in localStorage:", err);
  }
}

export async function fetchAbuseReports(): Promise<AdminAbuseReportItem[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("abuse_reports")
      .select(`
        id,
        reporter_id,
        reported_product_id,
        reported_user_id,
        report_reason,
        report_details,
        status,
        moderator_notes,
        resolved_by,
        created_at,
        updated_at,
        products (
          id,
          title,
          slug,
          price,
          is_active
        ),
        reporter:profiles!abuse_reports_reporter_id_fkey (
          full_name,
          email
        ),
        reported_user:profiles!abuse_reports_reported_user_id_fkey (
          full_name,
          email
        )
      `)
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return getStoredAbuseReports();
    }

    const mapped: AdminAbuseReportItem[] = data.map((item: any) => ({
      id: item.id,
      reporterId: item.reporter_id,
      reporterName: item.reporter?.full_name || "Pelapor Anonim",
      reporterEmail: item.reporter?.email || "",
      reportedProductId: item.reported_product_id,
      reportedProductTitle: item.products?.title || "Produk Terkait",
      reportedProductSlug: item.products?.slug || "",
      reportedProductPrice: item.products?.price ?? 0,
      reportedProductIsActive: item.products?.is_active ?? true,
      reportedUserId: item.reported_user_id,
      reportedUserName: item.reported_user?.full_name || "Pengguna Terlapor",
      reportedUserEmail: item.reported_user?.email || "",
      reportReason: item.report_reason || "Pelanggaran Konten",
      reportDetails: item.report_details || "-",
      status: (item.status as AbuseReportStatus) || "pending",
      moderatorNotes: item.moderator_notes,
      resolvedBy: item.resolved_by,
      createdAt: new Date(item.created_at || Date.now()).toISOString().replace("T", " ").slice(0, 16),
      updatedAt: new Date(item.updated_at || Date.now()).toISOString().replace("T", " ").slice(0, 16),
    }));

    return mapped;
  } catch (err) {
    console.warn("Using stored abuse reports due to Supabase error:", err);
    return getStoredAbuseReports();
  }
}

export async function resolveAbuseReportAction(
  reportId: number,
  newStatus: AbuseReportStatus,
  notes?: string,
  autoHideProduct?: boolean,
  targetProductId?: string | null
): Promise<boolean> {
  const nowIso = new Date().toISOString();

  // 1. If resolving with auto-hide product
  if (autoHideProduct && targetProductId) {
    await hideProductAction(
      targetProductId,
      `Dinonaktifkan otomatis oleh moderator terkait Laporan Pelanggaran #${reportId}: ${notes || "Melanggar panduan komunitas"}`
    );
  }

  // 2. Update Supabase abuse_reports
  try {
    const supabase = createClient();
    await supabase
      .from("abuse_reports")
      .update({
        status: newStatus,
        moderator_notes: notes || null,
        resolved_by: "0278439f-5203-4dd3-be00-202eb185648e", // Roger Novak
        updated_at: nowIso,
      })
      .eq("id", reportId);
  } catch (err) {
    console.warn("Supabase abuse update skipped:", err);
  }

  // 3. Update local cache
  const stored = getStoredAbuseReports();
  const updated = stored.map((r) =>
    r.id === reportId
      ? {
          ...r,
          status: newStatus,
          moderatorNotes: notes || r.moderatorNotes,
          resolvedBy: "0278439f-5203-4dd3-be00-202eb185648e",
          reportedProductIsActive: autoHideProduct ? false : r.reportedProductIsActive,
          updatedAt: nowIso.replace("T", " ").slice(0, 16),
        }
      : r
  );
  saveStoredAbuseReports(updated);
  return true;
}

export async function deleteAbuseReportAction(reportId: number): Promise<boolean> {
  try {
    const supabase = createClient();
    await supabase.from("abuse_reports").delete().eq("id", reportId);
  } catch (err) {
    console.warn("Supabase delete abuse report skipped:", err);
  }

  const stored = getStoredAbuseReports();
  const updated = stored.filter((r) => r.id !== reportId);
  saveStoredAbuseReports(updated);
  return true;
}

// ============================================================================
// 3. REFUND REQUESTS INTERFACES & SERVICES
// ============================================================================

export type RefundStatus = "pending" | "approved" | "declined";

export interface AdminRefundRequestItem {
  id: number;
  orderId: string;
  orderNumber: string;
  totalAmount: number | string;
  orderStatus: string;
  paymentStatus: string;
  buyerId: string;
  buyerName: string;
  buyerEmail: string;
  vendorId: string;
  vendorName: string;
  vendorEmail: string;
  reason: string;
  status: RefundStatus;
  moderatorNotes?: string | null;
  resolvedBy?: string | null;
  createdAt: string;
  updatedAt: string;
}

export const INITIAL_REFUND_REQUESTS: AdminRefundRequestItem[] = [
  {
    id: 1,
    orderId: "b1111111-1111-1111-1111-111111111111",
    orderNumber: "#10041",
    totalAmount: 60.20,
    orderStatus: "order_processing",
    paymentStatus: "completed",
    buyerId: "2c6e822d-545b-408f-99bc-70472458428d",
    buyerName: "Regular Member",
    buyerEmail: "member@codingest.net",
    vendorId: "24f51d94-462b-4de8-9033-e6301a3d3352",
    vendorName: "Trend Shop Owner",
    vendorEmail: "trendshop@codingest.net",
    reason: "Item received has wrong size and defective stitching on left side.",
    status: "pending",
    moderatorNotes: null,
    resolvedBy: null,
    createdAt: "2026-10-18 13:57",
    updatedAt: "2026-10-18 13:57",
  },
];

const LOCAL_STORAGE_REFUND_KEY = "modesy_admin_refund_requests";

export function getStoredRefundRequests(): AdminRefundRequestItem[] {
  if (typeof window === "undefined") return INITIAL_REFUND_REQUESTS;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_REFUND_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_REFUND_KEY, JSON.stringify(INITIAL_REFUND_REQUESTS));
      return INITIAL_REFUND_REQUESTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_REFUND_REQUESTS;
  }
}

export function saveStoredRefundRequests(requests: AdminRefundRequestItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_STORAGE_REFUND_KEY, JSON.stringify(requests));
  } catch (err) {
    console.error("Failed to save refund requests in localStorage:", err);
  }
}

export async function fetchRefundRequests(): Promise<AdminRefundRequestItem[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("refund_requests")
      .select(`
        id,
        order_id,
        buyer_id,
        vendor_id,
        reason,
        status,
        moderator_notes,
        resolved_by,
        created_at,
        updated_at,
        orders (
          id,
          order_number,
          total_amount,
          payment_status,
          order_status
        ),
        buyer:profiles!refund_requests_buyer_id_fkey (
          full_name,
          email
        ),
        vendor:profiles!refund_requests_vendor_id_fkey (
          full_name,
          email
        )
      `)
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return getStoredRefundRequests();
    }

    const mapped: AdminRefundRequestItem[] = data.map((item: any) => ({
      id: item.id,
      orderId: item.order_id,
      orderNumber: item.orders?.order_number || `#ORD-${item.id}`,
      totalAmount: item.orders?.total_amount ?? 0,
      orderStatus: item.orders?.order_status || "order_processing",
      paymentStatus: item.orders?.payment_status || "completed",
      buyerId: item.buyer_id,
      buyerName: item.buyer?.full_name || "Pembeli Modesy",
      buyerEmail: item.buyer?.email || "",
      vendorId: item.vendor_id,
      vendorName: item.vendor?.full_name || "Trendshop",
      vendorEmail: item.vendor?.email || "",
      reason: item.reason || "Permintaan pengembalian dana pembeli",
      status: (item.status as RefundStatus) || "pending",
      moderatorNotes: item.moderator_notes,
      resolvedBy: item.resolved_by,
      createdAt: new Date(item.created_at || Date.now()).toISOString().replace("T", " ").slice(0, 16),
      updatedAt: new Date(item.updated_at || Date.now()).toISOString().replace("T", " ").slice(0, 16),
    }));

    return mapped;
  } catch (err) {
    console.warn("Using stored refund requests due to Supabase error:", err);
    return getStoredRefundRequests();
  }
}

export async function processRefundAction(
  requestId: number,
  orderId: string,
  newStatus: RefundStatus,
  notes?: string,
  autoUpdateOrder: boolean = true
): Promise<boolean> {
  const nowIso = new Date().toISOString();

  // 1. If approved and auto-update order status
  if (newStatus === "approved" && autoUpdateOrder && orderId) {
    try {
      const supabase = createClient();
      await supabase
        .from("orders")
        .update({
          payment_status: "refunded",
          order_status: "cancelled",
        })
        .eq("id", orderId);
    } catch (err) {
      console.warn("Supabase order status update skipped:", err);
    }
  }

  // 2. Update Supabase refund_requests
  try {
    const supabase = createClient();
    await supabase
      .from("refund_requests")
      .update({
        status: newStatus,
        moderator_notes: notes || null,
        resolved_by: "0278439f-5203-4dd3-be00-202eb185648e", // Roger Novak
        updated_at: nowIso,
      })
      .eq("id", requestId);
  } catch (err) {
    console.warn("Supabase refund update skipped:", err);
  }

  // 3. Update local cache
  const stored = getStoredRefundRequests();
  const updated = stored.map((r) =>
    r.id === requestId
      ? {
          ...r,
          status: newStatus,
          moderatorNotes: notes || r.moderatorNotes,
          resolvedBy: "0278439f-5203-4dd3-be00-202eb185648e",
          orderStatus: newStatus === "approved" ? "cancelled" : r.orderStatus,
          paymentStatus: newStatus === "approved" ? "refunded" : r.paymentStatus,
          updatedAt: nowIso.replace("T", " ").slice(0, 16),
        }
      : r
  );
  saveStoredRefundRequests(updated);
  return true;
}

// ============================================================================
// 4. PRODUCT REVIEWS & COMMENTS MODERATION
// ============================================================================

export type ModerationContentStatus = "approved" | "pending" | "flagged" | "hidden";

export interface AdminReviewItem {
  id: number;
  productId: string;
  productTitle: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  status: ModerationContentStatus;
  moderationNote?: string | null;
  createdAt: string;
}

export interface AdminCommentItem {
  id: number;
  productId: string;
  productTitle: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  comment: string;
  status: ModerationContentStatus;
  createdAt: string;
}

export const INITIAL_REVIEWS: AdminReviewItem[] = [
  {
    id: 1,
    productId: "a3333333-3333-3333-3333-333333333333",
    productTitle: "Designer Minimalist Sneaker White Edition",
    userId: "2c6e822d-545b-408f-99bc-70472458428d",
    userName: "Regular Member",
    userAvatar: "https://i.pravatar.cc/150?u=member",
    rating: 5,
    comment: "Kualitas sepatu sangat bagus, kulit asli lembut dan sangat nyaman dipakai seharian!",
    status: "approved",
    moderationNote: "Diverifikasi",
    createdAt: "2026-10-18 10:30",
  },
  {
    id: 2,
    productId: "a1111111-1111-1111-1111-111111111111",
    productTitle: "Vintage Oversized Denim Jacket 90s",
    userId: "2c6e822d-545b-408f-99bc-70472458428d",
    userName: "Regular Member",
    userAvatar: "https://i.pravatar.cc/150?u=member",
    rating: 1,
    comment: "Barang tidak original, jangan beli di toko ini! Hubungi saya di WA 0812345678 untuk barang asli.",
    status: "flagged",
    moderationNote: "Terindikasi promosi kontak eksternal di luar platform",
    createdAt: "2026-10-19 08:15",
  },
];

export const INITIAL_COMMENTS: AdminCommentItem[] = [
  {
    id: 1,
    productId: "a3333333-3333-3333-3333-333333333333",
    productTitle: "Designer Minimalist Sneaker White Edition",
    userId: "2c6e822d-545b-408f-99bc-70472458428d",
    userName: "Regular Member",
    userAvatar: "https://i.pravatar.cc/150?u=member",
    comment: "Apakah ukuran 42 masih tersedia untuk pengiriman besok ke Jakarta?",
    status: "approved",
    createdAt: "2026-10-18 11:20",
  },
  {
    id: 2,
    productId: "a2222222-2222-2222-2222-222222222222",
    productTitle: "Wireless Noise Cancelling Headphones Gen 3",
    userId: "8bab1047-c84b-45f1-8919-933850b43620",
    userName: "Demo Guest",
    userAvatar: "https://i.pravatar.cc/150?u=guest",
    comment: "Diskon 90% klik link bit.ly/promo-palsu-voucher",
    status: "pending",
    createdAt: "2026-10-19 14:05",
  },
];

const LOCAL_STORAGE_REVIEWS_KEY = "modesy_admin_reviews";
const LOCAL_STORAGE_COMMENTS_KEY = "modesy_admin_comments";

export function getStoredReviews(): AdminReviewItem[] {
  if (typeof window === "undefined") return INITIAL_REVIEWS;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_REVIEWS_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_REVIEWS_KEY, JSON.stringify(INITIAL_REVIEWS));
      return INITIAL_REVIEWS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_REVIEWS;
  }
}

export function saveStoredReviews(reviews: AdminReviewItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_STORAGE_REVIEWS_KEY, JSON.stringify(reviews));
  } catch (err) {
    console.error("Failed to save reviews:", err);
  }
}

export function getStoredComments(): AdminCommentItem[] {
  if (typeof window === "undefined") return INITIAL_COMMENTS;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_COMMENTS_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_COMMENTS_KEY, JSON.stringify(INITIAL_COMMENTS));
      return INITIAL_COMMENTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_COMMENTS;
  }
}

export function saveStoredComments(comments: AdminCommentItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_STORAGE_COMMENTS_KEY, JSON.stringify(comments));
  } catch (err) {
    console.error("Failed to save comments:", err);
  }
}

export async function fetchModeratedReviews(): Promise<AdminReviewItem[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("reviews")
      .select(`
        id,
        product_id,
        user_id,
        rating,
        comment,
        status,
        moderation_note,
        created_at,
        products (
          title
        ),
        profiles (
          full_name,
          avatar_url
        )
      `)
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return getStoredReviews();
    }

    return data.map((r: any) => ({
      id: r.id,
      productId: r.product_id,
      productTitle: r.products?.title || "Produk Modesy",
      userId: r.user_id,
      userName: r.profiles?.full_name || "Pengguna Modesy",
      userAvatar: r.profiles?.avatar_url || "https://i.pravatar.cc/150?u=user",
      rating: r.rating || 5,
      comment: r.comment || "",
      status: (r.status as ModerationContentStatus) || "approved",
      moderationNote: r.moderation_note,
      createdAt: new Date(r.created_at || Date.now()).toISOString().replace("T", " ").slice(0, 16),
    }));
  } catch (err) {
    console.warn("Using stored reviews:", err);
    return getStoredReviews();
  }
}

export async function updateReviewStatusAction(
  reviewId: number,
  status: ModerationContentStatus,
  moderationNote?: string
): Promise<boolean> {
  try {
    const supabase = createClient();
    await supabase
      .from("reviews")
      .update({
        status,
        moderation_note: moderationNote || null,
      })
      .eq("id", reviewId);
  } catch (err) {
    console.warn("Supabase update review skipped:", err);
  }

  const stored = getStoredReviews();
  const updated = stored.map((r) =>
    r.id === reviewId ? { ...r, status, moderationNote: moderationNote || r.moderationNote } : r
  );
  saveStoredReviews(updated);
  return true;
}

export async function fetchModeratedComments(): Promise<AdminCommentItem[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("product_comments")
      .select(`
        id,
        product_id,
        user_id,
        comment,
        status,
        created_at,
        products (
          title
        ),
        profiles (
          full_name,
          avatar_url
        )
      `)
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return getStoredComments();
    }

    return data.map((c: any) => ({
      id: c.id,
      productId: c.product_id,
      productTitle: c.products?.title || "Produk Modesy",
      userId: c.user_id,
      userName: c.profiles?.full_name || "Pengguna Modesy",
      userAvatar: c.profiles?.avatar_url || "https://i.pravatar.cc/150?u=user",
      comment: c.comment || "",
      status: (c.status as ModerationContentStatus) || "approved",
      createdAt: new Date(c.created_at || Date.now()).toISOString().replace("T", " ").slice(0, 16),
    }));
  } catch (err) {
    console.warn("Using stored comments:", err);
    return getStoredComments();
  }
}

export async function updateCommentStatusAction(
  commentId: number,
  status: ModerationContentStatus
): Promise<boolean> {
  try {
    const supabase = createClient();
    await supabase
      .from("product_comments")
      .update({
        status,
      })
      .eq("id", commentId);
  } catch (err) {
    console.warn("Supabase update comment skipped:", err);
  }

  const stored = getStoredComments();
  const updated = stored.map((c) =>
    c.id === commentId ? { ...c, status } : c
  );
  saveStoredComments(updated);
  return true;
}
