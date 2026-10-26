import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function CityModel() {
  const { scene } = useGLTF('/models/tochka-b-city-light.glb');
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.15;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  const clonedScene = scene.clone();

  return (
    <group ref={groupRef} scale={1.2} position={[0, -0.5, 0]}>
      <primitive object={clonedScene} />
    </group>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#1a1a2e" wireframe />
    </mesh>
  );
}

export default function CityBackground3D() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      }}
    >
      <Canvas
        camera={{ position: [0, 2, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ff9f43" />
        <directionalLight position={[-5, 3, -5]} intensity={0.3} color="#4834d4" />
        <pointLight position={[0, 4, 0]} intensity={0.5} color="#ff6b6b" />

        <Suspense fallback={<LoadingFallback />}>
          <CityModel />
          <Environment preset="city" />
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.4}
            scale={20}
            blur={2}
            far={4}
          />
        </Suspense>

        <fog attach="fog" args={['#0f0c29', 10, 25]} />
      </Canvas>
    </div>
  );
}
