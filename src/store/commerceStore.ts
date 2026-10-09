import { products } from '../data/products.ts'
import { availableProducts, checkStock, emptyCart, emptyCommerce, itemKey, makeOrder, payOrder, VOUCHER } from '../lib/commerce.ts'
import { parseCommerce } from './commerceStorage.ts'
import type { CartItem, CommerceData, ShippingAddress } from '../types'

export const COMMERCE_KEY = 'solehouse:commerce:v1'
type StoragePort = Pick<Storage, 'getItem' | 'setItem'>

export function createCommerceStore(storage?: StoragePort) {
  let snapshot = { data: emptyCommerce(), warning: storage ? '' : 'Penyimpanan browser tidak tersedia. Data belanja hanya bertahan selama halaman ini terbuka.' }
  const listeners = new Set<() => void>()
  const notify = () => listeners.forEach(listener => listener())
  const refresh = () => {
    try {
      const raw = storage?.getItem(COMMERCE_KEY)
      if (raw) {
        const data = parseCommerce(raw)
        if (data.cart.items.some(item => !products.find(product => product.id === item.productId)?.variants.some(variant => variant.id === item.variantId && Object.hasOwn(variant.stock, item.size)))) throw new Error('Item keranjang tidak dikenal.')
        snapshot = { data, warning: '' }
      }
    } catch { snapshot = { ...snapshot, warning: 'Data belanja tidak dapat dibaca. Perubahan berikutnya akan disimpan sebagai data sesi ini.' } }
  }
  refresh()
  const commit = (data: CommerceData) => {
    let warning = snapshot.warning
    try {
      if (storage) { storage.setItem(COMMERCE_KEY, JSON.stringify(data)); warning = '' }
    } catch { warning = 'Perubahan belum tersimpan di browser. Jangan tutup halaman; data sesi ini dapat hilang setelah dimuat ulang.' }
    snapshot = { data, warning }
    notify()
  }
  // Read the latest saved state before mutations made from another tab.
  const latest = () => { if (!snapshot.warning) refresh(); return snapshot.data }
  return {
    getSnapshot: () => snapshot,
    subscribe: (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener) } },
    sync: () => { refresh(); notify() },
    addItem: (item: CartItem) => {
      const data = latest()
      const previous = data.cart.items.find(row => itemKey(row) === itemKey(item))
      const next = { ...item, qty: (previous?.qty ?? 0) + item.qty }
      if (!Number.isSafeInteger(item.qty) || item.qty < 1) throw new Error('Jumlah harus berupa bilangan bulat positif.')
      checkStock([next], availableProducts(products, data.orders))
      const items = previous ? data.cart.items.map(row => itemKey(row) === itemKey(next) ? next : row) : [...data.cart.items, next]
      commit({ ...data, cart: { ...data.cart, items, startedAt: data.cart.startedAt ?? Date.now() } })
    },
    updateQuantity: (key: string, qty: number) => {
      const data = latest()
      const item = data.cart.items.find(row => itemKey(row) === key)
      if (!item) return
      checkStock([{ ...item, qty }], availableProducts(products, data.orders))
      commit({ ...data, cart: { ...data.cart, items: data.cart.items.map(row => itemKey(row) === key ? { ...row, qty } : row) } })
    },
    removeItem: (key: string) => {
      const data = latest()
      const items = data.cart.items.filter(row => itemKey(row) !== key)
      commit({ ...data, cart: items.length ? { ...data.cart, items } : emptyCart() })
    },
    clearCart: () => { const data = latest(); commit({ ...data, cart: emptyCart() }) },
    setGift: (gift: boolean) => { const data = latest(); commit({ ...data, cart: { ...data.cart, gift } }) },
    applyVoucher: (code: string) => {
      const voucher = code.trim().toUpperCase()
      if (voucher && voucher !== VOUCHER) throw new Error('Kode voucher tidak dikenal. Coba SOLEWELCOME untuk diskon 10%.')
      const data = latest(); commit({ ...data, cart: { ...data.cart, voucher } })
    },
    checkout: (address: ShippingAddress, courier: string, method: string) => {
      const data = latest()
      let suffix = Math.floor(Math.random() * 90000) + 10000
      let id = `SLH-2025-${suffix}`
      for (let i = 0; data.orders.some(order => order.id === id); i++) {
        if (i >= 90000) throw new Error('Nomor pesanan demo sudah penuh.')
        suffix = suffix === 99999 ? 10000 : suffix + 1; id = `SLH-2025-${suffix}`
      }
      const order = makeOrder(data, products, address, courier, method, id, new Date().toISOString())
      commit({ ...data, cart: emptyCart(), orders: [order, ...data.orders] })
      return id
    },
    simulatePayment: (id: string) => commit(payOrder(latest(), products, id, new Date().toISOString())),
  }
}
