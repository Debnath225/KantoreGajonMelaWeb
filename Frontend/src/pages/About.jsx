import AboutHero from "@/components/sections/AboutHero";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import SEO from "@/components/shared/SEO";

function About() {
  return (
    <main className="app-shell overflow-x-hidden">
      <SEO
        title="About Kantore Gajon Mela"
        description="Learn about the heritage, devotion, and spiritual significance of Kantore Gajon Mela and Kantore Shiv Mandir."
        path="/about"
        image="/images/AC-2026-004.webp"
      />
      <Navbar />
      <AboutHero />
      <Footer />
    </main>
  );
}

export default About;
