import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useCallback } from 'react';
import OrbitingTags from '@/components/OrbitingTags';
import josePole from '@/assets/jose-pole.jpg';

export default function AboutPanel() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Raw mouse position relative to center of the photo container
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for fluid movement
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  // Background layer — moves opposite (parallax depth)
  const bgX = useTransform(springX, [-1, 1], [8, -8]);
  const bgY = useTransform(springY, [-1, 1], [6, -6]);

  // Main figure — follows mouse slightly
  const figRotateY = useTransform(springX, [-1, 1], [-6, 6]);
  const figRotateX = useTransform(springY, [-1, 1], [4, -4]);
  const figX = useTransform(springX, [-1, 1], [-5, 5]);
  const figY = useTransform(springY, [-1, 1], [-3, 3]);

  // Glow — shifts with mouse
  const glowX = useTransform(springX, [-1, 1], ['45%', '55%']);
  const glowY = useTransform(springY, [-1, 1], ['45%', '55%']);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    // Normalize to -1..1
    mouseX.set((e.clientX - cx) / (rect.width / 2));
    mouseY.set((e.clientY - cy) / (rect.height / 2));
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <section
      className="absolute inset-0 flex items-center justify-center px-[6vw] bg-ink2 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-full max-w-[1100px] mx-auto flex items-center gap-[clamp(2rem,5vw,5rem)] max-md:flex-col max-md:gap-8">
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
          ref={containerRef}
          className="relative flex-shrink-0 w-[clamp(280px,32vw,440px)] h-[clamp(400px,55vw,600px)] max-md:w-[260px] max-md:h-[380px] max-md:order-1"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{ perspective: '900px', transformStyle: 'preserve-3d' }}
        >
          {/* Background layer — moves opposite for depth */}
          <motion.div
            className="absolute inset-[-25%] flex items-center justify-center overflow-hidden"
            style={{ zIndex: 1, x: bgX, y: bgY }}
          >
            <img
              src={josePole}
              alt=""
              aria-hidden
              className="h-full w-full object-cover"
              style={{
                filter: 'brightness(0.4) contrast(1.1) saturate(0.5) blur(8px)',
                maskImage: 'radial-gradient(ellipse 50% 55% at 50% 50%, black 15%, transparent 65%)',
                WebkitMaskImage: 'radial-gradient(ellipse 50% 55% at 50% 50%, black 15%, transparent 65%)',
                transform: 'scale(1.05)',
              }}
            />
          </motion.div>

          {/* Main figure — follows mouse with 3D tilt */}
          <motion.div
            className="absolute inset-[-15%] flex items-center justify-center overflow-visible"
            style={{
              zIndex: 10,
              rotateY: figRotateY,
              rotateX: figRotateX,
              x: figX,
              y: figY,
              transformStyle: 'preserve-3d',
            }}
          >
            <img
              src={josePole}
              alt="Jose Maria performing on pole"
              className="h-full w-full object-cover"
              style={{
                filter: 'brightness(0.95) contrast(1.25) saturate(0.9)',
                maskImage: 'radial-gradient(ellipse 42% 48% at 50% 48%, black 30%, transparent 68%)',
                WebkitMaskImage: 'radial-gradient(ellipse 42% 48% at 50% 48%, black 30%, transparent 68%)',
                transform: 'translateZ(40px) scale(1.08)',
                transformStyle: 'preserve-3d',
              }}
            />
          </motion.div>

          {/* Subtle glow that follows mouse */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              zIndex: 2,
              background: useTransform(
                [glowX, glowY],
                ([gx, gy]) => `radial-gradient(ellipse 40% 50% at ${gx} ${gy}, rgba(100,140,200,0.08) 0%, transparent 70%)`
              ),
            }}
          />

          {/* Orbiting tags */}
          <div style={{ zIndex: 20, position: 'relative' }} className="absolute inset-0">
            <OrbitingTags
              radiusX={190}
              radiusZ={95}
              speed={16}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
