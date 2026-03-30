import { motion } from "framer-motion";
import Galary from "@/store/CTAimageData.json";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary";

function CTA() {
  const [isHovered, setIsHovered] = useState(false);

  const titlePrimary = "Discover the Divine Essence of";
  const titleAccent = "Kantore Gajon Mela";

  return (
    <section className="section-shell w-full flex justify-center">
      <div className="section-inner w-full max-w-7xl">
        <div className="text-center mb-10 md:mb-12 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="text-xs sm:text-sm uppercase tracking-[0.22em] text-cyan-300/90"
          >
            Sacred Moments Collection
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="typo-h2 mt-3 sm:!text-3xl md:!text-5xl text-white"
          >
            {titlePrimary}
            <span className="block mt-1.5 bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
              {titleAccent}
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="typo-body mt-3 text-cyan-100/75"
          >
            Explore curated visuals that celebrate devotion, culture, and the
            timeless rhythm of Kantore.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scaleX: 0.4 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-5 h-px w-40 bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent"
          />
        </div>
        <div className="flex justify-center mt-3">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 border border-white/30 rounded-3xl p-3">
            {Galary.images.map((image) => (
              <div
                className="border border-white/30 rounded-2xl overflow-hidden aspect-[4/3] bg-slate-950/70"
                aria-label="CTA Button"
                key={image.id}
              >
                <motion.img
                  key={image.id}
                  src={optimizeCloudinaryUrl(image.url, {
                    width: 960,
                    height: 720,
                    crop: "fill",
                  })}
                  alt={image.title}
                  className="block w-full h-full object-cover object-center mx-auto"
                  initial={{ opacity: 0, y: 20, scale: 0 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.04, transition: { duration: 0.3 } }}
                  transition={{ duration: 0.5, delay: image.id * 0.1 + 0.5 }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <motion.button
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileTap={{ scale: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.45 }}
            onMouseEnter={() => setIsHovered(() => true)}
            onMouseLeave={() => setIsHovered(() => false)}
            onClick={() =>
              document
                .getElementById("faqSection")
                ?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
            className="mt-8 px-6 py-3 inline-block bg-cyan-500 rounded-full text-base md:text-lg font-semibold shadow-2xl shadow-cyan-400 hover:bg-cyan-600 transition-colors cursor-pointer"
          >
            <motion.span
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex justify-center items-center transition-all ease-in-out"
            >
              Explore More
              {isHovered && (
                <ArrowRight className="transition-all ease-in-out transform translate-x-2 " />
              )}
            </motion.span>
          </motion.button>
        </div>
      </div>
    </section>
  );
}

export default CTA;
