import { useEffect, useRef, useState } from 'react';

const tags = ['Age 29', '1.77m · 85kg', 'Argentine Passport', 'Spanish · English'];

interface OrbitingTagsProps {
  radiusX?: number;
  radiusZ?: number;
  speed?: number;
}

export default function OrbitingTags({ radiusX = 150, radiusZ = 70, speed = 18 }: OrbitingTagsProps) {
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

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ perspective: '600px', perspectiveOrigin: '50% 50%' }}
    >
      <div
        className="absolute inset-0"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {tags.map((tag, i) => {
          const tagAngle = angle + (i / tags.length) * 360;
          const rad = (tagAngle * Math.PI) / 180;

          const x = Math.sin(rad) * radiusX;
          const z = Math.cos(rad) * radiusZ;

          const zNorm = Math.cos(rad);

          // Opacity: visible in front, fade behind the figure
          const opacity = zNorm > -0.15 ? Math.min(1, (zNorm + 0.15) * 1.5) : 0;

          // Scale for depth
          const scale = 0.8 + zNorm * 0.2;

          // At the sides (|sinRad| near 1), compress scaleX to bunch letters
          const sinAbs = Math.abs(Math.sin(rad));
          const scaleX = 1 - sinAbs * 0.6; // strong compression at edges

          // Bend rotation
          const bendAngle = -Math.sin(rad) * 50;

          return (
            <div
              key={i}
              className="absolute left-1/2 top-[50%] flex items-center justify-center"
              style={{
                transform: `translate(-50%, -50%) translate3d(${x}px, 0px, ${z}px) rotateY(${bendAngle}deg) scale(${scale})`,
                opacity,
                transition: 'opacity 0.15s ease',
                transformStyle: 'preserve-3d',
                zIndex: Math.round(z + 100),
                willChange: 'transform, opacity',
              }}
            >
              <span
                className="font-display text-[0.85rem] uppercase font-extrabold tracking-[0.15em] whitespace-nowrap"
                style={{
                  color: `rgba(255,255,255,${0.5 + zNorm * 0.5})`,
                  transform: `scaleX(${scaleX})`,
                  textShadow: zNorm > 0.3 ? '0 0 12px rgba(255,255,255,0.15)' : 'none',
                }}
              >
                {tag}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
