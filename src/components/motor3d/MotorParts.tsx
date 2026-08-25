import { useMemo } from 'react'
import { Edges } from '@react-three/drei'
import { DoubleSide } from 'three'
import type { RotorType } from './partsData'

const COLOR = {
  surface: '#0f2f4d',
  line: '#57c2d9',
  accent: '#ffb648',
  muted: '#86aac2',
}

function lerpPos(base: [number, number, number], offset: [number, number, number], t: number): [number, number, number] {
  return [base[0] + offset[0] * t, base[1] + offset[1] * t, base[2] + offset[2] * t]
}

function Selectable({
  id,
  position,
  selected,
  onSelect,
  children,
}: {
  id: string
  position: [number, number, number]
  selected: boolean
  onSelect: (id: string) => void
  children: React.ReactNode
}) {
  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation()
        onSelect(id)
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto'
      }}
    >
      {children}
      {selected && (
        <mesh>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color={COLOR.accent} />
        </mesh>
      )}
    </group>
  )
}

function TechMaterial({ selected, color = COLOR.surface }: { selected: boolean; color?: string }) {
  return <meshStandardMaterial color={selected ? COLOR.accent : color} roughness={0.6} metalness={0.15} />
}

export function MotorParts({
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
  const t = explode

  const positions = useMemo(
    () => ({
      carcaca: lerpPos([0, 0, 0], [-0.3, 0, 0], t),
      estator: lerpPos([0, 0, 0], [0.3, 0, 0], t),
      rotor: lerpPos([0, 0, 0], [0.8, 0, 0], t),
      eixo: lerpPos([0, 0, 0], [2.2, 0, 0], t),
      tampaTraseira: lerpPos([-1.9, 0, 0], [-1.4, 0, 0], t),
      tampaDianteira: lerpPos([1.9, 0, 0], [1.4, 0, 0], t),
      rolamentoTraseiro: lerpPos([-2.0, 0, 0], [-1.9, 0, 0], t),
      rolamentoDianteiro: lerpPos([2.0, 0, 0], [1.9, 0, 0], t),
      ventilador: lerpPos([-2.35, 0, 0], [-2.6, 0, 0], t),
      caixaLigacao: lerpPos([0, 1.1, 0], [0, 1.2, 0], t),
    }),
    [t],
  )

  return (
    <group>
      {/* Carcaça — outer shell with simple axial fin ridges */}
      <Selectable id="carcaca" position={positions.carcaca} selected={selected === 'carcaca'} onSelect={onSelect}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[1.0, 1.0, 3.6, 24, 1, true]} />
          <TechMaterial selected={selected === 'carcaca'} />
          <Edges color={COLOR.line} />
        </mesh>
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2
          return (
            <mesh key={i} position={[0, Math.sin(angle) * 1.05, Math.cos(angle) * 1.05]} rotation={[0, 0, Math.PI / 2]}>
              <boxGeometry args={[3.6, 0.06, 0.1]} />
              <meshStandardMaterial color={COLOR.line} opacity={0.5} transparent />
            </mesh>
          )
        })}
      </Selectable>

      {/* Estator */}
      <Selectable id="estator" position={positions.estator} selected={selected === 'estator'} onSelect={onSelect}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.85, 0.85, 3.2, 24, 1, true]} />
          <TechMaterial selected={selected === 'estator'} color={COLOR.surface} />
          <Edges color={COLOR.line} />
        </mesh>
      </Selectable>

      {/* Rotor — toggles gaiola/bobinado */}
      <Selectable id="rotor" position={positions.rotor} selected={selected === 'rotor'} onSelect={onSelect}>
        {rotorType === 'gaiola' ? (
          <group>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.5, 0.5, 3.0, 20]} />
              <TechMaterial selected={selected === 'rotor'} />
              <Edges color={COLOR.line} />
            </mesh>
            {Array.from({ length: 10 }).map((_, i) => {
              const angle = (i / 10) * Math.PI * 2
              return (
                <mesh key={i} position={[0, Math.sin(angle) * 0.55, Math.cos(angle) * 0.55]} rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry args={[0.03, 0.03, 3.0, 6]} />
                  <meshStandardMaterial color={COLOR.accent} />
                </mesh>
              )
            })}
          </group>
        ) : (
          <group>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.5, 0.5, 2.6, 20]} />
              <TechMaterial selected={selected === 'rotor'} />
              <Edges color={COLOR.line} />
            </mesh>
            {[1.5, 1.65, 1.8].map((x, i) => (
              <mesh key={i} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.2 - i * 0.04, 0.2 - i * 0.04, 0.08, 16]} />
                <meshStandardMaterial color={COLOR.muted} />
              </mesh>
            ))}
          </group>
        )}
      </Selectable>

      {/* Eixo */}
      <Selectable id="eixo" position={positions.eixo} selected={selected === 'eixo'} onSelect={onSelect}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.12, 0.12, 7.5, 16]} />
          <TechMaterial selected={selected === 'eixo'} color={COLOR.muted} />
          <Edges color={COLOR.line} />
        </mesh>
      </Selectable>

      {/* Tampas */}
      <Selectable id="tampa-traseira" position={positions.tampaTraseira} selected={selected === 'tampa-traseira'} onSelect={onSelect}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[1.0, 1.0, 0.2, 24]} />
          <TechMaterial selected={selected === 'tampa-traseira'} />
          <Edges color={COLOR.line} />
        </mesh>
      </Selectable>
      <Selectable id="tampa-dianteira" position={positions.tampaDianteira} selected={selected === 'tampa-dianteira'} onSelect={onSelect}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[1.0, 1.0, 0.2, 24]} />
          <TechMaterial selected={selected === 'tampa-dianteira'} />
          <Edges color={COLOR.line} />
        </mesh>
      </Selectable>

      {/* Rolamentos */}
      <Selectable id="rolamento-traseiro" position={positions.rolamentoTraseiro} selected={selected === 'rolamento-traseiro'} onSelect={onSelect}>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.22, 0.06, 10, 24]} />
          <TechMaterial selected={selected === 'rolamento-traseiro'} color={COLOR.muted} />
          <Edges color={COLOR.line} />
        </mesh>
      </Selectable>
      <Selectable id="rolamento-dianteiro" position={positions.rolamentoDianteiro} selected={selected === 'rolamento-dianteiro'} onSelect={onSelect}>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.22, 0.06, 10, 24]} />
          <TechMaterial selected={selected === 'rolamento-dianteiro'} color={COLOR.muted} />
          <Edges color={COLOR.line} />
        </mesh>
      </Selectable>

      {/* Ventilador + tampa defletora */}
      <Selectable id="ventilador" position={positions.ventilador} selected={selected === 'ventilador'} onSelect={onSelect}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.45, 0.45, 0.1, 20]} />
          <TechMaterial selected={selected === 'ventilador'} />
          <Edges color={COLOR.line} />
        </mesh>
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2
          return (
            <mesh key={i} position={[0, Math.sin(angle) * 0.3, Math.cos(angle) * 0.3]} rotation={[angle, 0, 0]}>
              <boxGeometry args={[0.08, 0.28, 0.03]} />
              <meshStandardMaterial color={COLOR.line} />
            </mesh>
          )
        })}
        <mesh position={[-0.15, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.65, 0.85, 0.35, 20, 1, true]} />
          <meshStandardMaterial color={COLOR.surface} side={DoubleSide} />
          <Edges color={COLOR.line} />
        </mesh>
      </Selectable>

      {/* Caixa de ligação */}
      <Selectable id="caixa-ligacao" position={positions.caixaLigacao} selected={selected === 'caixa-ligacao'} onSelect={onSelect}>
        <mesh>
          <boxGeometry args={[0.7, 0.4, 0.6]} />
          <TechMaterial selected={selected === 'caixa-ligacao'} />
          <Edges color={COLOR.line} />
        </mesh>
      </Selectable>
    </group>
  )
}
