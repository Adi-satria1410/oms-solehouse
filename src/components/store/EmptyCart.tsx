import { Link } from 'react-router-dom'
import { useCommerce } from '../../hooks/useCart'
import Icon from '../ui/Icon'

export default function EmptyCart() {
  const { data } = useCommerce()
  const recent = data.orders[0]
  return <section className="rounded-card border border-line bg-surface px-5 py-14 text-center"><Icon name="shopping_bag" size={46} /><h2 className="mt-4 font-serif text-headline-md">Belum ada pasangan di keranjang.</h2><p className="mx-auto mt-3 max-w-md text-body-sm text-ink-2">Jelajahi koleksi, pilih warna dan ukuran, lalu temukan sepatu untuk langkah Anda.</p><Link to="/katalog" className="primary-link mt-6">Jelajahi katalog<Icon name="arrow_forward" size={18} /></Link>{recent && <p className="mt-6 text-body-sm"><Link className="underline underline-offset-4" to={`/checkout/konfirmasi/${recent.id}`}>Buka pesanan terakhir · {recent.id}</Link></p>}</section>
}
