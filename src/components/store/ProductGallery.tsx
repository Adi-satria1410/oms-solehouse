import { useState } from 'react'
import type { Product } from '../../types'
import Icon from '../ui/Icon'
import Modal from '../ui/Modal'

export default function ProductGallery({ product }: { product: Product }) {
  const [selected, setSelected] = useState(0)
  const [zoom, setZoom] = useState(false)
  const photo = product.images[selected]
  return <div>
    <div className="relative overflow-hidden rounded-card bg-sand"><img src={photo.src} alt={photo.alt} width={800} height={640} fetchPriority="high" className="aspect-[5/4] w-full object-cover" /><button type="button" aria-label="Perbesar foto" onClick={() => setZoom(true)} className="absolute right-4 top-4 inline-flex size-11 items-center justify-center rounded-full bg-surface/95 shadow-card"><Icon name="zoom_in" /></button></div>
    <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Galeri produk">{product.images.map((image, index) => <button key={image.src} type="button" aria-label={image.alt} aria-pressed={selected === index} onClick={() => setSelected(index)} className={`w-[calc((100%_-_2.5rem)/6)] min-w-11 overflow-hidden rounded-chip border-2 ${selected === index ? 'border-ink' : 'border-transparent opacity-70 hover:opacity-100'}`}><img src={image.src} alt="" width={110} height={88} loading="lazy" className="aspect-[5/4] w-full object-cover" /></button>)}</div>
    <p className="mt-4 text-label leading-relaxed text-ink-2">Foto referensi model. Pilihan warna lain dapat menggunakan foto model yang sama.</p>
    <div className="mt-5 flex items-center gap-3 rounded-card bg-sand p-5"><Icon name="verified" size={28} /><div><h2 className="text-body-sm font-semibold">Ketelitian dari studio kami</h2><p className="mt-1 text-caption text-ink-2">Material pilihan dan detail jahitan yang berkarakter.</p></div></div>
    <Modal title="Foto produk" open={zoom} onClose={() => setZoom(false)}><img src={photo.src} alt={photo.alt} className="w-full rounded-card" /></Modal>
  </div>
}
