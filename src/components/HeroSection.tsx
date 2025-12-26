import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { ParticleField } from './ParticleField';
import { CosmicLink } from './CosmicLink';

const smoothEase = [0.25, 0.46, 0.45, 0.94];

export const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleField />
      
      {/* Gradient overlays - softer */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background z-10" />
      <motion.div 
        className="absolute top-20 left-1/3 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[180px]"
        animate={{ opacity: [0.08, 0.12, 0.08], scale: [1, 1.02, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div 
        className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-secondary/6 rounded-full blur-[150px]"
        animate={{ opacity: [0.06, 0.1, 0.06], scale: [1, 1.03, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />
      
      <div className="relative z-20 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: smoothEase }}
          className="space-y-6"
        >
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1.2, ease: smoothEase }}
          >
            <h1 className="font-orbitron text-7xl md:text-9xl lg:text-[11rem] font-black tracking-tighter leading-none">
              <span className="bg-gradient-to-br from-foreground via-foreground/90 to-foreground/75 bg-clip-text text-transparent">
                ULTRON
              </span>
            </h1>
            <div className="flex items-center justify-center gap-4 mt-3">
              <div className="h-px w-12 md:w-24 bg-gradient-to-r from-transparent to-primary/40" />
              <span className="font-orbitron text-4xl md:text-6xl font-bold text-primary/75">9.0</span>
              <div className="h-px w-12 md:w-24 bg-gradient-to-l from-transparent to-secondary/40" />
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: smoothEase }}
            className="text-lg md:text-xl text-muted-foreground/60 max-w-xl mx-auto font-light tracking-wide"
          >
            The flagship tech fest redefining innovation
          </motion.p>

          {/* Date */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ delay: 0.7, duration: 1, ease: smoothEase }}
            className="flex items-center justify-center gap-6 text-sm text-muted-foreground/40 font-mono"
          >
            <span>MAR 15-17</span>
            <span className="w-1 h-1 rounded-full bg-primary/40" />
            <span>2025</span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1, ease: smoothEase }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10"
          >
            <CosmicLink href="#register" variant="primary" className="px-10 py-4 text-base">
              Register Now
            </CosmicLink>
            <CosmicLink href="#events" variant="secondary">
              Explore Events →
            </CosmicLink>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator - slower, subtler */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-5 h-5 text-muted-foreground/30" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
