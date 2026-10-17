"use client";

import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ChevronDown,
  Edit2,
  Copy,
  Trash2,
  Tag,
  Download,
  FileSpreadsheet,
  FileCode,
  Check,
  Image as ImageIcon
} from "lucide-react";

export interface ProductItem {
  id: string;
  title: string;
  sku: string;
  image: string;
  badge?: {
    type: "discount" | "featured";
    text: string;
  };
  productType: "Physical" | "Digital";
  category: string;
  subCategory?: string;
  listingType?: "sale" | "ordinary" | "quote" | "license";
  purchasedPlan?: string;
  price: number;
  stockStatus: string;
  pageViews: number;
  date: string;
  editedAgo: string;
  status: "active" | "pending" | "hidden" | "sold" | "draft";
}

// Exactly 24 products matching the Modesy reference screenshots
const all24Products: ProductItem[] = [
  {
    id: "47",
    title: "Colorful women scarves",
    sku: "CIW2S3C4V5R6",
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=200&q=80",
    badge: { type: "discount", text: "15%" },
    productType: "Physical",
    category: "Scarfs",
    subCategory: "Scarfs",
    listingType: "sale",
    price: 40,
    stockStatus: "In Stock (500)",
    pageViews: 190,
    date: "2026-07-31 / 19:40",
    editedAgo: "2 months ago",
    status: "active",
  },
  {
    id: "45",
    title: "Navy polka dot dress",
    sku: "NIP2D3D4R5S6",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=200&q=80",
    badge: { type: "discount", text: "15%" },
    productType: "Physical",
    category: "Dresses",
    subCategory: "Dresses",
    listingType: "sale",
    price: 130,
    stockStatus: "In Stock (500)",
    pageViews: 204,
    date: "2026-07-31 / 19:29",
    editedAgo: "2 months ago",
    status: "active",
  },
  {
    id: "43",
    title: "Black fashion women backpack",
    sku: "BIF2W3B4P5K6",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&q=80",
    productType: "Physical",
    category: "Backpacks",
    subCategory: "Backpacks",
    listingType: "quote",
    price: 0,
    stockStatus: "In Stock (500)",
    pageViews: 171,
    date: "2026-07-31 / 19:21",
    editedAgo: "2 months ago",
    status: "active",
  },
  {
    id: "41",
    title: "Black midi skirt with white flowers",
    sku: "B1M2S3W4F5L6",
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=200&q=80",
    badge: { type: "featured", text: "Featured" },
    productType: "Physical",
    category: "Skirts",
    subCategory: "Skirts",
    listingType: "sale",
    purchasedPlan: "Monthly Plan (270 Days)",
    price: 48,
    stockStatus: "In Stock (500)",
    pageViews: 286,
    date: "2026-07-31 / 19:13",
    editedAgo: "2 months ago",
    status: "active",
  },
  {
    id: "39",
    title: "Animal colorful digital prints",
    sku: "AIC2D3P4R5N6",
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=200&q=80",
    productType: "Digital",
    category: "Vectors",
    subCategory: "Vectors",
    listingType: "sale",
    price: 29,
    stockStatus: "In Stock",
    pageViews: 322,
    date: "2026-07-31 / 18:49",
    editedAgo: "2 months ago",
    status: "active",
  },
  {
    id: "37",
    title: "Seychelles women's brown ankle bootie",
    sku: "S1W2B3A4B5T6",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200&q=80",
    productType: "Physical",
    category: "Boots",
    subCategory: "Boots",
    listingType: "sale",
    price: 79,
    stockStatus: "In Stock (500)",
    pageViews: 137,
    date: "2026-07-31 / 18:27",
    editedAgo: "2 months ago",
    status: "active",
  },
  {
    id: "35",
    title: "Men outerwear navy color",
    sku: "M1O2N3C4L5R6",
    image: "https://images.unsplash.com/photo-1544022613-e87ce7526edb?w=200&q=80",
    productType: "Physical",
    category: "Jackets & Coats",
    subCategory: "Jackets & Coats",
    listingType: "sale",
    price: 89,
    stockStatus: "In Stock (500)",
    pageViews: 168,
    date: "2026-07-31 / 18:19",
    editedAgo: "2 months ago",
    status: "active",
  },
  {
    id: "33",
    title: "Animation of popular vacation spots",
    sku: "AIP2V3S4P5T6",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&q=80",
    badge: { type: "featured", text: "Featured" },
    productType: "Digital",
    category: "Product Promo",
    subCategory: "Product Promo",
    listingType: "sale",
    purchasedPlan: "Monthly Plan (210 Days)",
    price: 10,
    stockStatus: "In Stock",
    pageViews: 158,
    date: "2026-07-31 / 17:57",
    editedAgo: "2 months ago",
    status: "active",
  },
  {
    id: "32",
    title: "Modern blue handbag",
    sku: "M1B2H3B4G5N6",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200&q=80",
    productType: "Physical",
    category: "Handbags",
    subCategory: "Handbags",
    listingType: "sale",
    price: 45,
    stockStatus: "In Stock (600)",
    pageViews: 126,
    date: "2026-07-31 / 15:19",
    editedAgo: "2 months ago",
    status: "active",
  },
  {
    id: "30",
    title: "Sneaker shoes men",
    sku: "SSM2S3B4K5R6",
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=200&q=80",
    productType: "Physical",
    category: "Sneakers",
    subCategory: "Sneakers & Athletic Shoes",
    listingType: "sale",
    purchasedPlan: "Monthly Plan (180 Days)",
    price: 89,
    stockStatus: "In Stock (600)",
    pageViews: 181,
    date: "2026-07-31 / 15:02",
    editedAgo: "2 months ago",
    status: "active",
  },
  {
    id: "26",
    title: "Vastu plants for your house",
    sku: "VIP2H3S4O5U6",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=200&q=80",
    productType: "Physical",
    category: "Plants",
    subCategory: "Plants",
    listingType: "sale",
    price: 69,
    stockStatus: "Active",
    pageViews: 88,
    date: "2026-07-31 / 14:43",
    editedAgo: "2 months ago",
    status: "active",
  },
  {
    id: "24",
    title: "Motivation piano with cello and drums",
    sku: "M1P2C3D4R5S6",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&q=80",
    productType: "Digital",
    category: "Ambient",
    subCategory: "Ambient",
    listingType: "sale",
    price: 25,
    stockStatus: "In Stock",
    pageViews: 92,
    date: "2026-07-31 / 14:20",
    editedAgo: "2 months ago",
    status: "active",
  },
  {
    id: "22",
    title: "Intro animation with purple background and white triangles",
    sku: "I1A2P3B4W5T6",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=200&q=80",
    productType: "Digital",
    category: "Broadcast Packages",
    subCategory: "Broadcast Packages",
    listingType: "sale",
    price: 25,
    stockStatus: "In Stock",
    pageViews: 101,
    date: "2026-07-31 / 14:10",
    editedAgo: "2 months ago",
    status: "active",
  },
  {
    id: "19",
    title: "Fashionable black and white sneakers",
    sku: "F1B2W3S4K5R6",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=200&q=80",
    productType: "Physical",
    category: "Sneakers & Athletic Shoes",
    subCategory: "Sneakers & Athletic Shoes",
    listingType: "sale",
    price: 49,
    stockStatus: "In Stock (800)",
    pageViews: 114,
    date: "2026-07-31 / 13:15",
    editedAgo: "2 months ago",
    status: "active",
  },
  {
    id: "18",
    title: "Minimalist leather bifold wallet",
    sku: "MLB2W3S4K5R6",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=200&q=80",
    badge: { type: "discount", text: "10%" },
    productType: "Physical",
    category: "Accessories",
    subCategory: "Accessories",
    listingType: "sale",
    price: 35,
    stockStatus: "In Stock (150)",
    pageViews: 98,
    date: "2026-07-30 / 11:20",
    editedAgo: "2 months ago",
    status: "active",
  },
  {
    id: "17",
    title: "Vintage aviator sunglasses",
    sku: "VAS2W3S4K5R6",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=200&q=80",
    productType: "Physical",
    category: "Accessories",
    subCategory: "Sunglasses",
    listingType: "sale",
    purchasedPlan: "Monthly Plan (90 Days)",
    price: 55,
    stockStatus: "In Stock (200)",
    pageViews: 145,
    date: "2026-07-29 / 16:45",
    editedAgo: "2 months ago",
    status: "active",
  },
  {
    id: "16",
    title: "Handmade ceramic coffee mug",
    sku: "HCM2W3S4K5R6",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=200&q=80",
    productType: "Physical",
    category: "Plants",
    subCategory: "Home & Living",
    listingType: "sale",
    price: 22,
    stockStatus: "In Stock (75)",
    pageViews: 162,
    date: "2026-07-28 / 14:10",
    editedAgo: "2 months ago",
    status: "active",
  },
  {
    id: "15",
    title: "Oversized wool knit cardigan",
    sku: "OWK2W3S4K5R6",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=200&q=80",
    badge: { type: "featured", text: "Featured" },
    productType: "Physical",
    category: "Jackets & Coats",
    subCategory: "Sweaters",
    listingType: "sale",
    purchasedPlan: "Monthly Plan (120 Days)",
    price: 68,
    stockStatus: "In Stock (340)",
    pageViews: 215,
    date: "2026-07-27 / 18:05",
    editedAgo: "2 months ago",
    status: "active",
  },
  {
    id: "14",
    title: "3D Isometric icon pack",
    sku: "IIP2W3S4K5R6",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&q=80",
    productType: "Digital",
    category: "Vectors",
    subCategory: "Graphics",
    listingType: "sale",
    price: 19,
    stockStatus: "In Stock",
    pageViews: 275,
    date: "2026-07-26 / 10:30",
    editedAgo: "2 months ago",
    status: "active",
  },
  {
    id: "13",
    title: "Elegant rose gold wrist watch",
    sku: "ERG2W3S4K5R6",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=200&q=80",
    badge: { type: "discount", text: "20%" },
    productType: "Physical",
    category: "Accessories",
    subCategory: "Watches",
    listingType: "sale",
    purchasedPlan: "Monthly Plan (300 Days)",
    price: 120,
    stockStatus: "In Stock (95)",
    pageViews: 330,
    date: "2026-07-25 / 15:50",
    editedAgo: "2 months ago",
    status: "active",
  },
  {
    id: "12",
    title: "Organic green tea matcha powder",
    sku: "OGT2W3S4K5R6",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=200&q=80",
    productType: "Physical",
    category: "Plants",
    subCategory: "Groceries",
    listingType: "sale",
    price: 18,
    stockStatus: "In Stock (420)",
    pageViews: 188,
    date: "2026-07-24 / 09:15",
    editedAgo: "2 months ago",
    status: "active",
  },
  {
    id: "11",
    title: "Chillhop lofi music beats",
    sku: "CLM2W3S4K5R6",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&q=80",
    productType: "Digital",
    category: "Ambient",
    subCategory: "Audio",
    listingType: "sale",
    price: 15,
    stockStatus: "In Stock",
    pageViews: 205,
    date: "2026-07-23 / 17:40",
    editedAgo: "2 months ago",
    status: "active",
  },
  {
    id: "10",
    title: "Canvas travel duffle bag",
    sku: "CTD2W3S4K5R6",
    image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=200&q=80",
    productType: "Physical",
    category: "Handbags",
    subCategory: "Bags",
    listingType: "sale",
    price: 58,
    stockStatus: "In Stock (180)",
    pageViews: 140,
    date: "2026-07-22 / 12:25",
    editedAgo: "2 months ago",
    status: "active",
  },
  {
    id: "9",
    title: "Premium mobile app UI kit",
    sku: "PMA2W3S4K5R6",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=200&q=80",
    badge: { type: "featured", text: "Featured" },
    productType: "Digital",
    category: "Product Promo",
    subCategory: "UI Templates",
    listingType: "sale",
    purchasedPlan: "Monthly Plan (150 Days)",
    price: 39,
    stockStatus: "In Stock",
    pageViews: 412,
    date: "2026-07-21 / 20:10",
    editedAgo: "2 months ago",
    status: "active",
  },
];

// Exactly 21 draft products matching the Modesy reference screenshots
const all21DraftProducts: ProductItem[] = [
  {
    id: "101",
    title: "Men's Streetwear Shoes - Urban Style & Comfort",
    sku: "",
    image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=200&q=80",
    productType: "Physical",
    category: "Shoes",
    price: 0,
    stockStatus: "In Stock (1)",
    pageViews: 0,
    date: "2026-10-12 / 15:45",
    editedAgo: "Yesterday",
    status: "draft",
  },
  {
    id: "99",
    title: "",
    sku: "",
    image: "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=200&q=80",
    productType: "Physical",
    category: "Clothing",
    price: 0,
    stockStatus: "In Stock (1)",
    pageViews: 0,
    date: "2026-10-12 / 14:50",
    editedAgo: "Yesterday",
    status: "draft",
  },
  {
    id: "97",
    title: "Try",
    sku: "",
    image: "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=200&q=80",
    productType: "Digital",
    category: "",
    price: 0,
    stockStatus: "In Stock",
    pageViews: 0,
    date: "2026-10-11 / 17:20",
    editedAgo: "2 days ago",
    status: "draft",
  },
  {
    id: "93",
    title: "Memperingati G30S/PKI",
    sku: "",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=200&q=80",
    productType: "Physical",
    category: "Graphics & Photos",
    price: 0,
    stockStatus: "In Stock (1)",
    pageViews: 0,
    date: "2026-10-05 / 15:42",
    editedAgo: "1 week ago",
    status: "draft",
  },
  {
    id: "91",
    title: "try",
    sku: "",
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=200&q=80",
    productType: "Physical",
    category: "Graphics & Photos",
    price: 0,
    stockStatus: "In Stock (1)",
    pageViews: 0,
    date: "2026-09-28 / 16:23",
    editedAgo: "2 weeks ago",
    status: "draft",
  },
  {
    id: "88",
    title: "Home Decor Essentials: Elevate Your Living Space",
    sku: "",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=200&q=80",
    productType: "Physical",
    category: "Home & Living",
    price: 0,
    stockStatus: "In Stock (1)",
    pageViews: 0,
    date: "2026-09-27 / 19:01",
    editedAgo: "2 weeks ago",
    status: "draft",
  },
  {
    id: "83",
    title: "trendshop@codingest.net",
    sku: "",
    image: "",
    productType: "Digital",
    category: "Web Templates & Code",
    price: 0,
    stockStatus: "In Stock",
    pageViews: 0,
    date: "2026-09-22 / 09:21",
    editedAgo: "3 weeks ago",
    status: "draft",
  },
  {
    id: "81",
    title: "sendal",
    sku: "",
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=200&q=80",
    productType: "Physical",
    category: "Jewelry & Accessories",
    price: 0,
    stockStatus: "In Stock (1)",
    pageViews: 0,
    date: "2026-09-18 / 09:44",
    editedAgo: "3 weeks ago",
    status: "draft",
  },
  {
    id: "80",
    title: "sendal",
    sku: "",
    image: "",
    productType: "Physical",
    category: "",
    price: 0,
    stockStatus: "Active",
    pageViews: 0,
    date: "2026-09-18 / 09:42",
    editedAgo: "3 weeks ago",
    status: "draft",
  },
  {
    id: "79",
    title: "sendal",
    sku: "",
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=200&q=80",
    productType: "Physical",
    category: "",
    price: 0,
    stockStatus: "Active",
    pageViews: 0,
    date: "2026-09-18 / 09:38",
    editedAgo: "3 weeks ago",
    status: "draft",
  },
  {
    id: "78",
    title: "topi",
    sku: "",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=200&q=80",
    productType: "Physical",
    category: "Jewelry & Accessories",
    price: 0,
    stockStatus: "In Stock (1)",
    pageViews: 0,
    date: "2026-09-18 / 09:15",
    editedAgo: "3 weeks ago",
    status: "draft",
  },
  {
    id: "77",
    title: "frdf",
    sku: "",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
    productType: "Physical",
    category: "Home & Living",
    price: 0,
    stockStatus: "In Stock (1)",
    pageViews: 0,
    date: "2026-09-17 / 18:08",
    editedAgo: "3 weeks ago",
    status: "draft",
  },
  {
    id: "75",
    title: "Sepatu Puma",
    sku: "",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80",
    productType: "Physical",
    category: "Shoes",
    price: 0,
    stockStatus: "In Stock (1)",
    pageViews: 0,
    date: "2026-09-16 / 16:22",
    editedAgo: "4 weeks ago",
    status: "draft",
  },
  {
    id: "73",
    title: "As",
    sku: "",
    image: "https://images.unsplash.com/photo-1590736969955-71cc94801759?w=200&q=80",
    productType: "Physical",
    category: "Home & Living",
    price: 0,
    stockStatus: "In Stock (1)",
    pageViews: 0,
    date: "2026-09-15 / 10:58",
    editedAgo: "4 weeks ago",
    status: "draft",
  },
  {
    id: "71",
    title: "Unique Handmade Items Crafted from Recycled Newspapers",
    sku: "",
    image: "https://images.unsplash.com/photo-1590736969955-71cc94801759?w=200&q=80",
    productType: "Physical",
    category: "Home & Living",
    price: 0,
    stockStatus: "In Stock (1)",
    pageViews: 0,
    date: "2026-09-14 / 17:48",
    editedAgo: "4 weeks ago",
    status: "draft",
  },
  {
    id: "70",
    title: "Vintage Leather Messenger Bag",
    sku: "",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&q=80",
    productType: "Physical",
    category: "Home & Living",
    price: 0,
    stockStatus: "In Stock (1)",
    pageViews: 0,
    date: "2026-09-12 / 11:20",
    editedAgo: "1 month ago",
    status: "draft",
  },
  {
    id: "69",
    title: "Abstract Digital Wallpaper Collection",
    sku: "",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=200&q=80",
    productType: "Digital",
    category: "Graphics & Photos",
    price: 0,
    stockStatus: "In Stock",
    pageViews: 0,
    date: "2026-09-10 / 14:15",
    editedAgo: "1 month ago",
    status: "draft",
  },
  {
    id: "67",
    title: "Handmade Ceramic Coffee Mug",
    sku: "",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=200&q=80",
    productType: "Physical",
    category: "Home & Living",
    price: 0,
    stockStatus: "In Stock (1)",
    pageViews: 0,
    date: "2026-09-08 / 16:30",
    editedAgo: "1 month ago",
    status: "draft",
  },
  {
    id: "64",
    title: "Classic Minimalist Analog Watch",
    sku: "",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80",
    productType: "Physical",
    category: "Jewelry & Accessories",
    price: 0,
    stockStatus: "In Stock (1)",
    pageViews: 0,
    date: "2026-09-05 / 10:05",
    editedAgo: "1 month ago",
    status: "draft",
  },
  {
    id: "62",
    title: "Cozy Knit Winter Scarf",
    sku: "",
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=200&q=80",
    productType: "Physical",
    category: "Clothing",
    price: 0,
    stockStatus: "In Stock (1)",
    pageViews: 0,
    date: "2026-09-02 / 13:40",
    editedAgo: "1 month ago",
    status: "draft",
  },
  {
    id: "59",
    title: "Modern UI Kit for Figma",
    sku: "",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=200&q=80",
    productType: "Digital",
    category: "Web Templates & Code",
    price: 0,
    stockStatus: "In Stock",
    pageViews: 0,
    date: "2026-08-30 / 09:12",
    editedAgo: "1 month ago",
    status: "draft",
  },
];

const initialAllProducts: ProductItem[] = [...all24Products, ...all21DraftProducts];

interface ProductsPageProps {
  statusFilter?: "all" | "active" | "pending" | "hidden" | "sold" | "draft" | string;
  pageTitle?: string;
}

function ProductsPageContent({
  statusFilter = "all",
  pageTitle = "Products",
}: ProductsPageProps) {
  const searchParams = useSearchParams();
  const stParam = searchParams?.get("st") || "";
  const effectiveStatus = statusFilter !== "all" ? statusFilter : stParam;

  let computedTitle = pageTitle;
  if (pageTitle === "Products") {
    if (effectiveStatus === "pending") computedTitle = "Pending Products";
    else if (effectiveStatus === "hidden") computedTitle = "Hidden Products";
    else if (effectiveStatus === "sold") computedTitle = "Sold Products";
    else if (effectiveStatus === "drafts" || effectiveStatus === "draft") computedTitle = "Drafts";
  }

  const [products, setProducts] = useState<ProductItem[]>(initialAllProducts);

  // Filter Form State
  const [listingType, setListingType] = useState("All");
  const [productType, setProductType] = useState("All");
  const [category, setCategory] = useState("All");
  const [subCategory, setSubCategory] = useState("All");
  const [stock, setStock] = useState("All");
  const [search, setSearch] = useState("");

  // Applied Filter State
  const [appliedFilters, setAppliedFilters] = useState({
    listingType: "All",
    productType: "All",
    category: "All",
    subCategory: "All",
    stock: "All",
    search: "",
  });

  // Export dropdown state
  const [exportOpen, setExportOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleDuplicate = (id: string) => {
    const item = products.find((p) => p.id === id);
    if (!item) return;
    const newItem: ProductItem = {
      ...item,
      id: String(Number(item.id) + 100),
      title: `${item.title} (Copy)`,
      sku: `${item.sku}-COPY`,
      date: "2026-10-13 / 09:30",
      editedAgo: "Just now",
    };
    setProducts((prev) => [newItem, ...prev]);
  };

  const handleApplyFilter = () => {
    setAppliedFilters({
      listingType,
      productType,
      category,
      subCategory,
      stock,
      search,
    });
    setCurrentPage(1);
  };

  // Filtered dataset
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // 1. Status Filter from props or query param
      if (effectiveStatus && effectiveStatus !== "all") {
        if (effectiveStatus === "drafts" || effectiveStatus === "draft") {
          if (item.status !== "draft") return false;
        } else {
          if (item.status !== effectiveStatus) return false;
        }
      } else {
        if (item.status !== "active") return false;
      }

      // 2. Listing Type
      if (appliedFilters.listingType !== "All") {
        if (item.listingType && item.listingType !== appliedFilters.listingType) return false;
      }

      // 3. Product Type
      if (appliedFilters.productType !== "All") {
        if (item.productType !== appliedFilters.productType) return false;
      }

      // 4. Category
      if (appliedFilters.category !== "All") {
        if (!item.category.toLowerCase().includes(appliedFilters.category.toLowerCase())) return false;
      }

      // 5. Subcategory
      if (appliedFilters.subCategory !== "All") {
        const itemSub = item.subCategory || item.category;
        if (!itemSub.toLowerCase().includes(appliedFilters.subCategory.toLowerCase())) return false;
      }

      // 6. Stock
      if (appliedFilters.stock !== "All") {
        if (appliedFilters.stock === "in_stock" && !item.stockStatus.toLowerCase().includes("in stock") && item.stockStatus !== "Active") {
          return false;
        }
        if (appliedFilters.stock === "out_of_stock" && (item.stockStatus.toLowerCase().includes("in stock") || item.stockStatus === "Active")) {
          return false;
        }
      }

      // 7. Search keyword
      const keyword = appliedFilters.search.trim().toLowerCase();
      if (keyword) {
        const matchTitle = item.title.toLowerCase().includes(keyword);
        const matchSku = item.sku.toLowerCase().includes(keyword);
        const matchCategory = item.category.toLowerCase().includes(keyword);
        if (!matchTitle && !matchSku && !matchCategory) return false;
      }

      return true;
    });
  }, [products, effectiveStatus, statusFilter, appliedFilters]);

  // Pagination calculation
  const totalEntries = filteredProducts.length;
  const totalPages = Math.ceil(totalEntries / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  // Export functions
  const handleExportCSV = () => {
    setExportOpen(false);
    const headers = "Id,Product,SKU,Product Type,Category,Price,Stock/Status,Page Views,Date\n";
    const rows = filteredProducts.map((p) => 
      `"${p.id}","${p.title.replace(/"/g, '""')}","${p.sku}","${p.productType}","${p.category}","$${p.price}","${p.stockStatus}","${p.pageViews}","${p.date}"`
    ).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "modesy_products_export.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleExportXML = () => {
    setExportOpen(false);
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<products>\n';
    filteredProducts.forEach((p) => {
      xml += `  <product>\n    <id>${p.id}</id>\n    <title>${p.title}</title>\n    <sku>${p.sku}</sku>\n    <type>${p.productType}</type>\n    <category>${p.category}</category>\n    <price>${p.price}</price>\n    <stock>${p.stockStatus}</stock>\n    <views>${p.pageViews}</views>\n    <date>${p.date}</date>\n  </product>\n`;
    });
    xml += '</products>';
    const blob = new Blob([xml], { type: "application/xml;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "modesy_products_export.xml";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleExportExcel = () => {
    setExportOpen(false);
    // CSV with excel-friendly format
    handleExportCSV();
  };

  return (
    <div className="w-full max-w-[1300px] mx-auto py-2">
      {/* Main White Card Container */}
      <div className="bg-white border border-[#e2e8f0] rounded-[3px] p-6 sm:p-7 shadow-2xs">
        {/* Title */}
        <h1 className="text-[17px] font-bold text-[#2c333e] mb-5 font-sans">
          {computedTitle}
        </h1>

        {/* Filter Bar - Matching Reference Screenshot */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 items-end mb-6">
          {/* 1. Listing Type */}
          <div>
            <label className="block text-[13px] font-bold text-[#2c333e] mb-1.5 font-sans">
              Listing Type
            </label>
            <div className="relative">
              <select
                value={listingType}
                onChange={(e) => setListingType(e.target.value)}
                className="w-full h-[34px] border border-[#d1d5db] rounded-[3px] pl-3 pr-7 text-[13px] text-[#495057] bg-white appearance-none outline-none focus:border-[#00ab97]"
              >
                <option value="All">All</option>
                <option value="sale">Add a Product for Sale</option>
                <option value="ordinary">Ordinary Listing</option>
                <option value="quote">Quote Requests</option>
                <option value="license">License Keys</option>
              </select>
              <span className="absolute right-2.5 top-2 pointer-events-none text-[11px] text-[#495057]">
                ▾
              </span>
            </div>
          </div>

          {/* 2. Product Type */}
          <div>
            <label className="block text-[13px] font-bold text-[#2c333e] mb-1.5 font-sans">
              Product Type
            </label>
            <div className="relative">
              <select
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                className="w-full h-[34px] border border-[#d1d5db] rounded-[3px] pl-3 pr-7 text-[13px] text-[#495057] bg-white appearance-none outline-none focus:border-[#00ab97]"
              >
                <option value="All">All</option>
                <option value="Physical">Physical</option>
                <option value="Digital">Digital</option>
              </select>
              <span className="absolute right-2.5 top-2 pointer-events-none text-[11px] text-[#495057]">
                ▾
              </span>
            </div>
          </div>

          {/* 3. Category */}
          <div>
            <label className="block text-[13px] font-bold text-[#2c333e] mb-1.5 font-sans">
              Category
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-[34px] border border-[#d1d5db] rounded-[3px] pl-3 pr-7 text-[13px] text-[#495057] bg-white appearance-none outline-none focus:border-[#00ab97]"
              >
                <option value="All">All</option>
                <option value="Scarfs">Scarfs</option>
                <option value="Dresses">Dresses</option>
                <option value="Backpacks">Backpacks</option>
                <option value="Skirts">Skirts</option>
                <option value="Vectors">Vectors</option>
                <option value="Boots">Boots</option>
                <option value="Jackets & Coats">Jackets &amp; Coats</option>
                <option value="Product Promo">Product Promo</option>
                <option value="Handbags">Handbags</option>
                <option value="Plants">Plants</option>
                <option value="Ambient">Ambient</option>
                <option value="Broadcast Packages">Broadcast Packages</option>
                <option value="Sneakers & Athletic Shoes">Sneakers &amp; Athletic Shoes</option>
                <option value="Accessories">Accessories</option>
              </select>
              <span className="absolute right-2.5 top-2 pointer-events-none text-[11px] text-[#495057]">
                ▾
              </span>
            </div>
          </div>

          {/* 4. Subcategory */}
          <div>
            <label className="block text-[13px] font-bold text-[#2c333e] mb-1.5 font-sans">
              Subcategory
            </label>
            <div className="relative">
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full h-[34px] border border-[#d1d5db] rounded-[3px] pl-3 pr-7 text-[13px] text-[#495057] bg-white appearance-none outline-none focus:border-[#00ab97]"
              >
                <option value="All">All</option>
                <option value="Scarfs">Scarfs</option>
                <option value="Dresses">Dresses</option>
                <option value="Backpacks">Backpacks</option>
                <option value="Skirts">Skirts</option>
                <option value="Vectors">Vectors</option>
                <option value="Boots">Boots</option>
                <option value="Jackets & Coats">Jackets &amp; Coats</option>
                <option value="Product Promo">Product Promo</option>
                <option value="Handbags">Handbags</option>
                <option value="Plants">Plants</option>
                <option value="Ambient">Ambient</option>
                <option value="Broadcast Packages">Broadcast Packages</option>
                <option value="Sneakers & Athletic Shoes">Sneakers &amp; Athletic Shoes</option>
                <option value="Accessories">Accessories</option>
              </select>
              <span className="absolute right-2.5 top-2 pointer-events-none text-[11px] text-[#495057]">
                ▾
              </span>
            </div>
          </div>

          {/* 5. Stock */}
          <div>
            <label className="block text-[13px] font-bold text-[#2c333e] mb-1.5 font-sans">
              Stock
            </label>
            <div className="relative">
              <select
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full h-[34px] border border-[#d1d5db] rounded-[3px] pl-3 pr-7 text-[13px] text-[#495057] bg-white appearance-none outline-none focus:border-[#00ab97]"
              >
                <option value="All">All</option>
                <option value="in_stock">In Stock</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
              <span className="absolute right-2.5 top-2 pointer-events-none text-[11px] text-[#495057]">
                ▾
              </span>
            </div>
          </div>

          {/* 6. Search */}
          <div>
            <label className="block text-[13px] font-bold text-[#2c333e] mb-1.5 font-sans">
              Search
            </label>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleApplyFilter();
              }}
              className="w-full h-[34px] border border-[#d1d5db] rounded-[3px] px-3 text-[13px] text-[#495057] outline-none focus:border-[#00ab97]"
            />
          </div>

          {/* 7. Filter Button */}
          <div>
            <button
              type="button"
              onClick={handleApplyFilter}
              className="w-full h-[34px] bg-[#5c59a0] hover:bg-[#4f4c93] text-white rounded-[3px] text-[13px] font-medium transition-colors cursor-pointer flex items-center justify-center shadow-2xs"
            >
              Filter
            </button>
          </div>

          {/* 8. Export Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setExportOpen(!exportOpen)}
              className="w-full h-[34px] bg-[#dfe3ea] hover:bg-[#d0d6e0] text-[#495057] rounded-[3px] text-[13px] font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer select-none"
            >
              <span>Export</span>
              <span className="text-[11px] text-[#495057] leading-none">▾</span>
            </button>

            {/* Backdrop to close on click outside */}
            {exportOpen && (
              <div
                className="fixed inset-0 z-20"
                onClick={() => setExportOpen(false)}
              />
            )}

            {/* Exact Export Dropdown Menu Matching Screenshot */}
            {exportOpen && (
              <div className="absolute right-0 top-[38px] w-[145px] bg-white border border-[#eef0f3] shadow-md rounded-[3px] py-1.5 text-[13px] z-30 animate-in fade-in select-none">
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="w-full text-left px-4 py-1.5 text-[#495057] hover:text-[#00ab97] hover:bg-[#f8fafc] cursor-pointer transition-colors"
                >
                  CSV
                </button>
                <button
                  type="button"
                  onClick={handleExportXML}
                  className="w-full text-left px-4 py-1.5 text-[#495057] hover:text-[#00ab97] hover:bg-[#f8fafc] cursor-pointer transition-colors"
                >
                  XML
                </button>
                <button
                  type="button"
                  onClick={handleExportExcel}
                  className="w-full text-left px-4 py-1.5 text-[#495057] hover:text-[#00ab97] hover:bg-[#f8fafc] cursor-pointer transition-colors"
                >
                  Excel (.xlsx)
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Products Table */}
        <div className="overflow-x-auto border-t border-[#eef0f3]">
          <table className="w-full text-left text-[13px] border-collapse">
            <thead>
              <tr className="border-b border-[#e2e8f0] text-[12px] font-semibold text-[#8c98a4] select-none">
                <th className="py-3 px-3 w-10 text-center font-semibold">Id</th>
                <th className="py-3 px-3 font-semibold">Product</th>
                <th className="py-3 px-3 font-semibold">Product Type</th>
                <th className="py-3 px-3 font-semibold">Category</th>
                <th className="py-3 px-3 font-semibold">Purchased Plan</th>
                <th className="py-3 px-3 font-semibold">Price</th>
                <th className="py-3 px-3 font-semibold">Stock/Status</th>
                <th className="py-3 px-3 font-semibold">Page Views</th>
                <th className="py-3 px-3 font-semibold">Date</th>
                <th className="py-3 px-3 font-semibold text-center">Options</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f3f5]">
              {paginatedProducts.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-[#6c757d] text-[13.5px]">
                    No records found!
                  </td>
                </tr>
              ) : (
                paginatedProducts.map((item) => (
                  <tr key={item.id} className="hover:bg-[#fafbfc] transition-colors">
                    {/* Id */}
                    <td className="py-3.5 px-3 text-center text-[#495057] font-sans">
                      {item.id}
                    </td>

                    {/* Product */}
                    <td className="py-3.5 px-3 min-w-[240px]">
                      <div className="flex items-start gap-3">
                        {item.image ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={item.image}
                            alt={item.title || "Product image"}
                            className="w-[52px] h-[52px] rounded-[2px] object-cover border border-[#e2e8f0] shrink-0"
                          />
                        ) : (
                          <div className="w-[52px] h-[52px] rounded-[2px] bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-center shrink-0">
                            <ImageIcon className="w-5 h-5 text-[#ccd1d9]" />
                          </div>
                        )}
                        <div className="flex flex-col">
                          {item.title ? (
                            <Link
                              href={`/product/${(item.sku || item.id).toLowerCase()}`}
                              className="text-[13px] text-[#2c333e] hover:text-[#00ab97] font-medium leading-tight mb-1"
                            >
                              {item.title}
                            </Link>
                          ) : (
                            <div className="h-4" />
                          )}
                          {item.sku ? (
                            <span className="text-[11px] text-[#8c98a4] leading-none mb-1">
                              SKU: {item.sku}
                            </span>
                          ) : null}

                          {/* Badges */}
                          {item.badge && item.badge.type === "discount" && (
                            <div className="bg-[#e67e22] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-[2px] flex items-center gap-1 w-fit leading-none">
                              <Tag className="w-2.5 h-2.5" />
                              <span>{item.badge.text}</span>
                            </div>
                          )}
                          {item.badge && item.badge.type === "featured" && (
                            <div className="bg-[#00ab97] text-white text-[10px] font-medium px-2 py-0.5 rounded-[2px] w-fit leading-none">
                              Featured
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Product Type */}
                    <td className="py-3.5 px-3 text-[#495057] text-[13px]">
                      {item.productType}
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-3 text-[#495057] text-[13px]">
                      {item.category}
                    </td>

                    {/* Purchased Plan */}
                    <td className="py-3.5 px-3 min-w-[130px]">
                      {item.purchasedPlan ? (
                        <span className="text-[12px] text-[#495057]">
                          {item.purchasedPlan}
                        </span>
                      ) : (effectiveStatus === "draft" || effectiveStatus === "drafts" || item.status === "draft") ? null : (
                        <button
                          type="button"
                          className="bg-[#00ab97] hover:bg-[#009180] text-white text-[11.5px] font-medium px-2.5 py-1 rounded-[3px] shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          + Promote
                        </button>
                      )}
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-3 text-[#495057] font-medium text-[13px]">
                      {(effectiveStatus === "draft" || effectiveStatus === "drafts" || item.status === "draft")
                        ? item.price.toFixed(2)
                        : `$${item.price}`}
                    </td>

                    {/* Stock/Status */}
                    <td className="py-3.5 px-3 text-[#00ab97] font-medium text-[12.5px] whitespace-nowrap">
                      {item.stockStatus}
                    </td>

                    {/* Page Views */}
                    <td className="py-3.5 px-3 text-[#495057] text-[12.5px]">
                      {item.pageViews}
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-3 min-w-[120px]">
                      <div className="text-[11.5px] text-[#495057] leading-tight">
                        {item.date}
                      </div>
                      {!(effectiveStatus === "draft" || effectiveStatus === "drafts" || item.status === "draft") && item.editedAgo && (
                        <div className="text-[11px] text-[#8c98a4] leading-tight mt-0.5">
                          Edited: {item.editedAgo}
                        </div>
                      )}
                    </td>

                    {/* Options */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center justify-center gap-1">
                        {/* Edit */}
                        <Link
                          href={`/dashboard/products/edit/${item.id}`}
                          className="p-1.5 bg-[#f8fafc] hover:bg-[#e9ecef] border border-[#d1d5db] rounded-[3px] text-[#495057] hover:text-[#2c333e] transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Link>

                        {/* Duplicate */}
                        <button
                          type="button"
                          onClick={() => handleDuplicate(item.id)}
                          className="p-1.5 bg-[#f8fafc] hover:bg-[#e9ecef] border border-[#d1d5db] rounded-[3px] text-[#495057] hover:text-[#2c333e] transition-colors cursor-pointer"
                          title="Duplicate"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 bg-[#f8fafc] hover:bg-red-50 border border-[#d1d5db] rounded-[3px] text-[#495057] hover:text-red-600 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer: Entries Count & Pagination (only visible when entries exist) */}
        {totalEntries > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 mt-2 border-t border-[#f1f3f5] text-[#495057] select-none">
            <span className="text-[12.5px] font-medium">
              Number of Entries: {totalEntries}
            </span>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setCurrentPage(1)}
                className={`w-7 h-7 flex items-center justify-center rounded-[3px] text-xs font-bold transition-colors cursor-pointer ${
                  currentPage === 1
                    ? "bg-[#00ab97] text-white"
                    : "border border-[#d1d5db] hover:bg-gray-50 text-[#495057]"
                }`}
              >
                1
              </button>
              {totalPages >= 2 && (
                <button
                  type="button"
                  onClick={() => setCurrentPage(2)}
                  className={`w-7 h-7 flex items-center justify-center rounded-[3px] text-xs transition-colors cursor-pointer ${
                    currentPage === 2
                      ? "bg-[#00ab97] text-white font-bold"
                      : "border border-[#d1d5db] hover:bg-gray-50 text-[#495057]"
                  }`}
                >
                  2
                </button>
              )}
              {totalPages > 2 && (
                <button
                  type="button"
                  onClick={() => setCurrentPage(3)}
                  className={`w-7 h-7 flex items-center justify-center rounded-[3px] text-xs transition-colors cursor-pointer ${
                    currentPage === 3
                      ? "bg-[#00ab97] text-white font-bold"
                      : "border border-[#d1d5db] hover:bg-gray-50 text-[#495057]"
                  }`}
                >
                  3
                </button>
              )}
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage >= totalPages}
                className={`w-7 h-7 flex items-center justify-center rounded-[3px] border border-[#d1d5db] text-[#495057] text-xs transition-colors ${
                  currentPage >= totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50 cursor-pointer"
                }`}
              >
                &gt;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProductsPageWrapper(props: ProductsPageProps) {
  const searchParams = useSearchParams();
  const stParam = searchParams?.get("st") || "";
  const componentKey = `${props.statusFilter || "all"}_${stParam}`;

  return <ProductsPageContent key={componentKey} {...props} />;
}

export default function ProductsPage(props: ProductsPageProps) {
  return (
    <Suspense fallback={<div className="p-6 text-gray-400">Loading...</div>}>
      <ProductsPageWrapper {...props} />
    </Suspense>
  );
}
