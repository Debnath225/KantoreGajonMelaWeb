import { motion } from "framer-motion";
import TeamSection from "./TeamSection";
import TimelineSection from "./TimelineSection";

function AboutHero() {
  return (
    <section className="pt-20 pb-8 md:pb-10 bg-black">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 rounded-3xl border border-cyan-400/20 bg-slate-950/60 p-5 md:p-8">
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-cyan-300 uppercase text-xs tracking-widest">
              About Kantore
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-white mt-2 leading-tight">
              Preserving devotion through stories, culture, and community.
            </h1>
            <p className="text-gray-300 text-sm md:text-lg leading-relaxed mt-4">
              Kantore Gajon Mela is more than a festival gallery. It is a living
              archive of tradition where rituals, village life, and faith are
              passed forward with care.
            </p>
            <p className="text-gray-300 text-sm md:text-lg leading-relaxed mt-3">
              Our mission is to present this heritage in a respectful,
              accessible, and modern way so every visitor can feel connected to
              the spiritual legacy of Baba Kantornath.
            </p>
          </motion.div>
          <motion.div
            className="flex justify-center items-center"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/images/mahadev1.webp"
              alt="Kantore Mahadev"
              className="block w-full max-w-md aspect-[4/5] object-cover object-center rounded-3xl border border-cyan-400/20 shadow-2xl"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
      <TeamSection />
      <TimelineSection />
    </section>
  );
}

export default AboutHero;
