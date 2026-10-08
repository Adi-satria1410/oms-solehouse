import { Link, useNavigate } from 'react-router-dom'
import type { Product } from '../../types'
import { categoryLabel, productImage } from '../../data/products'
import { formatRupiah } from '../../lib/format'
import { useWishlist } from '../../hooks/useWishlist'
import Badge from '../ui/Badge'
import Icon from '../ui/Icon'
import SizeChips from './SizeChips'

const badges = { sale: 'Sale', new: 'Baru', terlaris: 'Terlaris', limited: 'Terbatas' }
export default function ProductCard({ product, list = false }: { product: Product; list?: boolean }) {
  const navigate = useNavigate()
  const { ids, toggle } = useWishlist()
  const favorite = ids.includes(product.id)
  return <article data-product-id={product.id} className={`group min-w-0 overflow-hidden rounded-card border border-line bg-surface transition-shadow hover:shadow-lift ${list ? 'grid grid-cols-[110px_1fr] sm:grid-cols-[190px_1fr]' : ''}`}>
    <div className="relative aspect-[4/5] overflow-hidden bg-sand">
      <Link to={`/produk/${product.slug}`} aria-label={`Lihat ${product.name}`} className="block h-full"><img src={productImage(product)} alt={product.name} width={512} height={640} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /></Link>
      {product.badge && <div className="pointer-events-none absolute left-2 top-3 sm:left-3"><Badge tone={product.badge === 'sale' ? 'accent' : product.badge === 'new' ? 'olive' : 'ink'}>{badges[product.badge]}</Badge></div>}
      <button type="button" aria-label={`Favorit ${product.name}`} aria-pressed={favorite} onClick={() => toggle(product.id)} className="absolute right-2 top-10 z-10 inline-flex size-11 items-center justify-center rounded-full bg-surface/95 text-ink shadow-card sm:right-3 sm:top-3"><Icon name="favorite" size={20} filled={favorite} /></button>
      {!list && <div className="absolute inset-x-0 bottom-0 hidden translate-y-full bg-surface/95 p-3 transition-transform group-focus-within:translate-y-0 group-hover:translate-y-0 lg:block">
        <p className="mb-2 text-[10px] font-medium">Pilih ukuran · {product.variants[0].colorName}</p>
        <SizeChips stock={product.variants[0].stock} compact onSelect={size => navigate(`/produk/${product.slug}?warna=${product.variants[0].id}&ukuran=${size}`)} />
      </div>}
    </div>
    <div className={`min-w-0 p-3 sm:p-4 ${list ? 'flex flex-col justify-center' : ''}`}>
      <p className="text-[10px] uppercase tracking-wider text-ink-2">{categoryLabel(product.category)}</p>
      <Link to={`/produk/${product.slug}`} className="mt-2 block font-serif text-body leading-snug text-ink hover:text-accent-hover sm:text-lg">{product.name}</Link>
      <p className="mt-2 flex items-center gap-1 text-[11px] text-ink-2"><Icon name="star" filled size={14} className="text-accent-hover" />{product.rating.toFixed(1)} <span>({product.reviewCount})</span></p>
      <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1"><p className="text-caption font-semibold sm:text-body-sm">{formatRupiah(product.price)}</p>{product.comparePrice && <s className="text-[10px] text-ink-2 sm:text-label">{formatRupiah(product.comparePrice)}</s>}</div>
      {list && <p className="mt-3 hidden text-body-sm text-ink-2 sm:block">{product.material} · {product.construction}</p>}
    </div>
  </article>
}
