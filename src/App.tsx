import DesignSystemPage from './pages/DesignSystemPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import StoreLayout from './layouts/StoreLayout'
import AdminLayout from './layouts/AdminLayout'
import PlaceholderPage from './pages/PlaceholderPage'
import CatalogPage from './pages/store/CatalogPage'
import HomePage from './pages/store/HomePage'
import ProductDetailPage from './pages/store/ProductDetailPage'
import WishlistPage from './pages/store/WishlistPage'
import LoginPage from './pages/admin/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import RouteEffects from './components/ui/RouteEffects'
import { adminNavigation, helpPages } from './data/navigation'
import CommerceProvider from './store/CommerceProvider'
import CartPage from './pages/store/CartPage'
import CheckoutPage from './pages/store/CheckoutPage'
import OrderConfirmationPage from './pages/store/OrderConfirmationPage'

export default function App() {
  return (
    <CommerceProvider><BrowserRouter>
      <RouteEffects />
      <Routes>
        <Route element={<StoreLayout />}>
          <Route index element={<HomePage />} />
          <Route path="katalog" element={<CatalogPage />} />
          <Route path="produk/:slug" element={<ProductDetailPage />} />
          <Route path="keranjang" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="checkout/konfirmasi/:orderId" element={<OrderConfirmationPage />} />
          <Route path="lacak" element={<PlaceholderPage title="Lacak Pesanan" description="Ikuti perjalanan pesanan Anda, dari studio hingga tiba di rumah." icon="local_shipping" />} />
          <Route path="lacak/:orderId" element={<PlaceholderPage title="Lacak Pesanan" description="Riwayat perjalanan pesanan akan ditampilkan di sini." icon="local_shipping" />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="akun" element={<PlaceholderPage title="Akun Saya" description="Informasi akun dan riwayat belanja akan tersedia di sini." icon="person" />} />
          {helpPages.map(page => <Route key={page.path} path={page.path} element={<PlaceholderPage title={page.title} description="Informasi lengkap sedang disiapkan oleh tim SOLEHOUSE." icon="help" />} />)}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="admin/login" element={<LoginPage />} />
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<PlaceholderPage title="Dashboard" description="Ringkasan toko dan pesanan akan tersedia di sini." icon="space_dashboard" admin action={{ to: '/admin/pesanan', label: 'Lihat halaman pesanan' }} />} />
          {adminNavigation.filter(item => item.to !== '/admin').map(item => (
            <Route key={item.to} path={item.to.replace('/admin/', '')} element={<PlaceholderPage title={item.label} description={item.description} icon={item.icon} admin />} />
          ))}
          <Route path="pesanan/:orderId" element={<PlaceholderPage title="Detail Pesanan" description="Item, pembayaran, pelanggan, dan riwayat pesanan akan tersedia di sini." icon="receipt_long" admin action={{ to: '/admin/pesanan', label: 'Kembali ke pesanan' }} />} />
          <Route path="notifikasi" element={<PlaceholderPage title="Notifikasi" description="Pembaruan pesanan dan informasi toko akan tersedia di sini." icon="notifications" admin />} />
          <Route path="*" element={<NotFoundPage admin />} />
        </Route>
        <Route path="panduan-visual" element={<DesignSystemPage />} />
      </Routes>
    </BrowserRouter></CommerceProvider>
  )
}
