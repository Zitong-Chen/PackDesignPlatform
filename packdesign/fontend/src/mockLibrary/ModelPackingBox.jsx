import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import {  useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

export default function ModelPackingBag(props) {
  const name = (number) => `Textures${number}.jpg`;
  const { childData } = props;

  function Scene() {
    const colorMap = useLoader(TextureLoader, name(childData));
    // colorMap.offset.x += 0.2;
    // console.log(colorMap.offset.x);
    return (
      <>
        <mesh
            castShadow
            receiveShadow
            geometry={nodes.平面.geometry}
            scale={[5.5, 1, 5]}
        >
          <meshStandardMaterial map={colorMap} />
        </mesh>
        <mesh
            castShadow
            receiveShadow
            geometry={nodes.平面003.geometry}
            position={[0, 5.54, 0]}
            rotation={[0, 0, -Math.PI]}
            scale={[5.56, 1.01, 5.06]}
        >
            <meshStandardMaterial map={colorMap} />
        </mesh>
      </>
    );
  }
    const group = useRef()
    const { nodes } = useGLTF('/gltf/packingBox.glb')
  
    // const colorMap = useLoader(TextureLoader, 'PavingStones092_1K_Color.jpg')
    return (
      <group ref={group} dispose={null}>
        <Scene/>
      </group>
    )
  }

useGLTF.preload("/gltf/packingBox.glb");