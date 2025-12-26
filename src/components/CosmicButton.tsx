import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CosmicButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  disabled?: boolean;
}

// Subtle internal particle shimmer (barely visible)
const ButtonParticle = ({ delay }: { delay: number }) => {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-white/20"
      initial={{ opacity: 0, x: '50%', y: '50%' }}
      animate={{
        opacity: [0, 0.4, 0],
        x: ['10%', `${Math.random() * 100}%`],
        y: ['50%', `${20 + Math.random() * 60}%`],
        scale: [0.5, 0.8, 0.3],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
};

export const CosmicButton = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
}: CosmicButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Mouse position for 3D tilt
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 300);
    onClick?.();
  };

  const isPrimary = variant === 'primary';

  return (
    <motion.button
      ref={buttonRef}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
      className={`
        relative overflow-hidden rounded-full font-orbitron font-medium tracking-widest
        transition-all duration-500 cursor-pointer select-none
        ${isPrimary ? 'px-10 py-5 text-sm md:text-base' : 'px-8 py-4 text-xs md:text-sm'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      animate={{
        scale: isPressed ? 0.98 : 1,
        y: isHovered ? -2 : 0,
        rotateX: isHovered ? mousePosition.y * 10 : 0,
        rotateY: isHovered ? -mousePosition.x * 10 : 0,
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 30,
        mass: 0.8
      }}
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
    >
      {/* Frosted Glass Background with Depth */}
      <div className="absolute inset-0 bg-glass/60 backdrop-blur-md rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]" />
      
      {/* Gradient Border Stroke */}
      <motion.div
        className="absolute inset-0 rounded-full p-[1px]"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--primary)/0.5), hsl(var(--secondary)/0.5))',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
        animate={{
          opacity: isHovered ? 1 : 0.6,
        }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Idle Breathing Glow (Very Slow) */}
      <motion.div
        className="absolute inset-0 rounded-full bg-primary/5"
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Hover Glow Elevation */}
      <motion.div
        className="absolute -inset-4 rounded-full bg-primary/20 blur-xl"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered ? 0.4 : 0,
          scale: isHovered ? 1 : 0.9,
        }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Subtle Internal Particles */}
      <div className="absolute inset-0 overflow-hidden rounded-full opacity-30 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <ButtonParticle key={i} delay={i * 0.8} />
        ))}
      </div>
      
      {/* Click Energy Compression (Soft Radial Distortion) */}
      <AnimatePresence>
        {isPressed && (
          <motion.div
            className="absolute inset-0 rounded-full"
            initial={{ opacity: 0, scale: 1.5 }}
            animate={{ opacity: 0.5, scale: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "circOut" }}
            style={{
              background: 'radial-gradient(circle, transparent 30%, hsl(var(--primary)/0.2) 100%)',
            }}
          />
        )}
      </AnimatePresence>
      
      {/* Button Text */}
      <motion.span
        className="relative z-10 text-white flex items-center justify-center gap-2"
        animate={{
          textShadow: isHovered 
            ? '0 0 15px rgba(255,255,255,0.6)' 
            : '0 0 8px rgba(255,255,255,0.3)',
        }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
};

export default CosmicButton;
