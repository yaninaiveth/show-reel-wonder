import { useEffect, useRef, useState } from 'react';

const tags = ['AGE 29', '1.77m · 85kg', 'ARGENTINE', 'ES · EN'];

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

  // Each tag is rendered as individual characters placed on the cylinder surface
  const allItems = tags.map((tag, ti) => {
    const baseAngle = (ti / tags.length) * 360;
    return { tag, baseAngle };
  });

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ perspective: '600px', perspectiveOrigin: '50% 55%' }}
    >
      <div
        className="absolute inset-0"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {allItems.map(({ tag, baseAngle }, ti) => {
          const chars = tag.split('');
          const totalChars = chars.length;
          // Each char spans ~3 degrees on the cylinder
          const charSpan = 3.5;
          const totalSpan = totalChars * charSpan;
          const startAngle = baseAngle - totalSpan / 2;

          return chars.map((char, ci) => {
            const charAngleDeg = angle + startAngle + ci * charSpan;
            const rad = (charAngleDeg * Math.PI) / 180;

            const x = Math.sin(rad) * radiusX;
            const z = Math.cos(rad) * radiusZ;
            const zNorm = Math.cos(rad);

            // Hide behind figure
            const opacity = zNorm > -0.05 ? Math.min(1, (zNorm + 0.05) * 2) : 0;

            // Character faces tangent to cylinder
            const facingAngle = charAngleDeg;

            return (
              <div
                key={`${ti}-${ci}`}
                className="absolute left-1/2 top-[55%]"
                style={{
                  transform: `translate(-50%, -50%) translate3d(${x}px, 0px, ${z}px) rotateY(${facingAngle}deg)`,
                  opacity,
                  transformStyle: 'preserve-3d',
                  zIndex: Math.round(z + 100),
                  willChange: 'transform, opacity',
                }}
              >
                <span
                  className="text-[1rem] font-black uppercase"
                  style={{
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    color: `rgba(255,255,255,${0.55 + zNorm * 0.45})`,
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              </div>
            );
          });
        })}
      </div>
    </div>
  );
}
