const rupiahFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
})

/** Normalisasi spasi Intl agar hasil konsisten: Rp 1.490.000. */
export function formatRupiah(value: number): string {
  return rupiahFormatter.format(value).replace(/\u00a0/g, ' ')
}

/** Tanggal pesanan selalu ditampilkan dalam zona waktu Jakarta. */
export function formatTanggal(
  value: Date | string | number = new Date(),
  options: Intl.DateTimeFormatOptions = {},
): string {
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return 'Tanggal tidak valid'

  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...options,
    timeZone: 'Asia/Jakarta',
  }).format(date)
}
