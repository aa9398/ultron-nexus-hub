import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CosmicButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  disabled?: boolean;
}

// Floating particles inside the button
const ButtonParticle = ({ delay }: { delay: number }) => {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-foreground/60"
      initial={{ opacity: 0, x: '50%', y: '50%' }}
      animate={{
        opacity: [0, 0.8, 0],
        x: ['30%', `${Math.random() * 100}%`],
        y: ['50%', `${20 + Math.random() * 60}%`],
        scale: [0.5, 1, 0.3],
      }}
      transition={{
        duration: 3,
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
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    
    // Create ripple effect
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      setRipple({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
    
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 300);
    onClick?.();
  };

  useEffect(() => {
    if (ripple) {
      const timer = setTimeout(() => setRipple(null), 600);
      return () => clearTimeout(timer);
    }
  }, [ripple]);

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
        transition-all duration-300 cursor-pointer select-none
        ${isPrimary ? 'px-10 py-5 text-base md:text-lg' : 'px-8 py-4 text-sm md:text-base'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      animate={{
        scale: isPressed ? 0.95 : isHovered ? 1.02 : 1,
        rotateX: isHovered ? -5 : 0,
        z: isHovered ? 20 : 0,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
    >
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-card/30 backdrop-blur-xl rounded-full" />
      
      {/* Gradient border */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          padding: '2px',
          background: isPrimary 
            ? 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--primary)))' 
            : 'linear-gradient(135deg, hsl(var(--primary) / 0.5), hsl(var(--secondary) / 0.5))',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
        animate={{
          opacity: isHovered ? 1 : 0.7,
        }}
      />
      
      {/* Outer glow */}
      <motion.div
        className="absolute -inset-1 rounded-full blur-lg"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--primary) / 0.4), hsl(var(--secondary) / 0.4))',
        }}
        animate={{
          opacity: isHovered ? 0.8 : 0.3,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Breathing pulse animation */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--secondary) / 0.1))',
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Floating star particles inside button */}
      <div className="absolute inset-0 overflow-hidden rounded-full">
        {[...Array(6)].map((_, i) => (
          <ButtonParticle key={i} delay={i * 0.5} />
        ))}
      </div>
      
      {/* Hover light distortion effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsl(var(--foreground) / 0.1) 0%, transparent 50%)',
            }}
          />
        )}
      </AnimatePresence>
      
      {/* Ripple shockwave on click */}
      <AnimatePresence>
        {ripple && (
          <motion.div
            className="absolute rounded-full bg-foreground/30"
            initial={{ 
              width: 0, 
              height: 0, 
              x: ripple.x, 
              y: ripple.y,
              opacity: 0.8 
            }}
            animate={{ 
              width: 400, 
              height: 400, 
              x: ripple.x - 200, 
              y: ripple.y - 200,
              opacity: 0 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>
      
      {/* Light beam on click */}
      <AnimatePresence>
        {isPressed && (
          <motion.div
            className="absolute inset-0 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{ duration: 0.3 }}
            style={{
              background: 'radial-gradient(circle, hsl(var(--foreground) / 0.5) 0%, transparent 70%)',
            }}
          />
        )}
      </AnimatePresence>
      
      {/* Button text */}
      <motion.span
        className="relative z-10 text-foreground drop-shadow-[0_0_10px_hsl(var(--foreground)/0.5)]"
        animate={{
          textShadow: isHovered 
            ? '0 0 20px hsl(var(--foreground) / 0.8)' 
            : '0 0 10px hsl(var(--foreground) / 0.3)',
        }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
};

export default CosmicButton;
