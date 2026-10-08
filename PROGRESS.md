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

## Keputusan

- Mengikuti aturan satu fase per sesi; setelah Fase 1, fase selanjutnya adalah **Fase 2 — Storefront statis**.
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

## Belum dikerjakan

Fase 2–8 dan fitur opsional: storefront dengan data produk, checkout simulasi, pelacakan, login/admin OMS, inventori, Supabase, serta deployment.
