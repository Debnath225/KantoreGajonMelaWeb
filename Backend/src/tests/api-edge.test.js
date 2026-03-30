import test from "node:test";
import assert from "node:assert/strict";
import jwt from "jsonwebtoken";

process.env.NODE_ENV = "test";
process.env.MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/kantore-test";
process.env.CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";
process.env.ADMIN_API_KEY = process.env.ADMIN_API_KEY || "test-admin-key";
process.env.JWT_SECRET = process.env.JWT_SECRET || "test-jwt-secret";
process.env.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
process.env.CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || "demo";
process.env.CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || "demo-key";
process.env.CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || "demo-secret";
process.env.CLOUDINARY_UPLOAD_FOLDER =
  process.env.CLOUDINARY_UPLOAD_FOLDER || "kantore";

const { default: app } = await import("../app.js");

let server;
let baseUrl;

test.before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, resolve);
  });
  const address = server.address();
  baseUrl = `http://127.0.0.1:${address.port}/api/v1`;
});

test.after(async () => {
  await new Promise((resolve, reject) => {
    server.close((err) => (err ? reject(err) : resolve()));
  });
});

async function request(path, { method = "GET", headers = {}, body } = {}) {
  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  let json = null;
  try {
    json = await res.json();
  } catch {
    json = null;
  }
  return { status: res.status, body: json };
}

test("signup invalid email returns 400", async () => {
  const res = await request("/auth/signup", {
    method: "POST",
    body: {
      fullName: "Edge User",
      email: "bad-email",
      password: "StrongPass123",
    },
  });
  assert.equal(res.status, 400);
});

test("signup weak password returns 400", async () => {
  const res = await request("/auth/signup", {
    method: "POST",
    body: {
      fullName: "Edge User",
      email: "weak@example.com",
      password: "weak",
    },
  });
  assert.equal(res.status, 400);
});

test("login invalid email payload returns 400", async () => {
  const res = await request("/auth/login", {
    method: "POST",
    body: {
      email: "not-an-email",
      password: "StrongPass123",
    },
  });
  assert.equal(res.status, 400);
});

test("auth/me without token returns 401", async () => {
  const res = await request("/auth/me");
  assert.equal(res.status, 401);
});

test("auth/me with malformed token returns 401", async () => {
  const res = await request("/auth/me", {
    headers: { Authorization: "Bearer not-a-token" },
  });
  assert.equal(res.status, 401);
});

test("events invalid page query returns 400", async () => {
  const res = await request("/events?page=0&limit=5");
  assert.equal(res.status, 400);
});

test("events invalid limit query returns 400", async () => {
  const res = await request("/events?page=1&limit=999");
  assert.equal(res.status, 400);
});

test("gallery invalid limit query returns 400", async () => {
  const res = await request("/gallery?page=1&limit=-2");
  assert.equal(res.status, 400);
});

test("contact missing message returns 400", async () => {
  const res = await request("/contact", {
    method: "POST",
    body: {
      fullName: "Edge Contact",
      email: "edge.contact@example.com",
      message: "",
    },
  });
  assert.equal(res.status, 400);
});

test("newsletter invalid email returns 400", async () => {
  const res = await request("/newsletter/subscribe", {
    method: "POST",
    body: {
      email: "bad-email",
      source: "test",
    },
  });
  assert.equal(res.status, 400);
});

test("admin route without auth returns 401", async () => {
  const res = await request("/admin/events");
  assert.equal(res.status, 401);
});

test("admin route with wrong api key returns 401", async () => {
  const res = await request("/admin/events", {
    headers: { "x-api-key": "wrong-key" },
  });
  assert.equal(res.status, 401);
});

test("admin route with non-admin jwt returns 403", async () => {
  const userToken = jwt.sign(
    { sub: "u1", role: "user", email: "user@example.com" },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );
  const res = await request("/admin/events", {
    headers: { Authorization: `Bearer ${userToken}` },
  });
  assert.equal(res.status, 403);
});

test("admin create event invalid slug returns 400", async () => {
  const res = await request("/admin/events", {
    method: "POST",
    headers: { "x-api-key": process.env.ADMIN_API_KEY },
    body: {
      title: "Bad Slug Event",
      slug: "Bad Slug!",
      description: "desc",
      location: "loc",
      startAt: "2026-04-12T05:30:00.000Z",
      endAt: "2026-04-12T08:30:00.000Z",
      isPublished: true,
    },
  });
  assert.equal(res.status, 400);
});

test("admin create gallery invalid image url returns 400", async () => {
  const res = await request("/admin/gallery", {
    method: "POST",
    headers: { "x-api-key": process.env.ADMIN_API_KEY },
    body: {
      title: "Bad Gallery",
      description: "desc",
      imageUrl: "not-a-url",
      alt: "alt",
      tags: ["rest"],
      isPublished: true,
    },
  });
  assert.equal(res.status, 400);
});

test("admin create faq invalid order returns 400", async () => {
  const res = await request("/admin/faqs", {
    method: "POST",
    headers: { "x-api-key": process.env.ADMIN_API_KEY },
    body: {
      question: "FAQ?",
      answer: "Answer text",
      order: -1,
      isPublished: true,
    },
  });
  assert.equal(res.status, 400);
});

test("admin media sign unauthorized returns 401", async () => {
  const res = await request("/admin/media/sign-upload", {
    method: "POST",
    body: { folder: "kantore/gallery" },
  });
  assert.equal(res.status, 401);
});

test("admin media sign folder too long returns 400", async () => {
  const res = await request("/admin/media/sign-upload", {
    method: "POST",
    headers: { "x-api-key": process.env.ADMIN_API_KEY },
    body: { folder: "a".repeat(130) },
  });
  assert.equal(res.status, 400);
});

test("user media sign upload unauthorized returns 401", async () => {
  const res = await request("/media/sign-upload", {
    method: "POST",
    body: { mediaType: "image" },
  });
  assert.equal(res.status, 401);
});

test("user media sign upload invalid media type returns 400", async () => {
  const userToken = jwt.sign(
    { sub: "u-edge", role: "user", email: "edge.user@example.com" },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );
  const res = await request("/media/sign-upload", {
    method: "POST",
    headers: { Authorization: `Bearer ${userToken}` },
    body: { mediaType: "document" },
  });
  assert.equal(res.status, 400);
});

test("user media sign upload valid token returns 200", async () => {
  const userToken = jwt.sign(
    { sub: "u-edge", role: "user", email: "edge.user@example.com" },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );
  const res = await request("/media/sign-upload", {
    method: "POST",
    headers: { Authorization: `Bearer ${userToken}` },
    body: { mediaType: "video" },
  });
  assert.equal(res.status, 200);
  assert.equal(Boolean(res.body?.data?.signature), true);
  assert.equal(Boolean(res.body?.data?.uploadUrl), true);
});
