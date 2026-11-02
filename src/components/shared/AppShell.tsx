import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Box, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const navRevisao = [
  { to: '/', label: 'Início', numero: '' },
  { to: '/revisao', label: 'Guia de revisão', numero: '' },
  { to: '/questoes', label: 'Questões', numero: '' },
  { to: '/formulas', label: 'Fórmulas', numero: '' },
]

const navItems = [
  { to: '/motor-3d', label: 'Explorador 3D', numero: '' },
  { to: '/introducao', label: 'Introdução', numero: '3.1' },
  { to: '/partes-construtivas', label: 'Partes Construtivas', numero: '3.2' },
  { to: '/campo-girante', label: 'Campo Girante', numero: '3.3–3.4' },
  { to: '/principio-operacao', label: 'Princípio de Operação', numero: '3.5–3.6' },
  { to: '/circuito-equivalente', label: 'Circuito Equivalente', numero: '3.7–3.8' },
  { to: '/torque-velocidade', label: 'Torque x Velocidade', numero: '3.9–3.10' },
  { to: '/regimes-servico', label: 'Regimes de Serviço', numero: '3.11–3.12' },
  { to: '/termico', label: 'Aquecimento', numero: '3.13' },
  { to: '/ambiente', label: 'Ambiente', numero: '3.14–3.15' },
  { to: '/ligacoes', label: 'Ligações', numero: '3.16' },
  { to: '/placa-identificacao', label: 'Placa de Identificação', numero: '3.17' },
]

function NavGroup({ titulo, itens, onNavigate }: { titulo: string; itens: typeof navItems; onNavigate?: () => void }) {
  return (
    <div>
      <div className="px-3 pb-1 font-mono text-[11px] tracking-widest text-accent uppercase">{titulo}</div>
      <div className="flex flex-col gap-0.5">
        {itens.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2 rounded text-sm transition-colors ${
                isActive ? 'bg-line text-bg font-semibold' : 'text-text/80 hover:bg-surface hover:text-text'
              }`
            }
          >
            <span>{item.label}</span>
            {item.numero && <span className="font-mono text-xs opacity-60">{item.numero}</span>}
          </NavLink>
        ))}
      </div>
    </div>
  )
}

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-5">
      <NavGroup titulo="Para a prova" itens={navRevisao} onNavigate={onNavigate} />
      <NavGroup titulo="Capítulo III" itens={navItems} onNavigate={onNavigate} />
    </nav>
  )
}


export function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  // Só no início: nas outras telas o botão flutuante cobria controles e texto.
  const mostrarBotao3D = location.pathname === '/'

  useEffect(() => {
    if (!location.hash) window.scrollTo(0, 0)
  }, [location.pathname, location.hash])

  return (
    <div className="min-h-screen flex bg-bg text-text">
      {/* Sidebar — desktop */}
      <aside className="no-print hidden lg:flex flex-col w-64 shrink-0 border-r border-line/20 bg-surface/40 h-screen sticky top-0 overflow-y-auto">
        <div className="px-4 py-5 border-b border-line/20">
          <div className="font-mono text-accent text-xs tracking-widest">CAP. III</div>
          <h1 className="font-display text-xl leading-none mt-1">MIT</h1>
          <p className="text-muted text-xs mt-1">Máquinas de Indução Trifásicas</p>
        </div>
        <div className="p-3 flex-1">
          <NavList />
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="no-print lg:hidden fixed top-0 inset-x-0 z-40 flex items-center justify-between px-4 py-3 bg-surface border-b border-line/20">
        <div>
          <span className="font-display text-lg">MIT</span>
          <span className="font-mono text-accent text-xs ml-2">Cap. III</span>
        </div>
        <button onClick={() => setMobileOpen(true)} aria-label="Abrir menu">
          <Menu className="text-line" size={22} />
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-bg/95 grid-mesh overflow-y-auto">
          <div className="flex items-center justify-between px-4 py-4 border-b border-line/20">
            <span className="font-display text-lg">Navegação</span>
            <button onClick={() => setMobileOpen(false)} aria-label="Fechar menu">
              <X className="text-line" size={24} />
            </button>
          </div>
          <div className="p-3">
            <NavList onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 min-w-0 pt-14 lg:pt-0">
        <Outlet />
      </div>

      {/* Floating CTA — Motor 3D */}
      {mostrarBotao3D && (
        <NavLink
          to="/motor-3d"
          className="no-print fixed bottom-5 right-5 z-30 flex items-center gap-2 bg-accent text-bg font-mono text-sm font-semibold px-4 py-3 rounded-full shadow-lg hover:brightness-110 transition"
        >
          <Box size={18} />
          Motor 3D
        </NavLink>
      )}
    </div>
  )
}
