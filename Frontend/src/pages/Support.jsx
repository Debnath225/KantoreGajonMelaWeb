import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import SEO from "@/components/shared/SEO";

export default function Support() {
  return (
    <main className="app-shell overflow-x-hidden min-h-screen">
      <SEO
        title="Support"
        description="Get help for website access, festival information, and contact details for the Kantore Gajon Mala team."
        path="/support"
      />
      <Navbar />
      <section className="section-shell-with-nav">
        <div className="section-inner max-w-4xl rounded-3xl border border-cyan-400/20 bg-slate-950/70 p-6 md:p-8">
          <h1 className="typo-h1 mb-6">Support</h1>
          <div className="typo-body space-y-4 text-gray-300">
            <p>
              Need help with website access, festival information, or content
              feedback? We are here to support you.
            </p>
            <p>
              Email us at <a className="text-cyan-300" href="mailto:info@mahadeumala.com">info@mahadeumala.com</a> or
              call <a className="text-cyan-300" href="tel:1234567890"> +91 1234567890</a>.
            </p>
            <p>
              We usually respond within 24-48 hours.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

