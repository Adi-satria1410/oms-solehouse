import type { CartItem, CommerceData, Order } from '../types'

const object = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value)
const strings = (value: Record<string, unknown>, keys: string[]) => keys.every(key => typeof value[key] === 'string')
const integer = (value: unknown): value is number => Number.isSafeInteger(value) && Number(value) >= 0
const cartItem = (value: unknown): value is CartItem => object(value) && strings(value, ['productId', 'variantId']) && integer(value.size) && value.size >= 36 && value.size <= 46 && integer(value.qty) && value.qty > 0
const orderValid = (value: unknown): value is Order => {
  if (!object(value) || !strings(value, ['id', 'createdAt', 'courier', 'voucher']) || !/^SLH-2025-\d{5}$/.test(String(value.id))) return false
  if (!object(value.customer) || !strings(value.customer, ['name', 'phone', 'email', 'city'])) return false
  if (!object(value.address) || !strings(value.address, ['name', 'phone', 'email', 'province', 'city', 'district', 'postalCode', 'street', 'note'])) return false
  if (!object(value.payment) || typeof value.payment.method !== 'string' || typeof value.payment.paid !== 'boolean') return false
  if (!['menunggu_bayar', 'dibayar', 'diproses', 'siap_kirim', 'dikirim', 'selesai', 'dibatalkan', 'retur'].includes(String(value.status))) return false
  if (!integer(value.total) || typeof value.gift !== 'boolean' || !object(value.summary)) return false
  const summary = value.summary
  if (!['count', 'subtotal', 'discount', 'gift', 'shipping', 'service', 'total'].every(key => integer(summary[key]))) return false
  return Array.isArray(value.items) && value.items.length > 0 && value.items.every(item => object(item) && strings(item, ['variantSku', 'name', 'colorName', 'image', 'slug']) && integer(item.price) && cartItem(item))
}

export function parseCommerce(raw: string): CommerceData {
  const value: unknown = JSON.parse(raw)
  if (!object(value) || value.version !== 1 || !object(value.cart) || !Array.isArray(value.cart.items) || !value.cart.items.every(cartItem) || typeof value.cart.gift !== 'boolean' || !['', 'SOLEWELCOME'].includes(String(value.cart.voucher)) || !(value.cart.startedAt === null || integer(value.cart.startedAt)) || !Array.isArray(value.orders) || !value.orders.every(orderValid)) throw new Error('Data belanja tersimpan tidak valid.')
  const ids = value.orders.map(order => order.id)
  const keys = value.cart.items.map(item => `${item.productId}:${item.variantId}:${item.size}`)
  if (new Set(ids).size !== ids.length || new Set(keys).size !== keys.length) throw new Error('Data belanja berisi duplikat.')
  return value as unknown as CommerceData
}
