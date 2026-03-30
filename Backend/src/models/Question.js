import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, index: true },
    question: { type: String, required: true, trim: true, maxlength: 2000 },
    status: {
      type: String,
      enum: ["new", "answered", "archived"],
      default: "new",
      index: true,
    },
    ip: { type: String },
    userAgent: { type: String, maxlength: 400 },
  },
  { timestamps: true },
);

questionSchema.index({ createdAt: -1, status: 1 });

export const Question = mongoose.model("Question", questionSchema);
