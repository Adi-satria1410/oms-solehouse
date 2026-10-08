import Icon from '../ui/Icon'
import { formatRupiah } from '../../lib/format'

const items = [
  { icon: 'local_shipping', title: 'Gratis Ongkir Nusantara', text: `Untuk belanja di atas ${formatRupiah(750000)}` },
  { icon: 'published_with_changes', title: 'Retur & Tukar 14 Hari', text: 'Langkah nyaman, tanpa khawatir' },
  { icon: 'eco', title: '100% Kulit Nabati Asli', text: 'Material pilihan, karakter alami' },
  { icon: 'support_agent', title: 'Dukungan Ahli Sepatu', text: 'Temukan ukuran yang tepat' },
]
export default function TrustStrip() {
  return <section aria-label="Keunggulan SOLEHOUSE" className="grid gap-5 rounded-card border border-line bg-surface p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
    {items.map(item => <div key={item.icon} className="flex items-center gap-3"><span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-base"><Icon name={item.icon} size={23} /></span><div><h2 className="text-caption font-semibold">{item.title}</h2><p className="mt-1 text-[11px] text-ink-2">{item.text}</p></div></div>)}
  </section>
}
