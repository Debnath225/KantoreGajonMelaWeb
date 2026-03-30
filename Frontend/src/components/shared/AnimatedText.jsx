import { createElement } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function AnimatedText({
  text,
  as: Tag = "p",
  className = "",
  delay = 0,
  wordDelay = 0.045,
  duration = 0.45,
  once = true,
}) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");

  if (shouldReduceMotion) {
    return createElement(Tag, { className }, text);
  }

  return createElement(
    Tag,
    { className, "aria-label": text },
    <>
      <span className="sr-only">{text}</span>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          aria-hidden="true"
          initial={{ opacity: 0, y: "0.45em", filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once, amount: 0.7 }}
          transition={{
            duration,
            ease: [0.22, 1, 0.36, 1],
            delay: delay + index * wordDelay,
          }}
          className="inline-block will-change-transform"
        >
          {word}
          {index < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </>,
  );
}
