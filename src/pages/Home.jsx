import Background from "@/components/common/Background";
import ContactMe from "@/components/common/ContactMe";
import CTA from "@/components/common/CTA";
import ExploreKantore from "@/components/common/ExploreKantore";
import FAQSection from "@/components/common/FAQSection";
import Footer from "@/components/common/Footer";
import Hero from "@/components/common/Hero";
import Loader from "@/components/common/Loader";
import Map from "@/components/common/Map";
import Navbar from "@/components/common/Navbar";

export default function Home() {
  return (
    <>
      {/* <Loader /> */}

      <Navbar />
      <Hero />
      <ExploreKantore />
      <CTA />
      <Map />
      <FAQSection />
      <ContactMe />
      <Footer />
    </>
  );
}
