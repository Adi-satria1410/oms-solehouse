import type { Cart, CartItem, CommerceData, Order, OrderItem, Product, ShippingAddress } from '../types'

export const VOUCHER = 'SOLEWELCOME'
export const GIFT_PRICE = 35000
export const SERVICE_FEE = 5000
export const FREE_SHIPPING_MIN = 750000
export const couriers = [
  { id: 'jnt', name: 'J&T Express — Reguler', fee: 24000, estimate: '2–4 hari kerja', freeEligible: true },
  { id: 'sicepat', name: 'SiCepat — BEST', fee: 18000, estimate: '1–2 hari kerja', freeEligible: false },
  { id: 'jne', name: 'JNE — YES', fee: 22000, estimate: '1–2 hari kerja', freeEligible: false },
]
export const paymentMethods = ['BCA VA', 'Mandiri VA', 'BNI VA', 'BRI BRIVA', 'Permata VA']
export const emptyCart = (): Cart => ({ items: [], voucher: '', gift: false, startedAt: null })
export const emptyCommerce = (): CommerceData => ({ version: 1, cart: emptyCart(), orders: [] })
export const itemKey = (item: Pick<CartItem, 'productId' | 'variantId' | 'size'>) => `${item.productId}:${item.variantId}:${item.size}`

export function calculateTotals(items: { price: number; qty: number }[], voucher = '', gift = false, courierId = 'jnt') {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)
  const discount = voucher === VOUCHER ? Math.round(subtotal * 0.1) : 0
  const courier = couriers.find(item => item.id === courierId) ?? couriers[0]
  const shipping = items.length && !(courier.freeEligible && subtotal - discount >= FREE_SHIPPING_MIN) ? courier.fee : 0
  const giftFee = items.length && gift ? GIFT_PRICE : 0
  const service = items.length ? SERVICE_FEE : 0
  return { count: items.reduce((sum, item) => sum + item.qty, 0), subtotal, discount, gift: giftFee, shipping, service, total: subtotal - discount + giftFee + shipping + service }
}

// Stock is derived from paid orders, so refresh and repeated payment cannot deduct it twice.
export function availableProducts(products: Product[], orders: Order[]): Product[] {
  const sold = new Map<string, number>()
  for (const order of orders) {
    if (!order.payment.paid || order.status === 'dibatalkan' || order.status === 'retur') continue
    for (const item of order.items) sold.set(itemKey(item), (sold.get(itemKey(item)) ?? 0) + item.qty)
  }
  return products.map(product => ({ ...product, variants: product.variants.map(variant => ({ ...variant,
    stock: Object.fromEntries(Object.entries(variant.stock).map(([size, qty]) => [size, Math.max(0, qty - (sold.get(itemKey({ productId: product.id, variantId: variant.id, size: Number(size) })) ?? 0))])),
  })) }))
}

export function resolveItems(items: CartItem[], products: Product[]): OrderItem[] {
  return items.map(item => {
    const product = products.find(product => product.id === item.productId)
    const variant = product?.variants.find(variant => variant.id === item.variantId)
    if (!product || !variant) throw new Error('Produk tidak tersedia. Hapus item tersebut dari keranjang.')
    return { ...item, variantSku: variant.sku, name: product.name, colorName: variant.colorName, image: product.images[0].src, slug: product.slug, price: product.price }
  })
}

export function checkStock(items: CartItem[], products: Product[]) {
  const totals = new Map<string, number>()
  for (const item of items) {
    const product = products.find(product => product.id === item.productId)
    const stock = product?.variants.find(variant => variant.id === item.variantId)?.stock[item.size] ?? 0
    const requested = (totals.get(itemKey(item)) ?? 0) + item.qty
    totals.set(itemKey(item), requested)
    if (!Number.isSafeInteger(item.qty) || item.qty < 1 || requested > stock) throw new Error(`Stok ${product?.name ?? 'produk'} EU ${item.size} tersisa ${stock} pasang. Sesuaikan keranjang Anda.`)
  }
}

export function validateAddress(address: ShippingAddress): Partial<Record<keyof ShippingAddress, string>> {
  const errors: Partial<Record<keyof ShippingAddress, string>> = {}
  const required: (keyof ShippingAddress)[] = ['name', 'phone', 'email', 'province', 'city', 'district', 'postalCode', 'street']
  required.forEach(key => { if (!address[key].trim()) errors[key] = 'Kolom ini wajib diisi.' })
  if (address.name.trim() && address.name.trim().length < 2) errors.name = 'Tulis nama penerima minimal 2 karakter.'
  if (address.phone && !/^(?:0|\+?62)8\d{8,11}$/.test(address.phone.replace(/[\s()-]/g, ''))) errors.phone = 'Gunakan nomor Indonesia, misalnya 081234567890.'
  if (address.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address.email.trim())) errors.email = 'Alamat email belum valid.'
  if (address.postalCode && !/^\d{5}$/.test(address.postalCode.trim())) errors.postalCode = 'Kode pos harus 5 digit.'
  if (address.street.trim() && address.street.trim().length < 10) errors.street = 'Lengkapi jalan, nomor rumah, atau patokan (minimal 10 karakter).'
  return errors
}

export function makeOrder(data: CommerceData, products: Product[], address: ShippingAddress, courierId: string, method: string, id: string, now: string): Order {
  if (!data.cart.items.length) throw new Error('Keranjang masih kosong.')
  if (Object.keys(validateAddress(address)).length) throw new Error('Lengkapi alamat pengiriman dengan benar.')
  const courier = couriers.find(item => item.id === courierId)
  if (!courier || !paymentMethods.includes(method)) throw new Error('Pilih ekspedisi dan metode pembayaran yang tersedia.')
  if (data.orders.some(order => order.id === id)) throw new Error('Nomor pesanan sudah digunakan. Silakan coba lagi.')
  checkStock(data.cart.items, availableProducts(products, data.orders))
  const items = resolveItems(data.cart.items, products)
  const summary = calculateTotals(items, data.cart.voucher, data.cart.gift, courier.id)
  return { id, createdAt: now, customer: { name: address.name, phone: address.phone, email: address.email, city: address.city }, address: { ...address }, items,
    payment: { method, paid: false }, courier: courier.name, status: 'menunggu_bayar', total: summary.total, summary, gift: data.cart.gift, voucher: data.cart.voucher }
}

export function payOrder(data: CommerceData, products: Product[], id: string, now: string): CommerceData {
  const order = data.orders.find(item => item.id === id)
  if (!order) throw new Error('Pesanan tidak ditemukan di perangkat ini.')
  if (order.payment.paid) return data
  if (order.status !== 'menunggu_bayar') throw new Error('Pesanan ini tidak dapat dibayar.')
  checkStock(order.items, availableProducts(products, data.orders))
  return { ...data, orders: data.orders.map(item => item.id === id ? { ...item, status: 'dibayar', payment: { ...item.payment, paid: true, paidAt: now } } : item) }
}
