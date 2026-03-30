import { useEffect, useState } from "react";
import AccordionItem from "./AccordionItem";
import { motion } from "framer-motion";
import { faqData } from "@/store/FAQData";
import { useLanguage } from "../../context/LanguageContext";
import LanguageToggle from "./LanguageToggle";
import { api } from "@/lib/api";

const FAQSection = () => {
  const { lang } = useLanguage();
  const localFaqs = faqData[lang];
  const ITEMS_COUNT = 5;
  const [showAll, setShowAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [askForm, setAskForm] = useState({ name: "", email: "", question: "" });
  const [askErrors, setAskErrors] = useState({});
  const [askStatus, setAskStatus] = useState("idle");
  const [askMessage, setAskMessage] = useState("");
  const [remoteFaqs, setRemoteFaqs] = useState([]);
  const [width, setWidth] = useState(
    typeof window === "undefined" ? 1024 : window.innerWidth,
  );

  useEffect(() => {
    const updateWidth = () => setWidth(window.innerWidth);
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const text = width > 480 ? "Frequently Asked Questions (F.A.Q)" : "F.A.Q";
  const words = text.split(" ");
  useEffect(() => {
    let mounted = true;
    if (lang !== "en") return undefined;
    async function loadFaqs() {
      try {
        const response = await api.getFaqs();
        if (!mounted) return;
        if (Array.isArray(response?.data) && response.data.length) {
          setRemoteFaqs(response.data);
        }
      } catch {
        if (!mounted) return;
        setRemoteFaqs([]);
      }
    }
    loadFaqs();
    return () => {
      mounted = false;
    };
  }, [lang]);

  const faqs =
    lang === "en" && remoteFaqs.length
      ? remoteFaqs.map((item, index) => ({
          id: item._id || index + 1,
          question: item.question,
          answer: item.answer,
        }))
      : localFaqs;

  const normalize = (value) => value.toLowerCase().trim();
  const filteredFaqs = faqs.filter((item) => {
    const term = normalize(searchTerm);
    if (!term) return true;
    return (
      normalize(item.question).includes(term) || normalize(item.answer).includes(term)
    );
  });

  const visibleFaqs = showAll
    ? filteredFaqs
    : filteredFaqs.slice(0, ITEMS_COUNT);

  const labels = {
    en: {
      search: "Search answers...",
      askTitle: "Still Have a Question?",
      askSubtitle: "Send your question and we will get back to you soon.",
      name: "Your Name",
      email: "Your Email",
      question: "Your Question",
      submit: "Submit Question",
      sending: "Sending...",
      noResult: "No matching questions found.",
      showMore: "See More",
      showLess: "Show Less",
      success: "Your question was sent successfully.",
      fail: "Could not send your question right now. Please try again.",
    },
    bn: {
      search: "উত্তর খুঁজুন...",
      askTitle: "আরও প্রশ্ন আছে?",
      askSubtitle: "আপনার প্রশ্ন পাঠান, আমরা দ্রুত উত্তর দেব।",
      name: "আপনার নাম",
      email: "আপনার ইমেল",
      question: "আপনার প্রশ্ন",
      submit: "প্রশ্ন পাঠান",
      sending: "পাঠানো হচ্ছে...",
      noResult: "মিলযুক্ত কোনো প্রশ্ন পাওয়া যায়নি।",
      showMore: "আরও দেখুন",
      showLess: "কম দেখুন",
      success: "আপনার প্রশ্ন সফলভাবে পাঠানো হয়েছে।",
      fail: "এখন প্রশ্ন পাঠানো যাচ্ছে না। পরে আবার চেষ্টা করুন।",
    },
    hi: {
      search: "उत्तर खोजें...",
      askTitle: "क्या आपके पास और प्रश्न है?",
      askSubtitle: "अपना प्रश्न भेजें, हम जल्द उत्तर देंगे।",
      name: "आपका नाम",
      email: "आपका ईमेल",
      question: "आपका प्रश्न",
      submit: "प्रश्न भेजें",
      sending: "भेजा जा रहा है...",
      noResult: "कोई मिलती-जुलती FAQ नहीं मिली।",
      showMore: "और देखें",
      showLess: "कम देखें",
      success: "आपका प्रश्न सफलतापूर्वक भेज दिया गया।",
      fail: "अभी प्रश्न भेजा नहीं जा सका। कृपया बाद में प्रयास करें।",
    },
  };

  const t = labels[lang] || labels.en;

  const validateAskField = (key, value) => {
    const trimmed = value.trim();
    if (key === "name") {
      if (!trimmed) return "Name is required.";
      if (trimmed.length < 3) return "Name must be at least 3 characters.";
      return "";
    }
    if (key === "email") {
      if (!trimmed) return "Email is required.";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(trimmed) ? "" : "Enter a valid email address.";
    }
    if (key === "question") {
      if (!trimmed) return "Question is required.";
      if (trimmed.length < 10) return "Question must be at least 10 characters.";
      return "";
    }
    return "";
  };

  const handleAskChange = (event) => {
    const { id, value } = event.target;
    setAskForm((prev) => ({ ...prev, [id]: value }));
    setAskErrors((prev) => ({ ...prev, [id]: validateAskField(id, value) }));
  };

  const handleAskSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = {
      name: validateAskField("name", askForm.name),
      email: validateAskField("email", askForm.email),
      question: validateAskField("question", askForm.question),
    };
    setAskErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    setAskStatus("loading");
    setAskMessage("");

    try {
      await api.submitQuestion({
        name: askForm.name.trim(),
        email: askForm.email.trim(),
        question: askForm.question.trim(),
      });

      setAskStatus("success");
      setAskMessage(t.success);
      setAskForm({ name: "", email: "", question: "" });
    } catch {
      setAskStatus("error");
      setAskMessage(t.fail);
    }
  };

  return (
    <section
      id="faqSection"
      className="section-shell scroll-mt-24"
      aria-labelledby="faq-title"
    >
      <h2 id="faq-title" className="sr-only">
        Frequently Asked Questions
      </h2>

      <div className="section-inner flex justify-center items-center flex-wrap">
        {words.map((letter, i) => (
          <motion.h2
            key={i}
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            style={{ display: "inline-block", marginRight: "5px" }}
            className="typo-h2 !text-2xl sm:!text-3xl text-center text-cyan-500"
          >
            {letter}
          </motion.h2>
        ))}
      </div>
      <div className="section-inner max-w-3xl mt-5 bg-black shadow-lg rounded-lg overflow-hidden">
        <LanguageToggle />
        <div className="p-4">
          <input
            id="faq-search"
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder={t.search}
            className="w-full h-11 rounded-xl px-4 border border-cyan-400/35 bg-slate-950 text-white outline-none focus:border-cyan-300"
            aria-label="Search frequently asked questions"
          />
        </div>
        {visibleFaqs.map((faq) => (
          <AccordionItem
            key={faq.id}
            id={faq.id}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
        {!visibleFaqs.length && (
          <p className="px-4 py-6 text-center text-cyan-100/70">{t.noResult}</p>
        )}
        <div className="w-full flex justify-center">
          {filteredFaqs.length > ITEMS_COUNT && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-center text-purple-500 cursor-pointer  border-2 border-cyan-500 mt-6 px-3 py-1 rounded-full hover:bg-cyan-700 hover:text-white transition-all"
            >
              {showAll ? t.showLess : t.showMore}
            </button>
          )}
        </div>
        <div className="mx-4 my-6 rounded-2xl border border-cyan-400/20 bg-slate-950/60 p-4 md:p-5">
          <h3 className="text-white text-lg md:text-xl font-semibold">{t.askTitle}</h3>
          <p className="text-cyan-100/75 text-sm mt-1">{t.askSubtitle}</p>
          <form onSubmit={handleAskSubmit} className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <input
                id="name"
                value={askForm.name}
                onChange={handleAskChange}
                placeholder={t.name}
                className={`w-full h-11 rounded-xl px-3 border bg-black/50 text-white outline-none ${
                  askErrors.name
                    ? "border-red-500 focus:border-red-400"
                    : "border-cyan-300/35 focus:border-cyan-300"
                }`}
              />
              {askErrors.name && <p className="text-red-400 text-xs mt-1">{askErrors.name}</p>}
            </div>
            <div>
              <input
                id="email"
                type="email"
                value={askForm.email}
                onChange={handleAskChange}
                placeholder={t.email}
                className={`w-full h-11 rounded-xl px-3 border bg-black/50 text-white outline-none ${
                  askErrors.email
                    ? "border-red-500 focus:border-red-400"
                    : "border-cyan-300/35 focus:border-cyan-300"
                }`}
              />
              {askErrors.email && <p className="text-red-400 text-xs mt-1">{askErrors.email}</p>}
            </div>
            <div className="md:col-span-2">
              <textarea
                id="question"
                rows={4}
                value={askForm.question}
                onChange={handleAskChange}
                placeholder={t.question}
                className={`w-full rounded-xl px-3 py-2.5 border bg-black/50 text-white outline-none resize-y min-h-28 ${
                  askErrors.question
                    ? "border-red-500 focus:border-red-400"
                    : "border-cyan-300/35 focus:border-cyan-300"
                }`}
              />
              {askErrors.question && (
                <p className="text-red-400 text-xs mt-1">{askErrors.question}</p>
              )}
            </div>
            <div className="md:col-span-2 flex items-center gap-3">
              <button
                type="submit"
                disabled={askStatus === "loading"}
                className="h-11 px-5 cursor-pointer rounded-xl bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition-colors disabled:opacity-70"
              >
                {askStatus === "loading" ? t.sending : t.submit}
              </button>
              {askMessage && (
                <p
                  className={`text-sm ${
                    askStatus === "success" ? "text-cyan-300" : "text-red-400"
                  }`}
                >
                  {askMessage}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
