import { motion } from 'framer-motion';
import joseImg from '@/assets/jose.jpg';
import { lazy, Suspense } from 'react';

const CircusScene = lazy(() => import('@/components/CircusScene'));

const fadeRight = { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } };
const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1 } };

export default function HeroPanel() {
  return (
    <section className="absolute inset-0 flex flex-col justify-end px-[6vw] pb-12 bg-ink overflow-hidden">
      {/* Three.js Scene */}
      <Suspense fallback={null}>
        <CircusScene />
      </Suspense>

      {/* Portrait */}
      <motion.div
        className="absolute top-[15vh] right-[clamp(5rem,18vw,22vw)] w-[clamp(220px,32vw,440px)] h-[clamp(220px,32vw,440px)] rounded-full overflow-hidden border border-gold bg-gold-subtle max-sm:w-[68px] max-sm:h-[68px] max-sm:top-4 max-sm:right-12"
        style={{ zIndex: 10 }}
        variants={fadeRight}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <img
          src={joseImg}
          alt="Jose Maria Donnici"
          className="w-full h-full object-cover brightness-[0.85] saturate-[0.75] hover:brightness-100 hover:saturate-100 transition-[filter] duration-400"
        />
      </motion.div>

      {/* Watermark */}
      <div
        className="absolute bottom-[-8vh] left-[-1vw] pointer-events-none select-none font-display text-[clamp(9rem,24vw,28rem)] leading-[0.8] tracking-tight max-sm:hidden"
        style={{ color: 'hsl(42, 52%, 54%, 0.03)' }}
      >
        JMD
      </div>

      {/* Text content */}
      <div className="relative" style={{ zIndex: 20 }}>
        <motion.div
          className="font-mono text-[clamp(0.48rem,0.6rem,0.7rem)] tracking-[0.42em] uppercase text-gold mb-[clamp(0.8rem,1.6rem,2rem)]"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0 }}
        >
          Circus &amp; Aerial Artist
        </motion.div>
        <motion.span
          className="font-serif font-light italic text-[clamp(2rem,7vw,9rem)] text-gold2 leading-none block"
          variants={fadeRight}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          José María
        </motion.span>
        <motion.span
          className="font-display text-[clamp(3.5rem,14vw,19rem)] leading-[0.82] block text-paper"
          variants={fadeRight}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          DONNICI
        </motion.span>
        <motion.span
          className="font-display text-[clamp(3.5rem,14vw,19rem)] leading-[0.82] text-gold block"
          variants={fadeRight}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          NEFA
        </motion.span>
      </div>
    </section>
  );
}
