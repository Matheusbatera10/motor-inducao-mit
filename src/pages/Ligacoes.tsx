import { useState } from 'react'
import { SectionContent, SectionLayout } from '../components/shared/SectionLayout'
import { getSection } from '../content/sections'
import { WindingSimulator } from '../components/ligacoes/WindingSimulator'
import { StarDeltaStarter } from '../components/ligacoes/StarDeltaStarter'
import { SeriesParallelSwitch } from '../components/ligacoes/SeriesParallelSwitch'
import { DahlanderSimulator } from '../components/ligacoes/DahlanderSimulator'

const TABS = [
  { key: 'delta-y', label: '6 Terminais (Δ/Y)' },
  { key: 'starter', label: 'Chave Y-Δ' },
  { key: '9-12', label: '9/12 Terminais' },
  { key: 'dahlander', label: 'Dahlander' },
] as const

export function Ligacoes() {
  const section = getSection('ligacoes')!
  const [tab, setTab] = useState<(typeof TABS)[number]['key']>('delta-y')

  return (
    <SectionLayout numero={section.numero} titulo={section.titulo} resumo={section.resumo}>
      <SectionContent section={section} />

      <div className="mt-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-3 py-1.5 rounded font-mono text-sm ${
                tab === t.key ? 'bg-line text-bg font-semibold' : 'bg-surface text-muted hover:text-text'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'delta-y' && <WindingSimulator />}
        {tab === 'starter' && <StarDeltaStarter />}
        {tab === '9-12' && <SeriesParallelSwitch />}
        {tab === 'dahlander' && <DahlanderSimulator />}
      </div>
    </SectionLayout>
  )
}
