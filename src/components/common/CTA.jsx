import { motion } from "framer-motion";
import Background from "./Background";

function CTA() {
  const text = "Discover the Divine Essence of Kantore Gajon Mala";
  const words = text.split(" ");
  return (
    <div className="min-h-screen min-w-full mt-30 flex justify-center ">
      <Background />

      <div>
        {words.map((word, i) => (
          <motion.h4
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            style={{ display: "inline-block", marginRight: "5px" }}
            className="text-4xl text-cyan-500 text-center"
          >
            {word}
          </motion.h4>
        ))}


        <div className="flex justify-center">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: words.length * 0.1 + 0.5 }}
            className="mt-8 px-6 py-3 bg-cyan-500 text-black rounded-full text-lg font-semibold hover:bg-cyan-600 transition-colors"
          >
            Explore Now
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default CTA;
