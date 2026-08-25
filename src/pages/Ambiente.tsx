import { SectionContent, SectionLayout } from '../components/shared/SectionLayout'
import { getSection } from '../content/sections'
import { DataCell, DataRow, DataTable } from '../components/shared/DataTable'
import { tabela34Altitudes, tabela34FatorAlpha } from '../content/tables'
import { IPCodeExplorer } from '../components/ip-explorer/IPCodeExplorer'

export function Ambiente() {
  const altitude = getSection('ambiente-altitude')!
  const atmosfera = getSection('atmosfera-ip')!

  return (
    <SectionLayout numero={altitude.numero} titulo={altitude.titulo} resumo={altitude.resumo}>
      <SectionContent section={altitude} />

      <div className="mt-8">
        <h3 className="text-lg mb-3">Tabela 3.4 — Fator α (temperatura × altitude)</h3>
        <DataTable columns={['T (°C)', ...tabela34Altitudes.map((a) => `${a}m`)]}>
          {tabela34FatorAlpha.map((row) => (
            <DataRow key={row.temp}>
              <DataCell>{row.temp}</DataCell>
              {row.valores.map((v, i) => (
                <DataCell key={i} muted={v === null}>
                  {v === null ? '—' : v.toFixed(2)}
                </DataCell>
              ))}
            </DataRow>
          ))}
        </DataTable>
      </div>

      <div className="mt-10 border-t border-line/20 pt-8">
        <div className="font-mono text-accent text-xs tracking-widest">{atmosfera.numero}</div>
        <h2 className="text-2xl mt-1 mb-4">{atmosfera.titulo}</h2>
        <SectionContent section={atmosfera} />
        <div className="mt-8">
          <IPCodeExplorer />
        </div>
      </div>
    </SectionLayout>
  )
}
