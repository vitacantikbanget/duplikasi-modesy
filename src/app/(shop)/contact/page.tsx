"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  Check,
  Send,
  MessageCircle,
} from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert("Please fill in all required fields.");
      return;
    }
    if (!termsAgreed) {
      alert("Please agree to the Terms & Conditions.");
      return;
    }

    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
    setTermsAgreed(false);

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="bg-white font-sans py-5">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb matching Modesy style */}
        <nav className="text-[12.5px] text-[#777] mb-4">
          <Link href="/" className="hover:text-[#00ab97] transition-colors">
            Home
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-[#333] font-normal">Contact</span>
        </nav>

        {/* Page Title */}
        <h1 className="text-[24px] font-bold text-[#222] mb-4">Contact</h1>

        {/* Description Paragraphs matching exact text from screenshot */}
        <div className="text-[13.5px] text-[#555] leading-relaxed space-y-3 mb-8">
          <p>
            We are here to help you with any questions, concerns, or feedback you may have
            about our platform. Whether you are a buyer or a seller, our team is dedicated
            to providing you with the best possible support. If you need assistance with an
            order, have questions about our platform, or simply want to provide feedback,
            please don&#39;t hesitate to contact us. You can reach us through our contact
            form, located on this page. Simply fill out the form with your details and a
            brief message, and we will get back to you as soon as possible.
          </p>
          <p>
            Alternatively, you can also reach us through our social media channels or
            email. Our team is available to assist you with any questions or concerns you
            may have.
          </p>
        </div>

        {/* Success Alert Banner */}
        {submitted && (
          <div className="mb-6 p-4 bg-[#e8f8f5] border border-[#a3e4d7] text-[#0e6251] rounded-[3px] text-[13.5px] flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#00ab97] stroke-[3]" />
              <span>
                Thank you! Your message has been sent successfully. We will get back to you
                shortly.
              </span>
            </div>
            <button
              onClick={() => setSubmitted(false)}
              className="text-[#0e6251] hover:text-black text-[12px] font-semibold"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Main Content Grid: Form (Left) & Contact Details (Right) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8">
          {/* Left Column: Leave Message Form */}
          <div className="md:col-span-7 lg:col-span-8">
            <h2 className="text-[18px] font-semibold text-[#222] mb-4">
              Leave Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-[#d2d6de] focus:border-[#00ab97] rounded-[3px] text-[13px] text-[#333] placeholder:text-gray-400 focus:outline-none transition-colors"
                  required
                />
              </div>

              {/* Email Address */}
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-[#d2d6de] focus:border-[#00ab97] rounded-[3px] text-[13px] text-[#333] placeholder:text-gray-400 focus:outline-none transition-colors"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <textarea
                  rows={6}
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-[#d2d6de] focus:border-[#00ab97] rounded-[3px] text-[13px] text-[#333] placeholder:text-gray-400 focus:outline-none transition-colors resize-none"
                  required
                />
              </div>

              {/* Terms & Conditions Checkbox */}
              <div className="pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-[13px] text-[#555]">
                  <input
                    type="checkbox"
                    checked={termsAgreed}
                    onChange={(e) => setTermsAgreed(e.target.checked)}
                    className="w-4 h-4 rounded-[2px] accent-[#00ab97] cursor-pointer"
                    required
                  />
                  <span>
                    I have read and agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-[#222] font-semibold underline hover:text-[#00ab97] transition-colors"
                    >
                      Terms &amp; Conditions
                    </Link>
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="px-8 py-2.5 bg-[#00ab97] hover:bg-[#009684] text-white rounded-[3px] text-[13.5px] font-medium transition-colors shadow-2xs cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Contact Details & Social Links */}
          <div className="md:col-span-5 lg:col-span-4 pt-2 md:pt-10 space-y-6">
            {/* Contact Info rows matching screenshot */}
            <div className="space-y-3.5 text-[13.5px] text-[#333]">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#6c757d] shrink-0" />
                <span>(541) 754-30103</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#6c757d] shrink-0" />
                <span>edward_test@domain.com</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#6c757d] shrink-0 mt-0.5" />
                <span>3111 Camino Del Rio N Suite 400 San Diego</span>
              </div>
            </div>

            {/* Social Media Circular Buttons matching Screenshot 1 & 2 */}
            <div className="space-y-2 pt-2">
              {/* Row 1: Facebook, X, Instagram, TikTok, WhatsApp, YouTube, Discord, Telegram, Pinterest, LinkedIn, Twitch */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  title="Facebook"
                  className="w-8 h-8 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-500 hover:text-[#00ab97] hover:border-[#00ab97] transition-colors text-xs font-serif font-bold"
                >
                  f
                </a>

                {/* X */}
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  title="X (Twitter)"
                  className="w-8 h-8 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-500 hover:text-[#00ab97] hover:border-[#00ab97] transition-colors text-xs font-bold"
                >
                  X
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  title="Instagram"
                  className="w-8 h-8 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-500 hover:text-[#00ab97] hover:border-[#00ab97] transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* TikTok */}
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  title="TikTok"
                  className="w-8 h-8 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-500 hover:text-[#00ab97] hover:border-[#00ab97] transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.4a6.33 6.33 0 0 0-.85-.06A6.34 6.34 0 0 0 3 15.68a6.34 6.34 0 0 0 6.34 6.32 6.34 6.34 0 0 0 6.32-6.32V8.67a8.28 8.28 0 0 0 4.93 1.63v-3.61a4.84 4.84 0 0 1-1-.0z" />
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://whatsapp.com"
                  target="_blank"
                  rel="noreferrer"
                  title="WhatsApp"
                  className="w-8 h-8 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-500 hover:text-[#00ab97] hover:border-[#00ab97] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  title="YouTube"
                  className="w-8 h-8 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-500 hover:text-[#00ab97] hover:border-[#00ab97] transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>

                {/* Discord */}
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noreferrer"
                  title="Discord"
                  className="w-8 h-8 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-500 hover:text-[#00ab97] hover:border-[#00ab97] transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028z" />
                  </svg>
                </a>

                {/* Telegram */}
                <a
                  href="https://telegram.org"
                  target="_blank"
                  rel="noreferrer"
                  title="Telegram"
                  className="w-8 h-8 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-500 hover:text-[#00ab97] hover:border-[#00ab97] transition-colors"
                >
                  <Send className="w-3.5 h-3.5 -ml-0.5" />
                </a>

                {/* Pinterest */}
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noreferrer"
                  title="Pinterest"
                  className="w-8 h-8 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-500 hover:text-[#00ab97] hover:border-[#00ab97] transition-colors text-xs font-serif font-bold"
                >
                  P
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  title="LinkedIn"
                  className="w-8 h-8 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-500 hover:text-[#00ab97] hover:border-[#00ab97] transition-colors text-xs font-bold"
                >
                  in
                </a>

                {/* Twitch */}
                <a
                  href="https://twitch.tv"
                  target="_blank"
                  rel="noreferrer"
                  title="Twitch"
                  className="w-8 h-8 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-500 hover:text-[#00ab97] hover:border-[#00ab97] transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" />
                  </svg>
                </a>
              </div>

              {/* Row 2: VK */}
              <div className="flex items-center gap-2">
                <a
                  href="https://vk.com"
                  target="_blank"
                  rel="noreferrer"
                  title="VK"
                  className="w-8 h-8 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-500 hover:text-[#00ab97] hover:border-[#00ab97] transition-colors text-[10.5px] font-bold"
                >
                  VK
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Google Map matching Screenshot 2 & 3 */}
        <div className="w-full h-[400px] md:h-[450px] relative rounded-[3px] overflow-hidden border border-[#e4e7ea] mb-12 shadow-xs">
          {/* Floating Location Card matching Screenshot 2 */}
          <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-xs p-3.5 rounded-[3px] shadow-md border border-gray-200 text-xs text-gray-700 max-w-[270px]">
            <h4 className="font-bold text-[13px] text-gray-900 mb-1 leading-snug">
              3111 Camino Del Rio N Suite: 400
            </h4>
            <p className="text-gray-500 text-[11.5px] leading-snug mb-3">
              3111 Camino Del Rio N Suite: 400, San Diego, CA 92108, USA
            </p>
            <a
              href="https://maps.google.com/?q=3111+Camino+Del+Rio+N+Suite+400+San+Diego+CA+92108"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#007cc3] hover:bg-[#0066a3] text-white rounded-[2px] text-[11px] font-medium transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Open in Maps</span>
            </a>
          </div>

          {/* Embedded Google Map */}
          <iframe
            title="Office Location Map"
            src="https://maps.google.com/maps?q=3111+Camino+Del+Rio+N+Suite+400,+San+Diego,+CA+92108&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
