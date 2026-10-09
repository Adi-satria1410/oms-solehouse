import { useEffect, useState } from 'react'
import Icon from '../ui/Icon'

export default function CartTimer({ startedAt }: { startedAt: number | null }) {
  const [now, setNow] = useState(Date.now)
  useEffect(() => { const timer = window.setInterval(() => setNow(Date.now()), 1000); return () => window.clearInterval(timer) }, [])
  const seconds = Math.max(0, Math.ceil(((startedAt ?? now) + 15 * 60 * 1000 - now) / 1000))
  const time = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`
  return <div className="flex items-start gap-3 rounded-card border border-line bg-sand/50 p-4 text-body-sm"><Icon name="timer" size={22} className="shrink-0" /><div><p className="font-medium">{seconds ? <>Pengingat keranjang <span role="timer" aria-label="Sisa waktu pengingat" className="ml-1 tabular-nums">{time}</span></> : 'Waktu pengingat telah habis.'}</p><p className="mt-1 text-caption text-ink-2">Simulasi penahan stok 15 menit. Stok belum dipesan; keranjang tetap tersedia dan stok diperiksa kembali saat pembayaran.</p></div></div>
}
