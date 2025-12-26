import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code, Gamepad2, Bot, Lightbulb, Mic, Trophy } from 'lucide-react';

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
    <section id="events" className="relative py-32 overflow-hidden bg-primary/[0.02]">
      {/* Border lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />

      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="max-w-2xl mb-16"
        >
          <span className="text-secondary/60 text-sm font-mono tracking-wider uppercase mb-4 block">
            Events
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            What's happening
          </h2>
          <p className="text-muted-foreground/60">
            From coding challenges to robotics battles — find your passion.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.08 }}
              className="group relative p-6 rounded-2xl border border-border/30 bg-background/50 hover:border-primary/30 hover:bg-primary/[0.02] transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <event.icon className="w-5 h-5 text-primary/80" />
                </div>
                <span className="text-xs font-mono text-secondary/60 bg-secondary/5 px-2 py-1 rounded">
                  {event.prize}
                </span>
              </div>

              <div className="mb-2">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground/40">
                  {event.category}
                </span>
              </div>

              <h3 className="font-semibold text-lg mb-2 text-foreground/90 group-hover:text-primary transition-colors">
                {event.title}
              </h3>
              <p className="text-sm text-muted-foreground/50 leading-relaxed">
                {event.description}
              </p>

              <div className="mt-4 flex items-center text-xs text-primary/60 opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more →
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <a
            href="#register"
            className="inline-flex items-center gap-2 text-primary/70 hover:text-primary transition-colors font-medium"
          >
            View all events and register →
          </a>
        </motion.div>
      </div>
    </section>
  );
};
