import { useEffect, useState } from "react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import imageData from "@/store/imageData.json";
import SEO from "@/components/shared/SEO";
import { api } from "@/lib/api";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary";

export default function Gallery() {
  const [images, setImages] = useState(imageData.images);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    let mounted = true;
    async function loadGallery() {
      try {
        const response = await api.getGallery({ page: 1, limit: 60 });
        if (!mounted) return;
        if (Array.isArray(response?.data) && response.data.length) {
          const mapped = response.data.map((item) => ({
            id: item._id,
            title: item.title,
            description: item.description || "",
            url: item.imageUrl,
            alt: item.alt || item.title,
          }));
          setImages(mapped);
          setStatusMessage("");
        } else {
          setStatusMessage("Live gallery is empty. Showing curated images.");
        }
      } catch {
        if (!mounted) return;
        setStatusMessage(
          "Could not load live gallery. Showing curated images.",
        );
      }
    }
    loadGallery();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="app-shell overflow-x-hidden min-h-screen">
      <SEO
        title="Festival Gallery"
        description="Browse sacred visuals and memorable moments from Kantore Gajon Mela in the official gallery."
        path="/gallery"
        image="/images/AC-2026-009.webp"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          name: "Kantore Gajon Mela Gallery",
          url: "https://kantore-gajon-Mela-web.vercel.app/gallery",
          description:
            "Browse sacred visuals and memorable moments from Kantore Gajon Mela in the official gallery.",
        }}
      />
      <Navbar />
      <section className="section-shell-with-nav">
        <div className="section-inner max-w-7xl">
          <h1 className="typo-h1 text-center text-white mb-3">
            Festival Gallery
          </h1>
          <p className="typo-body text-center text-cyan-100/80 max-w-2xl mx-auto mb-10">
            A collection of sacred frames from Kantore Gajon Mela.
          </p>
          {statusMessage && (
            <p className="text-center text-amber-300/90 mb-6">
              {statusMessage}
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {images.map((image) => (
              <article
                key={image.id}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-cyan-400/20 bg-slate-900/60 text-left"
              >
                <img
                  src={optimizeCloudinaryUrl(image.url, {
                    width: 900,
                    height: 600,
                    crop: "fill",
                  })}
                  alt={image.alt || image.title}
                  loading="lazy"
                  decoding="async"
                  className="block w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/55 text-white p-3">
                  <p className="typo-small">{image.title}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
