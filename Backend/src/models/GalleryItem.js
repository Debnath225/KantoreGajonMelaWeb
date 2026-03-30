import mongoose from "mongoose";

const galleryItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 140 },
    description: { type: String, trim: true, maxlength: 1000 },
    imageUrl: { type: String, required: true, trim: true },
    alt: { type: String, required: true, trim: true, maxlength: 180 },
    tags: [{ type: String, trim: true, lowercase: true }],
    isPublished: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
);

galleryItemSchema.index({ createdAt: -1, isPublished: 1 });

export const GalleryItem = mongoose.model("GalleryItem", galleryItemSchema);
