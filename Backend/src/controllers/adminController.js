import { Event } from "../models/Event.js";
import { GalleryItem } from "../models/GalleryItem.js";
import { Faq } from "../models/Faq.js";
import { ContactMessage } from "../models/ContactMessage.js";
import { Subscriber } from "../models/Subscriber.js";
import { Question } from "../models/Question.js";
import { ApiError } from "../utils/ApiError.js";

function assertFound(item, resourceName) {
  if (!item) {
    throw new ApiError(404, `${resourceName} not found`);
  }
}

function parseDateFields(payload) {
  return {
    ...payload,
    startAt: payload.startAt ? new Date(payload.startAt) : undefined,
    endAt: payload.endAt ? new Date(payload.endAt) : undefined,
  };
}

export async function adminListEvents(_req, res) {
  const items = await Event.find().sort({ createdAt: -1 }).lean();
  res.json({ success: true, data: items });
}

export async function adminCreateEvent(req, res) {
  const created = await Event.create(parseDateFields(req.validatedBody));
  res.status(201).json({ success: true, data: created });
}

export async function adminUpdateEvent(req, res) {
  const updated = await Event.findByIdAndUpdate(
    req.params.id,
    parseDateFields(req.validatedBody),
    { new: true, runValidators: true },
  ).lean();
  assertFound(updated, "Event");
  res.json({ success: true, data: updated });
}

export async function adminDeleteEvent(req, res) {
  const deleted = await Event.findByIdAndDelete(req.params.id).lean();
  assertFound(deleted, "Event");
  res.json({ success: true, message: "Event deleted" });
}

export async function adminListGallery(_req, res) {
  const items = await GalleryItem.find().sort({ createdAt: -1 }).lean();
  res.json({ success: true, data: items });
}

export async function adminCreateGallery(req, res) {
  const created = await GalleryItem.create(req.validatedBody);
  res.status(201).json({ success: true, data: created });
}

export async function adminUpdateGallery(req, res) {
  const updated = await GalleryItem.findByIdAndUpdate(req.params.id, req.validatedBody, {
    new: true,
    runValidators: true,
  }).lean();
  assertFound(updated, "Gallery item");
  res.json({ success: true, data: updated });
}

export async function adminDeleteGallery(req, res) {
  const deleted = await GalleryItem.findByIdAndDelete(req.params.id).lean();
  assertFound(deleted, "Gallery item");
  res.json({ success: true, message: "Gallery item deleted" });
}

export async function adminListFaqs(_req, res) {
  const items = await Faq.find().sort({ order: 1, createdAt: -1 }).lean();
  res.json({ success: true, data: items });
}

export async function adminCreateFaq(req, res) {
  const created = await Faq.create(req.validatedBody);
  res.status(201).json({ success: true, data: created });
}

export async function adminUpdateFaq(req, res) {
  const updated = await Faq.findByIdAndUpdate(req.params.id, req.validatedBody, {
    new: true,
    runValidators: true,
  }).lean();
  assertFound(updated, "FAQ");
  res.json({ success: true, data: updated });
}

export async function adminDeleteFaq(req, res) {
  const deleted = await Faq.findByIdAndDelete(req.params.id).lean();
  assertFound(deleted, "FAQ");
  res.json({ success: true, message: "FAQ deleted" });
}

export async function adminListContacts(_req, res) {
  const items = await ContactMessage.find().sort({ createdAt: -1 }).lean();
  res.json({ success: true, data: items });
}

export async function adminListSubscribers(_req, res) {
  const items = await Subscriber.find().sort({ createdAt: -1 }).lean();
  res.json({ success: true, data: items });
}

export async function adminListQuestions(_req, res) {
  const items = await Question.find().sort({ createdAt: -1 }).lean();
  res.json({ success: true, data: items });
}
