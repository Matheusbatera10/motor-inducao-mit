import { useEffect, useRef, useState } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'
import {
  BASELINE_PARAMS,
  sampleParametricCurve,
  slipAtMaxTorque,
  torqueAtSlip,
  type MotorParams,
} from './parametricTorque'
import { ns as nsFormula } from '../../content/formulas'

const W = 620
const H = 340
const PAD_L = 46
const PAD_B = 32
const PAD_T = 16
const PAD_R = 16

function x(nPct: number) {
  return PAD_L + (nPct / 100) * (W - PAD_L - PAD_R)
}

/** Escala vertical que sempre cabe a curva inteira, com marcas redondas. */
function escalaY(maxT: number) {
  const step = maxT <= 360 ? 100 : maxT <= 720 ? 200 : maxT <= 1800 ? 500 : 1000
  const yMax = Math.ceil((maxT * 1.08) / step) * step
  const ticks: number[] = []
  for (let t = 0; t <= yMax; t += step) ticks.push(t)
  return { yMax, ticks }
}

const baselineSamples = sampleParametricCurve(BASELINE_PARAMS)
const nPctArr = baselineSamples.map((p) => p.nPct)
const baselineT = baselineSamples.map((p) => p.tPct)
const baselineMax = Math.max(...baselineT)

export function ParametricTorqueChart() {
  const [params, setParams] = useState<MotorParams>({ ...BASELINE_PARAMS })
  const [displayedT, setDisplayedT] = useState<number[]>(baselineT)
  const displayedRef = useRef<number[]>(baselineT)
  const raf = useRef(0)

  const [playing, setPlaying] = useState(false)
  const [opPct, setOpPct] = useState(0)
  const opRef = useRef(0)
  const playRaf = useRef(0)

  useEffect(() => {
    const target = sampleParametricCurve(params).map((p) => p.tPct)
    function tick() {
      // O "terminou?" é calculado aqui fora do setState: dentro do updater ele
      // ainda não teria rodado na hora do teste e a curva pararia no 1º passo.
      const next = displayedRef.current.map((v, i) => v + (target[i] - v) * 0.18)
      const done = next.every((v, i) => Math.abs(target[i] - v) <= 0.05)
      const final = done ? target : next
      displayedRef.current = final
      setDisplayedT(final)
      if (!done) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [params])

  useEffect(() => {
    if (!playing) return
    function tick() {
      const next = Math.min(opRef.current + 0.4, 99.7)
      opRef.current = next
      setOpPct(next)
      if (next >= 99.7) {
        setPlaying(false)
        return
      }
      playRaf.current = requestAnimationFrame(tick)
    }
    playRaf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(playRaf.current)
  }, [playing])

  function moverOperacao(valor: number) {
    opRef.current = valor
    setOpPct(valor)
  }

  const nsVal = nsFormula(params.freq, params.poles)
  const sPico = slipAtMaxTorque(params)
  // Com Rr muito alta o pico cairia em s > 1, ponto que o motor nunca alcança.
  // Nesse caso o maior torque real da curva é o da partida.
  const picoNaPartida = sPico >= 1
  const sMaxT = Math.min(sPico, 1)
  const tMax = torqueAtSlip(sMaxT, params)
  const tp = torqueAtSlip(1, params)
  const nPctMaxT = (1 - sMaxT) * 100

  const opS = 1 - opPct / 100
  const opT = torqueAtSlip(Math.max(opS, 0.003), params)

  const { yMax, ticks } = escalaY(Math.max(baselineMax, tMax, ...displayedT))
  const y = (tPct: number) => H - PAD_B - (Math.min(tPct, yMax) / yMax) * (H - PAD_B - PAD_T)

  let fase = 'Regime permanente'
  if (opPct < 1) fase = 'Partida (s = 1)'
  else if (opPct > 96) fase = 'Próximo da síncrona (s ≈ 0)'
  else if (opPct < nPctMaxT) fase = 'Aceleração (antes do Tmáx)'

  function setParam<K extends keyof MotorParams>(key: K, value: MotorParams[K]) {
    setParams((prev) => ({ ...prev, [key]: value }))
  }

  const changed =
    params.V !== BASELINE_PARAMS.V ||
    params.freq !== BASELINE_PARAMS.freq ||
    params.poles !== BASELINE_PARAMS.poles ||
    params.Rr !== BASELINE_PARAMS.Rr ||
    params.Rs !== BASELINE_PARAMS.Rs

  return (
    <div className="border border-line/30 bg-surface rounded p-5 grid-mesh">
      <h3 className="text-lg mb-1">Simulador Paramétrico — o que muda a curva</h3>
      <p className="text-muted text-xs font-mono mb-4">
        Modelo simplificado do circuito equivalente, sem o ramo de magnetização. A curva tracejada é a referência
        (V=100%, 60Hz, 4 polos, Rr/Rs típicos). Os valores são em % do torque nominal dessa referência. O modelo não
        desenha o “vale” do Tmín, que depende da forma da ranhura do rotor.
      </p>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        {[0, 25, 50, 75, 100].map((g) => (
          <g key={g}>
            <line x1={x(g)} y1={PAD_T} x2={x(g)} y2={H - PAD_B} stroke="var(--color-grid-line)" strokeWidth={1} />
            <text x={x(g)} y={H - PAD_B + 16} fontSize={10} fill="var(--color-muted)" textAnchor="middle" fontFamily="var(--font-mono)">
              {g}%
            </text>
          </g>
        ))}
        {ticks.map((g) => (
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

        {changed && (
          <path
            d={baselineSamples.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(p.nPct).toFixed(1)},${y(p.tPct).toFixed(1)}`).join(' ')}
            fill="none"
            stroke="var(--color-muted)"
            strokeWidth={1.5}
            strokeDasharray="4 4"
            opacity={0.6}
          />
        )}

        <path
          data-curva="parametrica"
          d={nPctArr.map((n, i) => `${i === 0 ? 'M' : 'L'}${x(n).toFixed(1)},${y(displayedT[i]).toFixed(1)}`).join(' ')}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth={2.5}
        />

        <circle data-marcador="tmax" cx={x(nPctMaxT)} cy={y(tMax)} r={4} fill="var(--color-line)" stroke="var(--color-bg)" strokeWidth={1.5} />
        <text
          x={x(nPctMaxT) + (picoNaPartida ? 8 : 0)}
          y={y(tMax) - 9}
          fontSize={9.5}
          fill="var(--color-line)"
          textAnchor={picoNaPartida ? 'start' : 'middle'}
          fontFamily="var(--font-mono)"
        >
          Tmáx
        </text>

        <line x1={x(opPct)} y1={PAD_T} x2={x(opPct)} y2={H - PAD_B} stroke="var(--color-accent)" strokeDasharray="3 3" strokeWidth={1} opacity={0.5} />
        <circle cx={x(opPct)} cy={y(opT)} r={5.5} fill="var(--color-accent)" stroke="var(--color-bg)" strokeWidth={1.5} />
      </svg>

      <div className="flex flex-wrap items-center gap-4 mt-2 mb-5">
        <button
          onClick={() => {
            if (opRef.current >= 99.7) moverOperacao(0)
            setPlaying((p) => !p)
          }}
          className="flex items-center gap-2 bg-line text-bg font-mono text-sm font-semibold px-3 py-1.5 rounded hover:brightness-110"
        >
          {playing ? <Pause size={16} /> : <Play size={16} />}
          {playing ? 'Pausar' : 'Simular partida'}
        </button>
        <input
          type="range"
          aria-label="Ponto de operação"
          min={0}
          max={99.7}
          step={0.5}
          value={opPct}
          onChange={(e) => {
            setPlaying(false)
            moverOperacao(Number(e.target.value))
          }}
          className="flex-1 min-w-[160px] accent-[var(--color-accent)]"
        />
        <div className="font-mono text-xs text-muted whitespace-nowrap">
          s = {(opS * 100).toFixed(1)}% · T = {opT.toFixed(0)}%
        </div>
      </div>
      <div className="font-mono text-sm text-accent -mt-3 mb-4">{fase}</div>

      <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
        <label className="flex flex-col gap-1 font-mono text-xs">
          <span className="text-muted">Tensão V = {(params.V * 100).toFixed(0)}% da nominal</span>
          <input
            type="range"
            aria-label="Tensão"
            min={0.5}
            max={1.15}
            step={0.01}
            value={params.V}
            onChange={(e) => setParam('V', Number(e.target.value))}
            className="accent-[var(--color-accent)]"
          />
        </label>

        <label className="flex flex-col gap-1 font-mono text-xs">
          <span className="text-muted">Frequência f = {params.freq} Hz (mantendo a tensão)</span>
          <input
            type="range"
            aria-label="Frequência"
            min={30}
            max={60}
            step={1}
            value={params.freq}
            onChange={(e) => setParam('freq', Number(e.target.value))}
            className="accent-[var(--color-accent)]"
          />
        </label>

        <label className="flex flex-col gap-1 font-mono text-xs">
          <span className="text-muted">
            Resistência do rotor Rr = {params.Rr.toFixed(1)}× {params.Rr > 1.3 ? '(rotor bobinado + reostato)' : ''}
          </span>
          <input
            type="range"
            aria-label="Resistência do rotor"
            min={0.5}
            max={4}
            step={0.1}
            value={params.Rr}
            onChange={(e) => setParam('Rr', Number(e.target.value))}
            className="accent-[var(--color-accent)]"
          />
        </label>

        <label className="flex flex-col gap-1 font-mono text-xs">
          <span className="text-muted">Resistência do estator Rs = {params.Rs.toFixed(1)}×</span>
          <input
            type="range"
            aria-label="Resistência do estator"
            min={0.5}
            max={2}
            step={0.1}
            value={params.Rs}
            onChange={(e) => setParam('Rs', Number(e.target.value))}
            className="accent-[var(--color-accent)]"
          />
        </label>

        <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted sm:col-span-2">
          Polos:
          {[2, 4, 6, 8].map((p) => (
            <button
              key={p}
              onClick={() => setParam('poles', p)}
              className={`px-2.5 py-1 rounded ${
                params.poles === p ? 'bg-accent text-bg font-semibold' : 'bg-bg text-muted hover:text-text'
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setParams({ ...BASELINE_PARAMS })}
            className="ml-auto flex items-center gap-1.5 border border-muted text-text px-2.5 py-1 rounded hover:border-line hover:text-line"
          >
            <RotateCcw size={13} />
            Resetar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 font-mono text-sm">
        <div className="border border-line/20 rounded px-3 py-2">
          <div className="text-muted text-xs">ns</div>
          <div className="text-accent text-lg">{nsVal.toFixed(0)} rpm</div>
        </div>
        <div className="border border-line/20 rounded px-3 py-2">
          <div className="text-muted text-xs">Tp (partida)</div>
          <div data-stat="tp" className="text-text text-lg">{tp.toFixed(0)}%</div>
        </div>
        <div className="border border-line/20 rounded px-3 py-2">
          <div className="text-muted text-xs">Tmáx</div>
          <div data-stat="tmax" className="text-text text-lg">{tMax.toFixed(0)}%</div>
        </div>
        <div className="border border-line/20 rounded px-3 py-2">
          <div className="text-muted text-xs">s em Tmáx</div>
          <div data-stat="smax" className="text-text text-lg">
            {picoNaPartida ? 'na partida' : `${(sMaxT * 100).toFixed(0)}%`}
          </div>
        </div>
      </div>

      <div className="text-muted text-xs font-mono mt-4 leading-relaxed space-y-2">
        <p>
          <span className="text-text">Rr:</span> aumentar desloca o Tmáx para escorregamentos maiores e eleva o Tp, sem
          mudar o valor do Tmáx. É o efeito buscado ao inserir resistência externa no rotor bobinado, e o motivo pelo
          qual a categoria D tem torque de partida alto.
          {picoNaPartida && ' Neste ajuste, o maior torque já acontece na própria partida.'}
        </p>
        <p>
          <span className="text-text">V:</span> reduzir a tensão derruba o torque em todos os pontos, proporcionalmente
          a V². Por isso a partida com tensão reduzida exige atenção ao Tp.
        </p>
        <p>
          <span className="text-text">Polos e frequência:</span> mudam ns = 120·f/p. Com os mesmos V, R e X, o torque é
          proporcional a p/f, pois T = P/ω. Baixar só a frequência faz o torque subir porque o fluxo aumenta. Na prática,
          o inversor varia tensão e frequência juntas para evitar saturar o motor.
        </p>
      </div>
    </div>
  )
}
