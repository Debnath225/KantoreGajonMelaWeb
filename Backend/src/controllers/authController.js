import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { env } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";

function signToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), role: user.role, email: user.email },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn },
  );
}

function sanitizeUser(user) {
  return {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
    createdAt: user.createdAt,
  };
}

export async function signup(req, res) {
  const { fullName, email, password } = req.validatedBody;
  const existing = await User.findOne({ email }).lean();
  if (existing) {
    throw new ApiError(409, "Email is already registered");
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({
    fullName,
    email,
    passwordHash,
    role: "user",
  });

  const token = signToken(user);
  res.status(201).json({
    success: true,
    message: "Signup successful",
    token,
    user: sanitizeUser(user),
  });
}

export async function login(req, res) {
  const { email, password } = req.validatedBody;
  const user = await User.findOne({ email }).select("+passwordHash");
  if (!user || !user.isActive) {
    throw new ApiError(401, "Invalid email or password");
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    throw new ApiError(401, "Invalid email or password");
  }

  user.lastLoginAt = new Date();
  await user.save();

  const token = signToken(user);
  res.json({
    success: true,
    message: "Login successful",
    token,
    user: sanitizeUser(user),
  });
}

export async function me(req, res) {
  const user = await User.findById(req.auth.userId).lean();
  if (!user || !user.isActive) {
    throw new ApiError(401, "Unauthorized");
  }
  res.json({
    success: true,
    user: sanitizeUser(user),
  });
}
