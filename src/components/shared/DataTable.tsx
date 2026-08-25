import type { ReactNode } from 'react'

export function DataTable({
  columns,
  children,
}: {
  columns: string[]
  children: ReactNode
}) {
  return (
    <div className="overflow-x-auto border border-line/30 rounded">
      <table className="w-full text-sm font-mono border-collapse min-w-max">
        <thead>
          <tr className="bg-surface text-line text-xs uppercase tracking-wide">
            {columns.map((col) => (
              <th key={col} className="px-3 py-2 text-left border-b border-line/30 whitespace-nowrap">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

export function DataRow({ children }: { children: ReactNode }) {
  return <tr className="odd:bg-surface/40 even:bg-transparent hover:bg-line/10 transition-colors">{children}</tr>
}

export function DataCell({ children, muted }: { children: ReactNode; muted?: boolean }) {
  return (
    <td className={`px-3 py-1.5 whitespace-nowrap border-b border-line/10 ${muted ? 'text-muted' : 'text-text'}`}>
      {children}
    </td>
  )
}
