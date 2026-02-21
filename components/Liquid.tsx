// components/Liquid.tsx
"use client"
import { MeshDistortMaterial, Cylinder } from '@react-three/drei';

interface LiquidProps {
  color: string;
  distort: number;
  speed: number;
}

export default function Liquid({ color, distort, speed }: LiquidProps) {
  return (
    // We make the liquid slightly smaller than the beaker (1.1 vs 1.2)
    <Cylinder args={[1.1, 1.1, 2.2, 32]} position={[0, -0.1, 0]}>
      <MeshDistortMaterial
        color={color}
        speed={speed} 
        distort={distort * 0.2} // Reduced so it stays inside glass
        radius={1}
        metalness={0.2}
        roughness={0.3}
      />
    </Cylinder>
  );
}