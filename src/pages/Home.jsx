import Background from "@/components/common/Background";
import CTA from "@/components/common/CTA";
import Footer from "@/components/common/Footer";
import Hero from "@/components/common/Hero";
import Loader from "@/components/common/Loader";
import Navbar from "@/components/common/Navbar";

export default function Home() {
  return (
    <>
      {/* <Loader /> */}

      <Navbar />
      <Hero />
      <CTA />
      <Footer />
    </>
  );
}
