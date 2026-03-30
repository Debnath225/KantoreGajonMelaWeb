import { env } from "../config/env.js";
import { cloudinary } from "../config/cloudinary.js";

export async function createUploadSignature(req, res) {
  const { folder } = req.validatedBody;
  const timestamp = Math.floor(Date.now() / 1000);
  const uploadFolder = folder || env.cloudinaryUploadFolder;

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder: uploadFolder,
    },
    env.cloudinaryApiSecret,
  );

  res.json({
    success: true,
    data: {
      timestamp,
      signature,
      folder: uploadFolder,
      cloudName: env.cloudinaryCloudName,
      apiKey: env.cloudinaryApiKey,
    },
  });
}

export async function createUserUploadSignature(req, res) {
  const { mediaType } = req.validatedBody;
  const timestamp = Math.floor(Date.now() / 1000);
  const uploadFolder = `${env.cloudinaryUploadFolder}/user/${req.auth.userId}`;
  const normalizedType = mediaType || "auto";

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder: uploadFolder,
    },
    env.cloudinaryApiSecret,
  );

  res.json({
    success: true,
    data: {
      timestamp,
      signature,
      folder: uploadFolder,
      cloudName: env.cloudinaryCloudName,
      apiKey: env.cloudinaryApiKey,
      uploadUrl: `https://api.cloudinary.com/v1_1/${env.cloudinaryCloudName}/${normalizedType}/upload`,
      mediaType: normalizedType,
    },
  });
}
