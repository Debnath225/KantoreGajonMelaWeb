import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 140 },
    slug: { type: String, required: true, trim: true, lowercase: true, unique: true },
    description: { type: String, required: true, trim: true, maxlength: 1000 },
    location: { type: String, required: true, trim: true, maxlength: 200 },
    startAt: { type: Date, required: true },
    endAt: { type: Date },
    isPublished: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
);

eventSchema.index({ startAt: 1, isPublished: 1 });

export const Event = mongoose.model("Event", eventSchema);
