import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function SpotlightParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 120;

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Cone-shaped distribution (spotlight cone)
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 2.5;
      const y = Math.random() * 6 - 1;
      pos[i * 3] = Math.cos(angle) * radius * (1 + y * 0.3);
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(angle) * radius * (1 + y * 0.3);
      spd[i] = 0.002 + Math.random() * 0.008;
    }
    return [pos, spd];
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;
    const geo = particlesRef.current.geometry;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i];
      // Gentle horizontal sway
      arr[i * 3] += Math.sin(t + i) * 0.0005;
      // Reset when too high
      if (arr[i * 3 + 1] > 5) {
        arr[i * 3 + 1] = -1;
      }
    }
    posAttr.needsUpdate = true;

    // Slow rotation
    particlesRef.current.rotation.y = t * 0.05;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#c8a84b"
        size={0.03}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function CircusScene() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 2, 6], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.1} />
        <pointLight position={[0, 8, 0]} color="#c8a84b" intensity={0.4} distance={15} />
        <SpotlightParticles />
      </Canvas>
    </div>
  );
}
