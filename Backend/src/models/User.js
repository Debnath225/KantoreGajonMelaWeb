import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true, maxlength: 120 },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
    },
    passwordHash: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      index: true,
    },
    isActive: { type: Boolean, default: true, index: true },
    lastLoginAt: { type: Date },
  },
  { timestamps: true },
);

userSchema.index({ createdAt: -1 });

export const User = mongoose.model("User", userSchema);
