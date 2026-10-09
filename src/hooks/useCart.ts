import { useContext } from 'react'
import { CommerceContext } from '../store/CommerceContext'
import { resolveItems } from '../lib/commerce'

export function useCommerce() {
  const context = useContext(CommerceContext)
  if (!context) throw new Error('CommerceProvider diperlukan.')
  return context
}

export function useCart() {
  const { data, store, products } = useCommerce()
  return { ...data.cart, ...store, products, lines: resolveItems(data.cart.items, products), count: data.cart.items.reduce((sum, item) => sum + item.qty, 0) }
}

export function useProducts() { return useCommerce().products }
