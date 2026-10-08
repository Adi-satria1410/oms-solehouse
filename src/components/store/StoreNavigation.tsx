import { Link, useLocation } from 'react-router-dom'
import { storeNavigation } from '../../data/navigation'

export default function StoreNavigation({ mobile = false }: { mobile?: boolean }) {
  const { pathname, search } = useLocation()
  const current = new URLSearchParams(search)
  return (
    <nav aria-label={mobile ? 'Menu toko seluler' : 'Menu utama toko'} className={mobile ? 'flex flex-col gap-1' : 'hidden items-center gap-5 xl:gap-7 lg:flex'}>
      {storeNavigation.map(item => {
        const [path, query] = item.to.split('?')
        const expected = new URLSearchParams(query)
        const active = query
          ? pathname === path && [...expected].every(([key, value]) => current.get(key) === value) && (expected.has('sale') || !current.has('sale'))
          : path === '/' ? pathname === '/' : pathname === path || pathname.startsWith(`${path}/`)
        return (
          <Link key={item.to} to={item.to} aria-current={active ? 'page' : undefined}
            className={`inline-flex min-h-11 items-center gap-2 border-b-2 text-body-sm transition-colors ${mobile ? 'rounded-lg px-3' : ''} ${active ? 'border-ink font-semibold text-ink' : 'border-transparent text-ink-2 hover:text-ink hover:border-taupe'}`}>
            {item.label}
            {item.label === 'Sale' && <span className="rounded-full bg-low-stock-bg px-1.5 py-0.5 text-[9px] font-semibold text-accent-hover">PROMO</span>}
          </Link>
        )
      })}
    </nav>
  )
}
