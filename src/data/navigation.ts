export const storeNavigation = [
  { label: 'Beranda', to: '/' },
  { label: 'Pria', to: '/katalog?koleksi=pria' },
  { label: 'Wanita', to: '/katalog?koleksi=wanita' },
  { label: 'Anak', to: '/katalog?koleksi=anak' },
  { label: 'Sale', to: '/katalog?sale=true' },
  { label: 'Lacak Pesanan', to: '/lacak' },
]

export const adminNavigation = [
  { label: 'Dashboard', to: '/admin', icon: 'space_dashboard', description: 'Ringkasan toko dan pesanan.' },
  { label: 'Pesanan', to: '/admin/pesanan', icon: 'shopping_bag', description: 'Daftar pesanan dan status pemrosesan akan tersedia di sini.' },
  { label: 'Produk', to: '/admin/produk', icon: 'steps', description: 'Katalog produk dan varian sepatu akan tersedia di sini.' },
  { label: 'Inventori', to: '/admin/inventori', icon: 'inventory_2', description: 'Stok per warna dan ukuran akan tersedia di sini.' },
  { label: 'Pelanggan', to: '/admin/pelanggan', icon: 'group', description: 'Daftar pelanggan dan riwayat belanja akan tersedia di sini.' },
  { label: 'Pengiriman', to: '/admin/pengiriman', icon: 'local_shipping', description: 'Pengelolaan kurir dan pengiriman akan tersedia di sini.' },
  { label: 'Retur', to: '/admin/retur', icon: 'assignment_return', description: 'Permintaan retur dan penukaran akan tersedia di sini.' },
  { label: 'Laporan', to: '/admin/laporan', icon: 'bar_chart', description: 'Laporan penjualan dan stok akan tersedia di sini.' },
  { label: 'Pengaturan', to: '/admin/pengaturan', icon: 'settings', description: 'Pengaturan toko dan profil staf akan tersedia di sini.' },
]

export const helpPages = [
  { path: 'bantuan/panduan-ukuran', title: 'Panduan Ukuran' },
  { path: 'bantuan/retur', title: 'Garansi & Retur' },
  { path: 'bantuan/perawatan', title: 'Perawatan Kulit' },
  { path: 'bantuan/faq', title: 'Pertanyaan Umum' },
]
