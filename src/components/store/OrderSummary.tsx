import type { ReactNode } from 'react'
import type { OrderTotals } from '../../types'
import { formatRupiah } from '../../lib/format'
import Icon from '../ui/Icon'

export default function OrderSummary({ totals, voucher, children }: { totals: OrderTotals; voucher?: string; children?: ReactNode }) {
  const rows = [
    [`Subtotal (${totals.count} pasang)`, formatRupiah(totals.subtotal)],
    [`Diskon${voucher ? ` · ${voucher}` : ''}`, totals.discount ? `−${formatRupiah(totals.discount)}` : formatRupiah(0)],
    ...(totals.gift ? [['Kemasan kado premium', formatRupiah(totals.gift)]] : []),
    ['Ongkir', totals.shipping ? formatRupiah(totals.shipping) : 'Gratis'],
    ['Biaya layanan', formatRupiah(totals.service)],
  ]
  return <section aria-label="Ringkasan pesanan" className="rounded-card border border-line bg-surface p-5 shadow-card sm:p-7">
    <h2 className="font-serif text-headline-sm">Ringkasan Pesanan</h2>
    <dl className="mt-6 space-y-4 text-body-sm">{rows.map(([label, value]) => <div key={label} className="flex items-start justify-between gap-4"><dt className="text-ink-2">{label}</dt><dd className="shrink-0 font-medium tabular-nums">{value}</dd></div>)}
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-t border-line pt-5"><dt className="font-semibold">Total pembayaran</dt><dd data-testid="order-total" className="font-serif text-headline-sm tabular-nums">{formatRupiah(totals.total)}</dd></div>
    </dl>
    {children}
    <p className="mt-5 flex items-start gap-2 text-label leading-relaxed text-ink-2"><Icon name="science" size={18} className="shrink-0" />Mode demo · Tidak ada pembayaran atau pengiriman sungguhan.</p>
  </section>
}
