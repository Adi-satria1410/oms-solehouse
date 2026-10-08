import { useState } from 'react'
import Button, { type ButtonVariant } from '../components/ui/Button'
import Icon from '../components/ui/Icon'
import SpecimenSection from '../components/ui/SpecimenSection'
import { formatRupiah, formatTanggal } from '../lib/format'

const palette = [
  { token: 'base', name: 'Krem hangat', color: 'bg-base' },
  { token: 'surface', name: 'Putih bersih', color: 'bg-surface' },
  { token: 'sand', name: 'Pasir', color: 'bg-sand' },
  { token: 'taupe', name: 'Taupe', color: 'bg-taupe' },
  { token: 'line', name: 'Garis lembut', color: 'bg-line' },
  { token: 'ink', name: 'Espresso', color: 'bg-ink' },
  { token: 'ink-2', name: 'Tinta sekunder', color: 'bg-ink-2' },
  { token: 'ink-3', name: 'Tinta lembut', color: 'bg-ink-3' },
  { token: 'accent', name: 'Terakota', color: 'bg-accent' },
  { token: 'accent-hover', name: 'Terakota pekat', color: 'bg-accent-hover' },
  { token: 'olive', name: 'Zaitun', color: 'bg-olive' },
]

const statusColors = [
  { label: 'Menunggu bayar', color: 'bg-waiting-bg text-waiting' },
  { label: 'Dibayar', color: 'bg-paid-bg text-paid' },
  { label: 'Diproses', color: 'bg-processing-bg text-processing' },
  { label: 'Dikirim', color: 'bg-shipped-bg text-shipped' },
  { label: 'Selesai', color: 'bg-completed-bg text-completed' },
  { label: 'Dibatalkan', color: 'bg-cancelled-bg text-cancelled' },
  { label: 'Retur / klaim', color: 'bg-returned-bg text-returned' },
  { label: 'Stok menipis', color: 'bg-low-stock-bg text-low-stock' },
]

const buttonExamples: { variant: ButtonVariant; label: string; icon: string }[] = [
  { variant: 'primary', label: 'Tombol utama', icon: 'arrow_forward' },
  { variant: 'secondary', label: 'Tombol sekunder', icon: 'add' },
  { variant: 'accent', label: 'Tombol aksen', icon: 'shopping_bag' },
  { variant: 'ghost', label: 'Tombol transparan', icon: 'arrow_outward' },
]

const icons = [
  { name: 'shopping_bag', label: 'Keranjang' },
  { name: 'local_shipping', label: 'Pengiriman' },
  { name: 'inventory_2', label: 'Inventori' },
  { name: 'verified', label: 'Terverifikasi' },
  { name: 'search', label: 'Pencarian' },
]

export default function DesignSystemPage() {
  const [feedback, setFeedback] = useState('Pilih tombol di atas untuk mencoba interaksinya.')
  const [favorite, setFavorite] = useState(false)

  return (
    <>
      <a href="#konten" className="sr-only z-50 rounded-pill bg-ink px-6 py-3 text-surface focus:not-sr-only focus:fixed focus:left-5 focus:top-5">
        Langsung ke konten
      </a>
      <header className="sticky top-0 z-20 border-b border-line bg-base/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-margin-mobile py-5 md:px-margin">
          <a href="#konten" aria-label="SOLEHOUSE, awal panduan visual" className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full border border-taupe font-serif text-xl">S</span>
            <span>
              <span className="block font-serif text-headline-sm leading-none tracking-tight">SOLEHOUSE</span>
              <span className="mt-1.5 block text-[9px] font-medium uppercase tracking-[0.22em] text-ink-2">Sepatu Artisan</span>
            </span>
          </a>
          <nav aria-label="Bagian panduan visual" className="flex gap-5 text-caption font-medium text-ink-2 max-sm:w-full max-sm:justify-between">
            <a href="#warna" className="inline-flex min-h-11 items-center hover:text-accent-hover">Warna</a>
            <a href="#tipografi" className="inline-flex min-h-11 items-center hover:text-accent-hover">Tipografi</a>
            <a href="#komponen" className="inline-flex min-h-11 items-center hover:text-accent-hover">Komponen</a>
            <a href="#format" className="inline-flex min-h-11 items-center hover:text-accent-hover">Format</a>
          </nav>
        </div>
      </header>

      <main id="konten" className="mx-auto max-w-7xl px-margin-mobile md:px-margin">
        <section aria-labelledby="page-title" className="grid items-center gap-10 py-12 md:grid-cols-[1.2fr_1fr] md:gap-16 md:py-20">
          <div>
            <p className="mb-5 flex items-center gap-2 text-label font-semibold uppercase tracking-widest text-accent-hover">
              <span className="size-1.5 rounded-full bg-accent" /> Fase 00 / Fondasi visual
            </p>
            <h1 id="page-title" className="max-w-xl font-serif text-display-mobile font-semibold tracking-tight md:text-display">
              Setiap langkah,<br />dimulai dari detail.
            </h1>
            <p className="mt-5 max-w-md text-body text-ink-2">
              Warna yang hangat. Huruf yang berkarakter. Komponen yang konsisten. Inilah fondasi pengalaman SOLEHOUSE.
            </p>
            <a href="#komponen" className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-pill bg-ink px-6 py-3 text-body-sm font-semibold text-surface transition-colors hover:bg-ink-2">
              Jelajahi komponen <Icon name="arrow_downward" size={18} />
            </a>
            <p className="mt-4 text-caption text-ink-2">Halaman uji tampilan untuk toko dan admin OMS.</p>
          </div>

          <div className="relative overflow-hidden rounded-card bg-sand p-7 sm:p-10">
            <div className="flex items-center justify-between border-b border-ink/15 pb-5 text-label uppercase tracking-widest text-ink-2">
              <span>Karakter SOLEHOUSE</span><Icon name="workspace_premium" />
            </div>
            <div className="py-8">
              <span className="font-serif text-[88px] leading-none tracking-tighter sm:text-[112px]" aria-hidden="true">Aa.</span>
              <p className="mt-4 font-serif text-headline-md">Kriya dalam setiap detail.</p>
              <p className="mt-2 text-body-sm text-ink-2">Hangat · Tenang · Berkarakter</p>
            </div>
            <div className="flex items-end justify-between gap-4 border-t border-ink/15 pt-5">
              <p className="text-label leading-5 text-ink-2">Playfair Display & Inter<br /><span className="font-medium text-ink">Dirancang untuk SOLEHOUSE</span></p>
              <div className="flex -space-x-2" aria-label="Warna utama: krem, terakota, espresso">
                <span className="size-9 rounded-full border-2 border-sand bg-base" />
                <span className="size-9 rounded-full border-2 border-sand bg-accent" />
                <span className="size-9 rounded-full border-2 border-sand bg-ink" />
              </div>
            </div>
          </div>
        </section>

        <SpecimenSection id="warna" number="01" title="Palet yang membumi" description="Nuansa netral untuk ruang bernapas, terakota untuk penekanan, dan espresso untuk keterbacaan.">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-6">
            {palette.map(({ token, name, color }) => (
              <div key={token} className="overflow-hidden rounded-card border border-line bg-surface">
                <div className={`h-24 border-b border-line ${color}`} />
                <div className="p-4">
                  <p className="text-caption font-semibold">{name}</p>
                  <code className="mt-1 block text-xs text-ink-2">{token}</code>
                </div>
              </div>
            ))}
            <div className="flex flex-col justify-center rounded-card border border-dashed border-taupe p-4 text-ink-2">
              <Icon name="palette" size={28} />
              <p className="mt-3 text-caption">Satu palet untuk pengalaman yang selaras.</p>
            </div>
          </div>
          <div className="mt-7 rounded-card border border-line bg-surface p-5 md:p-6">
            <h3 className="mb-4 text-body-sm font-semibold">Warna status pesanan & stok</h3>
            <div className="flex flex-wrap gap-3">
              {statusColors.map(({ label, color }) => (
                <span key={label} className={`inline-flex items-center gap-2 rounded-pill px-3 py-2 text-label font-medium ${color}`}>
                  <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />{label}
                </span>
              ))}
            </div>
          </div>
        </SpecimenSection>

        <SpecimenSection id="tipografi" number="02" title="Dua huruf, satu karakter" description="Judul serif membawa nuansa editorial. Teks sans menjaga informasi tetap jelas dan mudah dibaca.">
          <div className="grid gap-5 md:grid-cols-2">
            <article className="rounded-card bg-ink p-6 text-base md:p-8">
              <p className="text-label uppercase tracking-widest text-sand">01 / Playfair Display</p>
              <h3 className="mt-6 font-serif text-display-mobile md:text-headline-lg">Langkah Tepat<br />Setiap Hari.</h3>
              <p className="mt-6 font-serif text-headline-sm">Keindahan yang bertahan.</p>
              <p className="mt-7 border-t border-base/20 pt-5 text-caption text-sand">Judul utama · Judul bagian · Cerita koleksi</p>
            </article>
            <article className="rounded-card border border-line bg-surface p-6 md:p-8">
              <p className="text-label uppercase tracking-widest text-ink-2">02 / Inter</p>
              <h3 className="mt-6 text-title font-semibold">Dibuat dengan ketelitian.</h3>
              <p className="mt-4 max-w-sm text-body text-ink-2">Kenyamanan tanpa kompromi, dirancang dengan presisi perajin sepatu dan siluet modern untuk menemani setiap langkah Anda.</p>
              <p className="mt-5 text-body-sm text-ink-2">Informasi produk dan pesanan tetap mudah dibaca, di layar besar maupun kecil.</p>
              <p className="mt-7 border-t border-line pt-5 text-label font-semibold uppercase tracking-widest">Teks isi · Navigasi · Label</p>
            </article>
          </div>
        </SpecimenSection>

        <SpecimenSection id="komponen" number="03" title="Kecil, tetapi berarti" description="Empat jenis tombol, dua ukuran, dan ikon yang bisa dipakai kembali di seluruh aplikasi. Coba setiap tombol di bawah ini.">
          <div className="rounded-card border border-line bg-surface p-5 shadow-card md:p-8">
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
              {buttonExamples.map(({ variant, label, icon }) => (
                <div key={variant} className="flex flex-col items-start gap-3">
                  <h3 className="mb-1 text-label font-semibold uppercase tracking-wider text-ink-2">{label}</h3>
                  <Button variant={variant} onClick={() => setFeedback(`${label} ukuran sedang berhasil diklik.`)}>
                    Ukuran sedang <Icon name={icon} size={18} />
                  </Button>
                  <Button variant={variant} size="sm" onClick={() => setFeedback(`${label} ukuran kecil berhasil diklik.`)}>Ukuran kecil</Button>
                  <Button variant={variant} size="sm" disabled>Tidak tersedia</Button>
                </div>
              ))}
            </div>
            <p role="status" aria-live="polite" className="mt-7 flex min-h-14 items-center gap-3 rounded-chip bg-base px-4 py-3 text-caption text-ink-2">
              <Icon name="touch_app" size={20} />{feedback}
            </p>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-6 rounded-card border border-line bg-surface p-5 md:gap-9 md:p-8">
            {icons.map(({ name, label }) => (
              <div key={name} className="flex min-w-16 flex-col items-center gap-3 text-ink-2">
                <Icon name={name} /><span className="text-label">{label}</span>
              </div>
            ))}
            <div className="flex flex-col items-center gap-1">
              <Button
                variant="ghost" size="sm" aria-label="Favorit contoh" aria-pressed={favorite}
                onClick={() => setFavorite(!favorite)} className="px-3"
              >
                <Icon name="favorite" filled={favorite} className="text-accent-hover" />
              </Button>
              <span className="text-label text-ink-2">{favorite ? 'Favorit aktif' : 'Coba favorit'}</span>
            </div>
          </div>
        </SpecimenSection>

        <SpecimenSection id="format" number="04" title="Informasi yang konsisten" description="Harga dalam Rupiah dan tanggal berbahasa Indonesia, dengan zona waktu Jakarta.">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-card border border-line bg-surface p-6 shadow-card">
              <p className="text-label font-semibold uppercase tracking-widest text-ink-2">Contoh harga</p>
              <p className="mt-4 font-serif text-headline-md md:text-headline-lg">{formatRupiah(1490000)}</p>
              <p className="mt-3 text-caption text-ink-2">Rupiah, tanpa angka desimal.</p>
            </div>
            <div className="rounded-card border border-line bg-surface p-6 shadow-card">
              <p className="text-label font-semibold uppercase tracking-widest text-ink-2">Contoh tanggal</p>
              <p className="mt-4 font-serif text-headline-md md:text-headline-lg">{formatTanggal('2026-10-08T09:00:00+07:00')}</p>
              <p className="mt-3 text-caption text-ink-2">Tanggal contoh · Waktu Indonesia Barat</p>
            </div>
          </div>
        </SpecimenSection>
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-margin-mobile py-7 text-caption text-ink-2 md:px-margin">
          <p><span className="font-semibold text-ink">SOLEHOUSE</span> · Panduan visual</p>
          <p>Fondasi untuk setiap langkah berikutnya.</p>
        </div>
      </footer>
    </>
  )
}
