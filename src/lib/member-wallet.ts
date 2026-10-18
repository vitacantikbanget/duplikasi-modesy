export interface WalletDeposit {
  id: string;
  paymentId: string;
  paymentMethod: string;
  amount: number;
  currency: string;
  status: "Completed" | "Pending Payment";
  isReported: boolean;
  date: string;
}

export interface WalletExpense {
  id: string;
  paymentId: string;
  expenseTitle: string;
  orderNumber: string;
  amount: number;
  currency: string;
  date: string;
}

export interface WalletPayout {
  id: string;
  withdrawalMethod: string;
  withdrawalAmount: number;
  currency: string;
  status: string;
  date: string;
}

export interface PayoutSettings {
  paypalEmail: string;
  btcAddress: string;
  iban: {
    fullName: string;
    country: string;
    bankName: string;
    ibanNumber: string;
  };
  swift: {
    fullName: string;
    country: string;
    bankName: string;
    branchName: string;
    accountNumber: string;
    swiftCode: string;
  };
}

export interface WalletData {
  balance: number;
  deposits: WalletDeposit[];
  expenses: WalletExpense[];
  payouts: WalletPayout[];
  payoutSettings: PayoutSettings;
}

export const DEFAULT_MEMBER_WALLET: WalletData = {
  balance: 45.0,
  deposits: [
    {
      id: "dep-1",
      paymentId: "BTR-HMDQRCZDHE-CPZTJXWK",
      paymentMethod: "Bank Transfer",
      amount: 10,
      currency: "USD",
      status: "Pending Payment",
      isReported: true,
      date: "2026-09-17 / 17:57",
    },
    {
      id: "dep-2",
      paymentId: "BTR-HMDP9KNW0G-1Y394WJO",
      paymentMethod: "Bank Transfer",
      amount: 10,
      currency: "USD",
      status: "Pending Payment",
      isReported: false,
      date: "2026-09-17 / 17:03",
    },
    {
      id: "dep-3",
      paymentId: "BTR-HM9SZHF57S-369RASZE",
      paymentMethod: "Bank Transfer",
      amount: 10,
      currency: "USD",
      status: "Pending Payment",
      isReported: false,
      date: "2026-09-13 / 14:19",
    },
    {
      id: "dep-4",
      paymentId: "BTR-HMOLW07M4I-AG1OP9OR",
      paymentMethod: "Bank Transfer",
      amount: 10,
      currency: "USD",
      status: "Pending Payment",
      isReported: false,
      date: "2026-09-05 / 20:02",
    },
    {
      id: "dep-5",
      paymentId: "BTR-HLWS2ZQ5XN-5CTYLLNC",
      paymentMethod: "Bank Transfer",
      amount: 25,
      currency: "USD",
      status: "Pending Payment",
      isReported: false,
      date: "2026-09-02 / 08:42",
    },
    {
      id: "dep-6",
      paymentId: "BTR-HLVTZUEYA6-8ACII09U",
      paymentMethod: "Bank Transfer",
      amount: 100,
      currency: "USD",
      status: "Pending Payment",
      isReported: false,
      date: "2026-09-01 / 12:05",
    },
  ],
  expenses: [],
  payouts: [],
  payoutSettings: {
    paypalEmail: "members@gmail.com",
    btcAddress: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    iban: {
      fullName: "Peter Jone",
      country: "United States",
      bankName: "Chase Bank N.A.",
      ibanNumber: "US64CHAS12345678901234",
    },
    swift: {
      fullName: "Peter Jone",
      country: "United States",
      bankName: "Bank of America",
      branchName: "New York Downtown",
      accountNumber: "987654321098",
      swiftCode: "BOFAUS3NXXX",
    },
  },
};

const STORAGE_KEY = "modesy_wallet_member";
export const WALLET_CHANGE_EVENT = "modesy_wallet_change";

export function getMemberWallet(): WalletData {
  if (typeof window === "undefined") return DEFAULT_MEMBER_WALLET;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_MEMBER_WALLET));
    return DEFAULT_MEMBER_WALLET;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return DEFAULT_MEMBER_WALLET;
  }
}

export function saveMemberWallet(wallet: WalletData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(wallet));
  window.dispatchEvent(new CustomEvent(WALLET_CHANGE_EVENT, { detail: wallet }));
}

export function addMemberDeposit(params: {
  amount: number;
  paymentMethod: string;
  currency?: string;
  isReported?: boolean;
}): { success: boolean; newBalance: number; deposit: WalletDeposit } {
  const wallet = getMemberWallet();
  const isBank = params.paymentMethod.toLowerCase().includes("bank");
  const isCompleted = !isBank || params.isReported;
  const amount = Number(params.amount);
  const newBalance = isCompleted
    ? Number((wallet.balance + amount).toFixed(2))
    : wallet.balance;

  const now = new Date();
  const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
    now.getDate()
  ).padStart(2, "0")} / ${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")}`;

  const randSuffix1 = Math.random().toString(36).substring(2, 8).toUpperCase();
  const randSuffix2 = Math.random().toString(36).substring(2, 8).toUpperCase();
  const paymentId = isBank
    ? `BTR-${randSuffix1}-${randSuffix2}`
    : `pi_wlt_${randSuffix1}${randSuffix2}`;

  const deposit: WalletDeposit = {
    id: `dep-${Date.now()}`,
    paymentId,
    paymentMethod: params.paymentMethod,
    amount,
    currency: params.currency || "USD",
    status: isCompleted ? "Completed" : "Pending Payment",
    isReported: !!params.isReported,
    date: dateStr,
  };

  const updated: WalletData = {
    ...wallet,
    balance: newBalance,
    deposits: [deposit, ...wallet.deposits],
  };

  saveMemberWallet(updated);
  return { success: true, newBalance, deposit };
}

export function reportBankTransfer(depositId: string): { success: boolean; newBalance: number } {
  const wallet = getMemberWallet();
  let depositAmount = 0;
  const updatedDeposits = wallet.deposits.map((dep) => {
    if (dep.id === depositId) {
      depositAmount = dep.amount;
      return {
        ...dep,
        isReported: true,
        status: "Completed" as const,
      };
    }
    return dep;
  });

  const newBalance = Number((wallet.balance + depositAmount).toFixed(2));
  const updated: WalletData = {
    ...wallet,
    balance: newBalance,
    deposits: updatedDeposits,
  };

  saveMemberWallet(updated);
  return { success: true, newBalance };
}

export function requestMemberPayout(params: {
  amount: number;
  method: string;
}): { success: boolean; newBalance: number; error?: string; payout?: WalletPayout } {
  const wallet = getMemberWallet();
  const amount = Number(params.amount);

  if (amount > wallet.balance) {
    return {
      success: false,
      newBalance: wallet.balance,
      error: "Withdrawal amount cannot exceed available wallet balance.",
    };
  }

  const now = new Date();
  const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
    now.getDate()
  ).padStart(2, "0")} / ${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")}`;

  const payout: WalletPayout = {
    id: `pay-${Date.now()}`,
    withdrawalMethod: params.method,
    withdrawalAmount: amount,
    currency: "USD",
    status: "Pending",
    date: dateStr,
  };

  const newBalance = Number((wallet.balance - amount).toFixed(2));
  const updated: WalletData = {
    ...wallet,
    balance: newBalance,
    payouts: [payout, ...wallet.payouts],
  };

  saveMemberWallet(updated);
  return { success: true, newBalance, payout };
}

export function updateMemberPayoutSettings(settings: PayoutSettings): { success: boolean } {
  const wallet = getMemberWallet();
  const updated: WalletData = {
    ...wallet,
    payoutSettings: settings,
  };
  saveMemberWallet(updated);
  return { success: true };
}
