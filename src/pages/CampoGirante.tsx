import { SectionContent, SectionLayout } from '../components/shared/SectionLayout'
import { getSection } from '../content/sections'
import { RotatingFieldCanvas } from '../components/campo-girante/RotatingFieldCanvas'

export function CampoGirante() {
  const graus = getSection('graus-eletricos-mecanicos')!
  const campo = getSection('campo-girante')!

  return (
    <SectionLayout numero={campo.numero} titulo={campo.titulo} resumo={campo.resumo}>
      <div className="mb-10">
        <RotatingFieldCanvas />
      </div>

      <SectionContent section={campo} />

      <div className="mt-10 border-t border-line/20 pt-8">
        <div className="font-mono text-accent text-xs tracking-widest">{graus.numero}</div>
        <h2 className="text-2xl mt-1 mb-4">{graus.titulo}</h2>
        <SectionContent section={graus} />
      </div>
    </SectionLayout>
  )
}
