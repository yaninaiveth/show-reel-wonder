import { motion, AnimatePresence } from 'framer-motion';

interface TransitionOverlayProps {
  isAnimating: boolean;
}

const strips = [
  {
    color: 'hsl(42, 52%, 54%)',
    clipPath: 'polygon(0 0, 88% 0, 100% 50%, 88% 100%, 0 100%)',
    top: '0%',
    height: '36%',
    from: '-120%',
    delay: 0,
  },
  {
    color: 'hsl(240, 20%, 10%)',
    clipPath: 'polygon(0 0, 92% 0, 100% 50%, 92% 100%, 0 100%)',
    top: '32%',
    height: '40%',
    from: '120%',
    delay: 0.12,
  },
  {
    color: 'hsl(240, 27%, 5%)',
    clipPath: 'polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0 100%)',
    top: '66%',
    height: '36%',
    from: '-120%',
    delay: 0.24,
  },
];

export default function TransitionOverlay({ isAnimating }: TransitionOverlayProps) {
  return (
    <AnimatePresence>
      {isAnimating && (
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9000 }}>
          {strips.map((strip, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: '-10%',
                width: '120%',
                height: strip.height,
                top: strip.top,
                background: strip.color,
                clipPath: strip.clipPath,
              }}
              initial={{ x: strip.from }}
              animate={{ x: '0%' }}
              exit={{ x: i % 2 === 0 ? '120%' : '-120%' }}
              transition={{
                x: {
                  duration: 0.9,
                  ease: [0.76, 0, 0.24, 1],
                  delay: strip.delay,
                },
              }}
            />
          ))}

          {/* 4th strip — curved swoosh, same width as others, from mid-screen curving down */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1440 900"
            preserveAspectRatio="none"
            style={{ overflow: 'visible' }}
          >
            <motion.path
              d="M-300,400 C200,400 500,650 720,900 C940,1150 1200,1200 1700,1100"
              stroke="hsl(42, 40%, 38%)"
              strokeWidth="220"
              fill="none"
              strokeLinecap="butt"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                pathLength: {
                  duration: 1,
                  ease: [0.76, 0, 0.24, 1],
                  delay: 0.1,
                },
                opacity: { duration: 0.4 },
              }}
            />
          </svg>
        </div>
      )}
    </AnimatePresence>
  );
}
