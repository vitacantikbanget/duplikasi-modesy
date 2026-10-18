"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Folder, Clock, ArrowRight } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";

export const blogPosts = [
  {
    id: "1",
    slug: "essential-travel-packing-tips-for-fashion-lovers",
    title: "Essential travel packing tips for fashion lovers",
    category: "Life Style",
    timeAgo: "3 months ago",
    excerpt: "Stay stylish and organized on your trips with these smart packing hacks",
    imageUrl: "/images/blog/travel-packing.webp",
  },
  {
    id: "2",
    slug: "the-psychology-of-colors-in-fashion",
    title: "The psychology of colors in fashion",
    category: "Fashion",
    timeAgo: "3 months ago",
    excerpt: "Learn how the colors you wear influence mood, confidence, and perception",
    imageUrl: "/images/blog/color-psychology.webp",
  },
  {
    id: "3",
    slug: "gift-ideas-for-every-budget-from-affordable-to-luxury",
    title: "Gift ideas for every budget from affordable to luxury",
    category: "Life Style",
    timeAgo: "3 months ago",
    excerpt: "Find the perfect gift without breaking the bank our ideas suit every budget",
    imageUrl: "/images/blog/gift-ideas.webp",
  },
  {
    id: "4",
    slug: "a-beginners-guide-to-home-fragrances",
    title: "A beginner's guide to home fragrances",
    category: "Business",
    timeAgo: "3 months ago",
    excerpt: "Learn how scents can transform your home atmosphere and boost your mood.",
    imageUrl: "/images/blog/home-fragrance.webp",
  },
  {
    id: "5",
    slug: "must-have-accessories-to-elevate-your-everyday-look",
    title: "Must-have accessories to elevate your everyday look",
    category: "Business",
    timeAgo: "3 months ago",
    excerpt: "Small details make a big difference discover the top accessories you need right now.",
    imageUrl: "/images/blog/accessories.webp",
  },
  {
    id: "6",
    slug: "why-sustainable-fashion-matters-more-than-ever",
    title: "Why sustainable fashion matters more than ever",
    category: "Fashion",
    timeAgo: "3 months ago",
    excerpt: "Understand the importance of eco-friendly choices in fashion and how you can make a difference.",
    imageUrl: "/images/blog/sustainable-fashion.webp",
  },
  {
    id: "7",
    slug: "how-to-pick-the-right-shoes-for-comfort-and-style",
    title: "How to pick the right shoes for comfort and style",
    category: "Fashion",
    timeAgo: "3 months ago",
    excerpt: "Find out how to balance fashion and comfort when choosing your footwear.",
    imageUrl: "/images/blog/right-shoes.webp",
  },
  {
    id: "8",
    slug: "how-to-choose-the-perfect-outfit-for-every-occasion",
    title: "How to choose the perfect outfit for every occasion",
    category: "Life Style",
    timeAgo: "3 months ago",
    excerpt: "Learn how to style yourself with the right outfit for casual, formal, and special events.",
    imageUrl: "/images/blog/perfect-outfit.webp",
  },
];

export default function BlogSection() {
  const { t } = useAppContext();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll, { passive: true });
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (el) el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = scrollRef.current.clientWidth * 0.75;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -offset : offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-white pb-20 border-b border-[#f1f3f5]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#f1f3f5]">
          <h2 className="text-[20px] sm:text-[22px] font-bold text-[#2b333e] tracking-tight">
            <Link href="/blog" className="hover:text-[#00ab97] transition-colors">
              {t("latest_blog_posts", "Latest Blog Posts")}
            </Link>
          </h2>

          <Link
            href="/blog"
            className="text-[13px] sm:text-[14px] font-semibold text-[#2b333e] hover:text-[#00ab97] flex items-center gap-1.5 transition-colors group"
          >
            <span>{t("view_all") || "View All"}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#00ab97]" />
          </Link>
        </div>

        {/* Carousel Container */}
        <div className="relative group/carousel">
          {/* Left Navigation Arrow */}
          {canScrollLeft && (
            <button
              type="button"
              onClick={() => handleScroll("left")}
              aria-label="Scroll left"
              className="absolute top-1/2 -left-4 -translate-y-1/2 z-20 hidden md:flex w-10 h-10 rounded-full bg-white shadow-[0_3px_12px_rgba(0,0,0,0.15)] border border-[#e4e7ea] items-center justify-center text-[#2b333e] hover:bg-[#00ab97] hover:text-white transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Carousel Track */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-none py-1 px-0.5"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="flex-none w-[calc(85%)] sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] flex flex-col group"
              >
                <Link href={`/blog/${post.slug || post.id}`} className="block overflow-hidden mb-3.5 rounded-[4px] bg-[#f8f9fa] aspect-[3/2] relative border border-[#eef0f2]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </Link>

                <h3 className="font-semibold text-[#2b333e] mb-2 group-hover:text-[#00ab97] transition-colors text-[14.5px] leading-snug line-clamp-2 min-h-[40px]">
                  <Link href={`/blog/${post.slug || post.id}`}>
                    {post.title}
                  </Link>
                </h3>

                <div className="flex items-center gap-3 text-[11px] text-[#8c98a4] mb-2 font-medium">
                  <span className="flex items-center gap-1 hover:text-[#00ab97] transition-colors">
                    <Folder className="w-3 h-3 text-[#a0abb6]" /> {post.category}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#a0abb6]" /> {post.timeAgo}
                  </span>
                </div>

                <p className="text-[#6c757d] text-[13px] leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            ))}
          </div>

          {/* Right Navigation Arrow */}
          {canScrollRight && (
            <button
              type="button"
              onClick={() => handleScroll("right")}
              aria-label="Scroll right"
              className="absolute top-1/2 -right-4 -translate-y-1/2 z-20 hidden md:flex w-10 h-10 rounded-full bg-white shadow-[0_3px_12px_rgba(0,0,0,0.15)] border border-[#e4e7ea] items-center justify-center text-[#2b333e] hover:bg-[#00ab97] hover:text-white transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
