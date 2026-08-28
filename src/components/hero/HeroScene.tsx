import { Suspense } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, Environment, Lightformer } from "@react-three/drei";
import { Earth } from "./Earth";
import { Moon } from "./Moon";
import { OrbitSystem } from "./OrbitSystem";
import { NetworkNodes } from "./NetworkNodes";
import { TravelNetwork } from "./TravelNetwork";
import { RealisticStarField } from "./RealisticStarField";
import { EARTH_RADIUS } from "./earthConfig";

const SUN_DIR = new THREE.Vector3(-0.55, 0.25, 0.6).normalize();
const SUN_POS: [number, number, number] = [
  SUN_DIR.x * 6,
  SUN_DIR.y * 6,
  SUN_DIR.z * 6,
];

interface HeroSceneProps {
  reducedMotion: boolean;
  highlightId: string | null;
  maxDpr: number;
  compact: boolean;
}

export default function HeroScene({
  reducedMotion,
  highlightId,
  maxDpr,
  compact,
}: HeroSceneProps) {
  return (
    <Canvas
      flat
      dpr={[1, maxDpr]}
      camera={{ position: [0, 0, compact ? 5.2 : 4.3], fov: 42, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <AdaptiveDpr pixelated={false} />
      <color attach="background" args={["#03060b"]} />
      <RealisticStarField compact={compact} reducedMotion={reducedMotion} />

      {/* lighting — one warm sun + one blue rim, restrained fill */}
      <ambientLight intensity={0.18} />
      <directionalLight position={SUN_POS} intensity={1.7} color="#fff4e6" />
      <pointLight position={[0, 0.9, -2.2]} intensity={3.2} color="#3b82f6" distance={9} />
      <pointLight position={[-2.4, 0.4, 2.2]} intensity={0.45} color="#88aaff" />

      {/* procedural reflection environment — no external HDR dependency */}
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={1.3} color="#d7e2ff" position={[0, 3, 1]} scale={[7, 3, 1]} />
        <Lightformer form="rect" intensity={0.9} color="#3b82f6" position={[-4, 1, -2]} scale={[4, 5, 1]} />
        <Lightformer form="rect" intensity={0.55} color="#7f8fb3" position={[4, -1, 2]} scale={[4, 4, 1]} />
      </Environment>

      <Suspense fallback={null}>
        <group position={[0, compact ? -0.08 : -0.05, 0]}>
          <Earth radius={EARTH_RADIUS} sunDir={SUN_DIR} reducedMotion={reducedMotion} />
          <Moon earthRadius={EARTH_RADIUS} reducedMotion={reducedMotion} />
          <OrbitSystem earthRadius={EARTH_RADIUS} reducedMotion={reducedMotion} />
          <NetworkNodes radius={EARTH_RADIUS} reducedMotion={reducedMotion} highlightId={highlightId} />
          <TravelNetwork radius={EARTH_RADIUS} reducedMotion={reducedMotion} />
        </group>

      </Suspense>
    </Canvas>
  );
}
