
import { motion, useReducedMotion } from "framer-motion";
import { Camera, MapPin, Sparkles, Trees } from "lucide-react";
import imageData from "@/store/imageData.json";

function ExploreKantore() {
  const shouldReduceMotion = useReducedMotion();
  const highlights = [
    {
      title: "Sacred Temple Energy",
      description:
        "Experience the atmosphere of Kantore Shiv Mandir with timeless rituals and deep devotion.",
      icon: Sparkles,
      accent: "from-cyan-500/40 to-blue-500/20",
    },
    {
      title: "Village Heritage Trail",
      description:
        "Walk through local culture, stories, and spiritual landmarks connected to Gajon traditions.",
      icon: MapPin,
      accent: "from-emerald-500/35 to-cyan-500/20",
    },
    {
      title: "Festival Visual Archive",
      description:
        "Relive memorable moments with curated frames from processions, chants, and celebrations.",
      icon: Camera,
      accent: "from-indigo-500/35 to-cyan-500/20",
    },
  ];

  return (
    <section className="relative px-4 md:px-10 py-16 md:py-22 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(34,211,238,0.15),transparent_50%),radial-gradient(circle_at_85%_20%,rgba(79,70,229,0.12),transparent_45%)]" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="inline-flex items-center gap-2 text-xs md:text-sm px-4 py-1.5 rounded-full border border-cyan-400/30 text-cyan-300 bg-cyan-500/10">
            <Trees className="w-4 h-4" />
            Explore Kantore
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-white leading-tight">
            Discover the spirit of
            <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              {" "}
              culture, faith, and place
            </span>
          </h2>
          <p className="mt-3 text-sm md:text-base text-cyan-100/80 max-w-3xl mx-auto">
            A modern journey through sacred visuals, local traditions, and the
            divine rhythm of Kantore.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={shouldReduceMotion ? {} : { y: -6 }}
                className="group relative rounded-2xl border border-white/10 overflow-hidden bg-slate-950/70 backdrop-blur-md"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
                <div className="relative p-5 md:p-6">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-cyan-300" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-cyan-100/75 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {imageData.images.slice(0, 4).map((image, index) => (
            <motion.figure
              key={image.id}
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={shouldReduceMotion ? {} : { y: -4 }}
              className="group rounded-2xl overflow-hidden border border-white/10 bg-black/40"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={image.url}
                  alt={image.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <figcaption className="p-3 text-xs md:text-sm text-cyan-100/80">
                {image.title}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ExploreKantore;
