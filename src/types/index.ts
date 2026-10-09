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
  items: OrderItem[]
  payment: { method: string; paid: boolean; paidAt?: string }
  courier: string
  trackingNumber?: string
  status: OrderStatus
  total: number
  address: ShippingAddress
  summary: OrderTotals
  voucher: string
  gift: boolean
}

export type CartItem = { productId: string; variantId: string; size: number; qty: number }
export type Cart = { items: CartItem[]; voucher: string; gift: boolean; startedAt: number | null }
export type OrderItem = CartItem & { variantSku: string; name: string; colorName: string; image: string; slug: string; price: number }
export type ShippingAddress = { name: string; phone: string; email: string; province: string; city: string; district: string; postalCode: string; street: string; note: string }
export type OrderTotals = { count: number; subtotal: number; discount: number; gift: number; shipping: number; service: number; total: number }
export type CommerceData = { version: 1; cart: Cart; orders: Order[] }
