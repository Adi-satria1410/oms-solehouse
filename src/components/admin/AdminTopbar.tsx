import { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatTanggal } from '../../lib/format'
import Icon from '../ui/Icon'
import NavigationDrawer from '../ui/NavigationDrawer'
import AdminSidebar from './AdminSidebar'

export default function AdminTopbar() {
  const [warehouse, setWarehouse] = useState('jakarta')
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-surface/95 backdrop-blur-md">
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 lg:px-8">
        <div className="flex items-center gap-2">
          <NavigationDrawer title="Menu admin" dark><AdminSidebar /></NavigationDrawer>
          <div>
            <p className="flex items-center gap-2 text-caption font-semibold"><span className="size-2 rounded-full bg-olive" />Sistem OMS</p>
            <p className="mt-1 text-label text-ink-2">Toko beroperasi · Pratinjau</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <time dateTime={new Date().toISOString()} className="hidden items-center gap-2 text-caption text-ink-2 xl:inline-flex"><Icon name="calendar_today" size={18} />{formatTanggal()}</time>
          <Link to="/admin/notifikasi" aria-label="Notifikasi" className="inline-flex size-11 items-center justify-center rounded-full hover:bg-base"><Icon name="notifications" size={22} /></Link>
          <Link to="/admin/pengaturan" aria-label="Profil staf contoh" className="flex min-h-11 items-center gap-3 rounded-full sm:border-l sm:border-line sm:pl-4">
            <span className="hidden text-right sm:block"><span className="block text-caption font-semibold">Staf SOLEHOUSE</span><span className="block text-[10px] text-ink-2">Kepala Operasional · Contoh</span></span>
            <span className="inline-flex size-9 items-center justify-center rounded-full bg-ink text-surface"><Icon name="person" size={20} /></span>
          </Link>
        </div>
        <label className="flex w-full items-center gap-2 rounded-lg border border-line bg-base px-3 py-2 text-caption sm:w-auto sm:order-2 lg:order-none">
          <Icon name="store" size={18} />
          <span className="sr-only">Butik atau gudang</span>
          <select value={warehouse} onChange={event => setWarehouse(event.target.value)} className="min-h-7 min-w-0 flex-1 bg-transparent text-ink">
            <option value="jakarta">Butik Flagship Jakarta</option>
            <option value="bandung">Gudang Studio Bandung</option>
          </select>
        </label>
      </div>
    </header>
  )
}
