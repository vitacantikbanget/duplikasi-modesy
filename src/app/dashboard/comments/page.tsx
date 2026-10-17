"use client";

import { useState } from "react";
import Link from "next/link";

export interface CommentItem {
  id: number;
  username: string;
  comment: string;
  product: string;
  productSlug?: string;
  date: string;
}

export const INITIAL_COMMENTS: CommentItem[] = [
  {
    id: 1,
    username: "Peter Jone",
    comment: "good",
    product: "Women lace blouse with different colors",
    productSlug: "women-lace-blouse-with-different-colors",
    date: "2026-09-13 / 14:16",
  },
];

export default function CommentsPage() {
  const [comments] = useState<CommentItem[]>(INITIAL_COMMENTS);

  return (
    <div className="w-full">
      <div className="bg-white rounded-[4px] border border-[#e9ecef] p-6 lg:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        {/* Page Title */}
        <h1 className="text-[19px] font-bold text-[#2c333e] mb-7 font-sans">
          Comments
        </h1>

        {/* Comments Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px] border-collapse min-w-[750px]">
            <thead>
              <tr className="text-[#2c333e] font-semibold text-[13px] border-b border-[#f1f3f5]">
                <th className="pb-3.5 pr-4 pl-1 font-semibold w-[60px]">Id</th>
                <th className="pb-3.5 pr-4 font-semibold w-[160px]">Username</th>
                <th className="pb-3.5 pr-4 font-semibold w-[220px]">Comment</th>
                <th className="pb-3.5 pr-4 font-semibold">Product</th>
                <th className="pb-3.5 pr-4 font-semibold w-[180px]">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f8f9fa]">
              {comments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-[#6c757d] text-[13px]">
                    No records found!
                  </td>
                </tr>
              ) : (
                comments.map((item) => (
                  <tr key={item.id} className="hover:bg-[#fafbfc] transition-colors">
                    <td className="py-4 pr-4 pl-1 text-[#2c333e] align-middle font-normal">
                      {item.id}
                    </td>
                    <td className="py-4 pr-4 text-[#2c333e] align-middle font-normal">
                      {item.username}
                    </td>
                    <td className="py-4 pr-4 text-[#2c333e] align-middle font-normal">
                      {item.comment}
                    </td>
                    <td className="py-4 pr-4 text-[#2c333e] align-middle font-normal">
                      <Link
                        href={`/product/${item.productSlug || "women-lace-blouse-with-different-colors"}`}
                        className="text-[#2c333e] hover:text-[#00ab97] transition-colors hover:underline"
                      >
                        {item.product}
                      </Link>
                    </td>
                    <td className="py-4 pr-4 text-[#2c333e] align-middle whitespace-nowrap font-normal">
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
          <span className="font-bold">{comments.length}</span>
        </div>
      </div>
    </div>
  );
}
