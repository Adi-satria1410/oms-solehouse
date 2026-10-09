import { createContext } from 'react'
import type { Product } from '../types'
import type { createCommerceStore } from './commerceStore'

export type CommerceStore = ReturnType<typeof createCommerceStore>
export const CommerceContext = createContext<(ReturnType<CommerceStore['getSnapshot']> & { store: CommerceStore; products: Product[] }) | null>(null)
