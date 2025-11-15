import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Pedestal() {
  const meshRef = useRef()

  // Subtle rotation animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <group position={[0, 0, 0]}>
      {/* Main pedestal cylinder */}
      <mesh ref={meshRef} position={[0, 0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.8, 1, 1, 32]} />
        <meshStandardMaterial
          color="#1a1a1a"
          roughness={0.3}
          metalness={0.7}
          emissive="#111111"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Top platform */}
      <mesh position={[0, 1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.85, 0.85, 0.1, 32]} />
        <meshStandardMaterial
          color="#252525"
          roughness={0.2}
          metalness={0.8}
          emissive="#ff6b9d"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Glowing ring accent */}
      <mesh position={[0, 1.05, 0]}>
        <torusGeometry args={[0.9, 0.02, 16, 32]} />
        <meshStandardMaterial
          color="#4dabf7"
          emissive="#4dabf7"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}
