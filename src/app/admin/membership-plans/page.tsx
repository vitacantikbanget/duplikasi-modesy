"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Home, ChevronDown, Plus, Edit, Trash2, CheckCircle } from "lucide-react";

interface PlanItem {
  id: number;
  title: string;
  price: string;
  numberDays: number;
  productLimit: number;
  isPopular: boolean;
  order: number;
}

const INITIAL_PLANS: PlanItem[] = [
  { id: 1, title: "Standard Vendor", price: "$15.00", numberDays: 30, productLimit: 50, isPopular: false, order: 1 },
  { id: 2, title: "Silver Store", price: "$29.00", numberDays: 30, productLimit: 250, isPopular: true, order: 2 },
  { id: 3, title: "Gold Enterprise", price: "$199.00", numberDays: 365, productLimit: 1000, isPopular: false, order: 3 },
];

export default function MembershipPlansPage() {
  const [plans, setPlans] = useState<PlanItem[]>(INITIAL_PLANS);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("19.00");
  const [numberDays, setNumberDays] = useState(30);
  const [productLimit, setProductLimit] = useState(100);
  const [order, setOrder] = useState(4);
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newPlan: PlanItem = {
      id: Date.now(),
      title: title.trim(),
      price: `$${price}`,
      numberDays: Number(numberDays),
      productLimit: Number(productLimit),
      isPopular: false,
      order: Number(order) || plans.length + 1,
    };

    setPlans([...plans, newPlan]);
    setTitle("");
    setNotification("Membership plan created successfully!");
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this plan?")) {
      setPlans(plans.filter((p) => p.id !== id));
      setActiveMenuId(null);
      setNotification("Plan deleted!");
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="w-full text-[#333333] pb-12">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h1 className="text-[24px] font-normal text-[#333333] m-0">
          Membership Plans <small className="text-[14px] text-gray-500 font-light">Membership</small>
        </h1>
        <div className="text-[12px] text-gray-500 flex items-center space-x-1 mt-1 sm:mt-0">
          <Link href="/admin" className="text-[#333333] hover:text-[#3c8dbc] flex items-center gap-1">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <span>/</span>
          <span className="text-gray-400">Membership</span>
          <span>/</span>
          <span className="text-gray-600 font-medium">Membership Plans</span>
        </div>
      </div>

      {notification && (
        <div className="mb-4 px-4 py-3 bg-[#d4edda] border border-[#c3e6cb] text-[#155724] rounded-[3px] text-[13px] flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          {notification}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: Add Plan Box */}
        <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border-t-[3px] border-[#3c8dbc] border-x border-b border-[#d2d6de]/60 h-fit">
          <div className="px-5 py-3 border-b border-[#f4f4f4]">
            <h3 className="text-[#333333] text-[16px] font-semibold">Add Plan</h3>
          </div>
          <form onSubmit={handleAdd} className="p-5 space-y-4">
            <div>
              <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">Plan Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Platinum Store"
                className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
              />
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">Price ($) *</label>
              <input
                type="number"
                step="0.01"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
              />
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">Number of Days *</label>
              <input
                type="number"
                required
                value={numberDays}
                onChange={(e) => setNumberDays(Number(e.target.value))}
                className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
              />
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">Product Limit *</label>
              <input
                type="number"
                required
                value={productLimit}
                onChange={(e) => setProductLimit(Number(e.target.value))}
                className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
              />
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">Order</label>
              <input
                type="number"
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
                className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
              />
            </div>

            <div className="pt-3 border-t border-[#f4f4f4] flex justify-end">
              <button
                type="submit"
                className="bg-[#00a65a] hover:bg-[#008d4c] text-white px-5 py-2 rounded-[3px] text-[13px] font-medium shadow-2xs transition-colors"
              >
                Add Plan
              </button>
            </div>
          </form>
        </div>

        {/* Right: Plans Table Box */}
        <div className="lg:col-span-2 bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border-t-[3px] border-[#3c8dbc] border-x border-b border-[#d2d6de]/60 p-5">
          <div className="mb-4">
            <h3 className="text-[#333333] text-[16px] font-semibold">Membership Plans</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px] text-[#333333] border border-[#f4f4f4] border-collapse">
              <thead>
                <tr className="bg-[#f4f4f4] text-[#333333] font-semibold text-[13px] border-b border-[#d2d6de]">
                  <th className="px-4 py-2.5 w-12 text-center">Id</th>
                  <th className="px-4 py-2.5">Title</th>
                  <th className="px-4 py-2.5">Price</th>
                  <th className="px-4 py-2.5 text-center">Number of Days</th>
                  <th className="px-4 py-2.5 text-center">Product Limit</th>
                  <th className="px-4 py-2.5 text-right w-24">Options</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((item) => (
                  <tr key={item.id} className="border-b border-[#f4f4f4] hover:bg-[#f9f9f9] transition-colors">
                    <td className="px-4 py-3 text-center text-gray-500">{item.id}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {item.title}
                      {item.isPopular && (
                        <span className="ml-2 bg-[#00a65a] text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-[2px]">
                          Popular
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-800">{item.price}</td>
                    <td className="px-4 py-3 text-center text-gray-600">{item.numberDays}</td>
                    <td className="px-4 py-3 text-center text-gray-600">{item.productLimit}</td>
                    <td className="px-4 py-3 text-right relative">
                      <div className="inline-block text-left">
                        <button
                          type="button"
                          onClick={() => setActiveMenuId(activeMenuId === item.id ? null : item.id)}
                          className="bg-[#00c0ef] hover:bg-[#00acd6] text-white text-[12px] font-medium px-2.5 py-1 rounded-[2px] inline-flex items-center gap-1 shadow-2xs"
                        >
                          Options <ChevronDown className="w-3 h-3" />
                        </button>
                        {activeMenuId === item.id && (
                          <div className="absolute right-0 mt-1 w-32 bg-white rounded-[3px] shadow-lg border border-gray-200 py-1 z-20">
                            <button
                              onClick={() => {
                                const newTitle = prompt("Edit plan title:", item.title);
                                if (newTitle) {
                                  setPlans(plans.map((p) => (p.id === item.id ? { ...p, title: newTitle } : p)));
                                }
                                setActiveMenuId(null);
                              }}
                              className="w-full text-left px-3 py-1.5 text-[12px] text-gray-700 hover:bg-gray-100 flex items-center gap-1.5"
                            >
                              <Edit className="w-3.5 h-3.5 text-[#3c8dbc]" /> Edit
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="w-full text-left px-3 py-1.5 text-[12px] text-red-600 hover:bg-gray-100 flex items-center gap-1.5"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
