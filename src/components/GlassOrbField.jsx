import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Environment, Float } from "@react-three/drei";
import * as THREE from "three";

// A cluster of soft, distorted "liquid glass" blobs that drift and
// refract light — the 3D centerpiece behind the hero mockup. Kept
// deliberately sparse (3 shapes) and slow so it reads as ambient
// atmosphere, not a distraction from the headline/copy.
function Blob({ position, scale, colorA, speed, distort }) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = Math.sin(t * 0.15) * 0.3;
    ref.current.rotation.y = t * 0.08;
  });
  return (
    <Float speed={speed} rotationIntensity={0.25} floatIntensity={1.1}>
      <Sphere ref={ref} args={[1, 128, 128]} position={position} scale={scale}>
        <MeshDistortMaterial
          color={colorA}
          distort={distort}
          speed={1.4}
          roughness={0.08}
          metalness={0.15}
          transparent
          opacity={0.85}
          transmission={0.55}
          thickness={1.4}
          clearcoat={1}
        />
      </Sphere>
    </Float>
  );
}

function Particles({ count = 60 }) {
  const points = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
    }
    return arr;
  }, [count]);
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.getElapsedTime() * 0.015;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#B6A6FF" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

export default function GlassOrbField() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 7], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 4, 5]} intensity={1.2} />
      <Blob position={[2.4, 0.8, -1]} scale={2.1} colorA="#7C5CFF" speed={1} distort={0.35} />
      <Blob position={[-2.6, -1, -2]} scale={1.5} colorA="#17D6C4" speed={1.3} distort={0.4} />
      <Blob position={[1.2, -1.6, -2.5]} scale={1.1} colorA="#FF6FD8" speed={0.9} distort={0.3} />
      <Particles />
      <Environment preset="city" />
    </Canvas>
  );
}
