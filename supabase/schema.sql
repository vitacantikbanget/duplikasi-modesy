-- Modesy Marketplace & Classifieds Database Schema
-- Compatible with PostgreSQL & Supabase

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Profiles (Users, Vendors, Admins)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username VARCHAR(100) UNIQUE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'member' CHECK (role IN ('super_admin', 'admin', 'moderator', 'vendor', 'member', 'guest')),
    avatar_url TEXT,
    phone VARCHAR(50),
    country VARCHAR(100),
    state VARCHAR(100),
    city VARCHAR(100),
    address TEXT,
    zip_code VARCHAR(20),
    wallet_balance NUMERIC(15, 2) DEFAULT 0.00,
    store_name VARCHAR(150),
    store_description TEXT,
    store_banner_url TEXT,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Categories & Hierarchies
CREATE TABLE IF NOT EXISTS public.categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    parent_id BIGINT REFERENCES public.categories(id) ON DELETE SET NULL,
    description TEXT,
    image_url TEXT,
    order_index INT DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Products
CREATE TABLE IF NOT EXISTS public.products (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(300) NOT NULL,
    slug VARCHAR(350) UNIQUE NOT NULL,
    description TEXT,
    short_description TEXT,
    product_type VARCHAR(50) DEFAULT 'physical' CHECK (product_type IN ('physical', 'digital', 'license_key', 'quote')),
    price NUMERIC(15, 2) NOT NULL DEFAULT 0.00,
    original_price NUMERIC(15, 2),
    discount INT DEFAULT 0,
    currency VARCHAR(10) DEFAULT 'USD',
    stock INT DEFAULT 1,
    sku VARCHAR(100),
    is_free BOOLEAN DEFAULT false,
    is_quote BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    category_id BIGINT REFERENCES public.categories(id) ON DELETE SET NULL,
    vendor_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'pending', 'hidden', 'draft', 'sold')),
    views_count INT DEFAULT 0,
    rating NUMERIC(3, 2) DEFAULT 0.00,
    reviews_count INT DEFAULT 0,
    digital_file_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Product Images
CREATE TABLE IF NOT EXISTS public.product_images (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT REFERENCES public.products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    order_index INT DEFAULT 0,
    is_main BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Product Variations (Color, Size, etc.)
CREATE TABLE IF NOT EXISTS public.product_variations (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT REFERENCES public.products(id) ON DELETE CASCADE,
    variation_type VARCHAR(50) NOT NULL, -- 'color', 'size', 'material'
    name VARCHAR(100) NOT NULL,
    value VARCHAR(100) NOT NULL,
    color_hex VARCHAR(20),
    price_adjustment NUMERIC(15, 2) DEFAULT 0.00,
    stock INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Orders
CREATE TABLE IF NOT EXISTS public.orders (
    id BIGSERIAL PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    is_guest BOOLEAN DEFAULT false,
    guest_name VARCHAR(150),
    guest_email VARCHAR(255),
    guest_phone VARCHAR(50),
    total_amount NUMERIC(15, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'USD',
    status VARCHAR(50) DEFAULT 'Processing' CHECK (status IN ('Processing', 'Completed', 'Cancelled', 'Shipped')),
    payment_status VARCHAR(50) DEFAULT 'Pending Payment' CHECK (payment_status IN ('Pending Payment', 'Payment Received', 'Refunded')),
    payment_method VARCHAR(100) NOT NULL,
    shipping_address JSONB,
    billing_address JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Order Items
CREATE TABLE IF NOT EXISTS public.order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id BIGINT REFERENCES public.products(id) ON DELETE SET NULL,
    vendor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    product_title VARCHAR(300) NOT NULL,
    unit_price NUMERIC(15, 2) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    total_price NUMERIC(15, 2) NOT NULL,
    variation_summary JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Cart Items
CREATE TABLE IF NOT EXISTS public.cart_items (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    product_id BIGINT REFERENCES public.products(id) ON DELETE CASCADE,
    variation_data JSONB,
    quantity INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. Wishlists
CREATE TABLE IF NOT EXISTS public.wishlists (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    product_id BIGINT REFERENCES public.products(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- 11. Reviews
CREATE TABLE IF NOT EXISTS public.reviews (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT REFERENCES public.products(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 12. Transactions
CREATE TABLE IF NOT EXISTS public.transactions (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT REFERENCES public.orders(id) ON DELETE SET NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    payment_method VARCHAR(100) NOT NULL,
    payment_id VARCHAR(255),
    currency VARCHAR(10) DEFAULT 'USD',
    payment_amount NUMERIC(15, 2) NOT NULL,
    payment_status VARCHAR(50) DEFAULT 'Succeeded',
    ip_address VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 13. Vendor Payouts
CREATE TABLE IF NOT EXISTS public.payouts (
    id BIGSERIAL PRIMARY KEY,
    vendor_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    amount NUMERIC(15, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'USD',
    status VARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Completed', 'Rejected')),
    payout_method VARCHAR(100) NOT NULL,
    account_details TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Base Public Select Policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public products are viewable by everyone" ON public.products FOR SELECT USING (status = 'active');
CREATE POLICY "Reviews viewable by everyone" ON public.reviews FOR SELECT USING (true);
