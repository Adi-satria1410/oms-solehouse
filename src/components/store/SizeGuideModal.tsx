import Modal from '../ui/Modal'

const sizeRows = [
  [36, 23, 4, 3], [37, 23.5, 5, 4], [38, 24, 6, 5],
  [39, 24.5, 6.5, 5.5], [40, 25, 7, 6], [41, 26, 8, 7],
  [42, 26.5, 8.5, 7.5], [43, 27.5, 9.5, 8.5], [44, 28, 10, 9],
  [45, 29, 11, 10], [46, 29.5, 12, 11],
]

export default function SizeGuideModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return <Modal title="Panduan ukuran" open={open} onClose={onClose}>
    <p className="mb-5 text-body-sm text-ink-2">Panduan ukuran contoh SOLEHOUSE. Panjang kaki dan bentuk model dapat memengaruhi kenyamanan; tabel ini adalah acuan awal.</p>
    <div className="overflow-x-auto"><table className="w-full text-left text-body-sm"><caption className="sr-only">Konversi ukuran EU, panjang kaki, US pria, dan UK</caption><thead className="bg-base"><tr>{['EU', 'Panjang kaki (cm)', 'US pria', 'UK'].map(label => <th key={label} scope="col" className="p-3 text-label">{label}</th>)}</tr></thead><tbody>
      {sizeRows.map(([eu, cm, us, uk]) => <tr key={eu} className="border-b border-line"><th scope="row" className="p-3">{eu}</th><td className="p-3">{cm.toFixed(1)}</td><td className="p-3">{us}</td><td className="p-3">{uk}</td></tr>)}
    </tbody></table></div>
    <h3 className="mt-6 font-semibold">Cara mengukur kaki</h3><ol className="mt-3 list-decimal space-y-2 pl-5 text-body-sm text-ink-2"><li>Letakkan kertas di lantai dan berdiri dengan tumit menempel ke dinding.</li><li>Tandai ujung jari terpanjang, lalu ukur jaraknya dari tumit.</li><li>Ukur kedua kaki pada sore hari. Gunakan ukuran kaki yang lebih panjang.</li><li>Jika berada di antara dua ukuran, pilih ukuran lebih besar dan konsultasikan bentuk kaki Anda.</li></ol>
  </Modal>
}
