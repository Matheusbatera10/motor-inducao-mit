import { Printer } from 'lucide-react'
import { SectionLayout } from '../components/shared/SectionLayout'
import { conversoes, grupos } from '../content/formulasResumo'

export function Formulas() {
  return (
    <SectionLayout
      numero="RESUMO"
      titulo="Fórmulas"
      resumo="O professor coloca as fórmulas na prova. Então o treino aqui é reconhecer cada uma, saber o que cada letra significa e quando usar."
    >
      <div className="flex flex-wrap items-center gap-3 mb-5 no-print">
        <button onClick={() => window.print()} className="flex items-center gap-2 bg-line text-bg font-semibold text-sm px-3 py-1.5 rounded hover:brightness-110">
          <Printer size={15} /> Imprimir
        </button>
        <nav className="flex flex-wrap gap-1.5" aria-label="Grupos de fórmulas">
          {grupos.map((g) => (
            <a key={g.id} href={`#${g.id}`} className="px-2.5 py-1 rounded text-xs bg-surface text-muted hover:text-text">
              {g.titulo}
            </a>
          ))}
        </nav>
      </div>

      <div className="border border-accent/40 bg-accent/10 rounded p-4 mb-8 text-sm leading-relaxed">
        <div className="font-semibold mb-2">Valores para ter de cabeça</div>
        <ul className="space-y-1 font-mono text-xs sm:text-sm">
          {conversoes.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <p className="text-muted mt-3 text-xs">
          Selo “Apostila”: a fórmula está no Cap. III. Selo “Complementar”: é a relação padrão da teoria, mas não está
          escrita na apostila. Confira com o que foi dado em aula.
        </p>
      </div>

      <div className="space-y-10">
        {grupos.map((g) => (
          <section key={g.id} id={g.id} className="scroll-mt-20">
            <h2 className="text-2xl mb-4">{g.titulo}</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {g.formulas.map((f) => (
                <article key={f.nome} className="formula-card border border-line/25 bg-surface rounded p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-sans normal-case tracking-normal font-semibold text-sm">{f.nome}</h3>
                    <span
                      className={`shrink-0 text-[10px] font-mono rounded px-1.5 py-0.5 border ${
                        f.fonte === 'apostila' ? 'border-line/50 text-line' : 'border-muted/50 text-muted'
                      }`}
                    >
                      {f.fonte === 'apostila' ? `Apostila${f.ref ? ` · ${f.ref}` : ''}` : 'Complementar'}
                    </span>
                  </div>
                  <div className="font-mono text-accent text-base sm:text-lg mt-2 break-words">{f.expr}</div>
                  <p className="text-muted text-xs mt-2 leading-relaxed">{f.variaveis}</p>
                  <p className="text-text/90 text-sm mt-2 leading-relaxed">{f.quando}</p>
                  {f.exemplo && <p className="font-mono text-xs text-line mt-2 break-words">Ex.: {f.exemplo}</p>}
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </SectionLayout>
  )
}
