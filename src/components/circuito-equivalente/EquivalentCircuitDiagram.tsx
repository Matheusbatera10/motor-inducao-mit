import { useState } from 'react'
import { resistenciaFicticia } from '../../content/formulas'

const Rr = 1.2

export function EquivalentCircuitDiagram() {
  const [sVal, setSVal] = useState(0.05)
  const rFicticia = resistenciaFicticia(Rr, sVal)
  const displayR = Number.isFinite(rFicticia) ? rFicticia.toFixed(2) : '∞'
  // bar scaled with a soft cap for legibility (grows fast as s -> 0)
  const barWidth = Math.min(100, (Math.log10(rFicticia + 1) / Math.log10(50)) * 100)

  return (
    <div className="border border-line/30 bg-surface rounded p-5 grid-mesh">
      <h3 className="text-lg mb-4">Circuito Equivalente por Fase</h3>

      <svg viewBox="0 0 640 200" className="w-full h-auto">
        {/* source */}
        <text x={10} y={70} fontSize={12} fill="var(--color-muted)" fontFamily="var(--font-mono)">Vas</text>
        <line x1={30} y1={40} x2={30} y2={160} stroke="var(--color-muted)" strokeWidth={1.5} />
        <line x1={30} y1={100} x2={70} y2={100} stroke="var(--color-muted)" strokeWidth={1.5} />

        {/* Stator branch: Rs + jXls */}
        <g stroke="var(--color-line)" strokeWidth={1.5} fill="none">
          <rect x={70} y={90} width={60} height={20} />
          <line x1={130} y1={100} x2={175} y2={100} />
          <rect x={175} y={90} width={60} height={20} />
        </g>
        <text x={100} y={85} fontSize={11} textAnchor="middle" fill="var(--color-line)" fontFamily="var(--font-mono)">Rs</text>
        <text x={205} y={85} fontSize={11} textAnchor="middle" fill="var(--color-line)" fontFamily="var(--font-mono)">jXls</text>

        <line x1={235} y1={100} x2={280} y2={100} stroke="var(--color-line)" strokeWidth={1.5} />

        {/* Magnetizing branch (parallel) */}
        <line x1={280} y1={40} x2={280} y2={160} stroke="var(--color-muted)" strokeWidth={1.5} />
        <g stroke="var(--color-muted)" strokeWidth={1.5} fill="none">
          <rect x={230} y={30} width={50} height={18} />
          <rect x={230} y={152} width={50} height={18} />
        </g>
        <text x={255} y={26} fontSize={11} textAnchor="middle" fill="var(--color-muted)" fontFamily="var(--font-mono)">Rc</text>
        <text x={255} y={185} fontSize={11} textAnchor="middle" fill="var(--color-muted)" fontFamily="var(--font-mono)">jXm</text>
        <line x1={280} y1={100} x2={330} y2={100} stroke="var(--color-accent)" strokeWidth={1.5} />

        {/* Rotor branch: jXlr + Rr + (1-s)Rr/s */}
        <g stroke="var(--color-accent)" strokeWidth={1.5} fill="none">
          <rect x={330} y={90} width={55} height={20} />
          <rect x={400} y={90} width={55} height={20} />
          <rect x={470} y={90} width={110} height={20} />
        </g>
        <text x={357} y={85} fontSize={11} textAnchor="middle" fill="var(--color-accent)" fontFamily="var(--font-mono)">jXlr</text>
        <text x={427} y={85} fontSize={11} textAnchor="middle" fill="var(--color-accent)" fontFamily="var(--font-mono)">Rr</text>
        <text x={525} y={85} fontSize={11} textAnchor="middle" fill="var(--color-accent)" fontFamily="var(--font-mono)">(1-s)Rr/s</text>
        <line x1={385} y1={100} x2={400} y2={100} stroke="var(--color-accent)" strokeWidth={1.5} />
        <line x1={455} y1={100} x2={470} y2={100} stroke="var(--color-accent)" strokeWidth={1.5} />

        <line x1={580} y1={100} x2={610} y2={100} stroke="var(--color-accent)" strokeWidth={1.5} />
        <line x1={610} y1={40} x2={610} y2={160} stroke="var(--color-muted)" strokeWidth={1.5} />
        <line x1={30} y1={40} x2={610} y2={40} stroke="var(--color-muted)" strokeWidth={1.5} />

        <text x={525} y={72} fontSize={9} textAnchor="middle" fill="var(--color-muted)" fontFamily="var(--font-mono)">
          potência mecânica convertida
        </text>
      </svg>

      <div className="mt-4">
        <label className="flex flex-col gap-1 font-mono text-sm max-w-sm">
          <span className="text-muted text-xs">Escorregamento s = {(sVal * 100).toFixed(1)}%</span>
          <input
            type="range"
            min={0.01}
            max={1}
            step={0.01}
            value={sVal}
            onChange={(e) => setSVal(Number(e.target.value))}
            className="accent-[var(--color-accent)]"
          />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mt-4 font-mono text-sm">
        <div className="border border-line/20 rounded px-3 py-2">
          <div className="text-muted text-xs">Resistência fictícia (1-s)Rr/s</div>
          <div className="text-accent text-xl">{displayR} Ω</div>
        </div>
        <div className="border border-line/20 rounded px-3 py-2 flex flex-col justify-center">
          <div className="h-2 bg-bg rounded overflow-hidden">
            <div className="h-full bg-accent transition-all" style={{ width: `${barWidth}%` }} />
          </div>
          <div className="text-muted text-xs mt-1">cresce conforme s → 0 (rotor perto da síncrona)</div>
        </div>
      </div>
    </div>
  )
}
