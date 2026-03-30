import { Router } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { validateBody, validateQuery } from "../middlewares/validate.js";
import { strictWriteLimiter } from "../middlewares/rateLimiters.js";
import {
  contactSchema,
  userMediaUploadSignatureSchema,
  newsletterSchema,
  paginationQuerySchema,
  questionSchema,
} from "../validation/schemas.js";
import {
  createContact,
  createQuestion,
  getEvents,
  getFaqs,
  getGallery,
  getHealth,
  subscribeNewsletter,
} from "../controllers/publicController.js";
import { requireAuth } from "../middlewares/authJwt.js";
import { createUserUploadSignature } from "../controllers/mediaController.js";

const router = Router();

router.get("/health", asyncHandler(getHealth));
router.get("/events", validateQuery(paginationQuerySchema), asyncHandler(getEvents));
router.get("/gallery", validateQuery(paginationQuerySchema), asyncHandler(getGallery));
router.get("/faqs", asyncHandler(getFaqs));

router.post(
  "/contact",
  strictWriteLimiter,
  validateBody(contactSchema),
  asyncHandler(createContact),
);
router.post(
  "/questions",
  strictWriteLimiter,
  validateBody(questionSchema),
  asyncHandler(createQuestion),
);
router.post(
  "/newsletter/subscribe",
  strictWriteLimiter,
  validateBody(newsletterSchema),
  asyncHandler(subscribeNewsletter),
);
router.post(
  "/media/sign-upload",
  strictWriteLimiter,
  requireAuth,
  validateBody(userMediaUploadSignatureSchema),
  asyncHandler(createUserUploadSignature),
);

export default router;
