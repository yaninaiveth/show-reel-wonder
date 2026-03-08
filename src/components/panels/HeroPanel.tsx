import { motion } from 'framer-motion';
import joseImg from '@/assets/jose-hero.jpg';
import { lazy, Suspense } from 'react';

const CircusScene = lazy(() => import('@/components/CircusScene'));

const fadeRight = { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } };
const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1 } };

export default function HeroPanel() {
  return (
    <section className="absolute inset-0 max-md:relative max-md:inset-auto flex flex-col justify-end px-[6vw] pb-12 bg-ink overflow-hidden max-md:min-h-screen">
      {/* Background image */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <img
          src={joseImg}
          alt="Jose Maria Donnici"
          className="w-full h-full object-cover object-[center_30%]"
          style={{ filter: 'brightness(0.65) saturate(0.75) contrast(1.1)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--ink))] via-[hsl(var(--ink)/0.6)] to-transparent" />
      </div>

      {/* Three.js Particles — on top of image */}
      <Suspense fallback={null}>
        <CircusScene />
      </Suspense>

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
