import { useEffect, useMemo, useState } from "react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import SEO from "@/components/shared/SEO";
import { api } from "@/lib/api";

const FALLBACK_EVENTS = [
  {
    title: "Gajon Opening Ritual",
    startAt: "2026-04-12T00:00:00+05:30",
    location: "Kantore Shiv Mandir",
    description: "Traditional opening rituals and sacred offerings.",
  },
  {
    title: "Devotional Procession",
    startAt: "2026-04-13T00:00:00+05:30",
    location: "Kantore Village Route",
    description: "Community procession with chants and drum performances.",
  },
  {
    title: "Closing Ceremony",
    startAt: "2026-04-15T00:00:00+05:30",
    location: "Temple Courtyard",
    description: "Final prayers and blessings for devotees and families.",
  },
];

export default function Events() {
  const [events, setEvents] = useState(FALLBACK_EVENTS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    async function loadEvents() {
      try {
        const response = await api.getEvents({ page: 1, limit: 50 });
        if (!mounted) return;
        if (Array.isArray(response?.data) && response.data.length) {
          setEvents(response.data);
          setError("");
        } else {
          setError("Live events are not available yet. Showing upcoming highlights.");
        }
      } catch {
        if (!mounted) return;
        setError("Could not load live events. Showing upcoming highlights.");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadEvents();
    return () => {
      mounted = false;
    };
  }, []);

  const formattedEvents = useMemo(
    () =>
      events.map((event) => ({
        ...event,
        date: new Date(event.startAt || event.date).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
      })),
    [events],
  );

  return (
    <main className="app-shell overflow-x-hidden min-h-screen">
      <SEO
        title="Festival Events"
        description="See the full schedule of Kantore Gajon Mala events, including opening rituals, procession, and closing ceremony."
        path="/events"
        image="/images/AC-2026-007.webp"
      />
      <Navbar />
      <section className="section-shell-with-nav">
        <div className="section-inner max-w-5xl">
          <h1 className="typo-h1 text-center mb-10">
            Events
          </h1>
          {loading && (
            <p className="text-center text-cyan-200/80 mb-6">Loading events...</p>
          )}
          {error && (
            <p className="text-center text-amber-300/90 mb-6">{error}</p>
          )}
          <div className="space-y-4">
            {formattedEvents.map((event) => (
              <article
                key={event._id || event.slug || event.title}
                className="bg-slate-900/70 border border-cyan-400/20 p-5 md:p-6 rounded-2xl"
              >
                <h2 className="typo-h3">{event.title}</h2>
                <p className="typo-small text-cyan-300 mt-1">{event.date}</p>
                <p className="typo-body text-gray-300 mt-2">
                  Location: {event.location}
                </p>
                <p className="typo-body text-gray-300 mt-2">
                  {event.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

