import { Event } from "../models/Event.js";
import { GalleryItem } from "../models/GalleryItem.js";
import { Faq } from "../models/Faq.js";
import { ContactMessage } from "../models/ContactMessage.js";
import { Subscriber } from "../models/Subscriber.js";
import { Question } from "../models/Question.js";
import { ApiError } from "../utils/ApiError.js";

export async function getHealth(_req, res) {
  res.json({
    success: true,
    message: "API healthy",
    timestamp: new Date().toISOString(),
  });
}

export async function getEvents(req, res) {
  const { page, limit } = req.validatedQuery;
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    Event.find({ isPublished: true }).sort({ startAt: 1 }).skip(skip).limit(limit).lean(),
    Event.countDocuments({ isPublished: true }),
  ]);

  res.json({ success: true, data: items, meta: { page, limit, total } });
}

export async function getGallery(req, res) {
  const { page, limit } = req.validatedQuery;
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    GalleryItem.find({ isPublished: true }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    GalleryItem.countDocuments({ isPublished: true }),
  ]);

  res.json({ success: true, data: items, meta: { page, limit, total } });
}

export async function getFaqs(_req, res) {
  const items = await Faq.find({ isPublished: true }).sort({ order: 1, createdAt: -1 }).lean();
  res.json({ success: true, data: items });
}

export async function createContact(req, res) {
  const payload = req.validatedBody;
  const created = await ContactMessage.create({
    ...payload,
    ip: req.ip,
    userAgent: req.get("user-agent") || "",
  });
  res.status(201).json({
    success: true,
    message: "Message received successfully",
    id: created._id,
  });
}

export async function createQuestion(req, res) {
  const payload = req.validatedBody;
  const created = await Question.create({
    ...payload,
    ip: req.ip,
    userAgent: req.get("user-agent") || "",
  });
  res.status(201).json({
    success: true,
    message: "Question received successfully",
    id: created._id,
  });
}

export async function subscribeNewsletter(req, res) {
  const { email, source } = req.validatedBody;
  const existing = await Subscriber.findOne({ email }).lean();
  if (existing && existing.status === "active") {
    return res.status(200).json({ success: true, message: "Already subscribed" });
  }

  const subscriber = await Subscriber.findOneAndUpdate(
    { email },
    { email, source, status: "active" },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  ).lean();

  if (!subscriber) {
    throw new ApiError(500, "Unable to subscribe at the moment");
  }

  return res.status(201).json({ success: true, message: "Subscribed successfully" });
}
