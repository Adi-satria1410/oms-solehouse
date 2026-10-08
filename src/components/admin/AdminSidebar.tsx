import { Link, NavLink } from 'react-router-dom'
import { adminNavigation } from '../../data/navigation'
import Brand from '../ui/Brand'
import Icon from '../ui/Icon'

export default function AdminSidebar() {
  return (
    <div className="flex min-h-full flex-col text-surface">
      <div className="mb-8"><Brand admin /></div>
      <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-taupe">Ruang operasional</p>
      <nav aria-label="Menu admin" className="flex flex-col gap-1">
        {adminNavigation.map(item => (
          <NavLink key={item.to} to={item.to} end={item.to === '/admin'} className={({ isActive }) => `flex min-h-11 items-center gap-3 rounded-lg border-l-[3px] px-3 py-2 text-body-sm transition-colors ${isActive ? 'border-accent bg-surface/10 font-semibold text-surface' : 'border-transparent text-sand hover:bg-surface/5 hover:text-surface'}`}>
            <Icon name={item.icon} size={20} /><span>{item.label}</span>
            {item.to === '/admin/pesanan' && <span aria-label="0 pesanan" className="ml-auto rounded-full bg-accent px-2 py-0.5 text-[10px] text-surface">0</span>}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto pt-10">
        <div className="rounded-card border border-surface/10 bg-surface/5 p-4">
          <p className="text-label font-medium text-sand">Sistem OMS · Pratinjau</p>
          <p className="mt-2 flex items-center gap-2 text-body-sm"><span className="size-2 rounded-full bg-olive" />Toko beroperasi</p>
        </div>
        <Link to="/" className="mt-3 flex min-h-11 items-center gap-3 px-3 text-body-sm text-sand hover:text-surface"><Icon name="storefront" size={20} />Kunjungi toko<Icon name="arrow_outward" size={16} /></Link>
      </div>
    </div>
  )
}
