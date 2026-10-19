"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Check, 
  MapPin, 
  Truck, 
  CreditCard, 
  ChevronRight, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Building,
  QrCode,
  DollarSign
} from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, formatPrice, cartSubtotal, clearCart, t } = useAppContext();

  // Multi-step: 1 = Address, 2 = Shipping, 3 = Payment, 4 = Success
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Address Form State
  const [address, setAddress] = useState({
    firstName: "Budi",
    lastName: "Santoso",
    email: "budi.santoso@example.com",
    phone: "+62 812-3456-7890",
    addressLine: "Jl. Sudirman No. 45, Gedung Menara Mandiri Lt. 12",
    country: "Indonesia",
    state: "DKI Jakarta",
    city: "Jakarta Selatan",
    zipCode: "12190"
  });

  // Shipping Method
  const [shippingMethod, setShippingMethod] = useState<{ id: string; name: string; price: number; time: string }>({
    id: "standard",
    name: "Reguler (JNE / SiCepat)",
    price: 25000,
    time: "2 - 3 Hari Kerja"
  });

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState("bank_transfer");
  const [orderNumber, setOrderNumber] = useState("");

  const shippingCost = shippingMethod.price;
  const grandTotal = cartSubtotal + shippingCost;

  const handlePlaceOrder = () => {
    const generatedOrderNo = "#100" + Math.floor(10 + Math.random() * 90);
    setOrderNumber(generatedOrderNo);
    clearCart();
    setStep(4);
  };

  if (cart.length === 0 && step !== 4) {
    return (
      <div className="min-h-screen bg-[#fcfcfc] flex items-center justify-center p-4">
        <div className="bg-white rounded-xl border border-gray-100 p-8 text-center max-w-md shadow-xs">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Keranjang Anda Kosong</h2>
          <p className="text-xs text-gray-500 mb-6">Tambahkan produk sebelum melanjutkan ke pembayaran.</p>
          <Link href="/" className="inline-block bg-brand-primary text-white text-xs font-semibold px-6 py-2.5 rounded">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfcfc] min-h-screen pb-20">
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center text-xs text-gray-500">
          <Link href="/" className="hover:text-brand-primary transition-colors">{t("home")}</Link>
          <ChevronRight className="w-3.5 h-3.5 mx-2 text-gray-400" />
          <Link href="/cart" className="hover:text-brand-primary transition-colors">{t("cart")}</Link>
          <ChevronRight className="w-3.5 h-3.5 mx-2 text-gray-400" />
          <span className="text-gray-800 font-medium">Checkout</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-8">
        
        {/* Step Progress Header */}
        {step !== 4 && (
          <div className="max-w-2xl mx-auto mb-10">
            <div className="flex items-center justify-between relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
              
              {/* Step 1 */}
              <div className="relative z-10 flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  step >= 1 ? "bg-brand-primary text-white" : "bg-gray-200 text-gray-500"
                }`}>
                  {step > 1 ? <Check className="w-4 h-4 stroke-[3]" /> : "1"}
                </div>
                <span className="text-xs font-semibold mt-2 text-gray-800">Alamat</span>
              </div>

              {/* Step 2 */}
              <div className="relative z-10 flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  step >= 2 ? "bg-brand-primary text-white" : "bg-gray-200 text-gray-500"
                }`}>
                  {step > 2 ? <Check className="w-4 h-4 stroke-[3]" /> : "2"}
                </div>
                <span className="text-xs font-semibold mt-2 text-gray-800">Pengiriman</span>
              </div>

              {/* Step 3 */}
              <div className="relative z-10 flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  step >= 3 ? "bg-brand-primary text-white" : "bg-gray-200 text-gray-500"
                }`}>
                  3
                </div>
                <span className="text-xs font-semibold mt-2 text-gray-800">Pembayaran</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: ORDER SUCCESS VIEW */}
        {step === 4 ? (
          <div className="max-w-lg mx-auto bg-white rounded-xl border border-gray-100 p-8 text-center shadow-xs my-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900">Pesanan Berhasil Dibuat!</h1>
            <p className="text-xs text-gray-500">
              Terima kasih atas pesanan Anda. Kami telah mengirimkan konfirmasi ke email Anda.
            </p>

            <div className="bg-gray-50 p-4 rounded-lg text-left text-xs space-y-2 my-4 border border-gray-100">
              <div className="flex justify-between">
                <span className="text-gray-500">Nomor Pesanan:</span>
                <span className="font-bold text-brand-primary">{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Metode Pembayaran:</span>
                <span className="font-semibold text-gray-800 uppercase">{paymentMethod.replace("_", " ")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Total Pembayaran:</span>
                <span className="font-bold text-gray-900">{formatPrice(grandTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status Pesanan:</span>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded font-bold">Processing</span>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Link 
                href="/admin/orders" 
                className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded text-xs transition-colors"
              >
                Lihat di Admin Orders
              </Link>
              <Link 
                href="/" 
                className="flex-1 py-2.5 bg-brand-primary hover:bg-brand-primary-hover text-white font-semibold rounded text-xs transition-colors"
              >
                Kembali Belanja
              </Link>
            </div>
          </div>
        ) : (
          /* STEPS 1-3 LAYOUT */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Active Step Form */}
            <div className="lg:col-span-8 bg-white rounded-xl border border-gray-100 shadow-xs p-6 md:p-8">
              
              {/* STEP 1: SHIPPING ADDRESS */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                    <MapPin className="w-5 h-5 text-brand-primary" />
                    <h2 className="text-lg font-bold text-gray-900">Alamat Pengiriman (Shipping Address)</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Depan *</label>
                      <input 
                        type="text" 
                        value={address.firstName}
                        onChange={(e) => setAddress({ ...address, firstName: e.target.value })}
                        className="w-full text-xs border border-gray-200 rounded px-3 py-2.5 outline-none focus:border-brand-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Belakang *</label>
                      <input 
                        type="text" 
                        value={address.lastName}
                        onChange={(e) => setAddress({ ...address, lastName: e.target.value })}
                        className="w-full text-xs border border-gray-200 rounded px-3 py-2.5 outline-none focus:border-brand-primary"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Alamat Email *</label>
                      <input 
                        type="email" 
                        value={address.email}
                        onChange={(e) => setAddress({ ...address, email: e.target.value })}
                        className="w-full text-xs border border-gray-200 rounded px-3 py-2.5 outline-none focus:border-brand-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Nomor Telepon / WhatsApp *</label>
                      <input 
                        type="tel" 
                        value={address.phone}
                        onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                        className="w-full text-xs border border-gray-200 rounded px-3 py-2.5 outline-none focus:border-brand-primary"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Alamat Lengkap (Jalan, RT/RW, No. Rumah) *</label>
                    <textarea 
                      rows={3}
                      value={address.addressLine}
                      onChange={(e) => setAddress({ ...address, addressLine: e.target.value })}
                      className="w-full text-xs border border-gray-200 rounded px-3 py-2.5 outline-none focus:border-brand-primary resize-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Provinsi *</label>
                      <input 
                        type="text" 
                        value={address.state}
                        onChange={(e) => setAddress({ ...address, state: e.target.value })}
                        className="w-full text-xs border border-gray-200 rounded px-3 py-2.5 outline-none focus:border-brand-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Kota / Kabupaten *</label>
                      <input 
                        type="text" 
                        value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        className="w-full text-xs border border-gray-200 rounded px-3 py-2.5 outline-none focus:border-brand-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Kode Pos *</label>
                      <input 
                        type="text" 
                        value={address.zipCode}
                        onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                        className="w-full text-xs border border-gray-200 rounded px-3 py-2.5 outline-none focus:border-brand-primary"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-3 bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-semibold rounded-lg flex items-center gap-2 transition-all cursor-pointer shadow-xs"
                    >
                      Lanjut ke Pengiriman <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: SHIPPING METHOD */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                    <Truck className="w-5 h-5 text-brand-primary" />
                    <h2 className="text-lg font-bold text-gray-900">Pilih Opsi Pengiriman</h2>
                  </div>

                  <div className="space-y-3">
                    {[
                      { id: "standard", name: "Reguler (JNE / SiCepat)", price: 25000, time: "2 - 3 Hari Kerja" },
                      { id: "express", name: "Express (J&T Express / Pos Kilat)", price: 45000, time: "1 - 2 Hari Kerja" },
                      { id: "sameday", name: "Same Day Delivery (Gojek / Grab)", price: 65000, time: "Hari Ini Sampai (Jabodetabek)" }
                    ].map((opt) => (
                      <label
                        key={opt.id}
                        className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all ${
                          shippingMethod.id === opt.id 
                            ? "border-brand-primary bg-brand-primary/5 ring-1 ring-brand-primary" 
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setShippingMethod(opt)}
                      >
                        <div className="flex items-center gap-3">
                          <input 
                            type="radio" 
                            name="shipping" 
                            checked={shippingMethod.id === opt.id} 
                            onChange={() => setShippingMethod(opt)} 
                            className="text-brand-primary focus:ring-brand-primary"
                          />
                          <div>
                            <div className="text-xs font-bold text-gray-800">{opt.name}</div>
                            <div className="text-[11px] text-gray-400">Estimasi tiba: {opt.time}</div>
                          </div>
                        </div>
                        <div className="text-xs font-bold text-brand-primary">
                          {formatPrice(opt.price)}
                        </div>
                      </label>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2 text-xs font-semibold text-gray-500 hover:text-gray-800"
                    >
                      ← Kembali ke Alamat
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-6 py-3 bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-semibold rounded-lg flex items-center gap-2 transition-all cursor-pointer shadow-xs"
                    >
                      Lanjut ke Pembayaran <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: PAYMENT METHOD */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                    <CreditCard className="w-5 h-5 text-brand-primary" />
                    <h2 className="text-lg font-bold text-gray-900">Pilih Metode Pembayaran</h2>
                  </div>

                  <div className="space-y-3">
                    {[
                      { id: "bank_transfer", icon: Building, title: "Transfer Bank / Virtual Account", desc: "BCA, Mandiri, BNI, BRI otomatis terverifikasi" },
                      { id: "credit_card", icon: CreditCard, title: "Kartu Kredit / Debit Online", desc: "Visa, Mastercard, JCB dengan 3D Secure" },
                      { id: "qris", icon: QrCode, title: "QRIS / Dompet Digital", desc: "GoPay, OVO, ShopeePay, DANA" },
                      { id: "cod", icon: DollarSign, title: "Bayar di Tempat (COD)", desc: "Bayar tunai ke kurir saat barang sampai di tujuan" }
                    ].map((m) => {
                      const Icon = m.icon;
                      return (
                        <label
                          key={m.id}
                          className={`flex items-start gap-3.5 p-4 rounded-lg border cursor-pointer transition-all ${
                            paymentMethod === m.id 
                              ? "border-brand-primary bg-brand-primary/5 ring-1 ring-brand-primary" 
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => setPaymentMethod(m.id)}
                        >
                          <input 
                            type="radio" 
                            name="payment" 
                            checked={paymentMethod === m.id} 
                            onChange={() => setPaymentMethod(m.id)} 
                            className="mt-0.5 text-brand-primary focus:ring-brand-primary"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
                              <Icon className="w-4 h-4 text-brand-primary" />
                              {m.title}
                            </div>
                            <div className="text-[11px] text-gray-400 mt-0.5">{m.desc}</div>
                          </div>
                        </label>
                      );
                    })}
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2 text-xs font-semibold text-gray-500 hover:text-gray-800"
                    >
                      ← Kembali ke Pengiriman
                    </button>
                    <button
                      type="button"
                      onClick={handlePlaceOrder}
                      className="px-8 py-3 bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-bold rounded-lg flex items-center gap-2 transition-all cursor-pointer shadow-md active:scale-98"
                    >
                      Bayar Sekarang ({formatPrice(grandTotal)})
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Right: Order Summary Sidebar */}
            <div className="lg:col-span-4 bg-white rounded-xl border border-gray-100 shadow-xs p-6 space-y-4">
              <h3 className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-3">
                Ringkasan Belanja ({cart.length} Produk)
              </h3>

              <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="py-3 flex gap-3 items-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.imageUrl} alt={item.title} className="w-12 h-12 rounded object-cover border border-gray-100" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-800 truncate">{item.title}</p>
                      <p className="text-[11px] text-gray-400">{item.quantity}x {formatPrice(item.price)}</p>
                    </div>
                    <div className="text-xs font-bold text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-2 border-t border-gray-100 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-gray-800">{formatPrice(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Biaya Pengiriman:</span>
                  <span className="font-semibold text-gray-800">{formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-100 text-sm font-bold text-gray-900">
                  <span>Total Akhir:</span>
                  <span className="text-base text-brand-primary">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-gray-400 flex items-center justify-center gap-1.5 text-center">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Transaksi dijamin aman dan terenkripsi SSL</span>
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
