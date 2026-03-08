import { motion } from 'framer-motion';
import { Mail, Phone, Instagram } from 'lucide-react';

const contacts = [
  { icon: Phone, label: 'WhatsApp', value: '+549 264 445 2424', href: 'https://wa.me/5492644452424' },
  { icon: Mail, label: 'Email', value: 'josemaria_96@live.com.ar', href: 'mailto:josemaria_96@live.com.ar' },
  { icon: Instagram, label: 'Instagram', value: '@josemariadonnici', href: 'https://instagram.com/josemariadonnici' },
];

export default function ContactPanel() {
  return (
    <section className="absolute inset-0 flex items-center justify-center text-center px-[6vw] bg-ink">
      {/* Glow */}
      <div
        className="absolute w-[60vw] h-[60vw] rounded-full bottom-[-22vw] left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(42, 52%, 54%, 0.07) 0%, transparent 65%)' }}
      />

      <div className="w-full relative">
        <motion.div
          className="font-mono text-[0.58rem] tracking-[0.5em] uppercase text-gold mb-5 flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span className="w-[clamp(25px,5vw,70px)] h-px" style={{ background: 'hsl(42, 52%, 54%, 0.25)' }} />
          Get in Touch
          <span className="w-[clamp(25px,5vw,70px)] h-px" style={{ background: 'hsl(42, 52%, 54%, 0.25)' }} />
        </motion.div>

        <motion.h2
          className="font-display text-[clamp(3rem,11vw,12rem)] leading-[0.82] mb-[clamp(1.5rem,3vw,3.5rem)] text-paper"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8 }}
        >
          LET'S<br />
          <span className="text-gold">CREATE</span><br />
          TOGETHER
        </motion.h2>

        <motion.div
          className="flex items-start justify-center gap-[clamp(2.5rem,7vw,8rem)] max-sm:gap-7 max-sm:flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {contacts.map((c, i) => (
            <a
              key={i}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 no-underline text-paper relative group"
            >
              <c.icon className="w-[clamp(1.4rem,2.2vw,2rem)] h-[clamp(1.4rem,2.2vw,2rem)] text-gold opacity-70 group-hover:opacity-100 transition-opacity" />
              <span className="font-mono text-[0.42rem] tracking-[0.28em] uppercase text-dim group-hover:text-gold2 transition-colors">
                {c.label}
              </span>
              <span className="font-body font-light text-[clamp(0.75rem,1vw,0.88rem)] transition-colors" style={{ color: 'hsl(42, 52%, 54%, 0.55)' }}>
                {c.value}
              </span>
              {/* Underline on hover */}
              <span className="absolute -bottom-1 left-1/2 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full group-hover:left-0" />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
