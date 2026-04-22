import { motion } from 'motion/react';

export function GeometricAnimation() {
  return (
    <div className="relative w-[220px] h-[220px] flex items-center justify-center">
      <motion.div
        className="absolute w-[200px] h-[200px] rounded-lg border border-primary-400/35 bg-transparent"
        style={{ transform: 'rotate(22deg)', opacity: 0.4 }}
        animate={{ rotate: [22, 40, 22] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[130px] h-[130px] rounded border border-primary-400/35 bg-transparent"
        style={{ transform: 'rotate(50deg)', opacity: 0.25 }}
        animate={{ rotate: [50, 70, 50] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="absolute w-3 h-3 rounded-full bg-primary-400 shadow-[0_0_20px_theme(colors.primary.400),0_0_40px_theme(colors.primary.400/40)]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </div>
  );
}
