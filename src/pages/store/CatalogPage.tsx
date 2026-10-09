import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { categories, colors } from '../../data/products'
import { useProducts } from '../../hooks/useCart'
import { filterKeys, filterProducts, paginateProducts } from '../../lib/catalog'
import ProductCard from '../../components/store/ProductCard'
import FilterSidebar from '../../components/store/FilterSidebar'
import Pagination from '../../components/ui/Pagination'
import Icon from '../../components/ui/Icon'
import Modal from '../../components/ui/Modal'
import Button from '../../components/ui/Button'

const labels: Record<string, string> = { kategori: 'Kategori', koleksi: 'Koleksi', ukuran: 'EU', warna: 'Warna', min: 'Harga min.', max: 'Harga maks.', material: 'Material', stok: 'Stok', sale: 'Promo', cari: 'Pencarian', baru: 'Koleksi baru' }
const collectionTitles: Record<string, string> = { pria: 'Koleksi Pria', wanita: 'Koleksi Wanita', anak: 'Koleksi Anak' }

export default function CatalogPage() {
  const products = useProducts()
  const [params, setParams] = useSearchParams()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const filtered = filterProducts(products, params)
  const { page, perPage, totalPages, items } = paginateProducts(filtered, params)
  const list = params.get('tampilan') === 'daftar'
  const title = params.get('sale') === 'true' ? 'Penawaran Spesial' : params.get('baru') === 'true' ? 'Koleksi Baru' : collectionTitles[params.get('koleksi') ?? ''] ?? 'Katalog Koleksi Sepatu'
  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value); else next.delete(key)
    if (key !== 'halaman') next.delete('halaman')
    setParams(next, { preventScrollReset: true })
  }
  const reset = () => {
    const next = new URLSearchParams(params)
    filterKeys.forEach(key => next.delete(key))
    next.delete('halaman')
    setParams(next, { preventScrollReset: true })
  }
  const updatePrice = (min: string, max: string) => {
    const next = new URLSearchParams(params)
    for (const [key, value] of [['min', min], ['max', max]]) { if (value) next.set(key, value); else next.delete(key) }
    next.delete('halaman')
    setParams(next, { preventScrollReset: true })
  }
  const filterProps = { params, update, reset, updatePrice }
  const active = filterKeys.filter(key => params.get(key))
  const valueLabel = (key: string) => (params.get(key) ?? '').split(',').map(value => key === 'kategori' ? categories.find(item => item.value === value)?.label ?? value : key === 'warna' ? colors.find(item => item.value === value)?.label ?? value : value === 'true' ? 'Aktif' : value).join(', ')
  return <>
    <nav aria-label="Jejak halaman" className="mb-6 flex items-center gap-2 text-caption text-ink-2"><Link to="/">Beranda</Link><Icon name="chevron_right" size={16} /><span>Katalog</span></nav>
    <header className="mb-8"><p className="eyebrow">Kurasi kriya alas kaki Nusantara</p><h1 className="section-title mt-3">{title}</h1><p className="mt-4 max-w-2xl text-body-sm leading-relaxed text-ink-2">Siluet modern, konstruksi presisi, dan material pilihan. Temukan pasangan yang mencerminkan karakter langkah Anda.</p></header>
    <form onSubmit={event => { event.preventDefault(); update('cari', String(new FormData(event.currentTarget).get('cari') ?? '').trim()) }} className="mb-5 flex gap-2">
      <label className="relative min-w-0 flex-1"><span className="sr-only">Cari nama produk atau SKU</span><span className="pointer-events-none absolute left-4 top-3 text-ink-2"><Icon name="search" size={20} /></span><input name="cari" key={params.get('cari') ?? ''} defaultValue={params.get('cari') ?? ''} type="search" placeholder="Cari nama produk atau SKU…" className="field w-full pl-11" /></label><Button type="submit">Cari</Button>
    </form>
    {active.length > 0 && <div aria-label="Filter aktif" className="mb-6 flex flex-wrap gap-2">{active.map(key => <button type="button" key={key} onClick={() => update(key, '')} aria-label={`Hapus filter ${labels[key]}`} className="inline-flex min-h-11 max-w-full items-center gap-2 rounded-pill border border-line bg-surface px-3 text-label"><span className="break-words">{labels[key]}: {valueLabel(key)}</span><Icon name="close" size={16} /></button>)}<button type="button" className="min-h-11 px-3 text-label text-accent-hover" onClick={reset}>Hapus semua</button></div>}
    <div className="grid items-start gap-7 lg:grid-cols-[230px_minmax(0,1fr)]">
      <aside aria-label="Filter katalog" className="hidden rounded-card border border-line bg-surface p-5 lg:block"><FilterSidebar {...filterProps} /></aside>
      <section aria-label="Hasil katalog" className="min-w-0">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-card border border-line bg-surface p-4">
          <p role="status" className="text-caption text-ink-2">{filtered.length ? `${(page - 1) * perPage + 1}–${Math.min(page * perPage, filtered.length)}` : '0'} dari <strong className="text-ink">{filtered.length}</strong> produk</p>
          <button type="button" onClick={() => setFiltersOpen(true)} className="secondary-link lg:hidden"><Icon name="tune" size={18} />Filter {active.length > 0 ? `(${active.length})` : ''}</button>
          <div className="flex flex-wrap items-center gap-3">
            <label className="text-label text-ink-2">Urutkan<select value={params.get('urut') ?? 'terpopuler'} onChange={event => update('urut', event.target.value)} className="field ml-2 max-w-44"><option value="terpopuler">Terpopuler</option><option value="terbaru">Terbaru</option><option value="harga-rendah">Harga terendah</option><option value="harga-tinggi">Harga tertinggi</option><option value="rating">Ulasan tertinggi</option></select></label>
            <label className="text-label text-ink-2">Tampil<select className="field ml-2" value={perPage} onChange={event => update('tampil', event.target.value)}>{[12, 24, 48].map(value => <option key={value} value={value}>{value}</option>)}</select></label>
            <div role="group" aria-label="Tampilan produk" className="flex rounded-pill border border-line p-1">{[{ value: 'grid', icon: 'grid_view', label: 'Tampilan grid' }, { value: 'daftar', icon: 'view_list', label: 'Tampilan daftar' }].map(mode => <button key={mode.value} type="button" aria-label={mode.label} aria-pressed={list === (mode.value === 'daftar')} onClick={() => update('tampilan', mode.value)} className={`inline-flex size-11 items-center justify-center rounded-full ${list === (mode.value === 'daftar') ? 'bg-ink text-surface' : 'text-ink-2'}`}><Icon name={mode.icon} size={20} /></button>)}</div>
          </div>
        </div>
        {items.length ? <div className={list ? 'grid gap-4' : 'grid grid-cols-2 gap-3 md:gap-5 xl:grid-cols-3'}>{items.map(product => <ProductCard key={product.id} product={product} list={list} />)}</div>
          : <div className="rounded-card border border-line bg-surface px-5 py-16 text-center"><Icon name="search_off" size={40} /><h2 className="mt-4 font-serif text-headline-sm">Belum ada pasangan yang cocok.</h2><p className="mt-3 text-body-sm text-ink-2">Coba kata kunci lain atau kurangi filter pilihan Anda.</p><Button className="mt-5" variant="secondary" onClick={reset}>Reset pencarian & filter</Button></div>}
        <Pagination page={page} totalPages={totalPages} onChange={value => { update('halaman', String(value)); document.getElementById('konten')?.scrollIntoView({ behavior: 'instant' }) }} />
      </section>
    </div>
    <Modal title="Filter katalog" open={filtersOpen} onClose={() => setFiltersOpen(false)}><FilterSidebar {...filterProps} /><Button className="sticky bottom-0 mt-6 w-full" onClick={() => setFiltersOpen(false)}>Lihat {filtered.length} produk</Button></Modal>
  </>
}
