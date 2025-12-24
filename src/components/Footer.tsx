import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import logo from '@/assets/logo.png';

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Events', href: '#events' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Team', href: '#team' },
  { label: 'Register', href: '#register' },
];

export const Footer = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent!', {
      description: "We'll get back to you soon.",
    });
  };

  return (
    <footer id="contact" className="relative pt-32 pb-8 overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-background to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-orbitron text-3xl font-bold mb-6">
              Get in <span className="gradient-text">Touch</span>
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Your Name"
                  className="bg-muted/50 border-border focus:border-primary"
                  required
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  className="bg-muted/50 border-border focus:border-primary"
                  required
                />
              </div>
              <Input
                placeholder="Subject"
                className="bg-muted/50 border-border focus:border-primary"
                required
              />
              <Textarea
                placeholder="Your Message"
                rows={4}
                className="bg-muted/50 border-border focus:border-primary resize-none"
                required
              />
              <motion.button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-xl font-semibold text-primary-foreground flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send className="w-5 h-5" />
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info & Links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:pl-12"
          >
            <div className="mb-8">
              <img src={logo} alt="ULTRON 9.0" className="h-12 w-auto mb-6" />
              <p className="text-muted-foreground max-w-md">
                The ultimate tech fest where innovation meets the future. Join thousands of tech enthusiasts for an unforgettable experience.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4 mb-8">
              <a href="mailto:contact@ultron9.com" className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                contact@ultron9.com
              </a>
              <a href="tel:+919876543210" className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                +91 98765 43210
              </a>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                Tech Innovation Hub, Innovation City
              </div>
            </div>

            {/* Quick Links */}
            <div className="mb-8">
              <h4 className="font-orbitron text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
                Quick Links
              </h4>
              <div className="flex flex-wrap gap-4">
                {quickLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.2, y: -3 }}
                  className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              © 2025 ULTRON 9.0. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};