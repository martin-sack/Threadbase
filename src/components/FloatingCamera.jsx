import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'

export default function FloatingCamera() {
  const { camera } = useThree()
  const originalPosition = useRef(camera.position.clone())

  useFrame((state) => {
    const time = state.clock.elapsedTime

    // Subtle camera floating motion
    const offsetX = Math.sin(time * 0.3) * 0.2
    const offsetY = Math.sin(time * 0.4) * 0.15
    const offsetZ = Math.cos(time * 0.25) * 0.2

    // Don't override OrbitControls, just add subtle movement
    // This creates a breathing/floating effect
    camera.position.x += offsetX * 0.01
    camera.position.y += offsetY * 0.01
    camera.position.z += offsetZ * 0.01
  })

  return null
}
