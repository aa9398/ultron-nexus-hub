import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CosmicSphere } from '@/components/CosmicSphere';
import { CosmicButton } from '@/components/CosmicButton';
import { WarpTransition } from '@/components/WarpTransition';
import logo from '@/assets/logo.png';

const IntroPage = () => {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showWarp, setShowWarp] = useState(false);
  const [fadeOutContent, setFadeOutContent] = useState(false);
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
    
    // Phase 1: Energy lock - fade out UI, sphere pulses (handled by animation)
    setFadeOutContent(true);
    
    // Phase 2: Start warp after brief delay
    setTimeout(() => {
      setShowWarp(true);
    }, 500);
  };

  const handleWarpComplete = () => {
    navigate('/home');
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-background">
      {/* Deep space background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(260,60%,2%)] via-background to-[hsl(260,50%,5%)]" />
      
      {/* Nebula clouds */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[200px]" />
      </div>
      
      {/* Cosmic Sphere - 3D background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          scale: isTransitioning ? [1, 1.1, 1.5] : 1,
          opacity: fadeOutContent && showWarp ? 0 : 1,
        }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      >
        <CosmicSphere mouse={mouse} />
      </motion.div>
      
      {/* Warp transition layer */}
      <AnimatePresence>
        {showWarp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-40"
          >
            <WarpTransition 
              isWarping={showWarp} 
              onWarpComplete={handleWarpComplete} 
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Content overlay */}
      <AnimatePresence>
        {!fadeOutContent && (
          <motion.div 
            className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4"
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-8"
            >
              <img 
                src={logo} 
                alt="ULTRON 9.0" 
                className="h-16 md:h-20 w-auto drop-shadow-[0_0_30px_hsl(var(--primary)/0.5)]" 
              />
            </motion.div>
            
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-center mb-6"
            >
              <h1 className="font-orbitron text-5xl md:text-7xl lg:text-8xl font-black tracking-tight">
                <span className="bg-gradient-to-br from-foreground via-foreground/90 to-foreground/60 bg-clip-text text-transparent drop-shadow-[0_0_40px_hsl(var(--foreground)/0.3)]">
                  ULTRON
                </span>
                <span className="text-primary ml-4 drop-shadow-[0_0_30px_hsl(var(--primary)/0.8)]">9.0</span>
              </h1>
            </motion.div>
            
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-muted-foreground/60 text-sm md:text-base tracking-[0.3em] uppercase mb-12"
            >
              Enter the Future
            </motion.p>
            
            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <CosmicButton onClick={handleEnter} variant="primary">
                ENTER ULTRON 9.0 HUB
              </CosmicButton>
            </motion.div>
            
            {/* Scroll hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 2, duration: 1 }}
              className="absolute bottom-8 text-muted-foreground/40 text-xs tracking-widest"
            >
              CLICK TO BEGIN YOUR JOURNEY
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Vignette overlay */}
      <div className="absolute inset-0 pointer-events-none z-10" 
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 50%, hsl(var(--background)) 100%)',
        }}
      />
    </div>
  );
};

export default IntroPage;
