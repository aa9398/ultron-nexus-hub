import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CosmicSphere } from '@/components/CosmicSphere';
import { CosmicButton } from '@/components/CosmicButton';
import { WarpTransition } from '@/components/WarpTransition';
import logo from '@/assets/logo.png';

// Refined easing curves
const smoothEase = [0.25, 0.46, 0.45, 0.94];

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
    
    // Phase 1: Calm engagement - gentle fade
    setTimeout(() => {
      setFadeOutContent(true);
    }, 200);
    
    // Phase 2: Start warp after content fades
    setTimeout(() => {
      setShowWarp(true);
    }, 800);
  };

  const handleWarpComplete = () => {
    navigate('/home');
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-background">
      {/* Deep space background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(260,60%,2%)] via-background to-[hsl(260,50%,5%)]" />
      
      {/* Nebula clouds - slow ambient motion */}
      <div className="absolute inset-0 opacity-20">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/25 rounded-full blur-[180px]"
          animate={{ opacity: [0.2, 0.35, 0.2], scale: [1, 1.05, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[150px]"
          animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.03, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-primary/8 rounded-full blur-[250px]" />
      </div>
      
      {/* Cosmic Sphere - 3D background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: fadeOutContent ? 0.3 : 1,
        }}
        transition={{ duration: 1.2, ease: smoothEase }}
      >
        <CosmicSphere mouse={mouse} />
      </motion.div>
      
      {/* Warp transition layer */}
      <AnimatePresence>
        {showWarp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: smoothEase }}
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
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.8, ease: smoothEase }}
          >
            {/* Logo - gentle drift */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1.2, ease: smoothEase }}
              className="mb-8"
            >
              <img 
                src={logo} 
                alt="ULTRON 9.0" 
                className="h-16 md:h-20 w-auto drop-shadow-[0_0_20px_hsl(var(--primary)/0.3)]" 
              />
            </motion.div>
            
            {/* Title - no scale, just fade + drift */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1.2, ease: smoothEase }}
              className="text-center mb-6"
            >
              <h1 className="font-orbitron text-5xl md:text-7xl lg:text-8xl font-black tracking-tight">
                <span className="bg-gradient-to-br from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
                  ULTRON
                </span>
                <span className="text-primary/90 ml-4">9.0</span>
              </h1>
            </motion.div>
            
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 0.6, y: 0 }}
              transition={{ delay: 0.9, duration: 1, ease: smoothEase }}
              className="text-muted-foreground/70 text-sm md:text-base tracking-[0.25em] uppercase mb-14"
            >
              Enter the Future
            </motion.p>
            
            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1, ease: smoothEase }}
            >
              <CosmicButton onClick={handleEnter} variant="primary">
                ENTER ULTRON 9.0 HUB
              </CosmicButton>
            </motion.div>
            
            {/* Hint text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 2.5, duration: 1.5 }}
              className="absolute bottom-10 text-muted-foreground/50 text-xs tracking-[0.2em]"
            >
              CLICK TO BEGIN
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Vignette overlay */}
      <div className="absolute inset-0 pointer-events-none z-10" 
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 40%, hsl(var(--background) / 0.6) 100%)',
        }}
      />
    </div>
  );
};

export default IntroPage;
