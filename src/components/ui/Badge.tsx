import type { ReactNode } from 'react'

const tones = { accent: 'bg-accent text-surface', olive: 'bg-olive text-surface', ink: 'bg-ink text-surface', neutral: 'bg-base text-ink-2' }
export default function Badge({ children, tone = 'neutral' }: { children: ReactNode; tone?: keyof typeof tones }) {
  return <span className={`inline-flex items-center rounded-pill px-3 py-1 text-[10px] font-semibold uppercase tracking-wide ${tones[tone]}`}>{children}</span>
}
