import type { ReactNode } from 'react'
import type { Block, SectionDef } from '../../content/sections'

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case 'p':
      return <p className="text-text/90 leading-relaxed">{block.text}</p>
    case 'subheading':
      return <h3 className="text-line text-lg mt-2">{block.text}</h3>
    case 'list':
      return (
        <ul className="space-y-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-2 text-text/90 leading-relaxed">
              <span className="text-accent shrink-0">▸</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )
    case 'tree':
      return (
        <ul className="space-y-1.5 font-mono text-sm">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-2 text-text/90 leading-relaxed" style={{ paddingLeft: `${item.indent * 1.5}rem` }}>
              {item.indent > 0 && <span className="text-line shrink-0">→</span>}
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      )
    case 'formula':
      return (
        <div className="border border-line/40 bg-surface px-4 py-3 rounded">
          <div className="text-muted text-xs uppercase tracking-wide mb-1">{block.label}</div>
          <div className="font-mono text-accent text-lg">{block.expr}</div>
          {block.note && <div className="text-muted text-xs mt-1 font-mono">{block.note}</div>}
        </div>
      )
    case 'note':
      return (
        <div className="border-l-2 border-accent pl-4 py-1 text-muted italic leading-relaxed">
          {block.text}
        </div>
      )
  }
}

export function SectionContent({ section }: { section: SectionDef }) {
  return (
    <div className="space-y-5">
      {section.blocks.map((block, i) => (
        <BlockView key={i} block={block} />
      ))}
    </div>
  )
}

export function SectionLayout({
  numero,
  titulo,
  resumo,
  children,
}: {
  numero: string
  titulo: string
  resumo?: string
  children: ReactNode
}) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-10 grid-mesh -mx-6 px-6 py-8 border-b border-line/30">
        <div className="font-mono text-accent text-sm tracking-widest">{numero}</div>
        <h1 className="text-4xl md:text-5xl mt-1">{titulo}</h1>
        {resumo && <p className="text-muted mt-3 max-w-2xl font-mono text-sm">{resumo}</p>}
      </div>
      {children}
    </div>
  )
}
