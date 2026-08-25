import type { RotorType } from './partsData'

export function ExplodeControls({
  explode,
  onExplodeChange,
  onAssemble,
  onDisassemble,
  rotorType,
  onRotorTypeChange,
}: {
  explode: number
  onExplodeChange: (v: number) => void
  onAssemble: () => void
  onDisassemble: () => void
  rotorType: RotorType
  onRotorTypeChange: (t: RotorType) => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-5 border-t border-line/20 pt-4 mt-2">
      <div className="flex items-center gap-2">
        <button
          onClick={onAssemble}
          className="font-mono text-sm bg-line text-bg font-semibold px-3 py-1.5 rounded hover:brightness-110"
        >
          Montar
        </button>
        <button
          onClick={onDisassemble}
          className="font-mono text-sm border border-muted text-text px-3 py-1.5 rounded hover:border-line hover:text-line"
        >
          Desmontar
        </button>
      </div>

      <label className="flex items-center gap-2 flex-1 min-w-[180px] font-mono text-xs text-muted">
        Explode
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={explode}
          onChange={(e) => onExplodeChange(Number(e.target.value))}
          className="flex-1 accent-[var(--color-accent)]"
        />
      </label>

      <div className="flex items-center gap-2 font-mono text-xs text-muted">
        Rotor:
        {(['gaiola', 'bobinado'] as RotorType[]).map((rt) => (
          <button
            key={rt}
            onClick={() => onRotorTypeChange(rt)}
            className={`px-2.5 py-1 rounded ${
              rotorType === rt ? 'bg-accent text-bg font-semibold' : 'bg-surface text-muted hover:text-text'
            }`}
          >
            {rt === 'gaiola' ? 'Gaiola de esquilo' : 'Bobinado'}
          </button>
        ))}
      </div>
    </div>
  )
}
