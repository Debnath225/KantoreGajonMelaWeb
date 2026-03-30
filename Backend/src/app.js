import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import { env } from "./config/env.js";
import {
  burstSlowDown,
  globalRateLimiter,
} from "./middlewares/rateLimiters.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";
import { sanitizeInput } from "./middlewares/sanitizeInput.js";
import publicRoutes from "./routes/publicRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.set("trust proxy", 1);
app.disable("x-powered-by");

app.use(
  cors({
    origin: env.clientOrigin || env.clientOrigin2,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "x-api-key", "Authorization"],
    credentials: false,
    maxAge: 600,
  }),
);
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: false,
  }),
);
app.use(compression());
app.use(hpp());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ extended: false, limit: "20kb" }));
app.use(sanitizeInput);
app.use(globalRateLimiter);
app.use(burstSlowDown);
app.use(morgan(env.isProd ? "combined" : "dev"));

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Kantore API running",
    docs: "/api/v1/health",
  });
});

app.use("/api/v1", publicRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin", adminRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
