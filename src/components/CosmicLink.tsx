import { motion } from 'framer-motion';

interface CosmicLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'text';
  onClick?: () => void;
  className?: string;
}

export const CosmicLink = ({ href, children, variant = 'text', onClick, className = '' }: CosmicLinkProps) => {
  if (variant === 'primary') {
    return (
      <motion.a
        href={href}
        onClick={onClick}
        className={`relative overflow-hidden rounded-full font-semibold text-sm px-6 py-2.5 transition-all duration-300 cursor-pointer select-none ${className}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="absolute inset-0 bg-card/30 backdrop-blur-xl rounded-full" />
        <div className="absolute inset-0 rounded-full" style={{ padding: '1.5px', background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--primary)))', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} />
        <div className="absolute -inset-0.5 rounded-full blur-md opacity-50" style={{ background: 'linear-gradient(135deg, hsl(var(--primary) / 0.5), hsl(var(--secondary) / 0.5))' }} />
        <span className="relative z-10 text-foreground drop-shadow-[0_0_8px_hsl(var(--foreground)/0.3)]">{children}</span>
      </motion.a>
    );
  }

  if (variant === 'secondary') {
    return (
      <motion.a href={href} onClick={onClick} className={`relative overflow-hidden rounded-full font-medium text-sm px-8 py-3.5 transition-all duration-300 cursor-pointer select-none group ${className}`} whileHover={{ scale: 1.02, x: 3 }} whileTap={{ scale: 0.98 }}>
        <div className="absolute inset-0 bg-card/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="relative z-10 text-muted-foreground group-hover:text-foreground transition-colors">{children}</span>
      </motion.a>
    );
  }

  return (
    <motion.a href={href} onClick={onClick} className={`text-foreground/80 hover:text-foreground font-medium text-sm tracking-wide transition-colors relative group ${className}`} whileHover={{ y: -2 }}>
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
    </motion.a>
  );
};
