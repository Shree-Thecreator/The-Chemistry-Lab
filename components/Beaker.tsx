// components/Beaker.tsx
"use client"
import { Cylinder } from '@react-three/drei';

export default function Beaker() {
  return (
    <mesh>
      {/* The main glass body */}
      <Cylinder args={[1.2, 1.2, 2.5, 32, 1, true]} position={[0, 0, 0]}>
        <meshPhysicalMaterial
          roughness={0}
          transmission={1} // Makes it look like glass
          thickness={0.5}   // Adds glass depth
          envMapIntensity={1}
          clearcoat={1}
          transparent
          opacity={0.3}
          color="#ffffff"
        />
      </Cylinder>
      
      {/* The bottom of the beaker */}
      <Cylinder args={[1.2, 1.2, 0.1, 32]} position={[0, -1.25, 0]}>
        <meshPhysicalMaterial roughness={0} transmission={1} thickness={0.5} transparent opacity={0.3} />
      </Cylinder>
    </mesh>
  );
}