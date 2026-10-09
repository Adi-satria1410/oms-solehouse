import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import { calculateTotals, checkStock, FREE_SHIPPING_MIN, GIFT_PRICE, itemKey } from '../../lib/commerce'
import { formatRupiah } from '../../lib/format'
import CartItemRow from '../../components/store/CartItemRow'
import CartTimer from '../../components/store/CartTimer'
import OrderSummary from '../../components/store/OrderSummary'
import EmptyCart from '../../components/store/EmptyCart'
import Button from '../../components/ui/Button'
import Icon from '../../components/ui/Icon'

export default function CartPage() {
  const cart = useCart()
  const [message, setMessage] = useState('')
  const [voucherMessage, setVoucherMessage] = useState('')
  const totals = calculateTotals(cart.lines, cart.voucher, cart.gift)
  let stockError = ''
  try { checkStock(cart.items, cart.products) } catch (error) { stockError = (error as Error).message }
  return <>
    <Link to="/katalog" className="inline-flex min-h-11 items-center gap-2 text-caption text-ink-2"><Icon name="arrow_back" size={18} />Lanjutkan belanja</Link>
    <header className="mb-8 mt-4"><p className="eyebrow">Pilihan untuk langkah berikutnya</p><h1 className="section-title mt-3">Keranjang Belanja</h1><p className="mt-3 text-body-sm text-ink-2">{cart.count} pasang pilihan Anda · Ditinjau sebelum dikirim dari studio.</p></header>
    {message && <p role="status" className="mb-5 rounded-card border border-line bg-surface p-4 text-body-sm">{message}</p>}
    {!cart.items.length ? <EmptyCart /> : <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_370px]">
      <div className="min-w-0 space-y-5">
        <div className="rounded-card bg-sand p-5"><p className="flex items-center gap-2 font-medium"><Icon name="local_shipping" size={22} />{totals.shipping === 0 ? 'Pilihan Anda mendapat gratis ongkir.' : 'Sedikit lagi menuju gratis ongkir.'}</p><p className="mt-2 text-caption text-ink-2">{totals.shipping === 0 ? 'Berlaku untuk J&T Reguler.' : `Tambah ${formatRupiah(Math.max(0, FREE_SHIPPING_MIN - totals.subtotal + totals.discount))} lagi setelah diskon untuk gratis J&T Reguler.`}</p></div>
        <CartTimer startedAt={cart.startedAt} />
        <div className="flex items-center justify-between gap-3"><h2 className="font-semibold">Sepatu pilihan ({cart.items.length})</h2><button type="button" onClick={() => { cart.clearCart(); setMessage('Keranjang dikosongkan.') }} className="inline-flex min-h-11 items-center gap-1 text-caption text-ink-2"><Icon name="delete_sweep" size={20} />Kosongkan</button></div>
        {cart.lines.map(item => <CartItemRow key={itemKey(item)} item={item} onMessage={setMessage} />)}
        <label className="flex cursor-pointer items-start gap-3 rounded-card border border-line bg-surface p-5"><input name="gift" type="checkbox" checked={cart.gift} onChange={event => cart.setGift(event.target.checked)} className="mt-1 size-4 accent-ink" /><Icon name="redeem" size={24} className="shrink-0" /><span><strong className="text-body-sm">Tambahkan kemasan kado premium</strong><span className="mt-1 block text-caption text-ink-2">Kotak dan kartu ucapan · {formatRupiah(GIFT_PRICE)} per pesanan.</span></span></label>
        <div className="rounded-card border border-line bg-surface p-5"><h2 className="font-serif text-headline-sm">Rawat setiap langkah.</h2><p className="mt-3 text-body-sm text-ink-2">Bersihkan dengan sikat sesuai material, keringkan di tempat teduh, dan gunakan penyangga untuk menjaga bentuk sepatu.</p><Link to="/bantuan/perawatan" className="mt-3 inline-flex min-h-11 items-center gap-2 text-caption underline">Panduan perawatan<Icon name="arrow_forward" size={16} /></Link></div>
      </div>
      <aside className="space-y-5 lg:sticky lg:top-32">
        <form className="rounded-card border border-line bg-surface p-5" onSubmit={event => { event.preventDefault(); const code = String(new FormData(event.currentTarget).get('voucher') ?? ''); try { if (!code.trim()) throw new Error('Masukkan kode voucher.'); cart.applyVoucher(code); setVoucherMessage('Voucher SOLEWELCOME diterapkan: diskon 10% pada produk.') } catch (error) { setVoucherMessage((error as Error).message) } }}>
          <label htmlFor="voucher" className="text-body-sm font-semibold">Punya voucher?</label><div className="mt-3 flex gap-2"><input id="voucher" name="voucher" defaultValue={cart.voucher} placeholder="SOLEWELCOME" className="field min-w-0 flex-1 uppercase" maxLength={40} /><Button type="submit" size="sm">Pakai</Button></div>
          {voucherMessage && <p role="status" className="mt-3 text-caption text-ink-2">{voucherMessage}</p>}
          {cart.voucher && <button type="button" className="mt-2 min-h-11 text-caption underline" onClick={() => { cart.applyVoucher(''); setVoucherMessage('Voucher dihapus.') }}>Hapus voucher {cart.voucher}</button>}
        </form>
        <OrderSummary totals={totals} voucher={cart.voucher}>{stockError ? <p role="alert" className="mt-5 text-body-sm text-accent-hover">{stockError}</p> : <Link className="primary-link mt-6 w-full" to="/checkout">Lanjut ke Checkout<Icon name="arrow_forward" size={18} /></Link>}<p className="mt-3 text-label text-ink-2">Estimasi ongkir J&T Reguler. Pilihan ekspedisi tersedia saat checkout.</p></OrderSummary>
      </aside>
    </div>}
  </>
}
