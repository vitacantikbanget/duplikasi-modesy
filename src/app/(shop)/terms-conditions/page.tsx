import Link from "next/link";

export const metadata = {
  title: "Terms & Conditions - Modesy",
  description: "Terms and conditions for using Modesy Marketplace.",
};

export default function TermsConditionsPage() {
  return (
    <div className="bg-[#fcfcfc] min-h-[70vh] py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-brand-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">Terms & Conditions</span>
        </nav>

        <div className="bg-white border border-gray-200 rounded-[4px] p-6 sm:p-10 shadow-2xs">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Terms & Conditions</h1>
          
          <div className="prose prose-sm max-w-none text-gray-700 space-y-5 text-sm leading-relaxed">
            <p>
              Welcome to Modesy. By accessing or using our marketplace platform, you agree to be bound by these Terms and Conditions. Please read them carefully.
            </p>

            <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">1. User Accounts</h2>
            <p>
              When creating an account on Modesy, you must provide accurate, complete, and current information. You are responsible for safeguarding your password and account details, and for all activities that occur under your account.
            </p>

            <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">2. Marketplace Transactions</h2>
            <p>
              Modesy provides an online marketplace platform enabling buyers and independent sellers to interact and transact. Modesy does not own, manufacture, or inspect items sold by third-party sellers unless explicitly indicated.
            </p>

            <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">3. Digital & Physical Items</h2>
            <p>
              Buyers purchasing digital goods receive immediate non-exclusive licenses to download files. For physical items, shipping times, delivery methods, and customs obligations are determined by the seller and carrier.
            </p>

            <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">4. Prohibited Content</h2>
            <p>
              Users may not post prohibited, illegal, infringing, abusive, or fraudulent materials. Modesy reserves the right to remove any listing or terminate any account violating our community standards.
            </p>

            <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">5. Limitation of Liability</h2>
            <p>
              Modesy shall not be liable for any indirect, incidental, special, or consequential damages resulting from transactions conducted between users on the platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
