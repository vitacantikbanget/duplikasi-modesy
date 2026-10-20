"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  ShoppingCart, 
  Banknote, 
  ShoppingBasket, 
  Hourglass, 
  Minus, 
  X, 
  Star 
} from "lucide-react";

export default function VendorDashboardOverview() {
  const [commentsVisible, setCommentsVisible] = useState(true);
  const [reviewsVisible, setReviewsVisible] = useState(true);
  const [salesVisible, setSalesVisible] = useState(true);

  return (
    <div className="space-y-6">
      
      {/* ROW 1: 4 TOP STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Sales */}
        <div className="bg-white rounded-[3px] border border-[#e4e7ea] p-5 flex items-center justify-between shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
          <div>
            <h2 className="text-[32px] font-bold text-[#2d3436] leading-none mb-1.5">32</h2>
            <p className="text-[13px] text-[#7f8c8d]">Number of total sales</p>
          </div>
          <div className="text-[#a4b0be] opacity-70">
            <ShoppingCart className="w-10 h-10 stroke-[1.5]" />
          </div>
        </div>

        {/* Card 2: Balance */}
        <div className="bg-white rounded-[3px] border border-[#e4e7ea] p-5 flex items-center justify-between shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
          <div>
            <h2 className="text-[32px] font-bold text-[#2d3436] leading-none mb-1.5">$1,246.15</h2>
            <p className="text-[13px] text-[#7f8c8d]">Balance</p>
          </div>
          <div className="text-[#a4b0be] opacity-70">
            <Banknote className="w-10 h-10 stroke-[1.5]" />
          </div>
        </div>

        {/* Card 3: Products */}
        <div className="bg-white rounded-[3px] border border-[#e4e7ea] p-5 flex items-center justify-between shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
          <div>
            <h2 className="text-[32px] font-bold text-[#2d3436] leading-none mb-1.5">23</h2>
            <p className="text-[13px] text-[#7f8c8d]">Products</p>
          </div>
          <div className="text-[#a4b0be] opacity-70">
            <ShoppingBasket className="w-10 h-10 stroke-[1.5]" />
          </div>
        </div>

        {/* Card 4: Pending Products */}
        <div className="bg-white rounded-[3px] border border-[#e4e7ea] p-5 flex items-center justify-between shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
          <div>
            <h2 className="text-[32px] font-bold text-[#2d3436] leading-none mb-1.5">0</h2>
            <p className="text-[13px] text-[#7f8c8d]">Pending Products</p>
          </div>
          <div className="text-[#a4b0be] opacity-70">
            <Hourglass className="w-10 h-10 stroke-[1.5]" />
          </div>
        </div>

      </div>

      {/* ROW 2: CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Widget 1: Donut Chart (Sales) */}
        <div className="lg:col-span-5 bg-white rounded-[3px] border border-[#e4e7ea] shadow-[0_1px_1px_rgba(0,0,0,0.05)] flex flex-col">
          <div className="px-5 py-3.5 border-b border-[#f1f3f5] flex items-center justify-between">
            <h3 className="text-[14px] font-semibold text-[#444]">Sales</h3>
            <div className="flex items-center gap-1 text-gray-400">
              <button className="p-1 hover:text-gray-700 hover:bg-gray-100 rounded-[2px]"><Minus className="w-3 h-3" /></button>
              <button className="p-1 hover:text-gray-700 hover:bg-gray-100 rounded-[2px]"><X className="w-3 h-3" /></button>
            </div>
          </div>

          <div className="p-6 flex flex-col items-center justify-center flex-1">
            {/* Chart Legend */}
            <div className="flex items-center justify-center gap-6 mb-6 text-xs text-gray-600 font-medium">
              <div className="flex items-center gap-2">
                <span className="w-5 h-2.5 bg-[#00c0ef] inline-block rounded-xs"></span>
                <span>Active Sales (25)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-2.5 bg-[#3c8dbc] inline-block rounded-xs"></span>
                <span>Completed Sales (7)</span>
              </div>
            </div>

            {/* SVG Donut Chart */}
            <div className="relative w-56 h-56 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {/* Background circle / Hole */}
                <circle cx="50" cy="50" r="36" fill="transparent" stroke="#f1f3f5" strokeWidth="24" />
                
                {/* Active Sales Segment: 25 / 32 = 78.125% -> 176.7 / 226.2 */}
                <circle
                  cx="50"
                  cy="50"
                  r="36"
                  fill="transparent"
                  stroke="#00c0ef"
                  strokeWidth="24"
                  strokeDasharray="176.7 226.2"
                  strokeDashoffset="0"
                />

                {/* Completed Sales Segment: 7 / 32 = 21.875% -> 49.5 / 226.2 */}
                <circle
                  cx="50"
                  cy="50"
                  r="36"
                  fill="transparent"
                  stroke="#3c8dbc"
                  strokeWidth="24"
                  strokeDasharray="49.5 226.2"
                  strokeDashoffset="-176.7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Widget 2: Line / Area Chart (Monthly sales) */}
        <div className="lg:col-span-7 bg-white rounded-[3px] border border-[#e4e7ea] shadow-[0_1px_1px_rgba(0,0,0,0.05)] flex flex-col">
          <div className="px-5 py-3.5 border-b border-[#f1f3f5] flex items-center justify-between">
            <h3 className="text-[14px] font-semibold text-[#444]">Monthly sales</h3>
            <div className="flex items-center gap-1 text-gray-400">
              <button className="p-1 hover:text-gray-700 hover:bg-gray-100 rounded-[2px]"><Minus className="w-3 h-3" /></button>
              <button className="p-1 hover:text-gray-700 hover:bg-gray-100 rounded-[2px]"><X className="w-3 h-3" /></button>
            </div>
          </div>

          <div className="p-6 flex flex-col flex-1">
            {/* Chart Legend */}
            <div className="flex items-center justify-center gap-2 mb-4 text-xs text-gray-600 font-medium">
              <div className="flex items-center gap-1.5 border border-[#00c0ef] px-2 py-0.5 rounded-xs">
                <span className="w-3 h-1 bg-[#00c0ef]"></span>
                <span className="text-[11px] text-[#333]">Sales (2026)</span>
              </div>
            </div>

            {/* Chart Graphic Area */}
            <div className="w-full h-64 relative">
              <svg viewBox="0 0 600 240" className="w-full h-full overflow-visible">
                {/* Horizontal Grid lines (0 to 100000 in 10000 steps) */}
                {[
                  { label: "$100000", y: 15 },
                  { label: "$90000", y: 36 },
                  { label: "$80000", y: 57 },
                  { label: "$70000", y: 78 },
                  { label: "$60000", y: 99 },
                  { label: "$50000", y: 120 },
                  { label: "$40000", y: 141 },
                  { label: "$30000", y: 162 },
                  { label: "$20000", y: 183 },
                  { label: "$10000", y: 204 },
                  { label: "$0", y: 225 },
                ].map((grid, idx) => (
                  <g key={idx}>
                    <text x="42" y={grid.y + 3} textAnchor="end" fontSize="8.5" fill="#999" fontFamily="sans-serif">
                      {grid.label}
                    </text>
                    <line x1="48" y1={grid.y} x2="585" y2={grid.y} stroke="#f0f2f4" strokeWidth="1" />
                  </g>
                ))}

                {/* X-axis months */}
                {[
                  { m: "Jan", x: 65 },
                  { m: "Feb", x: 110 },
                  { m: "Mar", x: 155 },
                  { m: "Apr", x: 200 },
                  { m: "May", x: 245 },
                  { m: "Jun", x: 290 },
                  { m: "Jul", x: 335 },
                  { m: "Aug", x: 380 },
                  { m: "Sep", x: 425 },
                  { m: "Oct", x: 470 },
                  { m: "Nov", x: 515 },
                  { m: "Dec", x: 560 },
                ].map((item, idx) => (
                  <text key={idx} x={item.x} y="239" textAnchor="middle" fontSize="9.5" fill="#777" fontFamily="sans-serif">
                    {item.m}
                  </text>
                ))}

                {/* Gradient Definition */}
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00c0ef" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#00c0ef" stopOpacity="0.02" />
                  </linearGradient>
                </defs>

                {/* Area Fill: flat at 225, smooth peak up to ~52 at Sep (x=425) */}
                <path
                  d="M 65 225 L 110 225 L 155 225 L 200 225 L 245 225 L 290 225 L 335 225 L 380 225 C 395 225, 410 52, 425 52 C 440 52, 455 225, 470 225 L 515 225 L 560 225 Z"
                  fill="url(#salesGrad)"
                />

                {/* Smooth Curve Line */}
                <path
                  d="M 65 225 L 110 225 L 155 225 L 200 225 L 245 225 L 290 225 L 335 225 L 380 225 C 395 225, 410 52, 425 52 C 440 52, 455 225, 470 225 L 515 225 L 560 225"
                  fill="none"
                  stroke="#00c0ef"
                  strokeWidth="2.5"
                />

                {/* Data Points */}
                {[
                  { x: 65, y: 225 },
                  { x: 110, y: 225 },
                  { x: 155, y: 225 },
                  { x: 200, y: 225 },
                  { x: 245, y: 225 },
                  { x: 290, y: 225 },
                  { x: 335, y: 225 },
                  { x: 380, y: 225 },
                  { x: 425, y: 52 },
                  { x: 470, y: 225 },
                  { x: 515, y: 225 },
                  { x: 560, y: 225 },
                ].map((pt, i) => (
                  <circle key={i} cx={pt.x} cy={pt.y} r="3" fill="#00c0ef" stroke="#fff" strokeWidth="1" />
                ))}
              </svg>
            </div>
          </div>
        </div>

      </div>

      {/* ROW 3: LATEST COMMENTS & LATEST REVIEWS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Latest Comments Widget (Empty state matching live screenshot) */}
        {commentsVisible && (
          <div className="bg-white rounded-[3px] border border-[#e4e7ea] shadow-[0_1px_1px_rgba(0,0,0,0.05)] flex flex-col min-h-[220px]">
            <div className="px-5 py-3.5 border-b border-[#f1f3f5] flex items-center justify-between">
              <h3 className="text-[14px] font-semibold text-[#444]">Latest Comments</h3>
              <div className="flex items-center gap-1 text-gray-400">
                <button className="p-1 hover:text-gray-700 hover:bg-gray-100 rounded-[2px]"><Minus className="w-3 h-3" /></button>
                <button onClick={() => setCommentsVisible(false)} className="p-1 hover:text-gray-700 hover:bg-gray-100 rounded-[2px]"><X className="w-3 h-3" /></button>
              </div>
            </div>

            <div className="p-0 overflow-x-auto flex-1">
              <table className="w-full text-[13px] text-left">
                <thead className="text-[12px] text-gray-700 border-b border-[#f1f3f5] font-semibold">
                  <tr>
                    <th className="px-5 py-2.5 w-12 font-medium">Id</th>
                    <th className="px-5 py-2.5 font-medium">Comment</th>
                    <th className="px-5 py-2.5 font-medium">Product</th>
                    <th className="px-5 py-2.5 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Empty state matching live screenshot */}
                </tbody>
              </table>
            </div>

            <div className="p-3 border-t border-[#f1f3f5] bg-white flex justify-end">
              <Link 
                href="/dashboard/comments"
                className="text-[12px] bg-[#f4f4f4] hover:bg-[#e7e7e7] text-[#444] border border-[#ddd] px-3 py-1 rounded-[3px] transition-colors"
              >
                View All
              </Link>
            </div>
          </div>
        )}

        {/* Latest Reviews Widget */}
        {reviewsVisible && (
          <div className="bg-white rounded-[3px] border border-[#e4e7ea] shadow-[0_1px_1px_rgba(0,0,0,0.05)] flex flex-col min-h-[220px]">
            <div className="px-5 py-3.5 border-b border-[#f1f3f5] flex items-center justify-between">
              <h3 className="text-[14px] font-semibold text-[#444]">Latest Reviews</h3>
              <div className="flex items-center gap-1 text-gray-400">
                <button className="p-1 hover:text-gray-700 hover:bg-gray-100 rounded-[2px]"><Minus className="w-3 h-3" /></button>
                <button onClick={() => setReviewsVisible(false)} className="p-1 hover:text-gray-700 hover:bg-gray-100 rounded-[2px]"><X className="w-3 h-3" /></button>
              </div>
            </div>

            <div className="p-0 overflow-x-auto flex-1">
              <table className="w-full text-[13px] text-left">
                <thead className="text-[12px] text-gray-700 border-b border-[#f1f3f5] font-semibold">
                  <tr>
                    <th className="px-5 py-2.5 w-12 font-medium">Id</th>
                    <th className="px-5 py-2.5 font-medium">Comment</th>
                    <th className="px-5 py-2.5 font-medium">Product</th>
                    <th className="px-5 py-2.5 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f8f9fa] text-gray-700">
                  <tr className="hover:bg-[#fafafa]">
                    <td className="px-5 py-3 text-gray-500 align-top">6</td>
                    <td className="px-5 py-3 max-w-sm">
                      <div className="flex items-center gap-0.5 text-yellow-500 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-600 text-[12px] leading-relaxed">
                        The material feels durable, and the design is sleek enough to match both casual and formal outfits. It has plenty of space inside without being too bulky, and the strap is comfortable for carrying all day.
                      </p>
                    </td>
                    <td className="px-5 py-3 text-[#337ab7] hover:underline cursor-pointer align-top">
                      Black bag over the shoulder
                    </td>
                    <td className="px-5 py-3 text-gray-500 whitespace-nowrap align-top">2026-08-05 / 13:55</td>
                  </tr>

                  <tr className="hover:bg-[#fafafa]">
                    <td className="px-5 py-3 text-gray-500 align-top">5</td>
                    <td className="px-5 py-3 max-w-sm">
                      <div className="flex items-center gap-0.5 text-yellow-500 mb-1">
                        {[...Array(4)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-600 text-[12px] leading-relaxed">
                        The floral women sundre
                      </p>
                    </td>
                    <td className="px-5 py-3 text-[#337ab7] hover:underline cursor-pointer align-top">
                      Floral women sundress
                    </td>
                    <td className="px-5 py-3 text-gray-500 whitespace-nowrap align-top">2026-08-05 / 13:55</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-3 border-t border-[#f1f3f5] bg-white flex justify-end">
              <Link 
                href="/dashboard/reviews"
                className="text-[12px] bg-[#f4f4f4] hover:bg-[#e7e7e7] text-[#444] border border-[#ddd] px-3 py-1 rounded-[3px] transition-colors"
              >
                View All
              </Link>
            </div>
          </div>
        )}

      </div>

      {/* ROW 4: LATEST SALES WIDGET */}
      {salesVisible && (
        <div className="bg-white rounded-[3px] border border-[#e4e7ea] shadow-[0_1px_1px_rgba(0,0,0,0.05)] flex flex-col">
          <div className="px-5 py-3.5 border-b border-[#f1f3f5] flex items-center justify-between">
            <h3 className="text-[14px] font-semibold text-[#444]">Latest Sales</h3>
            <div className="flex items-center gap-1 text-gray-400">
              <button className="p-1 hover:text-gray-700 hover:bg-gray-100 rounded-[2px]"><Minus className="w-3 h-3" /></button>
              <button onClick={() => setSalesVisible(false)} className="p-1 hover:text-gray-700 hover:bg-gray-100 rounded-[2px]"><X className="w-3 h-3" /></button>
            </div>
          </div>

          <div className="p-0 overflow-x-auto flex-1">
            <table className="w-full text-[13px] text-left">
              <thead className="text-[12px] text-gray-700 border-b border-[#f1f3f5] font-semibold">
                <tr>
                  <th className="px-5 py-2.5 font-medium">Sale</th>
                  <th className="px-5 py-2.5 font-medium">Status</th>
                  <th className="px-5 py-2.5 font-medium">Payment</th>
                  <th className="px-5 py-2.5 font-medium">Date</th>
                  <th className="px-5 py-2.5 text-right font-medium">Options</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f8f9fa] text-gray-700">
                {[
                  { sale: "#10044", status: "Processing", payment: "Pending Payment", date: "2026-10-14 / 20:42" },
                  { sale: "#10043", status: "Processing", payment: "Pending Payment", date: "2026-10-14 / 19:49" },
                  { sale: "#10042", status: "Processing", payment: "Payment Received", date: "2026-10-12 / 19:26" },
                  { sale: "#10040", status: "Processing", payment: "Pending Payment", date: "2026-09-29 / 12:00" },
                  { sale: "#10039", status: "Processing", payment: "Pending Payment", date: "2026-09-29 / 00:34" },
                  { sale: "#10038", status: "Processing", payment: "Pending Payment", date: "2026-09-28 / 22:48" },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#fafafa]">
                    <td className="px-5 py-3 text-[#337ab7] font-medium">{row.sale}</td>
                    <td className="px-5 py-3">
                      <span className="text-[#333]">{row.status}</span>
                    </td>
                    <td className="px-5 py-3 text-gray-600">{row.payment}</td>
                    <td className="px-5 py-3 text-gray-500 whitespace-nowrap">{row.date}</td>
                    <td className="px-5 py-3 text-right">
                      <button 
                        onClick={() => alert(`View details for ${row.sale}`)}
                        className="bg-[#00c0ef] hover:bg-[#00acd6] text-white text-[11px] font-bold px-3 py-1 rounded-[3px] transition-colors cursor-pointer"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 border-t border-[#f1f3f5] bg-white flex justify-end">
            <Link 
              href="/dashboard/sales"
              className="text-[12px] bg-[#f4f4f4] hover:bg-[#e7e7e7] text-[#444] border border-[#ddd] px-3 py-1 rounded-[3px] transition-colors"
            >
              View All
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
