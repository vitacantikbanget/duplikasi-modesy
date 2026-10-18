import { createClient } from "@/lib/supabase/client";

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

const LOCAL_STORAGE_KEY = "modesy_admin_moderated_products";

// Helper to get local override cache
export function getStoredProducts(): AdminProductItem[] {
  if (typeof window === "undefined") return INITIAL_MODERATOR_PRODUCTS;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_MODERATOR_PRODUCTS));
      return INITIAL_MODERATOR_PRODUCTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_MODERATOR_PRODUCTS;
  }
}

// Helper to save local override cache
export function saveStoredProducts(products: AdminProductItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
  } catch (err) {
    console.error("Failed to save products in localStorage:", err);
  }
}

// Fetch all products (Supabase + local merge)
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

    // Map DB items
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

    // Merge with any local demo products not in DB
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

// Approve product
export async function approveProductAction(productId: string): Promise<boolean> {
  // 1. Try Supabase
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

  // 2. Always update local cache
  const stored = getStoredProducts();
  const updated = stored.map((p) =>
    p.id === productId ? { ...p, isApproved: true, isActive: true, rejectionReason: null } : p
  );
  saveStoredProducts(updated);
  return true;
}

// Reject product
export async function rejectProductAction(productId: string, reason: string): Promise<boolean> {
  // 1. Try Supabase
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

  // 2. Always update local cache
  const stored = getStoredProducts();
  const updated = stored.map((p) =>
    p.id === productId ? { ...p, isApproved: false, isActive: false, rejectionReason: reason } : p
  );
  saveStoredProducts(updated);
  return true;
}

// Restore / Unhide product
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

// Hide product
export async function hideProductAction(productId: string): Promise<boolean> {
  try {
    const supabase = createClient();
    await supabase
      .from("products")
      .update({
        is_active: false,
      })
      .eq("id", productId);
  } catch (err) {
    console.warn("Supabase hide update skipped:", err);
  }

  const stored = getStoredProducts();
  const updated = stored.map((p) =>
    p.id === productId ? { ...p, isActive: false } : p
  );
  saveStoredProducts(updated);
  return true;
}

// Delete product
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
