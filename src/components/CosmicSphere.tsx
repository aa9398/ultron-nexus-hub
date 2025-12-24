import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

function EnergyCore({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      
      // React to mouse
      if (mouse.current) {
        meshRef.current.rotation.x += mouse.current.y * 0.1;
        meshRef.current.rotation.y += mouse.current.x * 0.1;
      }
    }
    if (glowRef.current) {
      glowRef.current.rotation.x = -state.clock.elapsedTime * 0.08;
      glowRef.current.rotation.z = state.clock.elapsedTime * 0.12;
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.05 + 1;
      glowRef.current.scale.setScalar(pulse);
    }
    if (innerRef.current) {
      const innerPulse = Math.sin(state.clock.elapsedTime * 3) * 0.1 + 1;
      innerRef.current.scale.setScalar(innerPulse * 0.5);
    }
  });

  return (
    <group>
      {/* Inner glowing core */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
      </mesh>

      {/* Main sphere with distortion */}
      <mesh ref={meshRef}>
        <Sphere args={[1.5, 64, 64]}>
          <MeshDistortMaterial
            color="#6A00FF"
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.85}
          />
        </Sphere>
      </mesh>

      {/* Outer glow layer */}
      <mesh ref={glowRef} scale={1.8}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial
          color="#0EA5E9"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Energy rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2, 0.02, 16, 100]} />
        <meshBasicMaterial color="#8B5CF6" transparent opacity={0.6} />
      </mesh>
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[2.5, 0.015, 16, 100]} />
        <meshBasicMaterial color="#06B6D4" transparent opacity={0.4} />
      </mesh>
      <mesh rotation={[Math.PI / 4, -Math.PI / 3, Math.PI / 6]}>
        <torusGeometry args={[2.8, 0.01, 16, 100]} />
        <meshBasicMaterial color="#A855F7" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

function OrbitingParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 200;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = 3 + Math.random() * 2;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05;
      ref.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#8B5CF6"
        size={0.05}
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

function Scene({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const { camera } = useThree();
  
  useFrame(() => {
    if (mouse.current) {
      camera.position.x = mouse.current.x * 0.5;
      camera.position.y = mouse.current.y * 0.5;
      camera.lookAt(0, 0, 0);
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#8B5CF6" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06B6D4" />
      <Stars
        radius={100}
        depth={50}
        count={3000}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />
      <EnergyCore mouse={mouse} />
      <OrbitingParticles />
    </>
  );
}

export const CosmicSphere = ({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) => {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 2]}>
        <Scene mouse={mouse} />
      </Canvas>
    </div>
  );
};
