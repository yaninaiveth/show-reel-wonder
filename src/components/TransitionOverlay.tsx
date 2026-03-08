import { motion, AnimatePresence } from 'framer-motion';

interface TransitionOverlayProps {
  isAnimating: boolean;
}

const stripColors = ['hsl(240, 27%, 5%)', 'hsl(240, 14%, 7%)', 'hsl(240, 27%, 5%)', 'hsl(42, 52%, 54%)'];
const clipPaths = [
  'polygon(0 0, 92% 0, 100% 100%, 0 100%)',
  'polygon(0 0, 100% 0, 97% 100%, 0 100%)',
  'polygon(0 0, 97% 0, 100% 100%, 0 100%)',
  'polygon(0 0, 100% 0, 92% 100%, 0 100%)',
];

export default function TransitionOverlay({ isAnimating }: TransitionOverlayProps) {
  return (
    <AnimatePresence>
      {isAnimating && (
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9000 }}>
          {stripColors.map((color, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: '-10%',
                width: '120%',
                height: '30%',
                top: `${i * 24}%`,
                background: color,
                clipPath: clipPaths[i],
                opacity: i === 3 ? 0.92 : 1,
              }}
              initial={{ x: i % 2 === 0 ? '-110%' : '110%' }}
              animate={{ x: '0%' }}
              exit={{ opacity: 0 }}
              transition={{
                x: { duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: i * 0.18 },
                opacity: { duration: 0.6, delay: 0.3 },
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
