// Tabelas do Anexo A do Capítulo III — extraídas por reconhecimento de texto
// direto sobre as imagens do PDF original (não por leitura visual aproximada).

export interface TorqueRow {
  cv: string
  kw: string
  p2?: [number, number, number]
  p4?: [number, number, number]
  p6?: [number, number, number]
  p8?: [number, number, number]
}

/** Tabela 3.1 — Categoria N. Cada tripla é [Cp, Cmín, Cmáx] em pu do torque nominal. */
export const tabela31CategoriaN: TorqueRow[] = [
  { cv: '>0,54 ≤0,63', kw: '>0,40 ≤0,63', p2: [1.9, 1.3, 2.0], p4: [2.0, 1.4, 2.0], p6: [1.7, 1.2, 1.7], p8: [1.5, 1.1, 1.6] },
  { cv: '>0,86 ≤1,40', kw: '>0,63 ≤1,00', p2: [1.8, 1.2, 2.0], p4: [1.9, 1.3, 2.0], p6: [1.7, 1.2, 1.8], p8: [1.5, 1.1, 1.7] },
  { cv: '>1,40 ≤2,20', kw: '>1,00 ≤1,60', p2: [1.8, 1.2, 2.0], p4: [1.9, 1.3, 2.0], p6: [1.6, 1.1, 1.9], p8: [1.4, 1.0, 1.8] },
  { cv: '>2,20 ≤3,40', kw: '>1,60 ≤2,50', p2: [1.7, 1.1, 2.0], p4: [1.8, 1.2, 2.0], p6: [1.6, 1.1, 1.9], p8: [1.4, 1.0, 1.8] },
  { cv: '>3,40 ≤5,40', kw: '>2,50 ≤4,00', p2: [1.6, 1.1, 2.0], p4: [1.7, 1.2, 2.0], p6: [1.5, 1.1, 1.9], p8: [1.3, 1.0, 1.8] },
  { cv: '>5,40 ≤8,60', kw: '>4,00 ≤6,30', p2: [1.5, 1.0, 2.0], p4: [1.6, 1.1, 2.0], p6: [1.5, 1.1, 1.9], p8: [1.3, 1.0, 1.8] },
  { cv: '>8,60 ≤14,00', kw: '>6,30 ≤10,00', p2: [1.5, 1.0, 2.0], p4: [1.6, 1.1, 2.0], p6: [1.5, 1.1, 1.8], p8: [1.3, 1.0, 1.7] },
  { cv: '>14,00 ≤22,00', kw: '>10,00 ≤16,00', p2: [1.4, 1.0, 2.0], p4: [1.5, 1.1, 2.0], p6: [1.4, 1.0, 1.8], p8: [1.2, 0.9, 1.7] },
  { cv: '>22,00 ≤34,00', kw: '>16,00 ≤25,00', p2: [1.3, 0.9, 1.9], p4: [1.4, 1.0, 1.9], p6: [1.4, 1.0, 1.8], p8: [1.2, 0.9, 1.7] },
  { cv: '>34,00 ≤54,00', kw: '>25,00 ≤40,00', p2: [1.2, 0.9, 1.9], p4: [1.3, 1.0, 1.9], p6: [1.3, 1.0, 1.8], p8: [1.2, 0.9, 1.7] },
  { cv: '>54,00 ≤86,00', kw: '>40,00 ≤63,00', p2: [1.1, 0.8, 1.8], p4: [1.2, 0.9, 1.8], p6: [1.2, 0.9, 1.7], p8: [1.1, 0.8, 1.7] },
  { cv: '>86,00 ≤140,00', kw: '>63,00 ≤100,00', p2: [1.0, 0.8, 1.8], p4: [1.1, 0.8, 1.8], p6: [1.1, 0.8, 1.7], p8: [1.0, 0.7, 1.6] },
  { cv: '>140,00 ≤220,00', kw: '>100,00 ≤160,00', p2: [0.9, 0.7, 1.7], p4: [1.0, 0.8, 1.7], p6: [1.0, 0.8, 1.7], p8: [0.9, 0.7, 1.6] },
  { cv: '>220,00 ≤340,00', kw: '>160,00 ≤250,00', p2: [0.8, 0.6, 1.7], p4: [0.9, 0.7, 1.7], p6: [0.9, 0.7, 1.6], p8: [0.9, 0.7, 1.6] },
  { cv: '>340,00 ≤540,00', kw: '>250,00 ≤400,00', p2: [0.75, 0.6, 1.6], p4: [0.75, 0.6, 1.6], p6: [0.75, 0.6, 1.6], p8: [0.75, 0.6, 1.6] },
  { cv: '>540,00 ≤860,00', kw: '>400,00 ≤630,00', p2: [0.65, 0.5, 1.6], p4: [0.65, 0.5, 1.6], p6: [0.65, 0.5, 1.6], p8: [0.65, 0.6, 1.6] },
]

/** Tabela 3.2 — Categoria H. Cada tripla é [Cp, Cmín, Cmáx] em pu do torque nominal. */
export const tabela32CategoriaH: TorqueRow[] = [
  { cv: '>0,54 ≤0,63', kw: '>0,40 ≤0,63', p4: [3.0, 2.1, 2.1], p6: [2.55, 1.8, 1.9], p8: [2.25, 1.65, 1.9] },
  { cv: '>0,86 ≤1,40', kw: '>0,63 ≤1,00', p4: [2.85, 1.95, 2.0], p6: [2.55, 1.8, 1.9], p8: [2.25, 1.65, 1.9] },
  { cv: '>1,40 ≤2,20', kw: '>1,00 ≤1,60', p4: [2.85, 1.95, 2.0], p6: [2.4, 1.65, 1.9], p8: [2.1, 1.5, 1.9] },
  { cv: '>2,20 ≤3,40', kw: '>1,60 ≤2,50', p4: [2.7, 1.8, 2.0], p6: [2.4, 1.65, 1.9], p8: [2.1, 1.5, 1.9] },
  { cv: '>3,40 ≤5,40', kw: '>2,50 ≤4,00', p4: [2.55, 1.8, 2.0], p6: [2.25, 1.65, 1.9], p8: [2.0, 1.5, 1.9] },
  { cv: '>5,40 ≤8,60', kw: '>4,00 ≤6,30', p4: [2.4, 1.65, 2.0], p6: [2.25, 1.65, 1.9], p8: [2.0, 1.5, 1.9] },
  { cv: '>8,60 ≤14,00', kw: '>6,30 ≤10,00', p4: [2.4, 1.65, 2.0], p6: [2.25, 1.65, 1.9], p8: [2.0, 1.5, 1.9] },
  { cv: '>14,00 ≤22,00', kw: '>10,00 ≤16,00', p4: [2.25, 1.65, 2.0], p6: [2.1, 1.5, 1.9], p8: [2.0, 1.4, 1.9] },
  { cv: '>22,00 ≤34,00', kw: '>16,00 ≤25,00', p4: [2.1, 1.5, 1.9], p6: [2.1, 1.5, 1.9], p8: [2.0, 1.4, 1.9] },
  { cv: '>34,00 ≤54,00', kw: '>25,00 ≤40,00', p4: [2.0, 1.5, 1.9], p6: [2.0, 1.5, 1.9], p8: [2.0, 1.4, 1.9] },
  { cv: '>54,00 ≤86,00', kw: '>40,00 ≤63,00', p4: [2.0, 1.4, 1.9], p6: [2.0, 1.4, 1.9], p8: [2.0, 1.4, 1.9] },
  { cv: '>86,00 ≤140,00', kw: '>63,00 ≤100,00', p4: [2.0, 1.4, 1.9], p6: [2.0, 1.4, 1.9], p8: [2.0, 1.4, 1.9] },
  { cv: '>140,00 ≤220,00', kw: '>100,00 ≤160,00', p4: [2.0, 1.4, 1.9], p6: [2.0, 1.4, 1.9], p8: [2.0, 1.4, 1.9] },
]

/** Tabela 3.4 — Fator de multiplicação α da potência útil (temperatura °C × altitude m). '—' = não aplicável. */
export const tabela34FatorAlpha: { temp: number; valores: (number | null)[] }[] = [
  { temp: 10, valores: [null, null, null, null, null, null, 0.97, 0.92, 0.88] },
  { temp: 15, valores: [null, null, null, null, null, 0.98, 0.94, 0.9, 0.86] },
  { temp: 20, valores: [null, null, null, null, 1.0, 0.95, 0.91, 0.87, 0.83] },
  { temp: 25, valores: [null, null, null, 1.0, 0.95, 0.93, 0.89, 0.85, 0.81] },
  { temp: 30, valores: [null, null, 1.0, 0.96, 0.92, 0.9, 0.86, 0.82, 0.78] },
  { temp: 35, valores: [null, 1.0, 0.95, 0.93, 0.9, 0.88, 0.84, 0.8, 0.75] },
  { temp: 40, valores: [1.0, 0.97, 0.94, 0.9, 0.86, 0.82, 0.8, 0.76, 0.71] },
  { temp: 45, valores: [0.95, 0.92, 0.9, 0.88, 0.85, 0.81, 0.78, 0.74, 0.69] },
  { temp: 50, valores: [0.92, 0.9, 0.87, 0.85, 0.82, 0.8, 0.77, 0.72, 0.67] },
  { temp: 55, valores: [0.88, 0.85, 0.83, 0.81, 0.78, 0.76, 0.73, 0.7, 0.65] },
  { temp: 60, valores: [0.83, 0.82, 0.8, 0.77, 0.75, 0.73, 0.7, 0.67, 0.62] },
  { temp: 65, valores: [0.79, 0.76, 0.74, 0.72, 0.7, 0.68, 0.66, 0.62, 0.58] },
  { temp: 70, valores: [0.74, 0.71, 0.69, 0.67, 0.66, 0.64, 0.62, 0.58, 0.53] },
  { temp: 75, valores: [0.7, 0.68, 0.66, 0.64, 0.62, 0.6, 0.58, 0.53, 0.49] },
  { temp: 80, valores: [0.65, 0.64, 0.62, 0.6, 0.58, 0.56, 0.55, 0.48, 0.44] },
]
export const tabela34Altitudes = [1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000]

/** Tabela 3.5 — 1º algarismo IP: proteção contra corpos sólidos / contato */
export const ipPrimeiroAlgarismo: { n: number; label: string }[] = [
  { n: 0, label: 'Não protegida' },
  { n: 1, label: 'Objetos >50mm' },
  { n: 2, label: 'Objetos >12mm' },
  { n: 3, label: 'Objetos >2,5mm' },
  { n: 4, label: 'Objetos >1mm' },
  { n: 5, label: 'Protegida contra poeira' },
  { n: 6, label: 'Totalmente protegida contra poeira' },
]

/** Tabela 3.6 — 2º algarismo IP: proteção contra água */
export const ipSegundoAlgarismo: { n: number; label: string }[] = [
  { n: 0, label: 'Não protegida' },
  { n: 1, label: 'Gotejamento vertical' },
  { n: 2, label: 'Gotejamento até 15°' },
  { n: 3, label: 'Aspersão de água' },
  { n: 4, label: 'Projeções de água' },
  { n: 5, label: 'Jatos de água' },
  { n: 6, label: 'Jatos potentes' },
  { n: 7, label: 'Imersão temporária' },
  { n: 8, label: 'Imersão contínua' },
]

/** Tabela 3.7 — Graus de proteção combinados mais comuns */
export const tabela37GrausCombinados: {
  ip: string
  contato: string
  corpos: string
  agua: string
}[] = [
  { ip: 'IP00', contato: 'Não tem', corpos: 'Não tem', agua: 'Não tem' },
  { ip: 'IP02', contato: 'Não tem', corpos: 'Não tem', agua: 'Pingos de água até 15° com a vertical' },
  { ip: 'IP11', contato: 'Toque acidental com a mão', corpos: 'Corpos sólidos estranhos >50mm', agua: 'Pingos de água na vertical' },
  { ip: 'IP12', contato: '(idem)', corpos: '(idem)', agua: 'Pingos de água até 15° com a vertical' },
  { ip: 'IP13', contato: '(idem)', corpos: '(idem)', agua: 'Água da chuva até 60° com a vertical' },
  { ip: 'IP21', contato: 'Toque com os dedos', corpos: 'Corpos sólidos estranhos de 12mm', agua: 'Pingos de água na vertical' },
  { ip: 'IP22', contato: '(idem)', corpos: '(idem)', agua: 'Pingos de água até 15° com a vertical' },
  { ip: 'IP23', contato: '(idem)', corpos: '(idem)', agua: 'Água da chuva até 60° com a vertical' },
  { ip: 'IP44', contato: 'Toque com ferramentas', corpos: 'Corpos sólidos estranhos >1mm', agua: 'Respingos de todas as direções' },
  { ip: 'IP54', contato: 'Proteção completa contra toque', corpos: 'Proteção contra acúmulo de poeiras nocivas', agua: 'Respingos de todas as direções' },
  { ip: 'IP55', contato: 'Proteção completa contra toque', corpos: 'Proteção contra acúmulo de poeiras nocivas', agua: 'Jatos de água em todas as direções' },
  { ip: 'IP(W)55', contato: 'Proteção completa contra toque', corpos: 'Proteção contra acúmulo de poeiras nocivas', agua: 'Chuva, maresia' },
]

/** Classes de isolamento térmico (NBR 17094) */
export const classesIsolamento: {
  classe: string
  ambiente: number
  elevacao: number
  pontoMaisQuente: number
  total: number
}[] = [
  { classe: 'A', ambiente: 40, elevacao: 60, pontoMaisQuente: 5, total: 105 },
  { classe: 'E', ambiente: 40, elevacao: 75, pontoMaisQuente: 5, total: 120 },
  { classe: 'B', ambiente: 40, elevacao: 80, pontoMaisQuente: 10, total: 130 },
  { classe: 'F', ambiente: 40, elevacao: 105, pontoMaisQuente: 10, total: 155 },
  { classe: 'H', ambiente: 40, elevacao: 125, pontoMaisQuente: 15, total: 180 },
]

/** Regimes de serviço S1-S10 (NBR 17094) */
export const regimesServico: { codigo: string; nome: string; descricao: string }[] = [
  { codigo: 'S1', nome: 'Contínuo', descricao: 'Carga constante até equilíbrio térmico' },
  { codigo: 'S2', nome: 'Tempo limitado', descricao: 'Carga constante por tempo menor que o necessário p/ equilíbrio térmico, seguido de repouso' },
  { codigo: 'S3', nome: 'Intermitente periódico', descricao: 'Ciclos de carga constante + repouso, sem atingir equilíbrio térmico' },
  { codigo: 'S4', nome: 'Intermitente periódico com partidas', descricao: 'Ciclos de partida + carga constante + repouso' },
  { codigo: 'S5', nome: 'Intermitente periódico com frenagem elétrica', descricao: 'Partida + carga + frenagem + repouso' },
  { codigo: 'S6', nome: 'Contínuo com carga intermitente', descricao: 'Carga constante + funcionamento em vazio (sem repouso)' },
  { codigo: 'S7', nome: 'Contínuo com frenagem elétrica', descricao: 'Partida + carga + frenagem (sem repouso)' },
  { codigo: 'S8', nome: 'Contínuo com mudança periódica carga/velocidade', descricao: 'Múltiplos níveis de carga/rotação sem repouso' },
  { codigo: 'S9', nome: 'Variações não periódicas', descricao: 'Variações não periódicas de carga e velocidade, com sobrecargas eventuais' },
  { codigo: 'S10', nome: 'Cargas constantes distintas', descricao: 'Até 4 níveis de carga, cada um mantido até equilíbrio térmico' },
]

/** Tabela 3.38 — Campos da placa de identificação (nameplate) */
export const placaIdentificacaoCampos: { n: number; campo: string }[] = [
  { n: 1, campo: 'Código do motor' },
  { n: 2, campo: 'Nº de fases' },
  { n: 3, campo: 'Tensão nominal' },
  { n: 4, campo: 'Regime de serviço' },
  { n: 5, campo: 'Rendimento' },
  { n: 6, campo: 'Modelo da carcaça' },
  { n: 7, campo: 'Grau de proteção' },
  { n: 8, campo: 'Classe de isolamento' },
  { n: 9, campo: 'Temperatura da classe de isolamento' },
  { n: 10, campo: 'Frequência' },
  { n: 11, campo: 'Potência' },
  { n: 12, campo: 'Rotação nominal' },
  { n: 13, campo: 'Corrente nominal' },
  { n: 14, campo: 'Fator de potência' },
  { n: 15, campo: 'Temperatura ambiente' },
  { n: 16, campo: 'Fator de serviço' },
  { n: 17, campo: 'Altitude' },
  { n: 18, campo: 'Massa' },
  { n: 19, campo: 'Especificação do rolamento dianteiro' },
  { n: 20, campo: 'Especificação do rolamento traseiro' },
  { n: 21, campo: 'Tipo de graxa' },
  { n: 22, campo: 'Esquema de ligação' },
  { n: 23, campo: 'Tempo de relubrificação' },
  { n: 24, campo: 'Certificações' },
  { n: 25, campo: 'Relação corrente de partida/nominal' },
  { n: 26, campo: 'Categoria de conjugado' },
  { n: 27, campo: 'Corrente no fator de serviço' },
]
