import { motion } from "framer-motion";
import { CalendarDays, Flame, Users } from "lucide-react";

const stats = [
  {
    icon: CalendarDays,
    label: "Festival Season",
    value: "Chaitra End",
    description: "The celebration is observed during the closing days of Chaitra.",
  },
  {
    icon: Users,
    label: "Community Presence",
    value: "Village-led",
    description: "Organized with active participation of local devotees and families.",
  },
  {
    icon: Flame,
    label: "Core Devotion",
    value: "Shiva Rituals",
    description: "Daily worship and festival rites remain at the heart of the event.",
  },
];

export default function StatsSection() {
  return (
    <section className="section-shell">
      <div className="section-inner max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="rounded-2xl border border-cyan-400/20 bg-slate-950/70 p-5 md:p-6"
              >
                <div className="w-11 h-11 rounded-xl bg-cyan-500/15 border border-cyan-300/30 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-cyan-300" />
                </div>
                <p className="mt-4 text-3xl md:text-4xl font-bold text-white">
                  {item.value}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-cyan-200">
                  {item.label}
                </h3>
                <p className="mt-2 text-sm text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
