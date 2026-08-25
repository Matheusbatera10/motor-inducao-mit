import { useRef } from 'react'

const W = 480
const H = 180
const PAD = 28

const PHASES = [
  { key: 'a', label: 'Ia', offset: 0, color: 'var(--color-accent)' },
  { key: 'b', label: 'Ib', offset: 120, color: 'var(--color-line)' },
  { key: 'c', label: 'Ic', offset: 240, color: 'var(--color-text)' },
] as const

function xFor(deg: number) {
  return PAD + (deg / 360) * (W - 2 * PAD)
}
function yFor(value: number) {
  const midY = H / 2
  return midY - value * (midY - PAD * 0.6)
}
function pathFor(offsetDeg: number) {
  const pts: string[] = []
  for (let deg = 0; deg <= 360; deg += 4) {
    const rad = ((deg - offsetDeg) * Math.PI) / 180
    pts.push(`${deg === 0 ? 'M' : 'L'}${xFor(deg).toFixed(1)},${yFor(Math.cos(rad)).toFixed(1)}`)
  }
  return pts.join(' ')
}

export function PhaseCurrentsChart({
  thetaDeg,
  onScrub,
}: {
  thetaDeg: number
  onScrub: (deg: number) => void
}) {
  const svgRef = useRef<SVGSVGElement>(null)
  const dragging = useRef(false)

  function degFromClientX(clientX: number) {
    const rect = svgRef.current!.getBoundingClientRect()
    const relX = ((clientX - rect.left) / rect.width) * W
    const deg = ((relX - PAD) / (W - 2 * PAD)) * 360
    return Math.max(0, Math.min(360, deg))
  }

  function handlePointerDown(e: React.PointerEvent<SVGSVGElement>) {
    dragging.current = true
    ;(e.target as Element).setPointerCapture(e.pointerId)
    onScrub(degFromClientX(e.clientX))
  }
  function handlePointerMove(e: React.PointerEvent<SVGSVGElement>) {
    if (!dragging.current) return
    onScrub(degFromClientX(e.clientX))
  }
  function handlePointerUp() {
    dragging.current = false
  }

  const cursorX = xFor(thetaDeg)

  return (
    <div>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto cursor-ew-resize select-none touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* zero line */}
        <line x1={PAD} y1={H / 2} x2={W - PAD} y2={H / 2} stroke="var(--color-grid-line)" strokeWidth={1} />
        {/* axis */}
        <line x1={PAD} y1={PAD * 0.4} x2={PAD} y2={H - PAD * 0.4} stroke="var(--color-muted)" strokeWidth={1} />
        {[0, 90, 180, 270, 360].map((deg) => (
          <text key={deg} x={xFor(deg)} y={H - 6} fontSize={9} fill="var(--color-muted)" textAnchor="middle" fontFamily="var(--font-mono)">
            {deg}°
          </text>
        ))}
        {PHASES.map((ph) => (
          <path key={ph.key} d={pathFor(ph.offset)} fill="none" stroke={ph.color} strokeWidth={1.75} opacity={0.9} />
        ))}
        {/* scrub cursor */}
        <line x1={cursorX} y1={PAD * 0.2} x2={cursorX} y2={H - PAD * 0.6} stroke="var(--color-accent)" strokeWidth={1.5} strokeDasharray="3 3" />
        {PHASES.map((ph) => {
          const rad = ((thetaDeg - ph.offset) * Math.PI) / 180
          const val = Math.cos(rad)
          return (
            <circle key={ph.key} cx={cursorX} cy={yFor(val)} r={4} fill={ph.color} stroke="var(--color-bg)" strokeWidth={1} />
          )
        })}
      </svg>
      <div className="flex gap-4 justify-center mt-2 font-mono text-xs">
        {PHASES.map((ph) => {
          const rad = ((thetaDeg - ph.offset) * Math.PI) / 180
          const val = Math.cos(rad)
          return (
            <div key={ph.key} className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: ph.color }} />
              <span className="text-muted">{ph.label} =</span>
              <span style={{ color: ph.color }}>{val.toFixed(2)}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
