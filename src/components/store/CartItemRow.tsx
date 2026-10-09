import { Link } from 'react-router-dom'
import type { OrderItem } from '../../types'
import { formatRupiah } from '../../lib/format'
import { itemKey } from '../../lib/commerce'
import { useCart } from '../../hooks/useCart'
import { useWishlist } from '../../hooks/useWishlist'
import Icon from '../ui/Icon'

export default function CartItemRow({ item, onMessage }: { item: OrderItem; onMessage: (message: string) => void }) {
  const cart = useCart()
  const { ids, toggle } = useWishlist()
  const key = itemKey(item)
  const stock = cart.products.find(product => product.id === item.productId)?.variants.find(variant => variant.id === item.variantId)?.stock[item.size] ?? 0
  const update = (qty: number) => { try { cart.updateQuantity(key, qty); onMessage('Jumlah diperbarui.') } catch (error) { onMessage((error as Error).message) } }
  const save = () => { if (!ids.includes(item.productId)) toggle(item.productId); cart.removeItem(key); onMessage(`${item.name} dipindahkan ke favorit.`) }
  return <article data-cart-key={key} className="rounded-card border border-line bg-surface p-4 sm:p-6">
    <div className="flex items-start gap-4 sm:gap-5">
      <Link to={`/produk/${item.slug}?warna=${item.variantId}&ukuran=${item.size}`} className="shrink-0"><img src={item.image} alt={item.name} width={110} height={138} className="aspect-[4/5] w-20 rounded-xl object-cover sm:w-28" /></Link>
      <div className="min-w-0 flex-1"><p className="break-all text-[10px] uppercase tracking-wider text-ink-2">SKU: {item.variantSku}</p><Link to={`/produk/${item.slug}`} className="mt-2 block font-serif text-lg leading-snug sm:text-headline-sm">{item.name}</Link><p className="mt-2 text-caption text-ink-2">EU {item.size} · {item.colorName}</p><p className="mt-2 text-body-sm font-semibold">{formatRupiah(item.price)}</p></div>
      <button type="button" aria-label={`Hapus ${item.name} EU ${item.size} ${item.colorName}`} onClick={() => { cart.removeItem(key); onMessage(`${item.name} dihapus dari keranjang.`) }} className="inline-flex size-11 shrink-0 items-center justify-center rounded-full hover:bg-base"><Icon name="close" size={20} /></button>
    </div>
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
      <div className="inline-flex items-center rounded-pill border border-line"><button aria-label="Kurangi jumlah" type="button" disabled={item.qty <= 1} onClick={() => update(item.qty - 1)} className="inline-flex size-11 items-center justify-center disabled:opacity-30"><Icon name="remove" size={18} /></button><output aria-label="Jumlah item" className="min-w-8 text-center text-body-sm">{item.qty}</output><button aria-label="Tambah jumlah" type="button" disabled={item.qty >= stock} onClick={() => update(item.qty + 1)} className="inline-flex size-11 items-center justify-center disabled:opacity-30"><Icon name="add" size={18} /></button></div>
      <button type="button" onClick={save} className="inline-flex min-h-11 items-center gap-1 text-caption text-ink-2"><Icon name="favorite" size={18} />Simpan ke favorit</button>
      <p className="text-body-sm font-semibold tabular-nums">{formatRupiah(item.price * item.qty)}</p>
    </div>
    {(stock < 3 || item.qty > stock) && <p className="mt-3 text-caption text-accent-hover">{stock ? `Tersisa ${stock} pasang pada ukuran dan warna ini.` : 'Ukuran ini sudah habis.'} {item.qty > stock && 'Kurangi jumlah atau hapus item untuk melanjutkan.'}</p>}
    {item.qty > stock && stock > 0 && <button type="button" onClick={() => update(stock)} className="mt-2 min-h-11 text-caption underline">Sesuaikan ke {stock} pasang</button>}
  </article>
}
