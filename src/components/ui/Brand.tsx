import { Link } from 'react-router-dom'

export default function Brand({ admin = false, inverted = false }: { admin?: boolean; inverted?: boolean }) {
  return (
    <Link to={admin ? '/admin' : '/'} aria-label={admin ? 'SOLEHOUSE, dashboard admin' : 'SOLEHOUSE, beranda'} className="inline-flex shrink-0 items-center gap-3 rounded-lg">
      <img src="/solehouse.jpeg" alt="Logo SOLEHOUSE" width={64} height={48} className="h-12 w-16 rounded-lg object-contain" />
      <span>
        <span className="block font-serif text-xl leading-tight tracking-tight">SOLEHOUSE</span>
        <span className={`mt-1 block text-[9px] uppercase tracking-[0.16em] ${admin || inverted ? 'text-sand' : 'text-ink-2'}`}>
          {admin ? 'Atelier & Orders v2.4' : 'Artisanal Footwear'}
        </span>
      </span>
    </Link>
  )
}
