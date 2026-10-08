# SOLEHOUSE

Toko sepatu artisan dan Order Management System (OMS), dibangun bertahap dengan React, TypeScript, Vite, Tailwind CSS v4, dan React Router.

**Status: Fase 0 selesai.** Halaman `/` masih berupa panduan visual interaktif. Layout toko/admin, katalog, keranjang, dan pengelolaan pesanan mengikuti fase berikutnya di [design/TASKS.md](design/TASKS.md).

## Menjalankan

Gunakan Node.js 22.12+ atau 24 LTS dan npm. Versi yang dipakai saat verifikasi: Node.js 24.15.0.

```sh
npm install
npm run dev
```

Buka http://localhost:5173. Untuk memaksa port yang sama dan mencegah Vite berpindah port ketika sudah dipakai:

```sh
npm run dev -- --port 5173 --strictPort
```

```sh
npm run build
npm run lint
npm run preview
```

Font Inter, Playfair Display, dan Material Symbols dimuat dari Google Fonts, sehingga perlu koneksi internet.

## Bagian kode

- `src/index.css`: semua token warna, tipografi, radius, dan bayangan. Misalnya, `bg-base` membaca `--color-base`; perubahan token berlaku untuk seluruh aplikasi.
- `src/components/ui/Button.tsx`: satu komponen dengan `variant="primary|secondary|accent|ghost"` dan `size="sm|md"`. Mendukung atribut tombol HTML seperti `disabled` dan `onClick`.
- `src/components/ui/Icon.tsx`: ikon Material Symbols dengan opsi `filled`. Ikon dekoratif disembunyikan dari pembaca layar; beri `label` bila ikon perlu memiliki nama tersendiri.
- `src/lib/format.ts`: `formatRupiah(1490000)` menghasilkan `Rp 1.490.000`; `formatTanggal()` memakai bahasa Indonesia dan zona waktu Jakarta.
- `src/types/index.ts`: kontrak data `Product`, `Variant`, `Order`, dan `OrderStatus` dari rancangan.
- `src/pages/DesignSystemPage.tsx`: halaman uji sementara dengan contoh warna, font, ikon, tombol, serta format harga/tanggal. `useState` menyimpan pesan tombol dan pilihan favorit selama halaman terbuka.

React Router sudah dipasang; konfigurasi rute dikerjakan pada Fase 1.

## Pemeriksaan Fase 0

Build dan lint lolos. Halaman diperiksa di Chrome headless pada viewport 1440px dan 390px: tidak ada overflow horizontal atau error konsol, font termuat, seluruh delapan tombol aktif mengubah pesan, empat tombol nonaktif tidak dapat digunakan, dan favorit dapat dinyalakan/dimatikan. Hasil screenshot juga diperiksa secara visual.

Untuk mencoba sendiri, gunakan menu Warna, Tipografi, Komponen, dan Format. Pada bagian Komponen, klik tombol sedang/kecil dan ikon favorit. Gunakan tombol Tab untuk melihat indikator fokus keyboard.

## Acuan dan progres

- [Rancangan](design/README.md)
- [Aturan dan daftar tugas](design/TASKS.md)
- [Progres implementasi](PROGRESS.md)

Folder `design/` adalah referensi dan tidak diubah. Tailwind hanya memindai `src/`, sehingga kelas dari ekspor Stitch tidak ikut masuk CSS produksi. `.env` diabaikan Git; `.env.example` tetap dapat dilacak.
