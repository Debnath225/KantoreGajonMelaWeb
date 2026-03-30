import { lazy, Suspense } from "react";
import { motion, useReducedMotion } from "framer-motion";
import ContactMe from "@/components/sections/ContactMe";
import Coundown from "@/components/sections/Coundown";
import Hero from "@/components/sections/Hero";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/shared/ScrollProgress";
import SectionReveal from "@/components/shared/SectionReveal";
import SEO from "@/components/shared/SEO";
const StatsSection = lazy(() => import("@/components/sections/StatsSection"));
const RitualHighlights = lazy(
  () => import("@/components/sections/RitualHighlights"),
);
const NewsletterSection = lazy(
  () => import("@/components/sections/NewsletterSection"),
);

const ExploreKantore = lazy(
  () => import("@/components/sections/ExploreKantore"),
);
const CTA = lazy(() => import("@/components/sections/CTA"));
const Map = lazy(() => import("@/components/sections/Map"));
const FAQSection = lazy(() => import("@/components/sections/FAQSection"));
const TeamSection = lazy(() => import("@/components/sections/TeamSection"));
const TimelineSection = lazy(
  () => import("@/components/sections/TimelineSection"),
);
const UserMediaUpload = lazy(
  () => import("@/components/sections/UserMediaUpload"),
);

function SectionSkeleton({ height = "h-48" }) {
  return (
    <div className={`w-full ${height} px-4 md:px-8 py-6`}>
      <div className="max-w-7xl mx-auto rounded-2xl bg-slate-900/50 border border-white/10 h-full animate-pulse" />
    </div>
  );
}

export default function Home() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.main
      initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="app-shell overflow-x-hidden"
    >
      <SEO
        title="Kantore Gajon Mela 2026"
        description="Official website of Kantore Gajon Mela with festival countdown, rituals, gallery, events, and contact details."
        path="/"
        image="/images/AC-2026-001.webp"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Kantore Gajon Mela 2026",
          url: "https://kantore-gajon-Mela-web.vercel.app/",
          description:
            "Official website of Kantore Gajon Mela with festival countdown, rituals, gallery, events, and contact details.",
          inLanguage: "en-IN",
        }}
      />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <SectionReveal>
        <Coundown target="2026-04-12T00:00:00+05:30" />
      </SectionReveal>
      <SectionReveal delay={0.02}>
        <Suspense fallback={<SectionSkeleton height="h-64" />}>
          <StatsSection />
        </Suspense>
      </SectionReveal>

      <SectionReveal delay={0.03}>
        <Suspense fallback={<SectionSkeleton height="h-72" />}>
          <ExploreKantore />
        </Suspense>
      </SectionReveal>
      <SectionReveal delay={0.04}>
        <Suspense fallback={<SectionSkeleton height="h-64" />}>
          <RitualHighlights />
        </Suspense>
      </SectionReveal>
      <SectionReveal delay={0.05}>
        <Suspense fallback={<SectionSkeleton height="h-80" />}>
          <CTA />
        </Suspense>
      </SectionReveal>
      <SectionReveal delay={0.06}>
        <Suspense fallback={<SectionSkeleton height="h-72" />}>
          <Map />
        </Suspense>
      </SectionReveal>
      <SectionReveal delay={0.065}>
        <Suspense fallback={<SectionSkeleton height="h-64" />}>
          <UserMediaUpload />
        </Suspense>
      </SectionReveal>
      <SectionReveal delay={0.07}>
        <Suspense fallback={<SectionSkeleton height="h-80" />}>
          <FAQSection />
        </Suspense>
      </SectionReveal>
      <SectionReveal delay={0.08}>
        <Suspense fallback={<SectionSkeleton height="h-72" />}>
          <TeamSection />
        </Suspense>
      </SectionReveal>
      <SectionReveal delay={0.09}>
        <Suspense fallback={<SectionSkeleton height="h-72" />}>
          <TimelineSection />
        </Suspense>
      </SectionReveal>

      <SectionReveal delay={0.1}>
        <ContactMe />
      </SectionReveal>
      <SectionReveal delay={0.11}>
        <Suspense fallback={<SectionSkeleton height="h-56" />}>
          <NewsletterSection />
        </Suspense>
      </SectionReveal>
      <Footer />
    </motion.main>
  );
}
