import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import OrbitingTags from '@/components/OrbitingTags';
import josePole from '@/assets/jose-pole.jpg';

export default function AboutPanel() {
  const isMobile = useIsMobile();

  const mainMask = isMobile
    ? 'radial-gradient(ellipse 60% 65% at 50% 48%, black 0%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.15) 50%, transparent 70%)'
    : 'radial-gradient(ellipse 55% 58% at 50% 48%, black 0%, rgba(0,0,0,0.6) 20%, rgba(0,0,0,0.2) 40%, transparent 60%)';
  const shadowMask = isMobile
    ? 'radial-gradient(ellipse 60% 65% at 50% 50%, black 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.1) 50%, transparent 70%)'
    : 'radial-gradient(ellipse 60% 65% at 50% 50%, black 0%, rgba(0,0,0,0.5) 25%, rgba(0,0,0,0.15) 45%, transparent 65%)';

  return (
    <section
      className="absolute inset-0 max-md:relative max-md:inset-auto flex items-center justify-center px-[6vw] overflow-hidden max-md:py-0 max-md:mt-6 max-md:pt-16 max-md:min-h-screen"
      style={{
        background: isMobile
          ? 'radial-gradient(ellipse 80% 60% at 50% 45%, #1a1410 0%, #110f0c 35%, hsl(240 14% 6%) 70%)'
          : 'radial-gradient(ellipse 50% 70% at 62% 50%, #1a1410 0%, #110f0c 30%, hsl(240 14% 6%) 60%)',
      }}
    >
      <div className="w-full max-w-[1100px] mx-auto flex items-center gap-[clamp(1rem,3vw,3rem)] max-md:flex-col max-md:gap-2">
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
          className="relative flex-shrink-0 w-[clamp(280px,32vw,440px)] h-[clamp(400px,55vw,600px)] max-md:w-[280px] max-md:h-[420px] max-md:order-2 -ml-[3vw] max-md:ml-0"
          style={{ perspective: '800px' }}
        >
          {/* Shadow/depth layer behind */}
          <div className="absolute inset-[-25%] max-md:inset-0 flex items-center justify-center overflow-hidden" style={{ zIndex: 1 }}>
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
          <div className="absolute inset-[-20%] max-md:inset-0 flex items-center justify-center overflow-hidden" style={{ zIndex: 10, transformStyle: 'preserve-3d' }}>
            <img
              src={josePole}
              alt="Jose Maria performing on pole"
              className="h-full w-full object-cover"
              style={{
                filter: 'brightness(0.95) contrast(1.25) saturate(0.9)',
                maskImage: mainMask,
                WebkitMaskImage: mainMask,
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
