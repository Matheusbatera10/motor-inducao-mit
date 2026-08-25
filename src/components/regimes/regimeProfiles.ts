// Perfis esquemáticos de carga para cada regime de serviço (S1-S10, NBR 17094).
// As durações são unidades relativas (não minutos reais) — o objetivo é mostrar a
// FORMA de cada regime (com/sem repouso, com/sem frenagem, atinge ou não o
// equilíbrio térmico), não reproduzir um ensaio específico com valores medidos.

export interface Segment {
  label: string
  dur: number
  load: number // 1 = carga nominal; negativo = frenagem elétrica; fração = vazio/parcial
}

export interface RegimeProfile {
  codigo: string
  periodic: boolean
  tau: number // constante de tempo térmica relativa
  segments: Segment[]
  nota: string
}

const T_TOTAL = 24

export const regimeProfiles: Record<string, RegimeProfile> = {
  S1: {
    codigo: 'S1',
    periodic: false,
    tau: 5,
    segments: [{ label: 'Carga nominal constante', dur: 24, load: 1 }],
    nota: 'Carga constante até atingir o equilíbrio térmico — sem repouso.',
  },
  S2: {
    codigo: 'S2',
    periodic: false,
    tau: 6,
    segments: [
      { label: 'Carga', dur: 6, load: 1 },
      { label: 'Repouso', dur: 18, load: 0 },
    ],
    nota: 'Carga por tempo menor que o necessário para o equilíbrio térmico, seguida de repouso.',
  },
  S3: {
    codigo: 'S3',
    periodic: true,
    tau: 5,
    segments: [
      { label: 'Carga', dur: 4, load: 1 },
      { label: 'Repouso', dur: 6, load: 0 },
    ],
    nota: 'Ciclos de carga + repouso — a temperatura oscila sem nunca atingir o equilíbrio térmico.',
  },
  S4: {
    codigo: 'S4',
    periodic: true,
    tau: 5,
    segments: [
      { label: 'Partida', dur: 1, load: 1.5 },
      { label: 'Carga', dur: 4, load: 1 },
      { label: 'Repouso', dur: 5, load: 0 },
    ],
    nota: 'Como o S3, mas cada ciclo inclui uma partida (corrente elevada) antes da carga constante.',
  },
  S5: {
    codigo: 'S5',
    periodic: true,
    tau: 5,
    segments: [
      { label: 'Partida', dur: 1, load: 1.5 },
      { label: 'Carga', dur: 4, load: 1 },
      { label: 'Frenagem', dur: 1, load: -1 },
      { label: 'Repouso', dur: 4, load: 0 },
    ],
    nota: 'Partida + carga + frenagem elétrica + repouso, em ciclos periódicos.',
  },
  S6: {
    codigo: 'S6',
    periodic: true,
    tau: 5,
    segments: [
      { label: 'Carga', dur: 4, load: 1 },
      { label: 'Vazio', dur: 3, load: 0.15 },
    ],
    nota: 'Carga constante alternada com funcionamento em vazio — sem repouso (motor nunca desliga).',
  },
  S7: {
    codigo: 'S7',
    periodic: true,
    tau: 5,
    segments: [
      { label: 'Partida', dur: 1, load: 1.5 },
      { label: 'Carga', dur: 4, load: 1 },
      { label: 'Frenagem', dur: 1, load: -1 },
    ],
    nota: 'Partida + carga + frenagem elétrica, repetido continuamente, sem repouso.',
  },
  S8: {
    codigo: 'S8',
    periodic: true,
    tau: 5,
    segments: [
      { label: 'Nível 1', dur: 3, load: 1 },
      { label: 'Nível 2', dur: 3, load: 0.6 },
      { label: 'Nível 3', dur: 3, load: 1.3 },
    ],
    nota: 'Múltiplos níveis de carga/rotação em sequência contínua, sem repouso.',
  },
  S9: {
    codigo: 'S9',
    periodic: false,
    tau: 5,
    segments: [
      { label: 'Carga baixa', dur: 3, load: 0.4 },
      { label: 'Pico', dur: 1, load: 1.6 },
      { label: 'Carga média', dur: 5, load: 0.8 },
      { label: 'Repouso', dur: 2, load: 0 },
      { label: 'Sobrecarga', dur: 1, load: 1.8 },
      { label: 'Carga baixa', dur: 6, load: 0.3 },
      { label: 'Carga média', dur: 6, load: 0.9 },
    ],
    nota: 'Variações não periódicas, com sobrecargas eventuais — sem padrão fixo de repetição.',
  },
  S10: {
    codigo: 'S10',
    periodic: false,
    tau: 2.5,
    segments: [
      { label: 'Nível 1', dur: 6, load: 0.6 },
      { label: 'Nível 2', dur: 6, load: 0.85 },
      { label: 'Nível 3', dur: 6, load: 1.0 },
      { label: 'Nível 4', dur: 6, load: 0.5 },
    ],
    nota: 'Até 4 níveis de carga distintos, cada um mantido até o próprio equilíbrio térmico.',
  },
}

export function loadAt(profile: RegimeProfile, t: number): number {
  const period = profile.segments.reduce((s, seg) => s + seg.dur, 0)
  let tt = profile.periodic ? t % period : Math.min(t, period)
  for (const seg of profile.segments) {
    if (tt < seg.dur || seg === profile.segments[profile.segments.length - 1]) return seg.load
    tt -= seg.dur
  }
  return 0
}

export interface SimPoint {
  t: number
  load: number
  perdas: number
  temp: number
}

/** Integra um modelo térmico de 1ª ordem simples: dT/dt = (load² - T) / tau */
export function simulate(profile: RegimeProfile): SimPoint[] {
  const dt = 0.05
  const out: SimPoint[] = []
  let temp = 0
  for (let t = 0; t <= T_TOTAL + 1e-9; t += dt) {
    const load = loadAt(profile, t)
    const perdas = load * load
    temp += (dt / profile.tau) * (perdas - temp)
    out.push({ t, load, perdas: perdas * 100, temp: temp * 100 })
  }
  return out
}

export const REGIME_TOTAL_TIME = T_TOTAL
