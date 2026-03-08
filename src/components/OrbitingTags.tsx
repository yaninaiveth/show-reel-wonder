import { useEffect, useRef, useState } from 'react';

const tags = ['Age 29', '1.77m · 85kg', 'Argentine Passport', 'Spanish · English'];

interface OrbitingTagsProps {
  /** radius of the orbit ellipse in px */
  radiusX?: number;
  radiusZ?: number;
  /** rotation speed in degrees per second */
  speed?: number;
}

export default function OrbitingTags({ radiusX = 160, radiusZ = 80, speed = 18 }: OrbitingTagsProps) {
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
      style={{ perspective: '600px', perspectiveOrigin: '50% 45%' }}
    >
      <div
        className="absolute inset-0"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {tags.map((tag, i) => {
          const tagAngle = angle + (i / tags.length) * 360;
          const rad = (tagAngle * Math.PI) / 180;

          // Position on elliptical orbit
          const x = Math.sin(rad) * radiusX;
          const z = Math.cos(rad) * radiusZ;

          // Normalize z: 1 = front, -1 = back
          const zNorm = Math.cos(rad); // -1 to 1

          // Opacity: visible in front, invisible behind the figure
          const opacity = zNorm > -0.15 ? Math.min(1, (zNorm + 0.15) * 1.5) : 0;

          // Scale for depth
          const scale = 0.75 + zNorm * 0.25;

          // "Bending" rotation on the sides — tags tilt as they go around
          const bendAngle = -Math.sin(rad) * 55;

          return (
            <div
              key={i}
              className="absolute left-1/2 top-[45%] flex items-center justify-center"
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
                className="font-mono text-[0.58rem] tracking-[0.18em] uppercase text-gold border border-gold px-3 py-1.5 whitespace-nowrap"
                style={{
                  background: `hsl(42, 52%, 54%, ${0.04 + zNorm * 0.04})`,
                  borderColor: `hsl(42, 52%, 54%, ${0.15 + zNorm * 0.15})`,
                  backdropFilter: zNorm > 0.3 ? 'blur(1px)' : 'none',
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
