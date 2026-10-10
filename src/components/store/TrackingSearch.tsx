import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isOrderId, normalizeOrderId } from '../../lib/tracking'
import Button from '../ui/Button'
import Icon from '../ui/Icon'

export default function TrackingSearch({ initialValue }: { initialValue: string }) {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  return <form noValidate aria-label="Pencarian pesanan" className="mx-auto max-w-2xl rounded-card border border-line bg-surface p-5 shadow-card sm:p-7" onSubmit={event => {
    event.preventDefault()
    const value = normalizeOrderId(String(new FormData(event.currentTarget).get('orderNumber') ?? ''))
    if (!isOrderId(value)) { setError(value ? 'Gunakan format SLH-2025-12345 sesuai nomor pesanan Anda.' : 'Masukkan nomor pesanan terlebih dahulu.'); event.currentTarget.querySelector('input')?.focus(); return }
    setError(''); navigate(`/lacak/${encodeURIComponent(value)}`)
  }}>
    <label htmlFor="order-number" className="text-body-sm font-semibold">Nomor pesanan</label>
    <div className="mt-3 flex flex-col gap-3 sm:flex-row"><input id="order-number" name="orderNumber" defaultValue={initialValue} maxLength={40} autoCapitalize="characters" autoComplete="off" spellCheck={false} placeholder="Contoh: SLH-2025-12345" aria-invalid={Boolean(error)} aria-describedby={error ? 'tracking-error' : 'tracking-hint'} onChange={() => setError('')} className="field min-w-0 flex-1 uppercase" /><Button type="submit"><Icon name="search" size={19} />Lacak Pesanan</Button></div>
    {error && <p id="tracking-error" role="alert" className="mt-3 text-caption text-accent-hover">{error}</p>}
    <p id="tracking-hint" className="mt-4 text-caption leading-relaxed text-ink-2">Nomor tersedia pada halaman konfirmasi checkout. Pesanan demo tersimpan di browser dan alamat situs yang sama saat Anda berbelanja.</p>
  </form>
}
