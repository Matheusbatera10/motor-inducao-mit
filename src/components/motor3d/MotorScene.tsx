import { Canvas } from '@react-three/fiber'
import { Grid, OrbitControls } from '@react-three/drei'
import { MotorParts } from './MotorParts'
import type { RotorType } from './partsData'

export function MotorScene({
  explode,
  rotorType,
  selected,
  onSelect,
}: {
  explode: number
  rotorType: RotorType
  selected: string | null
  onSelect: (id: string) => void
}) {
  return (
    <Canvas
      camera={{ position: [6, 3.2, 6], fov: 42 }}
      onPointerMissed={() => onSelect('')}
      className="touch-none"
      gl={{ powerPreference: 'default', antialias: true, preserveDrawingBuffer: false }}
      onCreated={({ gl }) => {
        const canvas = gl.domElement
        const handleLost = (e: Event) => {
          // Sem preventDefault() o navegador nunca tenta restaurar o contexto —
          // o canvas ficaria preto permanentemente até a próxima navegação.
          e.preventDefault()
          console.warn('[Motor3D] WebGL context perdido — aguardando restauração do navegador.')
        }
        const handleRestored = () => {
          console.info('[Motor3D] WebGL context restaurado.')
        }
        canvas.addEventListener('webglcontextlost', handleLost, false)
        canvas.addEventListener('webglcontextrestored', handleRestored, false)
      }}
    >
      <color attach="background" args={['#0a2036']} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 6, 4]} intensity={1.1} />
      <directionalLight position={[-4, -2, -4]} intensity={0.35} color="#57c2d9" />

      <Grid
        position={[0, -1.6, 0]}
        args={[20, 20]}
        cellColor="#153854"
        sectionColor="#57c2d9"
        cellSize={0.5}
        sectionSize={2.5}
        fadeDistance={18}
        infiniteGrid
      />

      <MotorParts explode={explode} rotorType={rotorType} selected={selected} onSelect={onSelect} />

      <OrbitControls enablePan={false} minDistance={3} maxDistance={14} makeDefault />
    </Canvas>
  )
}
