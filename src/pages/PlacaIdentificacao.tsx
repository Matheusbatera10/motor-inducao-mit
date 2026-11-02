import { SectionContent, SectionLayout } from '../components/shared/SectionLayout'
import { getSection } from '../content/sections'
import { NameplateExplorer } from '../components/nameplate/NameplateExplorer'

const calculos = [
  { pede: 'Número de polos', conta: 'ns é o múltiplo logo acima de 1780: 1800 rpm → p = 120·60/1800', resultado: '4 polos' },
  { pede: 'Escorregamento', conta: 's = (1800 − 1780)/1800', resultado: '1,11%' },
  { pede: 'Frequência no rotor', conta: 'f2 = 0,0111 · 60', resultado: '0,67 Hz' },
  { pede: 'Conferir a corrente em 220 V', conta: 'In = 75000/(√3 · 220 · 0,87 · 0,955)', resultado: '≈ 237 A (placa: 236 A)' },
  { pede: 'Corrente de partida em 220 V', conta: 'Ip = 7,5 · 236', resultado: '1770 A' },
  { pede: 'Corrente no fator de serviço', conta: 'I_FS = 1,25 · 236', resultado: '295 A' },
  { pede: 'Potência máxima contínua', conta: 'P = 1,25 · 100 cv', resultado: '125 cv' },
  { pede: 'Potência elétrica de entrada', conta: 'P1 = 75 kW / 0,955', resultado: '≈ 78,5 kW' },
  { pede: 'Torque nominal', conta: 'T = 75000 / (2π · 1780/60)', resultado: '≈ 402 N·m' },
]

export function PlacaIdentificacao() {
  const section = getSection('placa-identificacao')!

  return (
    <SectionLayout numero={section.numero} titulo={section.titulo} resumo={section.resumo}>
      <SectionContent section={section} />
      <div className="mt-8">
        <NameplateExplorer />
      </div>

      <div className="mt-8 border border-line/30 bg-surface rounded p-5">
        <h3 className="text-lg mb-1">O que dá para calcular só com a placa</h3>
        <p className="text-muted text-sm mb-4">Motor de 100 cv da apostila: 75 kW, 1780 rpm, 60 Hz, η = 95,5%, cosφ = 0,87.</p>
        <div className="space-y-3">
          {calculos.map((c) => (
            <div key={c.pede} className="border-b border-line/15 pb-3 last:border-0 last:pb-0 grid sm:grid-cols-[1fr_1.6fr_auto] gap-x-4 gap-y-1">
              <div className="font-semibold text-sm">{c.pede}</div>
              <div className="font-mono text-xs text-muted self-center break-words">{c.conta}</div>
              <div className="font-mono text-sm text-accent sm:text-right">{c.resultado}</div>
            </div>
          ))}
        </div>
        <p className="text-muted text-xs font-mono mt-4 leading-relaxed">
          A placa usa 75 kW. A fórmula da apostila usa 1 cv = 736 W, que dá 73,6 kW e In ≈ 232 A. Se o enunciado der a
          potência em cv, use 736.
        </p>
      </div>
    </SectionLayout>
  )
}
