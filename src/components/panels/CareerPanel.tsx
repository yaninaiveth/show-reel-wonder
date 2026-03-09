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
    <section className="absolute inset-0 max-md:relative max-md:inset-auto flex items-center px-[6vw] bg-ink max-md:py-16 max-md:mt-8">
      <div className="w-full">
        <div className="mb-[clamp(1.2rem,2.5vw,3rem)]">
          <div className="font-mono text-[0.58rem] tracking-[0.42em] uppercase text-gold mb-1.5">
            Track Record
          </div>
          <h2 className="font-display text-[clamp(2.5rem,6vw,6rem)] leading-[0.85] text-paper">
            CAREER <em className="text-gold not-italic">Highlights</em>
          </h2>
        </div>

        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-px">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-start p-[clamp(0.9rem,1.6vw,1.4rem)] bg-card-subtle border-l-2 border-transparent"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 mr-3 shrink-0" />
              <div>
                <div className="font-display text-[clamp(1rem,1.9vw,1.45rem)] tracking-wide text-paper leading-none mb-1">
                  {item.name}
                </div>
                <div className="font-body font-light text-[clamp(0.7rem,0.9vw,0.84rem)] text-dim leading-relaxed">
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
