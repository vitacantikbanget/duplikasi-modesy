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
    id: 8,
    user: "Admin",
    rating: 5,
    reviewText: "dfg",
    product: "Animal colorful digital prints",
    productSlug: "animal-colorful-digital-prints",
    date: "2026-10-05 / 11:43",
  },
  {
    id: 4,
    user: "Peter Jone",
    rating: 5,
    reviewText: "Test 1",
    product: "Animal colorful digital prints",
    productSlug: "animal-colorful-digital-prints",
    date: "2026-09-03 / 22:40",
  },
  {
    id: 7,
    user: "Admin",
    rating: 5,
    reviewText:
      "The summer fashion lace top is absolutely beautiful! The lace detailing gives it a very elegant and feminine look, while the fabric is light and breathable perfect for warm weather. It fits nicely and pairs well with both jeans and skirts. Stylish, comfortable, and versatile highly recommend!",
    product: "Summer fashion top lace",
    productSlug: "summer-fashion-top-lace",
    date: "2026-08-05 / 14:04",
  },
  {
    id: 2,
    user: "Admin",
    rating: 5,
    reviewText:
      "The visuals are vibrant, and it really captures the essence of each vacation spot. It's both informative and entertaining, making me want to visit every location featured. Highly recommended for travel enthusiasts!",
    product: "Animation of popular vacation spots",
    productSlug: "animation-of-popular-vacation-spots",
    date: "2026-08-04 / 15:02",
  },
  {
    id: 1,
    user: "Admin",
    rating: 5,
    reviewText:
      "The light blue color is soft and flattering, and the fabric feels high-quality and breathable. It fits perfectly and looks great both casually and at work. Definitely a wardrobe favorite!",
    product: "Light blue women shirt",
    productSlug: "light-blue-women-shirt",
    date: "2026-08-04 / 15:01",
  },
  {
    id: 3,
    user: "Admin",
    rating: 4,
    reviewText:
      "This skirt is beautiful and the floral pattern is very charming. The material feels nice and it drapes well. I gave it 4 stars because the sizing runs a little small, but overall it's a lovely addition to my wardrobe.",
    product: "Black midi skirt with white flowers",
    productSlug: "black-midi-skirt-with-white-flowers",
    date: "2026-08-04 / 15:01",
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
        <div className="mt-8 pt-4 text-[#2c333e] select-none text-[13px]">
          <span>Number of Entries: </span>
          <span className="font-bold">{reviews.length}</span>
        </div>
      </div>
    </div>
  );
}
