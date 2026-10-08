import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Icon from './Icon'

type NavigationDrawerProps = { title: string; children: ReactNode; dark?: boolean }

export default function NavigationDrawer({ title, children, dark = false }: NavigationDrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState(false)
  const id = useId()
  const { key } = useLocation()

  useEffect(() => { dialogRef.current?.close() }, [key])

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const media = window.matchMedia('(min-width: 1024px)')
    const closeOnDesktop = () => { if (media.matches) dialogRef.current?.close() }
    media.addEventListener('change', closeOnDesktop)
    return () => {
      document.body.style.overflow = previousOverflow
      media.removeEventListener('change', closeOnDesktop)
    }
  }, [open])

  return (
    <>
      <button type="button" aria-label={`Buka ${title.toLowerCase()}`} aria-haspopup="dialog" aria-expanded={open} aria-controls={id}
        className="inline-flex size-11 shrink-0 items-center justify-center rounded-full hover:bg-sand lg:hidden"
        onClick={() => { dialogRef.current?.showModal(); setOpen(true) }}>
        <Icon name="menu" />
      </button>
      <dialog ref={dialogRef} id={id} aria-labelledby={`${id}-title`} onClose={() => setOpen(false)}
        onKeyDown={event => {
          if (event.key !== 'Tab') return
          const controls = [...event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not(:disabled), select, input, [tabindex="0"]')]
            .filter(element => element.getClientRects().length > 0)
          const first = controls[0]
          const last = controls[controls.length - 1]
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault()
            last?.focus()
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault()
            first?.focus()
          }
        }}
        onClick={event => { if (event.target === event.currentTarget) dialogRef.current?.close() }}
        className={`navigation-drawer fixed inset-y-0 left-0 m-0 h-dvh max-h-none w-80 max-w-[90vw] border-0 p-0 shadow-lift backdrop:bg-ink/50 ${dark ? 'bg-ink text-surface' : 'bg-base text-ink'}`}>
        <div className="flex min-h-full flex-col p-5">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 id={`${id}-title`} className="font-serif text-headline-sm">{title}</h2>
            <button type="button" aria-label={`Tutup ${title.toLowerCase()}`} className={`inline-flex size-11 items-center justify-center rounded-full ${dark ? 'hover:bg-surface/10' : 'hover:bg-sand'}`} onClick={() => dialogRef.current?.close()}>
              <Icon name="close" />
            </button>
          </div>
          <div onClick={event => { if ((event.target as HTMLElement).closest('a')) dialogRef.current?.close() }}>{children}</div>
        </div>
      </dialog>
    </>
  )
}
