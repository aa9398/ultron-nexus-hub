import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Cpu, Globe, Users, Rocket, Brain, Shield } from 'lucide-react';

const features = [
  {
    icon: Cpu,
    title: 'Cutting-Edge Tech',
    description: 'Experience the latest in AI, blockchain, IoT, and emerging technologies.',
  },
  {
    icon: Globe,
    title: 'Global Network',
    description: 'Connect with innovators, developers, and tech enthusiasts worldwide.',
  },
  {
    icon: Users,
    title: '5000+ Participants',
    description: 'Join thousands of passionate individuals in this mega tech celebration.',
  },
  {
    icon: Rocket,
    title: '50+ Events',
    description: 'Hackathons, workshops, competitions, and inspiring tech talks.',
  },
  {
    icon: Brain,
    title: 'AI Innovation',
    description: 'Dive deep into artificial intelligence and machine learning frontiers.',
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Learn from experts about protecting the digital world.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.span
            variants={itemVariants}
            className="inline-block px-4 py-2 glass-panel rounded-full text-sm font-medium text-secondary mb-6"
          >
            About The Event
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="font-orbitron text-4xl md:text-6xl font-bold mb-6"
          >
            <span className="gradient-text">ULTRON 9.0</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-muted-foreground text-lg max-w-3xl mx-auto"
          >
            The flagship annual tech fest that brings together the brightest minds in technology. 
            From hackathons to workshops, from gaming to robotics, experience the future of innovation.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group glass-panel p-8 hover-lift cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-primary group-hover:text-secondary transition-colors" />
              </div>
              <h3 className="font-orbitron text-xl font-semibold mb-3 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
              <div className="mt-4 h-0.5 w-0 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: '9th', label: 'Edition' },
            { value: '50+', label: 'Events' },
            { value: '100+', label: 'Prizes' },
            { value: '3', label: 'Days' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-orbitron text-4xl md:text-5xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};