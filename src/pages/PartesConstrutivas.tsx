import { useState } from 'react'
import { SectionContent, SectionLayout } from '../components/shared/SectionLayout'
import { getSection } from '../content/sections'

const parts = [
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
      'Núcleo de chapas magnéticas com ranhuras axiais para o enrolamento trifásico. As chapas reduzem perdas e melhoram o rendimento; a isolação entre chapas e bobinas evita colocar a carcaça sob tensão.',
  },
  {
    id: 'rotor-gaiola',
    nome: 'Rotor — Gaiola de esquilo',
    texto:
      'Barras de alumínio conectadas por anéis em ambas as extremidades, injetadas sob alta pressão/temperatura, sem isolação entre barras e núcleo. A forma das ranhuras influencia a curva de torque. Robusto — é o tipo mais comum.',
  },
  {
    id: 'rotor-bobinado',
    nome: 'Rotor — Bobinado',
    texto:
      'Enrolamento trifásico (geralmente em cobre) semelhante ao do estator, com terminais ligados a anéis coletores e escovas acessíveis externamente. Mais caro e menos robusto; usado quando se precisa de torque de partida elevado.',
  },
  {
    id: 'eixo',
    nome: 'Eixo',
    texto: 'Transmite o torque mecânico gerado no rotor para a carga acoplada externamente.',
  },
  {
    id: 'rolamentos',
    nome: 'Rolamentos',
    texto: 'Sustentam o eixo nas tampas dianteira e traseira, permitindo a rotação livre com atrito mínimo.',
  },
  {
    id: 'ventilador',
    nome: 'Ventilador + tampa defletora',
    texto: 'Montado no eixo, força ar sobre a carcaça aletada para auxiliar a dissipação de calor em motores fechados.',
  },
  {
    id: 'caixa-ligacao',
    nome: 'Caixa de ligação',
    texto: 'Abriga os terminais do enrolamento (1-6, 1-9 ou 1-12) para a ligação da alimentação trifásica.',
  },
]

export function PartesConstrutivas() {
  const section = getSection('partes-construtivas')!
  const [active, setActive] = useState(parts[0].id)
  const activePart = parts.find((p) => p.id === active)!

  return (
    <SectionLayout numero={section.numero} titulo={section.titulo} resumo={section.resumo}>
      <SectionContent section={section} />

      <div className="mt-10">
        <h2 className="text-2xl mb-4">Peças do motor</h2>
        <div className="grid md:grid-cols-[220px_1fr] gap-4">
          <div className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible">
            {parts.map((p) => (
              <button
                key={p.id}
                onClick={() => setActive(p.id)}
                className={`text-left px-3 py-2 rounded text-sm font-mono whitespace-nowrap md:whitespace-normal transition-colors ${
                  active === p.id ? 'bg-line text-bg font-semibold' : 'bg-surface text-text/80 hover:text-line'
                }`}
              >
                {p.nome}
              </button>
            ))}
          </div>
          <div className="border border-line/30 bg-surface rounded p-6 grid-mesh">
            <h3 className="text-xl mb-2">{activePart.nome}</h3>
            <p className="text-text/90 font-mono text-sm leading-relaxed">{activePart.texto}</p>
          </div>
        </div>
      </div>
    </SectionLayout>
  )
}
