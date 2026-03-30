import mongoose from "mongoose";

const faqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true, trim: true, maxlength: 220 },
    answer: { type: String, required: true, trim: true, maxlength: 2000 },
    order: { type: Number, default: 0, index: true },
    isPublished: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
);

faqSchema.index({ order: 1, isPublished: 1 });

export const Faq = mongoose.model("Faq", faqSchema);
