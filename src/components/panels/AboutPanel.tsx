import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import OrbitingTags from '@/components/OrbitingTags';
import josePole from '@/assets/jose-pole.jpg';

export default function AboutPanel() {
  const isMobile = useIsMobile();

  const mainMask = isMobile
    ? 'none'
    : 'radial-gradient(ellipse 60% 65% at 50% 48%, black 0%, rgba(0,0,0,0.7) 25%, rgba(0,0,0,0.3) 45%, transparent 65%)';
  const shadowMask = isMobile
    ? 'none'
    : 'radial-gradient(ellipse 65% 70% at 50% 50%, black 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.2) 55%, transparent 75%)';

  return (
    <section className="absolute inset-0 max-md:relative max-md:inset-auto flex items-center justify-center px-[6vw] bg-ink2 overflow-hidden max-md:py-3 max-md:mt-6">
      <div className="w-full max-w-[1100px] mx-auto flex items-center gap-[clamp(1rem,3vw,3rem)] max-md:flex-col max-md:gap-8">
        {/* Text content — left side */}
        <div className="flex-1 min-w-0 max-md:order-1">
          <div className="font-mono text-[0.58rem] tracking-[0.42em] uppercase text-gold mb-4">
            About
          </div>
          <h2 className="font-display text-[clamp(2rem,5vw,5.5rem)] leading-[0.86] mb-5 tracking-wide text-paper">
            <em className="block font-serif text-[0.42em] italic font-light text-gold2 tracking-wider mb-1">
              circus &amp; aerial artist
            </em>
            Jose Maria<br />Donnici Nefa
          </h2>
          <p
            className="font-body font-light text-[clamp(0.92rem,1.2vw,1.08rem)] leading-[1.9] max-w-[420px] max-sm:max-w-full"
            style={{ color: '#9e9890' }}
          >
            Talented artist who offers 11 years in acrobatic experiences, musical and shows.
            <br />
            Enthusiastic professional with acting talents and choreography.
            <br />
            Expert in body expression while I dance, using all my tools.
          </p>
        </div>

        {/* Photo + Orbiting Tags — right side */}
        <div
          className="relative flex-shrink-0 w-[clamp(280px,32vw,440px)] h-[clamp(400px,55vw,600px)] max-md:w-[260px] max-md:h-[350px] max-md:order-2 -ml-[3vw] max-md:ml-0 max-md:-mb-20"
          style={{ perspective: '800px' }}
        >
          {/* Shadow/depth layer behind */}
          <div className="absolute inset-[-25%] flex items-center justify-center overflow-hidden" style={{ zIndex: 1 }}>
            <img
              src={josePole}
              alt=""
              aria-hidden
              className="h-full w-full object-cover"
              style={{
                filter: 'brightness(0.35) contrast(1.1) saturate(0.4) blur(8px)',
                maskImage: shadowMask,
                WebkitMaskImage: shadowMask,
                transform: 'scale(1.04) translateZ(-30px)',
              }}
            />
          </div>

          {/* Main figure — popping forward */}
          <div className="absolute inset-[-20%] flex items-center justify-center overflow-hidden" style={{ zIndex: 10, transformStyle: 'preserve-3d' }}>
            <img
              src={josePole}
              alt="Jose Maria performing on pole"
              className="h-full w-full object-cover"
              style={{
                filter: 'brightness(0.95) contrast(1.25) saturate(0.9)',
                maskImage: 'radial-gradient(ellipse 60% 65% at 50% 48%, black 0%, rgba(0,0,0,0.7) 25%, rgba(0,0,0,0.3) 45%, transparent 65%)',
                WebkitMaskImage: 'radial-gradient(ellipse 60% 65% at 50% 48%, black 0%, rgba(0,0,0,0.7) 25%, rgba(0,0,0,0.3) 45%, transparent 65%)',
                transform: 'translateZ(30px) scale(1.06)',
              }}
            />
          </div>

          {/* Edge highlight glow */}
          <div
            className="absolute inset-0"
            style={{
              zIndex: 5,
              background: 'radial-gradient(ellipse 35% 45% at 52% 48%, rgba(120,160,220,0.04) 0%, transparent 70%)',
            }}
          />

          {/* Orbiting tags — centered on the figure */}
          <div className="absolute inset-0 max-md:-top-10" style={{ zIndex: 20 }}>
            <OrbitingTags
              radiusX={80}
              radiusZ={40}
              speed={16}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
