import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import SEO from "@/components/shared/SEO";

export default function TermsOfService() {
  return (
    <main className="app-shell overflow-x-hidden min-h-screen">
      <SEO
        title="Terms of Service"
        description="Read the terms and conditions for using the Kantore Gajon Mela website and its content."
        path="/terms-of-service"
      />
      <Navbar />
      <section className="section-shell-with-nav">
        <div className="section-inner max-w-4xl rounded-3xl border border-cyan-400/20 bg-slate-950/70 p-6 md:p-8">
          <h1 className="typo-h1 mb-6">Terms Of Service</h1>
          <div className="typo-body space-y-4 text-gray-300">
            <p>
              This website is intended for informational and cultural purposes.
              Content may be updated periodically for accuracy and relevance.
            </p>
            <p>
              By using this site, you agree not to misuse content, submit
              harmful data, or disrupt website functionality.
            </p>
            <p>
              Continued use of the website indicates acceptance of these terms.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
