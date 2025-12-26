import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PointMaterial, Points } from '@react-three/drei';
import * as THREE from 'three';

interface WarpTunnelProps {
  isWarping: boolean;
  onWarpComplete?: () => void;
}

// Star streaks that stretch during warp
function WarpStars({ isWarping, progress }: { isWarping: boolean; progress: number }) {
  const ref = useRef<THREE.Points>(null);
  const count = 2000;

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      // Spread stars in a cylinder around the camera
      const theta = Math.random() * Math.PI * 2;
      const radius = 2 + Math.random() * 15;
      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = Math.sin(theta) * radius;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 100;
      vel[i] = 0.5 + Math.random() * 1.5;
    }
    return { positions: pos, velocities: vel };
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    
    const posAttr = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;
    
    const speed = isWarping ? 80 : 2;
    
    for (let i = 0; i < count; i++) {
      // Move stars toward camera (negative z)
      array[i * 3 + 2] += velocities[i] * speed * delta;
      
      // Reset stars that pass the camera
      if (array[i * 3 + 2] > 10) {
        array[i * 3 + 2] = -50;
        const theta = Math.random() * Math.PI * 2;
        const radius = 2 + Math.random() * 15;
        array[i * 3] = Math.cos(theta) * radius;
        array[i * 3 + 1] = Math.sin(theta) * radius;
      }
    }
    
    posAttr.needsUpdate = true;
  });

  // Dynamic size based on warp state
  const starSize = isWarping ? 0.15 + progress * 0.3 : 0.08;

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={starSize}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Light streaks during warp
function LightStreaks({ isWarping, progress }: { isWarping: boolean; progress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const streakCount = 50;

  const streaks = useMemo(() => {
    return [...Array(streakCount)].map((_, i) => {
      const theta = Math.random() * Math.PI * 2;
      const radius = 3 + Math.random() * 8;
      return {
        x: Math.cos(theta) * radius,
        y: Math.sin(theta) * radius,
        length: 5 + Math.random() * 15,
        speed: 0.5 + Math.random() * 1,
        color: i % 3 === 0 ? '#8B5CF6' : i % 3 === 1 ? '#06B6D4' : '#ffffff',
      };
    });
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current || !isWarping) return;
    
    groupRef.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      mesh.position.z += streaks[i].speed * 60 * delta;
      
      if (mesh.position.z > 5) {
        mesh.position.z = -40;
      }
    });
  });

  if (!isWarping && progress < 0.3) return null;

  return (
    <group ref={groupRef}>
      {streaks.map((streak, i) => (
        <mesh
          key={i}
          position={[streak.x, streak.y, -20 - i * 0.5]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.02, 0.02, streak.length * (0.5 + progress), 8]} />
          <meshBasicMaterial
            color={streak.color}
            transparent
            opacity={0.6 * progress}
          />
        </mesh>
      ))}
    </group>
  );
}

// Camera controller for warp effect
function WarpCamera({ isWarping, progress }: { isWarping: boolean; progress: number }) {
  const { camera } = useThree();
  const targetFov = useRef(75);

  useFrame(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      // Increase FOV during warp for speed effect
      targetFov.current = isWarping ? 75 + progress * 40 : 75;
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov.current, 0.05);
      camera.updateProjectionMatrix();
    }
  });

  return null;
}

// Main warp scene
function WarpScene({ isWarping, progress }: { isWarping: boolean; progress: number }) {
  return (
    <>
      <WarpCamera isWarping={isWarping} progress={progress} />
      <WarpStars isWarping={isWarping} progress={progress} />
      <LightStreaks isWarping={isWarping} progress={progress} />
      
      {/* Center tunnel glow */}
      {isWarping && (
        <mesh position={[0, 0, -30]}>
          <sphereGeometry args={[2 + progress * 5, 32, 32]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.1 + progress * 0.3}
          />
        </mesh>
      )}
    </>
  );
}

export const WarpTransition = ({ isWarping, onWarpComplete }: WarpTunnelProps) => {
  const progressRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);
  const warpDuration = 2500; // 2.5 seconds

  useEffect(() => {
    if (isWarping) {
      startTimeRef.current = Date.now();
      
      const animate = () => {
        if (startTimeRef.current) {
          const elapsed = Date.now() - startTimeRef.current;
          progressRef.current = Math.min(elapsed / warpDuration, 1);
          
          if (progressRef.current >= 1) {
            onWarpComplete?.();
            return;
          }
        }
        requestAnimationFrame(animate);
      };
      
      animate();
    } else {
      progressRef.current = 0;
      startTimeRef.current = null;
    }
  }, [isWarping, onWarpComplete]);

  return (
    <div className="absolute inset-0 z-30 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <WarpSceneWrapper isWarping={isWarping} />
      </Canvas>
      
      {/* Color shift overlay */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: isWarping
            ? 'radial-gradient(ellipse at center, transparent 0%, hsl(var(--primary) / 0.3) 50%, hsl(var(--secondary) / 0.4) 100%)'
            : 'transparent',
          opacity: isWarping ? 1 : 0,
        }}
      />
      
      {/* White flash at end */}
      <div
        className="absolute inset-0 bg-foreground pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isWarping ? 0 : 0,
        }}
      />
    </div>
  );
};

// Wrapper to use ref-based progress in canvas
function WarpSceneWrapper({ isWarping }: { isWarping: boolean }) {
  const progressRef = useRef(0);
  
  useFrame(() => {
    if (isWarping) {
      progressRef.current = Math.min(progressRef.current + 0.008, 1);
    } else {
      progressRef.current = Math.max(progressRef.current - 0.02, 0);
    }
  });

  return <WarpScene isWarping={isWarping} progress={progressRef.current} />;
}

export default WarpTransition;
