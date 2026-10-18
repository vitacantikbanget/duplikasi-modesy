import { Suspense } from "react";
import { Metadata } from "next";
import MemberWalletDeposit from "@/components/member/wallet/MemberWalletDeposit";

export const metadata: Metadata = {
  title: "Checkout - Modesy",
  description: "Deposit funds checkout payment on Modesy.",
};

export default function MemberWalletDepositPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="text-sm text-gray-500">Loading checkout...</div>
        </div>
      }
    >
      <MemberWalletDeposit />
    </Suspense>
  );
}
