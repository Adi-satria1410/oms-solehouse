import { Link, useLocation } from 'react-router-dom'
import Icon from '../ui/Icon'

const items = [
  { to: '/', label: 'Beranda', icon: 'home' },
  { to: '/katalog', label: 'Katalog', icon: 'grid_view' },
  { to: '/keranjang', label: 'Keranjang', icon: 'shopping_bag' },
  { to: '/akun', label: 'Akun', icon: 'person' },
]

export default function StoreBottomBar() {
  const { pathname } = useLocation()
  if (pathname.startsWith('/produk/')) return null
  return (
    <nav aria-label="Navigasi bawah toko" className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-line bg-base/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden">
      {items.map(item => {
        const active = item.to === '/katalog' ? pathname === '/katalog' || pathname.startsWith('/produk/') : pathname === item.to
        return (
          <Link key={item.to} to={item.to} aria-current={active ? 'page' : undefined} className={`flex min-h-16 flex-col items-center justify-center gap-1 text-[11px] ${active ? 'font-semibold text-accent-hover' : 'text-ink-2 hover:text-ink'}`}>
            <Icon name={item.icon} size={22} filled={active} />{item.label}
          </Link>
        )
      })}
    </nav>
  )
}
