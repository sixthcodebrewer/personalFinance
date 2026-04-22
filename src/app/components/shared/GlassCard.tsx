import { motion } from 'motion/react';
import { Card, CardContent } from '../ui/card';
import { cn } from '../../utils/cn';

interface GlassCardProps {
  children: React.ReactNode;
  title: string;
  icon: string;
  className?: string;
}

export function GlassCard({ children, title, icon, className }: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-3xl p-9 text-left",
        "bg-secondary-950/40 border border-primary-200/20 backdrop-blur-xl",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-200/20 to-transparent" />
      <div className="w-10 h-10 rounded-xl bg-primary-500/20 border border-primary-500/35 flex items-center justify-center text-lg mb-5">
        {icon}
      </div>
      <h3 className="font-serif text-2xl font-normal text-primary-200 mb-3 leading-[1.35]">{title}</h3>
      <CardContent className="p-0">
        {children}
      </CardContent>
    </motion.div>
  );
}
