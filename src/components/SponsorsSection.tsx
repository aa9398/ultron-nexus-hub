import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const sponsors = [
  { name: 'TechCorp', tier: 'Platinum' },
  { name: 'InnovateLabs', tier: 'Platinum' },
  { name: 'CloudSystems', tier: 'Gold' },
  { name: 'DataFlow', tier: 'Gold' },
  { name: 'CyberSec Pro', tier: 'Gold' },
  { name: 'AI Solutions', tier: 'Silver' },
  { name: 'DevTools Inc', tier: 'Silver' },
  { name: 'StartupHub', tier: 'Silver' },
];

export const SponsorsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="sponsors" className="relative py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 glass-panel rounded-full text-sm font-medium text-primary mb-6">
            Our Partners
          </span>
          <h2 className="font-orbitron text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Sponsors</span> & Partners
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We're grateful to our sponsors who make ULTRON 9.0 possible.
          </p>
        </motion.div>

        {/* Infinite Scroll Carousel */}
        <div className="relative overflow-hidden py-8">
          <div className="flex animate-[shimmer_20s_linear_infinite] gap-8">
            {[...sponsors, ...sponsors].map((sponsor, index) => (
              <motion.div
                key={`${sponsor.name}-${index}`}
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex-shrink-0 glass-panel px-12 py-8 cursor-pointer group"
              >
                <div className="text-center">
                  <div className="font-orbitron text-2xl font-bold text-foreground group-hover:gradient-text transition-all duration-300">
                    {sponsor.name}
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    {sponsor.tier} Partner
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sponsor Tiers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="mt-20 text-center"
        >
          <h3 className="font-orbitron text-2xl font-bold mb-8 text-foreground">
            Become a Sponsor
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {['Platinum', 'Gold', 'Silver'].map((tier, index) => (
              <motion.div
                key={tier}
                whileHover={{ y: -5 }}
                className={`glass-panel p-8 cursor-pointer group ${
                  tier === 'Platinum' ? 'border-primary/50' : ''
                }`}
              >
                <div className={`font-orbitron text-xl font-bold mb-2 ${
                  tier === 'Platinum' ? 'gradient-text' : 'text-foreground'
                }`}>
                  {tier}
                </div>
                <div className="text-3xl font-bold text-foreground mb-4">
                  {tier === 'Platinum' ? '₹1,00,000' : tier === 'Gold' ? '₹50,000' : '₹25,000'}
                </div>
                <ul className="text-muted-foreground text-sm space-y-2">
                  <li>Logo on all materials</li>
                  <li>Social media promotion</li>
                  {(tier === 'Platinum' || tier === 'Gold') && <li>Booth at venue</li>}
                  {tier === 'Platinum' && <li>Keynote opportunity</li>}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};