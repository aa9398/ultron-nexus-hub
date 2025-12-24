import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Code, Gamepad2, Bot, Lightbulb, Mic, Trophy, ArrowRight } from 'lucide-react';

const events = [
  {
    icon: Code,
    title: 'Hackathon 48H',
    category: 'Coding',
    description: 'Build innovative solutions in 48 hours. Team up, code, and win big!',
    prize: '₹50,000',
    participants: '500+',
  },
  {
    icon: Gamepad2,
    title: 'E-Sports Arena',
    category: 'Gaming',
    description: 'Compete in Valorant, CS2, FIFA, and more. Show your gaming prowess!',
    prize: '₹30,000',
    participants: '1000+',
  },
  {
    icon: Bot,
    title: 'RoboWars',
    category: 'Robotics',
    description: 'Design and build combat robots. Battle for supremacy in the arena!',
    prize: '₹40,000',
    participants: '200+',
  },
  {
    icon: Lightbulb,
    title: 'Innovation Summit',
    category: 'Ideas',
    description: 'Pitch your startup idea to industry experts and investors.',
    prize: '₹25,000',
    participants: '300+',
  },
  {
    icon: Mic,
    title: 'Tech Talks',
    category: 'Workshop',
    description: 'Learn from industry leaders about AI, Web3, and emerging tech.',
    prize: 'Certificates',
    participants: '800+',
  },
  {
    icon: Trophy,
    title: 'CTF Challenge',
    category: 'Security',
    description: 'Test your cybersecurity skills in this capture-the-flag competition.',
    prize: '₹20,000',
    participants: '400+',
  },
];

export const EventsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="events" className="relative py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-[100px]" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 glass-panel rounded-full text-sm font-medium text-primary mb-6">
            Competitions & Events
          </span>
          <h2 className="font-orbitron text-4xl md:text-6xl font-bold mb-6">
            What's <span className="gradient-text">Happening</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From coding challenges to robotics battles, discover events that match your passion.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative glass-panel p-8 cursor-pointer overflow-hidden"
            >
              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              
              <div className="relative z-10">
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary">
                    {event.category}
                  </span>
                  <span className="text-secondary font-orbitron font-bold">
                    {event.prize}
                  </span>
                </div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <event.icon className="w-8 h-8 text-primary-foreground" />
                </div>

                {/* Content */}
                <h3 className="font-orbitron text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {event.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {event.participants} participants
                  </span>
                  <motion.span
                    className="flex items-center gap-2 text-primary font-medium text-sm"
                    animate={{ x: hoveredIndex === index ? 5 : 0 }}
                  >
                    View Details <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </div>
              </div>

              {/* Bottom border animation */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <motion.a
            href="#register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-full font-semibold text-primary-foreground"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Register for Events <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};