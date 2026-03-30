import { z } from "zod";

const email = z.string().trim().email().max(160);
const safeText = (max) =>
  z
    .string()
    .trim()
    .min(1)
    .max(max)
    .refine((value) => !/[<>]/.test(value), "Invalid characters detected");

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).max(100).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(12),
});

export const contactSchema = z.object({
  fullName: safeText(120),
  email,
  message: safeText(2000),
});

export const questionSchema = z.object({
  name: safeText(120),
  email,
  question: safeText(2000),
});

export const newsletterSchema = z.object({
  email,
  source: z.string().trim().max(80).optional().default("website"),
});

export const eventSchema = z.object({
  title: safeText(140),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9-]+$/, "Slug must contain lowercase letters, numbers and hyphens")
    .max(180),
  description: safeText(1000),
  location: safeText(200),
  startAt: z.string().datetime({ offset: true }),
  endAt: z.string().datetime({ offset: true }).optional(),
  isPublished: z.boolean().optional().default(true),
});

export const galleryItemSchema = z.object({
  title: safeText(140),
  description: z.string().trim().max(1000).optional().default(""),
  imageUrl: z.string().trim().url().max(1000),
  alt: safeText(180),
  tags: z.array(z.string().trim().toLowerCase().max(40)).max(12).optional().default([]),
  isPublished: z.boolean().optional().default(true),
});

export const faqSchema = z.object({
  question: safeText(220),
  answer: safeText(2000),
  order: z.number().int().min(0).max(10000).optional().default(0),
  isPublished: z.boolean().optional().default(true),
});

export const signupSchema = z.object({
  fullName: safeText(120),
  email,
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password is too long")
    .regex(/[A-Z]/, "Password must include at least one uppercase letter")
    .regex(/[a-z]/, "Password must include at least one lowercase letter")
    .regex(/[0-9]/, "Password must include at least one number"),
});

export const loginSchema = z.object({
  email,
  password: z.string().min(1, "Password is required").max(72),
});

export const mediaUploadSignatureSchema = z.object({
  folder: z.string().trim().max(120).optional(),
});

export const userMediaUploadSignatureSchema = z.object({
  mediaType: z.enum(["image", "video", "auto"]).optional().default("image"),
});
