export function FormulaBlock({
  label,
  expr,
  note,
}: {
  label: string
  expr: string
  note?: string
}) {
  return (
    <div className="border border-line/40 bg-surface px-4 py-3 rounded">
      <div className="text-muted text-xs uppercase tracking-wide mb-1">{label}</div>
      <div className="font-mono text-accent text-lg">{expr}</div>
      {note && <div className="text-muted text-xs mt-1 font-mono">{note}</div>}
    </div>
  )
}
