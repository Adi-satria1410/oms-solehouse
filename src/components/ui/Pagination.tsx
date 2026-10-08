import Icon from './Icon'

export default function Pagination({ page, totalPages, onChange }: { page: number; totalPages: number; onChange: (page: number) => void }) {
  if (totalPages <= 1) return null
  return <nav aria-label="Halaman katalog" className="mt-8 flex flex-wrap justify-center gap-2">
    <button type="button" disabled={page === 1} onClick={() => onChange(page - 1)} aria-label="Halaman sebelumnya" className="pagination-button"><Icon name="chevron_left" /></button>
    {Array.from({ length: totalPages }, (_, index) => index + 1).map(value => <button key={value} type="button" aria-label={`Halaman ${value}`} aria-current={page === value ? 'page' : undefined} onClick={() => onChange(value)} className={`pagination-button ${page === value ? 'bg-ink text-surface' : 'bg-surface'}`}>{value}</button>)}
    <button type="button" disabled={page === totalPages} onClick={() => onChange(page + 1)} aria-label="Halaman berikutnya" className="pagination-button"><Icon name="chevron_right" /></button>
  </nav>
}
