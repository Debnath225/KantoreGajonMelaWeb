import mongoose from "mongoose";

export async function connectDatabase(mongoUri) {
  mongoose.set("strictQuery", true);
  await mongoose.connect(mongoUri, {
    maxPoolSize: 20,
    minPoolSize: 2,
    serverSelectionTimeoutMS: 10000,
  });
}
