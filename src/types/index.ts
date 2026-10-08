export type OrderStatus =
  | 'menunggu_bayar'
  | 'dibayar'
  | 'diproses'
  | 'siap_kirim'
  | 'dikirim'
  | 'selesai'
  | 'dibatalkan'
  | 'retur'

export type Product = {
  id: string
  slug: string
  sku: string
  name: string
  category: 'sneakers' | 'formal' | 'loafers' | 'boots' | 'running' | 'mules'
  material: string
  price: number
  comparePrice?: number
  badge?: 'sale' | 'new' | 'terlaris' | 'limited'
  rating: number
  reviewCount: number
  variants: Variant[]
  collection: 'pria' | 'wanita' | 'anak'
  images: { src: string; alt: string }[]
  description: string
  construction: string
  releasedAt: string
}

export type Variant = {
  id: string
  sku: string
  colorName: string
  color: 'krem' | 'coklat' | 'hitam' | 'taupe' | 'olive'
  stock: Record<number, number>
}

export type Order = {
  id: string
  createdAt: string
  customer: { name: string; phone: string; email: string; city: string }
  items: { variantSku: string; size: number; qty: number; price: number }[]
  payment: { method: string; paid: boolean }
  courier: string
  trackingNumber?: string
  status: OrderStatus
  total: number
}
