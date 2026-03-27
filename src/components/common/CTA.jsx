import { motion } from "framer-motion";
import Background from "./Background";
import Galary from "@/store/CTAimageData.json";
import ImageOpen from "./ImageOpen";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

function CTA() {
  const [isHovered, setIsHovered] = useState(false);

  const text = "Discover the Divine Essence of Kantore Gajon Mala";
  const words = text.split(" ");

  return (
    <div className="min-h-screen min-w-full mt-30 flex justify-center ">
      {/* <Background /> */}

      <div>
        <div className="text-center mb-15">
          {words.map((word, i) => (
            <motion.h4
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ display: "inline-block", marginRight: "5px" }}
              className="text-4xl text-cyan-500 text-center"
            >
              {word}
            </motion.h4>
          ))}
        </div>
        <div className="flex justify-center mt-3">
          <div className="grid grid-cols-1  grid-rows-1 md:grid-cols-3 md:grid-rows-2  gap-2 border-2 border-white/50 rounded-3xl p-2">
            {Galary.images.map((image) => (
              <div
                className="border-1 border-white/50 rounded-2xl overflow-hidden"
                key={image.id}
              >
                <motion.img
                  key={image.id}
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full rounded-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.04, transition: { duration: 0.3 } }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: image.id * 0.1 + 0.5 }}
                  // onClick={<handelImageOpen src={image.url} />}
                  onClick={() => {
                    console.log(image.url);
                    const currentImg = document.createElement("img");
                    currentImg.src = image.url;
                    currentImg.style.height = "100vh";
                    const Root = document.getElementById("overlay");
                    Root.style.height = "100vh";
                    Root.appendChild(currentImg);
                  }}
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
            transition={{ duration: 0.5, delay: words.length * 0.1 + 0.5 }}
            onMouseEnter={() => setIsHovered(() => true)}
            onMouseLeave={() => setIsHovered(() => false)}
            className="mt-8 px-6 py-3 inline-block right-28 bg-cyan-500 rounded-full text-lg font-semibold shadow-2xl shadow-cyan-400 hover:bg-cyan-600 transition-colors cursor-pointer"
          >
            <motion.span
              transition={{ duration: 0.5, delay: words.length * 0.1 + 0.5 }}
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
    </div>
  );
}

export default CTA;
