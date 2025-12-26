import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface CosmicButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  disabled?: boolean;
}

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

  const handleClick = () => {
    if (disabled) return;
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 400);
    onClick?.();
  };

  const isPrimary = variant === 'primary';

  return (
    <motion.button
      ref={buttonRef}
      onClick={handleClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative overflow-hidden rounded-full font-orbitron font-semibold tracking-wider
        cursor-pointer select-none
        ${isPrimary ? 'px-10 py-5 text-base md:text-lg' : 'px-8 py-4 text-sm md:text-base'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      animate={{
        y: isHovered ? -3 : 0,
        rotateX: isHovered ? -2 : 0,
      }}
      transition={{ 
        type: 'tween', 
        duration: 0.4, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
    >
      {/* Frosted glass background */}
      <div className="absolute inset-0 bg-card/40 backdrop-blur-2xl rounded-full" />
      
      {/* Gradient border - thin and elegant */}
      <div
        className="absolute inset-0 rounded-full transition-opacity duration-700"
        style={{
          padding: '1.5px',
          background: isPrimary 
            ? 'linear-gradient(135deg, hsl(var(--primary) / 0.8), hsl(var(--secondary) / 0.6), hsl(var(--primary) / 0.8))' 
            : 'linear-gradient(135deg, hsl(var(--primary) / 0.4), hsl(var(--secondary) / 0.3))',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          opacity: isHovered ? 1 : 0.6,
        }}
      />
      
      {/* Outer glow - very subtle */}
      <motion.div
        className="absolute -inset-2 rounded-full blur-xl"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--secondary) / 0.15))',
        }}
        animate={{
          opacity: isHovered ? 0.6 : 0.2,
        }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
      
      {/* Very slow breathing glow (8-10s loop) */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--primary) / 0.08), hsl(var(--secondary) / 0.05))',
        }}
        animate={{
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Subtle internal shimmer - barely visible */}
      <motion.div
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, hsl(var(--foreground) / 0.03) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: ['200% 0', '-200% 0'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      {/* Click compression effect - soft radial, not ripple */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle at center, hsl(var(--primary) / 0.2) 0%, transparent 60%)',
        }}
        animate={{
          scale: isPressed ? 0.85 : 1,
          opacity: isPressed ? 0.6 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
      
      {/* Button text - subtle glow */}
      <span 
        className="relative z-10 text-foreground/95 transition-all duration-500"
        style={{
          textShadow: isHovered 
            ? '0 0 12px hsl(var(--foreground) / 0.4)' 
            : '0 0 6px hsl(var(--foreground) / 0.15)',
        }}
      >
        {children}
      </span>
    </motion.button>
  );
};

export default CosmicButton;
