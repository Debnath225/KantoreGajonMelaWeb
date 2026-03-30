import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, UploadCloud, Video, ImageIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/api";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary";

export default function UserMediaUpload() {
  const { isAuthenticated, token, user } = useAuth();
  const [mediaType, setMediaType] = useState("image");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [uploads, setUploads] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  if (!isAuthenticated || !token) return null;

  const isAllowedFile = (file) => {
    if (!file) return false;
    if (mediaType === "image") return file.type.startsWith("image/");
    if (mediaType === "video") return file.type.startsWith("video/");
    return true;
  };

  const uploadFile = async (file) => {
    if (!file) return;
    if (!isAllowedFile(file)) {
      setStatus("error");
      setMessage(`Please upload a valid ${mediaType} file.`);
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const signResponse = await api.userCreateUploadSignature(token, {
        mediaType,
      });
      const signData = signResponse?.data;
      if (!signData?.uploadUrl) throw new Error("Failed to initialize upload.");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", signData.apiKey);
      formData.append("timestamp", String(signData.timestamp));
      formData.append("signature", signData.signature);
      formData.append("folder", signData.folder);

      const uploadedResponse = await fetch(signData.uploadUrl, {
        method: "POST",
        body: formData,
      });
      const uploadedPayload = await uploadedResponse.json();
      if (!uploadedResponse.ok || !uploadedPayload?.secure_url) {
        throw new Error(uploadedPayload?.error?.message || "Upload failed.");
      }

      const next = {
        id: uploadedPayload.asset_id || `${Date.now()}`,
        url: uploadedPayload.secure_url,
        type: uploadedPayload.resource_type || mediaType,
        name: uploadedPayload.original_filename || file.name,
        bytes: uploadedPayload.bytes || file.size,
      };
      setUploads((prev) => [next, ...prev].slice(0, 8));
      setStatus("success");
      setMessage("Upload successful. You can use this URL in gallery or posts.");
    } catch (error) {
      setStatus("error");
      setMessage(error?.message || "Upload failed.");
    }
  };

  const handleInputChange = async (event) => {
    const file = event.target.files?.[0];
    await uploadFile(file);
    event.target.value = "";
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer?.files?.[0];
    await uploadFile(file);
  };

  const copyUrl = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      setMessage("URL copied.");
      setStatus("success");
    } catch {
      setMessage("Could not copy URL.");
      setStatus("error");
    }
  };

  return (
    <section className="section-shell-tight">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="section-inner max-w-5xl rounded-3xl border border-cyan-300/25 bg-slate-950/75 p-5 md:p-7"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="section-title text-white">Upload Photo/Video</h2>
            <p className="typo-body text-cyan-100/80 mt-1">
              Logged in as {user?.fullName || "User"}.
            </p>
          </div>
          <div className="inline-flex gap-2 rounded-xl bg-black/40 p-1">
            <button
              type="button"
              onClick={() => setMediaType("image")}
              className={`h-9 px-3 cursor-pointer rounded-lg text-sm inline-flex items-center gap-1 ${
                mediaType === "image"
                  ? "bg-cyan-500 text-black font-semibold"
                  : "text-cyan-100"
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              Photo
            </button>
            <button
              type="button"
              onClick={() => setMediaType("video")}
              className={`h-9 px-3 cursor-pointer rounded-lg text-sm inline-flex items-center gap-1 ${
                mediaType === "video"
                  ? "bg-cyan-500 text-black font-semibold"
                  : "text-cyan-100"
              }`}
            >
              <Video className="w-4 h-4" />
              Video
            </button>
          </div>
        </div>

        <label
          className={`mt-4 min-h-20 w-full rounded-xl border text-cyan-100 inline-flex items-center justify-center gap-2 cursor-pointer transition-colors ${
            isDragging
              ? "border-cyan-300 bg-cyan-500/15"
              : "border-cyan-300/30 bg-black/40"
          }`}
          onDragOver={handleDragOver}
          onDragEnter={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <UploadCloud className="w-4 h-4" />
          <span className="text-center px-3">
            {status === "loading"
              ? "Uploading..."
              : `Drop ${mediaType} here or click to select`}
          </span>
          <input
            type="file"
            accept={mediaType === "image" ? "image/*" : "video/*"}
            className="hidden"
            onChange={handleInputChange}
            disabled={status === "loading"}
          />
        </label>

        {message && (
          <p className={`mt-3 text-sm ${status === "error" ? "text-red-400" : "text-cyan-300"}`}>
            {message}
          </p>
        )}

        {!!uploads.length && (
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {uploads.map((item) => (
              <article
                key={item.id}
                className="rounded-xl border border-white/15 bg-black/35 p-3"
              >
                {item.type === "image" ? (
                  <img
                    src={optimizeCloudinaryUrl(item.url, {
                      width: 900,
                      height: 600,
                      crop: "fill",
                    })}
                    alt={item.name}
                    className="h-40 w-full object-cover rounded-lg"
                    loading="lazy"
                  />
                ) : (
                  <video
                    src={item.url}
                    controls
                    className="h-40 w-full object-cover rounded-lg bg-black"
                    preload="metadata"
                  />
                )}
                <p className="mt-2 text-sm text-cyan-100 truncate">{item.name}</p>
                <div className="mt-2 flex justify-between items-center gap-2">
                  <span className="text-xs text-cyan-100/70">
                    {(item.bytes / (1024 * 1024)).toFixed(2)} MB
                  </span>
                  <button
                    type="button"
                    onClick={() => copyUrl(item.url)}
                    className="h-8 px-3 rounded-lg border border-cyan-300/30 text-cyan-100 text-xs inline-flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    Copy URL
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
