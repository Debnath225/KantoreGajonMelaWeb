import Tirsul from "../../assets/images/Tirsul3-removebg-preview.png";
import { motion } from "framer-motion";
export default function Navbar() {
  return (
    <nav className="realtive w-full p-4 flex justify-center ">
      <motion.div
        initial={{ y: -900 }}
        animate={{ y: 0, backgroundSize: ["100% 100%", "50% 50%", "0% 0%"] }}
        transition={{ duration: 1 }}
        className="fixed bg-black z-1000 md:h-10 md:w-100 flex justify-center items-center rounded-full px-6 border-2 border-x-indigo-500 border-y-cyan-500 "
      >
        <div className=" m-0 p-0  inline-flex items-center gap-2  overflow-hidden">
          <motion.span
            animate={{ opacity: 1, y: [80, 0, -80], scale: [0, 1.2, 0] }}
            transition={{ duration: 1.8, delay: 0.2, repeat: Infinity }}
          >
            <img src={Tirsul} alt="." className="h-9 w-12" />
          </motion.span>

          <h4 className="text-xl md:text-2xl font-bold truncate tracking-wide ">
            Har Har
            <b>
              <motion.i
                className="text-red-600/98"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, scale: [0, 2, 0] }}
                transition={{ duration: 1.6, delay: 0.3, repeat: Infinity }}
              >
                {" "}
                Mahadev
              </motion.i>
            </b>
          </h4>
          <motion.span
            animate={{ opacity: 1, y: [80, 0, -80], scale: [0, 1, 0] }}
            transition={{ duration: 1.8, delay: 0.2, repeat: Infinity }}
          >
            <img src={Tirsul} alt="." className="h-9 w-12" />
          </motion.span>
        </div>
      </motion.div>
    </nav>
  );
}
