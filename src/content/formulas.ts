// Fórmulas centrais do Capítulo III — Máquinas de Indução Trifásicas.
// Reutilizadas pelas calculadoras interativas em todo o site.

/** Velocidade síncrona (rpm) */
export function ns(f: number, p: number): number {
  return (120 * f) / p
}

/** Escorregamento (pu) */
export function s(nsVal: number, n: number): number {
  return (nsVal - n) / nsVal
}

/** Frequência induzida no rotor (Hz) */
export function f2(sVal: number, f1: number): number {
  return sVal * f1
}

/** Conversão de graus elétricos para graus mecânicos */
export function mecanico(eletrico: number, p: number): number {
  return (2 / p) * eletrico
}

/** Corrente nominal (A), Pn em cv, UL em V */
export function In(Pn_cv: number, UL: number, cosphi: number, eta: number): number {
  return (Pn_cv * 736) / (Math.sqrt(3) * UL * cosphi * eta)
}

/** Fator de duração do ciclo — regime S3 (%) */
export function ED_S3(tN: number, tR: number): number {
  return (tN / (tN + tR)) * 100
}

/** Fator de duração do ciclo — regime S4 (%) */
export function ED_S4(tN: number, tD: number, tR: number): number {
  return ((tN + tD) / (tN + tD + tR)) * 100
}

/** Fator de duração do ciclo — regime S5 (%) */
export function ED_S5(tN: number, tD: number, tF: number, tR: number): number {
  return ((tN + tD + tF) / (tN + tD + tF + tR)) * 100
}

/** Fator de duração do ciclo — regime S6 (%) */
export function ED_S6(tN: number, tV: number): number {
  return (tN / (tN + tV)) * 100
}

/** Potência dissipada no cobre do rotor, a partir da potência de entreferro */
export function PcuRotor(sVal: number, Pentreferro: number): number {
  return sVal * Pentreferro
}

/** Potência mecânica gerada, a partir da potência de entreferro */
export function Pmecanica(sVal: number, Pentreferro: number): number {
  return (1 - sVal) * Pentreferro
}

/** Resistência fictícia (1-s)Rr/s do circuito equivalente — representa a potência mecânica convertida */
export function resistenciaFicticia(Rr: number, sVal: number): number {
  if (sVal === 0) return Infinity
  return ((1 - sVal) * Rr) / sVal
}
