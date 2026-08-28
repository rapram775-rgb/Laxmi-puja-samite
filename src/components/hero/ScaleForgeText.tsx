import { useRef } from "react";
import type * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Center, Text3D } from "@react-three/drei";
import { lerp } from "../../lib/three-math";

const FONT_URL = "/fonts/helvetiker_bold.typeface.json";

// A single vertical track: enter below frame, travel upward, reset only once
// fully out of view. X/Z never change, so there is no lateral drift.
const START: [number, number, number] = [0, -2.8, -1.35];
const FINAL: [number, number, number] = [0, 0.42, -1.35];
const END_Y = 3.25;
const LOOP_DURATION = 14;
const DELAY = 0.25;

interface ScaleForgeTextProps {
  reducedMotion: boolean;
  scale?: number;
}

export function ScaleForgeText({ reducedMotion, scale = 0.92 }: ScaleForgeTextProps) {
  const groupRef = useRef<THREE.Group>(null);
  const startAt = useRef<number | null>(null);

  useFrame((state) => {
    const g = groupRef.current;
    if (!g) return;
    if (reducedMotion) {
      g.position.set(FINAL[0], FINAL[1], FINAL[2]);
      return;
    }
    if (startAt.current === null) startAt.current = state.clock.elapsedTime + DELAY;
    const elapsed = state.clock.elapsedTime;
    const activeTime = Math.max(0, elapsed - startAt.current);
    const progress = (activeTime % LOOP_DURATION) / LOOP_DURATION;
    // Cosine easing gives zero velocity at both hidden ends of the loop.
    const smooth = 0.5 - 0.5 * Math.cos(Math.PI * progress);
    g.position.set(START[0], lerp(START[1], END_Y, smooth), START[2]);
  });

  return (
    <group
      ref={groupRef}
      scale={scale}
      position={reducedMotion ? FINAL : START}
    >
      <Center>
        <Text3D
          font={FONT_URL}
          size={0.92}
          height={0.22}
          curveSegments={6}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.012}
          bevelSegments={3}
          letterSpacing={-0.01}
        >
          ScaleForge
          <meshStandardMaterial
            color="#2c323d"
            metalness={0.92}
            roughness={0.34}
            emissive="#0a1526"
            emissiveIntensity={0.4}
          />
        </Text3D>
      </Center>
    </group>
  );
}
