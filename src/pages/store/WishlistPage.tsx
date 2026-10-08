import { Link } from 'react-router-dom'
import { useWishlist } from '../../hooks/useWishlist'
import { products } from '../../data/products'
import ProductCard from '../../components/store/ProductCard'
import Icon from '../../components/ui/Icon'

export default function WishlistPage() {
  const { ids } = useWishlist()
  const items = products.filter(product => ids.includes(product.id))
  return <section><p className="eyebrow">Pilihan pribadi Anda</p><h1 className="section-title mt-3">Favorit Saya</h1><p className="mb-8 mt-3 text-body-sm text-ink-2">{items.length} produk tersimpan di perangkat ini.</p>{items.length ? <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">{items.map(product => <ProductCard key={product.id} product={product} />)}</div> : <div className="rounded-card border border-line bg-surface p-12 text-center"><Icon name="favorite" size={40} /><h2 className="mt-4 font-serif text-headline-sm">Temukan favorit pertama Anda.</h2><p className="mt-3 text-body-sm text-ink-2">Tekan ikon hati pada produk untuk menyimpannya di sini.</p><Link className="primary-link mt-6" to="/katalog">Jelajahi katalog</Link></div>}</section>
}
