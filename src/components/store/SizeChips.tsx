export default function SizeChips({ stock, selected, onSelect, compact = false }: { stock: Record<number, number>; selected?: number; onSelect: (size: number) => void; compact?: boolean }) {
  return <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih ukuran EU">
    {Object.entries(stock).map(([key, qty]) => {
      const size = Number(key)
      return <button key={size} type="button" disabled={qty === 0} aria-pressed={selected === size} aria-label={`EU ${size}${qty === 0 ? ', habis' : qty < 3 ? `, sisa ${qty}` : ''}`} onClick={() => onSelect(size)}
        className={`flex min-h-11 min-w-11 flex-col items-center justify-center rounded-chip border px-2 py-2 text-caption ${selected === size ? 'border-ink bg-ink text-surface' : 'border-line bg-surface hover:border-ink'} disabled:cursor-not-allowed disabled:bg-base disabled:text-ink-3`}>
        <span className={qty === 0 ? 'line-through' : ''}>{size}</span>
        {!compact && qty < 3 && <span className={`mt-1 text-[9px] ${selected === size ? 'text-surface' : 'text-accent-hover'}`}>{qty === 0 ? 'Habis' : `Sisa ${qty}!`}</span>}
      </button>
    })}
  </div>
}
