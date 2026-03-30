import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react"; // Or any icon library

const AccordionItem = ({ id, question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const answerId = `faq-answer-${id}`;

  return (
    <div className="border-b border-b-cyan-400">
      <button
        className="flex justify-between items-center w-full p-4 text-left focus:outline-none focus:bg-gray-900  rounded-xl cursor-pointer transition duration-300 ease-in-out"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={answerId}
        aria-label={`Toggle answer for ${question}`}
      >
        <span className="text-lg font-medium text-cyan-500/88">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-emerald-400" />
        </motion.span>
      </button>

      {/* AnimatePresence allows components to animate out when removed from the DOM */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={answerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 text-blue-50">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccordionItem;
