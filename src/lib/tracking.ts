import type { Order, OrderEvent, OrderStatus } from '../types'

export const normalizeOrderId = (value: string) => value.trim().toUpperCase()
export const isOrderId = (value: string) => /^SLH-\d{4}-\d{5}$/.test(normalizeOrderId(value))
export const orderStatusLabels: Record<OrderStatus, string> = {
  menunggu_bayar: 'Menunggu Bayar', dibayar: 'Dibayar', diproses: 'Diproses (QC & Pengemasan)',
  siap_kirim: 'Siap Dikirim', dikirim: 'Sedang Dikirim', selesai: 'Diterima', dibatalkan: 'Dibatalkan', retur: 'Retur / Klaim',
}
export const orderStatusStyles: Record<OrderStatus, string> = {
  menunggu_bayar: 'bg-waiting-bg text-waiting', dibayar: 'bg-paid-bg text-paid', diproses: 'bg-processing-bg text-processing',
  siap_kirim: 'bg-processing-bg text-processing', dikirim: 'bg-shipped-bg text-shipped', selesai: 'bg-completed-bg text-completed',
  dibatalkan: 'bg-cancelled-bg text-cancelled', retur: 'bg-returned-bg text-returned',
}
const validDate = (value?: string) => Boolean(value && Number.isFinite(Date.parse(value)))

// Older orders have no events array. Keep their real creation/payment timestamps.
export function getOrderEvents(order: Order): OrderEvent[] {
  const events = (order.events ?? []).filter(event => validDate(event.at)).map(event => ({ ...event }))
  if (!events.some(event => event.status === 'menunggu_bayar') && validDate(order.createdAt)) events.push({ status: 'menunggu_bayar', at: order.createdAt, note: 'Pesanan dibuat melalui storefront SOLEHOUSE.' })
  if (order.payment.paid && !events.some(event => event.status === 'dibayar') && validDate(order.payment.paidAt)) events.push({ status: 'dibayar', at: order.payment.paidAt!, note: 'Pembayaran demo berhasil disimulasikan.' })
  return events.sort((a, b) => Date.parse(a.at) - Date.parse(b.at))
}

const stages: { title: string; statuses: OrderStatus[]; description: string }[] = [
  { title: 'Pesanan Dibuat', statuses: ['menunggu_bayar'], description: 'Pilihan sepatu dan alamat penerima telah disimpan.' },
  { title: 'Dibayar', statuses: ['dibayar'], description: 'Pembayaran tercatat. Pesanan menunggu penyiapan oleh tim studio.' },
  { title: 'Dikemas (QC)', statuses: ['diproses', 'siap_kirim'], description: 'Pemeriksaan kualitas dan pengemasan sebelum diserahkan kepada kurir.' },
  { title: 'Dikirim', statuses: ['dikirim'], description: 'Pesanan telah diserahkan kepada kurir.' },
  { title: 'Diterima', statuses: ['selesai'], description: 'Pesanan tercatat telah diterima pelanggan.' },
]

export function trackingSteps(order: Order) {
  const events = getOrderEvents(order)
  const terminal = order.status === 'dibatalkan' || order.status === 'retur'
  const statusIndex = stages.findIndex(stage => stage.statuses.includes(order.status))
  const knownIndex = Math.max(0, order.payment.paid ? 1 : 0, ...events.map(event => stages.findIndex(stage => stage.statuses.includes(event.status))))
  const reached = terminal ? knownIndex : Math.max(statusIndex, knownIndex)
  return stages.map((stage, index) => {
    const event = events.filter(event => stage.statuses.includes(event.status)).at(-1)
    const reachedStage = index <= reached
    return { title: stage.title, reached: reachedStage, current: !terminal && index === reached,
      at: reachedStage ? event?.at : undefined,
      description: reachedStage ? event?.note || (index === 2 && order.status === 'diproses' ? 'Tim studio sedang memeriksa kualitas dan menyiapkan kemasan.' : stage.description) : terminal ? 'Tahap ini belum tercatat sebelum perubahan status pesanan.' : 'Menunggu tahap sebelumnya dan pembaruan status dari tim SOLEHOUSE.',
    }
  })
}
