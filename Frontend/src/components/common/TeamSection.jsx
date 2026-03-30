import { motion } from "framer-motion";

function TeamSection() {
  const team = [
    {
      name: "Debnath Hati",
      role: "Founder & Developer",
      bio: "Leads the digital storytelling of Kantore Gajon Mala and preserves community moments through tech.",
      image: "/images/AC-2026-001.webp",
    },
    {
      name: "Festival Committee",
      role: "Cultural Coordinators",
      bio: "Curate rituals, processions, and devotional events to keep the spirit of Gajon alive each year.",
      image: "/images/AC-2026-003.webp",
    },
    {
      name: "Village Volunteers",
      role: "Community Support",
      bio: "Support logistics, decoration, and hospitality for devotees visiting Kantore Shiv Mandir.",
      image: "/images/AC-2026-005.webp",
    },
  ];

  return (
    <section className="section-shell">
      <div className="section-inner max-w-7xl">
        <h2 className="section-title text-white text-center mb-8 md:mb-10">
          Meet The People Behind The Celebration
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
          {team.map((member, index) => (
            <motion.article
              key={member.name}
              className="bg-slate-900/70 border border-cyan-400/20 p-4 md:p-6 rounded-2xl shadow-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
            >
              <img
                src={member.image}
                alt={member.name}
                loading="lazy"
                className="block w-24 h-24 md:w-28 md:h-28 mx-auto rounded-full mb-4 object-cover object-center border-2 border-cyan-400/30"
              />
              <h3 className="text-white text-lg md:text-xl font-semibold">
                {member.name}
              </h3>
              <p className="text-cyan-300 text-sm md:text-base mt-1">{member.role}</p>
              <p className="text-gray-300 text-sm mt-3 leading-relaxed">
                {member.bio}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TeamSection;
