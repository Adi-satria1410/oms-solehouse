import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { ShippingAddress } from '../../types'
import { useCart } from '../../hooks/useCart'
import { calculateTotals, couriers, itemKey, paymentMethods, validateAddress } from '../../lib/commerce'
import { formatRupiah } from '../../lib/format'
import OrderSummary from '../../components/store/OrderSummary'
import AddressFields from '../../components/store/AddressFields'
import { addressFields } from '../../data/addressFields'
import EmptyCart from '../../components/store/EmptyCart'
import Icon from '../../components/ui/Icon'
import Button from '../../components/ui/Button'

export default function CheckoutPage() {
  const cart = useCart()
  const navigate = useNavigate()
  const submitting = useRef(false)
  const [courier, setCourier] = useState('jnt')
  const [payment, setPayment] = useState(paymentMethods[0])
  const [errors, setErrors] = useState<Partial<Record<keyof ShippingAddress, string>>>({})
  const [message, setMessage] = useState('')
  const totals = calculateTotals(cart.lines, cart.voucher, cart.gift, courier)
  return <>
    <Link to="/keranjang" className="inline-flex min-h-11 items-center gap-2 text-caption text-ink-2"><Icon name="arrow_back" size={18} />Kembali ke keranjang</Link>
    <header className="mb-8 mt-4"><p className="eyebrow">Satu langkah lebih dekat</p><h1 className="section-title mt-3">Checkout</h1><p className="mt-3 text-body-sm text-ink-2">Lengkapi penerima dan pilihan pengiriman. Ini adalah checkout demo tanpa transaksi uang.</p></header>
    {!cart.items.length ? <EmptyCart /> : <form noValidate onSubmit={event => {
      event.preventDefault()
      if (submitting.current) return
      const form = event.currentTarget
      const data = new FormData(form)
      const address = Object.fromEntries(addressFields.map(field => [field.name, String(data.get(field.name) ?? '').trim()])) as ShippingAddress
      const validation = validateAddress(address)
      setErrors(validation)
      if (Object.keys(validation).length) { setMessage('Periksa kembali kolom alamat yang ditandai.'); form.querySelector<HTMLInputElement>(`[name="${Object.keys(validation)[0]}"]`)?.focus(); return }
      submitting.current = true
      try { const id = cart.checkout(address, courier, payment); navigate(`/checkout/konfirmasi/${id}`) } catch (error) { setMessage((error as Error).message); submitting.current = false }
    }} className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_370px]">
      <div className="min-w-0 space-y-6">
        <section className="rounded-card border border-line bg-surface p-5 sm:p-7"><h2 className="mb-6 flex items-center gap-3 font-serif text-headline-sm"><span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-ink font-sans text-caption text-surface">1</span>Alamat Pengiriman</h2><AddressFields errors={errors} onEdit={field => { setErrors(previous => ({ ...previous, [field]: undefined })); setMessage('' ) }} /><p className="mt-4 text-label text-ink-2">Gunakan data contoh untuk mencoba alur demo. Kolom bertanda * wajib diisi.</p></section>
        <fieldset className="rounded-card border border-line bg-surface p-5 sm:p-7"><legend className="px-2 font-serif text-headline-sm">2. Layanan Ekspedisi</legend><p className="mb-4 text-caption text-ink-2">Tarif simulasi tetap. Gratis J&T Reguler untuk subtotal setelah diskon minimal {formatRupiah(750000)}.</p><div className="space-y-3">{couriers.map(option => {
          const fee = calculateTotals(cart.lines, cart.voucher, cart.gift, option.id).shipping
          return <label key={option.id} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 ${courier === option.id ? 'border-ink bg-base' : 'border-line'}`}><input type="radio" name="courier" value={option.id} checked={courier === option.id} onChange={() => setCourier(option.id)} className="mt-1 size-4 shrink-0 accent-ink" /><span className="min-w-0 flex-1"><strong className="text-body-sm">{option.name}</strong><span className="mt-1 block text-caption text-ink-2">Estimasi {option.estimate}</span><span className="mt-2 block text-body-sm font-semibold">{fee ? formatRupiah(fee) : 'Gratis'}</span></span></label>
        })}</div></fieldset>
        <fieldset className="rounded-card border border-line bg-surface p-5 sm:p-7"><legend className="px-2 font-serif text-headline-sm">3. Metode Pembayaran</legend><p className="mb-5 text-body-sm text-ink-2">Virtual Account simulasi. Setelah pesanan dibuat, gunakan tombol simulasi untuk menandainya dibayar.</p><div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{paymentMethods.map(method => <label key={method} className={`flex min-h-20 cursor-pointer items-center gap-2 rounded-xl border p-3 text-caption font-semibold ${payment === method ? 'border-ink bg-base' : 'border-line'}`}><input type="radio" name="payment" checked={payment === method} value={method} onChange={() => setPayment(method)} className="size-4 shrink-0 accent-ink" />{method}</label>)}</div></fieldset>
      </div>
      <aside className="min-w-0 space-y-5 lg:sticky lg:top-32"><section className="rounded-card border border-line bg-surface p-5"><div className="mb-4 flex items-center justify-between"><h2 className="font-semibold">Pilihan Anda</h2><Link to="/keranjang" className="text-caption underline">Ubah</Link></div><ul className="space-y-4">{cart.lines.map(item => <li key={itemKey(item)} className="flex gap-3"><img src={item.image} alt={item.name} width={60} height={75} className="h-[75px] w-[60px] shrink-0 rounded-lg object-cover" /><div className="min-w-0"><p className="text-body-sm font-medium">{item.name}</p><p className="mt-1 text-label text-ink-2">EU {item.size} · {item.colorName} · {item.qty} pasang</p><p className="mt-1 text-caption font-semibold">{formatRupiah(item.price * item.qty)}</p></div></li>)}</ul></section>
        <OrderSummary totals={totals} voucher={cart.voucher}>{message && <p role="alert" className="mt-5 text-body-sm text-accent-hover">{message}</p>}<Button type="submit" className="mt-6 w-full"><Icon name="lock" size={18} />Bayar Sekarang</Button><p className="mt-3 text-label leading-relaxed text-ink-2">Pesanan dibuat dengan status Menunggu Bayar. Tidak ada uang yang ditagihkan.</p></OrderSummary>
      </aside>
    </form>}
  </>
}
