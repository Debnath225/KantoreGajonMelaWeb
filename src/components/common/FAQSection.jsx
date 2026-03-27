import { useEffect, useState } from "react";
import AccordionItem from "./AccordionItem";
import { motion } from "framer-motion";
import { faqData } from "@/store/FAQData";
import { useLanguage } from "../../context/LanguageContext";
import LanguageToggle from "./LanguageToggle";

const FAQSection = () => {
  const { lang } = useLanguage();
  const faqs = faqData[lang];
  const ITEMS_COUNT = 5;
  const [showAll, setShowAll] = useState(false);
  const [text, setText] = useState("F.A.Q");
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(window.innerWidth);
    if (width > 480) {
      setText("Frequently Asked Questions (F.A.Q)");
    }
  }, [width]);
  const words = text.split(" ");

  const handelSee = () => {};

  return (
    <section className="container mx-auto p-4 md:p-8">
      <div className="flex justify-center items-center">
        {words.map((letter, i) => (
          <motion.h2
            key={i}
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            style={{ display: "inline-block", marginRight: "5px" }}
            className="text-3xl font-bold text-center  text-cyan-500 truncate "
          >
            {letter}
          </motion.h2>
        ))}
      </div>
      <div className="max-w-3xl mx-auto mt-3 bg-black shadow-lg rounded-lg overflow-hidden">
        <LanguageToggle />
        {(showAll ? faqs : faqs.slice(0, ITEMS_COUNT)).map((faq) => (
          <AccordionItem
            key={faq.id}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
        <div className="w-full flex justify-center">
          {faqs.length > ITEMS_COUNT && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-center text-purple-500 cursor-pointer  border-2 border-cyan-500 mt-6 px-3 py-1 rounded-full hover:bg-cyan-700 hover:text-white transition-all"
            >
              {showAll ? "Show Less" : "See More"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
