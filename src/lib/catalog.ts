import type { Product } from '../types'

export const filterKeys = ['kategori', 'koleksi', 'ukuran', 'warna', 'min', 'max', 'material', 'stok', 'sale', 'cari', 'baru']
export const values = (params: URLSearchParams, key: string) => (params.get(key) ?? '').split(',').filter(Boolean)
const amount = (value: string | null, fallback: number) => value !== null && value.trim() !== '' && Number.isFinite(Number(value)) ? Math.max(0, Number(value)) : fallback

export function filterProducts(products: Product[], params: URLSearchParams): Product[] {
  const categories = values(params, 'kategori')
  const sizes = values(params, 'ukuran').map(Number)
  const colors = values(params, 'warna')
  const materials = values(params, 'material')
  const search = (params.get('cari') ?? '').trim().toLocaleLowerCase('id-ID')
  return products.filter(product => {
    if (categories.length && !categories.includes(product.category)) return false
    if (params.get('koleksi') && product.collection !== params.get('koleksi')) return false
    if (params.get('sale') === 'true' && !(product.comparePrice && product.comparePrice > product.price)) return false
    if (params.get('baru') === 'true' && product.badge !== 'new') return false
    if (materials.length && !materials.includes(product.material)) return false
    if (product.price < amount(params.get('min'), 0) || product.price > amount(params.get('max'), Infinity)) return false
    if (search && !`${product.name} ${product.sku} ${product.material}`.toLocaleLowerCase('id-ID').includes(search)) return false
    return product.variants.some(variant => {
      if (colors.length && !colors.includes(variant.color)) return false
      const quantities = Object.entries(variant.stock).filter(([size]) => !sizes.length || sizes.includes(Number(size))).map(([, qty]) => qty)
      if (params.get('stok') === 'habis') return quantities.length > 0 && quantities.every(qty => qty === 0)
      if (params.get('stok') === 'tipis') return quantities.some(qty => qty > 0 && qty < 3)
      if (params.get('stok') === 'tersedia' || sizes.length) return quantities.some(qty => qty > 0)
      return true
    })
  }).sort((a, b) => {
    switch (params.get('urut')) {
      case 'harga-rendah': return a.price - b.price
      case 'harga-tinggi': return b.price - a.price
      case 'terbaru': return b.releasedAt.localeCompare(a.releasedAt)
      case 'rating': return b.rating - a.rating
      default: return b.reviewCount - a.reviewCount
    }
  })
}

export function paginateProducts(products: Product[], params: URLSearchParams) {
  const perPage = [12, 24, 48].includes(Number(params.get('tampil'))) ? Number(params.get('tampil')) : 12
  const totalPages = Math.max(1, Math.ceil(products.length / perPage))
  const requestedPage = Number(params.get('halaman'))
  const page = Number.isSafeInteger(requestedPage) ? Math.max(1, Math.min(totalPages, requestedPage)) : 1
  return { page, perPage, totalPages, items: products.slice((page - 1) * perPage, page * perPage) }
}
