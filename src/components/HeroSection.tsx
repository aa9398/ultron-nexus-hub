import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { ParticleField } from './ParticleField';

export const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleField />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background z-10" />
      <div className="absolute top-20 left-1/3 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-secondary/8 rounded-full blur-[120px]" />
      
      <div className="relative z-20 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="space-y-6"
        >
          {/* Main Title - cleaner, bolder */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <h1 className="font-orbitron text-7xl md:text-9xl lg:text-[12rem] font-black tracking-tighter leading-none">
              <span className="bg-gradient-to-br from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
                ULTRON
              </span>
            </h1>
            <div className="flex items-center justify-center gap-4 mt-2">
              <div className="h-px w-16 md:w-32 bg-gradient-to-r from-transparent to-primary/50" />
              <span className="font-orbitron text-4xl md:text-6xl font-bold text-primary/80">9.0</span>
              <div className="h-px w-16 md:w-32 bg-gradient-to-l from-transparent to-secondary/50" />
            </div>
          </motion.div>

          {/* Subtitle - more subtle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground/70 max-w-xl mx-auto font-light tracking-wide"
          >
            The flagship tech fest redefining innovation
          </motion.p>

          {/* Date - minimal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center gap-6 text-sm text-muted-foreground/50 font-mono"
          >
            <span>MAR 15-17</span>
            <span className="w-1 h-1 rounded-full bg-primary/50" />
            <span>2025</span>
          </motion.div>

          {/* CTA Buttons - cleaner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
          >
            <motion.a
              href="#register"
              className="group relative px-10 py-4 rounded-full font-medium overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary" />
              <div className="absolute inset-[1px] bg-background rounded-full group-hover:bg-transparent transition-colors duration-300" />
              <span className="relative z-10 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent group-hover:text-primary-foreground transition-colors duration-300 font-semibold">
                Register Now
              </span>
            </motion.a>
            
            <motion.a
              href="#events"
              className="px-10 py-4 text-muted-foreground/70 hover:text-foreground transition-colors font-medium"
              whileHover={{ x: 5 }}
            >
              Explore Events →
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-6 h-6 text-muted-foreground/40" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
