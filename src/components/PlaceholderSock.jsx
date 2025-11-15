import { useRef, useState, useEffect, useMemo } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'

export default function PlaceholderSock({
  customColor = '#ff6b9d',
  logoUrl = null,
  fabric = { roughness: 0.6, metalness: 0.3 }
}) {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const baseColor = useMemo(() => new THREE.Color(customColor), [customColor])
  const pulseColor = useMemo(() => new THREE.Color('#4dabf7'), [])
  const [logoTexture, setLogoTexture] = useState(null)

  // Load logo texture when logoUrl changes
  useEffect(() => {
    if (logoUrl) {
      const textureLoader = new THREE.TextureLoader()
      textureLoader.load(logoUrl, (texture) => {
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapT = THREE.RepeatWrapping
        texture.repeat.set(1, 1)
        setLogoTexture(texture)
      })
    } else {
      setLogoTexture(null)
    }
  }, [logoUrl])

  useFrame((state) => {
    if (!groupRef.current) return

    const time = state.clock.elapsedTime

    // Floating animation
    groupRef.current.position.y = 2 + Math.sin(time * 1.5) * 0.15

    // Gentle rotation
    groupRef.current.rotation.y = time * 0.5

    // Scale animation on hover
    const targetScale = hovered ? 1.2 : 1
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    )

    // Color pulse on click
    if (clicked) {
      const pulse = Math.sin(time * 5) * 0.5 + 0.5
      const color = new THREE.Color().lerpColors(baseColor, pulseColor, pulse)

      groupRef.current.children.forEach((child) => {
        if (child.material) {
          child.material.color = color
          child.material.emissive = color
          child.material.emissiveIntensity = pulse * 0.5
        }
      })
    }
  })

  const handleClick = () => {
    setClicked(!clicked)
  }

  return (
    <group
      ref={groupRef}
      position={[0, 2, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={handleClick}
      style={{ cursor: hovered ? 'pointer' : 'auto' }}
    >
      {/* Sock foot part (main body) */}
      <mesh castShadow position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.15, 0.8, 16, 32]} />
        <meshStandardMaterial
          color={clicked ? pulseColor : baseColor}
          roughness={fabric.roughness}
          metalness={fabric.metalness}
          emissive={clicked ? pulseColor : baseColor}
          emissiveIntensity={clicked ? 0.3 : 0.1}
          map={logoTexture}
        />
      </mesh>

      {/* Sock ankle part */}
      <mesh castShadow position={[-0.5, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.18, 0.5, 16]} />
        <meshStandardMaterial
          color={clicked ? pulseColor : baseColor}
          roughness={fabric.roughness}
          metalness={fabric.metalness}
          emissive={clicked ? pulseColor : baseColor}
          emissiveIntensity={clicked ? 0.3 : 0.1}
        />
      </mesh>

      {/* Sock cuff (top band) */}
      <mesh castShadow position={[-0.5, 0.3, 0]}>
        <cylinderGeometry args={[0.19, 0.16, 0.15, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.5}
          metalness={0.2}
          emissive="#ffffff"
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* Heel bump */}
      <mesh castShadow position={[0.2, -0.1, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial
          color={clicked ? pulseColor : baseColor}
          roughness={fabric.roughness}
          metalness={fabric.metalness}
          emissive={clicked ? pulseColor : baseColor}
          emissiveIntensity={clicked ? 0.3 : 0.1}
        />
      </mesh>
    </group>
  )
}
