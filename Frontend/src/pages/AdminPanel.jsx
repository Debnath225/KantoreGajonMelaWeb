import { useEffect, useState } from "react";
import SEO from "@/components/shared/SEO";
import { api } from "@/lib/api";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary";

const ADMIN_KEY_STORAGE = "kantore_admin_api_key";

const emptyEvent = {
  title: "",
  slug: "",
  description: "",
  location: "",
  startAt: "",
  endAt: "",
  isPublished: true,
};

const emptyGallery = {
  title: "",
  description: "",
  imageUrl: "",
  alt: "",
  tags: "",
  isPublished: true,
};

const emptyFaq = {
  question: "",
  answer: "",
  order: 0,
  isPublished: true,
};

const formatForInput = (isoString) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60000);
  return localDate.toISOString().slice(0, 16);
};

const toIso = (value) => {
  if (!value) return "";
  return new Date(value).toISOString();
};

export default function AdminPanel() {
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [tab, setTab] = useState("events");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [eventForm, setEventForm] = useState(emptyEvent);
  const [galleryForm, setGalleryForm] = useState(emptyGallery);
  const [faqForm, setFaqForm] = useState(emptyFaq);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    const stored = window.sessionStorage.getItem(ADMIN_KEY_STORAGE) || "";
    if (stored) {
      setApiKey(stored);
      setApiKeyInput(stored);
    }
  }, []);

  const resetForm = () => {
    setEditingId(null);
    if (tab === "events") setEventForm(emptyEvent);
    if (tab === "gallery") setGalleryForm(emptyGallery);
    if (tab === "faqs") setFaqForm(emptyFaq);
  };

  const connectAdmin = () => {
    const key = apiKeyInput.trim();
    setApiKey(key);
    if (key) {
      window.sessionStorage.setItem(ADMIN_KEY_STORAGE, key);
    } else {
      window.sessionStorage.removeItem(ADMIN_KEY_STORAGE);
    }
  };

  const clearAdminKey = () => {
    setApiKey("");
    setApiKeyInput("");
    window.sessionStorage.removeItem(ADMIN_KEY_STORAGE);
    setItems([]);
    setMessage("");
    setError("");
  };

  const loadItems = async () => {
    if (!apiKey) return;
    setLoading(true);
    setError("");
    try {
      const response =
        tab === "events"
          ? await api.adminListEvents(apiKey)
          : tab === "gallery"
            ? await api.adminListGallery(apiKey)
            : await api.adminListFaqs(apiKey);
      setItems(Array.isArray(response?.data) ? response.data : []);
    } catch (err) {
      setError(err.message || "Could not load admin data.");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
    resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, apiKey]);

  const startEdit = (item) => {
    setEditingId(item._id);
    if (tab === "events") {
      setEventForm({
        title: item.title || "",
        slug: item.slug || "",
        description: item.description || "",
        location: item.location || "",
        startAt: formatForInput(item.startAt),
        endAt: formatForInput(item.endAt),
        isPublished: Boolean(item.isPublished),
      });
      return;
    }
    if (tab === "gallery") {
      setGalleryForm({
        title: item.title || "",
        description: item.description || "",
        imageUrl: item.imageUrl || "",
        alt: item.alt || "",
        tags: Array.isArray(item.tags) ? item.tags.join(", ") : "",
        isPublished: Boolean(item.isPublished),
      });
      return;
    }
    setFaqForm({
      question: item.question || "",
      answer: item.answer || "",
      order: Number(item.order || 0),
      isPublished: Boolean(item.isPublished),
    });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    if (!apiKey) {
      setError("Enter Admin API key first.");
      return;
    }
    setError("");
    setMessage("");
    try {
      if (tab === "events") {
        const payload = {
          ...eventForm,
          startAt: toIso(eventForm.startAt),
          endAt: eventForm.endAt ? toIso(eventForm.endAt) : undefined,
        };
        if (editingId) await api.adminUpdateEvent(apiKey, editingId, payload);
        else await api.adminCreateEvent(apiKey, payload);
      } else if (tab === "gallery") {
        const payload = {
          ...galleryForm,
          tags: galleryForm.tags
            .split(",")
            .map((tag) => tag.trim().toLowerCase())
            .filter(Boolean),
        };
        if (editingId) await api.adminUpdateGallery(apiKey, editingId, payload);
        else await api.adminCreateGallery(apiKey, payload);
      } else {
        const payload = {
          ...faqForm,
          order: Number(faqForm.order || 0),
        };
        if (editingId) await api.adminUpdateFaq(apiKey, editingId, payload);
        else await api.adminCreateFaq(apiKey, payload);
      }
      setMessage(editingId ? "Updated successfully." : "Created successfully.");
      resetForm();
      await loadItems();
    } catch (err) {
      setError(err.message || "Action failed.");
    }
  };

  const removeItem = async (id) => {
    if (!apiKey) return;
    setError("");
    setMessage("");
    try {
      if (tab === "events") await api.adminDeleteEvent(apiKey, id);
      if (tab === "gallery") await api.adminDeleteGallery(apiKey, id);
      if (tab === "faqs") await api.adminDeleteFaq(apiKey, id);
      setMessage("Deleted successfully.");
      if (editingId === id) resetForm();
      await loadItems();
    } catch (err) {
      setError(err.message || "Delete failed.");
    }
  };

  const handleGalleryFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!apiKey) {
      setError("Enter Admin API key before uploading.");
      return;
    }

    setUploadingImage(true);
    setError("");
    setMessage("");
    try {
      const signResponse = await api.adminCreateUploadSignature(apiKey, {
        folder: "kantore/gallery",
      });
      const signData = signResponse?.data;
      if (!signData) throw new Error("Could not sign upload request.");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", signData.apiKey);
      formData.append("timestamp", String(signData.timestamp));
      formData.append("signature", signData.signature);
      formData.append("folder", signData.folder);

      const cloudinaryResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${signData.cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );
      const uploaded = await cloudinaryResponse.json();
      if (!cloudinaryResponse.ok || !uploaded?.secure_url) {
        throw new Error(uploaded?.error?.message || "Cloudinary upload failed.");
      }

      setGalleryForm((prev) => ({
        ...prev,
        imageUrl: uploaded.secure_url,
        alt: prev.alt || uploaded.original_filename || prev.title || "",
      }));
      setMessage("Image uploaded to Cloudinary successfully.");
    } catch (err) {
      setError(err.message || "Cloudinary upload failed.");
    } finally {
      setUploadingImage(false);
      event.target.value = "";
    }
  };

  return (
    <main className="app-shell min-h-screen section-shell-with-nav">
      <SEO
        title="Admin Panel"
        description="Internal admin panel for content management."
        path="/admin"
        noindex
      />
      <section className="section-inner max-w-7xl space-y-6">
        <div className="rounded-2xl border border-cyan-400/25 bg-slate-950/75 p-5">
          <h1 className="typo-h2 text-white">Admin Content Manager</h1>
          <p className="typo-body text-cyan-100/80 mt-1">
            Manage events, gallery, and FAQs from live backend APIs.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <input
              type="password"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="Enter ADMIN_API_KEY"
              className="h-11 flex-1 rounded-xl border border-cyan-300/30 bg-black/40 px-4 text-white"
            />
            <button
              type="button"
              onClick={connectAdmin}
              className="h-11 px-5 cursor-pointer rounded-xl bg-cyan-500 text-black font-semibold"
            >
              Connect
            </button>
            <button
              type="button"
              onClick={clearAdminKey}
              className="h-11 px-5 cursor-pointer rounded-xl border border-white/25 text-white"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-cyan-400/25 bg-slate-950/75 p-5">
          <div className="flex gap-2 flex-wrap">
            {["events", "gallery", "faqs"].map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setTab(name)}
                className={`h-10 px-4 rounded-lg capitalize ${
                  tab === name
                    ? "bg-cyan-500 text-black font-semibold"
                    : "bg-black/30 text-cyan-100 border border-cyan-300/20"
                }`}
              >
                {name}
              </button>
            ))}
          </div>

          <form onSubmit={submitForm} className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
            {tab === "events" && (
              <>
                <input className="h-11 rounded-xl px-3 bg-black/40 border border-white/20 text-white" placeholder="Title" value={eventForm.title} onChange={(e) => setEventForm((p) => ({ ...p, title: e.target.value }))} />
                <input className="h-11 rounded-xl px-3 bg-black/40 border border-white/20 text-white" placeholder="Slug (example: gajon-opening-ritual)" value={eventForm.slug} onChange={(e) => setEventForm((p) => ({ ...p, slug: e.target.value }))} />
                <input className="h-11 rounded-xl px-3 bg-black/40 border border-white/20 text-white" placeholder="Location" value={eventForm.location} onChange={(e) => setEventForm((p) => ({ ...p, location: e.target.value }))} />
                <input type="datetime-local" className="h-11 rounded-xl px-3 bg-black/40 border border-white/20 text-white" value={eventForm.startAt} onChange={(e) => setEventForm((p) => ({ ...p, startAt: e.target.value }))} />
                <input type="datetime-local" className="h-11 rounded-xl px-3 bg-black/40 border border-white/20 text-white" value={eventForm.endAt} onChange={(e) => setEventForm((p) => ({ ...p, endAt: e.target.value }))} />
                <label className="h-11 flex items-center gap-2 text-cyan-100">
                  <input type="checkbox" checked={eventForm.isPublished} onChange={(e) => setEventForm((p) => ({ ...p, isPublished: e.target.checked }))} />
                  Published
                </label>
                <textarea className="md:col-span-2 min-h-24 rounded-xl px-3 py-2 bg-black/40 border border-white/20 text-white" placeholder="Description" value={eventForm.description} onChange={(e) => setEventForm((p) => ({ ...p, description: e.target.value }))} />
              </>
            )}

            {tab === "gallery" && (
              <>
                <input className="h-11 rounded-xl px-3 bg-black/40 border border-white/20 text-white" placeholder="Title" value={galleryForm.title} onChange={(e) => setGalleryForm((p) => ({ ...p, title: e.target.value }))} />
                <input className="h-11 rounded-xl px-3 bg-black/40 border border-white/20 text-white" placeholder="Image URL (absolute)" value={galleryForm.imageUrl} onChange={(e) => setGalleryForm((p) => ({ ...p, imageUrl: e.target.value }))} />
                <label className="h-11 rounded-xl px-3 bg-black/40 border border-white/20 text-cyan-100 flex items-center cursor-pointer">
                  <input type="file" accept="image/*" className="hidden" onChange={handleGalleryFileUpload} />
                  {uploadingImage ? "Uploading to Cloudinary..." : "Upload image to Cloudinary"}
                </label>
                <input className="h-11 rounded-xl px-3 bg-black/40 border border-white/20 text-white" placeholder="Alt text" value={galleryForm.alt} onChange={(e) => setGalleryForm((p) => ({ ...p, alt: e.target.value }))} />
                <input className="h-11 rounded-xl px-3 bg-black/40 border border-white/20 text-white" placeholder="Tags (comma separated)" value={galleryForm.tags} onChange={(e) => setGalleryForm((p) => ({ ...p, tags: e.target.value }))} />
                <label className="h-11 flex items-center gap-2 text-cyan-100 md:col-span-2">
                  <input type="checkbox" checked={galleryForm.isPublished} onChange={(e) => setGalleryForm((p) => ({ ...p, isPublished: e.target.checked }))} />
                  Published
                </label>
                <textarea className="md:col-span-2 min-h-24 rounded-xl px-3 py-2 bg-black/40 border border-white/20 text-white" placeholder="Description" value={galleryForm.description} onChange={(e) => setGalleryForm((p) => ({ ...p, description: e.target.value }))} />
                {galleryForm.imageUrl && (
                  <img
                    src={optimizeCloudinaryUrl(galleryForm.imageUrl, { width: 900, height: 600 })}
                    alt="Uploaded preview"
                    className="md:col-span-2 h-40 w-full object-cover rounded-xl border border-cyan-300/20"
                    loading="lazy"
                  />
                )}
              </>
            )}

            {tab === "faqs" && (
              <>
                <input className="h-11 rounded-xl px-3 bg-black/40 border border-white/20 text-white md:col-span-2" placeholder="Question" value={faqForm.question} onChange={(e) => setFaqForm((p) => ({ ...p, question: e.target.value }))} />
                <input type="number" className="h-11 rounded-xl px-3 bg-black/40 border border-white/20 text-white" placeholder="Display order" value={faqForm.order} onChange={(e) => setFaqForm((p) => ({ ...p, order: e.target.value }))} />
                <label className="h-11 flex items-center gap-2 text-cyan-100">
                  <input type="checkbox" checked={faqForm.isPublished} onChange={(e) => setFaqForm((p) => ({ ...p, isPublished: e.target.checked }))} />
                  Published
                </label>
                <textarea className="md:col-span-2 min-h-24 rounded-xl px-3 py-2 bg-black/40 border border-white/20 text-white" placeholder="Answer" value={faqForm.answer} onChange={(e) => setFaqForm((p) => ({ ...p, answer: e.target.value }))} />
              </>
            )}

            <div className="md:col-span-2 flex gap-2">
              <button type="submit" className="h-11 px-5 rounded-xl bg-cyan-500 text-black font-semibold">
                {editingId ? "Update" : "Create"}
              </button>
              {editingId && (
                <button type="button" onClick={resetForm} className="h-11 px-5 rounded-xl border border-white/25 text-white">
                  Cancel Edit
                </button>
              )}
            </div>
          </form>

          {error && <p className="mt-3 text-red-400">{error}</p>}
          {message && <p className="mt-3 text-cyan-300">{message}</p>}
        </div>

        <div className="rounded-2xl border border-cyan-400/25 bg-slate-950/75 p-5">
          <h2 className="typo-h3 text-white capitalize">{tab} List</h2>
          {loading ? (
            <p className="text-cyan-100/80 mt-3">Loading...</p>
          ) : (
            <div className="mt-4 space-y-3">
              {items.map((item) => (
                <article
                  key={item._id}
                  className="rounded-xl border border-white/15 bg-black/35 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="text-white font-semibold truncate">
                      {item.title || item.question}
                    </p>
                    <p className="text-cyan-100/75 text-sm truncate">
                      {item.slug || item.location || item.alt || ""}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => startEdit(item)} className="h-9 px-4 rounded-lg bg-cyan-500 text-black font-semibold">
                      Edit
                    </button>
                    <button type="button" onClick={() => removeItem(item._id)} className="h-9 px-4 rounded-lg border border-red-400/50 text-red-300">
                      Delete
                    </button>
                  </div>
                </article>
              ))}
              {!items.length && (
                <p className="text-cyan-100/80">No records found.</p>
              )}
            </div>
          )}
        </div>

        {apiKey && (
          <p className="text-xs text-cyan-100/60">
            API key is kept in session storage for this browser tab only.
          </p>
        )}
      </section>
    </main>
  );
}
