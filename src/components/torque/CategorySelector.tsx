import { CATEGORIES } from './TorqueSpeedChart'

export function CategorySelector({
  active,
  onToggle,
}: {
  active: Set<string>
  onToggle: (key: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((c) => {
        const isActive = active.has(c.key)
        return (
          <button
            key={c.key}
            onClick={() => onToggle(c.key)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded font-mono text-sm border transition-colors ${
              isActive ? 'border-transparent text-bg' : 'border-line/40 text-muted hover:text-text'
            }`}
            style={isActive ? { background: c.color } : undefined}
          >
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: c.color }} />
            {c.label}
          </button>
        )
      })}
    </div>
  )
}
