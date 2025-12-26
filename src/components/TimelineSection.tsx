import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, Clock } from 'lucide-react';

const timelineEvents = [
  {
    date: 'Jan 15',
    title: 'Registration Opens',
    description: 'Early bird registration begins with exclusive discounts.',
    time: '12:00 AM',
  },
  {
    date: 'Feb 28',
    title: 'Registration Closes',
    description: 'Last day to secure your spot at ULTRON 9.0.',
    time: '11:59 PM',
  },
  {
    date: 'Mar 15',
    title: 'Day 1 - Inauguration',
    description: 'Opening ceremony, keynote speeches, and workshop kickoff.',
    time: '9:00 AM',
  },
  {
    date: 'Mar 16',
    title: 'Day 2 - Main Events',
    description: 'Hackathon continues, gaming tournaments, and tech talks.',
    time: 'All Day',
  },
  {
    date: 'Mar 17',
    title: 'Day 3 - Grand Finale',
    description: 'Final rounds, prize distribution, and closing ceremony.',
    time: '10:00 AM',
  },
];

export const TimelineSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="timeline" className="relative py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 glass-panel rounded-full text-sm font-medium text-secondary mb-6">
            Event Schedule
          </span>
          <h2 className="font-orbitron text-4xl md:text-6xl font-bold mb-6">
            The <span className="gradient-text">Timeline</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Mark your calendars for the most anticipated tech event of the year.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary" />

          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -12 : 12 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.15 }}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Node */}
              <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 z-10">
                <motion.div
                  whileHover={{ boxShadow: "0 0 15px hsl(var(--primary))" }}
                  className="w-4 h-4 rounded-full bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/50"
                />
              </div>

              {/* Content Card */}
              <div
                className={`ml-12 md:ml-0 md:w-[calc(50%-3rem)] ${
                  index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                }`}
              >
                <motion.div
                  whileHover={{ borderColor: "hsl(var(--primary)/0.5)", boxShadow: "0 0 20px hsl(var(--primary)/0.1)" }}
                  className="glass-panel p-6 hover:border-primary/50 transition-colors border border-transparent"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2 text-primary">
                      <Calendar className="w-4 h-4" />
                      <span className="font-orbitron font-bold">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                  </div>
                  <h3 className="font-orbitron text-xl font-semibold mb-2 text-foreground">
                    {event.title}
                  </h3>
                  <p className="text-muted-foreground">{event.description}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};