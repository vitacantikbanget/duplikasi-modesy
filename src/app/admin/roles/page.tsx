"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  KeyRound,
  Shield,
  Plus,
  Trash2,
  Edit,
  X,
  CheckCircle,
  AlertCircle,
  Check,
} from "lucide-react";

export interface RoleItem {
  id: number;
  name: string;
  isDefault: boolean;
  usersCount: number;
  permissions: string[];
}

const ALL_AVAILABLE_PERMISSIONS = [
  { id: "products_manage", label: "Manage Products (Add, Edit, Delete, Approve)" },
  { id: "products_quote", label: "Manage Quote Requests & Pricing Bids" },
  { id: "categories_brands", label: "Manage Categories, Tags, Brands & Custom Fields" },
  { id: "orders_manage", label: "Manage Orders, Transactions, Invoices & Refunds" },
  { id: "payments_payouts", label: "Manage Payments, Vendor Earnings & Payouts" },
  { id: "users_manage", label: "Manage Users, Vendors, Administrators & Banning" },
  { id: "theme_homepage", label: "Manage Themes, Sliders & Homepage Builder" },
  { id: "content_blog", label: "Manage Static Pages, Blog Posts & Locations" },
  { id: "management_tools", label: "Manage SEO, Ad Spaces, Cache, Reviews & Messages" },
  { id: "general_settings", label: "Manage System Settings, Email & Preferences" },
];

const INITIAL_ROLES: RoleItem[] = [
  {
    id: 1,
    name: "Super Admin",
    isDefault: true,
    usersCount: 1,
    permissions: ALL_AVAILABLE_PERMISSIONS.map((p) => p.id),
  },
  {
    id: 2,
    name: "Admin",
    isDefault: false,
    usersCount: 2,
    permissions: [
      "products_manage",
      "products_quote",
      "categories_brands",
      "orders_manage",
      "payments_payouts",
      "users_manage",
      "content_blog",
      "management_tools",
    ],
  },
  {
    id: 3,
    name: "Moderator",
    isDefault: false,
    usersCount: 1,
    permissions: ["products_manage", "categories_brands", "orders_manage", "management_tools"],
  },
  {
    id: 4,
    name: "Vendor",
    isDefault: false,
    usersCount: 3,
    permissions: ["products_manage", "products_quote"],
  },
  {
    id: 5,
    name: "Member",
    isDefault: true,
    usersCount: 15,
    permissions: [],
  },
];

export default function AdminRolesPage() {
  const [roles, setRoles] = useState<RoleItem[]>(INITIAL_ROLES);
  const [editingRole, setEditingRole] = useState<RoleItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Add / Edit form states
  const [roleName, setRoleName] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  const handleOpenEdit = (item: RoleItem) => {
    setEditingRole(item);
    setRoleName(item.name);
    setSelectedPermissions(item.permissions);
  };

  const handleOpenAdd = () => {
    setRoleName("");
    setSelectedPermissions([]);
    setIsAddModalOpen(true);
  };

  const togglePermission = (permId: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permId) ? prev.filter((p) => p !== permId) : [...prev, permId]
    );
  };

  const toggleAllPermissions = () => {
    if (selectedPermissions.length === ALL_AVAILABLE_PERMISSIONS.length) {
      setSelectedPermissions([]);
    } else {
      setSelectedPermissions(ALL_AVAILABLE_PERMISSIONS.map((p) => p.id));
    }
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleName.trim()) return;

    const newRole: RoleItem = {
      id: Date.now() % 1000,
      name: roleName.trim(),
      isDefault: false,
      usersCount: 0,
      permissions: selectedPermissions,
    };

    setRoles((prev) => [...prev, newRole]);
    setIsAddModalOpen(false);
    setNotification(`Role "${newRole.name}" created successfully.`);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRole || !roleName.trim()) return;

    setRoles((prev) =>
      prev.map((r) =>
        r.id === editingRole.id
          ? {
              ...r,
              name: roleName.trim(),
              permissions: selectedPermissions,
            }
          : r
      )
    );

    setNotification(`Permissions for role "${roleName}" updated successfully.`);
    setEditingRole(null);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleDeleteRole = (item: RoleItem) => {
    if (item.isDefault || item.id === 1) {
      alert("Default system roles cannot be deleted.");
      return;
    }
    if (confirm(`Are you sure you want to delete role "${item.name}"?`)) {
      setRoles((prev) => prev.filter((r) => r.id !== item.id));
      setNotification(`Role "${item.name}" deleted.`);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  return (
    <div className="w-full text-[#333333] pb-12 font-sans">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h1 className="text-[24px] font-normal text-[#333333]">Roles & Permissions</h1>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="h-[34px] px-3.5 bg-[#00a65a] hover:bg-[#008d4c] active:bg-[#00733e] text-white text-[13px] font-normal rounded-[3px] transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Role</span>
        </button>
      </div>

      {/* Success Notification Alert */}
      {notification && (
        <div className="mb-4 bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-3 rounded-[3px] text-sm flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{notification}</span>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="text-xs text-emerald-700 font-semibold hover:underline cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Container Card */}
      <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border border-[#d2d6de] p-5">
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left text-[13px] border-collapse whitespace-nowrap">
            <thead>
              <tr className="border-b-2 border-gray-200 text-[#333333] font-semibold text-[13px]">
                <th className="py-2.5 px-3 text-left w-[50px]">Id</th>
                <th className="py-2.5 px-3 text-left min-w-[200px]">Role Name</th>
                <th className="py-2.5 px-3 text-left min-w-[260px]">Permissions</th>
                <th className="py-2.5 px-3 text-left w-[120px]">Users Assigned</th>
                <th className="py-2.5 px-3 text-left w-[120px]">Type</th>
                <th className="py-2.5 px-3 text-left w-[140px]">Options</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-[#f4f4f4] hover:bg-gray-50/70 transition-colors text-[13px]"
                >
                  <td className="py-3 px-3 text-gray-700">{item.id}</td>

                  <td className="py-3 px-3">
                    <span className="font-semibold text-gray-800">{item.name}</span>
                  </td>

                  <td className="py-3 px-3">
                    {item.id === 1 ? (
                      <span className="inline-block bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-2 py-0.5 rounded-[2px] font-semibold">
                        All System Permissions (Unrestricted)
                      </span>
                    ) : item.permissions.length === 0 ? (
                      <span className="text-gray-400 text-xs italic">
                        Standard Consumer Privileges
                      </span>
                    ) : (
                      <span className="inline-block bg-purple-50 text-purple-700 border border-purple-200 text-xs px-2 py-0.5 rounded-[2px] font-semibold">
                        {item.permissions.length} Granted Permissions
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-3 text-gray-800 font-medium">
                    {item.usersCount} users
                  </td>

                  <td className="py-3 px-3">
                    {item.isDefault ? (
                      <span className="inline-block bg-blue-100 text-blue-800 text-[11px] font-semibold px-2 py-0.5 rounded-[2px]">
                        Default
                      </span>
                    ) : (
                      <span className="inline-block bg-gray-100 text-gray-600 text-[11px] font-semibold px-2 py-0.5 rounded-[2px]">
                        Custom
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(item)}
                        className="h-[26px] px-2.5 border border-[#d2d6de] bg-white hover:bg-gray-50 text-[#0088cc] text-[12px] font-normal rounded-[3px] transition-colors cursor-pointer shadow-2xs"
                      >
                        Permissions
                      </button>
                      {!item.isDefault && (
                        <button
                          type="button"
                          onClick={() => handleDeleteRole(item)}
                          className="h-[26px] w-[28px] border border-[#d2d6de] bg-white hover:bg-gray-50 text-[#777] hover:text-red-600 rounded-[3px] flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                          title="Delete Role"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT / ADD PERMISSIONS MODAL */}
      {(editingRole || isAddModalOpen) && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-2xs">
          <div className="bg-white rounded-[4px] shadow-2xl w-full max-w-lg overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-[#f4f4f4] flex items-center justify-between bg-gray-50">
              <h3 className="text-[17px] font-semibold text-[#333333]">
                {editingRole ? `Permissions: ${editingRole.name}` : "Add New Role"}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setEditingRole(null);
                  setIsAddModalOpen(false);
                }}
                className="text-gray-400 hover:text-gray-600 cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={editingRole ? handleSaveEdit : handleSaveAdd}>
              <div className="p-6 space-y-4 text-[13.5px] max-h-[75vh] overflow-y-auto">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Role Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    disabled={editingRole?.id === 1}
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] outline-none focus:border-[#3c8dbc]"
                  />
                </div>

                <div className="border-t border-gray-100 pt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Module Permissions
                    </span>
                    <button
                      type="button"
                      onClick={toggleAllPermissions}
                      className="text-xs text-[#0088cc] hover:underline font-medium cursor-pointer"
                    >
                      {selectedPermissions.length === ALL_AVAILABLE_PERMISSIONS.length
                        ? "Deselect All"
                        : "Select All"}
                    </button>
                  </div>

                  <div className="space-y-2.5 bg-gray-50/70 p-3 rounded-[3px] border border-gray-200">
                    {ALL_AVAILABLE_PERMISSIONS.map((perm) => {
                      const isChecked = selectedPermissions.includes(perm.id);
                      return (
                        <label
                          key={perm.id}
                          onClick={() => togglePermission(perm.id)}
                          className="flex items-start gap-2.5 cursor-pointer select-none text-xs text-gray-700"
                        >
                          <div
                            className={`w-4 h-4 mt-0.5 rounded-[2px] border flex items-center justify-center transition-colors shrink-0 ${
                              isChecked
                                ? "border-[#605ca8] bg-[#605ca8]"
                                : "border-gray-400 bg-white"
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3 text-white stroke-[3]" />}
                          </div>
                          <span>{perm.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="px-6 py-3 border-t border-[#f4f4f4] bg-gray-50 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingRole(null);
                    setIsAddModalOpen(false);
                  }}
                  className="h-[34px] px-4 border border-[#d2d6de] bg-white hover:bg-gray-100 text-[#444] text-[13px] rounded-[3px] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-[34px] px-5 bg-[#0073b7] hover:bg-[#005a92] text-white text-[13px] rounded-[3px] font-normal transition-colors cursor-pointer"
                >
                  Save Permissions
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
