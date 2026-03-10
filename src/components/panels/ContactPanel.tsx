import { Mail, Phone, Instagram } from 'lucide-react';

const contacts = [
  { icon: Phone, label: 'WhatsApp', value: '+549 264 445 2424', href: 'https://wa.me/5492644452424' },
  { icon: Mail, label: 'Email', value: 'josemaria_96@live.com.ar', href: 'mailto:josemaria_96@live.com.ar' },
  { icon: Instagram, label: 'Instagram', value: '@josemariadonnici', href: 'https://instagram.com/josemariadonnici' },
];

export default function ContactPanel() {
  return (
    <section className="absolute inset-0 max-md:relative max-md:inset-auto flex items-center justify-center text-center px-[6vw] bg-ink max-md:py-16 max-md:min-h-screen">
      {/* Glow */}
      <div
        className="absolute w-[60vw] h-[60vw] rounded-full bottom-[-22vw] left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(42, 52%, 54%, 0.07) 0%, transparent 65%)' }}
      />

      <div className="w-full relative">
        <div className="font-mono text-[0.58rem] tracking-[0.5em] uppercase text-gold mb-5 flex items-center justify-center gap-4">
          <span className="w-[clamp(25px,5vw,70px)] h-px" style={{ background: 'hsl(42, 52%, 54%, 0.25)' }} />
          Get in Touch
          <span className="w-[clamp(25px,5vw,70px)] h-px" style={{ background: 'hsl(42, 52%, 54%, 0.25)' }} />
        </div>

        <h2 className="font-display text-[clamp(3rem,11vw,12rem)] leading-[0.82] mb-[clamp(1.5rem,3vw,3.5rem)] text-paper">
          LET'S<br />
          <span className="text-gold">CREATE</span><br />
          TOGETHER
        </h2>

        <div className="flex items-start justify-center gap-[clamp(2.5rem,7vw,8rem)] max-sm:gap-5 max-sm:flex-col max-sm:items-center">
          {contacts.map((c, i) => (
            <a
              key={i}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 no-underline text-paper relative group"
            >
              <c.icon className="w-[clamp(1.4rem,2.2vw,2rem)] h-[clamp(1.4rem,2.2vw,2rem)] text-gold opacity-70 group-hover:opacity-100 transition-opacity" />
              <span className="font-mono text-[0.42rem] tracking-[0.28em] uppercase text-dim group-hover:text-gold2 transition-colors max-sm:text-paper/60">
                {c.label}
              </span>
              <span className="font-body font-normal tracking-wide text-[clamp(0.85rem,1.15vw,1rem)] text-gold2 opacity-85 group-hover:opacity-100 transition-all max-sm:text-paper">
                {c.value}
              </span>
              <span className="absolute -bottom-1 left-1/2 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full group-hover:left-0" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
