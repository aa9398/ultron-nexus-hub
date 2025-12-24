import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Building2, Users, Award, Linkedin, Twitter } from 'lucide-react';
import logo from '@/assets/logo.png';

const teamMembers = [
  {
    name: 'Dr. Rajesh Kumar',
    role: 'Chief Patron',
    department: 'Director, Institution',
  },
  {
    name: 'Prof. Priya Sharma',
    role: 'Faculty Coordinator',
    department: 'Computer Science',
  },
  {
    name: 'Arun Patel',
    role: 'Student Coordinator',
    department: 'Lead Organizer',
  },
  {
    name: 'Sneha Reddy',
    role: 'Technical Head',
    department: 'Tech Operations',
  },
];

const organizations = [
  {
    icon: Building2,
    title: 'Institution of Technology',
    description: 'Premier technical education institution driving innovation.',
  },
  {
    icon: Users,
    title: 'Computer Science Department',
    description: 'Leading department fostering tech excellence and research.',
  },
  {
    icon: Award,
    title: 'Tech Club',
    description: 'Student-led organization promoting technology and creativity.',
  },
];

export const TeamSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="team" className="relative py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-secondary/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 glass-panel rounded-full text-sm font-medium text-primary mb-6">
            The Organizers
          </span>
          <h2 className="font-orbitron text-4xl md:text-6xl font-bold mb-6">
            Meet Our <span className="gradient-text">Team</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The brilliant minds behind ULTRON 9.0, working to make this the best tech fest ever.
          </p>
        </motion.div>

        {/* Organization Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {organizations.map((org, index) => (
            <motion.div
              key={org.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                rotateY: 5, 
                rotateX: 5,
                scale: 1.02,
              }}
              className="glass-panel p-8 text-center group cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <org.icon className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-orbitron text-xl font-semibold mb-3 text-foreground">
                {org.title}
              </h3>
              <p className="text-muted-foreground">{org.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Team Members */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
        >
          <h3 className="font-orbitron text-2xl font-bold text-center mb-12 text-foreground">
            Core Team
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass-panel p-6 text-center group cursor-pointer"
              >
                {/* Avatar placeholder */}
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto mb-4 flex items-center justify-center overflow-hidden group-hover:shadow-lg group-hover:shadow-primary/30 transition-shadow">
                  <img src={logo} alt="Team" className="w-16 h-auto opacity-80" />
                </div>
                <h4 className="font-orbitron text-lg font-semibold text-foreground mb-1">
                  {member.name}
                </h4>
                <p className="text-primary text-sm font-medium mb-1">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.department}</p>
                
                {/* Social Links */}
                <div className="flex items-center justify-center gap-3 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <motion.a
                    whileHover={{ scale: 1.2 }}
                    href="#"
                    className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.2 }}
                    href="#"
                    className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};