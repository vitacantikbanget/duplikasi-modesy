# Modesy Marketplace - Multi-Vendor E-Commerce Platform

Duplikasi web resmi marketplace **Modesy** (`https://modesy.codingest.net/`) berbasis Next.js 16 (Turbopack) dengan integrasi basis data live **Supabase**, sistem manajemen hak akses multi-peran (**Role-Based Access Control / RBAC**), serta panel kerja khusus peran **Moderator (Roger Novak)** yang 100% presisi dan identik dengan versi resmi Modesy.

---

## 🌟 Fitur Utama & Kesesuaian Resmi (Paritas Modesy)

### 1. Panel Khusus Moderator (Roger Novak)
- **Tampilan Dashboard Identik:**
  - 2 Card KPI Utama: `Products` (Ungu `#605ca8`) dan `Pending Products` (Merah `#dd4b39`) tanpa bar *"More info"* tambahan sesuai web resmi.
  - 3 Panel Stacked Lebar Penuh:
    1. **Latest Products**: Tabel produk lengkap dengan thumbnail 45x45, judul biru `#3c8dbc`, stempel waktu relatif, dan tombol aksi cyan `#00c0ef` (`Details`).
    2. **Latest Pending Products**: Antrean produk menunggu tinjauan moderator.
    3. **Latest Transactions (Featured Products)**: Riwayat transaksi promosi produk berbayar.
- **Header Standar Modesy:**
  - Ketinggian 50px, tombol **View Site** hijau `#00a65a`, selektor bahasa, serta profil pengguna bersih satu baris (`Roger Novak`).
- **Sidebar Khusus Moderator (3 Seksi Tanpa Bullet):**
  - **NAVIGATION:** `Home`, `Slider`, `Homepage Manager`.
  - **PRODUCTS (11 Sub-Item Lengkap):**
    `Products`, `Featured Products`, `Special Offers`, `Pending Products` *(dengan badge)*, `Hidden Products`, `Expired Products`, `Sold Products`, `Drafts`, `Deleted Products`, `Add Product`, `Bulk Product Upload`.
    Serta menu pelengkap: `Quote Requests`, `Categories`, `Tags`, `Custom Fields`.
  - **MANAGEMENT TOOLS:**
    `Contact Messages`, `Reviews`, `Comments` (dropdown *Product Comments* & *Blog Comments*), dan `Abuse Reports`.

### 2. Otomatisasi Moderasi & Supabase RLS
- **Auto-Hide pada Laporan Pelanggaran:** Menyelesaikan laporan di `/admin/abuse-reports` dapat langsung menonaktifkan status produk (`is_active = false`) di tabel `products` Supabase.
- **Auto-Update Status Pesanan pada Sengketa Refund:** Menyetujui refund di `/admin/refund-requests` otomatis memperbarui status pesanan terkait menjadi `payment_status = 'refunded'` dan `order_status = 'cancelled'` di tabel `orders` Supabase.
- **Sinkronisasi Counter Badge Real-Time:** Menggunakan event-driven listener (`modesy-moderation-updated`), badge pada sidebar dan angka kartu di dashboard langsung berkurang tanpa perlu refresh halaman manual.
- **Proteksi Rute Sensitif (403 Forbidden):** Rute konfigurasi khusus Super Admin (Roles, Payouts, Gateways, System Settings) terlindungi dengan layar `AccessDenied` informatif.

### 3. Modul Multi-Role Lainnya
- **Guest / Tamu:** Storefront publik, katalog produk, filter kategori, slider hero otomatis.
- **Member (Peter Jone):** Keranjang belanja, riwayat pesanan, profil pembeli, ulasan.
- **Vendor (Trendshop):** Panel toko mandiri di `/dashboard` (produk, penjualan, dompet).
- **Super Admin (Admin):** Akses penuh tanpa batas ke seluruh konfigurasi sistem Modesy.

---

## 🛠️ Stack Teknologi

- **Frontend Framework:** Next.js 16.4.0 (Turbopack, App Router)
- **Library UI:** React 19, Tailwind CSS v4, Lucide React
- **Database & Auth:** Supabase (PostgreSQL, Row-Level Security, Supabase SSR Client)
- **State Management:** React Context API (`AppContext`, `AdminContext`) & persistent cookie `demo_role`

---

## 🚀 Panduan Memulai

### 1. Instalasi Dependensi
```bash
npm install
```

### 2. Konfigurasi Lingkungan (`.env.local`)
Pastikan kredensial Supabase terpasang:
```env
NEXT_PUBLIC_SUPABASE_URL=https://gdxiprpzucxomkhfqsgz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Menjalankan Server Pengembangan
```bash
npm run dev
```
Buka browser pada: [http://localhost:3000](http://localhost:3000)

### 4. Menjalankan Build Produksi
```bash
npm run build
npm start
```

---

## 🔑 Akun Demo & Pengujian Peran

Gunakan tombol **1-Klik Demo** pada halaman login (`/admin/login`) atau **Role Switcher Widget** di pojok kiri bawah:

| Peran (Role) | Email Demo | Password | URL Tujuan |
| :--- | :--- | :--- | :--- |
| **Moderator (Roger Novak)** | `moderator@codingest.net` | `1234` | `/admin` |
| **Super Admin** | `admin@codingest.net` | `1234` | `/admin` |
| **Vendor (Trendshop)** | `trendshop@codingest.net` | `1234` | `/dashboard` |
| **Member (Peter Jone)** | `member@codingest.net` | `1234` | `/orders` |
| **Guest / Publik** | *(tanpa login)* | - | `/` |

---

## 📁 Struktur Rute Administrasi & Moderasi

```
src/app/admin/
├── page.tsx                    # Dashboard adaptif (Moderator vs Super Admin)
├── layout.tsx                  # Layout Guard & proteksi rute 403
├── products/                   # Katalog produk aktif
├── pending-products/           # Antrean verifikasi produk vendor
├── hidden-products/            # Produk tersembunyi / dinonaktifkan
├── featured-products/          # Produk unggulan homepage
├── special-offers/             # Produk promo & diskon
├── expired-products/           # Produk habis masa tayang
├── sold-products/              # Produk terjual
├── drafts/                     # Draf produk vendor
├── deleted-products/           # Tempat sampah (soft-deleted)
├── add-product/                # Formulir tambah produk
├── bulk-product-upload/        # Impor produk massal CSV/Excel
├── quote-requests/             # Permintaan negosiasi harga (B2B)
├── categories/                 # Manajemen pohon kategori
├── tags/                       # Tag pencarian produk
├── custom-fields/              # Bidang atribut kustom
├── abuse-reports/              # Laporan pelanggaran & auto-hide
├── refund-requests/            # Sengketa pengembalian dana & auto-order
├── reviews/                    # Moderasi ulasan bintang 1-5
├── comments/                   # Moderasi komentar produk
├── contact-messages/           # Pesan kontak pengunjung publik
├── blog-comments/              # Moderasi komentar artikel blog
├── slider/                     # Manajemen slider beranda
└── homepage-manager/           # Pengaturan tata letak homepage
```

---

## 📄 Lisensi
Hak Cipta Desain Asli © [Modesy by Codingest](https://codecanyon.net/item/modesy-buy-sell-used-stuff/22714108). Dibuat untuk keperluan pengembangan, riset, dan duplikasi fungsionalitas marketplace.
