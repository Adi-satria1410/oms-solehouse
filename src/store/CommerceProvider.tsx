import { useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from 'react'
import { products as seedProducts } from '../data/products'
import { availableProducts } from '../lib/commerce'
import { CommerceContext } from './CommerceContext'
import { COMMERCE_KEY, createCommerceStore } from './commerceStore'

export default function CommerceProvider({ children }: { children: ReactNode }) {
  const [store] = useState(() => { try { return createCommerceStore(window.localStorage) } catch { return createCommerceStore() } })
  const snapshot = useSyncExternalStore(store.subscribe, store.getSnapshot)
  const products = useMemo(() => availableProducts(seedProducts, snapshot.data.orders), [snapshot.data.orders])
  useEffect(() => {
    const sync = (event: StorageEvent) => { if (event.key === COMMERCE_KEY) store.sync() }
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [store])
  return <CommerceContext.Provider value={{ ...snapshot, store, products }}>{children}</CommerceContext.Provider>
}
