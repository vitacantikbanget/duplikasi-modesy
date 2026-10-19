import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function AccessDenied({ restrictedPath }: { restrictedPath: string }) {
  return (
    <div className="bg-white rounded-[4px] border border-gray-200 p-8 max-w-lg mx-auto text-center shadow-xs mt-12">
      <div className="w-14 h-14 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-4">
        <ShieldAlert className="w-8 h-8" />
      </div>
      <h2 className="text-lg font-bold text-gray-900 mb-2">Access Denied (403)</h2>
      <p className="text-xs text-gray-600 mb-6">
        Your current role does not have permission to view <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-800 font-mono">{restrictedPath}</code>.
      </p>
      <Link
        href="/admin"
        className="inline-block px-4 py-2 bg-[#00ab97] hover:bg-[#009684] text-white text-xs font-semibold rounded-[3px] transition-colors"
      >
        Back to Admin Dashboard
      </Link>
    </div>
  );
}
