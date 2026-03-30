import { useState } from "react";
import { motion } from "framer-motion";
import { api } from "@/lib/api";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const validateEmail = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return "Email is required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) return "Please enter a valid email address.";
    return "";
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validation = validateEmail(email);
    if (validation) {
      setError(validation);
      setStatus("error");
      setMessage("");
      return;
    }

    setStatus("loading");
    setError("");
    setMessage("");

    api
      .subscribeNewsletter({ email: email.trim(), source: "website-newsletter" })
      .then(() => {
        setStatus("success");
        setMessage("Thanks for subscribing. You are on the festival update list.");
        setEmail("");
      })
      .catch(() => {
        setStatus("error");
        setMessage("Could not subscribe right now. Please try again in a moment.");
      });
  };

  return (
    <section className="section-shell-tight">
      <div className="section-inner max-w-5xl rounded-3xl border border-cyan-400/20 bg-slate-950/75 p-6 md:p-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="section-title text-white"
        >
          Stay Connected With Festival Updates
        </motion.h2>
        <p className="section-subtitle mt-2 text-cyan-100/80">
          Get updates about events, stories, and cultural highlights.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col sm:flex-row items-center gap-3 max-w-2xl mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setError(validateEmail(event.target.value));
            }}
            onBlur={(event) => setError(validateEmail(event.target.value))}
            placeholder="Enter your email"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "newsletter-email-error" : undefined}
            className={`w-full h-11 rounded-full px-4 border bg-black/50 text-white outline-none ${
              error
                ? "border-red-500 focus:border-red-400"
                : "border-cyan-300/40 focus:border-cyan-300"
            }`}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full sm:w-auto h-11 px-6 rounded-full bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition-colors"
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
        {error && (
          <p id="newsletter-email-error" className="mt-2 text-sm text-red-400">
            {error}
          </p>
        )}

        {message && (
          <p
            className={`mt-3 text-sm ${
              status === "success" ? "text-cyan-300" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </section>
  );
}
