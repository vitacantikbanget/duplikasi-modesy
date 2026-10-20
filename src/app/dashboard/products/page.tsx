"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ChevronDown,
  Edit2,
  Copy,
  Trash2,
  Tag,
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
  editedAgo?: string;
  status: "active" | "pending" | "hidden" | "sold" | "draft";
}

// Exactly 23 active products matching the Modesy reference screenshots
const all23ActiveProducts: ProductItem[] = [
  {
    id: "46",
    title: "Women's ankle boot with different colors",
    sku: "W1A2B3D4C5R6",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200&q=80",
    productType: "Physical",
    category: "Boots",
    subCategory: "Boots",
    listingType: "sale",
    price: 59,
    stockStatus: "In Stock (500)",
    pageViews: 170,
    date: "2026-07-31 / 19:33",
    editedAgo: "3 months ago",
    status: "active",
  },
  {
    id: "44",
    title: "Modern grey couch and pillows",
    sku: "M1G2C3P4S5L6",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&q=80",
    productType: "Physical",
    category: "Living Room Furniture",
    subCategory: "Furniture",
    listingType: "sale",
    price: 299,
    stockStatus: "Active",
    pageViews: 225,
    date: "2026-07-31 / 19:23",
    editedAgo: "3 months ago",
    status: "active",
  },
  {
    id: "42",
    title: "Handcrafted decorative pillow for a luxurious touch",
    sku: "H1D2P3L4T5X6",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=200&q=80",
    badge: { type: "discount", text: "-10%" },
    productType: "Physical",
    category: "Decorative Pillows",
    subCategory: "Pillows",
    listingType: "sale",
    purchasedPlan: "Monthly Plan (270 Days)",
    price: 59,
    stockStatus: "In Stock (492)",
    pageViews: 280,
    date: "2026-07-31 / 19:16",
    editedAgo: "3 months ago",
    status: "active",
  },
  {
    id: "40",
    title: "Women kipling bailey saddle handbag",
    sku: "W1K2B3S4H5G6",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&q=80",
    badge: { type: "featured", text: "Featured" },
    productType: "Physical",
    category: "Handbags",
    subCategory: "Handbags",
    listingType: "sale",
    purchasedPlan: "Monthly Plan (270 Days)",
    price: 59,
    stockStatus: "In Stock (500)",
    pageViews: 245,
    date: "2026-07-31 / 18:57",
    editedAgo: "3 months ago",
    status: "active",
  },
  {
    id: "38",
    title: "Floral women sundress",
    sku: "F1W2S3D4R5S6",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=200&q=80",
    badge: { type: "discount", text: "-15%" },
    productType: "Physical",
    category: "Dresses",
    subCategory: "Dresses",
    listingType: "sale",
    purchasedPlan: "Monthly Plan (270 Days)",
    price: 80,
    stockStatus: "In Stock (1000)",
    pageViews: 468,
    date: "2026-07-31 / 18:29",
    editedAgo: "3 months ago",
    status: "active",
  },
  {
    id: "36",
    title: "Ship illustration royalty free image",
    sku: "S1I2R3F4I5M6",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200&q=80",
    productType: "Digital",
    category: "Vectors",
    subCategory: "Vectors",
    listingType: "sale",
    price: 15,
    stockStatus: "In Stock",
    pageViews: 169,
    date: "2026-07-31 / 18:21",
    editedAgo: "3 months ago",
    status: "active",
  },
  {
    id: "34",
    title: "Men's lace formal casual fashion shoe",
    sku: "M1L2F3C4F5S6",
    image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=200&q=80",
    productType: "Physical",
    category: "Boots",
    subCategory: "Boots",
    listingType: "sale",
    price: 59,
    stockStatus: "Active",
    pageViews: 120,
    date: "2026-07-31 / 18:07",
    editedAgo: "3 months ago",
    status: "active",
  },
  {
    id: "31",
    title: "Car Race Pro License Keys",
    sku: "C1R2P3L4K5Y6",
    image: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=200&q=80",
    productType: "Digital",
    category: "Video Games",
    subCategory: "Video Games",
    listingType: "license",
    price: 19,
    stockStatus: "In Stock",
    pageViews: 167,
    date: "2026-07-31 / 15:14",
    editedAgo: "3 months ago",
    status: "active",
  },
  {
    id: "29",
    title: "Futuristic landscape animation",
    sku: "HSTY252A2",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=200&q=80",
    productType: "Digital",
    category: "Video Overlays & Elements",
    subCategory: "Animation",
    listingType: "sale",
    price: 18,
    stockStatus: "In Stock",
    pageViews: 108,
    date: "2026-07-31 / 14:59",
    editedAgo: "3 months ago",
    status: "active",
  },
  {
    id: "27",
    title: "Men's sport shoe",
    sku: "M1S2S3H4O5E6",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=200&q=80",
    badge: { type: "discount", text: "-20%" },
    productType: "Physical",
    category: "Sneakers",
    subCategory: "Sneakers",
    listingType: "sale",
    price: 45,
    stockStatus: "In Stock (500)",
    pageViews: 123,
    date: "2026-07-31 / 14:45",
    editedAgo: "3 months ago",
    status: "active",
  },
  {
    id: "25",
    title: "Adidas daily shoes",
    sku: "A1D2D3S4H5O6",
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=200&q=80",
    productType: "Physical",
    category: "Sneakers",
    subCategory: "Sneakers",
    listingType: "sale",
    price: 59,
    stockStatus: "Active",
    pageViews: 96,
    date: "2026-07-31 / 14:25",
    editedAgo: "3 months ago",
    status: "active",
  },
  {
    id: "23",
    title: "Adorable animals photo pack",
    sku: "A1A2P3P4K5L6",
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=200&q=80",
    badge: { type: "featured", text: "Featured" },
    productType: "Digital",
    category: "Animals",
    subCategory: "Photography",
    listingType: "sale",
    purchasedPlan: "Daily Plan (400 Days)",
    price: 0,
    stockStatus: "In Stock",
    pageViews: 231,
    date: "2026-07-31 / 14:12",
    editedAgo: "3 months ago",
    status: "active",
  },
  {
    id: "21",
    title: "Women casual dress",
    sku: "W1C2D3R4S5N6",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=200&q=80",
    badge: { type: "featured", text: "Featured" },
    productType: "Physical",
    category: "Dresses",
    subCategory: "Dresses",
    listingType: "sale",
    purchasedPlan: "Monthly Plan (180 Days)",
    price: 56,
    stockStatus: "Active",
    pageViews: 215,
    date: "2026-07-31 / 14:06",
    editedAgo: "3 months ago",
    status: "active",
  },
  {
    id: "20",
    title: "Moment of inspiration piano music",
    sku: "M1I2P3M4S5C6",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&q=80",
    badge: { type: "featured", text: "Featured" },
    productType: "Digital",
    category: "Cinematic Music",
    subCategory: "Audio",
    listingType: "sale",
    purchasedPlan: "Monthly Plan (240 Days)",
    price: 15,
    stockStatus: "In Stock",
    pageViews: 192,
    date: "2026-07-31 / 13:18",
    editedAgo: "3 months ago",
    status: "active",
  },
  {
    id: "18",
    title: "Women vintage collage art design",
    sku: "W1V2C3A4D5N6",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=200&q=80",
    productType: "Digital",
    category: "Vectors",
    subCategory: "Vectors",
    listingType: "sale",
    price: 15,
    stockStatus: "In Stock",
    pageViews: 124,
    date: "2026-07-31 / 13:04",
    editedAgo: "3 months ago",
    status: "active",
  },
  {
    id: "16",
    title: "Ceramic decorative vase set",
    sku: "C1D2V3A4S5E6",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=200&q=80",
    productType: "Physical",
    category: "Home Decor",
    subCategory: "Living",
    listingType: "sale",
    price: 35,
    stockStatus: "In Stock (200)",
    pageViews: 145,
    date: "2026-07-31 / 12:45",
    editedAgo: "3 months ago",
    status: "active",
  },
  {
    id: "15",
    title: "Leather vintage travel backpack",
    sku: "L1V2T3B4P5K6",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&q=80",
    productType: "Physical",
    category: "Bags",
    subCategory: "Backpacks",
    listingType: "sale",
    price: 89,
    stockStatus: "In Stock (150)",
    pageViews: 162,
    date: "2026-07-31 / 12:30",
    editedAgo: "3 months ago",
    status: "active",
  },
  {
    id: "14",
    title: "Summer botanical print shirt",
    sku: "S1B2P3S4H5T6",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=200&q=80",
    productType: "Physical",
    category: "Men's Shirts",
    subCategory: "Shirts",
    listingType: "sale",
    price: 42,
    stockStatus: "Active",
    pageViews: 110,
    date: "2026-07-31 / 12:15",
    editedAgo: "3 months ago",
    status: "active",
  },
  {
    id: "12",
    title: "Minimalist gold necklace",
    sku: "M1G2N3E4C5K6",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200&q=80",
    badge: { type: "featured", text: "Featured" },
    productType: "Physical",
    category: "Jewelry",
    subCategory: "Necklaces",
    listingType: "sale",
    purchasedPlan: "Monthly Plan (90 Days)",
    price: 65,
    stockStatus: "In Stock (300)",
    pageViews: 275,
    date: "2026-07-31 / 11:50",
    editedAgo: "3 months ago",
    status: "active",
  },
  {
    id: "10",
    title: "Urban streetwear hoodie",
    sku: "U1S2H3O4O5D6",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=200&q=80",
    productType: "Physical",
    category: "Hoodies",
    subCategory: "Clothing",
    listingType: "sale",
    price: 55,
    stockStatus: "In Stock (450)",
    pageViews: 198,
    date: "2026-07-31 / 11:20",
    editedAgo: "3 months ago",
    status: "active",
  },
  {
    id: "8",
    title: "Acoustic guitar loop pack",
    sku: "A1G2L3O4O5P6",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=200&q=80",
    productType: "Digital",
    category: "Music Loops",
    subCategory: "Audio",
    listingType: "sale",
    price: 20,
    stockStatus: "In Stock",
    pageViews: 134,
    date: "2026-07-31 / 10:45",
    editedAgo: "3 months ago",
    status: "active",
  },
  {
    id: "5",
    title: "Wireless noise-canceling headphones",
    sku: "W1N2C3H4P5H6",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80",
    productType: "Physical",
    category: "Electronics",
    subCategory: "Audio",
    listingType: "sale",
    price: 129,
    stockStatus: "Active",
    pageViews: 312,
    date: "2026-07-31 / 10:10",
    editedAgo: "3 months ago",
    status: "active",
  },
  {
    id: "2",
    title: "Watercolor flower bouquet clipart",
    sku: "W1F2B3C4L5P6",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=200&q=80",
    productType: "Digital",
    category: "Vectors",
    subCategory: "Graphics",
    listingType: "sale",
    price: 12,
    stockStatus: "In Stock",
    pageViews: 240,
    date: "2026-07-31 / 09:30",
    editedAgo: "3 months ago",
    status: "active",
  },
];

// Exactly 38 draft products matching the Modesy reference screenshots
const all38DraftProducts: ProductItem[] = [
  {
    id: "109",
    title: "Guardian",
    sku: "",
    image: "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=200&q=80",
    productType: "Digital",
    category: "Web Templates & Code",
    price: 0,
    stockStatus: "In Stock",
    pageViews: 0,
    date: "2026-10-20 / 13:59",
    status: "draft",
  },
  {
    id: "108",
    title: "Harrisburg, PA: Your Guide to the Capital City",
    sku: "",
    image: "https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=200&q=80",
    productType: "Digital",
    category: "Clothing",
    price: 0,
    stockStatus: "In Stock",
    pageViews: 0,
    date: "2026-10-18 / 06:09",
    status: "draft",
  },
  {
    id: "107",
    title: "Nature Graphics: Enhance Your Digital Projects",
    sku: "",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=200&q=80",
    productType: "Digital",
    category: "Graphics & Photos",
    price: 0,
    stockStatus: "In Stock",
    pageViews: 0,
    date: "2026-10-18 / 02:26",
    status: "draft",
  },
  {
    id: "106",
    title: "13123",
    sku: "",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=200&q=80",
    productType: "Physical",
    category: "Clothing",
    price: 0,
    stockStatus: "Active",
    pageViews: 0,
    date: "2026-10-16 / 20:32",
    status: "draft",
  },
  {
    id: "104",
    title: "Durable Silicone: Versatile Material for Everyday Use",
    sku: "",
    image: "",
    productType: "Physical",
    category: "Kid's Clothing",
    price: 0,
    stockStatus: "In Stock (1)",
    pageViews: 0,
    date: "2026-10-13 / 17:43",
    status: "draft",
  },
  {
    id: "103",
    title: "afadfadf",
    sku: "",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=200&q=80",
    productType: "Physical",
    category: "Web Templates & Code",
    price: 0,
    stockStatus: "In Stock (1)",
    pageViews: 0,
    date: "2026-10-12 / 19:43",
    status: "draft",
  },
  {
    id: "102",
    title: "owf",
    sku: "",
    image: "",
    productType: "Physical",
    category: "",
    price: 0,
    stockStatus: "Active",
    pageViews: 0,
    date: "2026-10-12 / 18:13",
    status: "draft",
  },
  {
    id: "100",
    title: "Hdjdn",
    sku: "",
    image: "",
    productType: "Physical",
    category: "Home & Living",
    price: 0,
    stockStatus: "Active",
    pageViews: 0,
    date: "2026-10-12 / 15:37",
    status: "draft",
  },
  {
    id: "98",
    title: "daflknk",
    sku: "",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&q=80",
    productType: "Physical",
    category: "Clothing",
    price: 0,
    stockStatus: "In Stock (1)",
    pageViews: 0,
    date: "2026-10-12 / 11:21",
    status: "draft",
  },
  {
    id: "96",
    title: "wdaawdaw: A Comprehensive Overview",
    sku: "",
    image: "",
    productType: "Physical",
    category: "",
    price: 0,
    stockStatus: "In Stock (1)",
    pageViews: 0,
    date: "2026-10-11 / 10:41",
    status: "draft",
  },
  {
    id: "95",
    title: "Refurbished iPhone 13 Mini - 1 Year Warranty",
    sku: "",
    image: "",
    productType: "Physical",
    category: "Office & School Supplies",
    price: 0,
    stockStatus: "Active",
    pageViews: 0,
    date: "2026-10-08 / 04:19",
    status: "draft",
  },
  {
    id: "94",
    title: "Apple iPhone 15 Pro Max: Pro Camera, Pro Performance",
    sku: "",
    image: "",
    productType: "Physical",
    category: "Clothing Sets",
    price: 0,
    stockStatus: "Active",
    pageViews: 0,
    date: "2026-10-06 / 01:15",
    status: "draft",
  },
  {
    id: "92",
    title: "jkjlk",
    sku: "",
    image: "",
    productType: "Physical",
    category: "Clothing",
    price: 0,
    stockStatus: "In Stock (1)",
    pageViews: 0,
    date: "2026-09-29 / 07:26",
    status: "draft",
  },
  {
    id: "90",
    title: "Google Pixel 11",
    sku: "",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&q=80",
    productType: "Physical",
    category: "Graphics & Photos",
    price: 0,
    stockStatus: "In Stock (1)",
    pageViews: 0,
    date: "2026-09-28 / 09:43",
    status: "draft",
  },
  {
    id: "89",
    title: "Google Pixel 11",
    sku: "",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=200&q=80",
    productType: "Physical",
    category: "Clothing",
    price: 0,
    stockStatus: "In Stock (1)",
    pageViews: 0,
    date: "2026-09-28 / 00:51",
    status: "draft",
  },
  {
    id: "87",
    title: "Wireless earbuds with charging case",
    sku: "",
    image: "",
    productType: "Physical",
    category: "Electronics",
    price: 0,
    stockStatus: "Active",
    pageViews: 0,
    date: "2026-09-25 / 16:30",
    status: "draft",
  },
  {
    id: "85",
    title: "Smart fitness tracker band",
    sku: "",
    image: "",
    productType: "Physical",
    category: "Electronics",
    price: 0,
    stockStatus: "Active",
    pageViews: 0,
    date: "2026-09-24 / 14:15",
    status: "draft",
  },
  {
    id: "83",
    title: "Bamboo fiber kitchen towels",
    sku: "",
    image: "",
    productType: "Physical",
    category: "Home & Living",
    price: 0,
    stockStatus: "In Stock (1)",
    pageViews: 0,
    date: "2026-09-22 / 11:40",
    status: "draft",
  },
  {
    id: "81",
    title: "Minimalist desk organizer tray",
    sku: "",
    image: "",
    productType: "Physical",
    category: "Office & School Supplies",
    price: 0,
    stockStatus: "In Stock (1)",
    pageViews: 0,
    date: "2026-09-20 / 18:22",
    status: "draft",
  },
  {
    id: "79",
    title: "Ceramic plant pot succulent planter",
    sku: "",
    image: "",
    productType: "Physical",
    category: "Home Decor",
    price: 0,
    stockStatus: "Active",
    pageViews: 0,
    date: "2026-09-18 / 09:10",
    status: "draft",
  },
  {
    id: "77",
    title: "Men casual cotton polo shirt",
    sku: "",
    image: "",
    productType: "Physical",
    category: "Clothing",
    price: 0,
    stockStatus: "In Stock (1)",
    pageViews: 0,
    date: "2026-09-16 / 15:55",
    status: "draft",
  },
  {
    id: "75",
    title: "Women lightweight canvas tote bag",
    sku: "",
    image: "",
    productType: "Physical",
    category: "Handbags",
    price: 0,
    stockStatus: "Active",
    pageViews: 0,
    date: "2026-09-15 / 13:45",
    status: "draft",
  },
  {
    id: "73",
    title: "Stainless steel water tumbler 500ml",
    sku: "",
    image: "",
    productType: "Physical",
    category: "Home & Living",
    price: 0,
    stockStatus: "In Stock (1)",
    pageViews: 0,
    date: "2026-09-12 / 17:05",
    status: "draft",
  },
  {
    id: "71",
    title: "Leather key organizer keychain",
    sku: "",
    image: "",
    productType: "Physical",
    category: "Accessories",
    price: 0,
    stockStatus: "Active",
    pageViews: 0,
    date: "2026-09-10 / 10:20",
    status: "draft",
  },
  {
    id: "69",
    title: "Vector icons set mobile app UI",
    sku: "",
    image: "",
    productType: "Digital",
    category: "Vectors",
    price: 0,
    stockStatus: "In Stock",
    pageViews: 0,
    date: "2026-09-08 / 12:40",
    status: "draft",
  },
  {
    id: "67",
    title: "Organic face moisturizer cream",
    sku: "",
    image: "",
    productType: "Physical",
    category: "Beauty",
    price: 0,
    stockStatus: "In Stock (1)",
    pageViews: 0,
    date: "2026-09-05 / 19:15",
    status: "draft",
  },
  {
    id: "65",
    title: "Vintage brass bookmark clip",
    sku: "",
    image: "",
    productType: "Physical",
    category: "Office & School Supplies",
    price: 0,
    stockStatus: "Active",
    pageViews: 0,
    date: "2026-09-03 / 08:30",
    status: "draft",
  },
  {
    id: "63",
    title: "Abstract watercolor landscape prints",
    sku: "",
    image: "",
    productType: "Digital",
    category: "Graphics & Photos",
    price: 0,
    stockStatus: "In Stock",
    pageViews: 0,
    date: "2026-09-01 / 14:50",
    status: "draft",
  },
  {
    id: "61",
    title: "Children wooden puzzle toys",
    sku: "",
    image: "",
    productType: "Physical",
    category: "Kid's Clothing",
    price: 0,
    stockStatus: "Active",
    pageViews: 0,
    date: "2026-08-28 / 11:05",
    status: "draft",
  },
  {
    id: "59",
    title: "Modern UI Kit for Figma",
    sku: "",
    image: "",
    productType: "Digital",
    category: "Web Templates & Code",
    price: 0,
    stockStatus: "In Stock",
    pageViews: 0,
    date: "2026-08-25 / 16:40",
    status: "draft",
  },
  {
    id: "57",
    title: "Classic canvas sneakers white",
    sku: "",
    image: "",
    productType: "Physical",
    category: "Sneakers",
    price: 0,
    stockStatus: "In Stock (1)",
    pageViews: 0,
    date: "2026-08-22 / 10:15",
    status: "draft",
  },
  {
    id: "55",
    title: "Portable bluetooth mini speaker",
    sku: "",
    image: "",
    productType: "Physical",
    category: "Electronics",
    price: 0,
    stockStatus: "Active",
    pageViews: 0,
    date: "2026-08-20 / 14:00",
    status: "draft",
  },
  {
    id: "53",
    title: "Lofi hip hop beats background music",
    sku: "",
    image: "",
    productType: "Digital",
    category: "Music",
    price: 0,
    stockStatus: "In Stock",
    pageViews: 0,
    date: "2026-08-18 / 18:35",
    status: "draft",
  },
  {
    id: "51",
    title: "Handmade soy scented candle",
    sku: "",
    image: "",
    productType: "Physical",
    category: "Home & Living",
    price: 0,
    stockStatus: "In Stock (1)",
    pageViews: 0,
    date: "2026-08-15 / 13:20",
    status: "draft",
  },
  {
    id: "49",
    title: "Men leather wallet bifold brown",
    sku: "",
    image: "",
    productType: "Physical",
    category: "Accessories",
    price: 0,
    stockStatus: "Active",
    pageViews: 0,
    date: "2026-08-12 / 15:45",
    status: "draft",
  },
  {
    id: "48",
    title: "Retro film photo Lightroom presets",
    sku: "",
    image: "",
    productType: "Digital",
    category: "Graphics & Photos",
    price: 0,
    stockStatus: "In Stock",
    pageViews: 0,
    date: "2026-08-10 / 09:50",
    status: "draft",
  },
  {
    id: "35",
    title: "Stainless steel French press coffee",
    sku: "",
    image: "",
    productType: "Physical",
    category: "Home Decor",
    price: 0,
    stockStatus: "In Stock (1)",
    pageViews: 0,
    date: "2026-08-08 / 11:25",
    status: "draft",
  },
  {
    id: "17",
    title: "Handcrafted ceramic mug rustic",
    sku: "",
    image: "",
    productType: "Physical",
    category: "Home & Living",
    price: 0,
    stockStatus: "Active",
    pageViews: 0,
    date: "2026-08-05 / 16:10",
    status: "draft",
  },
];

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
  const effectiveStatus = (statusFilter && statusFilter !== "all") ? statusFilter : stParam;

  const isDraft = effectiveStatus === "draft" || effectiveStatus === "drafts";
  const isPending = effectiveStatus === "pending";
  const isHidden = effectiveStatus === "hidden";
  const isSold = effectiveStatus === "sold";

  let computedTitle = pageTitle;
  if (pageTitle === "Products") {
    if (isPending) computedTitle = "Pending Products";
    else if (isHidden) computedTitle = "Hidden Products";
    else if (isSold) computedTitle = "Sold Products";
    else if (isDraft) computedTitle = "Drafts";
  }

  const getInitialData = () => {
    if (isDraft) return all38DraftProducts;
    if (isPending || isHidden || isSold) return [];
    return all23ActiveProducts;
  };

  const [products, setProducts] = useState<ProductItem[]>(getInitialData);

  useEffect(() => {
    if (isDraft) {
      setProducts(all38DraftProducts);
    } else if (isPending || isHidden || isSold) {
      setProducts([]);
    } else {
      setProducts(all23ActiveProducts);
    }
    setCurrentPage(1);
  }, [effectiveStatus, isDraft, isPending, isHidden, isSold]);

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
      sku: item.sku ? `${item.sku}-COPY` : "",
      date: "2026-10-21 / 09:30",
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
      // 1. Listing Type
      if (appliedFilters.listingType !== "All") {
        if (item.listingType && item.listingType !== appliedFilters.listingType) return false;
      }

      // 2. Product Type
      if (appliedFilters.productType !== "All") {
        if (item.productType !== appliedFilters.productType) return false;
      }

      // 3. Category
      if (appliedFilters.category !== "All") {
        if (!item.category.toLowerCase().includes(appliedFilters.category.toLowerCase())) return false;
      }

      // 4. Subcategory
      if (appliedFilters.subCategory !== "All") {
        const itemSub = item.subCategory || item.category;
        if (!itemSub.toLowerCase().includes(appliedFilters.subCategory.toLowerCase())) return false;
      }

      // 5. Stock
      if (appliedFilters.stock !== "All") {
        if (appliedFilters.stock === "in_stock" && !item.stockStatus.toLowerCase().includes("in stock") && item.stockStatus !== "Active") {
          return false;
        }
        if (appliedFilters.stock === "out_of_stock" && (item.stockStatus.toLowerCase().includes("in stock") || item.stockStatus === "Active")) {
          return false;
        }
      }

      // 6. Search keyword
      const keyword = appliedFilters.search.trim().toLowerCase();
      if (keyword) {
        const matchTitle = item.title.toLowerCase().includes(keyword);
        const matchSku = item.sku.toLowerCase().includes(keyword);
        const matchCategory = item.category.toLowerCase().includes(keyword);
        if (!matchTitle && !matchSku && !matchCategory) return false;
      }

      return true;
    });
  }, [products, appliedFilters]);

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
      `"${p.id}","${p.title.replace(/"/g, '""')}","${p.sku}","${p.productType}","${p.category}","${p.price.toFixed(2)}","${p.stockStatus}","${p.pageViews}","${p.date}"`
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

  return (
    <div className="w-full">
      {/* Main Container Card */}
      <div className="bg-white border border-[#e4e7ea] rounded-[3px] p-5 sm:p-6 shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
        
        {/* Title */}
        <h1 className="text-[16px] font-semibold text-[#2c333e] mb-4">
          {computedTitle}
        </h1>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-end gap-3 mb-5 select-none">
          
          {/* 1. Listing Type */}
          <div className="w-full sm:w-auto">
            <label className="block text-[12px] font-semibold text-[#2c333e] mb-1">
              Listing Type
            </label>
            <div className="relative">
              <select
                value={listingType}
                onChange={(e) => setListingType(e.target.value)}
                className="w-full sm:w-[130px] h-[32px] border border-[#d2d6de] rounded-[3px] px-2.5 text-[12.5px] text-[#495057] bg-white appearance-none outline-none focus:border-[#00ab97]"
              >
                <option value="All">All</option>
                <option value="sale">For Sale</option>
                <option value="ordinary">Ordinary Listing</option>
                <option value="quote">Quote Request</option>
                <option value="license">License Keys</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* 2. Product Type */}
          <div className="w-full sm:w-auto">
            <label className="block text-[12px] font-semibold text-[#2c333e] mb-1">
              Product Type
            </label>
            <div className="relative">
              <select
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                className="w-full sm:w-[110px] h-[32px] border border-[#d2d6de] rounded-[3px] px-2.5 text-[12.5px] text-[#495057] bg-white appearance-none outline-none focus:border-[#00ab97]"
              >
                <option value="All">All</option>
                <option value="Physical">Physical</option>
                <option value="Digital">Digital</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* 3. Category */}
          <div className="w-full sm:w-auto">
            <label className="block text-[12px] font-semibold text-[#2c333e] mb-1">
              Category
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full sm:w-[120px] h-[32px] border border-[#d2d6de] rounded-[3px] px-2.5 text-[12.5px] text-[#495057] bg-white appearance-none outline-none focus:border-[#00ab97]"
              >
                <option value="All">All</option>
                <option value="Boots">Boots</option>
                <option value="Furniture">Furniture</option>
                <option value="Pillows">Pillows</option>
                <option value="Handbags">Handbags</option>
                <option value="Dresses">Dresses</option>
                <option value="Vectors">Vectors</option>
                <option value="Video Games">Video Games</option>
                <option value="Sneakers">Sneakers</option>
                <option value="Animals">Animals</option>
                <option value="Music">Music</option>
                <option value="Clothing">Clothing</option>
                <option value="Web Templates & Code">Web Templates &amp; Code</option>
                <option value="Graphics & Photos">Graphics &amp; Photos</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* 4. Subcategory */}
          <div className="w-full sm:w-auto">
            <label className="block text-[12px] font-semibold text-[#2c333e] mb-1">
              Subcategory
            </label>
            <div className="relative">
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full sm:w-[120px] h-[32px] border border-[#d2d6de] rounded-[3px] px-2.5 text-[12.5px] text-[#495057] bg-white appearance-none outline-none focus:border-[#00ab97]"
              >
                <option value="All">All</option>
                <option value="Boots">Boots</option>
                <option value="Living Room">Living Room</option>
                <option value="Dresses">Dresses</option>
                <option value="Handbags">Handbags</option>
                <option value="Sneakers">Sneakers</option>
                <option value="Vectors">Vectors</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* 5. Stock */}
          <div className="w-full sm:w-auto">
            <label className="block text-[12px] font-semibold text-[#2c333e] mb-1">
              Stock
            </label>
            <div className="relative">
              <select
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full sm:w-[100px] h-[32px] border border-[#d2d6de] rounded-[3px] px-2.5 text-[12.5px] text-[#495057] bg-white appearance-none outline-none focus:border-[#00ab97]"
              >
                <option value="All">All</option>
                <option value="in_stock">In Stock</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* 6. Search Input */}
          <div className="w-full sm:w-auto flex-1 min-w-[130px]">
            <label className="block text-[12px] font-semibold text-[#2c333e] mb-1">
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
              className="w-full h-[32px] border border-[#d2d6de] rounded-[3px] px-3 text-[12.5px] text-[#495057] outline-none focus:border-[#00ab97]"
            />
          </div>

          {/* 7. Filter Button (Purple/Indigo) */}
          <div>
            <button
              type="button"
              onClick={handleApplyFilter}
              className="h-[32px] bg-[#4f52ba] hover:bg-[#4346a3] text-white px-4 rounded-[3px] text-[12.5px] font-medium transition-colors cursor-pointer flex items-center justify-center shadow-2xs"
            >
              Filter
            </button>
          </div>

          {/* 8. Export Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setExportOpen(!exportOpen)}
              className="h-[32px] bg-[#eef1f6] hover:bg-[#e2e6ee] text-[#4f52ba] border border-[#dce1ea] px-3 rounded-[3px] text-[12.5px] font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Export</span>
              <ChevronDown className="w-3 h-3 text-[#4f52ba]" />
            </button>

            {exportOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setExportOpen(false)}
                />
                <div className="absolute right-0 top-[35px] w-[130px] bg-white border border-[#e4e7ea] shadow-md rounded-[3px] py-1 text-[12px] z-30 animate-in fade-in">
                  <button
                    type="button"
                    onClick={handleExportCSV}
                    className="w-full text-left px-3 py-1.5 text-[#495057] hover:text-[#00ab97] hover:bg-[#f8fafc] cursor-pointer"
                  >
                    CSV
                  </button>
                </div>
              </>
            )}
          </div>

        </div>

        {/* Products Table */}
        <div className="overflow-x-auto border-t border-[#f1f3f5]">
          <table className="w-full text-left text-[13px] border-collapse">
            <thead>
              <tr className="border-b border-[#e4e7ea] text-[12px] font-medium text-[#2c333e] select-none">
                <th className="py-2.5 px-3 w-10 font-semibold">Id</th>
                <th className="py-2.5 px-3 font-semibold">Product</th>
                <th className="py-2.5 px-3 font-semibold">Product Type</th>
                <th className="py-2.5 px-3 font-semibold">Category</th>
                <th className="py-2.5 px-3 font-semibold">Purchased Plan</th>
                <th className="py-2.5 px-3 font-semibold">Price</th>
                <th className="py-2.5 px-3 font-semibold">Stock/Status</th>
                <th className="py-2.5 px-3 font-semibold">Page Views</th>
                <th className="py-2.5 px-3 font-semibold">Date</th>
                <th className="py-2.5 px-3 font-semibold text-center">Options</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f4f6f8]">
              {paginatedProducts.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-[#6c757d] text-[13px]">
                    No records found!
                  </td>
                </tr>
              ) : (
                paginatedProducts.map((item) => (
                  <tr key={item.id} className="hover:bg-[#fafbfc] transition-colors">
                    {/* Id */}
                    <td className="py-3 px-3 text-[#555] font-sans">
                      {item.id}
                    </td>

                    {/* Product */}
                    <td className="py-3 px-3 min-w-[260px]">
                      <div className="flex items-start gap-3">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title || "Product"}
                            className="w-[50px] h-[50px] rounded-[2px] object-cover border border-[#e4e7ea] shrink-0"
                          />
                        ) : (
                          <div className="w-[50px] h-[50px] rounded-[2px] bg-[#f8fafc] border border-[#e4e7ea] flex items-center justify-center shrink-0">
                            <ImageIcon className="w-5 h-5 text-[#ccd1d9]" />
                          </div>
                        )}
                        <div className="flex flex-col">
                          <Link
                            href={item.title ? `/product/${(item.sku || item.id).toLowerCase()}` : "#"}
                            className="text-[13px] text-[#2c333e] hover:text-[#00ab97] font-medium leading-tight mb-1"
                          >
                            {item.title || "Untitled"}
                          </Link>
                          {item.sku ? (
                            <span className="text-[11px] text-[#8c98a4] leading-none mb-1">
                              SKU: {item.sku}
                            </span>
                          ) : null}

                          {/* Badges */}
                          <div className="flex items-center gap-1.5 mt-0.5">
                            {item.badge && item.badge.type === "featured" && (
                              <span className="bg-[#00ab97] text-white text-[10px] font-medium px-2 py-0.5 rounded-[2px] leading-none">
                                Featured
                              </span>
                            )}
                            {item.badge && item.badge.type === "discount" && (
                              <span className="bg-[#f39c12] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-[2px] flex items-center gap-1 leading-none">
                                <Tag className="w-2.5 h-2.5" />
                                {item.badge.text}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Product Type */}
                    <td className="py-3 px-3 text-[#555] text-[12.5px]">
                      {item.productType}
                    </td>

                    {/* Category */}
                    <td className="py-3 px-3 text-[#555] text-[12.5px]">
                      {item.category || ""}
                    </td>

                    {/* Purchased Plan */}
                    <td className="py-3 px-3 min-w-[130px]">
                      {isDraft ? null : item.purchasedPlan ? (
                        <span className="text-[12px] text-[#495057]">
                          {item.purchasedPlan}
                        </span>
                      ) : (
                        <button
                          type="button"
                          className="bg-[#00ab97] hover:bg-[#009180] text-white text-[11px] font-bold px-2.5 py-1 rounded-[3px] shadow-2xs transition-colors cursor-pointer"
                        >
                          + Promote
                        </button>
                      )}
                    </td>

                    {/* Price */}
                    <td className="py-3 px-3 text-[#333] font-medium text-[13px]">
                      {isDraft ? "0.00" : `$${item.price}`}
                    </td>

                    {/* Stock/Status */}
                    <td className="py-3 px-3 text-[#00ab97] font-medium text-[12.5px] whitespace-nowrap">
                      {item.stockStatus}
                    </td>

                    {/* Page Views */}
                    <td className="py-3 px-3 text-[#555] text-[12.5px]">
                      {item.pageViews}
                    </td>

                    {/* Date */}
                    <td className="py-3 px-3 min-w-[120px]">
                      <div className="text-[11.5px] text-[#555] leading-tight">
                        {item.date}
                      </div>
                      {!isDraft && item.editedAgo && (
                        <div className="text-[10.5px] text-[#8c98a4] leading-tight mt-0.5">
                          Edited: {item.editedAgo}
                        </div>
                      )}
                    </td>

                    {/* Options */}
                    <td className="py-3 px-3">
                      <div className="flex items-center justify-center gap-1">
                        {/* Edit */}
                        <Link
                          href={`/dashboard/products/edit/${item.id}`}
                          className="p-1.5 bg-[#f8fafc] hover:bg-[#e9ecef] border border-[#d2d6de] rounded-[3px] text-[#495057] hover:text-[#2c333e] transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Link>

                        {/* Duplicate */}
                        <button
                          type="button"
                          onClick={() => handleDuplicate(item.id)}
                          className="p-1.5 bg-[#f8fafc] hover:bg-[#e9ecef] border border-[#d2d6de] rounded-[3px] text-[#495057] hover:text-[#2c333e] transition-colors cursor-pointer"
                          title="Duplicate"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 bg-[#f8fafc] hover:bg-red-50 border border-[#d2d6de] rounded-[3px] text-[#495057] hover:text-red-600 transition-colors cursor-pointer"
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

        {/* Footer: Number of Entries & Pagination */}
        {totalEntries > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 mt-2 border-t border-[#f1f3f5] text-[#495057] select-none">
            <span className="text-[12.5px] text-[#2c333e]">
              Number of Entries: {totalEntries}
            </span>

            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-7 h-7 flex items-center justify-center rounded-[3px] text-xs font-bold transition-colors cursor-pointer ${
                      currentPage === pageNum
                        ? "bg-[#00ab97] text-white"
                        : "border border-[#d2d6de] hover:bg-gray-50 text-[#495057]"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              {totalPages > 1 && currentPage < totalPages && (
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="w-7 h-7 flex items-center justify-center border border-[#d2d6de] hover:bg-gray-50 rounded-[3px] text-xs text-[#495057] transition-colors cursor-pointer"
                >
                  &gt;
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default function DashboardProductsPage(props: ProductsPageProps) {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading products...</div>}>
      <ProductsPageContent {...props} />
    </Suspense>
  );
}
