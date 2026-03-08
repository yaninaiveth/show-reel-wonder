import { useEffect, useRef, useState } from 'react';

const tags = [
  'Age 29',
  '1.77m\n85kg',
  'Argentine\nPassport',
  'Spanish\nEnglish',
];

interface OrbitingTagsProps {
  radiusX?: number;
  radiusZ?: number;
  speed?: number;
}

export default function OrbitingTags({ radiusX = 140, radiusZ = 70, speed = 16 }: OrbitingTagsProps) {
  const [angle, setAngle] = useState(0);
  const rafRef = useRef<number>(0);
  const prevTime = useRef<number>(0);

  useEffect(() => {
    const tick = (time: number) => {
      if (prevTime.current) {
        const dt = (time - prevTime.current) / 1000;
        setAngle((prev) => (prev + speed * dt) % 360);
      }
      prevTime.current = time;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [speed]);

  // Place each character of each line on the cylinder
  const renderTagChars = () => {
    const elements: JSX.Element[] = [];

    tags.forEach((tag, ti) => {
      const lines = tag.split('\n');
      const baseAngle = (ti / tags.length) * 360;

      lines.forEach((line, li) => {
        const chars = line.split('');
        const charSpan = 3;
        const totalSpan = chars.length * charSpan;
        const startAngle = baseAngle - totalSpan / 2;
        const yOffset = (li - (lines.length - 1) / 2) * 16; // vertical offset for multiline

        chars.forEach((char, ci) => {
          const charAngleDeg = angle + startAngle + ci * charSpan;
          const rad = (charAngleDeg * Math.PI) / 180;

          const x = Math.sin(rad) * radiusX;
          const z = Math.cos(rad) * radiusZ;
          const zNorm = Math.cos(rad);

          const opacity = zNorm > -0.05 ? Math.min(1, (zNorm + 0.05) * 2) : 0;
          const facingAngle = charAngleDeg;

          elements.push(
            <div
              key={`${ti}-${li}-${ci}`}
              className="absolute left-1/2 top-[55%]"
              style={{
                transform: `translate(-50%, -50%) translate3d(${x}px, ${yOffset}px, ${z}px) rotateY(${facingAngle}deg)`,
                opacity,
                transformStyle: 'preserve-3d',
                zIndex: Math.round(z + 100),
                willChange: 'transform, opacity',
              }}
            >
              <span
                className="text-[0.65rem] font-semibold uppercase tracking-[0.08em]"
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  color: `rgba(255,255,255,${0.5 + zNorm * 0.5})`,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            </div>
          );
        });
      });
    });

    return elements;
  };

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ perspective: '600px', perspectiveOrigin: '50% 55%' }}
    >
      <div
        className="absolute inset-0"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {renderTagChars()}
      </div>
    </div>
  );
}
