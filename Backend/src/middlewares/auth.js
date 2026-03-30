import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";

export function requireAdminAccess(req, _res, next) {
  const incoming = req.header("x-api-key");
  if (incoming && incoming === env.adminApiKey) {
    req.adminAuth = { via: "api_key" };
    return next();
  }

  const header = req.header("authorization") || req.header("Authorization");
  if (!header || !header.startsWith("Bearer ")) {
    return next(new ApiError(401, "Unauthorized"));
  }

  const token = header.slice("Bearer ".length).trim();
  try {
    const payload = jwt.verify(token, env.jwtSecret);
    if (payload?.role !== "admin") {
      return next(new ApiError(403, "Admin access required"));
    }
    req.adminAuth = {
      via: "jwt",
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
    return next();
  } catch {
    return next(new ApiError(401, "Invalid or expired admin token"));
  }
}
