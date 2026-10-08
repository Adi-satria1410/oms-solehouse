# Aturan Proyek SOLEHOUSE

## Konteks
Baca README.md untuk rancangan dan DESIGN.md untuk design system.
Acuan tampilan ada di design/stitch/<nama-layar>/code.html.

## Stack
React + Vite + TypeScript, Tailwind v4, React Router, npm.
Jangan tambah library baru tanpa bertanya.

## Aturan kode
- Pakai TypeScript, hindari `any`.
- Warna hanya dari token (bg-base, text-ink, dst). Jangan tulis hex di komponen.
- Harga lewat formatRupiah() di src/lib/format.ts.
- Satu komponen satu file. Komponen yang berulang jangan disalin-tempel.
- Teks UI dalam bahasa Indonesia.
- Ikon pakai komponen <Icon name="..." /> (Material Symbols).

## Cara kerja
- Kerjakan satu fase dari TASKS.md, lalu berhenti dan lapor.
- Setelah perubahan, jalankan `npm run build` dan `npm run lint`, pastikan tanpa error.
- Jelaskan singkat apa yang diubah, saya sedang belajar.
- Jangan sentuh folder design/.

## Perintah
npm run dev | npm run build | npm run lint