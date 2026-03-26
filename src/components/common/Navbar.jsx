import Tirsul from "../../assets/images/Tirsul3-removebg-preview.png";
import { motion } from "framer-motion";
export default function Navbar() {
  return (
    <nav className="realtive w-full p-4 flex justify-center ">
      <div className="fixed bg-black z-1000 md:h-10 md:w-100 flex justify-center items-center rounded-full px-6 border-2 ">
        <div className=" m-0 p-0  inline-flex items-center gap-2  overflow-hidden">
          <motion.span
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, x: 280 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <img src={Tirsul} alt="." className="h-9 w-12" />
          </motion.span>

          <h4 className="text-xl md:text-2xl font-bold truncate tracking-wide animate-caret-blink">
            Har Har
            <b>
              <i className="text-red-600/98"> Mahadev</i>
            </b>
          </h4>
          <motion.span
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, x: -280 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <img src={Tirsul} alt="." className="h-9 w-12" />
          </motion.span>
        </div>
      </div>
    </nav>
  );
}
