import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";

export function requireAuth(req, _res, next) {
  const header = req.header("authorization") || req.header("Authorization");
  if (!header || !header.startsWith("Bearer ")) {
    return next(new ApiError(401, "Missing Bearer token"));
  }

  const token = header.slice("Bearer ".length).trim();
  try {
    const payload = jwt.verify(token, env.jwtSecret);
    req.auth = {
      userId: payload.sub,
      role: payload.role,
      email: payload.email,
    };
    return next();
  } catch {
    return next(new ApiError(401, "Invalid or expired token"));
  }
}
