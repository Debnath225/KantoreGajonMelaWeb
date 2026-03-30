import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, index: true },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
    status: {
      type: String,
      enum: ["new", "in_progress", "resolved"],
      default: "new",
      index: true,
    },
    ip: { type: String },
    userAgent: { type: String, maxlength: 400 },
  },
  { timestamps: true },
);

contactMessageSchema.index({ createdAt: -1, status: 1 });

export const ContactMessage = mongoose.model("ContactMessage", contactMessageSchema);
