import { motion } from 'motion/react';

export function OrbitalRings() {
  return (
    <div className="relative w-[200px] h-[200px] flex items-center justify-center">
      <motion.div
        className="absolute w-[200px] h-[200px] rounded-full border border-primary-200/14"
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute top-[-3px] left-1/2 -translate-x-1/2 w-[7px] h-[7px] rounded-full bg-primary-400 shadow-[0_0_10px_theme(colors.primary.400)]" />
      </motion.div>
      <motion.div
        className="absolute w-[130px] h-[130px] rounded-full border border-primary-500/28"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute top-[-3px] left-1/2 -translate-x-1/2 w-[7px] h-[7px] rounded-full bg-primary-400 shadow-[0_0_10px_theme(colors.primary.400)]" />
      </motion.div>
      <motion.div
        className="absolute w-[68px] h-[68px] rounded-full border border-primary-200/14"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute top-[-3px] left-1/2 -translate-x-1/2 w-[7px] h-[7px] rounded-full bg-primary-400 shadow-[0_0_10px_theme(colors.primary.400)]" />
      </motion.div>
      <div className="relative w-[28px] h-[28px] rounded-full bg-primary-500/25 border border-primary-500/50 flex items-center justify-center z-2">
        <div className="w-[9px] h-[9px] rounded-full bg-primary-400 shadow-[0_0_12px_theme(colors.primary.400)]" />
      </div>
    </div>
  );
}
