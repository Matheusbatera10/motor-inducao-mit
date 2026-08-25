import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/shared/AppShell'
import { Home } from './pages/Home'
import { Introducao } from './pages/Introducao'
import { Motor3D } from './pages/Motor3D'
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
import { Exercicios } from './pages/Exercicios'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Home />} />
          <Route path="/motor-3d" element={<Motor3D />} />
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
          <Route path="/exercicios" element={<Exercicios />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
