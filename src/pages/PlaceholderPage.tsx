import { Link, useParams } from 'react-router-dom'
import Icon from '../components/ui/Icon'

type PlaceholderPageProps = {
  title: string
  description: string
  icon: string
  admin?: boolean
  action?: { to: string; label: string }
}

export default function PlaceholderPage({ title, description, icon, admin = false, action }: PlaceholderPageProps) {
  const params = useParams()
  const reference = params.orderId ?? params.slug
  return (
    <section aria-labelledby="page-title">
      <p className="mb-3 flex flex-wrap items-center gap-2 text-label text-ink-2"><Link to={admin ? '/admin' : '/'} className="hover:text-accent-hover">{admin ? 'Ruang staf' : 'SOLEHOUSE'}</Link><Icon name="chevron_right" size={16} /><span>{title}</span></p>
      <h1 id="page-title" className="font-serif text-headline-md font-medium md:text-headline-lg">{title}</h1>
      <p className="mt-3 max-w-2xl text-body-sm leading-relaxed text-ink-2">{description}</p>
      {reference && <p className="mt-3 break-all text-caption text-ink-2">Referensi: <span className="font-medium text-ink">{reference}</span></p>}
      <div className="mt-8 flex min-h-72 flex-col items-center justify-center rounded-card border border-line bg-surface px-6 py-12 text-center md:min-h-80">
        <span className="mb-5 inline-flex size-16 items-center justify-center rounded-full bg-base text-ink-2"><Icon name={icon} size={30} /></span>
        <h2 className="font-serif text-headline-sm">Ruang untuk langkah berikutnya.</h2>
        <p className="mt-3 max-w-sm text-body-sm text-ink-2">Halaman ini sedang disiapkan. Silakan jelajahi menu SOLEHOUSE yang tersedia.</p>
        {action && <Link to={action.to} className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-pill bg-ink px-6 py-3 text-body-sm font-semibold text-surface hover:bg-ink-2">{action.label}<Icon name="arrow_forward" size={18} /></Link>}
      </div>
    </section>
  )
}
