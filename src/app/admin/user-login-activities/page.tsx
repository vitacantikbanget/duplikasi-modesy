"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Home, Trash2 } from "lucide-react";

interface LoginActivity {
  id: number;
  user: string;
  email: string;
  ipAddress: string;
  userAgent: string;
  date: string;
}

const INITIAL_ACTIVITIES: LoginActivity[] = [
  { id: 48, user: "admin", email: "admin@codingest.net", ipAddress: "192.168.1.1", userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/129.0", date: "2026-10-19 / 22:50" },
  { id: 47, user: "Trendshop", email: "trendshop@codingest.net", ipAddress: "192.168.1.10", userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/605.1", date: "2026-10-19 / 18:22" },
  { id: 46, user: "James Baronie", email: "james@codingest.net", ipAddress: "192.168.1.15", userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0) Mobile/15E148", date: "2026-10-18 / 14:15" },
  { id: 45, user: "Linda Martin", email: "linda@codingest.net", ipAddress: "192.168.1.22", userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Edge/128.0", date: "2026-10-17 / 11:30" },
  { id: 44, user: "Alex Miller", email: "alex@codingest.net", ipAddress: "192.168.1.44", userAgent: "Mozilla/5.0 (X11; Linux x86_64) Firefox/128.0", date: "2026-10-15 / 09:40" },
];

export default function UserLoginActivitiesPage() {
  const [activities, setActivities] = useState<LoginActivity[]>(INITIAL_ACTIVITIES);
  const [showCount, setShowCount] = useState(15);
  const [search, setSearch] = useState("");

  const filtered = activities.filter(
    (a) =>
      search === "" ||
      a.user.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase()) ||
      a.ipAddress.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full text-[#333333] pb-12">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h1 className="text-[24px] font-normal text-[#333333] m-0">
          User Login Activities <small className="text-[14px] text-gray-500 font-light">Membership</small>
        </h1>
        <div className="text-[12px] text-gray-500 flex items-center space-x-1 mt-1 sm:mt-0">
          <Link href="/admin" className="text-[#333333] hover:text-[#3c8dbc] flex items-center gap-1">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <span>/</span>
          <span className="text-gray-400">Membership</span>
          <span>/</span>
          <span className="text-gray-600 font-medium">User Login Activities</span>
        </div>
      </div>

      {/* Main Box */}
      <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border border-[#d2d6de]/60 p-5">
        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center space-x-2 text-[13px] text-gray-600">
            <span>Show</span>
            <select
              value={showCount}
              onChange={(e) => setShowCount(Number(e.target.value))}
              className="h-[34px] px-3 border border-[#d2d6de] rounded-[3px] bg-white text-[13px] text-gray-700 focus:outline-none focus:border-[#3c8dbc]"
            >
              <option value={15}>15</option>
              <option value={30}>30</option>
              <option value={60}>60</option>
              <option value={100}>100</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 focus:outline-none focus:border-[#3c8dbc] w-56"
            />
            <button className="h-[34px] bg-[#00c0ef] hover:bg-[#00acd6] text-white px-4 rounded-[3px] text-[13px] font-medium shadow-2xs">
              Search
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px] text-[#333333] border border-[#f4f4f4] border-collapse">
            <thead>
              <tr className="bg-[#f4f4f4] text-[#333333] font-semibold text-[13px] border-b border-[#d2d6de]">
                <th className="px-4 py-2.5 w-12 text-center">Id</th>
                <th className="px-4 py-2.5">User</th>
                <th className="px-4 py-2.5">Email</th>
                <th className="px-4 py-2.5">Ip Address</th>
                <th className="px-4 py-2.5">User Agent</th>
                <th className="px-4 py-2.5">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b border-[#f4f4f4] hover:bg-[#f9f9f9] transition-colors">
                  <td className="px-4 py-3 text-center text-gray-500">{item.id}</td>
                  <td className="px-4 py-3 font-medium text-[#3c8dbc] hover:underline cursor-pointer">{item.user}</td>
                  <td className="px-4 py-3 text-gray-600">{item.email}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-gray-700">{item.ipAddress}</td>
                  <td className="px-4 py-3 text-gray-500 max-w-sm truncate text-[12px]">{item.userAgent}</td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-[13px] text-gray-600 gap-2">
          <div>Showing 1 to {filtered.length} of {activities.length} entries</div>
          <div className="flex items-center space-x-1">
            <button className="px-3 py-1 border border-[#d2d6de] bg-white text-gray-600 text-[12px] rounded-[2px] hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1 border border-[#3c8dbc] bg-[#3c8dbc] text-white text-[12px] rounded-[2px]">1</button>
            <button className="px-3 py-1 border border-[#d2d6de] bg-white text-gray-600 text-[12px] rounded-[2px] hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
