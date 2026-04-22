import { motion } from 'motion/react';

export function PulseDot() {
  return (
    <motion.div
      className="w-[7px] h-[7px] rounded-full bg-primary-400 shadow-[0_0_8px_theme(colors.primary.400)]"
      animate={{
        opacity: [1, 0.4, 1],
        scale: [1, 0.75, 1]
      }}
      transition={{
        duration: 2.4,
        ease: 'easeInOut',
        repeat: Infinity
      }}
    />
  );
}
