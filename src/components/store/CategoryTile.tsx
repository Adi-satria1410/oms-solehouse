import { Link } from 'react-router-dom'
import Icon from '../ui/Icon'

export default function CategoryTile({ category, large = false }: { category: { value: string; label: string; image: string }; large?: boolean }) {
  return <Link to={`/katalog?kategori=${category.value}`} className={`group relative flex min-h-52 items-end overflow-hidden rounded-card bg-sand p-5 text-surface ${large ? 'sm:col-span-2 sm:row-span-2 sm:min-h-[28rem]' : ''}`}>
    <img src={category.image} alt={category.label} loading="lazy" width={512} height={400} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
    <div className="absolute inset-0 bg-linear-to-t from-ink/85 via-ink/10 to-transparent" />
    <div className="relative flex w-full items-end justify-between gap-3"><div><span className="text-[10px] uppercase tracking-widest text-sand">Temukan koleksi</span><h3 className={`mt-2 font-serif ${large ? 'text-headline-md' : 'text-headline-sm'}`}>{category.label}</h3></div><Icon name="arrow_outward" /></div>
  </Link>
}
