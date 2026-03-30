import { rateLimit } from "express-rate-limit";
import { slowDown } from "express-slow-down";

const jsonHandler = (_req, res) =>
  res.status(429).json({
    success: false,
    message: "Too many requests. Please try again shortly.",
  });

export const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: true,
  legacyHeaders: false,
  handler: jsonHandler,
});

export const strictWriteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  handler: jsonHandler,
});

export const burstSlowDown = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 60,
  delayMs: () => 150,
});
