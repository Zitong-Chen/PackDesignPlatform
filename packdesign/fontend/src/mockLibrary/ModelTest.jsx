import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import {  useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

export default function ModelPackingBag(props) {
  const name = (number) => `Textures${number}.jpg`;
  const { childData } = props;

  function Scene() {
    const colorMap = useLoader(TextureLoader, name(childData[0]));
    colorMap.offset.x = childData[1];
    colorMap.offset.y = childData[2];
    return (
      <>

        <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial map={colorMap} />
        </mesh>
      </>
    );
  }
    const group = useRef()

  
    // const colorMap = useLoader(TextureLoader, 'PavingStones092_1K_Color.jpg')
    return (
      <group ref={group} dispose={null}>
        <Scene/>
      </group>
    )
  }
