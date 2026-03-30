function sanitizeObject(obj) {
  if (!obj || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(sanitizeObject);

  for (const key of Object.keys(obj)) {
    const unsafeKey =
      key.startsWith("$") ||
      key.includes(".") ||
      key === "__proto__" ||
      key === "constructor" ||
      key === "prototype";

    if (unsafeKey) {
      delete obj[key];
      continue;
    }

    obj[key] = sanitizeObject(obj[key]);
  }

  return obj;
}

export function sanitizeInput(req, _res, next) {
  if (req.body && typeof req.body === "object") sanitizeObject(req.body);
  if (req.query && typeof req.query === "object") sanitizeObject(req.query);
  if (req.params && typeof req.params === "object") sanitizeObject(req.params);
  next();
}
