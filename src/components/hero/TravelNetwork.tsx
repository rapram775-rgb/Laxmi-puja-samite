import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { latLngToVec3, TAU } from "../../lib/three-math";
import { EARTH_SPIN, EARTH_TILT, EARTH_Y0 } from "./earthConfig";

interface TravelNetworkProps {
  radius: number;
  reducedMotion: boolean;
}

const ROUTE_FROM: [number, number] = [27.7172, 85.324]; // Kathmandu, Nepal
const ROUTE_TO: [number, number] = [25.2048, 55.2708]; // Dubai, UAE
const ROUTE_POINTS = 96;
const ROUTE_RADIUS = 1.075;
const ROUTE_PEAK = 0.14;
const FLIGHT_DURATION = 12;
const SATELLITE_ORBIT_DURATION = 22;

function buildRoute(radius: number) {
  const start = new THREE.Vector3(...latLngToVec3(ROUTE_FROM[0], ROUTE_FROM[1], radius));
  const end = new THREE.Vector3(...latLngToVec3(ROUTE_TO[0], ROUTE_TO[1], radius));
  const a = start.clone().normalize();
  const b = end.clone().normalize();
  const omega = Math.acos(THREE.MathUtils.clamp(a.dot(b), -1, 1));
  const sinOmega = Math.sin(omega);

  const points: [number, number, number][] = [];
  for (let i = 0; i <= ROUTE_POINTS; i++) {
    const t = i / ROUTE_POINTS;
    const s1 = sinOmega < 0.0001 ? 1 - t : Math.sin((1 - t) * omega) / sinOmega;
    const s2 = sinOmega < 0.0001 ? t : Math.sin(t * omega) / sinOmega;
    const unit = a.clone().multiplyScalar(s1).add(b.clone().multiplyScalar(s2)).normalize();
    const lift = Math.sin(Math.PI * t) * ROUTE_PEAK;
    points.push(unit.multiplyScalar(radius + lift).toArray() as [number, number, number]);
  }
  return { points, start, end };
}

function pointOnRoute(points: [number, number, number][], t: number) {
  const scaled = THREE.MathUtils.clamp(t, 0, 1) * (points.length - 1);
  const index = Math.min(points.length - 2, Math.floor(scaled));
  const local = scaled - index;
  return new THREE.Vector3(...points[index]).lerp(new THREE.Vector3(...points[index + 1]), local);
}

function smooth(t: number) {
  return t * t * (3 - 2 * t);
}

function Airplane({ points, reducedMotion }: { points: [number, number, number][]; reducedMotion: boolean }) {
  const planeRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const plane = planeRef.current;
    if (!plane) return;

    const cycle = reducedMotion
      ? 0.34
      : (state.clock.elapsedTime % (FLIGHT_DURATION * 2)) / FLIGHT_DURATION;
    const direction = cycle <= 1 ? 1 : -1;
    const raw = cycle <= 1 ? cycle : 2 - cycle;
    const t = smooth(raw);
    const position = pointOnRoute(points, t);
    const ahead = pointOnRoute(points, Math.min(1, t + 0.012));
    const flightDirection = ahead.clone().sub(position).normalize().multiplyScalar(direction);

    plane.position.copy(position);
    plane.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), flightDirection);
    plane.rotateX(Math.sin(state.clock.elapsedTime * 1.8) * 0.018);
  });

  return (
    <group ref={planeRef} scale={0.12}>
      <mesh>
        <capsuleGeometry args={[0.32, 1.55, 8, 16]} />
        <meshStandardMaterial color="#e9f3ff" metalness={0.55} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0, 0.2]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[1.7, 0.055, 0.32]} />
        <meshStandardMaterial color="#d8e7ff" metalness={0.7} roughness={0.22} />
      </mesh>
      <mesh position={[0, 0.17, -0.55]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.55, 0.04, 0.2]} />
        <meshStandardMaterial color="#c8dcf8" metalness={0.65} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0, 0.95]}>
        <coneGeometry args={[0.23, 0.5, 20]} />
        <meshStandardMaterial color="#f7fbff" metalness={0.45} roughness={0.2} />
      </mesh>
      <pointLight color="#4b96ff" intensity={1.8} distance={1.5} />
    </group>
  );
}

function SolarPanel({ side }: { side: 1 | -1 }) {
  return (
    <group position={[side * 0.98, 0, 0]}>
      <mesh>
        <boxGeometry args={[0.78, 0.045, 0.62]} />
        <meshStandardMaterial color="#0a2a52" metalness={0.5} roughness={0.3} />
      </mesh>
      <group position={[0, 0.028, 0]}>
        {[-0.26, -0.13, 0, 0.13, 0.26].map((z) => (
          <mesh key={`z-${z}`} position={[0, 0, z]}>
            <boxGeometry args={[0.72, 0.008, 0.008]} />
            <meshBasicMaterial color="#6ea7df" transparent opacity={0.42} />
          </mesh>
        ))}
        {[-0.27, -0.09, 0.09, 0.27].map((x) => (
          <mesh key={`x-${x}`} position={[x, 0, 0]}>
            <boxGeometry args={[0.008, 0.008, 0.57]} />
            <meshBasicMaterial color="#6ea7df" transparent opacity={0.42} />
          </mesh>
        ))}
      </group>
      <mesh position={[side * -0.43, 0, 0]}>
        <cylinderGeometry args={[0.028, 0.028, 0.1, 12]} />
        <meshStandardMaterial color="#aeb8c6" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

function Satellite({ reducedMotion }: { reducedMotion: boolean }) {
  const orbitRef = useRef<THREE.Group>(null);
  const satelliteRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!reducedMotion && orbitRef.current) {
      orbitRef.current.rotation.y += (TAU / SATELLITE_ORBIT_DURATION) * Math.min(delta, 0.05);
    }
    if (!reducedMotion && satelliteRef.current) {
      satelliteRef.current.rotation.y += 0.09 * Math.min(delta, 0.05);
      satelliteRef.current.rotation.z += 0.018 * Math.min(delta, 0.05);
    }
  });

  return (
    <group ref={orbitRef} rotation={[0.55, 0.35, -0.35]}>
      <group ref={satelliteRef} position={[2.25, 1.55, 0.35]} scale={0.31} rotation={[0.08, -0.18, 0.18]}>
        {/* Main spacecraft bus */}
        <mesh castShadow>
          <boxGeometry args={[0.68, 0.44, 0.5]} />
          <meshStandardMaterial color="#c4cbd4" metalness={0.88} roughness={0.22} />
        </mesh>
        <mesh position={[0, 0.225, 0]}>
          <boxGeometry args={[0.56, 0.018, 0.38]} />
          <meshStandardMaterial color="#8f9aa8" metalness={0.9} roughness={0.25} />
        </mesh>
        <mesh position={[0, -0.225, 0]}>
          <boxGeometry args={[0.56, 0.018, 0.38]} />
          <meshStandardMaterial color="#e1b85a" metalness={0.7} roughness={0.38} />
        </mesh>

        {/* Gold thermal blanket strips */}
        {[-0.24, -0.08, 0.08, 0.24].map((x) => (
          <mesh key={x} position={[x, 0, 0.255]}>
            <boxGeometry args={[0.055, 0.32, 0.012]} />
            <meshStandardMaterial color="#c9942e" metalness={0.65} roughness={0.3} />
          </mesh>
        ))}

        {/* Solar-array wings */}
        <SolarPanel side={-1} />
        <SolarPanel side={1} />

        {/* Panel support booms */}
        <mesh position={[-0.48, 0, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.42, 12]} />
          <meshStandardMaterial color="#7d8794" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0.48, 0, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.42, 12]} />
          <meshStandardMaterial color="#7d8794" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* High-gain communications dish */}
        <group position={[0, 0.04, 0.52]} rotation={[Math.PI / 2.25, 0, 0]}>
          <mesh>
            <coneGeometry args={[0.25, 0.13, 32, 1, true]} />
            <meshStandardMaterial color="#d9dee5" metalness={0.72} roughness={0.25} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, 0, 0.1]}>
            <cylinderGeometry args={[0.025, 0.025, 0.28, 12]} />
            <meshStandardMaterial color="#9da7b4" metalness={0.9} roughness={0.18} />
          </mesh>
          <mesh position={[0, 0, 0.25]}>
            <sphereGeometry args={[0.045, 16, 16]} />
            <meshStandardMaterial color="#eef3f8" metalness={0.75} roughness={0.18} />
          </mesh>
        </group>

        {/* Earth-observation camera / sensor */}
        <group position={[0, -0.31, 0.04]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.105, 0.105, 0.12, 24]} />
            <meshStandardMaterial color="#3b4654" metalness={0.8} roughness={0.24} />
          </mesh>
          <mesh position={[0, -0.065, 0]}>
            <cylinderGeometry args={[0.075, 0.075, 0.015, 24]} />
            <meshStandardMaterial color="#07101d" metalness={0.25} roughness={0.12} />
          </mesh>
          <mesh position={[0, -0.074, 0]}>
            <sphereGeometry args={[0.038, 16, 16]} />
            <meshBasicMaterial color="#62a9ff" />
          </mesh>
        </group>

        {/* Small navigation antennas */}
        <mesh position={[0.25, 0.28, 0.08]} rotation={[0.35, 0.1, -0.3]}>
          <cylinderGeometry args={[0.012, 0.012, 0.34, 10]} />
          <meshStandardMaterial color="#aeb7c2" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[-0.25, 0.28, 0.08]} rotation={[-0.35, -0.1, 0.3]}>
          <cylinderGeometry args={[0.012, 0.012, 0.34, 10]} />
          <meshStandardMaterial color="#aeb7c2" metalness={0.9} roughness={0.2} />
        </mesh>

        <pointLight color="#3b82f6" intensity={0.9} distance={2.5} />
      </group>
    </group>
  );
}

export function TravelNetwork({ radius, reducedMotion }: TravelNetworkProps) {
  const spinRef = useRef<THREE.Group>(null);
  const { points, start, end } = useMemo(() => buildRoute(radius * ROUTE_RADIUS), [radius]);

  useFrame((_, delta) => {
    if (reducedMotion || !spinRef.current) return;
    spinRef.current.rotation.y += EARTH_SPIN * Math.min(delta, 0.05);
  });

  return (
    <>
      <group rotation={[0, 0, EARTH_TILT]}>
        <group ref={spinRef} rotation={[0, EARTH_Y0, 0]}>
          <Line points={points} color="#4b96ff" lineWidth={1.6} transparent opacity={0.72} depthWrite={false} />
          <RouteEndpoint position={start.normalize().multiplyScalar(radius * 1.04)} />
          <RouteEndpoint position={end.normalize().multiplyScalar(radius * 1.04)} />
          <Airplane points={points} reducedMotion={reducedMotion} />
        </group>
      </group>
      <Satellite reducedMotion={reducedMotion} />
    </>
  );
}

function RouteEndpoint({ position }: { position: THREE.Vector3 }) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.022, 16, 16]} />
        <meshBasicMaterial color="#eef6ff" />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.075, 20, 20]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.28} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}
