import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { loadAt, regimeProfiles, simulate, REGIME_TOTAL_TIME } from './regimeProfiles'

const W = 640
const TITLE_H = 16
const H_LOAD = 110
const H_TEMP = 130
const PAD_L = 46
const PAD_R = 14
const GAP = 26

// Each mini-chart reserves its own title band above the plotted area, so the
// "100%" gridline label never lands in the same spot as the chart title.
const LOAD_TOP = TITLE_H + 4
const LOAD_BOTTOM = H_LOAD
const TEMP_TOP = H_LOAD + GAP + TITLE_H + 4
const TEMP_BOTTOM = H_LOAD + GAP + H_TEMP

function niceCeil(v: number, step: number) {
  return Math.max(step, Math.ceil(v / step) * step)
}

export function DutyCycleChart({ codigo }: { codigo: string }) {
  const profile = regimeProfiles[codigo]
  const [points] = useState(() => simulate(profile))
  const [t, setT] = useState(0)
  const [playing, setPlaying] = useState(false)
  const raf = useRef(0)

  useEffect(() => {
    if (!playing) return
    function tick() {
      setT((prev) => {
        const next = prev + REGIME_TOTAL_TIME / 500
        if (next >= REGIME_TOTAL_TIME) {
          setPlaying(false)
          return REGIME_TOTAL_TIME
        }
        return next
      })
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [playing])

  const maxLoad = Math.max(...profile.segments.map((s) => s.load), 0)
  const minLoad = Math.min(...profile.segments.map((s) => s.load), 0)
  const maxPerdas = Math.max(...profile.segments.map((s) => s.load * s.load)) * 100

  const yLoadTop = niceCeil(maxLoad * 100, 50)
  const yLoadBottom = minLoad < 0 ? -niceCeil(-minLoad * 100, 50) : 0
  const yTempTop = niceCeil(maxPerdas, 50)

  const chartX = (tt: number) => PAD_L + (tt / REGIME_TOTAL_TIME) * (W - PAD_L - PAD_R)
  const yLoad = (v: number) =>
    LOAD_BOTTOM - ((v - yLoadBottom) / (yLoadTop - yLoadBottom)) * (LOAD_BOTTOM - LOAD_TOP)
  const yTemp = (v: number) => TEMP_BOTTOM - (v / yTempTop) * (TEMP_BOTTOM - TEMP_TOP)

  const loadPath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${chartX(p.t).toFixed(1)},${yLoad(p.load * 100).toFixed(1)}`).join(' ')
  const perdasPath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${chartX(p.t).toFixed(1)},${yTemp(p.perdas).toFixed(1)}`).join(' ')
  const tempPath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${chartX(p.t).toFixed(1)},${yTemp(p.temp).toFixed(1)}`).join(' ')

  const totalH = H_LOAD + GAP + H_TEMP + 24

  const currentLoad = loadAt(profile, t)
  const currentTemp = points[Math.min(points.length - 1, Math.round((t / REGIME_TOTAL_TIME) * (points.length - 1)))]?.temp ?? 0

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${totalH}`} className="w-full h-auto">
        {/* zero line + grid — load chart */}
        <text x={4} y={12} fontSize={9.5} fill="var(--color-muted)" fontFamily="var(--font-mono)">
          Carga (%)
        </text>
        {[yLoadBottom, 0, yLoadTop].filter((v, i, arr) => arr.indexOf(v) === i).map((v) => (
          <g key={`gl${v}`}>
            <line x1={PAD_L} y1={yLoad(v)} x2={W - PAD_R} y2={yLoad(v)} stroke="var(--color-grid-line)" strokeWidth={1} />
            <text x={PAD_L - 6} y={yLoad(v) + 3} fontSize={9} fill="var(--color-muted)" textAnchor="end" fontFamily="var(--font-mono)">
              {v}%
            </text>
          </g>
        ))}
        <path d={loadPath} fill="none" stroke="var(--color-accent)" strokeWidth={2} />
        <line x1={chartX(t)} y1={LOAD_TOP} x2={chartX(t)} y2={LOAD_BOTTOM} stroke="var(--color-text)" strokeDasharray="2 3" strokeWidth={1} opacity={0.5} />

        {/* temperature / perdas chart */}
        <text x={4} y={H_LOAD + GAP + 8} fontSize={9.5} fill="var(--color-muted)" fontFamily="var(--font-mono)">
          Perdas / Temperatura (%)
        </text>
        {[0, yTempTop / 2, yTempTop].map((v) => (
          <g key={`gt${v}`}>
            <line x1={PAD_L} y1={yTemp(v)} x2={W - PAD_R} y2={yTemp(v)} stroke="var(--color-grid-line)" strokeWidth={1} />
            <text x={PAD_L - 6} y={yTemp(v) + 3} fontSize={9} fill="var(--color-muted)" textAnchor="end" fontFamily="var(--font-mono)">
              {v.toFixed(0)}% {v === 100 ? '(equilíbrio)' : ''}
            </text>
          </g>
        ))}
        {/* When the 100% line already sits on the top gridline (regimes whose
            load never exceeds 1×) the annotation above is merged into that
            tick instead of drawing a second overlapping label at the same y. */}
        {yTempTop > 100 && (
          <>
            <line x1={PAD_L} y1={yTemp(100)} x2={W - PAD_R} y2={yTemp(100)} stroke="var(--color-line)" strokeDasharray="4 3" strokeWidth={1} opacity={0.6} />
            <text x={W - PAD_R} y={yTemp(100) - 4} fontSize={8.5} fill="var(--color-line)" textAnchor="end" fontFamily="var(--font-mono)">
              equilíbrio térmico
            </text>
          </>
        )}
        <path d={perdasPath} fill="none" stroke="var(--color-muted)" strokeDasharray="3 3" strokeWidth={1.5} />
        <path d={tempPath} fill="none" stroke="var(--color-line)" strokeWidth={2.25} />
        <line x1={chartX(t)} y1={TEMP_TOP} x2={chartX(t)} y2={TEMP_BOTTOM} stroke="var(--color-text)" strokeDasharray="2 3" strokeWidth={1} opacity={0.5} />

        <text x={W / 2} y={totalH - 4} fontSize={9.5} fill="var(--color-muted)" textAnchor="middle" fontFamily="var(--font-mono)">
          tempo (unidades relativas — sem escala real)
        </text>
      </svg>

      <div className="flex flex-wrap items-center gap-4 mt-2">
        <button
          onClick={() => {
            if (t >= REGIME_TOTAL_TIME - 0.01) setT(0)
            setPlaying((p) => !p)
          }}
          className="flex items-center gap-2 bg-line text-bg font-mono text-sm font-semibold px-3 py-1.5 rounded hover:brightness-110"
        >
          {playing ? <Pause size={16} /> : <Play size={16} />}
          {playing ? 'Pausar' : 'Animar'}
        </button>
        <input
          type="range"
          min={0}
          max={REGIME_TOTAL_TIME}
          step={0.1}
          value={t}
          onChange={(e) => {
            setPlaying(false)
            setT(Number(e.target.value))
          }}
          className="flex-1 min-w-[160px] accent-[var(--color-accent)]"
        />
        <div className="font-mono text-xs text-muted whitespace-nowrap">
          carga = {(currentLoad * 100).toFixed(0)}% · temp ≈ {currentTemp.toFixed(0)}%
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mt-3 font-mono text-xs text-muted">
        {profile.segments.map((seg, i) => (
          <span key={i} className="border border-line/20 rounded px-2 py-1">
            {seg.label} <span className="text-text">{(seg.load * 100).toFixed(0)}%</span>
          </span>
        ))}
      </div>
      <p className="text-muted text-xs font-mono mt-2">{profile.nota}</p>
    </div>
  )
}
