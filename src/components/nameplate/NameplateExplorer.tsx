import { useState } from 'react'
import { placaDetalhes, placaIdentificacaoCampos } from '../../content/tables'

type Motor = 'motor1' | 'motor100'

const MOTORES: { key: Motor; label: string }[] = [
  { key: 'motor1', label: 'Motor de 1 cv' },
  { key: 'motor100', label: 'Motor de 100 cv' },
]

export function NameplateExplorer() {
  const [active, setActive] = useState(12)
  const [motor, setMotor] = useState<Motor>('motor100')
  const current = placaIdentificacaoCampos.find((c) => c.n === active)!
  const detalhe = placaDetalhes[active]

  return (
    <div className="border border-line/30 bg-surface rounded p-5 grid-mesh">
      <h3 className="text-lg mb-3">Placa de identificação: clique num campo</h3>

      <div className="flex flex-wrap gap-2 mb-4">
        {MOTORES.map((m) => (
          <button
            key={m.key}
            onClick={() => setMotor(m.key)}
            className={`px-3 py-1.5 rounded font-mono text-sm ${
              motor === m.key ? 'bg-line text-bg font-semibold' : 'bg-bg text-muted hover:text-text'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="border-2 border-line/50 rounded bg-bg p-4 mb-4">
        <div className="text-center font-mono text-xs text-muted uppercase tracking-widest mb-3">
          Motor de indução trifásico · NBR 17094
        </div>
        <div className="grid grid-cols-5 sm:grid-cols-9 gap-1.5">
          {placaIdentificacaoCampos.map((c) => (
            <button
              key={c.n}
              onClick={() => setActive(c.n)}
              title={c.campo}
              aria-label={`Campo ${c.n}: ${c.campo}`}
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

      <div className="border border-line/20 rounded bg-bg/60 px-4 py-4">
        <div className="font-mono">
          <span className="text-accent text-lg">{current.n}</span>
          <span className="text-muted mx-2">→</span>
          <span className="text-text text-lg">{current.campo}</span>
        </div>
        <div className="mt-2 font-mono text-sm">
          <span className="text-muted">Nesta placa: </span>
          <span data-placa="valor" className="text-accent font-semibold">{detalhe[motor]}</span>
        </div>
        <p className="mt-3 text-text/90 leading-relaxed">{detalhe.oQueE}</p>
        <p className="mt-2 text-muted leading-relaxed">
          <span className="text-line font-semibold">Na prova: </span>
          {detalhe.prova}
        </p>
      </div>

      <p className="text-muted text-xs font-mono mt-3 leading-relaxed">
        A numeração segue a legenda da Tabela 3.38 da apostila. Nas setas da placa de 1 cv, a figura usa 26, 27 e 28 para
        Ip/In, categoria e corrente no FS, enquanto a legenda usa 25, 26 e 27. Guarde o nome do campo, não o número.
      </p>
    </div>
  )
}
