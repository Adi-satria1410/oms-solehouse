import { useEffect, useId, useRef, type ReactNode } from 'react'
import Icon from './Icon'

export default function Modal({ title, open, onClose, children }: { title: string; open: boolean; onClose: () => void; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null)
  const id = useId()
  useEffect(() => {
    const dialog = ref.current
    if (!open) { dialog?.close(); return }
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null
    dialog?.showModal()
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { dialog?.close(); document.body.style.overflow = overflow; trigger?.focus() }
  }, [open])
  return (
    <dialog ref={ref} aria-labelledby={id} onCancel={event => { event.preventDefault(); onClose() }}
      onClick={event => { if (event.target === event.currentTarget) onClose() }}
      onKeyDown={event => {
        if (event.key !== 'Tab') return
        const controls = [...event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], input, select, [tabindex="0"]')].filter(el => el.getClientRects().length)
        const first = controls[0], last = controls[controls.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
      }} className="m-auto max-h-[85dvh] w-[calc(100%_-_2.5rem)] max-w-2xl overflow-y-auto rounded-card border border-line bg-surface p-0 text-ink shadow-lift backdrop:bg-ink/60">
      <div className="p-5 sm:p-8">
        <div className="mb-5 flex items-center justify-between gap-4"><h2 id={id} className="font-serif text-headline-sm">{title}</h2><button type="button" onClick={onClose} aria-label={`Tutup ${title.toLowerCase()}`} className="inline-flex size-11 shrink-0 items-center justify-center rounded-full hover:bg-base"><Icon name="close" /></button></div>
        {children}
      </div>
    </dialog>
  )
}
