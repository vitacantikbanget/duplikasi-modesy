"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Folder, Clock, ChevronRight, Share2 } from "lucide-react";

export default function BlogPostDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "essential-travel-packing-tips-for-fashion-lovers";

  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-6 md:py-8 font-sans">
      <div className="max-w-[1000px] mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-4 flex-wrap">
          <Link href="/" className="hover:text-[#00a99d] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          <Link href="/blog" className="hover:text-[#00a99d] transition-colors">
            Blog
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          <span className="text-gray-700 font-medium truncate max-w-xs">{title}</span>
        </nav>

        {/* Article Card */}
        <article className="bg-white rounded-md border border-gray-100 shadow-xs p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
            {title}
          </h1>

          <div className="flex items-center gap-4 text-xs text-gray-400 pb-6 mb-6 border-b border-gray-100">
            <span className="flex items-center gap-1 text-[#00a99d] font-medium">
              <Folder className="w-3.5 h-3.5" />
              Fashion & Lifestyle
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              Published 3 months ago
            </span>
          </div>

          <div className="aspect-[16/9] w-full rounded overflow-hidden mb-6 bg-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80"
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose max-w-none text-gray-700 text-sm md:text-base leading-relaxed space-y-4">
            <p>
              Traveling is an exhilarating experience, but when it comes to packing, even seasoned globetrotters can feel overwhelmed. Balancing the desire to look chic in vacation photos with the practical constraints of luggage limits requires a thoughtful strategy.
            </p>
            <h3 className="text-lg font-bold text-gray-900 pt-2">1. Plan Outfits Around a Unified Color Palette</h3>
            <p>
              The golden rule of fashionable packing is versatility. Stick to a neutral base palette—such as whites, beiges, navies, or blacks—and bring one or two accent shades. This ensures that every top pairs effortlessly with every bottom, exponentially increasing your outfit combinations without adding extra weight.
            </p>
            <h3 className="text-lg font-bold text-gray-900 pt-2">2. Master the Capsule Wardrobe Philosophy</h3>
            <p>
              Instead of packing individual outfits for each day, curate a mini capsule wardrobe. Select pieces made of wrinkle-resistant fabrics like merino wool, lyocell, or high-quality rayon blends that drape elegantly straight out of your suitcase.
            </p>
            <h3 className="text-lg font-bold text-gray-900 pt-2">3. Elevate with Statement Accessories</h3>
            <p>
              Accessories are your secret weapon when traveling light. A silk scarf, a structured leather belt, and bold jewelry take up virtually no space in your luggage, yet they can instantly transform a casual daytime walking outfit into an elegant evening ensemble.
            </p>
          </div>

          {/* Social Share Footer */}
          <div className="flex items-center justify-between pt-8 mt-8 border-t border-gray-100">
            <Link
              href="/blog"
              className="text-xs font-semibold text-[#00a99d] hover:underline"
            >
              ← Back to all posts
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 mr-2">Share:</span>
              <button
                type="button"
                className="w-7 h-7 rounded-full bg-gray-100 hover:bg-[#00a99d] hover:text-white transition-colors flex items-center justify-center text-gray-600 text-xs"
                title="Facebook"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.6 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z"/></svg>
              </button>
              <button
                type="button"
                className="w-7 h-7 rounded-full bg-gray-100 hover:bg-[#00a99d] hover:text-white transition-colors flex items-center justify-center text-gray-600 text-xs"
                title="Twitter"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

