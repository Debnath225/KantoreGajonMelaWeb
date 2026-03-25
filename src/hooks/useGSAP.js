import { useLayoutEffect } from "react";
import gsap from "gsap";

export default function useGSAP(callback, deps = []) {
  useLayoutEffect(() => {
    const ctx = gsap.context(callback);
    return () => ctx.revert();
  }, deps);
}
