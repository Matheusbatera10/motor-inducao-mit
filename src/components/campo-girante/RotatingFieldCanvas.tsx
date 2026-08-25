import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { PhaseCurrentsChart } from './PhaseCurrentsChart'
import { ns as nsFormula, mecanico } from '../../content/formulas'

const COILS = [
  { label: 'a', phase: 'a', sign: 1, angle: 90 },
  { label: "c'", phase: 'c', sign: -1, angle: 150 },
  { label: 'b', phase: 'b', sign: 1, angle: 210 },
  { label: "a'", phase: 'a', sign: -1, angle: 270 },
  { label: 'c', phase: 'c', sign: 1, angle: 330 },
  { label: "b'", phase: 'b', sign: -1, angle: 30 },
] as const

const PHASE_COLOR: Record<string, string> = {
  a: 'var(--color-accent)',
  b: 'var(--color-line)',
  c: 'var(--color-text)',
}
const PHASE_OFFSET: Record<string, number> = { a: 0, b: 120, c: 240 }

const R = 100
const CX = 140
const CY = 140

function currentAt(thetaDeg: number, phase: string) {
  const rad = ((thetaDeg - PHASE_OFFSET[phase]) * Math.PI) / 180
  return Math.cos(rad)
}

export function RotatingFieldCanvas() {
  const [thetaDeg, setThetaDeg] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [freq, setFreq] = useState(60)
  const [poles, setPoles] = useState(2)
  const raf = useRef<number>(0)
  const last = useRef<number>(0)

  useEffect(() => {
    if (!playing) return
    last.current = performance.now()
    function tick(now: number) {
      const dt = (now - last.current) / 1000
      last.current = now
      setThetaDeg((prev) => (prev + dt * freq * 60) % 360) // 60x slow-motion factor for legibility
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [playing, freq])

  const nsValue = nsFormula(freq, poles)
  const thetaMech = mecanico(thetaDeg, poles) % 360
  const vecRad = ((90 - thetaMech) * Math.PI) / 180 // 0 elec deg -> pointing up (toward coil 'a')
  const vx = CX + R * 0.72 * Math.cos(vecRad)
  const vy = CY - R * 0.72 * Math.sin(vecRad)

  return (
    <div className="border border-line/30 bg-surface rounded p-5 grid-mesh">
      <div className="grid lg:grid-cols-[280px_1fr] gap-6 items-start">
        {/* Cross-section */}
        <div className="flex flex-col items-center">
          <svg viewBox="0 0 280 280" className="w-full max-w-[260px]">
            <circle cx={CX} cy={CY} r={R + 22} fill="none" stroke="var(--color-line)" strokeOpacity={0.25} strokeWidth={1} />
            <circle cx={CX} cy={CY} r={R} fill="none" stroke="var(--color-muted)" strokeWidth={1} strokeDasharray="2 4" />
            {COILS.map((c) => {
              const rad = ((90 - c.angle) * Math.PI) / 180
              const cx = CX + R * Math.cos(rad)
              const cy = CY - R * Math.sin(rad)
              const val = currentAt(thetaDeg, c.phase) * c.sign
              const isOut = val > 0
              const magnitude = Math.abs(val)
              return (
                <g key={c.label}>
                  <circle
                    cx={cx}
                    cy={cy}
                    r={9 + magnitude * 5}
                    fill="none"
                    stroke={PHASE_COLOR[c.phase]}
                    strokeWidth={1.5}
                    opacity={0.4 + magnitude * 0.6}
                  />
                  {isOut ? (
                    <circle cx={cx} cy={cy} r={2.2} fill={PHASE_COLOR[c.phase]} opacity={0.4 + magnitude * 0.6} />
                  ) : (
                    <g opacity={0.4 + magnitude * 0.6} stroke={PHASE_COLOR[c.phase]} strokeWidth={1.5}>
                      <line x1={cx - 4} y1={cy - 4} x2={cx + 4} y2={cy + 4} />
                      <line x1={cx - 4} y1={cy + 4} x2={cx + 4} y2={cy - 4} />
                    </g>
                  )}
                  <text
                    x={cx + (cx > CX ? 14 : cx < CX ? -14 : 0)}
                    y={cy + (cy > CY ? 14 : cy < CY ? -10 : 4)}
                    fontSize={11}
                    fill="var(--color-muted)"
                    fontFamily="var(--font-mono)"
                    textAnchor="middle"
                  >
                    {c.label}
                  </text>
                </g>
              )
            })}
            {/* resultant flux vector */}
            <line x1={CX} y1={CY} x2={vx} y2={vy} stroke="var(--color-accent)" strokeWidth={3} markerEnd="url(#arrow)" />
            <circle cx={CX} cy={CY} r={3} fill="var(--color-accent)" />
            <defs>
              <marker id="arrow" markerWidth={8} markerHeight={8} refX={4} refY={4} orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="var(--color-accent)" />
              </marker>
            </defs>
          </svg>
          <p className="text-muted text-xs font-mono text-center mt-1">
            ⊙ corrente saindo · ⊗ corrente entrando · vetor = fluxo resultante
          </p>
        </div>

        {/* Chart + controls */}
        <div>
          <PhaseCurrentsChart thetaDeg={thetaDeg} onScrub={(d) => { setPlaying(false); setThetaDeg(d) }} />

          <div className="flex flex-wrap items-center gap-4 mt-4">
            <button
              onClick={() => setPlaying((p) => !p)}
              className="flex items-center gap-2 bg-line text-bg font-mono text-sm font-semibold px-3 py-1.5 rounded hover:brightness-110"
            >
              {playing ? <Pause size={16} /> : <Play size={16} />}
              {playing ? 'Pausar' : 'Play'}
            </button>

            <label className="flex items-center gap-2 text-xs font-mono text-muted">
              f = {freq} Hz
              <input
                type="range"
                min={10}
                max={60}
                step={1}
                value={freq}
                onChange={(e) => setFreq(Number(e.target.value))}
                className="accent-[var(--color-accent)]"
              />
            </label>

            <label className="flex items-center gap-2 text-xs font-mono text-muted">
              Polos
              <select
                value={poles}
                onChange={(e) => setPoles(Number(e.target.value))}
                className="bg-bg border border-line/40 rounded px-2 py-1 text-text"
              >
                {[2, 4, 6, 8].map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 font-mono text-sm">
            <div className="border border-line/20 rounded px-3 py-2">
              <div className="text-muted text-xs">ns = 120f/p</div>
              <div className="text-accent text-lg">{nsValue.toFixed(0)} rpm</div>
            </div>
            <div className="border border-line/20 rounded px-3 py-2">
              <div className="text-muted text-xs">Ângulo elétrico</div>
              <div className="text-text text-lg">{thetaDeg.toFixed(0)}°</div>
            </div>
            <div className="border border-line/20 rounded px-3 py-2">
              <div className="text-muted text-xs">Ângulo mecânico</div>
              <div className="text-text text-lg">{thetaMech.toFixed(0)}°</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
