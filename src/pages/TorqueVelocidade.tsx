import { useState } from 'react'
import { SectionContent, SectionLayout } from '../components/shared/SectionLayout'
import { getSection } from '../content/sections'
import { TorqueSpeedChart } from '../components/torque/TorqueSpeedChart'
import { CategorySelector } from '../components/torque/CategorySelector'
import { ParametricTorqueChart } from '../components/torque/ParametricTorqueChart'
import { DataCell, DataRow, DataTable } from '../components/shared/DataTable'
import { tabela31CategoriaN, tabela32CategoriaH } from '../content/tables'

export function TorqueVelocidade() {
  const torque = getSection('torque-velocidade')!
  const categorias = getSection('categorias')!
  const [active, setActive] = useState<Set<string>>(new Set(['N']))
  const [tabelaTab, setTabelaTab] = useState<'N' | 'H'>('N')

  function toggle(key: string) {
    setActive((prev) => {
      const next = new Set(prev)
      if (next.has(key)) {
        if (next.size > 1) next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  return (
    <SectionLayout numero={torque.numero} titulo={torque.titulo} resumo={torque.resumo}>
      <SectionContent section={torque} />

      <div className="mt-8 border border-line/30 bg-surface rounded p-5 grid-mesh">
        <h3 className="text-lg mb-1">Curvas Normativas por Categoria</h3>
        <p className="text-muted text-xs font-mono mb-3">
          Formato de curva típico de cada categoria (NBR 17094), com os pontos Tp, Tmín, Tmáx e Tn.
        </p>
        <CategorySelector active={active} onToggle={toggle} />
        <div className="mt-4">
          <TorqueSpeedChart active={active} />
        </div>
      </div>

      <div className="mt-6">
        <ParametricTorqueChart />
      </div>

      <div className="mt-10 border-t border-line/20 pt-8">
        <div className="font-mono text-accent text-xs tracking-widest">{categorias.numero}</div>
        <h2 className="text-2xl mt-1 mb-4">{categorias.titulo}</h2>
        <SectionContent section={categorias} />
      </div>

      <div className="mt-8">
        <div className="flex gap-2 mb-3">
          {(['N', 'H'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTabelaTab(t)}
              className={`px-3 py-1.5 rounded font-mono text-sm ${
                tabelaTab === t ? 'bg-line text-bg font-semibold' : 'bg-surface text-muted hover:text-text'
              }`}
            >
              Tabela {t === 'N' ? '3.1' : '3.2'} — Categoria {t}
            </button>
          ))}
        </div>

        {tabelaTab === 'N' ? (
          <DataTable columns={['cv', 'kW', '2 polos', '4 polos', '6 polos', '8 polos']}>
            {tabela31CategoriaN.map((row) => (
              <DataRow key={row.cv}>
                <DataCell>{row.cv}</DataCell>
                <DataCell muted>{row.kw}</DataCell>
                <DataCell>{row.p2?.join(' / ')}</DataCell>
                <DataCell>{row.p4?.join(' / ')}</DataCell>
                <DataCell>{row.p6?.join(' / ')}</DataCell>
                <DataCell>{row.p8?.join(' / ')}</DataCell>
              </DataRow>
            ))}
          </DataTable>
        ) : (
          <DataTable columns={['cv', 'kW', '4 polos', '6 polos', '8 polos']}>
            {tabela32CategoriaH.map((row) => (
              <DataRow key={row.cv}>
                <DataCell>{row.cv}</DataCell>
                <DataCell muted>{row.kw}</DataCell>
                <DataCell>{row.p4?.join(' / ')}</DataCell>
                <DataCell>{row.p6?.join(' / ')}</DataCell>
                <DataCell>{row.p8?.join(' / ')}</DataCell>
              </DataRow>
            ))}
          </DataTable>
        )}
        <p className="text-muted text-xs font-mono mt-2">
          Valores em pu do torque nominal: Cp (rotor bloqueado) / Cmín / Cmáx. Motores de rotor bobinado não se
          enquadram nessas categorias — devem atender aos torques máximos da norma ABNT-EB 620.
        </p>
      </div>
    </SectionLayout>
  )
}
