import test from 'node:test'
import assert from 'node:assert/strict'
import { products } from '../src/data/products.ts'
import { emptyCommerce, makeOrder, payOrder } from '../src/lib/commerce.ts'
import { getOrderEvents, isOrderId, normalizeOrderId, trackingSteps } from '../src/lib/tracking.ts'
import { parseCommerce } from '../src/store/commerceStorage.ts'
import { formatTanggal } from '../src/lib/format.ts'

const createdAt = '2026-10-09T17:05:00.000Z'
const paidAt = '2026-10-09T17:10:00.000Z'
const address = { name: 'Pelanggan Demo', phone: '081234567890', email: 'demo@example.com', province: 'Jawa Barat', city: 'Bandung', district: 'Coblong', postalCode: '40132', street: 'Jalan Contoh Nomor 10', note: '' }
const state = emptyCommerce()
state.cart.items = [{ productId: products[0].id, variantId: products[0].variants[0].id, size: 42, qty: 1 }]
const order = makeOrder(state, products, address, 'jnt', 'BCA VA', 'SLH-2025-12345', createdAt)
const paid = payOrder({ ...emptyCommerce(), orders: [order] }, products, order.id, paidAt).orders[0]

test('order search normalizes case/whitespace and rejects malformed IDs', () => {
  assert.equal(normalizeOrderId(' slh-2025-12345 '), order.id)
  assert.ok(isOrderId(' slh-2025-12345 '))
  for (const invalid of ['', 'SLH-2025', 'SLH-2025-123456', '12345', '../12345']) assert.equal(isOrderId(invalid), false)
})

test('creation and payment record exactly one persisted event each', () => {
  assert.deepEqual(order.events.map(event => event.status), ['menunggu_bayar'])
  assert.deepEqual(paid.events.map(event => event.status), ['menunggu_bayar', 'dibayar'])
  const repeated = payOrder({ ...emptyCommerce(), orders: [paid] }, products, paid.id, '2026-10-10T03:00:00Z')
  assert.equal(repeated.orders[0].events.length, 2)
  assert.deepEqual(parseCommerce(JSON.stringify(repeated)).orders[0].events, paid.events)
})

test('legacy phase 3 orders retain real timestamps without migration or fabricated future events', () => {
  const legacy = { ...paid }; delete legacy.events
  const parsed = parseCommerce(JSON.stringify({ ...emptyCommerce(), orders: [legacy] })).orders[0]
  assert.equal(parsed.events, undefined)
  const steps = trackingSteps(parsed)
  assert.deepEqual(steps.map(step => step.at), [createdAt, paidAt, undefined, undefined, undefined])
  assert.deepEqual(steps.map(step => step.reached), [true, true, false, false, false])
  assert.equal(steps[1].current, true)
  assert.equal(formatTanggal(createdAt, { hour: '2-digit', minute: '2-digit' }), '10 Oktober 2026 pukul 00.05')
})

test('a legacy paid order missing paidAt displays unknown time instead of creation time', () => {
  const legacy = { ...paid, events: undefined, payment: { ...paid.payment, paidAt: undefined } }
  assert.equal(trackingSteps(legacy)[1].at, undefined)
  assert.ok(trackingSteps(legacy)[1].reached)
})

test('packing and shipping use recorded events; delivery stays pending until completed', () => {
  const shipped = { ...paid, status: 'dikirim', trackingNumber: 'DEMO-RESI-123', events: [...paid.events,
    { status: 'dikirim', at: '2026-10-10T08:00:00Z', note: 'Paket diserahkan kepada kurir.' },
    { status: 'diproses', at: '2026-10-10T02:00:00Z', note: 'Pemeriksaan kualitas dimulai.' },
    { status: 'siap_kirim', at: '2026-10-10T05:00:00Z', note: 'Paket selesai dikemas.' },
  ] }
  assert.deepEqual(getOrderEvents(shipped).map(event => event.status), ['menunggu_bayar', 'dibayar', 'diproses', 'siap_kirim', 'dikirim'])
  const steps = trackingSteps(shipped)
  assert.equal(steps[2].description, 'Paket selesai dikemas.')
  assert.equal(steps[3].current, true); assert.equal(steps[4].reached, false)
  assert.equal(trackingSteps({ ...shipped, status: 'selesai' })[4].at, undefined)
  assert.equal(trackingSteps({ ...shipped, status: 'selesai' })[4].reached, true)
})

test('cancelled and returned orders do not invent a completed journey', () => {
  const cancelled = { ...order, status: 'dibatalkan', events: [...order.events, { status: 'dibatalkan', at: paidAt, note: 'Dibatalkan pelanggan.' }] }
  assert.deepEqual(trackingSteps(cancelled).map(step => step.reached), [true, false, false, false, false])
  assert.equal(trackingSteps(cancelled).some(step => step.current), false)
  assert.deepEqual(trackingSteps({ ...paid, status: 'retur' }).map(step => step.reached), [true, true, false, false, false])
})

test('optional shipping fields reject malformed values while legacy data stays readable', () => {
  for (const overrides of [{ trackingNumber: 123 }, { events: {} }, { events: [{ status: 'unknown', at: paidAt, note: '' }] }, { events: [{ status: 'dikirim', at: 'bad-date', note: '' }] }]) {
    assert.throws(() => parseCommerce(JSON.stringify({ ...emptyCommerce(), orders: [{ ...order, ...overrides }] })), /tidak valid/)
  }
  assert.equal(parseCommerce(JSON.stringify({ ...emptyCommerce(), orders: [{ ...order, trackingNumber: 'DEMO-123' }] })).orders[0].trackingNumber, 'DEMO-123')
})
