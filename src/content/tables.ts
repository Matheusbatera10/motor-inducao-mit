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

/**
 * Explicação de cada campo da placa e valores das duas placas WEG da Tabela 3.38.
 * '—' = o campo não aparece legível nessa placa da apostila.
 */
export const placaDetalhes: Record<number, { oQueE: string; prova: string; motor1: string; motor100: string }> = {
  1: { oQueE: 'Número que identifica o modelo e a especificação do motor junto ao fabricante.', prova: 'Serve para pedir peça ou motor igual. Não entra em cálculo.', motor1: '11310148', motor100: '11094316' },
  2: { oQueE: 'Quantidade de fases da alimentação. “3~” significa trifásico em corrente alternada.', prova: 'O √3 da fórmula da corrente vem de ser trifásico.', motor1: '3~', motor100: '3~' },
  3: { oQueE: 'Tensões de linha em que o motor pode operar, conforme a ligação das bobinas.', prova: '220/380 V: Δ em 220 V e Y em 380 V, com bobina de 220 V. Menor tensão, maior corrente.', motor1: '220/380 V', motor100: '220/380/440 V' },
  4: { oQueE: 'A regularidade de carga para a qual o motor foi especificado (S1 a S10).', prova: 'S1 é regime contínuo: carga constante até o equilíbrio térmico.', motor1: 'S1', motor100: 'S1' },
  5: { oQueE: 'Rendimento η: razão entre a potência de saída no eixo e a potência elétrica de entrada.', prova: 'Sempre abaixo de 100%. Entra na fórmula de In e no cálculo de P1 = Peixo/η.', motor1: '82,6%', motor100: '95,5%' },
  6: { oQueE: 'Tamanho padronizado da carcaça.', prova: 'Define dimensões de fixação. Não entra em cálculo.', motor1: '80', motor100: '250S/M' },
  7: { oQueE: 'Proteção do invólucro: 1º algarismo contra sólidos e contato, 2º contra água.', prova: 'IP55: protegido contra acúmulo de poeira nociva e jatos de água.', motor1: 'IP55', motor100: 'IP55W' },
  8: { oQueE: 'Classe térmica do sistema de isolamento: A 105°C, E 120°C, B 130°C, F 155°C, H 180°C.', prova: 'A classe é o limite do ponto mais quente, não a temperatura de trabalho.', motor1: 'F', motor100: 'F' },
  9: { oQueE: 'Elevação de temperatura Δt do enrolamento acima do ambiente.', prova: 'A classe F admite Δt de 105°C. Com 80 K, as duas placas sobram em relação ao limite da classe.', motor1: 'ΔT 80 K', motor100: 'ΔT 80 K' },
  10: { oQueE: 'Frequência nominal da rede.', prova: 'Com a rotação, permite achar ns e o número de polos.', motor1: '60 Hz', motor100: '60 Hz' },
  11: { oQueE: 'Potência mecânica nominal entregue no eixo, em kW e cv.', prova: 'É potência de saída, não a potência consumida da rede.', motor1: '0,75 kW (1 cv)', motor100: '75 kW (100 cv)' },
  12: { oQueE: 'Rotação real do rotor a plena carga. É sempre menor que a síncrona.', prova: 'É o dado para achar polos, ns, s e f2.', motor1: '1725 rpm', motor100: '1780 rpm' },
  13: { oQueE: 'Corrente de linha a plena carga, em cada tensão da placa.', prova: 'A ordem acompanha as tensões: 2,87 A em 220 V e 1,66 A em 380 V.', motor1: '2,87 / 1,66 A', motor100: '236 / 137 / 118 A' },
  14: { oQueE: 'Fator de potência cosφ a plena carga.', prova: 'Entra na fórmula de In. O motor absorve reativo para magnetizar por causa do entreferro.', motor1: '0,83', motor100: '0,87' },
  15: { oQueE: 'Temperatura máxima do meio refrigerante para a qual o motor foi especificado.', prova: 'Condição usual da NBR 17094: até 40°C.', motor1: '40°C', motor100: '40°C' },
  16: { oQueE: 'Fator de serviço: sobrecarga permissível contínua.', prova: 'FS 1,15 suporta 15% acima da nominal continuamente. Não é a capacidade de pico, que é o Tmáx.', motor1: '1,15', motor100: '1,25' },
  17: { oQueE: 'Altitude máxima de instalação sem redução de potência.', prova: 'Condição usual: até 1000 m. Acima disso o ar rarefeito refrigera menos.', motor1: '1000 m', motor100: '1000 m' },
  18: { oQueE: 'Massa do motor.', prova: 'Dado de transporte e instalação. Não entra em cálculo.', motor1: '—', motor100: '526 kg' },
  19: { oQueE: 'Rolamento dianteiro e a quantidade de graxa.', prova: 'Dado de manutenção.', motor1: '6204-ZZ', motor100: '6314-C3 (27 g)' },
  20: { oQueE: 'Rolamento traseiro e a quantidade de graxa.', prova: 'Dado de manutenção.', motor1: '6203-ZZ', motor100: '6314-C3 (27 g)' },
  21: { oQueE: 'Tipo de graxa usada nos rolamentos.', prova: 'Dado de manutenção.', motor1: 'Polyrex EM (Esso)', motor100: 'Polyrex EM (Esso)' },
  22: { oQueE: 'Esquema de ligação dos terminais para cada tensão.', prova: 'Mostra como fechar Δ ou Y. Na placa de 100 cv, Y aparece só para partida.', motor1: 'Δ 220 V · Y 380 V', motor100: 'ΔΔ 220 V · YY 380 V · Δ 440 V' },
  23: { oQueE: 'Intervalo de relubrificação, em horas.', prova: 'Dado de manutenção.', motor1: '—', motor100: '12000 h' },
  24: { oQueE: 'Certificações do produto.', prova: 'Atestam conformidade. Não entram em cálculo.', motor1: 'CE, Inmetro, Procel', motor100: 'CE, Inmetro, Procel' },
  25: { oQueE: 'Relação Ip/In: quantas vezes a corrente de partida é maior que a nominal.', prova: 'Ip = (Ip/In) · In. No motor de 100 cv em 220 V: 7,5 · 236 = 1770 A.', motor1: '7,3', motor100: '7,5' },
  26: { oQueE: 'Categoria de conjugado: N, H ou D.', prova: 'N: torque e corrente de partida normais e baixo escorregamento. É a maioria do mercado.', motor1: 'N', motor100: 'N' },
  27: { oQueE: 'Corrente quando o motor opera no fator de serviço.', prova: 'I_FS = FS · In. No motor de 100 cv em 220 V: 1,25 · 236 = 295 A.', motor1: '—', motor100: '295 / 171 / 148 A' },
}

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
