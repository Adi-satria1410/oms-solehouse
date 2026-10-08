import { Link } from 'react-router-dom'
import { helpPages } from '../../data/navigation'
import Brand from '../ui/Brand'
import Icon from '../ui/Icon'

const groups = [
  { title: 'Layanan pelanggan', links: [{ to: '/lacak', label: 'Lacak status pesanan' }, { to: '/keranjang', label: 'Keranjang belanja' }, { to: '/checkout', label: 'Checkout' }] },
  { title: 'Bantuan', links: helpPages.map(page => ({ to: `/${page.path}`, label: page.title })) },
  { title: 'Koleksi', links: [{ to: '/katalog?koleksi=pria', label: 'Koleksi pria' }, { to: '/katalog?koleksi=wanita', label: 'Koleksi wanita' }, { to: '/katalog?koleksi=anak', label: 'Koleksi anak' }, { to: '/katalog?sale=true', label: 'Penawaran spesial' }] },
]

export default function StoreFooter() {
  return (
    <footer className="border-t border-line bg-ink text-base">
      <div className="mx-auto max-w-7xl px-margin-mobile py-12 md:px-margin">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Brand inverted />
            <p className="mt-5 max-w-xs text-body-sm leading-relaxed text-sand">Kriya alas kaki kontemporer, dirancang dengan ketelitian untuk kenyamanan setiap langkah.</p>
            <p className="mt-6 text-label font-semibold uppercase tracking-widest">Studio SOLEHOUSE</p>
            <p className="mt-2 max-w-xs text-body-sm text-sand">Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan</p>
          </div>
          {groups.map(group => (
            <div key={group.title}>
              <h2 className="mb-3 text-label font-semibold uppercase tracking-widest">{group.title}</h2>
              <ul>{group.links.map(link => <li key={link.to}><Link className="inline-flex min-h-11 items-center text-body-sm text-sand hover:text-surface" to={link.to}>{link.label}</Link></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-surface/15 pt-6 text-caption text-sand">
          <p>© SOLEHOUSE Artisanal Footwear.</p>
          <Link to="/admin/login" className="inline-flex min-h-11 items-center gap-2 hover:text-surface">Ruang staf <Icon name="arrow_outward" size={16} /></Link>
        </div>
      </div>
    </footer>
  )
}
