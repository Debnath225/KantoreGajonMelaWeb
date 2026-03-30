import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function LenisProvider({ children }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

    // Native scrolling is smoother and cheaper on most phones.
    if (prefersReducedMotion || isTouchDevice) {
      return undefined;
    }

    const lenis = new Lenis({
      duration: 0.9,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 0.95,
      touchMultiplier: 1,
    });

    let rafId = 0;
    const raf = (time) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };

    rafId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return children;
}
