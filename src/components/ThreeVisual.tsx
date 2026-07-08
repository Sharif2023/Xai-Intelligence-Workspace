"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function generateSphereParticles(count: number, radius: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = Math.cbrt(Math.random()) * radius;
    
    const sinPhi = Math.sin(phi);
    
    positions[i * 3] = r * sinPhi * Math.cos(theta);
    positions[i * 3 + 1] = r * sinPhi * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
}

function ParticleSwarm() {
  const ref = useRef<THREE.Points>(null);
  const sphere = useMemo(() => generateSphereParticles(4000, 1.8), []);
  const mouse = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (ref.current) {
      // Base slow rotation
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;

      // React to mouse movement (WOW moment)
      const targetX = (state.pointer.x * Math.PI) / 4;
      const targetY = (state.pointer.y * Math.PI) / 4;
      
      mouse.current.x += (targetX - mouse.current.x) * 0.05;
      mouse.current.y += (targetY - mouse.current.y) * 0.05;

      ref.current.rotation.y += mouse.current.x * delta * 2;
      ref.current.rotation.x += mouse.current.y * delta * 2;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#3b82f6"
          size={0.012}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

export default function ThreeVisual() {
  return (
    <Canvas camera={{ position: [0, 0, 4] }} gl={{ alpha: false, antialias: false }}>
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={0.5} />
      <ParticleSwarm />
    </Canvas>
  );
}
