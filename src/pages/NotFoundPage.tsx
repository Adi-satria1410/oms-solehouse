import { Link } from 'react-router-dom'
import Icon from '../components/ui/Icon'

export default function NotFoundPage({ admin = false }: { admin?: boolean }) {
  return (
    <section className="py-16 text-center">
      <p className="font-serif text-display text-accent-hover">404</p>
      <h1 className="mt-4 font-serif text-headline-md">Halaman tidak ditemukan</h1>
      <p className="mt-3 text-body-sm text-ink-2">Tautan mungkin sudah berubah atau alamat belum tepat.</p>
      <Link to={admin ? '/admin' : '/'} className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-pill bg-ink px-6 py-3 text-body-sm font-semibold text-surface hover:bg-ink-2"><Icon name="arrow_back" size={18} />{admin ? 'Kembali ke dashboard' : 'Kembali ke beranda'}</Link>
    </section>
  )
}
