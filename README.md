# SOLEHOUSE

Toko sepatu artisan dan Order Management System (OMS), dibangun bertahap dengan React, TypeScript, Vite, Tailwind CSS v4, dan React Router.

**Status: Fase 4 selesai pada 10 Oktober 2026.** Pelanggan dapat berbelanja, menyimulasikan pembayaran, dan melacak pesanan yang tersimpan di browser. Login dan admin OMS mengikuti fase berikutnya di [design/TASKS.md](design/TASKS.md).

## Menjalankan

Gunakan Node.js 24 LTS dan npm. Versi yang dipakai saat verifikasi: Node.js 24.15.0. Pengujian memakai dukungan TypeScript bawaan Node, tanpa library tambahan.

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
npm test
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
| Konfirmasi pembayaran demo | `/checkout/konfirmasi/:orderId` (nomor dibuat saat checkout) |
| Pelacakan pesanan | `/lacak`, `/lacak/:orderId` (gunakan nomor dari checkout) |
| Akun / favorit | `/akun`, `/wishlist` |
| Halaman masuk admin | `/admin/login` |
| Dashboard admin | `/admin` |
| Pesanan / detail contoh | `/admin/pesanan`, `/admin/pesanan/SLH-2025-88491` |
| Produk / inventori | `/admin/produk`, `/admin/inventori` |
| Menu admin tambahan | `/admin/pelanggan`, `/admin/pengiriman`, `/admin/retur`, `/admin/laporan`, `/admin/pengaturan`, `/admin/notifikasi` |
| Panduan visual Fase 0 | `/panduan-visual` |

Seluruh tautan bantuan di footer memiliki placeholder. URL yang tidak dikenal menampilkan 404 dengan tautan kembali ke toko/dashboard. Halaman admin masih berupa pratinjau terbuka; autentikasi dan proteksi rute dikerjakan pada Fase 5. Badge keranjang mengikuti jumlah pasang; badge pesanan admin masih 0. Pilihan butik/gudang tersimpan selama berpindah halaman admin, belum memfilter data atau tersimpan setelah refresh.

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

Pada data awal detail Artisan Grand Sneaker, warna Ochre & Tan Welt: EU 40 habis, EU 42 tersisa 2. Jumlah tidak dapat melebihi stok. Saat warna berubah, ukuran dan jumlah direset. Sejak Fase 3, tombol **Tambah ke Keranjang** aktif setelah memilih ukuran yang tersedia, dengan memperhitungkan jumlah yang sudah ada di keranjang. Bar pembelian mobile menggantikan navigasi bawah pada detail agar keduanya tidak bertumpuk.

WhatsApp menggunakan template sesuai permintaan pengguna. Isi `VITE_WHATSAPP_NUMBER` di `.env` dengan nomor internasional diawali `62` tanpa `+`, lalu restart Vite. Jika kosong, CTA tampil nonaktif dengan keterangan kontak segera tersedia; tidak ada nomor tujuan buatan. Contoh konfigurasi tersedia di `.env.example`.

Buletin hanya memvalidasi alamat email untuk pratinjau; belum mengirim atau menyimpan pendaftaran. Ulasan/testimoni diberi label contoh. Foto, warna, harga, dan stok merupakan materi demonstrasi; beberapa varian memakai foto referensi model yang sama. Lihat [sumber gambar](public/images/SOURCES.md).

## Keranjang dan checkout (Fase 3)

`CommerceProvider` menyediakan state bersama lewat React Context; `hooks/useCart.ts` dipakai oleh detail, navbar, keranjang, dan checkout. Item unik berdasarkan produk, varian warna, dan ukuran. Menambah pilihan yang sama menggabungkan jumlah; ukuran atau warna berbeda menghasilkan baris tersendiri. Stok terbaru tersedia lewat `useProducts()` untuk beranda, katalog, detail, dan favorit.

- `src/lib/commerce.ts`: perhitungan total, validasi alamat/stok, pembuatan pesanan, dan pembayaran simulasi. Harga produk disalin ke pesanan agar total pesanan tidak mengikuti perubahan keranjang.
- `src/store/commerceStore.ts`: operasi tambah/ubah/hapus/kosongkan, voucher, kado, checkout, dan pembayaran. Keranjang serta pesanan disimpan dalam satu objek `solehouse:commerce:v1` di `localStorage`, dibungkus `try/catch`. Pesan peringatan muncul jika penyimpanan gagal; sesi tetap dapat digunakan.
- `src/components/store/OrderSummary.tsx`: ringkasan bersama untuk keranjang, checkout, dan konfirmasi.
- `src/pages/store/CheckoutPage.tsx`: validasi penerima, nomor Indonesia, email, provinsi/kota/kecamatan, kode pos 5 digit, alamat, dan catatan opsional. Ekspedisi dan bank memakai pilihan demo.
- `src/pages/store/OrderConfirmationPage.tsx`: pesanan tersimpan dengan status `menunggu_bayar`; tombol **Simulasikan Pembayaran** mengubahnya ke `dibayar`. Tidak ada rekening tujuan, transfer, atau tagihan sungguhan.

Aturan perhitungan:

| Komponen | Aturan demo |
|---|---|
| Voucher `SOLEWELCOME` | Diskon 10% subtotal produk, dibulatkan ke Rupiah terdekat |
| Kemasan kado | Tambahan Rp35.000 per pesanan; tidak ikut diskon |
| J&T Reguler | Rp24.000; gratis jika subtotal setelah diskon minimal Rp750.000 |
| SiCepat BEST / JNE YES | Tarif tetap Rp18.000 / Rp22.000 |
| Biaya layanan | Rp5.000 per pesanan |
| Total | Subtotal − diskon + kado + ongkir + biaya layanan |

Cara mencoba:

1. Pilih Artisan Grand Sneaker dan Vagabond Suede Loafer, masing-masing satu pasang dengan ukuran tersedia.
2. Buka keranjang, ubah jumlah atau simpan ke favorit. Coba voucher salah, lalu `SOLEWELCOME`, serta pilihan kado.
3. Dengan harga data saat ini (Rp1.490.000 + Rp1.290.000), tanpa kado dan memakai J&T Reguler, total setelah voucher adalah **Rp2.507.000**. Contoh nominal desain Rp2.840.000 menghasilkan **Rp2.561.000** dan diperiksa dalam unit test.
4. Lanjut ke checkout, isi alamat contoh, pilih ekspedisi dan bank, lalu **Bayar Sekarang**. Keranjang dikosongkan setelah pesanan tercipta.
5. Di `/checkout/konfirmasi/SLH-2025-xxxxx`, klik **Simulasikan Pembayaran**, kemudian buka kembali detail produk untuk melihat stok berkurang. Refresh halaman mempertahankan pesanan dan stoknya. Pesanan terakhir dapat dibuka kembali dari keranjang kosong.

Stok dihitung dari pesanan yang sudah dibayar agar pembayaran ulang atau refresh tidak mengurangi stok dua kali. Stok diperiksa lagi saat checkout dan pembayaran; bila sudah habis karena pesanan lain dibayar lebih dulu, pembayaran ditolak dengan pesan jelas. Hitung mundur 15 menit hanya pengingat: tidak mereservasi stok atau membatalkan keranjang. Format ID memakai `SLH-2025-xxxxx` sesuai tugas, sedangkan waktu pesanan memakai waktu pembuatan sebenarnya.

Data demo hanya tersimpan pada browser dan origin yang sama (`localhost` berbeda dari `127.0.0.1`). Perubahan tab lain disinkronkan melalui event penyimpanan, tetapi ini belum merupakan transaksi server untuk pembelian serentak lintas perangkat. Supabase dan transaksi stok sungguhan dijadwalkan pada Fase 7. Pengelolaan admin belum aktif.

## Pelacakan pesanan (Fase 4)

Buka `/lacak` dan masukkan nomor dari konfirmasi checkout, atau klik **Lacak pesanan ini** pada konfirmasi. Tiga pesanan terbaru di browser tersedia sebagai tautan cepat. `/lacak/:orderId` dapat dibuka langsung dan tetap menampilkan hasil setelah refresh. Pencarian mengabaikan spasi awal/akhir dan huruf kecil; format salah serta nomor tidak ditemukan memiliki pesan tersendiri.

- `src/pages/store/TrackOrderPage.tsx` membaca pesanan dari Context yang sama dengan checkout. Hasil berisi status, kurir, resi jika tersedia, daftar sepatu, total, dan alamat.
- `src/components/store/TrackingTimeline.tsx` menampilkan Pesanan Dibuat → Dibayar → Dikemas (QC) → Dikirim → Diterima. `diproses` dan `siap_kirim` berada dalam tahap QC/pengemasan. Status batal atau retur memiliki keterangan khusus.
- `src/lib/tracking.ts` mengolah tahapan dan riwayat waktu. `Order.events` bersifat opsional agar data Fase 3 tetap terbaca; `createdAt` dan `payment.paidAt` menjadi sumber waktu untuk pesanan lama. Pesanan baru mencatat peristiwa dibuat/dibayar. Waktu ditampilkan dalam WIB, dan waktu yang tidak tersedia tidak dibuat-buat.
- **Salin nomor resi** tersedia jika pesanan memiliki resi; kegagalan clipboard memberi petunjuk salin manual. WhatsApp tetap memakai template tanpa nomor aktif; setelah `VITE_WHATSAPP_NUMBER` dikonfigurasi, pesan bantuan menyertakan nomor pesanan.
- **Cetak Resi PDF** memanggil dialog cetak browser. Pilih **Simpan sebagai PDF**. Gaya A4 menyembunyikan navigasi, pencarian, tombol, dan bantuan; hasilnya ringkasan pengiriman demo, bukan label kurir resmi.

Untuk mencoba: buat pesanan → buka pelacakan (Menunggu Bayar) → buka pembayaran dan simulasikan → kembali ke pelacakan (Dibayar). Pengemasan/pengiriman/diterima dan pengisian resi menunggu implementasi admin Fase 5. Tidak ada integrasi kurir, estimasi tiba buatan, atau perubahan status otomatis. Nomor contoh dalam desain tidak otomatis menjadi pesanan nyata.

## Hasil pemeriksaan Fase 4

Build dan lint lolos. Seluruh 18 test (`npm test`) mencakup regresi checkout, pencatatan peristiwa, kompatibilitas data lama, status batal/retur, dan waktu yang belum tersedia. Chrome memverifikasi 18 kondisi layout pada 390px/768px/1440px tanpa overflow horizontal atau error konsol, termasuk checkout → pelacakan → pembayaran, pencarian, tautan langsung, dan refresh.

Status pengiriman/diterima/batal diuji memakai fixture hanya di profil QA terpisah. Clipboard diuji dengan mock berhasil/ditolak; tombol cetak diverifikasi memanggil `window.print()`, lalu PDF A4 dihasilkan melalui Chrome dan dirender untuk pemeriksaan visual. Hasil lokal: `.verification/phase4-results.json`, `phase4-*.png`, dan `phase4-tracking.pdf` (diabaikan Git).

## Hasil pemeriksaan Fase 3

`npm run build`, `npm run lint`, dan seluruh 11 pengujian `npm test` lolos. Test memeriksa perhitungan, kombinasi item, stok, voucher, validasi, pembayaran berulang, persistensi, penyimpanan rusak/penuh, dan perubahan berurutan antar-tab.

Chrome headless memverifikasi alur belanja sampai pembayaran pada lebar 390px, 768px, dan 1440px: 24 pemeriksaan layout tanpa overflow horizontal atau error konsol. Voucher/kado bertahan setelah refresh, validasi memfokuskan kolom salah, pilihan ekspedisi mengubah total, pembayaran mengubah stok, dan pindah ke favorit berfungsi. Screenshot keranjang, checkout, serta konfirmasi pembayaran diperiksa secara visual. Hasil QA lokal ada di `.verification/phase3-results.json` dan `phase3-*.png` (diabaikan Git).

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
