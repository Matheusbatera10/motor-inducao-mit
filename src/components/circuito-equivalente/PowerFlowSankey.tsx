import { useMemo, useState } from 'react'
import { sankey, sankeyLeft, sankeyLinkHorizontal } from 'd3-sankey'

const W = 720
const H = 340

const NODE_COLOR: Record<string, string> = {
  Pin: 'var(--color-line)',
  Nucleo: 'var(--color-muted)',
  CuEstator: 'var(--color-muted)',
  Pag: 'var(--color-line)',
  CuRotor: 'var(--color-muted)',
  Pmec: 'var(--color-accent)',
  Rotacional: 'var(--color-muted)',
  Peixo: 'var(--color-accent)',
}

const LABEL: Record<string, string> = {
  Pin: 'P. elétrica de entrada',
  Nucleo: 'Perdas no núcleo',
  CuEstator: 'Perdas Cu — estator',
  Pag: 'P. de entreferro',
  CuRotor: 'Perdas Cu — rotor',
  Pmec: 'P. mecânica gerada',
  Rotacional: 'Perdas rotacionais',
  Peixo: 'P. de saída no eixo',
}

interface SankeyNode {
  id: string
  x0?: number
  x1?: number
  y0?: number
  y1?: number
  value?: number
}
interface SankeyLink {
  source: string | SankeyNode
  target: string | SankeyNode
  value: number
  width?: number
}

export function PowerFlowSankey() {
  const [sVal, setSVal] = useState(0.05)
  const [nucleoFrac] = useState(0.03)
  const [cuEstatorFrac] = useState(0.04)
  const [rotacionalFrac] = useState(0.03)

  const graph = useMemo(() => {
    const Pin = 100
    const PNucleo = Pin * nucleoFrac
    const PCuEstator = Pin * cuEstatorFrac
    const Pag = Pin - PNucleo - PCuEstator
    const PCuRotor = sVal * Pag
    const Pmec = (1 - sVal) * Pag
    const PRotacional = Pmec * rotacionalFrac
    const Peixo = Pmec - PRotacional

    const nodeIds = ['Pin', 'Nucleo', 'CuEstator', 'Pag', 'CuRotor', 'Pmec', 'Rotacional', 'Peixo']
    const nodes = nodeIds.map((id) => ({ id }))
    const links = [
      { source: 'Pin', target: 'Nucleo', value: PNucleo },
      { source: 'Pin', target: 'CuEstator', value: PCuEstator },
      { source: 'Pin', target: 'Pag', value: Pag },
      { source: 'Pag', target: 'CuRotor', value: PCuRotor },
      { source: 'Pag', target: 'Pmec', value: Pmec },
      { source: 'Pmec', target: 'Rotacional', value: PRotacional },
      { source: 'Pmec', target: 'Peixo', value: Peixo },
    ]

    // sankeyLeft keeps every node as close to its source as possible — the
    // default alignment (sankeyJustify) instead shoves every sink node
    // (Nucleo, CuEstator, CuRotor, Rotacional, Peixo) into the last column,
    // which breaks the tree shape described in the chapter's Fig. 3.8.
    const sankeyGen = sankey<SankeyNode, SankeyLink>()
      .nodeId((d) => d.id)
      .nodeAlign(sankeyLeft)
      .nodeWidth(16)
      .nodePadding(22)
      .extent([
        [8, 16],
        [W - 8, H - 16],
      ])

    return sankeyGen({
      nodes: nodes.map((d) => ({ ...d })),
      links: links.map((d) => ({ ...d })),
    })
  }, [sVal, nucleoFrac, cuEstatorFrac, rotacionalFrac])

  const linkPath = sankeyLinkHorizontal<SankeyNode, SankeyLink>()

  return (
    <div className="border border-line/30 bg-surface rounded p-5 grid-mesh">
      <h3 className="text-lg mb-1">Fluxo de Potências</h3>
      <p className="text-muted text-xs font-mono mb-4">
        Base 100 (%) — perdas no núcleo, cobre do estator e rotacionais são valores ilustrativos fixos;
        a divisão entreferro → cobre do rotor / potência mecânica segue exatamente Pcu,r = s·Pag e Pmec = (1-s)·Pag.
      </p>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        {graph.links.map((link, i) => {
          const source = link.source as SankeyNode
          return (
            <path
              key={i}
              d={linkPath(link) ?? undefined}
              fill="none"
              stroke={NODE_COLOR[source.id]}
              strokeOpacity={0.35}
              strokeWidth={Math.max(1, link.width ?? 0)}
            />
          )
        })}
        {graph.nodes.map((node) => {
          const n = node as SankeyNode
          const x0 = n.x0 ?? 0
          const x1 = n.x1 ?? 0
          const y0 = n.y0 ?? 0
          const y1 = n.y1 ?? 0
          return <rect key={n.id} x={x0} y={y0} width={x1 - x0} height={Math.max(2, y1 - y0)} fill={NODE_COLOR[n.id]} />
        })}
      </svg>

      {/* A legend instead of inline labels: with 8 nodes across only 4 columns,
          several "trunk" and "sink" node labels inevitably land at nearly the
          same height and collide no matter which side/offset they're drawn
          from — a fixed legend has no such collision risk at any data ratio. */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3 font-mono text-xs">
        {graph.nodes.map((node) => {
          const n = node as SankeyNode
          return (
            <div key={n.id} className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: NODE_COLOR[n.id] }} />
              <span className="text-muted">{LABEL[n.id]}</span>
              <span className="text-text">{n.value?.toFixed(1)}%</span>
            </div>
          )
        })}
      </div>

      <label className="flex flex-col gap-1 font-mono text-sm max-w-sm mt-4">
        <span className="text-muted text-xs">Escorregamento s = {(sVal * 100).toFixed(1)}%</span>
        <input
          type="range"
          min={0.01}
          max={0.5}
          step={0.01}
          value={sVal}
          onChange={(e) => setSVal(Number(e.target.value))}
          className="accent-[var(--color-accent)]"
        />
      </label>
    </div>
  )
}
