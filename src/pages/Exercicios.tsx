import { useState } from 'react'
import { SectionLayout } from '../components/shared/SectionLayout'

interface Question {
  id: string
  enunciado: string
  pergunta: string
  resposta: string
}

const questions: Question[] = [
  {
    id: 'q1a',
    enunciado: 'Motor de indução trifásico de 6 polos, 3 ranhuras/polo/fase, 60Hz.',
    pergunta: 'Número total de ranhuras do estator?',
    resposta: '54',
  },
  {
    id: 'q1b',
    enunciado: 'Mesmo motor: 6 polos, 60Hz.',
    pergunta: 'Velocidade do campo girante (ns)?',
    resposta: '1200 rpm',
  },
  {
    id: 'q1c',
    enunciado: 'Mesmo motor, operando com escorregamento s = 3%.',
    pergunta: 'Velocidade do rotor?',
    resposta: '1164 rpm',
  },
  {
    id: 'q1d',
    enunciado: 'Mesmo motor, s = 3%.',
    pergunta: 'Frequência da corrente do rotor?',
    resposta: '1,8 Hz',
  },
  {
    id: 'q2a',
    enunciado: 'Motor de 4 polos, 60Hz, s = 5% a plena carga.',
    pergunta: 'Frequência induzida no rotor na partida?',
    resposta: '60 Hz',
  },
  {
    id: 'q2b',
    enunciado: 'Mesmo motor, a plena carga (s = 5%).',
    pergunta: 'Frequência induzida no rotor a plena carga?',
    resposta: '3 Hz',
  },
]

function QuizItem({ q }: { q: Question }) {
  const [revealed, setRevealed] = useState(false)

  return (
    <div className="border border-line/25 bg-surface rounded p-4">
      <p className="text-muted text-xs font-mono mb-1">{q.enunciado}</p>
      <p className="text-text font-mono text-sm mb-3">{q.pergunta}</p>
      {revealed ? (
        <div className="font-mono text-accent text-lg">{q.resposta}</div>
      ) : (
        <button
          onClick={() => setRevealed(true)}
          className="font-mono text-sm bg-line text-bg font-semibold px-3 py-1.5 rounded hover:brightness-110"
        >
          Ver resposta
        </button>
      )}
    </div>
  )
}

export function Exercicios() {
  return (
    <SectionLayout numero="" titulo="Exercícios" resumo="Exercícios propostos no capítulo, para revisão.">
      <div className="grid md:grid-cols-2 gap-4">
        {questions.map((q) => (
          <QuizItem key={q.id} q={q} />
        ))}
      </div>
    </SectionLayout>
  )
}
