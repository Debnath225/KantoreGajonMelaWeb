import { lazy, Suspense, useEffect, useState } from "react";
import CookieConsent from "@/components/shared/CookieConsent";

const ImageLightbox = lazy(() => import("@/components/shared/ImageLightbox"));

export default function MainLayout({ children }) {
  const [enableLightbox, setEnableLightbox] = useState(false);

  useEffect(() => {
    const schedule = window.requestIdleCallback
      ? window.requestIdleCallback(() => setEnableLightbox(true))
      : window.setTimeout(() => setEnableLightbox(true), 1200);

    return () => {
      if (typeof schedule === "number") {
        window.clearTimeout(schedule);
      } else if (window.cancelIdleCallback) {
        window.cancelIdleCallback(schedule);
      }
    };
  }, []);

  return (
    <div className="app-shell">
      {children}
      <CookieConsent />
      {enableLightbox ? (
        <Suspense fallback={null}>
          <ImageLightbox />
        </Suspense>
      ) : null}
    </div>
  );
}
