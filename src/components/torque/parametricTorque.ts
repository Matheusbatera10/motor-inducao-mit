// Modelo físico simplificado (circuito equivalente aproximado, sem o ramo de
// magnetização) para o torque em função do escorregamento — usado para mostrar
// como tensão, frequência, polos e resistência do rotor mudam a curva.
//
// T(s) ∝ V² · (Rr/s) / [(Rs + Rr/s)² + X²]      (equação de Kloss / circuito aproximado)

export interface MotorParams {
  V: number // pu da tensão nominal (1.0 = nominal)
  freq: number // Hz
  poles: number
  Rr: number // multiplicador pu da resistência do rotor (1.0 = valor típico)
  Rs: number // multiplicador pu da resistência do estator (1.0 = valor típico)
}

export interface ParamTorquePoint {
  nPct: number
  tPct: number
  s: number
}

const RS_BASE = 0.03
const RR_BASE = 0.045
const X_BASE = 0.15
const FREQ_BASE = 60
const S_NOMINAL = 0.04

export const BASELINE_PARAMS: MotorParams = { V: 1, freq: 60, poles: 4, Rr: 1, Rs: 1 }

function rawTorque(s: number, p: MotorParams): number {
  const Rs = RS_BASE * p.Rs
  const Rr = RR_BASE * p.Rr
  const X = X_BASE * (p.freq / FREQ_BASE)
  const term = Rr / s
  return (p.V ** 2 * term) / ((Rs + term) ** 2 + X ** 2)
}

const T_REF = rawTorque(S_NOMINAL, BASELINE_PARAMS)

const N_POINTS = 160

/** s vai de ~1 (partida) a ~0.005 (quase síncrono), amostragem fixa por índice. */
export function sForIndex(i: number): number {
  return 1 - (i / N_POINTS) * 0.995
}

export function sampleParametricCurve(p: MotorParams): ParamTorquePoint[] {
  const out: ParamTorquePoint[] = []
  for (let i = 0; i <= N_POINTS; i++) {
    const s = sForIndex(i)
    out.push({ nPct: (1 - s) * 100, tPct: (rawTorque(s, p) / T_REF) * 100, s })
  }
  return out
}

export function slipAtMaxTorque(p: MotorParams): number {
  const Rs = RS_BASE * p.Rs
  const Rr = RR_BASE * p.Rr
  const X = X_BASE * (p.freq / FREQ_BASE)
  return Rr / Math.sqrt(Rs ** 2 + X ** 2)
}

export function torqueAtSlip(s: number, p: MotorParams): number {
  return (rawTorque(s, p) / T_REF) * 100
}
