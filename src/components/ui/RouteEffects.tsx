import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function RouteEffects() {
  const { pathname, search } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    const heading = document.querySelector('h1')
    document.title = `${heading?.textContent ?? 'Artisanal Footwear'} — SOLEHOUSE`
  }, [pathname, search])
  return null
}
