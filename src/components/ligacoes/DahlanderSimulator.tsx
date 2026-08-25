import { useState } from 'react'
import { ns } from '../../content/formulas'

type Variante = 'conjugado-constante' | 'potencia-constante'

const RELACOES_POLOS: { label: string; baixo: number; alto: number }[] = [
  { label: '2/4 polos', baixo: 4, alto: 2 },
  { label: '2/6 polos', baixo: 6, alto: 2 },
  { label: '2/8 polos', baixo: 8, alto: 2 },
  { label: '4/6 polos', baixo: 6, alto: 4 },
  { label: '4/8 polos', baixo: 8, alto: 4 },
  { label: '6/8 polos', baixo: 8, alto: 6 },
]

export function DahlanderSimulator() {
  const [relacaoIdx, setRelacaoIdx] = useState(2) // 2/8 polos, default velocidades 3600/900-like example
  const [alta, setAlta] = useState(false)
  const [variante, setVariante] = useState<Variante>('conjugado-constante')
  const [freq] = useState(60)

  const relacao = RELACOES_POLOS[relacaoIdx]
  const polosAtivos = alta ? relacao.alto : relacao.baixo
  const nsAtual = ns(freq, polosAtivos)

  const ligacaoAtiva =
    variante === 'conjugado-constante' ? (alta ? 'YY (paralelo)' : 'D (série)') : alta ? 'D (série)' : 'YY (paralelo)'

  return (
    <div className="border border-line/30 bg-surface rounded p-5 grid-mesh">
      <h3 className="text-lg mb-1">Ligação Dahlander — Comutação de Polos</h3>
      <p className="text-muted text-xs font-mono mb-4">
        Duas velocidades obtidas invertendo o sentido da corrente em parte do enrolamento (relação de polos 1:2).
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {RELACOES_POLOS.map((r, i) => (
          <button
            key={r.label}
            onClick={() => setRelacaoIdx(i)}
            className={`px-3 py-1.5 rounded font-mono text-xs ${
              relacaoIdx === i ? 'bg-line text-bg font-semibold' : 'bg-bg text-muted hover:text-text'
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      <div className="flex gap-2 mb-4">
        {(['conjugado-constante', 'potencia-constante'] as Variante[]).map((v) => (
          <button
            key={v}
            onClick={() => setVariante(v)}
            className={`px-3 py-1.5 rounded font-mono text-sm ${
              variante === v ? 'bg-accent text-bg font-semibold' : 'bg-bg text-muted hover:text-text'
            }`}
          >
            {v === 'conjugado-constante' ? 'Conjugado constante (D/YY)' : 'Potência constante (YY/D)'}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-6 items-center">
        <svg viewBox="0 0 220 140" className="w-full max-w-[220px] mx-auto">
          <g stroke="var(--color-line)" strokeWidth={2} fill="none">
            <line x1={40} y1={70} x2={180} y2={70} />
          </g>
          {[60, 100, 140].map((cx, i) => (
            <g key={i}>
              <path
                d={`M${cx - 12},70 q6,${alta ? -18 : 18} 12,0 q6,${alta ? 18 : -18} 12,0`}
                stroke="var(--color-accent)"
                strokeWidth={2}
                fill="none"
                style={{ transition: 'all 0.4s' }}
              />
              <polygon
                points={alta ? `${cx + 8},64 ${cx + 14},70 ${cx + 8},76` : `${cx + 8},76 ${cx + 14},70 ${cx + 8},64`}
                fill="var(--color-accent)"
                style={{ transition: 'all 0.4s' }}
              />
            </g>
          ))}
          <text x={110} y={110} fontSize={11} fill="var(--color-muted)" textAnchor="middle" fontFamily="var(--font-mono)">
            corrente {alta ? 'invertida (alta velocidade)' : 'sentido normal (baixa velocidade)'}
          </text>
        </svg>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-muted">Baixa</span>
            <button
              onClick={() => setAlta((a) => !a)}
              className={`relative w-14 h-7 rounded-full transition-colors ${alta ? 'bg-accent' : 'bg-line'}`}
              aria-label="Alternar velocidade"
            >
              <span
                className={`absolute top-1 w-5 h-5 rounded-full bg-bg transition-all ${alta ? 'left-8' : 'left-1'}`}
              />
            </button>
            <span className="font-mono text-sm text-muted">Alta</span>
          </div>

          <div className="grid grid-cols-2 gap-3 font-mono text-xs">
            <div className="border border-line/20 rounded px-3 py-2">
              <div className="text-muted">Polos ativos</div>
              <div className="text-accent text-lg">{polosAtivos}</div>
            </div>
            <div className="border border-line/20 rounded px-3 py-2">
              <div className="text-muted">ns = 120f/p</div>
              <div className="text-accent text-lg">{nsAtual.toFixed(0)} rpm</div>
            </div>
            <div className="border border-line/20 rounded px-3 py-2 col-span-2">
              <div className="text-muted">Ligação ativa</div>
              <div className="text-text mt-0.5">{ligacaoAtiva}</div>
            </div>
          </div>

          <p className="text-muted text-xs font-mono">
            {variante === 'conjugado-constante'
              ? 'D/YY — relação de potência ≈ 0,63:1 entre baixa e alta velocidade.'
              : 'YY/D — relação de conjugado 1:2 entre baixa e alta velocidade.'}
          </p>
        </div>
      </div>
    </div>
  )
}
