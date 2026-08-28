import * as THREE from "three";

/**
 * Custom Earth material: blends a day map and a night-lights map across the
 * sun terminator, adds a subtle ocean sheen and a blue atmospheric fresnel rim.
 * Written as a passthrough (sRGB) ShaderMaterial and paired with a `flat`
 * (no tone-mapping) renderer so the sampled texture colours read correctly.
 */

const earthVertex = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPos;

  void main() {
    vUv = uv;
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const earthFragment = /* glsl */ `
  uniform sampler2D uDay;
  uniform sampler2D uNight;
  uniform sampler2D uSpecular;
  uniform vec3 uSunDir;
  uniform vec3 uAtmoColor;
  uniform float uCycleDay;

  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPos;

  void main() {
    vec3 N = normalize(vWorldNormal);
    vec3 L = normalize(uSunDir);
    float sun = dot(N, L);
    float day = smoothstep(-0.12, 0.30, sun);

    vec3 dayCol = texture2D(uDay, vUv).rgb;
    vec3 nightCol = texture2D(uNight, vUv).rgb;

    // City lights only on the dark hemisphere.
    float nightAmt = 1.0 - day;
    vec3 lights = nightCol * nightAmt * 1.4;

    vec3 darkBase = vec3(0.012, 0.02, 0.045);
    vec3 physicalDay = mix(darkBase, dayCol, day) + lights;

    // Global presentation cycle. Day retains the physically lit terminator;
    // night reveals city lights across the globe without an abrupt texture swap.
    vec3 globalNight = darkBase + dayCol * 0.025 + nightCol * 1.55;
    vec3 col = mix(globalNight, physicalDay, uCycleDay);

    // Subtle specular sheen on sunlit oceans (specular map: water is bright).
    float water = texture2D(uSpecular, vUv).r;
    float spec = pow(max(sun, 0.0), 2.0) * water * 0.22;
    col += vec3(0.10, 0.16, 0.32) * spec * uCycleDay;

    // Blue atmospheric fresnel rim, stronger on the lit limb.
    vec3 V = normalize(cameraPosition - vWorldPos);
    float fres = pow(1.0 - max(dot(N, V), 0.0), 3.0);
    col += uAtmoColor * fres * (0.18 + 0.82 * day) * (0.38 + 0.62 * uCycleDay);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export interface EarthUniformTextures {
  day: THREE.Texture;
  night: THREE.Texture;
  specular: THREE.Texture;
}

export function createEarthMaterial(
  tex: EarthUniformTextures,
  sunDir: THREE.Vector3,
): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    vertexShader: earthVertex,
    fragmentShader: earthFragment,
    uniforms: {
      uDay: { value: tex.day },
      uNight: { value: tex.night },
      uSpecular: { value: tex.specular },
      uSunDir: { value: sunDir.clone() },
      uAtmoColor: { value: new THREE.Color(0.23, 0.45, 0.95) },
      uCycleDay: { value: 1 },
    },
  });
}

/* ------------------------------------------------------------------ */

const atmoVertex = /* glsl */ `
  varying vec3 vWorldNormal;
  varying vec3 vWorldPos;
  void main() {
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const atmoFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uSunDir;
  uniform float uCycleDay;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPos;
  void main() {
    vec3 N = normalize(vWorldNormal);
    vec3 V = normalize(cameraPosition - vWorldPos);
    float fres = pow(1.0 - abs(dot(N, V)), 2.2);
    float sun = dot(N, normalize(uSunDir));
    float lit = smoothstep(-0.55, 0.55, sun);
    float a = fres * (0.28 + 0.72 * lit) * (0.42 + 0.58 * uCycleDay);
    gl_FragColor = vec4(uColor, a);
  }
`;

export function createAtmosphereMaterial(
  sunDir: THREE.Vector3,
): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    vertexShader: atmoVertex,
    fragmentShader: atmoFragment,
    uniforms: {
      uColor: { value: new THREE.Color(0.27, 0.5, 1.0) },
      uSunDir: { value: sunDir.clone() },
      uCycleDay: { value: 1 },
    },
    transparent: true,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
}
