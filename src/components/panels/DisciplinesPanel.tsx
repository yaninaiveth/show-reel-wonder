import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const disciplines = [
  { ico: '🎪', name: 'Aerial\nAcrobatics', desc: 'Harness, trapeze & fly pole' },
  { ico: '🔥', name: 'Fire\nShows', desc: 'Danger and beauty fused' },
  { ico: '🎭', name: 'Theater\n& Acting', desc: 'Lead — National Theater Institute' },
  { ico: '🕺', name: 'Dance\n& GoGo', desc: 'Body expression — clubs & events' },
  { ico: '✨', name: "Children's\nShows", desc: 'Trapeze, fly pole & ground acrobatics' },
  { ico: '📸', name: 'Modeling\n& Video', desc: 'Fashion shows, brands & music videos' },
];

// Circle layout positions (centered on screen, 2 rows of 3)
const circlePositions = [
  { x: -12, y: -6 },
  { x: 0, y: -6 },
  { x: 12, y: -6 },
  { x: -12, y: 6 },
  { x: 0, y: 6 },
  { x: 12, y: 6 },
];

export default function DisciplinesPanel() {
  const [phase, setPhase] = useState<'circles' | 'moving' | 'cards'>('circles');
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const [cardPositions, setCardPositions] = useState<{ x: number; y: number }[]>([]);
  const hasAnimated = useRef(false);

  const measureCards = useCallback(() => {
    if (!sectionRef.current) return;
    const sectionRect = sectionRef.current.getBoundingClientRect();
    const centerX = sectionRect.width / 2;
    const centerY = sectionRect.height / 2;

    const positions = cardRefs.current.map((ref) => {
      if (!ref) return { x: 0, y: 0 };
      const rect = ref.getBoundingClientRect();
      const sRect = sectionRef.current!.getBoundingClientRect();
      return {
        x: rect.left - sRect.left + rect.width * 0.15 - centerX,
        y: rect.top - sRect.top + rect.height * 0.2 - centerY,
      };
    });
    setCardPositions(positions);
  }, []);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    // Measure card positions while they're invisible
    const timer1 = setTimeout(() => {
      measureCards();
      setTimeout(() => setPhase('moving'), 2000);
      setTimeout(() => setPhase('cards'), 2800);
    }, 100);

    return () => clearTimeout(timer1);
  }, [measureCards]);

  return (
    <section
      ref={sectionRef}
      className="absolute inset-0 max-md:relative max-md:inset-auto flex flex-col justify-center px-[6vw] py-[clamp(2.5rem,5vh,5rem)] bg-ink overflow-hidden max-md:py-6"
    >
      {/* Background watermark */}
      <div
        className="absolute right-[-2vw] bottom-[-4rem] font-display text-[21vw] max-md:text-[40vw] leading-none pointer-events-none"
        style={{ color: 'rgba(255,255,255,0.011)' }}
      >
        CIRCUS
      </div>

      {/* Floating emoji circles overlay */}
      <AnimatePresence>
        {phase !== 'cards' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 10 }}>
            {disciplines.map((d, i) => {
              const isMoving = phase === 'moving' && cardPositions.length > 0;
              const targetX = isMoving ? cardPositions[i]?.x ?? 0 : circlePositions[i].x * (typeof window !== 'undefined' ? window.innerWidth / 100 : 10);
              const targetY = isMoving ? cardPositions[i]?.y ?? 0 : circlePositions[i].y * (typeof window !== 'undefined' ? window.innerHeight / 100 : 6);

              return (
                <motion.div
                  key={i}
                  className="absolute flex items-center justify-center"
                  animate={{
                    x: targetX,
                    y: targetY,
                    scale: isMoving ? 0.8 : 1,
                  }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{
                    x: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
                    y: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
                    scale: { duration: 0.4 },
                  }}
                >
                  <div
                    className="rounded-full flex items-center justify-center border border-dim/20"
                    style={{
                      width: 'clamp(4rem, 6.5vw, 5.5rem)',
                      height: 'clamp(4rem, 6.5vw, 5.5rem)',
                      background: 'white',
                    }}
                  >
                    <span className="text-[clamp(1.5rem, 2.8vw, 2.2rem)]">{d.ico}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>

      <div className="relative w-full" style={{ zIndex: 1 }}>
        {/* Header */}
        <motion.div
          className="flex items-end justify-between mb-[clamp(0.8rem,1.8vw,2.2rem)] gap-6 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 'cards' ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-[clamp(2rem,6vw,6.5rem)] leading-[0.85] text-paper">
            DISCIPLINES<br />
            <em className="text-gold not-italic block">& Skills</em>
          </h2>
          <p className="font-body font-light text-[clamp(0.68rem,0.9vw,0.82rem)] text-dim max-w-[220px] text-right leading-relaxed max-sm:hidden opacity-75">
            Technical precision meets raw artistic power.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-3 max-sm:grid-cols-2 gap-[clamp(0.4rem,0.8vw,0.85rem)] mt-[clamp(0.6rem,1.2vw,1.4rem)]">
          {disciplines.map((d, i) => (
            <motion.div
              key={i}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="relative bg-card-subtle border border-ink p-[clamp(0.7rem,1.2vw,1.3rem)] flex flex-col gap-1 cursor-default overflow-hidden group transition-colors duration-300 hover:border-dim hover:bg-paper/90"
              initial={{ opacity: 0, y: 15 }}
              animate={{
                opacity: phase === 'cards' ? 1 : 0,
                y: phase === 'cards' ? 0 : 15,
              }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
            >
              <div className="text-[clamp(1.1rem,2vw,1.7rem)] leading-none my-1">{d.ico}</div>
              <div className="font-display text-[clamp(0.95rem,2vw,1.65rem)] tracking-wide leading-none text-paper group-hover:text-ink whitespace-pre-line transition-colors duration-300">
                {d.name}
              </div>
              <div className="font-body font-light text-[clamp(0.55rem,0.75vw,0.7rem)] text-dim group-hover:text-ink/70 leading-relaxed opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                {d.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
