import { motion } from "framer-motion";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import SEO from "@/components/shared/SEO";

const testimonials = [
  {
    id: 1,
    text: "The website captures the spiritual mood of our village beautifully.",
    name: "Local Devotee",
  },
  {
    id: 2,
    text: "Everything is easy to explore, even for elders in our family.",
    name: "Festival Visitor",
  },
  {
    id: 3,
    text: "A meaningful digital archive of Kantore Gajon traditions.",
    name: "Community Member",
  },
];

export default function Testimonials() {
  return (
    <main className="app-shell overflow-x-hidden min-h-screen">
      <SEO
        title="Testimonials"
        description="Read community feedback and experiences from devotees and visitors of Kantore Gajon Mala."
        path="/testimonials"
        image="/images/AC-2026-006.webp"
      />
      <Navbar />
      <section className="section-shell-with-nav">
      <div className="section-inner max-w-6xl">
      <motion.h1
        className="typo-h1 text-center mb-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Testimonials
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {testimonials.map((testimonial) => (
          <motion.div
            key={testimonial.id}
            className="bg-slate-900/70 border border-cyan-400/20 p-6 rounded-2xl flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 rounded-full mb-4 bg-cyan-500/20 border border-cyan-300/30 flex items-center justify-center text-cyan-200 font-semibold">
              {testimonial.name
                .split(" ")
                .map((word) => word[0])
                .join("")
                .slice(0, 2)}
            </div>
            <p className="typo-body text-gray-200 italic mb-4">"{testimonial.text}"</p>
            <p className="typo-small text-cyan-300">- {testimonial.name}</p>
          </motion.div>
        ))}
      </div>
      </div>
      </section>
      <Footer />
    </main>
  );
}

