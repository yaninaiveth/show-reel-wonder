import { motion } from 'framer-motion';
import { useRef, useState, useCallback, useEffect } from 'react';

const placeholderCards = Array.from({ length: 7 }, (_, i) => ({
  id: i,
  isVideo: i === 0,
}));

export default function GalleryPanel() {
  const stripRef = useRef<HTMLDivElement>(null);
  const [thumbLeft, setThumbLeft] = useState(0);
  const [thumbWidth, setThumbWidth] = useState(40);
  const [isDragging, setIsDragging] = useState(false);

  const syncThumb = useCallback(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const ratio = strip.clientWidth / strip.scrollWidth;
    const tw = Math.max(40, 100 * ratio);
    const maxScroll = strip.scrollWidth - strip.clientWidth;
    const maxLeft = 100 - tw;
    const left = maxScroll > 0 ? (strip.scrollLeft / maxScroll) * maxLeft : 0;
    setThumbWidth(tw);
    setThumbLeft(left);
  }, []);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    strip.addEventListener('scroll', syncThumb, { passive: true });
    const timer = setTimeout(syncThumb, 150);
    window.addEventListener('resize', syncThumb);
    return () => {
      strip.removeEventListener('scroll', syncThumb);
      window.removeEventListener('resize', syncThumb);
      clearTimeout(timer);
    };
  }, [syncThumb]);

  // Drag to scroll
  const dragState = useRef({ isDragging: false, startX: 0, scrollLeft: 0 });

  const onMouseDown = (e: React.MouseEvent) => {
    const strip = stripRef.current;
    if (!strip) return;
    dragState.current = { isDragging: true, startX: e.pageX - strip.offsetLeft, scrollLeft: strip.scrollLeft };
    setIsDragging(true);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragState.current.isDragging || !stripRef.current) return;
    e.preventDefault();
    const x = e.pageX - stripRef.current.offsetLeft;
    const walk = (x - dragState.current.startX) * 1.5;
    stripRef.current.scrollLeft = dragState.current.scrollLeft - walk;
  };

  const onMouseUp = () => {
    dragState.current.isDragging = false;
    setIsDragging(false);
  };

  return (
    <section className="absolute inset-0 flex flex-col px-[6vw] pt-[3.5vh] pb-12 bg-ink2 overflow-hidden">
      {/* Header */}
      <div className="shrink-0 mb-[clamp(0.6rem,1.2vw,1.2rem)] flex items-end justify-between gap-6 flex-wrap">
        <div>
          <motion.div
            className="font-mono text-[0.56rem] tracking-[0.42em] uppercase text-gold mb-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Portfolio
          </motion.div>
          <motion.h2
            className="font-display text-[clamp(2rem,4.5vw,4.5rem)] leading-[0.85] text-paper"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            GALLERY
          </motion.h2>
        </div>
        <motion.p
          className="font-mono text-[clamp(0.6rem,0.8vw,0.76rem)] tracking-wider uppercase text-dim"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Swipe or drag to explore
        </motion.p>
      </div>

      {/* Strip */}
      <motion.div
        className="relative flex-1 min-h-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div
          ref={stripRef}
          className={`flex gap-[clamp(0.6rem,1vw,1rem)] overflow-x-auto overflow-y-hidden h-full pb-5 snap-x snap-mandatory ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{ scrollbarWidth: 'none', scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {placeholderCards.map((card) => (
            <div
              key={card.id}
              className={`shrink-0 relative overflow-hidden ${card.isVideo ? 'w-[clamp(260px,38vw,560px)]' : 'w-[clamp(220px,32vw,480px)]'} h-full bg-gold-subtle border border-gold hover:border-gold-strong transition-colors duration-300 snap-start`}
            >
              {card.isVideo ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 font-mono text-[0.38rem] tracking-[0.18em] uppercase pointer-events-none" style={{ color: 'hsl(42, 52%, 54%, 0.2)' }}>
                  <span className="text-[1.4rem] opacity-15">▶</span>
                  Place video here
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 font-mono text-[0.36rem] tracking-[0.18em] uppercase pointer-events-none" style={{ color: 'hsl(42, 52%, 54%, 0.2)' }}>
                  <span className="text-[0.9rem] opacity-[0.18]">📷</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Fade right edge */}
        <div
          className="absolute top-0 right-0 bottom-4 w-[clamp(60px,10vw,130px)] pointer-events-none"
          style={{ background: 'linear-gradient(to right, transparent 0%, hsl(240, 14%, 6%) 100%)', zIndex: 2 }}
        />
      </motion.div>

      {/* Custom scrollbar */}
      <div className="shrink-0 relative h-2.5 mt-2 rounded-full cursor-pointer" style={{ background: 'hsl(42, 52%, 54%, 0.12)' }}>
        <div
          className="absolute top-0 h-full rounded-full bg-gold hover:bg-gold2 transition-colors duration-200 cursor-grab"
          style={{ left: `${thumbLeft}%`, width: `${thumbWidth}%`, minWidth: 40 }}
        />
      </div>
    </section>
  );
}
