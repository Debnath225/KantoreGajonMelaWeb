import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";

const ContactForm = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-1 gap-1 mx-2">
      {/* first form  */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ ease: "easeIn", duration: 0.5 }}
        className="max-w-md w-full mx-auto mt-10 p-6 bg-black border-2 border-cyan-500 rounded-xl shadow-md"
      >
        <h2 className="text-2xl font-bold mb-8 text-white">Contact Me</h2>

        <form
          action="https://formspree.io/f/movnjboz"
          method="post"
          className="space-y-6"
        >
          {/* Name Input */}
          <div className="relative">
            <input
              type="text"
              id="name"
              placeholder=" "
              className="peer w-full px-4 py-3 border-2 border-gray-300 rounded-lg outline-none transition-colors focus:border-cyan-500 bg-transparent"
            />
            <label
              htmlFor="name"
              className="absolute left-3 top-3 px-1 text-gray-500 transition-all duration-200 cursor-text
                       bg-black peer-focus:text-xs peer-focus:-translate-y-[22px] peer-focus:text-blue-500
                       peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-[22px]"
            >
              Full Name
            </label>
          </div>

          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              id="email"
              placeholder=" "
              className="peer w-full px-4 py-3 border-2 border-gray-300 rounded-lg outline-none transition-colors focus:border-cyan-500 bg-transparent"
            />
            <label
              htmlFor="email"
              className="absolute left-3 top-3 px-1 text-gray-500 transition-all duration-200 cursor-text
                       bg-black peer-focus:text-xs peer-focus:-translate-y-[22px] peer-focus:text-blue-500
                       peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-[22px]"
            >
              Email Address
            </label>
          </div>

          {/* Message Textarea */}
          <div className="relative">
            <textarea
              id="message"
              rows="4"
              placeholder=" "
              className="peer w-full px-4 py-3 border-2 border-gray-300 rounded-lg outline-none transition-colors focus:border-cyan-500 bg-transparent max-h-45"
            ></textarea>
            <label
              htmlFor="message"
              className="absolute left-3 top-3 px-1 text-gray-500 transition-all duration-200 cursor-text
                       bg-black peer-focus:text-xs peer-focus:-translate-y-[22px] peer-focus:text-blue-500
                       peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-[22px]"
            >
              Your Message
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 cursor-pointer md:bg-transparent border border-cyan-400 bg-cyan-500 md:hover:bg-cyan-500 text-white  hover:text-black fw-semibold rounded-lg shadow-lg hover:shadow-xl transition-all active:scale-95"
          >
            Send Message
          </button>
        </form>
      </motion.div>
      {/* second container */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ ease: "easeIn", duration: 0.5 }}
        className="max-w-md w-full mx-auto mt-10 p-1 bg-black border-2 border-cyan-500 rounded-xl shadow-md"
      >
        <ProjectCard />
      </motion.div>
    </div>
  );
};

export default ContactForm;
