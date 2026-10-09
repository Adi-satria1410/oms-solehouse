# SOLEHOUSE

Toko sepatu artisan dan Order Management System (OMS), dibangun bertahap dengan React, TypeScript, Vite, Tailwind CSS v4, dan React Router.

**Status: Fase 2 selesai pada 9 Oktober 2026.** Beranda, katalog dengan filter, dan detail produk sudah memakai data contoh serta foto lokal. Keranjang, checkout, login, dan pengelolaan pesanan mengikuti fase berikutnya di [design/TASKS.md](design/TASKS.md).

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

## Layout dan navigasi (Fase 1)

- `src/App.tsx`: seluruh rute React Router. `Link` dan `NavLink` memindahkan halaman tanpa memuat ulang dokumen.
- `src/layouts/StoreLayout.tsx` dan `AdminLayout.tsx`: kerangka tetap untuk toko dan admin; `<Outlet />` diisi halaman sesuai URL.
- `src/data/navigation.ts`: daftar menu dan halaman bantuan. Menu koleksi memakai parameter `koleksi`, sementara Sale memakai `sale=true`.
- `src/components/ui/Brand.tsx`: logo asli dari `public/solehouse.jpeg`, dipakai di toko, admin, halaman masuk, dan panduan visual. Favicon juga menggunakan gambar tersebut.
- `src/components/ui/NavigationDrawer.tsx`: menu seluler memakai dialog native, menahan scroll latar, mendukung Escape, memutar fokus Tab/Shift+Tab, dan menutup setelah navigasi atau pindah ke lebar desktop.
- `src/pages/PlaceholderPage.tsx`: tampilan sementara yang dipakai ulang sampai isi setiap halaman dikerjakan pada fasenya.

Tautan untuk mencoba:

| Halaman | URL |
|---|---|
| Beranda toko | `/` |
| Katalog / koleksi | `/katalog`, `/katalog?koleksi=pria`, `/katalog?koleksi=wanita`, `/katalog?koleksi=anak`, `/katalog?sale=true` |
| Detail produk contoh | `/produk/artisan-grand-sneaker-v1` |
| Keranjang / checkout | `/keranjang`, `/checkout` |
| Pelacakan contoh | `/lacak`, `/lacak/SLH-2025-88491` |
| Akun / favorit | `/akun`, `/wishlist` |
| Halaman masuk admin | `/admin/login` |
| Dashboard admin | `/admin` |
| Pesanan / detail contoh | `/admin/pesanan`, `/admin/pesanan/SLH-2025-88491` |
| Produk / inventori | `/admin/produk`, `/admin/inventori` |
| Menu admin tambahan | `/admin/pelanggan`, `/admin/pengiriman`, `/admin/retur`, `/admin/laporan`, `/admin/pengaturan`, `/admin/notifikasi` |
| Panduan visual Fase 0 | `/panduan-visual` |

Seluruh tautan bantuan di footer memiliki placeholder. URL yang tidak dikenal menampilkan 404 dengan tautan kembali ke toko/dashboard. Halaman admin masih berupa pratinjau terbuka; autentikasi dan proteksi rute dikerjakan pada Fase 5. Badge keranjang/pesanan bernilai 0 sampai data dan state tersedia. Pilihan butik/gudang tersimpan selama berpindah halaman admin, belum memfilter data atau tersimpan setelah refresh.

Untuk deployment nanti, hosting perlu mengarahkan URL aplikasi ke `index.html` agar tautan langsung seperti `/admin/pesanan` dapat dibuka. Dev server Vite sudah mendukung hal ini.

## Storefront (Fase 2)

- `src/data/products.ts`: 15 produk dengan koleksi, material, harga, foto, varian warna, dan stok ukuran EU 36–46. Galeri Artisan Grand Sneaker memakai enam foto; produk lain memakai foto referensi yang tersedia.
- `src/lib/catalog.ts`: logika pencarian, filter, urutan, dan pagination. Warna dan stok ukuran diperiksa pada varian yang sama, sehingga stok warna lain tidak membuat ukuran habis tampak tersedia.
- `src/pages/store/HomePage.tsx`: hero, keunggulan toko, kategori, promo, favorit dengan chip filter, testimoni contoh, dan pratinjau buletin.
- `src/pages/store/CatalogPage.tsx`: filter desktop atau modal mobile, pencarian nama/SKU, urutan, 12/24/48 produk, grid/daftar, pagination, dan hasil kosong.
- `src/pages/store/ProductDetailPage.tsx`: galeri, thumbnail, zoom, pemilih warna/ukuran, jumlah terbatas stok, tabel ukuran, spesifikasi, ulasan contoh, serta rekomendasi.
- `src/hooks/useWishlist.ts`: favorit bersama antarkartu dan detail; tersimpan di `localStorage` dengan `try/catch`. Halaman `/wishlist` menampilkan pilihan tersebut.
- `src/components/ui/Modal.tsx`: modal native dengan Escape, penahanan scroll latar, putaran fokus keyboard, dan pengembalian fokus ke pemicu.

Filter disimpan di URL agar bisa dibagikan atau dibuka ulang. Contoh:

```text
/katalog?kategori=boots
/katalog?koleksi=wanita&warna=krem&ukuran=40
/katalog?min=1000000&max=1500000&urut=harga-rendah
/katalog?material=Nubuck&stok=tersedia
/katalog?sale=true&tampilan=daftar
/katalog?tampil=12&halaman=2
/produk/artisan-grand-sneaker-v1
```

Pilihan lebih dari satu kategori/warna/ukuran/material menggunakan pemisah koma. Filter yang berbeda digabungkan; pilihan di dalam filter yang sama memakai salah satu nilai yang cocok. Mengganti filter mengembalikan pagination ke halaman pertama. Nomor halaman di luar rentang dibatasi ke halaman yang tersedia.

Untuk memeriksa stok di detail Artisan Grand Sneaker, pilih warna Ochre & Tan Welt: EU 40 habis, EU 42 tersisa 2. Jumlah tidak dapat melebihi 2. Saat warna berubah, ukuran dan jumlah direset. Tombol **Tambah ke Keranjang** tetap nonaktif sampai Fase 3. Bar pembelian mobile menggantikan navigasi bawah pada detail agar keduanya tidak bertumpuk.

WhatsApp menggunakan template sesuai permintaan pengguna. Isi `VITE_WHATSAPP_NUMBER` di `.env` dengan nomor internasional diawali `62` tanpa `+`, lalu restart Vite. Jika kosong, CTA tampil nonaktif dengan keterangan kontak segera tersedia; tidak ada nomor tujuan buatan. Contoh konfigurasi tersedia di `.env.example`.

Buletin hanya memvalidasi alamat email untuk pratinjau; belum mengirim atau menyimpan pendaftaran. Ulasan/testimoni diberi label contoh. Foto, warna, harga, dan stok merupakan materi demonstrasi; beberapa varian memakai foto referensi model yang sama. Lihat [sumber gambar](public/images/SOURCES.md).

## Hasil pemeriksaan Fase 2

`npm run build` dan `npm run lint` lolos. Pemeriksaan fungsi memverifikasi data produk, keberadaan foto lokal, kombinasi filter, urutan harga, dan batas pagination. Chrome headless menjalankan 21 pemeriksaan layout pada lebar 390px, 768px, dan 1440px tanpa overflow horizontal atau error konsol; screenshot beranda, katalog, detail, filter mobile, dan panduan ukuran diperiksa secara visual.

Alur Beranda → Katalog → Detail, grid/daftar, pencarian tanpa hasil, filter URL, 12/24/48 item, pagination, favorit setelah refresh, ukuran habis, batas jumlah sesuai stok, reset ukuran saat ganti warna, thumbnail/zoom, Escape dan fokus modal, serta 404 produk lolos. Skrip dan hasil QA lokal tersedia di `.verification/check-catalog.mjs`, `.verification/check-phase2.mjs`, dan `.verification/phase2-results.json` (diabaikan Git).

## Hasil pemeriksaan Fase 1

`npm run build` dan `npm run lint` lolos. Chrome headless memverifikasi 33 URL serta 47 pemeriksaan layout pada lebar 1440px, 768px, dan 390px, tanpa overflow horizontal atau error konsol. Screenshot toko, admin, login, dan drawer diperiksa secara visual. Navigasi tanpa reload, penanda aktif berdasarkan query, riwayat browser, bottom bar, pemuatan logo, Escape, putaran fokus keyboard, penutupan drawer saat navigasi/resize, dan pilihan gudang antarhalaman juga lolos.

## Pemeriksaan Fase 0

Build dan lint lolos. Halaman diperiksa di Chrome headless pada viewport 1440px dan 390px: tidak ada overflow horizontal atau error konsol, font termuat, seluruh delapan tombol aktif mengubah pesan, empat tombol nonaktif tidak dapat digunakan, dan favorit dapat dinyalakan/dimatikan. Hasil screenshot juga diperiksa secara visual.

Untuk mencoba panduan visual, buka `/panduan-visual`, lalu gunakan menu Warna, Tipografi, Komponen, dan Format. Pada bagian Komponen, klik tombol sedang/kecil dan ikon favorit. Gunakan tombol Tab untuk melihat indikator fokus keyboard.

## Acuan dan progres

- [Rancangan](design/README.md)
- [Aturan dan daftar tugas](design/TASKS.md)
- [Progres implementasi](PROGRESS.md)

Folder `design/` adalah referensi dan tidak diubah. Tailwind hanya memindai `src/`, sehingga kelas dari ekspor Stitch tidak ikut masuk CSS produksi. `.env` diabaikan Git; `.env.example` tetap dapat dilacak.
