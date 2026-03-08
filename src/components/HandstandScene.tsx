import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

/**
 * Handstand silhouette built from basic geometries.
 * Much darker than background to read as a shadow/silhouette.
 */
function HandstandFigure() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    // Subtle breathing sway
    groupRef.current.rotation.z = Math.sin(t * 0.8) * 0.015;
    groupRef.current.position.y = Math.sin(t * 1.2) * 0.02;
  });

  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#050508',
        roughness: 0.95,
        metalness: 0,
        transparent: true,
        opacity: 0.85,
      }),
    []
  );

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* === SUPPORT BARS === */}
      {/* Left bar */}
      <mesh position={[-0.55, -1.8, 0]} material={mat}>
        <boxGeometry args={[0.06, 1.6, 0.06]} />
      </mesh>
      {/* Right bar */}
      <mesh position={[0.55, -1.8, 0]} material={mat}>
        <boxGeometry args={[0.06, 1.6, 0.06]} />
      </mesh>
      {/* Horizontal bar connecting */}
      <mesh position={[0, -1.05, 0]} material={mat}>
        <boxGeometry args={[1.2, 0.06, 0.06]} />
      </mesh>
      {/* Base feet of bars */}
      <mesh position={[-0.55, -2.55, 0]} material={mat}>
        <boxGeometry args={[0.3, 0.06, 0.2]} />
      </mesh>
      <mesh position={[0.55, -2.55, 0]} material={mat}>
        <boxGeometry args={[0.3, 0.06, 0.2]} />
      </mesh>

      {/* === BODY — upside down === */}
      {/* Hands on bars */}
      <mesh position={[-0.55, -0.95, 0]} material={mat}>
        <sphereGeometry args={[0.07, 8, 8]} />
      </mesh>
      <mesh position={[0.55, -0.95, 0]} material={mat}>
        <sphereGeometry args={[0.07, 8, 8]} />
      </mesh>

      {/* Arms — angled from hands to shoulders */}
      {/* Left arm */}
      <mesh position={[-0.38, -0.55, 0]} rotation={[0, 0, 0.35]} material={mat}>
        <cylinderGeometry args={[0.04, 0.04, 0.85, 8]} />
      </mesh>
      {/* Right arm */}
      <mesh position={[0.38, -0.55, 0]} rotation={[0, 0, -0.35]} material={mat}>
        <cylinderGeometry args={[0.04, 0.04, 0.85, 8]} />
      </mesh>

      {/* Torso */}
      <mesh position={[0, 0.1, 0]} material={mat}>
        <cylinderGeometry args={[0.18, 0.14, 1.0, 8]} />
      </mesh>

      {/* Shoulders */}
      <mesh position={[0, -0.25, 0]} material={mat}>
        <sphereGeometry args={[0.19, 8, 8]} />
      </mesh>

      {/* Hips */}
      <mesh position={[0, 0.55, 0]} material={mat}>
        <sphereGeometry args={[0.16, 8, 8]} />
      </mesh>

      {/* Left leg — straight up, slightly split */}
      <mesh position={[-0.15, 1.2, 0]} rotation={[0, 0, 0.08]} material={mat}>
        <cylinderGeometry args={[0.05, 0.04, 1.1, 8]} />
      </mesh>
      {/* Right leg */}
      <mesh position={[0.15, 1.2, 0]} rotation={[0, 0, -0.08]} material={mat}>
        <cylinderGeometry args={[0.05, 0.04, 1.1, 8]} />
      </mesh>

      {/* Feet — pointed toes */}
      <mesh position={[-0.18, 1.8, 0]} material={mat}>
        <sphereGeometry args={[0.04, 6, 6]} />
      </mesh>
      <mesh position={[0.18, 1.8, 0]} material={mat}>
        <sphereGeometry args={[0.04, 6, 6]} />
      </mesh>

      {/* Head */}
      <mesh position={[0, -0.65, 0]} material={mat}>
        <sphereGeometry args={[0.13, 12, 12]} />
      </mesh>
    </group>
  );
}

export default function HandstandScene() {
  return (
    <div className="w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 40 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.05} />
        <pointLight position={[2, 3, 4]} color="#0a0a10" intensity={0.3} />
        <HandstandFigure />
      </Canvas>
    </div>
  );
}
