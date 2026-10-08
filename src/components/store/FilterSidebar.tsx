import { categories, colors, products } from '../../data/products'
import { values } from '../../lib/catalog'
import Button from '../ui/Button'
import WhatsAppCta from './WhatsAppCta'
import { useId } from 'react'

type FilterSidebarProps = { params: URLSearchParams; update: (key: string, value: string) => void; updatePrice: (min: string, max: string) => void; reset: () => void }

export default function FilterSidebar({ params, update, updatePrice, reset }: FilterSidebarProps) {
  const radioName = useId()
  const toggle = (key: string, value: string) => {
    const selected = values(params, key)
    update(key, (selected.includes(value) ? selected.filter(item => item !== value) : [...selected, value]).join(','))
  }
  return <div className="space-y-6">
    <div className="flex items-center justify-between"><h2 className="text-body-sm font-semibold">Filter koleksi</h2><button type="button" onClick={reset} className="min-h-11 px-2 text-label font-medium text-accent-hover">Reset filter</button></div>
    <fieldset className="filter-group"><legend>Kategori</legend>{categories.map(category => <label key={category.value} className="filter-option"><input type="checkbox" checked={values(params, 'kategori').includes(category.value)} onChange={() => toggle('kategori', category.value)} />{category.label}<span className="ml-auto text-ink-2">{products.filter(product => product.category === category.value).length}</span></label>)}</fieldset>
    <fieldset className="filter-group"><legend>Koleksi</legend><select aria-label="Koleksi" value={params.get('koleksi') ?? ''} onChange={event => update('koleksi', event.target.value)} className="field w-full"><option value="">Semua koleksi</option><option value="pria">Pria</option><option value="wanita">Wanita</option><option value="anak">Anak</option></select></fieldset>
    <fieldset className="filter-group"><legend>Ukuran EU</legend><div className="grid grid-cols-4 gap-2">{Array.from({ length: 11 }, (_, i) => String(i + 36)).map(size => <button key={size} type="button" aria-label={`Filter ukuran ${size}`} aria-pressed={values(params, 'ukuran').includes(size)} onClick={() => toggle('ukuran', size)} className={`min-h-11 rounded-chip border text-caption ${values(params, 'ukuran').includes(size) ? 'border-ink bg-ink text-surface' : 'border-line bg-surface'}`}>{size}</button>)}</div></fieldset>
    <fieldset className="filter-group"><legend>Warna</legend>{colors.map(color => <label key={color.value} className="filter-option"><input type="checkbox" checked={values(params, 'warna').includes(color.value)} onChange={() => toggle('warna', color.value)} /><span className={`size-4 rounded-full border border-taupe ${color.className}`} />{color.label}</label>)}</fieldset>
    <form className="filter-group" onSubmit={event => { event.preventDefault(); const form = new FormData(event.currentTarget); updatePrice(String(form.get('min') ?? ''), String(form.get('max') ?? '')) }}>
      <h3 className="text-caption font-semibold">Rentang harga</h3><label className="block text-label text-ink-2">Minimum (Rp)<input key={`min-${params.get('min')}`} name="min" type="number" min="0" step="1000" defaultValue={params.get('min') ?? ''} placeholder="0" className="field mt-2 w-full" /></label><label className="block text-label text-ink-2">Maksimum (Rp)<input key={`max-${params.get('max')}`} name="max" type="number" min="0" step="1000" defaultValue={params.get('max') ?? ''} placeholder="Tanpa batas" className="field mt-2 w-full" /></label><Button type="submit" variant="secondary" size="sm">Terapkan harga</Button>
    </form>
    <fieldset className="filter-group"><legend>Material</legend>{[...new Set(products.map(product => product.material))].map(material => <label key={material} className="filter-option"><input type="checkbox" checked={values(params, 'material').includes(material)} onChange={() => toggle('material', material)} />{material}</label>)}</fieldset>
    <fieldset className="filter-group"><legend>Ketersediaan</legend>{[['', 'Semua stok'], ['tersedia', 'Tersedia'], ['tipis', 'Stok tipis'], ['habis', 'Stok habis']].map(([value, label]) => <label key={value} className="filter-option"><input type="radio" name={radioName} checked={(params.get('stok') ?? '') === value} onChange={() => update('stok', value)} />{label}</label>)}</fieldset>
    <label className="filter-option"><input type="checkbox" checked={params.get('sale') === 'true'} onChange={event => update('sale', event.target.checked ? 'true' : '')} />Hanya produk promo</label>
    <WhatsAppCta />
  </div>
}
