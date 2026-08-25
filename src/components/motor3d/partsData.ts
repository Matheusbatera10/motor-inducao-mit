export type RotorType = 'gaiola' | 'bobinado'

export interface PartInfo {
  id: string
  nome: string
  texto: string
}

export const partsInfo: PartInfo[] = [
  {
    id: 'carcaca',
    nome: 'Carcaça',
    texto:
      'Estrutura que suporta as demais partes (tampas, caixa de ligação); geralmente em ferro fundido, com aletas para dissipação de calor.',
  },
  {
    id: 'estator',
    nome: 'Estator',
    texto:
      'Núcleo de chapas magnéticas com ranhuras axiais para o enrolamento trifásico. As chapas reduzem perdas e melhoram o rendimento.',
  },
  {
    id: 'rotor',
    nome: 'Rotor',
    texto:
      'Gaiola de esquilo: barras de alumínio curto-circuitadas por anéis, robusto e mais comum. Bobinado: enrolamento trifásico com anéis coletores e escovas, para maior torque de partida. Use o toggle para alternar.',
  },
  {
    id: 'eixo',
    nome: 'Eixo',
    texto: 'Transmite o torque mecânico gerado no rotor para a carga acoplada externamente.',
  },
  {
    id: 'tampa-traseira',
    nome: 'Tampa traseira',
    texto: 'Fecha a carcaça na extremidade traseira e sustenta o rolamento traseiro do eixo.',
  },
  {
    id: 'tampa-dianteira',
    nome: 'Tampa dianteira',
    texto: 'Fecha a carcaça na extremidade dianteira (lado do acoplamento) e sustenta o rolamento dianteiro.',
  },
  {
    id: 'rolamento-traseiro',
    nome: 'Rolamento traseiro',
    texto: 'Sustenta o eixo na tampa traseira, permitindo rotação livre com atrito mínimo.',
  },
  {
    id: 'rolamento-dianteiro',
    nome: 'Rolamento dianteiro',
    texto: 'Sustenta o eixo na tampa dianteira, permitindo rotação livre com atrito mínimo.',
  },
  {
    id: 'ventilador',
    nome: 'Ventilador + tampa defletora',
    texto: 'Montado no eixo, força ar sobre a carcaça aletada; a tampa defletora direciona o fluxo de ar sobre as aletas.',
  },
  {
    id: 'caixa-ligacao',
    nome: 'Caixa de ligação',
    texto: 'Abriga os terminais do enrolamento (1-6, 1-9 ou 1-12) para a ligação da alimentação trifásica.',
  },
]

export function getPartInfo(id: string) {
  return partsInfo.find((p) => p.id === id)
}
