const items = [
  { name: 'Fiesta Nacional del Sol', desc: "Grand Finale — aerial harness acrobatics at Argentina's most iconic sun festival" },
  { name: 'Abnegación — Lead Role', desc: 'Selected by the Instituto Nacional del Teatro for the lead acting role' },
  { name: 'Private & Family Shows', desc: 'Trapeze, fly pole & ground acrobatics for private clients and families' },
  { name: 'Music Video Actor', desc: "Dance, acting & stage charisma for independent artists' productions" },
  { name: 'Fashion & Brand Modeling', desc: 'Runway and catalog for fashion shows and clothing brands' },
  { name: "Children's Circus Shows", desc: 'Educational and entertaining circus arts for young audiences' },
];

export default function CareerPanel() {
  return (
    <section className="absolute inset-0 max-md:relative max-md:inset-auto flex items-center px-[6vw] bg-ink max-md:py-16 max-md:-mt-24">
      <div className="w-full">
        <div className="mb-[clamp(1.2rem,2.5vw,3rem)]">
          <div className="font-mono text-[0.58rem] tracking-[0.42em] uppercase text-gold mb-1.5">
            Track Record
          </div>
          <h2 className="font-display text-[clamp(2.5rem,6vw,6rem)] leading-[0.85] text-paper">
            CAREER <em className="text-gold not-italic">Highlights</em>
          </h2>
        </div>

        <div className="flex flex-col max-w-[680px]">
          {items.map((item, i) => (
            <div
              key={i}
              className="py-[clamp(0.8rem,1.4vw,1.2rem)] border-b border-[hsl(var(--gold)/0.12)] first:border-t"
            >
              <div className="font-display text-[clamp(1.1rem,2vw,1.5rem)] tracking-wide text-paper leading-none mb-1">
                {item.name}
              </div>
              <div className="font-serif italic font-light text-[clamp(0.78rem,1vw,0.92rem)] text-dim leading-relaxed">
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
