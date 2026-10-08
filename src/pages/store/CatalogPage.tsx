import { useSearchParams } from 'react-router-dom'
import PlaceholderPage from '../PlaceholderPage'

const collectionTitles: Record<string, string> = { pria: 'Koleksi Pria', wanita: 'Koleksi Wanita', anak: 'Koleksi Anak' }

export default function CatalogPage() {
  const [params] = useSearchParams()
  const title = params.get('sale') === 'true' ? 'Sale' : params.has('cari') ? 'Cari Produk' : collectionTitles[params.get('koleksi') ?? ''] ?? 'Katalog Produk'
  return <PlaceholderPage title={title} description="Temukan karakter langkah Anda dalam koleksi sepatu SOLEHOUSE. Pilihan produk segera tersedia." icon="steps" />
}
