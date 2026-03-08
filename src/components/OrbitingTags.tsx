import { useEffect, useRef, useState } from 'react';

const tags = ['AGE 29', '1.77m · 85kg', 'ARGENTINE', 'ES · EN'];

interface OrbitingTagsProps {
  radiusX?: number;
  radiusZ?: number;
  speed?: number;
}

export default function OrbitingTags({ radiusX = 190, radiusZ = 95, speed = 16 }: OrbitingTagsProps) {
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

  // Render each character individually so trailing chars can fade/compress
  const renderTag = (tag: string, baseOpacity: number, scaleX: number, zNorm: number) => {
    const chars = tag.split('');
    const len = chars.length;
    // sinAbs tells us how much we're at the side
    const sinAbs = 1 - scaleX; // reuse: 0 = front/back, ~0.55 = full side

    return chars.map((char, ci) => {
      // Characters at the trailing edge (end of string) get more compressed and fade out first
      // Leading chars stay visible longer
      const charProgress = ci / (len - 1 || 1); // 0..1
      
      // At the sides, trailing characters fade and compress more
      const charFade = 1 - sinAbs * charProgress * 1.8;
      const charOpacity = Math.max(0, Math.min(1, charFade)) * baseOpacity;
      
      // Trailing chars get extra scaleX compression
      const charScaleX = Math.max(0.1, scaleX - sinAbs * charProgress * 0.4);
      
      return (
        <span
          key={ci}
          style={{
            display: 'inline-block',
            opacity: charOpacity,
            transform: `scaleX(${charScaleX})`,
            color: `rgba(255,255,255,${0.6 + zNorm * 0.4})`,
            transition: 'opacity 0.05s',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      );
    });
  };

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ perspective: '800px', perspectiveOrigin: '50% 55%' }}
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

          // Hide behind figure
          const opacity = zNorm > -0.1 ? Math.min(1, (zNorm + 0.1) * 1.6) : 0;
          const scale = 0.85 + zNorm * 0.15;

          // ScaleX compression at sides
          const sinAbs = Math.abs(Math.sin(rad));
          const scaleX = 1 - sinAbs * 0.5;

          const bendAngle = -Math.sin(rad) * 45;

          return (
            <div
              key={i}
              className="absolute left-1/2 top-[55%] flex items-center justify-center"
              style={{
                transform: `translate(-50%, -50%) translate3d(${x}px, 0px, ${z}px) rotateY(${bendAngle}deg) scale(${scale})`,
                opacity,
                transformStyle: 'preserve-3d',
                zIndex: Math.round(z + 100),
                willChange: 'transform, opacity',
              }}
            >
              <span
                className="text-[1.1rem] font-black tracking-[0.2em] whitespace-nowrap"
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
              >
                {renderTag(tag, opacity, scaleX, zNorm)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
