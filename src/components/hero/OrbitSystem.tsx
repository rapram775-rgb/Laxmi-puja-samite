import { useMemo, useRef } from "react";
import type * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { TAU } from "../../lib/three-math";

type Ring = {
  rx: number;
  rz: number;
  rotation: [number, number, number];
  opacity: number;
};

interface OrbitSystemProps {
  earthRadius: number;
  reducedMotion: boolean;
}

const POINTS = 128;
const RING_COLOR = "#3b82f6";

function ellipse(rx: number, rz: number): [number, number, number][] {
  const pts: [number, number, number][] = [];
  for (let i = 0; i <= POINTS; i++) {
    const a = (i / POINTS) * TAU;
    pts.push([Math.cos(a) * rx, 0, Math.sin(a) * rz]);
  }
  return pts;
}

export function OrbitSystem({ earthRadius, reducedMotion }: OrbitSystemProps) {
  const groupRef = useRef<THREE.Group>(null);

  const rings = useMemo<Ring[]>(() => {
    const r = earthRadius;
    return [
      { rx: 2.5 * r, rz: 2.5 * r, rotation: [0.32, 0, 0.12], opacity: 0.18 }, // Moon path
      { rx: 1.55 * r, rz: 1.55 * r, rotation: [1.2, 0.3, 0], opacity: 0.22 },
      { rx: 1.9 * r, rz: 1.72 * r, rotation: [-0.5, 0.8, 0.2], opacity: 0.14 },
      { rx: 1.4 * r, rz: 1.4 * r, rotation: [0.1, 0, 1.15], opacity: 0.12 },
    ];
  }, [earthRadius]);

  const geoms = useMemo(() => rings.map((ring) => ellipse(ring.rx, ring.rz)), [rings]);

  useFrame((_, delta) => {
    if (reducedMotion || !groupRef.current) return;
    groupRef.current.rotation.y += 0.02 * Math.min(delta, 0.05);
  });

  return (
    <group ref={groupRef}>
      {rings.map((ring, i) => (
        <Line
          key={i}
          points={geoms[i]}
          rotation={ring.rotation}
          color={RING_COLOR}
          lineWidth={1}
          transparent
          opacity={ring.opacity}
          depthWrite={false}
        />
      ))}
    </group>
  );
}
