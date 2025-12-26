import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CosmicSphere } from '@/components/CosmicSphere';
import { CosmicButton } from '@/components/CosmicButton';
import logo from '@/assets/logo.png';

const IntroPage = () => {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleEnter = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
  };

  const handleTransitionComplete = () => {
    navigate('/home');
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-background">
      {/* Deep space background gradient - Static base */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-[hsl(260,40%,6%)]" />
      
      {/* Cosmic Scene - Handles 3D elements and Transition */}
      <div className="absolute inset-0 z-0">
        <CosmicSphere 
          mouse={mouse} 
          isTransitioning={isTransitioning}
          onTransitionComplete={handleTransitionComplete}
        />
      </div>
      
      {/* Vignette overlay */}
      <div className="absolute inset-0 pointer-events-none z-10" 
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 40%, hsl(var(--background)) 100%)',
        }}
      />
      
      {/* Content overlay */}
      <AnimatePresence>
        {!isTransitioning && (
          <motion.div 
            className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4"
            exit={{ opacity: 0, y: -12 }} // Gentle drift up on exit, no scaling
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
              className="mb-8"
            >
              <img 
                src={logo} 
                alt="ULTRON 9.0" 
                className="h-16 md:h-20 w-auto drop-shadow-[0_0_30px_hsl(var(--primary)/0.3)]" 
              />
            </motion.div>
            
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
              className="text-center mb-6"
            >
              <h1 className="font-orbitron text-5xl md:text-7xl lg:text-8xl font-black tracking-tight">
                <span className="bg-gradient-to-br from-white via-white/90 to-white/70 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                  ULTRON
                </span>
                <span className="text-primary ml-4 drop-shadow-[0_0_30px_hsl(var(--primary)/0.5)]">9.0</span>
              </h1>
            </motion.div>
            
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1.5 }}
              className="text-muted-foreground text-sm md:text-base tracking-[0.3em] uppercase mb-12"
            >
              Enter the Future
            </motion.p>
            
            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
            >
              <CosmicButton onClick={handleEnter} variant="primary">
                ENTER ULTRON 9.0 HUB
              </CosmicButton>
            </motion.div>
            
            {/* Scroll hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 2, duration: 1.5 }}
              className="absolute bottom-8 text-muted-foreground text-xs tracking-widest"
            >
              IMMERSIVE EXPERIENCE
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IntroPage;
