import { useEffect, useRef, useState } from 'react'
import { Play, RotateCcw } from 'lucide-react'

type Terminais = 9 | 12
type Ligacao12 = 'delta-paralelo' | 'estrela-paralelo' | 'delta-serie' | 'estrela-serie'

const LIGACOES_12: { key: Ligacao12; label: string; fator: number; formula: string }[] = [
  { key: 'delta-paralelo', label: 'Triângulo Paralelo', fator: 1, formula: '1× UF' },
  { key: 'estrela-paralelo', label: 'Estrela Paralelo', fator: Math.sqrt(3), formula: '√3× UF' },
  { key: 'delta-serie', label: 'Triângulo Série', fator: 2, formula: '2× UF' },
  { key: 'estrela-serie', label: 'Estrela Série', fator: 2 * Math.sqrt(3), formula: '2√3× UF' },
]

function CoilPair({ series, phaseLabel }: { series: boolean; phaseLabel: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="font-mono text-xs text-muted w-4">{phaseLabel}</span>
      <div className={`flex gap-1 ${series ? 'flex-col' : 'flex-row'}`}>
        <div className="w-8 h-4 rounded-sm border border-line bg-line/20" />
        <div className="w-8 h-4 rounded-sm border border-line bg-line/20" />
      </div>
      <span className="font-mono text-[10px] text-muted">{series ? 'série' : 'paralelo'}</span>
    </div>
  )
}

export function SeriesParallelSwitch() {
  const [terminais, setTerminais] = useState<Terminais>(9)
  const [series, setSeries] = useState(true)
  const [ligacao12, setLigacao12] = useState<Ligacao12>('delta-paralelo')
  const [UF, setUF] = useState(220)
  const [playing, setPlaying] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  function simular() {
    clearTimeout(timer.current)
    setPlaying(true)
    setSeries(true)
    timer.current = setTimeout(() => {
      setSeries(false)
      setPlaying(false)
    }, 2000)
  }

  const atual = LIGACOES_12.find((l) => l.key === ligacao12)!
  const UL9 = series ? UF : UF * 2

  return (
    <div className="border border-line/30 bg-surface rounded p-5 grid-mesh">
      <h3 className="text-lg mb-1">Motores de 9 e 12 Terminais</h3>
      <div className="flex gap-2 mb-4">
        {([9, 12] as Terminais[]).map((t) => (
          <button
            key={t}
            onClick={() => setTerminais(t)}
            className={`px-3 py-1.5 rounded font-mono text-sm ${
              terminais === t ? 'bg-line text-bg font-semibold' : 'bg-bg text-muted hover:text-text'
            }`}
          >
            {t} terminais
          </button>
        ))}
      </div>

      {terminais === 9 ? (
        <div>
          <p className="text-muted text-xs font-mono mb-4">
            2 bobinas por fase, já ligadas em paralelo internamente. Na partida ficam em série (metade da tensão em
            cada bobina → reduz a corrente de partida); em regime, comutam para paralelo.
          </p>
          <div className="flex flex-wrap gap-6 items-start">
            <div className="flex gap-4">
              {['a', 'b', 'c'].map((f) => (
                <CoilPair key={f} series={series} phaseLabel={f} />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={simular}
                className="flex items-center gap-2 bg-line text-bg font-mono text-sm font-semibold px-3 py-1.5 rounded hover:brightness-110"
              >
                <Play size={16} />
                {playing ? 'Comutando…' : 'Simular partida'}
              </button>
              <button
                onClick={() => {
                  clearTimeout(timer.current)
                  setPlaying(false)
                  setSeries(true)
                }}
                className="flex items-center gap-2 border border-muted text-text font-mono text-sm px-3 py-1.5 rounded hover:border-line hover:text-line"
              >
                <RotateCcw size={16} />
                Reiniciar
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4 font-mono text-xs max-w-sm">
            <div className="border border-line/20 rounded px-3 py-2">
              <div className="text-muted">Estado</div>
              <div className="text-accent mt-0.5">{series ? 'Série (partida)' : 'Paralelo (regime)'}</div>
            </div>
            <div className="border border-line/20 rounded px-3 py-2">
              <div className="text-muted">UL suportável</div>
              <div className="text-text mt-0.5">{UL9} V (UF={UF})</div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-muted text-xs font-mono mb-4">
            2 bobinas por fase, totalmente independentes — permitem 4 tensões de linha diferentes.
          </p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {LIGACOES_12.map((l) => (
              <button
                key={l.key}
                onClick={() => setLigacao12(l.key)}
                className={`px-3 py-1.5 rounded font-mono text-xs ${
                  ligacao12 === l.key ? 'bg-accent text-bg font-semibold' : 'bg-bg text-muted hover:text-text'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
          <label className="flex flex-col gap-1 font-mono text-sm max-w-xs mb-3">
            <span className="text-muted text-xs">UF — tensão de bobina (V)</span>
            <input
              type="number"
              value={UF}
              onChange={(e) => setUF(Number(e.target.value))}
              className="bg-bg border border-line/40 rounded px-2 py-1.5 text-text"
            />
          </label>
          <div className="border border-line/20 rounded px-4 py-3 font-mono inline-block">
            <div className="text-muted text-xs">UL = {atual.formula}</div>
            <div className="text-accent text-2xl mt-1">{(UF * atual.fator).toFixed(1)} V</div>
          </div>
        </div>
      )}
    </div>
  )
}
