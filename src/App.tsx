import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/shared/AppShell'
import { Home } from './pages/Home'
import { Revisao } from './pages/Revisao'
import { Questoes } from './pages/Questoes'
import { Formulas } from './pages/Formulas'
import { Introducao } from './pages/Introducao'
import { PartesConstrutivas } from './pages/PartesConstrutivas'
import { CampoGirante } from './pages/CampoGirante'
import { PrincipioOperacao } from './pages/PrincipioOperacao'
import { CircuitoEquivalente } from './pages/CircuitoEquivalente'
import { TorqueVelocidade } from './pages/TorqueVelocidade'
import { RegimesServico } from './pages/RegimesServico'
import { Termico } from './pages/Termico'
import { Ambiente } from './pages/Ambiente'
import { Ligacoes } from './pages/Ligacoes'
import { PlacaIdentificacao } from './pages/PlacaIdentificacao'

// O Three.js pesa quase todo o bundle: só carrega quando a tela 3D é aberta.
const Motor3D = lazy(() => import('./pages/Motor3D').then((m) => ({ default: m.Motor3D })))

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Home />} />
          <Route path="/revisao" element={<Revisao />} />
          <Route path="/questoes" element={<Questoes />} />
          <Route path="/formulas" element={<Formulas />} />
          <Route
            path="/motor-3d"
            element={
              <Suspense fallback={<div className="p-10 font-mono text-muted">Carregando o motor 3D…</div>}>
                <Motor3D />
              </Suspense>
            }
          />
          <Route path="/partes-construtivas" element={<PartesConstrutivas />} />
          <Route path="/campo-girante" element={<CampoGirante />} />
          <Route path="/principio-operacao" element={<PrincipioOperacao />} />
          <Route path="/introducao" element={<Introducao />} />
          <Route path="/circuito-equivalente" element={<CircuitoEquivalente />} />
          <Route path="/torque-velocidade" element={<TorqueVelocidade />} />
          <Route path="/regimes-servico" element={<RegimesServico />} />
          <Route path="/termico" element={<Termico />} />
          <Route path="/ambiente" element={<Ambiente />} />
          <Route path="/ligacoes" element={<Ligacoes />} />
          <Route path="/placa-identificacao" element={<PlacaIdentificacao />} />
          <Route path="/exercicios" element={<Navigate to="/questoes?tipo=calculo" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
