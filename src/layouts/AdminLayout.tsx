import { Outlet } from 'react-router-dom'
import AdminSidebar from '../components/admin/AdminSidebar'
import AdminTopbar from '../components/admin/AdminTopbar'

export default function AdminLayout() {
  return (
    <div className="min-h-dvh lg:pl-[260px]">
      <a href="#konten" className="skip-link">Langsung ke konten</a>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[260px] overflow-y-auto bg-ink p-5 lg:block"><AdminSidebar /></aside>
      <AdminTopbar />
      <main id="konten" tabIndex={-1} className="mx-auto max-w-7xl px-5 py-8 outline-none lg:px-8"><Outlet /></main>
      <footer className="px-5 pb-6 text-caption text-ink-2 lg:px-8">SOLEHOUSE · Atelier & Orders</footer>
    </div>
  )
}
