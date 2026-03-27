import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";

function Map() {
  // const width =200;
  const [width, setwidth] = useState(0);
  useEffect(() => {
    setwidth(window.innerWidth);
  }, [width]);
  return (
    <section className="py-16 px-4 md:px-10 bg-gradient-to-b from-black to-gray-900">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeIn" }}
        className="text-center mb-10"
      >
        <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-400 flex items-center justify-center gap-2">
          <MapPin className="text-cyan-400" />
          {width > 480 ? "Located At Kantore Shiv Mandir" : "Get Location"}
        </h4>
        <p className="text-gray-400 mt-2 text-sm md:text-base">
          Visit the sacred place of Mahadev and experience divine peace
        </p>
      </motion.div>

      {/* Map Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-cyan-500/20"
      >
        {/* Google Map */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4399.686227961821!2d88.11394431708791!3d25.747672020401104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f7c187e97aa455%3A0x63dd73d596a9d1c7!2sKANTORE%20SHIB%20MANDIR!5e0!3m2!1sen!2sin!4v1774552871303!5m2!1sen!2sin"
          className="w-full h-[300px] md:h-[500px] border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Kantore Shiv Mandir Location"
        />

        {/* Overlay Info */}
        <div className="absolute bottom-4 left-4 right-4 md:left-6 md:right-auto bg-black/70 backdrop-blur-md p-4 rounded-xl border border-cyan-400/30">
          <h5 className="text-white font-semibold text-lg">
            Kantore Shiv Mandir
          </h5>
          <p className="text-gray-300 text-sm">
            A sacred place of Lord Shiva where devotion meets peace
          </p>

          {/* Open in Maps Button */}
          <a
            href="https://www.google.com/maps?q=KANTORE+SHIB+MANDIR"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-sm text-cyan-400 hover:underline"
          >
            Open in Google Maps →
          </a>
        </div>
      </motion.div>
    </section>
  );
}

export default Map;
