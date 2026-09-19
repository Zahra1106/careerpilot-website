import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// An original cinematic "glowing dragonfly" swarm for the hero — thin
// emissive bodies with translucent, flapping wings drifting through
// Lissajous flight paths. Built from primitives (no external assets),
// styled in the site's own violet/teal/pink palette rather than copying
// any reference footage.
function Dragonfly({ seed = 0, color = "#B6A6FF", scale = 1 }) {
  const group = useRef();
  const wingsA = useRef();
  const wingsB = useRef();

  const params = useMemo(() => {
    const r = (n) => {
      const x = Math.sin(seed * 999 + n * 37.1) * 43758.5453;
      return x - Math.floor(x);
    };
    return {
      ax: 2.6 + r(1) * 1.8,
      ay: 1.1 + r(2) * 1.1,
      az: 1.0 + r(3) * 1.3,
      fx: 0.12 + r(4) * 0.10,
      fy: 0.17 + r(5) * 0.12,
      fz: 0.09 + r(6) * 0.08,
      phase: r(7) * Math.PI * 2,
      cx: -1.5 + r(8) * 3,
      cy: -0.3 + r(9) * 1.2,
      cz: -1.5 - r(10) * 2.5,
      flapSpeed: 9 + r(11) * 5,
    };
  }, [seed]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() + params.phase;
    if (!group.current) return;
    const x = params.cx + Math.sin(t * params.fx) * params.ax;
    const y = params.cy + Math.sin(t * params.fy * 1.3) * params.ay;
    const z = params.cz + Math.cos(t * params.fz) * params.az;
    group.current.position.set(x, y, z);

    const nx = params.cx + Math.sin((t + 0.05) * params.fx) * params.ax;
    const ny = params.cy + Math.sin((t + 0.05) * params.fy * 1.3) * params.ay;
    group.current.rotation.y = Math.atan2(nx - x, 0.4) * 1.2;
    group.current.rotation.z = Math.sin(t * 0.6) * 0.12;

    const flap = Math.sin(t * params.flapSpeed);
    if (wingsA.current) wingsA.current.rotation.z = 0.15 + flap * 0.5;
    if (wingsB.current) wingsB.current.rotation.z = -0.15 - flap * 0.5;
  });

  return (
    <group ref={group} scale={scale}>
      {/* body */}
      <mesh>
        <capsuleGeometry args={[0.02, 0.5, 4, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {/* soft halo behind body for glow-without-postprocessing */}
      <mesh scale={[3, 3, 3]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshBasicMaterial color={color} transparent opacity={0.18} depthWrite={false} />
      </mesh>

      {/* front wing pair */}
      <group ref={wingsA} position={[0, 0.02, 0.1]}>
        <mesh position={[0.22, 0, 0]} rotation={[0, 0, 0.1]}>
          <planeGeometry args={[0.5, 0.16]} />
          <meshBasicMaterial color={color} transparent opacity={0.32} side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} />
        </mesh>
        <mesh position={[-0.22, 0, 0]} rotation={[0, 0, -0.1]}>
          <planeGeometry args={[0.5, 0.16]} />
          <meshBasicMaterial color={color} transparent opacity={0.32} side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} />
        </mesh>
      </group>

      {/* rear wing pair */}
      <group ref={wingsB} position={[0, 0.02, -0.06]}>
        <mesh position={[0.16, 0, 0]} rotation={[0, 0, 0.08]}>
          <planeGeometry args={[0.36, 0.12]} />
          <meshBasicMaterial color={color} transparent opacity={0.26} side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} />
        </mesh>
        <mesh position={[-0.16, 0, 0]} rotation={[0, 0, -0.08]}>
          <planeGeometry args={[0.36, 0.12]} />
          <meshBasicMaterial color={color} transparent opacity={0.26} side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} />
        </mesh>
      </group>
    </group>
  );
}

function Fireflies({ count = 90 }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
    }
    return arr;
  }, [count]);
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.getElapsedTime() * 0.01;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#B6A6FF" transparent opacity={0.55} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

const colors = ["#B6A6FF", "#6CF2E4", "#FFB0E8", "#6FE3FF"];

export default function DragonflySwarm({ count = 6 }) {
  const flies = useMemo(
    () => Array.from({ length: count }, (_, i) => ({ seed: i + 1, color: colors[i % colors.length], scale: 1 + (i % 3) * 0.35 })),
    [count]
  );

  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 6.2], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.4} />
      <Fireflies />
      {flies.map((f) => (
        <Dragonfly key={f.seed} {...f} />
      ))}
    </Canvas>
  );
}
