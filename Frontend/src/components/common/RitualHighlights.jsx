import { motion } from "framer-motion";

const rituals = [
  {
    title: "Temple Morning Aarti",
    text: "Sacred chants and offerings begin the day with devotion and calm.",
  },
  {
    title: "Gajon Procession",
    text: "A vibrant community walk with drums, songs, and devotional energy.",
  },
  {
    title: "Night Prayer Gathering",
    text: "Collective prayers and reflections under the temple lights.",
  },
];

export default function RitualHighlights() {
  return (
    <section className="section-shell">
      <div className="section-inner max-w-7xl rounded-3xl border border-amber-200/10 bg-gradient-to-br from-slate-950/85 to-black/70 p-6 md:p-8">
        <h2 className="section-title text-white text-center">
          Ritual Highlights
        </h2>
        <p className="section-subtitle text-center text-cyan-100/80 mt-2 max-w-2xl mx-auto">
          Key spiritual moments that define the experience of Kantore Gajon.
        </p>

        <div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {rituals.map((ritual, index) => (
            <motion.div
              key={ritual.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="rounded-2xl border border-amber-300/15 bg-amber-100/[0.03] p-5"
            >
              <h3 className="text-amber-100 text-lg font-semibold">
                {ritual.title}
              </h3>
              <p className="mt-2 text-sm text-gray-300 leading-relaxed">
                {ritual.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
