import { X } from 'lucide-react'
import { getPartInfo } from './partsData'

export function PartInfoCard({ partId, onClose }: { partId: string; onClose: () => void }) {
  const info = getPartInfo(partId)
  if (!info) return null

  return (
    <div className="absolute top-4 right-4 max-w-xs border border-line/40 bg-surface/95 backdrop-blur rounded p-4 shadow-xl">
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-lg leading-tight">{info.nome}</h4>
        <button onClick={onClose} aria-label="Fechar" className="text-muted hover:text-text shrink-0">
          <X size={18} />
        </button>
      </div>
      <p className="text-text/90 font-mono text-sm mt-2 leading-relaxed">{info.texto}</p>
    </div>
  )
}
