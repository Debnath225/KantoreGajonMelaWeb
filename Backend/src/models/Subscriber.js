import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, trim: true, lowercase: true, unique: true, index: true },
    source: { type: String, default: "website", trim: true, maxlength: 80 },
    status: {
      type: String,
      enum: ["active", "unsubscribed"],
      default: "active",
      index: true,
    },
  },
  { timestamps: true },
);

subscriberSchema.index({ createdAt: -1 });

export const Subscriber = mongoose.model("Subscriber", subscriberSchema);
