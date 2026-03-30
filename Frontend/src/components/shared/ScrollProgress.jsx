import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const [isTouch, setIsTouch] = useState(false);
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 170,
    damping: 24,
    mass: 0.25,
  });

  useEffect(() => {
    const media = window.matchMedia("(pointer: coarse)");
    const update = () => setIsTouch(media.matches);
    update();
    if (media.addEventListener) {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }
    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  if (shouldReduceMotion || isTouch) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 shadow-[0_0_16px_rgba(34,211,238,0.65)]"
      style={{ scaleX }}
    />
  );
}
