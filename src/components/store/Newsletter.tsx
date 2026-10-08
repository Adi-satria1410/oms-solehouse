import { useState } from 'react'
import Button from '../ui/Button'
import Icon from '../ui/Icon'

export default function Newsletter() {
  const [message, setMessage] = useState('Pratinjau buletin · Pendaftaran segera dibuka.')
  return <section className="grid items-center gap-7 rounded-card bg-sand p-6 md:grid-cols-2 md:p-10">
    <div><p className="eyebrow">Dari meja perajin</p><h2 className="section-title mt-2">Warta & Rilis Terbatas</h2><p className="mt-3 text-body-sm text-ink-2">Cerita dari studio, panduan perawatan, dan koleksi baru untuk langkah Anda berikutnya.</p></div>
    <form onSubmit={event => { event.preventDefault(); setMessage('Alamat email valid. Pendaftaran belum dibuka; email Anda tidak dikirim atau disimpan.') }}>
      <label htmlFor="newsletter-email" className="mb-2 block text-caption font-medium">Alamat email</label><div className="flex flex-wrap gap-2"><input id="newsletter-email" type="email" required autoComplete="email" placeholder="nama@email.com" className="field min-w-0 flex-1" /><Button type="submit">Daftar<Icon name="arrow_forward" size={18} /></Button></div><p role="status" className="mt-3 text-label leading-relaxed text-ink-2">{message}</p>
    </form>
  </section>
}
