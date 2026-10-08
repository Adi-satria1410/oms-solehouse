import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { Product } from '../../types'
import { categoryLabel, colors } from '../../data/products'
import { formatRupiah } from '../../lib/format'
import { useWishlist } from '../../hooks/useWishlist'
import Icon from '../ui/Icon'
import Button from '../ui/Button'
import SizeChips from './SizeChips'
import SizeGuideModal from './SizeGuideModal'

export default function ProductPurchase({ product }: { product: Product }) {
  const [params, setParams] = useSearchParams()
  const [quantity, setQuantity] = useState(1)
  const [guideOpen, setGuideOpen] = useState(false)
  const { ids, toggle } = useWishlist()
  const variant = product.variants.find(item => item.id === params.get('warna')) ?? product.variants[0]
  const candidateSize = Number(params.get('ukuran'))
  const size = (variant.stock[candidateSize] ?? 0) > 0 ? candidateSize : undefined
  const stock = size ? variant.stock[size] : 0
  const qty = Math.min(quantity, stock || 1)
  const totalStock = Object.values(variant.stock).reduce((sum, amount) => sum + amount, 0)
  const changeVariant = (id: string) => {
    const next = new URLSearchParams(params); next.set('warna', id); next.delete('ukuran'); setQuantity(1); setParams(next, { preventScrollReset: true })
  }
  const changeSize = (value: number) => {
    const next = new URLSearchParams(params); next.set('warna', variant.id); next.set('ukuran', String(value)); setQuantity(1); setParams(next, { preventScrollReset: true })
  }
  return <section aria-label="Pilihan produk">
    <p className="eyebrow">{categoryLabel(product.category)} · {product.sku}</p><h1 className="mt-3 font-serif text-headline-md leading-tight md:text-headline-lg">{product.name}</h1>
    <a href="#ulasan" className="mt-4 inline-flex min-h-11 items-center gap-2 text-caption"><Icon name="star" size={18} filled className="text-accent-hover" /><strong>{product.rating.toFixed(1)}</strong><span className="text-ink-2">{product.reviewCount} ulasan contoh</span></a>
    <div className="mt-3 flex flex-wrap items-baseline gap-3"><p className="font-serif text-headline-md">{formatRupiah(product.price)}</p>{product.comparePrice && <s className="text-body-sm text-ink-2">{formatRupiah(product.comparePrice)}</s>}{product.comparePrice && <span className="text-label font-semibold text-accent-hover">Hemat {Math.round((1 - product.price / product.comparePrice) * 100)}%</span>}</div>
    <p className="mt-4 text-body-sm leading-relaxed text-ink-2">{product.description}</p>
    <fieldset className="mt-7 border-t border-line pt-5"><legend className="text-caption font-semibold">Warna: {variant.colorName}</legend><div className="mt-3 flex flex-wrap gap-2">{product.variants.map(item => <button key={item.id} type="button" aria-pressed={variant.id === item.id} onClick={() => changeVariant(item.id)} className={`inline-flex min-h-11 items-center gap-2 rounded-pill border px-3 text-caption ${variant.id === item.id ? 'border-ink bg-surface font-semibold' : 'border-line'}`}><span className={`size-5 rounded-full border border-taupe ${colors.find(color => color.value === item.color)!.className}`} />{item.colorName}</button>)}</div></fieldset>
    <div className="my-4 flex flex-wrap items-center justify-between gap-2"><h2 className="text-caption font-semibold">Pilih ukuran EU {size ? `· ${size}` : ''}</h2><button type="button" className="inline-flex min-h-11 items-center gap-1 text-caption underline underline-offset-4" onClick={() => setGuideOpen(true)}><Icon name="straighten" size={18} />Panduan ukuran</button></div>
    <SizeChips stock={variant.stock} selected={size} onSelect={changeSize} />
    <p role="status" className="mt-4 text-caption text-ink-2">{size ? stock < 3 ? `Stok tipis: sisa ${stock} pasang untuk EU ${size}.` : `Tersedia ${stock} pasang untuk EU ${size}.` : totalStock ? 'Pilih ukuran untuk melihat stok yang tersedia.' : 'Semua ukuran pada warna ini sedang habis.'}</p>
    <div className="mt-5 flex flex-wrap items-center gap-3"><span className="text-caption font-medium">Jumlah</span><div className="inline-flex items-center rounded-pill border border-line bg-surface"><button type="button" aria-label="Kurangi jumlah" disabled={!size || qty <= 1} onClick={() => setQuantity(qty - 1)} className="inline-flex size-11 items-center justify-center disabled:opacity-30"><Icon name="remove" size={18} /></button><output aria-label="Jumlah dipilih" className="min-w-8 text-center text-body-sm">{qty}</output><button type="button" aria-label="Tambah jumlah" disabled={!size || qty >= stock} onClick={() => setQuantity(qty + 1)} className="inline-flex size-11 items-center justify-center disabled:opacity-30"><Icon name="add" size={18} /></button></div><button type="button" aria-label={`Favorit ${product.name}`} aria-pressed={ids.includes(product.id)} onClick={() => toggle(product.id)} className="ml-auto inline-flex size-11 items-center justify-center rounded-full border border-line bg-surface"><Icon name="favorite" filled={ids.includes(product.id)} size={21} /></button></div>
    <Button className="mt-5 w-full" disabled><Icon name="shopping_bag" size={20} />Tambah ke Keranjang</Button><p className="mt-3 text-center text-label text-ink-2">Pembelian segera tersedia.</p>
    <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-3 border-t border-line bg-surface/95 px-5 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-md lg:hidden">
      <div className="min-w-0"><p className="text-label text-ink-2">Total pilihan</p><p className="mt-1 text-body-sm font-semibold">{formatRupiah(product.price * qty)}</p><p className="mt-1 truncate text-[10px] text-ink-2">{size ? `EU ${size} · ${qty} pasang` : 'Pilih ukuran'} · {variant.colorName}</p></div><Button disabled size="sm">Segera tersedia</Button>
    </div>
    <SizeGuideModal open={guideOpen} onClose={() => setGuideOpen(false)} />
  </section>
}
