import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { QuadraticBezierLine } from "@react-three/drei";
import { latLngToVec3 } from "../../lib/three-math";
import { projects } from "../../data/projects";
import { EARTH_SPIN, EARTH_TILT, EARTH_Y0 } from "./earthConfig";

interface NetworkNodesProps {
  radius: number;
  reducedMotion: boolean;
  highlightId: string | null;
}

/** Ambient infrastructure points (roughly over populated landmasses). */
const AMBIENT: [number, number][] = [
  [35.7, 139.7],
  [1.35, 103.8],
  [-33.9, 151.2],
  [55.75, 37.6],
  [19.08, 72.88],
  [30.04, 31.24],
  [48.85, 2.35],
  [25.2, 55.27],
  [-1.29, 36.82],
  [39.9, 116.4],
];

const NODE_COLOR = new THREE.Color("#cfe4ff");
const HALO_COLOR = new THREE.Color("#3b82f6");
const ARC_COLOR = "#2f6bdc";

function Node({
  position,
  seed,
  highlighted,
  reducedMotion,
}: {
  position: [number, number, number];
  seed: number;
  highlighted: boolean;
  reducedMotion: boolean;
}) {
  const haloRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const base = highlighted ? 1.7 : 1;
    let pulse = base;
    if (!reducedMotion) {
      pulse = base + Math.sin(state.clock.elapsedTime * 1.6 + seed) * 0.18;
    }
    if (haloRef.current) haloRef.current.scale.setScalar(pulse);
    const mat = coreRef.current?.material as THREE.MeshBasicMaterial | undefined;
    if (mat) mat.opacity = highlighted ? 1 : 0.85;
  });

  return (
    <group position={position}>
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.016, 12, 12]} />
        <meshBasicMaterial color={NODE_COLOR} transparent opacity={0.85} depthWrite={false} />
      </mesh>
      <mesh ref={haloRef}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial
          color={HALO_COLOR}
          transparent
          opacity={highlighted ? 0.55 : 0.32}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export function NetworkNodes({ radius, reducedMotion, highlightId }: NetworkNodesProps) {
  const spinRef = useRef<THREE.Group>(null);
  const surface = radius * 1.012;

  const projectNodes = useMemo(
    () =>
      projects.map((p) => ({
        id: p.id,
        pos: latLngToVec3(p.node.lat, p.node.lng, surface),
      })),
    [surface],
  );

  const ambientNodes = useMemo(
    () => AMBIENT.map(([lat, lng]) => latLngToVec3(lat, lng, surface)),
    [surface],
  );

  // Curved arcs linking a curated set of points into an infrastructure mesh.
  const arcs = useMemo(() => {
    const pts = [...projectNodes.map((n) => n.pos), ...ambientNodes];
    const pairs: [number, number][] = [
      [0, 1],
      [0, 3],
      [1, 2],
      [2, 5],
      [3, 4],
      [4, 5],
      [0, 6],
      [3, 12],
      [6, 8],
      [7, 11],
      [1, 9],
      [2, 14],
    ];
    return pairs
      .filter(([a, b]) => a < pts.length && b < pts.length)
      .map(([a, b]) => {
        const start = new THREE.Vector3(...pts[a]);
        const end = new THREE.Vector3(...pts[b]);
        const mid = start
          .clone()
          .add(end)
          .normalize()
          .multiplyScalar(surface * 1.28);
        return { start: pts[a], end: pts[b], mid: mid.toArray() as [number, number, number] };
      });
  }, [projectNodes, ambientNodes, surface]);

  useFrame((_, delta) => {
    if (reducedMotion || !spinRef.current) return;
    spinRef.current.rotation.y += EARTH_SPIN * Math.min(delta, 0.05);
  });

  return (
    <group rotation={[0, 0, EARTH_TILT]}>
      <group ref={spinRef} rotation={[0, EARTH_Y0, 0]}>
        {arcs.map((arc, i) => (
          <QuadraticBezierLine
            key={`arc-${i}`}
            start={arc.start}
            end={arc.end}
            mid={arc.mid}
            color={ARC_COLOR}
            lineWidth={1}
            transparent
            opacity={0.35}
            depthWrite={false}
          />
        ))}
        {projectNodes.map((n, i) => (
          <Node
            key={n.id}
            position={n.pos}
            seed={i * 1.7}
            highlighted={highlightId === n.id}
            reducedMotion={reducedMotion}
          />
        ))}
        {ambientNodes.map((pos, i) => (
          <Node
            key={`amb-${i}`}
            position={pos}
            seed={i * 0.9 + 3}
            highlighted={false}
            reducedMotion={reducedMotion}
          />
        ))}
      </group>
    </group>
  );
}
