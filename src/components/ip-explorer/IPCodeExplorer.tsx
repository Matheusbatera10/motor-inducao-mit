import { useState } from 'react'
import { Droplets, ShieldAlert } from 'lucide-react'
import { ipPrimeiroAlgarismo, ipSegundoAlgarismo } from '../../content/tables'

export function IPCodeExplorer() {
  const [first, setFirst] = useState(4)
  const [second, setSecond] = useState(4)

  const firstDef = ipPrimeiroAlgarismo.find((i) => i.n === first)!
  const secondDef = ipSegundoAlgarismo.find((i) => i.n === second)!

  return (
    <div className="border border-line/30 bg-surface rounded p-5 grid-mesh">
      <h3 className="text-lg mb-4">Explorador de Grau de Proteção (IP)</h3>

      <div className="flex items-center justify-center gap-1 font-mono text-5xl mb-6">
        <span className="text-muted">IP</span>
        <span className="text-accent">{first}</span>
        <span className="text-line">{second}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center gap-2 text-muted text-xs font-mono uppercase tracking-wide mb-2">
            <ShieldAlert size={14} className="text-accent" />
            1º algarismo — corpos sólidos / contato
          </div>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {ipPrimeiroAlgarismo.map((i) => (
              <button
                key={i.n}
                onClick={() => setFirst(i.n)}
                className={`w-9 h-9 rounded font-mono text-sm border transition-colors ${
                  first === i.n ? 'bg-accent text-bg border-accent font-semibold' : 'border-line/30 text-muted hover:text-text'
                }`}
              >
                {i.n}
              </button>
            ))}
          </div>
          <p className="font-mono text-sm text-text/90 border border-line/20 rounded px-3 py-2">{firstDef.label}</p>
        </div>

        <div>
          <div className="flex items-center gap-2 text-muted text-xs font-mono uppercase tracking-wide mb-2">
            <Droplets size={14} className="text-line" />
            2º algarismo — água
          </div>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {ipSegundoAlgarismo.map((i) => (
              <button
                key={i.n}
                onClick={() => setSecond(i.n)}
                className={`w-9 h-9 rounded font-mono text-sm border transition-colors ${
                  second === i.n ? 'bg-line text-bg border-line font-semibold' : 'border-line/30 text-muted hover:text-text'
                }`}
              >
                {i.n}
              </button>
            ))}
          </div>
          <p className="font-mono text-sm text-text/90 border border-line/20 rounded px-3 py-2">{secondDef.label}</p>
        </div>
      </div>

      <p className="text-muted text-xs font-mono mt-4">
        Graus mais usados em baixa tensão: IP21, IP22, IP23 (motores abertos) e IP44 (motor fechado); para ambientes
        rigorosos: IP54, IP55.
      </p>
    </div>
  )
}
