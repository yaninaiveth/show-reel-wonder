import { motion } from 'framer-motion';

const disciplines = [
  { ico: '🎪', name: 'Aerial\nAcrobatics', desc: 'Harness, trapeze & fly pole' },
  { ico: '🔥', name: 'Fire\nShows', desc: 'Danger and beauty fused' },
  { ico: '🎭', name: 'Theater\n& Acting', desc: 'Lead — National Theater Institute' },
  { ico: '🕺', name: 'Dance\n& GoGo', desc: 'Body expression — clubs & events' },
  { ico: '✨', name: "Children's\nShows", desc: 'Trapeze, fly pole & ground acrobatics' },
  { ico: '📸', name: 'Modeling\n& Video', desc: 'Fashion shows, brands & music videos' },
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.88, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.09 + 0.2 },
  }),
};

export default function DisciplinesPanel() {
  return (
    <section className="absolute inset-0 flex flex-col justify-center px-[6vw] py-[clamp(2.5rem,5vh,5rem)] bg-ink overflow-hidden">
      {/* Background watermark */}
      <div
        className="absolute right-[-2vw] bottom-[-4rem] font-display text-[21vw] leading-none pointer-events-none"
        style={{ color: 'rgba(255,255,255,0.011)' }}
      >
        CIRCUS
      </div>

      <div className="relative w-full" style={{ zIndex: 1 }}>
        {/* Header */}
        <div className="flex items-end justify-between mb-[clamp(0.8rem,1.8vw,2.2rem)] gap-6 flex-wrap">
          <motion.h2
            className="font-display text-[clamp(2rem,6vw,6.5rem)] leading-[0.85] text-paper"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            DISCIPLINES<br />
            <em className="text-gold not-italic block">& Skills</em>
          </motion.h2>
          <motion.p
            className="font-body font-light text-[clamp(0.68rem,0.9vw,0.82rem)] text-dim max-w-[220px] text-right leading-relaxed max-sm:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            transition={{ delay: 0.75, duration: 0.8 }}
          >
            Technical precision meets raw artistic power.
          </motion.p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-3 max-sm:grid-cols-2 gap-[clamp(0.4rem,0.8vw,0.85rem)] mt-[clamp(0.6rem,1.2vw,1.4rem)]">
          {disciplines.map((d, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="relative bg-card-subtle border border-gold p-[clamp(0.7rem,1.2vw,1.3rem)] flex flex-col gap-1 cursor-default overflow-hidden group transition-colors duration-300 hover:border-gold-strong hover:bg-gold-subtle"
            >
              <div className="text-[clamp(1.1rem,2vw,1.7rem)] leading-none my-1">{d.ico}</div>
              <div className="font-display text-[clamp(0.95rem,2vw,1.65rem)] tracking-wide leading-none text-paper whitespace-pre-line">
                {d.name}
              </div>
              <div className="font-body font-light text-[clamp(0.55rem,0.75vw,0.7rem)] text-dim leading-relaxed opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                {d.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
