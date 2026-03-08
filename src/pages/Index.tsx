import { useState, useCallback, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import HeroPanel from '@/components/panels/HeroPanel';
import DisciplinesPanel from '@/components/panels/DisciplinesPanel';
import AboutPanel from '@/components/panels/AboutPanel';
import CareerPanel from '@/components/panels/CareerPanel';
import GalleryPanel from '@/components/panels/GalleryPanel';
import ContactPanel from '@/components/panels/ContactPanel';
import NavigationDots from '@/components/NavigationDots';
import TransitionOverlay from '@/components/TransitionOverlay';
import { useIsMobile } from '@/hooks/use-mobile';

const panels = [HeroPanel, DisciplinesPanel, AboutPanel, CareerPanel, GalleryPanel, ContactPanel];

export default function Index() {
  const isMobile = useIsMobile();
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const wheelAcc = useRef(0);

  const goTo = useCallback(
    (next: number) => {
      if (isAnimating || next === current || next < 0 || next >= panels.length) return;
      setIsAnimating(true);
      setTimeout(() => { setCurrent(next); }, 800);
      setTimeout(() => { setIsAnimating(false); }, 2000);
    },
    [current, isAnimating]
  );

  // Wheel navigation — desktop only
  useEffect(() => {
    if (isMobile) return;
    const handler = (e: WheelEvent) => {
      if (current === 4) {
        const strip = document.querySelector('[data-gallery-strip]');
        if (strip && Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      }
      e.preventDefault();
      wheelAcc.current += e.deltaY;
      if (Math.abs(wheelAcc.current) > 50) {
        goTo(current + (wheelAcc.current > 0 ? 1 : -1));
        wheelAcc.current = 0;
      }
    };
    window.addEventListener('wheel', handler, { passive: false });
    return () => window.removeEventListener('wheel', handler);
  }, [current, goTo, isMobile]);

  // Keyboard navigation — desktop only
  useEffect(() => {
    if (isMobile) return;
    const handler = (e: KeyboardEvent) => {
      if (['ArrowDown', 'ArrowRight', 'PageDown'].includes(e.key)) goTo(current + 1);
      if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.key)) goTo(current - 1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [current, goTo, isMobile]);

  // Mobile: scrollable landing page
  if (isMobile) {
    return (
      <div className="w-full min-h-screen bg-ink overflow-y-auto">
        {panels.map((Panel, i) => (
          <div key={i} className="relative w-full min-h-screen">
            <Panel />
          </div>
        ))}
        <footer className="py-6 px-[6vw] flex items-center justify-between">
          <span className="font-display text-[1.2rem] tracking-[0.18em] text-gold">JMD</span>
          <span className="font-mono text-[0.48rem] tracking-[0.26em] uppercase text-dim">
            San Juan · Argentina
          </span>
        </footer>
      </div>
    );
  }

  // Desktop: panel-by-panel navigation
  const CurrentPanel = panels[current];

  return (
    <div className="w-full h-full relative overflow-hidden bg-ink">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <CurrentPanel />
        </motion.div>
      </AnimatePresence>

      <TransitionOverlay isAnimating={isAnimating} />
      <NavigationDots total={panels.length} current={current} onNavigate={goTo} />

      <footer className="fixed bottom-4 left-[6vw] right-10 flex items-center justify-between pointer-events-none" style={{ zIndex: 800 }}>
        <span className="font-display text-[1.2rem] tracking-[0.18em] text-gold">JMD</span>
        <span className="font-mono text-[0.48rem] tracking-[0.26em] uppercase text-dim">
          San Juan · Argentina
        </span>
      </footer>
    </div>
  );
}
