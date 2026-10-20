"use client";

import { useState } from "react";
import {
  Check,
  Maximize2,
  Code,
  Eye,
  Undo2,
  Redo2,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Type,
  Highlighter,
  Image as ImageIcon,
  Video,
  Link2,
  CheckCircle2,
} from "lucide-react";

const INITIAL_SHOP_POLICIES_TEXT = `Welcome to the Modesy e-commerce platform! As a vendor, establishing clear shop policies is essential to building trust with your customers and ensuring a smooth and transparent transaction process. This guide will help you create effective shop policies tailored to your unique business needs on the Modesy platform.



1. Shipping Policy

Processing Time: Clearly state the time it takes to prepare and ship orders. This might vary depending on the product type and availability. For example, "All orders are processed within 2-3 business days."

Shipping Methods: Outline the available shipping options, including standard, express, and any international shipping services you offer. Include estimated delivery times and the carriers used (e.g., USPS, FedEx, DHL).

Shipping Fees: Specify if you offer free shipping or if fees apply. If applicable, include details about flat-rate shipping, weight-based pricing, or any other shipping fee structure.

International Shipping: If you ship internationally, mention any restrictions, additional fees, or customs duties that may apply.



2. Returns and Exchanges

Return Eligibility: Define the conditions under which items can be returned, such as within a specific time frame (e.g., "Items can be returned within 14 days of receipt"). Specify which products are non-returnable, like perishable goods, custom-made items, or digital downloads.

Return Process: Explain the steps customers need to take to initiate a return or exchange. Include instructions for contacting customer support, returning the product, and any required documentation (e.g., receipt or proof of purchase).

Refunds: State how and when refunds will be issued (e.g., "Refunds will be processed within 5 business days of receiving the returned item"). Indicate whether the original shipping fee will be refunded and how the customer will receive their refund (e.g., original payment method, store credit).

Exchanges: If you offer exchanges, detail the process and any conditions. For example, "Exchanges are only available for items of equal or lesser value."



3. Payment Policy

Accepted Payment Methods: List all payment methods you accept, such as credit/debit cards, PayPal, bank transfers, or other payment gateways supported by Modesy.

Payment Terms: Clarify when payment is due, especially for custom or made-to-order items. For example, "Full payment is required at the time of purchase."

Payment Security: Reassure customers by highlighting the security measures you take to protect their payment information, such as encryption or secure payment gateways.



4. Cancellation Policy

Order Cancellations: Outline the conditions under which customers can cancel their orders. Include a time frame, such as "Orders can be canceled within 24 hours of purchase."

Non-Cancellable Orders: Specify any circumstances in which orders cannot be canceled, such as custom or personalized items.

Refunds for Cancellations: Explain if and how refunds will be processed for canceled orders, and whether any fees will be deducted.



5. Privacy Policy

Customer Information: Ensure customers that their personal information is handled with care. Mention what data is collected (e.g., name, address, payment details) and how it is used (e.g., order processing, marketing).

Data Protection: Describe the measures you take to protect customer data, such as encryption, secure servers, and compliance with data protection regulations.

Third-Party Sharing: Clearly state if and when customer data might be shared with third parties, such as for shipping or payment processing.



6. Customer Service

Contact Information: Provide clear instructions on how customers can contact you with questions or concerns. Include your preferred communication channels, such as email, phone, or a contact form on your Modesy store page.

Response Time: Set expectations for when customers can expect a response. For example, "We aim to respond to all inquiries within 24 hours."

Dispute Resolution: Explain your approach to resolving disputes, including how customers can escalate issues if they are not satisfied with the initial resolution.



7. Store Rules

Behavioral Expectations: Define any specific rules for customers interacting with your store, such as respectful communication or adherence to community guidelines.

Prohibited Actions: List any actions that are not allowed, such as fraudulent transactions or abusive behavior. Explain the consequences of violating these rules, such as order cancellation or account suspension.



8. Custom Orders

Process for Custom Orders: Detail how customers can request custom orders, including the required information, design approval process, and payment terms.

Lead Time: Clearly state the time frame for creating and delivering custom orders, which may be longer than standard items.

No Returns on Custom Orders: If applicable, inform customers that custom orders are non-returnable and non-refundable unless defective.



9. Digital Products (If Applicable)

Delivery of Digital Products: Specify how and when digital products will be delivered, such as via email or download link, immediately upon payment confirmation.

Usage Rights: Clarify the rights customers have regarding the use of digital products, such as personal use only or restrictions on sharing.

No Returns on Digital Products: Explain that digital products are non-returnable and non-refundable due to the nature of the product.



10. Legal Compliance

Consumer Rights: Ensure your policies comply with relevant consumer protection laws, including rights to return items, warranties, and data protection regulations.

Jurisdiction: If necessary, state the legal jurisdiction under which your shop operates, particularly for resolving disputes.

Establishing clear and concise shop policies on your Modesy store is crucial for creating a trustworthy and professional shopping experience. Regularly review and update your policies to reflect any changes in your business practices or legal requirements. By doing so, you’ll not only protect your business but also enhance customer satisfaction and loyalty.`;

export default function ShopPoliciesPage() {
  const [status, setStatus] = useState<"enable" | "disable">("enable");
  const [content, setContent] = useState(INITIAL_SHOP_POLICIES_TEXT);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMessage("Shop policies have been saved successfully!");
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <div className="w-full relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#00ab97] text-white px-5 py-3 rounded-[3px] shadow-lg flex items-center gap-2.5 text-[13.5px] animate-in fade-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-white" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container Card */}
      <div className="bg-white rounded-[4px] border border-[#e9ecef] p-6 lg:p-8 shadow-xs">
        {/* Title */}
        <h1 className="text-[18px] font-bold text-[#2c333e] mb-6 font-sans">
          Shop Policies
        </h1>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Status Radio */}
          <div>
            <label className="block text-[13px] font-semibold text-[#2c333e] mb-2 font-sans">
              Status
            </label>
            <div className="flex items-center gap-12 mt-1">
              <label
                onClick={() => setStatus("enable")}
                className="inline-flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#2c333e]"
              >
                <div
                  className={`w-[18px] h-[18px] rounded-full flex items-center justify-center transition-colors ${
                    status === "enable"
                      ? "bg-[#00ab97] text-white"
                      : "border border-[#c2c7ce] bg-white"
                  }`}
                >
                  {status === "enable" && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </div>
                <span>Enable</span>
              </label>

              <label
                onClick={() => setStatus("disable")}
                className="inline-flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#2c333e]"
              >
                <div
                  className={`w-[18px] h-[18px] rounded-full flex items-center justify-center transition-colors ${
                    status === "disable"
                      ? "bg-[#00ab97] text-white"
                      : "border border-[#c2c7ce] bg-white"
                  }`}
                >
                  {status === "disable" && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </div>
                <span>Disable</span>
              </label>
            </div>
          </div>

          {/* Content (Rich Text Editor) */}
          <div>
            <label className="block text-[13px] font-semibold text-[#2c333e] mb-2 font-sans">
              Content
            </label>

            <div className="border border-[#d2d6de] rounded-[3px] overflow-hidden bg-white">
              {/* Menu Bar (File, Insert, Format, Table) */}
              <div className="border-b border-[#eceeef] bg-[#fbfcfd] px-3 py-1.5 flex items-center gap-4 text-[12.5px] text-[#495057] select-none">
                <button type="button" className="hover:text-[#00ab97] transition-colors">File</button>
                <button type="button" className="hover:text-[#00ab97] transition-colors">Insert</button>
                <button type="button" className="hover:text-[#00ab97] transition-colors">Format</button>
                <button type="button" className="hover:text-[#00ab97] transition-colors">Table</button>
              </div>

              {/* Toolbar */}
              <div className="border-b border-[#eceeef] bg-[#fbfcfd] p-2 flex flex-wrap items-center gap-2 text-[#495057]">
                <button type="button" className="p-1 hover:bg-gray-200 rounded-[2px]" title="Fullscreen">
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
                <button type="button" className="p-1 hover:bg-gray-200 rounded-[2px]" title="Source Code">
                  <Code className="w-3.5 h-3.5" />
                </button>
                <button type="button" className="p-1 hover:bg-gray-200 rounded-[2px]" title="Preview">
                  <Eye className="w-3.5 h-3.5" />
                </button>

                <div className="w-[1px] h-4 bg-[#dee2e6] mx-0.5" />

                <button type="button" className="p-1 hover:bg-gray-200 rounded-[2px]" title="Undo">
                  <Undo2 className="w-3.5 h-3.5" />
                </button>
                <button type="button" className="p-1 hover:bg-gray-200 rounded-[2px]" title="Redo">
                  <Redo2 className="w-3.5 h-3.5" />
                </button>

                <div className="w-[1px] h-4 bg-[#dee2e6] mx-0.5" />

                <button type="button" className="p-1 hover:bg-gray-200 rounded-[2px]" title="Bold">
                  <Bold className="w-3.5 h-3.5" />
                </button>
                <button type="button" className="p-1 hover:bg-gray-200 rounded-[2px]" title="Italic">
                  <Italic className="w-3.5 h-3.5" />
                </button>
                <button type="button" className="p-1 hover:bg-gray-200 rounded-[2px]" title="Underline">
                  <Underline className="w-3.5 h-3.5" />
                </button>
                <button type="button" className="p-1 hover:bg-gray-200 rounded-[2px]" title="Strikethrough">
                  <Strikethrough className="w-3.5 h-3.5" />
                </button>

                <div className="w-[1px] h-4 bg-[#dee2e6] mx-0.5" />

                <button type="button" className="p-1 hover:bg-gray-200 rounded-[2px]" title="Align Left">
                  <AlignLeft className="w-3.5 h-3.5" />
                </button>
                <button type="button" className="p-1 hover:bg-gray-200 rounded-[2px]" title="Align Center">
                  <AlignCenter className="w-3.5 h-3.5" />
                </button>
                <button type="button" className="p-1 hover:bg-gray-200 rounded-[2px]" title="Align Right">
                  <AlignRight className="w-3.5 h-3.5" />
                </button>
                <button type="button" className="p-1 hover:bg-gray-200 rounded-[2px]" title="Justify">
                  <AlignJustify className="w-3.5 h-3.5" />
                </button>

                <div className="w-[1px] h-4 bg-[#dee2e6] mx-0.5" />

                <button type="button" className="p-1 hover:bg-gray-200 rounded-[2px]" title="Bullet List">
                  <List className="w-3.5 h-3.5" />
                </button>
                <button type="button" className="p-1 hover:bg-gray-200 rounded-[2px]" title="Numbered List">
                  <ListOrdered className="w-3.5 h-3.5" />
                </button>

                <div className="w-[1px] h-4 bg-[#dee2e6] mx-0.5" />

                <button type="button" className="p-1 hover:bg-gray-200 rounded-[2px]" title="Font Color">
                  <Type className="w-3.5 h-3.5" />
                </button>
                <button type="button" className="p-1 hover:bg-gray-200 rounded-[2px]" title="Highlight">
                  <Highlighter className="w-3.5 h-3.5" />
                </button>

                <div className="w-[1px] h-4 bg-[#dee2e6] mx-0.5" />

                <button type="button" className="p-1 hover:bg-gray-200 rounded-[2px]" title="Insert Image">
                  <ImageIcon className="w-3.5 h-3.5" />
                </button>
                <button type="button" className="p-1 hover:bg-gray-200 rounded-[2px]" title="Insert Media">
                  <Video className="w-3.5 h-3.5" />
                </button>
                <button type="button" className="p-1 hover:bg-gray-200 rounded-[2px]" title="Insert Link">
                  <Link2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Editor Content Area */}
              <textarea
                rows={18}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-4 text-[13px] text-[#2c333e] focus:outline-hidden font-sans leading-relaxed resize-y"
              />

              {/* Status Bar */}
              <div className="border-t border-[#eceeef] bg-[#fbfcfd] px-3 py-1 flex items-center justify-between text-[11px] text-[#8c98a4] select-none">
                <span>p</span>
                <span className="font-semibold text-[#6c757d] flex items-center gap-1">
                  ⚡ tiny
                </span>
              </div>
            </div>
          </div>

          {/* Save Changes Button */}
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="bg-[#00ab97] hover:bg-[#009684] text-white text-[13px] font-medium px-5 py-2 rounded-[3px] transition-colors shadow-2xs cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
