"use client";

import { useState, useMemo } from "react";
import {
  Plus,
  SquarePen,
  Trash2,
  X,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

export interface ShippingZone {
  id: number;
  name: string;
  regions: string[];
  methods: string;
}

export interface DeliveryTime {
  id: number;
  option: string;
}

const INITIAL_ZONES: ShippingZone[] = [
  {
    id: 1,
    name: "International",
    regions: ["Europe", "Asia", "Africa", "South America"],
    methods: "Free Shipping, Flat Rate",
  },
  {
    id: 2,
    name: "Domestic",
    regions: ["North America/United States"],
    methods: "Free Shipping, Local Pickup, Flat Rate",
  },
];

const INITIAL_DELIVERY_TIMES: DeliveryTime[] = [
  { id: 1, option: "Ready to ship in 8-15 Business Days" },
  { id: 2, option: "Ready to ship in 4-7 Business Days" },
  { id: 3, option: "Ready to ship in 2-3 Business Days" },
  { id: 4, option: "Ready to ship in 1 Business Day" },
];

export default function ShippingSettingsPage() {
  const [zones, setZones] = useState<ShippingZone[]>(INITIAL_ZONES);
  const [deliveryTimes, setDeliveryTimes] = useState<DeliveryTime[]>(INITIAL_DELIVERY_TIMES);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(15);

  // Modals state
  const [zoneModalOpen, setZoneModalOpen] = useState(false);
  const [editingZone, setEditingZone] = useState<ShippingZone | null>(null);
  const [zoneNameInput, setZoneNameInput] = useState("");
  const [zoneRegionsInput, setZoneRegionsInput] = useState("");
  const [zoneMethodsInput, setZoneMethodsInput] = useState("");

  const [deliveryModalOpen, setDeliveryModalOpen] = useState(false);
  const [editingDelivery, setEditingDelivery] = useState<DeliveryTime | null>(null);
  const [deliveryOptionInput, setDeliveryOptionInput] = useState("");

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Filtered zones
  const filteredZones = useMemo(() => {
    if (!searchQuery.trim()) return zones;
    const q = searchQuery.toLowerCase();
    return zones.filter(
      (z) =>
        z.name.toLowerCase().includes(q) ||
        z.methods.toLowerCase().includes(q) ||
        z.regions.some((r) => r.toLowerCase().includes(q))
    );
  }, [zones, searchQuery]);

  // Zone actions
  const handleOpenAddZone = () => {
    setEditingZone(null);
    setZoneNameInput("");
    setZoneRegionsInput("");
    setZoneMethodsInput("Free Shipping, Flat Rate");
    setZoneModalOpen(true);
  };

  const handleOpenEditZone = (zone: ShippingZone) => {
    setEditingZone(zone);
    setZoneNameInput(zone.name);
    setZoneRegionsInput(zone.regions.join(", "));
    setZoneMethodsInput(zone.methods);
    setZoneModalOpen(true);
  };

  const handleSaveZone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!zoneNameInput.trim()) return;

    const regionsArray = zoneRegionsInput
      .split(",")
      .map((r) => r.trim())
      .filter(Boolean);

    if (editingZone) {
      setZones((prev) =>
        prev.map((z) =>
          z.id === editingZone.id
            ? {
                ...z,
                name: zoneNameInput,
                regions: regionsArray.length ? regionsArray : [zoneNameInput],
                methods: zoneMethodsInput || "Free Shipping",
              }
            : z
        )
      );
      showToast("Shipping zone updated successfully!");
    } else {
      const newZone: ShippingZone = {
        id: Date.now(),
        name: zoneNameInput,
        regions: regionsArray.length ? regionsArray : [zoneNameInput],
        methods: zoneMethodsInput || "Free Shipping",
      };
      setZones((prev) => [...prev, newZone]);
      showToast("New shipping zone added successfully!");
    }
    setZoneModalOpen(false);
  };

  const handleDeleteZone = (id: number) => {
    if (confirm("Are you sure you want to delete this shipping zone?")) {
      setZones((prev) => prev.filter((z) => z.id !== id));
      showToast("Shipping zone deleted!");
    }
  };

  // Delivery Time actions
  const handleOpenAddDelivery = () => {
    setEditingDelivery(null);
    setDeliveryOptionInput("");
    setDeliveryModalOpen(true);
  };

  const handleOpenEditDelivery = (item: DeliveryTime) => {
    setEditingDelivery(item);
    setDeliveryOptionInput(item.option);
    setDeliveryModalOpen(true);
  };

  const handleSaveDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliveryOptionInput.trim()) return;

    if (editingDelivery) {
      setDeliveryTimes((prev) =>
        prev.map((d) =>
          d.id === editingDelivery.id ? { ...d, option: deliveryOptionInput } : d
        )
      );
      showToast("Shipping delivery time updated successfully!");
    } else {
      const newDelivery: DeliveryTime = {
        id: Date.now(),
        option: deliveryOptionInput,
      };
      setDeliveryTimes((prev) => [...prev, newDelivery]);
      showToast("New delivery time added successfully!");
    }
    setDeliveryModalOpen(false);
  };

  const handleDeleteDelivery = (id: number) => {
    if (confirm("Are you sure you want to delete this delivery time?")) {
      setDeliveryTimes((prev) => prev.filter((d) => d.id !== id));
      showToast("Delivery time deleted!");
    }
  };

  return (
    <div className="w-full space-y-6 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#00ab97] text-white px-5 py-3 rounded-[3px] shadow-lg flex items-center gap-2.5 text-[13.5px] animate-in fade-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-white" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ================= CARD 1: SHIPPING ZONES ================= */}
      <div className="bg-white rounded-[4px] border border-[#e9ecef] p-6 lg:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        {/* Header with Title and Add Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-[18px] font-bold text-[#2c333e] font-sans">
            Shipping Zones
          </h2>
          <button
            type="button"
            onClick={handleOpenAddZone}
            className="bg-[#00ab97] hover:bg-[#009684] text-white text-[13px] font-medium px-4 py-2 rounded-[3px] inline-flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Shipping Zone</span>
          </button>
        </div>

        {/* Filter Bar (Show N entries & Search) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 text-[13px] text-[#495057]">
          {/* Show entries select */}
          <div className="flex items-center gap-2">
            <span>Show</span>
            <div className="relative inline-block">
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="appearance-none border border-[#d2d6de] rounded-[3px] px-3 pr-7 py-1 text-[13px] text-[#495057] bg-white focus:outline-hidden focus:border-[#00ab97] cursor-pointer"
              >
                <option value={15}>15</option>
                <option value={30}>30</option>
                <option value={60}>60</option>
                <option value={100}>100</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Search Input */}
          <div className="flex items-center gap-2">
            <span>Search:</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-[#d2d6de] rounded-[3px] px-3 py-1 text-[13px] text-[#495057] focus:outline-hidden focus:border-[#00ab97] transition-colors w-44 sm:w-52"
            />
          </div>
        </div>

        {/* Shipping Zones Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px] border-collapse min-w-[750px]">
            <thead>
              <tr className="text-[#2c333e] font-semibold text-[13px] border-b border-[#f1f3f5]">
                <th className="pb-3.5 pr-4 pl-1 font-semibold w-[160px]">Zone Name</th>
                <th className="pb-3.5 pr-4 font-semibold">Regions</th>
                <th className="pb-3.5 pr-4 font-semibold w-[260px]">Shipping Methods</th>
                <th className="pb-3.5 pr-1 font-semibold w-[90px] text-left">Options</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f8f9fa]">
              {filteredZones.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-[#6c757d] text-[13px]">
                    No records found!
                  </td>
                </tr>
              ) : (
                filteredZones.map((zone) => (
                  <tr key={zone.id} className="hover:bg-[#fafbfc] transition-colors">
                    {/* Zone Name */}
                    <td className="py-3.5 pr-4 pl-1 text-[#2c333e] align-middle font-normal">
                      {zone.name}
                    </td>

                    {/* Regions Badges */}
                    <td className="py-3.5 pr-4 text-[#2c333e] align-middle">
                      <div className="flex flex-wrap gap-1.5">
                        {zone.regions.map((reg, idx) => (
                          <span
                            key={idx}
                            className="bg-[#e9ecef] text-[#495057] text-[11.5px] px-2 py-0.5 rounded-[3px] inline-block font-normal"
                          >
                            {reg}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Shipping Methods */}
                    <td className="py-3.5 pr-4 text-[#2c333e] align-middle font-normal">
                      {zone.methods}
                    </td>

                    {/* Options (Edit, Delete) */}
                    <td className="py-3.5 pr-1 align-middle">
                      <div className="inline-flex items-center rounded-[3px] border border-[#d2d6de] overflow-hidden bg-[#f4f4f4]">
                        <button
                          type="button"
                          onClick={() => handleOpenEditZone(zone)}
                          className="px-2.5 py-1 text-[#444] hover:bg-gray-200 hover:text-black border-r border-[#d2d6de] transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <SquarePen className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteZone(zone.id)}
                          className="px-2.5 py-1 text-[#444] hover:bg-gray-200 hover:text-red-600 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="mt-5 flex justify-end items-center">
          <div className="inline-flex rounded-[3px] overflow-hidden text-[12px] border border-[#dee2e6]">
            <button
              disabled
              className="w-7 h-7 flex items-center justify-center bg-white text-gray-300 cursor-not-allowed border-r border-[#dee2e6]"
            >
              &lt;
            </button>
            <button className="w-7 h-7 flex items-center justify-center bg-[#00ab97] text-white font-bold">
              1
            </button>
            <button
              disabled
              className="w-7 h-7 flex items-center justify-center bg-white text-gray-300 cursor-not-allowed border-l border-[#dee2e6]"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      {/* ================= CARD 2: SHIPPING DELIVERY TIMES ================= */}
      <div className="space-y-6 max-w-[650px]">
        <div className="bg-white rounded-[4px] border border-[#e9ecef] p-6 lg:p-8 shadow-xs">
          {/* Header with Title and Add Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-[18px] font-bold text-[#2c333e] font-sans">
              Shipping Delivery Times
            </h2>
            <button
              type="button"
              onClick={handleOpenAddDelivery}
              className="bg-[#00ab97] hover:bg-[#009684] text-white text-[13px] font-medium px-4 py-2 rounded-[3px] inline-flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Add Delivery Time</span>
            </button>
          </div>

          {/* Delivery Times Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px] border-collapse">
              <thead>
                <tr className="text-[#2c333e] font-semibold text-[13px] border-b border-[#f1f3f5]">
                  <th className="pb-3.5 pr-4 pl-1 font-semibold">Option</th>
                  <th className="pb-3.5 pr-1 font-semibold w-[90px] text-left">Options</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f8f9fa]">
                {deliveryTimes.map((item) => (
                  <tr key={item.id} className="hover:bg-[#fafbfc] transition-colors">
                    <td className="py-3.5 pr-4 pl-1 text-[#2c333e] align-middle font-normal">
                      {item.option}
                    </td>
                    <td className="py-3.5 pr-1 align-middle">
                      <div className="inline-flex items-center rounded-[3px] border border-[#d2d6de] overflow-hidden bg-[#f4f4f4]">
                        <button
                          type="button"
                          onClick={() => handleOpenEditDelivery(item)}
                          className="px-2.5 py-1 text-[#444] hover:bg-gray-200 hover:text-black border-r border-[#d2d6de] transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <SquarePen className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteDelivery(item.id)}
                          className="px-2.5 py-1 text-[#444] hover:bg-gray-200 hover:text-red-600 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="mt-5 flex justify-end items-center">
            <div className="inline-flex rounded-[3px] overflow-hidden text-[12px] border border-[#dee2e6]">
              <button
                disabled
                className="w-7 h-7 flex items-center justify-center bg-white text-gray-300 cursor-not-allowed border-r border-[#dee2e6]"
              >
                &lt;
              </button>
              <button className="w-7 h-7 flex items-center justify-center bg-[#00ab97] text-white font-bold">
                1
              </button>
              <button
                disabled
                className="w-7 h-7 flex items-center justify-center bg-white text-gray-300 cursor-not-allowed border-l border-[#dee2e6]"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>

        {/* Information Alert Box */}
        <div className="p-4 rounded-[4px] bg-[#d1ecf1] border border-[#bee5eb] text-[13px] leading-relaxed text-[#0c5460]">
          You can add shipping delivery times from here (E.g: Ready to ship in 1 Business Day)
        </div>
      </div>

      {/* ================= MODAL: ADD / EDIT SHIPPING ZONE ================= */}
      {zoneModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-2xs">
          <div className="bg-white rounded-[4px] shadow-2xl w-full max-w-lg overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-[#e9ecef] flex items-center justify-between bg-[#fbfcfd]">
              <h3 className="text-[16px] font-bold text-[#2c333e]">
                {editingZone ? "Edit Shipping Zone" : "Add Shipping Zone"}
              </h3>
              <button
                type="button"
                onClick={() => setZoneModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveZone} className="p-6 space-y-4 text-[13px]">
              <div>
                <label className="block font-semibold text-[#2c333e] mb-1.5">Zone Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. North America, Germany..."
                  value={zoneNameInput}
                  onChange={(e) => setZoneNameInput(e.target.value)}
                  className="w-full px-3 py-2 border border-[#d2d6de] rounded-[3px] text-[#2c333e] focus:border-[#00ab97] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#2c333e] mb-1.5">
                  Regions (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Europe, Asia, North America"
                  value={zoneRegionsInput}
                  onChange={(e) => setZoneRegionsInput(e.target.value)}
                  className="w-full px-3 py-2 border border-[#d2d6de] rounded-[3px] text-[#2c333e] focus:border-[#00ab97] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#2c333e] mb-1.5">Shipping Methods</label>
                <input
                  type="text"
                  placeholder="e.g. Free Shipping, Flat Rate, Local Pickup"
                  value={zoneMethodsInput}
                  onChange={(e) => setZoneMethodsInput(e.target.value)}
                  className="w-full px-3 py-2 border border-[#d2d6de] rounded-[3px] text-[#2c333e] focus:border-[#00ab97] focus:outline-hidden"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-[#f1f3f5]">
                <button
                  type="button"
                  onClick={() => setZoneModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-[3px] text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#00ab97] hover:bg-[#009684] text-white rounded-[3px] font-medium transition-colors"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD / EDIT DELIVERY TIME ================= */}
      {deliveryModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-2xs">
          <div className="bg-white rounded-[4px] shadow-2xl w-full max-w-md overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-[#e9ecef] flex items-center justify-between bg-[#fbfcfd]">
              <h3 className="text-[16px] font-bold text-[#2c333e]">
                {editingDelivery ? "Edit Delivery Time" : "Add Delivery Time"}
              </h3>
              <button
                type="button"
                onClick={() => setDeliveryModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDelivery} className="p-6 space-y-4 text-[13px]">
              <div>
                <label className="block font-semibold text-[#2c333e] mb-1.5">Delivery Time Option</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ready to ship in 1-2 Business Days"
                  value={deliveryOptionInput}
                  onChange={(e) => setDeliveryOptionInput(e.target.value)}
                  className="w-full px-3 py-2 border border-[#d2d6de] rounded-[3px] text-[#2c333e] focus:border-[#00ab97] focus:outline-hidden"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-[#f1f3f5]">
                <button
                  type="button"
                  onClick={() => setDeliveryModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-[3px] text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#00ab97] hover:bg-[#009684] text-white rounded-[3px] font-medium transition-colors"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
