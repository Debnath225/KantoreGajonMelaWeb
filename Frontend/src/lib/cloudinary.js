const CLOUDINARY_SEGMENT = "/upload/";

export function isCloudinaryUrl(url = "") {
  return /res\.cloudinary\.com/i.test(url);
}

export function optimizeCloudinaryUrl(url, options = {}) {
  if (!url || !isCloudinaryUrl(url) || !url.includes(CLOUDINARY_SEGMENT)) {
    return url;
  }

  const {
    width,
    height,
    crop = "fill",
    quality = "auto",
    format = "auto",
    dpr = "auto",
  } = options;

  const transforms = [`f_${format}`, `q_${quality}`, `dpr_${dpr}`];
  if (width) transforms.push(`w_${Math.max(1, Number(width))}`);
  if (height) transforms.push(`h_${Math.max(1, Number(height))}`);
  if (width || height) transforms.push(`c_${crop}`);

  const [prefix, suffix] = url.split(CLOUDINARY_SEGMENT);
  return `${prefix}${CLOUDINARY_SEGMENT}${transforms.join(",")}/${suffix}`;
}
