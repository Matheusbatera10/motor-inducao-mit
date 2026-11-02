import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Check, RotateCcw, X, Bookmark } from 'lucide-react'
import { SectionLayout } from '../components/shared/SectionLayout'
import { calculos, discursivas, marcar, TEMAS, type Calculo, type Discursiva, type Marcar, type Tema } from '../content/questoes'

type Tipo = 'discursiva' | 'marcar' | 'calculo'
type Avaliacao = 'sabia' | 'revisar'

const TIPOS: { key: Tipo; label: string }[] = [
  { key: 'discursiva', label: 'Discursivas' },
  { key: 'marcar', label: 'De marcar' },
  { key: 'calculo', label: 'Cálculo' },
]

const CHAVE = 'mit-revisao-v1'

interface Progresso {
  avaliacoes: Record<string, Avaliacao>
  respostas: Record<string, number>
}

function carregar(): Progresso {
  try {
    const bruto = localStorage.getItem(CHAVE)
    if (bruto) return { avaliacoes: {}, respostas: {}, ...JSON.parse(bruto) }
  } catch {
    // Sem armazenamento disponível: o progresso vale só para esta visita.
  }
  return { avaliacoes: {}, respostas: {} }
}

function BotoesAvaliacao({ valor, onChange }: { valor?: Avaliacao; onChange: (a: Avaliacao) => void }) {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      <button
        onClick={() => onChange('sabia')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm border ${
          valor === 'sabia' ? 'bg-emerald-400 text-bg border-emerald-400 font-semibold' : 'border-line/30 text-muted hover:text-text'
        }`}
      >
        <Check size={15} /> Sabia
      </button>
      <button
        onClick={() => onChange('revisar')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm border ${
          valor === 'revisar' ? 'bg-accent text-bg border-accent font-semibold' : 'border-line/30 text-muted hover:text-text'
        }`}
      >
        <Bookmark size={15} /> Revisar depois
      </button>
    </div>
  )
}

function Cabecalho({ numero, tema, extra }: { numero: number; tema: Tema; extra?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-2 font-mono text-xs">
      <span className="text-accent font-semibold">Questão {numero}</span>
      <span className="text-muted">· {TEMAS[tema]}</span>
      {extra && <span className="text-line border border-line/40 rounded px-1.5">{extra}</span>}
    </div>
  )
}

function CardDiscursiva({ q, numero, avaliacao, avaliar }: { q: Discursiva; numero: number; avaliacao?: Avaliacao; avaliar: (a: Avaliacao) => void }) {
  const [aberta, setAberta] = useState(false)
  const [texto, setTexto] = useState('')
  return (
    <article data-questao={q.id} className="border border-line/25 bg-surface rounded p-5">
      <Cabecalho numero={numero} tema={q.tema} />
      <h3 className="font-sans normal-case tracking-normal font-semibold text-base leading-snug">{q.pergunta}</h3>
      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        rows={3}
        aria-label="Sua resposta"
        placeholder="Escreva sua resposta antes de conferir (opcional)"
        className="w-full mt-3 bg-bg border border-line/30 rounded px-3 py-2 text-sm text-text placeholder:text-muted/70"
      />
      {!aberta ? (
        <button onClick={() => setAberta(true)} className="mt-3 bg-line text-bg font-semibold text-sm px-3 py-1.5 rounded hover:brightness-110">
          Ver resposta modelo
        </button>
      ) : (
        <div className="mt-3 border-t border-line/20 pt-3">
          <p className="text-text/95 leading-relaxed">{q.resposta}</p>
          <div className="mt-3 text-sm">
            <div className="text-line font-semibold mb-1">Sua resposta precisa ter:</div>
            <ul className="space-y-1">
              {q.pontos.map((p) => (
                <li key={p} className="flex gap-2 text-muted">
                  <span className="text-accent">▸</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <BotoesAvaliacao valor={avaliacao} onChange={avaliar} />
        </div>
      )}
    </article>
  )
}

/** Ordem fixa por questão, para a letra certa não seguir um padrão no banco. */
function ordemDasOpcoes(id: string, total: number): number[] {
  let semente = 0
  for (const c of id) semente = (semente * 31 + c.charCodeAt(0)) >>> 0
  const ordem = Array.from({ length: total }, (_, i) => i)
  for (let i = total - 1; i > 0; i--) {
    semente = (semente * 1664525 + 1013904223) >>> 0
    const j = semente % (i + 1)
    ;[ordem[i], ordem[j]] = [ordem[j], ordem[i]]
  }
  return ordem
}

function CardMarcar({ q, numero, resposta, responder, avaliacao, avaliar }: { q: Marcar; numero: number; resposta?: number; responder: (i: number) => void; avaliacao?: Avaliacao; avaliar: (a: Avaliacao) => void }) {
  const respondida = resposta !== undefined
  const ordem = ordemDasOpcoes(q.id, q.opcoes.length)
  const letraCerta = String.fromCharCode(97 + ordem.indexOf(q.correta))
  return (
    <article data-questao={q.id} className="border border-line/25 bg-surface rounded p-5">
      <Cabecalho numero={numero} tema={q.tema} />
      <h3 className="font-sans normal-case tracking-normal font-semibold text-base leading-snug">{q.pergunta}</h3>
      <div className="mt-3 space-y-2">
        {ordem.map((i, posicao) => {
          const op = q.opcoes[i]
          const certa = i === q.correta
          const marcada = i === resposta
          let cor = 'border-line/30 hover:border-line text-text/90'
          if (respondida) {
            if (certa) cor = 'border-emerald-400 bg-emerald-400/15 text-text'
            else if (marcada) cor = 'border-red-400 bg-red-400/15 text-text'
            else cor = 'border-line/15 text-muted'
          }
          return (
            <button
              key={op}
              disabled={respondida}
              onClick={() => responder(i)}
              className={`w-full flex items-start gap-2.5 text-left border rounded px-3 py-2 text-sm transition-colors ${cor}`}
            >
              <span className="font-mono text-xs mt-0.5 shrink-0">{String.fromCharCode(97 + posicao)})</span>
              <span className="flex-1">{op}</span>
              {respondida && certa && <Check size={16} className="text-emerald-400 shrink-0" aria-label="Correta" />}
              {respondida && marcada && !certa && <X size={16} className="text-red-400 shrink-0" aria-label="Incorreta" />}
            </button>
          )
        })}
      </div>
      {respondida && (
        <div className="mt-3 border-t border-line/20 pt-3">
          <p className={`font-semibold text-sm ${resposta === q.correta ? 'text-emerald-400' : 'text-red-400'}`}>
            {resposta === q.correta ? 'Correto.' : `Incorreto. A certa é a letra ${letraCerta}.`}
          </p>
          <p className="text-muted text-sm mt-1 leading-relaxed">{q.explicacao}</p>
          <BotoesAvaliacao valor={avaliacao} onChange={avaliar} />
        </div>
      )}
    </article>
  )
}

function CardCalculo({ q, numero, avaliacao, avaliar }: { q: Calculo; numero: number; avaliacao?: Avaliacao; avaliar: (a: Avaliacao) => void }) {
  const [verFormula, setVerFormula] = useState(false)
  const [aberta, setAberta] = useState(false)
  return (
    <article data-questao={q.id} className="border border-line/25 bg-surface rounded p-5">
      <Cabecalho numero={numero} tema={q.tema} extra={q.origem === 'apostila' ? 'da apostila' : undefined} />
      <h3 className="font-sans normal-case tracking-normal font-semibold text-base leading-snug">{q.enunciado}</h3>
      <div className="flex flex-wrap gap-2 mt-3">
        {!verFormula && (
          <button onClick={() => setVerFormula(true)} className="border border-line/40 text-line text-sm px-3 py-1.5 rounded hover:bg-line/10">
            Ver fórmula
          </button>
        )}
        {!aberta && (
          <button onClick={() => setAberta(true)} className="bg-line text-bg font-semibold text-sm px-3 py-1.5 rounded hover:brightness-110">
            Ver resolução
          </button>
        )}
      </div>
      {(verFormula || aberta) && <div className="mt-3 font-mono text-sm text-accent break-words">{q.formula}</div>}
      {aberta && (
        <div className="mt-3 border-t border-line/20 pt-3">
          <ol className="space-y-1 font-mono text-sm text-text/90">
            {q.passos.map((p, i) => (
              <li key={p} className="flex gap-2">
                <span className="text-muted shrink-0">{i + 1}.</span>
                <span className="break-words min-w-0">{p}</span>
              </li>
            ))}
          </ol>
          <div className="mt-3 font-mono font-semibold text-emerald-400">Resposta: {q.resposta}</div>
          <BotoesAvaliacao valor={avaliacao} onChange={avaliar} />
        </div>
      )}
    </article>
  )
}

export function Questoes() {
  const [params, setParams] = useSearchParams()
  const tipoParam = params.get('tipo')
  const tipo: Tipo = tipoParam === 'marcar' || tipoParam === 'calculo' ? tipoParam : 'discursiva'
  const [tema, setTema] = useState<Tema | 'todos'>('todos')
  const [soRevisar, setSoRevisar] = useState(false)
  const [progresso, setProgresso] = useState<Progresso>(carregar)

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(progresso))
    } catch {
      // Sem armazenamento: segue funcionando sem salvar.
    }
  }, [progresso])

  const avaliar = (id: string, a: Avaliacao) => setProgresso((p) => ({ ...p, avaliacoes: { ...p.avaliacoes, [id]: a } }))
  const responder = (id: string, i: number) => setProgresso((p) => ({ ...p, respostas: { ...p.respostas, [id]: i } }))

  const lista = tipo === 'discursiva' ? discursivas : tipo === 'marcar' ? marcar : calculos
  const filtradas = useMemo(
    () =>
      (lista as (Discursiva | Marcar | Calculo)[]).filter(
        (q) => (tema === 'todos' || q.tema === tema) && (!soRevisar || progresso.avaliacoes[q.id] === 'revisar'),
      ),
    [lista, tema, soRevisar, progresso.avaliacoes],
  )

  const temasDoTipo = useMemo(() => (Object.keys(TEMAS) as Tema[]).filter((t) => (lista as { tema: Tema }[]).some((q) => q.tema === t)), [lista])

  const acertos = marcar.filter((q) => progresso.respostas[q.id] === q.correta).length
  const respondidas = marcar.filter((q) => progresso.respostas[q.id] !== undefined).length
  const feitas =
    tipo === 'marcar'
      ? respondidas
      : (lista as { id: string }[]).filter((q) => progresso.avaliacoes[q.id] !== undefined).length

  function trocarTipo(t: Tipo) {
    setParams({ tipo: t }, { replace: true })
    setTema('todos')
    setSoRevisar(false)
  }

  function zerar() {
    setProgresso({ avaliacoes: {}, respostas: {} })
  }

  return (
    <SectionLayout
      numero="TREINO"
      titulo="Questões"
      resumo={`${discursivas.length} discursivas, ${marcar.length} de marcar e ${calculos.length} de cálculo. Feitas a partir da apostila: não são questões de provas anteriores do professor.`}
    >
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Tipo de questão">
        {TIPOS.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={tipo === t.key}
            onClick={() => trocarTipo(t.key)}
            className={`px-4 py-2 rounded font-semibold text-sm ${
              tipo === t.key ? 'bg-accent text-bg' : 'bg-surface text-muted hover:text-text'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-muted">
        <span data-progresso>
          Feitas: {feitas} de {lista.length}
        </span>
        {tipo === 'marcar' && respondidas > 0 && (
          <span data-placar className="text-accent">
            Acertos: {acertos} de {respondidas} ({Math.round((acertos / respondidas) * 100)}%)
          </span>
        )}
        <button onClick={zerar} className="ml-auto flex items-center gap-1 hover:text-text">
          <RotateCcw size={13} /> Zerar progresso
        </button>
      </div>
      <div className="mt-2 h-1.5 bg-surface rounded overflow-hidden">
        <div className="h-full bg-accent transition-all" style={{ width: `${(feitas / lista.length) * 100}%` }} />
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        <button
          onClick={() => setTema('todos')}
          className={`px-2.5 py-1 rounded text-xs ${tema === 'todos' ? 'bg-line text-bg font-semibold' : 'bg-surface text-muted hover:text-text'}`}
        >
          Todos
        </button>
        {temasDoTipo.map((t) => (
          <button
            key={t}
            onClick={() => setTema(t)}
            className={`px-2.5 py-1 rounded text-xs ${tema === t ? 'bg-line text-bg font-semibold' : 'bg-surface text-muted hover:text-text'}`}
          >
            {TEMAS[t]}
          </button>
        ))}
        <button
          onClick={() => setSoRevisar((v) => !v)}
          className={`px-2.5 py-1 rounded text-xs flex items-center gap-1 ${soRevisar ? 'bg-accent text-bg font-semibold' : 'bg-surface text-muted hover:text-text'}`}
        >
          <Bookmark size={12} /> Só “revisar depois”
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {filtradas.length === 0 && <p className="text-muted">Nenhuma questão neste filtro.</p>}
        {tipo === 'discursiva' &&
          (filtradas as Discursiva[]).map((q, i) => (
            <CardDiscursiva key={q.id} q={q} numero={i + 1} avaliacao={progresso.avaliacoes[q.id]} avaliar={(a) => avaliar(q.id, a)} />
          ))}
        {tipo === 'marcar' &&
          (filtradas as Marcar[]).map((q, i) => (
            <CardMarcar key={q.id} q={q} numero={i + 1} resposta={progresso.respostas[q.id]} responder={(r) => responder(q.id, r)} avaliacao={progresso.avaliacoes[q.id]} avaliar={(a) => avaliar(q.id, a)} />
          ))}
        {tipo === 'calculo' &&
          (filtradas as Calculo[]).map((q, i) => (
            <CardCalculo key={q.id} q={q} numero={i + 1} avaliacao={progresso.avaliacoes[q.id]} avaliar={(a) => avaliar(q.id, a)} />
          ))}
      </div>
    </SectionLayout>
  )
}
