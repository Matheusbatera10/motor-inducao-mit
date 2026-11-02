import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { sampleCurve, torqueAt, type CurvePoint } from './curveMath'

const W = 620
const H = 340
const PAD_L = 46
const PAD_B = 32
const PAD_T = 16
const PAD_R = 16

export interface CategoryDef {
  key: 'N' | 'H' | 'D'
  label: string
  color: string
  points: CurvePoint[]
  keyPoints: { name: string; nPct: number; tPct: number }[]
}

export const CATEGORIES: CategoryDef[] = [
  {
    key: 'N',
    label: 'Categoria N',
    color: 'var(--color-accent)',
    points: [
      { nPct: 0, tPct: 155 },
      { nPct: 25, tPct: 115 },
      { nPct: 75, tPct: 230 },
      { nPct: 97, tPct: 100 },
      { nPct: 100, tPct: 0 },
    ],
    keyPoints: [
      { name: 'Tp', nPct: 0, tPct: 155 },
      { name: 'Tmín', nPct: 25, tPct: 115 },
      { name: 'Tmáx', nPct: 75, tPct: 230 },
      { name: 'Tn', nPct: 97, tPct: 100 },
    ],
  },
  {
    key: 'H',
    label: 'Categoria H',
    color: 'var(--color-line)',
    points: [
      { nPct: 0, tPct: 215 },
      { nPct: 12, tPct: 195 },
      { nPct: 72, tPct: 255 },
      { nPct: 97, tPct: 100 },
      { nPct: 100, tPct: 0 },
    ],
    keyPoints: [
      { name: 'Tp', nPct: 0, tPct: 215 },
      { name: 'Tmín', nPct: 12, tPct: 195 },
      { name: 'Tmáx', nPct: 72, tPct: 255 },
      { name: 'Tn', nPct: 97, tPct: 100 },
    ],
  },
  {
    key: 'D',
    label: 'Categoria D',
    color: 'var(--color-text)',
    // Fig. 3.10: curva sem vale. O maior torque é o da própria partida.
    points: [
      { nPct: 0, tPct: 250 },
      { nPct: 30, tPct: 245 },
      { nPct: 55, tPct: 228 },
      { nPct: 75, tPct: 190 },
      { nPct: 90, tPct: 100 },
      { nPct: 100, tPct: 0 },
    ],
    keyPoints: [
      { name: 'Tp = Tmáx', nPct: 0, tPct: 250 },
      { name: 'Tn', nPct: 90, tPct: 100 },
    ],
  },
]

function x(nPct: number) {
  return PAD_L + (nPct / 100) * (W - PAD_L - PAD_R)
}
function y(tPct: number) {
  const maxT = 300
  return H - PAD_B - (tPct / maxT) * (H - PAD_B - PAD_T)
}

const SAMPLES: Record<string, CurvePoint[]> = Object.fromEntries(CATEGORIES.map((c) => [c.key, sampleCurve(c.points)]))

export function TorqueSpeedChart({ active }: { active: Set<string> }) {
  const [playing, setPlaying] = useState(false)
  const [nPct, setNPct] = useState(0)
  const raf = useRef(0)

  const primary = CATEGORIES.find((c) => active.has(c.key)) ?? CATEGORIES[0]
  const nrPct = primary.keyPoints.find((k) => k.name === 'Tn')!.nPct

  useEffect(() => {
    if (!playing) return
    function tick() {
      setNPct((prev) => {
        const next = prev + 0.4
        if (next >= 100) {
          setPlaying(false)
          return 100
        }
        return next
      })
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [playing])

  const sVal = (100 - nPct) / 100
  let fase = 'Regime permanente'
  if (nPct < 2) fase = 'Partida (s = 1)'
  else if (Math.abs(nPct - nrPct) < 3) fase = `Plena carga (s ≈ ${(sVal * 100).toFixed(1)}%)`
  else if (nPct > 98) fase = 'Síncrono — hipotético (s = 0)'

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        {/* grid */}
        {[0, 25, 50, 75, 100].map((g) => (
          <g key={g}>
            <line x1={x(g)} y1={PAD_T} x2={x(g)} y2={H - PAD_B} stroke="var(--color-grid-line)" strokeWidth={1} />
            <text x={x(g)} y={H - PAD_B + 16} fontSize={10} fill="var(--color-muted)" textAnchor="middle" fontFamily="var(--font-mono)">
              {g}%
            </text>
          </g>
        ))}
        {[0, 100, 200, 300].map((g) => (
          <g key={g}>
            <line x1={PAD_L} y1={y(g)} x2={W - PAD_R} y2={y(g)} stroke="var(--color-grid-line)" strokeWidth={1} />
            <text x={PAD_L - 8} y={y(g) + 3} fontSize={10} fill="var(--color-muted)" textAnchor="end" fontFamily="var(--font-mono)">
              {g}%
            </text>
          </g>
        ))}
        <text x={W / 2} y={H - 4} fontSize={10.5} fill="var(--color-muted)" textAnchor="middle" fontFamily="var(--font-mono)">
          velocidade do rotor (% de ns)
        </text>
        <text x={12} y={PAD_T + 8} fontSize={10.5} fill="var(--color-muted)" fontFamily="var(--font-mono)" transform={`rotate(-90 12 ${H / 2})`}>
          torque (% Tn)
        </text>

        {CATEGORIES.filter((c) => active.has(c.key)).map((c) => (
          <g key={c.key}>
            <path
              d={SAMPLES[c.key].map((p, i) => `${i === 0 ? 'M' : 'L'}${x(p.nPct).toFixed(1)},${y(p.tPct).toFixed(1)}`).join(' ')}
              fill="none"
              stroke={c.color}
              strokeWidth={2.25}
            />
            {c.keyPoints.map((k) => (
              <g key={k.name} className="group">
                <circle cx={x(k.nPct)} cy={y(k.tPct)} r={4} fill={c.color} stroke="var(--color-bg)" strokeWidth={1.5} />
                <text x={x(k.nPct) + (k.nPct === 0 ? 8 : 0)} y={y(k.tPct) - 8} fontSize={9.5} fill={c.color} textAnchor={k.nPct === 0 ? 'start' : 'middle'} fontFamily="var(--font-mono)">
                  {k.name}
                </text>
              </g>
            ))}
          </g>
        ))}

        {/* animated operating point on primary curve */}
        <line x1={x(nPct)} y1={PAD_T} x2={x(nPct)} y2={H - PAD_B} stroke="var(--color-accent)" strokeDasharray="3 3" strokeWidth={1} opacity={0.6} />
        <circle cx={x(nPct)} cy={y(torqueAt(SAMPLES[primary.key], nPct))} r={5.5} fill="var(--color-accent)" stroke="var(--color-bg)" strokeWidth={1.5} />
      </svg>

      <div className="flex flex-wrap items-center gap-4 mt-3">
        <button
          onClick={() => {
            if (nPct >= 100) setNPct(0)
            setPlaying((p) => !p)
          }}
          className="flex items-center gap-2 bg-line text-bg font-mono text-sm font-semibold px-3 py-1.5 rounded hover:brightness-110"
        >
          {playing ? <Pause size={16} /> : <Play size={16} />}
          {playing ? 'Pausar' : 'Simular partida'}
        </button>
        <input
          type="range"
          min={0}
          max={100}
          step={0.5}
          value={nPct}
          onChange={(e) => {
            setPlaying(false)
            setNPct(Number(e.target.value))
          }}
          className="flex-1 min-w-[160px] accent-[var(--color-accent)]"
        />
        <div className="font-mono text-xs text-muted whitespace-nowrap">
          n = {nPct.toFixed(0)}% ns · s = {(sVal * 100).toFixed(1)}%
        </div>
      </div>
      <div className="font-mono text-sm text-accent mt-1">{fase}</div>
    </div>
  )
}
