import { Link, useSearchParams } from 'react-router-dom'
import { categories } from '../../data/products'
import { useProducts } from '../../hooks/useCart'
import { formatRupiah } from '../../lib/format'
import Icon from '../../components/ui/Icon'
import Badge from '../../components/ui/Badge'
import ProductCard from '../../components/store/ProductCard'
import CategoryTile from '../../components/store/CategoryTile'
import TrustStrip from '../../components/store/TrustStrip'
import Newsletter from '../../components/store/Newsletter'

export default function HomePage() {
  const products = useProducts()
  const [params, setParams] = useSearchParams()
  const selected = params.get('favorit') ?? 'semua'
  const favorites = products.filter(product => selected === 'semua' || product.category === selected).slice(0, 4)
  return <div className="space-y-12 md:space-y-16">
    <section className="grid items-center gap-9 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
      <div><Badge tone="neutral">Koleksi eksklusif SOLEHOUSE</Badge><h1 className="mt-5 font-serif text-display-mobile font-semibold tracking-tight md:text-display">Langkah Tepat<br />Setiap Hari.</h1><p className="mt-5 max-w-md text-body leading-relaxed text-ink-2">Kenyamanan tanpa kompromi, dirancang dengan presisi perajin artisan dan siluet modern untuk setiap ritme hidup Anda.</p>
        <div className="mt-7 flex flex-wrap gap-3"><Link to="/katalog" className="primary-link">Belanja Sekarang<Icon name="arrow_forward" size={18} /></Link><Link to="/katalog?baru=true" className="secondary-link">Koleksi Baru</Link></div>
        <p className="mt-7 flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-medium uppercase tracking-wider text-ink-2"><span className="inline-flex items-center gap-1"><Icon name="verified" size={16} />Kulit nabati pilihan</span><span className="inline-flex items-center gap-1"><Icon name="construction" size={16} />Dijahit dengan ketelitian</span></p>
      </div>
      <div className="relative overflow-hidden rounded-[2rem] bg-sand p-4 sm:p-6">
        <div className="absolute left-6 top-6 z-10 inline-flex items-center gap-2 rounded-xl bg-surface/95 px-3 py-2 text-label shadow-card"><Icon name="workspace_premium" className="text-accent-hover" size={22} /><span>Studio artisan<br /><strong>Dirancang untuk bertahan</strong></span></div>
        <Link to={`/produk/${products[0].slug}`} aria-label="Jelajahi Artisan Grand Sneaker V.1"><img src="/images/home-1.jpg" width={512} height={400} alt="Artisan Grand Sneaker dengan kulit ochre dan panel krem" fetchPriority="high" className="aspect-[5/4] w-full rounded-2xl object-cover" /></Link>
        <div className="relative mt-3 flex items-center justify-between gap-3 rounded-xl bg-surface/90 p-4"><div><p className="eyebrow">Model pilihan</p><h2 className="mt-1 font-serif text-lg">Artisan Grand Sneaker V.1</h2><p className="mt-1 text-caption text-ink-2">Ochre & Cream · {formatRupiah(products[0].price)}</p></div><Link to={`/produk/${products[0].slug}`} aria-label="Lihat detail model pilihan" className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-line"><Icon name="arrow_outward" /></Link></div>
      </div>
    </section>
    <TrustStrip />
    <section><div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">Jelajahi koleksi</p><h2 className="section-title mt-2">Pilih Karakter Langkah Anda</h2></div><p className="max-w-sm text-body-sm text-ink-2">Dari ruang rapat hingga akhir pekan, selalu ada pasangan untuk setiap perjalanan.</p></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{categories.slice(0, 5).map((category, index) => <CategoryTile key={category.value} category={category} large={index === 0} />)}</div></section>
    <section className="relative grid overflow-hidden rounded-card bg-ink text-base md:grid-cols-[1.2fr_1fr]"><div className="relative z-10 p-7 md:p-10"><p className="text-label uppercase tracking-widest text-sand">Koleksi musim ini</p><h2 className="mt-3 font-serif text-headline-md md:text-headline-lg">Hemat hingga 30%.</h2><p className="mt-3 max-w-sm text-body-sm text-sand">Pilihan istimewa untuk melengkapi langkah Anda. Temukan model favorit dengan harga lebih ringan.</p><Link to="/katalog?sale=true" className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-pill bg-base px-6 py-3 text-body-sm font-semibold text-ink">Jelajahi penawaran<Icon name="arrow_forward" size={18} /></Link></div><img src="/images/catalog-9.jpg" alt="Urban Runner Taupe & Gum dalam koleksi penawaran" width={512} height={320} loading="lazy" className="h-full max-h-80 w-full object-cover md:max-h-none" /></section>
    <section id="favorit"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">Dikurasi untuk Anda</p><h2 className="section-title mt-2">Favorit Koleksi Terkini</h2></div><Link to="/katalog" className="inline-flex min-h-11 items-center gap-2 text-caption font-semibold">Lihat semua<Icon name="arrow_forward" size={18} /></Link></div>
      <div aria-label="Filter koleksi favorit" className="my-6 flex flex-wrap gap-2">{[{ value: 'semua', label: 'Semua' }, ...categories.slice(0, 4)].map(category => <button key={category.value} type="button" aria-pressed={selected === category.value} onClick={() => setParams(category.value === 'semua' ? {} : { favorit: category.value }, { preventScrollReset: true })} className={`min-h-11 rounded-pill border px-4 text-caption ${selected === category.value ? 'border-ink bg-ink text-surface' : 'border-line bg-surface hover:border-taupe'}`}>{category.label}</button>)}</div>
      <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">{favorites.map(product => <ProductCard key={product.id} product={product} />)}</div>
    </section>
    <section className="rounded-card border border-line p-6 text-center md:p-10"><p className="eyebrow">Cerita pemakai · Contoh ulasan</p><div className="mt-4 flex justify-center gap-1 text-accent-hover" aria-label="5 dari 5 bintang">{[1, 2, 3, 4, 5].map(value => <Icon key={value} name="star" filled size={18} />)}</div><blockquote className="mx-auto mt-4 max-w-2xl font-serif text-headline-sm">“Jahitannya rapi, kulitnya terasa nyaman. Sepatu yang bisa menemani hari kerja sekaligus akhir pekan.”</blockquote><p className="mt-4 text-caption text-ink-2">Raka · Bandung</p></section>
    <Newsletter />
  </div>
}
