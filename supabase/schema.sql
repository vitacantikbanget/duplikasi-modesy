-- ============================================================================
-- Modesy Marketplace & Classifieds Database Schema
-- Synchronized with live Supabase PostgreSQL Instance
-- ============================================================================

-- 1. Enable Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Custom Enumerations
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('super_admin', 'admin', 'moderator', 'vendor', 'member', 'guest');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE product_listing_type AS ENUM ('sell_on_site', 'ordinary_listing', 'bidding');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE product_condition AS ENUM ('new', 'used');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE order_status AS ENUM ('awaiting_payment', 'payment_received', 'order_processing', 'shipped', 'completed', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. Profiles (Users, Vendors, Admins, Moderators)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    username TEXT UNIQUE,
    role user_role DEFAULT 'member'::user_role NOT NULL,
    email TEXT,
    avatar_url TEXT,
    phone TEXT,
    about TEXT,
    store_name TEXT,
    store_slug TEXT UNIQUE,
    store_description TEXT,
    is_vendor_verified BOOLEAN DEFAULT false,
    is_banned BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 4. Categories & Hierarchies
CREATE TABLE IF NOT EXISTS public.categories (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    parent_id BIGINT REFERENCES public.categories(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    icon_url TEXT,
    order_index INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 5. Products
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    category_id BIGINT REFERENCES public.categories(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    listing_type product_listing_type DEFAULT 'sell_on_site'::product_listing_type NOT NULL,
    condition product_condition DEFAULT 'new'::product_condition NOT NULL,
    price NUMERIC(15, 2) NOT NULL DEFAULT 0.00,
    discount_rate INT DEFAULT 0,
    stock INT NOT NULL DEFAULT 1,
    sku TEXT,
    location TEXT,
    is_approved BOOLEAN DEFAULT false,
    is_promoted BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    rejection_reason TEXT,
    moderated_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    moderated_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 6. Product Images
CREATE TABLE IF NOT EXISTS public.product_images (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    image_url TEXT NOT NULL,
    is_main BOOLEAN DEFAULT false,
    order_index INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 7. Orders
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT UNIQUE NOT NULL,
    buyer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    total_amount NUMERIC(15, 2) NOT NULL,
    payment_status payment_status DEFAULT 'pending'::payment_status NOT NULL,
    order_status order_status DEFAULT 'awaiting_payment'::order_status NOT NULL,
    shipping_address JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 8. Order Items
CREATE TABLE IF NOT EXISTS public.order_items (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    seller_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    quantity INT DEFAULT 1 NOT NULL,
    unit_price NUMERIC(15, 2) NOT NULL,
    total_price NUMERIC(15, 2) NOT NULL
);

-- 9. Offers / Bidding
CREATE TABLE IF NOT EXISTS public.offers (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    buyer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    seller_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    offered_price NUMERIC(15, 2) NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 10. Wishlists
CREATE TABLE IF NOT EXISTS public.wishlists (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    UNIQUE(user_id, product_id)
);

-- 11. Reviews
CREATE TABLE IF NOT EXISTS public.reviews (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    rating SMALLINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    status VARCHAR(50) DEFAULT 'approved' CHECK (status IN ('approved', 'pending', 'flagged', 'hidden')),
    moderation_note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 12. Abuse Reports (Community & Content Moderation)
CREATE TABLE IF NOT EXISTS public.abuse_reports (
    id BIGSERIAL PRIMARY KEY,
    reporter_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    reported_product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    reported_user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    report_reason VARCHAR(255) NOT NULL,
    report_details TEXT,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'investigating', 'resolved', 'dismissed')),
    moderator_notes TEXT,
    resolved_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 13. Refund Requests (Buyer vs Vendor Dispute Moderation)
CREATE TABLE IF NOT EXISTS public.refund_requests (
    id BIGSERIAL PRIMARY KEY,
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    buyer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    vendor_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    reason TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'declined')),
    moderator_notes TEXT,
    resolved_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 14. Product Comments (Moderation)
CREATE TABLE IF NOT EXISTS public.product_comments (
    id BIGSERIAL PRIMARY KEY,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    comment TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'approved' CHECK (status IN ('approved', 'pending', 'hidden', 'flagged')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- 15. Helper Functions & Security Definitions
-- ============================================================================
CREATE OR REPLACE FUNCTION public.is_admin_or_moderator()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'moderator')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- 16. Row Level Security (RLS) Policies
-- ============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.abuse_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.refund_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins and moderators can update moderation flags on profiles" ON public.profiles FOR UPDATE USING (public.is_admin_or_moderator());

-- Products Policies
CREATE POLICY "Active and approved products viewable by everyone" ON public.products FOR SELECT USING (is_active = true AND is_approved = true);
CREATE POLICY "Vendors can view their own products" ON public.products FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins and moderators can view all products" ON public.products FOR SELECT USING (public.is_admin_or_moderator());
CREATE POLICY "Admins and moderators can moderate products" ON public.products FOR UPDATE USING (public.is_admin_or_moderator());

-- Abuse Reports Policies
CREATE POLICY "Authenticated users can file abuse reports" ON public.abuse_reports FOR INSERT WITH CHECK (true);
CREATE POLICY "Moderators and admins can manage abuse reports" ON public.abuse_reports FOR ALL USING (public.is_admin_or_moderator());

-- Refund Requests Policies
CREATE POLICY "Buyers and vendors can view their own refund requests" ON public.refund_requests FOR SELECT USING (auth.uid() = buyer_id OR auth.uid() = vendor_id);
CREATE POLICY "Moderators and admins can manage refund requests" ON public.refund_requests FOR ALL USING (public.is_admin_or_moderator());

-- Comments & Reviews Policies
CREATE POLICY "Approved comments viewable by everyone" ON public.product_comments FOR SELECT USING (status = 'approved' OR public.is_admin_or_moderator());
CREATE POLICY "Moderators and admins can manage all comments" ON public.product_comments FOR ALL USING (public.is_admin_or_moderator());
