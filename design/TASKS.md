# TASKS.md — SOLEHOUSE

Daftar tugas per fase. Kerjakan **berurutan**, satu fase per sesi.

## Cara memakai (untuk AI agent)

1. Baca `README.md` (rancangan), `DESIGN.md` (token), dan `AGENTS.md`/`CLAUDE.md` (aturan) lebih dulu.
2. Ambil **satu fase** yang belum selesai. Jangan loncat fase.
3. Acuan tampilan ada di `design/stitch/<folder>/code.html`. Salin struktur dan class Tailwind-nya, tapi pecah jadi komponen dan ganti hex dengan token.
4. Setelah tiap tugas: centang kotaknya `[x]`.
5. Akhir fase: jalankan `npm run build` dan `npm run lint` sampai tanpa error, lalu **berhenti dan lapor** (apa yang dibuat, cara mengeceknya di browser, apa yang belum).
6. Pemilik proyek masih belajar React/TypeScript. Jelaskan singkat bagian penting dari kode yang dibuat.

**Dilarang:** menambah library di luar daftar tanpa bertanya, menulis warna hex langsung di komponen, mengubah folder `design/`, menaruh rahasia (API key) di kode.

**Definisi selesai (berlaku untuk setiap tugas):** tampil benar di lebar 1440px dan 390px, tidak ada error di konsol browser, tidak ada `any` di TypeScript, teks UI berbahasa Indonesia.

Kode acuan layar (folder di `design/stitch/`):

| Kode | Folder |
|---|---|
| BERANDA | `solehouse_storefront_beranda` + `solehouse_mobile_beranda_storefront` |
| KATALOG | `solehouse_katalog_produk_sepatu` |
| DETAIL | `solehouse_detail_produk_artisan_grand_sneaker_v.1` + `solehouse_mobile_detail_produk_artisan_grand_sneaker_v.1` |
| KERANJANG | `solehouse_keranjang_belanja` |
| CHECKOUT | `solehouse_checkout_aman` |
| LACAK | `solehouse_lacak_status_pesanan` |
| A-LOGIN | `solehouse_oms_masuk_akun_admin` |
| A-DASH | `solehouse_oms_dashboard_admin` |
| A-PESANAN | `solehouse_oms_daftar_pesanan` |
| A-DETAIL | `solehouse_oms_detail_pesanan_slh_2025_88491` |
| A-STOK | `solehouse_oms_produk_inventori` |

---

## Fase 0 — Setup proyek

Tujuan: proyek jalan di `localhost:5173` dengan gaya SOLEHOUSE.

- [ ] Buat proyek: `npm create vite@latest solehouse -- --template react-ts`, lalu `npm install`
- [ ] Pasang `tailwindcss @tailwindcss/vite react-router-dom`
- [ ] Tambah plugin Tailwind di `vite.config.ts`
- [ ] Isi `src/index.css` dengan token dari README bagian 3 (warna, font, radius, shadow)
- [ ] Muat font Inter, Playfair Display, dan Material Symbols di `index.html`
- [ ] Salin ekspor Stitch ke `design/stitch/` (jangan ikut di-build)
- [ ] Buat `src/lib/format.ts` dengan `formatRupiah(1490000)` → `Rp 1.490.000` dan `formatTanggal()`
- [ ] Buat komponen `ui/Icon.tsx`: `<Icon name="favorite" />` (Material Symbols, opsi `filled`)
- [ ] Buat komponen `ui/Button.tsx` dengan varian `primary`, `secondary`, `accent`, `ghost` dan ukuran `sm`/`md`
- [ ] Buat `src/types/index.ts` (salin tipe dari README bagian 7)
- [ ] Buat halaman uji sementara yang menampilkan semua warna, font, dan tombol
- [ ] Pastikan `npm run build` dan `npm run lint` lolos

**Selesai bila:** halaman uji menampilkan palet, judul serif, teks sans, dan 4 jenis tombol dengan benar.

---

## Fase 1 — Kerangka layout dan routing

Tujuan: dua kerangka (toko dan admin) dengan navigasi yang berfungsi, isi halaman masih kosong.

**Storefront** (acuan: BERANDA)
- [ ] `layouts/StoreLayout.tsx` dengan `<Outlet />`
- [ ] Navbar: logo "SOLEHOUSE — Artisanal Footwear", Beranda, Pria, Wanita, Anak, Sale, Lacak Pesanan; ikon cari, wishlist, keranjang (badge jumlah), akun
- [ ] Navbar sticky dengan latar `base` transparan + blur dan border bawah tipis
- [ ] Menu hamburger di mobile
- [ ] Bottom bar mobile: Beranda, Katalog, Keranjang, Akun
- [ ] Footer: studio, layanan pelanggan, bantuan, koleksi

**Admin** (acuan: A-DASH)
- [ ] `layouts/AdminLayout.tsx` dengan `<Outlet />`
- [ ] Sidebar: Dashboard, Pesanan (badge), Produk, Inventori, Pelanggan, Pengiriman, Retur, Laporan, Pengaturan; item aktif ditandai
- [ ] Topbar: status toko, pemilih butik/gudang, tanggal, notifikasi, profil staf
- [ ] Sidebar jadi drawer di layar kecil

**Routing**
- [ ] Pasang semua route dari README bagian 8, tiap halaman berisi judul placeholder
- [ ] Halaman 404 sederhana
- [ ] Menu aktif mengikuti URL

**Selesai bila:** semua menu bisa diklik dan berpindah halaman tanpa reload, layout benar di mobile dan desktop.

---

## Fase 2 — Storefront statis (data contoh)

Tujuan: pelanggan bisa menjelajah produk. Belum ada keranjang.

**Data**
- [ ] `data/products.ts`: minimal 10 produk dari desain (Artisan Grand Sneaker V.1, Oxford Classic Tan Brogue, Vagabond Suede Loafer, Heritage Moc Toe Boot, Aero Minimal Trainer Putih, Derby Brogue Espresso, Monk Strap Polished Tan, Chelsea Boot Olive Nubuck, Urban Runner Taupe & Gum, dst.) dengan varian warna dan stok per ukuran
- [ ] Unduh gambar produk ke `public/images/` (jangan pakai URL googleusercontent dari Stitch)

**Komponen**
- [ ] `store/SizeChips.tsx`: state tersedia, terpilih, habis (dicoret), stok tipis ("Sisa 2!")
- [ ] `store/ProductCard.tsx`: foto 4:5, badge (Sale/New/Terlaris/Limited), kategori, nama, rating, harga + harga coret, wishlist, chip ukuran saat hover
- [ ] `store/TrustStrip.tsx`: Gratis Ongkir Nusantara, Retur & Tukar 14 Hari, 100% Kulit Nabati Asli, Dukungan Ahli Sepatu
- [ ] `store/CategoryTile.tsx`
- [ ] `store/SizeGuideModal.tsx`: tabel EU / cm / US / UK dan cara mengukur kaki
- [ ] `store/WhatsAppCta.tsx`
- [ ] `ui/Modal.tsx`, `ui/Pagination.tsx`, `ui/Badge.tsx`

**Halaman**
- [ ] **Beranda** (BERANDA): hero, strip kepercayaan, kategori, banner "Koleksi Musim Ini — Hemat hingga 30%", grid favorit dengan filter chip, versi mobile (testimoni, newsletter)
- [ ] **Katalog** (KATALOG): sidebar filter (kategori, ukuran EU 36-46, warna, harga, material, ketersediaan), urutan, 12/24/48 item, grid/list, pagination; filter benar-benar menyaring data contoh
- [ ] **Detail Produk** (DETAIL): galeri + thumbnail, pilih warna dan ukuran, status stok, jumlah, tombol "Tambah ke Keranjang" (belum aktif), modal panduan ukuran, spesifikasi, ulasan, "Mungkin Kamu Suka"; layout mobile dengan bar tombol melekat di bawah
- [ ] Filter dan halaman memakai parameter URL (contoh `/katalog?kategori=boots`)

**Selesai bila:** Beranda → Katalog → Detail bisa dijelajahi, filter berfungsi, ukuran habis tidak bisa dipilih.

---

## Fase 3 — Keranjang dan checkout

Tujuan: alur beli dari awal sampai pesanan tercipta. Pembayaran **palsu**.

- [ ] `hooks/useCart.ts` + state global (Context atau Zustand): tambah, ubah jumlah, hapus, kosongkan
- [ ] Item keranjang unik berdasarkan produk + warna + ukuran
- [ ] Keranjang tersimpan di `localStorage` (dibungkus try/catch)
- [ ] Badge jumlah di navbar mengikuti keranjang
- [ ] Tombol "Tambah ke Keranjang" di Detail Produk aktif, wajib pilih ukuran dulu
- [ ] **Keranjang** (KERANJANG): baris item (SKU, ukuran, warna), ubah jumlah, hapus, simpan ke wishlist, add-on kado +Rp 35.000, penahan stok 15 menit (hitung mundur tampilan saja)
- [ ] Voucher: kode `SOLEWELCOME` memberi diskon 10%, kode salah menampilkan pesan error
- [ ] `store/OrderSummary.tsx`: subtotal, diskon, ongkir, biaya layanan Rp 5.000, total (dipakai ulang di checkout)
- [ ] **Checkout** (CHECKOUT): form alamat dengan validasi, pilihan ekspedisi (ongkir tetap), metode pembayaran (BCA, Mandiri, BNI, BRI, Permata VA), ringkasan, tombol "Bayar Sekarang"
- [ ] "Bayar Sekarang" membuat pesanan baru ber-ID `SLH-2025-xxxxx` berstatus `menunggu_bayar`, lalu halaman konfirmasi dengan tombol "Simulasikan Pembayaran" yang mengubah status ke `dibayar`
- [ ] Stok contoh berkurang saat pesanan **dibayar**
- [ ] Pesanan tersimpan di `localStorage` (sementara, sampai fase 7)
- [ ] Keranjang kosong menampilkan ajakan kembali ke katalog

**Selesai bila:** bisa menambah dua sepatu, memakai voucher, checkout, dan melihat pesanan terbentuk dengan total yang benar (contoh desain: Rp 2.561.000).

---

## Fase 4 — Lacak pesanan

- [ ] `store/TrackingTimeline.tsx`: tahapan Pesanan Dibuat → Dibayar → Dikemas (QC) → Dikirim → Diterima, dengan waktu dan keterangan
- [ ] **Lacak** (LACAK): input nomor pesanan, hasil dengan status, nomor resi (tombol salin), kurir, daftar item
- [ ] `/lacak/:orderId` langsung membuka hasil
- [ ] Pesan jelas bila nomor tidak ditemukan
- [ ] Tombol hubungi CS WhatsApp
- [ ] Tombol "Cetak Resi PDF" memakai `window.print()` dengan gaya cetak sederhana

**Selesai bila:** pesanan dari fase 3 bisa dilacak dengan nomornya.

---

## Fase 5 — Admin inti

Tujuan: staf bisa memproses pesanan dari awal sampai kirim.

- [ ] `lib/orderStatus.ts`: daftar perpindahan status yang diizinkan (README bagian 7), fungsi `canMove(from, to)`
- [ ] `admin/StatusBadge.tsx` dengan warna dari tabel status (selalu ada teks, bukan hanya warna)
- [ ] **Login** (A-LOGIN): form dengan validasi dan tombol tampilkan kata sandi, login **palsu** (satu akun contoh di `data/`), tombol SSO hanya tampilan, link "Beralih ke Storefront"
- [ ] Route `/admin/*` dilindungi: belum login diarahkan ke `/admin/login`
- [ ] **Dashboard** (A-DASH): 4 `StatCard` dihitung dari data pesanan, grafik penjualan dengan toggle 7/30/90 hari, ringkasan 30 hari, tabel "Pesanan Terbaru" dengan tab, daftar "Stok Menipis" (qty < 3), distribusi kurir
- [ ] **Daftar Pesanan** (A-PESANAN): 8 tab status dengan hitungan, pencarian, filter tanggal/kurir/pembayaran/gudang, tabel lengkap, checkbox pilih baris
- [ ] `admin/BulkActionBar.tsx`: muncul bila ada baris terpilih (Cetak Label, Cetak Invoice, Ubah Status Massal, Ekspor Terpilih, Batal Pilihan)
- [ ] Ekspor CSV: unduh daftar pesanan sebagai file `.csv`
- [ ] Pagination tabel
- [ ] **Detail Pesanan** (A-DETAIL): header, item (SKU, rak, QC), pembayaran, catatan internal, info pelanggan, alamat (tombol salin), timeline
- [ ] Tombol "Ubah Status" dan "Tandai Dikemas" memakai `canMove()` dan mencatat peristiwa ke timeline
- [ ] "Input / Edit Nomor Resi" (modal) dan "Batalkan Pesanan" (dengan konfirmasi)
- [ ] Tambah catatan internal (nama staf + waktu)
- [ ] Tombol cetak invoice dan label memakai `window.print()`
- [ ] Notifikasi kecil "Perubahan berhasil disimpan"

**Selesai bila:** pesanan dari fase 3 muncul di admin, bisa dipindah status dari Dibayar sampai Dikirim, dan pelanggan melihat statusnya berubah di halaman lacak.

---

## Fase 6 — Inventori

- [ ] **Produk & Inventori** (A-STOK): 4 kartu ringkasan (total SKU, total unit, stok kritis, nilai inventori) dihitung dari data
- [ ] Filter kategori, status (Aktif/Draft/Stok Habis/Stok Kritis), lokasi; pencarian
- [ ] Tabel produk: nama, konstruksi, SKU induk, kategori, harga, ketersediaan (bar), status, aksi
- [ ] Baris bisa dibuka menjadi `admin/StockMatrix.tsx`: warna × ukuran EU 38-45
- [ ] Sel angka bisa diedit; merah bila < 3, tombol "Simpan Perubahan Stok" dan "Batal"
- [ ] Total unit per varian dan per produk dihitung ulang otomatis
- [ ] Drawer "Tambah Produk Baru" (`admin/ProductDrawer.tsx`): nama, kategori, material, harga, gambar, varian; validasi form
- [ ] Edit dan duplikat produk, ubah status Aktif/Draft
- [ ] Impor CSV (tampilan + baca file sederhana) dan ekspor data
- [ ] Perubahan stok di admin langsung tercermin di storefront (ukuran habis tidak bisa dipilih)

**Selesai bila:** mengubah stok ukuran 41 menjadi 0 membuat ukuran itu bertanda Habis di halaman Detail Produk.

---

## Fase 7 — Database dan login sungguhan (Supabase)

Dikerjakan setelah semua tampilan dan alur jalan dengan data contoh.

- [ ] Buat proyek Supabase, simpan kunci di `.env` (jangan di-commit), buat `.env.example`
- [ ] Pasang `@supabase/supabase-js`, buat `lib/supabase.ts`
- [ ] Tulis `supabase/schema.sql` dari tabel di README bagian 7
- [ ] Tulis `supabase/seed.sql` dari `data/products.ts`
- [ ] Ganti sumber data produk: dari file contoh ke Supabase (storefront dan inventori)
- [ ] Simpan pesanan ke `orders`, `order_items`, `order_events`
- [ ] Kurangi stok dengan transaksi (fungsi SQL), supaya dua pembeli tidak bisa mengambil stok terakhir bersamaan
- [ ] Login admin memakai Supabase Auth, peran: Head of Operations, Concierge, QC
- [ ] Row Level Security: pelanggan hanya bisa membaca produk dan pesanannya sendiri; admin penuh
- [ ] Unggah gambar produk ke Supabase Storage
- [ ] Hapus data `localStorage` pesanan dan akun palsu

**Selesai bila:** data tetap ada setelah refresh dan setelah membuka dari perangkat lain.

---

## Fase 8 — Poles dan deploy

- [ ] Periksa semua halaman di 390px, 768px, 1440px
- [ ] Loading state (skeleton) dan error state di setiap tampilan data
- [ ] Empty state: katalog tanpa hasil, tabel pesanan kosong, keranjang kosong
- [ ] Fokus keyboard terlihat, `alt` pada semua gambar, kontras teks memenuhi WCAG AA
- [ ] Hormati `prefers-reduced-motion`
- [ ] Judul tab dan meta deskripsi per halaman, favicon
- [ ] Optimasi gambar (ukuran dan format WebP)
- [ ] Data demo yang rapi untuk portofolio
- [ ] Deploy ke Vercel, isi variabel lingkungan di dashboard Vercel
- [ ] Tambah tangkapan layar dan tautan demo ke `README.md`
- [ ] Pastikan tidak ada rahasia di riwayat Git

**Selesai bila:** situs bisa dibuka lewat tautan publik dan semua alur utama jalan.

---

## Opsional — Layar yang belum ada desainnya

Buat desainnya di Stitch lebih dulu (pakai gaya admin yang sama), baru implementasi.

- [ ] Pelanggan (daftar, tier, riwayat pesanan)
- [ ] Pengiriman (manifest, request pick-up)
- [ ] Retur / Klaim (alur persetujuan, stok kembali)
- [ ] Laporan (omzet, produk terlaris, stok)
- [ ] Pengaturan (toko, kurir, pembayaran, pengguna dan peran)
- [ ] Wishlist dan halaman akun pelanggan
- [ ] Notifikasi WhatsApp/email, ongkir otomatis, payment gateway asli (Midtrans/Xendit)

---

## Catatan keputusan (isi saat mengerjakan)

Tulis di sini keputusan yang diambil di tengah jalan, supaya sesi berikutnya tahu alasannya.

- (belum ada)