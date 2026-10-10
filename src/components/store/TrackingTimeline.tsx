import type { Order } from '../../types'
import { formatTanggal } from '../../lib/format'
import { getOrderEvents, orderStatusLabels, orderStatusStyles, trackingSteps } from '../../lib/tracking'
import Icon from '../ui/Icon'

export default function TrackingTimeline({ order }: { order: Order }) {
  const terminal = order.status === 'dibatalkan' || order.status === 'retur'
  const terminalEvent = getOrderEvents(order).filter(event => event.status === order.status).at(-1)
  return <section aria-label="Timeline pesanan">
    <h3 className="font-serif text-headline-sm">Riwayat Perjalanan & Tahapan Kriya</h3>
    <ol className="mt-7 space-y-6">{trackingSteps(order).map((step, index) => <li key={step.title} aria-current={step.current ? 'step' : undefined} className="tracking-step relative flex gap-4">
      {index < 4 && <span aria-hidden="true" className="absolute bottom-[-1.5rem] left-4 top-9 w-px bg-line" />}
      <span aria-hidden="true" className={`relative z-10 inline-flex size-8 shrink-0 items-center justify-center rounded-full ${step.current ? 'bg-accent text-surface' : step.reached ? 'bg-ink text-surface' : 'border border-line bg-base text-ink-2'}`}><Icon name={step.reached ? step.current ? 'radio_button_checked' : 'check' : 'schedule'} size={18} /></span>
      <div className={`min-w-0 flex-1 rounded-xl px-4 py-3 ${step.current ? 'bg-base' : ''}`}><div className="flex flex-wrap items-center justify-between gap-2"><h4 className="text-body-sm font-semibold">{step.title}</h4><span className={`text-[10px] font-semibold uppercase tracking-wider ${step.current ? 'text-accent-hover' : 'text-ink-2'}`}>{step.current ? 'Terkini' : step.reached ? 'Tercatat' : terminal ? 'Belum tercatat' : 'Menunggu'}</span></div>
        {step.at ? <time dateTime={step.at} className="mt-2 block text-label text-ink-2">{formatTanggal(step.at, { hour: '2-digit', minute: '2-digit' })} WIB</time> : step.reached && <p className="mt-2 text-label text-ink-2">Waktu belum tercatat.</p>}
        <p className="mt-2 break-words text-caption leading-relaxed text-ink-2">{step.description}</p>
      </div>
    </li>)}</ol>
    {terminal && <div role="status" className={`mt-6 rounded-xl p-4 ${orderStatusStyles[order.status]}`}><p className="font-semibold">{orderStatusLabels[order.status]}</p><p className="mt-2 text-body-sm">{terminalEvent?.note || (order.status === 'dibatalkan' ? 'Pesanan dibatalkan. Tahapan pengiriman tidak dilanjutkan.' : 'Pesanan sedang dalam penanganan retur atau klaim. Hubungi layanan pelanggan untuk informasi lebih lanjut.')}</p>{terminalEvent ? <time dateTime={terminalEvent.at} className="mt-2 block text-label">{formatTanggal(terminalEvent.at, { hour: '2-digit', minute: '2-digit' })} WIB</time> : <p className="mt-2 text-label">Waktu perubahan status belum tercatat.</p>}</div>}
  </section>
}
