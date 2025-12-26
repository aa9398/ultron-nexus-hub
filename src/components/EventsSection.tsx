import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code, Gamepad2, Bot, Lightbulb, Mic, Trophy } from 'lucide-react';

const smoothEase = [0.25, 0.46, 0.45, 0.94];

const events = [
  {
    icon: Code,
    title: 'Hackathon 48H',
    category: 'Coding',
    description: 'Build innovative solutions in 48 hours with your team.',
    prize: '₹50K',
  },
  {
    icon: Gamepad2,
    title: 'E-Sports Arena',
    category: 'Gaming',
    description: 'Compete in Valorant, CS2, FIFA and more.',
    prize: '₹30K',
  },
  {
    icon: Bot,
    title: 'RoboWars',
    category: 'Robotics',
    description: 'Design and build combat robots for battle.',
    prize: '₹40K',
  },
  {
    icon: Lightbulb,
    title: 'Innovation Summit',
    category: 'Ideas',
    description: 'Pitch your startup idea to industry experts.',
    prize: '₹25K',
  },
  {
    icon: Mic,
    title: 'Tech Talks',
    category: 'Workshop',
    description: 'Learn from industry leaders about emerging tech.',
    prize: 'Certs',
  },
  {
    icon: Trophy,
    title: 'CTF Challenge',
    category: 'Security',
    description: 'Test your cybersecurity skills in CTF.',
    prize: '₹20K',
  },
];

export const EventsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="events" className="relative py-32 overflow-hidden bg-primary/[0.015]">
      {/* Border lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/25 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/25 to-transparent" />

      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: smoothEase }}
          className="max-w-2xl mb-16"
        >
          <span className="text-secondary/50 text-sm font-mono tracking-wider uppercase mb-4 block">
            Events
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            What's happening
          </h2>
          <p className="text-muted-foreground/50">
            From coding challenges to robotics battles — find your passion.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + index * 0.08, duration: 0.8, ease: smoothEase }}
              whileHover={{ y: -3 }}
              className="group relative p-6 rounded-2xl border border-border/20 bg-background/50 hover:border-primary/20 hover:bg-primary/[0.02] transition-all duration-500 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/8 to-secondary/8 flex items-center justify-center">
                  <event.icon className="w-5 h-5 text-primary/70" />
                </div>
                <span className="text-xs font-mono text-secondary/50 bg-secondary/5 px-2 py-1 rounded">
                  {event.prize}
                </span>
              </div>

              <div className="mb-2">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground/35">
                  {event.category}
                </span>
              </div>

              <h3 className="font-semibold text-lg mb-2 text-foreground/85 group-hover:text-primary/90 transition-colors duration-400">
                {event.title}
              </h3>
              <p className="text-sm text-muted-foreground/45 leading-relaxed">
                {event.description}
              </p>

              <div className="mt-4 flex items-center text-xs text-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                Learn more →
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8, ease: smoothEase }}
          className="mt-12 text-center"
        >
          <a
            href="#register"
            className="inline-flex items-center gap-2 text-primary/60 hover:text-primary/80 transition-colors duration-400 font-medium"
          >
            View all events and register →
          </a>
        </motion.div>
      </div>
    </section>
  );
};
