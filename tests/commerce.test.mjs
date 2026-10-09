import test from 'node:test'
import assert from 'node:assert/strict'
import { products } from '../src/data/products.ts'
import { availableProducts, calculateTotals, emptyCommerce, itemKey, makeOrder, payOrder, validateAddress } from '../src/lib/commerce.ts'
import { COMMERCE_KEY, createCommerceStore } from '../src/store/commerceStore.ts'

const address = { name: 'Pelanggan Demo', phone: '081234567890', email: 'demo@example.com', province: 'Jawa Barat', city: 'Bandung', district: 'Coblong', postalCode: '40132', street: 'Jalan Contoh Nomor 10', note: 'Data pengujian' }
const item = { productId: products[0].id, variantId: products[0].variants[0].id, size: 42, qty: 1 }
const memory = () => {
  const values = new Map()
  return { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) }
}
const stock = orders => availableProducts(products, orders)[0].variants[0].stock[42]

test('reference total, product-only discount, gift, shipping, and empty cart', () => {
  const reference = [{ price: 1490000, qty: 1 }, { price: 1350000, qty: 1 }]
  assert.deepEqual(calculateTotals(reference, 'SOLEWELCOME'), { count: 2, subtotal: 2840000, discount: 284000, gift: 0, shipping: 0, service: 5000, total: 2561000 })
  assert.equal(calculateTotals(reference, 'SOLEWELCOME', true, 'jne').total, 2618000)
  assert.equal(calculateTotals([{ price: 750000, qty: 1 }]).shipping, 0)
  assert.equal(calculateTotals([{ price: 750000, qty: 1 }], 'SOLEWELCOME').shipping, 24000)
  assert.equal(calculateTotals([], 'SOLEWELCOME', true).total, 0)
})

test('cart merges identical variants, separates size and color, persists and updates quantities', () => {
  const storage = memory(), store = createCommerceStore(storage)
  store.addItem(item); store.addItem(item)
  store.addItem({ ...item, size: 41 })
  store.addItem({ ...item, variantId: products[0].variants[1].id })
  assert.equal(store.getSnapshot().data.cart.items.length, 3)
  assert.equal(store.getSnapshot().data.cart.items[0].qty, 2)
  assert.throws(() => store.addItem(item), /Stok/)
  for (const qty of [0, -1, 1.2, NaN, Infinity, 3]) assert.throws(() => store.updateQuantity(itemKey(item), qty))
  store.updateQuantity(itemKey(item), 1)
  assert.deepEqual(createCommerceStore(storage).getSnapshot().data, store.getSnapshot().data)
  assert.equal(store.getSnapshot().warning, '')
})

test('unavailable sizes and unknown variants cannot enter the cart', () => {
  const store = createCommerceStore(memory())
  assert.throws(() => store.addItem({ ...item, size: 40 }), /Stok/)
  assert.throws(() => store.addItem({ ...item, variantId: 'missing' }), /Stok/)
  assert.throws(() => store.addItem({ ...item, qty: -1 }))
  assert.equal(store.getSnapshot().data.cart.items.length, 0)
})

test('voucher errors preserve a valid voucher; removal and clearing reset extras', () => {
  const store = createCommerceStore(memory())
  store.addItem(item); store.applyVoucher(' solewelcome '); store.setGift(true)
  assert.throws(() => store.applyVoucher('SALAH'), /tidak dikenal/)
  assert.equal(store.getSnapshot().data.cart.voucher, 'SOLEWELCOME')
  store.applyVoucher(''); assert.equal(store.getSnapshot().data.cart.voucher, '')
  store.removeItem(itemKey(item))
  assert.deepEqual(store.getSnapshot().data.cart, emptyCommerce().cart)
  store.addItem(item); store.clearCart()
  assert.equal(store.getSnapshot().data.cart.startedAt, null)
})

test('checkout snapshots totals and address, saves pending order, clears cart without deducting stock', () => {
  const storage = memory(), store = createCommerceStore(storage)
  store.addItem(item); store.addItem({ productId: products[2].id, variantId: products[2].variants[0].id, size: 41, qty: 1 })
  store.applyVoucher('SOLEWELCOME')
  const id = store.checkout(address, 'jnt', 'BCA VA')
  const order = store.getSnapshot().data.orders[0]
  assert.match(id, /^SLH-2025-\d{5}$/)
  assert.equal(order.total, 2507000)
  assert.equal(order.status, 'menunggu_bayar'); assert.equal(order.payment.paid, false)
  assert.equal(order.items.length, 2); assert.equal(stock([order]), 2)
  assert.equal(store.getSnapshot().data.cart.items.length, 0)
  assert.throws(() => store.checkout(address, 'jnt', 'BCA VA'), /kosong/)
  assert.deepEqual(createCommerceStore(storage).getSnapshot().data.orders[0], order)
})

test('payment updates only matching stock and stays idempotent after reload', () => {
  const storage = memory(), store = createCommerceStore(storage)
  store.addItem(item)
  const id = store.checkout(address, 'sicepat', 'Mandiri VA')
  store.simulatePayment(id)
  const loaded = createCommerceStore(storage)
  loaded.simulatePayment(id)
  const orders = loaded.getSnapshot().data.orders
  assert.equal(stock(orders), 1)
  assert.equal(orders[0].status, 'dibayar'); assert.ok(orders[0].payment.paidAt)
  assert.equal(availableProducts(products, orders)[0].variants[1].stock[42], 2)
  assert.equal(products[0].variants[0].stock[42], 2, 'seed is never mutated')
})

test('two pending orders may coexist, but insufficient stock prevents the second payment atomically', () => {
  const store = createCommerceStore(memory())
  store.addItem({ ...item, qty: 2 }); const first = store.checkout(address, 'jnt', 'BNI VA')
  store.addItem(item); const second = store.checkout(address, 'jne', 'BRI BRIVA')
  assert.notEqual(first, second)
  store.simulatePayment(first)
  assert.throws(() => store.simulatePayment(second), /tersisa 0/)
  assert.equal(store.getSnapshot().data.orders.find(order => order.id === second).status, 'menunggu_bayar')
  assert.equal(stock(store.getSnapshot().data.orders), 0)
})

test('checkout revalidates stale cart after another pending order is paid', () => {
  const store = createCommerceStore(memory())
  store.addItem({ ...item, qty: 2 }); const id = store.checkout(address, 'jnt', 'Permata VA')
  store.addItem(item); store.simulatePayment(id)
  assert.throws(() => store.checkout(address, 'jnt', 'BCA VA'), /Stok/)
  assert.equal(store.getSnapshot().data.cart.items.length, 1)
  assert.equal(store.getSnapshot().data.orders.length, 1)
})

test('address errors, unknown options, and duplicate order IDs are rejected before mutation', () => {
  const bad = { ...address, name: ' ', phone: 'abc', email: 'email', postalCode: '123', street: 'x' }
  assert.equal(Object.keys(validateAddress(bad)).length, 5)
  assert.deepEqual(validateAddress({ ...address, phone: '+62 812-3456-7890' }), {})
  const store = createCommerceStore(memory()); store.addItem(item)
  assert.throws(() => store.checkout(bad, 'jnt', 'BCA VA'), /alamat/)
  assert.throws(() => store.checkout(address, 'unknown', 'BCA VA'), /ekspedisi/)
  assert.throws(() => store.checkout(address, 'jnt', 'unknown'), /pembayaran/)
  const id = store.checkout(address, 'jnt', 'BCA VA'); store.addItem(item)
  assert.throws(() => makeOrder(store.getSnapshot().data, products, address, 'jnt', 'BCA VA', id, new Date().toISOString()), /digunakan/)
  assert.throws(() => payOrder(store.getSnapshot().data, products, 'missing', new Date().toISOString()), /tidak ditemukan/)
})

test('malformed storage safely recovers and unavailable storage keeps in-memory checkout working', () => {
  for (const raw of ['{', '{"version":1,"cart":null}', JSON.stringify({ ...emptyCommerce(), cart: { ...emptyCommerce().cart, items: [{ ...item, variantId: 'missing' }] } })]) {
    const storage = memory(); storage.setItem(COMMERCE_KEY, raw)
    const store = createCommerceStore(storage)
    assert.ok(store.getSnapshot().warning)
    store.addItem(item)
    assert.equal(store.getSnapshot().data.cart.items.length, 1)
  }
  const store = createCommerceStore({ getItem: () => null, setItem: () => { throw new Error('quota') } })
  store.addItem(item); assert.ok(store.getSnapshot().warning)
  const id = store.checkout(address, 'jnt', 'BCA VA'); store.simulatePayment(id)
  assert.equal(stock(store.getSnapshot().data.orders), 1)
  assert.ok(store.getSnapshot().warning)
})

test('sequential changes from separate store instances use latest saved state', () => {
  const storage = memory(), first = createCommerceStore(storage), second = createCommerceStore(storage)
  first.addItem(item); second.addItem(item)
  first.sync()
  assert.equal(first.getSnapshot().data.cart.items[0].qty, 2)
  assert.throws(() => first.addItem(item), /Stok/)
})
