"use client";

import { useState } from "react";
import { Truck, FileText, SquarePen, Trash2, Plus, X, Check } from "lucide-react";
import { countries } from "@/contexts/AppContext";

interface Address {
  id: string;
  type: "shipping" | "billing";
  title: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  email: string;
  phone: string;
}

export default function ShippingAddressPage() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      type: "shipping",
      title: "Home",
      firstName: "Daniel",
      lastName: "Jones",
      address: "Kirchgasse 64 Wiesbaden 65183",
      city: "Wiesbaden",
      state: "Berlin",
      country: "Germany",
      zipCode: "65183",
      email: "test@codingest.net",
      phone: "+ 49 123 45 67 89",
    },
    {
      id: "2",
      type: "billing",
      title: "Home Billing",
      firstName: "Daniel",
      lastName: "Jones",
      address: "Kirchgasse 64 Wiesbaden 65183",
      city: "Wiesbaden",
      state: "Berlin",
      country: "Germany",
      zipCode: "65183",
      email: "test@codingest.net",
      phone: "+ 49 123 45 67 89",
    },
    {
      id: "3",
      type: "shipping",
      title: "Work",
      firstName: "Daniel",
      lastName: "Jones",
      address: "Schutzenstrasse 12 Landstuhl 353434",
      city: "Landstuhl",
      state: "Berlin",
      country: "Germany",
      zipCode: "353434",
      email: "test@codingest.net",
      phone: "+ 49 123 45 67 89",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<Address, "id">>({
    type: "shipping",
    title: "",
    firstName: "Daniel",
    lastName: "Jones",
    address: "",
    city: "",
    state: "",
    country: "Germany",
    zipCode: "",
    email: "test@codingest.net",
    phone: "+ 49 123 45 67 89",
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      type: "shipping",
      title: "",
      firstName: "Daniel",
      lastName: "Jones",
      address: "",
      city: "",
      state: "",
      country: "Germany",
      zipCode: "",
      email: "test@codingest.net",
      phone: "+ 49 123 45 67 89",
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (addr: Address) => {
    setEditingId(addr.id);
    setFormData({
      type: addr.type,
      title: addr.title,
      firstName: addr.firstName,
      lastName: addr.lastName,
      address: addr.address,
      city: addr.city,
      state: addr.state,
      country: addr.country,
      zipCode: addr.zipCode,
      email: addr.email,
      phone: addr.phone,
    });
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this address?")) {
      setAddresses((prev) => prev.filter((a) => a.id !== id));
      showNotify("Address successfully deleted!");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.address) return;

    if (editingId) {
      setAddresses((prev) =>
        prev.map((a) => (a.id === editingId ? { ...formData, id: editingId } : a))
      );
      showNotify("Address updated successfully!");
    } else {
      const newAddr: Address = {
        ...formData,
        id: `addr_${Date.now()}`,
      };
      setAddresses((prev) => [...prev, newAddr]);
      showNotify("New address added successfully!");
    }
    setModalOpen(false);
  };

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  return (
    <div>
      {/* Success Notification */}
      {notification && (
        <div className="mb-5 p-4 bg-[#e8f8f5] border border-[#a3e4d7] text-[#0e6251] rounded-[3px] text-[13.5px] flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#00ab97] stroke-[3]" />
            <span>{notification}</span>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="text-[#0e6251] hover:text-black text-[12px] font-semibold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Address Cards Grid matching Screenshot 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {addresses.map((addr) => {
          const isShipping = addr.type === "shipping";
          return (
            <div
              key={addr.id}
              className="bg-white border border-[#e4e7ea] rounded-[3px] p-5 relative shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between"
            >
              <div>
                {/* Badge matching Screenshot 2 */}
                <div className="mb-3">
                  {isShipping ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[2px] bg-[#e6f4ff] text-[#0284c7] text-[11px] font-medium">
                      <Truck className="w-3 h-3 text-[#0284c7]" />
                      Shipping Address
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[2px] bg-[#f1f3f5] text-[#6c757d] text-[11px] font-medium">
                      <FileText className="w-3 h-3 text-[#6c757d]" />
                      Billing Address
                    </span>
                  )}
                </div>

                {/* Address Title */}
                <h3 className="font-bold text-[14px] text-[#222] mb-1.5">
                  {addr.title}
                </h3>

                {/* Contact & Address Details */}
                <p className="text-[13px] text-[#444] mb-1">
                  {addr.firstName} {addr.lastName}
                </p>
                <p className="text-[12.5px] text-[#666] leading-relaxed mb-1">
                  {addr.address} {addr.city}/{addr.state}/{addr.country}
                </p>
                <p className="text-[12px] text-[#666]">
                  {addr.email} {addr.phone}
                </p>
              </div>

              {/* Action Buttons matching Screenshot 2 */}
              <div className="flex items-center gap-3 mt-4 pt-3 border-t border-[#f7f8fa]">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(addr)}
                  className="text-gray-400 hover:text-[#00ab97] transition-colors p-1 cursor-pointer"
                  title="Edit Address"
                >
                  <SquarePen className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(addr.id)}
                  className="text-gray-400 hover:text-[#e53935] transition-colors p-1 cursor-pointer"
                  title="Delete Address"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add New Address Button matching Screenshot 3 */}
      <div className="mt-6">
        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#00ab97] hover:bg-[#009684] text-white rounded-[3px] text-[13.5px] font-medium transition-colors shadow-2xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Address</span>
        </button>
      </div>

      {/* Modal Dialog for Add/Edit Address */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-[4px] max-w-[620px] w-full p-6 shadow-xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#e9ecef] mb-4">
              <h3 className="text-[16px] font-bold text-[#222]">
                {editingId ? "Edit Address" : "Add New Address"}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Type Selection */}
              <div>
                <label className="block text-[13px] font-semibold text-[#222] mb-1.5">
                  Address Type
                </label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer text-[13px] text-[#333]">
                    <input
                      type="radio"
                      name="addrType"
                      checked={formData.type === "shipping"}
                      onChange={() => setFormData({ ...formData, type: "shipping" })}
                      className="accent-[#00ab97] w-4 h-4 cursor-pointer"
                    />
                    <span>Shipping Address</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-[13px] text-[#333]">
                    <input
                      type="radio"
                      name="addrType"
                      checked={formData.type === "billing"}
                      onChange={() => setFormData({ ...formData, type: "billing" })}
                      className="accent-[#00ab97] w-4 h-4 cursor-pointer"
                    />
                    <span>Billing Address</span>
                  </label>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-[13px] font-semibold text-[#222] mb-1.5">
                  Address Title (e.g. Home, Work, Office)
                </label>
                <input
                  type="text"
                  placeholder="Address Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-[#d2d6de] focus:border-[#00ab97] rounded-[3px] text-[13px] text-[#333] focus:outline-none transition-colors"
                  required
                />
              </div>

              {/* First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-[#222] mb-1.5">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 border border-[#d2d6de] focus:border-[#00ab97] rounded-[3px] text-[13px] text-[#333] focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-[#222] mb-1.5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 border border-[#d2d6de] focus:border-[#00ab97] rounded-[3px] text-[13px] text-[#333] focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-[#222] mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 border border-[#d2d6de] focus:border-[#00ab97] rounded-[3px] text-[13px] text-[#333] focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-[#222] mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 border border-[#d2d6de] focus:border-[#00ab97] rounded-[3px] text-[13px] text-[#333] focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-[13px] font-semibold text-[#222] mb-1.5">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Street name and house number"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 border border-[#d2d6de] focus:border-[#00ab97] rounded-[3px] text-[13px] text-[#333] focus:outline-none transition-colors"
                  required
                />
              </div>

              {/* Country, State, City, Zip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-[#222] mb-1.5">
                    Country
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 border border-[#d2d6de] focus:border-[#00ab97] rounded-[3px] text-[13px] text-[#333] focus:outline-none transition-colors bg-white cursor-pointer"
                  >
                    {countries.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-[#222] mb-1.5">
                    State / Province
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) =>
                      setFormData({ ...formData, state: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 border border-[#d2d6de] focus:border-[#00ab97] rounded-[3px] text-[13px] text-[#333] focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-[#222] mb-1.5">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 border border-[#d2d6de] focus:border-[#00ab97] rounded-[3px] text-[13px] text-[#333] focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-[#222] mb-1.5">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) =>
                      setFormData({ ...formData, zipCode: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 border border-[#d2d6de] focus:border-[#00ab97] rounded-[3px] text-[13px] text-[#333] focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#f1f3f5]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-[3px] text-[13px] text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#00ab97] hover:bg-[#009684] text-white rounded-[3px] text-[13px] font-medium transition-colors shadow-2xs cursor-pointer"
                >
                  {editingId ? "Save Changes" : "Add Address"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
