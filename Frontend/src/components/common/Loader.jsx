import { motion } from "framer-motion";
import Mahadev from "@/assets/images/mahadev1.webp";

function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-15 h-15 translate-x-16">
        {" "}
        <img src={Mahadev} alt="..." loading="lazy" className="rounded-full" />
      </div>
      <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent  rounded-full animate-spin overflow-hidden"></div>
      <motion.p
        whileHover={{ scaleX: 1.3 }}
        className="ml-4 text-lg italic animate-pulse"
      >
        <span className="text-4xl text-red-700">L</span>oading . . .
      </motion.p>
    </div>
  );
}

export default Loader;
