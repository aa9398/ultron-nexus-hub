import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Cpu, Globe, Users, Rocket } from 'lucide-react';

const features = [
  {
    icon: Cpu,
    title: 'Cutting-Edge Tech',
    description: 'AI, blockchain, IoT, and emerging technologies under one roof.',
  },
  {
    icon: Globe,
    title: 'Global Community',
    description: 'Connect with innovators and developers from around the world.',
  },
  {
    icon: Users,
    title: '5000+ Participants',
    description: 'Join thousands of passionate individuals in this celebration.',
  },
  {
    icon: Rocket,
    title: '50+ Events',
    description: 'Hackathons, workshops, competitions, and inspiring talks.',
  },
];

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
      
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <span className="text-primary/60 text-sm font-mono tracking-wider uppercase mb-4 block">
            About
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Where the brightest minds<br />
            <span className="text-muted-foreground/60">come together to innovate</span>
          </h2>
          <p className="text-muted-foreground/70 text-lg max-w-2xl mx-auto leading-relaxed">
            ULTRON 9.0 is the flagship annual tech fest bringing together developers, 
            designers, and dreamers. Three days of pure innovation, learning, and connection.
          </p>
        </motion.div>

        {/* Features - cleaner grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group text-center p-6"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-300">
                <feature.icon className="w-5 h-5 text-primary/70" />
              </div>
              <h3 className="font-semibold mb-2 text-foreground/90">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground/60 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats - minimal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-24 flex flex-wrap items-center justify-center gap-12 md:gap-20"
        >
          {[
            { value: '9th', label: 'Edition' },
            { value: '50+', label: 'Events' },
            { value: '₹5L+', label: 'Prizes' },
            { value: '3', label: 'Days' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-orbitron text-3xl md:text-4xl font-bold text-foreground/90 mb-1">
                {stat.value}
              </div>
              <div className="text-muted-foreground/50 text-xs uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
