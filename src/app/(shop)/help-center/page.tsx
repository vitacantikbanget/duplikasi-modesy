"use client";

import Link from "next/link";
import { HelpCircle, Shield, ShoppingBag, CreditCard, RefreshCw, Send } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";

export default function HelpCenterPage() {
  const { t } = useAppContext();

  const faqs = [
    {
      q: "How do I purchase a product on Modesy?",
      a: "Browse the marketplace, select the product you wish to purchase, choose your preferred options (such as size or color if applicable), and click 'Add to Cart'. Proceed to checkout to complete your payment.",
    },
    {
      q: "Can I sell both physical and digital products?",
      a: "Yes! Modesy supports physical products (with shipping tracking), digital downloadable files (e.g. software, graphics, music, eBooks), and classified ads for local sales.",
    },
    {
      q: "What payment methods are supported?",
      a: "Modesy supports various global and local payment options including PayPal, Stripe, Cash on Delivery (COD), and Bank Transfer.",
    },
    {
      q: "How do I contact a vendor or seller?",
      a: "You can click on the vendor's profile name from any product page to visit their shop, where you can send them a direct message or view their contact information.",
    },
    {
      q: "What is the return and refund policy?",
      a: "Each vendor adheres to general marketplace return terms. If you receive an item that is damaged or not as described, you can open a dispute or contact support within 14 days of delivery.",
    },
  ];

  return (
    <div className="bg-[#fcfcfc] min-h-[70vh] py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-brand-primary transition-colors">
            {t("home")}
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">Help Center</span>
        </nav>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Help Center & FAQ</h1>
          <p className="text-sm text-gray-600">
            Find answers to commonly asked questions about buying, selling, payments, and account management.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border border-gray-200 rounded-[4px] p-6 text-center shadow-2xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-teal-50 text-brand-primary flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Buying & Orders</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Track orders, manage your cart, and learn how our escrow and delivery process works.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-[4px] p-6 text-center shadow-2xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-teal-50 text-brand-primary flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Payments & Payouts</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Secure transactions via trusted gateways, wallet withdrawals, and vendor payout rules.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-[4px] p-6 text-center shadow-2xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-teal-50 text-brand-primary flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Safety & Disputes</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Buyer protection, refund guidelines, reporting counterfeit items, and dispute resolution.
            </p>
          </div>
        </div>

        {/* FAQ Accordion list */}
        <div className="bg-white border border-gray-200 rounded-[4px] p-6 sm:p-8 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-brand-primary" />
            Frequently Asked Questions
          </h2>
          <div className="divide-y divide-gray-100 space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pt-4 first:pt-0">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">{faq.q}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support Banner */}
        <div className="bg-brand-primary/10 border border-brand-primary/20 rounded-[4px] p-6 text-center">
          <h3 className="text-base font-bold text-gray-800 mb-2">Still need help?</h3>
          <p className="text-xs text-gray-600 mb-4">
            Our friendly customer support team is available 24/7 to assist you with any questions.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-primary text-white text-xs font-semibold rounded-[4px] hover:bg-brand-primary/90 transition-colors shadow-2xs"
          >
            <Send className="w-4 h-4" />
            Contact Customer Support
          </Link>
        </div>
      </div>
    </div>
  );
}
