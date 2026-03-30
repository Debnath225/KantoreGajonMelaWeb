import { Router } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { validateBody } from "../middlewares/validate.js";
import { strictWriteLimiter } from "../middlewares/rateLimiters.js";
import { loginSchema, signupSchema } from "../validation/schemas.js";
import { login, me, signup } from "../controllers/authController.js";
import { requireAuth } from "../middlewares/authJwt.js";

const router = Router();

router.post(
  "/signup",
  strictWriteLimiter,
  validateBody(signupSchema),
  asyncHandler(signup),
);

router.post(
  "/login",
  strictWriteLimiter,
  validateBody(loginSchema),
  asyncHandler(login),
);

router.get("/me", requireAuth, asyncHandler(me));

export default router;
