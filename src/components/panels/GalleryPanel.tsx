const placeholderCards = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  isVideo: i === 0 || i === 5,
  span: i === 0 ? 'row-span-2' : i % 3 === 0 ? 'row-span-2' : 'row-span-1',
}));

export default function GalleryPanel() {
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
          Click to view full size
        </p>
      </div>

      {/* Masonry Grid */}
      <div className="relative flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
        <div 
          className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 auto-rows-[180px] max-md:auto-rows-[220px] gap-[clamp(0.5rem,0.8vw,0.8rem)] pb-4"
        >
          {placeholderCards.map((card) => (
            <div
              key={card.id}
              className={`relative overflow-hidden bg-gold-subtle border border-gold hover:border-gold-strong transition-all duration-300 cursor-pointer group ${card.span}`}
            >
              {card.isVideo ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 font-mono text-[0.38rem] tracking-[0.18em] uppercase pointer-events-none" style={{ color: 'hsl(42, 52%, 54%, 0.2)' }}>
                  <span className="text-[1.4rem] opacity-15 group-hover:opacity-25 transition-opacity">▶</span>
                  Place video here
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 font-mono text-[0.36rem] tracking-[0.18em] uppercase pointer-events-none" style={{ color: 'hsl(42, 52%, 54%, 0.2)' }}>
                  <span className="text-[0.9rem] opacity-[0.18] group-hover:opacity-[0.28] transition-opacity">📷</span>
                </div>
              )}
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-ink opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
