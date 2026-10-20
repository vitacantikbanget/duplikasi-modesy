"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Home, CheckCircle, Send } from "lucide-react";

export default function EmailSettingsPage() {
  const [mailProtocol, setMailProtocol] = useState<"smtp" | "mail">("smtp");
  const [mailTitle, setMailTitle] = useState("Modesy Marketplace");
  const [mailHost, setMailHost] = useState("smtp.gmail.com");
  const [mailPort, setMailPort] = useState("587");
  const [mailUsername, setMailUsername] = useState("noreply@modesy.com");
  const [mailPassword, setMailPassword] = useState("••••••••••••");
  const [mailEncryption, setMailEncryption] = useState<"tls" | "ssl" | "none">("tls");
  const [mailReplyTo, setMailReplyTo] = useState("support@modesy.com");
  
  // Email Verification
  const [emailVerification, setEmailVerification] = useState("1");
  
  // Notification options
  const [orderEmail, setOrderEmail] = useState("1");
  const [contactEmail, setContactEmail] = useState("1");
  const [productApprovedEmail, setProductApprovedEmail] = useState("1");

  // Test email
  const [testEmailTo, setTestEmailTo] = useState("");
  const [notification, setNotification] = useState<string | null>(null);

  const handleSaveSmtp = (e: React.FormEvent) => {
    e.preventDefault();
    setNotification("Email settings saved successfully!");
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSaveVerification = (e: React.FormEvent) => {
    e.preventDefault();
    setNotification("Email verification settings updated successfully!");
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSaveOptions = (e: React.FormEvent) => {
    e.preventDefault();
    setNotification("Email notification options updated successfully!");
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSendTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testEmailTo.trim()) return;
    setNotification(`Test email successfully sent to ${testEmailTo}!`);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="text-[13px] text-gray-700">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-[24px] text-gray-700 font-normal leading-tight">Email Settings</h1>
        </div>
        <div className="text-[12px] text-[#777] flex items-center gap-1.5">
          <Link href="/admin" className="text-[#3c8dbc] hover:underline flex items-center gap-1">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <span>/</span>
          <span>Settings</span>
          <span>/</span>
          <span className="text-gray-500">Email Settings</span>
        </div>
      </div>

      {notification && (
        <div className="mb-4 px-4 py-3 bg-[#dff0d8] border border-[#d6e9c6] text-[#3c763d] rounded-[3px] flex items-center gap-2">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column (8 Cols): Main SMTP Config */}
        <div className="lg:col-span-8 space-y-5">
          {/* Email Settings Box */}
          <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border-t-[3px] border-[#3c8dbc] border-x border-b border-[#d2d6de]/60">
            <div className="px-5 py-3 border-b border-[#f4f4f4]">
              <h3 className="text-[#333333] text-[16px] font-semibold">Email Settings</h3>
            </div>
            <form onSubmit={handleSaveSmtp}>
              <div className="p-5 space-y-4">
                <div>
                  <label className="block text-[13px] font-bold text-[#333333] mb-1">Mail Protocol</label>
                  <div className="flex items-center gap-6 mt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="mailProtocol"
                        checked={mailProtocol === "smtp"}
                        onChange={() => setMailProtocol("smtp")}
                        className="text-[#3c8dbc] focus:ring-0"
                      />
                      <span>SMTP</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="mailProtocol"
                        checked={mailProtocol === "mail"}
                        onChange={() => setMailProtocol("mail")}
                        className="text-[#3c8dbc] focus:ring-0"
                      />
                      <span>Mail</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-[#333333] mb-1">Mail Title</label>
                  <input
                    type="text"
                    required
                    value={mailTitle}
                    onChange={(e) => setMailTitle(e.target.value)}
                    className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
                  />
                </div>

                {mailProtocol === "smtp" && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[13px] font-bold text-[#333333] mb-1">Mail Host</label>
                        <input
                          type="text"
                          required
                          value={mailHost}
                          onChange={(e) => setMailHost(e.target.value)}
                          placeholder="smtp.gmail.com"
                          className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
                        />
                      </div>
                      <div>
                        <label className="block text-[13px] font-bold text-[#333333] mb-1">Mail Port</label>
                        <input
                          type="text"
                          required
                          value={mailPort}
                          onChange={(e) => setMailPort(e.target.value)}
                          placeholder="587"
                          className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[13px] font-bold text-[#333333] mb-1">Mail Username</label>
                        <input
                          type="text"
                          required
                          value={mailUsername}
                          onChange={(e) => setMailUsername(e.target.value)}
                          className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
                        />
                      </div>
                      <div>
                        <label className="block text-[13px] font-bold text-[#333333] mb-1">Mail Password</label>
                        <input
                          type="password"
                          required
                          value={mailPassword}
                          onChange={(e) => setMailPassword(e.target.value)}
                          className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[13px] font-bold text-[#333333] mb-1">Mail Encryption</label>
                      <div className="flex items-center gap-6 mt-1">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="encryption"
                            checked={mailEncryption === "tls"}
                            onChange={() => setMailEncryption("tls")}
                            className="text-[#3c8dbc] focus:ring-0"
                          />
                          <span>TLS</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="encryption"
                            checked={mailEncryption === "ssl"}
                            onChange={() => setMailEncryption("ssl")}
                            className="text-[#3c8dbc] focus:ring-0"
                          />
                          <span>SSL</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="encryption"
                            checked={mailEncryption === "none"}
                            onChange={() => setMailEncryption("none")}
                            className="text-[#3c8dbc] focus:ring-0"
                          />
                          <span>None</span>
                        </label>
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-[13px] font-bold text-[#333333] mb-1">Mail Reply-To</label>
                  <input
                    type="email"
                    required
                    value={mailReplyTo}
                    onChange={(e) => setMailReplyTo(e.target.value)}
                    className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
                  />
                </div>
              </div>
              <div className="px-5 py-3 border-t border-[#f4f4f4] bg-white flex justify-end">
                <button
                  type="submit"
                  className="bg-[#0088cc] hover:bg-[#0077b3] text-white px-4 py-[7px] rounded-[3px] text-[13px] font-medium transition-colors cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          {/* Email Notification Options Box */}
          <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border-t-[3px] border-[#3c8dbc] border-x border-b border-[#d2d6de]/60">
            <div className="px-5 py-3 border-b border-[#f4f4f4]">
              <h3 className="text-[#333333] text-[16px] font-semibold">Email Notification Options</h3>
            </div>
            <form onSubmit={handleSaveOptions}>
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div>
                    <label className="text-[13px] font-bold text-[#333333] block">Send Email When Order is Received</label>
                    <span className="text-[12px] text-gray-500">Buyer and vendor will receive automated confirmation emails</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="orderEmail"
                        checked={orderEmail === "1"}
                        onChange={() => setOrderEmail("1")}
                        className="text-[#3c8dbc] focus:ring-0"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="orderEmail"
                        checked={orderEmail === "0"}
                        onChange={() => setOrderEmail("0")}
                        className="text-[#3c8dbc] focus:ring-0"
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div>
                    <label className="text-[13px] font-bold text-[#333333] block">Send Email When Contact Message is Sent</label>
                    <span className="text-[12px] text-gray-500">Admins will receive notification on new contact inbox messages</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="contactEmail"
                        checked={contactEmail === "1"}
                        onChange={() => setContactEmail("1")}
                        className="text-[#3c8dbc] focus:ring-0"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="contactEmail"
                        checked={contactEmail === "0"}
                        onChange={() => setContactEmail("0")}
                        className="text-[#3c8dbc] focus:ring-0"
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <label className="text-[13px] font-bold text-[#333333] block">Send Email When Product is Approved</label>
                    <span className="text-[12px] text-gray-500">Vendors will be notified when pending product is approved</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="productApprovedEmail"
                        checked={productApprovedEmail === "1"}
                        onChange={() => setProductApprovedEmail("1")}
                        className="text-[#3c8dbc] focus:ring-0"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="productApprovedEmail"
                        checked={productApprovedEmail === "0"}
                        onChange={() => setProductApprovedEmail("0")}
                        className="text-[#3c8dbc] focus:ring-0"
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="px-5 py-3 border-t border-[#f4f4f4] bg-white flex justify-end">
                <button
                  type="submit"
                  className="bg-[#0088cc] hover:bg-[#0077b3] text-white px-4 py-[7px] rounded-[3px] text-[13px] font-medium transition-colors cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column (4 Cols): Verification & Test Email */}
        <div className="lg:col-span-4 space-y-5">
          {/* Email Verification Box */}
          <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border-t-[3px] border-[#3c8dbc] border-x border-b border-[#d2d6de]/60">
            <div className="px-5 py-3 border-b border-[#f4f4f4]">
              <h3 className="text-[#333333] text-[16px] font-semibold">Email Verification</h3>
            </div>
            <form onSubmit={handleSaveVerification}>
              <div className="p-5 space-y-4">
                <div>
                  <label className="block text-[13px] font-bold text-[#333333] mb-1">Email Verification</label>
                  <div className="flex items-center gap-6 mt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="emailVerification"
                        checked={emailVerification === "1"}
                        onChange={() => setEmailVerification("1")}
                        className="text-[#3c8dbc] focus:ring-0"
                      />
                      <span>Enable</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="emailVerification"
                        checked={emailVerification === "0"}
                        onChange={() => setEmailVerification("0")}
                        className="text-[#3c8dbc] focus:ring-0"
                      />
                      <span>Disable</span>
                    </label>
                  </div>
                  <p className="text-[12px] text-gray-500 mt-2">
                    When enabled, newly registered users must verify their email address before accessing their account features.
                  </p>
                </div>
              </div>
              <div className="px-5 py-3 border-t border-[#f4f4f4] bg-white flex justify-end">
                <button
                  type="submit"
                  className="bg-[#0088cc] hover:bg-[#0077b3] text-white px-4 py-[7px] rounded-[3px] text-[13px] font-medium transition-colors cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          {/* Send Test Email Box */}
          <div className="bg-white rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] border-t-[3px] border-[#3c8dbc] border-x border-b border-[#d2d6de]/60">
            <div className="px-5 py-3 border-b border-[#f4f4f4]">
              <h3 className="text-[#333333] text-[16px] font-semibold">Send Test Email</h3>
            </div>
            <form onSubmit={handleSendTest}>
              <div className="p-5 space-y-4">
                <p className="text-[12px] text-gray-600">
                  You can check whether your email server is working properly by sending a test email.
                </p>
                <div>
                  <label className="block text-[13px] font-bold text-[#333333] mb-1">Recipient Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. yourname@example.com"
                    value={testEmailTo}
                    onChange={(e) => setTestEmailTo(e.target.value)}
                    className="w-full h-[34px] px-3 border border-[#d2d6de] rounded-[3px] text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#3c8dbc]"
                  />
                </div>
              </div>
              <div className="px-5 py-3 border-t border-[#f4f4f4] bg-white flex justify-end">
                <button
                  type="submit"
                  className="bg-[#00a65a] hover:bg-[#008d4c] text-white px-4 py-[7px] rounded-[3px] text-[13px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" /> Send Email
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
