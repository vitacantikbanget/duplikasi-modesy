"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Shield,
  Plus,
  Trash2,
  Edit,
  X,
  CheckCircle,
  AlertCircle,
  Key,
} from "lucide-react";

export interface AdminAccountItem {
  id: number;
  username: string;
  fullName: string;
  email: string;
  role: "Super Admin" | "Admin" | "Moderator";
  status: "Active" | "Inactive";
  avatar: string;
  date: string;
}

const INITIAL_ADMINS: AdminAccountItem[] = [
  {
    id: 1,
    username: "admin",
    fullName: "System Superadmin",
    email: "admin@modesy.com",
    role: "Super Admin",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?u=admin",
    date: "2026-01-10 / 11:20",
  },
  {
    id: 2,
    username: "mod_sarah",
    fullName: "Sarah Connor",
    email: "sarah.moderator@modesy.com",
    role: "Moderator",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    date: "2026-09-12 / 15:10",
  },
  {
    id: 3,
    username: "operations_alex",
    fullName: "Alex Rivera",
    email: "alex.operations@modesy.com",
    role: "Admin",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?u=alex",
    date: "2026-09-20 / 14:00",
  },
];

export default function AdminAdministratorsPage() {
  const [admins, setAdmins] = useState<AdminAccountItem[]>(INITIAL_ADMINS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<AdminAccountItem | null>(null);

  // Form states
  const [formUsername, setFormUsername] = useState("");
  const [formFullName, setFormFullName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formRole, setFormRole] = useState<"Super Admin" | "Admin" | "Moderator">("Admin");

  const [notification, setNotification] = useState<string | null>(null);

  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formUsername.trim() || !formEmail.trim()) return;

    const newId = admins.length > 0 ? Math.max(...admins.map((a) => a.id)) + 1 : 1;
    const newAdmin: AdminAccountItem = {
      id: newId,
      username: formUsername.trim(),
      fullName: formFullName.trim() || formUsername.trim(),
      email: formEmail.trim(),
      role: formRole,
      status: "Active",
      avatar: `https://i.pravatar.cc/150?u=${formUsername}`,
      date: "Just now",
    };

    setAdmins((prev) => [...prev, newAdmin]);
    setIsAddModalOpen(false);
    setFormUsername("");
    setFormFullName("");
    setFormEmail("");
    setFormPassword("");
    setNotification(`Administrator "${newAdmin.username}" added successfully.`);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleDeleteAdmin = (item: AdminAccountItem) => {
    if (item.id === 1) {
      alert("The primary Super Admin account cannot be deleted.");
      return;
    }
    if (confirm(`Are you sure you want to delete administrator "${item.username}"?`)) {
      setAdmins((prev) => prev.filter((a) => a.id !== item.id));
      setNotification(`Administrator "${item.username}" has been deleted.`);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAdmin) return;

    setAdmins((prev) =>
      prev.map((a) =>
        a.id === editingAdmin.id
          ? {
              ...a,
              fullName: formFullName.trim(),
              role: formRole,
            }
          : a
      )
    );
    setNotification(`Admin permissions for "${editingAdmin.username}" updated.`);
    setEditingAdmin(null);
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="w-full text-[#333333] pb-12 font-sans">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-[24px] font-normal text-[#333333]">Administrators</h1>
        </div>

        <button
          type="button"
          onClick={() => {
            setFormUsername("");
            setFormFullName("");
            setFormEmail("");
            setFormPassword("");
            setFormRole("Admin");
            setIsAddModalOpen(true);
          }}
          className="h-[34px] px-3.5 bg-[#00a65a] hover:bg-[#008d4c] active:bg-[#00733e] text-white text-[13px] font-normal rounded-[3px] transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Administrator</span>
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
                <th className="py-2.5 px-3 text-left min-w-[200px]">Administrator</th>
                <th className="py-2.5 px-3 text-left w-[220px]">Email</th>
                <th className="py-2.5 px-3 text-left w-[140px]">Role</th>
                <th className="py-2.5 px-3 text-left w-[100px]">Status</th>
                <th className="py-2.5 px-3 text-left w-[150px]">Date Created</th>
                <th className="py-2.5 px-3 text-left w-[110px]">Options</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-[#f4f4f4] hover:bg-gray-50/70 transition-colors text-[13px]"
                >
                  <td className="py-3 px-3 text-gray-700">{item.id}</td>

                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2.5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.avatar}
                        alt={item.username}
                        className="w-8 h-8 rounded-full object-cover border border-gray-200 shrink-0"
                      />
                      <div>
                        <p className="font-semibold text-gray-800 leading-tight">
                          {item.username}
                        </p>
                        <p className="text-xs text-gray-500 leading-tight mt-0.5">
                          {item.fullName}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-3 text-gray-800">{item.email}</td>

                  <td className="py-3 px-3">
                    {item.role === "Super Admin" ? (
                      <span className="inline-block bg-[#dd4b39] text-white text-[11px] font-semibold px-2 py-0.5 rounded-[2px] shadow-2xs">
                        Super Admin
                      </span>
                    ) : item.role === "Admin" ? (
                      <span className="inline-block bg-[#605ca8] text-white text-[11px] font-semibold px-2 py-0.5 rounded-[2px] shadow-2xs">
                        Admin
                      </span>
                    ) : (
                      <span className="inline-block bg-[#00c0ef] text-white text-[11px] font-semibold px-2 py-0.5 rounded-[2px] shadow-2xs">
                        Moderator
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-3">
                    <span className="inline-block bg-[#00a65a] text-white text-[11px] font-semibold px-2 py-0.5 rounded-[2px] shadow-2xs">
                      {item.status}
                    </span>
                  </td>

                  <td className="py-3 px-3 text-gray-600 text-xs">{item.date}</td>

                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingAdmin(item);
                          setFormFullName(item.fullName);
                          setFormRole(item.role);
                        }}
                        className="h-[26px] px-2.5 border border-[#d2d6de] bg-white hover:bg-gray-50 text-[#444] text-[12px] font-normal rounded-[3px] transition-colors cursor-pointer shadow-2xs"
                      >
                        Edit
                      </button>
                      {item.id !== 1 && (
                        <button
                          type="button"
                          onClick={() => handleDeleteAdmin(item)}
                          className="h-[26px] w-[28px] border border-[#d2d6de] bg-white hover:bg-gray-50 text-[#777] hover:text-red-600 rounded-[3px] flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                          title="Delete Administrator"
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

      {/* ADD ADMINISTRATOR MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-2xs">
          <div className="bg-white rounded-[4px] shadow-2xl w-full max-w-md overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-[#f4f4f4] flex items-center justify-between bg-gray-50">
              <h3 className="text-[17px] font-semibold text-[#333333]">
                Add Administrator
              </h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddAdmin}>
              <div className="p-6 space-y-4 text-[13.5px]">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Username <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. admin_ops"
                    value={formUsername}
                    onChange={(e) => setFormUsername(e.target.value)}
                    className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] outline-none focus:border-[#3c8dbc]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. John Doe"
                    value={formFullName}
                    onChange={(e) => setFormFullName(e.target.value)}
                    className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] outline-none focus:border-[#3c8dbc]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="admin@modesy.com"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] outline-none focus:border-[#3c8dbc]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={formPassword}
                    onChange={(e) => setFormPassword(e.target.value)}
                    className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] outline-none focus:border-[#3c8dbc]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Admin Role
                  </label>
                  <select
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value as any)}
                    className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] bg-white outline-none focus:border-[#3c8dbc]"
                  >
                    <option value="Admin">Admin (General Access)</option>
                    <option value="Moderator">Moderator (Catalog & Orders Review)</option>
                    <option value="Super Admin">Super Admin (Unrestricted Access)</option>
                  </select>
                </div>
              </div>

              <div className="px-6 py-3 border-t border-[#f4f4f4] bg-gray-50 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="h-[34px] px-4 border border-[#d2d6de] bg-white hover:bg-gray-100 text-[#444] text-[13px] rounded-[3px] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-[34px] px-5 bg-[#00a65a] hover:bg-[#008d4c] text-white text-[13px] rounded-[3px] font-normal transition-colors cursor-pointer"
                >
                  Create Administrator
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT ADMINISTRATOR MODAL */}
      {editingAdmin && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-2xs">
          <div className="bg-white rounded-[4px] shadow-2xl w-full max-w-md overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-[#f4f4f4] flex items-center justify-between bg-gray-50">
              <h3 className="text-[17px] font-semibold text-[#333333]">
                Edit Administrator ({editingAdmin.username})
              </h3>
              <button
                type="button"
                onClick={() => setEditingAdmin(null)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit}>
              <div className="p-6 space-y-4 text-[13.5px]">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formFullName}
                    onChange={(e) => setFormFullName(e.target.value)}
                    className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] outline-none focus:border-[#3c8dbc]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value as any)}
                    className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] bg-white outline-none focus:border-[#3c8dbc]"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Moderator">Moderator</option>
                    <option value="Super Admin">Super Admin</option>
                  </select>
                </div>
              </div>

              <div className="px-6 py-3 border-t border-[#f4f4f4] bg-gray-50 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingAdmin(null)}
                  className="h-[34px] px-4 border border-[#d2d6de] bg-white hover:bg-gray-100 text-[#444] text-[13px] rounded-[3px] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-[34px] px-5 bg-[#0073b7] hover:bg-[#005a92] text-white text-[13px] rounded-[3px] font-normal transition-colors cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
