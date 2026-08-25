import { SectionContent, SectionLayout } from '../components/shared/SectionLayout'
import { getSection } from '../content/sections'
import { EquivalentCircuitDiagram } from '../components/circuito-equivalente/EquivalentCircuitDiagram'
import { PowerFlowSankey } from '../components/circuito-equivalente/PowerFlowSankey'

export function CircuitoEquivalente() {
  const circuito = getSection('circuito-equivalente')!
  const fluxo = getSection('fluxo-potencias')!

  return (
    <SectionLayout numero={circuito.numero} titulo={circuito.titulo} resumo={circuito.resumo}>
      <SectionContent section={circuito} />
      <div className="mt-8">
        <EquivalentCircuitDiagram />
      </div>

      <div className="mt-10 border-t border-line/20 pt-8">
        <div className="font-mono text-accent text-xs tracking-widest">{fluxo.numero}</div>
        <h2 className="text-2xl mt-1 mb-4">{fluxo.titulo}</h2>
        <SectionContent section={fluxo} />
        <div className="mt-8">
          <PowerFlowSankey />
        </div>
      </div>
    </SectionLayout>
  )
}
