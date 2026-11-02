import { useState } from 'react'
import { f2, ns, s } from '../../content/formulas'

export function EscorregamentoCalculator() {
  const [p, setP] = useState(4)
  const [f, setF] = useState(60)
  const [n, setN] = useState(1746)

  const nsVal = ns(f, p)
  const sVal = s(nsVal, n)
  const f2Val = f2(sVal, f)
  const entradaValida = f > 0 && n >= 0
  const acimaDaSincrona = entradaValida && n > nsVal

  return (
    <div className="border border-line/30 bg-surface rounded p-5 grid-mesh">
      <h3 className="text-lg mb-4">Calculadora de Escorregamento</h3>
      <div className="grid sm:grid-cols-3 gap-4 font-mono text-sm">
        <label className="flex flex-col gap-1">
          <span className="text-muted text-xs">Nº de polos (p)</span>
          <select
            value={p}
            onChange={(e) => setP(Number(e.target.value))}
            className="bg-bg border border-line/40 rounded px-2 py-1.5 text-text"
          >
            {[2, 4, 6, 8, 10, 12].map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-muted text-xs">Frequência f (Hz)</span>
          <input
            type="number"
            value={f}
            onChange={(e) => setF(Number(e.target.value))}
            className="bg-bg border border-line/40 rounded px-2 py-1.5 text-text"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-muted text-xs">Rotação do rotor n (rpm)</span>
          <input
            type="number"
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
            className="bg-bg border border-line/40 rounded px-2 py-1.5 text-text"
          />
        </label>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 mt-5 font-mono text-sm">
        <div className="border border-line/20 rounded px-3 py-2">
          <div className="text-muted text-xs">Velocidade síncrona</div>
          <div className="text-accent text-xl">{entradaValida ? `${nsVal.toFixed(1)} rpm` : '—'}</div>
        </div>
        <div className="border border-line/20 rounded px-3 py-2">
          <div className="text-muted text-xs">Escorregamento (s)</div>
          <div data-resultado="s" className="text-accent text-xl">{entradaValida ? `${(sVal * 100).toFixed(2)}%` : '—'}</div>
        </div>
        <div className="border border-line/20 rounded px-3 py-2">
          <div className="text-muted text-xs">Frequência no rotor (f2)</div>
          <div className="text-accent text-xl">{entradaValida ? `${Math.abs(f2Val).toFixed(2)} Hz` : '—'}</div>
        </div>
      </div>
      {!entradaValida && (
        <p className="text-muted text-xs font-mono mt-3">Informe frequência maior que zero e rotação não negativa.</p>
      )}
      {acimaDaSincrona && (
        <p className="text-muted text-xs font-mono mt-3">
          Rotação acima de ns: como motor isso não acontece, pois o rotor sempre gira abaixo da velocidade síncrona.
        </p>
      )}
    </div>
  )
}
