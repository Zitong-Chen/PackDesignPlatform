import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import {  useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

export default function ModelMonkey(props) {
  const name = (number) => `Textures${number}.jpg`;
  const { childData } = props;

function Scene() {
  const colorMap = useLoader(TextureLoader, name(childData));
  return (
    <>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Suzanne.geometry}
        material={nodes.Suzanne.material}
        position={[0, 0.19, -0.04]}
        >
        <meshStandardMaterial map={colorMap} />
      </mesh>
    </>
  );
}
  const group = useRef()
  const { nodes } = useGLTF('/gltf/suz.gltf')

  // const colorMap = useLoader(TextureLoader, 'PavingStones092_1K_Color.jpg')
  return (
    <group ref={group} dispose={null}>
      <Scene/>
    </group>
  )
}

useGLTF.preload('/suzanne.gltf')