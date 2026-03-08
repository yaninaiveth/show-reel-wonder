import { motion } from 'framer-motion';
import OrbitingTags from '@/components/OrbitingTags';
import josePole from '@/assets/jose-pole.jpg';

export default function AboutPanel() {
  return (
    <section className="absolute inset-0 flex items-center justify-center px-[6vw] bg-ink2 overflow-hidden">
      <div className="w-full max-w-[1100px] mx-auto flex items-center gap-[clamp(1rem,3vw,3rem)] max-md:flex-col max-md:gap-8">
        {/* Text content — left side */}
        <div className="flex-1 min-w-0 max-md:order-2">
          <motion.div
            className="font-mono text-[0.58rem] tracking-[0.42em] uppercase text-gold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            About
          </motion.div>
          <motion.h2
            className="font-display text-[clamp(2rem,5vw,5.5rem)] leading-[0.86] mb-5 tracking-wide text-paper"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
          >
            <em className="block font-serif text-[0.42em] italic font-light text-gold2 tracking-wider mb-1">
              circus &amp; aerial artist
            </em>
            Jose Maria<br />Donnici Nefa
          </motion.h2>
          <motion.p
            className="font-body font-light text-[clamp(0.92rem,1.2vw,1.08rem)] leading-[1.9] max-w-[420px] max-sm:max-w-full"
            style={{ color: '#9e9890' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Talented artist who offers 11 years in acrobatic experiences, musical and shows.
            <br />
            Enthusiastic professional with acting talents and choreography.
            <br />
            Expert in body expression while I dance, using all my tools.
          </motion.p>
        </div>

        {/* Photo + Orbiting Tags — right side */}
        <motion.div
          className="relative flex-shrink-0 w-[clamp(280px,32vw,440px)] h-[clamp(400px,55vw,600px)] max-md:w-[260px] max-md:h-[380px] max-md:order-1"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {/* Photo with vignette */}
          <div className="absolute inset-[-20%] flex items-center justify-center overflow-hidden">
            <img
              src={josePole}
              alt="Jose Maria performing on pole"
              className="h-full w-full object-cover relative z-10"
              style={{
                filter: 'brightness(0.85) contrast(1.2) saturate(0.8)',
                maskImage: 'radial-gradient(ellipse 45% 50% at 50% 50%, black 20%, transparent 70%)',
                WebkitMaskImage: 'radial-gradient(ellipse 45% 50% at 50% 50%, black 20%, transparent 70%)',
              }}
            />
          </div>

          {/* Orbiting tags — centered on the figure */}
          <div className="absolute inset-0" style={{ zIndex: 20 }}>
            <OrbitingTags
              radiusX={135}
              radiusZ={65}
              speed={16}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
