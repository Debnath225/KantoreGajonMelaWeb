import { motion } from "framer-motion";

function TimelineSection() {
  const timeline = [
    {
      year: "2020",
      title: "Digital Archiving Began",
      description:
        "The first documented collection of Kantore Gajon visual stories was created for younger generations.",
    },
    {
      year: "2023",
      title: "Community Reach Expanded",
      description:
        "More devotees and villagers contributed festival photos, rituals, and oral history to enrich the archive.",
    },
    {
      year: "2026",
      title: "Interactive Website Launch",
      description:
        "A dedicated responsive platform was launched to showcase the culture, events, and spiritual legacy of Kantore.",
    },
  ];

  return (
    <section className="section-shell">
      <div className="section-inner max-w-5xl">
        <h2 className="section-title text-white text-center mb-8 md:mb-10">
          Journey Of Kantore Gajon
        </h2>
        <div className="relative pl-6 md:pl-8 space-y-6 md:space-y-8 before:absolute before:left-1.5 md:before:left-2 before:top-1 before:bottom-1 before:w-px before:bg-cyan-400/40">
          {timeline.map((item, index) => (
            <motion.article
              key={item.year}
              className="relative bg-slate-900/70 p-4 md:p-6 rounded-2xl border border-cyan-400/20"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <span className="absolute -left-[1.95rem] md:-left-8 top-6 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
              <p className="text-xs md:text-sm uppercase tracking-widest text-cyan-300">
                {item.year}
              </p>
              <h3 className="text-white text-lg md:text-xl font-semibold mt-1">
                {item.title}
              </h3>
              <p className="text-gray-300 text-sm md:text-base mt-2 leading-relaxed">
                {item.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TimelineSection;
