import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, User, Mail, Phone, School, Send } from 'lucide-react';

export const RegistrationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Registration Successful!', {
      description: 'Check your email for confirmation details.',
    });
    setIsSubmitting(false);
  };

  return (
    <section id="register" className="relative py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 glass-panel rounded-full text-sm font-medium text-secondary mb-6">
            Join Us
          </span>
          <h2 className="font-orbitron text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Register</span> Now
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Secure your spot at ULTRON 9.0 and be part of the ultimate tech experience.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="glass-panel p-8 md:p-12">
            {/* Decorative Element */}
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-glow-pulse">
                <Sparkles className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>

            <div className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  className="bg-muted/50 border-border focus:border-primary transition-colors"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="bg-muted/50 border-border focus:border-primary transition-colors"
                  required
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  className="bg-muted/50 border-border focus:border-primary transition-colors"
                  required
                />
              </div>

              {/* College */}
              <div className="space-y-2">
                <Label htmlFor="college" className="text-foreground flex items-center gap-2">
                  <School className="w-4 h-4 text-primary" />
                  College / Institution
                </Label>
                <Input
                  id="college"
                  placeholder="Your college name"
                  className="bg-muted/50 border-border focus:border-primary transition-colors"
                  required
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-primary to-secondary rounded-xl font-semibold text-primary-foreground flex items-center justify-center gap-2 disabled:opacity-70"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Secure Your Slot
                  </>
                )}
              </motion.button>
            </div>

            {/* Footer Note */}
            <p className="text-center text-muted-foreground text-sm mt-6">
              By registering, you agree to our terms and conditions.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};