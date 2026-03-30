import { useLanguage } from "../../context/LanguageContext";
import { motion } from "framer-motion";

function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  const languages = [
    { key: "en", label: "English" },
    { key: "bn", label: "Bengali" },
    { key: "hi", label: "Hindi" },
  ];

  return (
    <motion.div
      className="relative flex items-center justify-between bg-white/10 backdrop-blur-2xl rounded-full mt-5 border border-cyan-500/70 p-1.5"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      role="tablist"
      aria-label="Language selector"
    >
      {languages.map((item) => {
        const isActive = lang === item.key;
        return (
          <button
            key={item.key}
            onClick={() => setLang(item.key)}
            className="relative flex-1 px-3 py-2 sm:px-5 md:px-7 rounded-full text-xs sm:text-sm font-medium cursor-pointer transition-colors duration-300"
            role="tab"
            aria-selected={isActive}
            aria-pressed={isActive}
          >
            {isActive && (
              <motion.span
                layoutId="lang-active-pill"
                transition={{ type: "spring", stiffness: 450, damping: 34 }}
                className="absolute inset-0 rounded-full bg-cyan-400/90 shadow-[0_0_18px_rgba(34,211,238,0.65)]"
              />
            )}
            <motion.span
              className={`relative z-10 ${isActive ? "text-black" : "text-gray-200"}`}
              animate={{ opacity: isActive ? 1 : 0.82, y: isActive ? -1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {item.label}
            </motion.span>
          </button>
        );
      })}
    </motion.div>
  );
}

export default LanguageToggle;
