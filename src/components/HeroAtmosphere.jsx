import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Ambient cinematic background for the hero: soft drifting dust +
// slow glowing comet streaks, kept small, dim, and biased to the right
// side of the frame so it never competes with the headline. (Replaces
// an earlier "dragonfly" attempt that read as blurry rectangles rather
// than insects — this trades literal creatures for an effect that
// actually looks clean at this scale.)

function Dust({ count = 140 }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.15) * 13; // biased right
      arr[i * 3 + 1] = (Math.random() - 0.5) * 7;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 3;
    }
    return arr;
  }, [count]);
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.getElapsedTime() * 0.008;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        color="#B6A6FF"
        transparent
        opacity={0.55}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function Comet({ seed = 0, color = "#6FE3FF" }) {
  const ref = useRef();
  const matRef = useRef();

  const cfg = useMemo(() => {
    const r = (n) => {
      const x = Math.sin(seed * 12.9898 + n * 78.233) * 43758.5453;
      return x - Math.floor(x);
    };
    return {
      startX: 3.5 + r(1) * 2,
      startY: 2.5 - r(2) * 4.5,
      endX: -2.5 - r(3) * 1.5,
      endY: -2.5 + r(4) * 4.5,
      z: -3 - r(5) * 2.5,
      duration: 7 + r(6) * 5,
      offset: r(7) * 10,
      len: 0.9 + r(8) * 0.6,
    };
  }, [seed]);

  useFrame((state) => {
    const t = ((state.clock.getElapsedTime() + cfg.offset) % cfg.duration) / cfg.duration;
    const x = THREE.MathUtils.lerp(cfg.startX, cfg.endX, t);
    const y = THREE.MathUtils.lerp(cfg.startY, cfg.endY, t);
    ref.current.position.set(x, y, cfg.z);
    const angle = Math.atan2(cfg.endY - cfg.startY, cfg.endX - cfg.startX);
    ref.current.rotation.z = angle;

    // fade in/out at the ends of the path instead of popping
    const fade = Math.sin(Math.PI * t);
    matRef.current.opacity = Math.max(0, fade) * 0.5;
  });

  return (
    <mesh ref={ref}>
      <planeGeometry args={[cfg.len, 0.012]} />
      <meshBasicMaterial
        ref={matRef}
        color={color}
        transparent
        opacity={0}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function HeroAtmosphere() {
  const comets = useMemo(
    () => [
      { seed: 1, color: "#6FE3FF" },
      { seed: 2, color: "#B6A6FF" },
      { seed: 3, color: "#FF6FD8" },
      { seed: 4, color: "#6CF2E4" },
    ],
    []
  );

  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 6.2], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <Dust />
      {comets.map((c) => (
        <Comet key={c.seed} {...c} />
      ))}
    </Canvas>
  );
}
