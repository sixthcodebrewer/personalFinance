import { motion } from 'motion/react';

export function BreathingGlow() {
  return (
    <motion.div
      className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[760px] h-[640px] rounded-full pointer-events-none z-0"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.22) 0%, rgba(99,102,241,0.06) 45%, transparent 70%)'
      }}
      animate={{
        opacity: [1, 0.7, 1],
        scale: [1, 1.06, 1]
      }}
      transition={{
        duration: 6,
        ease: 'easeInOut',
        repeat: Infinity
      }}
    />
  );
}
