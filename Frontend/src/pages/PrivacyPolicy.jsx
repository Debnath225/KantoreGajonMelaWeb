import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import SEO from "@/components/shared/SEO";

export default function PrivacyPolicy() {
  return (
    <main className="app-shell overflow-x-hidden min-h-screen">
      <SEO
        title="Privacy Policy"
        description="Read the privacy practices for the Kantore Gajon Mela website, including form data and cookie preferences."
        path="/privacy-policy"
      />
      <Navbar />
      <section className="section-shell-with-nav">
        <div className="section-inner max-w-4xl rounded-3xl border border-cyan-400/20 bg-slate-950/70 p-6 md:p-8">
          <h1 className="typo-h1 mb-6">Privacy Policy</h1>
          <div className="typo-body space-y-4 text-gray-300">
            <p>
              We respect your privacy and only collect essential data needed to
              improve your experience on the Kantore Gajon Mela website.
            </p>
            <p>
              Personal information submitted through forms is used for
              communication and support, and is never sold to third parties.
            </p>
            <p>
              This website also uses essential cookies for core functionality,
              and optional analytics/marketing cookies only with your consent.
              You can change cookie preferences anytime from the Cookie Settings
              button.
            </p>
            <p>
              By using this website, you agree to this privacy policy and any
              updates published here.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
