import { useLanguage } from "../../context/LanguageContext";

function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  const btnStyle = (active) => {
    return ` px-3 py-1 sm:px-5 sm:py-2 md:px-7 md:py-2 rounded-full text-sm font-medium transition-all cursor-pointer my-1 ${active ? "bg-cyan-400/90 text-black  shadow-2xl" : " text-gray-300 hover:bg-gray-700"}`;
  };

  return (
    <div
      className="flex justify-around items-center bg-white/10 backdrop-blur-2xl  rounded-full mt-5 border-1 border-cyan-500 "
      id="faqSection"
    >
      <button onClick={() => setLang("en")} className={btnStyle(lang == "en")}>
        English
      </button>
      <button onClick={() => setLang("bn")} className={btnStyle(lang == "bn")}>
        বাংলা
      </button>
      <button onClick={() => setLang("hi")} className={btnStyle(lang == "hi")}>
        Hindi
      </button>
    </div>
  );
}

export default LanguageToggle;
