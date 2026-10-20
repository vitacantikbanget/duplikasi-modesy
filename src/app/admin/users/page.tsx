"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import {
  User,
  Shield,
  Trash2,
  Edit,
  X,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  UserX,
  Mail,
  Key,
} from "lucide-react";

export interface AdminUserItem {
  id: number;
  username: string;
  fullName: string;
  email: string;
  emailConfirmed: boolean;
  role: "Member" | "Vendor" | "Admin";
  status: "Active" | "Banned";
  avatar: string;
  date: string;
}

const INITIAL_USERS: AdminUserItem[] = [
  {
    id: 1,
    username: "admin",
    fullName: "System Administrator",
    email: "admin@modesy.com",
    emailConfirmed: true,
    role: "Admin",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?u=admin",
    date: "2026-01-10 / 11:20",
  },
  {
    id: 2,
    username: "trendshop",
    fullName: "Trendshop Official",
    email: "trendshop@store.com",
    emailConfirmed: true,
    role: "Vendor",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?u=trendshop",
    date: "2026-03-14 / 09:45",
  },
  {
    id: 3,
    username: "peter_jones",
    fullName: "Peter Jone",
    email: "peter.jones@example.com",
    emailConfirmed: true,
    role: "Member",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?u=peter",
    date: "2026-04-20 / 14:15",
  },
  {
    id: 4,
    username: "caleb_prosper",
    fullName: "Caleb Prosper 1",
    email: "caleb.prosper@example.com",
    emailConfirmed: true,
    role: "Member",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?u=caleb",
    date: "2026-05-02 / 18:30",
  },
  {
    id: 5,
    username: "sophia_miller",
    fullName: "Sophia Miller",
    email: "sophia.m@example.com",
    emailConfirmed: true,
    role: "Vendor",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?u=sophia",
    date: "2026-06-11 / 10:05",
  },
  {
    id: 6,
    username: "john_doe",
    fullName: "Johnathan Doe",
    email: "john.doe@testmail.com",
    emailConfirmed: false,
    role: "Member",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?u=john",
    date: "2026-07-08 / 12:40",
  },
  {
    id: 7,
    username: "emily_clark",
    fullName: "Emily Clark",
    email: "emily.clark@store.com",
    emailConfirmed: true,
    role: "Vendor",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?u=emily",
    date: "2026-08-15 / 16:22",
  },
  {
    id: 8,
    username: "alex_turner",
    fullName: "Alex Turner",
    email: "alex.t@outlook.com",
    emailConfirmed: true,
    role: "Member",
    status: "Banned",
    avatar: "https://i.pravatar.cc/150?u=alex",
    date: "2026-09-01 / 08:50",
  },
  {
    id: 9,
    username: "mod_sarah",
    fullName: "Sarah Connor",
    email: "sarah.moderator@modesy.com",
    emailConfirmed: true,
    role: "Admin",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    date: "2026-09-12 / 15:10",
  },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUserItem[]>(INITIAL_USERS);

  // Filters
  const [showCount, setShowCount] = useState<number>(15);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [emailStatusFilter, setEmailStatusFilter] = useState<string>("All");
  const [roleFilter, setRoleFilter] = useState<string>("All");
  const [searchInput, setSearchInput] = useState<string>("");

  const [appliedStatus, setAppliedStatus] = useState<string>("All");
  const [appliedEmailStatus, setAppliedEmailStatus] = useState<string>("All");
  const [appliedRole, setAppliedRole] = useState<string>("All");
  const [appliedSearch, setAppliedSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Active Dropdown
  const [activeDropdownId, setActiveDropdownId] = useState<number | null>(null);

  // Modals
  const [editingUser, setEditingUser] = useState<AdminUserItem | null>(null);
  const [changeRoleUser, setChangeRoleUser] = useState<AdminUserItem | null>(null);
  const [newRole, setNewRole] = useState<"Member" | "Vendor" | "Admin">("Member");

  // Edit form state
  const [editUsername, setEditUsername] = useState("");
  const [editFullName, setEditFullName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editStatus, setEditStatus] = useState<"Active" | "Banned">("Active");

  const [notification, setNotification] = useState<string | null>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-user-options-menu]")) {
        setActiveDropdownId(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleApplyFilter = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAppliedStatus(statusFilter);
    setAppliedEmailStatus(emailStatusFilter);
    setAppliedRole(roleFilter);
    setAppliedSearch(searchInput.trim().toLowerCase());
    setCurrentPage(1);
  };

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      if (appliedStatus !== "All" && u.status !== appliedStatus) return false;
      if (appliedEmailStatus === "Confirmed" && !u.emailConfirmed) return false;
      if (appliedEmailStatus === "Unconfirmed" && u.emailConfirmed) return false;
      if (appliedRole !== "All" && u.role !== appliedRole) return false;
      if (appliedSearch) {
        const matchName = u.fullName.toLowerCase().includes(appliedSearch);
        const matchUser = u.username.toLowerCase().includes(appliedSearch);
        const matchEmail = u.email.toLowerCase().includes(appliedSearch);
        const matchId = u.id.toString().includes(appliedSearch);
        if (!matchName && !matchUser && !matchEmail && !matchId) return false;
      }
      return true;
    });
  }, [users, appliedStatus, appliedEmailStatus, appliedRole, appliedSearch]);

  const totalPages = Math.ceil(filteredUsers.length / showCount) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedUsers = useMemo(() => {
    const start = (safeCurrentPage - 1) * showCount;
    return filteredUsers.slice(start, start + showCount);
  }, [filteredUsers, safeCurrentPage, showCount]);

  // Actions
  const handleToggleBan = (u: AdminUserItem) => {
    const nextStatus = u.status === "Active" ? "Banned" : "Active";
    setUsers((prev) =>
      prev.map((item) => (item.id === u.id ? { ...item, status: nextStatus } : item))
    );
    setActiveDropdownId(null);
    setNotification(`User ${u.username} status changed to ${nextStatus}.`);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleToggleConfirmEmail = (u: AdminUserItem) => {
    setUsers((prev) =>
      prev.map((item) =>
        item.id === u.id ? { ...item, emailConfirmed: !item.emailConfirmed } : item
      )
    );
    setActiveDropdownId(null);
    setNotification(
      `Email status for ${u.username} changed to ${!u.emailConfirmed ? "Confirmed" : "Unconfirmed"}.`
    );
    setTimeout(() => setNotification(null), 4000);
  };

  const handleDeleteUser = (u: AdminUserItem) => {
    if (confirm(`Are you sure you want to delete user "${u.username}"?`)) {
      setUsers((prev) => prev.filter((item) => item.id !== u.id));
      setActiveDropdownId(null);
      setNotification(`User ${u.username} has been deleted.`);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  const handleOpenEdit = (u: AdminUserItem) => {
    setEditingUser(u);
    setEditUsername(u.username);
    setEditFullName(u.fullName);
    setEditEmail(u.email);
    setEditStatus(u.status);
    setActiveDropdownId(null);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    setUsers((prev) =>
      prev.map((item) =>
        item.id === editingUser.id
          ? {
              ...item,
              username: editUsername.trim(),
              fullName: editFullName.trim(),
              email: editEmail.trim(),
              status: editStatus,
            }
          : item
      )
    );
    setNotification(`User ${editUsername} updated successfully.`);
    setEditingUser(null);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleSaveRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!changeRoleUser) return;

    setUsers((prev) =>
      prev.map((item) =>
        item.id === changeRoleUser.id ? { ...item, role: newRole } : item
      )
    );
    setNotification(`Role for ${changeRoleUser.username} updated to ${newRole}.`);
    setChangeRoleUser(null);
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="w-full text-[#333333] pb-12 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <div>
          <h1 className="text-[24px] font-normal text-[#333333]">Users</h1>
        </div>
        <div className="text-xs text-gray-500">
          <Link href="/admin" className="text-[#3c8dbc] hover:underline">
            Home
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-gray-400">Users</span>
        </div>
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
        {/* Filters Form */}
        <form onSubmit={handleApplyFilter} className="flex flex-wrap items-end gap-3 mb-5">
          {/* Show */}
          <div>
            <label className="block text-[13px] text-[#333333] font-normal mb-1">
              Show
            </label>
            <div className="relative">
              <select
                value={showCount}
                onChange={(e) => {
                  setShowCount(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="h-[34px] w-[85px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-[#555] bg-white appearance-none outline-none focus:border-[#3c8dbc] cursor-pointer"
              >
                <option value={15}>15</option>
                <option value={30}>30</option>
                <option value={60}>60</option>
                <option value={100}>100</option>
              </select>
              <span className="absolute right-2.5 top-2 pointer-events-none text-[11px] text-[#777]">
                ▾
              </span>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-[13px] text-[#333333] font-normal mb-1">
              Status
            </label>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-[34px] min-w-[120px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-[#555] bg-white appearance-none outline-none focus:border-[#3c8dbc] cursor-pointer"
              >
                <option value="All">All</option>
                <option value="Active">Active</option>
                <option value="Banned">Banned</option>
              </select>
              <span className="absolute right-2.5 top-2 pointer-events-none text-[11px] text-[#777]">
                ▾
              </span>
            </div>
          </div>

          {/* Email Status */}
          <div>
            <label className="block text-[13px] text-[#333333] font-normal mb-1">
              Email Status
            </label>
            <div className="relative">
              <select
                value={emailStatusFilter}
                onChange={(e) => setEmailStatusFilter(e.target.value)}
                className="h-[34px] min-w-[140px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-[#555] bg-white appearance-none outline-none focus:border-[#3c8dbc] cursor-pointer"
              >
                <option value="All">All</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Unconfirmed">Unconfirmed</option>
              </select>
              <span className="absolute right-2.5 top-2 pointer-events-none text-[11px] text-[#777]">
                ▾
              </span>
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="block text-[13px] text-[#333333] font-normal mb-1">
              Role
            </label>
            <div className="relative">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="h-[34px] min-w-[120px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-[#555] bg-white appearance-none outline-none focus:border-[#3c8dbc] cursor-pointer"
              >
                <option value="All">All</option>
                <option value="Member">Member</option>
                <option value="Vendor">Vendor</option>
                <option value="Admin">Admin</option>
              </select>
              <span className="absolute right-2.5 top-2 pointer-events-none text-[11px] text-[#777]">
                ▾
              </span>
            </div>
          </div>

          {/* Search */}
          <div>
            <label className="block text-[13px] text-[#333333] font-normal mb-1">
              Search
            </label>
            <input
              type="text"
              placeholder="Username, Name, Email..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-[#555] placeholder-gray-400 outline-none focus:border-[#3c8dbc] w-[180px]"
            />
          </div>

          {/* Submit Filter */}
          <button
            type="submit"
            className="h-[34px] px-5 bg-[#605ca8] hover:bg-[#534f96] text-white text-[13px] rounded-[3px] font-normal transition-colors cursor-pointer shadow-xs"
          >
            Filter
          </button>
        </form>

        {/* Users Table */}
        <div className="overflow-x-auto min-h-[380px]">
          <table className="w-full text-left text-[13px] border-collapse whitespace-nowrap">
            <thead>
              <tr className="border-b-2 border-gray-200 text-[#333333] font-semibold text-[13px]">
                <th className="py-2.5 px-3 text-left w-[50px]">Id</th>
                <th className="py-2.5 px-3 text-left min-w-[200px]">User</th>
                <th className="py-2.5 px-3 text-left w-[220px]">Email</th>
                <th className="py-2.5 px-3 text-left w-[110px]">Role</th>
                <th className="py-2.5 px-3 text-left w-[100px]">Status</th>
                <th className="py-2.5 px-3 text-left w-[150px]">Date</th>
                <th className="py-2.5 px-3 text-left w-[130px]">Options</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-500 text-[13px]">
                    No users found.
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#f4f4f4] hover:bg-gray-50/70 transition-colors text-[13px]"
                  >
                    <td className="py-3 px-3 text-gray-700">{item.id}</td>

                    {/* User */}
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

                    {/* Email */}
                    <td className="py-3 px-3">
                      <div className="text-gray-800">{item.email}</div>
                      {item.emailConfirmed ? (
                        <span className="inline-block text-[10px] text-emerald-700 font-medium">
                          ✓ Confirmed
                        </span>
                      ) : (
                        <span className="inline-block text-[10px] text-amber-600 font-medium">
                          ⚠ Unconfirmed
                        </span>
                      )}
                    </td>

                    {/* Role Badge */}
                    <td className="py-3 px-3">
                      {item.role === "Admin" ? (
                        <span className="inline-block bg-[#dd4b39] text-white text-[11px] font-semibold px-2 py-0.5 rounded-[2px] shadow-2xs">
                          Admin
                        </span>
                      ) : item.role === "Vendor" ? (
                        <span className="inline-block bg-[#00c0ef] text-white text-[11px] font-semibold px-2 py-0.5 rounded-[2px] shadow-2xs">
                          Vendor
                        </span>
                      ) : (
                        <span className="inline-block bg-gray-100 text-gray-700 border border-gray-200 text-[11px] font-semibold px-2 py-0.5 rounded-[2px]">
                          Member
                        </span>
                      )}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3 px-3">
                      {item.status === "Active" ? (
                        <span className="inline-block bg-[#00a65a] text-white text-[11px] font-semibold px-2 py-0.5 rounded-[2px] shadow-2xs">
                          Active
                        </span>
                      ) : (
                        <span className="inline-block bg-[#dd4b39] text-white text-[11px] font-semibold px-2 py-0.5 rounded-[2px] shadow-2xs">
                          Banned
                        </span>
                      )}
                    </td>

                    {/* Date */}
                    <td className="py-3 px-3 text-gray-600 text-[12px] whitespace-nowrap">
                      {item.date}
                    </td>

                    {/* Options Dropdown */}
                    <td className="py-3 px-3 relative whitespace-nowrap" data-user-options-menu>
                      <div className="relative inline-block text-left">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveDropdownId(activeDropdownId === item.id ? null : item.id);
                          }}
                          className="bg-[#605ca8] hover:bg-[#534f96] active:bg-[#464282] text-white text-[12px] font-normal px-3 py-1.5 rounded-[3px] transition-colors flex items-center justify-between whitespace-nowrap cursor-pointer shadow-xs min-w-[125px]"
                        >
                          <span>Select an option</span>
                          <span className="inline-block w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-t-[4px] border-t-white ml-2" />
                        </button>

                        {/* Dropdown Menu */}
                        {activeDropdownId === item.id && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="absolute right-0 mt-1 min-w-[160px] bg-white border border-[#ccc] rounded-[2px] shadow-[0_6px_12px_rgba(0,0,0,0.175)] z-50 py-1 text-[13px] animate-in fade-in-50 duration-75"
                          >
                            <button
                              type="button"
                              onClick={() => {
                                setChangeRoleUser(item);
                                setNewRole(item.role);
                                setActiveDropdownId(null);
                              }}
                              className="w-full px-4 py-2 text-left text-gray-700 hover:bg-[#f4f4f4] hover:text-[#333] flex items-center space-x-2.5 transition-colors cursor-pointer"
                            >
                              <Shield className="w-3.5 h-3.5 text-blue-500" />
                              <span>Change User Role</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleToggleBan(item)}
                              className="w-full px-4 py-2 text-left text-gray-700 hover:bg-[#f4f4f4] hover:text-[#333] flex items-center space-x-2.5 transition-colors cursor-pointer"
                            >
                              {item.status === "Active" ? (
                                <>
                                  <UserX className="w-3.5 h-3.5 text-amber-500" />
                                  <span>Ban User</span>
                                </>
                              ) : (
                                <>
                                  <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
                                  <span>Unban User</span>
                                </>
                              )}
                            </button>

                            <button
                              type="button"
                              onClick={() => handleToggleConfirmEmail(item)}
                              className="w-full px-4 py-2 text-left text-gray-700 hover:bg-[#f4f4f4] hover:text-[#333] flex items-center space-x-2.5 transition-colors cursor-pointer"
                            >
                              <Mail className="w-3.5 h-3.5 text-purple-500" />
                              <span>{item.emailConfirmed ? "Unconfirm Email" : "Confirm Email"}</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleOpenEdit(item)}
                              className="w-full px-4 py-2 text-left text-gray-700 hover:bg-[#f4f4f4] hover:text-[#333] flex items-center space-x-2.5 transition-colors cursor-pointer"
                            >
                              <Edit className="w-3.5 h-3.5 text-gray-400" />
                              <span>Edit User</span>
                            </button>

                            <div className="border-t border-gray-100 my-1" />

                            <button
                              type="button"
                              onClick={() => handleDeleteUser(item)}
                              className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center space-x-2.5 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom Pagination */}
        <div className="mt-4 pt-3 border-t border-[#f4f4f4] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[13px] text-gray-700 select-none">
          <div>
            Showing {(safeCurrentPage - 1) * showCount + 1} to{" "}
            {Math.min(safeCurrentPage * showCount, filteredUsers.length)} of {filteredUsers.length} entries
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-1 justify-end">
              {safeCurrentPage > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="h-[30px] px-2.5 border border-[#d2d6de] bg-white hover:bg-gray-50 text-gray-700 rounded-[3px] text-xs transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
              )}

              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setCurrentPage(pageNum)}
                  className={`h-[30px] min-w-[30px] px-2.5 rounded-[3px] text-xs font-normal transition-colors cursor-pointer border ${
                    safeCurrentPage === pageNum
                      ? "bg-[#0073b7] border-[#0073b7] text-white font-semibold"
                      : "bg-white border-[#d2d6de] text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              {safeCurrentPage < totalPages && (
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="h-[30px] px-2.5 border border-[#d2d6de] bg-white hover:bg-gray-50 text-gray-700 rounded-[3px] text-xs transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* EDIT USER MODAL */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-2xs">
          <div className="bg-white rounded-[4px] shadow-2xl w-full max-w-md overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-[#f4f4f4] flex items-center justify-between bg-gray-50">
              <h3 className="text-[17px] font-semibold text-[#333333]">
                Edit User ({editingUser.username})
              </h3>
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit}>
              <div className="p-6 space-y-4 text-[13.5px]">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Username <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editUsername}
                    onChange={(e) => setEditUsername(e.target.value)}
                    className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] outline-none focus:border-[#3c8dbc]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={editFullName}
                    onChange={(e) => setEditFullName(e.target.value)}
                    className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] outline-none focus:border-[#3c8dbc]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] outline-none focus:border-[#3c8dbc]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as "Active" | "Banned")}
                    className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] bg-white outline-none focus:border-[#3c8dbc]"
                  >
                    <option value="Active">Active</option>
                    <option value="Banned">Banned</option>
                  </select>
                </div>
              </div>

              <div className="px-6 py-3 border-t border-[#f4f4f4] bg-gray-50 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
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

      {/* CHANGE ROLE MODAL */}
      {changeRoleUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-2xs">
          <div className="bg-white rounded-[4px] shadow-2xl w-full max-w-sm overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-[#f4f4f4] flex items-center justify-between bg-gray-50">
              <h3 className="text-[17px] font-semibold text-[#333333]">
                Change Role ({changeRoleUser.username})
              </h3>
              <button
                type="button"
                onClick={() => setChangeRoleUser(null)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveRole}>
              <div className="p-6 space-y-4 text-[13.5px]">
                <p className="text-gray-600 text-xs">
                  Select a new membership role for this account:
                </p>
                <div>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as any)}
                    className="w-full h-[36px] px-3 border border-[#d2d6de] rounded-[3px] text-[13.5px] bg-white outline-none focus:border-[#3c8dbc]"
                  >
                    <option value="Member">Member (Customer/Buyer)</option>
                    <option value="Vendor">Vendor (Seller Store)</option>
                    <option value="Admin">Admin (Control Panel)</option>
                  </select>
                </div>
              </div>

              <div className="px-6 py-3 border-t border-[#f4f4f4] bg-gray-50 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setChangeRoleUser(null)}
                  className="h-[34px] px-4 border border-[#d2d6de] bg-white hover:bg-gray-100 text-[#444] text-[13px] rounded-[3px] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-[34px] px-5 bg-[#0073b7] hover:bg-[#005a92] text-white text-[13px] rounded-[3px] font-normal transition-colors cursor-pointer"
                >
                  Update Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
