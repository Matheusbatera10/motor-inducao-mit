import { useEffect, useRef, useState } from 'react'
import { Play, RotateCcw } from 'lucide-react'

type Fase = 'parado' | 'partida' | 'transicao' | 'regime'

const DURACAO_PARTIDA = 2200
const DURACAO_TRANSICAO = 500

export function StarDeltaStarter() {
  const [fase, setFase] = useState<Fase>('parado')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  function clearTimers() {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  function simular() {
    clearTimers()
    setFase('partida')
    timers.current.push(
      setTimeout(() => setFase('transicao'), DURACAO_PARTIDA),
      setTimeout(() => setFase('regime'), DURACAO_PARTIDA + DURACAO_TRANSICAO),
    )
  }

  function reiniciar() {
    clearTimers()
    setFase('parado')
  }

  useEffect(() => clearTimers, [])

  const emEstrela = fase === 'partida' || fase === 'transicao'
  const corrente = fase === 'partida' ? '≈ 33% da corrente em Δ' : fase === 'regime' ? '100% (corrente nominal em Δ)' : '—'
  const tensaoBobina = emEstrela ? 'UF = UL/√3 (reduzida)' : fase === 'regime' ? 'UF = UL (plena)' : '—'

  return (
    <div className="border border-line/30 bg-surface rounded p-5 grid-mesh">
      <h3 className="text-lg mb-1">Chave de Partida Estrela–Triângulo (Y–Δ)</h3>
      <p className="text-muted text-xs font-mono mb-4">
        Na partida, as bobinas ficam em Estrela (menor tensão por bobina → menor corrente de partida). Após acelerar,
        a chave comuta para Triângulo, aplicando a tensão plena de regime.
      </p>

      <div className="grid sm:grid-cols-2 gap-6 items-center">
        <svg viewBox="0 0 220 180" className="w-full max-w-[220px] mx-auto">
          <g stroke="var(--color-line)" strokeWidth={2} fill="none" opacity={emEstrela || fase === 'parado' ? 1 : 0.15} style={{ transition: 'opacity 0.4s' }}>
            <line x1={110} y1={90} x2={110} y2={25} />
            <line x1={110} y1={90} x2={175} y2={135} />
            <line x1={110} y1={90} x2={45} y2={135} />
            <circle cx={110} cy={90} r={4} fill="var(--color-muted)" />
          </g>
          <g stroke="var(--color-accent)" strokeWidth={2} fill="none" opacity={fase === 'regime' ? 1 : 0.15} style={{ transition: 'opacity 0.4s' }}>
            <polygon points="110,25 175,135 45,135" />
          </g>
          {[
            [110, 25, 'a'],
            [175, 135, 'b'],
            [45, 135, 'c'],
          ].map(([cx, cy, label]) => (
            <g key={label as string}>
              <circle cx={cx as number} cy={cy as number} r={4} fill="var(--color-accent)" />
              <text
                x={cx as number}
                y={(cy as number) + ((cy as number) < 80 ? -10 : 18)}
                fontSize={12}
                fill="var(--color-text)"
                textAnchor="middle"
                fontFamily="var(--font-mono)"
              >
                {label}
              </text>
            </g>
          ))}
        </svg>

        <div className="space-y-3">
          <div className="flex gap-2">
            <button
              onClick={simular}
              className="flex items-center gap-2 bg-line text-bg font-mono text-sm font-semibold px-3 py-1.5 rounded hover:brightness-110"
            >
              <Play size={16} />
              Simular partida
            </button>
            <button
              onClick={reiniciar}
              className="flex items-center gap-2 border border-muted text-text font-mono text-sm px-3 py-1.5 rounded hover:border-line hover:text-line"
            >
              <RotateCcw size={16} />
              Reiniciar
            </button>
          </div>

          <div className="border border-line/20 rounded px-4 py-2.5 font-mono text-sm">
            <div className="text-muted text-xs">Estado da chave</div>
            <div className="text-accent text-lg">
              {fase === 'parado' && 'Parado'}
              {fase === 'partida' && 'Partida — Estrela (Y)'}
              {fase === 'transicao' && 'Comutando…'}
              {fase === 'regime' && 'Regime — Triângulo (Δ)'}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 font-mono text-xs">
            <div className="border border-line/20 rounded px-3 py-2">
              <div className="text-muted">Tensão por bobina</div>
              <div className="text-text mt-0.5">{tensaoBobina}</div>
            </div>
            <div className="border border-line/20 rounded px-3 py-2">
              <div className="text-muted">Corrente de linha</div>
              <div className="text-text mt-0.5">{corrente}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
