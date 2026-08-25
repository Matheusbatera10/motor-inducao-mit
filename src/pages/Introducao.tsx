import { SectionContent, SectionLayout } from '../components/shared/SectionLayout'
import { getSection } from '../content/sections'

export function Introducao() {
  const section = getSection('introducao')!
  return (
    <SectionLayout numero={section.numero} titulo={section.titulo} resumo={section.resumo}>
      <SectionContent section={section} />
    </SectionLayout>
  )
}
