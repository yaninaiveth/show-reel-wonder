import { useState, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

import photo1 from '@/assets/gallery/photo-1.jpeg';
import photo2 from '@/assets/gallery/photo-2.jpeg';
import photo3 from '@/assets/gallery/photo-3.jpeg';
import photo4 from '@/assets/gallery/photo-4.jpeg';
import photo5 from '@/assets/gallery/photo-5.jpeg';
import photo6 from '@/assets/gallery/photo-6.jpeg';
import photo7 from '@/assets/gallery/photo-7.jpeg';
import photo8 from '@/assets/gallery/photo-8.jpeg';
import photo9 from '@/assets/gallery/photo-9.jpg';

type GalleryItem = {
  src: string;
  alt: string;
  aspect: 'portrait' | 'landscape';
};

const items: GalleryItem[] = [
  { src: photo1, alt: 'Piano portrait 1', aspect: 'portrait' },
  { src: photo3, alt: 'Piano dramatic', aspect: 'landscape' },
  { src: photo2, alt: 'Piano portrait 2', aspect: 'portrait' },
  { src: photo9, alt: 'Pagliacci opera', aspect: 'landscape' },
  { src: photo5, alt: 'Pole performance', aspect: 'portrait' },
  { src: photo8, alt: 'Handstand stage', aspect: 'portrait' },
  { src: photo4, alt: 'Studio portrait', aspect: 'portrait' },
  { src: photo6, alt: 'MTV look', aspect: 'portrait' },
  { src: photo7, alt: 'White tee', aspect: 'portrait' },
];

/* ─── Lightbox ─── */
function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-ink/95 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-paper/60 hover:text-paper transition-colors z-10"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-paper/40 hover:text-paper transition-colors z-10"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-paper/40 hover:text-paper transition-colors z-10"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={items[index].src}
          alt={items[index].alt}
          className="max-h-[85vh] max-w-[90vw] object-contain select-none"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          draggable={false}
        />
      </AnimatePresence>

      {/* Counter */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[0.6rem] tracking-[0.3em] uppercase text-dim">
        {index + 1} / {items.length}
      </div>
    </motion.div>
  );
}

/* ─── Gallery Panel ─── */
export default function GalleryPanel() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const hasMoved = useRef(false);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    hasMoved.current = false;
    startX.current = e.clientX;
    scrollStart.current = stripRef.current?.scrollLeft ?? 0;
    stripRef.current?.setPointerCapture(e.pointerId);
    if (stripRef.current) stripRef.current.style.cursor = 'grabbing';
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current || !stripRef.current) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 4) hasMoved.current = true;
    stripRef.current.scrollLeft = scrollStart.current - dx;
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    isDragging.current = false;
    stripRef.current?.releasePointerCapture(e.pointerId);
    if (stripRef.current) stripRef.current.style.cursor = 'grab';
  }, []);

  const openLightbox = (i: number) => {
    if (hasMoved.current) return;
    setLightboxIndex(i);
  };

  const closeLightbox = () => setLightboxIndex(null);
  const prevLightbox = () => setLightboxIndex((i) => (i !== null ? (i - 1 + items.length) % items.length : null));
  const nextLightbox = () => setLightboxIndex((i) => (i !== null ? (i + 1) % items.length : null));

  return (
    <section className="absolute inset-0 max-md:relative max-md:inset-auto flex flex-col px-[6vw] pt-[3.5vh] pb-12 bg-ink2 overflow-hidden max-md:py-16">
      {/* Header */}
      <div className="shrink-0 mb-[clamp(0.6rem,1.2vw,1.2rem)] flex items-end justify-between gap-6 flex-wrap">
        <div>
          <div className="font-mono text-[0.56rem] tracking-[0.42em] uppercase text-gold mb-1">
            Portfolio
          </div>
          <h2 className="font-display text-[clamp(2rem,4.5vw,4.5rem)] leading-[0.85] text-paper">
            GALLERY
          </h2>
        </div>
        <p className="font-mono text-[clamp(0.6rem,0.8vw,0.76rem)] tracking-wider uppercase text-dim">
          Drag to browse · Click to enlarge
        </p>
      </div>

      {/* Horizontal drag strip */}
      <div
        ref={stripRef}
        data-gallery-strip
        className="relative flex-1 min-h-0 overflow-x-auto overflow-y-hidden select-none"
        style={{ cursor: 'grab', scrollbarWidth: 'none' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="flex gap-[clamp(0.5rem,0.8vw,0.8rem)] h-full max-md:h-[60vh] py-2 pr-[6vw]">
          {items.map((item, i) => (
            <div
              key={i}
              onClick={() => openLightbox(i)}
              className={`relative shrink-0 overflow-hidden border border-gold/20 transition-all duration-300 cursor-pointer ${
                item.aspect === 'landscape' ? 'w-[clamp(22rem,38vw,36rem)]' : 'w-[clamp(14rem,22vw,20rem)]'
              } h-full`}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={items}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevLightbox}
            onNext={nextLightbox}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
