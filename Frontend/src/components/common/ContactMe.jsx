import { useState } from "react";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";
import { api } from "@/lib/api";

const ContactForm = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const validateField = (field, value) => {
    const trimmed = value.trim();

    if (field === "name") {
      if (!trimmed) return "Full name is required.";
      if (trimmed.length < 3) return "Name must be at least 3 characters.";
      return "";
    }

    if (field === "email") {
      if (!trimmed) return "Email is required.";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmed)) return "Enter a valid email address.";
      return "";
    }

    if (field === "message") {
      if (!trimmed) return "Message is required.";
      if (trimmed.length < 10) return "Message must be at least 10 characters.";
      return "";
    }

    return "";
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormValues((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: validateField(id, value) }));
  };

  const handleBlur = (event) => {
    const { id, value } = event.target;
    setErrors((prev) => ({ ...prev, [id]: validateField(id, value) }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = {
      name: validateField("name", formValues.name),
      email: validateField("email", formValues.email),
      message: validateField("message", formValues.message),
    };
    setErrors(nextErrors);

    const hasErrors = Object.values(nextErrors).some(Boolean);
    if (hasErrors) return;

    setStatus("loading");
    setStatusMessage("");
    try {
      await api.submitContact({
        fullName: formValues.name.trim(),
        email: formValues.email.trim(),
        message: formValues.message.trim(),
      });
      setStatus("success");
      setStatusMessage("Message sent successfully. We will contact you soon.");
      setFormValues({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
      setStatusMessage("Could not send your message. Please try again.");
    }
  };

  return (
    <section id="contactMe" className="section-shell scroll-mt-24">
      <div className="section-inner max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-7 items-stretch">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeOut", duration: 0.45 }}
          className="h-full w-full p-5 md:p-6 bg-slate-950/80 border border-cyan-400/35 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
        >
          <div className="mb-6 md:mb-7">
            <h2 className="section-title text-white">Contact Me</h2>
            <p className="typo-body text-cyan-100/75 mt-1">
              Have a question or suggestion? Send a message and we will get back to you.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4 md:space-y-5">
            <div>
              <label htmlFor="name" className="typo-small text-cyan-200/90 block mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formValues.name}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={`w-full h-12 px-4 border rounded-xl outline-none transition-colors bg-black/40 placeholder:text-slate-500 ${
                  errors.name
                    ? "border-red-500 focus:border-red-400"
                    : "border-cyan-300/35 focus:border-cyan-400"
                }`}
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-xs sm:text-sm text-red-400">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="typo-small text-cyan-200/90 block mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="name@example.com"
                value={formValues.email}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`w-full h-12 px-4 border rounded-xl outline-none transition-colors bg-black/40 placeholder:text-slate-500 ${
                  errors.email
                    ? "border-red-500 focus:border-red-400"
                    : "border-cyan-300/35 focus:border-cyan-400"
                }`}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-xs sm:text-sm text-red-400">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="typo-small text-cyan-200/90 block mb-1.5">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                placeholder="Write your message here..."
                value={formValues.message}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={`w-full px-4 py-3 border rounded-xl outline-none transition-colors bg-black/40 placeholder:text-slate-500 resize-y min-h-[145px] ${
                  errors.message
                    ? "border-red-500 focus:border-red-400"
                    : "border-cyan-300/35 focus:border-cyan-400"
                }`}
              />
              {errors.message && (
                <p id="message-error" className="mt-1 text-xs sm:text-sm text-red-400">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full h-12 cursor-pointer border border-cyan-400 bg-cyan-500 text-black font-semibold rounded-xl shadow-lg hover:bg-cyan-400 transition-all active:scale-[0.99] disabled:opacity-70"
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>
            {statusMessage && (
              <p className={`text-sm ${status === "success" ? "text-cyan-300" : "text-red-400"}`}>
                {statusMessage}
              </p>
            )}
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeOut", duration: 0.45, delay: 0.05 }}
          className="h-full w-full bg-slate-950/80 border border-cyan-400/35 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.35)] overflow-hidden"
        >
          <ProjectCard />
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
