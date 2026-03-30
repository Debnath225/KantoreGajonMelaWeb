import { ZodError } from "zod";
import { env } from "../config/env.js";

export function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}

export function errorHandler(err, req, res, _next) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  const statusCode = Number(err.statusCode || 500);
  const response = {
    success: false,
    message: err.message || "Internal server error",
  };

  if (err.details) {
    response.details = err.details;
  }

  if (!env.isProd) {
    response.stack = err.stack;
    response.path = req.originalUrl;
  }

  return res.status(statusCode).json(response);
}
