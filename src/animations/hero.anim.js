import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const heroAnimation = (el) => {
  const tl = gsap.timeline();

  tl.from(".hero-title", {
    y: 100,
    opacity: 0,
    duration: 1,
  });

  gsap.to(".hero-title", {
    y: -200,
    scrollTrigger: {
      trigger: el,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
};
