import Icon from '../ui/Icon'

export default function WhatsAppCta({ orderId }: { orderId?: string }) {
  const number = String(import.meta.env.VITE_WHATSAPP_NUMBER ?? '').replace(/\D/g, '')
  const ready = /^62\d{8,13}$/.test(number)
  const message = orderId ? `Halo SOLEHOUSE, saya ingin menanyakan pesanan ${orderId}.` : 'Halo SOLEHOUSE, saya ingin konsultasi sepatu.'
  const label = orderId ? 'Hubungi CS WhatsApp' : 'Konsultasi WhatsApp'
  return <aside className="rounded-card bg-sand p-5">
    <Icon name="support_agent" size={28} /><h3 className="mt-3 font-serif text-headline-sm">{orderId ? 'Butuh bantuan dengan pesanan?' : 'Bantu temukan langkah Anda.'}</h3><p className="mt-2 text-body-sm text-ink-2">{orderId ? 'Hubungi tim kami dengan menyertakan nomor pesanan Anda.' : 'Konsultasikan ukuran, material, atau perawatan bersama tim kami.'}</p>
    {ready ? <a href={`https://wa.me/${number}?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-pill bg-ink px-4 py-2 text-caption font-semibold text-surface">{label}<Icon name="arrow_outward" size={18} /></a>
      : <><button type="button" disabled className="mt-4 min-h-11 rounded-pill bg-ink/60 px-4 py-2 text-caption font-semibold text-surface">{label}</button><p className="mt-2 text-label text-ink-2">Kontak layanan pelanggan segera tersedia.</p></>}
  </aside>
}
