"use client";

import { useState } from "react";
import Link from "next/link";
import { Star } from "lucide-react";

export interface ReviewItem {
  id: number;
  user: string;
  rating: number; // 1 to 5
  reviewText: string;
  product: string;
  productSlug?: string;
  date: string;
}

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 6,
    user: "Trendshop",
    rating: 5,
    reviewText:
      "The material feels durable, and the design is sleek enough to match both casual and formal outfits. It has plenty of space inside without being too bulky, and the strap is comfortable for carrying all day.",
    product: "Black bag over the shoulder",
    productSlug: "black-bag-over-the-shoulder",
    date: "2026-08-05 / 13:55",
  },
  {
    id: 5,
    user: "Trendshop",
    rating: 4,
    reviewText:
      "The floral women sundress is really pretty and perfect for summer. The fabric feels light and comfortable, and the floral design is elegant. The fit is nice, though it runs just a little bit larger than expected. Overall, it's a lovely dress that looks great for casual outings or vacations.",
    product: "Floral women sundress",
    productSlug: "floral-women-sundress",
    date: "2026-08-05 / 13:55",
  },
];

export default function ReviewsPage() {
  const [reviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);

  return (
    <div className="w-full">
      <div className="bg-white rounded-[4px] border border-[#e9ecef] p-6 lg:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        {/* Page Title */}
        <h1 className="text-[19px] font-bold text-[#2c333e] mb-7 font-sans">
          Reviews
        </h1>

        {/* Reviews Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px] border-collapse min-w-[850px]">
            <thead>
              <tr className="text-[#2c333e] font-semibold text-[13px] border-b border-[#f1f3f5]">
                <th className="pb-3.5 pr-4 pl-1 font-semibold w-[50px]">Id</th>
                <th className="pb-3.5 pr-4 font-semibold w-[120px]">User</th>
                <th className="pb-3.5 pr-6 font-semibold max-w-[360px]">Review</th>
                <th className="pb-3.5 pr-4 font-semibold min-w-[200px]">Product</th>
                <th className="pb-3.5 pr-4 font-semibold w-[160px]">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f8f9fa]">
              {reviews.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-[#6c757d] text-[13px]">
                    No records found!
                  </td>
                </tr>
              ) : (
                reviews.map((item) => (
                  <tr key={item.id} className="hover:bg-[#fafbfc] transition-colors">
                    {/* Id */}
                    <td className="py-4 pr-4 pl-1 text-[#2c333e] align-top font-normal">
                      {item.id}
                    </td>

                    {/* User */}
                    <td className="py-4 pr-4 text-[#2c333e] align-top font-normal">
                      {item.user}
                    </td>

                    {/* Review with Star Rating */}
                    <td className="py-4 pr-6 text-[#2c333e] align-top max-w-[360px]">
                      <div className="flex items-center gap-0.5 text-[#f59e0b] mb-1">
                        {[1, 2, 3, 4, 5].map((starIndex) => (
                          <Star
                            key={starIndex}
                            className={`w-[13px] h-[13px] ${
                              starIndex <= item.rating
                                ? "fill-[#f59e0b] text-[#f59e0b]"
                                : "fill-[#e5e7eb] text-[#e5e7eb]"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-[#2c333e] text-[13px] leading-relaxed break-words font-normal">
                        {item.reviewText}
                      </div>
                    </td>

                    {/* Product */}
                    <td className="py-4 pr-4 text-[#2c333e] align-top font-normal">
                      <Link
                        href={`/product/${item.productSlug || ""}`}
                        className="text-[#2c333e] hover:text-[#00ab97] transition-colors hover:underline leading-normal"
                      >
                        {item.product}
                      </Link>
                    </td>

                    {/* Date */}
                    <td className="py-4 pr-4 text-[#2c333e] align-top whitespace-nowrap font-normal">
                      {item.date}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Number of Entries */}
        <div className="mt-8 pt-4 text-[#2c333e] select-none text-[13px] border-t border-[#f1f3f5]">
          <span>Number of Entries: </span>
          <span className="font-bold">{reviews.length}</span>
        </div>
      </div>
    </div>
  );
}
