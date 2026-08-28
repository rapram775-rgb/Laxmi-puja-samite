import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

const ORBIT_SPEED = 0.16; // slightly faster than Earth's spin

interface MoonProps {
  earthRadius: number;
  reducedMotion: boolean;
}

export function Moon({ earthRadius, reducedMotion }: MoonProps) {
  const rawMap = useTexture("/textures/moon.jpg");
  const pivotRef = useRef<THREE.Group>(null);
  const moonRef = useRef<THREE.Mesh>(null);

  const orbitRadius = earthRadius * 2.5;
  const moonRadius = earthRadius * 0.27;

  // Clone so we tune our own copy rather than mutating the shared cache entry.
  const map = useMemo(() => {
    const t = rawMap.clone();
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    t.needsUpdate = true;
    return t;
  }, [rawMap]);

  useFrame((_, delta) => {
    if (reducedMotion) return;
    const dt = Math.min(delta, 0.05);
    if (pivotRef.current) pivotRef.current.rotation.y += ORBIT_SPEED * dt;
    if (moonRef.current) moonRef.current.rotation.y += 0.05 * dt;
  });

  return (
    // inclined orbital plane
    <group rotation={[0.32, 0, 0.12]}>
      {/* pivot starts at π so the Moon begins to the left of Earth */}
      <group ref={pivotRef} rotation={[0, Math.PI, 0]}>
        <mesh ref={moonRef} position={[orbitRadius, 0, 0]}>
          <sphereGeometry args={[moonRadius, 48, 48]} />
          <meshStandardMaterial map={map} roughness={1} metalness={0} />
        </mesh>
      </group>
    </group>
  );
}
