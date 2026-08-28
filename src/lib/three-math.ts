/**
 * Small, dependency-free math helpers for the 3D scene.
 * Kept framework-agnostic (plain numbers / tuples).
 */

export type Vec3 = [number, number, number];

export const DEG2RAD = Math.PI / 180;
export const TAU = Math.PI * 2;

export const clamp = (v: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, v));

export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

/** Frame-rate independent damping toward a target. */
export const damp = (
  current: number,
  target: number,
  lambda: number,
  dt: number,
): number => lerp(current, target, 1 - Math.exp(-lambda * dt));

export const easeOutExpo = (t: number): number =>
  t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);

/**
 * Convert geographic lat/lng (degrees) to a position on a sphere of `radius`,
 * matching an equirectangular texture (0°/0° faces +Z after the -90° offset).
 * Used to place surface network nodes roughly over landmasses.
 */
export function latLngToVec3(lat: number, lng: number, radius: number): Vec3 {
  const phi = (90 - lat) * DEG2RAD;
  const theta = (lng + 180) * DEG2RAD;
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return [x, y, z];
}
