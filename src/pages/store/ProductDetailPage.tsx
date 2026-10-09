import { Link, useParams } from 'react-router-dom'
import { categoryLabel } from '../../data/products'
import { useProducts } from '../../hooks/useCart'
import ProductGallery from '../../components/store/ProductGallery'
import ProductPurchase from '../../components/store/ProductPurchase'
import ProductCard from '../../components/store/ProductCard'
import TrustStrip from '../../components/store/TrustStrip'
import WhatsAppCta from '../../components/store/WhatsAppCta'
import Icon from '../../components/ui/Icon'
import NotFoundPage from '../NotFoundPage'

export default function ProductDetailPage() {
  const products = useProducts()
  const { slug } = useParams()
  const product = products.find(item => item.slug === slug)
  if (!product) return <NotFoundPage />
  const related = [...products.filter(item => item.category === product.category && item.id !== product.id), ...products.filter(item => item.category !== product.category)].slice(0, 4)
  return <div className="space-y-10">
    <nav aria-label="Jejak halaman" className="flex flex-wrap items-center gap-2 text-caption text-ink-2"><Link to="/">Beranda</Link><Icon name="chevron_right" size={16} /><Link to="/katalog">Katalog</Link><Icon name="chevron_right" size={16} /><Link to={`/katalog?kategori=${product.category}`}>{categoryLabel(product.category)}</Link></nav>
    <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12"><ProductGallery key={`gallery-${product.id}`} product={product} /><ProductPurchase key={product.id} product={product} /></div>
    <TrustStrip />
    <section className="grid gap-8 lg:grid-cols-[1.5fr_1fr]"><div><h2 className="section-title">Dibuat dengan ketelitian.</h2><p className="mt-4 text-body-sm leading-relaxed text-ink-2">Tekstur yang alami dan detail yang terjaga. Setiap model dirancang untuk menjadi bagian dari keseharian Anda.</p><dl className="mt-6 divide-y divide-line rounded-card border border-line bg-surface px-5">{[['Material', product.material], ['Konstruksi', product.construction], ['Sol', 'Karet dengan tapak bertekstur'], ['Lapisan dalam', 'Lapisan lembut dengan insole ergonomis'], ['Kode produk', product.sku]].map(([label, value]) => <div key={label} className="grid grid-cols-[100px_1fr] gap-4 py-4 text-body-sm"><dt className="text-ink-2">{label}</dt><dd>{value}</dd></div>)}</dl><details className="mt-5 rounded-card border border-line bg-surface p-5"><summary className="cursor-pointer text-body-sm font-semibold">Perawatan & perjalanan patina</summary><p className="mt-4 text-body-sm leading-relaxed text-ink-2">Bersihkan dengan sikat lembut sesuai jenis material. Keringkan secara alami di tempat teduh. Untuk kulit halus, gunakan kondisioner secukupnya; untuk suede dan nubuck, gunakan sikat khusus. Simpan dengan penyangga sepatu agar bentuknya terjaga.</p></details></div><WhatsAppCta /></section>
    <section id="ulasan" className="rounded-card border border-line bg-surface p-6 md:p-8"><div className="flex flex-wrap items-center justify-between gap-3"><h2 className="section-title">Cerita dari setiap langkah</h2><p className="flex items-center gap-2"><Icon name="star" filled className="text-accent-hover" /><strong>{product.rating.toFixed(1)} / 5</strong></p></div><p className="mt-3 text-caption text-ink-2">Pratinjau {product.reviewCount} ulasan · Berikut adalah contoh ulasan, bukan transaksi terverifikasi.</p><div className="mt-6 grid gap-6 sm:grid-cols-2">{[{ name: 'Raka', city: 'Bandung', text: 'Finishing rapi dan nyaman untuk aktivitas harian. Warna kulitnya mudah dipadukan.' }, { name: 'Nadia', city: 'Jakarta', text: 'Panduan ukuran membantu memilih pasangan yang pas. Detail jahitannya terlihat bagus.' }].map(review => <blockquote key={review.name} className="border-t border-line pt-5"><p className="text-body-sm leading-relaxed">“{review.text}”</p><footer className="mt-3 text-caption text-ink-2">{review.name} · {review.city} · Ulasan contoh</footer></blockquote>)}</div></section>
    <section><div className="mb-6 flex items-center justify-between gap-3"><h2 className="section-title">Mungkin Kamu Suka</h2><Link to="/katalog" className="inline-flex min-h-11 items-center gap-1 text-caption">Lihat semua<Icon name="arrow_forward" size={18} /></Link></div><div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">{related.map(item => <ProductCard key={item.id} product={item} />)}</div></section>
  </div>
}
