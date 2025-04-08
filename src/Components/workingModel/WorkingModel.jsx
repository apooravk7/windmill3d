import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { useControls } from 'leva'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

export default function WindmillRotor({ bladeCount = 4, pitch = Math.PI * 0.25 }) {
  const rotorRef = useRef()

  // Blade pitch angle control
  const { angle } = useControls({
    angle: { value: pitch, min: 0, max: Math.PI * 0.5 }
  })

  // Create hub geometry
  const hubGeometry = useMemo(() => {
    const path = new THREE.Path()
      .moveTo(0.5, 0)
      .lineTo(0.5, 0)
      .absarc(0, 1, 0.5, 0, Math.PI * 0.5)
    const lathe = new THREE.LatheGeometry(path.getPoints(50), 72).rotateX(Math.PI * 0.5)
    const cap = new THREE.CircleGeometry(0.5, 72).rotateX(Math.PI)
    return mergeGeometries([lathe, cap]).translate(0, 0, -0.5)
  }, [])

  // Create blade geometry
  const bladeGeometry = useMemo(() => {
    const shape = new THREE.Shape()
      .moveTo(0, 0.5)
      .splineThru([
        new THREE.Vector2(0, 7),
        new THREE.Vector2(0.1, 7),
        new THREE.Vector2(0.5, 1.5),
        new THREE.Vector2(0.1, 0.5)
      ])
    return new THREE.ExtrudeGeometry(shape, {
      steps: 1,
      depth: 0.001,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05
    }).translate(0, 0, -0.05).rotateY(Math.PI * 0.5)
  }, [])

  // Animate rotor spin
  useFrame(({ clock }) => {
    if (rotorRef.current) {
      rotorRef.current.rotation.z = -clock.getElapsedTime() * 0.25
    }
  })

  return (
    <group ref={rotorRef}>
      {/* Hub */}
      <mesh geometry={hubGeometry} material={new THREE.MeshLambertMaterial({ color: 0xeeeeee })} />

      {/* Blades */}
      {Array.from({ length: bladeCount }).map((_, idx) => {
        console.log("idx",idx)
        const bladeZRot = (idx * Math.PI * 2) / bladeCount

        return (
          <group rotation={[0, 0, bladeZRot]} key={idx}>
            <mesh
              geometry={bladeGeometry}
              material={new THREE.MeshLambertMaterial({ color: 0x444444 })}
              rotation={[0, angle, 0]}
              rotationOrder="ZYX"
            >
                <axesHelper args={[10]} />
                </mesh>
          </group>
        )
      })}
    </group>
  )
}
