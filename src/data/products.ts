import type { Product, Variant } from '../types'

export const categories: { value: Product['category']; label: string; image: string }[] = [
  { value: 'sneakers', label: 'Sneakers & Kasual', image: '/images/category-1.jpg' },
  { value: 'formal', label: 'Formal & Oxford', image: '/images/category-2.jpg' },
  { value: 'running', label: 'Running & Aktif', image: '/images/category-3.jpg' },
  { value: 'boots', label: 'Boots & Ankle', image: '/images/category-4.jpg' },
  { value: 'mules', label: 'Mules & Slides', image: '/images/category-5.jpg' },
  { value: 'loafers', label: 'Loafers', image: '/images/catalog-3.jpg' },
]

export const colors: { value: Variant['color']; label: string; className: string }[] = [
  { value: 'krem', label: 'Krem', className: 'bg-sand' },
  { value: 'coklat', label: 'Coklat', className: 'bg-accent' },
  { value: 'hitam', label: 'Hitam', className: 'bg-ink' },
  { value: 'taupe', label: 'Taupe', className: 'bg-taupe' },
  { value: 'olive', label: 'Olive', className: 'bg-olive' },
]

type Seed = { name: string; category: Product['category']; collection?: Product['collection']; price: number; comparePrice?: number; badge?: Product['badge']; image: string; material: string; colors: Variant['color'][]; soldOut?: boolean }
const seeds: Seed[] = [
  { name: 'Artisan Grand Sneaker V.1', category: 'sneakers', price: 1490000, comparePrice: 1862500, badge: 'sale', image: 'catalog-1', material: 'Kulit nabati', colors: ['coklat', 'krem'] },
  { name: 'Oxford Classic Tan Brogue', category: 'formal', price: 1790000, badge: 'terlaris', image: 'catalog-2', material: 'Kulit nabati', colors: ['coklat', 'hitam'] },
  { name: 'Vagabond Suede Loafer', category: 'loafers', price: 1290000, badge: 'new', image: 'catalog-3', material: 'Suede', colors: ['taupe', 'coklat'] },
  { name: 'Heritage Moc Toe Boot', category: 'boots', price: 2490000, badge: 'limited', image: 'catalog-4', material: 'Kulit pull-up', colors: ['coklat', 'hitam'] },
  { name: 'Aero Minimal Trainer Putih', category: 'sneakers', collection: 'wanita', price: 1190000, image: 'catalog-5', material: 'Kulit nabati', colors: ['krem', 'taupe'] },
  { name: 'Derby Brogue Espresso', category: 'formal', price: 1890000, image: 'catalog-6', material: 'Kulit nabati', colors: ['coklat', 'hitam'] },
  { name: 'Monk Strap Polished Tan', category: 'formal', price: 2190000, badge: 'limited', image: 'catalog-7', material: 'Kulit nabati', colors: ['coklat', 'hitam'] },
  { name: 'Chelsea Boot Olive Nubuck', category: 'boots', price: 1990000, badge: 'new', image: 'catalog-8', material: 'Nubuck', colors: ['olive', 'taupe'] },
  { name: 'Urban Runner Taupe & Gum', category: 'running', price: 1043000, comparePrice: 1490000, badge: 'sale', image: 'catalog-9', material: 'Suede & kanvas', colors: ['taupe', 'olive'] },
  { name: 'Atelier Leather Mule', category: 'mules', collection: 'wanita', price: 890000, badge: 'new', image: 'category-5', material: 'Kulit nabati', colors: ['coklat', 'krem'] },
  { name: 'Studio Penny Loafer', category: 'loafers', collection: 'wanita', price: 1390000, image: 'home-6', material: 'Suede', colors: ['taupe', 'hitam'], soldOut: true },
  { name: 'Junior Court Sneaker', category: 'sneakers', collection: 'anak', price: 699000, badge: 'new', image: 'home-4', material: 'Kulit nabati', colors: ['krem', 'coklat'] },
  { name: 'Terra Heritage Boot', category: 'boots', price: 2690000, image: 'home-7', material: 'Kulit pull-up', colors: ['coklat', 'olive'] },
  { name: 'Cloud Leather Runner', category: 'running', collection: 'wanita', price: 990000, comparePrice: 1100000, badge: 'sale', image: 'home-2', material: 'Kulit nabati', colors: ['krem', 'taupe'] },
  { name: 'Junior Weekend Sneaker', category: 'sneakers', collection: 'anak', price: 749000, image: 'home-1', material: 'Kulit nabati', colors: ['coklat', 'krem'] },
]

export const products: Product[] = seeds.map((seed, index) => {
  const sku = `SH-${seed.category.slice(0, 3).toUpperCase()}-${String(index + 42).padStart(3, '0')}`
  return {
    id: `product-${index + 1}`, name: seed.name,
    slug: seed.name.toLowerCase().replace('v.1', 'v1').replace(/[^a-z0-9]+/g, '-').replace(/-$/, ''),
    sku, category: seed.category, collection: seed.collection ?? 'pria', material: seed.material,
    price: seed.price, comparePrice: seed.comparePrice, badge: seed.badge,
    rating: index === 0 ? 4.9 : [4.8, 4.7, 4.9, 4.6][index % 4], reviewCount: index === 0 ? 128 : 24 + index * 5,
    releasedAt: `2026-09-${String(index + 1).padStart(2, '0')}`,
    construction: seed.category === 'boots' || seed.category === 'formal' ? 'Jahitan Goodyear Welt' : 'Jahitan Blake dengan sol karet',
    description: `${seed.name} memadukan ${seed.material.toLowerCase()} pilihan dengan siluet yang mudah dipadukan. Dibuat untuk kenyamanan langkah sehari-hari, dengan jahitan rapi dan karakter material yang semakin indah seiring waktu.`,
    images: index === 0 ? [
      { src: '/images/detail-1.jpg', alt: 'Artisan Grand Sneaker di atas pedestal batu' },
      { src: '/images/detail-2.jpg', alt: 'Artisan Grand Sneaker dari samping' },
      { src: '/images/detail-3.jpg', alt: 'Artisan Grand Sneaker tampak atas' },
      { src: '/images/detail-4.jpg', alt: 'Detail jahitan dan tekstur kulit' },
      { src: '/images/detail-5.jpg', alt: 'Detail sol karet sepatu' },
      { src: '/images/detail-6.jpg', alt: 'Artisan Grand Sneaker saat dikenakan' },
    ] : [{ src: `/images/${seed.image}.jpg`, alt: `Referensi model ${seed.name}` }],
    variants: seed.colors.map((color, variantIndex) => ({
      id: `${sku}-${color}`, sku: `${sku}-${color.toUpperCase()}`, color,
      colorName: index === 0 && variantIndex === 0 ? 'Ochre & Tan Welt' : colors.find(item => item.value === color)!.label,
      stock: Object.fromEntries(Array.from({ length: 11 }, (_, offset) => {
        const size = 36 + offset
        const outsideRange = seed.collection === 'anak' ? size > 39 : seed.collection === 'wanita' ? size > 42 : size < 38
        const qty = seed.soldOut || outsideRange || size === (variantIndex === 0 ? 40 : 41) ? 0 : size === 42 ? 2 : 4 + (index + size + variantIndex) % 12
        return [size, qty]
      })),
    })),
  }
})

export const productImage = (product: Product) => product.id === 'product-1' ? '/images/catalog-1.jpg' : product.images[0].src
export const categoryLabel = (category: Product['category']) => categories.find(item => item.value === category)!.label
