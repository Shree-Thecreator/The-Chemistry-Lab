// components/Liquid.tsx
"use client"
import React from 'react'; // Add this if you get a 'React' error
import { MeshDistortMaterial, Sphere } from '@react-three/drei';

// This interface tells TypeScript exactly what to expect
interface LiquidProps {
  color: string;
  distort: number;
  speed: number;
}

export default function Liquid({ color, distort, speed }: LiquidProps) {
  return (
    <Sphere args={[1, 100, 200]} scale={1.4}>
      <MeshDistortMaterial
        color={color}
        speed={speed} 
        distort={distort} 
        radius={1}
        metalness={0.5}
        roughness={0.2}
      />
    </Sphere>
  );
}