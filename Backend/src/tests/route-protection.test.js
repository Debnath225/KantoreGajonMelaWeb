import test from "node:test";
import assert from "node:assert/strict";
import jwt from "jsonwebtoken";

process.env.MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/kantore-test";
process.env.ADMIN_API_KEY = process.env.ADMIN_API_KEY || "test-admin-key";
process.env.JWT_SECRET = process.env.JWT_SECRET || "test-jwt-secret";
process.env.CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || "demo";
process.env.CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || "demo-key";
process.env.CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || "demo-secret";

const { requireAuth } = await import("../middlewares/authJwt.js");
const { requireAdminAccess } = await import("../middlewares/auth.js");
const { ApiError } = await import("../utils/ApiError.js");

function runMiddleware(middleware, req = {}) {
  return new Promise((resolve) => {
    middleware(
      req,
      {},
      (err) => {
        resolve(err || null);
      },
    );
  });
}

test("requireAuth rejects missing bearer token", async () => {
  const req = { header: () => undefined };
  const err = await runMiddleware(requireAuth, req);
  assert.ok(err instanceof ApiError);
  assert.equal(err.statusCode, 401);
});

test("requireAuth accepts valid bearer token", async () => {
  const token = jwt.sign(
    { sub: "u123", role: "user", email: "u@example.com" },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );
  const req = {
    header: (name) => (name.toLowerCase() === "authorization" ? `Bearer ${token}` : undefined),
  };
  const err = await runMiddleware(requireAuth, req);
  assert.equal(err, null);
  assert.equal(req.auth.userId, "u123");
  assert.equal(req.auth.role, "user");
});

test("requireAdminAccess accepts valid x-api-key", async () => {
  const req = {
    header: (name) => (name.toLowerCase() === "x-api-key" ? process.env.ADMIN_API_KEY : undefined),
  };
  const err = await runMiddleware(requireAdminAccess, req);
  assert.equal(err, null);
  assert.equal(req.adminAuth.via, "api_key");
});

test("requireAdminAccess accepts admin JWT", async () => {
  const token = jwt.sign(
    { sub: "a1", role: "admin", email: "admin@example.com" },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );
  const req = {
    header: (name) => {
      const key = name.toLowerCase();
      if (key === "authorization") return `Bearer ${token}`;
      return undefined;
    },
  };
  const err = await runMiddleware(requireAdminAccess, req);
  assert.equal(err, null);
  assert.equal(req.adminAuth.via, "jwt");
  assert.equal(req.adminAuth.role, "admin");
});

test("requireAdminAccess rejects non-admin JWT", async () => {
  const token = jwt.sign(
    { sub: "u1", role: "user", email: "user@example.com" },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );
  const req = {
    header: (name) => (name.toLowerCase() === "authorization" ? `Bearer ${token}` : undefined),
  };
  const err = await runMiddleware(requireAdminAccess, req);
  assert.ok(err instanceof ApiError);
  assert.equal(err.statusCode, 403);
});
