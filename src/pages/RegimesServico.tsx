import { useState } from 'react'
import { SectionContent, SectionLayout } from '../components/shared/SectionLayout'
import { getSection } from '../content/sections'
import { regimesServico } from '../content/tables'
import { DutyCycleCalculator } from '../components/regimes/DutyCycleCalculator'
import { DutyCycleChart } from '../components/regimes/DutyCycleChart'

export function RegimesServico() {
  const fator = getSection('fator-servico')!
  const regime = getSection('regime-servico')!
  const [selected, setSelected] = useState('S1')
  const current = regimesServico.find((r) => r.codigo === selected)!

  return (
    <SectionLayout numero={fator.numero} titulo={fator.titulo} resumo={fator.resumo}>
      <SectionContent section={fator} />

      <div className="mt-10 border-t border-line/20 pt-8">
        <div className="font-mono text-accent text-xs tracking-widest">{regime.numero}</div>
        <h2 className="text-2xl mt-1 mb-4">{regime.titulo}</h2>
        <SectionContent section={regime} />
      </div>

      <div className="mt-8 border border-line/30 bg-surface rounded p-5 grid-mesh">
        <h3 className="text-lg mb-3">Regimes S1–S10</h3>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {regimesServico.map((r) => (
            <button
              key={r.codigo}
              onClick={() => setSelected(r.codigo)}
              className={`px-3 py-1.5 rounded font-mono text-sm ${
                selected === r.codigo ? 'bg-line text-bg font-semibold' : 'bg-bg text-muted hover:text-text'
              }`}
            >
              {r.codigo}
            </button>
          ))}
        </div>
        <div className="border border-line/20 rounded p-4">
          <h4 className="text-lg font-display">{current.codigo} — {current.nome}</h4>
          <p className="text-text/90 font-mono text-sm mt-2 leading-relaxed">{current.descricao}</p>
        </div>

        <div className="border border-line/20 rounded p-4 mt-4">
          <h4 className="text-sm font-mono text-muted uppercase tracking-wide mb-3">
            Carga / Perdas / Temperatura x Tempo
          </h4>
          <DutyCycleChart key={selected} codigo={selected} />
        </div>
      </div>

      <div className="mt-8">
        <DutyCycleCalculator />
      </div>
    </SectionLayout>
  )
}
