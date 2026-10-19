import Link from "next/link";

export const metadata = {
  title: "Privacy Policy - Modesy",
  description: "Privacy policy and data protection guidelines at Modesy.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#fcfcfc] min-h-[70vh] py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-brand-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">Privacy Policy</span>
        </nav>

        <div className="bg-white border border-gray-200 rounded-[4px] p-6 sm:p-10 shadow-2xs">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          
          <div className="text-gray-700 space-y-5 text-sm leading-relaxed">
            <p>
              Your privacy is very important to us at Modesy. This Privacy Policy details the types of information we collect, how it is used, and the steps we take to protect your personal data.
            </p>

            <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us when creating an account, completing vendor registration, making purchases, sending messages, or submitting reviews. This may include your name, email address, postal address, phone number, and payment information.
            </p>

            <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">2. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-600">
              <li>Process and fulfill orders, including shipping coordination and payment settlements.</li>
              <li>Communicate order updates, tracking information, and security alerts.</li>
              <li>Improve marketplace features, algorithms, and personalized recommendations.</li>
              <li>Prevent fraudulent activity, spam, and malicious behavior.</li>
            </ul>

            <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">3. Data Sharing & Third Parties</h2>
            <p>
              We do not sell your personal data. We only share information with third parties necessary to provide our services, such as shipping couriers, payment processors, and regulatory compliance authorities when legally required.
            </p>

            <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">4. Data Security</h2>
            <p>
              We implement industry-standard encryption protocols (SSL/TLS) and strict access controls to safeguard your personal and transactional information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
