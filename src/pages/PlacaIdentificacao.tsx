import { SectionContent, SectionLayout } from '../components/shared/SectionLayout'
import { getSection } from '../content/sections'
import { NameplateExplorer } from '../components/nameplate/NameplateExplorer'

export function PlacaIdentificacao() {
  const section = getSection('placa-identificacao')!

  return (
    <SectionLayout numero={section.numero} titulo={section.titulo} resumo={section.resumo}>
      <SectionContent section={section} />
      <div className="mt-8">
        <NameplateExplorer />
      </div>
    </SectionLayout>
  )
}
