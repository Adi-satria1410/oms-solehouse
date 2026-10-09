# Progres SOLEHOUSE

## Fase 0 — Setup proyek

Selesai pada 8 Oktober 2026.

- [x] Proyek React + Vite + TypeScript tersedia; memakai proyek awal yang sudah ada tanpa membuat subfolder baru.
- [x] Pasang `tailwindcss`, `@tailwindcss/vite`, dan `react-router-dom`.
- [x] Tambah plugin Tailwind di `vite.config.ts`.
- [x] Token warna, warna status, font, radius, spacing, dan shadow di `src/index.css`.
- [x] Muat Inter, Playfair Display, dan Material Symbols di `index.html`.
- [x] Ekspor Stitch sudah tersedia di `design/stitch/`; tidak ikut dibundel atau dipindai Tailwind.
- [x] `src/lib/format.ts`: formatter Rupiah dan tanggal Indonesia dalam zona Jakarta.
- [x] `src/components/ui/Icon.tsx`: Material Symbols dengan opsi `filled` dan label aksesibel.
- [x] `src/components/ui/Button.tsx`: empat varian, dua ukuran, hover, fokus, dan disabled.
- [x] `src/types/index.ts`: semua tipe dari README bagian 7.
- [x] Halaman uji sementara: seluruh warna, font, tombol, ikon, format Rupiah/tanggal.
- [x] `npm run build` dan `npm run lint` tanpa error.
- [x] QA Chrome 1440px dan 390px, tanpa overflow horizontal dan tanpa error konsol.
- [x] Interaksi delapan tombol, favorit, pemuatan font/ikon, serta formatter diverifikasi.

## Fase 1 — Kerangka layout dan routing

Selesai pada 8 Oktober 2026.

- [x] `StoreLayout` dengan `<Outlet />`.
- [x] Navbar: logo JPEG, Beranda, Pria, Wanita, Anak, Sale, Lacak Pesanan, cari, favorit, keranjang dengan badge 0, dan akun.
- [x] Navbar sticky dengan latar transparan, blur, dan border tipis.
- [x] Menu hamburger seluler dengan drawer, Escape, dan kontrol fokus keyboard.
- [x] Bottom bar seluler: Beranda, Katalog, Keranjang, Akun.
- [x] Footer: studio, layanan pelanggan, bantuan, dan koleksi.
- [x] `AdminLayout` dengan `<Outlet />`.
- [x] Sidebar: seluruh sembilan menu, badge pesanan 0, serta indikator menu aktif.
- [x] Topbar: status toko, pilihan butik/gudang, tanggal WIB, notifikasi, dan profil staf contoh.
- [x] Sidebar menjadi drawer pada layar kecil.
- [x] Semua rute README bagian 8 memiliki halaman placeholder, termasuk parameter produk dan nomor pesanan.
- [x] Placeholder tambahan untuk tujuan menu akun, favorit, bantuan, dan menu admin opsional.
- [x] Halaman 404 untuk toko dan admin.
- [x] Menu aktif mengikuti path dan parameter URL koleksi; detail pesanan tetap mengaktifkan menu Pesanan.
- [x] Panduan visual Fase 0 dipindah ke `/panduan-visual`.
- [x] Verifikasi akhir `npm run build` dan `npm run lint` tanpa error.
- [x] Verifikasi 33 URL dan 47 pemeriksaan layout browser 390px/768px/1440px tanpa overflow horizontal atau error konsol.
- [x] Navigasi tanpa reload, menu aktif, riwayat browser, bottom bar, dan pemilih gudang antarhalaman lolos.
- [x] Drawer: Escape, putaran fokus Tab/Shift+Tab, pengembalian fokus, serta penutupan saat navigasi dan resize lolos.
- [x] Logo terpasang dan screenshot toko/admin/login/drawer diperiksa secara visual.

## Fase 2 — Storefront statis

Selesai pada 9 Oktober 2026.

- [x] 15 produk contoh, termasuk sembilan model utama dari rancangan, dengan varian warna dan stok per ukuran.
- [x] 27 foto diunduh ke `public/images/`; URL eksternal tidak digunakan untuk gambar aplikasi.
- [x] `SizeChips`: tersedia, terpilih, habis, dan stok tipis.
- [x] `ProductCard`: foto 4:5, badge, kategori, nama, rating, harga, favorit, dan chip ukuran saat hover/fokus.
- [x] `TrustStrip`, `CategoryTile`, `SizeGuideModal`, dan `WhatsAppCta`.
- [x] `Modal`, `Pagination`, dan `Badge` yang dapat dipakai ulang.
- [x] Beranda: hero, keunggulan, kategori, banner promo, grid favorit/filter, testimoni, dan buletin.
- [x] Katalog: pencarian, kategori/koleksi, ukuran 36–46, warna, harga, material, ketersediaan, urutan, 12/24/48, grid/daftar, dan pagination.
- [x] Filter dan halaman memakai parameter URL; kombinasi warna dan ukuran memeriksa stok varian yang sama.
- [x] Detail: galeri/thumbnail/zoom, warna/ukuran/stok/jumlah, panduan ukuran, spesifikasi/perawatan, ulasan, dan rekomendasi.
- [x] Tombol keranjang belum aktif; bar pembelian mobile menggantikan bottom bar toko pada detail.
- [x] Favorit konsisten antarkartu/detail, tersimpan lokal, dan dapat dilihat di `/wishlist`.
- [x] WhatsApp memakai template tanpa nomor aktif sesuai jawaban pengguna.
- [x] Pemeriksaan fungsi filter, urutan, pagination, dan keberadaan gambar lokal lolos.
- [x] `npm run build` dan `npm run lint` tanpa error.
- [x] 21 pemeriksaan layout Chrome pada 390px/768px/1440px tanpa overflow horizontal atau error konsol.
- [x] Navigasi Beranda → Katalog → Detail, filter URL, pagination, grid/daftar, hasil kosong, dan 404 produk lolos.
- [x] Favorit setelah refresh, ukuran habis, batas jumlah, reset ukuran/kuantitas saat ganti warna, galeri/zoom, dan modal panduan ukuran lolos.
- [x] Screenshot beranda, katalog, detail, filter mobile, dan panduan ukuran diperiksa secara visual.

## Keputusan

- Mengikuti urutan fase; sesi ini menyelesaikan **Fase 2 — Storefront statis**, sebelum Fase 3 keranjang dan checkout.
- Checklist disimpan di sini karena `design/TASKS.md` meminta pencatatan progres tetapi juga melarang mengubah folder `design/`.
- Token utama mengikuti `design/README.md` bagian 3, termasuk aksen terakota yang berbeda dari token YAML Stitch.
- Struktur dua kolom, judul serif, kartu hangat, dan tombol pill mengikuti bahasa visual ekspor Stitch. Halaman uji fondasi tetap tersedia di `/panduan-visual`.
- Tidak menambah dependensi di luar daftar Fase 0. Pemeriksaan browser menggunakan Chrome yang sudah terpasang dan API bawaan Node.js.
- Hasil QA lokal ada di `.verification/` (diabaikan Git), termasuk screenshot dan `results.json`.
- Build Vite di sandbox sempat mengalami `spawn EPERM`; build berhasil dengan izin proses yang sesuai. Tidak diperlukan perubahan aplikasi untuk mengatasi batasan sandbox tersebut.
- Fase 1 memakai logo `public/solehouse.jpeg` tanpa mengubah gambar asli. Logo juga dipakai sebagai favicon sesuai permintaan pengguna.
- Tidak ada library tambahan untuk routing atau drawer. Drawer memakai `<dialog>` native dengan pengelolaan fokus keyboard.
- Menu tambahan mendapatkan placeholder agar semua tautan berfungsi; fitur opsionalnya belum diimplementasikan.
- Autentikasi admin belum tersedia sesuai urutan fase; `/admin/login` menyediakan tautan bertuliskan Pratinjau OMS, tanpa menyimulasikan proses login.
- Badge bernilai 0, karena data keranjang/pesanan belum ada. Pemilih butik/gudang hanya menyimpan pilihan selama navigasi admin.
- Fase 2 tidak menambah library. Foto diunduh dari acuan Stitch tanpa mengubah folder `design/`; asal gambar dicatat di `public/images/SOURCES.md`.
- Foto varian bersifat referensi model; galeri lengkap tersedia untuk Artisan Grand Sneaker, model lain memakai foto yang tersedia di ekspor.
- Testimoni/ulasan diberi label contoh. Form buletin hanya memvalidasi email, tanpa pengiriman/penyimpanan.
- Pengguna memilih template WhatsApp; konfigurasi nomor kosong di `.env.example` dan CTA tetap nonaktif sampai nomor diisi.

## Belum dikerjakan

Fase 3–8 dan fitur opsional: keranjang, checkout simulasi, pelacakan, login/admin OMS, inventori, Supabase, serta deployment. Fase berikutnya adalah keranjang dan checkout.
