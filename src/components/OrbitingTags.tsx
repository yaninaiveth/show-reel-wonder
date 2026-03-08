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

          const zNorm = Math.cos(rad); // -1 to 1

          // Opacity: visible in front, fade behind the figure
          const opacity = zNorm > -0.15 ? Math.min(1, (zNorm + 0.15) * 1.5) : 0;

          // Scale for depth
          const scale = 0.75 + zNorm * 0.25;

          // Letter-spacing compression at the sides: 
          // At front/back (sin≈0) → normal spacing
          // At sides (|sin|≈1) → compressed/bunched letters
          const sinAbs = Math.abs(Math.sin(rad));
          const letterSpacing = 0.18 - sinAbs * 0.22; // from 0.18em to -0.04em

          // Bend rotation — tags tilt as they orbit
          const bendAngle = -Math.sin(rad) * 55;

          // ScaleX compression at sides to enhance the "ribbon" feel
          const scaleX = 1 - sinAbs * 0.35;

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
                className="font-mono text-[0.7rem] uppercase font-bold text-paper whitespace-nowrap"
                style={{
                  letterSpacing: `${letterSpacing}em`,
                  transform: `scaleX(${scaleX})`,
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
