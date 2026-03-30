import { useState } from "react";

const STORAGE_KEY = "kgm_cookie_consent_v1";
const COOKIE_NAME = "kgm_cookie_consent";
const MAX_AGE = 60 * 60 * 24 * 180; // 180 days

const defaultPrefs = {
  essential: true,
  analytics: false,
  marketing: false,
};

function safeParse(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

export default function CookieConsent() {
  const initialSaved =
    typeof window !== "undefined"
      ? safeParse(localStorage.getItem(STORAGE_KEY))
      : null;
  const [open, setOpen] = useState(
    !(initialSaved && typeof initialSaved === "object"),
  );
  const [showPanel, setShowPanel] = useState(false);
  const [prefs, setPrefs] = useState(() => {
    if (initialSaved && typeof initialSaved === "object") {
      return {
        essential: true,
        analytics: Boolean(initialSaved.analytics),
        marketing: Boolean(initialSaved.marketing),
      };
    }
    return defaultPrefs;
  });

  const persist = (nextPrefs) => {
    const payload = {
      essential: true,
      analytics: Boolean(nextPrefs.analytics),
      marketing: Boolean(nextPrefs.marketing),
      updatedAt: new Date().toISOString(),
      version: 1,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(
      JSON.stringify(payload),
    )}; path=/; max-age=${MAX_AGE}; SameSite=Lax`;
    setPrefs({
      essential: true,
      analytics: payload.analytics,
      marketing: payload.marketing,
    });
    setOpen(false);
    setShowPanel(false);
  };

  const acceptAll = () =>
    persist({ essential: true, analytics: true, marketing: true });
  const rejectOptional = () =>
    persist({ essential: true, analytics: false, marketing: false });
  const saveCustom = () => persist(prefs);

  return (
    <>
      {(open || showPanel) && (
        <div
          className="fixed inset-0 z-[3500] bg-black/60 backdrop-blur-sm"
          onClick={() => {
            if (!open) setShowPanel(false);
          }}
        />
      )}

      {(open || showPanel) && (
        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-consent-title"
          className="fixed left-4 right-4 bottom-4 z-[3600] md:left-6 md:right-auto md:max-w-xl rounded-2xl border border-cyan-300/25 bg-slate-950/95 shadow-2xl"
        >
          <div className="p-4 md:p-5">
            <h2 id="cookie-consent-title" className="typo-h3 text-white">
              Cookie Preferences
            </h2>
            <p className="typo-small text-cyan-100/80 mt-2">
              We use essential cookies to run the site, and optional cookies to
              improve analytics and outreach. You can change this anytime.
            </p>

            <div className="mt-4 space-y-2">
              <label className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <span className="typo-small text-white">Essential</span>
                <input
                  type="checkbox"
                  checked
                  disabled
                  aria-label="Essential cookies"
                />
              </label>
              <label className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <span className="typo-small text-white">Analytics</span>
                <input
                  type="checkbox"
                  checked={prefs.analytics}
                  onChange={(event) =>
                    setPrefs((prev) => ({
                      ...prev,
                      analytics: event.target.checked,
                    }))
                  }
                  aria-label="Analytics cookies"
                />
              </label>
              <label className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <span className="typo-small text-white">Marketing</span>
                <input
                  type="checkbox"
                  checked={prefs.marketing}
                  onChange={(event) =>
                    setPrefs((prev) => ({
                      ...prev,
                      marketing: event.target.checked,
                    }))
                  }
                  aria-label="Marketing cookies"
                />
              </label>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={acceptAll}
                className="h-10 px-4 cursor-pointer rounded-lg bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition-colors"
              >
                Accept All
              </button>
              <button
                onClick={rejectOptional}
                className="h-10 px-4 cursor-pointer rounded-lg border border-white/20 text-white hover:bg-white/10 transition-colors"
              >
                Reject Optional
              </button>
              <button
                onClick={saveCustom}
                className="h-10 px-4 cursor-pointer rounded-lg border border-cyan-400/40 text-cyan-200 hover:bg-cyan-500/10 transition-colors"
              >
                Save Preferences
              </button>
              <a
                href="/privacy-policy"
                className="h-10 px-4 cursor-pointer rounded-lg border border-white/20 text-white inline-flex items-center hover:bg-white/10 transition-colors"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </section>
      )}

      {!open && (
        <button
          type="button"
          onClick={() => setShowPanel(true)}
          className="fixed bottom-4 left-4 z-[3400] h-10 px-3 cursor-pointer rounded-full border border-cyan-400/35 bg-slate-900/90 text-cyan-100 typo-small hover:bg-slate-800 transition-colors"
          aria-label="Open cookie settings"
        >
          Cookie Settings
        </button>
      )}
    </>
  );
}
