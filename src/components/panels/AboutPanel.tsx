import { motion } from 'framer-motion';

const tags = ['Age 29', '1.77m · 85kg', 'Argentine Passport', 'Spanish · English'];

export default function AboutPanel() {
  return (
    <section className="absolute inset-0 flex items-center justify-center px-[6vw] bg-ink2">
      <div className="max-w-[640px] mx-auto">
        <motion.div
          className="font-mono text-[0.58rem] tracking-[0.42em] uppercase text-gold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0 }}
        >
          About
        </motion.div>
        <motion.h2
          className="font-display text-[clamp(2rem,5vw,5.5rem)] leading-[0.86] mb-5 tracking-wide text-paper"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
        >
          <em className="block font-serif text-[0.42em] italic font-light text-gold2 tracking-wider mb-1">
            circus &amp; aerial artist
          </em>
          Jose Maria<br />Donnici Nefa
        </motion.h2>
        <motion.p
          className="font-body font-light text-[clamp(0.92rem,1.2vw,1.08rem)] leading-[1.9] max-w-[420px] max-sm:max-w-full"
          style={{ color: '#9e9890' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Talented artist who offers 11 years in acrobatic experiences, musical and shows.
          <br />
          Enthusiastic professional with acting talents and choreography.
          <br />
          Expert in body expression while I dance, using all my tools.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-2.5 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {tags.map((tag, i) => (
            <span
              key={i}
              className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-gold border border-gold px-3.5 py-1.5 bg-gold-subtle whitespace-nowrap"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
