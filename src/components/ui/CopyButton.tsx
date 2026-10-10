import { useState } from 'react'
import Icon from './Icon'

export default function CopyButton({ value, label }: { value: string; label: string }) {
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)
  const copy = async () => {
    setBusy(true)
    try { await navigator.clipboard.writeText(value); setMessage('Nomor resi berhasil disalin.') }
    catch { setMessage('Tidak dapat menyalin otomatis. Pilih dan salin nomor resi di atas secara manual.') }
    finally { setBusy(false) }
  }
  return <div className="no-print"><button type="button" disabled={busy} onClick={copy} className="mt-2 inline-flex min-h-11 items-center gap-2 rounded-pill border border-line bg-surface px-4 text-caption disabled:opacity-50"><Icon name="content_copy" size={18} />{busy ? 'Menyalin…' : label}</button>{message && <p role="status" className="mt-2 text-caption text-ink-2">{message}</p>}</div>
}
