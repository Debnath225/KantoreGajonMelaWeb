import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function ImageLightbox() {
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    const onDocumentClick = (event) => {
      const target = event.target;
      if (!(target instanceof HTMLImageElement)) return;
      if (target.closest("[data-lightbox-root='true']")) return;

      const src = target.currentSrc || target.src;
      if (!src) return;

      event.preventDefault();
      event.stopPropagation();
      setActiveImage({
        src,
        alt: target.alt || "Image preview",
      });
    };

    document.addEventListener("click", onDocumentClick, true);
    return () => document.removeEventListener("click", onDocumentClick, true);
  }, []);

  useEffect(() => {
    if (!activeImage) return;

    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyTouchAction = document.body.style.touchAction;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.touchAction = prevBodyTouchAction;
    };
  }, [activeImage]);

  useEffect(() => {
    if (!activeImage) return;

    const onEscape = (event) => {
      if (event.key === "Escape") setActiveImage(null);
    };

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [activeImage]);

  if (!activeImage) return null;

  return createPortal(
    <div
      data-lightbox-root="true"
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
      className="fixed inset-0 z-[4000] bg-black/90 backdrop-blur-sm flex items-center justify-center p-15 sm:p-6"
      onClick={() => setActiveImage(null)}
    >
      <button
        type="button"
        className="absolute top-4 right-4 cursor-pointer rounded-full border border-white/40 px-2.5 py-2.5 text-sm text-white hover:bg-white/10 transition-colors"
        onClick={() => setActiveImage(null)}
      >
        <X className="w-4 h-4" />
      </button>
      <img
        src={activeImage.src}
        alt={activeImage.alt}
        className=" object-contain max-w-[80vw] max-h-[90vh] rounded-xl border border-white/20 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      />
    </div>,
    document.body,
  );
}
