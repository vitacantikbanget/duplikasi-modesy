<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Panduan Proyek & Aturan Agent: Duplikasi Modesy

Dokumen ini berisi pedoman arsitektur, desain, alur kerja, dan batasan ketat bagi AI Agent saat bekerja pada repositori **Duplikasi Modesy**.

---

## 1. Visi & Ruang Lingkup Proyek
- **Tujuan Utama:** Membangun platform Marketplace & Classifieds modern yang mereplikasi sistem **Modesy - Buy & Sell Used Stuff / Marketplace & Classified Ads Script** (CodeCanyon Item ID: `22714108`, referensi resmi: `https://modesy.codingest.net/`).
- **Prioritas Saat Ini:**
  - **Fokus utama pada kesempurnaan Frontend & UI/UX terlebih dahulu.**
  - Gunakan data mock / demo role agar alur visual dan interaksi halaman matang sebelum integrasi penuh ke backend.
  - Integrasi database Supabase dilakukan secara bertahap seiring finalisasi antarmuka.

---

## 2. Penjelasan Sistem & Fitur Modesy (Spesifikasi CodeCanyon 22714108)
Platform Modesy memiliki arsitektur fungsional ganda (*Hybrid Marketplace*):
1. **Dual Operation Modes (Marketplace & Classifieds):**
   - **E-Commerce Mode:** Keranjang belanja (*shopping cart*), *multi-step checkout*, manajemen alamat pengiriman, perhitungan ongkir, dan pelacakan pesanan (*order tracking*).
   - **Classified Ads Mode:** Iklan baris barang bekas (*used stuff*), kontak langsung penjual (WhatsApp/Telepon), obrolan internal (*internal messaging/chat*), dan sistem penawaran (*bidding system*).
2. **Tipe Produk yang Didukung:**
   - **Physical Products:** Barang fisik dengan manajemen stok, opsi variasi produk (warna, ukuran), berat, dan opsi pengiriman.
   - **Digital Products:** Produk virtual/file instan yang dapat diunduh (misal file digital, software, lisensi).
   - **Ordinary Listing / Used Stuff:** Barang bekas untuk jual-beli lokal (*meetup/pickup*) tanpa alur checkout gateway.
3. **Ekosistem Multi-Vendor:**
   - Setiap pengguna dapat mendaftar menjadi vendor ("Sell on Modesy").
   - Halaman profil toko publik (`/profile/[slug]` atau `/store/[slug]`) dengan banner toko, avatar, deskripsi, ulasan toko, dan badge terverifikasi (*Vendor Verified Badge*).
   - Vendor Dashboard terpisah (`/dashboard`) untuk mengelola inventaris, pesanan masuk, dan laporan penjualan.
4. **Sistem Lokasi & Filter Multi-Negara:**
   - Pencarian berbasis negara, provinsi/negara bagian, kota, hingga radius lokasi terdekat.

---

## 3. Standar Desain & Layout (Wajib Mengacu ke Modesy Asli)
- **Referensi Desain Utama:** `https://modesy.codingest.net/`
- **Kewajiban Mutlak AI Agent untuk Inspeksi Langsung:**
  - **Agent WAJIB membuka dan membaca live URL** (`https://modesy.codingest.net/` atau rute spesifiknya seperti `/products`, `/cart`, detail produk, `/admin`, dll.) menggunakan tool `read_url_content` atau subagent browser **sebelum dan selama merancang atau memodifikasi layout**.
  - Agent **dilarang menebak-nebak** struktur visual jika belum memeriksa halaman referensi aslinya secara langsung.
- **Replikasi Anatomi Layout Modesy:**
  - **Top Bar:** Menu kontak, link *"Sell on Modesy"*, modal pemilih lokasi (*Location Modal*), dropdown pemilih mata uang (USD, EUR, IDR, dll.), dan pemilih bahasa dengan ikon bendera.
  - **Header Utama:** Logo (rasio 160x60), bilah pencarian besar yang terintegrasi dengan dropdown filter kategori dan tombol search, ikon Wishlist dengan badge jumlah, ikon Cart dengan indikator harga & jumlah item, serta tombol Login/Register atau dropdown Profil Akun.
  - **Mega Menu (Category Bar):** Bilah navigasi horizontal kategori utama dengan dropdown bertingkat (*multi-level subcategories*) yang rapi dan responsif.
  - **Homepage Structure:**
    - Slider utama (*Hero Banner*) bersanding dengan 2 banner promosi samping.
    - Grid produk 6 kolom (*6 products per row*) pada resolusi desktop dengan padding dan jarak khas Modesy.
    - Anatomi **Product Card**: gambar rasio konsisten dengan efek hover halus, tombol wishlist (love icon di sudut), tag kategori kecil, judul produk 1-2 baris, nama seller + centang hijau verifikasi, bintang ulasan/rating, harga promo & coret (*discounted original price*), dan tombol *"Add to Cart"*.
    - Banner promosi 3 kolom / 2 kolom di antara section produk.
    - Section Artikel Blog & Testimoni/Highlight Classifieds.
    - **Footer Komprehensif:** Formulir berlangganan newsletter, deskripsi Modesy, tautan cepat, kategori populer, ikon metode pembayaran, media sosial, dan hak cipta.
  - **Admin Panel (`/admin`) & Vendor Dashboard (`/dashboard`):**
    - Sidebar navigasi gelap dengan hierarki grup menu yang rapi.
    - Header atas bersih: judul halaman sederhana (tanpa breadcrumbs), tombol quick action ("View Site"), dropdown bahasa, dan profil admin/vendor.
    - Tabel data padat dengan tombol aksi khas Modesy (Edit, View, Delete, Filter status).
- **Styling:**
  - Menggunakan **Tailwind CSS v4** dengan utility classes semantik dan warna tema utama Modesy (default teal `#00a99d` atau palet tema terpilih).
  - Hindari arbitrary styling berlebih jika sudah ada utility class standar Tailwind.
  - Gunakan ikon dari `lucide-react` atau `@heroicons/react` yang paling identik dengan ikon Modesy.
  - Desain harus sepenuhnya responsif (mobile-friendly dan desktop-optimized).

---

## 4. Konvensi Arsitektur & Koding (Next.js 16 + React 19)
- **Server Components First:**
  - Gunakan React Server Components (RSC) secara default untuk halaman dan layout guna optimasi performa dan SEO.
  - Gunakan Client Components (`"use client"`) hanya pada komponen yang membutuhkan state lokal, hooks (`useState`, `useEffect`), interaksi event listener (klik, modal, dropdown), atau Context.
- **State Management:**
  - State global antarmuka (misal tema, keranjang belanja sementara, data demo) dikelola melalui context di `src/contexts/` (seperti `AppContext.tsx`).
- **Struktur Folder:**
  - `src/app/(shop)`: Halaman etalase publik (katalog produk, detail produk, cart, checkout, profile publik).
  - `src/app/admin`: Seluruh modul manajemen admin (products, categories, users, orders, settings).
  - `src/app/dashboard`: Vendor dashboard (tambah produk, penjualan, pengaturan toko).
  - `src/components`: Komponen modular reusable (dibagi per folder `admin/`, `shop/`, `ui/`, `common/`).
  - `src/lib`: Utilitas, helpers, konfigurasi Supabase, dan mock data.

---

## 5. Autentikasi & Role Management (Mode Hibrida)
- **Pengembangan Lokal (Demo Role):**
  - Pertahankan mekanisme fallback cookie `demo_role` di `src/middleware.ts` (misal otomatis mengaktifkan role `admin` saat membuka `/admin` dan `vendor` saat membuka `/dashboard`) agar proses pengembangan dan inspeksi UI berjalan lancar tanpa login berulang.
- **Sistem Produksi / Autentikasi Nyata:**
  - Tetap siapkan integrasi Supabase Auth (`@supabase/ssr`) dengan tabel `public.profiles` dan enum role (`super_admin`, `admin`, `moderator`, `vendor`, `member`).

---

## 6. Database & Perubahan Skema (Supabase)
- **Penyimpanan Skema:**
  - Skema database dikelola langsung di file `supabase/schema.sql`.
- **Aturan Modifikasi:**
  - Jika diperlukan penambahan tabel, relasi, enum, atau kolom baru, lakukan modifikasi langsung pada `supabase/schema.sql` atau eksekusi perintah SQL langsung tanpa membuat berkas migrasi terpisah.
  - Pastikan setiap tabel baru selalu mempertimbangkan konsistensi tipe data UUID dan keamanan dasar Row Level Security (RLS).

---

## 7. Batasan & Aturan Ketat untuk AI Agent (Agent Guardrails)

Agent **WAJIB** mematuhi aturan-aturan berikut tanpa pengecualian:

1. **DILARANG Melakukan Operasi Git Sembarangan:**
   - **JANGAN PERNAH** menjalankan perintah `git commit`, `git push`, ataupun `git pull` tanpa izin eksplisit dari user.
2. **DILARANG Menambah Dependencies Tanpa Izin:**
   - **JANGAN** menginstal package/library baru via `npm install` atau `pnpm add` sebelum meminta konfirmasi kepada user.
3. **Pertahankan Blok Aturan Next.js:**
   - **JANGAN PERNAH** menghapus atau merusak blok komentar `<!-- BEGIN:nextjs-agent-rules --> ... <!-- END:nextjs-agent-rules -->` di bagian atas file `AGENTS.md`.
4. **Wajib Inspeksi Langsung Link Live Demo Modesy:**
   - Saat mendesain, membuat, atau memodifikasi layout/komponen halaman, Agent **wajib membuka dan membaca live URL** (`https://modesy.codingest.net/` atau halaman spesifiknya) menggunakan tool fetch / browser subagent untuk memastikan tampilan, tombol, dan susunan elemen 100% mirip dengan aslinya.
5. **Bahasa Komunikasi:**
   - Selalu gunakan **Bahasa Indonesia** dalam memberikan penjelasan, respons, panduan, dan ringkasan pekerjaan kepada user.
6. **Kualitas & Validasi Kode:**
   - Selalu gunakan TypeScript secara ketat (`strict`), hindari penggunaan tipe `any` tanpa alasan jelas.
   - Periksa error / linting setelah melakukan perubahan kode besar untuk menjaga integritas proyek.

