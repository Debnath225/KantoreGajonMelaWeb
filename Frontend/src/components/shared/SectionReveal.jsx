import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SectionReveal({
  children,
  className = "",
  delay = 0,
  y = 24,
  amount = 0.2,
}) {
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(media.matches);
    update();
    if (media.addEventListener) {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }
    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  if (shouldReduceMotion || isMobile) {
    return <div className={`cv-auto ${className}`.trim()}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={`cv-auto ${className}`.trim()}
    >
      {children}
    </motion.div>
  );
}
