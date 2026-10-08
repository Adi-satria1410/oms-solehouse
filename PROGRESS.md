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

## Keputusan

- Mengikuti aturan satu fase per sesi; fase selanjutnya adalah **Fase 1 — Kerangka layout dan routing**.
- Checklist disimpan di sini karena `design/TASKS.md` meminta pencatatan progres tetapi juga melarang mengubah folder `design/`.
- Token utama mengikuti `design/README.md` bagian 3, termasuk aksen terakota yang berbeda dari token YAML Stitch.
- Struktur dua kolom, judul serif, kartu hangat, dan tombol pill mengikuti bahasa visual ekspor Stitch. Halaman ini khusus pengujian fondasi, belum merupakan beranda toko atau dashboard admin.
- Tidak menambah dependensi di luar daftar Fase 0. Pemeriksaan browser menggunakan Chrome yang sudah terpasang dan API bawaan Node.js.
- Hasil QA lokal ada di `.verification/` (diabaikan Git), termasuk screenshot dan `results.json`.
- Build Vite di sandbox sempat mengalami `spawn EPERM`; build berhasil dengan izin proses yang sesuai. Tidak diperlukan perubahan aplikasi untuk mengatasi batasan sandbox tersebut.

## Belum dikerjakan

Fase 1–8 dan fitur opsional: layout/routing, storefront, checkout simulasi, pelacakan, login/admin OMS, inventori, Supabase, serta deployment.
