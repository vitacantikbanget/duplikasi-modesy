"use client";

import { useState } from "react";
import Link from "next/link";
import { Folder, Clock, ChevronRight } from "lucide-react";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  date: string;
  description: string;
  imageUrl: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "essential-travel-packing-tips-for-fashion-lovers",
    title: "Essential travel packing tips for fashion lovers",
    category: "Life Style",
    categorySlug: "life-style",
    date: "3 months ago",
    description: "Stay stylish and organized on your trips with these smart packing hacks and essentials.",
    imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80",
  },
  {
    id: "2",
    slug: "the-psychology-of-colors-in-fashion",
    title: "The psychology of colors in fashion",
    category: "Fashion",
    categorySlug: "fashion",
    date: "3 months ago",
    description: "Learn how the colors you wear influence mood, confidence, and how others perceive you.",
    imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80",
  },
  {
    id: "3",
    slug: "gift-ideas-for-every-budget-from-affordable-to-luxury",
    title: "Gift ideas for every budget from affordable to luxury",
    category: "Life Style",
    categorySlug: "life-style",
    date: "3 months ago",
    description: "Find the perfect gift without breaking the bank — our curated ideas suit every occasion and budget.",
    imageUrl: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&q=80",
  },
  {
    id: "4",
    slug: "a-beginners-guide-to-home-fragrances",
    title: "A beginner’s guide to home fragrances",
    category: "Business",
    categorySlug: "business",
    date: "3 months ago",
    description: "Learn how scents can transform your home atmosphere and boost your overall mood and focus.",
    imageUrl: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&q=80",
  },
  {
    id: "5",
    slug: "must-have-accessories-to-elevate-your-everyday-look",
    title: "Must-have accessories to elevate your everyday look",
    category: "Business",
    categorySlug: "business",
    date: "3 months ago",
    description: "Small details make a big difference — discover the top accessories you need in your collection right now.",
    imageUrl: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&q=80",
  },
  {
    id: "6",
    slug: "why-sustainable-fashion-matters-more-than-ever",
    title: "Why sustainable fashion matters more than ever",
    category: "Fashion",
    categorySlug: "fashion",
    date: "3 months ago",
    description: "Understand the importance of eco-friendly choices in fashion and how you can make a meaningful difference.",
    imageUrl: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=600&q=80",
  },
];

const CATEGORIES = ["All", "Life Style", "Fashion", "Business"];

export default function BlogIndexPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts =
    selectedCategory === "All"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-6 md:py-8 font-sans">
      <div className="max-w-[1320px] mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-[#00a99d] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          <span className="text-gray-700 font-medium">Blog</span>
        </nav>

        {/* Page Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Blog</h1>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 border-b border-gray-200">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#00a99d] text-white shadow-xs"
                    : "bg-white text-gray-600 hover:text-[#00a99d] border border-gray-200"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-md border border-gray-100 shadow-xs hover:shadow-md transition-shadow overflow-hidden flex flex-col group"
            >
              <Link href={`/blog/${post.slug}`} className="block aspect-[16/10] overflow-hidden bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </Link>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug group-hover:text-[#00a99d] transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                  <span className="flex items-center gap-1 hover:text-[#00a99d] transition-colors">
                    <Folder className="w-3.5 h-3.5 text-[#00a99d]" />
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mt-auto">
                  {post.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
