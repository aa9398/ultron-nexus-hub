import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PointMaterial, Points } from '@react-three/drei';
import * as THREE from 'three';

interface WarpTunnelProps {
  isWarping: boolean;
  onWarpComplete?: () => void;
}

// Ambient space particles - gentle drift
function AmbientParticles({ isWarping, progress }: { isWarping: boolean; progress: number }) {
  const ref = useRef<THREE.Points>(null);
  const count = 800;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const radius = 5 + Math.random() * 25;
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi) - 15;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    
    const posAttr = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;
    
    // Gentle forward drift, accelerates smoothly during warp
    const baseSpeed = 0.8;
    const warpMultiplier = isWarping ? 1 + progress * 4 : 1;
    
    for (let i = 0; i < count; i++) {
      array[i * 3 + 2] += baseSpeed * warpMultiplier * delta;
      
      if (array[i * 3 + 2] > 15) {
        array[i * 3 + 2] = -30;
        const theta = Math.random() * Math.PI * 2;
        const radius = 5 + Math.random() * 25;
        array[i * 3] = Math.cos(theta) * radius;
        array[i * 3 + 1] = Math.sin(theta) * radius;
      }
    }
    
    posAttr.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#a5b4fc"
        size={0.04 + progress * 0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.7}
      />
    </Points>
  );
}

// Curved light fields - soft arcs instead of lines
function CurvedLightFields({ isWarping, progress }: { isWarping: boolean; progress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  
  const curves = useMemo(() => {
    return [...Array(12)].map((_, i) => {
      const angle = (i / 12) * Math.PI * 2;
      const radius = 8 + (i % 3) * 3;
      return {
        startAngle: angle,
        radius,
        color: i % 2 === 0 ? '#8B5CF6' : '#06B6D4',
        opacity: 0.15 + (i % 3) * 0.05,
      };
    });
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.0008;
    }
  });

  if (progress < 0.15) return null;

  return (
    <group ref={groupRef}>
      {curves.map((curve, i) => {
        const points: THREE.Vector3[] = [];
        const segments = 50;
        
        for (let j = 0; j <= segments; j++) {
          const t = j / segments;
          const angle = curve.startAngle + t * 0.8;
          const z = -20 + t * 40 * progress;
          const r = curve.radius * (1 - t * 0.3);
          points.push(new THREE.Vector3(
            Math.cos(angle) * r,
            Math.sin(angle) * r,
            z
          ));
        }
        
        const curveGeometry = new THREE.BufferGeometry().setFromPoints(points);
        
        return (
          <primitive key={i} object={new THREE.Line(
            curveGeometry,
            new THREE.LineBasicMaterial({ 
              color: curve.color, 
              transparent: true, 
              opacity: curve.opacity * progress * 0.8,
              blending: THREE.AdditiveBlending
            })
          )} />
        );
      })}
    </group>
  );
}

// Spatial depth field - creates sense of curvature
function SpatialDepthField({ progress }: { progress: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.001;
    }
  });

  if (progress < 0.2) return null;

  return (
    <mesh ref={meshRef} position={[0, 0, -25]}>
      <ringGeometry args={[3, 20, 64, 1]} />
      <meshBasicMaterial
        color="#6366f1"
        transparent
        opacity={0.03 * progress}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// Camera with smooth easing
function WarpCamera({ isWarping, progress }: { isWarping: boolean; progress: number }) {
  const { camera } = useThree();
  const targetFov = useRef(65);
  const targetZ = useRef(5);

  useFrame(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      // Minimal FOV increase (≤8%)
      const maxFovIncrease = 5;
      targetFov.current = 65 + (isWarping ? progress * maxFovIncrease : 0);
      
      // Smooth camera drift forward
      targetZ.current = 5 - (isWarping ? progress * 2 : 0);
      
      // Use smooth easing
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov.current, 0.02);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ.current, 0.015);
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
      <AmbientParticles isWarping={isWarping} progress={progress} />
      <CurvedLightFields isWarping={isWarping} progress={progress} />
      <SpatialDepthField progress={progress} />
      
      {/* Central glow - very subtle */}
      <mesh position={[0, 0, -20]}>
        <sphereGeometry args={[4 + progress * 2, 32, 32]} />
        <meshBasicMaterial
          color="#8B5CF6"
          transparent
          opacity={0.02 + progress * 0.04}
        />
      </mesh>
    </>
  );
}

// Wrapper with smooth progress tracking
function WarpSceneWrapper({ isWarping }: { isWarping: boolean }) {
  const progressRef = useRef(0);
  
  useFrame(() => {
    // easeInOutExpo curve approximation
    const rate = isWarping ? 0.012 : 0.025;
    const target = isWarping ? 1 : 0;
    progressRef.current += (target - progressRef.current) * rate;
  });

  return <WarpScene isWarping={isWarping} progress={progressRef.current} />;
}

export const WarpTransition = ({ isWarping, onWarpComplete }: WarpTunnelProps) => {
  const startTimeRef = useRef<number | null>(null);
  const hasCompletedRef = useRef(false);
  const warpDuration = 4600; // 4.6 seconds total

  // Handle completion timing
  if (isWarping && !startTimeRef.current) {
    startTimeRef.current = Date.now();
    hasCompletedRef.current = false;
  }
  
  if (isWarping && startTimeRef.current && !hasCompletedRef.current) {
    const elapsed = Date.now() - startTimeRef.current;
    if (elapsed >= warpDuration) {
      hasCompletedRef.current = true;
      onWarpComplete?.();
    }
  }

  if (!isWarping) {
    startTimeRef.current = null;
    hasCompletedRef.current = false;
  }

  const progress = startTimeRef.current 
    ? Math.min((Date.now() - startTimeRef.current) / warpDuration, 1) 
    : 0;

  return (
    <div className="absolute inset-0 z-30 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 65 }} dpr={[1, 1.5]}>
        <WarpSceneWrapper isWarping={isWarping} />
      </Canvas>
      
      {/* Smooth color gradient overlay - purple to blue shift */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(ellipse at center, 
            transparent 0%, 
            hsl(270 80% 50% / ${0.05 + progress * 0.1}) 40%, 
            hsl(220 80% 50% / ${0.08 + progress * 0.12}) 70%,
            hsl(200 80% 50% / ${0.1 + progress * 0.15}) 100%)`,
          opacity: isWarping ? 1 : 0,
        }}
      />
      
      {/* Vignette for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, hsl(var(--background) / 0.4) 100%)',
          opacity: isWarping ? 0.5 + progress * 0.3 : 0,
          transition: 'opacity 800ms ease-out',
        }}
      />
    </div>
  );
};

export default WarpTransition;
