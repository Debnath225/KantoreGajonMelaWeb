import AccordionItem from "./AccordionItem";

const faqs = [
  {
    id: 1,
    question: "Where is Kantore Shiv Mandir located?",
    answer:
      "Kantore Shiv Mandir is a sacred temple dedicated to Lord Shiva, located in the Kantore area. It serves as a spiritual center for local devotees and visitors seeking blessings of Mahadev.",
  },
  {
    id: 2,
    question: "What are the temple timings?",
    answer:
      "The temple is generally open in the early morning (around 5:00 AM) and remains accessible till evening (around 9:00 PM). Timings may vary during festivals and special occasions.",
  },
  {
    id: 3,
    question: "Is there any special पूजा (puja) performed daily?",
    answer:
      "Yes, daily rituals include morning aarti, Shivling abhishek with water and milk, and evening aarti. Devotees can participate or offer their own prayers.",
  },
  {
    id: 4,
    question: "What is special about Kantore Shiv Mandir?",
    answer:
      "The temple is known for its peaceful environment, strong local faith, and regular Shiva पूजा rituals. It becomes especially vibrant during Mahashivratri and Shravan month.",
  },
  {
    id: 5,
    question: "Can visitors perform Abhishek at the temple?",
    answer:
      "Yes, devotees are allowed to perform Shivling Abhishek using water, milk, and bel leaves. It is one of the most important rituals offered to Lord Shiva.",
  },
  {
    id: 6,
    question: "How is Mahashivratri celebrated here?",
    answer:
      "Mahashivratri is celebrated with great devotion. The temple organizes special पूजा, night-long bhajans, and continuous Abhishek. Large numbers of devotees visit the temple on this day.",
  },
  {
    id: 7,
    question: "Is there any dress code for visiting the temple?",
    answer:
      "There is no strict dress code, but visitors are advised to wear clean and modest traditional or comfortable clothing as a mark of respect.",
  },
  {
    id: 8,
    question: "Are offerings available near the temple?",
    answer:
      "Yes, small shops near the temple provide পুজা(Pooja) items like flowers, bel leaves, incense sticks, milk, and prasad for devotees.",
  },
  {
    id: 9,
    question: "Can we visit the temple during Shravan month?",
    answer:
      "Yes, Shravan (Sawan) month is one of the most auspicious times to visit. The temple sees heavy भक्त (devotee) gatherings and special rituals throughout the month.",
  },
  {
    id: 10,
    question: "Is the temple suitable for family visits?",
    answer:
      "Yes, Kantore Shiv Mandir is a peaceful and family-friendly place where people of all ages can come for darshan and पूजा.",
  },
  {
    id: 11,
    question: "Is there parking available near the temple?",
    answer:
      "Limited parking is usually available near the temple area. During festivals, visitors are advised to arrive early due to heavy crowds.",
  },
  {
    id: 12,
    question: "How can I contribute or donate to the temple?",
    answer:
      "Devotees can donate directly at the temple donation box or contact temple authorities during visits for any special contributions or seva participation.",
  },
];

const FAQSection = () => {
  return (
    <section className="container mx-auto p-4 md:p-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-cyan-500">
        Frequently Asked Questions (F.A.Q)
      </h2>
      <div className="max-w-2xl mx-auto bg-black shadow-lg rounded-lg overflow-hidden">
        {faqs.map((faq) => (
          <AccordionItem
            key={faq.id}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
