import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface RealisticStarFieldProps {
  compact: boolean;
  reducedMotion: boolean;
}

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  attribute float aSize;
  attribute float aBrightness;
  attribute float aSpeed;
  attribute float aPhase;
  attribute float aBlue;
  varying float vAlpha;
  varying float vBlue;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    float twinkle = 0.88 + 0.12 * sin(uTime * aSpeed + aPhase);
    vAlpha = aBrightness * twinkle;
    vBlue = aBlue;
    gl_PointSize = aSize * uPixelRatio * (34.0 / max(-mvPosition.z, 1.0));
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = /* glsl */ `
  varying float vAlpha;
  varying float vBlue;

  void main() {
    vec2 point = gl_PointCoord - vec2(0.5);
    float distanceToCenter = length(point);
    if (distanceToCenter > 0.5) discard;
    float core = 1.0 - smoothstep(0.04, 0.5, distanceToCenter);
    float halo = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
    vec3 warmWhite = vec3(0.88, 0.91, 0.96);
    vec3 coolWhite = vec3(0.66, 0.78, 1.0);
    vec3 color = mix(warmWhite, coolWhite, vBlue);
    gl_FragColor = vec4(color, vAlpha * (core * 0.72 + halo * 0.28));
  }
`;

export function RealisticStarField({ compact, reducedMotion }: RealisticStarFieldProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const count = compact ? 480 : 920;

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const brightness = new Float32Array(count);
    const speeds = new Float32Array(count);
    const phases = new Float32Array(count);
    const blues = new Float32Array(count);
    const random = seededRandom(8675309);

    for (let index = 0; index < count; index += 1) {
      const offset = index * 3;
      positions[offset] = (random() - 0.5) * 34;
      positions[offset + 1] = (random() - 0.5) * 19;
      positions[offset + 2] = -4 - random() * 20;
      const rareBrightStar = random() > 0.965;
      sizes[index] = rareBrightStar ? 1.45 + random() * 0.55 : 0.42 + random() * 0.78;
      brightness[index] = rareBrightStar ? 0.58 + random() * 0.2 : 0.16 + random() * 0.35;
      speeds[index] = 0.18 + random() * 0.42;
      phases[index] = random() * Math.PI * 2;
      blues[index] = random() * 0.55;
    }

    const result = new THREE.BufferGeometry();
    result.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    result.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    result.setAttribute("aBrightness", new THREE.BufferAttribute(brightness, 1));
    result.setAttribute("aSpeed", new THREE.BufferAttribute(speeds, 1));
    result.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    result.setAttribute("aBlue", new THREE.BufferAttribute(blues, 1));
    return result;
  }, [count]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
  }), []);

  useFrame((state) => {
    if (!materialRef.current || reducedMotion) return;
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <points geometry={geometry} frustumCulled={false} renderOrder={-10}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        depthTest={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}
