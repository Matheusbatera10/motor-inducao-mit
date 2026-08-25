import { useState } from 'react'
import { ED_S3, ED_S4, ED_S6 } from '../../content/formulas'

type Regime = 'S3' | 'S4' | 'S6'

export function DutyCycleCalculator() {
  const [regime, setRegime] = useState<Regime>('S3')
  const [tN, setTN] = useState(10)
  const [tD, setTD] = useState(2)
  const [tR, setTR] = useState(20)
  const [tV, setTV] = useState(20)

  let ed = 0
  if (regime === 'S3') ed = ED_S3(tN, tR)
  else if (regime === 'S4') ed = ED_S4(tN, tD, tR)
  else ed = ED_S6(tN, tV)

  return (
    <div className="border border-line/30 bg-surface rounded p-5 grid-mesh">
      <h3 className="text-lg mb-1">Fator de Duração do Ciclo (ED)</h3>
      <p className="text-muted text-xs font-mono mb-4">
        Fórmulas completas disponíveis para S3, S4 e S6. Para S5 e S7, que envolvem o tempo de frenagem (tF),
        consulte a seção 3.12 do material original.
      </p>

      <div className="flex gap-2 mb-4">
        {(['S3', 'S4', 'S6'] as Regime[]).map((r) => (
          <button
            key={r}
            onClick={() => setRegime(r)}
            className={`px-3 py-1.5 rounded font-mono text-sm ${
              regime === r ? 'bg-line text-bg font-semibold' : 'bg-bg text-muted hover:text-text'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-3 gap-4 font-mono text-sm">
        <label className="flex flex-col gap-1">
          <span className="text-muted text-xs">tN — tempo em carga constante (min)</span>
          <input type="number" value={tN} onChange={(e) => setTN(Number(e.target.value))} className="bg-bg border border-line/40 rounded px-2 py-1.5 text-text" />
        </label>
        {regime === 'S4' && (
          <label className="flex flex-col gap-1">
            <span className="text-muted text-xs">tD — tempo de partida (min)</span>
            <input type="number" value={tD} onChange={(e) => setTD(Number(e.target.value))} className="bg-bg border border-line/40 rounded px-2 py-1.5 text-text" />
          </label>
        )}
        {regime === 'S6' ? (
          <label className="flex flex-col gap-1">
            <span className="text-muted text-xs">tV — tempo em vazio (min)</span>
            <input type="number" value={tV} onChange={(e) => setTV(Number(e.target.value))} className="bg-bg border border-line/40 rounded px-2 py-1.5 text-text" />
          </label>
        ) : (
          <label className="flex flex-col gap-1">
            <span className="text-muted text-xs">tR — tempo de repouso (min)</span>
            <input type="number" value={tR} onChange={(e) => setTR(Number(e.target.value))} className="bg-bg border border-line/40 rounded px-2 py-1.5 text-text" />
          </label>
        )}
      </div>

      <div className="mt-4 border border-line/20 rounded px-4 py-3 inline-block">
        <div className="text-muted text-xs font-mono">ED ({regime})</div>
        <div className="text-accent text-2xl font-mono">{ed.toFixed(1)}%</div>
      </div>
    </div>
  )
}
