import { SectionContent, SectionLayout } from '../components/shared/SectionLayout'
import { getSection } from '../content/sections'
import { EscorregamentoCalculator } from '../components/shared/EscorregamentoCalculator'

export function PrincipioOperacao() {
  const principio = getSection('principio-operacao')!
  const escorregamento = getSection('escorregamento')!

  return (
    <SectionLayout numero={principio.numero} titulo={principio.titulo} resumo={principio.resumo}>
      <SectionContent section={principio} />

      <div className="mt-10 border-t border-line/20 pt-8">
        <div className="font-mono text-accent text-xs tracking-widest">{escorregamento.numero}</div>
        <h2 className="text-2xl mt-1 mb-4">{escorregamento.titulo}</h2>
        <SectionContent section={escorregamento} />
      </div>

      <div className="mt-8">
        <EscorregamentoCalculator />
      </div>
    </SectionLayout>
  )
}
