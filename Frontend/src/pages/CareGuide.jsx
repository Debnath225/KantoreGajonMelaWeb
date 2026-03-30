import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import SEO from "@/components/shared/SEO";

export default function CareGuide() {
  return (
    <main className="app-shell overflow-x-hidden min-h-screen">
      <SEO
        title="Care Guide"
        description="Care guide for preserving mala quality with proper storage, cleaning, and maintenance practices."
        path="/care-guide"
      />
      <Navbar />
      <section className="section-shell-with-nav">
        <div className="section-inner max-w-4xl rounded-3xl border border-cyan-400/20 bg-slate-950/70 p-6 md:p-8">
          <h1 className="typo-h1 mb-6">Care Guide</h1>
          <ul className="typo-body text-gray-300 space-y-3 list-disc pl-5">
            <li>Keep your mala in a clean, dry place when not in use.</li>
            <li>Avoid harsh chemicals or prolonged water exposure.</li>
            <li>Use a soft cloth to clean beads gently.</li>
            <li>Store separately to prevent scratches and thread damage.</li>
            <li>Handle with devotion and regular mindful maintenance.</li>
          </ul>
        </div>
      </section>
      <Footer />
    </main>
  );
}

