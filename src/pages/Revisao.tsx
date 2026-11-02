import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Shuffle } from 'lucide-react'
import { SectionLayout } from '../components/shared/SectionLayout'
import { flashcards, temas, type TemaRevisao } from '../content/revisao'

function TemaCard({ tema }: { tema: TemaRevisao }) {
  return (
    <section id={tema.id} className={`scroll-mt-20 border rounded p-5 ${tema.foco ? 'border-accent/50 bg-surface' : 'border-line/25 bg-surface'}`}>
      <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
        <span className="text-accent">{tema.secao}</span>
        {tema.foco && <span className="bg-accent text-bg font-semibold rounded px-1.5">FOCO</span>}
      </div>
      <h2 className="text-2xl mt-1">{tema.titulo}</h2>
      <p className="mt-3 text-lg leading-snug font-medium">{tema.umaFrase}</p>

      <h3 className="text-line text-base mt-5 mb-2">Como explicar na prova</h3>
      <ul className="space-y-2">
        {tema.explique.map((e) => (
          <li key={e} className="flex gap-2 text-text/90 leading-relaxed">
            <span className="text-accent shrink-0">▸</span>
            <span>{e}</span>
          </li>
        ))}
      </ul>

      <div className="grid md:grid-cols-2 gap-4 mt-5">
        <div className="border border-line/20 rounded p-3">
          <h3 className="text-line text-base mb-2">Guarde</h3>
          <ul className="space-y-1.5 text-sm text-text/90">
            {tema.guarde.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>
        <div className="border border-red-400/30 rounded p-3">
          <h3 className="text-red-300 text-base mb-2">Pegadinhas</h3>
          <ul className="space-y-1.5 text-sm text-text/90">
            {tema.pegadinhas.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </div>

      <Link to={tema.rota} className="inline-flex items-center gap-1.5 mt-4 text-sm text-line hover:underline">
        Ver a seção completa com os simuladores <ArrowRight size={14} />
      </Link>
    </section>
  )
}

function Flashcards() {
  const [ordem, setOrdem] = useState(() => flashcards.map((_, i) => i))
  const [abertos, setAbertos] = useState<Set<number>>(new Set())

  function alternar(i: number) {
    setAbertos((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  function embaralhar() {
    const nova = [...ordem]
    for (let i = nova.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[nova[i], nova[j]] = [nova[j], nova[i]]
    }
    setOrdem(nova)
    setAbertos(new Set())
  }

  return (
    <section id="cards" className="scroll-mt-20 mt-12">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-2xl">Cards de memorização</h2>
          <p className="text-muted text-sm">Responda de cabeça e toque para conferir.</p>
        </div>
        <button onClick={embaralhar} className="flex items-center gap-1.5 border border-line/40 text-line text-sm px-3 py-1.5 rounded hover:bg-line/10">
          <Shuffle size={14} /> Embaralhar
        </button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {ordem.map((i) => {
          const card = flashcards[i]
          const aberto = abertos.has(i)
          return (
            <button
              key={card.frente}
              onClick={() => alternar(i)}
              aria-expanded={aberto}
              className={`text-left border rounded p-4 min-h-28 transition-colors ${
                aberto ? 'border-accent bg-accent/10' : 'border-line/25 bg-surface hover:border-line'
              }`}
            >
              <div className="font-semibold text-sm">{card.frente}</div>
              {aberto ? (
                <div className="mt-2 text-sm text-text/90 leading-relaxed">{card.verso}</div>
              ) : (
                <div className="mt-2 text-xs text-muted">Toque para ver</div>
              )}
            </button>
          )
        })}
      </div>
    </section>
  )
}

export function Revisao() {
  return (
    <SectionLayout
      numero="VÉSPERA"
      titulo="Guia de revisão"
      resumo="O que dizer em cada tema, o que guardar e onde a prova pode confundir. Tudo com base no Cap. III."
    >
      <div className="border border-line/25 bg-surface rounded p-5 mb-6">
        <h2 className="text-xl mb-2">Estrutura para qualquer discursiva</h2>
        <ol className="space-y-1.5 leading-relaxed">
          <li><span className="text-accent font-semibold">1. O que é:</span> comece com a definição.</li>
          <li><span className="text-accent font-semibold">2. Por que acontece:</span> dê a causa física ou a fórmula.</li>
          <li><span className="text-accent font-semibold">3. O que muda na prática:</span> traga a consequência.</li>
          <li><span className="text-accent font-semibold">4. Exemplo:</span> um valor ou uma aplicação fecha a resposta.</li>
        </ol>
      </div>

      <nav aria-label="Temas" className="flex flex-wrap gap-1.5 mb-6">
        {temas.map((t) => (
          <a key={t.id} href={`#${t.id}`} className={`px-2.5 py-1 rounded text-xs ${t.foco ? 'bg-accent/20 text-accent' : 'bg-surface text-muted hover:text-text'}`}>
            {t.titulo}
          </a>
        ))}
        <a href="#cards" className="px-2.5 py-1 rounded text-xs bg-surface text-muted hover:text-text">Cards</a>
      </nav>

      <div className="space-y-5">
        {temas.map((t) => (
          <TemaCard key={t.id} tema={t} />
        ))}
      </div>

      <Flashcards />
    </SectionLayout>
  )
}
