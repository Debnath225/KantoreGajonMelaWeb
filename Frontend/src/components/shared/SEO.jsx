import { useEffect } from "react";

const SITE_NAME = "Kantore Gajon Mela";
const SITE_URL = "https://kantore-gajon-Mela-web.vercel.app";
const DEFAULT_IMAGE = `${SITE_URL}/images/AC-2026-001.webp`;

function setOrCreateMeta(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

function setCanonical(url) {
  let canonical = document.head.querySelector("link[rel='canonical']");
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute("href", url);
}

function setJsonLd(jsonLd) {
  const id = "route-jsonld";
  let script = document.getElementById(id);
  if (!script) {
    script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(jsonLd);
}

export default function SEO({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  noindex = false,
  jsonLd,
}) {
  useEffect(() => {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    const canonicalUrl = `${SITE_URL}${normalizedPath}`;
    const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;
    const fullTitle = `${title} | ${SITE_NAME}`;

    document.title = fullTitle;
    setCanonical(canonicalUrl);

    setOrCreateMeta("meta[name='description']", {
      name: "description",
      content: description,
    });
    setOrCreateMeta("meta[name='robots']", {
      name: "robots",
      content: noindex ? "noindex, nofollow" : "index, follow",
    });
    setOrCreateMeta("meta[name='googlebot']", {
      name: "googlebot",
      content: noindex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large",
    });

    setOrCreateMeta("meta[property='og:type']", {
      property: "og:type",
      content: "website",
    });
    setOrCreateMeta("meta[property='og:site_name']", {
      property: "og:site_name",
      content: SITE_NAME,
    });
    setOrCreateMeta("meta[property='og:title']", {
      property: "og:title",
      content: fullTitle,
    });
    setOrCreateMeta("meta[property='og:description']", {
      property: "og:description",
      content: description,
    });
    setOrCreateMeta("meta[property='og:url']", {
      property: "og:url",
      content: canonicalUrl,
    });
    setOrCreateMeta("meta[property='og:image']", {
      property: "og:image",
      content: imageUrl,
    });

    setOrCreateMeta("meta[name='twitter:card']", {
      name: "twitter:card",
      content: "summary_large_image",
    });
    setOrCreateMeta("meta[name='twitter:title']", {
      name: "twitter:title",
      content: fullTitle,
    });
    setOrCreateMeta("meta[name='twitter:description']", {
      name: "twitter:description",
      content: description,
    });
    setOrCreateMeta("meta[name='twitter:image']", {
      name: "twitter:image",
      content: imageUrl,
    });

    if (jsonLd) {
      setJsonLd(jsonLd);
    }
  }, [description, image, jsonLd, noindex, path, title]);

  return null;
}
