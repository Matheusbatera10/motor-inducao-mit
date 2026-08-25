import { useState } from 'react'
import { placaIdentificacaoCampos } from '../../content/tables'

export function NameplateExplorer() {
  const [active, setActive] = useState(1)
  const current = placaIdentificacaoCampos.find((c) => c.n === active)!

  return (
    <div className="border border-line/30 bg-surface rounded p-5 grid-mesh">
      <h3 className="text-lg mb-4">Placa de Identificação — clique num campo</h3>

      <div className="border-2 border-line/50 rounded bg-bg p-4 mb-4">
        <div className="text-center font-mono text-xs text-muted uppercase tracking-widest mb-3">
          Motor de Indução Trifásico — NBR 17094
        </div>
        <div className="grid grid-cols-5 sm:grid-cols-9 gap-1.5">
          {placaIdentificacaoCampos.map((c) => (
            <button
              key={c.n}
              onClick={() => setActive(c.n)}
              title={c.campo}
              className={`aspect-square rounded flex items-center justify-center font-mono text-xs border transition-colors ${
                active === c.n
                  ? 'bg-accent text-bg border-accent font-semibold'
                  : 'border-line/30 text-muted hover:text-line hover:border-line'
              }`}
            >
              {c.n}
            </button>
          ))}
        </div>
      </div>

      <div className="border border-line/20 rounded px-4 py-3 font-mono">
        <span className="text-accent text-lg">{current.n}</span>
        <span className="text-muted mx-2">→</span>
        <span className="text-text text-lg">{current.campo}</span>
      </div>
    </div>
  )
}
