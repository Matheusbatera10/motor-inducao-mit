import { useState } from 'react'
import { ED_S3, ED_S4, ED_S5, ED_S6 } from '../../content/formulas'

type Regime = 'S3' | 'S4' | 'S5' | 'S6' | 'S7'

const FORMULAS: Record<Regime, string> = {
  S3: 'ED = tN / (tN + tR)',
  S4: 'ED = (tN + tD) / (tN + tD + tR)',
  S5: 'ED = (tN + tD + tF) / (tN + tD + tF + tR)',
  S6: 'ED = tN / (tN + tV)',
  S7: 'ED = 100%, pois não há período de repouso',
}

function CampoTempo({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-muted text-xs">{label}</span>
      <input
        type="number"
        min={0}
        value={value}
        onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
        className="bg-bg border border-line/40 rounded px-2 py-1.5 text-text"
      />
    </label>
  )
}

export function DutyCycleCalculator() {
  const [regime, setRegime] = useState<Regime>('S3')
  const [tN, setTN] = useState(10)
  const [tD, setTD] = useState(2)
  const [tF, setTF] = useState(1)
  const [tR, setTR] = useState(20)
  const [tV, setTV] = useState(20)

  let ed = 100
  if (regime === 'S3') ed = ED_S3(tN, tR)
  else if (regime === 'S4') ed = ED_S4(tN, tD, tR)
  else if (regime === 'S5') ed = ED_S5(tN, tD, tF, tR)
  else if (regime === 'S6') ed = ED_S6(tN, tV)

  return (
    <div className="border border-line/30 bg-surface rounded p-5 grid-mesh">
      <h3 className="text-lg mb-1">Fator de Duração do Ciclo (ED)</h3>
      <p className="text-muted text-xs font-mono mb-4">{FORMULAS[regime]}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {(['S3', 'S4', 'S5', 'S6', 'S7'] as Regime[]).map((r) => (
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

      {regime !== 'S7' && (
        <div className="grid sm:grid-cols-3 gap-4 font-mono text-sm">
          <CampoTempo label="tN: carga constante (min)" value={tN} onChange={setTN} />
          {(regime === 'S4' || regime === 'S5') && <CampoTempo label="tD: partida (min)" value={tD} onChange={setTD} />}
          {regime === 'S5' && <CampoTempo label="tF: frenagem (min)" value={tF} onChange={setTF} />}
          {regime === 'S6' ? (
            <CampoTempo label="tV: em vazio (min)" value={tV} onChange={setTV} />
          ) : (
            <CampoTempo label="tR: repouso (min)" value={tR} onChange={setTR} />
          )}
        </div>
      )}

      <div className="mt-4 border border-line/20 rounded px-4 py-3 inline-block">
        <div className="text-muted text-xs font-mono">ED ({regime})</div>
        <div data-resultado="ed" className="text-accent text-2xl font-mono">
          {Number.isFinite(ed) ? `${ed.toFixed(1)}%` : 'Informe os tempos'}
        </div>
      </div>
    </div>
  )
}
