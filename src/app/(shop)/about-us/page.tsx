import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "About Us - Modesy",
  description: "Learn more about Modesy - Marketplace & Classified Ads Script.",
};

export default function AboutUsPage() {
  return (
    <div className="bg-[#fcfcfc] min-h-[70vh] py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-brand-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">About Us</span>
        </nav>

        <div className="bg-white border border-gray-200 rounded-[4px] p-6 sm:p-10 shadow-2xs">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">About Modesy</h1>
          
          <div className="text-gray-700 space-y-5 text-sm leading-relaxed">
            <p className="text-base text-gray-800 leading-relaxed font-normal">
              Modesy is a premier multi-vendor marketplace and classified ads platform built to empower creators, independent business owners, and shoppers across the globe.
            </p>

            <p>
              Whether you are looking to buy unique handmade accessories, source downloadable digital software and graphics, or sell pre-loved clothing and vintage goods, Modesy provides an all-in-one ecosystem designed for seamless commerce.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8 pt-4">
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-[4px] border border-gray-100">
                <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Multi-Vendor Capabilities</h4>
                  <p className="text-xs text-gray-500 mt-1">Each merchant receives a dedicated branded store, inventory tools, and custom sales dashboard.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-[4px] border border-gray-100">
                <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Flexible Product Types</h4>
                  <p className="text-xs text-gray-500 mt-1">Full support for physical deliveries, instant digital license downloads, and classified inquiries.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-[4px] border border-gray-100">
                <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Secure Global Payments</h4>
                  <p className="text-xs text-gray-500 mt-1">Support for multi-currency conversion, Stripe, PayPal, COD, and protected checkout.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-[4px] border border-gray-100">
                <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Verified Vendor Badges</h4>
                  <p className="text-xs text-gray-500 mt-1">Strict identity validation and community reviews maintain buyer peace-of-mind.</p>
                </div>
              </div>
            </div>

            <p>
              We are constantly refining our platform to deliver the best shopping experience for consumers and the most versatile seller suite for merchants.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
