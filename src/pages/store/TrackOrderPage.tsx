import { Link, useParams } from 'react-router-dom'
import { useCommerce } from '../../hooks/useCart'
import { itemKey } from '../../lib/commerce'
import { formatRupiah, formatTanggal } from '../../lib/format'
import { normalizeOrderId, orderStatusLabels, orderStatusStyles } from '../../lib/tracking'
import TrackingSearch from '../../components/store/TrackingSearch'
import TrackingTimeline from '../../components/store/TrackingTimeline'
import WhatsAppCta from '../../components/store/WhatsAppCta'
import CopyButton from '../../components/ui/CopyButton'
import Button from '../../components/ui/Button'
import Icon from '../../components/ui/Icon'

export default function TrackOrderPage() {
  const { orderId = '' } = useParams()
  const { data } = useCommerce()
  const normalizedId = normalizeOrderId(orderId)
  const order = data.orders.find(item => item.id === normalizedId)
  const trackingNumber = order?.trackingNumber?.trim()
  return <div className="tracking-page mx-auto max-w-5xl space-y-8">
    <div className="no-print space-y-7">
      <nav aria-label="Jejak halaman" className="flex items-center gap-2 text-caption text-ink-2"><Link to="/">Beranda</Link><Icon name="chevron_right" size={16} /><span>Lacak Pesanan</span></nav>
      <header className="text-center"><p className="eyebrow">Transparansi kriya & pengiriman</p><h1 className="section-title mt-4">Lacak Status Pesanan Anda</h1><p className="mx-auto mt-4 max-w-xl text-body-sm leading-relaxed text-ink-2">Ikuti setiap langkah pesanan, dari pilihan pertama hingga tiba di rumah Anda.</p></header>
      <TrackingSearch key={orderId} initialValue={normalizedId} />
    </div>
    {!orderId && <section className="no-print rounded-card border border-line bg-surface p-6 text-center"><Icon name="receipt_long" size={32} /><h2 className="mt-3 font-serif text-headline-sm">Perjalanan sepatu Anda dimulai di sini.</h2>{data.orders.length ? <><p className="mt-3 text-body-sm text-ink-2">Atau buka pesanan terbaru dari browser ini:</p><ul className="mt-4 flex flex-wrap justify-center gap-2">{data.orders.slice(0, 3).map(item => <li key={item.id}><Link to={`/lacak/${item.id}`} className="secondary-link">{item.id}</Link></li>)}</ul></> : <><p className="mt-3 text-body-sm text-ink-2">Belum ada pesanan tersimpan. Buat pesanan melalui checkout untuk mencoba pelacakan.</p><Link to="/katalog" className="primary-link mt-5">Jelajahi katalog</Link></>}</section>}
    {orderId && !order && <section role="status" className="no-print rounded-card border border-line bg-surface p-7 text-center"><Icon name="search_off" size={36} /><h2 className="mt-4 font-serif text-headline-sm">Pesanan tidak ditemukan</h2><p className="mt-3 break-words text-body-sm text-ink-2">Nomor <strong className="text-ink">{normalizedId}</strong> tidak ditemukan di browser ini. Periksa kembali nomor, lalu gunakan browser dan alamat situs tempat pesanan dibuat.</p><Link to="/lacak" className="secondary-link mt-5">Kembali ke pencarian</Link></section>}
    {order && <article aria-label="Hasil pelacakan" className="tracking-result overflow-hidden rounded-card border border-line bg-surface shadow-card">
      <header className="border-b border-line bg-base p-5 sm:p-7"><p className="tracking-print-title hidden font-serif text-headline-sm">SOLEHOUSE · Ringkasan Pengiriman</p><div className="flex flex-wrap items-center justify-between gap-4"><div><span role="status" className={`inline-flex rounded-pill px-3 py-1.5 text-label font-semibold ${orderStatusStyles[order.status]}`}>{orderStatusLabels[order.status]}</span><h2 className="mt-3 break-words font-serif text-headline-sm">Pesanan {order.id}</h2><p className="mt-2 text-caption text-ink-2">Dibuat <time dateTime={order.createdAt}>{formatTanggal(order.createdAt, { hour: '2-digit', minute: '2-digit' })} WIB</time></p></div><p className="max-w-xs text-caption leading-relaxed text-ink-2">Pesanan demo · Status berasal dari data toko, bukan pelacakan langsung kurir.</p></div></header>
      <div className="tracking-columns grid items-start gap-7 p-5 sm:p-7 lg:grid-cols-[1.15fr_1fr]">
        <TrackingTimeline order={order} />
        <div className="min-w-0 space-y-6">
          <section className="tracking-block rounded-xl border border-line bg-base p-5"><h3 className="flex items-center gap-2 text-body-sm font-semibold"><Icon name="local_shipping" size={22} />Informasi Pengiriman</h3><p className="mt-3 text-body-sm">{order.courier}</p><p className="mt-4 text-label text-ink-2">Nomor resi</p>{trackingNumber ? <><p data-testid="tracking-number" className="mt-1 select-all break-all text-body font-semibold">{trackingNumber}</p><CopyButton key={`${order.id}:${trackingNumber}`} value={trackingNumber} label="Salin nomor resi" /></> : <p className="mt-2 text-body-sm text-ink-2">Belum tersedia. Nomor resi akan muncul setelah dicatat oleh tim pengiriman.</p>}</section>
          <section><h3 className="font-serif text-headline-sm">Sepatu dalam pesanan</h3><ul className="mt-4 space-y-3">{order.items.map(item => <li key={itemKey(item)} className="tracking-block flex gap-3 rounded-xl bg-base p-3"><img src={item.image} alt={item.name} width={64} height={80} className="h-20 w-16 shrink-0 rounded-lg object-cover" /><div className="min-w-0"><p className="text-body-sm font-semibold">{item.name}</p><p className="mt-1 text-label text-ink-2">EU {item.size} · {item.colorName} · {item.qty} pasang</p><p className="mt-1 break-all text-[10px] text-ink-2">{item.variantSku}</p><p className="mt-2 text-caption font-semibold">{formatRupiah(item.price * item.qty)}</p></div></li>)}</ul><p className="mt-4 flex flex-wrap justify-between gap-2 border-t border-line pt-4 text-body-sm"><span>Total pesanan</span><strong>{formatRupiah(order.total)}</strong></p>{order.gift && <p className="mt-2 text-caption text-ink-2">Termasuk kemasan kado premium.</p>}</section>
          <section className="tracking-block rounded-xl bg-base p-5"><h3 className="text-body-sm font-semibold">Alamat Pengantaran</h3><address className="mt-3 space-y-2 break-words text-body-sm not-italic"><p className="font-medium">{order.address.name}</p><p>{order.address.phone}</p><p className="text-ink-2">{order.address.street}, {order.address.district}, {order.address.city}, {order.address.province} {order.address.postalCode}</p>{order.address.note && <p className="text-caption text-ink-2">Catatan: {order.address.note}</p>}</address></section>
        </div>
      </div>
      <footer className="no-print flex flex-wrap items-center justify-between gap-4 border-t border-line p-5 sm:p-7"><div className="text-caption text-ink-2"><p>Simpan ringkasan melalui pilihan “Simpan sebagai PDF” di dialog cetak.</p><p className="mt-1">Dokumen demo, bukan label pengiriman resmi kurir.</p></div><Button variant="secondary" onClick={() => window.print()}><Icon name="print" size={19} />Cetak Resi PDF</Button><Link to={`/checkout/konfirmasi/${order.id}`} className="inline-flex min-h-11 items-center gap-2 text-caption underline">{order.status === 'menunggu_bayar' ? 'Buka pembayaran' : 'Lihat konfirmasi pesanan'}<Icon name="arrow_forward" size={16} /></Link></footer>
    </article>}
    <div className="no-print"><WhatsAppCta orderId={order?.id} /></div>
  </div>
}
