import { useState } from 'react'

export function WindingSimulator() {
  const [ligacao, setLigacao] = useState<'delta' | 'estrela'>('delta')
  const [UF, setUF] = useState(220)
  const UL = ligacao === 'delta' ? UF : UF * Math.sqrt(3)

  return (
    <div className="border border-line/30 bg-surface rounded p-5 grid-mesh">
      <h3 className="text-lg mb-4">Triângulo (Δ) x Estrela (Y) — 6 terminais</h3>

      <div className="flex gap-2 mb-5">
        {(['delta', 'estrela'] as const).map((l) => (
          <button
            key={l}
            onClick={() => setLigacao(l)}
            className={`px-4 py-1.5 rounded font-mono text-sm ${
              ligacao === l ? 'bg-line text-bg font-semibold' : 'bg-bg text-muted hover:text-text'
            }`}
          >
            {l === 'delta' ? 'Triângulo (Δ)' : 'Estrela (Y)'}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6 items-center">
        <svg viewBox="0 0 220 220" className="w-full max-w-[220px] mx-auto">
          {ligacao === 'delta' ? (
            <g stroke="var(--color-line)" strokeWidth={2} fill="none">
              <polygon points="110,30 190,175 30,175" />
              {[
                [110, 30, 'a'],
                [190, 175, 'b'],
                [30, 175, 'c'],
              ].map(([cx, cy, label]) => (
                <g key={label as string}>
                  <circle cx={cx as number} cy={cy as number} r={4} fill="var(--color-accent)" />
                  <text
                    x={cx as number}
                    y={(cy as number) + ((cy as number) < 100 ? -10 : 18)}
                    fontSize={12}
                    fill="var(--color-text)"
                    textAnchor="middle"
                    fontFamily="var(--font-mono)"
                  >
                    {label}
                  </text>
                </g>
              ))}
            </g>
          ) : (
            <g stroke="var(--color-line)" strokeWidth={2} fill="none">
              <line x1={110} y1={110} x2={110} y2={30} />
              <line x1={110} y1={110} x2={190} y2={165} />
              <line x1={110} y1={110} x2={30} y2={165} />
              <circle cx={110} cy={110} r={4} fill="var(--color-muted)" />
              {[
                [110, 30, 'a'],
                [190, 165, 'b'],
                [30, 165, 'c'],
              ].map(([cx, cy, label]) => (
                <g key={label as string}>
                  <circle cx={cx as number} cy={cy as number} r={4} fill="var(--color-accent)" />
                  <text
                    x={cx as number}
                    y={(cy as number) + ((cy as number) < 100 ? -10 : 18)}
                    fontSize={12}
                    fill="var(--color-text)"
                    textAnchor="middle"
                    fontFamily="var(--font-mono)"
                  >
                    {label}
                  </text>
                </g>
              ))}
              <text x={110} y={130} fontSize={10} fill="var(--color-muted)" textAnchor="middle" fontFamily="var(--font-mono)">
                N
              </text>
            </g>
          )}
        </svg>

        <div>
          <label className="flex flex-col gap-1 font-mono text-sm mb-4">
            <span className="text-muted text-xs">UF — tensão de fase / bobina (V)</span>
            <input
              type="number"
              value={UF}
              onChange={(e) => setUF(Number(e.target.value))}
              className="bg-bg border border-line/40 rounded px-2 py-1.5 text-text"
            />
          </label>
          <div className="border border-line/20 rounded px-4 py-3 font-mono">
            <div className="text-muted text-xs">
              {ligacao === 'delta' ? 'UL = UF' : 'UL = UF · √3'}
            </div>
            <div className="text-accent text-2xl mt-1">{UL.toFixed(1)} V</div>
          </div>
          <p className="text-muted text-xs font-mono mt-3">
            Para inverter o sentido de rotação, inverte-se 2 das 3 fases de alimentação.
          </p>
        </div>
      </div>
    </div>
  )
}
