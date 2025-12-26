import { motion } from 'framer-motion';

interface CosmicLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'text';
  onClick?: () => void;
  className?: string;
}

const smoothEase = [0.25, 0.46, 0.45, 0.94];

export const CosmicLink = ({ href, children, variant = 'text', onClick, className = '' }: CosmicLinkProps) => {
  if (variant === 'primary') {
    return (
      <motion.a
        href={href}
        onClick={onClick}
        className={`relative overflow-hidden rounded-full font-semibold text-sm px-6 py-2.5 cursor-pointer select-none ${className}`}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.4, ease: smoothEase }}
      >
        {/* Frosted glass background */}
        <div className="absolute inset-0 bg-card/40 backdrop-blur-2xl rounded-full" />
        
        {/* Gradient border */}
        <div 
          className="absolute inset-0 rounded-full transition-opacity duration-500"
          style={{ 
            padding: '1.5px', 
            background: 'linear-gradient(135deg, hsl(var(--primary) / 0.8), hsl(var(--secondary) / 0.6), hsl(var(--primary) / 0.8))', 
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', 
            WebkitMaskComposite: 'xor', 
            maskComposite: 'exclude' 
          }} 
        />
        
        {/* Subtle outer glow */}
        <div 
          className="absolute -inset-1 rounded-full blur-lg opacity-20 transition-opacity duration-500 hover:opacity-40" 
          style={{ background: 'linear-gradient(135deg, hsl(var(--primary) / 0.3), hsl(var(--secondary) / 0.3))' }} 
        />
        
        {/* Very slow breathing */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: 'linear-gradient(135deg, hsl(var(--primary) / 0.05), hsl(var(--secondary) / 0.03))' }}
          animate={{ opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        <span className="relative z-10 text-foreground/95">{children}</span>
      </motion.a>
    );
  }

  if (variant === 'secondary') {
    return (
      <motion.a 
        href={href} 
        onClick={onClick} 
        className={`relative overflow-hidden rounded-full font-medium text-sm px-8 py-3.5 cursor-pointer select-none group ${className}`} 
        whileHover={{ x: 3 }} 
        transition={{ duration: 0.4, ease: smoothEase }}
      >
        <div className="absolute inset-0 bg-card/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <span className="relative z-10 text-muted-foreground/70 group-hover:text-foreground/90 transition-colors duration-400">{children}</span>
      </motion.a>
    );
  }

  return (
    <motion.a 
      href={href} 
      onClick={onClick} 
      className={`text-foreground/70 hover:text-foreground font-medium text-sm tracking-wide transition-colors duration-400 relative group ${className}`} 
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3, ease: smoothEase }}
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary/70 to-secondary/70 group-hover:w-full transition-all duration-500" />
    </motion.a>
  );
};
