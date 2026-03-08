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

const panels = [HeroPanel, DisciplinesPanel, AboutPanel, CareerPanel, GalleryPanel, ContactPanel];

export default function Index() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const wheelAcc = useRef(0);

  const goTo = useCallback(
    (next: number) => {
      if (isAnimating || next === current || next < 0 || next >= panels.length) return;
      setIsAnimating(true);

      // Show overlay strips
      setTimeout(() => {
        setCurrent(next);
      }, 800);

      setTimeout(() => {
        setIsAnimating(false);
      }, 2000);
    },
    [current, isAnimating]
  );

  // Wheel navigation
  useEffect(() => {
    const handler = (e: WheelEvent) => {
      // Don't hijack scroll on gallery panel
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
  }, [current, goTo]);

  // Touch navigation
  useEffect(() => {
    let startY = 0;
    const onStart = (e: TouchEvent) => { startY = e.touches[0].clientY; };
    const onEnd = (e: TouchEvent) => {
      const dy = startY - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 40) goTo(current + (dy > 0 ? 1 : -1));
    };
    window.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchend', onEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchend', onEnd);
    };
  }, [current, goTo]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (['ArrowDown', 'ArrowRight', 'PageDown'].includes(e.key)) goTo(current + 1);
      if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.key)) goTo(current - 1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [current, goTo]);

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

      {/* Footer */}
      <footer className="fixed bottom-4 left-[6vw] right-10 flex items-center justify-between pointer-events-none" style={{ zIndex: 800 }}>
        <span className="font-display text-[1.2rem] tracking-[0.18em] text-gold">JMD</span>
        <span className="font-mono text-[0.48rem] tracking-[0.26em] uppercase text-dim max-sm:hidden">
          San Juan · Argentina
        </span>
      </footer>
    </div>
  );
}
