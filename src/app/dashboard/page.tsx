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
            <h2 className="text-[32px] font-bold text-[#2d3436] leading-none mb-1.5">28</h2>
            <p className="text-[13px] text-[#7f8c8d]">Number of total sales</p>
          </div>
          <div className="text-[#a4b0be] opacity-70">
            <ShoppingCart className="w-10 h-10 stroke-[1.5]" />
          </div>
        </div>

        {/* Card 2: Balance */}
        <div className="bg-white rounded-[3px] border border-[#e4e7ea] p-5 flex items-center justify-between shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
          <div>
            <h2 className="text-[32px] font-bold text-[#2d3436] leading-none mb-1.5">$793.52</h2>
            <p className="text-[13px] text-[#7f8c8d]">Balance</p>
          </div>
          <div className="text-[#a4b0be] opacity-70">
            <Banknote className="w-10 h-10 stroke-[1.5]" />
          </div>
        </div>

        {/* Card 3: Products */}
        <div className="bg-white rounded-[3px] border border-[#e4e7ea] p-5 flex items-center justify-between shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
          <div>
            <h2 className="text-[32px] font-bold text-[#2d3436] leading-none mb-1.5">24</h2>
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
                <span>Active Sales (17)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-2.5 bg-[#3c8dbc] inline-block rounded-xs"></span>
                <span>Completed Sales (11)</span>
              </div>
            </div>

            {/* SVG Donut Chart */}
            <div className="relative w-56 h-56 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {/* Background circle / Hole */}
                <circle cx="50" cy="50" r="36" fill="transparent" stroke="#f1f3f5" strokeWidth="24" />
                
                {/* Active Sales Segment: 17/(17+11) = 60.7% = 60.7 * 2.2619 = 137.3 */}
                {/* Circumference for r=36 is 2 * Math.PI * 36 = 226.2 */}
                <circle
                  cx="50"
                  cy="50"
                  r="36"
                  fill="transparent"
                  stroke="#00c0ef"
                  strokeWidth="24"
                  strokeDasharray="137.3 226.2"
                  strokeDashoffset="0"
                />

                {/* Completed Sales Segment: 11/28 = 39.3% = 88.9 */}
                <circle
                  cx="50"
                  cy="50"
                  r="36"
                  fill="transparent"
                  stroke="#3c8dbc"
                  strokeWidth="24"
                  strokeDasharray="88.9 226.2"
                  strokeDashoffset="-137.3"
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
                <span className="text-[11px]">Sales (2026)</span>
              </div>
            </div>

            {/* Chart Graphic Area */}
            <div className="w-full h-64 relative">
              <svg viewBox="0 0 600 240" className="w-full h-full overflow-visible">
                {/* Horizontal Grid lines */}
                {[
                  { label: "$60000", y: 20 },
                  { label: "$50000", y: 55 },
                  { label: "$40000", y: 90 },
                  { label: "$30000", y: 125 },
                  { label: "$20000", y: 160 },
                  { label: "$10000", y: 195 },
                  { label: "$0", y: 230 },
                ].map((grid, idx) => (
                  <g key={idx}>
                    <text x="35" y={grid.y + 3} textAnchor="end" fontSize="9" fill="#999" fontFamily="sans-serif">
                      {grid.label}
                    </text>
                    <line x1="45" y1={grid.y} x2="585" y2={grid.y} stroke="#edf0f2" strokeWidth="1" />
                  </g>
                ))}

                {/* X-axis months */}
                {[
                  { m: "Jan", x: 60 },
                  { m: "Feb", x: 105 },
                  { m: "Mar", x: 150 },
                  { m: "Apr", x: 195 },
                  { m: "May", x: 240 },
                  { m: "Jun", x: 285 },
                  { m: "Jul", x: 330 },
                  { m: "Aug", x: 375 },
                  { m: "Sep", x: 420 },
                  { m: "Oct", x: 465 },
                  { m: "Nov", x: 510 },
                  { m: "Dec", x: 555 },
                ].map((item, idx) => (
                  <text key={idx} x={item.x} y="248" textAnchor="middle" fontSize="10" fill="#777" fontFamily="sans-serif">
                    {item.m}
                  </text>
                ))}

                {/* Gradient Definition */}
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00c0ef" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#00c0ef" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Area Fill */}
                <path
                  d="M 60 230 L 105 230 L 150 230 L 195 230 L 240 230 L 285 230 L 330 230 L 375 230 C 390 230, 405 55, 420 55 C 435 55, 450 230, 465 230 L 510 230 L 555 230 Z"
                  fill="url(#salesGrad)"
                />

                {/* Smooth Curve Line */}
                <path
                  d="M 60 230 L 105 230 L 150 230 L 195 230 L 240 230 L 285 230 L 330 230 L 375 230 C 390 230, 405 55, 420 55 C 435 55, 450 230, 465 230 L 510 230 L 555 230"
                  fill="none"
                  stroke="#00c0ef"
                  strokeWidth="2.5"
                />

                {/* Data Points */}
                {[
                  { x: 60, y: 230 },
                  { x: 105, y: 230 },
                  { x: 150, y: 230 },
                  { x: 195, y: 230 },
                  { x: 240, y: 230 },
                  { x: 285, y: 230 },
                  { x: 330, y: 230 },
                  { x: 375, y: 230 },
                  { x: 420, y: 55 },
                  { x: 465, y: 230 },
                  { x: 510, y: 230 },
                  { x: 555, y: 230 },
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
        
        {/* Latest Comments Widget */}
        {commentsVisible && (
          <div className="bg-white rounded-[3px] border border-[#e4e7ea] shadow-[0_1px_1px_rgba(0,0,0,0.05)] flex flex-col">
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
                    <th className="px-5 py-2.5 w-12">Id</th>
                    <th className="px-5 py-2.5">Comment</th>
                    <th className="px-5 py-2.5">Product</th>
                    <th className="px-5 py-2.5">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f8f9fa] text-gray-700">
                  <tr className="hover:bg-[#fafafa]">
                    <td className="px-5 py-3 text-gray-500">1</td>
                    <td className="px-5 py-3 font-medium">good</td>
                    <td className="px-5 py-3 text-[#337ab7] hover:underline cursor-pointer">
                      Women lace blouse with different colors
                    </td>
                    <td className="px-5 py-3 text-gray-500 whitespace-nowrap">2026-09-13 / 14:16</td>
                  </tr>
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
          <div className="bg-white rounded-[3px] border border-[#e4e7ea] shadow-[0_1px_1px_rgba(0,0,0,0.05)] flex flex-col">
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
                    <th className="px-5 py-2.5 w-12">Id</th>
                    <th className="px-5 py-2.5">Comment</th>
                    <th className="px-5 py-2.5">Product</th>
                    <th className="px-5 py-2.5">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f8f9fa] text-gray-700">
                  <tr className="hover:bg-[#fafafa]">
                    <td className="px-5 py-3 text-gray-500">8</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-0.5 text-yellow-500 mb-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-gray-600">dfg</span>
                    </td>
                    <td className="px-5 py-3 text-[#337ab7] hover:underline cursor-pointer">
                      Animal colorful digital prints
                    </td>
                    <td className="px-5 py-3 text-gray-500 whitespace-nowrap">2026-10-05 / 11:43</td>
                  </tr>

                  <tr className="hover:bg-[#fafafa]">
                    <td className="px-5 py-3 text-gray-500">4</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-0.5 text-yellow-500 mb-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-gray-600">Test 1</span>
                    </td>
                    <td className="px-5 py-3 text-[#337ab7] hover:underline cursor-pointer">
                      Animal colorful digital prints
                    </td>
                    <td className="px-5 py-3 text-gray-500 whitespace-nowrap">2026-09-03 / 22:40</td>
                  </tr>

                  <tr className="hover:bg-[#fafafa]">
                    <td className="px-5 py-3 text-gray-500">7</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-0.5 text-yellow-500 mb-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-gray-600 text-[12px] line-clamp-2">
                        The summer fashion lace top is absolutely beautiful! The lace detailing gives it a ver...
                      </span>
                    </td>
                    <td className="px-5 py-3 text-[#337ab7] hover:underline cursor-pointer">
                      Summer fashion top lace
                    </td>
                    <td className="px-5 py-3 text-gray-500 whitespace-nowrap">2026-08-05 / 14:04</td>
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
                  <th className="px-5 py-2.5">Sale</th>
                  <th className="px-5 py-2.5">Status</th>
                  <th className="px-5 py-2.5">Payment</th>
                  <th className="px-5 py-2.5">Date</th>
                  <th className="px-5 py-2.5 text-right">Options</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f8f9fa] text-gray-700">
                {[
                  { sale: "#10041", status: "Processing", payment: "Pending Payment", date: "2026-10-05 / 15:38" },
                  { sale: "#10040", status: "Processing", payment: "Pending Payment", date: "2026-09-29 / 12:00" },
                  { sale: "#10038", status: "Processing", payment: "Pending Payment", date: "2026-09-28 / 22:48" },
                  { sale: "#10035", status: "Processing", payment: "Pending Payment", date: "2026-09-26 / 21:14" },
                  { sale: "#10034", status: "Processing", payment: "Pending Payment", date: "2026-09-25 / 06:11" },
                  { sale: "#10033", status: "Completed", payment: "Payment", date: "2026-09-23 / 17:23" },
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
