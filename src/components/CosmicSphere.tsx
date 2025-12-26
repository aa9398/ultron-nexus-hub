import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion-3d';

interface CosmicSceneProps {
  mouse: React.RefObject<{ x: number; y: number }>;
  isTransitioning?: boolean;
  onTransitionComplete?: () => void;
}

// Phase definitions for the cinematic transition
enum TransitionPhase {
  IDLE = 0,
  CALM_ENGAGEMENT = 1,
  SPATIAL_CURVATURE = 2,
  PERCEIVED_VELOCITY = 3,
  DIMENSIONAL_MERGE = 4,
  ARRIVAL = 5
}

function EnergyCore({ 
  mouse, 
  phase, 
  progress 
}: { 
  mouse: React.RefObject<{ x: number; y: number }>;
  phase: TransitionPhase;
  progress: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  
  // Materials refs for animating properties
  const distortMatRef = useRef<any>(null);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    
    // IDLE & CALM ENGAGEMENT BEHAVIOR
    if (phase <= TransitionPhase.CALM_ENGAGEMENT) {
      if (meshRef.current) {
        meshRef.current.rotation.x = time * 0.1;
        meshRef.current.rotation.y = time * 0.15;
        
        // React to mouse (reduced during calm engagement)
        if (mouse.current) {
          const intensity = phase === TransitionPhase.CALM_ENGAGEMENT ? 0.05 : 0.1;
          meshRef.current.rotation.x += mouse.current.y * intensity;
          meshRef.current.rotation.y += mouse.current.x * intensity;
        }
      }
      
      // Pulse effects
      if (glowRef.current) {
        const pulse = Math.sin(time * 1.5) * 0.05 + 1;
        glowRef.current.scale.setScalar(pulse * 1.8);
      }
    }
    
    // SPATIAL CURVATURE (Phase 2) - Distortion increases, rotation speeds up slightly
    if (phase === TransitionPhase.SPATIAL_CURVATURE) {
      if (meshRef.current) {
        meshRef.current.rotation.y += delta * 0.5;
      }
      if (distortMatRef.current) {
        distortMatRef.current.distort = THREE.MathUtils.lerp(distortMatRef.current.distort, 0.6, delta * 2);
        distortMatRef.current.speed = THREE.MathUtils.lerp(distortMatRef.current.speed, 4, delta * 2);
      }
    }

    // PERCEIVED VELOCITY (Phase 3) - Stretch and color shift
    if (phase === TransitionPhase.PERCEIVED_VELOCITY) {
      if (meshRef.current) {
        meshRef.current.rotation.y += delta * 2;
        meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, 0.8, delta);
        meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, 2.5, delta); // Stretch effect
      }
    }

    // DIMENSIONAL MERGE (Phase 4) - Dissolve
    if (phase === TransitionPhase.DIMENSIONAL_MERGE) {
      if (meshRef.current) {
        meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, 0, delta * 5));
      }
      if (glowRef.current) {
        glowRef.current.material.opacity = THREE.MathUtils.lerp(glowRef.current.material.opacity, 0, delta * 5);
      }
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
            ref={distortMatRef}
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
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function SceneParticles({ phase }: { phase: TransitionPhase }) {
  const ref = useRef<THREE.Points>(null);
  const count = 400;

  const { positions, randoms } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const rnd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = 4 + Math.random() * 4;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      rnd[i] = Math.random();
    }
    return { positions: pos, randoms: rnd };
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    
    // Rotate entire particle system
    if (phase < TransitionPhase.PERCEIVED_VELOCITY) {
      ref.current.rotation.y += delta * 0.05;
      ref.current.rotation.x += delta * 0.02;
    } else {
      // Accelerate rotation during velocity phase
      ref.current.rotation.z += delta * 0.5;
    }

    const positions = ref.current.geometry.attributes.position.array as Float32Array;
    
    // Phase 4: Dimensional Merge - Particles fly outward to form UI
    if (phase === TransitionPhase.DIMENSIONAL_MERGE) {
      for (let i = 0; i < count; i++) {
        positions[i * 3] *= 1 + delta * 2; // Expand rapidly
        positions[i * 3 + 1] *= 1 + delta * 2;
        positions[i * 3 + 2] *= 1 + delta * 2;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
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
        size={0.06}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function CameraController({ 
  mouse, 
  phase, 
  progress 
}: { 
  mouse: React.RefObject<{ x: number; y: number }>;
  phase: TransitionPhase;
  progress: number;
}) {
  const { camera } = useThree();
  const initialZ = 8;
  
  useFrame((state, delta) => {
    // Parallax effect from mouse (only in early phases)
    if (phase <= TransitionPhase.CALM_ENGAGEMENT && mouse.current) {
      const targetX = mouse.current.x * 0.5;
      const targetY = mouse.current.y * 0.5;
      camera.position.x += (targetX - camera.position.x) * 2 * delta;
      camera.position.y += (targetY - camera.position.y) * 2 * delta;
    }

    // Phase 1: Drift forward slightly
    if (phase === TransitionPhase.CALM_ENGAGEMENT) {
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 7.5, delta * 0.5);
    }

    // Phase 3: Perceived Velocity - Accelerate forward
    if (phase === TransitionPhase.PERCEIVED_VELOCITY) {
      camera.position.z -= delta * 5; // Move forward fast
      // Slight FOV increase for speed effect
      if (camera instanceof THREE.PerspectiveCamera) {
        camera.fov = THREE.MathUtils.lerp(camera.fov, 65, delta * 2);
        camera.updateProjectionMatrix();
      }
    }
    
    // Phase 4: Dimensional Merge
    if (phase === TransitionPhase.DIMENSIONAL_MERGE) {
      camera.position.z -= delta * 15; // Zoom through
    }
  });

  return null;
}

function Scene({ 
  mouse, 
  phase, 
  progress 
}: { 
  mouse: React.RefObject<{ x: number; y: number }>;
  phase: TransitionPhase;
  progress: number;
}) {
  return (
    <>
      <CameraController mouse={mouse} phase={phase} progress={progress} />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#8B5CF6" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#06B6D4" />
      
      <Stars
        radius={100}
        depth={50}
        count={phase >= TransitionPhase.PERCEIVED_VELOCITY ? 6000 : 3000} // Increase density
        factor={4}
        saturation={0}
        fade
        speed={phase >= TransitionPhase.PERCEIVED_VELOCITY ? 2 : 0.5} // Speed up stars
      />
      
      <EnergyCore mouse={mouse} phase={phase} progress={progress} />
      <SceneParticles phase={phase} />
      
      {/* Curved Light Fields (Phase 2+) */}
      {phase >= TransitionPhase.SPATIAL_CURVATURE && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[5, 0.02, 16, 100]} />
          <meshBasicMaterial color="#0EA5E9" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
        </mesh>
      )}
    </>
  );
}

export const CosmicSphere = ({ 
  mouse, 
  isTransitioning = false, 
  onTransitionComplete 
}: CosmicSceneProps) => {
  const [phase, setPhase] = useState<TransitionPhase>(TransitionPhase.IDLE);
  const [progress, setProgress] = useState(0);

  // Orchestrate the Cinematic Transition Sequence
  useEffect(() => {
    if (!isTransitioning) {
      setPhase(TransitionPhase.IDLE);
      return;
    }

    // Phase 1: Calm Engagement (0s - 0.8s)
    setPhase(TransitionPhase.CALM_ENGAGEMENT);

    // Phase 2: Spatial Curvature (0.8s - 1.8s)
    const t1 = setTimeout(() => {
      setPhase(TransitionPhase.SPATIAL_CURVATURE);
    }, 800);

    // Phase 3: Perceived Velocity (1.8s - 3.0s)
    const t2 = setTimeout(() => {
      setPhase(TransitionPhase.PERCEIVED_VELOCITY);
    }, 1800);

    // Phase 4: Dimensional Merge (3.0s - 3.8s)
    const t3 = setTimeout(() => {
      setPhase(TransitionPhase.DIMENSIONAL_MERGE);
    }, 3000);

    // Phase 5: Elegant Arrival (3.8s - 4.6s)
    const t4 = setTimeout(() => {
      setPhase(TransitionPhase.ARRIVAL);
      onTransitionComplete?.();
    }, 3800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isTransitioning, onTransitionComplete]);

  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 2]}>
        <Scene mouse={mouse} phase={phase} progress={progress} />
        
        {/* Post-processing-like overlay for fade effects */}
      </Canvas>
    </div>
  );
};

export default CosmicSphere;
