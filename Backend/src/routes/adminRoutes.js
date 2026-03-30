import { Router } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { requireAdminAccess } from "../middlewares/auth.js";
import { validateBody } from "../middlewares/validate.js";
import {
  eventSchema,
  faqSchema,
  galleryItemSchema,
  mediaUploadSignatureSchema,
} from "../validation/schemas.js";
import {
  adminCreateEvent,
  adminCreateFaq,
  adminCreateGallery,
  adminDeleteEvent,
  adminDeleteFaq,
  adminDeleteGallery,
  adminListContacts,
  adminListEvents,
  adminListFaqs,
  adminListGallery,
  adminListQuestions,
  adminListSubscribers,
  adminUpdateEvent,
  adminUpdateFaq,
  adminUpdateGallery,
} from "../controllers/adminController.js";
import { createUploadSignature } from "../controllers/mediaController.js";

const router = Router();

router.use(requireAdminAccess);

router.get("/events", asyncHandler(adminListEvents));
router.post("/events", validateBody(eventSchema), asyncHandler(adminCreateEvent));
router.put("/events/:id", validateBody(eventSchema), asyncHandler(adminUpdateEvent));
router.delete("/events/:id", asyncHandler(adminDeleteEvent));

router.get("/gallery", asyncHandler(adminListGallery));
router.post("/gallery", validateBody(galleryItemSchema), asyncHandler(adminCreateGallery));
router.put("/gallery/:id", validateBody(galleryItemSchema), asyncHandler(adminUpdateGallery));
router.delete("/gallery/:id", asyncHandler(adminDeleteGallery));

router.get("/faqs", asyncHandler(adminListFaqs));
router.post("/faqs", validateBody(faqSchema), asyncHandler(adminCreateFaq));
router.put("/faqs/:id", validateBody(faqSchema), asyncHandler(adminUpdateFaq));
router.delete("/faqs/:id", asyncHandler(adminDeleteFaq));

router.get("/contacts", asyncHandler(adminListContacts));
router.get("/subscribers", asyncHandler(adminListSubscribers));
router.get("/questions", asyncHandler(adminListQuestions));
router.post(
  "/media/sign-upload",
  validateBody(mediaUploadSignatureSchema),
  asyncHandler(createUploadSignature),
);

export default router;
