import { useEffect, useRef, useState } from 'react'
import { MotorScene } from '../components/motor3d/MotorScene'
import { ExplodeControls } from '../components/motor3d/ExplodeControls'
import { PartInfoCard } from '../components/motor3d/PartInfoCard'
import type { RotorType } from '../components/motor3d/partsData'

export function Motor3D() {
  const [explode, setExplode] = useState(0)
  const [rotorType, setRotorType] = useState<RotorType>('gaiola')
  const [selected, setSelected] = useState<string | null>(null)

  const target = useRef(0)
  const raf = useRef(0)

  function animateTo(value: number) {
    target.current = value
    cancelAnimationFrame(raf.current)
    function tick() {
      setExplode((prev) => {
        const next = prev + (target.current - prev) * 0.12
        if (Math.abs(target.current - next) < 0.003) return target.current
        raf.current = requestAnimationFrame(tick)
        return next
      })
    }
    raf.current = requestAnimationFrame(tick)
  }

  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  function handleSliderChange(v: number) {
    cancelAnimationFrame(raf.current)
    target.current = v
    setExplode(v)
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-6 grid-mesh -mx-6 px-6 py-8 border-b border-line/30">
        <div className="font-mono text-accent text-sm tracking-widest">EXPLORADOR 3D</div>
        <h1 className="text-4xl md:text-5xl mt-1">Motor de Indução Trifásico</h1>
        <p className="text-muted mt-3 max-w-2xl font-mono text-sm">
          Arraste para girar a câmera, role para dar zoom. Clique numa peça para ver sua descrição. Use o slider ou os
          botões para montar/desmontar o motor em exploded view.
        </p>
      </div>

      <div className="relative border border-line/30 rounded overflow-hidden bg-bg" style={{ height: '60vh', minHeight: 420 }}>
        <MotorScene
          explode={explode}
          rotorType={rotorType}
          selected={selected}
          onSelect={(id) => setSelected(id || null)}
        />
        {selected && <PartInfoCard partId={selected} onClose={() => setSelected(null)} />}
      </div>

      <ExplodeControls
        explode={explode}
        onExplodeChange={handleSliderChange}
        onAssemble={() => animateTo(0)}
        onDisassemble={() => animateTo(1)}
        rotorType={rotorType}
        onRotorTypeChange={setRotorType}
      />

      <p className="text-muted text-xs font-mono mt-3">
        Modelo construído com geometrias primitivas (cilindros, anéis, caixas) para fins didáticos — não é um modelo
        fotorrealista do motor.
      </p>
    </div>
  )
}
