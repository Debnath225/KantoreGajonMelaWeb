import dotenv from "dotenv";

dotenv.config();

const required = [
  "MONGO_URI",
  "ADMIN_API_KEY",
  "JWT_SECRET",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 8080),
  mongoUri: process.env.MONGO_URI,
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  adminApiKey: process.env.ADMIN_API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
  cloudinaryUploadFolder: process.env.CLOUDINARY_UPLOAD_FOLDER || "kantore",
  isProd: (process.env.NODE_ENV || "development") === "production",
};
