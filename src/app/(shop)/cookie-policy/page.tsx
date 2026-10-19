import Link from "next/link";

export const metadata = {
  title: "Cookie Policy - Modesy",
  description: "Information about how Modesy uses cookies and tracking technologies.",
};

export default function CookiePolicyPage() {
  return (
    <div className="bg-[#fcfcfc] min-h-[70vh] py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-brand-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">Cookie Policy</span>
        </nav>

        <div className="bg-white border border-gray-200 rounded-[4px] p-6 sm:p-10 shadow-2xs">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Cookie Policy</h1>
          
          <div className="text-gray-700 space-y-5 text-sm leading-relaxed">
            <p>
              Modesy uses cookies and similar technologies to enhance your browsing experience, remember your preferences, and maintain shopping cart sessions.
            </p>

            <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">1. What are Cookies?</h2>
            <p>
              Cookies are small text files stored on your computer or mobile device when you visit our website. They help us remember your credentials, currency choices, and active cart items.
            </p>

            <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">2. How We Use Cookies</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-600">
              <li><strong>Essential Cookies:</strong> Required for account authentication, cart operations, and session persistence.</li>
              <li><strong>Preference Cookies:</strong> Remember your chosen currency, active language, and display modes.</li>
              <li><strong>Performance & Analytics:</strong> Aggregate statistics on visitor numbers and page popularity to improve website navigation.</li>
            </ul>

            <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">3. Managing Cookies</h2>
            <p>
              You can adjust your browser settings to reject or delete cookies. However, disabling essential cookies may impact your ability to checkout or stay logged in to your account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
