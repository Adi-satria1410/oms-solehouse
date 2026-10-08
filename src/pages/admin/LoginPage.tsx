import { Link } from 'react-router-dom'
import Brand from '../../components/ui/Brand'
import Icon from '../../components/ui/Icon'

export default function LoginPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-5 py-12">
      <Brand />
      <div className="mt-8 w-full max-w-md rounded-card border border-line bg-surface p-7 text-center shadow-card sm:p-10">
        <span className="inline-flex size-14 items-center justify-center rounded-full bg-base"><Icon name="lock" size={28} /></span>
        <h1 className="mt-5 font-serif text-headline-md">Masuk Akun Admin</h1>
        <p className="mt-3 text-body-sm leading-relaxed text-ink-2">Halaman masuk sedang disiapkan. Jelajahi pratinjau ruang staf SOLEHOUSE.</p>
        <Link to="/admin" className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-pill bg-ink px-6 py-3 text-body-sm font-semibold text-surface hover:bg-ink-2">Pratinjau OMS<Icon name="arrow_forward" size={18} /></Link>
      </div>
      <Link to="/" className="mt-5 inline-flex min-h-11 items-center gap-2 text-body-sm text-ink-2 hover:text-ink"><Icon name="arrow_back" size={18} />Beralih ke toko</Link>
    </main>
  )
}
