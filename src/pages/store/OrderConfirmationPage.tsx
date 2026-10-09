import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCommerce } from '../../hooks/useCart'
import { itemKey } from '../../lib/commerce'
import { formatRupiah, formatTanggal } from '../../lib/format'
import OrderSummary from '../../components/store/OrderSummary'
import Button from '../../components/ui/Button'
import Icon from '../../components/ui/Icon'

export default function OrderConfirmationPage() {
  const { orderId } = useParams()
  const { data, store } = useCommerce()
  const [error, setError] = useState('')
  const order = data.orders.find(item => item.id === orderId)
  if (!order) return <section className="rounded-card border border-line bg-surface p-8 text-center"><h1 className="section-title">Pesanan tidak ditemukan</h1><p className="mt-4 text-body-sm text-ink-2">Pesanan demo hanya tersedia di browser tempat pesanan dibuat.</p><Link className="primary-link mt-6" to="/keranjang">Kembali ke keranjang</Link></section>
  return <>
    <header className="mb-8"><p className="eyebrow">Terima kasih telah memilih SOLEHOUSE</p><h1 className="section-title mt-3">Konfirmasi Pesanan</h1><p className="mt-4 break-words font-semibold">{order.id}</p><p className="mt-2 text-caption text-ink-2">Dibuat {formatTanggal(order.createdAt)} · Pesanan simulasi</p></header>
    <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_370px]"><div className="min-w-0 space-y-6">
      <section aria-label="Status pembayaran" className={`rounded-card border border-line p-6 ${order.payment.paid ? 'bg-paid-bg text-paid' : 'bg-waiting-bg text-waiting'}`}><div className="flex items-center gap-3"><Icon name={order.payment.paid ? 'check_circle' : 'schedule'} size={28} /><h2 className="font-serif text-headline-sm">{order.payment.paid ? 'Pembayaran berhasil disimulasikan' : 'Menunggu Bayar'}</h2></div><p role="status" className="mt-3 text-body-sm">{order.payment.paid ? 'Status pesanan: Dibayar. Stok contoh sudah diperbarui. Tidak ada uang yang ditransfer.' : 'Pesanan sudah tersimpan. Klik tombol simulasi untuk menyelesaikan pembayaran demo.'}</p><p className="mt-3 text-caption">Metode: {order.payment.method}</p>{order.payment.paidAt && <p className="mt-1 text-caption">Dibayar {formatTanggal(order.payment.paidAt)}</p>}</section>
      <section className="rounded-card border border-line bg-surface p-5 sm:p-7"><h2 className="font-serif text-headline-sm">Detail pilihan Anda</h2><ul className="mt-5 divide-y divide-line">{order.items.map(item => <li key={itemKey(item)} className="flex gap-4 py-4"><img src={item.image} alt={item.name} width={72} height={90} className="h-[90px] w-[72px] shrink-0 rounded-xl object-cover" /><div className="min-w-0"><p className="text-body-sm font-semibold">{item.name}</p><p className="mt-1 text-caption text-ink-2">EU {item.size} · {item.colorName} · {item.qty} pasang</p><p className="mt-1 break-all text-label text-ink-2">{item.variantSku}</p><p className="mt-2 text-body-sm">{formatRupiah(item.price * item.qty)}</p></div></li>)}</ul></section>
      <section className="rounded-card border border-line bg-surface p-5 sm:p-7"><h2 className="font-serif text-headline-sm">Penerima & pengiriman</h2><address className="mt-4 space-y-2 break-words text-body-sm not-italic"><p className="font-semibold">{order.address.name}</p><p>{order.address.phone} · {order.address.email}</p><p>{order.address.street}, {order.address.district}, {order.address.city}, {order.address.province} {order.address.postalCode}</p>{order.address.note && <p className="text-ink-2">Catatan: {order.address.note}</p>}</address><p className="mt-4 border-t border-line pt-4 text-body-sm">{order.courier}</p></section>
    </div><aside className="lg:sticky lg:top-32"><OrderSummary totals={order.summary} voucher={order.voucher}>{error && <p role="alert" className="mt-5 text-body-sm text-accent-hover">{error}</p>}{!order.payment.paid && <Button className="mt-6 w-full" onClick={() => { try { store.simulatePayment(order.id); setError('') } catch (error) { setError((error as Error).message) } }}>Simulasikan Pembayaran</Button>}<Link to="/katalog" className="secondary-link mt-4 w-full">Kembali ke katalog</Link></OrderSummary></aside></div>
  </>
}
