# SOLEHOUSE — Toko Sepatu + OMS (Order Management System)

Website toko sepatu kulit artisan dengan dua bagian dalam satu proyek:

- **Storefront**: tempat pelanggan melihat katalog, memilih ukuran, checkout, dan melacak pesanan.
- **Admin OMS**: tempat staf mengelola pesanan, stok per ukuran, pengiriman, dan retur.

Dokumen ini adalah **rancangan** proyek, disusun dari ekspor Google Stitch (`stitch_solehouse_footwear_storefront.zip`). Proyek pribadi untuk belajar dan portofolio, tanpa transaksi uang sungguhan.

---

## 1. Ringkasan Cepat

| Item | Keputusan |
|---|---|
| Framework | React + Vite + TypeScript |
| Styling | Tailwind CSS (sama dengan yang dipakai Stitch) |
| Routing | React Router |
| Ikon | Material Symbols Outlined (dipakai di seluruh ekspor Stitch) |
| Font | Playfair Display (judul) + Inter (isi) |
| Package manager | npm |
| Data tahap awal | File data contoh (`src/data/`), lalu pindah ke Supabase |
| Hosting | Vercel |
| Bahasa UI | Indonesia |

---

## 2. Isi Ekspor Stitch

Ekspor berisi **13 layar** dan 1 file design system. Tiap layar punya `code.html` (HTML + Tailwind CDN) dan `screen.png`.

> **Catatan:** semua file `screen.png` di ekspor ini rusak (isinya teks error "FIFE Image failed to fetch", bukan gambar). Rancangan ini disusun dari `code.html`. Kalau butuh referensi visual, buka `code.html` di browser atau ekspor ulang dari Stitch.

### Storefront (customer)

| # | Folder ekspor | Halaman | Route |
|---|---|---|---|
| 1 | `solehouse_storefront_beranda` | Beranda (desktop) | `/` |
| 2 | `solehouse_katalog_produk_sepatu` | Katalog produk | `/katalog` |
| 3 | `solehouse_detail_produk_artisan_grand_sneaker_v.1` | Detail produk (desktop) | `/produk/:slug` |
| 4 | `solehouse_keranjang_belanja` | Keranjang | `/keranjang` |
| 5 | `solehouse_checkout_aman` | Checkout | `/checkout` |
| 6 | `solehouse_lacak_status_pesanan` | Lacak pesanan | `/lacak` dan `/lacak/:orderId` |
| 7 | `solehouse_mobile_beranda_storefront` | Beranda (mobile) | `/` (versi responsif) |
| 8 | `solehouse_mobile_detail_produk_artisan_grand_sneaker_v.1` | Detail produk (mobile) | `/produk/:slug` (versi responsif) |

### Admin OMS

| # | Folder ekspor | Halaman | Route |
|---|---|---|---|
| 9 | `solehouse_oms_masuk_akun_admin` | Login admin | `/admin/login` |
| 10 | `solehouse_oms_dashboard_admin` | Dashboard | `/admin` |
| 11 | `solehouse_oms_daftar_pesanan` | Daftar pesanan | `/admin/pesanan` |
| 12 | `solehouse_oms_detail_pesanan_slh_2025_88491` | Detail pesanan | `/admin/pesanan/:orderId` |
| 13 | `solehouse_oms_produk_inventori` | Produk & inventori | `/admin/produk` |

Layar 7 dan 8 **bukan halaman terpisah**. Itu versi mobile dari layar 1 dan 3, jadi dibangun sebagai satu halaman responsif.

### Belum ada desainnya (menu admin sudah ada di sidebar)

Pelanggan, Pengiriman, Retur, Laporan, Pengaturan. Rancangannya ada di bagian Roadmap (fase 6), dikerjakan terakhir dan bersifat opsional.

### Design system

`warm_editorial_shoemaker/DESIGN.md` berisi token warna, tipografi, radius, dan spacing. Itu sumber utama untuk konfigurasi Tailwind.

---

## 3. Design Tokens

### Warna

| Token | Hex | Pemakaian |
|---|---|---|
| `base` | `#F6F1EA` | Background halaman |
| `surface` | `#FFFFFF` | Kartu, modal, tabel |
| `sand` | `#E8DDCF` | Blok hero, banner, header tabel |
| `taupe` | `#B9AB9A` | Border kuat, divider |
| `line` | `#E3D8CA` | Border tipis 1px |
| `ink` | `#2F2622` | Teks utama, tombol primer, sidebar admin |
| `ink-2` | `#6B5E55` | Teks sekunder |
| `ink-3` | `#9A8D83` | Placeholder, caption |
| `accent` | `#B5653A` | CTA penting, badge Sale |
| `accent-hover` | `#9A5430` | Hover aksen |
| `olive` | `#5E6650` | Badge New |

> `accent` (`#B5653A`) ada di teks DESIGN.md tapi **tidak ada** di daftar token YAML Stitch (yang ada hanya `secondary: #934a22`). Pakai `#B5653A` agar sesuai desain yang tampil.

### Warna status pesanan

| Status | Teks | Latar |
|---|---|---|
| Menunggu Bayar | `#8A6A1F` | `#F6E9C8` |
| Dibayar | `#2F6B4A` | `#D9EDE0` |
| Diproses (QC & Packing) | `#3C5F82` | `#DCE8F3` |
| Dikirim | `#5B4A8A` | `#E6E0F2` |
| Selesai | `#2F6B4A` | `#CBE6D5` |
| Dibatalkan | `#8E3A31` | `#F4DAD6` |
| Retur / Klaim | `#7A4A1F` | `#F0DEC9` |
| Stok menipis | `#B5653A` | `#F7E2D4` |

### Tipografi

| Peran | Font | Ukuran |
|---|---|---|
| Display (hero) | Playfair Display 600 | 56/64 (mobile 36/44) |
| Headline besar | Playfair Display 500 | 40/48 (mobile 28/36) |
| Headline sedang | Playfair Display 500 | 28/36 |
| Headline kecil | Playfair Display 500 | 22/30 |
| Judul kartu | Inter 600 | 18/26 dan 16/24 |
| Isi | Inter 400 | 16/26, 14/22, 13/18 |
| Label | Inter 600 / 500 | 12 dan 11, huruf besar, letter-spacing 0.04em |

### Bentuk dan jarak

- Radius: kartu 16px, tombol pill (`9999px`), chip ukuran 10px
- Shadow: `0 2px 8px rgba(47,38,34,.06)`, saat hover `0 12px 32px rgba(47,38,34,.12)`
- Gutter 24px (mobile 16px), margin halaman 48px (mobile 20px)

### Contoh konfigurasi Tailwind v4 (`src/index.css`)

```css
@import "tailwindcss";

@theme {
  --color-base: #F6F1EA;
  --color-surface: #FFFFFF;
  --color-sand: #E8DDCF;
  --color-taupe: #B9AB9A;
  --color-line: #E3D8CA;
  --color-ink: #2F2622;
  --color-ink-2: #6B5E55;
  --color-ink-3: #9A8D83;
  --color-accent: #B5653A;
  --color-accent-hover: #9A5430;
  --color-olive: #5E6650;

  --font-serif: "Playfair Display", serif;
  --font-sans: "Inter", sans-serif;

  --radius-card: 1rem;
  --shadow-card: 0 2px 8px rgba(47, 38, 34, 0.06);
  --shadow-lift: 0 12px 32px rgba(47, 38, 34, 0.12);
}

body { background: var(--color-base); color: var(--color-ink); font-family: var(--font-sans); }
```

Font dan ikon dimuat dari Google Fonts di `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" rel="stylesheet" />
```

---

## 4. Struktur Halaman

### Storefront

**Navbar** (di semua halaman): logo SOLEHOUSE "Artisanal Footwear", Beranda, Pria, Wanita, Anak, Sale, Lacak Pesanan, lalu ikon cari, wishlist, keranjang (dengan jumlah), dan akun. Di mobile jadi hamburger dan **bottom bar** (Beranda, Katalog, Keranjang, Akun).

**Footer**: studio (Jl. Senopati, Jakarta Selatan), layanan pelanggan (Lacak Status Pesanan, Keranjang, Checkout), bantuan (Panduan Ukuran, Garansi & Retur, Panduan Perawatan Kulit, FAQ), dan koleksi.

1. **Beranda**: hero "Langkah Tepat Setiap Hari." + CTA *Belanja Sekarang* / *Koleksi Baru*, strip kepercayaan (Gratis Ongkir Nusantara, Retur & Tukar 14 Hari, 100% Kulit Nabati Asli, Dukungan Ahli Sepatu), kategori "Pilih Karakter Langkah Anda" (Sneakers, Formal & Oxford, Running & Aktif, Boots & Ankle, Mules & Slides), banner "Koleksi Musim Ini — Hemat hingga 30%", grid "Favorit Koleksi Terkini" dengan filter chip dan pilihan ukuran. Versi mobile menambah testimoni dan newsletter "Warta & Rilis Terbatas".
2. **Katalog**: sidebar filter (Kategori dengan jumlah, Ukuran EU 36-46, Warna Kulit, Rentang Harga, Studio Koleksi, Material Kulit, Ketersediaan), pilihan 12/24/48 item, toggle grid/list, pagination, dan kotak konsultasi WhatsApp.
3. **Detail Produk**: galeri (Samping 3/4, Tampak Atas, Detail Kriya, Outsole Crepe, Di Kaki, zoom, 360°), pemilih warna dan ukuran EU 38-46 (ada status Habis dan *Sisa 2!*), modal **Panduan Ukuran** (EU, cm, US, UK), spesifikasi konstruksi, "Perjalanan Patina", ulasan terverifikasi, dan "Mungkin Kamu Suka".
4. **Keranjang**: item dengan varian dan SKU, penahan stok 15 menit, voucher (contoh `SOLEWELCOME`), add-on kado premium, ringkasan (subtotal, diskon, ongkir, biaya layanan, total), dan rekomendasi perawatan sepatu.
5. **Checkout**: alamat penerima, layanan ekspedisi, metode pembayaran (BCA, Mandiri VA, BNI VA, BRI BRIVA, Permata VA), ringkasan pesanan, tombol "Bayar Sekarang".
6. **Lacak Pesanan**: input nomor pesanan, status pesanan, "Riwayat Perjalanan & Tahapan Kriya" (timeline), daftar item, tombol cetak resi PDF, salin resi, dan hubungi CS WhatsApp.

### Admin OMS

**Layout admin**: sidebar kiri bertuliskan "Atelier & Orders v2.4" dengan menu Dashboard, Pesanan (badge jumlah), Produk, Inventori, Pelanggan, Pengiriman, Retur, Laporan, Pengaturan. Topbar berisi status toko ("Sistem OMS Toko Beroperasi"), pemilih gudang/butik, tanggal, notifikasi, dan profil staf.

7. **Login**: panel foto di kiri, form di kanan (email/ID staf, kata sandi dengan tombol tampilkan, ingat sesi 30 hari, lupa kata sandi), tombol SSO Google Workspace, catatan 2FA, dan link "Beralih ke Storefront".
8. **Dashboard**: 4 kartu statistik (Pesanan Hari Ini, Pendapatan Hari Ini, Perlu Dikirim, Stok Menipis), grafik penjualan dengan toggle 7/30/90 hari, ringkasan 30 hari (omzet, konversi checkout, unit terjual), tabel "Pesanan Terbaru" dengan tab dan tombol aksi per baris, daftar "Stok Menipis" dengan tombol **+ PO**, serta "Distribusi Kurir Hari Ini".
9. **Daftar Pesanan**: 8 tab status dengan hitungan, filter (cari, rentang tanggal, kurir, pembayaran, gudang/butik), tabel (Order ID, pelanggan, item sepatu, total, pembayaran, status, kurir & resi, aksi), **bulk action bar** (Cetak Label, Cetak Invoice, Ubah Status Massal, Ekspor Terpilih), dan tombol *Buat Pesanan Manual*.
10. **Detail Pesanan**: header (nomor, status, lunas/belum, sumber, gudang fulfillment) dengan tombol Cetak Invoice, Cetak Label AWB, Ubah Status, Tandai Dikemas, Batalkan. Kolom kiri: item (SKU, varian, rak gudang, status QC), add-on kado, rincian pembayaran, catatan internal staf. Kolom kanan: info pelanggan (tier, total transaksi), alamat dan catatan kurir, timeline, dan aksi cepat (Request Pick-up Kurir, Input/Edit Nomor Resi, Batalkan Pesanan).
11. **Produk & Inventori**: 4 kartu ringkasan (Total SKU, Total Unit Stok, Stok Kritis, Nilai Inventori), filter kategori/status/lokasi, tabel produk yang bisa dibuka menjadi **matriks stok warna × ukuran EU 38-45** (sel angka bisa diedit, merah bila stok < 3), tombol Atur Barcode, Impor CSV, Ekspor, dan drawer **Tambah Produk Baru**.

---

## 5. Struktur Folder

```
solehouse/
├── design/                          # ekspor Stitch disimpan di sini sebagai referensi
│   └── stitch/                      # (isi zip, tidak ikut di-build)
├── public/
├── src/
│   ├── main.tsx
│   ├── App.tsx                      # daftar route
│   ├── index.css                    # Tailwind + token warna
│   │
│   ├── layouts/
│   │   ├── StoreLayout.tsx          # Navbar + Footer + bottom bar mobile
│   │   └── AdminLayout.tsx          # Sidebar + Topbar
│   │
│   ├── pages/
│   │   ├── store/
│   │   │   ├── HomePage.tsx
│   │   │   ├── CatalogPage.tsx
│   │   │   ├── ProductDetailPage.tsx
│   │   │   ├── CartPage.tsx
│   │   │   ├── CheckoutPage.tsx
│   │   │   └── TrackOrderPage.tsx
│   │   └── admin/
│   │       ├── LoginPage.tsx
│   │       ├── DashboardPage.tsx
│   │       ├── OrdersPage.tsx
│   │       ├── OrderDetailPage.tsx
│   │       └── InventoryPage.tsx
│   │
│   ├── components/
│   │   ├── ui/                      # Button, Input, Badge, Modal, Tabs, Pagination, Icon
│   │   ├── store/                   # ProductCard, SizeChips, SizeGuideModal, TrustStrip,
│   │   │                            # CategoryTile, FilterSidebar, CartItemRow, OrderSummary,
│   │   │                            # TrackingTimeline, WhatsAppCta
│   │   └── admin/                   # StatCard, SalesChart, OrdersTable, StatusBadge,
│   │                                # BulkActionBar, StockMatrix, LowStockList,
│   │                                # OrderTimeline, ProductDrawer
│   │
│   ├── data/                        # data contoh (tahap 1-3)
│   │   ├── products.ts
│   │   └── orders.ts
│   ├── types/index.ts               # Product, Variant, Order, OrderStatus, dll.
│   ├── hooks/
│   │   ├── useCart.ts
│   │   └── useOrders.ts
│   ├── lib/
│   │   ├── format.ts                # formatRupiah(), formatTanggal()
│   │   ├── orderStatus.ts           # aturan perpindahan status
│   │   └── supabase.ts              # nanti
│   └── store/                       # state global keranjang (Context atau Zustand)
│
├── index.html
├── package.json
└── vite.config.ts
```

---

## 6. Komponen yang Dipakai Ulang

| Komponen | Dipakai di | Catatan |
|---|---|---|
| `StatusBadge` | Dashboard, Daftar Pesanan, Detail Pesanan, Lacak | Warna dari tabel status di atas |
| `SizeChips` | Kartu produk, Detail, Mobile detail | State: tersedia, terpilih, habis (coret), stok tipis |
| `ProductCard` | Beranda, Katalog, Rekomendasi | Badge Sale/New/Terlaris/Limited, rating, harga coret |
| `OrderSummary` | Keranjang, Checkout | Subtotal, diskon, ongkir, biaya layanan, total |
| `TrackingTimeline` | Lacak, Detail Pesanan | Versi pelanggan dan versi staf |
| `StatCard` | Dashboard, Inventori | Ikon, angka, label, tren |
| `StockMatrix` | Inventori | Sel stok bisa diedit, merah bila < 3 |
| `Icon` | Semua | Pembungkus Material Symbols: `<Icon name="favorite" />` |

---

## 7. Model Data

### Tipe TypeScript (`src/types/index.ts`)

```ts
export type OrderStatus =
  | "menunggu_bayar"
  | "dibayar"
  | "diproses"        // QC & Packing
  | "siap_kirim"
  | "dikirim"
  | "selesai"
  | "dibatalkan"
  | "retur";

export type Product = {
  id: string;
  slug: string;
  sku: string;            // contoh SH-SNK-042
  name: string;
  category: "sneakers" | "formal" | "loafers" | "boots" | "running" | "mules";
  material: string;       // contoh "Full-grain Pull-up Leather"
  price: number;          // dalam Rupiah, tanpa desimal
  comparePrice?: number;  // harga coret
  badge?: "sale" | "new" | "terlaris" | "limited";
  rating: number;
  reviewCount: number;
  variants: Variant[];
};

export type Variant = {
  id: string;
  sku: string;            // contoh SH-SNK-042-OCH
  colorName: string;      // contoh "Ochre & Tan Welt"
  stock: Record<number, number>; // { 41: 22, 42: 8, ... } per ukuran EU
};

export type Order = {
  id: string;             // contoh SLH-2025-88491
  createdAt: string;
  customer: { name: string; phone: string; email: string; city: string };
  items: { variantSku: string; size: number; qty: number; price: number }[];
  payment: { method: string; paid: boolean };
  courier: string;
  trackingNumber?: string;
  status: OrderStatus;
  total: number;
};
```

### Tabel database (saat pindah ke Supabase)

```
products        id, slug, sku, name, category, material, price, compare_price, badge
variants        id, product_id, sku, color_name
variant_stock   variant_id, size_eu, qty          ← stok per ukuran
customers       id, name, email, phone, tier
addresses       id, customer_id, text, courier_note
orders          id, customer_id, status, payment_method, paid_at, courier, tracking_no, total, warehouse
order_items     id, order_id, variant_id, size_eu, qty, unit_price
order_events    id, order_id, status, note, created_by, created_at   ← timeline + audit
internal_notes  id, order_id, author, role, body, created_at
```

### Alur status pesanan

```
Menunggu Bayar ──► Dibayar ──► Diproses (QC & Packing) ──► Siap Dikirim ──► Dikirim ──► Selesai
       │              │                  │
       └──────────────┴──────────────────┴──► Dibatalkan          Selesai ──► Retur / Klaim
```

Aturan perpindahan disimpan di `lib/orderStatus.ts` agar status tidak bisa lompat sembarangan (misalnya dari *Menunggu Bayar* langsung ke *Dikirim*).

**Aturan stok**
- Stok dikurangi saat pesanan **Dibayar**, bukan saat dimasukkan keranjang.
- Keranjang menahan stok 15 menit (seperti di desain), batal otomatis bila tidak dibayar.
- Stok kembali bila pesanan **Dibatalkan** atau **Retur**.
- Peringatan stok menipis bila qty per ukuran < 3.

---

## 8. Peta Rute

```tsx
<Routes>
  <Route element={<StoreLayout />}>
    <Route path="/" element={<HomePage />} />
    <Route path="/katalog" element={<CatalogPage />} />
    <Route path="/produk/:slug" element={<ProductDetailPage />} />
    <Route path="/keranjang" element={<CartPage />} />
    <Route path="/checkout" element={<CheckoutPage />} />
    <Route path="/lacak" element={<TrackOrderPage />} />
    <Route path="/lacak/:orderId" element={<TrackOrderPage />} />
  </Route>

  <Route path="/admin/login" element={<LoginPage />} />
  <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<DashboardPage />} />
    <Route path="pesanan" element={<OrdersPage />} />
    <Route path="pesanan/:orderId" element={<OrderDetailPage />} />
    <Route path="produk" element={<InventoryPage />} />
  </Route>
</Routes>
```

---

## 9. Cara Memindahkan HTML Stitch ke React

HTML Stitch sudah memakai Tailwind, jadi class-nya bisa dipakai hampir apa adanya.

1. Buka `code.html` sebuah layar, salin isi `<body>` ke file `.tsx`.
2. Ubah `class` menjadi `className`, tutup tag kosong (`<img />`, `<input />`), dan ubah atribut seperti `for` menjadi `htmlFor`.
3. Ganti warna hex di class (contoh `bg-[#F6F1EA]`) dengan token (`bg-base`).
4. Pecah bagian yang berulang menjadi komponen (satu kartu produk, bukan lima salinan).
5. Ganti data yang tertulis langsung (nama, harga) dengan data dari `src/data/`.
6. Ganti `<a href>` dengan `<Link to>` dari React Router.
7. Tambahkan interaksi (pilih ukuran, tab, filter) dengan `useState`.

**Hal yang perlu diperhatikan**
- Gambar di ekspor memakai URL `lh3.googleusercontent.com/aida-public/...`. URL ini sementara. **Unduh gambarnya** ke `public/images/` atau ganti dengan foto produk sendiri.
- Ekspor memuat Tailwind lewat CDN (`cdn.tailwindcss.com`). Di proyek Vite pakai paket Tailwind, jangan salin tag `<script>` CDN-nya.
- Data di desain hanya contoh (tanggal "24 Mei 2024" bercampur dengan nomor pesanan 2025). Anggap itu isi sementara.

---

## 10. Roadmap

Kerjakan berurutan. Selesaikan satu fase sampai jalan sebelum pindah.

| Fase | Isi | Hasil |
|---|---|---|
| **0. Setup** | Buat proyek Vite, pasang Tailwind dan React Router, token warna, font, ikon, `Icon` dan `Button` | Halaman kosong dengan gaya SOLEHOUSE |
| **1. Layout** | `StoreLayout` (navbar, footer, bottom bar mobile) dan `AdminLayout` (sidebar, topbar) | Kerangka kedua sisi |
| **2. Storefront statis** | Beranda, Katalog, Detail Produk dengan data dari `src/data/products.ts`; `ProductCard`, `SizeChips`, `SizeGuideModal` | Bisa menjelajah produk |
| **3. Keranjang & checkout** | `useCart` (simpan di localStorage), Keranjang, Checkout dengan pembayaran palsu, buat pesanan ke data contoh | Alur beli sampai selesai |
| **4. Lacak pesanan** | Halaman lacak dan timeline | Pelanggan bisa cek status |
| **5. Admin inti** | Login (palsu dulu), Dashboard, Daftar Pesanan, Detail Pesanan, ubah status | OMS bisa dipakai |
| **6. Inventori** | Matriks stok yang bisa diedit, tambah produk | Stok per ukuran terkelola |
| **7. Database** | Pindah data ke Supabase, login admin sungguhan dengan peran (Head of Operations, Concierge, QC) | Data tersimpan permanen |
| **8. Poles** | Responsif mobile, loading dan error state, data demo, deploy ke Vercel | Siap masuk portofolio |
| **Opsional** | Halaman Pelanggan, Pengiriman, Retur, Laporan, Pengaturan | Melengkapi menu sidebar |

### Sengaja dilewati dulu

Payment gateway asli (Midtrans/Xendit), ongkir otomatis, notifikasi WhatsApp/email, SSO Google Workspace, 2FA, multi-gudang sinkron, cetak AWB asli. Di desain semuanya sudah tampil sebagai tombol atau tampilan. Untuk tahap awal, biarkan tombolnya ada tapi hanya mengubah status atau menampilkan pesan "Segera hadir".

---

## 11. Perintah Awal

```bash
# 1. Buat proyek
npm create vite@latest solehouse -- --template react-ts
cd solehouse
npm install

# 2. Tailwind v4 dan React Router
npm install tailwindcss @tailwindcss/vite react-router-dom

# 3. Jalankan
npm run dev
```

Tambahkan plugin Tailwind di `vite.config.ts`:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

Lalu salin isi `src/index.css` dari bagian 3, dan taruh ekspor Stitch di `design/stitch/` sebagai bahan acuan.

---

## 12. Checklist Kualitas

- [ ] Semua warna berasal dari token, tidak ada hex tertulis langsung di komponen
- [ ] Harga selalu lewat `formatRupiah()` (contoh `Rp 1.490.000`)
- [ ] Status pesanan tidak hanya warna, ada teks yang jelas
- [ ] Ukuran tombol dan chip minimal 44px untuk layar sentuh
- [ ] Semua gambar punya `alt`
- [ ] Layar 390px (mobile) dan 1440px (desktop) dicek
- [ ] Tidak ada rahasia (API key) yang ikut ter-commit ke GitHub
