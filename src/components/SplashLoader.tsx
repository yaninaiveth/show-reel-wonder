import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashLoader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'logo' | 'exit'>('logo');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('exit'), 2000);
    const t2 = setTimeout(onComplete, 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'exit' ? null : null}
      <motion.div
        className="fixed inset-0 z-[99999] flex items-center justify-center bg-ink"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        key="splash"
      >
        {/* Subtle gold line under the logo */}
        <motion.div
          className="absolute bottom-[46%] left-1/2 h-px bg-gold/30"
          initial={{ width: 0, x: '-50%' }}
          animate={{ width: '6rem', x: '-50%' }}
          transition={{ delay: 0.6, duration: 1.2, ease: 'easeInOut' }}
        />

        {/* JMD Letters */}
        <div className="flex items-center gap-[0.15em] font-display text-[clamp(3rem,8vw,7rem)] leading-none tracking-[0.25em] text-gold select-none">
          {'JMD'.split('').map((letter, i) => (
            <motion.span
              key={letter}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.18, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Exit curtain */}
        {phase === 'exit' && (
          <motion.div
            className="absolute inset-0 bg-ink"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
