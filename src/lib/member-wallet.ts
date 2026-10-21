// Modul ini bertugas mengelola saldo dompet digital member (Member Wallet).
// Menyimpan riwayat setor dana (deposit), riwayat pengeluaran belanja (expenses),
// penarikan dana ke rekening bank (payouts), dan pengaturan rekening penarikan (PayPal, Bitcoin, IBAN, SWIFT).

// Struktur data untuk catatan setor dana (Deposit)
export interface WalletDeposit {
  id: string;             // ID unik deposit
  paymentId: string;      // Nomor resi pembayaran (misal: BTR-HMDQRCZDHE-CPZTJXWK)
  paymentMethod: string;  // Metode setor dana (Transfer Bank, Kartu Kredit, dll)
  amount: number;         // Jumlah uang yang disetor
  currency: string;       // Mata uang (USD, IDR, dll)
  status: "Completed" | "Pending Payment"; // Status apakah uang sudah masuk atau menunggu konfirmasi
  isReported: boolean;    // Apakah pengguna sudah mengirim bukti transfer
  date: string;           // Tanggal dan waktu transaksi
}

// Struktur data untuk catatan uang keluar / belanja produk
export interface WalletExpense {
  id: string;             // ID pengeluaran
  paymentId: string;      // ID pembayaran
  expenseTitle: string;   // Keterangan belanja (contoh: Pembelian Tas Ransel)
  orderNumber: string;    // Nomor pesanan barang
  amount: number;         // Jumlah saldo yang terpotong
  currency: string;       // Mata uang
  date: string;           // Waktu transaksi
}

// Struktur data untuk penarikan dana ke rekening pribadi
export interface WalletPayout {
  id: string;             // ID penarikan
  withdrawalMethod: string; // Metode penarikan (Bank Transfer / PayPal)
  withdrawalAmount: number; // Jumlah dana yang ditarik
  currency: string;       // Mata uang
  status: string;         // Status proses transfer dari admin
  date: string;           // Waktu pengajuan penarikan
}

// Pengaturan rekening tujuan penarikan dana milik member
export interface PayoutSettings {
  paypalEmail: string;    // Alamat email akun PayPal
  btcAddress: string;     // Alamat dompet Bitcoin (crypto)
  iban: {                 // Data rekening bank internasional (IBAN)
    fullName: string;
    country: string;
    bankName: string;
    ibanNumber: string;
  };
  swift: {                // Data rekening bank lokal/antarnegara (SWIFT/BIC)
    fullName: string;
    country: string;
    bankName: string;
    branchName: string;
    accountNumber: string;
    swiftCode: string;
  };
}

// Format lengkap seluruh data dompet pengguna
export interface WalletData {
  balance: number;                  // Saldo aktif yang bisa dipakai belanja atau ditarik
  deposits: WalletDeposit[];        // Daftar riwayat setor dana
  expenses: WalletExpense[];        // Daftar riwayat pengeluaran
  payouts: WalletPayout[];          // Daftar riwayat penarikan dana
  payoutSettings: PayoutSettings;   // Data nomor rekening milik member
}

// Data awal dompet saat pertama kali membuka website (saldo awal $45.00)
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

// Mengambil data saldo dompet dari penyimpanan browser (localStorage)
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

// Menyimpan data dompet yang diperbarui ke penyimpanan browser dan mengirim sinyal update
export function saveMemberWallet(wallet: WalletData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(wallet));
  // Beritahu semua bagian halaman lain bahwa saldo sudah berubah
  window.dispatchEvent(new CustomEvent(WALLET_CHANGE_EVENT, { detail: wallet }));
}

// Fungsi ketika member melakukan top up / setor dana baru
export function addMemberDeposit(params: {
  amount: number;
  paymentMethod: string;
  currency?: string;
  isReported?: boolean;
}): { success: boolean; newBalance: number; deposit: WalletDeposit } {
  const wallet = getMemberWallet();
  const isBank = params.paymentMethod.toLowerCase().includes("bank");
  // Pembayaran selain transfer bank otomatis langsung bertambah ke saldo
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

  // Buat nomor resi pembayaran acak yang unik
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

// Fungsi konfirmasi setelah member mengirimkan bukti transfer bank
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

// Fungsi penarikan saldo ke rekening pribadi (Payout)
export function requestMemberPayout(params: {
  amount: number;
  method: string;
}): { success: boolean; newBalance: number; error?: string; payout?: WalletPayout } {
  const wallet = getMemberWallet();
  const amount = Number(params.amount);

  // Validasi: jumlah tarik dana tidak boleh melebihi saldo yang tersedia
  if (amount > wallet.balance) {
    return {
      success: false,
      newBalance: wallet.balance,
      error: "Jumlah penarikan tidak boleh melebihi sisa saldo dompet Anda.",
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

  // Kurangi saldo dompet dengan nominal yang ditarik
  const newBalance = Number((wallet.balance - amount).toFixed(2));
  const updated: WalletData = {
    ...wallet,
    balance: newBalance,
    payouts: [payout, ...wallet.payouts],
  };

  saveMemberWallet(updated);
  return { success: true, newBalance, payout };
}

// Menyimpan pembaruan nomor rekening tujuan penarikan dana
export function updateMemberPayoutSettings(settings: PayoutSettings): { success: boolean } {
  const wallet = getMemberWallet();
  const updated: WalletData = {
    ...wallet,
    payoutSettings: settings,
  };
  saveMemberWallet(updated);
  return { success: true };
}
