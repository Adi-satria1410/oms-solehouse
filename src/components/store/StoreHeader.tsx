import { Link } from 'react-router-dom'
import Brand from '../ui/Brand'
import Icon from '../ui/Icon'
import NavigationDrawer from '../ui/NavigationDrawer'
import StoreNavigation from './StoreNavigation'

export default function StoreHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-base/95 backdrop-blur-md">
      <div className="bg-ink px-5 py-2 text-center text-[10px] leading-4 tracking-wide text-base sm:text-label">
        Sepatu artisan, dibuat dengan ketelitian untuk setiap langkah.
      </div>
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-2 px-margin-mobile py-4 lg:gap-5 lg:px-margin">
        <Brand />
        <StoreNavigation />
        <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
          <Link to="/katalog?cari=" aria-label="Cari produk" className="hidden size-11 items-center justify-center rounded-full hover:bg-sand sm:inline-flex"><Icon name="search" /></Link>
          <Link to="/wishlist" aria-label="Favorit saya" className="hidden size-11 items-center justify-center rounded-full hover:bg-sand sm:inline-flex"><Icon name="favorite" /></Link>
          <Link to="/keranjang" aria-label="Keranjang belanja, 0 item" className="relative inline-flex size-11 items-center justify-center rounded-full hover:bg-sand">
            <Icon name="shopping_bag" />
            <span className="absolute right-0 top-0 flex size-[18px] items-center justify-center rounded-full bg-ink text-[10px] text-surface">0</span>
          </Link>
          <Link to="/akun" aria-label="Akun saya" className="hidden size-11 items-center justify-center rounded-full hover:bg-sand sm:inline-flex"><Icon name="person" /></Link>
          <NavigationDrawer title="Menu toko">
            <Brand />
            <div className="mt-6"><StoreNavigation mobile /></div>
            <div className="mt-6 grid gap-1 border-t border-line pt-4 text-body-sm">
              <Link className="flex min-h-11 items-center gap-3" to="/katalog?cari="><Icon name="search" size={20} />Cari produk</Link>
              <Link className="flex min-h-11 items-center gap-3" to="/wishlist"><Icon name="favorite" size={20} />Favorit saya</Link>
              <Link className="flex min-h-11 items-center gap-3" to="/akun"><Icon name="person" size={20} />Akun saya</Link>
            </div>
          </NavigationDrawer>
        </div>
      </div>
    </header>
  )
}
