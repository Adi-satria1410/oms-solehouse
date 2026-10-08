import type { ReactNode } from 'react'

type SpecimenSectionProps = {
  id: string
  number: string
  title: string
  description: string
  children: ReactNode
}

export default function SpecimenSection({ id, number, title, description, children }: SpecimenSectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line py-10 md:py-14">
      <div className="mb-7 flex items-start gap-4">
        <span className="pt-2 text-label font-semibold text-accent-hover">{number}</span>
        <div>
          <h2 id={`${id}-title`} className="font-serif text-headline-md font-medium">{title}</h2>
          <p className="mt-2 max-w-2xl text-body-sm text-ink-2">{description}</p>
        </div>
      </div>
      {children}
    </section>
  )
}
