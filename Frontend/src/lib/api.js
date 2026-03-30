const API_BASE = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1"
).replace(/\/+$/, "");

async function request(path, options = {}) {
  const url = `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const message = payload?.message || "Request failed";
    throw new Error(message);
  }
  return payload;
}

function adminRequest(path, apiKey, options = {}) {
  return request(`/admin${path.startsWith("/") ? path : `/${path}`}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      "x-api-key": apiKey,
    },
  });
}

function authRequest(path, token, options = {}) {
  return request(path, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });
}

export const api = {
  authSignup: (body) =>
    request("/auth/signup", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  authLogin: (body) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  authMe: (token) =>
    request("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getEvents: (params = {}) => {
    const query = new URLSearchParams({
      page: String(params.page || 1),
      limit: String(params.limit || 12),
    });
    return request(`/events?${query.toString()}`);
  },
  getGallery: (params = {}) => {
    const query = new URLSearchParams({
      page: String(params.page || 1),
      limit: String(params.limit || 30),
    });
    return request(`/gallery?${query.toString()}`);
  },
  getFaqs: () => request("/faqs"),
  submitContact: (body) =>
    request("/contact", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  submitQuestion: (body) =>
    request("/questions", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  subscribeNewsletter: (body) =>
    request("/newsletter/subscribe", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  userCreateUploadSignature: (token, body = {}) =>
    authRequest("/media/sign-upload", token, {
      method: "POST",
      body: JSON.stringify(body),
    }),
  adminListEvents: (apiKey) => adminRequest("/events", apiKey),
  adminCreateEvent: (apiKey, body) =>
    adminRequest("/events", apiKey, {
      method: "POST",
      body: JSON.stringify(body),
    }),
  adminUpdateEvent: (apiKey, id, body) =>
    adminRequest(`/events/${id}`, apiKey, {
      method: "PUT",
      body: JSON.stringify(body),
    }),
  adminDeleteEvent: (apiKey, id) =>
    adminRequest(`/events/${id}`, apiKey, { method: "DELETE" }),
  adminListGallery: (apiKey) => adminRequest("/gallery", apiKey),
  adminCreateGallery: (apiKey, body) =>
    adminRequest("/gallery", apiKey, {
      method: "POST",
      body: JSON.stringify(body),
    }),
  adminUpdateGallery: (apiKey, id, body) =>
    adminRequest(`/gallery/${id}`, apiKey, {
      method: "PUT",
      body: JSON.stringify(body),
    }),
  adminDeleteGallery: (apiKey, id) =>
    adminRequest(`/gallery/${id}`, apiKey, { method: "DELETE" }),
  adminListFaqs: (apiKey) => adminRequest("/faqs", apiKey),
  adminCreateFaq: (apiKey, body) =>
    adminRequest("/faqs", apiKey, {
      method: "POST",
      body: JSON.stringify(body),
    }),
  adminUpdateFaq: (apiKey, id, body) =>
    adminRequest(`/faqs/${id}`, apiKey, {
      method: "PUT",
      body: JSON.stringify(body),
    }),
  adminDeleteFaq: (apiKey, id) =>
    adminRequest(`/faqs/${id}`, apiKey, { method: "DELETE" }),
  adminCreateUploadSignature: (apiKey, body = {}) =>
    adminRequest("/media/sign-upload", apiKey, {
      method: "POST",
      body: JSON.stringify(body),
    }),
};

export { API_BASE };
