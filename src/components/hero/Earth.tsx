import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { createAtmosphereMaterial, createEarthMaterial } from "./EarthMaterial";
import { EARTH_SPIN, EARTH_TILT, EARTH_Y0 } from "./earthConfig";

interface EarthProps {
  radius: number;
  sunDir: THREE.Vector3;
  reducedMotion: boolean;
}

export function Earth({ radius, sunDir, reducedMotion }: EarthProps) {
  const [rawDay, rawNight, rawSpecular, rawClouds] = useTexture([
    "/textures/earth_day.jpg",
    "/textures/earth_night.png",
    "/textures/earth_specular.jpg",
    "/textures/earth_clouds.png",
  ]);

  const planetRef = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const cloudMaterialRef = useRef<THREE.MeshStandardMaterial>(null);

  // Clone + tune our own copies (day/night/specular stay in the shader's
  // manual colour pipeline; only the clouds layer is treated as sRGB colour).
  const { day, night, specular, clouds } = useMemo(() => {
    const tune = (src: THREE.Texture, srgb = false) => {
      const t = src.clone();
      t.anisotropy = 4;
      t.wrapS = THREE.RepeatWrapping;
      if (srgb) t.colorSpace = THREE.SRGBColorSpace;
      t.needsUpdate = true;
      return t;
    };
    return {
      day: tune(rawDay),
      night: tune(rawNight),
      specular: tune(rawSpecular),
      clouds: tune(rawClouds, true),
    };
  }, [rawDay, rawNight, rawSpecular, rawClouds]);

  const earthMat = useMemo(
    () => createEarthMaterial({ day, night, specular }, sunDir),
    [day, night, specular, sunDir],
  );
  const atmoMat = useMemo(() => createAtmosphereMaterial(sunDir), [sunDir]);

  useFrame((state, delta) => {
    const cycleDay = reducedMotion ? 1 : getDayCycle(state.clock.elapsedTime);
    earthMat.uniforms.uCycleDay.value = cycleDay;
    atmoMat.uniforms.uCycleDay.value = cycleDay;
    if (cloudMaterialRef.current) {
      cloudMaterialRef.current.opacity = 0.48 + cycleDay * 0.22;
    }
    if (reducedMotion) return;
    const dt = Math.min(delta, 0.05); // guard against tab-refocus jumps
    if (planetRef.current) planetRef.current.rotation.y += EARTH_SPIN * dt;
    if (cloudsRef.current) cloudsRef.current.rotation.y += EARTH_SPIN * 0.14 * dt;
  });

  return (
    <group>
      {/* axial tilt */}
      <group rotation={[0, 0, EARTH_TILT]}>
        {/* spinning planet */}
        <group ref={planetRef} rotation={[0, EARTH_Y0, 0]}>
          <mesh>
            <sphereGeometry args={[radius, 96, 96]} />
            <primitive object={earthMat} attach="material" />
          </mesh>
          <mesh ref={cloudsRef}>
            <sphereGeometry args={[radius * 1.006, 72, 72]} />
            <meshStandardMaterial
              ref={cloudMaterialRef}
              map={clouds}
              alphaMap={clouds}
              transparent
              opacity={0.7}
              depthWrite={false}
              roughness={1}
              metalness={0}
            />
          </mesh>
        </group>
      </group>

      {/* atmospheric glow shell */}
      <mesh>
        <sphereGeometry args={[radius * 1.025, 64, 64]} />
        <primitive object={atmoMat} attach="material" />
      </mesh>
    </group>
  );
}

const DAY_HOLD = 30;
const NIGHT_HOLD = 30;
const TRANSITION = 4;
const CYCLE_LENGTH = DAY_HOLD + TRANSITION + NIGHT_HOLD + TRANSITION;

/** Day hold → dusk blend → night hold → dawn blend. */
function getDayCycle(elapsed: number): number {
  const time = elapsed % CYCLE_LENGTH;
  if (time < DAY_HOLD) return 1;
  if (time < DAY_HOLD + TRANSITION) {
    return 1 - smoothCosine((time - DAY_HOLD) / TRANSITION);
  }
  if (time < DAY_HOLD + TRANSITION + NIGHT_HOLD) return 0;
  return smoothCosine(
    (time - DAY_HOLD - TRANSITION - NIGHT_HOLD) / TRANSITION,
  );
}

function smoothCosine(value: number): number {
  return 0.5 - 0.5 * Math.cos(Math.PI * value);
}
