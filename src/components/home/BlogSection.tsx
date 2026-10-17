import Link from "next/link";
import { ChevronLeft, ChevronRight, Folder, Clock } from "lucide-react";

const blogPosts = [
  {
    id: "1",
    title: "Essential travel packing tips for fashion lovers",
    category: "Life Style",
    timeAgo: "2 months ago",
    excerpt: "Stay stylish and organized on your trips with these smart packing hacks",
    imageUrl: "/images/blog/travel-packing.webp"
  },
  {
    id: "2",
    title: "The psychology of colors in fashion",
    category: "Fashion",
    timeAgo: "2 months ago",
    excerpt: "Learn how the colors you wear influence mood, confidence, and perception",
    imageUrl: "/images/blog/color-psychology.webp"
  },
  {
    id: "3",
    title: "Gift ideas for every budget from affordable to luxury",
    category: "Life Style",
    timeAgo: "2 months ago",
    excerpt: "Find the perfect gift without breaking the bank our ideas suit every budget",
    imageUrl: "/images/blog/gift-ideas.webp"
  },
  {
    id: "4",
    title: "A beginner's guide to home fragrances",
    category: "Business",
    timeAgo: "2 months ago",
    excerpt: "Learn how scents can transform your home atmosphere and boost your mood.",
    imageUrl: "/images/blog/home-fragrance.webp"
  }
];

export default function BlogSection() {
  return (
    <section className="bg-white pb-20 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="absolute top-1/2 -left-5 -translate-y-1/2 z-10 hidden lg:flex w-10 h-10 bg-white shadow-md rounded-full items-center justify-center text-gray-600 hover:text-brand-primary cursor-pointer border border-gray-100">
          <ChevronLeft className="w-5 h-5" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="group flex flex-col">
              <div className="w-full aspect-[4/3] overflow-hidden mb-4 rounded-sm bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>
              <h3 className="font-bold text-gray-800 mb-3 group-hover:text-brand-primary transition-colors text-[15px] leading-snug h-[44px]">
                {post.title}
              </h3>
              <div className="flex items-center gap-4 text-[11px] text-gray-400 mb-3 uppercase font-medium">
                <span className="flex items-center gap-1.5"><Folder className="w-3 h-3" /> {post.category}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {post.timeAgo}</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>

        <div className="absolute top-1/2 -right-5 -translate-y-1/2 z-10 hidden lg:flex w-10 h-10 bg-white shadow-md rounded-full items-center justify-center text-gray-600 hover:text-brand-primary cursor-pointer border border-gray-100">
          <ChevronRight className="w-5 h-5" />
        </div>
      </div>
    </section>
  );
}
