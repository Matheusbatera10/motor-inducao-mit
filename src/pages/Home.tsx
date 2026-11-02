import { Link } from 'react-router-dom'
import { BookOpenCheck, Box, Cable, FunctionSquare, Gauge, IdCard, ListChecks, Thermometer, Waves, Zap } from 'lucide-react'
import { roteiro } from '../content/revisao'
import { calculos, discursivas, marcar } from '../content/questoes'

const principais = [
  { to: '/revisao', label: 'Guia de revisão', desc: 'Como explicar cada tema, o que guardar e as pegadinhas', icon: BookOpenCheck },
  { to: '/questoes', label: 'Questões', desc: `${discursivas.length} discursivas, ${marcar.length} de marcar e ${calculos.length} de cálculo`, icon: ListChecks },
  { to: '/formulas', label: 'Fórmulas', desc: 'Todas em um só lugar, com o significado de cada letra', icon: FunctionSquare },
]

const quickLinks = [
  { to: '/placa-identificacao', label: 'Placa de Identificação', desc: 'As placas da apostila, campo por campo', icon: IdCard },
  { to: '/principio-operacao', label: 'Escorregamento', desc: 'Calculadora de ns, s e f2', icon: Zap },
  { to: '/torque-velocidade', label: 'Torque x Velocidade', desc: 'Curvas N, H, D e simulador', icon: Gauge },
  { to: '/motor-3d', label: 'Explorador 3D', desc: 'Monte e desmonte o motor peça por peça', icon: Box },
  { to: '/campo-girante', label: 'Campo Girante', desc: 'Veja o campo magnético se formar', icon: Waves },
  { to: '/termico', label: 'Aquecimento', desc: 'Classes de isolamento e proteção térmica', icon: Thermometer },
  { to: '/ligacoes', label: 'Ligações', desc: 'Δ/Y, 6/9/12 terminais, Dahlander', icon: Cable },
]

export function Home() {
  return (
    <div>
      <section className="grid-mesh border-b border-line/30 px-6 py-14 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="font-mono text-accent text-sm tracking-widest mb-3">APLICAÇÃO DE MÁQUINAS ELÉTRICAS · CAP. III</div>
          <h1 className="text-5xl md:text-7xl leading-none">Revisão de MIT</h1>
          <p className="text-muted mt-4 max-w-2xl leading-relaxed">
            Tudo para a prova de Motores de Indução Trifásicos: teoria para saber explicar, questões para treinar e
            fórmulas para reconhecer.
          </p>
          <div className="grid md:grid-cols-3 gap-3 mt-8">
            {principais.map(({ to, label, desc, icon: Icon }) => (
              <Link key={to} to={to} className="border border-accent/60 bg-accent/10 hover:bg-accent/20 rounded p-5 transition-colors">
                <Icon className="text-accent" size={26} />
                <h2 className="text-2xl mt-3">{label}</h2>
                <p className="text-text/80 text-sm mt-1 leading-snug">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl mb-1">Roteiro de estudo</h2>
        <p className="text-muted text-sm mb-6">Nesta ordem, começando pelo que você disse que mais importa.</p>
        <ol className="space-y-2">
          {roteiro.map((r, i) => (
            <li key={r.titulo}>
              <Link to={r.to} className="flex gap-4 border border-line/25 bg-surface hover:border-line rounded p-4 transition-colors">
                <span className="font-display text-3xl text-accent leading-none w-6 shrink-0">{i + 1}</span>
                <span>
                  <span className="font-semibold block">{r.titulo}</span>
                  <span className="text-muted text-sm leading-snug block mt-0.5">{r.desc}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-20">
        <h2 className="text-2xl mb-1">Ver funcionando</h2>
        <p className="text-muted text-sm mb-6">Simuladores para entender o conceito, não só decorar.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickLinks.map(({ to, label, desc, icon: Icon }) => (
            <Link key={to} to={to} className="border border-line/25 bg-surface hover:border-line rounded p-4 transition-colors">
              <Icon className="text-line" size={22} />
              <h3 className="text-lg mt-2">{label}</h3>
              <p className="text-muted text-sm mt-0.5 leading-snug">{desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
