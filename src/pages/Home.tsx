import { Link } from 'react-router-dom'
import { Box, Gauge, Waves, Zap, Thermometer, Cable, IdCard } from 'lucide-react'
import { sections } from '../content/sections'

const quickLinks = [
  { to: '/motor-3d', label: 'Explorador 3D', desc: 'Monte e desmonte o motor peça por peça', icon: Box, featured: true },
  { to: '/campo-girante', label: 'Campo Girante', desc: 'Veja o campo magnético se formar', icon: Waves },
  { to: '/torque-velocidade', label: 'Torque x Velocidade', desc: 'Curvas por categoria N, H, D', icon: Gauge },
  { to: '/principio-operacao', label: 'Escorregamento', desc: 'Calculadora de ns, s e f2', icon: Zap },
  { to: '/termico', label: 'Aquecimento', desc: 'Classes de isolamento e proteção térmica', icon: Thermometer },
  { to: '/ligacoes', label: 'Ligações', desc: 'Δ/Y, 6/9/12 terminais, Dahlander', icon: Cable },
  { to: '/placa-identificacao', label: 'Placa de Identificação', desc: '27 campos explicados', icon: IdCard },
]

const intro = sections.find((s) => s.slug === 'introducao')!

export function Home() {
  return (
    <div>
      <section className="grid-mesh border-b border-line/30 px-6 py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          <div className="font-mono text-accent text-sm tracking-widest mb-3">
            CAPÍTULO III — APLICAÇÃO DE MÁQUINAS ELÉTRICAS
          </div>
          <h1 className="text-5xl md:text-7xl leading-none">
            Motores de Indução
            <br />
            Trifásicos
          </h1>
          <p className="text-muted mt-6 max-w-2xl mx-auto font-mono text-sm md:text-base leading-relaxed">
            {intro.blocks[0].type === 'p' ? intro.blocks[0].text : ''}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/motor-3d"
              className="inline-flex items-center gap-2 bg-line text-bg font-mono font-semibold px-6 py-3 rounded hover:brightness-110 transition"
            >
              <Box size={18} />
              Abrir Explorador 3D
            </Link>
            <Link
              to="/introducao"
              className="inline-flex items-center gap-2 border border-muted text-text font-mono px-6 py-3 rounded hover:border-line hover:text-line transition"
            >
              Ler o capítulo
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-14">
        <h2 className="text-2xl mb-1">Explore o capítulo</h2>
        <p className="text-muted font-mono text-sm mb-8">Navegue por seção ou vá direto às ferramentas interativas</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks.map(({ to, label, desc, icon: Icon, featured }) => (
            <Link
              key={to}
              to={to}
              className={`group border rounded p-5 transition-colors ${
                featured
                  ? 'border-accent bg-accent/10 hover:bg-accent/15'
                  : 'border-line/25 bg-surface hover:border-line'
              }`}
            >
              <Icon className={featured ? 'text-accent' : 'text-line'} size={26} />
              <h3 className="text-lg mt-3 normal-case font-display">{label}</h3>
              <p className="text-muted text-sm mt-1 font-mono leading-snug">{desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="border border-line/25 bg-surface rounded p-6 md:p-8 grid-mesh">
          <div className="grid sm:grid-cols-3 gap-6 text-center font-mono">
            <div>
              <div className="text-4xl text-accent">25%</div>
              <div className="text-muted text-xs mt-1 uppercase tracking-wide">
                da carga elétrica do Brasil
              </div>
            </div>
            <div>
              <div className="text-4xl text-accent">17</div>
              <div className="text-muted text-xs mt-1 uppercase tracking-wide">
                seções navegáveis do capítulo
              </div>
            </div>
            <div>
              <div className="text-4xl text-accent">S1–S10</div>
              <div className="text-muted text-xs mt-1 uppercase tracking-wide">
                regimes de serviço cobertos
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
