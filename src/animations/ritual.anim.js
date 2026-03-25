import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const ritualAnimation = (el) => {
  gsap.from(".ritual-item", {
    opacity: 0,
    y: 100,
    stagger: 0.3,
    scrollTrigger: {
      trigger: el,
      start: "top 80%",
    },
  });
};
