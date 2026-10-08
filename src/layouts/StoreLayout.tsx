import { Outlet } from 'react-router-dom'
import StoreHeader from '../components/store/StoreHeader'
import StoreFooter from '../components/store/StoreFooter'
import StoreBottomBar from '../components/store/StoreBottomBar'

export default function StoreLayout() {
  return (
    <div className="flex min-h-dvh flex-col pb-[calc(4rem+env(safe-area-inset-bottom))] lg:pb-0">
      <a href="#konten" className="skip-link">Langsung ke konten</a>
      <StoreHeader />
      <main id="konten" tabIndex={-1} className="mx-auto w-full max-w-7xl flex-1 px-margin-mobile py-10 outline-none md:px-margin md:py-14"><Outlet /></main>
      <StoreFooter />
      <StoreBottomBar />
    </div>
  )
}
