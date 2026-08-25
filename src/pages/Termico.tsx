import { SectionContent, SectionLayout } from '../components/shared/SectionLayout'
import { getSection } from '../content/sections'
import { DataCell, DataRow, DataTable } from '../components/shared/DataTable'
import { classesIsolamento } from '../content/tables'

export function Termico() {
  const section = getSection('aquecimento')!

  return (
    <SectionLayout numero={section.numero} titulo={section.titulo} resumo={section.resumo}>
      <SectionContent section={section} />

      <div className="mt-8">
        <h3 className="text-lg mb-3">Classes de isolamento (NBR 17094)</h3>
        <DataTable columns={['Classe', 'Temp. ambiente', 'Δt (elevação)', 'Ponto mais quente - média', 'Total (ponto mais quente)']}>
          {classesIsolamento.map((c) => (
            <DataRow key={c.classe}>
              <DataCell>
                <span className="text-accent font-semibold">{c.classe}</span>
              </DataCell>
              <DataCell muted>{c.ambiente}°C</DataCell>
              <DataCell>{c.elevacao}°C</DataCell>
              <DataCell>{c.pontoMaisQuente}°C</DataCell>
              <DataCell>{c.total}°C</DataCell>
            </DataRow>
          ))}
        </DataTable>
      </div>
    </SectionLayout>
  )
}
