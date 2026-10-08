import { useSyncExternalStore } from 'react'

const key = 'solehouse:wishlist'
let ids: string[] = []
try {
  const saved: unknown = JSON.parse(localStorage.getItem(key) ?? '[]')
  if (Array.isArray(saved)) ids = saved.filter((id): id is string => typeof id === 'string')
} catch { /* Penyimpanan opsional; favorit tetap dapat dipakai selama sesi. */ }
const listeners = new Set<() => void>()
const subscribe = (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener) } }
const snapshot = () => ids

export function useWishlist() {
  const current = useSyncExternalStore(subscribe, snapshot)
  const toggle = (id: string) => {
    ids = ids.includes(id) ? ids.filter(item => item !== id) : [...ids, id]
    try { localStorage.setItem(key, JSON.stringify(ids)) } catch { /* Mode privat atau kuota penuh. */ }
    listeners.forEach(listener => listener())
  }
  return { ids: current, toggle }
}
