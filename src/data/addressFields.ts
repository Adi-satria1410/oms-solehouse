import type { ShippingAddress } from '../types'

export const addressFields: { name: keyof ShippingAddress; label: string; autoComplete: string; type?: string; wide?: boolean }[] = [
  { name: 'name', label: 'Nama penerima', autoComplete: 'shipping name' },
  { name: 'phone', label: 'Nomor WhatsApp', autoComplete: 'shipping tel', type: 'tel' },
  { name: 'email', label: 'Email', autoComplete: 'shipping email', type: 'email', wide: true },
  { name: 'province', label: 'Provinsi', autoComplete: 'shipping address-level1' },
  { name: 'city', label: 'Kota / kabupaten', autoComplete: 'shipping address-level2' },
  { name: 'district', label: 'Kecamatan', autoComplete: 'shipping address-level3' },
  { name: 'postalCode', label: 'Kode pos', autoComplete: 'shipping postal-code' },
  { name: 'street', label: 'Alamat lengkap', autoComplete: 'shipping street-address', wide: true },
  { name: 'note', label: 'Catatan kurir (opsional)', autoComplete: 'off', wide: true },
]

